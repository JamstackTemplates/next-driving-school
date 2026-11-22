import type { ReactNode } from 'react';
import { asset } from '../lib/paths';
import { LPlate } from './road-art';
import { ContactAction, PhoneStatus, RouteLine } from './road-layout';
import { SiteLink } from './site-link';

type Copy = { children: ReactNode };

function HeroLayout({ children }: Copy) {
  return <section className="home-hero">
    <div className="hero-art" aria-hidden="true">
      <img className="hero-image hero-image-light" src={asset('/hero-light.webp')} alt="" width={1440} height={1161} fetchPriority="high" decoding="async"/>
      <img className="hero-image hero-image-dark" src={asset('/hero-dark.webp')} alt="" width={1440} height={1161} fetchPriority="high" decoding="async"/>
    </div>
    <div className="hero-content">{children}</div>
    <RouteLine/>
  </section>;
}

function Eyebrow({ children }: Copy) {
  return <p className="hero-eyebrow"><LPlate className="hero-eyebrow-plate"/><span>{children}</span></p>;
}

function Heading({ children }: Copy) {
  return <h1>{children}</h1>;
}

function Introduction({ children }: Copy) {
  return <p className="hero-introduction">{children}</p>;
}

function Actions({ children }: Copy) {
  return <div className="flex flex-wrap gap-2.5 sm:gap-3">{children}</div>;
}

function Packages({ children }: Copy) {
  return <SiteLink href="/#packages" className="button button-quiet">{children}</SiteLink>;
}

export const Hero = Object.assign(HeroLayout, {
  Eyebrow, Heading, Introduction, Actions, Contact: ContactAction, Packages, Status: PhoneStatus,
});
