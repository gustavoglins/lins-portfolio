'use client';

import { usePathname } from '@/i18n/navigation';
import { Download, Menu } from 'lucide-react';
import Image from 'next/image';
import TypographyH1 from './typography/TypographyH1';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
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

  return (
    <header className="flex items-center justify-between">
      <Link href={`/${locale}`}>
        <TypographyH1 className="uppercase font-semibold tracking-wide">
          Gustavo
        </TypographyH1>
      </Link>
      <nav>
        <ul>
          <li></li>
        </ul>
      </nav>
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Button
              variant="ghost"
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
          <li>
            <Button size="lg" variant="secondary">
              Downlaod CV <Download />
            </Button>
          </li>
          <li>
            <Button size="lg">
              Menu <Menu />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
