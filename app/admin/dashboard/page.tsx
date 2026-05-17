'use client';
import { useSiteStore } from '@/store/useSiteStore';
import { motion } from 'framer-motion';
import { Package, Image, FileText, Tag, Star, TrendingUp, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { packages, carousel, textBlocks, coupons, testimonials, resetToDefaults } = useSiteStore();

  const stats = [
    { icon: Image, label: 'Carousel Slides', count: carousel.length, href: '/admin/carousel', color: '#E8651A' },
    { icon: Package, label: 'Tour Packages', count: packages.length, href: '/admin/packages', color: '#D4A017' },
    { icon: FileText, label: 'Text Blocks', count: textBlocks.length, href: '/admin/textblocks', color: '#2D7A4F' },
    { icon: Tag, label: 'Coupons', count: coupons.filter(c => c.active).length, href: '/admin/coupons', color: '#5B5EA6' },
    { icon: Star, label: 'Testimonials', count: testimonials.length, href: '/admin/testimonials', color: '#C0392B' },
  ];

  const handleReset = () => {
    if (confirm('Reset ALL content to defaults? This cannot be undone.')) {
      resetToDefaults();
      toast.success('Content reset to defaults.');
    }
  };

  return (
    <div style={{ padding: 32, color: 'white' }}>
      <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: 'white', marginBottom: 8 }}>Welcome Back!</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Manage your website content from here.</p>
        </div>
        <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 10, color: '#E74C3C', cursor: 'pointer', fontSize: 14, fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }}>
          <RotateCcw size={15} /> Reset to Defaults
        </button>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginBottom: 48 }}>
        {stats.map(({ icon: Icon, label, count, href, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link href={href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24, transition: 'all 0.3s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={22} color={color} />
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: color, marginBottom: 4 }}>{count}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{label}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick tips */}
      <div style={{ background: 'rgba(232,101,26,0.06)', border: '1px solid rgba(232,101,26,0.15)', borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#F5823A', marginBottom: 16 }}>Quick Tips</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            '🎠 Go to Carousel to add/edit hero banner slides and images',
            '📦 Manage tour packages — add new ones, edit prices, update images',
            '📝 Text Blocks let you edit any heading or paragraph on the homepage',
            '🏷️ Create discount coupons for special promotions and seasons',
            '⭐ Add and edit customer testimonials to build trust',
            '🧮 Update fare rules to keep the estimator pricing accurate',
          ].map(tip => (
            <li key={tip} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
