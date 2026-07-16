'use client';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Zap, ArrowRight } from 'lucide-react';
import { vehicles } from '@/lib/vehicles';

const WA = 'https://wa.me/919790699932';

export default function VehiclesCarousel() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';
  const hoverBg = isDark ? '#D4AF37' : '#0B2344';
  const hoverColor = isDark ? '#0B2344' : 'white';
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  return (
    <section className="section" style={{ background: 'var(--bg-page-alt)', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="section-tag">🚗 Our Fleet</span>
            <h2 className="section-title" style={{ marginBottom: 8, color: 'var(--navy)' }}>Vehicles for Every Journey</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 480 }}>
              AC sedans to 45-seater luxury buses — choose your ride for any group size and occasion.
            </p>
          </div>
          <Link href="/vehicles" className="btn-secondary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            View All Vehicles <ArrowRight size={15} />
          </Link>
        </div>

        {/* Scrollable track wrapper */}
        <div style={{ position: 'relative' }}>
          {/* Left fade + button */}
          {canScrollLeft && (
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 10, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--bg-page-alt) 0%, transparent 100%)', pointerEvents: 'none' }} />
              <button onClick={() => scroll('left')}
                style={{ position: 'relative', zIndex: 1, width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--border-mid)', color: 'var(--text-heading)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-navy)', marginLeft: 8, transition: 'all 0.2s', pointerEvents: 'all' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = hoverBg; (e.currentTarget as HTMLElement).style.color = hoverColor; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-heading)'; }}>
                <ChevronLeft size={20} />
              </button>
            </div>
          )}

          {/* Right fade + button */}
          {canScrollRight && (
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--bg-page-alt) 0%, transparent 100%)', pointerEvents: 'none' }} />
              <button onClick={() => scroll('right')}
                style={{ position: 'relative', zIndex: 1, width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--border-mid)', color: 'var(--text-heading)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-navy)', marginRight: 8, transition: 'all 0.2s', pointerEvents: 'all' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = hoverBg; (e.currentTarget as HTMLElement).style.color = hoverColor; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-heading)'; }}>
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* The scrollable track */}
          <div
            ref={trackRef}
            style={{ display: 'flex', gap: 20, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 8, paddingTop: 4, cursor: 'grab', WebkitOverflowScrolling: 'touch' }}
            onMouseDown={e => {
              const el = e.currentTarget;
              let isDown = true;
              const startX = e.pageX - el.offsetLeft;
              const scrollLeft = el.scrollLeft;
              el.style.cursor = 'grabbing';
              const onMove = (ev: MouseEvent) => { if (!isDown) return; ev.preventDefault(); const x = ev.pageX - el.offsetLeft; el.scrollLeft = scrollLeft - (x - startX); };
              const onUp = () => { isDown = false; el.style.cursor = 'grab'; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
              window.addEventListener('mousemove', onMove);
              window.addEventListener('mouseup', onUp);
            }}>
            {vehicles.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.07, 0.35) }}
                onMouseEnter={() => setHoveredId(vehicle.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ flexShrink: 0, width: 300 }}>
                <div style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  background: 'var(--bg-surface)',
                  border: `1px solid ${hoveredId === vehicle.id ? vehicle.color + '50' : 'var(--border-light)'}`,
                  boxShadow: hoveredId === vehicle.id ? `0 12px 40px ${vehicle.color}20` : 'var(--shadow-card)',
                  transition: 'all 0.28s ease',
                  transform: hoveredId === vehicle.id ? 'translateY(-5px)' : 'none',
                  userSelect: 'none',
                }}>
                  {/* Image */}
                  <div style={{ height: 180, position: 'relative', overflow: 'hidden', background: 'var(--bg-page-alt)' }}>
                    <img src={vehicle.image} alt={vehicle.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: hoveredId === vehicle.id ? 'scale(1.06)' : 'scale(1)' }}
                      draggable={false} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,21,35,0.5) 0%, transparent 60%)' }} />
                    {vehicle.badge && (
                      <div style={{ position: 'absolute', top: 10, left: 10, background: vehicle.color, color: 'white', padding: '3px 10px', borderRadius: 50, fontSize: 10, fontWeight: 700 }}>
                        {vehicle.badge}
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(7,21,35,0.65)', backdropFilter: 'blur(6px)', color: 'white', padding: '4px 10px', borderRadius: 50, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Users size={11} /> {vehicle.capacity}
                    </div>
                    <div style={{ position: 'absolute', bottom: 10, left: 10, background: `${vehicle.color}CC`, color: 'white', padding: '3px 9px', borderRadius: 50, fontSize: 10, fontWeight: 600 }}>
                      {vehicle.capacity.includes('–') || vehicle.capacity.includes(',') ? vehicle.capacity + ' Seater' : vehicle.capacity + ' Seater'}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '14px 16px 16px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 4 }}>{vehicle.name}</h3>
                    {vehicle.variants && (
                      <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
                        {vehicle.variants.map(v => (
                          <span key={v} style={{ background: `${vehicle.color}14`, color: vehicle.color, padding: '2px 8px', borderRadius: 50, fontSize: 10, fontWeight: 700 }}>{v}</span>
                        ))}
                      </div>
                    )}

                    {/* Specs row */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                        <Users size={12} color={isDark ? "#D4AF37" : "#0B2344"} /> {vehicle.passengerCount} passengers
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                        <Zap size={12} color={isDark ? "#D4AF37" : "#0B2344"} /> Full AC
                      </span>
                    </div>

                    {/* Top ideal-for tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                      {vehicle.idealFor.slice(0, 2).map(tag => (
                        <span key={tag} style={{ background: `${vehicle.color}10`, color: vehicle.color, padding: '2px 8px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={`${WA}?text=${encodeURIComponent(`🚗 Booking Inquiry — ${vehicle.name} (${vehicle.capacity} seater)\n\nRoute:\nDate:\nPassengers:\n\nPlease provide a quote.`)}`}
                        target="_blank" rel="noopener"
                        className="btn-primary"
                        style={{ flex: 1, justifyContent: 'center', fontSize: 13, padding: '9px 14px', background: `linear-gradient(135deg,${vehicle.color},${vehicle.color}BB)` }}
                        onClick={e => e.stopPropagation()}>
                        Book
                      </a>
                      <Link href="/vehicles" className="btn-secondary" style={{ padding: '9px 13px', fontSize: 13 }}>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 16 }}>
          ← Drag or scroll to see all {vehicles.length} vehicles →
        </p>
      </div>
    </section>
  );
}
