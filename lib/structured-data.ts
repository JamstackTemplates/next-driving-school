import { areas } from '../content/areas.ts';
import { business, phoneHours } from '../content/business.ts';
import { instructors, instructorAvailability } from '../content/instructors.ts';
import { packages, packageAvailability, priceFor, transmissions, type Transmission } from '../content/lessons.ts';
import { absoluteUrl } from './paths.ts';

export function businessStructuredData() {
  const url = absoluteUrl('/');
  const availability = { open: 'InStock', limited: 'LimitedAvailability', paused: 'OutOfStock' };
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'DrivingSchool'],
    name: business.name, description: business.description, email: business.email, telephone: business.phone,
    ...(url ? { url } : {}),
    areaServed: { '@type': 'City', name: business.area },
    openingHoursSpecification: phoneHours.flatMap(({ day, opens, closes }) => opens && closes ? [{
      '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day}`, opens, closes,
    }] : []),
    employee: instructors.map(instructor => ({
      '@type': 'Person', name: instructor.name, jobTitle: 'Driving instructor',
      description: `${transmissions[instructor.transmission]} · ${instructorAvailability[instructor.availability]}`,
      knowsLanguage: instructor.languages,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Driving lessons',
      itemListElement: packages.map(lesson => ({
        '@type': 'OfferCatalog', name: lesson.name,
        itemListElement: (Object.keys(transmissions) as Transmission[]).flatMap(transmission => {
          const price = priceFor(lesson, transmission);
          if (price === null) return [];
          return [{
            '@type': 'Offer', name: `${lesson.name} — ${transmissions[transmission]}`,
            price, priceCurrency: 'GBP', availability: `https://schema.org/${availability[lesson.availability]}`,
            description: packageAvailability[lesson.availability],
            itemOffered: {
              '@type': 'Service', name: `${transmissions[transmission]} driving lessons`, description: lesson.bestFor,
              provider: instructors.filter(instructor => instructor.transmission === transmission && instructor.packageIds.includes(lesson.id))
                .map(instructor => ({
                  '@type': 'Person', name: instructor.name,
                  workLocation: areas.filter(area => instructor.areas.includes(area.id)).map(area => ({ '@type': 'Place', name: area.name })),
                })),
            },
          }];
        }),
      })),
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
