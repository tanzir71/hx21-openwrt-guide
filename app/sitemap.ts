import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/seo';
import { reviewed } from '@/lib/content';
import { guidePath, locales, type View } from '@/lib/locale';
import { publicPath } from '@/lib/paths';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return (['findings', 'steps'] as View[]).flatMap((view) =>
    locales.map((locale) => ({
      url: siteOrigin + publicPath(guidePath(locale, view)),
      lastModified: reviewed,
      alternates: {
        languages: {
          en: siteOrigin + publicPath(guidePath('en', view)),
          bn: siteOrigin + publicPath(guidePath('bn', view)),
        },
      },
    })),
  );
}
