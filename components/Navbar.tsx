'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/#fare-estimator', label: 'Fare Estimator' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div style={{ background: 'var(--deep)', color: 'var(--cream)', padding: '8px 0', fontSize: '13px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gold-light)', textDecoration: 'none', fontWeight: 500 }}>
              <Phone size={13} /> +91 98765 43210
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(253,248,240,0.7)' }}>
              <MapPin size={13} /> Madurai, Tamil Nadu
            </span>
          </div>
          <span style={{ color: 'rgba(253,248,240,0.6)' }}>Available 24/7 — Safe, Reliable, On Time</span>
        </div>
      </div>

      {/* Main nav */}
      <motion.nav
        initial={false}
        animate={scrolled ? { boxShadow: '0 4px 30px rgba(26,15,5,0.15)', background: 'rgba(253,248,240,0.97)' } : { boxShadow: 'none', background: 'rgba(253,248,240,1)' }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(232,101,26,0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 72 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'white', fontWeight: 900, fontFamily: 'Playfair Display, serif', boxShadow: '0 4px 16px rgba(232,101,26,0.4)' }}>
              R
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 18, color: 'var(--deep)', lineHeight: 1.1 }}>Rashmi Tours</div>
              <div style={{ fontSize: 11, color: 'var(--saffron)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>& Travels</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden md:flex">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} style={{ padding: '8px 18px', borderRadius: '50px', color: 'var(--text-muted)', fontWeight: 500, fontSize: 15, textDecoration: 'none', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--saffron)'; (e.target as HTMLElement).style.background = 'rgba(232,101,26,0.08)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--text-muted)'; (e.target as HTMLElement).style.background = 'transparent'; }}>
                {link.label}
              </Link>
            ))}
            <Link href="/booking" className="btn-primary" style={{ padding: '10px 24px', fontSize: 14, marginLeft: 8 }}>
              Book Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--deep)', display: 'flex', padding: 8 }} className="md:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', background: 'white', borderTop: '1px solid rgba(232,101,26,0.1)' }}
            >
              <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                    style={{ padding: '12px 16px', color: 'var(--text-main)', fontWeight: 500, textDecoration: 'none', borderRadius: 8, fontSize: 16, borderBottom: '1px solid rgba(232,101,26,0.06)' }}>
                    {link.label}
                  </Link>
                ))}
                <Link href="/booking" className="btn-primary" onClick={() => setMenuOpen(false)}
                  style={{ marginTop: 12, justifyContent: 'center' }}>
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
