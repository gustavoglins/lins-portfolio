'use client';

import { useEffect, useRef, useState } from 'react';

export default function Aside() {
  const [progress, setProgress] = useState(0); // 0..1
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      const pct = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, pct)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // initial
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    const doc = document.documentElement;
    const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
    const target = ratio * maxScroll;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <aside aria-hidden="false">
      <div className="fixed right-6 top-0 h-screen flex items-center z-50 pointer-events-none">
        <div
          ref={trackRef}
          onClick={handleClick}
          role="slider"
          aria-label="Scroll progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-orientation="vertical"
          tabIndex={0}
          className="pointer-events-auto relative w-2 h-[30vh] bg-[rgba(0,0,0,0.1)] rounded-full cursor-pointer"
        >
          <div
            className="absolute left-0 top-0 w-full rounded-full"
            style={{
              height: `${progress * 100}%`,
              background: '#171717',
            }}
          />
        </div>
      </div>
    </aside>
  );
}
