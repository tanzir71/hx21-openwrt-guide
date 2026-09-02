export const locales = ['en', 'bn'] as const;
export type Locale = (typeof locales)[number];
export type View = 'findings' | 'steps';
export const preferenceCookie = 'hx21-language-v1';
export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'bn';
}
/** Only the unlocalized entry URL is negotiated; explicit localized URLs are stable. */
export function chooseLocale(
  preference: string | null | undefined,
  country: string | null | undefined,
): Locale {
  if (isLocale(preference)) return preference;
  return country?.trim().toUpperCase() === 'BD' ? 'bn' : 'en';
}
export function guidePath(locale: Locale, view: View = 'findings') {
  return `/${locale}${view === 'steps' ? '/steps' : ''}`;
}
export function languageCookie(locale: Locale, secure: boolean) {
  return `${preferenceCookie}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${secure ? '; Secure' : ''}`;
}
