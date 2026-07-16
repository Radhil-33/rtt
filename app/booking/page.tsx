'use client';
import { useState, Suspense, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Car, Calendar, User, Phone, Mail, MapPin, Tag, Check, X, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSiteStore } from '@/store/useSiteStore';
import { vehicleTypes } from '@/lib/siteData';

const PHONE = '+919790699932';
const PHONE_DISPLAY = '+91 97906 99932';
const EMAIL = 'bookings@rashmitours.in';
const WA_URL = `https://wa.me/${PHONE}`;

function BookingForm() {
  const params = useSearchParams();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';
  const { fareRules, validateCoupon, packages } = useSiteStore();

  const origins = [...new Set(fareRules.map(r => r.from))];
  const preselectedPkg = params.get('package');
  const pkg = preselectedPkg ? packages.find(p => p.id === preselectedPkg) : null;

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    from: params.get('from') || 'Trichy',
    to: params.get('to') || (pkg?.destinations?.[1] || ''),
    vehicle: params.get('vehicle') || 'etios',
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
    setCouponResult(validateCoupon(form.coupon, estimatedFare));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.to || !form.travelDate) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          from: form.from,
          to: form.to,
          vehicle: veh?.label || form.vehicle,
          tripType: form.tripType,
          travelDate: form.travelDate,
          pickupTime: form.pickupTime,
          passengers: form.passengers,
          estimatedFare: finalFare,
          coupon: couponResult?.valid ? form.coupon : '',
          discount: couponResult?.valid ? couponResult.discount : 0,
          message: form.notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitted(true);
      toast.success('Booking request sent successfully!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to send booking request');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #0B2344, #102A4A)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', fontSize: 32, color: 'white' }}>✓</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,4vw,32px)', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 14 }}>Booking Request Sent!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>
            Thank you, <strong>{form.name}</strong>! Your booking for <strong>{form.from} → {form.to}</strong> on <strong>{form.travelDate}</strong> has been sent successfully. We'll confirm within 30 minutes.
          </p>
          {couponResult?.valid && (
            <div style={{ background: 'rgba(46,139,87,0.09)', border: '1px solid rgba(46,139,87,0.25)', borderRadius: 12, padding: '11px 18px', marginBottom: 22, color: '#2E8B57', fontWeight: 600, fontSize: 14 }}>
              🎉 Coupon applied! You saved ₹{couponResult.discount}
            </div>
          )}
          <button onClick={() => setSubmitted(false)} className="btn-secondary">Make Another Booking</button>
        </motion.div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(16px,3vw,24px)' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span className="section-tag">Book a Cab</span>
        <h1 className="section-title">{pkg ? `Book: ${pkg.title}` : 'Book Your Ride'}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, marginTop: 8 }}>Fill the form below — we'll send confirmation via WhatsApp within 30 minutes.</p>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: 20, padding: 'clamp(20px,4vw,36px)', boxShadow: 'var(--shadow-navy)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Personal Info */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'var(--text-heading)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <User size={16} color={isDark ? "#D4AF37" : "#0B2344"} /> Personal Details
          </h3>
          <div className="booking-row-3">
            <div><label className="form-label">Full Name *</label><input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" required /></div>
            <div><label className="form-label">Phone Number *</label><input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 97906 99932" type="tel" required /></div>
            <div><label className="form-label">Email</label><input className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" type="email" /></div>
          </div>
        </div>

        {/* Trip Details */}
        <div style={{ marginBottom: 28, paddingTop: 24, borderTop: '1px solid var(--border-light)' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'var(--text-heading)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={16} color={isDark ? "#D4AF37" : "#0B2344"} /> Trip Details
          </h3>
          <div className="booking-row-3" style={{ marginBottom: 14 }}>
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
          </div>
          <div className="booking-row-3">
            <div>
              <label className="form-label">Pickup Time</label>
              <input className="form-input" type="time" value={form.pickupTime} onChange={e => set('pickupTime', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Vehicle Type</label>
              <select className="form-input" value={form.vehicle} onChange={e => set('vehicle', e.target.value)}>
                {vehicleTypes.map(v => <option key={v.id} value={v.id}>{v.label} ({v.capacity})</option>)}
              </select>
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
          <div style={{ marginBottom: 28, paddingTop: 24, borderTop: '1px solid var(--border-light)' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'var(--text-heading)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag size={16} color={isDark ? "#D4AF37" : "#0B2344"} /> Coupon Code
            </h3>
            <div style={{ display: 'flex', gap: 10 }}>
              <input className="form-input" placeholder="Enter coupon code (e.g. RASHMI10)" value={form.coupon} onChange={e => { set('coupon', e.target.value.toUpperCase()); setCouponResult(null); }} style={{ flex: 1 }} />
              <button type="button" onClick={applyCoupon} disabled={!form.coupon} className="btn-secondary" style={{ whiteSpace: 'nowrap', opacity: !form.coupon ? 0.5 : 1 }}>Apply</button>
            </div>
            {couponResult && (
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: couponResult.valid ? '#2E8B57' : '#C0392B', fontWeight: 600 }}>
                {couponResult.valid ? <Check size={14} /> : <X size={14} />}
                {couponResult.valid ? `${couponResult.message} — You save ₹${couponResult.discount}!` : couponResult.message}
              </div>
            )}
            <div style={{ marginTop: 14, background: 'var(--tag-bg)', border: '1px solid var(--border-light)', borderRadius: 10, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                Estimated Fare: <strong style={{ color: couponResult?.valid ? 'var(--text-muted)' : 'var(--text-heading)', textDecoration: couponResult?.valid ? 'line-through' : 'none' }}>₹{estimatedFare.toLocaleString()}</strong>
              </span>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,4vw,28px)', fontWeight: 700, color: couponResult?.valid ? '#2E8B57' : '#D4AF37' }}>₹{finalFare.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Notes */}
        <div style={{ marginBottom: 28, paddingTop: 24, borderTop: '1px solid var(--border-light)' }}>
          <label className="form-label">Special Requests / Notes</label>
          <textarea className="form-input" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Pickup address, temple stops, special requirements..." rows={3} style={{ resize: 'vertical' }} />
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '16px', fontSize: 16 }}>
          {loading ? 'Sending Booking Request...' : <><ArrowRight size={17} /> Confirm Booking Request</>}
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.5 }}>
          Your booking request is sent directly to our team. We confirm within 30 minutes. No advance payment needed.
        </p>
      </div>

      <style>{`
        .booking-row-3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 560px) {
          .booking-row-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 860px) {
          .booking-row-3 { grid-template-columns: 1fr 1fr 1fr; }
        }
      `}</style>
    </form>
  );
}

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', background: 'var(--bg-page)' }}>
        <Suspense fallback={<div style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>}>
          <BookingForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
