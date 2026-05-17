'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill in required fields.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success('Message sent! We\'ll respond within 2 hours.');
  };

  const contactInfo = [
    { icon: Phone, label: 'Call / WhatsApp', value: '+91 98765 43210', href: 'tel:+919876543210', sub: 'Available 24/7' },
    { icon: Mail, label: 'Email Us', value: 'info@rashmitours.in', href: 'mailto:info@rashmitours.in', sub: 'Reply within 2 hours' },
    { icon: MapPin, label: 'Visit Us', value: '45 Anna Nagar Main Road, Madurai – 625020', href: 'https://maps.google.com', sub: 'Tamil Nadu, India' },
    { icon: Clock, label: 'Working Hours', value: 'Open 24 Hours', href: undefined, sub: 'All days, all year' },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, var(--deep) 0%, var(--deep-2) 100%)', padding: '80px 24px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span style={{ display: 'inline-block', background: 'rgba(232,101,26,0.2)', color: 'var(--gold-light)', padding: '6px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>Get in Touch</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>Contact Us</h1>
            <p style={{ color: 'rgba(253,248,240,0.75)', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>We're always happy to help. Reach out for bookings, queries, or just to say hello!</p>
          </motion.div>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48, alignItems: 'start' }}>
            
            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: 'var(--deep)', marginBottom: 32 }}>How to Reach Us</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {contactInfo.map(({ icon: Icon, label, value, href, sub }) => (
                  <motion.div key={label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 20, background: 'white', borderRadius: 16, border: '1px solid rgba(232,101,26,0.08)', transition: 'all 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,101,26,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-warm)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,101,26,0.08)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, rgba(232,101,26,0.12), rgba(212,160,23,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color="var(--saffron)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--saffron)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                      {href ? (
                        <a href={href} style={{ fontSize: 15, fontWeight: 600, color: 'var(--deep)', textDecoration: 'none' }}>{value}</a>
                      ) : (
                        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--deep)' }}>{value}</div>
                      )}
                      <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 2 }}>{sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener"
                style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#25D366', color: 'white', padding: '14px 24px', borderRadius: 50, fontWeight: 600, fontSize: 15, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'none'}>
                <MessageSquare size={18} /> Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div style={{ background: 'white', borderRadius: 24, padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 8px 40px rgba(26,15,5,0.08)', border: '1px solid rgba(232,101,26,0.08)' }}>
              {sent ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: 'var(--deep)', marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Thank you, {form.name}! We'll get back to you at {form.email || form.phone} within 2 hours.</p>
                  <button onClick={() => setSent(false)} className="btn-secondary" style={{ marginTop: 24 }}>Send Another Message</button>
                </motion.div>
              ) : (
                <>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: 'var(--deep)', marginBottom: 28 }}>Send Us a Message</h2>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label className="form-label">Your Name *</label>
                        <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name" required />
                      </div>
                      <div>
                        <label className="form-label">Phone Number *</label>
                        <input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" type="tel" required />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" type="email" />
                    </div>
                    <div>
                      <label className="form-label">Subject</label>
                      <select className="form-input" value={form.subject} onChange={e => set('subject', e.target.value)}>
                        <option value="">Select a subject</option>
                        <option>Booking Inquiry</option>
                        <option>Package Information</option>
                        <option>Custom Tour Request</option>
                        <option>Complaint / Feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Message *</label>
                      <textarea className="form-input" value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us how we can help you..." rows={5} required style={{ resize: 'vertical' }} />
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center', padding: '16px' }}>
                      {loading ? 'Sending...' : <><Send size={17} /> Send Message</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
