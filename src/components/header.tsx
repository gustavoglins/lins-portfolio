'use client';

import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import LanguageToggle from './language-toggle';
import { TypographyH2 } from './typography/TypographyH2';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import DownloadCvDrawer from './ui/download-cv-drawer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Header');

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);

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
      scale: 0,
      opacity: 0,
    });

    // Aguarda o ScrollSmoother estar pronto
    const checkSmoother = setInterval(() => {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        clearInterval(checkSmoother);

        let isHeaderVisible = false;
        const threshold = window.innerHeight * 0.7; // 70% da altura da viewport

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

            // Animar entrada dos elementos com scale (expandindo) - sincronizados
            gsap.to(animatableElements, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            });
          } else if (scrollY <= threshold && isHeaderVisible) {
            // Esconder o header
            isHeaderVisible = false;

            // Animar saída dos elementos com scale (encolhendo) - sincronizados
            gsap.to(animatableElements, {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
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
        <div ref={logoRef} className="flex-shrink-0">
          <Link href={`/${locale}`}>
            <TypographyH2 className="uppercase font-semibold tracking-wide text-background">
              Gustavo
            </TypographyH2>
          </Link>
        </div>
        <nav className="flex-shrink-0">
          <ul className="flex items-center gap-4">
            <li
              ref={(el) => {
                if (el) navItemsRef.current[2] = el;
              }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="lg"
                    variant="secondary"
                    type="button"
                    className="uppercase"
                  >
                    Menu <Menu />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  avoidCollisions={true}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  className="text-xl uppercase font-normal tracking-widest flex flex-col gap-2"
                >
                  <div className="bg-background text-foreground flex flex-col items-start w-full justify-center p-5 rounded-lg">
                    <ul className="flex flex-col gap-6 w-full">
                      <li className="w-full">
                        <Link
                          href={`/${locale}`}
                          className="flex items-center cursor-pointer w-full px-3 py-2 rounded-md transition-colors duration-200 hover:bg-[#ff1744]/10"
                        >
                          <p>{t('home')}</p>
                        </Link>
                      </li>
                      <li className="w-full">
                        <Link
                          href={`/${locale}#about`}
                          className="flex items-center cursor-pointer w-full px-3 py-2 rounded-md transition-colors duration-200 hover:bg-[#ff1744]/10"
                        >
                          {t('about')}
                        </Link>
                      </li>
                      <li className="w-full">
                        <Link
                          href={`/${locale}#experience`}
                          className="flex items-center cursor-pointer w-full px-3 py-2 rounded-md transition-colors duration-200 hover:bg-[#ff1744]/10"
                        >
                          {t('experience')}
                        </Link>
                      </li>
                      <li className="w-full">
                        <Link
                          href={`/${locale}#projects`}
                          className="flex items-center cursor-pointer w-full px-3 py-2 rounded-md transition-colors duration-200 hover:bg-[#ff1744]/10"
                        >
                          {t('projects')}
                        </Link>
                      </li>
                      <li className="w-full">
                        <Link
                          href={`/${locale}#contact`}
                          className="flex items-center cursor-pointer w-full px-3 py-2 rounded-md transition-colors duration-200 hover:bg-[#ff1744]/10"
                        >
                          {t('contact')}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="bg-background text-foreground w-full px-8 py-7 flex items-center justify-between cursor-pointer rounded-lg transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      const toggleButton = e.currentTarget.querySelector(
                        '[role="button"]'
                      ) as HTMLElement;
                      if (toggleButton) {
                        toggleButton.click();
                      }
                    }}
                  >
                    <span>{t('changeLanguage')}</span>
                    <LanguageToggle
                      variant="flag-only"
                      flagWidth={52}
                      flagHeight={42}
                    />
                  </div>
                  <div className="w-full">
                    <DownloadCvDrawer theme="dark" variant="panel" />
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
