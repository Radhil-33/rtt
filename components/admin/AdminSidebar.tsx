'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Image, Package, FileText, Tag, LogOut, Star, Calculator, ExternalLink } from 'lucide-react';
import { useSiteStore } from '@/store/useSiteStore';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/carousel', icon: Image, label: 'Carousel / Banners' },
  { href: '/admin/packages', icon: Package, label: 'Packages' },
  { href: '/admin/textblocks', icon: FileText, label: 'Text Blocks' },
  { href: '/admin/coupons', icon: Tag, label: 'Coupons' },
  { href: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { href: '/admin/fares', icon: Calculator, label: 'Fare Rules' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useSiteStore();

  return (
    <div style={{ width: 260, background: '#0F0A05', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #E8651A, #D4A017)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: 'white', fontFamily: 'Playfair Display, serif' }}>R</div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: 'white' }}>Rashmi Admin</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px' }}>Content Manager</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, marginBottom: 4,
              background: active ? 'linear-gradient(135deg, rgba(232,101,26,0.2), rgba(212,160,23,0.1))' : 'transparent',
              color: active ? '#F5823A' : 'rgba(255,255,255,0.6)',
              fontWeight: active ? 600 : 400, fontSize: 14, textDecoration: 'none',
              border: active ? '1px solid rgba(232,101,26,0.3)' : '1px solid transparent',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'; } }}
            onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; } }}>
              <Icon size={17} /> {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none', marginBottom: 8 }}>
          <ExternalLink size={16} /> View Site
        </Link>
        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, color: '#E8651A', fontSize: 14, background: 'rgba(232,101,26,0.1)', border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(232,101,26,0.2)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(232,101,26,0.1)'}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}
