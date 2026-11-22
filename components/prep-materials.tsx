import { faults, questions, testDayChecklist } from '../content/test-prep';
import { LessonLog } from './road-art';

export function PracticeQuestions() {
  return <ol className="question-sheet">{questions.map(({ id, kind, question, hint }) => <li key={id}>
    <details>
      <summary><span>{kind === 'show' ? 'Show me' : 'Tell me'}</span>{question}</summary>
      <p>{hint}</p>
    </details>
  </li>)}</ol>;
}

export function FaultSheet() {
  return <ul className="fault-sheet">{faults.map(({ id, title, fix }) => <li key={id}>
    <span className="fault-tally" aria-hidden="true">✓</span><div><h3>{title}</h3><p>{fix}</p></div>
  </li>)}</ul>;
}

export function TestDayLog({ children }: { children: React.ReactNode }) {
  return <LessonLog>{children}<ul className="test-day-list">{testDayChecklist.map(item => <li key={item}>
    <label><input type="checkbox"/>{item}</label>
  </li>)}</ul></LessonLog>;
}
