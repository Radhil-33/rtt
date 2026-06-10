'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const PHONE = '+919790699932';
const PHONE_DISPLAY = '+91 97906 99932';
const EMAIL = 'rashmitoursanddtravels@gmail.com';
const WA_URL = `https://wa.me/${PHONE}`;

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Tour Packages' },
  { href: '/itinerary', label: 'Itinerary Planner' },
  { href: '/hotels-restaurants', label: 'Hotels & Dining' },
  { href: '/booking', label: 'Book a Cab' },
  { href: '/contact', label: 'Contact Us' },
];

const popularRoutes = [
  { label: 'Trichy → Rameswaram', dest: 'Rameswaram' },
  { label: 'Trichy → Kodaikanal', dest: 'Kodaikanal' },
  { label: 'Trichy → Ooty', dest: 'Ooty' },
  { label: 'Trichy → Kanyakumari', dest: 'Kanyakumari' },
  { label: 'Trichy → Munnar', dest: 'Munnar' },
  { label: 'Trichy → Chennai', dest: 'Chennai' },
  { label: 'Trichy → Madurai', dest: 'Madurai' },
  { label: 'Trichy → Coimbatore', dest: 'Coimbatore' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--deep)', color: 'var(--cream)', marginTop: 0 }}>
      <div className="container" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'white', fontWeight: 900, fontFamily: 'Playfair Display, serif', flexShrink: 0 }}>R</div>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 19, color: 'white' }}>Rashmi Tours</div>
                <div style={{ fontSize: 10, color: 'var(--gold-light)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>&amp; Travels</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(253,248,240,0.6)', lineHeight: 1.75, marginBottom: 20 }}>
              Your most trusted travel partner in South India. Based in Trichy, we offer safe, comfortable cabs for pilgrimages, hill stations &amp; inter-city travel.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: 'white', padding: '10px 20px', borderRadius: 50, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.374 0 0 5.373 0 12c0 2.123.549 4.122 1.51 5.858L0 24l6.335-1.462A11.945 11.945 0 0012 24c6.626 0 12-5.373 12-12S18.626 0 12 0zm0 21.818a9.818 9.818 0 01-5.001-1.371l-.36-.214-3.722.858.878-3.63-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'white', marginBottom: 18 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: 'rgba(253,248,240,0.6)', textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 7, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold-light)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(253,248,240,0.6)'}>
                    <ArrowRight size={12} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'white', marginBottom: 18 }}>Popular Routes</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {popularRoutes.map(r => (
                <li key={r.label}>
                  <Link href="/booking" style={{ color: 'rgba(253,248,240,0.6)', textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 7, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold-light)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(253,248,240,0.6)'}>
                    <ArrowRight size={12} /> {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'white', marginBottom: 18 }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: Phone, label: 'CALL / WHATSAPP', value: PHONE_DISPLAY, href: `tel:${PHONE}` },
                { icon: Mail, label: 'EMAIL', value: EMAIL, href: `mailto:${EMAIL}` },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={href} href={href} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'rgba(253,248,240,0.8)', textDecoration: 'none', fontSize: 14 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(232,101,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={14} style={{ color: 'var(--saffron)' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(253,248,240,0.4)', fontSize: 10, marginBottom: 2, letterSpacing: '0.5px' }}>{label}</div>
                    <div style={{ wordBreak: 'break-word' }}>{value}</div>
                  </div>
                </a>
              ))}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: 'rgba(253,248,240,0.8)' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(232,101,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={14} style={{ color: 'var(--saffron)' }} />
                </div>
                <div>
                  <div style={{ color: 'rgba(253,248,240,0.4)', fontSize: 10, marginBottom: 2, letterSpacing: '0.5px' }}>ADDRESS</div>
                  Trichy, Tamil Nadu, India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '18px 16px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: 13, color: 'rgba(253,248,240,0.4)' }}>© {year} Rashmi Tours and Travels. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/contact" style={{ fontSize: 13, color: 'rgba(253,248,240,0.4)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/contact" style={{ fontSize: 13, color: 'rgba(253,248,240,0.4)', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 40px; }
        }
      `}</style>
    </footer>
  );
}
