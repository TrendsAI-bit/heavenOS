'use client';

import { useState, useEffect } from 'react';

export default function CRTToggle() {
  const [isCRTEnabled, setIsCRTEnabled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsCRTEnabled(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isCRTEnabled && !prefersReducedMotion) {
      document.body.classList.add('crt-effect');
    } else {
      document.body.classList.remove('crt-effect');
    }
  }, [isCRTEnabled, prefersReducedMotion]);

  // Don't show toggle if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsCRTEnabled(!isCRTEnabled)}
        className={`pixel-button text-xs px-3 py-2 transition-colors ${
          isCRTEnabled ? 'bg-halo-gold text-black' : 'bg-white'
        }`}
        title="Toggle CRT Effect"
        aria-label={`${isCRTEnabled ? 'Disable' : 'Enable'} CRT effect`}
      >
        CRT {isCRTEnabled ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}
