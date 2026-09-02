import Link from 'next/link';
import { Laptop, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { guidePath, type Locale, type Platform, type View } from '@/lib/locale';

export function PlatformSwitcher({
  locale,
  platform,
  view,
}: {
  locale: Locale;
  platform: Platform;
  view: View;
}) {
  const bn = locale === 'bn';
  return (
    <nav
      className="platform-bar"
      aria-label={bn ? 'কম্পিউটারের অপারেটিং সিস্টেম' : 'Computer operating system'}
    >
      <div className="platform-intro">
        <span>{bn ? 'আপনার কম্পিউটার' : 'YOUR COMPUTER'}</span>
        <p>
          {bn
            ? 'একই রাউটার। আপনার OS অনুযায়ী প্রস্তুতি ও ডাউনলোড।'
            : 'Same router. Setup and downloads for your OS.'}
        </p>
      </div>
      <div className="platform-switcher">
        {(['mac', 'windows'] as const).map((os) => (
          <Button
            key={os}
            variant="ghost"
            nativeButton={false}
            render={<Link href={guidePath(locale, view, os)} />}
            aria-current={platform === os ? 'page' : undefined}
            className={platform === os ? 'platform-active' : ''}
          >
            {os === 'mac' ? (
              <Laptop size={17} aria-hidden="true" />
            ) : (
              <Monitor size={17} aria-hidden="true" />
            )}
            {os === 'mac' ? 'macOS' : 'Windows'}
          </Button>
        ))}
      </div>
    </nav>
  );
}
