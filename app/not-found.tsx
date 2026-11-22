import type { Metadata } from 'next';
import { LessonLog, NotFoundScene, RoadArrow } from '../components/road-art';
import { RouteLine } from '../components/road-layout';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = { title: 'Wrong turn', robots: { index: false, follow: true } };

export default function NotFound() {
  return <section className="wrong-turn">
    <NotFoundScene/><RouteLine/>
    <div className="route-wrap wrong-turn-content">
      <LessonLog>
        <h1>Wrong turn.</h1>
        <p>This road doesn’t go anywhere. Take the next left back to the lessons.</p>
        <nav aria-label="Find your way back">
          <SiteLink className="sign-face sign-white" href="/">Home <RoadArrow/></SiteLink>
          <SiteLink className="sign-face sign-green" href="/lessons/">Lessons <RoadArrow/></SiteLink>
          <SiteLink className="sign-face sign-brown" href="/contact/">Contact <RoadArrow/></SiteLink>
        </nav>
      </LessonLog>
    </div>
  </section>;
}
