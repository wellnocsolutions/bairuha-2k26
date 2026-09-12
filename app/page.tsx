import Navbar from '@/components/Navbar';
import EventCountdown from '@/components/EventCountdown';
import PosterMaker from '@/components/PosterMaker';
import EventSchedule from '@/components/EventSchedule';
import VenueGuide from '@/components/VenueGuide';
import LiveStreamHub from '@/components/LiveStreamHub';
import DuaRequest from '@/components/DuaRequest';
import AboutDars from '@/components/AboutDars';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 scroll-smooth selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-10">
        {/* Live Event Countdown & Quick Calendar Add */}
        <EventCountdown />

        {/* Primary Campaign Feature: Interactive Poster Maker */}
        <PosterMaker />

        {/* Program Schedule & Timeline */}
        <EventSchedule />

        {/* Venue, Parking & Google Maps Guide */}
        <VenueGuide />

        {/* Live Stream Hub for Gulf Diaspora and Families */}
        <LiveStreamHub />

        {/* Online Dua Request Submission */}
        <DuaRequest />

        {/* About Madinathul Ilm Dars & Support */}
        <AboutDars />
      </main>

      <Footer />
    </div>
  );
}

