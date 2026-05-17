'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight, Share2 } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Tour Packages' },
  { href: '/#fare-estimator', label: 'Fare Estimator' },
  { href: '/booking', label: 'Book a Cab' },
  { href: '/contact', label: 'Contact Us' },
];

const popularRoutes = [
  'Madurai → Rameswaram',
  'Madurai → Kodaikanal',
  'Madurai → Ooty',
  'Madurai → Kanyakumari',
  'Madurai → Munnar',
  'Madurai → Chennai',
  'Madurai → Trichy',
  'Madurai → Coimbatore',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--deep)', color: 'var(--cream)', marginTop: 80 }}>
      {/* Main footer */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40 }}>
          
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', fontWeight: 900, fontFamily: 'Playfair Display, serif' }}>R</div>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 20, color: 'white' }}>Rashmi Tours</div>
                <div style={{ fontSize: 11, color: 'var(--gold-light)', fontWeight: 600, letterSpacing: '1px' }}>& TRAVELS</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(253,248,240,0.65)', lineHeight: 1.7, marginBottom: 24 }}>
              Your most trusted travel partner in South India since 2010. Pilgrimages, hill stations, inter-city travel — we take you everywhere safely.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Share2, Share2, Share2].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(253,248,240,0.7)', transition: 'all 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--saffron)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(253,248,240,0.7)'; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'white', marginBottom: 20 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: 'rgba(253,248,240,0.65)', textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold-light)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(253,248,240,0.65)'}>
                    <ArrowRight size={13} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'white', marginBottom: 20 }}>Popular Routes</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {popularRoutes.map(route => (
                <li key={route}>
                  <Link href="/booking" style={{ color: 'rgba(253,248,240,0.65)', textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold-light)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(253,248,240,0.65)'}>
                    <ArrowRight size={13} /> {route}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'white', marginBottom: 20 }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'rgba(253,248,240,0.8)', textDecoration: 'none', fontSize: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(232,101,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Phone size={15} style={{ color: 'var(--saffron)' }} /></div>
                <div><div style={{ color: 'rgba(253,248,240,0.5)', fontSize: 11, marginBottom: 2 }}>CALL / WHATSAPP</div>+91 98765 43210</div>
              </a>
              <a href="mailto:info@rashmitours.in" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'rgba(253,248,240,0.8)', textDecoration: 'none', fontSize: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(232,101,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Mail size={15} style={{ color: 'var(--saffron)' }} /></div>
                <div><div style={{ color: 'rgba(253,248,240,0.5)', fontSize: 11, marginBottom: 2 }}>EMAIL</div>info@rashmitours.in</div>
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: 'rgba(253,248,240,0.8)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(232,101,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MapPin size={15} style={{ color: 'var(--saffron)' }} /></div>
                <div><div style={{ color: 'rgba(253,248,240,0.5)', fontSize: 11, marginBottom: 2 }}>ADDRESS</div>45 Anna Nagar Main Road, Madurai – 625020, Tamil Nadu</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(253,248,240,0.45)' }}>© {year} Rashmi Tours and Travels. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/contact" style={{ fontSize: 13, color: 'rgba(253,248,240,0.45)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/contact" style={{ fontSize: 13, color: 'rgba(253,248,240,0.45)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
