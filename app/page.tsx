import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/sections/HeroCarousel';
import VehiclesCarousel from '@/components/sections/VehiclesCarousel';
import PackagesSection from '@/components/sections/PackagesSection';
import FareEstimator from '@/components/sections/FareEstimator';
import WhyUsSection from '@/components/sections/WhyUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import QuickBookCTA from '@/components/sections/QuickBookCTA';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <VehiclesCarousel />
        <WhyUsSection />
        <PackagesSection limit={6} />
        <FareEstimator />
        <TestimonialsSection />
        <QuickBookCTA />
      </main>
      <Footer />
    </>
  );
}
