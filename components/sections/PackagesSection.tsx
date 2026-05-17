'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Clock, MapPin, Check, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteStore } from '@/store/useSiteStore';

export default function PackagesSection({ limit }: { limit?: number }) {
  const { packages } = useSiteStore();
  const [hovered, setHovered] = useState<string | null>(null);
  const displayed = limit ? packages.slice(0, limit) : packages;

  return (
    <section style={{ padding: '80px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ display: 'inline-block', background: 'rgba(232,101,26,0.1)', color: 'var(--saffron)', padding: '6px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Our Packages</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--deep)', marginBottom: 16 }}>
            Handpicked Tour Experiences
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            From sacred pilgrimages to misty hill stations — find the perfect journey for you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
          {displayed.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <div
                className="package-card"
                onMouseEnter={() => setHovered(pkg.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ borderRadius: 20, overflow: 'hidden', background: 'white', border: '1px solid rgba(232,101,26,0.08)', boxShadow: hovered === pkg.id ? '0 20px 60px rgba(26,15,5,0.15)' : '0 4px 20px rgba(26,15,5,0.06)', transition: 'all 0.3s ease', position: 'relative' }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered === pkg.id ? 'scale(1.08)' : 'scale(1)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,15,5,0.5) 0%, transparent 60%)' }} />

                  {/* Badges */}
                  <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
                    {pkg.badge && (
                      <span style={{ background: 'var(--saffron)', color: 'white', padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: '0.5px' }}>{pkg.badge}</span>
                    )}
                    {pkg.popular && !pkg.badge && (
                      <span style={{ background: 'var(--gold)', color: 'var(--deep)', padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>★ Popular</span>
                    )}
                  </div>

                  {/* Duration */}
                  <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(26,15,5,0.6)', color: 'white', padding: '5px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600, backdropFilter: 'blur(8px)' }}>
                    <Clock size={12} /> {pkg.duration}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 22px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <MapPin size={13} color="var(--saffron)" />
                    <span style={{ fontSize: 12, color: 'var(--saffron)', fontWeight: 600 }}>{pkg.destinations.join(' → ')}</span>
                  </div>

                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: 'var(--deep)', marginBottom: 10 }}>{pkg.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>{pkg.description}</p>

                  {/* Highlights */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                    {pkg.highlights.map(h => (
                      <span key={h} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(232,101,26,0.07)', color: 'var(--saffron)', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 500 }}>
                        <Check size={11} /> {h}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: 11, color: 'var(--text-light)' }}>Starting from</span>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: 'var(--saffron)' }}>₹{pkg.price.toLocaleString()}</div>
                      <span style={{ fontSize: 12, color: 'var(--text-light)' }}>{pkg.priceUnit}</span>
                    </div>
                    <Link href={`/booking?package=${pkg.id}`} className="btn-primary" style={{ padding: '12px 22px', fontSize: 14 }}>
                      Book <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {limit && packages.length > limit && (
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/packages" className="btn-secondary">
              View All {packages.length} Packages <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
