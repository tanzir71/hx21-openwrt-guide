'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';
import type { Locale } from '@/lib/locale';
import { publicPath } from '@/lib/paths';

const videoId = '0Cm5mRq9jlQ';
const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

export function VideoOverview({ locale }: { locale: Locale }) {
  const [playing, setPlaying] = useState(false);
  const bn = locale === 'bn';
  const title = bn
    ? '৩ মিনিটে পুরো প্রক্রিয়াটি দেখুন'
    : 'Watch the whole process in 3 minutes';

  return (
    <section
      className="video-overview"
      id="video-overview"
      aria-labelledby="video-overview-title"
    >
      <div className="video-overview-copy">
        <p className="eyebrow">
          {bn ? 'ভিডিও গাইড · ২:৫৯' : 'VIDEO GUIDE · 2:59'}
        </p>
        <h2 id="video-overview-title">{title}</h2>
        <p>
          {bn
            ? 'Ethernet সংযোগ, mini UPS দিয়ে বিদ্যুৎ সচল রাখা, backup, firmware যাচাই, ধাপে ধাপে flashing এবং শেষের network setup—এক ভিডিওতে।'
            : 'Ethernet, mini-UPS power protection, backups, firmware checks, staged flashing and final network setup—in one overview.'}
        </p>
        <p className="video-language-note">
          {bn
            ? 'কণ্ঠ ও caption ইংরেজিতে। সঠিক command ও প্রতিটি checkpoint-এর জন্য নিচের গাইড অনুসরণ করুন।'
            : 'English narration and captions. Follow the guide below for exact commands and each checkpoint.'}
        </p>
        <a className="text-action" href={watchUrl}>
          {bn ? 'YouTube-এ দেখুন' : 'Watch on YouTube'}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div>
        <div className="video-frame">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&hl=${locale}`}
              title={title}
              width="1280"
              height="720"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={(event) => event.currentTarget.focus()}
            />
          ) : (
            <button
              type="button"
              className="video-preview"
              aria-label={
                bn
                  ? 'HX21 OpenWrt পরিচিতি ভিডিও চালান'
                  : 'Play the HX21 OpenWrt overview'
              }
              onClick={() => setPlaying(true)}
            >
              <Image
                src={publicPath('/illustrations/video-overview.webp')}
                alt=""
                width={1280}
                height={720}
                sizes="(max-width: 760px) 100vw, 650px"
                unoptimized
              />
              <span className="video-play" aria-hidden="true">
                <Play size={28} fill="currentColor" />
              </span>
            </button>
          )}
        </div>
        <p className="video-privacy-note">
          {bn
            ? 'Play চাপলে YouTube-এর ভিডিও প্লেয়ার লোড হবে।'
            : 'The YouTube player loads when you press Play.'}
        </p>
      </div>
    </section>
  );
}
