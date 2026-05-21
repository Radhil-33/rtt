'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Save, X, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSiteStore } from '@/store/useSiteStore';
import { Package } from '@/lib/siteData';

const emptyPkg = (): Package => ({
  id: Date.now().toString(),
  title: '', description: '', image: '',
  duration: '1 Day', price: 0, priceUnit: 'per cab',
  highlights: [], badge: '', popular: false,
  destinations: [],
});

export default function AdminPackagesPage() {
  const { packages, updatePackage, addPackage, removePackage } = useSiteStore();
  const [editing, setEditing] = useState<Package | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [highlightInput, setHighlightInput] = useState('');
  const [destInput, setDestInput] = useState('');

  const openNew = () => { setEditing(emptyPkg()); setIsNew(true); setHighlightInput(''); setDestInput(''); };
  const openEdit = (p: Package) => { setEditing({ ...p, highlights: [...p.highlights], destinations: [...p.destinations] }); setIsNew(false); setHighlightInput(''); setDestInput(''); };

  const save = () => {
    if (!editing) return;
    if (!editing.title || !editing.price) { toast.error('Title and price are required.'); return; }
    if (isNew) addPackage(editing);
    else updatePackage(editing.id, editing);
    toast.success(isNew ? 'Package added!' : 'Package updated!');
    setEditing(null);
  };

  const del = (id: string) => {
    if (confirm('Delete this package?')) { removePackage(id); toast.success('Package removed.'); }
  };

  const set = (k: keyof Package, v: any) => setEditing(e => e ? { ...e, [k]: v } : e);
  const addHighlight = () => { if (highlightInput.trim() && editing) { set('highlights', [...editing.highlights, highlightInput.trim()]); setHighlightInput(''); } };
  const removeHighlight = (i: number) => editing && set('highlights', editing.highlights.filter((_, idx) => idx !== i));
  const addDest = () => { if (destInput.trim() && editing) { set('destinations', [...editing.destinations, destInput.trim()]); setDestInput(''); } };
  const removeDest = (i: number) => editing && set('destinations', editing.destinations.filter((_, idx) => idx !== i));

  return (
    <div style={{ padding: 'clamp(16px,3vw,32px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'white', marginBottom: 6 }}>Tour Packages</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>{packages.length} packages · Add, edit, or remove travel packages</p>
        </div>
        <button onClick={openNew} style={addBtnStyle}><Plus size={17} /> Add Package</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {packages.map((pkg, i) => (
          <motion.div key={pkg.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ height: 160, position: 'relative', background: '#1A0F05' }}>
              {pkg.image && <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />}
              {pkg.badge && <span style={{ position: 'absolute', top: 10, left: 10, background: '#E8651A', color: 'white', padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>{pkg.badge}</span>}
              {pkg.popular && <Star size={16} fill="#D4A017" color="#D4A017" style={{ position: 'absolute', top: 12, right: 12 }} />}
            </div>
            <div style={{ padding: '16px 18px' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: 'white', marginBottom: 4 }}>{pkg.title}</h3>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>{pkg.destinations.join(' → ')} · {pkg.duration}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#E8651A', fontWeight: 700 }}>₹{pkg.price.toLocaleString()}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openEdit(pkg)} style={editBtnStyle}><Edit3 size={13} /></button>
                  <button onClick={() => del(pkg.id)} style={delBtnStyle}><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(8px)' }}
            onClick={e => { if (e.target === e.currentTarget) setEditing(null); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ background: '#1A1008', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32, width: '100%', maxWidth: 680, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'white' }}>{isNew ? 'Add Package' : 'Edit Package'}</h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={22} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={lbl}>Package Title *</label>
                  <input style={inp} value={editing.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Madurai to Rameswaram" />
                </div>
                <div>
                  <label style={lbl}>Description</label>
                  <textarea style={{ ...inp, resize: 'vertical' as const }} value={editing.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Brief package description..." />
                </div>
                <div>
                  <label style={lbl}>Image URL</label>
                  <input style={inp} value={editing.image} onChange={e => set('image', e.target.value)} placeholder="https://images.unsplash.com/..." />
                  {editing.image && <div style={{ marginTop: 8, borderRadius: 8, overflow: 'hidden', height: 100 }}><img src={editing.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={lbl}>Price (₹) *</label>
                    <input style={inp} type="number" value={editing.price} onChange={e => set('price', Number(e.target.value))} placeholder="2800" />
                  </div>
                  <div>
                    <label style={lbl}>Price Unit</label>
                    <input style={inp} value={editing.priceUnit} onChange={e => set('priceUnit', e.target.value)} placeholder="per cab" />
                  </div>
                  <div>
                    <label style={lbl}>Duration</label>
                    <input style={inp} value={editing.duration} onChange={e => set('duration', e.target.value)} placeholder="1 Day" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={lbl}>Badge (optional)</label>
                    <input style={inp} value={editing.badge || ''} onChange={e => set('badge', e.target.value)} placeholder="Most Booked" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
                    <input type="checkbox" id="popular" checked={editing.popular || false} onChange={e => set('popular', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#E8651A', cursor: 'pointer' }} />
                    <label htmlFor="popular" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, cursor: 'pointer' }}>Mark as Popular ⭐</label>
                  </div>
                </div>

                {/* Destinations */}
                <div>
                  <label style={lbl}>Destinations (in order)</label>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input style={{ ...inp, flex: 1 }} value={destInput} onChange={e => setDestInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addDest())} placeholder="e.g. Madurai, Rameswaram" />
                    <button type="button" onClick={addDest} style={{ padding: '10px 16px', background: 'rgba(232,101,26,0.2)', border: '1px solid rgba(232,101,26,0.3)', borderRadius: 8, color: '#F5823A', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>Add</button>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {editing.destinations.map((d, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(232,101,26,0.12)', color: '#F5823A', padding: '4px 10px', borderRadius: 50, fontSize: 13 }}>
                        {d} <button onClick={() => removeDest(i)} style={{ background: 'none', border: 'none', color: '#E8651A', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <label style={lbl}>Package Highlights</label>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input style={{ ...inp, flex: 1 }} value={highlightInput} onChange={e => setHighlightInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())} placeholder="e.g. AC Cab, Temple Stops..." />
                    <button type="button" onClick={addHighlight} style={{ padding: '10px 16px', background: 'rgba(232,101,26,0.2)', border: '1px solid rgba(232,101,26,0.3)', borderRadius: 8, color: '#F5823A', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>Add</button>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {editing.highlights.map((h, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(45,122,79,0.12)', color: '#4DAA7A', padding: '4px 10px', borderRadius: 50, fontSize: 13 }}>
                        {h} <button onClick={() => removeHighlight(i)} style={{ background: 'none', border: 'none', color: '#4DAA7A', cursor: 'pointer', padding: 0 }}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={save} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', background: 'linear-gradient(135deg, #E8651A, #C4520E)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 15, fontFamily: 'DM Sans, sans-serif' }}>
                  <Save size={16} /> {isNew ? 'Add Package' : 'Save Changes'}
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
