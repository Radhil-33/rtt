'use client';
import { Shield, Clock, MapPin, Headphones, Star, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Shield, title: 'Safe & Verified', desc: 'All drivers are police-verified, licensed, and trained in safe driving practices.' },
  { icon: Clock, title: '24/7 Availability', desc: 'Book anytime, travel anytime. We operate round the clock with zero delays.' },
  { icon: MapPin, title: 'Local Expertise', desc: '14+ years covering South India routes — we know every shortcut and scenic stop.' },
  { icon: Headphones, title: 'Dedicated Support', desc: 'Our team is always a call away to assist you before, during, and after your trip.' },
  { icon: Star, title: 'Top-Rated Service', desc: '4.9 stars from 1000+ travelers. Excellence is our standard, not our exception.' },
  { icon: CreditCard, title: 'Transparent Pricing', desc: 'No hidden charges. What you see is exactly what you pay. Always.' },
];

export default function WhyUsSection() {
  return (
    <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="md:grid-cols-2 grid-cols-1">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-block', background: 'rgba(232,101,26,0.1)', color: 'var(--saffron)', padding: '6px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Why Choose Us</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--deep)', marginBottom: 20 }}>
              South India's Most Trusted Travel Partner
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
              At Rashmi Tours and Travels, we don't just drive you from point A to B — we craft journeys. Based in Madurai since 2010, our passion for travel and commitment to quality has made us the go-to choice for families, pilgrims, and explorers alike.
            </p>
            <div style={{ display: 'flex', gap: 32 }}>
              {[['1000+', 'Happy Customers'], ['14+', 'Years Experience'], ['4.9', 'Star Rating']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: 'var(--saffron)' }}>{num}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div key={feat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div style={{ background: 'white', borderRadius: 16, padding: 20, border: '1px solid rgba(232,101,26,0.08)', transition: 'all 0.3s ease', cursor: 'default' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,101,26,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-warm)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,101,26,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, rgba(232,101,26,0.12) 0%, rgba(212,160,23,0.08) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                      <Icon size={20} color="var(--saffron)" />
                    </div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: 'var(--deep)', marginBottom: 6 }}>{feat.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{feat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
