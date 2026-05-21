'use client';
import { Shield, Clock, MapPin, Headphones, Star, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Shield, title: 'Safe & Verified', desc: 'All drivers are police-verified, licensed, and trained in safe driving.' },
  { icon: Clock, title: '24/7 Availability', desc: 'Book anytime. We operate round the clock, every day of the year.' },
  { icon: MapPin, title: 'Local Expertise', desc: '14+ years covering South India — we know every route and scenic stop.' },
  { icon: Headphones, title: 'Dedicated Support', desc: 'Our team is always a call away before, during, and after your trip.' },
  { icon: Star, title: 'Top-Rated Service', desc: '4.9 stars from 1000+ travelers. Excellence is our everyday standard.' },
  { icon: CreditCard, title: 'Transparent Pricing', desc: 'No hidden charges. What you see is exactly what you pay. Always.' },
];

export default function WhyUsSection() {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div className="why-grid">
          {/* Left: text */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">South India's Most Trusted Travel Partner</h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>
              At Rashmi Tours and Travels, we don't just drive you from point A to B — we craft journeys. Based in Trichy, our passion for travel and commitment to quality has made us the go-to choice for families, pilgrims, and explorers.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[['1000+', 'Happy Customers'], ['14+', 'Years Experience'], ['4.9★', 'Star Rating']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,4vw,32px)', fontWeight: 700, color: 'var(--saffron)', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: feature cards grid */}
          <div className="features-grid">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div key={feat.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.38, delay: i * 0.07 }}>
                  <div style={{ background: 'white', borderRadius: 14, padding: '18px 16px', border: '1px solid rgba(232,101,26,0.07)', transition: 'all 0.28s', height: '100%' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,101,26,0.28)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-warm)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,101,26,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,rgba(232,101,26,0.1),rgba(212,160,23,0.07))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                      <Icon size={19} color="var(--saffron)" />
                    </div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 700, color: 'var(--deep)', marginBottom: 5 }}>{feat.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{feat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (min-width: 1024px) {
          .why-grid { grid-template-columns: 1fr 1fr; gap: 56px; }
        }
      `}</style>
    </section>
  );
}
