import { DAYS, type OpeningHours } from '../lib/hours.ts';

/** Shared identity and contact details. Also rename marketing metadata in site.config.json. */
export const business = {
  name: 'Green Light Driving School',
  email: 'hello@next-driving-school.jamstacks.net',
  phone: '0117 496 0742',
  area: 'Bristol',
  description: 'Friendly L-plate driving lessons across Bristol. Manual and automatic packages, patient instructors and a step-by-step guide to passing your practical test.',
};

export const phoneHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

/** Same-day phone hours in the time zone set in site.config.json. Missing times mean closed. */
export const phoneHours: OpeningHours[] = DAYS.map(day => {
  if (day === 'Sunday') return { day };
  if (day === 'Saturday') return { day, opens: '09:00', closes: '15:00' };
  return { day, opens: '08:00', closes: '19:00' };
});
