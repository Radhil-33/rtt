'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSiteStore } from '@/store/useSiteStore';
import { TextBlock } from '@/lib/siteData';

const emptyBlock = (): TextBlock => ({
  id: Date.now().toString(),
  section: 'general',
  heading: '',
  body: '',
  align: 'left',
});

export default function AdminTextBlocksPage() {
  const { textBlocks, updateTextBlock, addTextBlock, removeTextBlock } = useSiteStore();
  const [editing, setEditing] = useState<TextBlock | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing(emptyBlock()); setIsNew(true); };
  const openEdit = (b: TextBlock) => { setEditing({ ...b }); setIsNew(false); };

  const save = () => {
    if (!editing) return;
    if (!editing.heading) { toast.error('Heading is required.'); return; }
    if (isNew) addTextBlock(editing);
    else updateTextBlock(editing.id, editing);
    toast.success(isNew ? 'Text block added!' : 'Text block updated!');
    setEditing(null);
  };

  const del = (id: string) => {
    if (confirm('Delete this text block?')) { removeTextBlock(id); toast.success('Text block removed.'); }
  };

  const set = (k: keyof TextBlock, v: string) => setEditing(e => e ? { ...e, [k]: v } : e);

  const sections = [...new Set(textBlocks.map(b => b.section))];

  return (
    <div style={{ padding: 'clamp(16px,3vw,32px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'white', marginBottom: 6 }}>Text Blocks</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>Edit headings and body text across your website</p>
        </div>
        <button onClick={openNew} style={addBtnStyle}><Plus size={17} /> Add Text Block</button>
      </div>

      {sections.map(section => (
        <div key={section} style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ background: 'rgba(232,101,26,0.15)', color: '#F5823A', padding: '4px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{section}</span>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {textBlocks.filter(b => b.section === section).map((block, i) => (
              <motion.div key={block.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px 22px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: 'white' }}>{block.heading}</h3>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>align: {block.align || 'left'}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{block.body}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button onClick={() => openEdit(block)} style={editBtnStyle}><Edit3 size={14} /> Edit</button>
                  <button onClick={() => del(block.id)} style={delBtnStyle}><Trash2 size={14} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(8px)' }}
            onClick={e => { if (e.target === e.currentTarget) setEditing(null); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ background: '#1A1008', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32, width: '100%', maxWidth: 580, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'white' }}>{isNew ? 'Add Text Block' : 'Edit Text Block'}</h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={22} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={lbl}>Section / Identifier</label>
                    <input style={inp} value={editing.section} onChange={e => set('section', e.target.value)} placeholder="hero, about, why-us..." />
                  </div>
                  <div>
                    <label style={lbl}>Text Alignment</label>
                    <select style={inp} value={editing.align || 'left'} onChange={e => set('align', e.target.value)}>
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={lbl}>Heading *</label>
                  <input style={inp} value={editing.heading} onChange={e => set('heading', e.target.value)} placeholder="Section heading text..." />
                </div>
                <div>
                  <label style={lbl}>Body Text</label>
                  <textarea style={{ ...inp, resize: 'vertical' as const }} value={editing.body} onChange={e => set('body', e.target.value)} rows={5} placeholder="Paragraph content for this section..." />
                </div>

                {/* Preview */}
                {(editing.heading || editing.body) && (
                  <div style={{ background: 'rgba(253,248,240,0.06)', borderRadius: 10, padding: 16, border: '1px solid rgba(232,101,26,0.1)' }}>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>Live Preview</p>
                    <div style={{ textAlign: editing.align as any || 'left' }}>
                      {editing.heading && <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'white', marginBottom: 8 }}>{editing.heading}</h3>}
                      {editing.body && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{editing.body}</p>}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={save} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', background: 'linear-gradient(135deg, #E8651A, #C4520E)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 15, fontFamily: 'DM Sans, sans-serif' }}>
                  <Save size={16} /> {isNew ? 'Add Block' : 'Save Changes'}
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
const editBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans, sans-serif' };
const delBtnStyle: React.CSSProperties = { padding: '8px 12px', background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, color: '#E74C3C', cursor: 'pointer' };
