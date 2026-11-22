'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { stages } from '../content/test-prep';
import { loadRatings, saveRatings, summaryLight, type Ratings, type Readiness } from '../lib/readiness';
import { TrafficLight } from './road-art';
import { JunctionSign } from './road-layout';

const choices = { red: 'Not yet', amber: 'Getting there', green: 'Ready' } as const;
const colours = Object.keys(choices) as Readiness[];
const ReadinessContext = createContext<{ ratings: Ratings; enhanced: boolean; choose: (id: string, value: Readiness) => void }>({
  ratings: {}, enhanced: false, choose: () => {},
});

export function ReadinessProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings] = useState<Ratings>({});
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    try { setRatings(loadRatings(window.localStorage)); } catch { /* Browser storage may be blocked. */ }
    setEnhanced(true);
  }, []);

  function choose(id: string, value: Readiness) {
    const next = { ...ratings, [id]: value };
    setRatings(next);
    try { saveRatings(window.localStorage, next); } catch { /* Keep in-memory choices. */ }
  }

  return <ReadinessContext.Provider value={{ ratings, enhanced, choose }}>{children}</ReadinessContext.Provider>;
}

export function ReadinessSummary() {
  const { ratings, enhanced } = useContext(ReadinessContext);
  const lit = enhanced ? summaryLight(ratings) : undefined;
  return <aside className="readiness-summary print-hide" aria-label="Overall readiness">
    <TrafficLight size="lg" lit={lit}/>
    <p role="status"><span>Your readiness</span>{lit && <strong>{choices[lit]}</strong>}</p>
  </aside>;
}

function StageCheck({ id, title }: { id: string; title: string }) {
  const { ratings, choose } = useContext(ReadinessContext);
  return <fieldset className="stage-check print-hide">
    <legend>Your self-check<span className="sr-only"> for {title}</span></legend>
    <div className="stage-options">
      {colours.map(value => <label key={value} className={`stage-option stage-${value}`}>
        <input type="radio" name={`readiness-${id}`} value={value}
          checked={ratings[id] === value} onChange={() => choose(id, value)}/>
        <span>{choices[value]}</span>
      </label>)}
    </div>
  </fieldset>;
}

export function ReadinessRoute() {
  return <ol className="stage-route">{stages.map(stage => <li id={stage.id} key={stage.id}>
    <JunctionSign number={stage.junction}/>
    <div className="stage-copy">
      <p className="stage-time">{stage.typicalHours}</p>
      <h3>{stage.title}</h3>
      <p>{stage.summary}</p>
      <ul className="log-list">{stage.checklist.map(item => <li key={item}>{item}</li>)}</ul>
      <StageCheck id={stage.id} title={stage.title}/>
    </div>
  </li>)}</ol>;
}
