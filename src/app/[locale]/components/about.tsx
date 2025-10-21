'use client';

import SectionTitle from '@/components/section-title';
import TypographyH1 from '@/components/typography/TypographyH1';
import { TypographyP } from '@/components/typography/TypographyP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

export default function About() {
  const t = useTranslations('AboutPage');

  // Refs para os elementos que serão animados
  const sectionTitleRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);
  const subtitlePart1Ref = useRef(null); // "<"
  const subtitlePart2Ref = useRef(null); // "me"
  const subtitlePart3Ref = useRef(null); // "/>"
  const splitTextInstance = useRef<{
    chars?: Element[];
    revert?: (() => void) | undefined;
  } | null>(null);
  const splitParagraphInstance = useRef<{
    lines?: Element[];
    revert?: (() => void) | undefined;
  } | null>(null);

  gsap.registerPlugin(SplitText, ScrollTrigger);

  // Animação dos elementos quando a seção entra na viewport
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !subtitleRef.current) return;

      // Split de caracteres para o título principal com wrapper para evitar corte
      splitTextInstance.current = new SplitText(titleRef.current, {
        type: 'chars',
        charsClass: 'char-reveal inline-block',
      });

      // Split de linhas para o parágrafo
      splitParagraphInstance.current = new SplitText(paragraphRef.current, {
        type: 'lines',
        linesClass: 'line-reveal block overflow-hidden',
      });

      const titleChars = splitTextInstance.current?.chars ?? [];
      const paragraphLines = splitParagraphInstance.current?.lines ?? [];

      // Wrap each char in an overflow hidden container
      titleChars.forEach((char) => {
        const wrapper = document.createElement('span');
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'inline-block';
        char.parentNode?.insertBefore(wrapper, char);
        wrapper.appendChild(char);
      });

      // Timeline principal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animação do SectionTitle primeiro
      tl.from(sectionTitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
      });

      // Animação do título principal com efeito de caracteres
      tl.from(
        titleChars,
        {
          yPercent: 120,
          rotationX: -30,
          transformOrigin: 'center center',
          ease: 'circ.out',
          stagger: 0.02,
          duration: 0.6,
        },
        '-=0.3'
      );

      // Animação do subtítulo "<me/>" dividido em 3 partes
      const subtitleParts = [
        subtitlePart1Ref.current,
        subtitlePart2Ref.current,
        subtitlePart3Ref.current,
      ];

      tl.from(
        subtitleParts,
        {
          opacity: 0,
          y: 30,
          rotationX: -20,
          transformOrigin: 'center center',
          ease: 'circ.out',
          stagger: 0.08,
          duration: 0.6,
        },
        '-=0.4'
      );

      // Animação do parágrafo por último com efeito de onda por linha
      tl.from(
        paragraphLines,
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '-=0.8'
      );
    });

    return () => {
      ctx.revert();
      splitTextInstance.current?.revert?.();
      splitParagraphInstance.current?.revert?.();
    };
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-foreground px-20 pt-32"
    >
      <div ref={sectionTitleRef}>
        <SectionTitle>{t('sectionTitle')}</SectionTitle>
      </div>
      <div className="flex items-baseline gap-5">
        <TypographyH1
          ref={titleRef}
          className="font-semibold text-background leading-none"
        >
          {t('title')}
        </TypographyH1>
        <TypographyH1
          ref={subtitleRef}
          className="font-serif font-semibold italic text-[#ff1744] leading-none -translate-y-[0.15em]"
        >
          <span ref={subtitlePart1Ref} className="inline-block">
            {t('subtitle.part1')}
          </span>
          <span ref={subtitlePart2Ref} className="inline-block">
            {t('subtitle.part2')}
          </span>
          <span ref={subtitlePart3Ref} className="inline-block">
            {t('subtitle.part3')}
          </span>
        </TypographyH1>
      </div>
      <TypographyP ref={paragraphRef} className="text-background">
        {t('paragraph')}
      </TypographyP>
    </section>
  );
}
