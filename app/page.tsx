import { Coverage, TestCentreSigns } from '../components/coverage';
import { Hero } from '../components/hero';
import { InstructorStrip } from '../components/instructor-badges';
import { PackageSignpost } from '../components/package-signpost';
import { PrepRoad } from '../components/prep-road';
import { LessonLog } from '../components/road-art';
import { Closing, Note, RouteSection, RouteSteps } from '../components/road-layout';
import { business } from '../content/business';
import { instructors } from '../content/instructors';
import { packages } from '../content/lessons';
import { pageMetadata } from '../lib/page-metadata';
import { businessStructuredData, jsonLd } from '../lib/structured-data';
import { validateContent } from '../lib/validate-content';

export const metadata = pageMetadata('/', business.name, business.description);

export default function HomePage() {
  validateContent();
  return <>
    <Hero>
      <Hero.Eyebrow>Bristol · Manual &amp; Automatic · Dual Controls</Hero.Eyebrow>
      <Hero.Heading>Calm lessons.<br/> Clear progress.<br/> <span className="hero-finish"><em>Green light</em> on test day.</span></Hero.Heading>
      <Hero.Introduction>Patient, fully qualified instructors across Bristol, in manual or automatic cars, from your first hour behind the wheel to the morning of your test.</Hero.Introduction>
      <Hero.Actions><Hero.Contact>Ask about lessons</Hero.Contact><Hero.Packages>See packages</Hero.Packages></Hero.Actions>
      <Hero.Status/>
    </Hero>

    <RouteSection id="packages" className="pavement home-packages">
      <div className="section-sidecopy">
        <RouteSection.Heading>Pick your route</RouteSection.Heading>
        <RouteSection.Introduction>Try an hour behind the wheel or build up to your test with a block of lessons. Pick manual or automatic to see the prices.</RouteSection.Introduction>
        <RouteSection.More href="/lessons/">See all lesson packages</RouteSection.More>
      </div>
      <PackageSignpost lessons={packages.filter(lesson => lesson.featured)} compact/>
    </RouteSection>

    <RouteSection className="first-lesson">
      <div>
        <RouteSection.Heading>Your first lesson, mile by mile</RouteSection.Heading>
        <RouteSteps>
          <RouteSteps.Step><RouteSteps.Title>We pick you up</RouteSteps.Title><p>Meet beside the car at home, school or work. We’ll talk through what you’d like to get from the lesson.</p></RouteSteps.Step>
          <RouteSteps.Step><RouteSteps.Title>Get to know the controls</RouteSteps.Title><p>Start on quiet roads. Adjust your seat and mirrors, then try moving off and stopping at your pace.</p></RouteSteps.Step>
          <RouteSteps.Step><RouteSteps.Title>Take home your lesson log</RouteSteps.Title><p>We write down what went well and one thing to practise. The log is yours to keep.</p></RouteSteps.Step>
        </RouteSteps>
      </div>
      <LessonLog>
        <p className="log-title">First lesson</p>
        <ul className="log-list"><li>Seat &amp; mirrors set</li><li>Moved off smoothly</li><li>Stopped at the kerb</li></ul>
        <Note>Next time: quiet junctions</Note>
      </LessonLog>
    </RouteSection>

    <RouteSection className="instructors-home">
      <RouteSection.Heading>Meet the instructors</RouteSection.Heading>
      <RouteSection.Introduction>Five Bristol instructors, each with their own patch and teaching style.</RouteSection.Introduction>
      <InstructorStrip people={instructors}/>
      <RouteSection.More href="/instructors/">Find an instructor</RouteSection.More>
    </RouteSection>

    <RouteSection className="prep-band">
      <RouteSection.Heading>From L-plates to the pass</RouteSection.Heading>
      <RouteSection.Introduction>Eight stages from applying for your provisional licence to warming up for your test.</RouteSection.Introduction>
      <PrepRoad/>
      <RouteSection.More href="/test-prep/">Read the test-prep guide</RouteSection.More>
    </RouteSection>

    <RouteSection className="pickup-home">
      <RouteSection.Heading>Where we pick up</RouteSection.Heading>
      <RouteSection.Introduction>Meet your instructor at home, school or work across Bristol. Follow their initials to see who covers your neighbourhood.</RouteSection.Introduction>
      <Coverage/>
      <h3 className="mt-6 text-2xl">Test centres we practise around</h3>
      <TestCentreSigns/>
    </RouteSection>

    <Closing><Closing.Heading>Ready when you are</Closing.Heading><Closing.Contact>Ask about lessons</Closing.Contact><Closing.Details/></Closing>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}/>
  </>;
}
