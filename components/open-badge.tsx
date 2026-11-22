'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';
import { RoadIcon } from './road-art';

/** Status is calculated only in the browser; the weekly table remains in the static HTML. */
export function OpenBadge({ hours }: { hours: readonly OpeningHours[] }) {
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (!site.timeZone) return;
    const update = () => setLabel(openingLabel(hours, site.timeZone, new Date(), 'Phones'));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);
  return <span className="phone-status" role="status">{label && <><RoadIcon name="clock"/>{label}</>}</span>;
}
