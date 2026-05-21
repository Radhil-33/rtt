'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Save, X, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSiteStore } from '@/store/useSiteStore';
import { Testimonial } from '@/lib/siteData';

const empty = (): Testimonial => ({
  id: Date.now().toString(),
  name: '', location: '', rating: 5, text: '', avatar: '',
});

export default function AdminTestimonialsPage() {
  const { testimonials, updateTextBlock } = useSiteStore();
  const store = useSiteStore();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing(empty()); setIsNew(true); };
  const openEdit = (t: Testimonial) => { setEditing({ ...t }); setIsNew(false); };

  const save = () => {
    if (!editing) return;
    if (!editing.name || !editing.text) { toast.error('Name and review text are required.'); return; }
    const avatar = editing.avatar || editing.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const payload = { ...editing, avatar };
    if (isNew) store.testimonials.push(payload);
    else {
      const idx = store.testimonials.findIndex(t => t.id === payload.id);
      if (idx >= 0) store.testimonials[idx] = payload;
    }
    // Force store update via dummy action
    useSiteStore.setState({ testimonials: isNew ? [...store.testimonials] : store.testimonials.map(t => t.id === payload.id ? payload : t) });
    toast.success(isNew ? 'Testimonial added!' : 'Testimonial updated!');
    setEditing(null);
  };

  const del = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      useSiteStore.setState({ testimonials: store.testimonials.filter(t => t.id !== id) });
      toast.success('Testimonial removed.');
    }
  };

  const set = (k: keyof Testimonial, v: any) => setEditing(e => e ? { ...e, [k]: v } : e);

  return (
    <div style={{ padding: 'clamp(16px,3vw,32px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'white', marginBottom: 6 }}>Testimonials</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>{testimonials.length} customer reviews</p>
        </div>
        <button onClick={openNew} style={addBtnStyle}><Plus size={17} /> Add Testimonial</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
        {testimonials.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 22px' }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill={j < t.rating ? '#D4A017' : 'transparent'} color={j < t.rating ? '#D4A017' : 'rgba(255,255,255,0.2)'} />)}
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #E8651A, #D4A017)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white' }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{t.location}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(t)} style={editBtnStyle}><Edit3 size={13} /></button>
                <button onClick={() => del(t.id)} style={delBtnStyle}><Trash2 size={13} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(8px)' }}
            onClick={e => { if (e.target === e.currentTarget) setEditing(null); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ background: '#1A1008', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'white' }}>{isNew ? 'Add Testimonial' : 'Edit Testimonial'}</h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={22} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={lbl}>Customer Name *</label>
                    <input style={inp} value={editing.name} onChange={e => set('name', e.target.value)} placeholder="Priya Krishnamurthy" />
                  </div>
                  <div>
                    <label style={lbl}>Location</label>
                    <input style={inp} value={editing.location} onChange={e => set('location', e.target.value)} placeholder="Chennai" />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Star Rating</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 3, 4, 5].map(r => (
                      <button key={r} type="button" onClick={() => set('rating', r)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                        <Star size={28} fill={r <= editing.rating ? '#D4A017' : 'transparent'} color={r <= editing.rating ? '#D4A017' : 'rgba(255,255,255,0.2)'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={lbl}>Review Text *</label>
                  <textarea style={{ ...inp, resize: 'vertical' as const }} value={editing.text} onChange={e => set('text', e.target.value)} rows={4} placeholder="What did the customer say about their experience?" />
                </div>
                <div>
                  <label style={lbl}>Avatar Initials (auto-generated if empty)</label>
                  <input style={inp} value={editing.avatar} onChange={e => set('avatar', e.target.value.toUpperCase().slice(0, 2))} placeholder="PK" maxLength={2} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={save} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', background: 'linear-gradient(135deg, #E8651A, #C4520E)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 15, fontFamily: 'DM Sans, sans-serif' }}>
                  <Save size={16} /> {isNew ? 'Add Testimonial' : 'Save Changes'}
                </button>
                <button onClick={() => setEditing(null)} style={{ padding: '13px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 15 }}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const lbl: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 8 };
const inp: React.CSSProperties = { width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', fontSize: 14, fontFamily: 'DM Sans, sans-serif', outline: 'none' };
const addBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: 'linear-gradient(135deg, #E8651A, #C4520E)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: 'DM Sans, sans-serif' };
const editBtnStyle: React.CSSProperties = { padding: '8px 12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.8)', cursor: 'pointer' };
const delBtnStyle: React.CSSProperties = { padding: '8px 12px', background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, color: '#E74C3C', cursor: 'pointer' };
