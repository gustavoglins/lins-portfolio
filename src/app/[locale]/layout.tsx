import Aside from '@/components/aside';
import Header from '@/components/header';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Playfair_Display, Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import './globals.css';
import WarningBanner from '@/components/WarningBanner';

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
  icons: {
    icon: './favicon.icon',
    shortcut: './favicon.icon',
    apple: './favicon.icon',
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        <WarningBanner />
        <div className="h-full w-full px-20 py-12.5">
          <NextIntlClientProvider>
            <div className="h-full w-full">
              <Header locale={locale} />
              {children}
              <Aside />
            </div>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
