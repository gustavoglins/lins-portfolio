import Aside from '@/components/aside';
import WarningBanner from '@/components/WarningBanner';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Playfair_Display, Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import About from './components/about';
import Home from './components/home';
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

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        <WarningBanner />
        <div className="h-full w-full">
          <NextIntlClientProvider>
            {/* <Header locale={locale} /> */}
            <Home />
            <About />
            <Aside />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
