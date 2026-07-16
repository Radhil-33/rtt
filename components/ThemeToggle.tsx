'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 52, height: 28 }} />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      style={{
        position: 'relative',
        width: 52,
        height: 28,
        borderRadius: 14,
        background: isDark
          ? 'linear-gradient(135deg, #D4AF37, #B8951F)'
          : 'rgba(11,35,68,0.12)',
        border: isDark ? 'none' : '1.5px solid rgba(11,35,68,0.18)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        flexShrink: 0,
        padding: 0,
      }}
    >
      {/* Track icons */}
      <Moon
        size={12}
        style={{
          position: 'absolute',
          left: 7,
          top: '50%',
          transform: 'translateY(-50%)',
          color: isDark ? '#0B2344' : 'rgba(11,35,68,0.35)',
          transition: 'color 0.3s',
        }}
      />
      <Sun
        size={12}
        style={{
          position: 'absolute',
          right: 7,
          top: '50%',
          transform: 'translateY(-50%)',
          color: isDark ? 'rgba(212,175,55,0.4)' : '#0B2344',
          transition: 'color 0.3s',
        }}
      />
      {/* Thumb */}
      <div
        style={{
          position: 'absolute',
          top: 3,
          left: isDark ? 27 : 3,
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: isDark ? '#0B2344' : 'white',
          boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
          transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isDark
          ? <Moon size={11} color="#D4AF37" />
          : <Sun size={11} color="#0B2344" />}
      </div>
    </button>
  );
}
