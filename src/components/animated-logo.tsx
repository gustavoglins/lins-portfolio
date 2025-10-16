'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// NOTE: Importing SVGs from /public as components requires SVGR setup.
// To avoid runtime errors and keep animations on <path> elements, we inline the SVG below.

export default function AnimatedLogo({ onComplete }: { onComplete?: () => void }) {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = logoRef.current;
    const paths = svg?.querySelectorAll('path');
    if (!paths) return;

    // Inicializa traços ocultos
    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, {
        stroke: '#ffffff',
        fill: 'transparent',
        strokeWidth: 2,
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete,
    });

    // 1️⃣ Desenha o traço
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.8,
      stagger: 0.2,
    });

    // 2️⃣ Brilho leve (pulse)
    tl.to(
      svg,
      {
        scale: 1.05,
        filter: 'drop-shadow(0 0 25px #ffffff)',
        duration: 0.6,
        yoyo: true,
        repeat: 1,
        transformOrigin: 'center',
      },
      '-=0.5'
    );

    // 3️⃣ Preenche de branco
    tl.to(paths, {
      fill: '#ffffff',
      duration: 0.6,
      ease: 'power1.inOut',
    });

    // 4️⃣ Fade-out total (transição pro hero)
    tl.to(
      svg,
      {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      },
      '+=0.3'
    );

  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      {/* Inline SVG so we can animate the paths and avoid invalid React element errors */}
      <svg
        ref={logoRef}
        className="w-[260px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 477.99 290.79"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M212.08,89.32c-6.53-11.96-15.5-21.07-26.92-27.33-11.42-6.25-24.74-9.38-39.97-9.38-16.86,0-31.81,3.81-44.86,11.42-13.05,7.62-23.25,18.49-30.59,32.63-7.34,14.14-11.01,30.45-11.01,48.94s3.73,35.62,11.22,49.76c7.48,14.14,17.88,25.02,31.2,32.63,13.32,7.62,28.82,11.42,46.49,11.42,21.75,0,39.56-5.77,53.43-17.33,13.87-11.55,22.97-27.66,27.33-48.33h-97.88v-43.64h154.17v49.76c-3.81,19.85-11.97,38.2-24.47,55.06-12.51,16.86-28.62,30.38-48.33,40.58-19.72,10.2-41.8,15.29-66.27,15.29-27.47,0-52.27-6.18-74.43-18.56-22.16-12.37-39.56-29.57-52.2-51.59S0,173.61,0,145.6s6.32-53.08,18.96-75.25c12.64-22.16,30.04-39.42,52.2-51.8C93.33,6.19,118,0,145.19,0c32.08,0,59.95,7.82,83.61,23.45,23.65,15.64,39.97,37.59,48.94,65.87h-65.66Z" fill="#fff" />
        <path d="M384.19,243.08h93.8v45.27h-150.9V3.67h57.1v239.4Z" fill="#fff" />
      </svg>
    </div>
  );
}
