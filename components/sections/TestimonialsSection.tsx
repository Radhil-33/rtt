'use client';
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteStore } from '@/store/useSiteStore';

export default function TestimonialsSection() {
  const { testimonials } = useSiteStore();
  const [current, setCurrent] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  const next = () => setCurrent(c => (c + 1) % testimonials.length);
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, #0B2344, #071523)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,55,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ textAlign: 'center' }}>
        <span className="section-tag" style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>Testimonials</span>
        <h2 className="section-title" style={{ color: 'white', marginBottom: 40 }}>What Our Travelers Say</h2>

        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.38 }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 'clamp(24px,5vw,52px)' }}>
                <Quote size={36} style={{ color: '#D4AF37', opacity: 0.35, marginBottom: 20 }} />
                <p style={{ fontSize: 'clamp(15px,2.2vw,19px)', color: 'rgba(248,246,240,0.88)', lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic' }}>
                  &quot;{testimonials[current].text}&quot;
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 18 }}>
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={17} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #B8951F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#0B2344', flexShrink: 0 }}>
                    {testimonials[current].avatar}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: 'white', fontSize: 15 }}>{testimonials[current].name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(248,246,240,0.45)' }}>{testimonials[current].location}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 28 }}>
            <button onClick={prev} aria-label="Previous review"
              style={{ width: 40, height: 40, borderRadius: '50%', background: hoverPrev ? '#D4AF37' : 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: hoverPrev ? '#0B2344' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}>
              <ChevronLeft size={19} />
            </button>
            <div style={{ display: 'flex', gap: 7 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} aria-label={`Review ${i + 1}`}
                  style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 4, background: i === current ? '#D4AF37' : 'rgba(255,255,255,0.22)', border: 'none', cursor: 'pointer', transition: 'all 0.28s', padding: 0 }} />
              ))}
            </div>
            <button onClick={next} aria-label="Next review"
              style={{ width: 40, height: 40, borderRadius: '50%', background: hoverNext ? '#D4AF37' : 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: hoverNext ? '#0B2344' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}>
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
