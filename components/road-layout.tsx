import type { ReactNode } from 'react';
import { business, phoneHref, phoneHours } from '../content/business';
import { RoadIcon } from './road-art';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

type Copy = { children: ReactNode };
type SectionProps = Copy & { id?: string; className?: string };

export function RouteLine() {
  return <div className="route-line" aria-hidden="true"/>;
}

function Section({ children, id, className = '' }: SectionProps) {
  return <section id={id} className={`route-section ${className}`}><div className="route-wrap">{children}</div></section>;
}

function Heading({ children }: Copy) {
  return <h2 className="section-heading">{children}</h2>;
}

function Introduction({ children }: Copy) {
  return <p className="mt-3 max-w-[54ch] text-lg text-muted">{children}</p>;
}

function More({ href, children }: Copy & { href: string }) {
  return <SiteLink href={href} className="text-link mt-6 inline-block font-bold">{children}</SiteLink>;
}

export const RouteSection = Object.assign(Section, { Heading, Introduction, More });

export function ContactAction({ children }: Copy) {
  return <SiteLink href="/contact/" className="button">{children}</SiteLink>;
}

export function ContactLinks() {
  return <ul className="contact-links">
    <li><RoadIcon name="phone"/><a href={phoneHref}>{business.phone}</a></li>
    <li><RoadIcon name="email"/><a href={`mailto:${business.email}`}>{business.email}</a></li>
  </ul>;
}

export function PhoneStatus() {
  return <OpenBadge hours={phoneHours}/>;
}

export function PhoneHours() {
  const groups = phoneHours.reduce<{ days: string[]; opens?: string; closes?: string }[]>((rows, day) => {
    const previous = rows.at(-1);
    if (previous && previous.opens === day.opens && previous.closes === day.closes) {
      previous.days.push(day.day);
    } else {
      rows.push({ days: [day.day], opens: day.opens, closes: day.closes });
    }
    return rows;
  }, []);

  return <table className="hours-table">
    <caption className="sr-only">Weekly phone hours, Bristol local time</caption>
    <tbody>{groups.map(({ days, opens, closes }) => <tr key={days[0]}>
      <th scope="row">{days.length > 1 ? `${days[0]}–${days.at(-1)}` : days[0]}</th>
      <td>{opens && closes ? `${opens}–${closes}` : 'Closed'}</td>
    </tr>)}</tbody>
  </table>;
}

function ClosingBand({ children }: Copy) {
  return <section className="closing-band"><RouteLine/><div className="route-wrap closing-inner">{children}</div></section>;
}

function ClosingHeading({ children }: Copy) {
  return <h2 className="section-heading">{children}</h2>;
}

export const Closing = Object.assign(ClosingBand, { Heading: ClosingHeading, Contact: ContactAction, Details: ContactLinks });

export function JunctionSign({ number }: { number: number }) {
  return <span className="junction-sign" aria-hidden="true">{String(number).padStart(2, '0')}</span>;
}

function Steps({ children }: Copy) {
  return <ol className="route-steps">{children}</ol>;
}

function Step({ children }: Copy) {
  return <li>{children}</li>;
}

function StepTitle({ children }: Copy) {
  return <h3>{children}</h3>;
}

export const RouteSteps = Object.assign(Steps, { Step, Title: StepTitle });

export function Note({ children }: Copy) {
  return <p className="hand-note">{children}</p>;
}
