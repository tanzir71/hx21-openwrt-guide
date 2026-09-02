import { ShieldCheck, TriangleAlert, ArrowUpRight } from 'lucide-react';
import { CopyCode } from './copy-code';
import { ui } from '@/lib/content';
import type { Locale } from '@/lib/locale';
const dts =
  'https://github.com/openwrt/openwrt/blob/v25.12.5/target/linux/mediatek/dts/mt7981b-imou-hx21.dts';
const networkDoc =
  'https://openwrt.org/docs/guide-user/network/network_configuration';
const wirelessDoc = 'https://openwrt.org/docs/guide-user/network/wifi/basic';
const content = {
  en: {
    title: 'If MAC addresses change after reboot',
    intro:
      'Conditional troubleshooting—not a mandatory flashing step. First compare the same LAN, WAN and Wi-Fi interfaces with your private pre-flash records across two normal boots. One changed address is not proof of Factory corruption: configuration, interface selection and driver behavior also matter.',
    correction: 'Correction to the shared AI answer',
    warning:
      'For the pinned OpenWrt 25.12.5 HX21 device tree, the base MAC cell is six bytes at Factory offset 0x4—not 0x1fef20. The partition is named factory (lowercase) and is read-only. These facts are not permission to hex-edit flash, remove write protection or paste a raw mtd write command.',
    inspect: '1. Identify the real device and configuration sections',
    inspectText:
      'Keep a private backup of /etc/config/network and /etc/config/wireless before editing, and stay connected over Ethernet with physical access. Inspect the existing sections below. A Linux device named br-lan is not necessarily a UCI section named br_lan; sections may be anonymous. Do not assume network.br_lan exists.',
    persist: '2. Pin only the affected MAC in persistent configuration',
    network:
      'In /etc/config/network, edit the existing config device block whose option name matches the affected bridge or the underlying device used by WAN. Add or update its option macaddr with the original address recorded for that specific interface. If there is no device block for WAN, follow the linked network documentation to define one using the actual WAN device name; do not create duplicate definitions.',
    unique:
      'Do not copy the example addresses from the shared answer or assume WAN equals the label MAC plus one. Use verified per-interface records or the ISP-registered WAN address. Keep distinct unicast addresses where appropriate; do not give both radios or unrelated ports one copied address.',
    wireless:
      'For an affected AP Wi-Fi interface, macaddr belongs in its existing config wifi-iface block in /etc/config/wireless. Do not replace your SSID/security settings, and do not confuse this with a wifi-device macaddr used to identify a radio. Avoid random and multicast addresses. Only change wireless MACs if needed and supported by the driver.',
    apply:
      'Save the configuration. If using UCI commands, commit the affected package (network or wireless). Then reload only the relevant service: service network reload or wifi reload. A network reload can disconnect SSH and renew the ISP lease—have a local recovery path. Reconnect, compare the affected MACs, reboot normally and compare again.',
    limits:
      'This survives normal reboots while the configuration is retained. A reset, clean sysupgrade or discarded configuration can remove it. Keep the settings in your private OpenWrt configuration backup. This is not restored Factory calibration or a fix to the bootloader’s own MAC.',
    restore: '3. Treat original Factory restoration as a separate repair',
    restoreText:
      'A verified, unmodified backup from this exact unit—taken before the suspected change—is the preferred restoration input. A post-unlock backup may already contain altered data. The correct partition, size, NAND handling, protection state and recovery method must be reviewed for the running build. Do not blindly run mtd write /tmp/factory.bin Factory, substitute another router’s data or invent EEPROM offsets. If the original data is unavailable, a MAC override cannot reconstruct lost radio calibration.',
    gate: 'Skip this branch when addresses are stable and connectivity is correct. If overrides fail, radio calibration is suspect or a raw restoration is needed, stop and obtain device-specific review before any flash write.',
    read: 'Primary documentation',
  },
  bn: {
    title: 'রিবুটের পরে MAC বদলে গেলে',
    intro:
      'প্রয়োজন হলে সমস্যা সমাধানের ধাপ—ফ্ল্যাশ করার বাধ্যতামূলক অংশ নয়। আগে একই LAN, WAN ও Wi-Fi ইন্টারফেসের MAC দুটি স্বাভাবিক বুটের পরে আপনার ব্যক্তিগত পুরোনো রেকর্ডের সঙ্গে মিলিয়ে নিন। একটি ঠিকানা বদলালেই Factory নষ্ট হয়েছে প্রমাণ হয় না; কনফিগ, কোন ইন্টারফেস দেখা হচ্ছে ও ড্রাইভারের আচরণও কারণ হতে পারে।',
    correction: 'শেয়ার করা AI উত্তরের সংশোধন',
    warning:
      'সংরক্ষিত OpenWrt 25.12.5-এর HX21 device tree-তে মূল MAC-এর ছয় বাইট Factory-এর 0x4 offset-এ—0x1fef20-এ নয়। পার্টিশনের নাম factory (ছোট হাতের) এবং এটি read-only। এই তথ্য দেখে flash hex-edit, write protection সরানো বা সরাসরি mtd write চালানো যাবে না।',
    inspect: '১. আসল ডিভাইস ও কনফিগ সেকশন চিহ্নিত করুন',
    inspectText:
      '/etc/config/network ও /etc/config/wireless-এর ব্যক্তিগত ব্যাকআপ রাখুন; ইথারনেট ও সরাসরি রাউটারে পৌঁছানোর ব্যবস্থা রাখুন। নিচের কমান্ড দিয়ে বর্তমান সেকশন দেখুন। Linux ডিভাইসের নাম br-lan হলেই UCI সেকশনের নাম br_lan হয় না; সেকশন anonymous-ও হতে পারে। network.br_lan আছে ধরে নেবেন না।',
    persist: '২. শুধু সমস্যাযুক্ত MAC স্থায়ী কনফিগে নির্দিষ্ট করুন',
    network:
      '/etc/config/network-এ যে config device ব্লকের option name সমস্যাযুক্ত bridge বা WAN-এর প্রকৃত underlying device-এর সঙ্গে মেলে, সেটিতে ওই ইন্টারফেসের রেকর্ড করা মূল MAC দিয়ে option macaddr যোগ বা আপডেট করুন। WAN-এর device ব্লক না থাকলে লিংক করা নথি অনুসারে আসল device name দিয়ে তৈরি করুন; একই ডিভাইসের জন্য একাধিক ব্লক নয়।',
    unique:
      'শেয়ার করা উত্তরের উদাহরণ MAC কপি করবেন না; WAN মানেই লেবেলের MAC-এর সঙ্গে এক যোগ, এমনও নয়। যাচাই করা প্রতি-ইন্টারফেস রেকর্ড বা ISP-তে নিবন্ধিত WAN MAC ব্যবহার করুন। প্রযোজ্য ক্ষেত্রে আলাদা unicast ঠিকানা রাখুন; দুই রেডিও বা আলাদা পোর্টে একই ঠিকানা কপি করবেন না।',
    wireless:
      'সমস্যাযুক্ত AP Wi-Fi ইন্টারফেসের জন্য /etc/config/wireless-এর বর্তমান config wifi-iface ব্লকে macaddr দিন। নিজের SSID/নিরাপত্তা সেটিংস বদলে ফেলবেন না। রেডিও শনাক্ত করতে ব্যবহৃত wifi-device macaddr-এর সঙ্গে এটি গুলিয়ে ফেলবেন না। random বা multicast ঠিকানা নয়। প্রয়োজন ও ড্রাইভার সাপোর্ট থাকলেই Wi-Fi MAC বদলান।',
    apply:
      'কনফিগ সেভ করুন। UCI কমান্ড ব্যবহার করলে সংশ্লিষ্ট package (network বা wireless) commit করুন। তারপর শুধু সংশ্লিষ্ট service reload করুন: service network reload অথবা wifi reload। network reload-এ SSH বিচ্ছিন্ন ও ISP lease নতুন হতে পারে—স্থানীয় রিকভারির ব্যবস্থা রাখুন। আবার সংযোগ করে MAC মিলিয়ে স্বাভাবিক রিবুট দিন এবং আবার মিলিয়ে নিন।',
    limits:
      'কনফিগ বজায় থাকলে এটি স্বাভাবিক রিবুটের পরেও থাকে। reset, clean sysupgrade বা কনফিগ বাদ দিলে মুছে যেতে পারে। ব্যক্তিগত OpenWrt কনফিগ ব্যাকআপে সেটিংস রাখুন। এতে Factory calibration বা bootloader-এর নিজস্ব MAC মেরামত হয় না।',
    restore: '৩. মূল Factory রিস্টোর আলাদা মেরামত',
    restoreText:
      'এই রাউটার থেকেই সন্দেহজনক পরিবর্তনের আগে নেওয়া যাচাইকৃত, অপরিবর্তিত ব্যাকআপ রিস্টোরের উপযুক্ত উৎস। unlock-এর পরের ব্যাকআপে আগেই বদলানো ডেটা থাকতে পারে। চলমান build-এর পার্টিশন, আকার, NAND handling, protection ও recovery method যাচাই করতে হবে। অন্ধভাবে mtd write /tmp/factory.bin Factory চালাবেন না, অন্যের ডেটা দেবেন না বা EEPROM offset অনুমান করবেন না। মূল ডেটা না থাকলে MAC override হারানো radio calibration পুনর্গঠন করতে পারে না।',
    gate: 'MAC স্থিতিশীল ও সংযোগ ঠিক থাকলে এই ধাপ বাদ দিন। override কাজ না করলে, calibration নিয়ে সন্দেহ থাকলে বা raw restore দরকার হলে কোনো flash write-এর আগে ডিভাইস-নির্দিষ্ট সহায়তা নিন।',
    read: 'মূল ডকুমেন্টেশন',
  },
};
export function MacFix({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section className="mac-fix" id="mac-fix">
      <h4>{t.title}</h4>
      <p>{t.intro}</p>
      <div className="notice">
        <TriangleAlert size={18} />
        <p>
          <strong>{t.correction}.</strong> {t.warning}{' '}
          <a href={dts}>OpenWrt 25.12.5 DTS ↗</a>
        </p>
      </div>
      <h5>{t.inspect}</h5>
      <p>{t.inspectText}</p>
      <CopyCode
        label={
          locale === 'bn'
            ? 'শুধু পড়ার কমান্ড · রাউটারের SSH-তে'
            : 'Read-only commands · in the router SSH shell'
        }
        text={
          "ubus call system board\nip -br link\nuci show network | grep -E '(=device$|=interface$|\\.name=|\\.device=|\\.macaddr=)'\nuci show wireless | grep -E '(=wifi-iface$|\\.device=|\\.mode=|\\.macaddr=)'"
        }
        labels={ui[locale]}
      />
      <h5>{t.persist}</h5>
      <p>{t.network}</p>
      <p>{t.unique}</p>
      <p>{t.wireless}</p>
      <p>{t.apply}</p>
      <p className="mac-limit">{t.limits}</p>
      <h5>{t.restore}</h5>
      <p>{t.restoreText}</p>
      <div className="checkpoint">
        <ShieldCheck size={17} />
        <p>{t.gate}</p>
      </div>
      <div className="source-links" aria-label={t.read}>
        <a href={networkDoc}>
          OpenWrt · network macaddr
          <ArrowUpRight size={12} />
        </a>
        <a href={wirelessDoc}>
          OpenWrt · wifi-iface macaddr
          <ArrowUpRight size={12} />
        </a>
        <a href={dts}>
          OpenWrt · HX21 DTS
          <ArrowUpRight size={12} />
        </a>
      </div>
    </section>
  );
}
