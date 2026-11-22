import { areas, sides, testCentres, type Side } from '../content/areas';
import { initials, instructors } from '../content/instructors';
import { RoadIcon } from './road-art';
import { SiteLink } from './site-link';

export function TestCentreSigns() {
  return <ul className="centre-signs" aria-label="Practical test centres">
    {testCentres.map(centre => <li key={centre.id}><RoadIcon name="pin"/>{centre.name}</li>)}
  </ul>;
}

export function Coverage({ compact = false }: { compact?: boolean }) {
  if (compact) return <ul className="area-tags">{areas.map(area => <li key={area.id}>{area.name}</li>)}</ul>;

  return <div className="coverage-map">
    <svg className="coverage-art" viewBox="0 0 900 410" preserveAspectRatio="none" aria-hidden="true" fill="none">
      <path d="M-43 316q145 104 275-60t289-24q132 145 406-80" stroke="var(--river)" strokeWidth="34"/>
      <path d="M171-12Q294 113 453 159t254 257M-25 125q206 30 333 41t615-46M466-30q-19 119 11 224 28 94-91 228" stroke="var(--map-road)" strokeWidth="9"/>
      <path d="M171-12Q294 113 453 159t254 257M-25 125q206 30 333 41t615-46M466-30q-19 119 11 224 28 94-91 228" stroke="var(--marking)" strokeWidth="2" strokeDasharray="11 9"/>
      <path d="M813 86v-40m-10 12 10-12 10 12" stroke="var(--text)" strokeWidth="2"/>
      <text x="813" y="37" textAnchor="middle" fill="var(--text)" fontSize="15">N</text>
    </svg>
    {(Object.entries(sides) as [Side, string][]).map(([side, label]) => <section className={`coverage-cluster coverage-${side}`} key={side}>
      <h3>{label} Bristol</h3>
      {instructors.map(person => {
        const neighbourhoods = areas.filter(area => area.side === side && person.areas.includes(area.id));
        if (!neighbourhoods.length) return null;
        return <div key={person.id} className="coverage-person">
          <SiteLink href={`/instructors/#${person.id}`} aria-label={person.name} title={person.name}>{initials(person.name)}</SiteLink>
          <ul className="area-tags">{neighbourhoods.map(area => <li key={area.id}>{area.name}</li>)}</ul>
        </div>;
      })}
    </section>)}
  </div>;
}
