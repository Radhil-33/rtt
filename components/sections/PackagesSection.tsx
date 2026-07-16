'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, MapPin, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useSiteStore } from '@/store/useSiteStore';

export default function PackagesSection({ limit }: { limit?: number }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';
  const { packages } = useSiteStore();
  const [hovered, setHovered] = useState<string | null>(null);
  const displayed = limit ? packages.slice(0, limit) : packages;

  return (
    <section className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-tag">Our Packages</span>
          <h2 className="section-title">Handpicked Tour Experiences</h2>
          <p className="section-subtitle mx-auto" style={{ marginTop: 8 }}>
            From sacred pilgrimages to misty hill stations — find the perfect journey for you.
          </p>
        </div>

        {/* Grid */}
        <div className="packages-grid">
          {displayed.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: Math.min(i * 0.07, 0.35) }}>
              <div
                onMouseEnter={() => setHovered(pkg.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  background: 'var(--bg-surface)',
                  border: hovered === pkg.id ? '1px solid var(--border-mid)' : '1px solid var(--border-light)',
                  boxShadow: hovered === pkg.id ? 'var(--shadow-navy)' : 'var(--shadow-card)',
                  transition: 'all 0.3s ease',
                  transform: hovered === pkg.id ? 'translateY(-6px)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s ease', transform: hovered === pkg.id ? 'scale(1.07)' : 'scale(1)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,21,35,0.45) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 7 }}>
                    {pkg.badge && <span style={{ background: '#0B2344', color: 'white', padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>{pkg.badge}</span>}
                  </div>
                  <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(7,21,35,0.6)', color: 'white', padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600, backdropFilter: 'blur(6px)' }}>
                    <Clock size={11} /> {pkg.duration}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                    <MapPin size={12} color={isDark ? "#D4AF37" : "#0B2344"} />
                    <span style={{ fontSize: 12, color: isDark ? '#D4AF37' : '#0B2344', fontWeight: 600 }}>{pkg.destinations.join(' → ')}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 8 }}>{pkg.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-body)', lineHeight: 1.6, marginBottom: 14, flex: 1 }}>{pkg.description}</p>

                  {/* Highlights */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {pkg.highlights.slice(0, 4).map(h => (
                      <span key={h} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(11,35,68,0.06)', color: isDark ? '#D4AF37' : '#0B2344', padding: '3px 9px', borderRadius: 50, fontSize: 11, fontWeight: 500 }}>
                        <Check size={10} /> {h}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Starting from</div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#D4AF37', lineHeight: 1 }}>₹{pkg.price.toLocaleString()}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{pkg.priceUnit}</div>
                    </div>
                    <Link href={`/booking?package=${pkg.id}`} className="btn-primary btn-sm">
                      Book <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {limit && packages.length > limit && (
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/packages" className="btn-secondary">View All {packages.length} Packages <ArrowRight size={15} /></Link>
          </div>
        )}
      </div>

      <style>{`
        .packages-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 22px;
        }
        @media (min-width: 540px) {
          .packages-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .packages-grid { grid-template-columns: 1fr 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
