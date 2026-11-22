import { stages } from '../content/test-prep';
import { JunctionSign } from './road-layout';
import { SiteLink } from './site-link';

export function PrepRoad() {
  return <div className="prep-road">
    <svg viewBox="0 0 1000 270" preserveAspectRatio="none" aria-hidden="true" fill="none">
      <path d="M-20 74Q180 176 333 99T620 66T1010 180" stroke="var(--kerb-scene)" strokeWidth="29"/>
      <path d="M-20 74Q180 176 333 99T620 66T1010 180" stroke="var(--road-scene)" strokeWidth="24"/>
      <path d="M-20 74Q180 176 333 99T620 66T1010 180" stroke="var(--marking)" strokeWidth="2.5" strokeDasharray="12 10"/>
    </svg>
    <ol>{stages.map(stage => <li key={stage.id}>
      <SiteLink href={`/test-prep/#${stage.id}`}><JunctionSign number={stage.junction}/><span>{stage.title}</span></SiteLink>
    </li>)}</ol>
  </div>;
}
