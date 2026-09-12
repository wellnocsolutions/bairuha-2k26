import Navbar from '@/components/Navbar';
import PosterMaker from '@/components/PosterMaker';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <PosterMaker />
      </main>

      <Footer />
    </div>
  );
}
