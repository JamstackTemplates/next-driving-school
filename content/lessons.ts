export const hourlyRates = { manual: 42, automatic: 45 };
export type Transmission = keyof typeof hourlyRates;

export interface LessonPackage {
  /** Stable URL-safe ID used by instructor profiles and package links. */
  id: string;
  name: string;
  hours: number;
  /** Whole pounds. Null means the package is unavailable in this transmission. */
  priceManual: number | null;
  priceAutomatic: number | null;
  availability: 'open' | 'limited' | 'paused';
  /** Exactly four packages are displayed on the home page. */
  featured: boolean;
  bestFor: string;
  includes: string[];
  signColour: 'green' | 'blue' | 'white' | 'brown';
}

export const packages: LessonPackage[] = [
  {
    id: 'taster-hour', name: 'Taster Hour', hours: 1, priceManual: 35, priceAutomatic: 38,
    availability: 'open', featured: true, signColour: 'white',
    bestFor: 'First-timers who want to try it before committing',
    includes: ['Pick-up', 'Quiet car park start', 'Controls walkthrough', 'Once per new pupil'],
  },
  {
    id: 'pay-as-you-go', name: 'Pay as You Go', hours: 2, priceManual: 84, priceAutomatic: 90,
    availability: 'open', featured: false, signColour: 'white',
    bestFor: 'Learners who want flexible single lessons',
    includes: ['Two-hour lesson', 'Pick-up and drop-off', 'Lesson log entry'],
  },
  {
    id: 'starter-ten', name: 'Starter Ten', hours: 10, priceManual: 400, priceAutomatic: 430,
    availability: 'open', featured: true, signColour: 'green',
    bestFor: 'Complete beginners',
    includes: ['Ten hours in two-hour lessons', 'Progress check at five hours', 'Lesson log'],
  },
  {
    id: 'steady-twenty', name: 'Steady Twenty', hours: 20, priceManual: 780, priceAutomatic: 840,
    availability: 'open', featured: true, signColour: 'green',
    bestFor: 'Most learners heading towards a test',
    includes: ['Twenty hours', 'Two progress checks', 'One full mock test'],
  },
  {
    id: 'fast-lane-intensive', name: 'Fast Lane Intensive', hours: 30, priceManual: 1170, priceAutomatic: 1260,
    availability: 'limited', featured: true, signColour: 'blue',
    bestFor: 'Learners with some experience and a theory pass',
    includes: ['Thirty hours over two to three weeks', 'Two mock tests', 'Test-route practice'],
  },
  {
    id: 'test-morning', name: 'Test Morning', hours: 2, priceManual: 80, priceAutomatic: 86,
    availability: 'open', featured: false, signColour: 'brown',
    bestFor: 'Learners who already have a practical test date',
    includes: ['One-hour warm-up on local roads', 'Use of the instructor’s car for the test'],
  },
  {
    id: 'confidence-refresher', name: 'Confidence Refresher', hours: 3, priceManual: 120, priceAutomatic: 129,
    availability: 'open', featured: false, signColour: 'white',
    bestFor: 'Returning or nervous qualified drivers',
    includes: ['Three hours at your pace', 'Motorway or city focus on request'],
  },
  {
    id: 'pass-plus-motorway', name: 'Motorway & Pass Plus', hours: 6, priceManual: 240, priceAutomatic: 258,
    availability: 'paused', featured: false, signColour: 'blue',
    bestFor: 'New full-licence holders',
    includes: ['Six hours covering motorways, night driving, rural roads and all weathers'],
  },
];

export const transmissions = { manual: 'Manual', automatic: 'Automatic' } as const;
export const packageAvailability = { open: 'Available', limited: 'Limited spaces', paused: 'Paused for now' } as const;
export const priceFor = (lesson: LessonPackage, transmission: Transmission) =>
  transmission === 'manual' ? lesson.priceManual : lesson.priceAutomatic;
export const pounds = (price: number) => `£${price.toLocaleString('en-GB')}`;

export function visiblePackages(lessons: readonly LessonPackage[], transmission?: Transmission) {
  return transmission ? lessons.filter(lesson => priceFor(lesson, transmission) !== null) : lessons;
}
