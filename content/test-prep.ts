export interface Stage {
  /** Stable storage and anchor ID; junctions must be numbered 1–8. */
  id: string;
  junction: number;
  title: string;
  summary: string;
  checklist: string[];
  /** Guidance for planning, rather than a promise of time to learn. */
  typicalHours: string;
}

export const stages: Stage[] = [
  {
    id: 'provisional-licence', junction: 1, title: 'Get your provisional licence',
    summary: 'Apply on GOV.UK from age 15 years and 9 months. Most learners can start driving a car at 17.',
    checklist: ['Apply for your provisional licence', 'Check you can read a number plate from 20 metres', 'Choose manual or automatic', 'Send us an enquiry'],
    typicalHours: 'Before lesson one',
  },
  {
    id: 'controls-and-moving-off', junction: 2, title: 'Controls, moving off and stopping',
    summary: 'Start somewhere quiet so you can get to know the car and practise moving away and stopping without feeling rushed.',
    checklist: ['Run through the cockpit drill', 'Practise mirrors, signal, manoeuvre', 'Find the clutch bite or get used to automatic creep', 'Stop smoothly at the kerb'],
    typicalHours: '2–4 hours',
  },
  {
    id: 'junctions-and-roundabouts', junction: 3, title: 'Junctions and roundabouts',
    summary: 'Work from quiet side roads up to busier junctions. Practise judging safe gaps and choosing the right lane early.',
    checklist: ['Emerge left and right', 'Cross and turn at crossroads', 'Try mini-roundabouts', 'Practise multi-lane roundabouts'],
    typicalHours: '6–10 hours',
  },
  {
    id: 'theory-test', junction: 4, title: 'Theory test',
    summary: 'Think about booking your theory test once junctions feel familiar. The pass certificate lasts two years.',
    checklist: ['Practise multiple-choice questions', 'Try hazard perception clips', 'Book online yourself', 'Bring your licence'],
    typicalHours: 'Study alongside lessons',
  },
  {
    id: 'manoeuvres', junction: 5, title: 'Manoeuvres',
    summary: 'Learn to move the car slowly and accurately while keeping an eye on people and traffic around you.',
    checklist: ['Parallel park', 'Park forwards and in reverse in a bay', 'Pull up on the right and reverse', 'Practise an emergency stop with your instructor'],
    typicalHours: '4–6 hours',
  },
  {
    id: 'independent-driving', junction: 6, title: 'Independent driving',
    summary: 'Follow directions while making your own decisions about speed and position. A wrong turn is a chance to practise getting back on route calmly.',
    checklist: ['Follow sat-nav directions', 'Follow road signs', 'Recover calmly from a wrong turn', 'Practise joining and leaving dual carriageways'],
    typicalHours: '4–6 hours',
  },
  {
    id: 'mock-tests', junction: 7, title: 'Mock tests',
    summary: 'See how you drive without prompts on roads like the ones around your test centre. Use the marking sheet to choose what to practise next.',
    checklist: ['Drive a full mock around your test centre', 'Review the marking sheet', 'Work on the two faults that matter most', 'Repeat until you can drive consistently'],
    typicalHours: '2–4 hours',
  },
  {
    id: 'test-day', junction: 8, title: 'Test day',
    summary: 'Give yourself time for a familiar drive before the test so you arrive settled and ready.',
    checklist: ['Pack your provisional licence', 'Have your theory pass details handy', 'Take a warm-up drive', 'Allow a ten-minute buffer for the journey and follow your arrival instructions'],
    typicalHours: 'Test Morning package',
  },
];

interface PracticeQuestion {
  id: string;
  kind: 'show' | 'tell';
  question: string;
  hint: string;
}

/** Paraphrased practice prompts and hints based on the GOV.UK vehicle safety questions. */
export const questions: PracticeQuestion[] = [
  { id: 'brake-lights', kind: 'tell', question: 'How would you check the brake lights?', hint: 'Press the brake pedal and look for the lights reflected behind the car, or ask someone to check for you.' },
  { id: 'tyre-tread', kind: 'tell', question: 'How would you check the tyre tread?', hint: 'Look for cuts and bulges, and check for at least 1.6 mm of tread across the middle three quarters of the tyre, all the way round.' },
  { id: 'headlights-and-tail-lights', kind: 'tell', question: 'How would you check the headlights and tail lights?', hint: 'Explain which switch you would use and how you would walk around the car to check the lights.' },
  { id: 'power-steering', kind: 'tell', question: 'How would you check the power steering?', hint: 'Gently load the wheel as the engine starts. You should feel the steering assistance come in.' },
  { id: 'front-demister', kind: 'show', question: 'How would you demist the front windscreen?', hint: 'Know the windscreen demist setting and how to direct air to the glass in your car.' },
  { id: 'front-washer', kind: 'show', question: 'How would you wash and clean the front windscreen?', hint: 'Find the front washer control. Practise using it safely while keeping your attention on the road.' },
  { id: 'dipped-headlights', kind: 'show', question: 'How would you switch on dipped headlights?', hint: 'Find the dipped-beam setting before setting off so you can operate it without hunting for it.' },
  { id: 'rear-demister', kind: 'show', question: 'How would you demist the rear window?', hint: 'Find the heated rear-window button, usually marked with a rectangular window symbol.' },
  { id: 'side-window', kind: 'show', question: 'How would you open and close the side window?', hint: 'Know which control operates your window and practise using it when it is safe.' },
  { id: 'oil-level', kind: 'tell', question: 'How would you check the engine oil level?', hint: 'Identify the dipstick or level indicator under the bonnet and explain how to check against the minimum and maximum marks.' },
];

export const faults = [
  { id: 'mirrors', title: 'Missing a mirror check before changing speed', fix: 'Check the relevant mirrors early so you know who is following before you slow down.' },
  { id: 'hesitation', title: 'Hesitating at junctions', fix: 'Look both ways early and move when you have a safe gap and a clear exit.' },
  { id: 'traffic-lights', title: 'Responding late to traffic lights', fix: 'Scan ahead and allow time to stop smoothly before the line.' },
  { id: 'signals', title: 'Signalling too late', fix: 'Check your mirrors and signal in time for others to respond.' },
  { id: 'roundabout-position', title: 'Poor positioning on roundabouts', fix: 'Read the signs and road markings and choose your lane before entering.' },
  { id: 'moving-off', title: 'Moving off without a proper check', fix: 'Check your mirrors and blind spots just before pulling out.' },
];

export const testDayChecklist = [
  'Provisional licence card', 'Theory test pass number', 'Glasses or contacts if needed',
  'Water and a snack', 'A warm-up drive', 'Ten minutes’ travel buffer',
];
