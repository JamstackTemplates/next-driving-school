import type { ReactNode } from 'react';
import { RoadArrow } from './road-art';
import { RouteLine } from './road-layout';

function PageBanner({ children, colour }: { children: ReactNode; colour: 'green' | 'white' | 'blue' | 'brown' }) {
  return <header className={`page-banner sign-${colour}`}>
    <div className="route-wrap"><div className="page-banner-face sign-face">{children}<RoadArrow className="page-banner-arrow"/></div></div>
    <RouteLine/>
  </header>;
}

function Heading({ children }: { children: ReactNode }) {
  return <h1>{children}</h1>;
}

function Introduction({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export const PageHead = Object.assign(PageBanner, { Heading, Introduction });
