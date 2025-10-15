import TypographyH1 from '@/components/typography/TypographyH1';
import { TypographyLarge } from '@/components/typography/TypographyLarge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <section
      id="home"
      className="h-screen w-full flex items-center justify-between"
    >
      <div>
        <TypographyH1 className="text-9xl font-semibold">
          Gustavo Lins,
        </TypographyH1>
        <TypographyH1 className="font-serif font-semibold italic text-9xl py-2 text-[#ff1744]">
          {t('subtitle')}
        </TypographyH1>
        <TypographyLarge className="mb-5">{t('paragraph')}</TypographyLarge>
        <Button variant="secondary" size="lg">
          Downlaod CV <Download />
        </Button>
      </div>
      <div>
        <Avatar className="w-120 h-120">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/145306272?s=400&u=366f479fd76b067a0a924c52fdb13cae699eca33&v=4"
            alt="Profile Picture"
          />
          <AvatarFallback>GL</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}
