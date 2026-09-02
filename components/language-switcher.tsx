'use client';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { publicPath } from '@/lib/paths';
import {
  guidePath,
  languageCookie,
  type Locale,
  type View,
  type Platform,
} from '@/lib/locale';
export function LanguageSwitcher({
  locale,
  view,
  platform = 'mac',
}: {
  locale: Locale;
  view: View;
  platform?: Platform;
}) {
  return (
    <div
      className="language-switcher"
      aria-label={locale === 'bn' ? 'ভাষা নির্বাচন' : 'Choose language'}
    >
      <Languages size={16} aria-hidden="true" />
      {(['en', 'bn'] as const).map((lang) => (
        <Button
          key={lang}
          variant="ghost"
          nativeButton={false}
          render={
            <a
              href={publicPath(guidePath(lang, view, platform))}
              hrefLang={lang}
              lang={lang}
              aria-label={lang === 'en' ? 'English' : 'বাংলা'}
              onClick={() => {
                document.cookie = languageCookie(
                  lang,
                  location.protocol === 'https:',
                );
              }}
            />
          }
          aria-current={lang === locale ? 'true' : undefined}
          className={lang === locale ? 'language-active' : ''}
        >
          {lang === 'en' ? 'EN' : 'বাংলা'}
        </Button>
      ))}
    </div>
  );
}
