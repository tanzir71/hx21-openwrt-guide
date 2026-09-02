import type { MetadataRoute } from 'next';
import { indexable, siteOrigin } from '@/lib/seo';
import { publicPath } from '@/lib/paths';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: indexable ? [publicPath('/downloads/')] : ['/'],
    },
    sitemap: siteOrigin + publicPath('/sitemap.xml'),
  };
}
