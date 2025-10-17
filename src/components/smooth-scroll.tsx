'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Registrar plugins do GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Criar ScrollSmoother
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5, // Suavidade do scroll (0-3, quanto maior mais suave)
      effects: true, // Habilita data-speed e data-lag
      smoothTouch: 0.1, // Suavidade em dispositivos touch (0 desabilita)
      normalizeScroll: true, // Normaliza o scroll em diferentes navegadores
    });

    // Cleanup
    return () => {
      smootherRef.current?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
