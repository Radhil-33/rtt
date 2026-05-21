'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Save, X, Tag, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSiteStore } from '@/store/useSiteStore';
import { Coupon } from '@/lib/siteData';

const emptyCoupon = (): Coupon => ({
  code: '',
  discount: 10,
  type: 'percentage',
  minBooking: 1000,
  maxDiscount: undefined,
  active: true,
  description: '',
});

export default function AdminCouponsPage() {
  const { coupons, updateCoupon, addCoupon, removeCoupon } = useSiteStore();
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing(emptyCoupon()); setIsNew(true); };
  const openEdit = (c: Coupon) => { setEditing({ ...c }); setIsNew(false); };

  const save = () => {
    if (!editing) return;
    if (!editing.code) { toast.error('Coupon code is required.'); return; }
    const code = editing.code.toUpperCase().replace(/\s+/g, '');
    const payload = { ...editing, code };
    if (isNew) {
      if (coupons.find(c => c.code === code)) { toast.error('A coupon with this code already exists.'); return; }
      addCoupon(payload);
    } else updateCoupon(payload.code, payload);
    toast.success(isNew ? 'Coupon created!' : 'Coupon updated!');
    setEditing(null);
  };

  const del = (code: string) => {
    if (confirm(`Delete coupon "${code}"?`)) { removeCoupon(code); toast.success('Coupon removed.'); }
  };

  const toggle = (code: string, active: boolean) => {
    updateCoupon(code, { active });
    toast.success(active ? 'Coupon activated!' : 'Coupon deactivated.');
  };

  const set = (k: keyof Coupon, v: any) => setEditing(e => e ? { ...e, [k]: v } : e);

  return (
    <div style={{ padding: 'clamp(16px,3vw,32px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'white', marginBottom: 6 }}>Coupon Codes</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>{coupons.filter(c => c.active).length} active · {coupons.length} total coupons</p>
        </div>
        <button onClick={openNew} style={addBtnStyle}><Plus size={17} /> Create Coupon</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {coupons.map((coupon, i) => (
          <motion.div key={coupon.code} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${coupon.active ? 'rgba(45,122,79,0.25)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 14, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            {/* Code badge */}
            <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, background: 'rgba(232,101,26,0.15)', color: '#F5823A', padding: '6px 16px', borderRadius: 8, letterSpacing: '1px', border: '1px dashed rgba(232,101,26,0.3)' }}>
              {coupon.code}
            </div>
            {/* Info */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>
                  {coupon.type === 'percentage' ? `${coupon.discount}% off` : `₹${coupon.discount} off`}
                </span>
                {coupon.maxDiscount && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>max ₹{coupon.maxDiscount}</span>}
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 50, background: coupon.active ? 'rgba(45,122,79,0.2)' : 'rgba(255,255,255,0.06)', color: coupon.active ? '#4DAA7A' : 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                  {coupon.active ? '● Active' : '○ Inactive'}
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{coupon.description} · Min booking: ₹{coupon.minBooking.toLocaleString()}</div>
            </div>
            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggle(coupon.code, !coupon.active)} title={coupon.active ? 'Deactivate' : 'Activate'}
                style={{ padding: '8px 12px', background: coupon.active ? 'rgba(45,122,79,0.12)' : 'rgba(255,255,255,0.06)', border: `1px solid ${coupon.active ? 'rgba(45,122,79,0.25)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 8, color: coupon.active ? '#4DAA7A' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
                {coupon.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
              </button>
              <button onClick={() => openEdit(coupon)} style={editBtnStyle}><Edit3 size={14} /></button>
              <button onClick={() => del(coupon.code)} style={delBtnStyle}><Trash2 size={14} /></button>
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
              style={{ background: '#1A1008', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 32, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: 'white' }}>{isNew ? 'Create Coupon' : 'Edit Coupon'}</h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={22} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={lbl}>Coupon Code *</label>
                  <input style={{ ...inp, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }} value={editing.code} onChange={e => set('code', e.target.value.toUpperCase())} placeholder="RASHMI10" disabled={!isNew} />
                  {!isNew && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Coupon codes cannot be changed after creation.</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={lbl}>Discount Type</label>
                    <select style={inp} value={editing.type} onChange={e => set('type', e.target.value as 'percentage' | 'flat')}>
                      <option value="percentage">Percentage (%)</option>
                      <option value="flat">Flat Amount (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Discount Value *</label>
                    <input style={inp} type="number" value={editing.discount} onChange={e => set('discount', Number(e.target.value))} placeholder={editing.type === 'percentage' ? '10' : '200'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={lbl}>Min. Booking (₹)</label>
                    <input style={inp} type="number" value={editing.minBooking} onChange={e => set('minBooking', Number(e.target.value))} placeholder="1000" />
                  </div>
                  {editing.type === 'percentage' && (
                    <div>
                      <label style={lbl}>Max Discount (₹)</label>
                      <input style={inp} type="number" value={editing.maxDiscount || ''} onChange={e => set('maxDiscount', e.target.value ? Number(e.target.value) : undefined)} placeholder="500 (optional)" />
                    </div>
                  )}
                </div>

                <div>
                  <label style={lbl}>Description</label>
                  <input style={inp} value={editing.description} onChange={e => set('description', e.target.value)} placeholder="10% off on bookings above ₹2000" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input type="checkbox" id="active" checked={editing.active} onChange={e => set('active', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#E8651A', cursor: 'pointer' }} />
                  <label htmlFor="active" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, cursor: 'pointer' }}>Coupon is active and usable</label>
                </div>

                {/* Preview */}
                {editing.code && (
                  <div style={{ background: 'rgba(232,101,26,0.06)', borderRadius: 10, padding: '14px 18px', border: '1px dashed rgba(232,101,26,0.25)', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#F5823A', letterSpacing: '2px', marginBottom: 6 }}>{editing.code}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                      {editing.type === 'percentage' ? `${editing.discount}% off` : `₹${editing.discount} off`}
                      {editing.maxDiscount ? ` (max ₹${editing.maxDiscount})` : ''} on orders above ₹{editing.minBooking}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={save} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', background: 'linear-gradient(135deg, #E8651A, #C4520E)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 15, fontFamily: 'DM Sans, sans-serif' }}>
                  <Save size={16} /> {isNew ? 'Create Coupon' : 'Save Changes'}
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
