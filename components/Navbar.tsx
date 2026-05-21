'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE = '+919790699932';
const PHONE_DISPLAY = '+91 97906 99932';

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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Top bar */}
      <div style={{ background: 'var(--deep)', color: 'var(--cream)', padding: '7px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gold-light)', textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>
            <Phone size={13} /> {PHONE_DISPLAY}
          </a>
          <span className="topbar-tagline" style={{ color: 'rgba(253,248,240,0.55)', fontSize: 12 }}>
            Available 24/7 · Safe &amp; Reliable
          </span>
        </div>
      </div>

      {/* Main nav */}
      <motion.nav
        initial={false}
        animate={scrolled ? { boxShadow: '0 4px 24px rgba(26,15,5,0.12)' } : { boxShadow: 'none' }}
        style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(253,248,240,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(232,101,26,0.1)' }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'white', fontWeight: 900, fontFamily: 'Playfair Display, serif', boxShadow: '0 3px 12px rgba(232,101,26,0.35)', flexShrink: 0 }}>
              R
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16, color: 'var(--deep)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>Rashmi Tours</div>
              <div style={{ fontSize: 10, color: 'var(--saffron)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>&amp; Travels</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                style={{ padding: '8px 15px', borderRadius: 50, color: 'var(--text-muted)', fontWeight: 500, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--saffron)'; (e.currentTarget as HTMLElement).style.background = 'rgba(232,101,26,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                {link.label}
              </Link>
            ))}
            <Link href="/booking" className="btn-primary" style={{ padding: '10px 22px', fontSize: 14, marginLeft: 6 }}>
              Book Now
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="mobile-controls" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href={`tel:${PHONE}`} className="btn-primary" style={{ padding: '9px 14px', fontSize: 13 }}>
              <Phone size={14} /> Call
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: menuOpen ? 'rgba(232,101,26,0.08)' : 'none', border: '1px solid', borderColor: menuOpen ? 'rgba(232,101,26,0.2)' : 'transparent', borderRadius: 8, cursor: 'pointer', color: 'var(--deep)', display: 'flex', padding: 8, alignItems: 'center', justifyContent: 'center', minWidth: 40, minHeight: 40 }}
              aria-label="Toggle navigation">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
              style={{ overflow: 'hidden', background: 'white', borderTop: '1px solid rgba(232,101,26,0.08)' }}>
              <div style={{ padding: '10px 16px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                    style={{ padding: '15px 12px', color: 'var(--text-main)', fontWeight: 500, textDecoration: 'none', borderRadius: 10, fontSize: 16, borderBottom: '1px solid rgba(232,101,26,0.06)', display: 'flex', alignItems: 'center', minHeight: 52 }}>
                    {link.label}
                  </Link>
                ))}
                <Link href="/booking" className="btn-primary" onClick={() => setMenuOpen(false)}
                  style={{ marginTop: 14, fontSize: 16, padding: '15px' }}>
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        .desktop-nav { display: none !important; }
        .mobile-controls { display: flex !important; }
        .topbar-tagline { display: none; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-controls { display: none !important; }
          .topbar-tagline { display: block; }
        }
      `}</style>
    </>
  );
}
