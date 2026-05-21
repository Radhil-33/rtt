'use client';
import { useState } from 'react';
import { Calculator, MapPin, ArrowRight, Tag, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSiteStore } from '@/store/useSiteStore';
import { vehicleTypes } from '@/lib/siteData';

export default function FareEstimator() {
  const { fareRules, validateCoupon } = useSiteStore();
  const [from, setFrom] = useState('Trichy');
  const [to, setTo] = useState('');
  const [vehicle, setVehicle] = useState('sedan');
  const [tripType, setTripType] = useState<'one-way' | 'round'>('one-way');
  const [couponCode, setCouponCode] = useState('');
  const [couponResult, setCouponResult] = useState<{ valid: boolean; discount: number; message: string } | null>(null);
  const [estimate, setEstimate] = useState<{ base: number; total: number; distance: number } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const origins = [...new Set(fareRules.map(r => r.from))];
  const destinations = fareRules.filter(r => r.from === from).map(r => r.to);

  const calculate = () => {
    const rule = fareRules.find(r => r.from === from && r.to === to);
    if (!rule) return;
    const veh = vehicleTypes.find(v => v.id === vehicle)!;
    const base = Math.round((rule.basePrice + rule.pricePerKm * rule.distanceKm) * veh.multiplier);
    const total = tripType === 'round' ? Math.round(base * 1.85) : base;
    setEstimate({ base, total, distance: rule.distanceKm });
    setCalculated(true);
    setCouponResult(null);
  };

  const applyCoupon = () => {
    if (!estimate) return;
    setCouponResult(validateCoupon(couponCode, estimate.total));
  };

  const finalPrice = estimate ? (couponResult?.valid ? estimate.total - couponResult.discount : estimate.total) : 0;

  return (
    <section id="fare-estimator" className="section" style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="section-tag"><Calculator size={13} /> Fare Estimator</span>
          <h2 className="section-title">Get an Instant Fare Quote</h2>
          <p className="section-subtitle mx-auto" style={{ marginTop: 8 }}>
            Transparent pricing, no hidden charges. Know your fare before you book.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: 20, padding: 'clamp(20px,4vw,40px)', boxShadow: '0 16px 48px rgba(26,15,5,0.08)', border: '1px solid rgba(232,101,26,0.07)', maxWidth: 860, margin: '0 auto' }}>
          {/* Row 1 */}
          <div className="estimator-row">
            <div>
              <label className="form-label">From</label>
              <select className="form-input" value={from} onChange={e => { setFrom(e.target.value); setTo(''); setCalculated(false); }}>
                {origins.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">To</label>
              <select className="form-input" value={to} onChange={e => { setTo(e.target.value); setCalculated(false); }}>
                <option value="">Select destination</option>
                {destinations.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Vehicle</label>
              <select className="form-input" value={vehicle} onChange={e => { setVehicle(e.target.value); setCalculated(false); }}>
                {vehicleTypes.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
              </select>
            </div>
          </div>

          {/* Trip type */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {(['one-way', 'round'] as const).map(t => (
              <button key={t} onClick={() => { setTripType(t); setCalculated(false); }}
                style={{ padding: '9px 20px', borderRadius: 50, border: '2px solid', borderColor: tripType === t ? 'var(--saffron)' : 'rgba(232,101,26,0.18)', background: tripType === t ? 'rgba(232,101,26,0.07)' : 'transparent', color: tripType === t ? 'var(--saffron)' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', fontSize: 14, fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s', flex: '1 1 auto', maxWidth: 160 }}>
                {t === 'one-way' ? 'One Way' : 'Round Trip'}
              </button>
            ))}
          </div>

          <button onClick={calculate} disabled={!to} className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: 16, opacity: !to ? 0.5 : 1, cursor: !to ? 'not-allowed' : 'pointer' }}>
            <Calculator size={17} /> Calculate Fare
          </button>

          {/* Result */}
          <AnimatePresence>
            {calculated && estimate && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ marginTop: 24, overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(135deg,rgba(232,101,26,0.05),rgba(212,160,23,0.05))', border: '1px solid rgba(232,101,26,0.14)', borderRadius: 14, padding: 'clamp(16px,3vw,24px)' }}>
                  {/* Route + fare */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 18 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        <MapPin size={15} color="var(--saffron)" />
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)' }}>{from} <ArrowRight size={12} style={{ display: 'inline' }} /> {to} · {estimate.distance} km</span>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{vehicleTypes.find(v => v.id === vehicle)?.label} · {tripType === 'round' ? 'Round Trip' : 'One Way'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Estimated Fare</div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,5vw,36px)', fontWeight: 700, color: couponResult?.valid ? 'var(--text-light)' : 'var(--saffron)', textDecoration: couponResult?.valid ? 'line-through' : 'none', lineHeight: 1 }}>₹{estimate.total.toLocaleString()}</div>
                      {couponResult?.valid && <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,5vw,36px)', fontWeight: 700, color: 'var(--green)', lineHeight: 1, marginTop: 4 }}>₹{finalPrice.toLocaleString()}</div>}
                    </div>
                  </div>

                  {/* Coupon */}
                  <div style={{ borderTop: '1px solid rgba(232,101,26,0.1)', paddingTop: 16 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <Tag size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--saffron)' }} />
                        <input className="form-input" placeholder="Coupon code" value={couponCode} onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponResult(null); }} style={{ paddingLeft: 34, fontSize: 14 }} />
                      </div>
                      <button onClick={applyCoupon} disabled={!couponCode} className="btn-secondary" style={{ whiteSpace: 'nowrap', opacity: !couponCode ? 0.5 : 1, padding: '0 18px', fontSize: 14 }}>Apply</button>
                    </div>
                    {couponResult && (
                      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: couponResult.valid ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>
                        {couponResult.valid ? <Check size={14} /> : <X size={14} />}
                        {couponResult.valid ? `${couponResult.message} — You save ₹${couponResult.discount}!` : couponResult.message}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                    <Link href={`/booking?from=${from}&to=${to}&vehicle=${vehicle}`} className="btn-primary" style={{ flex: '1 1 160px' }}>Book This Ride</Link>
                    <Link href="/contact" className="btn-secondary" style={{ flex: '1 1 160px' }}>Custom Quote</Link>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 10, textAlign: 'center' }}>* Estimate only. Actual fare may vary based on tolls and waiting time.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .estimator-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-bottom: 16px;
        }
        @media (min-width: 600px) {
          .estimator-row { grid-template-columns: 1fr 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
