'use client';

import AnimatedLogo from '@/components/animated-logo';
import TypographyH1 from '@/components/typography/TypographyH1';
import { TypographyLarge } from '@/components/typography/TypographyLarge';
import { TypographyMuted } from '@/components/typography/TypographyMuted';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Download, Github, Linkedin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');
  const [showIntro, setShowIntro] = useState(true);

  gsap.registerPlugin(SplitText);

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

      const tl = gsap.timeline({ delay: 0.8 }); // delay pós-intro

      // animação do título
      tl.from(chars, {
        yPercent: 120,
        rotationX: -30,
        transformOrigin: 'center center',
        ease: 'circ.out',
        stagger: 0.02,
        duration: 0.6,
      });

      // entrada dos outros elementos quase juntos (inclui comentários 'muted')
      tl.from(
        [
          subtitleRef.current,
          paragraphRef.current,
          buttonWrapper.current,
          avatarRef.current,
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
        '+=0.1'
      );

      if (codeRef.current) {
        gsap.set(codeRef.current, { overflow: 'hidden' });
        splitCodeInstance.current = new SplitText(codeRef.current, {
          type: 'chars',
          charsClass: 'char-code inline-block',
        });

        const codeChars = splitCodeInstance.current?.chars ?? [];

        // animate characters like a typing effect using staggered reveal
        tl.from(codeChars, {
          autoAlpha: 0,
          duration: 0.01,
          ease: 'none',
          stagger: 0.03,
        }, '+=0.2');
      }

      // subtle header fade that runs after the main timeline
      if (headerRef.current) {
        // start hidden
        gsap.set(headerRef.current, { autoAlpha: 0, y: -6 });
        // place the header fade to run after previous timeline animations
        tl.to(headerRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power1.out',
        }, '+=0.15');
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
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
          <AnimatedLogo onComplete={() => setShowIntro(false)} />
        </div>
      )}

      {!showIntro && (
        <section
          id="home"
          className="h-screen w-full flex items-center justify-between overflow-hidden"
        >
          <header ref={headerRef} className='absolute top-0 py-12.5 left-0 px-20 w-full flex items-center justify-between'>
            <TypographyH1 className="uppercase font-semibold tracking-wide">
              Gustavo
            </TypographyH1>
            <nav>
              <ul className='flex gap-8'>
                <li>
                  <Link href="#about" className="group">
                    <span className="text-foreground group-hover:text-[#ff1744] transition-colors">{'['}</span>
                    About
                    <span className="text-foreground group-hover:text-[#ff1744] transition-colors">{']'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="group">
                    <span className="text-foreground group-hover:text-[#ff1744] transition-colors">{'['}</span>
                    Experience
                    <span className="text-foreground group-hover:text-[#ff1744] transition-colors">{']'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="group">
                    <span className="text-foreground group-hover:text-[#ff1744] transition-colors">{'['}</span>
                    Projects
                    <span className="text-foreground group-hover:text-[#ff1744] transition-colors">{']'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="group">
                    <span className="text-foreground group-hover:text-[#ff1744] transition-colors">{'['}</span>
                    Contact
                    <span className="text-foreground group-hover:text-[#ff1744] transition-colors">{']'}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <div className='w-full h-full flex flex-col items-center justify-between pt-35 pb-5'>
            <div className='w-full flex items-center justify-center gap-0'>
              <div className="">
                <TypographyMuted ref={commentTopRef}><span className='text-[#ff1744]'>{'//'}</span> Open to Work!</TypographyMuted>
                <TypographyH1 ref={titleRef} className="text-8xl font-semibold">
                  Gustavo Lins,
                </TypographyH1>

                <TypographyH1
                  ref={subtitleRef}
                  className="font-serif font-semibold italic text-8xl py-2 text-[#ff1744]"
                >
                  {t('subtitle')}
                </TypographyH1>

                <TypographyLarge ref={paragraphRef} className="w-[70%] mb-5">
                  {t('paragraph')}
                </TypographyLarge>

                <div className='flex gap-5' ref={buttonWrapper}>
                  <Button variant="secondary" size="lg">
                    Download CV <Download />
                  </Button>
                  <Link href='https://github.com/gustavoglins' target='_blank'>
                    <Button variant="secondary" size="lg">
                      Github <Github />
                    </Button>
                  </Link>
                  <Link href='https://www.linkedin.com/in/gustavoglins/' target='_blank'>
                    <Button variant="secondary" size="lg">
                      LinkedIn <Linkedin />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Avatar variant='portrait' size={1.05} ref={avatarRef} >
                  <AvatarImage
                    bw='hover'
                    src="https://avatars.githubusercontent.com/u/145306272?s=400&u=366f479fd76b067a0a924c52fdb13cae699eca33&v=4"
                    alt="Profile Picture"
                  />
                  <AvatarFallback className="text-9xl font-semibold">GL</AvatarFallback>
                </Avatar>
                <TypographyMuted ref={commentBottomRef}><span className='text-[#ff1744]'>{'//'}</span> Gustavo Lins</TypographyMuted>
              </div>
            </div>
            <div ref={codeRef}>
              <CodeBlock fontSize={30}
                code={`while (!success) {
    tryAgain();
}`}
                language="java"
              />
            </div>
          </div>


        </section>
      )}
    </>
  );
}
