'use client';

import AnimatedLogo from '@/components/animated-logo';
import LanguageToggle from '@/components/language-toggle';
import TypographyH1 from '@/components/typography/TypographyH1';
import { TypographyLarge } from '@/components/typography/TypographyLarge';
import { TypographyMuted } from '@/components/typography/TypographyMuted';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import DownloadCvDrawer from '@/components/ui/download-cv-drawer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');
  const [showIntro, setShowIntro] = useState(false);
  const [cvLanguage, setCvLanguage] = useState<'pt' | 'en'>('pt');

  // Refs para os elementos de underline
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  gsap.registerPlugin(SplitText, ScrollTrigger);

  // Função para limpar todos os underlines (fallback de segurança)
  const clearAllUnderlines = () => {
    underlineRefs.current.forEach((underline) => {
      if (underline) {
        gsap.killTweensOf(underline);
        gsap.set(underline, {
          opacity: 0,
          scaleY: 1,
          width: '0%',
          left: '0%',
        });
      }
    });
  };

  // Limpa todos os underlines quando o componente é desmontado ou quando showIntro muda
  useEffect(() => {
    return () => {
      clearAllUnderlines();
    };
  }, [showIntro]);

  // Função para animar o underline baseado na posição do cursor
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    const underline = underlineRefs.current[index];
    if (!underline) return;

    // Para qualquer animação em andamento para evitar conflitos
    gsap.killTweensOf(underline);

    const link = e.currentTarget;
    const rect = link.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const linkWidth = rect.width;

    // Calcula a posição relativa do mouse (0 a 1)
    const relativePosition = mouseX / linkWidth;

    // Sempre começa com um traço bem pequeno (8% da largura)
    const initialWidth = 0.0;

    // Calcula a posição inicial para centralizar o underline na posição do mouse
    const startPosition = relativePosition - initialWidth / 2;

    // Reset do underline - sempre começa pequeno e centralizado no mouse
    gsap.set(underline, {
      width: `${initialWidth * 100}%`,
      left: `${Math.max(
        0,
        Math.min(startPosition * 100, 100 - initialWidth * 100)
      )}%`,
      opacity: 0,
      scaleY: 1,
    });

    // Animação com fade-in e expansão
    gsap.to(underline, {
      opacity: 1,
      width: '100%',
      left: '0%',
      duration: 0.65,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const underline = underlineRefs.current[index];
    if (!underline) return;

    // Para qualquer animação em andamento para evitar conflitos
    gsap.killTweensOf(underline);

    // Animação de saída mais rápida e responsiva
    gsap.to(underline, {
      opacity: 0,
      duration: 0.15, // Reduzido de 0.25 para 0.15
      ease: 'power2.out',
      onComplete: () => {
        // Garantia extra: força o reset caso algo dê errado
        gsap.set(underline, {
          opacity: 0,
          scaleY: 1,
          width: '0%',
          left: '0%',
        });
      },
    });
  };

  // Função para baixar o CV baseado no idioma selecionado
  const handleDownloadCV = () => {
    const fileName =
      cvLanguage === 'pt' ? 'gustavoglins-cv.pdf' : 'gustavoglins-cv-en.pdf';
    const filePath = `/cv/${fileName}`;

    // Cria um link temporário para download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonWrapper = useRef<HTMLDivElement>(null);
  const avatarRef = useRef(null);
  const codeRef = useRef(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const commentTopRef = useRef(null);
  const commentBottomRef = useRef(null);
  const splitTextInstance = useRef<{
    chars?: Element[];
    revert?: (() => void) | undefined;
  } | null>(null);
  const splitCodeInstance = useRef<{
    chars?: Element[];
    revert?: (() => void) | undefined;
  } | null>(null);

  // animações do Hero (so dispara depois da intro)
  useEffect(() => {
    if (showIntro) return; // evita animar antes da intro acabar

    const ctx = gsap.context(() => {
      if (!titleRef.current) return;

      // split de caracteres
      gsap.set(titleRef.current, { overflow: 'hidden' });
      splitTextInstance.current = new SplitText(titleRef.current, {
        type: 'chars',
        charsClass: 'char-reveal inline-block overflow-hidden',
      });

      const chars = splitTextInstance.current?.chars ?? [];

      const tl = gsap.timeline({ delay: 0 }); // delay pós-intro

      // animação do título
      tl.from(chars, {
        yPercent: 120,
        rotationX: -30,
        transformOrigin: 'center center',
        ease: 'circ.out',
        stagger: 0.02,
        duration: 0.625,
      });

      // entrada dos outros elementos
      tl.from(
        [
          subtitleRef.current,
          paragraphRef.current,
          buttonWrapper.current,
          commentTopRef.current,
          commentBottomRef.current,
        ],
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
        },
        '-=0.25'
      );

      // avatar e codeblock sincronizados (começam e terminam juntos)
      const syncStartTime = '-=0.4'; // momento de início sincronizado
      const syncDuration = 1.0; // duração sincronizada

      // Avatar - revelação de cima para baixo
      if (avatarRef.current) {
        gsap.set(avatarRef.current, {
          clipPath: 'inset(100% 0 0 0)', // começa completamente cortado de cima
          opacity: 1,
        });

        tl.to(
          avatarRef.current,
          {
            clipPath: 'inset(0% 0 0 0)', // revela completamente
            duration: syncDuration,
            ease: 'power2.out',
          },
          syncStartTime
        );
      }

      // Code block
      if (codeRef.current) {
        gsap.set(codeRef.current, { overflow: 'hidden' });
        splitCodeInstance.current = new SplitText(codeRef.current, {
          type: 'chars',
          charsClass: 'char-code inline-block',
        });

        const codeChars = splitCodeInstance.current?.chars ?? [];

        // typing effect code block com efeito de onda
        tl.from(
          codeChars,
          {
            yPercent: 120,
            rotationX: -30,
            transformOrigin: 'center center',
            ease: 'circ.out',
            stagger: 0.02,
            duration: 0.6,
          },
          '-=0.8'
        );
      }

      // Header por último (depois de todos os outros componentes)
      if (headerRef.current) {
        gsap.set(headerRef.current, { autoAlpha: 0 });
        tl.to(
          headerRef.current,
          {
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5' // aparece por último
        );
      }
    });

    return () => {
      ctx.revert();
      splitTextInstance.current?.revert?.();
      splitCodeInstance.current?.revert?.();
    };
  }, [showIntro]);

  return (
    <>
      {showIntro && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-[50]">
          <AnimatedLogo onComplete={() => setShowIntro(false)} />
        </div>
      )}

      {!showIntro && (
        <section
          id="home"
          className="h-screen w-full flex items-center justify-between overflow-hidden relative z-0"
        >
          <header
            ref={headerRef}
            className="absolute top-0 left-0 px-15 p-5 w-full flex items-center justify-between z-1"
          >
            <nav className="w-full">
              <ul className="flex items-center justify-between w-full">
                <li>
                  <Link
                    href="#about"
                    className="relative inline-block cursor-pointer uppercase font-medium tracking-wider text-foreground/70 hover:text-foreground transition-colors duration-300"
                    onMouseEnter={(e) => handleMouseEnter(e, 0)}
                    onMouseLeave={() => handleMouseLeave(0)}
                  >
                    <span className="relative z-10">{t('header.about')}</span>
                    <span
                      ref={(el) => {
                        underlineRefs.current[0] = el;
                      }}
                      className="absolute bottom-0 h-0.5 bg-[#ff1744] opacity-0"
                    ></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#experience"
                    className="relative inline-block cursor-pointer uppercase font-medium tracking-wider text-foreground/70 hover:text-foreground transition-colors duration-300"
                    onMouseEnter={(e) => handleMouseEnter(e, 1)}
                    onMouseLeave={() => handleMouseLeave(1)}
                  >
                    <span className="relative z-10">
                      {t('header.experience')}
                    </span>
                    <span
                      ref={(el) => {
                        underlineRefs.current[1] = el;
                      }}
                      className="absolute bottom-0 h-0.5 bg-[#ff1744] opacity-0"
                    ></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    className="relative inline-block cursor-pointer uppercase font-medium tracking-wider text-foreground/70 hover:text-foreground transition-colors duration-300"
                    onMouseEnter={(e) => handleMouseEnter(e, 2)}
                    onMouseLeave={() => handleMouseLeave(2)}
                  >
                    <span className="relative z-10">
                      {t('header.projects')}
                    </span>
                    <span
                      ref={(el) => {
                        underlineRefs.current[2] = el;
                      }}
                      className="absolute bottom-0 h-0.5 bg-[#ff1744] opacity-0"
                    ></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="relative inline-block cursor-pointer uppercase font-medium tracking-wider text-foreground/70 hover:text-foreground transition-colors duration-300"
                    onMouseEnter={(e) => handleMouseEnter(e, 3)}
                    onMouseLeave={() => handleMouseLeave(3)}
                  >
                    <span className="relative z-10">{t('header.contact')}</span>
                    <span
                      ref={(el) => {
                        underlineRefs.current[3] = el;
                      }}
                      className="absolute bottom-0 h-0.5 bg-[#ff1744] opacity-0"
                    ></span>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full flex items-start justify-between gap-8 px-0">
              <div className="flex-1">
                <TypographyMuted ref={commentTopRef}>
                  <span className="text-[#ff1744]">{'//'}</span>{' '}
                  {t('openToWork')}
                </TypographyMuted>
                <TypographyH1
                  ref={titleRef}
                  className="font-semibold leading-none"
                >
                  Gustavo Lins,
                </TypographyH1>

                <TypographyH1
                  ref={subtitleRef}
                  className="font-serif font-semibold italic pb-2 text-[#ff1744] leading-none"
                >
                  {t('subtitle')}
                </TypographyH1>

                <TypographyLarge ref={paragraphRef} className="w-[70%] mb-5">
                  {t('paragraph')}
                </TypographyLarge>

                <div className="flex gap-5" ref={buttonWrapper}>
                  <DownloadCvDrawer theme="light" variant="button" />

                  <Link href="https://github.com/gustavoglins" target="_blank">
                    <Button variant="default" size="lg">
                      Github
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-2 inline"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.261.793-.58 0-.287-.01-1.045-.016-2.05-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.775.419-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.004-.404c1.019.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.652.242 2.873.118 3.176.77.839 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.479 5.921.43.372.815 1.102.815 2.222 0 1.605-.015 2.898-.015 3.293 0 .322.192.696.8.578C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </Button>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/gustavoglins/"
                    target="_blank"
                  >
                    <Button variant="default" size="lg">
                      LinkedIn
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-2 inline"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.135 1.445-2.135 2.938v5.668H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.273V1.727C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </Button>
                  </Link>
                  <LanguageToggle />
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <Avatar variant="portrait" size={1} ref={avatarRef}>
                  <AvatarImage
                    bw="hover"
                    src="ahttps://avatars.githubusercontent.com/u/145306272?s=400&u=366f479fd76b067a0a924c52fdb13cae699eca33&v=4"
                    alt="Profile Picture"
                    className="rounded-sm"
                  />
                  <AvatarFallback className="text-9xl font-semibold">
                    GL
                  </AvatarFallback>
                </Avatar>
                <TypographyMuted ref={commentBottomRef}>
                  <span className="text-[#ff1744]">{'//'}</span> Gustavo Lins
                </TypographyMuted>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
