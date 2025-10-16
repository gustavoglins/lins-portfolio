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
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');
  const [showIntro, setShowIntro] = useState(false);

  gsap.registerPlugin(SplitText);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonWrapper = useRef<HTMLDivElement>(null);
  const avatarRef = useRef(null);
  const splitTextInstance = useRef<any>(null);

  // 🎬 animações do Hero (só disparam depois da intro)
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

      const chars = splitTextInstance.current.chars;

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

      // entrada dos outros elementos quase juntos
      tl.from(
        [
          subtitleRef.current,
          paragraphRef.current,
          buttonWrapper.current,
          avatarRef.current,
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
    });

    return () => {
      ctx.revert();
      if (splitTextInstance.current) {
        splitTextInstance.current.revert();
      }
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
          <header className='absolute top-0 py-12.5 left-0 px-20 w-full flex items-center justify-between'>
            <TypographyH1 className="uppercase font-semibold tracking-wide">
              Gustavo
            </TypographyH1>
            <nav>
              <ul className='flex gap-8'>
                <li>
                  <Link href="#about"><span className='text-foreground'>{'['}</span> About <span className='text-foreground'>{']'}</span></Link>
                </li>
                <li>
                  <Link href="#about"><span className='text-foreground'>{'['}</span> Experience <span className='text-foreground'>{']'}</span></Link>
                </li>
                <li>
                  <Link href="#about"><span className='text-foreground'>{'['}</span> Projects <span className='text-foreground'>{']'}</span></Link>
                </li>
                <li>
                  <Link href="#about"><span className='text-foreground'>{'['}</span> Contact <span className='text-foreground'>{']'}</span></Link>
                </li>
              </ul>
            </nav>
          </header>
          <div className='w-full'>
            <div className='w-full flex items-center justify-center gap-0'>
              <div className="">
                <TypographyMuted><span className='text-[#ff1744]'>//</span> Open to Work!</TypographyMuted>
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
                <TypographyMuted><span className='text-[#ff1744]'>//</span> Gustavo Lins</TypographyMuted>
              </div>
            </div>
            <div>
            </div>
          </div>


        </section>
      )}
    </>
  );
}
