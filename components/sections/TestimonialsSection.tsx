'use client';
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteStore } from '@/store/useSiteStore';

export default function TestimonialsSection() {
  const { testimonials } = useSiteStore();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(c => (c + 1) % testimonials.length);
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section style={{ padding: '80px 24px', background: 'linear-gradient(180deg, var(--deep) 0%, var(--deep-2) 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,101,26,0.08) 0%, transparent 70%)' }} />
      
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{ display: 'inline-block', background: 'rgba(232,101,26,0.15)', color: 'var(--gold-light)', padding: '6px 18px', borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>
          Testimonials
        </span>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'white', marginBottom: 56 }}>
          What Our Travelers Say
        </h2>

        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 'clamp(28px, 5vw, 56px)', position: 'relative' }}>
                <Quote size={40} style={{ color: 'var(--saffron)', opacity: 0.4, marginBottom: 24 }} />
                
                <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(253,248,240,0.9)', lineHeight: 1.8, marginBottom: 32, fontStyle: 'italic' }}>
                  "{testimonials[current].text}"
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={18} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: 'white' }}>
                    {testimonials[current].avatar}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'white', fontSize: 16 }}>{testimonials[current].name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(253,248,240,0.5)' }}>{testimonials[current].location}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 32 }}>
            <button onClick={prev} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--saffron)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}>
              <ChevronLeft size={20} />
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? 'var(--saffron)' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
            <button onClick={next} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--saffron)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
