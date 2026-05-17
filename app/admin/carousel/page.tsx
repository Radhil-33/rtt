'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Save, X, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSiteStore } from '@/store/useSiteStore';
import { CarouselSlide } from '@/lib/siteData';

const emptySlide = (): CarouselSlide => ({
  id: Date.now().toString(),
  image: '',
  title: '',
  subtitle: '',
  ctaText: 'Book Now',
  ctaLink: '/booking',
});

export default function AdminCarouselPage() {
  const { carousel, updateSlide, addSlide, removeSlide } = useSiteStore();
  const [editing, setEditing] = useState<CarouselSlide | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing(emptySlide()); setIsNew(true); };
  const openEdit = (s: CarouselSlide) => { setEditing({ ...s }); setIsNew(false); };

  const save = () => {
    if (!editing) return;
    if (!editing.title || !editing.image) { toast.error('Title and image URL are required.'); return; }
    if (isNew) addSlide(editing);
    else updateSlide(editing.id, editing);
    toast.success(isNew ? 'Slide added!' : 'Slide updated!');
    setEditing(null);
  };

  const del = (id: string) => {
    if (carousel.length <= 1) { toast.error('Keep at least one slide.'); return; }
    if (confirm('Delete this slide?')) { removeSlide(id); toast.success('Slide removed.'); }
  };

  const set = (k: keyof CarouselSlide, v: string) => setEditing(e => e ? { ...e, [k]: v } : e);

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'white', marginBottom: 6 }}>Carousel Slides</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>{carousel.length} slides · Manage hero banner images and text</p>
        </div>
        <button onClick={openNew} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: 'linear-gradient(135deg, #E8651A, #C4520E)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}>
          <Plus size={17} /> Add Slide
        </button>
      </div>

      {/* Slides list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {carousel.map((slide, i) => (
          <motion.div key={slide.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
            {/* Image preview */}
            <div style={{ width: 180, flexShrink: 0, position: 'relative', background: '#1A0F05' }}>
              {slide.image ? (
                <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image size={28} color="rgba(255,255,255,0.2)" /></div>
              )}
              <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(26,15,5,0.7)', color: 'rgba(255,255,255,0.6)', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>#{i + 1}</div>
            </div>
            {/* Info */}
            <div style={{ flex: 1, padding: '20px 24px' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'white', marginBottom: 6 }}>{slide.title || <span style={{ color: 'rgba(255,255,255,0.3)' }}>Untitled slide</span>}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 10, lineHeight: 1.5 }}>{slide.subtitle}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, background: 'rgba(232,101,26,0.15)', color: '#F5823A', padding: '3px 10px', borderRadius: 50 }}>CTA: {slide.ctaText}</span>
                <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', padding: '3px 10px', borderRadius: 50 }}>→ {slide.ctaLink}</span>
              </div>
            </div>
            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, padding: '16px 20px' }}>
              <button onClick={() => openEdit(slide)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }}>
                <Edit3 size={14} /> Edit
              </button>
              <button onClick={() => del(slide.id)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, color: '#E74C3C', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(8px)' }}
            onClick={e => { if (e.target === e.currentTarget) setEditing(null); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ background: '#1A1008', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32, width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'white' }}>{isNew ? 'Add New Slide' : 'Edit Slide'}</h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={22} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Slide Title *</label>
                  <input style={inputStyle} value={editing.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Explore the Beauty of South India" />
                </div>
                <div>
                  <label style={labelStyle}>Subtitle / Tagline</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical' as const }} value={editing.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="A short compelling subtitle..." rows={3} />
                </div>
                <div>
                  <label style={labelStyle}>Image URL *</label>
                  <input style={inputStyle} value={editing.image} onChange={e => set('image', e.target.value)} placeholder="https://images.unsplash.com/..." />
                  {editing.image && (
                    <div style={{ marginTop: 10, borderRadius: 10, overflow: 'hidden', height: 140 }}>
                      <img src={editing.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>Use Unsplash or any public image URL. Recommended: 1600×900px.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>CTA Button Text</label>
                    <input style={inputStyle} value={editing.ctaText} onChange={e => set('ctaText', e.target.value)} placeholder="Book Now" />
                  </div>
                  <div>
                    <label style={labelStyle}>CTA Link</label>
                    <input style={inputStyle} value={editing.ctaLink} onChange={e => set('ctaLink', e.target.value)} placeholder="/booking" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={save} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', background: 'linear-gradient(135deg, #E8651A, #C4520E)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 15, fontFamily: 'DM Sans, sans-serif' }}>
                  <Save size={16} /> {isNew ? 'Add Slide' : 'Save Changes'}
                </button>
                <button onClick={() => setEditing(null)} style={{ padding: '13px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 15 }}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 8 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', fontSize: 14, fontFamily: 'DM Sans, sans-serif', outline: 'none' };
