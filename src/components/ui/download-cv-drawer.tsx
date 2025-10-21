'use client';

import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

type Theme = 'dark' | 'light';
type Variant = 'button' | 'panel';

interface Props {
  theme?: Theme;
  variant?: Variant;
}

export default function DownloadCvDrawer({
  theme = 'light',
  variant = 'button',
}: Props) {
  const t = useTranslations('HomePage');
  const [cvLanguage, setCvLanguage] = useState<'pt' | 'en'>('pt');

  const handleDownloadCV = () => {
    const fileName =
      cvLanguage === 'pt' ? 'gustavoglins-cv.pdf' : 'gustavoglins-cv-en.pdf';
    const filePath = `/cv/${fileName}`;

    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const panelClass =
    theme === 'dark'
      ? 'bg-[#ff1744] text-background'
      : 'bg-white text-[#ff1744] border border-[#ff1744]/10';

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {variant === 'button' ? (
          <Button variant="default" size="lg">
            Download CV <Download />
          </Button>
        ) : (
          <div
            className={`${panelClass} w-full px-8 py-7 flex items-center justify-between cursor-pointer rounded-lg group`}
          >
            <span>Download CV</span>
            <div className="relative w-6 h-6">
              {/* Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute inset-0 transform transition-transform duration-300 ease-out -translate-y-1 group-hover:-translate-y-2.5 group-active:-translate-y-0"
              >
                <path d="M12 5v13M19 12l-7 7-7-7" />
              </svg>
              {/* Base */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute inset-0"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              </svg>
            </div>
          </div>
        )}
      </DrawerTrigger>

      <DrawerContent
        className={
          theme === 'dark'
            ? 'bg-foreground border-[#ffffff1a]'
            : 'border-[#e5e5e5]'
        }
      >
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className={theme === 'dark' ? 'text-[#fafafa]' : ''}>
              {t('drawer.title')}
            </DrawerTitle>
            <DrawerDescription
              className={theme === 'dark' ? 'text-[#a1a1a1]' : ''}
            >
              {t('drawer.description')}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="mb-4">
              <div className="flex flex-col gap-4 py-4">
                <p className={theme === 'dark' ? 'text-sm text-[#fafafa]' : ''}>
                  {t('drawer.label')}
                </p>
                <div
                  className={`flex w-full gap-1 p-1 rounded-lg ${
                    theme === 'dark' ? 'bg-[#262626]' : 'bg-gray-100'
                  }`}
                >
                  <button
                    onClick={() => setCvLanguage('pt')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all duration-200 cursor-pointer ${
                      cvLanguage === 'pt'
                        ? `${
                            theme === 'dark'
                              ? 'bg-[#0a0a0a] text-[#fafafa] shadow-md ring-1 ring-[#ffffff1a]'
                              : 'bg-white text-gray-900 shadow-md ring-1 ring-gray-200'
                          }`
                        : `${
                            theme === 'dark'
                              ? 'text-[#9b9b9b]'
                              : 'text-gray-500 hover:text-gray-700'
                          }`
                    }`}
                  >
                    <Image
                      src="/images/brazil-flag.svg"
                      alt="Brazil Flag"
                      width={20}
                      height={15}
                    />
                    <span className="text-sm font-semibold">PT-BR</span>
                  </button>
                  <button
                    onClick={() => setCvLanguage('en')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all duration-200 cursor-pointer ${
                      cvLanguage === 'en'
                        ? `${
                            theme === 'dark'
                              ? 'bg-[#0a0a0a] text-[#fafafa] shadow-md ring-1 ring-[#ffffff1a]'
                              : 'bg-white text-gray-900 shadow-md ring-1 ring-gray-200'
                          }`
                        : `${
                            theme === 'dark'
                              ? 'text-[#9b9b9b]'
                              : 'text-gray-500 hover:text-gray-700'
                          }`
                    }`}
                  >
                    <Image
                      src="/images/usa-flag.svg"
                      alt="USA Flag"
                      width={20}
                      height={15}
                    />
                    <span className="text-sm font-semibold">EN-US</span>
                  </button>
                </div>
              </div>
            </div>
            <DrawerClose asChild>
              <Button
                variant={theme === 'dark' ? 'reverse' : 'default'}
                onClick={handleDownloadCV}
              >
                Download
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
