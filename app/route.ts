import { NextRequest, NextResponse } from 'next/server';
import { chooseLocale, preferenceCookie } from '@/lib/locale';
export function GET(request: NextRequest) {
  const locale = chooseLocale(
    request.cookies.get(preferenceCookie)?.value,
    request.headers.get('x-vercel-ip-country'),
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Vary', 'Cookie, x-vercel-ip-country');
  return response;
}
