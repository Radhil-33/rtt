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
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = carousel[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? '100%' : '-100%', opacity: 0 }),
  };

  return (
    <section style={{ position: 'relative', height: 'min(92vh, 780px)', overflow: 'hidden', background: 'var(--deep)' }} aria-label="Featured destinations">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Background image */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
          {/* Gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,15,5,0.85) 0%, rgba(26,15,5,0.4) 50%, rgba(26,15,5,0.6) 100%)' }} />
          
          {/* Decorative mandala pattern */}
          <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', width: 400, height: 400, opacity: 0.06, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px', borderRadius: '50%' }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div key={`content-${current}`} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, delay: 0.2 }}>
              {/* Trust badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,101,26,0.2)', border: '1px solid rgba(232,101,26,0.4)', padding: '8px 18px', borderRadius: 50, marginBottom: 24 }}>
                <Star size={14} fill="var(--gold)" color="var(--gold)" />
                <span style={{ color: 'var(--gold-light)', fontSize: 13, fontWeight: 600, letterSpacing: '0.5px' }}>4.9★ Rated · 1000+ Happy Travelers</span>
              </div>

              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}>
                {slide.title}
              </h1>
              <p style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: 'rgba(253,248,240,0.85)', marginBottom: 36, maxWidth: 560, lineHeight: 1.7 }}>
                {slide.subtitle}
              </p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href={slide.ctaLink} className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
                  {slide.ctaText}
                </Link>
                <Link href="/packages" className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', fontSize: 16, padding: '16px 36px' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                  View All Packages
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, background: 'rgba(26,15,5,0.7)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
          {[['14+', 'Years Experience'], ['1000+', 'Happy Customers'], ['50+', 'Destinations'], ['24/7', 'Support']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: 'var(--gold-light)' }}>{num}</div>
              <div style={{ fontSize: 12, color: 'rgba(253,248,240,0.6)', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button onClick={prev} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 4, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--saffron)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}>
        <ChevronLeft size={22} />
      </button>
      <button onClick={next} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 4, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--saffron)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}>
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'flex', gap: 8 }}>
        {carousel.map((_, i) => (
          <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? 'var(--saffron)' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </section>
  );
}
