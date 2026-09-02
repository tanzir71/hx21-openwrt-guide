import type { Locale } from '@/lib/locale';
import { terminology, type TermId } from '@/lib/terminology';

export function TermNotes({
  locale,
  terms,
  context,
}: {
  locale: Locale;
  terms: TermId[];
  context: string;
}) {
  return (
    <aside className="term-notes" aria-labelledby={'terms-' + context}>
      <h4 id={'terms-' + context}>
        {locale === 'bn'
          ? 'এই অংশের শব্দগুলো সহজ ভাষায়'
          : 'What these terms mean here'}
      </h4>
      <dl>
        {terms.map((id) => {
          const term = terminology[id][locale];
          return (
            <div key={id} data-term={id}>
              <dt>{term.name}</dt>
              <dd>{term.meaning}</dd>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}
