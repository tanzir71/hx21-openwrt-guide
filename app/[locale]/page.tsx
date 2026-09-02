import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/seo';
import { Guide } from '@/components/guide';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, 'findings') : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Guide locale={locale} view="findings" />;
}
