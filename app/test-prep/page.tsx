import { PageHead } from '../../components/page-head';
import { FaultSheet, PracticeQuestions, TestDayLog } from '../../components/prep-materials';
import { ReadinessProvider, ReadinessRoute, ReadinessSummary } from '../../components/readiness-route';
import { ContactAction, RouteSection } from '../../components/road-layout';
import { SiteLink } from '../../components/site-link';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata = pageMetadata('/test-prep/', 'Test prep', 'A free Bristol learner-driver guide with eight practical stages, vehicle safety questions, fault fixes and a test-day checklist.');

export default function TestPrepPage() {
  return <ReadinessProvider>
    <PageHead colour="blue">
      <PageHead.Heading>From L-plates to the pass</PageHead.Heading>
      <PageHead.Introduction>Eight stages to practise, from your provisional licence to test day.</PageHead.Introduction>
      <ReadinessSummary/>
    </PageHead>

    <RouteSection className="stage-section">
      <RouteSection.Heading>The route</RouteSection.Heading>
      <RouteSection.Introduction>Use the self-checks to see what to practise next. Lesson hours are a guide. Your choices stay in this browser.</RouteSection.Introduction>
      <ReadinessRoute/>
    </RouteSection>

    <RouteSection className="pavement questions-section">
      <RouteSection.Heading>Show me, tell me</RouteSection.Heading>
      <RouteSection.Introduction>Try answering each practice question before you open the hint.</RouteSection.Introduction>
      <PracticeQuestions/>
      <p className="mt-5"><a className="text-link" href="https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions">See the full DVSA question list</a></p>
    </RouteSection>

    <RouteSection>
      <RouteSection.Heading>The faults that cost passes</RouteSection.Heading>
      <FaultSheet/>
    </RouteSection>

    <RouteSection className="pavement">
      <TestDayLog><RouteSection.Heading>Test-day checklist</RouteSection.Heading></TestDayLog>
      <p className="mt-6 max-w-[65ch]">Rules can change. Before you book your test, <a className="text-link" href="https://www.gov.uk/driving-test">check the current driving test requirements on GOV.UK</a>. Follow the arrival instructions for your appointment.</p>
    </RouteSection>

    <RouteSection className="test-morning-band">
      <div className="sign-face sign-brown">
        <RouteSection.Heading>Test Morning</RouteSection.Heading>
        <RouteSection.Introduction>Already have a test date? Ask about an hour’s warm-up on local roads and using your instructor’s car for the test.</RouteSection.Introduction>
        <div className="mt-6 flex flex-wrap gap-3">
          <ContactAction>Ask about lessons</ContactAction>
          <SiteLink className="button button-quiet" href="/lessons/#test-morning">See Test Morning prices</SiteLink>
        </div>
      </div>
    </RouteSection>
  </ReadinessProvider>;
}
