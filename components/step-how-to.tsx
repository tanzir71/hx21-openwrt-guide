import { ArrowUpRight, ChevronDown, ListOrdered } from 'lucide-react';
import { CopyCode } from './copy-code';
import type { Locale, Platform } from '@/lib/locale';
import type { HowTo } from '@/lib/walkthrough-help';

export function StepHowTo({
  id,
  help,
  locale,
  platform,
  labels,
}: {
  id: string;
  help: HowTo;
  locale: Locale;
  platform: Platform;
  labels: { copy: string; copied: string; copyFailed: string };
}) {
  const bn = locale === 'bn';
  const copyLabels = {
    copy: labels.copy,
    copied: labels.copied,
    copyFailed: labels.copyFailed,
  };
  const computerLabel =
    platform === 'mac'
      ? bn
        ? 'আপনার Mac-এ · Terminal'
        : 'On your Mac · Terminal'
      : bn
        ? 'আপনার Windows PC-তে · PowerShell 7'
        : 'On your Windows PC · PowerShell 7';
  const routerLabel = bn
    ? 'রাউটারের ভেতরে · SSH-তে login করার পর'
    : 'Inside the router · after logging in with SSH';

  return (
    <details
      className="step-how-to"
      id={'howto-' + id}
      open={id === 'connect' || id === 'access'}
    >
      <summary>
        <ListOrdered size={20} aria-hidden="true" />
        <span>
          <strong>{bn ? 'আসলে কীভাবে করবেন' : 'How to actually do this'}</strong>
          <small>
            {bn
              ? 'কোথায় ক্লিক, কী কমান্ড, কী ফল পাবেন'
              : 'Exact clicks, commands & expected results'}
          </small>
        </span>
        <ChevronDown className="howto-chevron" size={19} aria-hidden="true" />
      </summary>
      <div className="howto-content">
        <p className="howto-intro">{help.intro}</p>
        <p className="howto-command-note">
          {bn
            ? 'প্রতিটি কমান্ডের ওপরে কোথায় চালাতে হবে লেখা আছে। একবারে একটি কমান্ড দিন, Enter চাপুন, ফল পড়ুন। Copy শুধু কপি করে—কিছু চালায় না।'
            : 'Each command says where to run it. Run one at a time, press Enter and read the result. Copy only copies—it never runs anything.'}
        </p>
        <ol className="howto-items">
          {help.items.map((item) => (
            <li key={item.title}>
              <div className="howto-item-body">
                <h4>{item.title}</h4>
                {item.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {item.commands?.map((command) => (
                  <CopyCode
                    key={command.text}
                    text={command.text}
                    label={
                      command.where === 'router' ? routerLabel : computerLabel
                    }
                    labels={copyLabels}
                  />
                ))}
                {item.expected ? (
                  <p className="howto-expected">
                    <strong>{bn ? 'যে ফল চাই' : 'What you should see'}</strong>
                    {item.expected}
                  </p>
                ) : null}
                {item.caution ? (
                  <p className="howto-caution">
                    <strong>{bn ? 'এগোনোর আগে' : 'Before continuing'}</strong>
                    {item.caution}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        {help.problems ? (
          <section
            className="howto-problems"
            aria-labelledby={'problems-' + id}
          >
            <h4 id={'problems-' + id}>
              {bn ? 'অন্য ফল এলে কী করবেন?' : 'Got a different result?'}
            </h4>
            <dl>
              {help.problems.map((problem) => (
                <div key={problem.signal}>
                  <dt>
                    <code dir="ltr">{problem.signal}</code>
                  </dt>
                  <dd>{problem.action}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        <div className="source-links">
          {help.references.map((reference) => (
            <a href={reference.url} key={reference.url}>
              {reference.label}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}
