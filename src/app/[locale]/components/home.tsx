'use client';

import AnimatedLogo from '@/components/animated-logo';
import TypographyH1 from '@/components/typography/TypographyH1';
import { TypographyLarge } from '@/components/typography/TypographyLarge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
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

      const tl = gsap.timeline({ delay: 0.8 }); // pequeno delay pós-intro

      // 1️⃣ animação do título
      tl.from(chars, {
        yPercent: 120,
        rotationX: -30,
        transformOrigin: 'center center',
        ease: 'circ.out',
        stagger: 0.02,
        duration: 0.6,
      });

      // 2️⃣ entrada dos outros elementos quase juntos
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
          <div className="flex-1">
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

            <div ref={buttonWrapper}>
              <Button variant="secondary" size="lg">
                Download CV <Download />
              </Button>
            </div>
          </div>

          <Avatar variant='portrait' size={2} ref={avatarRef} >
            <AvatarImage
              bw='hover'
              src="ahttps://avatars.githubusercontent.com/u/145306272?s=400&u=366f479fd76b067a0a924c52fdb13cae699eca33&v=4"
              alt="Profile Picture"
            />
            <AvatarFallback className="text-9xl font-semibold">GL</AvatarFallback>
          </Avatar>
        </section>
      )}
    </>
  );
}
