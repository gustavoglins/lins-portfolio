'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';

interface LanguageToggleProps {
  variant?: 'full' | 'flag-only' | 'custom';
  onToggle?: () => void;
  wrapperClassName?: string;
  flagSize?: 'sm' | 'md' | 'lg' | 'xl';
  flagWidth?: number;
  flagHeight?: number;
  children?: React.ReactNode;
}

export default function LanguageToggle({
  variant = 'full',
  onToggle,
  wrapperClassName,
  flagSize = 'md',
  flagWidth,
  flagHeight,
  children,
}: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'pt' ? 'en' : 'pt';
    router.push(pathname, { locale: newLocale });
    onToggle?.();
  };

  // Função para obter as dimensões da bandeira baseada no tamanho
  const getFlagDimensions = (size: string) => {
    switch (size) {
      case 'sm':
        return { width: 16, height: 12 };
      case 'md':
        return { width: 20, height: 15 };
      case 'lg':
        return { width: 29, height: 20 };
      case 'xl':
        return { width: 36, height: 24 };
      default:
        return { width: 20, height: 15 };
    }
  };

  // Prioriza props customizadas sobre tamanhos predefinidos
  const flagDimensions = {
    width: flagWidth ?? getFlagDimensions(flagSize).width,
    height: flagHeight ?? getFlagDimensions(flagSize).height,
  };

  if (variant === 'custom') {
    return (
      <div
        onClick={toggleLanguage}
        className="cursor-pointer"
        aria-label={`Switch language (current: ${locale})`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLanguage();
          }
        }}
      >
        {children}
      </div>
    );
  }

  if (variant === 'flag-only') {
    return (
      <div
        onClick={toggleLanguage}
        className="relative overflow-hidden group cursor-pointer flex items-center justify-center rounded-md"
        aria-label={`Switch language (current: ${locale})`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLanguage();
          }
        }}
      >
        <div className="relative flex items-center justify-center">
          <Image
            src={
              locale === 'pt'
                ? '/images/usa-flag.svg'
                : '/images/brazil-flag.svg'
            }
            alt={locale === 'pt' ? 'Brazil Flag' : 'USA Flag'}
            width={flagDimensions.width}
            height={flagDimensions.height}
            className="transition-all duration-200"
          />
        </div>
      </div>
    );
  }

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
            width={flagDimensions.width}
            height={flagDimensions.height}
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
