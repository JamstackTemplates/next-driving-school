import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stages } from '../content/test-prep.ts';
import { loadRatings, readinessKey, saveRatings, summaryLight } from '../lib/readiness.ts';

test('readiness is green only when all eight stages are green and red if any is red', () => {
  const allGreen = Object.fromEntries(stages.map(stage => [stage.id, 'green' as const]));
  assert.equal(summaryLight({}), 'amber');
  assert.equal(summaryLight({ [stages[0].id]: 'green' }), 'amber');
  assert.equal(summaryLight(allGreen), 'green');
  assert.equal(summaryLight({ ...allGreen, [stages[0].id]: 'amber' }), 'amber');
  assert.equal(summaryLight({ ...allGreen, [stages[0].id]: 'red' }), 'red');
});

test('local choices round trip and invalid values are discarded', () => {
  const store = new Map<string, string>();
  const storage = { getItem: (key: string) => store.get(key) ?? null, setItem: (key: string, value: string) => store.set(key, value) };
  const ratings = { [stages[0].id]: 'red', [stages[1].id]: 'green' } as const;
  saveRatings(storage, ratings);
  assert.deepEqual(loadRatings(storage), ratings);
  storage.setItem(readinessKey, JSON.stringify({ ...ratings, [stages[2].id]: 'invalid', removed: 'green' }));
  assert.deepEqual(loadRatings(storage), ratings);
  storage.setItem(readinessKey, 'broken JSON');
  assert.deepEqual(loadRatings(storage), {});
});
