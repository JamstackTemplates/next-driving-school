'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { isContactRoute } from '../lib/paths';
import { LPlate } from './road-art';
import { SiteLink } from './site-link';

const navigation = [
  ['/lessons/', 'Lessons'],
  ['/instructors/', 'Instructors'],
  ['/test-prep/', 'Test prep'],
  ['/contact/', 'Contact'],
];

export function SiteHeader() {
  const pathname = usePathname();
  const disclosure = useRef<HTMLDetailsElement>(null);
  const close = () => { if (disclosure.current) disclosure.current.open = false; };
  const contact = !isContactRoute(pathname);

  function links() {
    return navigation.map(([href, label]) => <SiteLink key={href} href={href} markCurrent="page" onClick={close}>{label}</SiteLink>);
  }

  return <header className="site-header">
    <div className="header-wrap">
      <SiteLink className="wordmark" href="/" aria-label={`${business.name} home`} onClick={close}>
        <LPlate/><span>Green Light<small>Driving School</small></span>
      </SiteLink>
      <nav className="desktop-nav" aria-label="Main">{links()}</nav>
      <div className="header-tools">
        <DarkModeToggle/>
        {contact && <SiteLink className="button header-cta" href="/contact/">Ask about lessons</SiteLink>}
        <details ref={disclosure} className="mobile-nav" onKeyDown={event => {
          if (event.key === 'Escape') {
            close();
            disclosure.current?.querySelector('summary')?.focus();
          }
        }}>
          <summary>Menu <span aria-hidden="true">☰</span></summary>
          <nav aria-label="Main">{links()}{contact && <SiteLink href="/contact/" className="button" onClick={close}>Ask about lessons</SiteLink>}</nav>
        </details>
      </div>
    </div>
  </header>;
}
