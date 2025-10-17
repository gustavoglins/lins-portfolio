'use client';

import About from '@/app/[locale]/components/about';
import Home from '@/app/[locale]/components/home';
import Projects from '@/app/[locale]/components/projects';
import SmoothScroll from '@/components/smooth-scroll';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

interface MainContentProps {
  locale: string;
}

export default function MainContent({ locale }: MainContentProps) {
  const sectionsWrapperRef = useRef<HTMLDivElement>(null);
  const sectionsContentRef = useRef<HTMLDivElement>(null);
  const homeWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Aguarda o ScrollSmoother ser inicializado
    const checkSmoother = setInterval(() => {
      const smoother = ScrollSmoother.get();
      if (
        smoother &&
        sectionsWrapperRef.current &&
        sectionsContentRef.current &&
        homeWrapperRef.current
      ) {
        clearInterval(checkSmoother);

        const ctx = gsap.context(() => {
          // Cria a animação de scroll que faz as seções subirem
          gsap.to(sectionsContentRef.current, {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionsWrapperRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.5,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Controla pointer-events e z-index baseado no progresso
                if (sectionsContentRef.current && homeWrapperRef.current) {
                  if (self.progress < 0.05) {
                    // Menos de 5% scrollado - Home totalmente visível e clicável
                    sectionsContentRef.current.style.pointerEvents = 'none';
                    homeWrapperRef.current.style.zIndex = '60';
                  } else {
                    // Começou a cobrir a Home - seções clicáveis e acima da Home
                    sectionsContentRef.current.style.pointerEvents = 'auto';
                    homeWrapperRef.current.style.zIndex = '0';
                  }
                }
              },
            },
          });
        });

        return () => {
          ctx.revert();
        };
      }
    }, 50);

    return () => {
      clearInterval(checkSmoother);
    };
  }, []);

  return (
    <>
      {/* Seção Home - Fixa no fundo, fora do smooth scroll */}
      <div
        ref={homeWrapperRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-auto"
        style={{ zIndex: 60 }}
      >
        <Home />
      </div>

      {/* SmoothScroll wrapper para as outras seções */}
      <SmoothScroll>
        {/* Wrapper para criar o espaço de scroll */}
        <div
          id="sections-wrapper"
          ref={sectionsWrapperRef}
          className="relative pointer-events-none"
          style={{ height: '200vh', zIndex: 40 }}
        >
          {/* Seções que sobem e cobrem a Home */}
          <div
            ref={sectionsContentRef}
            className="sticky top-0 will-change-transform"
            style={{ transform: 'translateY(100vh)', pointerEvents: 'none' }}
          >
            <About />
            <Projects />
          </div>
        </div>
      </SmoothScroll>
    </>
  );
}
