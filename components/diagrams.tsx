import {
  ArrowRight,
  Cable,
  Check,
  Fingerprint,
  HardDrive,
  HardDriveDownload,
  Laptop,
  LockKeyhole,
  Router,
  ShieldCheck,
  Terminal,
  TriangleAlert,
  Wifi,
} from 'lucide-react';
import type { Locale } from '@/lib/locale';
import { publicPath } from '@/lib/paths';
import type { Step } from '@/lib/content';
import Image from 'next/image';
const artwork = {
  network: [
    'prepare',
    'A silver laptop connected by Ethernet to a generic router.',
    'ইথারনেট দিয়ে সাধারণ রাউটারের সঙ্গে সংযুক্ত একটি সিলভার ল্যাপটপ।',
  ],
  backup: [
    'backup',
    'A laptop, separate drive and folder protected as private backup copies.',
    'ল্যাপটপ, আলাদা ড্রাইভ ও ফোল্ডার—ব্যক্তিগত ব্যাকআপের প্রতীক।',
  ],
  verify: [
    'verify',
    'Four firmware file tiles beside a magnifying glass and check mark.',
    'আতশকাচ ও যাচাই চিহ্নের পাশে চারটি ফার্মওয়্যার ফাইল।',
  ],
  finish: [
    'finish',
    'A generic router, laptop check mark and shield representing first-boot checks.',
    'প্রথম বুট যাচাইয়ের প্রতীক হিসেবে সাধারণ রাউটার, ল্যাপটপ ও সুরক্ষা চিহ্ন।',
  ],
} as const;
export function StepDiagram({
  type,
  locale,
}: {
  type: Step['visual'];
  locale: Locale;
}) {
  const art = type in artwork ? artwork[type as keyof typeof artwork] : null;
  return (
    <>
      {art ? (
        <figure className="step-art">
          <Image
            src={publicPath('/illustrations/' + art[0] + '.webp')}
            width={1536}
            height={1024}
            sizes="(max-width: 800px) 92vw, 550px"
            alt={locale === 'bn' ? art[2] : art[1]}
          />
          <figcaption>
            {locale === 'bn'
              ? 'AI-তৈরি ধারণামূলক ছবি—আসল HX21, পোর্ট ম্যাপ বা সফটওয়্যার স্ক্রিন নয়।'
              : 'AI-generated conceptual illustration—not the actual HX21, a port map or a software screenshot.'}
          </figcaption>
        </figure>
      ) : null}
      <TechnicalDiagram type={type} locale={locale} />
    </>
  );
}
export function NetworkDiagram({ locale }: { locale: Locale }) {
  const bn = locale === 'bn';
  return (
    <figure className="diagram network-diagram">
      <figcaption>
        {bn
          ? 'তারযুক্ত সংযোগ · WAN বিচ্ছিন্ন'
          : 'WIRED CONNECTION · WAN DISCONNECTED'}
      </figcaption>
      <div className="network-flow">
        <div>
          <Laptop aria-hidden="true" />
          <strong>Mac</strong>
          <code>192.168.1.254</code>
          <small>{bn ? 'অস্থায়ী alias' : 'Temporary alias'}</small>
          <code>192.168.10.2</code>
        </div>
        <div className="cable-flow">
          <Cable aria-hidden="true" />
          <span>Ethernet → LAN</span>
          <ArrowRight aria-hidden="true" />
        </div>
        <div>
          <Router aria-hidden="true" />
          <strong>HX21</strong>
          <code>192.168.10.1</code>
          <small>{bn ? 'স্টক → OpenWrt' : 'Stock → OpenWrt'}</small>
          <code>192.168.1.1</code>
        </div>
      </div>
      <p>
        {bn
          ? 'শুধু IP কনফিগারেশন দেখানো হয়েছে; পোর্টের শারীরিক অবস্থান নয়।'
          : 'Logical IP map, not a physical port-layout or wiring diagram.'}
      </p>
    </figure>
  );
}
function TechnicalDiagram({
  type,
  locale,
}: {
  type: Step['visual'];
  locale: Locale;
}) {
  const bn = locale === 'bn';
  if (type === 'network') return <NetworkDiagram locale={locale} />;
  if (type === 'backup')
    return (
      <figure className="diagram">
        <figcaption>
          {bn ? 'আপনার ডেটা · দুটি ব্যক্তিগত কপি' : 'YOUR DATA · TWO PRIVATE COPIES'}
        </figcaption>
        <div className="backup-chips">
          {['BL2', 'u-boot-env', 'Factory', 'FIP', 'ubi', 'spi0.0'].map((p) => (
            <span className={p === 'Factory' ? 'factory-chip' : ''} key={p}>
              {p}
            </span>
          ))}
        </div>
        <div className="diagram-flow">
          <Router />
          <ArrowRight />
          <div>
            <Laptop />
            <b>Mac</b>
          </div>
          <span>+</span>
          <div>
            <HardDrive />
            <b>{bn ? 'দ্বিতীয় কপি' : 'Second copy'}</b>
          </div>
        </div>
        <p>
          {bn
            ? 'Factory: অনন্য পরিচয় ও রেডিও ক্যালিব্রেশন। ভাগাভাগি নয়।'
            : 'Factory: unique identity and radio calibration. Never share it.'}
        </p>
      </figure>
    );
  if (type === 'access')
    return (
      <figure className="diagram">
        <figcaption>
          {bn ? 'প্রথমে যে সিদ্ধান্ত' : 'DECIDE BEFORE UNLOCKING'}
        </figcaption>
        <div className="branch-lines">
          <div>
            <Terminal />
            <b>{bn ? 'আগেই SSH আছে?' : 'SSH already open?'}</b>
            <span>{bn ? 'আগে পরীক্ষা' : 'Check first'}</span>
          </div>
          <div>
            <Cable />
            <b>3.3 V UART</b>
            <span>{bn ? 'পিন নিশ্চিত করুন' : 'Confirm the pads'}</span>
          </div>
          <div className="caution-branch">
            <TriangleAlert />
            <b>SSH config</b>
            <span>{bn ? 'আগে MAC সতর্কতা' : 'Read MAC warning'}</span>
          </div>
        </div>
      </figure>
    );
  if (type === 'verify')
    return (
      <figure className="diagram">
        <figcaption>
          {bn ? 'সঠিক ফাইল · সঠিক কাজ' : 'RIGHT FILE · RIGHT JOB'}
        </figcaption>
        <div className="verify-grid">
          {[
            ['FIP', 'U-Boot'],
            ['BL2', bn ? 'প্রাথমিক বুট' : 'Early boot'],
            ['Recovery', 'TFTP'],
            ['Sysupgrade', bn ? 'স্থায়ী সিস্টেম' : 'Installed OS'],
          ].map(([a, b]) => (
            <div key={a}>
              <ShieldCheck />
              <strong>{a}</strong>
              <small>{b}</small>
            </div>
          ))}
        </div>
        <p>SHA-256 + {bn ? 'প্রকাশকের স্বাক্ষর' : 'publisher signature'}</p>
      </figure>
    );
  if (type === 'flash')
    return (
      <figure className="diagram danger-diagram">
        <figcaption>
          {bn ? 'এখানে স্টক ডেটা হারাতে পারে' : 'STOCK DATA IS AT RISK HERE'}
        </figcaption>
        <div className="diagram-flow">
          <TriangleAlert />
          <span>FIP / BL2</span>
          <ArrowRight />
          <span>UBI</span>
          <ArrowRight />
          <span>TFTP</span>
        </div>
        <p>
          {bn
            ? 'পাওয়ার বন্ধ নয়। ভুল হলে থামুন। জোর করে এগোবেন না।'
            : 'Do not cut power. Stop on errors. Never force an image.'}
        </p>
      </figure>
    );
  if (type === 'system')
    return (
      <figure className="diagram">
        <figcaption>{bn ? 'দুটি আলাদা অবস্থা' : 'TWO DIFFERENT STATES'}</figcaption>
        <div className="two-states">
          <div>
            <Terminal />
            <b>{bn ? 'রিকভারি' : 'Recovery'}</b>
            <code>imou,hx21</code>
          </div>
          <ArrowRight />
          <div>
            <HardDriveDownload />
            <b>{bn ? 'ইনস্টল করা' : 'Installed'}</b>
            <code>sysupgrade</code>
          </div>
        </div>
        <p>
          {bn
            ? 'রিকভারি চালু হওয়া মানেই স্থায়ী ইনস্টল শেষ নয়।'
            : 'Booting recovery is not the same as completing installation.'}
        </p>
      </figure>
    );
  if (type === 'finish')
    return (
      <figure className="diagram">
        <figcaption>
          {bn ? 'স্বাভাবিক কাজের পরীক্ষা' : 'A HEALTHY BASELINE'}
        </figcaption>
        <div className="verify-grid">
          <div>
            <LockKeyhole />
            <strong>{bn ? 'পাসওয়ার্ড' : 'Password'}</strong>
          </div>
          <div>
            <Cable />
            <strong>LAN / WAN</strong>
          </div>
          <div>
            <Wifi />
            <strong>2.4 / 5 GHz</strong>
          </div>
          <div>
            <Check />
            <strong>{bn ? 'স্বাভাবিক বুট' : 'Normal boot'}</strong>
          </div>
        </div>
      </figure>
    );
  return (
    <figure className="diagram">
      <figcaption>
        {bn ? 'দেখে নয় · মিলিয়ে নিশ্চিত হন' : 'IDENTIFY · DO NOT GUESS'}
      </figcaption>
      <div className="identity-card">
        <Fingerprint />
        <div>
          <strong>IMOU HX21</strong>
          <span>mediatek / filogic</span>
          <code>imou,hx21</code>
        </div>
      </div>
      <p>
        {bn
          ? 'লেবেল + রিভিশন + মূল MAC লিখে রাখুন'
          : 'Record label + revision + original MACs'}
      </p>
    </figure>
  );
}
