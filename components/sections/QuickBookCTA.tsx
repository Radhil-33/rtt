'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, MessageSquare } from 'lucide-react';

export default function QuickBookCTA() {
  return (
    <section style={{ padding: '80px 24px', background: 'var(--cream-dark)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ background: 'linear-gradient(135deg, var(--deep) 0%, var(--deep-2) 100%)', borderRadius: 28, padding: 'clamp(40px, 6vw, 72px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,101,26,0.12) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ display: 'inline-block', background: 'rgba(232,101,26,0.2)', color: 'var(--gold-light)', padding: '6px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 20 }}>
              Ready to Travel?
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 700, color: 'white', marginBottom: 18, lineHeight: 1.15 }}>
              Your Journey Starts<br />with a Single Call
            </h2>
            <p style={{ color: 'rgba(253,248,240,0.7)', fontSize: 17, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
              Call us now for instant booking confirmation, or fill our online form and we'll reach you within 30 minutes.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+919876543210" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
                <Phone size={18} /> Call Now: +91 98765 43210
              </a>
              <Link href="/booking" className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', fontSize: 16, padding: '16px 36px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                Book Online <ArrowRight size={18} />
              </Link>
            </div>

            <div style={{ marginTop: 32 }}>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#4ADE80', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#86EFAC'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4ADE80'}>
                <MessageSquare size={17} /> Or chat on WhatsApp →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
