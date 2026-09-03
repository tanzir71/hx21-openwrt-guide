'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, ListOrdered, MessageSquareText } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { guidePath, type Locale, type View, type Platform } from '@/lib/locale';
export function GuideTabs({
  locale,
  view,
  platform,
  labels,
  children,
}: {
  locale: Locale;
  view: View;
  platform: Platform;
  labels: { findings: string; steps: string; prompt: string };
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Tabs
      value={view}
      className="guide-tabs"
      onValueChange={(value) => {
        if (value === 'findings' || value === 'steps' || value === 'prompt')
          router.push(guidePath(locale, value, platform), { scroll: false });
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
          render={
            <Link
              href={guidePath(locale, 'findings', platform)}
              scroll={false}
            />
          }
        >
          <BookOpen aria-hidden="true" />
          {labels.findings}
        </TabsTrigger>
        <TabsTrigger
          value="steps"
          nativeButton={false}
          render={
            <Link href={guidePath(locale, 'steps', platform)} scroll={false} />
          }
        >
          <ListOrdered aria-hidden="true" />
          {labels.steps}
        </TabsTrigger>
        <TabsTrigger
          value="prompt"
          nativeButton={false}
          render={
            <Link href={guidePath(locale, 'prompt', platform)} scroll={false} />
          }
        >
          <MessageSquareText aria-hidden="true" />
          {labels.prompt}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={view}>{children}</TabsContent>
    </Tabs>
  );
}
