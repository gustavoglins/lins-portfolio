'use client';

import TypographyH1 from '@/components/typography/TypographyH1';
import { TypographyLarge } from '@/components/typography/TypographyLarge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useRef } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');

  gsap.registerPlugin(SplitText);
  const titleRef = useRef(null);
  const splitTextInstance = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.set(titleRef.current, { overflow: 'hidden' });

      // Divide o texto em spans
      // @ts-expect-error SplitText não é tipado
      splitTextInstance.current = new SplitText(titleRef.current, {
        type: 'chars',
        charsClass: 'char-reveal inline-block overflow-hidden',
      });

      // @ts-expect-error SplitText chars property
      const chars = splitTextInstance.current.chars;

      // Timeline mais cinematográfica
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(chars, {
        yPercent: 120,
        rotationX: -30,
        transformOrigin: 'center center',
        ease: 'circ.out',
        stagger: 0.02,
        duration: 0.6,
      });

      return () => {
        if (splitTextInstance.current) {
          // @ts-expect-error revert
          splitTextInstance.current.revert();
        }
      };
    }
  }, []);

  return (
    <section
      id="home"
      className="h-screen w-full flex items-center justify-between"
    >
      <div className="flex-1">
        <Badge variant="open-to-work" className="mb-6 text-sm font-medium">
          Open to Work
        </Badge>
        {/* <TypographyH1 ref={titleRef} className="text-8xl font-semibold">
          Gustavo Lins,
        </TypographyH1> */}
        <h1 className="text-8xl font-semibold" ref={titleRef}>
          Gustavo Lins,
        </h1>
        <TypographyH1 className="font-serif font-semibold italic text-8xl py-2 text-[#ff1744]">
          {t('subtitle')}
        </TypographyH1>
        <TypographyLarge className="w-[80%] mb-5">
          {t('paragraph')}
        </TypographyLarge>
        <Button variant="secondary" size="lg">
          Downlaod CV <Download />
        </Button>
      </div>
      <Avatar className="w-150 h-150">
        <AvatarImage
          src="ahttps://avatars.githubusercontent.com/u/145306272?s=400&u=366f479fd76b067a0a924c52fdb13cae699eca33&v=4"
          alt="Profile Picture"
        />
        <AvatarFallback className="text-9xl font-semibold">GL</AvatarFallback>
      </Avatar>
    </section>
  );
}
