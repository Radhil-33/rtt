'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE = '+919790699932';
const PHONE_DISPLAY = '+91 97906 99932';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/itinerary', label: 'Planner' },
  { href: '/vehicles', label: 'Our Vehicles' },
  { href: '/hotels-restaurants', label: 'Hotels & Dining' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === 'dark';

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
      <div style={{ background: '#0B2344', color: 'var(--ivory)', padding: '7px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#D4AF37', textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>
            <Phone size={13} /> {PHONE_DISPLAY}
          </a>
          <span className="topbar-tagline" style={{ color: 'rgba(248,246,240,0.55)', fontSize: 12 }}>
            Available 24/7 · Safe &amp; Reliable
          </span>
        </div>
      </div>

      {/* Main nav */}
      <motion.nav
        initial={false}
        animate={scrolled ? { boxShadow: 'var(--shadow-navy)' } : { boxShadow: 'none' }}
        style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--nav-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--nav-border)' }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <img src={isDark ? "/Dark Mode Logo.png" : "/Light Mode Logo.png"} alt="R" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16, color: 'var(--text-heading)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>Rashmi Tours</div>
              <div style={{ fontSize: 10, color: '#D4AF37', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>&amp; Travels</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                style={{ padding: '8px 15px', borderRadius: 50, color: 'var(--nav-link)', fontWeight: 500, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--nav-link-hover)'; (e.currentTarget as HTMLElement).style.background = 'var(--nav-link-hover-bg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--nav-link)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/booking"
              style={{ padding: '10px 22px', fontSize: 14, marginLeft: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#0B2344', color: 'white', borderRadius: 50, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D4AF37'; (e.currentTarget as HTMLElement).style.color = '#0B2344'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0B2344'; (e.currentTarget as HTMLElement).style.color = 'white'; }}>
              Book Now
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="mobile-controls" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href={`tel:${PHONE}`}
              style={{ padding: '9px 14px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, background: '#0B2344', color: 'white', borderRadius: 50, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D4AF37'; (e.currentTarget as HTMLElement).style.color = '#0B2344'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0B2344'; (e.currentTarget as HTMLElement).style.color = 'white'; }}>
              <Phone size={14} /> Call
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: menuOpen ? 'rgba(11,35,68,0.08)' : 'none', border: '1px solid', borderColor: menuOpen ? 'rgba(11,35,68,0.2)' : 'transparent', borderRadius: 8, cursor: 'pointer', color: 'var(--text-heading)', display: 'flex', padding: 8, alignItems: 'center', justifyContent: 'center', minWidth: 40, minHeight: 40 }}
              aria-label="Toggle navigation">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
              style={{ overflow: 'hidden', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ padding: '10px 16px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                    style={{ padding: '15px 12px', color: 'var(--text-heading)', fontWeight: 500, textDecoration: 'none', borderRadius: 10, fontSize: 16, borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', minHeight: 52 }}>
                    {link.label}
                  </Link>
                ))}
                <Link href="/booking" onClick={() => setMenuOpen(false)}
                  style={{ marginTop: 14, fontSize: 16, padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0B2344', color: 'white', borderRadius: 50, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D4AF37'; (e.currentTarget as HTMLElement).style.color = '#0B2344'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0B2344'; (e.currentTarget as HTMLElement).style.color = 'white'; }}>
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
