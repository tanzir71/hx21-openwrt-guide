import type { Metadata } from 'next';
import { guidePath, type Locale, type View, type Platform } from './locale';
import { reviewed, sources } from './content';
import { publicPath } from './paths';
const configuredOrigin =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');
export const siteOrigin = new URL(configuredOrigin).origin;
export const indexable =
  siteOrigin.startsWith('https://') &&
  (process.env.VERCEL_ENV === 'production' ||
    (!process.env.VERCEL_ENV && process.env.NODE_ENV === 'production'));
export function pageMetadata(
  locale: Locale,
  view: View,
  platform: Platform = 'mac',
): Metadata {
  const bn = locale === 'bn';
  const computer = platform === 'windows' ? 'Windows' : bn ? 'ম্যাক' : 'Mac';
  const computerPossessive = platform === 'windows' ? 'Windows-এর' : 'ম্যাকের';
  const title =
    view === 'prompt'
      ? bn
        ? `HX21 OpenWrt: ${computerPossessive} জন্য সম্পূর্ণ LLM প্রম্পট`
        : `HX21 OpenWrt: Complete ${computer} LLM Prompt`
      : bn
        ? view === 'steps'
          ? `HX21-এ OpenWrt: ${computerPossessive} জন্য ছবিতে ধাপে ধাপে`
          : `HX21 OpenWrt গাইড: গবেষণা, সতর্কতা ও ${computer} ব্যাকআপ`
        : view === 'steps'
          ? `HX21 OpenWrt: Visual ${computer} Installation Walkthrough`
          : `HX21 OpenWrt Guide: Findings, Risks & ${computer} Backups`;
  const description = bn
    ? `Imou HX21-এ OpenWrt ইনস্টলের সূত্রসহ বাংলা গাইড। ${computerPossessive} তারযুক্ত সংযোগ, Factory ব্যাকআপ, SSH ঝুঁকি, TFTP ও প্রথম বুট বুঝুন।`
    : `A source-linked Imou HX21 OpenWrt guide for ${computer}: native support, SSH and MAC risks, private Factory backups, TFTP recovery and first-boot checks.`;
  const url = siteOrigin + publicPath(guidePath(locale, view, platform));
  const image = {
    url: siteOrigin + publicPath('/og.png'),
    width: 1730,
    height: 909,
    alt: 'HX21 OpenWrt Guide — Findings. Backups. A clearer path.',
  };
  return {
    metadataBase: new URL(siteOrigin),
    title,
    description,
    applicationName: 'HX21 OpenWrt Guide',
    alternates: {
      canonical: url,
      languages: {
        en: siteOrigin + publicPath(guidePath('en', view, platform)),
        bn: siteOrigin + publicPath(guidePath('bn', view, platform)),
        'x-default':
          siteOrigin +
          publicPath(
            platform === 'mac' && view === 'findings'
              ? '/'
              : guidePath('en', view, platform),
          ),
      },
    },
    robots: { index: indexable, follow: true },
    icons: {
      icon: [
        { url: publicPath('/favicon.svg'), type: 'image/svg+xml' },
        {
          url: publicPath('/favicon-32.png'),
          type: 'image/png',
          sizes: '32x32',
        },
      ],
      apple: publicPath('/apple-touch-icon.png'),
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'HX21 OpenWrt Guide',
      locale: bn ? 'bn_BD' : 'en_US',
      alternateLocale: [bn ? 'en_US' : 'bn_BD'],
      modifiedTime: reviewed,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
export function articleSchema(
  locale: Locale,
  view: View,
  platform: Platform = 'mac',
) {
  const metadata = pageMetadata(locale, view, platform);
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: metadata.description,
    url: siteOrigin + publicPath(guidePath(locale, view, platform)),
    contributor: {
      '@type': 'Person',
      name: 'Tanzir Rahman',
      url: 'https://tanziro.com/',
    },
    inLanguage: locale,
    dateModified: reviewed,
    image: siteOrigin + publicPath('/og.png'),
    about: { '@type': 'Thing', name: 'Imou HX21 OpenWrt installation' },
    citation: [sources.device, sources.upstream, sources.selector],
  };
}
