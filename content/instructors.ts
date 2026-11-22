import type { Transmission } from './lessons.ts';

export interface Instructor {
  /** Stable profile ID used in fragment links. */
  id: string;
  name: string;
  pronouns?: string;
  transmission: Transmission;
  car: string;
  /** IDs from areas.ts and lessons.ts respectively. */
  areas: string[];
  packageIds: string[];
  languages: string[];
  specialties: string[];
  yearsTeaching: number;
  availability: 'taking-pupils' | 'waitlist' | 'full';
  quote: string;
  /** Two unique digits printed on the windscreen badge. */
  plateNumber: string;
}

export const instructors: Instructor[] = [
  {
    id: 'maya-okafor', name: 'Maya Okafor', transmission: 'manual', plateNumber: '09',
    car: 'Five-door petrol hatchback, dual controls', areas: ['bishopston', 'redland', 'horfield'],
    languages: ['English', 'Yoruba'], specialties: ['Nervous beginners', 'First-hour calm'],
    yearsTeaching: 9, availability: 'taking-pupils',
    packageIds: ['taster-hour', 'pay-as-you-go', 'starter-ten', 'steady-twenty', 'test-morning'],
    quote: 'Nobody stalls on purpose. We just try again.',
  },
  {
    id: 'tom-reilly', name: 'Tom Reilly', transmission: 'automatic', plateNumber: '14',
    car: 'Electric hatchback, dual controls', areas: ['bedminster', 'southville', 'knowle'],
    languages: ['English'], specialties: ['Automatic learners', 'Older first-time drivers'],
    yearsTeaching: 14, availability: 'waitlist',
    packageIds: ['taster-hour', 'pay-as-you-go', 'starter-ten', 'steady-twenty', 'confidence-refresher'],
    quote: 'Quiet car, quiet roads, then we build from there.',
  },
  {
    id: 'priya-shah', name: 'Priya Shah', transmission: 'manual', plateNumber: '11',
    car: 'Five-door diesel hatchback, dual controls', areas: ['kingswood', 'fishponds', 'staple-hill'],
    languages: ['English', 'Gujarati'], specialties: ['Intensive courses', 'Kingswood test routes'],
    yearsTeaching: 11, availability: 'taking-pupils',
    packageIds: ['starter-ten', 'steady-twenty', 'fast-lane-intensive', 'test-morning'],
    quote: 'Roundabouts are just junctions going in a circle.',
  },
  {
    id: 'dan-evans', name: 'Dan Evans', transmission: 'automatic', plateNumber: '21',
    car: 'Hybrid saloon, dual controls', areas: ['clifton', 'hotwells', 'cotham'],
    languages: ['English', 'Welsh'], specialties: ['Motorway and Pass Plus', 'Returning drivers'],
    yearsTeaching: 21, availability: 'full',
    packageIds: ['pay-as-you-go', 'test-morning', 'confidence-refresher', 'pass-plus-motorway'],
    quote: 'Confidence is a skill. We practise it like any other.',
  },
  {
    id: 'sofia-marin', name: 'Sofía Marín', transmission: 'manual', plateNumber: '06',
    car: 'Five-door petrol hatchback, dual controls', areas: ['southmead', 'henleaze', 'westbury-on-trym'],
    languages: ['English', 'Spanish'], specialties: ['Dyslexia-friendly teaching', 'Visual route plans'],
    yearsTeaching: 6, availability: 'taking-pupils',
    packageIds: ['taster-hour', 'pay-as-you-go', 'starter-ten', 'steady-twenty', 'test-morning'],
    quote: 'I draw every route first, so there are no surprises.',
  },
];

export const instructorAvailability = {
  'taking-pupils': 'Taking pupils', waitlist: 'Waitlist', full: 'Full',
} as const;

export const initials = (name: string) => name.split(/\s+/).map(word => Array.from(word)[0]).join('');
