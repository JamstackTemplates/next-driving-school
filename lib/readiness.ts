import { stages } from '../content/test-prep.ts';

export type Readiness = 'red' | 'amber' | 'green';
export type Ratings = Partial<Record<string, Readiness>>;
export const readinessKey = 'green-light:test-prep:v1';

export function summaryLight(ratings: Ratings): Readiness {
  const lights = stages.map(stage => ratings[stage.id]);
  if (lights.includes('red')) return 'red';
  return lights.every(light => light === 'green') ? 'green' : 'amber';
}

export function loadRatings(storage: Pick<Storage, 'getItem'>): Ratings {
  try {
    const saved = JSON.parse(storage.getItem(readinessKey) || '{}');
    return Object.fromEntries(stages.flatMap(({ id }) => {
      const value = saved?.[id];
      return value === 'red' || value === 'amber' || value === 'green' ? [[id, value]] : [];
    }));
  } catch { return {}; }
}

export function saveRatings(storage: Pick<Storage, 'setItem'>, ratings: Ratings) {
  try { storage.setItem(readinessKey, JSON.stringify(ratings)); } catch { /* Keep in-memory choices. */ }
}
