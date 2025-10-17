'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function Aside() {
  const [progress, setProgress] = useState(0); // 0..1
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Atualiza o progresso baseado no scroll
    const updateProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = Math.max(0, docHeight - windowHeight);
      const pct = maxScroll > 0 ? scrollY / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, pct)));
    };

    // Usa ScrollTrigger para sincronizar com ScrollSmoother
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: updateProgress,
    });

    // Initial update
    updateProgress();

    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('resize', updateProgress);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = Math.max(0, docHeight - windowHeight);
    const target = ratio * maxScroll;

    // Usa gsap para scroll suave compatível com ScrollSmoother
    gsap.to(window, {
      scrollTo: { y: target, autoKill: true },
      duration: 1,
      ease: 'power2.inOut',
    });
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
