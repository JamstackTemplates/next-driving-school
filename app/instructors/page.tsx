import { InstructorFilter } from '../../components/instructor-filter';
import { PageHead } from '../../components/page-head';
import { Closing, RouteSection, RouteSteps } from '../../components/road-layout';
import { instructors } from '../../content/instructors';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata = pageMetadata('/instructors/', 'Instructors', 'Meet five Bristol driving instructors and choose by pick-up area, manual or automatic transmission, and teaching style.');

export default function InstructorsPage() {
  const takingPupils = instructors.filter(person => person.availability === 'taking-pupils').map(person => person.name);
  const names = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(takingPupils);
  return <>
    <PageHead colour="white">
      <PageHead.Heading>Meet the instructors</PageHead.Heading>
      <PageHead.Introduction>Find a patient instructor who teaches in your area, in the car you want to learn in.</PageHead.Introduction>
    </PageHead>

    <RouteSection className="profile-section">
      <RouteSection.Heading>Find your instructor</RouteSection.Heading>
      <InstructorFilter people={instructors}/>
    </RouteSection>

    <RouteSection className="pavement matching-section">
      <RouteSection.Heading>How we match you</RouteSection.Heading>
      <RouteSteps>
        <RouteSteps.Step><RouteSteps.Title>Tell us where</RouteSteps.Title><p>Give us your pick-up neighbourhood or postcode district.</p></RouteSteps.Step>
        <RouteSteps.Step><RouteSteps.Title>Choose your car</RouteSteps.Title><p>Say whether you prefer manual or automatic, and tell us which days and times suit you.</p></RouteSteps.Step>
        <RouteSteps.Step><RouteSteps.Title>We suggest an instructor</RouteSteps.Title><p>Tell us if you have someone in mind. We’ll look for a fit by area, car and availability.</p></RouteSteps.Step>
      </RouteSteps>
    </RouteSection>

    <Closing>
      <Closing.Heading>Ask for an instructor</Closing.Heading>
      <p>{names ? `Taking pupils now: ${names}.` : 'Ask about joining a waitlist.'}</p>
      <Closing.Contact>Ask about lessons</Closing.Contact>
    </Closing>
  </>;
}
