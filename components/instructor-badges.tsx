import { areas } from '../content/areas';
import { initials, instructorAvailability, type Instructor } from '../content/instructors';
import { packages, pounds, priceFor, transmissions } from '../content/lessons';
import { RoadIcon, TrafficLight } from './road-art';
import { SiteLink } from './site-link';

const instructorLights = { 'taking-pupils': 'green', waitlist: 'amber', full: 'red' } as const;

export function Availability({ instructor }: { instructor: Instructor }) {
  return <span className={`instructor-availability availability-${instructor.availability}`}>
    <TrafficLight lit={instructorLights[instructor.availability]}/>{instructorAvailability[instructor.availability]}
  </span>;
}

export function WindscreenBadge({ instructor }: { instructor: Instructor }) {
  return <div className="windscreen-badge">
    <svg className="badge-art" viewBox="0 0 220 206" aria-hidden="true">
      <path className="badge-frame" d="M80 6h60q8 0 15 6l52 44q7 6 7 15v67q0 8-7 15l-51 44q-7 5-15 5H79q-8 0-15-5l-51-44q-7-6-7-15V71q0-9 7-15l52-44q7-6 15-6Z"/>
      <path className="badge-edge" d="M82 15h56q7 0 12 5l50 41q5 5 5 11v64q0 6-5 11l-50 42q-5 4-11 4H81q-6 0-11-4l-50-42q-5-5-5-11V72q0-6 5-11l50-41q5-5 12-5Z"/>
      <circle cx="110" cy="29" r="7" className="badge-hole"/>
      <path d="M25 70l47-37h20L25 88zM25 96l48-37 11 3-59 47z" className="badge-shine"/>
      <text x="110" y="114" className="badge-initials" textAnchor="middle">{initials(instructor.name)}</text>
      <path d="M57 144l3-11 11-3 9-9h33l12 11 12 4 3 8v9H57z" className="badge-car"/>
      <path d="M75 131l8-7h27l9 8H75z" className="badge-window"/>
      <circle cx="73" cy="153" r="6" className="badge-wheel"/><circle cx="123" cy="153" r="6" className="badge-wheel"/>
      <rect x="145" y="130" width="28" height="22" rx="3" className="badge-number-frame"/>
      <text x="159" y="146" className="badge-number" textAnchor="middle">{instructor.plateNumber}</text>
    </svg>
  </div>;
}

export function InstructorStrip({ people }: { people: Instructor[] }) {
  return <ul className="instructor-strip">{people.map(instructor => <li key={instructor.id}>
    <SiteLink className="instructor-preview" href={`/instructors/#${instructor.id}`}>
      <WindscreenBadge instructor={instructor}/>
      <h3>{instructor.name}</h3>
      <span className="preview-transmission"><RoadIcon name={instructor.transmission}/>{transmissions[instructor.transmission]}</span>
      <Availability instructor={instructor}/>
    </SiteLink>
  </li>)}</ul>;
}

export function InstructorProfile({ instructor }: { instructor: Instructor }) {
  return <li id={instructor.id} className="instructor-profile">
    <div className="profile-badge"><WindscreenBadge instructor={instructor}/><Availability instructor={instructor}/></div>
    <div className="profile-copy">
      <h3>{instructor.name} {instructor.pronouns && <span className="profile-pronouns">({instructor.pronouns})</span>}</h3>
      <p className="profile-car"><RoadIcon name={instructor.transmission}/>{transmissions[instructor.transmission]} · {instructor.car}</p>
      <ul className="area-tags" aria-label="Pick-up neighbourhoods">{instructor.areas.map(id =>
        <li key={id}>{areas.find(area => area.id === id)?.name}</li>)}</ul>
      <dl className="profile-details">
        <div><dt>Languages</dt><dd>{instructor.languages.join(', ')}</dd></div>
        <div><dt>Specialties</dt><dd>{instructor.specialties.join(' · ')}</dd></div>
        <div><dt>Teaching</dt><dd>{instructor.yearsTeaching} years</dd></div>
      </dl>
      <blockquote className="sticky-note">“{instructor.quote}”</blockquote>
      <details className="profile-packages">
        <summary>Packages with {instructor.name.split(' ')[0]}</summary>
        <ul>{packages.filter(lesson => instructor.packageIds.includes(lesson.id)).map(lesson => {
          const price = priceFor(lesson, instructor.transmission);
          return <li key={lesson.id}><SiteLink className="text-link" href={`/lessons/#${lesson.id}`}>{lesson.name}</SiteLink> {price !== null && <span>{pounds(price)}</span>}</li>;
        })}</ul>
      </details>
    </div>
  </li>;
}
