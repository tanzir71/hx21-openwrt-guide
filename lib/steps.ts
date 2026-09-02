import type { Locale } from './locale';
import type { Step } from './content';
export const steps: Record<Locale, Step[]> = {
  en: [
    {
      id: 'identify',
      title: 'Confirm the exact router.',
      short: 'Identify',
      visual: 'identity',
      text: 'Start with the label, not the appearance of the case. This path is for the supported Imou HX21 running stock firmware.',
      checklist: [
        'Record model, hardware revision, firmware version and original MAC addresses.',
        'Keep ISP protocol, PPPoE/VLAN details and any MAC binding privately.',
        'Have a wired Mac, stable power and a recovery plan.',
      ],
      checkpoint: 'The official device page and your own hardware match.',
    },
    {
      id: 'connect',
      title: 'Make one isolated wired connection.',
      short: 'Connect',
      visual: 'network',
      text: 'Connect the Mac’s Ethernet adapter to an HX21 LAN port. Disconnect router WAN. Keep Mac Wi-Fi, VPN and Internet Sharing off.',
      checklist: [
        'Record the Mac’s existing Ethernet settings.',
        'For the kit workflow: manual Ethernet 192.168.1.254/24, router 192.168.1.1.',
        'Add 192.168.10.2/24 as an alias (a second IP address) on that same wired adapter for stock access.',
      ],
      checkpoint:
        'Stock 192.168.10.1 is reachable; 192.168.1.254 belongs to the Mac, not the router.',
    },
    {
      id: 'access',
      title: 'Open the router’s command line (SSH).',
      short: 'Access',
      visual: 'access',
      text: 'Try existing stock SSH first. A modified config restore is optional—not a risk-free default.',
      checklist: [
        'Read the owner-reported MAC/Factory concern before using HX21-ssh.bin.',
        'If preserving untouched Factory data is essential, consider properly identified 3.3 V UART first.',
        'If using the config, use stock Restore Configuration, not Firmware Upgrade.',
      ],
      checkpoint:
        'You know whether your next backup is before or after a modified configuration restore.',
    },
    {
      id: 'backup',
      title: 'Back up before you write.',
      short: 'Back up',
      visual: 'backup',
      text: 'Read the actual stock partition map. Copy all documented parts directly to the Mac, with special care for Factory.',
      checklist: [
        'Preserve BL2, u-boot-env, Factory, FIP, ubi and the whole-flash view.',
        'Verify byte counts and integrity; investigate any failed read or mismatch.',
        'Keep a second private copy outside the router. Do not share it publicly.',
      ],
      checkpoint:
        'Verified backups exist in two private locations. A file only in /tmp does not count.',
    },
    {
      id: 'verify',
      title: 'Check files. Prepare recovery file transfer (TFTP).',
      short: 'Verify',
      visual: 'verify',
      text: 'Download the current appropriate HX21 release from official sources. Check SHA-256 and publisher signatures; do not mix releases.',
      checklist: [
        'Distinguish FIP, preloader, recovery and sysupgrade.',
        'Serve the recovery image under its exact unversioned filename at 192.168.1.254.',
        'Test the TFTP service before writing the bootloader; check the physical path too.',
      ],
      checkpoint:
        'Correct profile, matching files, verified backups, reliable power and a ready recovery server.',
    },
    {
      id: 'flash',
      title: 'Pause at the destructive boundary.',
      short: 'Write',
      visual: 'flash',
      danger: true,
      text: 'Follow the current official device instructions one command at a time. Bootloader replacement and UBI erasure can destroy the stock installation.',
      checklist: [
        'Verify uploaded files and target partition labels before FIP/BL2 writes.',
        'Treat partial writes, I/O errors or ambiguous BL2 failures as STOP conditions.',
        'Only the documented clean BL2 write-protection refusal can justify deferring that step.',
        'Keep power and TFTP available through the documented UBI-erasure/reboot stage.',
      ],
      checkpoint:
        'Every preceding write succeeded or the precise documented exception applies. Never force through an error.',
    },
    {
      id: 'install',
      title: 'Recovery first. Then the installed system.',
      short: 'Install',
      visual: 'system',
      text: 'When recovery boots at 192.168.1.1, confirm imou,hx21 and the expected OpenWrt environment before continuing.',
      checklist: [
        'Upload the matching sysupgrade image and compare its hash.',
        'Run the image compatibility test; stop if it fails. Never bypass with -F.',
        'Follow the documented clean sysupgrade (-n); let it finish and reboot without interruption.',
      ],
      checkpoint:
        'The installed router reports the expected board and version—not just a temporary recovery session.',
    },
    {
      id: 'finish',
      title: 'Secure, test, and clean up.',
      short: 'Finish',
      visual: 'finish',
      text: 'Set a root password, configure your ISP and both Wi-Fi radios, and choose the correct regulatory country.',
      checklist: [
        'Compare MACs with the worksheet; test LAN DHCP, DNS, WAN and both bands.',
        'Confirm a normal boot from flash without the TFTP server.',
        'Stop TFTP, remove the temporary alias, and restore the Mac’s previous settings.',
        'Save a fresh OpenWrt configuration backup separately from stock NAND backups.',
      ],
      checkpoint:
        'Normal boot and connectivity work. Add SQM/VPN/filtering only after this baseline is stable.',
    },
  ],
  bn: [
    {
      id: 'identify',
      title: 'সঠিক রাউটারটি নিশ্চিত করুন।',
      short: 'পরিচয়',
      visual: 'identity',
      text: 'কেস দেখতে কেমন তার বদলে লেবেল দিয়ে শুরু করুন। এই পথ সাপোর্টেড Imou HX21-এর স্টক ফার্মওয়্যারের জন্য।',
      checklist: [
        'মডেল, হার্ডওয়্যার রিভিশন, ফার্মওয়্যার সংস্করণ ও মূল MAC লিখে রাখুন।',
        'ISP protocol, PPPoE/VLAN ও MAC binding-এর তথ্য ব্যক্তিগত রাখুন।',
        'তারযুক্ত ম্যাক, স্থিতিশীল বিদ্যুৎ ও রিকভারির পরিকল্পনা রাখুন।',
      ],
      checkpoint: 'অফিশিয়াল ডিভাইস পেজের সঙ্গে আপনার হার্ডওয়্যার মিলে গেছে।',
    },
    {
      id: 'connect',
      title: 'একটি আলাদা তারযুক্ত সংযোগ করুন।',
      short: 'সংযোগ',
      visual: 'network',
      text: 'ম্যাকের ইথারনেট অ্যাডাপ্টার HX21-এর LAN-এ লাগান। WAN খুলে দিন। ম্যাকের Wi-Fi, VPN ও Internet Sharing বন্ধ রাখুন।',
      checklist: [
        'ম্যাকের বর্তমান Ethernet সেটিংস লিখে রাখুন।',
        'কিটের পদ্ধতিতে: manual Ethernet 192.168.1.254/24, router 192.168.1.1।',
        'স্টকে ঢোকার জন্য একই তারযুক্ত অ্যাডাপ্টারে 192.168.10.2/24 alias (দ্বিতীয় IP address) যোগ করুন।',
      ],
      checkpoint:
        'স্টক 192.168.10.1-এ ঢোকা যাচ্ছে; 192.168.1.254 ম্যাকের ঠিকানা, রাউটারের নয়।',
    },
    {
      id: 'access',
      title: 'রাউটারের command line (SSH) খুলুন।',
      short: 'অ্যাক্সেস',
      visual: 'access',
      text: 'আগে দেখুন স্টকে SSH চালু আছে কি না। পরিবর্তিত কনফিগ রিস্টোর ঐচ্ছিক—ঝুঁকিহীন ডিফল্ট নয়।',
      checklist: [
        'HX21-ssh.bin ব্যবহারের আগে MAC/Factory পরিবর্তনের দাবিটি পড়ুন।',
        'অপরিবর্তিত Factory ডেটা রাখা জরুরি হলে আগে সঠিকভাবে চিহ্নিত 3.3 V UART বিবেচনা করুন।',
        'কনফিগ দিলে স্টকের Restore Configuration ব্যবহার করুন, Firmware Upgrade নয়।',
      ],
      checkpoint:
        'পরের ব্যাকআপ পরিবর্তিত কনফিগ রিস্টোরের আগে না পরে হবে, তা আপনি জানেন।',
    },
    {
      id: 'backup',
      title: 'লেখার আগে ব্যাকআপ নিন।',
      short: 'ব্যাকআপ',
      visual: 'backup',
      text: 'আসল স্টক পার্টিশন ম্যাপ পড়ুন। নথিভুক্ত সব অংশ সরাসরি ম্যাকে কপি করুন—বিশেষ নজর দিন Factory-তে।',
      checklist: [
        'BL2, u-boot-env, Factory, FIP, ubi ও পুরো ফ্ল্যাশের কপি রাখুন।',
        'বাইট সংখ্যা ও অখণ্ডতা যাচাই করুন; ব্যর্থ read বা অমিল উপেক্ষা করবেন না।',
        'রাউটারের বাইরে দ্বিতীয় ব্যক্তিগত কপি রাখুন। প্রকাশ্যে শেয়ার করবেন না।',
      ],
      checkpoint: 'দুটি ব্যক্তিগত স্থানে যাচাইকৃত ব্যাকআপ আছে। শুধু /tmp-এ ফাইল থাকলে হবে না।',
    },
    {
      id: 'verify',
      title: 'ফাইল যাচাই করে recovery file পাঠানোর TFTP প্রস্তুত করুন।',
      short: 'যাচাই',
      visual: 'verify',
      text: 'অফিশিয়াল সূত্র থেকে বর্তমানে উপযুক্ত HX21 রিলিজ নিন। SHA-256 ও প্রকাশকের স্বাক্ষর যাচাই করুন; রিলিজ মিশিয়ে ফেলবেন না।',
      checklist: [
        'FIP, preloader, recovery ও sysupgrade আলাদা করে চিনুন।',
        '192.168.1.254-এ recovery ইমেজ হুবহু সংস্করণবিহীন নামে দিন।',
        'বুটলোডার লেখার আগে TFTP সার্ভার পরীক্ষা করুন; তারযুক্ত পথটিও দেখুন।',
      ],
      checkpoint:
        'সঠিক প্রোফাইল, মেলা ফাইল, যাচাইকৃত ব্যাকআপ, নির্ভরযোগ্য বিদ্যুৎ ও প্রস্তুত রিকভারি সার্ভার আছে।',
    },
    {
      id: 'flash',
      title: 'ঝুঁকির ধাপে এসে থেমে যাচাই করুন।',
      short: 'লেখা',
      visual: 'flash',
      danger: true,
      text: 'বর্তমান অফিশিয়াল ডিভাইস নির্দেশনা একবারে একটি কমান্ড করে অনুসরণ করুন। বুটলোডার বদলানো ও UBI মোছায় স্টক ইনস্টলেশন নষ্ট হতে পারে।',
      checklist: [
        'FIP/BL2 লেখার আগে আপলোডের ফাইল ও টার্গেট লেবেল যাচাই করুন।',
        'আংশিক লেখা, I/O error বা অস্পষ্ট BL2 ব্যর্থতায় থামুন।',
        'শুধু নথিভুক্ত স্পষ্ট BL2 write-protection refusal হলে ধাপটি পরে করার সুযোগ থাকতে পারে।',
        'নথিভুক্ত UBI মোছা/রিবুটের সময় বিদ্যুৎ ও TFTP চালু রাখুন।',
      ],
      checkpoint:
        'আগের প্রতিটি লেখা সফল, অথবা নির্দিষ্ট নথিভুক্ত ব্যতিক্রম প্রযোজ্য। ভুল এড়িয়ে জোর করে এগোবেন না।',
    },
    {
      id: 'install',
      title: 'আগে রিকভারি। তারপর স্থায়ী সিস্টেম।',
      short: 'ইনস্টল',
      visual: 'system',
      text: '192.168.1.1-এ recovery চালু হলে এগোনোর আগে imou,hx21 ও প্রত্যাশিত OpenWrt পরিবেশ নিশ্চিত করুন।',
      checklist: [
        'মিলে যাওয়া sysupgrade ইমেজ আপলোড করে হ্যাশ মিলিয়ে নিন।',
        'ইমেজ compatibility test চালান; ব্যর্থ হলে থামুন। -F দিয়ে এড়াবেন না।',
        'নথিভুক্ত clean sysupgrade (-n) অনুসরণ করুন; কাজ ও রিবুট বাধা না দিয়ে শেষ হতে দিন।',
      ],
      checkpoint:
        'স্থায়ীভাবে ইনস্টল করা রাউটার প্রত্যাশিত বোর্ড ও সংস্করণ দেখাচ্ছে—শুধু অস্থায়ী recovery নয়।',
    },
    {
      id: 'finish',
      title: 'নিরাপদ করুন, পরীক্ষা করুন, গুছিয়ে নিন।',
      short: 'শেষ যাচাই',
      visual: 'finish',
      text: 'root পাসওয়ার্ড দিন, ISP ও দুই Wi-Fi রেডিও সেট করুন এবং প্রকৃত regulatory country বেছে নিন।',
      checklist: [
        'worksheet-এর MAC মিলিয়ে LAN DHCP, DNS, WAN ও দুই ব্যান্ড পরীক্ষা করুন।',
        'TFTP সার্ভার ছাড়া ফ্ল্যাশ থেকে স্বাভাবিক boot নিশ্চিত করুন।',
        'TFTP বন্ধ, অস্থায়ী alias সরিয়ে ম্যাকের আগের সেটিংস ফেরত দিন।',
        'নতুন OpenWrt কনফিগ ব্যাকআপ স্টক NAND ব্যাকআপ থেকে আলাদা রাখুন।',
      ],
      checkpoint:
        'স্বাভাবিক বুট ও সংযোগ কাজ করছে। এই অবস্থা স্থিতিশীল হলেই SQM/VPN/filtering যোগ করুন।',
    },
  ],
};
export const faqs: Record<Locale, { q: string; a: string }[]> = {
  en: [
    {
      q: 'Can I flash the sysupgrade image through the stock web UI?',
      a: 'No. The documented first-install path involves SSH access, backups, bootloader replacement and TFTP recovery before sysupgrade. The SSH configuration belongs in stock Restore Configuration, not Firmware Upgrade.',
    },
    {
      q: 'Will OpenWrt definitely increase Wi-Fi range?',
      a: 'No. More configuration options do not change the antennas, radio hardware or regulatory limits. Community range claims are anecdotal; compare the same channel, location and clients.',
    },
    {
      q: 'Is the archive the latest firmware?',
      a: 'No. It is a dated backup of the 25.12.5 research kit. Check the official Firmware Selector, device instructions, signatures and release notes before using anything from it.',
    },
    {
      q: 'Will the guide remember English while I am in Bangladesh?',
      a: 'Yes. A language you choose is saved in a first-party cookie for one year and takes precedence over country detection at the entry URL. Explicit /en and /bn links always keep their own language. With cookies or JavaScript blocked, use or bookmark the desired language URL.',
    },
    {
      q: 'Can the ZIP restore my original router?',
      a: 'It does not contain your device’s stock flash or Factory backup. You must create those privately from your own device before flashing. Read the official return-to-stock procedure and review your actual map and backup set before restoration.',
    },
  ],
  bn: [
    {
      q: 'স্টকের ওয়েব UI দিয়ে sysupgrade ইমেজ ফ্ল্যাশ করা যাবে?',
      a: 'না। নথিভুক্ত প্রথম ইনস্টলে SSH, ব্যাকআপ, বুটলোডার বদলানো ও TFTP recovery-এর পরে sysupgrade আসে। SSH কনফিগটি স্টকের Restore Configuration-এ যায়, Firmware Upgrade-এ নয়।',
    },
    {
      q: 'OpenWrt দিলে Wi-Fi রেঞ্জ নিশ্চিত বাড়বে?',
      a: 'না। বেশি সেটিংস থাকলেই অ্যান্টেনা, রেডিও হার্ডওয়্যার বা regulatory limit বদলায় না। কমিউনিটির রেঞ্জের দাবি ব্যক্তিগত অভিজ্ঞতা; একই চ্যানেল, জায়গা ও ক্লায়েন্ট দিয়ে তুলনা করুন।',
    },
    {
      q: 'আর্কাইভে কি সর্বশেষ ফার্মওয়্যার আছে?',
      a: 'না। এটি 25.12.5 গবেষণা কিটের নির্দিষ্ট সময়ের ব্যাকআপ। কোনো ফাইল ব্যবহারের আগে অফিশিয়াল Firmware Selector, ডিভাইস নির্দেশনা, স্বাক্ষর ও রিলিজ নোট দেখুন।',
    },
    {
      q: 'বাংলাদেশে থেকেও English বেছে নিলে মনে রাখবে?',
      a: 'হ্যাঁ। বেছে নেওয়া ভাষা এক বছরের first-party cookie-তে থাকে এবং প্রবেশের URL-এ দেশ শনাক্তকরণের চেয়ে অগ্রাধিকার পায়। সরাসরি /en ও /bn লিংক নিজস্ব ভাষায় থাকে। কুকি বা JavaScript বন্ধ থাকলে পছন্দের ভাষার URL ব্যবহার বা বুকমার্ক করুন।',
    },
    {
      q: 'ZIP দিয়ে কি আমার আসল রাউটার রিস্টোর করা যাবে?',
      a: 'এতে আপনার ডিভাইসের স্টক ফ্ল্যাশ বা Factory ব্যাকআপ নেই। ফ্ল্যাশের আগে নিজের রাউটার থেকে ব্যক্তিগতভাবে সেগুলো নিতে হবে। রিস্টোরের আগে অফিশিয়াল পদ্ধতি পড়ে বর্তমান ম্যাপ ও নিজের ব্যাকআপ পর্যালোচনা করুন।',
    },
  ],
};
