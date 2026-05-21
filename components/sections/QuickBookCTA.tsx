'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, MessageSquare } from 'lucide-react';

const PHONE = '+919790699932';
const PHONE_DISPLAY = '+91 97906 99932';

export default function QuickBookCTA() {
  return (
    <section className="section" style={{ background: 'var(--cream-dark)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          style={{ background: 'linear-gradient(135deg, var(--deep) 0%, var(--deep-2) 100%)', borderRadius: 24, padding: 'clamp(36px,6vw,68px) clamp(20px,5vw,64px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(232,101,26,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-tag" style={{ background: 'rgba(232,101,26,0.18)', color: 'var(--gold-light)' }}>Ready to Travel?</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,5vw,50px)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.15 }}>
              Your Journey Starts<br />with a Single Call
            </h2>
            <p style={{ color: 'rgba(253,248,240,0.68)', fontSize: 'clamp(14px,2vw,17px)', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Call us for instant confirmation, or book online and we'll reach you within 30 minutes.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`tel:${PHONE}`} className="btn-primary" style={{ fontSize: 'clamp(14px,1.8vw,16px)', padding: 'clamp(13px,2vw,16px) clamp(18px,3vw,32px)' }}>
                <Phone size={17} /> {PHONE_DISPLAY}
              </a>
              <Link href="/booking" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 'clamp(14px,1.8vw,16px)', padding: 'clamp(12px,2vw,15px) clamp(18px,3vw,30px)', borderRadius: 50, border: '2px solid rgba(255,255,255,0.38)', color: 'white', textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                Book Online <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ marginTop: 28 }}>
              <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: '#4ADE80', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
                <MessageSquare size={16} /> Chat on WhatsApp →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
