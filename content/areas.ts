export const sides = { north: 'North', central: 'Central', east: 'East', south: 'South' } as const;
export type Side = keyof typeof sides;

export interface Area {
  /** Stable neighbourhood ID referenced by instructor profiles. */
  id: string;
  name: string;
  side: Side;
}

export const areas: Area[] = [
  { id: 'bishopston', name: 'Bishopston', side: 'north' },
  { id: 'redland', name: 'Redland', side: 'north' },
  { id: 'horfield', name: 'Horfield', side: 'north' },
  { id: 'southmead', name: 'Southmead', side: 'north' },
  { id: 'henleaze', name: 'Henleaze', side: 'north' },
  { id: 'westbury-on-trym', name: 'Westbury-on-Trym', side: 'north' },
  { id: 'clifton', name: 'Clifton', side: 'central' },
  { id: 'hotwells', name: 'Hotwells', side: 'central' },
  { id: 'cotham', name: 'Cotham', side: 'central' },
  { id: 'kingswood', name: 'Kingswood', side: 'east' },
  { id: 'fishponds', name: 'Fishponds', side: 'east' },
  { id: 'staple-hill', name: 'Staple Hill', side: 'east' },
  { id: 'bedminster', name: 'Bedminster', side: 'south' },
  { id: 'southville', name: 'Southville', side: 'south' },
  { id: 'knowle', name: 'Knowle', side: 'south' },
];

export const testCentres = [
  { id: 'kingswood-centre', name: 'Kingswood' },
  { id: 'brislington-centre', name: 'Brislington' },
  { id: 'avonmouth-centre', name: 'Avonmouth' },
];
