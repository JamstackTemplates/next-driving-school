import assert from 'node:assert/strict';
import { test } from 'node:test';
import { areas, testCentres } from '../content/areas.ts';
import { instructors } from '../content/instructors.ts';
import { hourlyRates, packages, priceFor, visiblePackages } from '../content/lessons.ts';
import { faults, questions, stages } from '../content/test-prep.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';
import { validateContent } from '../lib/validate-content.ts';

function sample() {
  return structuredClone({ areas, testCentres, instructors, hourlyRates, packages, stages, questions, faults });
}

test('published content has valid fields, prices, IDs and references', () => {
  assert.doesNotThrow(() => validateContent());
});

test('package validation reports the package and field to edit', () => {
  const cases = [
    [{ id: 'Starter Ten' }, /packages\.Starter Ten.*URL-safe/],
    [{ id: 'pay-as-you-go' }, /packages\.pay-as-you-go.*duplicate ID/],
    [{ priceManual: null, priceAutomatic: null }, /starter-ten.*needs a price/],
    [{ priceManual: 3.5 }, /starter-ten\.priceManual.*whole pounds/],
    [{ priceAutomatic: 0 }, /starter-ten\.priceAutomatic.*whole pounds/],
    [{ priceManual: 421 }, /starter-ten\.priceManual.*hourly rate/],
    [{ featured: false }, /packages\.featured.*four/],
    [{ availability: 'sold' }, /starter-ten\.availability/],
  ] as const;
  for (const [patch, message] of cases) {
    const data = sample();
    Object.assign(data.packages[2], patch);
    assert.throws(() => validateContent(data), message);
  }
});

test('instructor and junction errors identify the record and invalid reference or field', () => {
  const cases = [
    [{ areas: ['unknown-area'] }, /maya-okafor\.areas.*unknown-area/],
    [{ packageIds: ['unknown-package'] }, /maya-okafor\.packageIds.*unknown-package/],
    [{ plateNumber: '14' }, /tom-reilly\.plateNumber.*duplicate/],
    [{ yearsTeaching: 41 }, /maya-okafor\.yearsTeaching/],
    [{ availability: 'holiday' }, /maya-okafor\.availability/],
  ] as const;
  for (const [patch, message] of cases) {
    const data = sample();
    Object.assign(data.instructors[0], patch);
    assert.throws(() => validateContent(data), message);
  }
  const data = sample();
  data.packages[2].priceManual = null;
  assert.throws(() => validateContent(data), /maya-okafor\.packageIds.*starter-ten.*unavailable in manual/);
  data.packages[2].priceManual = 400;
  data.stages[3].junction = 3;
  assert.throws(() => validateContent(data), /theory-test\.junction.*expected junction 4/);
});

test('selecting automatic uses its prices and hides manual-only packages', () => {
  const lessons = sample().packages;
  lessons[4].priceAutomatic = null;
  assert.equal(visiblePackages(lessons, 'automatic').length, lessons.length - 1);
  assert.ok(!visiblePackages(lessons, 'automatic').includes(lessons[4]));
  assert.ok(visiblePackages(lessons, 'manual').includes(lessons[4]));
  assert.equal(priceFor(lessons[2], 'automatic'), lessons[2].priceAutomatic);
  assert.deepEqual(visiblePackages(lessons), lessons);
});

test('owner edits flow through package and instructor data into the public schema', () => {
  const lesson = packages.find(item => item.id === 'starter-ten')!;
  const person = instructors.find(item => item.id === 'tom-reilly')!;
  const originalPrice = lesson.priceManual;
  const originalAvailability = person.availability;
  try {
    lesson.priceManual = 410;
    person.availability = 'taking-pupils';
    validateContent();
    const data = businessStructuredData();
    const starterTen = data.hasOfferCatalog.itemListElement.find(item => item.name === lesson.name)!;
    assert.equal(starterTen.itemListElement[0].price, 410);
    assert.equal(starterTen.itemListElement[0].priceCurrency, 'GBP');
    assert.match(data.employee.find(item => item.name === person.name)!.description, /Taking pupils/);
  } finally {
    lesson.priceManual = originalPrice;
    person.availability = originalAvailability;
  }
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
