'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Car, Calendar, User, Phone, Mail, MapPin, Tag, Check, X, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSiteStore } from '@/store/useSiteStore';
import { vehicleTypes } from '@/lib/siteData';
import type { Metadata } from 'next';

function BookingForm() {
  const params = useSearchParams();
  const { fareRules, validateCoupon, packages } = useSiteStore();

  const origins = [...new Set(fareRules.map(r => r.from))];
  const preselectedPkg = params.get('package');
  const pkg = preselectedPkg ? packages.find(p => p.id === preselectedPkg) : null;

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    from: params.get('from') || 'Madurai',
    to: params.get('to') || (pkg?.destinations?.[1] || ''),
    vehicle: params.get('vehicle') || 'sedan',
    tripType: 'one-way',
    travelDate: '', pickupTime: '', passengers: '1',
    notes: '', coupon: '',
  });

  const [couponResult, setCouponResult] = useState<{ valid: boolean; discount: number; message: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const destinations = fareRules.filter(r => r.from === form.from).map(r => r.to);
  const rule = fareRules.find(r => r.from === form.from && r.to === form.to);
  const veh = vehicleTypes.find(v => v.id === form.vehicle)!;

  let estimatedFare = 0;
  if (rule && veh) {
    const base = Math.round((rule.basePrice + rule.pricePerKm * rule.distanceKm) * veh.multiplier);
    estimatedFare = form.tripType === 'round' ? Math.round(base * 1.85) : base;
  }

  const finalFare = couponResult?.valid ? estimatedFare - couponResult.discount : estimatedFare;

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const applyCoupon = () => {
    const result = validateCoupon(form.coupon, estimatedFare);
    setCouponResult(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.to || !form.travelDate) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success('Booking request sent! We\'ll confirm within 30 minutes.');
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', maxWidth: 520 }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36 }}>✓</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: 'var(--deep)', marginBottom: 16 }}>Booking Request Sent!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Thank you, <strong>{form.name}</strong>! We've received your booking request for <strong>{form.from} → {form.to}</strong> on <strong>{form.travelDate}</strong>. Our team will call you at <strong>{form.phone}</strong> within 30 minutes to confirm.
          </p>
          {couponResult?.valid && (
            <div style={{ background: 'rgba(45,122,79,0.1)', border: '1px solid rgba(45,122,79,0.3)', borderRadius: 12, padding: '12px 20px', marginBottom: 24, color: 'var(--green)', fontWeight: 600 }}>
              🎉 Coupon applied! You saved ₹{couponResult.discount}
            </div>
          )}
          <button onClick={() => setSubmitted(false)} className="btn-secondary">Make Another Booking</button>
        </motion.div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span style={{ display: 'inline-block', background: 'rgba(232,101,26,0.1)', color: 'var(--saffron)', padding: '6px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Book a Cab</span>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--deep)' }}>
          {pkg ? `Book: ${pkg.title}` : 'Book Your Ride'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 16, marginTop: 12 }}>Fill the form below and we'll confirm your booking within 30 minutes.</p>
      </div>

      <div style={{ background: 'white', borderRadius: 24, padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 8px 40px rgba(26,15,5,0.08)', border: '1px solid rgba(232,101,26,0.08)' }}>
        
        {/* Section: Personal Info */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--deep)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <User size={18} color="var(--saffron)" /> Personal Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <div>
              <label className="form-label">Full Name *</label>
              <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" required />
            </div>
            <div>
              <label className="form-label">Phone Number *</label>
              <input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 9790699932" type="tel" required />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" type="email" />
            </div>
          </div>
        </div>

        {/* Section: Trip Details */}
        <div style={{ marginBottom: 32, paddingTop: 24, borderTop: '1px solid rgba(232,101,26,0.08)' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--deep)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={18} color="var(--saffron)" /> Trip Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <label className="form-label">From *</label>
              <select className="form-input" value={form.from} onChange={e => { set('from', e.target.value); set('to', ''); }}>
                {origins.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">To *</label>
              <select className="form-input" value={form.to} onChange={e => set('to', e.target.value)} required>
                <option value="">Select destination</option>
                {destinations.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Travel Date *</label>
              <input className="form-input" type="date" value={form.travelDate} onChange={e => set('travelDate', e.target.value)} min={new Date().toISOString().split('T')[0]} required />
            </div>
            <div>
              <label className="form-label">Pickup Time *</label>
              <input className="form-input" type="time" value={form.pickupTime} onChange={e => set('pickupTime', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 16 }}>
            <div>
              <label className="form-label">Vehicle Type</label>
              <select className="form-input" value={form.vehicle} onChange={e => set('vehicle', e.target.value)}>
                {vehicleTypes.map(v => <option key={v.id} value={v.id}>{v.label} ({v.capacity})</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Passengers</label>
              <input className="form-input" type="number" min="1" max="12" value={form.passengers} onChange={e => set('passengers', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Trip Type</label>
              <select className="form-input" value={form.tripType} onChange={e => set('tripType', e.target.value)}>
                <option value="one-way">One Way</option>
                <option value="round">Round Trip</option>
              </select>
            </div>
          </div>
        </div>

        {/* Coupon */}
        {estimatedFare > 0 && (
          <div style={{ marginBottom: 32, paddingTop: 24, borderTop: '1px solid rgba(232,101,26,0.08)' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--deep)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag size={18} color="var(--saffron)" /> Coupon Code
            </h3>
            <div style={{ display: 'flex', gap: 12 }}>
              <input className="form-input" placeholder="Enter coupon code (e.g. RASHMI10)" value={form.coupon} onChange={e => { set('coupon', e.target.value.toUpperCase()); setCouponResult(null); }} />
              <button type="button" onClick={applyCoupon} disabled={!form.coupon} className="btn-secondary" style={{ whiteSpace: 'nowrap', opacity: !form.coupon ? 0.5 : 1 }}>Apply</button>
            </div>
            {couponResult && (
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: couponResult.valid ? 'var(--green)' : 'var(--red)', fontWeight: 500 }}>
                {couponResult.valid ? <Check size={15} /> : <X size={15} />}
                {couponResult.valid ? `${couponResult.message} — You save ₹${couponResult.discount}!` : couponResult.message}
              </div>
            )}

            {/* Fare preview */}
            <div style={{ marginTop: 16, background: 'rgba(232,101,26,0.05)', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 15 }}>Estimated Fare: <strong style={{ color: couponResult?.valid ? 'var(--text-light)' : 'var(--deep)', textDecoration: couponResult?.valid ? 'line-through' : 'none' }}>₹{estimatedFare.toLocaleString()}</strong></span>
              {couponResult?.valid && <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: 'var(--green)' }}>₹{finalFare.toLocaleString()}</span>}
              {!couponResult?.valid && <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: 'var(--saffron)' }}>₹{estimatedFare.toLocaleString()}</span>}
            </div>
          </div>
        )}

        {/* Notes */}
        <div style={{ marginBottom: 32, paddingTop: 24, borderTop: '1px solid rgba(232,101,26,0.08)' }}>
          <label className="form-label">Special Requests / Notes</label>
          <textarea className="form-input" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any special requests? Drop/pickup address, temple stops, etc." rows={3} style={{ resize: 'vertical' }} />
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: 17 }}>
          {loading ? 'Sending...' : <><ArrowRight size={18} /> Confirm Booking Request</>}
        </button>
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-light)', marginTop: 12 }}>
          Our team will call you within 30 minutes to confirm. No advance payment required.
        </p>
      </div>
    </form>
  );
}

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: 'var(--cream)' }}>
        <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>}>
          <BookingForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
