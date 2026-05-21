'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSiteStore } from '@/store/useSiteStore';
import { FareRule, vehicleTypes } from '@/lib/siteData';

const emptyRule = (): FareRule => ({ from: 'Trichy', to: '', basePrice: 800, pricePerKm: 14, distanceKm: 100 });

export default function AdminFaresPage() {
  const { fareRules } = useSiteStore();
  const [editing, setEditing] = useState<FareRule & { _orig?: string } | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing({ ...emptyRule() }); setIsNew(true); };
  const openEdit = (r: FareRule) => { setEditing({ ...r, _orig: r.to }); setIsNew(false); };

  const save = () => {
    if (!editing) return;
    if (!editing.to || !editing.from) { toast.error('From and To are required.'); return; }
    const rules = useSiteStore.getState().fareRules;
    if (isNew) {
      if (rules.find(r => r.from === editing.from && r.to === editing.to)) { toast.error('Route already exists.'); return; }
      useSiteStore.setState({ fareRules: [...rules, { from: editing.from, to: editing.to, basePrice: editing.basePrice, pricePerKm: editing.pricePerKm, distanceKm: editing.distanceKm }] });
    } else {
      useSiteStore.setState({ fareRules: rules.map(r => r.from === editing.from && r.to === (editing._orig || editing.to) ? { from: editing.from, to: editing.to, basePrice: editing.basePrice, pricePerKm: editing.pricePerKm, distanceKm: editing.distanceKm } : r) });
    }
    toast.success(isNew ? 'Route added!' : 'Route updated!');
    setEditing(null);
  };

  const del = (from: string, to: string) => {
    if (confirm(`Delete route ${from} → ${to}?`)) {
      useSiteStore.setState({ fareRules: useSiteStore.getState().fareRules.filter(r => !(r.from === from && r.to === to)) });
      toast.success('Route removed.');
    }
  };

  const set = (k: keyof FareRule, v: any) => setEditing(e => e ? { ...e, [k]: v } : e);
  const estimateFare = (r: FareRule, mult = 1) => Math.round((r.basePrice + r.pricePerKm * r.distanceKm) * mult);

  return (
    <div style={{ padding: 'clamp(16px,3vw,32px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,4vw,28px)', color: 'white', marginBottom: 5 }}>Fare Rules</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{fareRules.length} routes · Powers the fare estimator</p>
        </div>
        <button onClick={openNew} style={addBtnStyle}><Plus size={16} /> Add Route</button>
      </div>

      {/* Cards layout - works on all screen sizes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%), 1fr))', gap: 14 }}>
        {fareRules.map((rule, i) => (
          <motion.div key={`${rule.from}-${rule.to}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 3 }}>{rule.from} → {rule.to}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{rule.distanceKm} km</div>
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                <button onClick={() => openEdit(rule)} style={editBtnStyle}><Edit3 size={13} /></button>
                <button onClick={() => del(rule.from, rule.to)} style={delBtnStyle}><Trash2 size={13} /></button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {vehicleTypes.map(v => (
                <div key={v.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{v.id}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#F5823A' }}>₹{estimateFare(rule, v.multiplier).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 12, fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
              <span>Base: ₹{rule.basePrice}</span>
              <span>Rate: ₹{rule.pricePerKm}/km</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vehicle multipliers */}
      <div style={{ marginTop: 22, background: 'rgba(232,101,26,0.05)', borderRadius: 12, padding: '14px 18px', border: '1px solid rgba(232,101,26,0.1)' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vehicle Multipliers</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {vehicleTypes.map(v => (
            <span key={v.id} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
              <strong style={{ color: '#F5823A' }}>{v.label}</strong>: ×{v.multiplier} · {v.capacity}
            </span>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(8px)', overflowY: 'auto' }}>
            <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              style={{ background: '#1A1008', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 'clamp(20px,4vw,32px)', width: '100%', maxWidth: 460 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'white' }}>{isNew ? 'Add Route' : 'Edit Route'}</h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label style={lbl}>From *</label><input style={inp} value={editing.from} onChange={e => set('from', e.target.value)} placeholder="Trichy" /></div>
                  <div><label style={lbl}>To *</label><input style={inp} value={editing.to} onChange={e => set('to', e.target.value)} placeholder="Rameswaram" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <div><label style={lbl}>Distance (km)</label><input style={inp} type="number" value={editing.distanceKm} onChange={e => set('distanceKm', Number(e.target.value))} /></div>
                  <div><label style={lbl}>Base (₹)</label><input style={inp} type="number" value={editing.basePrice} onChange={e => set('basePrice', Number(e.target.value))} /></div>
                  <div><label style={lbl}>₹/km</label><input style={inp} type="number" value={editing.pricePerKm} onChange={e => set('pricePerKm', Number(e.target.value))} /></div>
                </div>
                {editing.to && (
                  <div style={{ background: 'rgba(232,101,26,0.06)', borderRadius: 10, padding: '12px 14px', border: '1px solid rgba(232,101,26,0.12)' }}>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginBottom: 8 }}>Estimated fares for {editing.from} → {editing.to}:</p>
                    {vehicleTypes.map(v => (
                      <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.62)', marginBottom: 4 }}>
                        <span>{v.label}</span>
                        <span style={{ color: '#F5823A', fontWeight: 600 }}>₹{Math.round((editing.basePrice + editing.pricePerKm * editing.distanceKm) * v.multiplier).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <button onClick={save} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '13px', background: 'linear-gradient(135deg,#E8651A,#C4520E)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 15, fontFamily: 'DM Sans, sans-serif' }}>
                  <Save size={15} /> {isNew ? 'Add Route' : 'Save'}
                </button>
                <button onClick={() => setEditing(null)} style={{ padding: '13px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const lbl: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 7 };
const inp: React.CSSProperties = { width: '100%', padding: '11px 13px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9, color: 'white', fontSize: 14, fontFamily: 'DM Sans, sans-serif', outline: 'none', minHeight: 44 };
const addBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', background: 'linear-gradient(135deg,#E8651A,#C4520E)', border: 'none', borderRadius: 9, color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: 'DM Sans, sans-serif' };
const editBtnStyle: React.CSSProperties = { padding: '7px 10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, color: 'rgba(255,255,255,0.8)', cursor: 'pointer' };
const delBtnStyle: React.CSSProperties = { padding: '7px 10px', background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 7, color: '#E74C3C', cursor: 'pointer' };
