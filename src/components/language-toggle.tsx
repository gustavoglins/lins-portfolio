'use client';

import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'pt' ? 'en' : 'pt';
    router.push(pathname, { locale: newLocale });
  };

  return (
    <Button
      variant="reverse"
      size="lg"
      onClick={toggleLanguage}
      className="relative overflow-hidden group"
    >
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <Image
            src={
              locale === 'pt'
                ? '/images/usa-flag.svg'
                : '/images/brazil-flag.svg'
            }
            alt={locale === 'pt' ? 'Brazil Flag' : 'USA Flag'}
            width={20}
            height={15}
            className="transition-all duration-200"
          />
        </div>

        <span className="font-medium tracking-wide">
          {locale !== 'pt' ? 'PT' : 'EN'}
        </span>

        <Globe className="w-4 h-4" />
      </div>
    </Button>
  );
}
