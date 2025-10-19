'use client';

import { usePathname } from '@/i18n/navigation';
import { Download, Menu } from 'lucide-react';
import Image from 'next/image';
import TypographyH1 from './typography/TypographyH1';
import { Button } from './ui/button';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { TypographyH2 } from './typography/TypographyH2';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);

  const flagByLocale: Record<string, string> = {
    en: '/images/usa-flag.svg',
    pt: '/images/brazil-flag.svg',
  };

  function handleToggleLocale() {
    const currentIndex = ['en', 'pt'].indexOf(locale);
    const nextLocale = ['en', 'pt'][(currentIndex + 1) % 2];
    const stripLocalePrefix = (p: string) => {
      const match = p.match(/^\/(en|pt)(\/|$)/);
      if (match) return p.slice(match[0].length - 1);
      return p;
    };

    const basePath = stripLocalePrefix(pathname || '/');
    const search = window.location.search || '';
    const target = `/${nextLocale}${basePath}${search}`;

    window.location.href = target;
  }

  useEffect(() => {
    if (!headerRef.current) return;

    let trigger: ScrollTrigger | null = null;
    const animatableElements = [logoRef.current, ...navItemsRef.current].filter(
      Boolean
    );

    // Estado inicial - sempre escondido
    gsap.set(headerRef.current, {
      opacity: 0,
    });
    gsap.set(animatableElements, {
      y: -100,
      opacity: 0,
    });

    // Aguarda o ScrollSmoother estar pronto
    const checkSmoother = setInterval(() => {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        clearInterval(checkSmoother);

        let isHeaderVisible = false;
        const threshold = window.innerHeight * 0.6; // 60% da altura da viewport

        // Função para verificar e atualizar o header baseado no scroll
        const updateHeader = () => {
          const scrollY = smoother.scrollTop();

          if (scrollY > threshold && !isHeaderVisible) {
            // Mostrar o header
            isHeaderVisible = true;
            gsap.to(headerRef.current, {
              opacity: 1,
              duration: 0.3,
            });

            // Animar entrada dos elementos em onda (descendo)
            gsap.to(animatableElements, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: {
                each: 0.1,
                from: 'start',
              },
            });
          } else if (scrollY <= threshold && isHeaderVisible) {
            // Esconder o header
            isHeaderVisible = false;

            // Animar saída dos elementos em onda (subindo)
            gsap.to(animatableElements, {
              y: -100,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.in',
              stagger: {
                each: 0.08,
                from: 'end',
              },
              onComplete: () => {
                // Esconder o header completamente após a animação
                gsap.set(headerRef.current, {
                  opacity: 0,
                });
              },
            });
          }
        };

        // Usar ScrollTrigger para monitorar o scroll
        trigger = ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: updateHeader,
        });

        // Update inicial
        updateHeader();
      }
    }, 100);

    return () => {
      clearInterval(checkSmoother);
      if (trigger) {
        trigger.kill();
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 px-15 py-12.5"
    >
      <div className="flex items-center justify-between">
        <div ref={logoRef}>
          <Link href={`/${locale}`}>
            <TypographyH2 className="uppercase font-semibold tracking-wide text-background">
              Gustavo
            </TypographyH2>
          </Link>
        </div>
        <nav>
          <ul>
            <li></li>
          </ul>
        </nav>
        <nav>
          <ul className="flex items-center gap-4">
            <li
              ref={(el) => {
                if (el) navItemsRef.current[0] = el;
              }}
            >
              <Button
                variant="link"
                onClick={handleToggleLocale}
                aria-label={`Switch language (current: ${locale})`}
              >
                <Image
                  src={flagByLocale[locale] ?? '/images/usa-flag.svg'}
                  alt={`${locale} flag`}
                  width={29}
                  height={20}
                />
              </Button>
            </li>
            <li
              ref={(el) => {
                if (el) navItemsRef.current[1] = el;
              }}
            >
              <Button size="lg" variant="secondary">
                Download CV <Download />
              </Button>
            </li>
            <li
              ref={(el) => {
                if (el) navItemsRef.current[2] = el;
              }}
            >
              <Button size="lg" variant="secondary">
                Menu <Menu />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
