import { business } from '../content/business';
import { TestCentreSigns } from './coverage';
import { LPlate } from './road-art';
import { ContactLinks, PhoneHours, PhoneStatus } from './road-layout';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="route-wrap footer-layout">
      <div>
        <SiteLink className="wordmark" href="/" aria-label={`${business.name} home`}><LPlate/><span>Green Light<small>Driving School</small></span></SiteLink>
        <ContactLinks/>
      </div>
      <div><h2>Phone hours</h2><PhoneHours/><PhoneStatus/></div>
      <div><h2>Bristol test centres</h2><TestCentreSigns/><p className="hand-note">Drive safely!</p></div>
      <p className="demo-note">Green Light is a fictitious driving school for the <a href="https://jamstacks.net">Jamstacks</a> gallery.</p>
    </div>
  </footer>;
}
