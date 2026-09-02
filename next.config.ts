import type { NextConfig } from 'next';

const pages = process.env.NEXT_PUBLIC_STATIC_MIRROR === '1';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(pages
    ? {
        output: 'export',
        trailingSlash: true,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
        images: { unoptimized: true },
      }
    : {}),
  headers: pages
    ? undefined
    : async () => {
        return [
          {
            source: '/downloads/:path*',
            headers: [
              { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
              { key: 'X-Content-Type-Options', value: 'nosniff' },
            ],
          },
        ];
      },
};

export default nextConfig;
