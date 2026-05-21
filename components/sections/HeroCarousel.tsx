'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteStore } from '@/store/useSiteStore';

export default function HeroCarousel() {
  const { carousel } = useSiteStore();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c + 1) % carousel.length);
  }, [carousel.length]);

  const prev = () => {
    setDirection(-1);
    setCurrent(c => (c - 1 + carousel.length) % carousel.length);
  };

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const slide = carousel[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? '100%' : '-100%', opacity: 0 }),
  };

  return (
    <section style={{ position: 'relative', height: 'min(88vh, 700px)', minHeight: 480, overflow: 'hidden', background: 'var(--deep)' }} aria-label="Featured destinations">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }} style={{ position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,15,5,0.88) 0%, rgba(26,15,5,0.45) 60%, rgba(26,15,5,0.65) 100%)' }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', paddingBottom: 80 }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div key={`c-${current}`} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.48, delay: 0.18 }}>
              {/* Trust badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(232,101,26,0.2)', border: '1px solid rgba(232,101,26,0.35)', padding: '6px 14px', borderRadius: 50, marginBottom: 20 }}>
                <Star size={13} fill="var(--gold)" color="var(--gold)" />
                <span style={{ color: 'var(--gold-light)', fontSize: 12, fontWeight: 600 }}>4.9★ Rated · 1000+ Happy Travelers</span>
              </div>

              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 6vw, 72px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 16, maxWidth: 680 }}>
                {slide.title}
              </h1>
              <p style={{ fontSize: 'clamp(14px, 2.2vw, 18px)', color: 'rgba(253,248,240,0.82)', marginBottom: 32, maxWidth: 520, lineHeight: 1.7 }}>
                {slide.subtitle}
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href={slide.ctaLink} className="btn-primary" style={{ fontSize: 'clamp(14px,1.5vw,16px)', padding: 'clamp(12px,1.5vw,16px) clamp(20px,2.5vw,32px)' }}>
                  {slide.ctaText}
                </Link>
                <Link href="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 'clamp(14px,1.5vw,16px)', padding: 'clamp(11px,1.5vw,15px) clamp(18px,2.5vw,30px)', borderRadius: 50, border: '2px solid rgba(255,255,255,0.45)', color: 'white', textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                  View Packages
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, background: 'rgba(15,8,2,0.72)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', padding: '14px 0', gap: 8 }}>
          {[['14+', 'Years'], ['1000+', 'Customers'], ['50+', 'Destinations'], ['24/7', 'Support']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(16px,3vw,26px)', fontWeight: 700, color: 'var(--gold-light)', lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 'clamp(10px,1.5vw,12px)', color: 'rgba(253,248,240,0.55)', marginTop: 3, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow buttons — hidden on small mobile to avoid crowding */}
      <button onClick={prev} aria-label="Previous slide"
        style={{ position: 'absolute', left: 12, top: '46%', transform: 'translateY(-50%)', zIndex: 4, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'background 0.2s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--saffron)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'}>
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} aria-label="Next slide"
        style={{ position: 'absolute', right: 12, top: '46%', transform: 'translateY(-50%)', zIndex: 4, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'background 0.2s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--saffron)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'}>
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 68, left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'flex', gap: 7 }}>
        {carousel.map((_, i) => (
          <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} aria-label={`Go to slide ${i + 1}`}
            style={{ width: i === current ? 24 : 7, height: 7, borderRadius: 4, background: i === current ? 'var(--saffron)' : 'rgba(255,255,255,0.38)', border: 'none', cursor: 'pointer', transition: 'all 0.28s', padding: 0 }} />
        ))}
      </div>
    </section>
  );
}
