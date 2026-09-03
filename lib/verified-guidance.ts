import type { Locale, Platform } from './locale';
import type { HowTo, HowToItem } from './walkthrough-help';

/** Generalized lessons; no household configuration or private session records. */
export function addVerifiedGuidance(
  help: Record<string, HowTo>,
  locale: Locale,
  platform: Platform,
) {
  const bn = locale === 'bn';
  const win = platform === 'windows';
  const t = (en: string, bangla: string) => (bn ? bangla : en);
  const item = (
    title: [string, string],
    body: [string, string][],
  ): HowToItem => ({
    title: t(...title),
    body: body.map((pair) => t(...pair)),
  });
  help.identify.items.push({
    ...item(
      [
        'Verify what this terminal can actually run',
        'এই terminal আসলে কোন tool চালায় দেখুন',
      ],
      [
        [
          'A tool bundled inside an assistant is not necessarily installed on your normal PATH. Check the running shell and executable paths, free backup space, a second independent storage destination, Ethernet and administrative access. Install missing prerequisites from official sources, reopen the terminal and recheck.',
          'সহকারীর bundled tool আপনার স্বাভাবিক PATH-এ নাও থাকতে পারে। চলমান shell, executable path, backup-এর ফাঁকা জায়গা, স্বাধীন দ্বিতীয় storage, Ethernet ও administrative access দেখুন। অনুপস্থিত tool official source থেকে নিয়ে terminal আবার খুলে যাচাই করুন।',
        ],
        [
          win
            ? 'Use PowerShell 7.4+ for native SSH binary redirection. Check OpenSSH Client, curl, tar, SHA-256 and GnuPG; Tftpd64 is a server, while the Windows TFTP Client feature is not. A harmless known-byte capture should pass before a raw backup.'
            : 'Check the installed macOS SSH/SCP, curl, tar and shasum tools, GnuPG and the installed TFTP/launchd service. Use the actual hardware device and network-service names. Windows PowerShell requirements do not apply to macOS.',
          win
            ? 'Native SSH binary redirection-এর জন্য PowerShell 7.4+ নিন। OpenSSH Client, curl, tar, SHA-256 ও GnuPG দেখুন; Tftpd64 server, Windows TFTP Client feature তা নয়। Raw backup-এর আগে নিরীহ known-byte capture পরীক্ষা করুন।'
            : 'macOS-এর SSH/SCP, curl, tar, shasum, GnuPG ও TFTP/launchd service যাচাই করুন। প্রকৃত device ও network-service নাম নিন। macOS-এ Windows PowerShell-এর শর্ত প্রযোজ্য নয়।',
        ],
      ],
    ),
    commands: [
      {
        where: 'computer',
        text: win
          ? 'Get-Command pwsh, ssh, scp, curl.exe, tar.exe | Select-Object Name, Source'
          : 'command -v ssh scp curl tar shasum gpg',
      },
    ],
  });
  help.connect.items.push(
    item(
      ['Keep online help reachable', 'অনলাইন সাহায্যের সংযোগ রাখুন'],
      [
        [
          'Use either a fully prepared offline workflow or independent internet plus direct Ethernet. Record addresses, DNS, sharing/bridge state and default routes first. Verify the router uses Ethernet and internet uses the intended other interface; keep gateway/DNS absent on the isolated management link. Do not change an unrelated adapter.',
          'সম্পূর্ণ প্রস্তুত offline workflow অথবা স্বাধীন internet-এর সঙ্গে direct Ethernet নিন। আগে address, DNS, sharing/bridge ও default route লিখুন। Router যেন Ethernet এবং internet যেন নির্ধারিত অন্য interface ব্যবহার করে তা যাচাই করুন; বিচ্ছিন্ন management link-এ gateway/DNS ফাঁকা রাখুন। অন্য adapter বদলাবেন না।',
        ],
        [
          'Save an offline resume note before a disruptive step: current device state, completed writes, access addresses, backup locations, rollback and next action. Recheck live state when resuming; do not replay a write because a chat or connection ended.',
          'বিচ্ছিন্নতা ঘটতে পারে এমন ধাপের আগে offline resume note রাখুন: বর্তমান অবস্থা, শেষ write, access address, backup location, rollback ও পরের কাজ। ফিরে এসে live state মিলান; chat/connection শেষ হয়েছে বলে write আবার নয়।',
        ],
      ],
    ),
  );
  help.access.items.push(
    item(
      ['What the no-UART path established', 'UART ছাড়া পথটির যাচাইয়ের সীমা'],
      [
        [
          'A Windows first-install workflow verified the HX21-specific community restore on stock V1.0.7, followed by SSH and backups. This is one tested starting build, not a guarantee for another revision. The restore can change settings and authentication. Original web export and post-unlock raw backups are different records; no pre-unlock raw Factory image means untouched Factory bytes cannot be proved.',
          'Windows-এর একটি first-install workflow-তে stock V1.0.7-এ HX21-specific community restore-এর পর SSH ও backup যাচাই হয়েছে। এটি একটি starting build-এর ফল, অন্য revision-এর নিশ্চয়তা নয়। Restore settings ও authentication বদলাতে পারে। Original web export ও post-unlock raw backup আলাদা; pre-unlock raw Factory ছাড়া আগের সব byte অপরিবর্তিত প্রমাণ করা যায় না।',
        ],
        [
          'A Telnet toggle or successful diagnostic API response is not proof of root access. After SSH works, set administrator authentication and test a fresh key-only login after the root password is set. Keep private keys on the computer. Diagnose local config errors separately and preserve distinct stock/recovery/installed known-hosts records.',
          'Telnet toggle বা diagnostic API-এর সফল response root access প্রমাণ নয়। SSH এলে administrator authentication দিন এবং root password দেওয়ার পরে নতুন key-only login পরীক্ষা করুন। Private key কম্পিউটারেই রাখুন। Local config error আলাদা করুন এবং stock/recovery/installed known-hosts আলাদা রাখুন।',
        ],
      ],
    ),
  );
  help.access.problems?.push({
    signal: 'Local SSH configuration parse error',
    action: t(
      'An error naming an invalid keyword or Markdown fence in your local SSH config occurs before router authentication. Use a reviewed task-local config with an explicit host, identity and known-hosts file; keep strict host-key checks. Do not weaken global SSH settings.',
      'Local SSH config-এ ভুল keyword বা Markdown fence-এর error router authentication-এর আগেই হয়। নির্দিষ্ট host, identity ও known-hosts-সহ যাচাইকৃত task-local config নিন; strict host-key check রাখুন। Global SSH settings দুর্বল করবেন না।',
    ),
  });
  help.backup.items.push(
    item(
      [
        'Label the stage and prove independent copies',
        'Backup-এর ধাপ ও স্বাধীন কপি যাচাই করুন',
      ],
      [
        [
          'Before unlock, save the original stock web export privately. After SSH access, validate the actual map and stream raw images with binary stdout isolated from stderr. Require expected bytes and router-before/local/router-after hashes. A partial or changing live image is not a verified backup; these reads are not an atomic snapshot and do not capture separate NAND OOB metadata.',
          'Unlock-এর আগে original stock web export ব্যক্তিগতভাবে রাখুন। SSH-এর পরে actual map মিলিয়ে stderr থেকে binary stdout আলাদা রেখে raw image stream করুন। Expected byte এবং router-before/local/router-after hash মিলতে হবে। Partial বা বদলানো live image verified backup নয়; এগুলো atomic snapshot নয় এবং আলাদা NAND OOB metadata ধরে না।',
        ],
        [
          'Check permissions and cloud sync before saving sensitive files. Copy the complete set to independent physical storage and compare every size/hash; two folders or drive letters alone do not establish independence. Keep calibration, private keys, configuration exports and device-specific backup hashes out of public guide material.',
          'Sensitive file রাখার আগে permission ও cloud sync দেখুন। পুরো set স্বাধীন physical storage-এ কপি করে প্রতিটি size/hash মিলান; শুধু দুই folder বা drive letter স্বাধীনতা প্রমাণ নয়। Calibration, private key, config export ও device-specific backup hash public guide-এ দেবেন না।',
        ],
      ],
    ),
  );
  help.verify.items.push(
    item(
      [
        'Separate file approval from permission to write',
        'ফাইল অনুমোদন ও write-এর অনুমতি আলাদা',
      ],
      [
        [
          'Show a review table containing each filename, role, source URL, release/profile, byte count and expected/actual SHA-256. Authenticate the manifest with a trusted official release key; distinguish the primary key from its signing subkey. A later check authenticated the archived 25.12.5 manifest, but each user must verify the exact files they will use. Community unlock files are outside the OpenWrt signature.',
          'প্রতিটি filename, কাজ, source URL, release/profile, byte count ও expected/actual SHA-256 দিয়ে review table করুন। Trusted official release key দিয়ে manifest authenticate করুন; primary key ও signing subkey আলাদা করুন। পরে archived 25.12.5 manifest authenticate হয়েছে, তবু নিজের ব্যবহারের exact file যাচাই জরুরি। Community unlock file OpenWrt signature-এর আওতায় নয়।',
        ],
        [
          'Reviewing files does not start flashing. Before a bootloader write, test the real router-to-computer TFTP path and verify the received bytes/hash, in addition to local file serving. Remove only any temporary test file/route you created. A TFTP download test does not execute the image or prove a bootloader recovery boot.',
          'File review মানেই flashing শুরু নয়। Bootloader write-এর আগে local serving-এর সঙ্গে প্রকৃত router-to-computer TFTP path-এ download করে byte/hash মিলান। নিজের তৈরি temporary test file/route-টিই সরান। TFTP download image চালায় না বা bootloader recovery boot প্রমাণ করে না।',
        ],
      ],
    ),
  );
  help.flash.items.push(
    item(
      ['Check each irreversible transition', 'প্রতিটি অপরিবর্তনীয় ধাপ আলাদা যাচাই'],
      [
        [
          'After an approved FIP write, compare an image-length readback with the approved file and check protected data. Do not force optional BL2 updates. Before erasing the running stock UBI, establish a reliable RAM-resident erase/reboot path, including required dynamic loader and libraries; copying only executables is insufficient. If that cannot be verified, stop before erasing.',
          'অনুমোদিত FIP write-এর পরে image-length readback approved file-এর সঙ্গে মিলিয়ে protected data দেখুন। Optional BL2 update জোর করে নয়। চলমান stock UBI erase-এর আগে প্রয়োজনীয় dynamic loader/library-সহ নির্ভরযোগ্য RAM-resident erase/reboot পথ যাচাই করুন; শুধু executable কপি যথেষ্ট নয়। নিশ্চিত না হলে erase-এর আগে থামুন।',
        ],
        [
          'Inspect output as well as exit status. Record a write intent before dispatch and inspect uncertain results rather than retrying. Storage readback, TFTP transfer, recovery boot and installed boot are separate checkpoints. Rediscover partition labels/numbers after firmware changes.',
          'Exit status-এর সঙ্গে output দেখুন। Dispatch-এর আগে write intent রাখুন এবং অস্পষ্ট ফল পুনরায় write না করে পরীক্ষা করুন। Storage readback, TFTP transfer, recovery boot ও installed boot আলাদা checkpoint। Firmware বদলের পরে partition label/number নতুন করে দেখুন।',
        ],
      ],
    ),
  );
  help.install.items.push(
    item(
      ['Prove permanent installation', 'স্থায়ী install-এর প্রমাণ দেখুন'],
      [
        [
          'Test the staged sysupgrade image for compatibility using the release-supported test-only command before approving installation. A disconnect or ubus error while upgrading is not an instruction to reflash. Wait for the device to return, then check board/release, boot state, squashfs root and a writable persistent overlay. Preserve recovery access while inspecting ambiguous outcomes.',
          'Install অনুমোদনের আগে staged sysupgrade image release-supported test-only command দিয়ে যাচাই করুন। Upgrade-এর সময় disconnect বা ubus error মানেই reflash নয়। Device ফিরে এলে board/release, boot state, squashfs root ও writable persistent overlay দেখুন। অস্পষ্ট ফল যাচাইয়ের সময় recovery access রাখুন।',
        ],
        [
          'An unauthenticated LuCI response may be HTTP 403 with the login-required header and actual login form. Inspect the response; neither every 403 nor a login page alone proves a healthy installed system. Investigate host-key changes after the firmware transition instead of disabling verification.',
          'Login ছাড়া LuCI response HTTP 403 হতে পারে, সঙ্গে login-required header ও প্রকৃত login form থাকবে। Response দেখুন; সব 403 বা শুধু login page সুস্থ installed system প্রমাণ নয়। Firmware বদলের host-key পরিবর্তন যাচাই করুন, verification বন্ধ নয়।',
        ],
      ],
    ),
  );
  help.finish.items.unshift(
    item(
      ['Choose the actual network role', 'প্রকৃত network role বাছুন'],
      [
        [
          'For a primary router, configure the real ISP protocol/VLAN on WAN and retain the intended firewall/NAT boundary. For a wired access point behind any existing router or switch, first discover that network’s LAN mask, gateway and DHCP pool. A WAN/PPPoE /32 mask is not the LAN mask, and an address outside the DHCP pool is not necessarily unused.',
          'Primary router হলে WAN-এ আসল ISP protocol/VLAN ও প্রয়োজনীয় firewall/NAT রাখুন। Existing router বা switch-এর পেছনে wired AP হলে আগে LAN mask, gateway ও DHCP pool জানুন। WAN/PPPoE-এর /32 LAN mask নয়; DHCP pool-এর বাইরের address-ও ব্যবহৃত হতে পারে।',
        ],
        [
          'For the AP design, use an upstream DHCP management lease with a reservation or a verified conflict-free static address. Keep a tested direct-management fallback where appropriate. Bridge only the intended physical ports and Wi-Fi, disable the AP’s unintended DHCPv4/DHCPv6/RA serving before connecting upstream, and remove routed WAN/NAT only for this role. Use live interface names, not another user’s configuration.',
          'AP-এর জন্য upstream DHCP management lease ও reservation, অথবা conflict-free যাচাইকৃত static address নিন। দরকারমতো পরীক্ষিত direct-management fallback রাখুন। কেবল নির্ধারিত port ও Wi-Fi bridge করুন; upstream লাগানোর আগে AP-এর অনিচ্ছাকৃত DHCPv4/DHCPv6/RA বন্ধ করুন, এবং শুধু এই role-এর জন্য routed WAN/NAT সরান। Live interface নাম নিন, অন্যের configuration নয়।',
        ],
        [
          'Back up configuration and test a detached rollback before applying network changes. Confirm the rollback tools exist and survive SSH closure; acknowledge success only after runtime and management checks. A DHCP reservation confirmed by the owner is different from an independently inspected upstream setting.',
          'Network change-এর আগে config backup ও detached rollback পরীক্ষা করুন। Tool উপস্থিতি ও SSH বন্ধের পরও rollback কাজ করা নিশ্চিত করুন; runtime/management যাচাইয়ের পরেই success জানান। Owner-confirmed DHCP reservation ও নিজে দেখা upstream setting আলাদা প্রমাণ।',
        ],
      ],
    ),
  );
  help.finish.items.push(
    item(
      [
        'Test Wi-Fi, clients and final computer routing',
        'Wi-Fi, client ও শেষ computer route পরীক্ষা',
      ],
      [
        [
          'Use the actual country before selecting channels/widths. If a radio fails, inspect installed regulatory rules and hostapd logs; a default channel may not be allowed. Choose a permitted channel rather than bypassing restrictions. Verify security settings and test both bands with real clients; mark an untested band honestly.',
          'Channel/width-এর আগে প্রকৃত country দিন। Radio না চললে installed regulatory rule ও hostapd log দেখুন; default channel অনুমোদিত নাও হতে পারে। Restriction পাশ না কাটিয়ে অনুমোদিত channel নিন। Security ও প্রকৃত client দিয়ে দুই band পরীক্ষা করুন; না-করা test স্পষ্ট লিখুন।',
        ],
        [
          'Verify upstream DHCP, gateway, DNS, time and HTTPS, then client authorization, addressing and website access. Router-only checks are not client tests. Save final private configuration backups. After restoring computer DHCP/DNS, verify the intended internet route and management address before disconnecting the independent uplink.',
          'Upstream DHCP, gateway, DNS, time ও HTTPS, তারপর client authorization, address ও website access দেখুন। Router-only check client test নয়। Final private config backup রাখুন। Computer DHCP/DNS ফেরানোর পরে স্বাধীন uplink বন্ধের আগে internet route ও management address যাচাই করুন।',
        ],
        [
          win
            ? 'Remove temporary addresses from both active and persistent stores. Check route metrics separately from interface metrics: a temporary high default-route cost may survive automatic interface-metric restoration. Verify normal HTTPS uses the intended source address. Stop only the task’s TFTP process and firewall rule; preserve firmware and backups.'
            : 'Remove only the recorded temporary alias/service changes, restore original TCP/IP, DNS and service order, and verify the real default route. Stop only the task’s TFTP service, preserving any pre-existing service state. Keep firmware and backups.',
          win
            ? 'Active ও persistent store দুটো থেকেই temporary address সরান। Interface metric-এর সঙ্গে route metric-ও দেখুন: automatic interface metric ফেরালেও temporary high default-route cost থেকে যেতে পারে। স্বাভাবিক HTTPS সঠিক source address ব্যবহার করে কি না দেখুন। শুধু task-এর TFTP process/rule সরান; firmware ও backup রাখুন।'
            : 'শুধু নথিভুক্ত temporary alias/service change সরিয়ে আসল TCP/IP, DNS ও service order ফেরান এবং default route দেখুন। আগের service state রক্ষা করে শুধু task-এর TFTP বন্ধ করুন। Firmware ও backup রাখুন।',
        ],
      ],
    ),
  );
  help.finish.references.push({
    label: 'OpenWrt · bridged access point',
    url: 'https://openwrt.org/docs/guide-user/network/wifi/wifiextenders/bridgedap',
  });
  return help;
}
