import { areas, sides, testCentres } from '../content/areas.ts';
import { business, phoneHours } from '../content/business.ts';
import { instructors, instructorAvailability } from '../content/instructors.ts';
import { hourlyRates, packages, packageAvailability, priceFor, transmissions, type Transmission } from '../content/lessons.ts';
import { faults, questions, stages, testDayChecklist } from '../content/test-prep.ts';
import { validateHours } from './hours.ts';

const allContent = { areas, testCentres, instructors, packages, hourlyRates, stages, questions, faults };
const transmissionKeys = Object.keys(transmissions) as Transmission[];

function requireValue(condition: unknown, field: string, problem: string): asserts condition {
  if (!condition) throw new Error(`${field}: ${problem}`);
}

function requiredText(value: unknown, field: string) {
  requireValue(typeof value === 'string' && value.trim(), field, 'required text');
}

function textList(values: string[], field: string, min = 1, max = Infinity) {
  requireValue(Array.isArray(values) && values.length >= min && values.length <= max, field,
    max === Infinity ? `expected at least ${min} entry` : `expected ${min}–${max} entries`);
  values.forEach((value, index) => requiredText(value, `${field}[${index}]`));
}

function validateIds(items: { id: string }[], collection: string) {
  const seen = new Set<string>();
  for (const { id } of items) {
    const key = `${collection}.${id}`;
    requireValue(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) && typeof id === 'string', key, 'expected a URL-safe ID');
    requireValue(!seen.has(id), key, 'duplicate ID');
    seen.add(id);
  }
}

export function validateContent(data = allContent) {
  validateHours(phoneHours);
  for (const [field, value] of Object.entries(business)) requiredText(value, `business.${field}`);
  requireValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email), 'business.email', 'expected a public email address');
  for (const [collection, items] of Object.entries(data)) {
    if (Array.isArray(items)) validateIds(items, collection);
  }

  for (const transmission of transmissionKeys) {
    const rate = data.hourlyRates[transmission];
    requireValue(Number.isInteger(rate) && rate > 0, `hourlyRates.${transmission}`, 'expected positive whole pounds');
  }

  for (const lesson of data.packages) {
    const key = `packages.${lesson.id}`;
    requiredText(lesson.name, `${key}.name`);
    requiredText(lesson.bestFor, `${key}.bestFor`);
    textList(lesson.includes, `${key}.includes`);
    requireValue(Number.isFinite(lesson.hours) && lesson.hours > 0, `${key}.hours`, 'expected a positive number of hours');
    requireValue(typeof lesson.featured === 'boolean', `${key}.featured`, 'expected true or false');
    requireValue(Object.hasOwn(packageAvailability, lesson.availability), `${key}.availability`, 'expected open, limited or paused');
    requireValue(['green', 'blue', 'white', 'brown'].includes(lesson.signColour), `${key}.signColour`, 'expected green, blue, white or brown');
    requireValue(lesson.priceAutomatic !== null || lesson.priceManual !== null, key, 'at least one transmission needs a price');
    for (const transmission of transmissionKeys) {
      const price = priceFor(lesson, transmission);
      if (price === null) continue;
      const field = `${key}.${transmission === 'manual' ? 'priceManual' : 'priceAutomatic'}`;
      requireValue(Number.isInteger(price) && price > 0, field, 'expected positive whole pounds or null');
      requireValue(price <= lesson.hours * data.hourlyRates[transmission], field, 'exceeds hours × hourly rate');
    }
  }
  const featured = data.packages.filter(lesson => lesson.featured);
  requireValue(featured.length === 4, 'packages.featured', `expected four packages, found ${featured.length} (${featured.map(lesson => lesson.id).join(', ')})`);

  for (const area of data.areas) {
    requiredText(area.name, `areas.${area.id}.name`);
    requireValue(Object.hasOwn(sides, area.side), `areas.${area.id}.side`, 'expected north, central, east or south');
  }
  for (const centre of data.testCentres) requiredText(centre.name, `testCentres.${centre.id}.name`);

  const plates = new Set<string>();
  for (const instructor of data.instructors) {
    const key = `instructors.${instructor.id}`;
    for (const field of ['name', 'car', 'quote'] as const) requiredText(instructor[field], `${key}.${field}`);
    if (instructor.pronouns !== undefined) requiredText(instructor.pronouns, `${key}.pronouns`);
    textList(instructor.languages, `${key}.languages`);
    textList(instructor.specialties, `${key}.specialties`, 2, 3);
    textList(instructor.areas, `${key}.areas`);
    textList(instructor.packageIds, `${key}.packageIds`);
    requireValue(Object.hasOwn(transmissions, instructor.transmission), `${key}.transmission`, 'expected manual or automatic');
    requireValue(Object.hasOwn(instructorAvailability, instructor.availability), `${key}.availability`, 'expected taking-pupils, waitlist or full');
    requireValue(Number.isInteger(instructor.yearsTeaching) && instructor.yearsTeaching >= 1 && instructor.yearsTeaching <= 40,
      `${key}.yearsTeaching`, 'expected an integer from 1 to 40');
    requireValue(typeof instructor.plateNumber === 'string' && /^\d{2}$/.test(instructor.plateNumber), `${key}.plateNumber`, 'expected two digits');
    requireValue(!plates.has(instructor.plateNumber), `${key}.plateNumber`, `duplicate plate ${instructor.plateNumber}`);
    plates.add(instructor.plateNumber);
    for (const id of instructor.areas) requireValue(data.areas.some(area => area.id === id), `${key}.areas`, `unknown area ${id}`);
    for (const id of instructor.packageIds) {
      const lesson = data.packages.find(item => item.id === id);
      requireValue(lesson, `${key}.packageIds`, `unknown package ${id}`);
      requireValue(priceFor(lesson, instructor.transmission) !== null, `${key}.packageIds`, `${id} is unavailable in ${instructor.transmission}`);
    }
  }

  requireValue(data.stages.length === 8, 'stages', 'expected eight junctions');
  data.stages.forEach((stage, index) => {
    const key = `stages.${stage.id}`;
    requireValue(stage.junction === index + 1, `${key}.junction`, `expected junction ${index + 1}`);
    for (const field of ['title', 'summary', 'typicalHours'] as const) requiredText(stage[field], `${key}.${field}`);
    textList(stage.checklist, `${key}.checklist`, 3, 4);
  });
  for (const question of data.questions) {
    const key = `questions.${question.id}`;
    requireValue(['show', 'tell'].includes(question.kind), `${key}.kind`, 'expected show or tell');
    requiredText(question.question, `${key}.question`);
    requiredText(question.hint, `${key}.hint`);
  }
  for (const fault of data.faults) {
    requiredText(fault.title, `faults.${fault.id}.title`);
    requiredText(fault.fix, `faults.${fault.id}.fix`);
  }
  textList(testDayChecklist, 'testDayChecklist');
}
