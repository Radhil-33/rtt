'use client';
import { useState } from 'react';
import { Calculator, MapPin, ArrowRight, Tag, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSiteStore } from '@/store/useSiteStore';
import { vehicleTypes } from '@/lib/siteData';

export default function FareEstimator() {
  const { fareRules, validateCoupon } = useSiteStore();
  const [from, setFrom] = useState('Madurai');
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
    const result = validateCoupon(couponCode, estimate.total);
    setCouponResult(result);
  };

  const finalPrice = estimate ? (couponResult?.valid ? estimate.total - couponResult.discount : estimate.total) : 0;

  return (
    <section id="fare-estimator" style={{ padding: '80px 24px', background: 'linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 100%)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,101,26,0.1)', color: 'var(--saffron)', padding: '6px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>
            <Calculator size={14} /> Fare Estimator
          </span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--deep)' }}>
            Get an Instant Fare Quote
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, marginTop: 12 }}>
            Transparent pricing, no hidden charges. Know your fare before you book.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: 24, padding: 'clamp(24px, 4vw, 48px)', boxShadow: '0 20px 60px rgba(26,15,5,0.1)', border: '1px solid rgba(232,101,26,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 20 }}>
            
            {/* From */}
            <div>
              <label className="form-label">From</label>
              <select className="form-input" value={from} onChange={e => { setFrom(e.target.value); setTo(''); setCalculated(false); }}>
                {origins.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* To */}
            <div>
              <label className="form-label">To</label>
              <select className="form-input" value={to} onChange={e => { setTo(e.target.value); setCalculated(false); }}>
                <option value="">Select destination</option>
                {destinations.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            {/* Vehicle */}
            <div>
              <label className="form-label">Vehicle Type</label>
              <select className="form-input" value={vehicle} onChange={e => { setVehicle(e.target.value); setCalculated(false); }}>
                {vehicleTypes.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
              </select>
            </div>
          </div>

          {/* Trip type */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {(['one-way', 'round'] as const).map(type => (
              <button key={type} onClick={() => { setTripType(type); setCalculated(false); }}
                style={{ padding: '10px 24px', borderRadius: 50, border: '2px solid', borderColor: tripType === type ? 'var(--saffron)' : 'rgba(232,101,26,0.2)', background: tripType === type ? 'rgba(232,101,26,0.08)' : 'transparent', color: tripType === type ? 'var(--saffron)' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', fontSize: 14, transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif' }}>
                {type === 'one-way' ? 'One Way' : 'Round Trip'}
              </button>
            ))}
          </div>

          <button onClick={calculate} disabled={!to} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 16, opacity: !to ? 0.5 : 1 }}>
            <Calculator size={18} /> Calculate Fare
          </button>

          {/* Result */}
          <AnimatePresence>
            {calculated && estimate && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ marginTop: 28, overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(232,101,26,0.06) 0%, rgba(212,160,23,0.06) 100%)', border: '1px solid rgba(232,101,26,0.15)', borderRadius: 16, padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <MapPin size={16} color="var(--saffron)" />
                        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-muted)' }}>{from} <ArrowRight size={13} style={{ display: 'inline' }} /> {to} · {estimate.distance} km</span>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-light)' }}>
                        {vehicleTypes.find(v => v.id === vehicle)?.label} · {tripType === 'round' ? 'Round Trip' : 'One Way'}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Estimated Fare</div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: couponResult?.valid ? 'var(--text-light)' : 'var(--saffron)', textDecoration: couponResult?.valid ? 'line-through' : 'none' }}>₹{estimate.total.toLocaleString()}</div>
                      {couponResult?.valid && (
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: 'var(--green)' }}>₹{finalPrice.toLocaleString()}</div>
                      )}
                    </div>
                  </div>

                  {/* Coupon */}
                  <div style={{ borderTop: '1px solid rgba(232,101,26,0.1)', paddingTop: 20 }}>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <Tag size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--saffron)' }} />
                        <input className="form-input" placeholder="Have a coupon code?" value={couponCode} onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponResult(null); }} style={{ paddingLeft: 36 }} />
                      </div>
                      <button onClick={applyCoupon} disabled={!couponCode} className="btn-secondary" style={{ whiteSpace: 'nowrap', opacity: !couponCode ? 0.5 : 1 }}>Apply</button>
                    </div>
                    {couponResult && (
                      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: couponResult.valid ? 'var(--green)' : 'var(--red)', fontWeight: 500 }}>
                        {couponResult.valid ? <Check size={15} /> : <X size={15} />}
                        {couponResult.valid ? `${couponResult.message} — You save ₹${couponResult.discount}!` : couponResult.message}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
                    <Link href={`/booking?from=${from}&to=${to}&vehicle=${vehicle}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Book This Ride</Link>
                    <Link href="/contact" className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Call for Custom Quote</Link>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 12, textAlign: 'center' }}>* Estimate only. Actual fare may vary based on tolls, waiting time, and route changes.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
