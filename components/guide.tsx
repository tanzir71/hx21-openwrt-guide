import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Download,
  FileCheck,
  HardDriveDownload,
  Laptop,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { GuideTabs } from './guide-tabs';
import { CopyCode } from './copy-code';
import { NetworkDiagram, StepDiagram } from './diagrams';
import { MacFix } from './mac-fix';
import { artifacts, findings, partitionRows, sources, ui } from '@/lib/content';
import { faqs, steps } from '@/lib/steps';
import { articleSchema } from '@/lib/seo';
import { guidePath, type Locale, type View } from '@/lib/locale';
import { publicPath, isStaticMirror } from '@/lib/paths';
import manifest from '@/public/downloads/artifact-manifest.json';

const sourceNames: Record<keyof typeof sources, string> = {
  device: 'OpenWrt · HX21 device page',
  hardware: 'OpenWrt · hardware data',
  selector: 'OpenWrt · Firmware Selector',
  releases: 'OpenWrt · releases',
  firmware: 'OpenWrt · 25.12.5 files',
  upstream: 'OpenWrt · upstream support commit',
  uboot: 'OpenWrt · HX21 U-Boot source',
  unlock: 'GitHub · community SSH configuration',
  community: 'GitHub · community installation guide',
  macReport: 'Facebook · MAC / Factory report',
  walkthrough: 'Facebook · installation discussion',
  macClaim: 'Facebook · MAC-fix claim',
  success: 'Facebook · owner experience',
  signatures: 'OpenWrt · release signatures',
  apk: 'OpenWrt · apk documentation',
  uart: 'GitHub · mtk_uartboot',
};
function SourceLinks({ links }: { links: (keyof typeof sources)[] }) {
  return (
    <div className="source-links">
      {links.map((key) => (
        <a href={sources[key]} key={key}>
          {sourceNames[key]}
          <ArrowUpRight size={12} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
function Research({ locale }: { locale: Locale }) {
  const t = ui[locale],
    bn = locale === 'bn';
  return (
    <div className="document-layout">
      <aside className="contents-nav">
        <p>{t.onThisPage}</p>
        <nav aria-label={t.onThisPage}>
          {findings[locale].map((finding, i) => (
            <a key={finding.id} href={'#' + finding.id}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {finding.title}
            </a>
          ))}
          <a href="#mac-fix">
            <span>↳</span>
            {bn ? 'MAC স্থির রাখার উপায়' : 'MAC persistence & repair'}
          </a>
        </nav>
        <a className="toc-download" href="#backup-archive">
          <Download size={15} />
          {t.zipButton}
        </a>
      </aside>
      <div className="research-sections">
        {findings[locale].map((finding, i) => (
          <section
            className="research-section"
            id={finding.id}
            key={finding.id}
          >
            <div className="section-heading">
              <span className="section-index">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={
                  'evidence ' +
                  (finding.label === 'official'
                    ? 'verified'
                    : finding.label === 'reported'
                      ? 'reported'
                      : 'practical')
                }
              >
                {t[`${finding.label}Label`]}
              </span>
            </div>
            <h3>{finding.title}</h3>
            {finding.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {finding.points ? (
              <ul>
                {finding.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
            {finding.special === 'images' ? (
              <div className="artifact-grid">
                {artifacts.map((a) => (
                  <div className="artifact" key={a.id}>
                    <h4>
                      <FileCheck size={17} />
                      {a[locale]}
                    </h4>
                    <code className="filename">
                      openwrt-25.12.5-mediatek-filogic-imou_hx21-{a.suffix}
                    </code>
                    <small>
                      {a.size.toLocaleString('en-US')} {t.bytes}
                    </small>
                    <CopyCode text={a.hash} label="SHA-256" labels={t} />
                  </div>
                ))}
              </div>
            ) : null}
            {finding.special === 'partitions' ? (
              <>
                <div className="table-scroll">
                  <table>
                    <caption>
                      {bn
                        ? 'স্টকের উদাহরণ—আসল /proc/mtd যাচাই করুন'
                        : 'Stock reference only—verify the actual /proc/mtd'}
                    </caption>
                    <thead>
                      <tr>
                        <th>MTD</th>
                        <th>{bn ? 'নাম' : 'Label'}</th>
                        <th>{bn ? 'আকার' : 'Size'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partitionRows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell) => (
                            <td key={cell}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CopyCode text="cat /proc/mtd" label={t.docsOnly} labels={t} />
              </>
            ) : null}
            {finding.special === 'network' ? (
              <NetworkDiagram locale={locale} />
            ) : null}
            {finding.id === 'aftercare' ? <MacFix locale={locale} /> : null}
            <SourceLinks links={finding.links} />
          </section>
        ))}
        <Link className="text-action" href={guidePath(locale, 'steps')}>
          {t.nextGuide}
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
function Walkthrough({ locale }: { locale: Locale }) {
  const t = ui[locale],
    bn = locale === 'bn';
  return (
    <>
      <div className="prepare-panel">
        <ShieldCheck size={25} />
        <div>
          <h3>{t.prepare}</h3>
          <p>{t.prepareText}</p>
          <Link href={guidePath(locale)}>
            {t.readFindings}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <nav className="step-jump" aria-label={t.onThisPage}>
        {steps[locale].map((step, i) => (
          <a href={'#step-' + step.id} key={step.id}>
            <span>{i + 1}</span>
            {step.short}
          </a>
        ))}
      </nav>
      <div className="walkthrough">
        {steps[locale].map((step, i) => (
          <section
            className={'walkthrough-step ' + (step.danger ? 'danger-step' : '')}
            id={'step-' + step.id}
            key={step.id}
          >
            <div className="step-main">
              <div className="step-kicker">
                <span>{String(i + 1).padStart(2, '0')}</span>
                {step.danger ? (
                  <b>
                    <TriangleAlert size={13} />
                    {t.risk}
                  </b>
                ) : null}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <ul className="checklist">
                {step.checklist.map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="checkpoint">
                <ShieldCheck size={17} />
                <p>
                  <strong>{t.checkpoint}</strong>
                  {step.checkpoint}
                </p>
              </div>
              {step.id === 'finish' ? (
                <Link
                  className="text-action mac-link"
                  href={guidePath(locale) + '#mac-fix'}
                >
                  {bn
                    ? 'MAC বদলে গেলে সংশোধিত নির্দেশনা দেখুন'
                    : 'MAC changing? Read the corrected persistence guide'}
                  <ArrowRight size={15} />
                </Link>
              ) : null}
              {step.id === 'flash' ? (
                <a className="official-button" href={sources.device}>
                  {t.stepsSource}
                  <ArrowUpRight size={16} />
                </a>
              ) : null}
            </div>
            <div className="step-visual">
              <StepDiagram type={step.visual} locale={locale} />
              {step.id === 'verify' ? (
                <CopyCode
                  label={
                    bn ? 'TFTP-তে যে নামটি দিতে হবে' : 'Exact TFTP filename'
                  }
                  text="openwrt-mediatek-filogic-imou_hx21-initramfs-recovery.itb"
                  labels={t}
                />
              ) : null}
            </div>
          </section>
        ))}
      </div>
      <SourceLinks links={['device', 'selector', 'uboot', 'signatures']} />
    </>
  );
}
function Archive({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section className="archive-section" id="backup-archive">
      <div>
        <span className="eyebrow">
          <HardDriveDownload size={15} />
          {t.snapshot}
        </span>
        <h2>{t.zipTitle}</h2>
        <p>{t.zipText}</p>
        <a className="text-action" href={sources.selector}>
          {t.sourceFirst}
          <ArrowUpRight size={15} />
        </a>
        <p className="archive-warning">
          <TriangleAlert size={16} />
          {t.zipWarning}
        </p>
      </div>
      <div className="download-card">
        <a
          className="download-button"
          href={publicPath('/downloads/' + manifest.name)}
          download
        >
          <Download size={19} />
          {t.zipButton}
          <ArrowDown size={16} />
        </a>
        <p className="download-meta">
          ZIP · {(manifest.bytes / 1024 / 1024).toFixed(1)} MB ·{' '}
          {manifest.files.length} {locale === 'bn' ? 'ফাইল' : 'files'}
        </p>
        <p>{t.zipPrivacy}</p>
        {/* This is a raw JSON file, not a Next.js page. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          className="manifest-link"
          href={publicPath('/downloads/artifact-manifest.json')}
        >
          {t.zipContents}
          <ArrowUpRight size={12} />
        </a>
        <CopyCode text={manifest.sha256} label={t.hashLabel} labels={t} />
        <CopyCode
          text={'shasum -a 256 ' + manifest.name}
          label={t.verifyZip}
          labels={t}
        />
      </div>
    </section>
  );
}
export function Guide({ locale, view }: { locale: Locale; view: View }) {
  const t = ui[locale];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(locale, view)).replaceAll(
            '<',
            '\\u003c',
          ),
        }}
      />
      <a className="skip-link" href="#guide">
        {t.skip}
      </a>
      <div className="wrap" id="top">
        <header className="site-header">
          <Link className="brand" href={guidePath(locale)}>
            <span className="brand-mark" aria-hidden="true">
              H<span />
            </span>
            HX21<span className="brand-sub">OPENWRT GUIDE</span>
          </Link>
          <div className="header-actions">
            <a className="quiet-link" href={sources.device}>
              {t.official}
              <ArrowUpRight size={14} />
            </a>
            <LanguageSwitcher locale={locale} view={view} />
          </div>
        </header>
        <main>
          <section className="hero">
            <div>
              <p className="eyebrow">
                <span className="status-dot" />
                {t.eyebrow}
              </p>
              <h1>
                {t.title}
                <br />
                <span>{t.subtitle}</span>
              </h1>
              <p className="hero-description">{t.description}</p>
              <div className="hero-meta">
                <span>
                  <ShieldCheck size={13} />
                  {t.supported}
                </span>
                <span>
                  <CalendarDays size={13} />
                  {t.updated}
                </span>
              </div>
            </div>
            <div className="route-card">
              <div className="card-topline">
                <span>{t.routeTitle}</span>
                <span className="pill">{t.checkpoints}</span>
              </div>
              <div className="route-line">
                <div>
                  <Laptop />
                  <b>{t.connect}</b>
                  <small>{t.wired}</small>
                </div>
                <i>→</i>
                <div>
                  <HardDriveDownload />
                  <b>{t.backup}</b>
                  <small>{t.private}</small>
                </div>
                <i>→</i>
                <div>
                  <ShieldCheck />
                  <b>{t.verify}</b>
                  <small>{t.beforeWrite}</small>
                </div>
              </div>
              <p>
                <ShieldCheck size={12} />
                {t.routeCaption}
              </p>
            </div>
          </section>
          <div className="notice">
            <TriangleAlert size={18} />
            <p>
              <strong>{t.warningTitle}</strong> {t.warning}{' '}
              <a href={sources.device}>{t.officialAction} ↗</a>
            </p>
          </div>
          <div id="guide">
            <GuideTabs locale={locale} view={view} labels={t}>
              <div className="content-intro">
                <p className="eyebrow">
                  {view === 'findings' ? t.findingEyebrow : t.stepEyebrow}
                </p>
                <h2>{view === 'findings' ? t.findingTitle : t.stepTitle}</h2>
                <p>
                  {view === 'findings'
                    ? t.findingDescription
                    : t.stepDescription}
                </p>
              </div>
              {view === 'findings' ? (
                <Research locale={locale} />
              ) : (
                <Walkthrough locale={locale} />
              )}
            </GuideTabs>
          </div>
          <Archive locale={locale} />
          <section className="faq-section">
            <p className="eyebrow">FAQ</p>
            <h2>{t.faqTitle}</h2>
            {faqs[locale].map((faq) => (
              <details key={faq.q}>
                <summary>
                  {faq.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </section>
          <section className="source-section">
            <h2>{t.sourceTitle}</h2>
            <p>{t.sourceText}</p>
            <SourceLinks
              links={[
                'device',
                'selector',
                'upstream',
                'unlock',
                'community',
                'macReport',
              ]}
            />
            <p className="scope-note">{t.scope}</p>
            <p className="scope-note">{t.enSource}</p>
          </section>
        </main>
        <footer className="site-footer">
          <div>
            <strong>HX21 / OPENWRT GUIDE</strong>
            <p>{t.footer}</p>
            <p className="privacy-note">
              {isStaticMirror ? t.staticPrivacy : t.privacy}
            </p>
            <noscript>
              <p>{t.noJs}</p>
            </noscript>
          </div>
          <a href="#top">{t.top} ↑</a>
        </footer>
      </div>
    </>
  );
}
