'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, ListOrdered } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { guidePath, type Locale, type View } from '@/lib/locale';
export function GuideTabs({
  locale,
  view,
  labels,
  children,
}: {
  locale: Locale;
  view: View;
  labels: { findings: string; steps: string };
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Tabs
      value={view}
      className="guide-tabs"
      onValueChange={(value) => {
        if (value === 'findings' || value === 'steps')
          router.push(guidePath(locale, value), { scroll: false });
      }}
    >
      <TabsList
        className="tab-bar"
        variant="line"
        aria-label={locale === 'bn' ? 'গাইডের ধরন' : 'Guide view'}
      >
        <TabsTrigger
          value="findings"
          nativeButton={false}
          render={<Link href={guidePath(locale)} scroll={false} />}
        >
          <BookOpen aria-hidden="true" />
          {labels.findings}
        </TabsTrigger>
        <TabsTrigger
          value="steps"
          nativeButton={false}
          render={<Link href={guidePath(locale, 'steps')} scroll={false} />}
        >
          <ListOrdered aria-hidden="true" />
          {labels.steps}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={view}>{children}</TabsContent>
    </Tabs>
  );
}
