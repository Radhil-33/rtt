'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Image, Package, FileText, Tag, LogOut, Star, Calculator, ExternalLink, Menu, X } from 'lucide-react';
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderSidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/Dark Mode Logo.png" alt="R" style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 700, color: 'white' }}>Rashmi Admin</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.5px' }}>Content Manager</div>
          </div>
        </div>
        <button onClick={() => setMobileOpen(false)} className="sidebar-close-btn" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4, display: 'none' }}>
          <X size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', borderRadius: 9, marginBottom: 3, background: active ? 'linear-gradient(135deg,rgba(11,35,68,0.4),rgba(212,175,55,0.1))' : 'transparent', color: active ? '#D4AF37' : 'rgba(255,255,255,0.55)', fontWeight: active ? 600 : 400, fontSize: 14, textDecoration: 'none', border: active ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent', transition: 'all 0.18s' }}
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.88)'; } }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; } }}>
              <Icon size={16} /> {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', borderRadius: 9, color: 'rgba(255,255,255,0.45)', fontSize: 13, textDecoration: 'none', marginBottom: 6 }}>
          <ExternalLink size={15} /> View Live Site
        </Link>
        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', borderRadius: 9, color: '#D4AF37', fontSize: 13, background: 'rgba(212,175,55,0.1)', border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'DM Sans, sans-serif', transition: 'background 0.18s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.2)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.1)'}>
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="admin-sidebar-desktop" style={{ width: 260, background: '#071523', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {renderSidebarContent()}
      </div>

      {/* Mobile top bar */}
      <div className="admin-mobile-topbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: '#071523', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 16px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/Dark Mode Logo.png" alt="R" style={{ width: 34, height: 34, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 700, color: 'white' }}>Rashmi Admin</span>
        </div>
        <button onClick={() => setMobileOpen(true)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}>
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: 'relative', width: 260, background: '#071523', height: '100%', zIndex: 1, borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/Dark Mode Logo.png" alt="R" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 700, color: 'white' }}>Rashmi Admin</div>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4 }}><X size={20} /></button>
            </div>
            <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
              {navItems.map(({ href, icon: Icon, label }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 13px', borderRadius: 9, marginBottom: 3, background: active ? 'linear-gradient(135deg,rgba(11,35,68,0.4),rgba(212,175,55,0.1))' : 'transparent', color: active ? '#D4AF37' : 'rgba(255,255,255,0.65)', fontWeight: active ? 600 : 400, fontSize: 15, textDecoration: 'none', border: active ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent', minHeight: 48 }}>
                    <Icon size={18} /> {label}
                  </Link>
                );
              })}
            </nav>
            <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 13px', borderRadius: 9, color: 'rgba(255,255,255,0.45)', fontSize: 14, textDecoration: 'none', marginBottom: 6 }}>
                <ExternalLink size={15} /> View Live Site
              </Link>
              <button onClick={() => { logout(); setMobileOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 13px', borderRadius: 9, color: '#D4AF37', fontSize: 14, background: 'rgba(212,175,55,0.1)', border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'DM Sans, sans-serif' }}>
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-sidebar-desktop { display: none !important; }
        .admin-mobile-topbar { display: flex !important; }
        .admin-main { margin-left: 0 !important; padding-top: 56px; }
        @media (min-width: 768px) {
          .admin-sidebar-desktop { display: flex !important; flex-direction: column; }
          .admin-mobile-topbar { display: none !important; }
          .admin-main { margin-left: 260px !important; padding-top: 0; }
        }
      `}</style>
    </>
  );
}
