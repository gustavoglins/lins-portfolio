import Aside from '@/components/aside';
import WarningBanner from '@/components/WarningBanner';
import SmoothScroll from '@/components/smooth-scroll';
import MainContent from '@/components/main-content';
import Header from '@/components/header';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Playfair_Display, Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Gustavo Lins',
  description: 'Gustavo Lins - Personal Portfolio',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Carrega as mensagens de tradução
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <WarningBanner />

          {/* Header fixo - aparece quando sair da seção Home */}
          <Header locale={locale} />

          {/* SmoothScroll wrapper */}
          <SmoothScroll>
            <MainContent locale={locale} />
          </SmoothScroll>

          {/* Aside fica fora do smooth scroll para manter fixed */}
          <Aside />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
