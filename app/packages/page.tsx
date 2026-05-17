import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PackagesSection from '@/components/sections/PackagesSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tour Packages',
  description: 'Explore Rashmi Tours and Travels\' curated packages — pilgrimages to Rameswaram, hill stations in Kodaikanal, Ooty, Munnar, and more from Madurai.',
};

export default function PackagesPage() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: 'linear-gradient(135deg, #1A0F05 0%, #2D1A08 100%)', padding: '80px 24px', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: 'rgba(232,101,26,0.2)', color: '#F0C040', padding: '6px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
            All Packages
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
            Tour Packages
          </h1>
          <p style={{ color: 'rgba(253,248,240,0.75)', fontSize: '17px', maxWidth: '560px', margin: '0 auto' }}>
            Handcrafted journeys across South India — pick the one that calls to your heart.
          </p>
        </div>
        <PackagesSection />
      </main>
      <Footer />
    </>
  );
}
