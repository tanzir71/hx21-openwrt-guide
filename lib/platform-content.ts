import { findings, ui, type Finding, type Step } from './content';
import { steps } from './steps';
import type { Locale, Platform } from './locale';

export function platformUi(locale: Locale, platform: Platform) {
  const t = ui[locale];
  if (platform === 'mac')
    return {
      ...t,
      zipButton:
        locale === 'bn'
          ? 'macOS ব্যাকআপ কিট ডাউনলোড'
          : 'Download macOS backup kit',
    };
  return {
    ...t,
    eyebrow:
      locale === 'bn'
        ? 'স্বাধীন গবেষণা · WINDOWS নির্দেশনা'
        : 'INDEPENDENT RESEARCH · WINDOWS GUIDE',
    stepDescription:
      locale === 'bn'
        ? 'Windows PC ব্যবহার করে প্রথম ইনস্টলের পথ: OpenSSH Client, PowerShell 7.4+, তারযুক্ত নেটওয়ার্ক ও Tftpd64। রাউটারে লেখার কমান্ড বর্তমান অফিশিয়াল নির্দেশনা থেকে নিন।'
        : 'A first-install path for a Windows PC: OpenSSH Client, PowerShell 7.4+, wired networking and Tftpd64. Use the current official procedure for router-side flash commands.',
    zipText:
      locale === 'bn'
        ? 'Windows-এর আলাদা কিট: PowerShell যাচাই ও ব্যাকআপ হেল্পার, নির্দেশনা, একই 25.12.5 ফার্মওয়্যার ও চেকসাম, TFTP recovery এবং ঐচ্ছিক SSH কনফিগ। macOS-এর .command বা .sh হেল্পার নেই। PowerShell ও Tftpd64 অফিশিয়াল সূত্র থেকে আলাদা করে নিন।'
        : 'A separate Windows kit: PowerShell verification and backup helpers, instructions, the same 25.12.5 firmware/checksum records, TFTP recovery and optional SSH configuration. No macOS .command or .sh helpers. Install PowerShell and Tftpd64 separately from their official sources.',
    zipButton:
      locale === 'bn'
        ? 'Windows ব্যাকআপ কিট ডাউনলোড'
        : 'Download Windows backup kit',
    zipWarning:
      t.zipWarning +
      (locale === 'bn'
        ? ' ব্যাকআপ helper-এর জন্য PowerShell 7.4+ জরুরি। কাজ-নির্দিষ্ট tool দিয়ে একটি বাস্তব Windows workflow যাচাই হয়েছে; প্রতিটি downloadable helper বা অন্য hardware revision যাচাইয়ের দাবি নয়।'
        : ' The backup helper requires PowerShell 7.4+. One physical Windows workflow was verified using task-specific tools; that does not validate every downloadable helper or another hardware revision.'),
  };
}

export function platformFindings(
  locale: Locale,
  platform: Platform,
): Finding[] {
  if (platform === 'mac') return findings[locale];
  const bn = locale === 'bn';
  return findings[locale].map((finding) => {
    if (finding.id === 'mac')
      return {
        ...finding,
        id: 'windows',
        title: bn
          ? 'Windows: OpenSSH, দুটি IP ও Tftpd64।'
          : 'Windows: OpenSSH, two addresses and Tftpd64.',
        paragraphs: bn
          ? [
              'Windows-এর Optional Features থেকে OpenSSH Client নিন; এই কাজে PC-তে OpenSSH Server দরকার নেই। ব্যাকআপের জন্য Microsoft-এর PowerShell 7.4 বা নতুন সংস্করণ নিন—Windows Terminal খুললেই যে PowerShell 7 চলছে, তা নয়।',
              'ncpa.cpl খুলে সঠিক Ethernet adapter-এর IPv4 Properties → Advanced-এ 192.168.1.254/24 ও 192.168.10.2/24 দিন। এই বিচ্ছিন্ন লিংকে gateway ও DNS ফাঁকা রাখুন। আগের settings রেখে HX21 WAN খুলুন। স্বাধীন Wi-Fi internet-এ chat চললে সেটি চালু রাখুন; router-এর Ethernet route ও internet-এর আলাদা route যাচাই করুন। Internet Connection Sharing, অনিচ্ছাকৃত bridge ও বিরোধী VPN route এড়ান।',
              'অফিশিয়াল PJO2/tftpd64 থেকে সার্ভার নিন। শুধু TFTP চালু রাখুন, DHCP/DNS server বন্ধ। Server interface 192.168.1.254 এবং Current Directory কিটের tftp ফোল্ডার। Firewall পুরো বন্ধ করবেন না; প্রয়োজন হলে শুধু এই অ্যাপ, তারযুক্ত অ্যাডাপ্টার ও রাউটারের ঠিকানার জন্য সীমিত নিয়ম দিন।',
            ]
          : [
              'Install OpenSSH Client through Windows Optional Features; your PC does not need OpenSSH Server for this workflow. Install Microsoft PowerShell 7.4 or newer for backups. Opening Windows Terminal does not by itself mean you are using PowerShell 7.',
              'Open ncpa.cpl and the correct Ethernet adapter’s IPv4 Properties → Advanced. Add 192.168.1.254/24 and 192.168.10.2/24. Leave gateway and DNS blank on this isolated link. Record previous settings and disconnect HX21 WAN. If this chat uses independent Wi-Fi internet, keep it connected and verify that the router uses Ethernet and internet uses the independent route. Prevent Internet Connection Sharing, accidental bridges and conflicting VPN routes.',
              'Get Tftpd64 from PJO2/tftpd64. Enable only TFTP; leave its DHCP/DNS servers off. Select server interface 192.168.1.254 and the kit’s tftp folder as Current Directory. Keep Windows Firewall enabled; use a narrowly scoped app rule for the wired adapter and router address if needed.',
            ],
        points: bn
          ? [
              'TFTP Client optional feature সার্ভার নয়; রাউটারের ফাইল নেওয়ার জন্য PC-তে সার্ভার চলতে হবে।',
              'ফাইল পাঠাতে SFTP না থাকলে scp -O ব্যবহার করুন। Host key বদলালে আগে ডিভাইসের পরিচয় যাচাই করুন; যাচাই বন্ধ করবেন না।',
              'রাউটারের LAN IP PC-তে দেবেন না। লোকাল TFTP পরীক্ষা সফল হলেও রাউটার থেকে পৌঁছানো আলাদা করে দেখতে হবে।',
            ]
          : [
              'The Windows TFTP Client optional feature is not a TFTP server; the router needs a server running on the PC.',
              'Use scp -O if the router lacks SFTP. Investigate a changed SSH host key; never disable host-key verification.',
              'Do not assign the router’s LAN IP to the PC. A local TFTP test alone does not prove router-side reachability.',
            ],
        links: ['device', 'windowsSsh', 'powershell', 'tftpd64'],
      };
    if (finding.id === 'backups')
      return {
        ...finding,
        paragraphs: [
          finding.paragraphs[0],
          bn
            ? 'ব্যাকআপ সরাসরি Windows PC-তে স্ট্রিম করুন; রাউটারের /tmp-এ পুরো NAND রাখবেন না। Windows PowerShell 5.1 বা PowerShell 7.3 ও আগের সংস্করণে ssh ... > backup.bin বাইনারি ডেটা নষ্ট করতে পারে। কিটের হেল্পার PowerShell 7.4+ ছাড়া চলবে না এবং stdout-এর বাইনারি স্ট্রিমের সঙ্গে stderr মেশায় না।'
            : 'Stream backups directly to the Windows PC instead of filling router /tmp. Windows PowerShell 5.1 and PowerShell 7.3 or older can corrupt binary data with ssh ... > backup.bin. The kit helper refuses to run below PowerShell 7.4 and never combines stderr with the binary stdout stream.',
          bn
            ? 'প্রতিটি ফাইলের আকার, স্থানীয় SHA-256 এবং রাউটারের আগে/পরের readback hash মিলতে হবে। চলমান UBI/পুরো ফ্ল্যাশ বদলাতে পারে; অমিল হলে থামুন। Raw MTD dump আলাদা OOB/bad-block metadata ধরে না।'
            : 'Each file must match its expected size, local SHA-256 and router hashes before/after the read. Live UBI/full-flash may change; a mismatch is a stop condition. Raw MTD dumps do not capture separate OOB/bad-block metadata.',
        ],
        points: bn
          ? [
              'স্বাধীন physical storage-এ hash-verified private কপি রাখুন। Sensitive backup রাখার আগে folder permission ও cloud sync দেখুন।',
              'অন্য রাউটারের Factory ব্যবহার করবেন না।',
              'ভুল map, read failure বা hash অমিলে হেল্পার থামে এবং অসম্পূর্ণ .part ফাইল রেখে দেয়।',
            ]
          : [
              'Keep hash-verified copies on independent physical storage. Check folder permissions and any cloud sync before saving sensitive backups.',
              'Never substitute another router’s Factory data.',
              'The helper stops on an unexpected map, read error or hash mismatch, retaining incomplete .part files.',
            ],
        links: ['device', 'binaryStreams'],
      };
    if (finding.id === 'aftercare')
      return {
        ...finding,
        paragraphs: [
          finding.paragraphs[0],
          bn
            ? 'রেকর্ড করা MAC-এর সঙ্গে মিলিয়ে DHCP, DNS, WAN ও দুই রেডিও পরীক্ষা করুন। TFTP ছাড়া স্বাভাবিক boot নিশ্চিত করে Tftpd64 বন্ধ, অস্থায়ী firewall নিয়ম সরিয়ে Ethernet-এর আগের DHCP/manual ও DNS সেটিংস ফেরত দিন। ISP MAC override মানেই Factory ডেটা ফেরত আসা নয়।'
            : 'Compare recorded MACs and test DHCP, DNS, WAN and both radios. Confirm normal boot without TFTP, close Tftpd64, remove any temporary firewall rule and restore the previous Ethernet DHCP/manual and DNS settings. An ISP MAC override is not proof of restored Factory data.',
          finding.paragraphs[2],
        ],
      };
    return finding;
  });
}

export function platformSteps(locale: Locale, platform: Platform): Step[] {
  if (platform === 'mac') return steps[locale];
  const bn = locale === 'bn';
  const overrides: Record<string, Partial<Step>> = {
    identify: {
      checklist: [
        ...steps[locale][0].checklist.slice(0, 2),
        bn
          ? 'তারযুক্ত Windows PC, OpenSSH Client ও PowerShell 7.4+ প্রস্তুত রাখুন।'
          : 'Prepare a wired Windows PC, OpenSSH Client and PowerShell 7.4+.',
      ],
    },
    connect: {
      text: bn
        ? 'Windows Ethernet দিয়ে HX21 LAN-এ লাগিয়ে শুরুতে WAN খুলুন। স্বাধীন Wi-Fi-তে chat চললে সেটি চালু রাখুন; route যাচাই করে Internet Connection Sharing, bridge ও বিরোধী VPN route এড়ান।'
        : 'Connect Windows Ethernet to HX21 LAN and initially disconnect WAN. Preserve an independent Wi-Fi connection carrying the chat; verify routing and prevent Internet Connection Sharing, bridging and conflicting VPN routes.',
      checklist: bn
        ? [
            'আগের IP/DNS ও DHCP সেটিংস লিখে রাখুন।',
            'ncpa.cpl → Ethernet → IPv4 → Advanced-এ 192.168.1.254/24 ও 192.168.10.2/24 দিন।',
            'বিচ্ছিন্ন Ethernet-এ gateway/DNS ফাঁকা রাখুন; রাউটারের IP PC-তে দেবেন না।',
          ]
        : [
            'Record existing IP/DNS and DHCP settings.',
            'In ncpa.cpl → Ethernet → IPv4 → Advanced, add 192.168.1.254/24 and 192.168.10.2/24.',
            'Leave gateway/DNS blank on the isolated Ethernet link; never assign the router IP to the PC.',
          ],
      checkpoint: bn
        ? 'স্টক 192.168.10.1-এ ঢোকা যায়; 192.168.1.254 PC-তে আছে।'
        : 'Stock 192.168.10.1 is reachable; 192.168.1.254 belongs to the PC.',
    },
    backup: {
      text: bn
        ? 'PowerShell 7.4+ (pwsh) দিয়ে কিটের Backup-Stock.ps1 চালান। এটি যাচাইকৃত স্টক map থেকে সরাসরি PC-তে পড়ে; রাউটারে কিছু লেখে না।'
        : 'Use PowerShell 7.4+ (pwsh) to run Backup-Stock.ps1 from the kit. It reads the verified stock map directly to the PC and does not write to the router.',
      checklist: bn
        ? [
            'Windows PowerShell 5.1 দিয়ে বাইনারি SSH redirection করবেন না।',
            'ম্যাপ, byte count ও আগে/পরের SHA-256 মিলতে হবে; অমিল হলে থামুন।',
            'পুরো সেটের দ্বিতীয় ব্যক্তিগত কপি রাখুন; OneDrive sync-এর বিষয়টি বুঝে নিন।',
          ]
        : [
            'Do not use Windows PowerShell 5.1 binary SSH redirection.',
            'Require matching map, byte counts and before/after SHA-256; stop on any mismatch.',
            'Keep a second private copy of the complete set and review OneDrive syncing.',
          ],
    },
    verify: {
      text: bn
        ? 'Verify-Files.ps1 দিয়ে একই HX21 ফার্মওয়্যারের hash মিলিয়ে অফিশিয়াল স্বাক্ষর যাচাই করুন। Tftpd64-এ কিটের tftp ফোল্ডার ও 192.168.1.254 বেছে নিন।'
        : 'Check the same HX21 firmware with Verify-Files.ps1 and verify official signatures. In Tftpd64 choose the kit’s tftp folder and interface 192.168.1.254.',
      checklist: bn
        ? [
            'FIP, BL2, recovery ও sysupgrade-এর কাজ আলাদা।',
            'শুধু TFTP চালান—DHCP/DNS server বন্ধ রাখুন। Firewall পুরো বন্ধ নয়।',
            'Recovery নাম হুবহু মিলিয়ে স্থানীয় transfer পরীক্ষা করুন; বুটলোডার লেখার আগে তারযুক্ত পথ নিশ্চিত করুন।',
          ]
        : [
            'FIP, BL2, recovery and sysupgrade have different roles.',
            'Run TFTP only, with DHCP/DNS servers off. Do not disable the firewall globally.',
            'Check the exact recovery filename and a local transfer; verify the wired path before any bootloader write.',
          ],
    },
    finish: {
      checklist: [
        ...steps[locale][7].checklist.slice(0, 2),
        bn
          ? 'Tftpd64 বন্ধ, অস্থায়ী firewall নিয়ম সরিয়ে PC-র আগের Ethernet/DNS সেটিংস ফেরত দিন।'
          : 'Close Tftpd64, remove temporary firewall rules and restore the PC’s prior Ethernet/DNS settings.',
        steps[locale][7].checklist[3],
      ],
    },
  };
  return steps[locale].map((step) => ({ ...step, ...overrides[step.id] }));
}
