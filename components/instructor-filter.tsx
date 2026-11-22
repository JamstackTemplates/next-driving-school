'use client';

import { useEffect, useState } from 'react';
import { areas, sides } from '../content/areas';
import type { Instructor } from '../content/instructors';
import type { Transmission } from '../content/lessons';
import { ChoiceSwitch } from './choice-switch';
import { InstructorProfile } from './instructor-badges';
import { SiteLink } from './site-link';

const options = [
  { value: 'all', label: 'All' },
  { value: 'manual', label: 'Manual', icon: 'manual' },
  { value: 'automatic', label: 'Automatic', icon: 'automatic' },
] as const;

export function InstructorFilter({ people }: { people: Instructor[] }) {
  const [enhanced, setEnhanced] = useState(false);
  const [area, setArea] = useState('');
  const [transmission, setTransmission] = useState<Transmission | 'all'>('all');
  useEffect(() => setEnhanced(true), []);
  const results = people.filter(person =>
    (!area || person.areas.includes(area)) && (transmission === 'all' || person.transmission === transmission));

  return <>
    {enhanced && <div className="filter-bar">
      <label className="area-select">Pick-up area
        <select value={area} onChange={event => setArea(event.target.value)}>
          <option value="">All areas</option>
          {Object.entries(sides).map(([side, label]) => <optgroup key={side} label={`${label} Bristol`}>
            {areas.filter(item => item.side === side).map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
          </optgroup>)}
        </select>
      </label>
      <ChoiceSwitch legend="Transmission" options={options} selected={transmission} onChange={setTransmission}/>
      <p role="status" aria-live="polite">{results.length} {results.length === 1 ? 'instructor' : 'instructors'}</p>
    </div>}
    <ul className="profiles">{results.map(person => <InstructorProfile key={person.id} instructor={person}/>)}</ul>
    {!results.length && <p className="mt-6">No instructor covers that area yet. <SiteLink className="text-link" href="/contact/">Ask anyway</SiteLink>.</p>}
  </>;
}
