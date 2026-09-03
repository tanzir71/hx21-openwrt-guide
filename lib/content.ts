import type { Locale } from './locale';
export const reviewed = '2026-09-03';
export const firmwareVersion = '25.12.5';
export const sources = {
  device: 'https://openwrt.org/toh/imou/hx21',
  hardware: 'https://openwrt.org/toh/hwdata/imou/imou_hx21',
  selector:
    'https://firmware-selector.openwrt.org/?target=mediatek%2Ffilogic&id=imou_hx21',
  releases: 'https://downloads.openwrt.org/releases/',
  firmware:
    'https://downloads.openwrt.org/releases/25.12.5/targets/mediatek/filogic/',
  upstream:
    'https://lists.infradead.org/pipermail/lede-commits/2025-November/028095.html',
  uboot:
    'https://github.com/openwrt/openwrt/blob/v25.12.5/package/boot/uboot-mediatek/patches/466-add-imou-hx21.patch',
  unlock: 'https://github.com/byjahidul/Imou-HX21',
  community: 'https://github.com/itachi-re/imou-hx21-openwrt',
  macReport:
    'https://www.facebook.com/groups/383628147262547/permalink/1209221474703206/',
  walkthrough:
    'https://www.facebook.com/groups/383628147262547/permalink/1192441733047847/',
  macClaim:
    'https://www.facebook.com/groups/383628147262547/permalink/1215483640743656/',
  success:
    'https://www.facebook.com/groups/383628147262547/permalink/1205296418429045/',
  signatures: 'https://openwrt.org/docs/guide-user/security/release_signatures',
  apk: 'https://openwrt.org/docs/guide-user/additional-software/apk',
  uart: 'https://github.com/981213/mtk_uartboot',
  windowsSsh:
    'https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse',
  powershell:
    'https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows',
  binaryStreams:
    'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_redirection',
  tftpd64: 'https://github.com/PJO2/tftpd64',
};
export const artifacts = [
  {
    id: 'fip',
    suffix: 'bl31-uboot.fip',
    size: 804596,
    hash: '6b203411e71692343518c5b97e54c48f4a4c3bfc7925b376aafc5b149cbf598b',
    en: 'FIP · U-Boot bootloader',
    bn: 'FIP · U-Boot বুটলোডার',
  },
  {
    id: 'bl2',
    suffix: 'preloader.bin',
    size: 230232,
    hash: 'ad13725b82566ebd6b6a0cc37b83a0b9f17b8685702f32efc02fefff4126b1fc',
    en: 'BL2 · early boot stage',
    bn: 'BL2 · প্রাথমিক বুট ধাপ',
  },
  {
    id: 'recovery',
    suffix: 'initramfs-recovery.itb',
    size: 9109504,
    hash: '27b296ae93d86bc3d84d3c15cdb45ec0e30e21088b5642421dbccefddb433eec',
    en: 'Recovery · TFTP environment',
    bn: 'রিকভারি · TFTP পরিবেশ',
  },
  {
    id: 'system',
    suffix: 'squashfs-sysupgrade.itb',
    size: 10969346,
    hash: '4e6dff2db0ae3e497b1d82f534458d9240ac989c67365ba4082811a47123a247',
    en: 'Sysupgrade · installed system',
    bn: 'Sysupgrade · স্থায়ী সিস্টেম',
  },
] as const;
export const partitionRows = [
  ['mtd0', 'spi0.0', '128 MiB'],
  ['mtd1', 'BL2', '1 MiB'],
  ['mtd2', 'u-boot-env', '512 KiB'],
  ['mtd3', 'Factory', '2 MiB'],
  ['mtd4', 'FIP', '2 MiB'],
  ['mtd5', 'ubi', '114.5 MiB'],
];
export type Finding = {
  id: string;
  title: string;
  label: 'official' | 'reported' | 'practical';
  paragraphs: string[];
  points?: string[];
  links: (keyof typeof sources)[];
  special?: 'images' | 'partitions' | 'network';
};
export type Step = {
  id: string;
  title: string;
  short: string;
  text: string;
  checklist: string[];
  checkpoint: string;
  visual:
    | 'identity'
    | 'network'
    | 'access'
    | 'backup'
    | 'verify'
    | 'flash'
    | 'system'
    | 'finish';
  danger?: boolean;
};
export const ui = {
  en: {
    language: 'Language',
    official: 'Official sources',
    eyebrow: 'INDEPENDENT RESEARCH · MAC-READY',
    title: 'OpenWrt on HX21.',
    subtitle: 'Know every step.',
    description:
      'The findings, the warnings, and a clearer path from stock firmware to OpenWrt. Research carefully. Back up first.',
    supported: 'Native HX21 support',
    updated: 'Reviewed 3 Sep 2026',
    routeTitle: 'YOUR ROUTE TO OPENWRT',
    checkpoints: '3 checkpoints',
    connect: 'Connect',
    wired: 'Wired LAN',
    backup: 'Back up',
    private: 'Keep it private',
    verify: 'Verify',
    beforeWrite: 'Before you write',
    routeCaption: 'Read first. Flash only when ready.',
    warningTitle: 'Your router. Your decision.',
    warning:
      'This is an independent guide, not official OpenWrt documentation. Check the official device page and repositories before every flash. A wrong image or interrupted bootloader write can brick the router.',
    findings: 'Detailed findings',
    steps: 'Visual walkthrough',
    prompt: 'LLM Prompt',
    promptEyebrow: '03 / ASSISTED WORKFLOW',
    promptTitle: 'Your assistant. One complete workflow.',
    promptDescription:
      'A copyable prompt for prerequisites, private backups, reviewed installation, network setup and cleanup. It adapts to your computer and actual router state.',
    findingEyebrow: '01 / THE RESEARCH',
    findingTitle: 'What we know. What needs care.',
    findingDescription:
      'Official support and community experience, clearly separated. A dated research snapshot—not a live firmware recommendation.',
    stepEyebrow: '02 / THE WALKTHROUGH',
    stepTitle: 'One checkpoint at a time.',
    stepDescription:
      'A visual map for a first installation from stock on a Mac. This explains the sequence; it does not replace the current device-specific commands.',
    onThisPage: 'IN THIS GUIDE',
    officialLabel: 'Officially documented',
    reportedLabel: 'Community report · unverified',
    practicalLabel: 'Practical guidance',
    viewSource: 'Read source',
    filenames: 'Image roles & pinned SHA-256',
    bytes: 'bytes',
    sourceFirst: 'Get current images from OpenWrt',
    snapshot: 'Archived snapshot: 25.12.5 · 2 September 2026',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Select and copy the text manually.',
    checkpoint: 'Before moving on',
    risk: 'DESTRUCTIVE STAGE',
    prepare: 'Before you begin',
    prepareText:
      'Use Ethernet, reliable power, the exact supported hardware, a second private backup location, and a way to get help if recovery needs UART. No phone-only shortcut or one-click promise.',
    readFindings: 'Read the full findings first',
    stepsSource: 'Open the official installation procedure',
    zipTitle: 'A backup copy. Not the source of truth.',
    zipText:
      'Use official repositories first. This dated ZIP is only an offline fallback: the Mac helper kit, original firmware/checksum records, optional files and English reference notes. It is not a live updater, safety certification, or your router’s stock backup.',
    zipButton: 'Download backup ZIP',
    zipWarning:
      'Contains a community SSH configuration with a reported MAC-data risk. SHA-256 image checks passed; detached GPG signatures were not verified during preparation. Review before using.',
    zipPrivacy:
      'No personal paths, credentials, SSH host keys or device backup data are included.',
    zipContents: 'View archive manifest',
    faqTitle: 'A few useful answers.',
    sourceTitle: 'Go back to the evidence.',
    sourceText:
      'Official sources take precedence. Facebook comments provide context, not a verified flashing recipe. Some links require a Facebook account.',
    footer: 'Independent research. Official sources first.',
    privacy:
      'Language choice is saved in a first-party cookie for one year. At the entry URL, Bangladesh country detection selects বাংলা only if you have not made a choice. No third-party geolocation request or precise location is used.',
    staticPrivacy:
      'This GitHub Pages mirror does not detect your country. The entry page remembers your language through a first-party cookie for one year; otherwise it opens English. EN / বাংলা always lets you choose. No third-party geolocation request is used.',
    scope:
      'Scope: primary sources and community reports are supplemented by one completed Windows HX21 first-install and wired-AP workflow, including private backup checks and a 5 GHz client test. This is not validation of every revision, every published helper, macOS hardware execution, or a separate 2.4 GHz client test.',
    skip: 'Skip to guide',
    top: 'Back to top',
    hashLabel: 'Archive SHA-256',
    verifyZip: 'Verify download',
    nextGuide: 'See the visual walkthrough',
    docsOnly: 'Read-only example · run on the router after verifying identity',
    officialAction: 'Check official repositories',
    noJs: 'The full guide and language links work without JavaScript. Remembering a language selection requires cookies and JavaScript.',
    enSource: 'Original external sources may be in English or Bengali.',
  },
  bn: {
    language: 'ভাষা',
    official: 'অফিশিয়াল সূত্র',
    eyebrow: 'স্বাধীন গবেষণা · ম্যাকের জন্য প্রস্তুত',
    title: 'HX21-এ OpenWrt।',
    subtitle: 'প্রতিটি ধাপ বুঝে নিন।',
    description:
      'স্টক ফার্মওয়্যার থেকে OpenWrt—গবেষণার ফল, সতর্কতা ও সহজ পথনির্দেশ। আগে বুঝুন, তারপর ব্যাকআপ নিন।',
    supported: 'HX21-এর নিজস্ব সাপোর্ট',
    updated: 'পর্যালোচনা: ৩ সেপ্টেম্বর ২০২৬',
    routeTitle: 'OPENWRT-তে যাওয়ার পথ',
    checkpoints: '৩টি যাচাই ধাপ',
    connect: 'সংযোগ',
    wired: 'তারযুক্ত LAN',
    backup: 'ব্যাকআপ',
    private: 'ব্যক্তিগত রাখুন',
    verify: 'যাচাই',
    beforeWrite: 'লেখার আগে',
    routeCaption: 'আগে পড়ুন। প্রস্তুত হলেই ফ্ল্যাশ করুন।',
    warningTitle: 'আপনার রাউটার, আপনার সিদ্ধান্ত।',
    warning:
      'এটি স্বাধীন গাইড, OpenWrt-এর অফিশিয়াল ডকুমেন্টেশন নয়। প্রতিবার ফ্ল্যাশের আগে অফিশিয়াল ডিভাইস পেজ ও রিপোজিটরি দেখুন। ভুল ইমেজ বা বুটলোডার লেখার সময় বিদ্যুৎ চলে গেলে রাউটার ব্রিক হতে পারে।',
    findings: 'বিস্তারিত গবেষণা',
    steps: 'ছবিতে ধাপে ধাপে',
    prompt: 'LLM প্রম্পট',
    promptEyebrow: '০৩ / সহকারীর সাহায্যে',
    promptTitle: 'প্রস্তুতি থেকে শেষ যাচাই—এক প্রম্পটে।',
    promptDescription:
      'প্রয়োজনীয় টুল, ব্যক্তিগত ব্যাকআপ, যাচাইকৃত ইনস্টল, নেটওয়ার্ক ও cleanup-এর জন্য কপি করার প্রম্পট। আপনার কম্পিউটার ও রাউটারের প্রকৃত অবস্থা অনুযায়ী কাজ করবে।',
    findingEyebrow: '০১ / গবেষণার ফল',
    findingTitle: 'যা জানা গেছে। যেখানে সতর্কতা দরকার।',
    findingDescription:
      'অফিশিয়াল তথ্য ও কমিউনিটির অভিজ্ঞতা আলাদা করে দেখানো হয়েছে। এটি নির্দিষ্ট সময়ের গবেষণা—সর্বশেষ ফার্মওয়্যারের সরাসরি সুপারিশ নয়।',
    stepEyebrow: '০২ / ধাপে ধাপে',
    stepTitle: 'একবারে একটি ধাপ।',
    stepDescription:
      'ম্যাক ব্যবহার করে স্টক থেকে প্রথমবার ইনস্টল করার দৃশ্যভিত্তিক নির্দেশনা। এটি কাজের ক্রম বোঝায়; বর্তমান ডিভাইস-নির্দিষ্ট কমান্ডের বিকল্প নয়।',
    onThisPage: 'এই গাইডে',
    officialLabel: 'অফিশিয়াল নথিতে আছে',
    reportedLabel: 'কমিউনিটির দাবি · যাচাই হয়নি',
    practicalLabel: 'ব্যবহারিক পরামর্শ',
    viewSource: 'সূত্র দেখুন',
    filenames: 'ইমেজের কাজ ও সংরক্ষিত SHA-256',
    bytes: 'বাইট',
    sourceFirst: 'বর্তমান ইমেজ OpenWrt থেকে নিন',
    snapshot: 'সংরক্ষিত সংস্করণ: 25.12.5 · ২ সেপ্টেম্বর ২০২৬',
    copy: 'কপি',
    copied: 'কপি হয়েছে',
    copyFailed: 'লেখা সিলেক্ট করে নিজে কপি করুন।',
    checkpoint: 'পরের ধাপের আগে',
    risk: 'ডেটা মুছে যাওয়ার ঝুঁকির ধাপ',
    prepare: 'শুরুর আগে',
    prepareText:
      'ইথারনেট, নির্ভরযোগ্য বিদ্যুৎ, সঠিক সাপোর্টেড হার্ডওয়্যার, দ্বিতীয় ব্যক্তিগত ব্যাকআপ ও UART রিকভারিতে সাহায্য পাওয়ার ব্যবস্থা রাখুন। শুধু ফোন দিয়ে শর্টকাট বা এক ক্লিকে সফলতার নিশ্চয়তা নেই।',
    readFindings: 'আগে বিস্তারিত গবেষণা পড়ুন',
    stepsSource: 'অফিশিয়াল ইনস্টল পদ্ধতি দেখুন',
    zipTitle: 'ব্যাকআপ কপি। মূল তথ্যসূত্র নয়।',
    zipText:
      'আগে অফিশিয়াল রিপোজিটরি ব্যবহার করুন। এই ZIP শুধু অফলাইন বিকল্প: ম্যাকের হেল্পার কিট, মূল ফার্মওয়্যার ও চেকসাম, ঐচ্ছিক ফাইল এবং ইংরেজি রেফারেন্স নোট। এটি লাইভ আপডেটার, নিরাপত্তার সার্টিফিকেট বা আপনার রাউটারের স্টক ব্যাকআপ নয়।',
    zipButton: 'ব্যাকআপ ZIP ডাউনলোড',
    zipWarning:
      'এর মধ্যে কমিউনিটির SSH কনফিগ আছে, যা ব্যবহারে MAC ডেটা বদলানোর দাবি পাওয়া গেছে। ইমেজের SHA-256 মিলে গেছে; প্রস্তুতির সময় GPG স্বাক্ষর যাচাই করা হয়নি। ব্যবহারের আগে পর্যালোচনা করুন।',
    zipPrivacy: 'কোনো ব্যক্তিগত পাথ, পাসওয়ার্ড, SSH হোস্ট কী বা ডিভাইসের ব্যাকআপ ডেটা নেই।',
    zipContents: 'আর্কাইভের ফাইল তালিকা',
    faqTitle: 'কিছু জরুরি প্রশ্নের উত্তর।',
    sourceTitle: 'মূল তথ্যসূত্রে ফিরে যান।',
    sourceText:
      'অফিশিয়াল সূত্র অগ্রাধিকার পাবে। ফেসবুক মন্তব্য অভিজ্ঞতা জানায়, যাচাইকৃত ফ্ল্যাশিং পদ্ধতি নয়। কিছু লিংক দেখতে ফেসবুক অ্যাকাউন্ট লাগতে পারে।',
    footer: 'স্বাধীন গবেষণা। আগে অফিশিয়াল সূত্র।',
    privacy:
      'ভাষার পছন্দ এক বছরের জন্য এই সাইটের কুকিতে রাখা হয়। প্রথম প্রবেশের URL-এ বাংলাদেশের IP শনাক্ত হলে বাংলা দেখায়—শুধু আগে ভাষা না বেছে নিলে। তৃতীয় পক্ষের জিওলোকেশন সেবা বা নির্দিষ্ট অবস্থান নেওয়া হয় না।',
    staticPrivacy:
      'এই GitHub Pages সংস্করণে দেশ শনাক্ত করা হয় না। প্রথম পাতায় এক বছরের কুকি থেকে আপনার পছন্দের ভাষা নেওয়া হয়; পছন্দ না থাকলে ইংরেজি খোলে। EN / বাংলা দিয়ে যেকোনো সময় ভাষা বেছে নিতে পারেন। তৃতীয় পক্ষের জিওলোকেশন সেবা ব্যবহার করা হয় না।',
    scope:
      'পরিধি: মূল সূত্র ও কমিউনিটি রিপোর্টের সঙ্গে একটি Windows HX21 first-install ও wired-AP ব্যবহারের ফল যুক্ত হয়েছে; private backup ও 5 GHz client পরীক্ষা হয়েছে। সব revision, প্রকাশিত প্রতিটি helper, macOS-এ বাস্তব execution বা আলাদা 2.4 GHz client test যাচাই হয়েছে—এমন দাবি নয়।',
    skip: 'গাইডে যান',
    top: 'উপরে যান',
    hashLabel: 'আর্কাইভের SHA-256',
    verifyZip: 'ডাউনলোড যাচাই',
    nextGuide: 'ছবিতে ধাপে ধাপে দেখুন',
    docsOnly: 'শুধু পড়ার উদাহরণ · পরিচয় যাচাই করে রাউটারে চালান',
    officialAction: 'অফিশিয়াল রিপোজিটরি যাচাই করুন',
    noJs: 'JavaScript ছাড়াও গাইড ও ভাষার লিংক কাজ করে। ভাষার পছন্দ মনে রাখতে কুকি ও JavaScript প্রয়োজন।',
    enSource: 'বাইরের মূল সূত্র ইংরেজি বা বাংলায় হতে পারে।',
  },
} satisfies Record<Locale, Record<string, string>>;
export const findings: Record<Locale, Finding[]> = {
  en: [
    {
      id: 'support',
      title: 'A native target, not a cross-flash.',
      label: 'official',
      paragraphs: [
        'Imou HX21 has native OpenWrt support under mediatek/filogic with profile imou_hx21 and supported-device ID imou,hx21. The upstream support commit identifies MediaTek MT7981B, 256 MB DDR3, 128 MB SPI-NAND and four gigabit Ethernet ports.',
        'Confirm the label and revision on your own unit. Similar specifications or the LC-HX3001 board connection do not justify substituting Cudy or another model’s images. This guide covers first installation from stock, not a repeat bootloader flash on an already converted router.',
      ],
      links: ['device', 'hardware', 'upstream'],
    },
    {
      id: 'images',
      title: 'Four files. Four different jobs.',
      label: 'official',
      paragraphs: [
        'The research kit pins official 25.12.5 images. Check the current Firmware Selector before acting; do not assume an archived version is still recommended. Keep bootloader, recovery and sysupgrade files from the same reviewed release.',
        'The four archived images matched official SHA-256 and profile metadata. The original archive build saved signatures without verification; a later Windows check authenticated the 25.12.5 manifest with the official release key. Verify your exact files and trusted key again before use; matching an unauthenticated checksum is not publisher authentication.',
      ],
      special: 'images',
      links: ['selector', 'firmware', 'signatures'],
    },
    {
      id: 'access',
      title: 'SSH access is the first decision—not a harmless formality.',
      label: 'reported',
      paragraphs: [
        'Check whether stock SSH is already available before using a modified configuration. The published no-solder method restores HX21-ssh.bin through the stock configuration-restore function, not the firmware-upgrade screen. The maintainer documents web password 12345678 and an empty root SSH password after reboot. Keep the device isolated.',
        'An owner reported that a Factory backup taken after this configuration restore already contained a changed MAC address. That is an anecdotal report, not an independently reproduced universal bug. A later “permanent MAC fix” claim did not disclose a reproducible method in the comments reviewed.',
      ],
      points: [
        'Photograph the label and record stock WAN/LAN/radio MACs before any restore.',
        'A post-unlock backup cannot establish that original Factory data is untouched.',
        'UART is an alternative when preserving pre-unlock data matters: confirmed 3.3 V TTL pads, 115200 8N1, GND/TX/RX only—never VCC/VDD or 5 V. Do not guess pin order.',
        'Do not borrow Factory data, rewrite bootloader NVRAM blindly, or publish unique device backups.',
      ],
      links: ['unlock', 'macReport', 'macClaim', 'device'],
    },
    {
      id: 'backups',
      title: 'The backup is part of the installation.',
      label: 'practical',
      paragraphs: [
        'Back up every documented stock MTD area, especially Factory, which carries device-specific radio calibration and identity data. Confirm /proc/mtd on the actual router; partition labels and indices change after installation. A stock web configuration export does not replace raw flash backups.',
        'Stream files to the Mac instead of holding the full NAND image and overlapping partitions in the router’s limited /tmp RAM. Record exact byte counts, check transfer integrity and keep a second private copy. Live UBI/full-flash can change between reads; a mismatch requires investigation, not a green light. These raw dumps are not a universal NAND restoration image and do not capture separate OOB/bad-block metadata.',
      ],
      special: 'partitions',
      points: [
        'Do not leave the only backup in /tmp; reboot removes it.',
        'Never restore another router’s Factory partition.',
        'If Desktop uses iCloud, decide whether sensitive backup syncing is acceptable.',
        'The optional Mac helper stops on an unexpected stock map, read failure, size mismatch or failed readback comparison.',
      ],
      links: ['device', 'community'],
    },
    {
      id: 'mac',
      title: 'A Mac needs two addresses, not a Windows utility.',
      label: 'practical',
      paragraphs: [
        'Check the installed macOS SSH/SCP tools and TFTP service. Use Ethernet into an HX21 LAN port and initially disconnect WAN. Save original network settings. An offline workflow can disable Wi-Fi; when online help depends on an independent Wi-Fi uplink, retain it and verify separate Ethernet/internet routes, with Internet Sharing and accidental bridging disabled.',
        'Prepare Ethernet 192.168.1.254/24 and, after checking for conflicts, 192.168.10.2/24 as a temporary stock-side alias on the same verified adapter. Leave gateway/DNS absent on the isolated management link and verify that an independent internet route still works. This keeps stock access while preparing TFTP. Never assign either router IP to the Mac.',
        'Use legacy SCP mode (-O) if stock lacks SFTP. Permit local-network access when macOS asks. The isolated TFTP helper serves only the public recovery file, tests a local transfer, and refuses to replace an existing service. A local self-test does not prove router-side connectivity.',
      ],
      special: 'network',
      links: ['device'],
    },
    {
      id: 'sequence',
      title: 'The write boundary is real.',
      label: 'official',
      paragraphs: [
        'The current indexed device procedure backs up stock, uploads and writes FIP/BL2, prepares TFTP, erases stock UBI and reboots into recovery, then performs a clean sysupgrade. UBI erasure destroys the stock installation. Read each current official command and its expected target; this is not a stock-web-UI sysupgrade upload.',
        'Some accounts show only an FIP write and a reboot; that is not a complete reusable OS-install recipe. Initialization or recovery may also create or rewrite NAND volumes, so “TFTP recovery” is not a guarantee that nothing on flash changes.',
        'A clean write-protection refusal on stock BL2 may permit the documented later update. An I/O error, partial write or ambiguous failure does not. Do not reboot casually after a failed bootloader write; preserve the working shell and output and get recovery advice.',
      ],
      points: [
        'Verify uploaded hashes before any flash write.',
        'Never add sysupgrade -F to bypass a device/image mismatch.',
        'For a first clean install, the device guide uses sysupgrade -n after recovery boots.',
        'On an installed compatible system, routine upgrades use sysupgrade/Attended Sysupgrade—not this first-install UBI-erasure procedure.',
      ],
      links: ['device', 'upstream', 'walkthrough'],
    },
    {
      id: 'corrections',
      title: 'Small inconsistencies can have large consequences.',
      label: 'official',
      paragraphs: [
        'Use the exact TFTP recovery name openwrt-mediatek-filogic-imou_hx21-initramfs-recovery.itb at server 192.168.1.254. Published download names include the release version; U-Boot’s requested name does not.',
        'In the checked HX21 U-Boot source, menu 1 boots via TFTP, 7 writes BL2 and 8 reboots. A group walkthrough used conflicting numbers. Read the visible menu labels, never just copy a number.',
        'OpenWrt 25.12 and newer uses apk. Old opkg snippets do not apply unchanged. Do not mass-upgrade packages blindly or force a kernel module from a different kernel/ABI.',
      ],
      links: ['uboot', 'apk', 'walkthrough'],
    },
    {
      id: 'recovery',
      title: 'Know your exit before you enter.',
      label: 'official',
      paragraphs: [
        'With an intact OpenWrt bootloader, the device page describes Reset held during power-on, released after about 10 seconds, with the recovery file served at 192.168.1.254. Follow it only when no flash write is running.',
        'If BL2 or FIP is damaged, ordinary U-Boot TFTP may not be available. The documented alternative uses mtk_uartboot and a proper UART connection. Opening/soldering carries physical and warranty risks.',
        'The official page does include a return-to-stock procedure. It depends on your own original bootloader and UBI backups and the actual partition layout. It is not a guaranteed one-click downgrade or a blind write of the whole 128 MB dump.',
      ],
      links: ['device', 'uart'],
    },
    {
      id: 'aftercare',
      title: 'After the flash, establish a clean baseline.',
      label: 'practical',
      paragraphs: [
        'Confirm board imou,hx21 and the expected release. Set a strong root password. OpenWrt normally uses LAN 192.168.1.1; radios may start disabled. Choose the intended role: primary router with the real ISP protocol/VLAN, or wired AP behind an existing router. Discover the actual LAN/DHCP settings; do not copy another household’s network. Configure your real country and permitted channels on both bands, and resolve subnet overlap.',
        'Compare recorded MACs and test LAN DHCP, DNS, WAN, wired link rate and both radio bands. An interface-level WAN MAC override for ISP binding is not proof that Factory data was restored. Reboot and confirm normal boot without the TFTP server, then stop the server and restore the Mac’s prior settings.',
        'Owner posts report successful OpenWrt/ImmortalWrt installations. Range and performance claims are not controlled benchmarks. OpenWrt adds control; it cannot guarantee more RF range or remove hardware limits. SQM can help loaded latency, while VPN/filtering packages consume CPU/RAM.',
      ],
      points: [
        'Configure extras only after a stable baseline.',
        'Keep stock NAND backups and the new OpenWrt configuration backup separate.',
        'Phone-only flashing attracted conflicting advice; a wired computer is the practical path here.',
      ],
      links: ['device', 'success', 'community'],
    },
  ],
  bn: [
    {
      id: 'support',
      title: 'নিজস্ব টার্গেট আছে—অন্য মডেলের ফার্মওয়্যার নয়।',
      label: 'official',
      paragraphs: [
        'Imou HX21-এর জন্য mediatek/filogic টার্গেটে imou_hx21 প্রোফাইল ও imou,hx21 ডিভাইস আইডি আছে। আপস্ট্রিম সাপোর্ট কমিটে MediaTek MT7981B, 256 MB DDR3, 128 MB SPI-NAND এবং চারটি গিগাবিট ইথারনেট পোর্ট উল্লেখ আছে।',
        'নিজের রাউটারের লেবেল ও রিভিশন মিলিয়ে নিন। স্পেসিফিকেশন কাছাকাছি বা LC-HX3001 বোর্ডের সম্পর্ক থাকলেই Cudy বা অন্য মডেলের ইমেজ ব্যবহার করা যাবে না। এই গাইড স্টক থেকে প্রথম ইনস্টলের জন্য; আগে থেকেই OpenWrt/ImmortalWrt থাকা রাউটারে আবার বুটলোডার ফ্ল্যাশের জন্য নয়।',
      ],
      links: ['device', 'hardware', 'upstream'],
    },
    {
      id: 'images',
      title: 'চারটি ফাইল। চারটি আলাদা কাজ।',
      label: 'official',
      paragraphs: [
        'গবেষণার কিটে অফিশিয়াল 25.12.5 ইমেজ সংরক্ষিত আছে। কাজের আগে বর্তমান Firmware Selector দেখুন; সংরক্ষিত সংস্করণই এখন উপযুক্ত—এমন ধরে নেবেন না। বুটলোডার, রিকভারি ও sysupgrade একই পর্যালোচিত রিলিজের নিন।',
        'চারটি archived image-এর SHA-256 ও profile official record-এর সঙ্গে মিলেছে। মূল archive তৈরিতে signature শুধু রাখা হয়েছিল; পরের Windows check-এ official release key দিয়ে 25.12.5 manifest authenticate হয়েছে। নিজের exact file ও trusted key আবার যাচাই করুন; অযাচাইকৃত checksum মেলা publisher authentication নয়।',
      ],
      special: 'images',
      links: ['selector', 'firmware', 'signatures'],
    },
    {
      id: 'access',
      title: 'SSH চালু করার সিদ্ধান্তটিও গুরুত্বপূর্ণ।',
      label: 'reported',
      paragraphs: [
        'পরিবর্তিত কনফিগ ব্যবহার করার আগে স্টকে SSH চালু আছে কি না দেখুন। প্রকাশিত সোল্ডারবিহীন পদ্ধতিতে স্টকের configuration-restore থেকে HX21-ssh.bin দেওয়া হয়—firmware-upgrade থেকে নয়। রক্ষণাবেক্ষণকারীর নোটে রিবুটের পরে ওয়েব পাসওয়ার্ড 12345678 ও root SSH পাসওয়ার্ড ফাঁকা বলা আছে। রাউটার আলাদা নেটওয়ার্কে রাখুন।',
        'একজন ব্যবহারকারী জানান, এই কনফিগ রিস্টোরের পরে নেওয়া Factory ব্যাকআপেই MAC বদলে ছিল। এটি ব্যক্তিগত অভিজ্ঞতার দাবি; সবার ক্ষেত্রে ঘটে—এমন স্বাধীন পরীক্ষা হয়নি। পরে “স্থায়ী MAC সমাধান” দাবির পোস্টেও পর্যালোচিত মন্তব্যে পুনরায় অনুসরণযোগ্য পদ্ধতি দেওয়া হয়নি।',
      ],
      points: [
        'কোনো রিস্টোরের আগে লেবেলের ছবি এবং স্টকের WAN/LAN/রেডিও MAC লিখে রাখুন।',
        'আনলকের পরে নেওয়া ব্যাকআপ দিয়ে আগের Factory ডেটা অপরিবর্তিত ছিল কি না বোঝা যায় না।',
        'আনলকের আগের ডেটা সংরক্ষণ জরুরি হলে UART বিকল্প আছে: নিশ্চিত 3.3 V TTL প্যাড, 115200 8N1, শুধু GND/TX/RX—VCC/VDD বা 5 V নয়। পিনের ক্রম অনুমান করবেন না।',
        'অন্যের Factory ডেটা নেবেন না, অনুমানে বুটলোডার NVRAM লিখবেন না, নিজের অনন্য ব্যাকআপ প্রকাশ করবেন না।',
      ],
      links: ['unlock', 'macReport', 'macClaim', 'device'],
    },
    {
      id: 'backups',
      title: 'ব্যাকআপও ইনস্টলেশনের অংশ।',
      label: 'practical',
      paragraphs: [
        'স্টকের নথিভুক্ত সব MTD অংশ ব্যাকআপ নিন—বিশেষ করে Factory, যাতে ডিভাইস-নির্দিষ্ট রেডিও ক্যালিব্রেশন ও পরিচয় থাকে। আসল রাউটারে /proc/mtd দেখুন; ইনস্টলের পরে লেবেল ও নম্বর বদলায়। স্টকের ওয়েব কনফিগ এক্সপোর্ট raw flash ব্যাকআপের বিকল্প নয়।',
        'পুরো NAND ও তার অংশগুলোর কপি রাউটারের সীমিত /tmp RAM-এ না রেখে ম্যাকে স্ট্রিম করুন। বাইট সংখ্যা ও ট্রান্সফার যাচাই করে দ্বিতীয় ব্যক্তিগত কপি রাখুন। চলমান UBI/পুরো ফ্ল্যাশ দুইবার পড়ার মধ্যে বদলাতে পারে; অমিল হলে তদন্ত দরকার। এই raw dump সর্বজনীন NAND রিস্টোর ইমেজ নয় এবং আলাদা OOB/bad-block মেটাডেটা ধরে না।',
      ],
      special: 'partitions',
      points: [
        'ব্যাকআপের একমাত্র কপি /tmp-এ রাখবেন না; রিবুটে হারায়।',
        'অন্য রাউটারের Factory পার্টিশন রিস্টোর করবেন না।',
        'Desktop iCloud-এ সিঙ্ক হলে ব্যক্তিগত ব্যাকআপ সেখানে যাওয়া গ্রহণযোগ্য কি না ঠিক করুন।',
        'ঐচ্ছিক ম্যাক হেল্পার অপ্রত্যাশিত স্টক ম্যাপ, পড়ার ব্যর্থতা, ভুল মাপ বা readback না মিললে থামে।',
      ],
      links: ['device', 'community'],
    },
    {
      id: 'mac',
      title: 'ম্যাকে দরকার দুটি ঠিকানা, Windows সফটওয়্যার নয়।',
      label: 'practical',
      paragraphs: [
        'macOS-এর ইনস্টল করা SSH/SCP tool ও TFTP service যাচাই করুন। Ethernet দিয়ে HX21 LAN-এ লাগিয়ে শুরুতে WAN খুলুন। আগের network settings রাখুন। Offline পথে Wi-Fi বন্ধ করা যায়; স্বাধীন Wi-Fi-তেই সাহায্যের chat চললে সেটি চালু রেখে Ethernet/internet route আলাদা যাচাই করুন এবং Internet Sharing/অনিচ্ছাকৃত bridge বন্ধ রাখুন।',
        'Ethernet-এ 192.168.1.254/24 এবং conflict যাচাই করে একই adapter-এ temporary stock-side alias 192.168.10.2/24 দিন। বিচ্ছিন্ন management link-এ gateway/DNS ফাঁকা রেখে স্বাধীন internet route কাজ করে কি না দেখুন। এতে stock access ও TFTP প্রস্তুত থাকে। Router-এর নিজের IP ম্যাকে দেবেন না।',
        'স্টকে SFTP না থাকলে legacy SCP (-O) ব্যবহার করুন। macOS চাইলে local-network অনুমতি দিন। আলাদা TFTP হেল্পার শুধু প্রকাশ্য recovery ফাইল দেয়, লোকাল ট্রান্সফার পরীক্ষা করে এবং অন্য সার্ভার প্রতিস্থাপন করে না। লোকাল পরীক্ষা পাস করলেও রাউটার থেকে পৌঁছানো নিশ্চিত হয় না।',
      ],
      special: 'network',
      links: ['device'],
    },
    {
      id: 'sequence',
      title: 'লেখা শুরু হলেই ঝুঁকির সীমা পার হয়।',
      label: 'official',
      paragraphs: [
        'বর্তমান ইনডেক্স করা ডিভাইস পদ্ধতিতে স্টকের ব্যাকআপ, FIP/BL2 আপলোড ও লেখা, TFTP প্রস্তুত, স্টক UBI মুছে রিকভারিতে রিবুট, এরপর clean sysupgrade আছে। UBI মুছলে স্টক ইনস্টলেশন নষ্ট হয়। বর্তমান প্রতিটি অফিশিয়াল কমান্ড ও টার্গেট পড়ুন; এটি স্টকের ওয়েব UI-তে sysupgrade আপলোড নয়।',
        'কিছু অভিজ্ঞতায় শুধু FIP লিখে রিবুট দেখা যায়; সেটি পূর্ণ OS ইনস্টলের পুনর্ব্যবহারযোগ্য নির্দেশনা নয়। initialization বা recovery-তেও NAND volume তৈরি বা বদলাতে পারে—তাই “TFTP recovery” মানেই শুধু RAM বদলাবে, এমন নয়।',
        'স্টক BL2-তে স্পষ্ট write-protection refusal হলে পরে আপডেট করার নথিভুক্ত সুযোগ থাকতে পারে। I/O error, আংশিক লেখা বা অস্পষ্ট ব্যর্থতা একই ঘটনা নয়। বুটলোডার লেখা ব্যর্থ হলে হুট করে রিবুট নয়; চালু শেল ও আউটপুট রেখে পরামর্শ নিন।',
      ],
      points: [
        'ফ্ল্যাশ লেখার আগে আপলোড করা ফাইলের হ্যাশ মিলিয়ে নিন।',
        'ডিভাইস/ইমেজ অমিল এড়াতে sysupgrade -F দেবেন না।',
        'প্রথম clean install-এ recovery চালুর পরে ডিভাইস গাইড sysupgrade -n ব্যবহার করে।',
        'পরে সামঞ্জস্যপূর্ণ আপডেটে sysupgrade/Attended Sysupgrade ব্যবহার হয়—প্রথম ইনস্টলের UBI মোছার ধাপ নয়।',
      ],
      links: ['device', 'upstream', 'walkthrough'],
    },
    {
      id: 'corrections',
      title: 'ছোট অমিলেও বড় ক্ষতি হতে পারে।',
      label: 'official',
      paragraphs: [
        '192.168.1.254 সার্ভারে TFTP recovery ফাইলের নাম হুবহু openwrt-mediatek-filogic-imou_hx21-initramfs-recovery.itb হতে হবে। ডাউনলোডের নামে সংস্করণ থাকে; U-Boot যে নাম চায় তাতে থাকে না।',
        'পরীক্ষিত HX21 U-Boot সোর্সে মেনু 1 দিয়ে TFTP boot, 7 দিয়ে BL2 লেখা এবং 8 দিয়ে reboot হয়। গ্রুপের একটি গাইডে নম্বর আলাদা ছিল। শুধু নম্বর কপি না করে সামনে থাকা মেনুর লেবেল পড়ুন।',
        'OpenWrt 25.12 ও পরের সংস্করণে apk ব্যবহার হয়। পুরোনো opkg কমান্ড অপরিবর্তিতভাবে প্রযোজ্য নয়। সব প্যাকেজ একসঙ্গে অন্ধভাবে আপগ্রেড বা আলাদা kernel/ABI-এর মডিউল force-install করবেন না।',
      ],
      links: ['uboot', 'apk', 'walkthrough'],
    },
    {
      id: 'recovery',
      title: 'ঢোকার আগে বের হওয়ার পথ জানুন।',
      label: 'official',
      paragraphs: [
        'OpenWrt বুটলোডার ঠিক থাকলে ডিভাইস পেজে পাওয়ার দেওয়ার সময় Reset চেপে প্রায় ১০ সেকেন্ড পরে ছাড়ার পদ্ধতি আছে; recovery ফাইল 192.168.1.254 থেকে দিতে হয়। কোনো flash write চলাকালে এটি করবেন না।',
        'BL2 বা FIP নষ্ট হলে সাধারণ U-Boot TFTP নাও চলতে পারে। নথিভুক্ত বিকল্পে mtk_uartboot ও সঠিক UART সংযোগ লাগে। খোলা বা সোল্ডার করলে শারীরিক ক্ষতি ও ওয়ারেন্টির ঝুঁকি আছে।',
        'অফিশিয়াল পেজে স্টকে ফেরার পদ্ধতি আছে। সেটি আপনার মূল বুটলোডার/UBI ব্যাকআপ এবং বর্তমান পার্টিশন ম্যাপের ওপর নির্ভর করে। এটি নিশ্চিত এক-ক্লিক ডাউনগ্রেড বা পুরো 128 MB dump অন্ধভাবে লেখার নির্দেশ নয়।',
      ],
      links: ['device', 'uart'],
    },
    {
      id: 'aftercare',
      title: 'ফ্ল্যাশের পরে আগে স্বাভাবিক কাজ যাচাই করুন।',
      label: 'practical',
      paragraphs: [
        'বোর্ড imou,hx21 ও প্রত্যাশিত রিলিজ নিশ্চিত করুন। শক্ত root পাসওয়ার্ড দিন। OpenWrt-তে LAN সাধারণত 192.168.1.1; রেডিও শুরুতে বন্ধ থাকতে পারে। নিজস্ব ISP protocol/VLAN-সহ primary router নাকি existing router-এর পেছনে wired AP—ভূমিকা বাছুন। আসল LAN/DHCP settings জানুন; অন্য বাড়ির network কপি নয়। প্রকৃত দেশ ও অনুমোদিত channel দিয়ে দুই band সেট করুন; subnet overlap ঠিক করুন।',
        'আগের MAC-এর সঙ্গে মিলিয়ে LAN DHCP, DNS, WAN, তারের link rate ও দুই রেডিও পরীক্ষা করুন। ISP binding-এর জন্য interface-level WAN MAC override দিলেই Factory ডেটা ফিরেছে—এমন নয়। TFTP ছাড়া স্বাভাবিক রিবুট নিশ্চিত করে সার্ভার বন্ধ ও ম্যাকের আগের সেটিংস ফেরত দিন।',
        'ব্যবহারকারীরা OpenWrt/ImmortalWrt ইনস্টল সফল হওয়ার কথা বলেছেন। রেঞ্জ ও পারফরম্যান্সের দাবি নিয়ন্ত্রিত benchmark নয়। OpenWrt বেশি নিয়ন্ত্রণ দেয়; বেশি RF range বা হার্ডওয়্যারের সীমা দূর করার নিশ্চয়তা দেয় না। SQM ব্যস্ত সংযোগে latency কমাতে সাহায্য করতে পারে; VPN/filtering CPU/RAM খরচ করে।',
      ],
      points: [
        'বেসিক স্থিতিশীল হলেই অতিরিক্ত প্যাকেজ যোগ করুন।',
        'স্টক NAND ব্যাকআপ ও নতুন OpenWrt কনফিগ ব্যাকআপ আলাদা রাখুন।',
        'শুধু ফোনে ফ্ল্যাশ নিয়ে মতভেদ ছিল; এখানে তারযুক্ত কম্পিউটার ব্যবহারই ব্যবহারিক পথ।',
      ],
      links: ['device', 'success', 'community'],
    },
  ],
};
