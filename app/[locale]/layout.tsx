import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/locale';
import localFont from 'next/font/local';
import '../globals.css';
const balooDa2 = localFont({
  src: '../fonts/BalooDa2-Variable.ttf',
  variable: '--font-baloo-da-2',
  weight: '400 800',
  display: 'swap',
  preload: false,
  fallback: ['Arial'],
});
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'bn' }];
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={balooDa2.variable}>
      <body>{children}</body>
    </html>
  );
}
