import { PackageSignpost } from '../../components/package-signpost';
import { PageHead } from '../../components/page-head';
import { Dashboard, LessonLog, RoadIcon } from '../../components/road-art';
import { Closing, RouteSection } from '../../components/road-layout';
import { hourlyRates, packages, pounds } from '../../content/lessons';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata = pageMetadata('/lessons/', 'Lessons', 'Compare manual and automatic driving lesson prices in Bristol, from your first Taster Hour to a Test Morning warm-up.');

export default function LessonsPage() {
  return <>
    <PageHead colour="green">
      <PageHead.Heading>Driving lessons</PageHead.Heading>
      <PageHead.Introduction>Compare manual and automatic packages, from your first hour to test morning.</PageHead.Introduction>
    </PageHead>

    <RouteSection className="pavement lesson-packages">
      <RouteSection.Heading>Lesson packages</RouteSection.Heading>
      <PackageSignpost lessons={packages}/>
    </RouteSection>

    <RouteSection className="includes-section">
      <RouteSection.Heading>What every lesson includes</RouteSection.Heading>
      <div className="dashboard-layout">
        <Dashboard/>
        <ul className="dashboard-labels">
          <li><RoadIcon name="pin"/><span>Pick-up and drop-off</span></li>
          <li><RoadIcon name="wheel"/><span>A dual-control car</span></li>
          <li><RoadIcon name="licence"/><span>A written lesson log you keep</span></li>
          <li><RoadIcon name="clock"/><span>A progress check every five hours</span></li>
        </ul>
      </div>
    </RouteSection>

    <RouteSection className="pavement rates-section">
      <div>
        <RouteSection.Heading>Pay as you go</RouteSection.Heading>
        <RouteSection.Introduction>Want to take it one lesson at a time? Pay as You Go comes in two-hour lessons at these hourly rates. Compare the total with a block if you’d like to plan ahead.</RouteSection.Introduction>
      </div>
      <table className="fuel-board">
        <caption>Hourly rates</caption>
        <tbody>
          <tr><th scope="row">Manual</th><td>{pounds(hourlyRates.manual)} <small>per hour</small></td></tr>
          <tr><th scope="row">Automatic</th><td>{pounds(hourlyRates.automatic)} <small>per hour</small></td></tr>
        </tbody>
      </table>
    </RouteSection>

    <RouteSection>
      <LessonLog>
        <RouteSection.Heading>Good to know</RouteSection.Heading>
        <ul className="log-list">
          <li>Your instructor will reply to agree a time and payment.</li>
          <li>Give your instructor at least 48 hours’ notice if you need to move a lesson.</li>
          <li>Bring a valid provisional licence and make sure you meet the <a className="text-link" href="https://www.gov.uk/driving-eyesight-rules">eyesight rules</a> before learning to drive.</li>
          <li>Lessons run between 07:00 and 21:00 by arrangement with your instructor.</li>
        </ul>
      </LessonLog>
    </RouteSection>

    <Closing><Closing.Heading>Which lesson suits you?</Closing.Heading><Closing.Contact>Ask about lessons</Closing.Contact></Closing>
  </>;
}
