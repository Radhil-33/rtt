'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Check, Percent, Building, Utensils, Star, Phone, User, Calendar, Tag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface HotelPartner {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  benefits: string[];
  regularPrice: number;
  rashmiPrice: number;
  stars: number;
}

interface RestaurantPartner {
  id: string;
  name: string;
  location: string;
  cuisine: string;
  rating: number;
  image: string;
  deal: string;
  famousFor: string;
}

const HOTEL_PARTNERS: HotelPartner[] = [
  {
    id: 'h1',
    name: 'Grand Gardenia',
    location: 'Trichy (Prime Location)',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    benefits: ['Free Premium Breakfast', 'AC Executive Room', 'Early Check-in Assist'],
    regularPrice: 4200,
    rashmiPrice: 2950,
    stars: 4
  },
  {
    id: 'h2',
    name: 'Hotel Rameshwaram Grand',
    location: 'Rameswaram (Near Temple)',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    benefits: ['Walkable to Ramanathaswamy Temple', 'Priority Parking Included', 'AC Deluxe Room'],
    regularPrice: 3600,
    rashmiPrice: 2500,
    stars: 3
  },
  {
    id: 'h3',
    name: 'The Carlton',
    location: 'Kodaikanal (Lakefront Resort)',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    benefits: ['Lake-facing Luxury Room', 'Welcome Drinks', 'Discounted Boating & Spa'],
    regularPrice: 7800,
    rashmiPrice: 5600,
    stars: 5
  },
  {
    id: 'h4',
    name: 'Sterling Ooty Elk Hill',
    location: 'Ooty (Panoramic Valley)',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
    benefits: ['Valley View Deluxe Room', 'Complimentary Buffet Breakfast', 'Kids Play Area Access'],
    regularPrice: 6500,
    rashmiPrice: 4750,
    stars: 4
  },
  {
    id: 'h5',
    name: 'Tea Country Resort',
    location: 'Munnar (Tea Garden Views)',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    benefits: ['Premium AC Cottage', 'Sprawling Garden Views', 'Free Tea Plantation Walk'],
    regularPrice: 7200,
    rashmiPrice: 5100,
    stars: 4
  },
  {
    id: 'h6',
    name: 'Sea Shore Hotel',
    location: 'Kanyakumari (Ocean Front)',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    benefits: ['Sunrise-facing Ocean View Room', 'Free High-speed Wi-Fi', '2 min walk to Beach'],
    regularPrice: 4000,
    rashmiPrice: 2800,
    stars: 3
  }
];

const RESTAURANT_PARTNERS: RestaurantPartner[] = [
  {
    id: 'r1',
    name: 'Banana Leaf Restaurant',
    location: 'Trichy',
    cuisine: 'South Indian Veg & Non-Veg',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80',
    deal: 'Flat 15% discount on the entire food bill',
    famousFor: 'Traditional Banana Leaf Meals & Biryani'
  },
  {
    id: 'r2',
    name: 'Famous Jigarthanda Stall & Mess',
    location: 'Madurai',
    cuisine: 'Traditional Madurai Street Food & Dessert',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80',
    deal: '10% bill discount + complimentary Special Jigarthanda per table',
    famousFor: 'Madurai jigarthanda & Bun Parotta'
  },
  {
    id: 'r3',
    name: 'Sri Saravana Bhavan',
    location: 'Rameswaram (Temple Road)',
    cuisine: 'Pure Vegetarian South Indian',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=800&q=80',
    deal: 'Priority seating & complimentary traditional Filter Coffee',
    famousFor: 'Crispy Dosas, Ghee Idli & Sambar Vada'
  },
  {
    id: 'r4',
    name: 'Hilltop Restaurant',
    location: 'Kodaikanal',
    cuisine: 'Multi-cuisine (Indian, Chinese, Tandoori)',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    deal: 'Flat 10% bill discount + free dessert on orders above ₹1,000',
    famousFor: 'Hot Tandoori Starters & Scenic Valley Dining'
  }
];

export default function HotelsRestaurantsPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'both', // 'hotel' | 'restaurant' | 'both'
    destination: 'Trichy',
    date: '',
    guests: '2',
    budget: 'Premium', // 'Budget' | 'Premium' | 'Luxury'
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.date) {
      toast.error('Please fill in required fields.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/services-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          serviceType: form.serviceType,
          destination: form.destination,
          date: form.date,
          guests: form.guests,
          budget: form.budget,
          message: form.notes
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitted(true);
      toast.success('Your booking request has been sent successfully!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to submit booking enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '90vh', background: 'var(--bg-page)' }}>
        {/* Banner Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #0B2344 0%, #071523 100%)',
          padding: 'clamp(56px,7vw,90px) 16px',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="section-tag" style={{ background: 'rgba(212,175,55,0.18)', color: '#D4AF37' }}>
              Premium Booking Deals
            </span>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 5.5vw, 52px)',
              fontWeight: 700,
              color: 'white',
              marginBottom: 14
            }}>
              Hotels &amp; Dining Bookings
            </h1>
            <p style={{
              color: 'var(--text-on-dark-muted)',
              fontSize: 16,
              maxWidth: 580,
              margin: '0 auto'
            }}>
              Through our direct tie-ups with top-rated hotels and dining outlets across South India, enjoy rates cheaper than booking online or directly!
            </p>
          </motion.div>
        </div>

        {/* Core Value Props Row */}
        <div className="container" style={{ paddingTop: 48, paddingBottom: 16 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginBottom: 48
          }}>
            {[
              { icon: Percent, title: 'Cheaper Than Online', desc: 'Direct corporate volume agreements mean up to 30% savings over OTA websites.' },
              { icon: ShieldCheck, title: 'Zero Advance Payments', desc: 'Book securely through us and pay directly at check-in or checkout.' },
              { icon: Check, title: 'VIP Guest Treatment', desc: 'Our guests receive free welcome drinks, priority seating, and early check-in assists.' }
            ].map((prop, idx) => (
              <div key={idx} style={{
                background: 'white',
                border: '1px solid var(--border-light)',
                borderRadius: 16,
                padding: '24px 20px',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                boxShadow: '0 4px 18px rgba(7,21,35,0.02)'
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'var(--tag-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <prop.icon size={20} color={isDark ? "#D4AF37" : "#0B2344"} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 6px', color: 'var(--navy)', fontWeight: 700, fontSize: 15 }}>{prop.title}</h4>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-body)', lineHeight: 1.5 }}>{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Hotel Partners */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="section-tag">Partner Hotels</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 4.5vw, 36px)', color: 'var(--navy)', fontWeight: 700, margin: '8px 0 10px' }}>
                Handpicked Discounted Hotels
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: 14, maxWidth: 500, margin: '0 auto' }}>
                Enjoy exclusive rooms discounts in major South India stops. Direct reservations handled by our team.
              </p>
            </div>

            <div className="grid-3">
              {HOTEL_PARTNERS.map(h => {
                const discountPercent = Math.round(((h.regularPrice - h.rashmiPrice) / h.regularPrice) * 100);
                return (
                  <div key={h.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      <img src={h.image} alt={h.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: 'var(--navy)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: 12,
                        padding: '4px 10px',
                        borderRadius: 30,
                        boxShadow: '0 2px 8px rgba(26,15,5,0.2)'
                      }}>
                        Save {discountPercent}%
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        background: 'rgba(26,15,5,0.7)',
                        backdropFilter: 'blur(8px)',
                        color: 'white',
                        fontSize: 11,
                        padding: '4px 10px',
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Star size={11} fill="#D4AF37" color="#D4AF37" />
                        <strong>{h.rating} Rating</strong>
                      </div>
                    </div>

                    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <span style={{ fontSize: 11, color: isDark ? '#D4AF37' : '#0B2344', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {h.location}
                      </span>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--navy)', fontWeight: 700, margin: '4px 0 12px' }}>
                        {h.name}
                      </h3>

                      {/* Hotel Stars */}
                      <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                        {[...Array(h.stars)].map((_, i) => (
                          <Star key={i} size={13} fill="#D4AF37" color="#D4AF37" />
                        ))}
                      </div>

                      {/* Benefits list */}
                      <ul style={{ listStyle: 'none', margin: '0 0 20px', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {h.benefits.map(b => (
                          <li key={b} style={{ fontSize: 12, color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ color: '#2E8B57', fontWeight: 900 }}>✓</span> {b}
                          </li>
                        ))}
                      </ul>

                      {/* Pricing Row */}
                      <div style={{
                        marginTop: 'auto',
                        paddingTop: 16,
                        borderTop: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <span style={{ display: 'block', fontSize: 10, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            Online Price: ₹{h.regularPrice.toLocaleString()}
                          </span>
                          <span style={{ fontSize: 11, color: 'var(--text-body)' }}>
                            Rashmi Price:
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <strong style={{ fontSize: 20, color: isDark ? '#D4AF37' : '#0B2344', fontFamily: 'Playfair Display, serif' }}>
                            ₹{h.rashmiPrice.toLocaleString()}
                          </strong>
                          <span style={{ display: 'block', fontSize: 9, color: 'var(--text-muted)' }}>
                            / night + tax
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Dining / Restaurants */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="section-tag">Partner Restaurants</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 4.5vw, 36px)', color: 'var(--navy)', fontWeight: 700, margin: '8px 0 10px' }}>
                Exclusive Dining Vouchers
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: 14, maxWidth: 500, margin: '0 auto' }}>
                Dine at South India\'s legendary culinary hotspots with free treats and flat discounts reserved just for our cab guests.
              </p>
            </div>

            <div className="grid-2">
              {RESTAURANT_PARTNERS.map(r => (
                <div key={r.id} className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 0, overflow: 'hidden' }}>
                  {/* Left: Image */}
                  <div style={{ flex: '1 1 240px', height: 220, position: 'relative' }}>
                    <img src={r.image} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute',
                      bottom: 12,
                      left: 12,
                      background: 'var(--navy)',
                      color: 'var(--gold)',
                      fontWeight: 700,
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 6
                    }}>
                      {r.cuisine}
                    </div>
                  </div>

                  {/* Right: Info */}
                  <div style={{ flex: '1.2 1 280px', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontSize: 11, color: isDark ? '#D4AF37' : '#0B2344', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {r.location}
                    </span>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, color: 'var(--navy)', fontWeight: 700, margin: '4px 0 10px' }}>
                      {r.name}
                    </h3>
                    <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--text-body)', lineHeight: 1.5 }}>
                      <strong>Famous For:</strong> {r.famousFor}
                    </p>

                    {/* Deal Badge */}
                    <div style={{
                      background: 'var(--tag-bg)',
                      border: '1px solid var(--border-mid)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      color: isDark ? '#D4AF37' : '#0B2344',
                      fontWeight: 600,
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginTop: 'auto'
                    }}>
                      <Tag size={14} />
                      <span>{r.deal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Booking Request Form */}
          <div id="enquiry-form" style={{ maxWidth: 840, margin: '0 auto 60px' }}>
            <div style={{
              background: 'white',
              borderRadius: 24,
              padding: 'clamp(24px, 5vw, 44px)',
              boxShadow: 'var(--shadow-navy)',
              border: '1px solid var(--border-light)'
            }}>
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    style={{ textAlign: 'center', padding: '40px 0' }}
                  >
                    <div style={{
                      width: 76,
                      height: 76,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2E8B57, #1E5D3A)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 32,
                      margin: '0 auto 22px',
                      boxShadow: '0 6px 20px rgba(45,122,79,0.25)'
                    }}>
                      ✓
                    </div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 4vw, 30px)', color: 'var(--navy)', fontWeight: 700, marginBottom: 12 }}>
                      Enquiry Submitted!
                    </h2>
                    <p style={{ color: 'var(--text-body)', fontSize: 15, maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.7 }}>
                      Thank you, <strong>{form.name}</strong>! We have received your booking request for <strong>{form.destination}</strong> on <strong>{form.date}</strong>. Our travel officers will reach out on WhatsApp/Call in 30 minutes to confirm your discounts.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-secondary">
                      Make Another Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div style={{ textAlign: 'center', marginBottom: 36 }}>
                      <span className="section-tag">Claim Your Discounts</span>
                      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 4vw, 28px)', color: 'var(--navy)', fontWeight: 700, margin: '6px 0 8px' }}>
                        Book Hotels &amp; Dining
                      </h2>
                      <p style={{ color: 'var(--text-body)', fontSize: 14 }}>
                        Fill out the details below. We handle all reservations and pass the discount to you directly.
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      
                      {/* Row 1: Personal Info */}
                      <div className="form-row-3">
                        <div>
                          <label className="form-label">Full Name *</label>
                          <div style={{ position: 'relative' }}>
                            <input
                              className="form-input"
                              placeholder="Your name"
                              value={form.name}
                              onChange={e => set('name', e.target.value)}
                              required
                            />
                            <User size={15} color="var(--text-muted)" style={{ position: 'absolute', right: 14, top: 16 }} />
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Phone Number *</label>
                          <div style={{ position: 'relative' }}>
                            <input
                              className="form-input"
                              type="tel"
                              placeholder="WhatsApp number"
                              value={form.phone}
                              onChange={e => set('phone', e.target.value)}
                              required
                            />
                            <Phone size={15} color="var(--text-muted)" style={{ position: 'absolute', right: 14, top: 16 }} />
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Email Address</label>
                          <input
                            className="form-input"
                            type="email"
                            placeholder="you@email.com"
                            value={form.email}
                            onChange={e => set('email', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Row 2: Booking details */}
                      <div className="form-row-3">
                        <div>
                          <label className="form-label">Service Required</label>
                          <select className="form-input" value={form.serviceType} onChange={e => set('serviceType', e.target.value)}>
                            <option value="hotel">Hotels Booking Only</option>
                            <option value="restaurant">Dining Vouchers Only</option>
                            <option value="both">Both Hotels &amp; Dining</option>
                          </select>
                        </div>
                        <div>
                          <label className="form-label">Destination City</label>
                          <select className="form-input" value={form.destination} onChange={e => set('destination', e.target.value)}>
                            <option>Trichy</option>
                            <option>Tanjore</option>
                            <option>Madurai</option>
                            <option>Rameswaram</option>
                            <option>Kodaikanal</option>
                            <option>Ooty</option>
                            <option>Munnar</option>
                            <option>Kanyakumari</option>
                            <option>Pondicherry</option>
                            <option>Chennai</option>
                          </select>
                        </div>
                        <div>
                          <label className="form-label">Travel / Check-in Date *</label>
                          <div style={{ position: 'relative' }}>
                            <input
                              className="form-input"
                              type="date"
                              min={new Date().toISOString().split('T')[0]}
                              value={form.date}
                              onChange={e => set('date', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Guests & Budget */}
                      <div className="form-row-2">
                        <div>
                          <label className="form-label">Number of Guests</label>
                          <input
                            className="form-input"
                            type="number"
                            min="1"
                            max="50"
                            value={form.guests}
                            onChange={e => set('guests', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="form-label">Preferred Hotel Class</label>
                          <select className="form-input" value={form.budget} onChange={e => set('budget', e.target.value)}>
                            <option value="Budget">Budget Friendly (₹1,500 - ₹2,500/night)</option>
                            <option value="Premium">Premium Comfort (₹2,500 - ₹4,500/night)</option>
                            <option value="Luxury">Luxury Resort (₹4,500 - ₹9,000+/night)</option>
                          </select>
                        </div>
                      </div>

                      {/* Special Notes */}
                      <div>
                        <label className="form-label">Special Requests / Preferences</label>
                        <textarea
                          className="form-input"
                          rows={3}
                          placeholder="e.g. Extra beds, pure veg restaurants, near temple corridor, lake-view preferred..."
                          style={{ resize: 'vertical' }}
                          value={form.notes}
                          onChange={e => set('notes', e.target.value)}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{
                          width: '100%',
                          padding: 16,
                          fontSize: 16,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          marginTop: 10
                        }}
                      >
                        {loading ? (
                          <span>Sending Reservation Request...</span>
                        ) : (
                          <>
                            <span>Request Special Booking Discounts</span>
                            <ArrowRight size={17} />
                          </>
                        )}
                      </button>

                      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                        Your details are processed securely. Pay directly at the venue during checkout. Discount applies instantly.
                      </p>

                    </div>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </main>
      <Footer />

      {/* Responsive Row Styles */}
      <style>{`
        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 560px) {
          .form-row-3 { grid-template-columns: 1fr 1fr; }
          .form-row-2 { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 800px) {
          .form-row-3 { grid-template-columns: 1fr 1fr 1fr; }
        }
      `}</style>
    </>
  );
}
