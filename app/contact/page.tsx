import { business } from '../../content/business';
import { CopyEmail } from '../../components/copy-email';
import { Coverage } from '../../components/coverage';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { LessonLog } from '../../components/road-art';
import { ContactLinks, PhoneHours, PhoneStatus, RouteSection } from '../../components/road-layout';
import { pageMetadata } from '../../lib/page-metadata';
import { site } from '../../lib/site';

export const metadata = pageMetadata('/contact/', 'Contact', 'Ask Green Light Driving School about manual or automatic lessons, instructors, waitlists or a Test Morning warm-up in Bristol.');

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead colour="brown">
      <PageHead.Heading>Ask about lessons</PageHead.Heading>
      <PageHead.Introduction>Tell us what you’d like to practise and where you’d like us to pick you up.</PageHead.Introduction>
    </PageHead>

    <RouteSection className="contact-section">
      <div className="contact-columns">
        <section className="clipboard">
          <h2>Lesson enquiries</h2>
          <p className="mt-2">Ask about a Taster Hour, a lesson package, a particular instructor, joining a waitlist or using a car on test day.</p>
          <div className="my-5">
            {hosted
              ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email}/>
              : <p><a className="button" href={`mailto:${business.email}`}>Email your enquiry</a></p>}
          </div>
          <p>Your instructor will reply to agree a time and payment. Lessons are arranged only when an instructor confirms by reply. We take no payments, deposits or card details on this site.</p>
        </section>

        <div>
          <LessonLog>
            <h2>What to put in your message</h2>
            <ul className="log-list">
              <li>Your pick-up area or postcode district</li>
              <li>Manual or automatic</li>
              <li>The package or instructor you’re interested in</li>
              <li>Days and times that usually suit you</li>
              <li>Whether you hold a provisional licence and have passed your theory test</li>
              <li>Your practical test date, if you have one</li>
              <li>A phone number if you’d prefer a call back</li>
            </ul>
          </LessonLog>
          <section className="contact-details">
            <h2>Phone and email</h2>
            <ContactLinks/>
            <CopyEmail email={business.email}/>
            <h3 className="mt-5 text-xl">Phone hours in Bristol</h3>
            <PhoneHours/>
            <PhoneStatus/>
          </section>
        </div>
      </div>
    </RouteSection>

    <RouteSection className="pavement contact-coverage">
      <RouteSection.Heading>Where we pick up</RouteSection.Heading>
      <RouteSection.Introduction>We pick up at homes, schools and workplaces across Bristol.</RouteSection.Introduction>
      <Coverage compact/>
    </RouteSection>
  </>;
}
