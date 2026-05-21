'use client';
import { useSiteStore } from '@/store/useSiteStore';
import { motion } from 'framer-motion';
import { Package, Image, FileText, Tag, Star, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { packages, carousel, textBlocks, coupons, testimonials, resetToDefaults } = useSiteStore();

  const stats = [
    { icon: Image, label: 'Carousel Slides', count: carousel.length, href: '/admin/carousel', color: '#E8651A' },
    { icon: Package, label: 'Tour Packages', count: packages.length, href: '/admin/packages', color: '#D4A017' },
    { icon: FileText, label: 'Text Blocks', count: textBlocks.length, href: '/admin/textblocks', color: '#2D7A4F' },
    { icon: Tag, label: 'Active Coupons', count: coupons.filter(c => c.active).length, href: '/admin/coupons', color: '#5B5EA6' },
    { icon: Star, label: 'Testimonials', count: testimonials.length, href: '/admin/testimonials', color: '#C0392B' },
  ];

  const handleReset = () => {
    if (confirm('Reset ALL content to defaults? This cannot be undone.')) {
      resetToDefaults();
      toast.success('Content reset to defaults.');
    }
  };

  return (
    <div style={{ padding: 'clamp(16px,3vw,32px)', color: 'white' }}>
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,4vw,30px)', fontWeight: 700, color: 'white', marginBottom: 6 }}>Welcome Back!</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>Manage your website content from here.</p>
        </div>
        <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', background: 'rgba(192,57,43,0.13)', border: '1px solid rgba(192,57,43,0.28)', borderRadius: 9, color: '#E74C3C', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
          <RotateCcw size={14} /> Reset to Defaults
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px,100%), 1fr))', gap: 16, marginBottom: 40 }}>
        {stats.map(({ icon: Icon, label, count, href, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px 18px', transition: 'all 0.25s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={20} color={color} />
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: color, lineHeight: 1, marginBottom: 4 }}>{count}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.3 }}>{label}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      <div style={{ background: 'rgba(232,101,26,0.06)', border: '1px solid rgba(232,101,26,0.14)', borderRadius: 14, padding: 'clamp(16px,3vw,24px)' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: '#F5823A', marginBottom: 14 }}>Quick Tips</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[
            '🎠 Carousel — add/edit hero banner slides with images and CTAs',
            '📦 Packages — manage tour packages: prices, images, highlights',
            '📝 Text Blocks — edit any heading or paragraph on the homepage',
            '🏷️ Coupons — create discount codes and toggle them on/off',
            '⭐ Testimonials — add/edit customer reviews with star ratings',
            '🧮 Fare Rules — update pricing routes for the fare estimator',
          ].map(tip => (
            <li key={tip} style={{ fontSize: 13, color: 'rgba(255,255,255,0.58)', lineHeight: 1.55 }}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
