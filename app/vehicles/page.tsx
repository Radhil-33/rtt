'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Luggage, Zap, CheckCircle, ArrowRight,
  Phone, MessageSquare, Star, Filter, Fuel
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { vehicles, categoryLabels, Vehicle } from '@/lib/vehicles';

const PHONE = '+919790699932';
const WA = 'https://wa.me/919790699932';

const categories = ['all', 'sedan', 'suv', 'van', 'tempo', 'bus'] as const;

export default function VehiclesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';
  const [selected, setSelected] = useState<Vehicle | null>(null);

  const filtered = activeCategory === 'all'
    ? vehicles
    : vehicles.filter(v => v.category === activeCategory);

  const waMsg = (v: Vehicle) => encodeURIComponent(
    `🚗 *Vehicle Booking Inquiry — Rashmi Tours*\n\nVehicle: ${v.name} (${v.capacity} seater)\n\nRoute:\nDate:\nNo. of Passengers:\nTrip Type (One-way / Round):\n\nPlease provide a quote.`
  );

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0B2344 0%, #071523 100%)',
          padding: 'clamp(56px,8vw,100px) clamp(16px,4vw,40px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 60%, rgba(11,35,68,0.12) 0%, transparent 55%), radial-gradient(circle at 80% 30%, rgba(212,175,55,0.12) 0%, transparent 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
            <span className="section-tag" style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>🚗 Our Fleet</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px,6vw,62px)', fontWeight: 900, color: 'white', marginBottom: 18, lineHeight: 1.1 }}>
              Vehicles for Every<br />
              <span style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Group &amp; Occasion</span>
            </h1>
            <p style={{ color: 'rgba(248,246,240,0.7)', fontSize: 'clamp(14px,2vw,17px)', lineHeight: 1.75, marginBottom: 28 }}>
              From intimate sedan rides for couples to 45-seater luxury buses for large pilgrimages — our well-maintained fleet covers every travel need across South India.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[['7', 'Vehicle Types'], ['All AC', 'Fleet'], ['24/7', 'Available'], ['GPS', 'Tracked']].map(([num, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', padding: '7px 15px', borderRadius: 50, fontSize: 13, color: 'rgba(248,246,240,0.8)', fontWeight: 600 }}>
                  <span style={{ color: '#D4AF37' }}>{num}</span> {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)', position: 'sticky', top: 64, zIndex: 40 }}>
          <div className="container" style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '15px 20px',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: `3px solid ${activeCategory === cat ? '#D4AF37' : 'transparent'}`,
                  color: activeCategory === cat ? 'var(--text-heading)' : 'var(--text-muted)',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  fontSize: 14,
                  background: 'none',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}>
                {cat === 'all' ? `All (${vehicles.length})` : `${categoryLabels[cat]} (${vehicles.filter(v => v.category === cat).length})`}
              </button>
            ))}
          </div>
        </div>

        <div className="container" style={{ paddingTop: 48, paddingBottom: 72 }}>
          {/* ── Vehicle Grid ── */}
          <motion.div layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: 28 }}>
            <AnimatePresence>
              {filtered.map((vehicle, i) => (
                <motion.div key={vehicle.id} layout
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.38, delay: Math.min(i * 0.06, 0.3) }}>
                  <div
                    onClick={() => setSelected(vehicle)}
                    style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      boxShadow: 'var(--shadow-card)',
                      cursor: 'pointer',
                      transition: 'all 0.28s ease',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'translateY(-6px)';
                      el.style.boxShadow = 'var(--shadow-navy)';
                      el.style.borderColor = `${vehicle.color}40`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'none';
                      el.style.boxShadow = 'var(--shadow-card)';
                      el.style.borderColor = 'var(--border-light)';
                    }}>

                    {/* Image */}
                    <div style={{ position: 'relative', height: 210, overflow: 'hidden', background: 'var(--bg-page-alt)' }}>
                      <img
                        src={vehicle.image} alt={vehicle.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s ease' }}
                        loading="lazy"
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,21,35,0.5) 0%, transparent 55%)' }} />

                      {/* Badge */}
                      {vehicle.badge && (
                        <div style={{ position: 'absolute', top: 12, left: 12, background: vehicle.color, color: 'white', padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: '0.3px' }}>
                          {vehicle.badge}
                        </div>
                      )}

                      {/* Capacity pill */}
                      <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(7,21,35,0.72)', color: 'white', padding: '5px 12px', borderRadius: 50, fontSize: 13, fontWeight: 700, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Users size={13} /> {vehicle.capacity} Seater
                      </div>

                      {/* Category tag */}
                      <div style={{ position: 'absolute', bottom: 12, left: 12, background: `${vehicle.color}CC`, color: 'white', padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>
                        {categoryLabels[vehicle.category]}
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 6 }}>
                        {vehicle.name}
                      </h3>
                      {vehicle.variants && (
                        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                          {vehicle.variants.map(v => (
                            <span key={v} style={{ background: `${vehicle.color}14`, color: vehicle.color, padding: '2px 10px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>{v}</span>
                          ))}
                        </div>
                      )}
                      <p style={{ fontSize: 13, color: 'var(--text-body)', lineHeight: 1.65, marginBottom: 14, flex: 1 }}>
                        {vehicle.description.split('.')[0]}.
                      </p>

                      {/* Quick specs */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                        {[
                          { icon: Users, label: 'Passengers', val: `${vehicle.passengerCount} seats` },
                          { icon: Luggage, label: 'Luggage', val: vehicle.luggageCapacity },
                          { icon: Zap, label: 'AC', val: vehicle.acAvailable ? 'Available' : 'N/A' },
                          { icon: Fuel, label: 'Fuel', val: vehicle.fuelType },
                        ].map(({ icon: Icon, label, val }) => (
                          <div key={label} style={{ background: 'rgba(11,35,68,0.04)', borderRadius: 9, padding: '8px 10px', border: '1px solid rgba(11,35,68,0.08)' }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Icon size={10} color={isDark ? "#D4AF37" : "#0B2344"} /> {label}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-heading)' }}>{val}</div>
                          </div>
                        ))}
                      </div>

                      {/* Ideal for */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
                        {vehicle.idealFor.slice(0, 3).map(tag => (
                          <span key={tag} style={{ background: `${vehicle.color}12`, color: vehicle.color, padding: '3px 9px', borderRadius: 50, fontSize: 11, fontWeight: 600 }}>
                            {tag}
                          </span>
                        ))}
                        {vehicle.idealFor.length > 3 && (
                          <span style={{ background: 'rgba(123,147,172,0.1)', color: 'var(--text-muted)', padding: '3px 9px', borderRadius: 50, fontSize: 11 }}>
                            +{vehicle.idealFor.length - 3} more
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <a
                          href={`${WA}?text=${waMsg(vehicle)}`}
                          target="_blank" rel="noopener"
                          onClick={e => e.stopPropagation()}
                          className="btn-primary"
                          style={{ flex: 1, justifyContent: 'center', fontSize: 14, padding: '11px 16px', background: `linear-gradient(135deg,${vehicle.color},${vehicle.color}BB)` }}>
                          Book This
                        </a>
                        <button
                          onClick={e => { e.stopPropagation(); setSelected(vehicle); }}
                          className="btn-secondary"
                          style={{ padding: '11px 14px', fontSize: 13 }}>
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Comparison table ── */}
          <div style={{ marginTop: 72 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,4vw,36px)', color: 'var(--text-heading)', textAlign: 'center', marginBottom: 32 }}>
              Quick Comparison
            </h2>
            <div style={{ overflowX: 'auto', borderRadius: 18, border: '1px solid rgba(11,35,68,0.1)', background: 'var(--bg-surface)', boxShadow: 'var(--shadow-navy)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #0B2344, #102A4A)', color: 'white' }}>
                    {['Vehicle', 'Capacity', 'Luggage', 'Best For', 'AC'].map(h => (
                      <th key={h} style={{ padding: '14px 18px', fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 700, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v, i) => (
                    <tr key={v.id}
                      style={{ background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-surface-2)', borderBottom: '1px solid var(--border-light)', cursor: 'pointer', transition: 'background 0.15s' }}
                      onClick={() => setSelected(v)}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--nav-link-hover-bg)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-surface-2)'}>
                      <td style={{ padding: '13px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', background: v.color, flexShrink: 0 }} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-heading)', lineHeight: 1.2 }}>{v.name}</div>
                            {v.variants && <div style={{ fontSize: 11, color: '#D4AF37', fontWeight: 600 }}>{v.variants.join(' / ')}</div>}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '13px 18px', fontSize: 14, fontWeight: 600, color: 'var(--text-heading)', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Users size={13} color={v.color} /> {v.capacity}</div>
                      </td>
                      <td style={{ padding: '13px 18px', fontSize: 13, color: 'var(--text-muted)', maxWidth: 160 }}>{v.luggageCapacity}</td>
                      <td style={{ padding: '13px 18px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {v.idealFor.slice(0, 2).map(tag => (
                            <span key={tag} style={{ background: `${v.color}14`, color: v.color, padding: '2px 8px', borderRadius: 50, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{tag}</span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '13px 18px' }}>
                        <CheckCircle size={18} color="#2E8B57" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <div style={{ marginTop: 64, background: 'linear-gradient(135deg, #0B2344, #071523)', borderRadius: 24, padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,4vw,40px)', color: 'white', marginBottom: 14 }}>
              Not Sure Which Vehicle?
            </h2>
            <p style={{ color: 'rgba(248,246,240,0.68)', fontSize: 16, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Just tell us your destination, group size, and dates — we&apos;ll recommend the perfect vehicle and give you the best rate.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`${WA}?text=${encodeURIComponent('Hi! I need help choosing the right vehicle for my trip.\n\nDestination:\nDate:\nNo. of Passengers:\n\nPlease suggest the best option.')}`}
                target="_blank" rel="noopener"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: 'white', padding: '14px 28px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}>
                <MessageSquare size={18} /> Ask on WhatsApp
              </a>
              <a href={`tel:${PHONE}`} className="btn-secondary"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', padding: '14px 28px', fontSize: 15 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                <Phone size={17} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(7,21,35,0.6)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(8px)', overflowY: 'auto' }}
            onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
            <motion.div
              initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
              style={{ background: 'var(--bg-surface)', borderRadius: 24, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(7,21,35,0.3)' }}>

              {/* Image */}
              <div style={{ height: 240, position: 'relative', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
                <img src={selected.image} alt={selected.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,21,35,0.65) 0%, transparent 55%)' }} />
                <button onClick={() => setSelected(null)}
                  style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(7,21,35,0.4)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, backdropFilter: 'blur(8px)' }}>
                  ×
                </button>
                <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                  {selected.badge && (
                    <span style={{ background: selected.color, color: 'white', padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700, marginRight: 8 }}>{selected.badge}</span>
                  )}
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px,4vw,28px)', fontWeight: 700, color: 'white', marginTop: 6 }}>{selected.name}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{selected.capacity} Seater · {categoryLabels[selected.category]}</div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 'clamp(20px,4vw,32px)' }}>
                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 24 }}>{selected.description}</p>

                {/* Variants */}
                {selected.variants && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Available Variants</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {selected.variants.map(v => (
                        <span key={v} style={{ background: `${selected.color}15`, color: selected.color, padding: '5px 14px', borderRadius: 50, fontSize: 13, fontWeight: 700, border: `1px solid ${selected.color}30` }}>{v}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specs grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }}>
                  {[
                    { icon: Users, label: 'Passenger Capacity', val: `${selected.passengerCount} passengers` },
                    { icon: Luggage, label: 'Luggage Space', val: selected.luggageCapacity },
                    { icon: Zap, label: 'Air Conditioning', val: selected.acAvailable ? 'Full AC' : 'Non-AC' },
                    { icon: Fuel, label: 'Fuel Type', val: selected.fuelType },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} style={{ background: 'rgba(11,35,68,0.04)', borderRadius: 12, padding: '12px 14px', border: '1px solid rgba(11,35,68,0.08)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>
                        <Icon size={11} color={isDark ? "#D4AF37" : "#0B2344"} /> {label}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-heading)' }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div style={{ marginBottom: 22 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Features & Amenities</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                    {selected.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                        <CheckCircle size={14} color={selected.color} style={{ flexShrink: 0 }} /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal for */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Ideal For</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {selected.idealFor.map(tag => (
                      <span key={tag} style={{ background: `${selected.color}12`, color: selected.color, padding: '5px 12px', borderRadius: 50, fontSize: 12, fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href={`${WA}?text=${waMsg(selected)}`} target="_blank" rel="noopener"
                    className="btn-primary"
                    style={{ flex: '1 1 160px', justifyContent: 'center', fontSize: 15, padding: '14px', background: `linear-gradient(135deg,${selected.color},${selected.color}AA)` }}>
                    <MessageSquare size={17} /> Book via WhatsApp
                  </a>
                  <a href={`tel:${PHONE}`}
                    className="btn-secondary"
                    style={{ flex: '1 1 120px', justifyContent: 'center', fontSize: 14 }}>
                    <Phone size={16} /> Call to Book
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
