'use client';

import { useEffect, useState } from 'react';
import { packageAvailability, pounds, priceFor, transmissions, visiblePackages, type LessonPackage, type Transmission } from '../content/lessons';
import { ChoiceSwitch } from './choice-switch';
import { LPlate, RoadArrow } from './road-art';
import { SiteLink } from './site-link';

const options = (Object.entries(transmissions) as [Transmission, string][]).map(([value, label]) => ({ value, label, icon: value }));

function Sign({ lesson, selected, compact }: { lesson: LessonPackage; selected?: Transmission; compact: boolean }) {
  const prices = options.flatMap(({ value, label }) => {
    const price = priceFor(lesson, value);
    return price === null ? [] : [{ value, label, price: pounds(price) }];
  });

  const face = <>
    <div className="sign-layout">
      <div className="sign-name"><h3>{lesson.name}</h3><span>{lesson.hours} {lesson.hours === 1 ? 'hour' : 'hours'}</span></div>
      <div className="sign-prices">
        {prices.map(({ value, label, price }) => <span key={value} className="sign-price"
          data-filtered-out={(selected && selected !== value) || undefined}>
          <span className={selected ? 'sr-only' : 'price-label'}>{label} </span><strong>{price}</strong>
        </span>)}
      </div>
      <RoadArrow className="sign-arrow"/>
    </div>
    {!compact && <div className="sign-detail">
      <p>{lesson.bestFor}</p>
      <ul>{lesson.includes.map(item => <li key={item}><LPlate className="package-bullet"/>{item}</li>)}</ul>
    </div>}
  </>;

  return <li id={compact ? undefined : lesson.id} data-filtered-out={(selected && priceFor(lesson, selected) === null) || undefined}
    className={`package-sign sign-${lesson.signColour}`}>
    {compact
      ? <SiteLink href={`/lessons/#${lesson.id}`} className="sign-face sign-link">{face}</SiteLink>
      : <div className="sign-face">{face}</div>}
    {(!compact || lesson.availability !== 'open') && <span className={`sign-status status-${lesson.availability}`}>
      {packageAvailability[lesson.availability]}
    </span>}
  </li>;
}

export function PackageSignpost({ lessons, compact = false }: { lessons: LessonPackage[]; compact?: boolean }) {
  const [selected, setSelected] = useState<Transmission>();
  useEffect(() => {
    const target = compact ? undefined : lessons.find(lesson => `#${lesson.id}` === window.location.hash);
    setSelected(target?.priceManual === null ? 'automatic' : 'manual');
  }, [compact, lessons]);

  return <div className="package-display">
    {selected && <ChoiceSwitch legend="Transmission" options={options} selected={selected} onChange={setSelected}/>}
    <ul className={`signpost${compact ? ' signpost-compact' : ''}`}>
      {lessons.map(lesson => <Sign key={lesson.id} lesson={lesson} selected={selected} compact={compact}/>)}
    </ul>
    {selected && !visiblePackages(lessons, selected).length && <p role="status">No packages for this transmission right now.</p>}
  </div>;
}
