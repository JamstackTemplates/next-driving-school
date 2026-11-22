import { useId } from 'react';
import { RoadIcon } from './road-art';

export function ChoiceSwitch<T extends string>({ legend, options, selected, onChange }: {
  legend: string;
  options: readonly { value: T; label: string; icon?: string }[];
  selected: T;
  onChange: (choice: T) => void;
}) {
  const group = useId();
  return <fieldset className="choice-field">
    <legend>{legend}</legend>
    <div className="choice-switch">
      {options.map(({ value, label, icon }) => <label key={value}>
        <input className="sr-only" type="radio" name={group} checked={value === selected} onChange={() => onChange(value)}/>
        <span>{icon && <RoadIcon name={icon}/>} {label}</span>
      </label>)}
    </div>
  </fieldset>;
}
