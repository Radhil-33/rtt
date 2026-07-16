import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PackagesSection from '@/components/sections/PackagesSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tour Packages',
  description: 'Explore Rashmi Tours and Travels curated packages from Trichy — pilgrimages to Rameswaram, hill stations in Kodaikanal, Ooty, Munnar, Kanyakumari and more.',
};

export default function PackagesPage() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: 'linear-gradient(135deg, #0B2344 0%, #071523 100%)', padding: 'clamp(56px,8vw,100px) 16px', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: 'rgba(212,175,55,0.18)', color: '#D4AF37', padding: '5px 16px', borderRadius: '50px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>All Packages</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,6vw,60px)', fontWeight: 700, color: 'white', marginBottom: '14px' }}>Tour Packages</h1>
          <p style={{ color: 'rgba(248,246,240,0.7)', fontSize: 'clamp(14px,2vw,17px)', maxWidth: '500px', margin: '0 auto' }}>
            Handcrafted journeys across South India — pick the one that calls to your heart.
          </p>
        </div>
        <PackagesSection />
      </main>
      <Footer />
    </>
  );
}
