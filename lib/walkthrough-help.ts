import type { Locale, Platform } from './locale';
import { sources } from './content';

export type HowToItem = {
  title: string;
  body: string[];
  commands?: { where: 'computer' | 'router'; text: string }[];
  expected?: string;
  caution?: string;
};
export type HowTo = {
  intro: string;
  items: HowToItem[];
  problems?: { signal: string; action: string }[];
  references: { label: string; url: string }[];
};

export function walkthroughHelp(
  locale: Locale,
  platform: Platform,
): Record<string, HowTo> {
  const bn = locale === 'bn';
  const win = platform === 'windows';
  const t = (en: string, bangla: string) => (bn ? bangla : en);
  const pc = (text: string) => ({ where: 'computer' as const, text });
  const router = (text: string) => ({ where: 'router' as const, text });
  const device = { label: 'OpenWrt · HX21', url: sources.device };
  const sshReference = {
    label: 'OpenSSH · remote login',
    url: 'https://man.openbsd.org/ssh',
  };
  const macFolder = 'cd ~/Desktop/HX21-OpenWrt-Mac-Kit';

  return {
    identify: {
      intro: t(
        'Start here if you have never used a command window. Download tools and save these instructions before disconnecting your internet.',
        'আগে কমান্ড উইন্ডো ব্যবহার না করলে এখান থেকে শুরু করুন। ইন্টারনেট বিচ্ছিন্ন করার আগেই টুল ডাউনলোড ও নির্দেশনা সংরক্ষণ করুন।',
      ),
      items: [
        {
          title: t(
            'Save the device information privately',
            'ডিভাইসের তথ্য ব্যক্তিগতভাবে রাখুন',
          ),
          body: [
            t(
              'Photograph the bottom label. Write the exact model/revision and printed MAC addresses in DEVICE-WORKSHEET.md. In the stock web interface, record its firmware version and your WAN/ISP settings. A web configuration export is useful, but it is not a Factory/flash backup.',
              'নিচের লেবেলের ছবি তুলুন। DEVICE-WORKSHEET.md-তে সঠিক মডেল/রিভিশন ও ছাপা MAC লিখুন। স্টক ওয়েব ইন্টারফেস থেকে firmware version এবং WAN/ISP সেটিংস নোট করুন। ওয়েব কনফিগ export উপকারী, কিন্তু এটি Factory/flash ব্যাকআপ নয়।',
            ),
          ],
          caution: t(
            'If the model differs, or the router already runs OpenWrt/ImmortalWrt, do not follow this stock first-install path.',
            'মডেল আলাদা হলে বা আগে থেকেই OpenWrt/ImmortalWrt থাকলে এই স্টক থেকে প্রথম ইনস্টলের পথ অনুসরণ করবেন না।',
          ),
        },
        {
          title: t(
            'Extract the kit and open the right command window',
            'কিট extract করে সঠিক কমান্ড উইন্ডো খুলুন',
          ),
          body: win
            ? [
                t(
                  'Download the Windows kit below. In File Explorer, right-click the ZIP → Extract All. Open the extracted HX21-OpenWrt-Windows-Kit folder; you should see scripts, firmware and tftp.',
                  'নিচ থেকে Windows কিট নামান। File Explorer-এ ZIP-এ right-click → Extract All। HX21-OpenWrt-Windows-Kit ফোল্ডার খুলুন; scripts, firmware ও tftp থাকা চাই।',
                ),
                t(
                  'Install Microsoft PowerShell 7.4 or newer while still online. Open Start → PowerShell 7. In File Explorer copy the kit folder path; in PowerShell type Set-Location, a space, then paste that path inside single quotes and press Enter. Do not run scripts from inside the ZIP.',
                  'অনলাইনে থাকতেই Microsoft PowerShell 7.4 বা নতুন সংস্করণ নিন। Start → PowerShell 7 খুলুন। File Explorer থেকে কিট ফোল্ডারের path কপি করে PowerShell-এ Set-Location, একটি space, তারপর single quote-এর মধ্যে path বসিয়ে Enter দিন। ZIP-এর ভেতর থেকে script চালাবেন না।',
                ),
              ]
            : [
                t(
                  'Download the macOS kit below and double-click the ZIP in Finder. The kit expects the extracted folder to be named HX21-OpenWrt-Mac-Kit on your Desktop because its SSH configuration uses that location. Never replace or merge an existing kit: it may contain your private backups and saved host keys.',
                  'নিচ থেকে macOS কিট নামিয়ে Finder-এ ZIP double-click করুন। ফোল্ডারের নাম HX21-OpenWrt-Mac-Kit দিয়ে Desktop-এ রাখুন—কিটের SSH config ওই অবস্থান ব্যবহার করে। আগে থেকে কিট থাকলে replace/merge করবেন না; তাতে ব্যক্তিগত ব্যাকআপ ও host key থাকতে পারে।',
                ),
                t(
                  'Press Command–Space, type Terminal and press Return. Paste the command below, then Return. cd means “work inside this folder”; ~ means your home folder. Stop if you see “No such file or directory”.',
                  'Command–Space চাপুন, Terminal লিখে Return দিন। নিচের কমান্ড পেস্ট করে Return দিন। cd মানে “এই ফোল্ডারে কাজ করুন”; ~ মানে আপনার home folder। “No such file or directory” এলে থামুন।',
                ),
              ],
          commands: win
            ? [pc('$PSVersionTable.PSVersion'), pc('Get-Command ssh.exe')]
            : [pc(macFolder)],
          expected: win
            ? t(
                'PowerShell reports 7.4 or newer, and ssh.exe is found. If not, install the missing prerequisite before isolating the network.',
                'PowerShell 7.4 বা নতুন সংস্করণ দেখায় এবং ssh.exe পাওয়া যায়। না হলে নেটওয়ার্ক বিচ্ছিন্ন করার আগেই প্রয়োজনীয় টুল নিন।',
              )
            : t(
                'Terminal is in the kit folder. You can also double-click the numbered .command helpers in Finder after reading what each one does.',
                'Terminal এখন কিট ফোল্ডারে। প্রতিটি helper কী করে পড়ে নিয়ে Finder থেকে নম্বরযুক্ত .command ফাইলও double-click করতে পারেন।',
              ),
          caution: t(
            'A computer administrator password prompt is not the router password. Password typing may show no characters or dots; that is normal. Review blocked scripts; do not disable Gatekeeper, execution policies or other protections globally.',
            'কম্পিউটারের administrator password আর রাউটারের password এক নয়। টাইপের সময় অক্ষর বা ডট না-ও দেখা যেতে পারে—এটি স্বাভাবিক। Blocked script আগে পড়ুন; Gatekeeper, execution policy বা অন্য সুরক্ষা পুরো বন্ধ করবেন না।',
          ),
        },
        ...(win
          ? [
              {
                title: t(
                  'Install only the SSH client if it is missing',
                  'না থাকলে শুধু SSH client ইনস্টল করুন',
                ),
                body: [
                  t(
                    'Open Start and search “Optional features”. Choose View features / Add a feature, search OpenSSH Client, select it and install. Reopen PowerShell 7 and run Get-Command ssh.exe again. This requires internet; a managed PC may need your administrator. You do not need OpenSSH Server on the PC.',
                    'Start থেকে “Optional features” খুঁজুন। View features / Add a feature-এ OpenSSH Client খুঁজে install করুন। PowerShell 7 আবার খুলে Get-Command ssh.exe দিন। ইন্টারনেট লাগবে; managed PC-তে administrator লাগতে পারে। PC-তে OpenSSH Server দরকার নেই।',
                  ),
                ],
              },
            ]
          : []),
      ],
      references: [
        device,
        ...(win
          ? [
              { label: 'Microsoft · PowerShell', url: sources.powershell },
              { label: 'Microsoft · OpenSSH', url: sources.windowsSsh },
            ]
          : []),
      ],
    },
    connect: {
      intro: t(
        'An alias is just a second IP address on the same Ethernet adapter. /24 means subnet mask 255.255.255.0. It does not change the router’s MAC address or flash anything.',
        'Alias মানে একই Ethernet adapter-এ দ্বিতীয় IP address। /24 মানে subnet mask 255.255.255.0। এতে রাউটারের MAC বদলায় না বা কিছু flash হয় না।',
      ),
      items: [
        {
          title: t(
            'Connect and isolate the router',
            'রাউটার লাগিয়ে অন্য সংযোগ বিচ্ছিন্ন করুন',
          ),
          body: [
            t(
              'Plug your Ethernet adapter into the computer and connect its cable to an HX21 port labeled LAN. Leave router power on, unplug WAN, and turn off computer Wi-Fi and VPN. Disable Internet Sharing / Internet Connection Sharing if it was enabled. Losing normal internet here is expected; keep an offline copy of the guide.',
              'Ethernet adapter কম্পিউটারে লাগিয়ে তারটি HX21-এর LAN লেখা পোর্টে দিন। রাউটারের বিদ্যুৎ চালু রাখুন, WAN খুলুন এবং কম্পিউটারের Wi-Fi/VPN বন্ধ করুন। Internet Sharing / Internet Connection Sharing চালু থাকলে বন্ধ করুন। এই সময় স্বাভাবিক ইন্টারনেট না থাকা প্রত্যাশিত; গাইডের offline কপি রাখুন।',
            ),
          ],
          expected: t(
            'The Ethernet connection is physically active and there is only one router on this isolated cable.',
            'Ethernet link চালু এবং এই বিচ্ছিন্ন তারে শুধু আপনার রাউটার রয়েছে।',
          ),
        },
        {
          title: t(
            'Set the primary Ethernet address',
            'Ethernet-এর প্রধান IP দিন',
          ),
          body: win
            ? [
                t(
                  'Press Windows–R, type ncpa.cpl and Enter. Find your wired adapter—not Wi-Fi. If unsure, unplug/replug the cable and observe which adapter changes between connected and disconnected. Right-click that adapter → Properties → Internet Protocol Version 4 (TCP/IPv4) → Properties.',
                  'Windows–R চেপে ncpa.cpl লিখে Enter দিন। Wi-Fi নয়, তারযুক্ত adapter বাছুন। নিশ্চিত না হলে তার খুলে/লাগিয়ে কোন adapter-এর connected/disconnected অবস্থা বদলায় দেখুন। সেটিতে right-click → Properties → Internet Protocol Version 4 (TCP/IPv4) → Properties।',
                ),
                t(
                  'Photograph the current IP and DNS settings first. Select “Use the following IP address”: IP 192.168.1.254; subnet mask 255.255.255.0. Leave default gateway blank. This isolated link needs no DNS; record any old manual DNS values before clearing them.',
                  'আগের IP ও DNS সেটিংসের ছবি নিন। “Use the following IP address”: IP 192.168.1.254; subnet mask 255.255.255.0 দিন। Default gateway ফাঁকা রাখুন। এই বিচ্ছিন্ন লিংকে DNS লাগে না; আগের manual DNS মুছলে আগে নোট করুন।',
                ),
              ]
            : [
                t(
                  'Apple menu → System Settings → Network → your wired Ethernet connection → Details → TCP/IP. Photograph its existing settings. Choose Configure IPv4: Manually. Enter IP address 192.168.1.254, subnet mask 255.255.255.0 and router 192.168.1.1, then OK / Apply. Do not edit the Wi-Fi service. DNS is not needed for this isolated link.',
                  'Apple menu → System Settings → Network → তারযুক্ত Ethernet → Details → TCP/IP। আগের সেটিংসের ছবি নিন। Configure IPv4: Manually দিয়ে IP address 192.168.1.254, subnet mask 255.255.255.0 এবং router 192.168.1.1 দিন; OK / Apply করুন। Wi-Fi service বদলাবেন না। এই বিচ্ছিন্ন লিংকে DNS লাগে না।',
                ),
              ],
          caution: t(
            '192.168.1.254 is the computer. 192.168.10.1 is the stock router; 192.168.1.1 is the OpenWrt router. Never assign either router address to the computer.',
            '192.168.1.254 কম্পিউটার। 192.168.10.1 স্টক রাউটার; 192.168.1.1 OpenWrt রাউটার। রাউটারের ঠিকানা কম্পিউটারে দেবেন না।',
          ),
        },
        {
          title: t(
            'Add the second address for stock access',
            'স্টকে ঢোকার জন্য দ্বিতীয় ঠিকানা যোগ করুন',
          ),
          body: win
            ? [
                t(
                  'Still in IPv4 Properties, click Advanced. Under IP addresses click Add: IP address 192.168.10.2 and subnet mask 255.255.255.0. Click Add, then OK through the dialogs. The list should contain both 192.168.1.254 and 192.168.10.2, not two separate adapters.',
                  'IPv4 Properties থেকেই Advanced চাপুন। IP addresses-এর Add-এ IP address 192.168.10.2 এবং subnet mask 255.255.255.0 দিন। Add, তারপর dialog-গুলোতে OK দিন। একই adapter-এর তালিকায় 192.168.1.254 ও 192.168.10.2 দুটিই থাকবে।',
                ),
              ]
            : [
                t(
                  'Recommended: in the extracted kit, double-click 02-Add-Stock-Address.command, or use the Terminal command below. The helper locates the wired adapter that has 192.168.1.254, rejects Wi-Fi/ambiguous adapters and asks you to type ADD. Then enter your Mac administrator password when sudo asks. No password characters appear.',
                  'সহজ পথ: extract করা কিটে 02-Add-Stock-Address.command double-click করুন, অথবা নিচের Terminal কমান্ড দিন। Helper 192.168.1.254-সহ তারযুক্ত adapter খুঁজবে, Wi-Fi/অস্পষ্ট adapter হলে থামবে, এবং ADD লিখতে বলবে। sudo চাইলে Mac administrator password দিন; অক্ষর দেখা যাবে না।',
                ),
                t(
                  'If it says the address already exists, do not add it again. Inspect the adapter and continue only when both addresses are correct. The alias is temporary; after reboot/reconnecting the adapter, check it again.',
                  'ঠিকানাটি আগে থেকেই আছে বললে আবার যোগ করবেন না। Adapter পরীক্ষা করে দুটি ঠিকানা সঠিক হলেই এগোন। Alias অস্থায়ী; Mac reboot বা adapter reconnect করলে আবার পরীক্ষা করুন।',
                ),
              ],
          commands: win
            ? undefined
            : [pc(macFolder + ' && /bin/bash scripts/add-stock-address.sh')],
          expected: t(
            'The same Ethernet adapter now has 192.168.1.254 and 192.168.10.2.',
            'একই Ethernet adapter-এ এখন 192.168.1.254 ও 192.168.10.2 আছে।',
          ),
        },
        {
          title: t(
            'Check the addresses and stock connection',
            'ঠিকানা ও স্টক সংযোগ পরীক্ষা করুন',
          ),
          body: win
            ? [
                t(
                  'Run ipconfig and locate that Ethernet adapter. It should list both IPv4 addresses. Open http://192.168.10.1 in your browser. A stock login page confirms that the web service is reachable, not that SSH is enabled.',
                  'ipconfig চালিয়ে ওই Ethernet adapter দেখুন; দুটি IPv4 ঠিকানা থাকবে। Browser-এ http://192.168.10.1 খুলুন। স্টকের login page মানে web service পাওয়া যাচ্ছে—SSH চালু আছে, এমন নয়।',
                ),
              ]
            : [
                t(
                  'Run networksetup -listallhardwareports. Match the Hardware Port for your USB/Thunderbolt Ethernet adapter and read its Device line, for example en7. Do not assume en0 is Ethernet. Run ifconfig followed by your actual device name. Look for both inet addresses and status: active.',
                  'networksetup -listallhardwareports চালান। USB/Thunderbolt Ethernet-এর Hardware Port মিলিয়ে Device লাইনটি পড়ুন—যেমন en7। en0 মানেই Ethernet ধরে নেবেন না। ifconfig-এর পরে আপনার প্রকৃত device নাম দিন। দুটি inet ঠিকানা ও status: active খুঁজুন।',
                ),
                t(
                  'Example only: if YOUR device is en7, inspect it with ifconfig en7. The manual equivalent of the alias helper is sudo ifconfig en7 alias 192.168.10.2 netmask 255.255.255.0. Replace en7 with the verified wired device, and use either the helper or the manual method—not both.',
                  'শুধু উদাহরণ: আপনার device en7 হলে ifconfig en7 দিয়ে দেখুন। Alias helper-এর manual সমতুল্য হলো sudo ifconfig en7 alias 192.168.10.2 netmask 255.255.255.0। en7-এর জায়গায় যাচাইকৃত তারযুক্ত device দিন; helper ও manual দুটো পদ্ধতিই একসঙ্গে নয়।',
                ),
              ],
          commands: [
            pc(win ? 'ipconfig' : 'networksetup -listallhardwareports'),
            pc(win ? 'ping -n 4 192.168.10.1' : 'ping -c 4 192.168.10.1'),
          ],
          expected: t(
            'Try http://192.168.10.1 in your browser too. Ping replies show reachability; missing replies alone are inconclusive because a device may ignore ping.',
            'Browser-এ http://192.168.10.1-ও খুলুন। Ping reply মানে পৌঁছানো যাচ্ছে; reply না দিলেই নিশ্চিত বিচ্ছিন্ন বলা যায় না, কারণ ডিভাইস ping উপেক্ষা করতে পারে।',
          ),
          caution: t(
            'If the stock address was changed from 192.168.10.1, stop: these kit helpers are pinned to that address. Do not guess a new target or flash another device.',
            'স্টকের IP 192.168.10.1 থেকে বদলানো থাকলে থামুন: কিটের helper ওই ঠিকানায় নির্ধারিত। নতুন target অনুমান করবেন না বা অন্য ডিভাইসে flash করবেন না।',
          ),
        },
      ],
      references: [
        device,
        ...(win
          ? []
          : [
              {
                label: 'Apple · manual Ethernet IP',
                url: 'https://support.apple.com/guide/mac-help/mchlp2718/mac',
              },
            ]),
      ],
    },
    access: {
      intro: t(
        'SSH opens a command session on the router. Testing it does not unlock SSH, restore a configuration or flash firmware.',
        'SSH দিয়ে রাউটারে কমান্ড session খোলা হয়। পরীক্ষা করলে SSH unlock, কনফিগ restore বা firmware flash হয় না।',
      ),
      items: [
        {
          title: t(
            'Try one normal stock SSH connection',
            'স্টকে একবার স্বাভাবিক SSH connection চেষ্টা করুন',
          ),
          body: [
            t(
              'In your computer’s Terminal / PowerShell, run the command below after the wired setup. root is the router’s administrative username; the address is the stock router. Do not put sudo before ssh, and do not enter your Mac/Windows login password at a router password prompt.',
              'তারযুক্ত সেটআপের পরে কম্পিউটারের Terminal / PowerShell-এ নিচের কমান্ড দিন। root রাউটারের administrator username; ঠিকানাটি স্টক রাউটারের। ssh-এর আগে sudo দেবেন না; রাউটারের password prompt-এ Mac/Windows login password দেবেন না।',
            ),
          ],
          commands: [pc('ssh -o ConnectTimeout=5 root@192.168.10.1')],
          expected: t(
            'A first-connection authenticity question, a router password prompt or a router shell means the SSH server answered. Read the next item before accepting a key or logging in.',
            'প্রথম connection-এর authenticity প্রশ্ন, রাউটারের password prompt অথবা router shell এলে SSH server উত্তর দিয়েছে। Key গ্রহণ বা login করার আগে পরের অংশ পড়ুন।',
          ),
        },
        {
          title: t(
            'Understand the key and password prompts',
            'Key ও password prompt বুঝুন',
          ),
          body: [
            t(
              'On first contact SSH may show “Are you sure you want to continue connecting?” and a SHA256 fingerprint. Compare it with any trusted record. With no prior fingerprint, this is trust on first use—not independent identity proof. Confirm the direct isolated cable and correct router before typing yes; stop if uncertain. Save the accepted fingerprint privately.',
              'প্রথমবার SSH “Are you sure you want to continue connecting?” ও SHA256 fingerprint দেখাতে পারে। বিশ্বস্ত আগের রেকর্ড থাকলে মিলিয়ে নিন। আগের fingerprint না থাকলে এটি প্রথমবার বিশ্বাস করা—স্বতন্ত্র পরিচয়-প্রমাণ নয়। সরাসরি বিচ্ছিন্ন তার ও সঠিক রাউটার নিশ্চিত করে তবেই yes দিন; সন্দেহ হলে থামুন। Fingerprint ব্যক্তিগতভাবে রাখুন।',
            ),
            t(
              'Use an already-known root password if one is set. The web-admin password is not automatically the SSH password. Do not guess passwords repeatedly. Only AFTER deliberately applying the specific community HX21-ssh.bin configuration: its author reports an empty SSH password (press Enter if prompted) and web password 12345678. That is not a claim about untouched stock firmware.',
              'Root password আগে থেকে সেট থাকলে জানা password ব্যবহার করুন। Web-admin password মানেই SSH password নয়। বারবার অনুমান করবেন না। শুধু নির্দিষ্ট community HX21-ssh.bin config জেনেশুনে প্রয়োগ করার পর: লেখক ফাঁকা SSH password (চাইলে Enter) ও web password 12345678 বলেছেন। এটি untouched stock firmware-এর দাবি নয়।',
            ),
            ...(win
              ? []
              : [
                  t(
                    'The Mac backup kit keeps a separate host-key file and can ask again; compare with your saved fingerprint.',
                    'Mac backup kit আলাদা host-key file রাখে, তাই আবার প্রশ্ন করতে পারে; সংরক্ষিত fingerprint-এর সঙ্গে মিলান।',
                  ),
                ]),
            t(
              'Never disable host-key verification or delete all known_hosts entries to get past a warning.',
              'Warning এড়াতে host-key verification বন্ধ বা সব known_hosts entry মুছবেন না।',
            ),
          ],
        },
        {
          title: t(
            'Read something harmless, then leave the router',
            'ক্ষতিহীন একটি তথ্য পড়ে রাউটার থেকে বের হন',
          ),
          body: [
            t(
              'After login you should get the router’s command prompt, often ending in #. Type cat /proc/mtd to display its flash partition map. This is read-only. Then type exit to return to the computer before using local backup/TFTP helpers. Do not paste prompt symbols such as $ or #.',
              'Login হলে রাউটারের command prompt পাবেন, প্রায়ই শেষে # থাকে। Flash partition map দেখতে cat /proc/mtd দিন—এটি শুধু পড়ে। তারপর exit দিয়ে কম্পিউটারে ফিরে local backup/TFTP helper চালান। $ বা #-এর মতো prompt চিহ্ন পেস্ট করবেন না।',
            ),
          ],
          commands: [router('cat /proc/mtd'), router('exit')],
          expected: t(
            'A dev/size/erasesize/name table appears. Its presence does not prove model compatibility; the next backup step must validate the actual stock map.',
            'dev/size/erasesize/name-এর টেবিল আসে। শুধু টেবিল এলেই মডেল মিলে গেছে নয়; পরের backup ধাপে প্রকৃত stock map যাচাই করতে হবে।',
          ),
        },
        {
          title: t(
            'If SSH is closed, choose consciously—not automatically',
            'SSH বন্ধ থাকলে বুঝে পথ বাছুন—স্বয়ংক্রিয়ভাবে নয়',
          ),
          body: [
            t(
              'A refused connection is not permission to upload firmware. Read optional-ssh-unlock/READ-BEFORE-USING.md and the linked author instructions. If you choose that risk, first record MACs and export the stock web configuration; upload HX21-ssh.bin only through Restore Configuration, not Firmware Upgrade. Wait for the documented restart, then repeat the SSH test. Your later flash backup is now post-unlock.',
              'Connection refused মানে firmware upload করার অনুমতি নয়। optional-ssh-unlock/READ-BEFORE-USING.md এবং লেখকের নির্দেশনা পড়ুন। ঝুঁকি বুঝে ওই পথ নিলে আগে MAC লিখুন ও stock web config export করুন; HX21-ssh.bin শুধু Restore Configuration-এ দিন, Firmware Upgrade-এ নয়। নথিভুক্ত restart শেষে আবার SSH পরীক্ষা করুন। পরের flash backup হবে post-unlock।',
            ),
          ],
          caution: t(
            'The community restore has a reported MAC/Factory-data risk. If untouched Factory preservation matters, pause for device-specific UART help before using it. UART needs confirmed 3.3 V pads and wiring; this guide does not supply an unverified pinout.',
            'Community restore-এর MAC/Factory-data ঝুঁকির রিপোর্ট আছে। Untouched Factory রাখা জরুরি হলে ব্যবহারের আগে device-specific UART সাহায্য নিন। UART-এর 3.3 V pad ও wiring নিশ্চিত হতে হবে; এখানে অযাচাইকৃত pinout দেওয়া হচ্ছে না।',
          ),
        },
      ],
      problems: [
        {
          signal: 'Connection refused',
          action: t(
            'No SSH service accepted the connection at that address/port, or it was actively rejected. Confirm the stock web page and cable; then review the access choices above. Repeating the command will not enable SSH.',
            'ওই address/port-এ SSH service connection নেয়নি বা সক্রিয়ভাবে reject হয়েছে। Stock web page ও তার নিশ্চিত করে উপরের access পথ পড়ুন। একই কমান্ড বারবার দিলে SSH চালু হবে না।',
          ),
        },
        {
          signal: 'Operation timed out / No route to host',
          action: t(
            'Check router power, LAN cable, both computer addresses, disabled VPN/Wi-Fi and the real stock LAN IP. This is not yet evidence that an SSH unlock is needed.',
            'রাউটারের power, LAN cable, কম্পিউটারের দুই IP, বন্ধ VPN/Wi-Fi এবং আসল stock LAN IP দেখুন। শুধু এই error দেখে SSH unlock দরকার বলা যায় না।',
          ),
        },
        {
          signal: 'Permission denied',
          action: t(
            'SSH answered but rejected authentication. Check the username and the credential appropriate to this firmware. Stop repeated password guesses; it is not an IP-alias fix.',
            'SSH উত্তর দিয়েছে কিন্তু authentication গ্রহণ করেনি। এই firmware-এর username ও সঠিক credential দেখুন। Password অনুমান বন্ধ করুন; এটি IP alias ঠিক করার বিষয় নয়।',
          ),
        },
        {
          signal:
            'REMOTE HOST IDENTIFICATION HAS CHANGED / no matching host key type',
          action: t(
            'Stop and keep the full message. Confirm device/stage identity before any narrowly scoped host-key or legacy-algorithm adjustment. Do not disable checking globally.',
            'থামুন ও পুরো message রাখুন। Host-key বা legacy-algorithm-এর সীমিত পরিবর্তনের আগে ডিভাইস/পর্যায়ের পরিচয় নিশ্চিত করুন। পুরো verification বন্ধ করবেন না।',
          ),
        },
      ],
      references: [
        sshReference,
        { label: 'SSH config author · password scope', url: sources.unlock },
        device,
      ],
    },
    backup: {
      intro: t(
        'A backup is a private copy of this router’s unique data. The public ZIP contains firmware and helpers—not your original Factory data.',
        'ব্যাকআপ হলো এই রাউটারের নিজস্ব ডেটার ব্যক্তিগত কপি। Public ZIP-এ firmware ও helper আছে—আপনার আসল Factory data নেই।',
      ),
      items: [
        {
          title: t(
            'Run the read-only stock backup from your computer',
            'কম্পিউটার থেকে read-only stock backup চালান',
          ),
          body: win
            ? [
                t(
                  'Exit the router shell. In PowerShell 7.4+, work inside the extracted Windows kit. In the example command, replace D:\\HX21-private-backup-NEW with a NEW private folder on a real drive you have. Do not pre-create that folder. Read the printed map and type HX21 STOCK BACKUP only after verifying the supported stock router.',
                  'Router shell থেকে exit করুন। PowerShell 7.4+-এ extract করা Windows কিটের ভেতরে থাকুন। উদাহরণের D:\\HX21-private-backup-NEW-এর জায়গায় আপনার আসল drive-এ নতুন ব্যক্তিগত ফোল্ডার দিন; আগে থেকে ফোল্ডারটি বানাবেন না। ছাপা map পড়ে supported stock router নিশ্চিত করেই HX21 STOCK BACKUP লিখুন।',
                ),
              ]
            : [
                t(
                  'Exit the router shell. In Finder, double-click 03-Backup-Stock.command, or use the local command below. Type BACKUP only after checking the isolated device is your stock HX21. Verify any SSH host-key prompt and enter the router credential if needed. This helper does not unlock SSH or write firmware.',
                  'Router shell থেকে exit করুন। Finder-এ 03-Backup-Stock.command double-click করুন বা নিচের local কমান্ড দিন। বিচ্ছিন্ন ডিভাইসটি আপনার stock HX21 নিশ্চিত করেই BACKUP লিখুন। SSH host-key prompt যাচাই ও দরকার হলে রাউটারের credential দিন। Helper SSH unlock বা firmware write করে না।',
                ),
              ],
          commands: [
            pc(
              win
                ? "pwsh -File .\\scripts\\Backup-Stock.ps1 -Destination 'D:\\HX21-private-backup-NEW'"
                : macFolder + ' && /bin/bash scripts/backup-stock.sh',
            ),
          ],
          expected: win
            ? t(
                'Six verified .bin files and SHA256SUMS.txt in the chosen folder, no .part files, and the final “Full set verified” message. Local and before/after router hashes must match.',
                'বাছা ফোল্ডারে ছয়টি verified .bin ও SHA256SUMS.txt, কোনো .part নয়, এবং শেষে “Full set verified”। Local ও router-এর আগে/পরের hash মিলতে হবে।',
              )
            : t(
                'The helper prints a new backups/stock-… folder. Require BACKUP-COMPLETE.txt and all six “SIZE + READBACK MATCH” results in validation.txt; the helper also saves SHA256SUMS.txt.',
                'Helper নতুন backups/stock-… ফোল্ডারের নাম দেখায়। BACKUP-COMPLETE.txt এবং validation.txt-এ ছয়টি “SIZE + READBACK MATCH” চাই; SHA256SUMS.txt-ও সংরক্ষিত হয়।',
              ),
          caution: t(
            'STOP on an unexpected map, incomplete file, read error or hash mismatch. Do not rename a partial file to make it look complete. Never stream binary backups with old Windows PowerShell or combine stderr with stdout.',
            'অপ্রত্যাশিত map, অসম্পূর্ণ file, read error বা hash অমিলে থামুন। Partial file-এর নাম বদলে complete সাজাবেন না। পুরোনো Windows PowerShell দিয়ে binary backup বা stderr/stdout একত্র করবেন না।',
          ),
        },
        {
          title: t(
            'Make and verify the second private copy',
            'দ্বিতীয় ব্যক্তিগত কপি তৈরি ও যাচাই করুন',
          ),
          body: [
            t(
              'Copy the ENTIRE completed backup folder to a separate private drive using Finder/File Explorer. Open a command window in that second folder and verify the hashes below. Save the worksheet with it, and check iCloud/OneDrive sync before storing secrets there. Do not upload stock or Factory backups to GitHub, Facebook or this site.',
              'Finder/File Explorer দিয়ে সম্পূর্ণ backup ফোল্ডার আলাদা ব্যক্তিগত drive-এ কপি করুন। দ্বিতীয় ফোল্ডারে command window খুলে নিচের hash পরীক্ষা করুন। Worksheet সঙ্গে রাখুন; গোপন তথ্য রাখার আগে iCloud/OneDrive sync দেখুন। Stock বা Factory backup GitHub, Facebook বা এই সাইটে upload করবেন না।',
            ),
          ],
          commands: win
            ? [
                pc(
                  'Get-ChildItem -File *.bin | Get-FileHash -Algorithm SHA256 | Format-List Path, Hash',
                ),
                pc('Get-Content .\\SHA256SUMS.txt'),
              ]
            : [pc('shasum -a 256 -c SHA256SUMS.txt')],
          expected: win
            ? t(
                'For each copied .bin, run Get-FileHash with -Algorithm SHA256 and compare its full value to the same filename in SHA256SUMS.txt. All six must match.',
                'প্রতিটি কপি করা .bin-এ Get-FileHash -Algorithm SHA256 দিয়ে পূর্ণ hash একই filename-এর SHA256SUMS.txt রেকর্ডের সঙ্গে মিলান। ছয়টিই মিলতে হবে।',
              )
            : t(
                'Every .bin says OK in the SECOND location. A second folder on the same drive is not a second storage device.',
                'দ্বিতীয় অবস্থানে প্রতিটি .bin-এর পাশে OK আসে। একই drive-এ দ্বিতীয় ফোল্ডার আলাদা storage device নয়।',
              ),
        },
      ],
      references: [
        device,
        ...(win
          ? [
              {
                label: 'Microsoft · binary redirection',
                url: sources.binaryStreams,
              },
            ]
          : []),
      ],
    },
    verify: {
      intro: t(
        'TFTP is a small file server the new bootloader contacts for recovery. Set it up before any bootloader write, not after a failure.',
        'TFTP ছোট file server, যেখান থেকে নতুন bootloader recovery নেয়। Bootloader লেখার আগেই তৈরি করুন—ব্যর্থতার পরে নয়।',
      ),
      items: [
        {
          title: t(
            'Check the dated kit files',
            'কিটের নির্দিষ্ট সংস্করণের ফাইল যাচাই করুন',
          ),
          body: [
            t(
              'The download card shows this ZIP’s SHA-256 and the OS-specific command for calculating it. Match all 64 characters before extraction. Inside the extracted kit, run the verification helper below. This checks the bundled 25.12.5 set, not a different or newer release you added yourself.',
              'Download card-এ ZIP-এর SHA-256 এবং OS অনুযায়ী হিসাবের কমান্ড আছে। Extract করার আগে পুরো ৬৪ অক্ষর মিলান। Extract করা কিটে নিচের verification helper চালান। এটি bundled 25.12.5 set পরীক্ষা করে, নিজের যোগ করা অন্য বা নতুন release নয়।',
            ),
          ],
          commands: [
            pc(
              win
                ? 'pwsh -File .\\scripts\\Verify-Files.ps1'
                : macFolder + ' && /bin/bash scripts/verify-files.sh',
            ),
          ],
          expected: t(
            'All four firmware checks pass, and the renamed TFTP recovery copy matches. Any mismatch means stop and redownload from the verified source—not edit the expected hash.',
            'চারটি firmware check পাস এবং নতুন নামে রাখা TFTP recovery একই থাকে। অমিল হলে থামুন ও যাচাইকৃত উৎস থেকে আবার নামান—expected hash বদলাবেন না।',
          ),
          caution: t(
            'A hash match is not publisher-signature verification. The kit’s detached signatures have not been authenticated by us. Follow the linked OpenWrt signature guide and its trusted-key instructions; a displayed “good signature” with an unverified key is insufficient. If you cannot complete that check, pause before writes.',
            'Hash মেলা মানেই publisher signature যাচাই নয়। কিটের detached signature আমরা authenticate করিনি। OpenWrt signature guide ও trusted-key নির্দেশনা অনুসরণ করুন; অযাচাইকৃত key-এর “good signature” যথেষ্ট নয়। যাচাই করতে না পারলে লেখার আগে থামুন।',
          ),
        },
        {
          title: t(
            'Start the recovery file server',
            'Recovery file server চালু করুন',
          ),
          body: win
            ? [
                t(
                  'Download Tftpd64 from its official repository while online. In Settings → GLOBAL, enable TFTP Server only; leave DHCP/DNS and other unused servers off. In the main window, set Current Directory to the kit’s tftp folder and Server interfaces to 192.168.1.254. Never serve your backup folder.',
                  'অনলাইনে থাকতেই official repository থেকে Tftpd64 নিন। Settings → GLOBAL-এ শুধু TFTP Server চালু রাখুন; DHCP/DNS ও অব্যবহৃত server বন্ধ। মূল window-তে Current Directory কিটের tftp ফোল্ডার এবং Server interfaces 192.168.1.254 দিন। Backup ফোল্ডার serve করবেন না।',
                ),
                t(
                  'In its TFTP Client tab, choose Host 192.168.1.254, Port 69, Remote File exactly as shown beside this step, and a NEW local file in a scratch folder. Choose binary/octet mode if offered, then Get. Compare that downloaded file’s SHA-256 with the source recovery image. Keep the server open.',
                  'TFTP Client tab-এ Host 192.168.1.254, Port 69, Remote File এই ধাপের পাশে দেখানো হুবহু নাম, এবং scratch ফোল্ডারে নতুন local filename দিন। Binary/octet mode থাকলে বাছুন, তারপর Get। নামানো file-এর SHA-256 source recovery-এর সঙ্গে মিলান। Server খোলা রাখুন।',
                ),
              ]
            : [
                t(
                  'Double-click 04-Start-TFTP.command in Finder, or run the command below. Type START at its confirmation, then enter the Mac administrator password for sudo. The helper serves only a verified public recovery copy, refuses to replace an existing TFTP service and tests a local transfer. Leave the service running through recovery; closing the helper window after success does not stop it.',
                  'Finder-এ 04-Start-TFTP.command double-click করুন বা নিচের কমান্ড দিন। Confirmation-এ START, তারপর sudo-তে Mac administrator password দিন। Helper শুধু verified public recovery copy serve করে, আগের TFTP service বদলায় না এবং local transfer পরীক্ষা করে। Recovery জুড়ে service চালু রাখুন; সফলতার পর helper window বন্ধ করলেই service বন্ধ হয় না।',
                ),
              ],
          commands: win
            ? undefined
            : [pc(macFolder + ' && /bin/bash scripts/start-tftp.sh')],
          expected: win
            ? t(
                'The local TFTP GET completes and its full hash matches the recovery file. Watch the log when the router later requests the file.',
                'Local TFTP GET শেষ হয় এবং পূর্ণ hash recovery file-এর সঙ্গে মেলে। পরে রাউটার file চাইলে log দেখুন।',
              )
            : t(
                '“TFTP STARTED; local byte-for-byte transfer test PASSED.” Keep the computer awake, powered and wired.',
                '“TFTP STARTED; local byte-for-byte transfer test PASSED.” কম্পিউটার জাগ্রত, বিদ্যুৎযুক্ত ও তারে লাগানো রাখুন।',
              ),
          caution: t(
            'A local test does not prove the router can reach the server. Keep the firewall enabled. If it blocks TFTP, diagnose the specific app/interface rule; do not turn off protection globally. If recovery readiness is uncertain, do not write the bootloader.',
            'Local test মানে রাউটার server-এ পৌঁছাবে এমন নয়। Firewall চালু রাখুন। TFTP আটকালেই নির্দিষ্ট app/interface rule পরীক্ষা করুন; সুরক্ষা পুরো বন্ধ নয়। Recovery প্রস্তুতি নিশ্চিত না হলে bootloader লিখবেন না।',
          ),
        },
      ],
      references: [
        {
          label: 'OpenWrt · verify publisher signatures',
          url: sources.signatures,
        },
        { label: 'OpenWrt · Firmware Selector', url: sources.selector },
        ...(win
          ? [{ label: 'Tftpd64 · official project', url: sources.tftpd64 }]
          : []),
      ],
    },
    flash: {
      intro: t(
        'This is the handoff to model-specific flash instructions, not a one-click installer. A checklist tick is not permission to run an unexplained write.',
        'এখান থেকে মডেল-নির্দিষ্ট flash নির্দেশনা দরকার—এটি one-click installer নয়। Checklist tick মানেই না-বোঝা write চালানোর অনুমতি নয়।',
      ),
      items: [
        {
          title: t(
            'Keep the two command locations separate',
            'দুটি কমান্ডের অবস্থান আলাদা রাখুন',
          ),
          body: [
            t(
              'Open the current official HX21 installation section using the button below. SCP upload commands run on the COMPUTER; they copy files to /tmp in router RAM. Flash commands run inside the ROUTER SSH shell. Read filenames and target labels such as FIP/BL2 from the actual output; never substitute guessed mtd numbers.',
              'নিচের বোতামে current official HX21 installation অংশ খুলুন। SCP upload কমান্ড কম্পিউটারে চলে; router RAM-এর /tmp-এ file কপি করে। Flash কমান্ড চলে রাউটারের SSH shell-এ। আসল output থেকে filename ও FIP/BL2 label মিলান; অনুমান করা mtd নম্বর বসাবেন না।',
            ),
          ],
          expected: t(
            'You can explain which machine each next command acts on, which file it uses, what it overwrites and what success must look like. If not, stop for help before running it.',
            'পরের প্রতিটি কমান্ড কোন মেশিনে কাজ করে, কোন file ব্যবহার করে, কী overwrite করে ও সফলতা কেমন—বুঝিয়ে বলতে পারেন। না পারলে চালানোর আগে সাহায্য নিন।',
          ),
        },
        {
          title: t(
            'Run one reviewed action, then check its result',
            'একটি বোঝা কাজ চালিয়ে ফল পরীক্ষা করুন',
          ),
          body: [
            t(
              'Before any write, require verified private backups in two places, verified images/signatures, the correct stock map, stable power and prepared TFTP. Follow the official order, one command at a time. Do not paste a whole guide or copy the entire Terminal transcript as commands.',
              'লেখার আগে দুই জায়গায় verified private backup, verified image/signature, সঠিক stock map, স্থিতিশীল power ও প্রস্তুত TFTP চাই। Official ক্রমে একবারে একটি কমান্ড দিন। পুরো guide বা Terminal transcript কমান্ড হিসেবে পেস্ট করবেন না।',
            ),
          ],
          caution: t(
            'On a partial write, I/O error or ambiguous result, keep power on and preserve the output; do not add force flags, erase again or reboot casually. If the official page is unavailable or you cannot distinguish its documented BL2 exception from an error, pause at this boundary.',
            'Partial write, I/O error বা অস্পষ্ট ফল এলে power চালু ও output সংরক্ষণ করুন; force flag, আবার erase বা হঠাৎ reboot নয়। Official page না পেলে বা documented BL2 exception ও error আলাদা করতে না পারলে এখানেই থামুন।',
          ),
        },
      ],
      references: [
        device,
        { label: 'OpenWrt · bootloader source', url: sources.uboot },
      ],
    },
    install: {
      intro: t(
        'A recovery session is temporary. First identify it, then use the official permanent-install procedure; seeing a login page alone is not proof of a completed install.',
        'Recovery session অস্থায়ী। আগে পরিচয় যাচাই, তারপর official permanent-install পদ্ধতি; শুধু login page মানে install শেষ নয়।',
      ),
      items: [
        {
          title: t(
            'Connect to recovery and read its identity',
            'Recovery-তে ঢুকে পরিচয় পড়ুন',
          ),
          body: [
            t(
              'Only after the preceding official recovery stage has completed, connect from your computer to 192.168.1.1. This is a different firmware stage, so the SSH identity may differ from stock. Verify it rather than suppressing a host-key warning. Once logged in, run the router command in the NEXT item.',
              'আগের official recovery ধাপ শেষ হলেই কম্পিউটার থেকে 192.168.1.1-এ ঢুকুন। Firmware-এর পর্যায় আলাদা, তাই SSH identity স্টকের চেয়ে আলাদা হতে পারে। Warning চাপা না দিয়ে যাচাই করুন। Login হলে পরের অংশের router কমান্ড দিন।',
            ),
          ],
          commands: [
            pc(
              win
                ? 'ssh -o ConnectTimeout=5 root@192.168.1.1'
                : macFolder + ' && ssh -F config/ssh-config hx21-recovery',
            ),
          ],
        },
        {
          title: t(
            'Verify the board before selecting an image',
            'Image বাছার আগে board যাচাই করুন',
          ),
          body: [
            t(
              'These commands only read information. Look for board_name imou,hx21 and the expected OpenWrt release. Read the boot environment; if you cannot tell whether this is recovery, stop and ask with the non-secret output.',
              'এই কমান্ডগুলো শুধু তথ্য পড়ে। board_name imou,hx21 এবং প্রত্যাশিত OpenWrt release চাই। Boot environment দেখুন; recovery কি না বুঝতে না পারলে থামুন ও গোপন তথ্য বাদ দিয়ে output নিয়ে সাহায্য নিন।',
            ),
          ],
          commands: [
            router('ubus call system board'),
            router('cat /proc/mtd'),
            router('mount'),
          ],
          expected: t(
            'The board matches HX21 and the session matches the recovery image you deliberately booted. Exit returns you to the computer for an SCP upload.',
            'Board HX21 এবং session আপনার জেনেশুনে boot করা recovery image-এর সঙ্গে মেলে। SCP upload করতে exit দিয়ে কম্পিউটারে ফিরুন।',
          ),
        },
        {
          title: t(
            'Know what the compatibility check does',
            'Compatibility check কী করে বুঝুন',
          ),
          body: [
            t(
              'Follow the official instructions to upload the matching sysupgrade image, compare its router-side SHA-256 with the verified local file and run its compatibility test. The -T option to sysupgrade tests the image; -n performs a clean install when used in the install command; -F bypasses checks and must not be used here. Do not swap the recovery image for sysupgrade.',
              'Official নির্দেশনায় matching sysupgrade image upload, router-side SHA-256 ও verified local file মিলিয়ে compatibility test করুন। sysupgrade-এর -T image পরীক্ষা করে; install command-এ -n clean install করে; -F check এড়ায়—এখানে ব্যবহার নয়। Recovery image-কে sysupgrade-এর বদলে দেবেন না।',
            ),
          ],
          caution: t(
            'Only proceed to the separate permanent-write command after every check passes. During an actual firmware write, keep power and the cable connected even when SSH disconnects. Do not keep retrying install commands.',
            'সব check পাস করলেই আলাদা permanent-write কমান্ডে যান। আসল firmware write-এর সময় SSH বিচ্ছিন্ন হলেও power ও তার লাগানো রাখুন। Install কমান্ড বারবার চালাবেন না।',
          ),
        },
      ],
      references: [device],
    },
    finish: {
      intro: t(
        'Finish the router checks first, then undo only the temporary computer settings you changed.',
        'আগে রাউটারের পরীক্ষা শেষ করুন, তারপর শুধু নিজের বদলানো অস্থায়ী computer settings ফেরত দিন।',
      ),
      items: [
        {
          title: t(
            'Set the router password and basic services',
            'রাউটারের password ও প্রাথমিক service ঠিক করুন',
          ),
          body: [
            t(
              'After the documented installed-system reboot, open http://192.168.1.1. In LuCI use System → Administration to set a strong root password, or run passwd in the INSTALLED router’s SSH shell. Network → Interfaces configures WAN using your ISP’s real details; Network → Wireless configures the real country, two radios, SSIDs and Wi-Fi passwords. Do not publish those credentials.',
              'নথিভুক্ত installed-system reboot শেষে http://192.168.1.1 খুলুন। LuCI-তে System → Administration-এ শক্ত root password দিন, অথবা installed router-এর SSH shell-এ passwd চালান। Network → Interfaces-এ ISP-এর আসল তথ্য দিয়ে WAN এবং Network → Wireless-এ প্রকৃত দেশ, দুই radio, SSID ও Wi-Fi password দিন। Credential প্রকাশ করবেন না।',
            ),
          ],
          expected: t(
            'The expected board/release, LAN address allocation, internet access and both Wi-Fi bands work. Compare MACs with your saved worksheet; use the linked MAC guide only if needed.',
            'প্রত্যাশিত board/release, LAN address দেওয়া, internet ও দুই Wi-Fi band কাজ করে। Worksheet-এর MAC মিলান; দরকার হলেই linked MAC guide দেখুন।',
          ),
        },
        {
          title: t(
            'Stop TFTP and restore computer networking',
            'TFTP বন্ধ করে কম্পিউটারের network ফেরত দিন',
          ),
          body: win
            ? [
                t(
                  'Close Tftpd64 and remove only a temporary firewall rule you personally added for it. Return to Windows–R → ncpa.cpl → the same Ethernet adapter → IPv4 Properties. Restore the recorded settings. If it originally used DHCP, select “Obtain an IP address automatically” and “Obtain DNS server address automatically”; remove the temporary advanced addresses. If it was manual, restore its exact previous values instead.',
                  'Tftpd64 বন্ধ এবং নিজে যোগ করা অস্থায়ী firewall rule-টিই সরান। Windows–R → ncpa.cpl → একই Ethernet → IPv4 Properties-এ আগের settings ফেরত দিন। আগে DHCP হলে “Obtain an IP address automatically” ও “Obtain DNS server address automatically” দিন; অস্থায়ী Advanced address সরান। আগে manual হলে আগের নির্দিষ্ট মানই ফেরত দিন।',
                ),
              ]
            : [
                t(
                  'Once installation is complete and no write/recovery transfer is running, double-click 05-Stop-TFTP-and-Remove-Alias.command or run the command below. Read the prompt and type STOP. It stops only the kit’s TFTP service and removes only its recorded stock alias. In System Settings → Network → Ethernet → Details → TCP/IP, restore your saved settings—usually Using DHCP. Restore previous DNS too.',
                  'Install শেষ এবং কোনো write/recovery transfer না চললে 05-Stop-TFTP-and-Remove-Alias.command double-click করুন বা নিচের কমান্ড দিন। Prompt পড়ে STOP লিখুন। এটি শুধু কিটের TFTP ও তার নথিভুক্ত alias সরায়। System Settings → Network → Ethernet → Details → TCP/IP-এ আগের settings—সাধারণত Using DHCP—ফেরত দিন। আগের DNS-ও ফেরত দিন।',
                ),
                t(
                  'If you used the manual alias method, the helper has no record of it. For the verified example device en7 only, sudo ifconfig en7 -alias 192.168.10.2 removes that temporary address. Substitute the correct wired device; do not remove another address.',
                  'Manual alias পদ্ধতি নিলে helper-এর কাছে তার record নেই। শুধু যাচাইকৃত উদাহরণ en7 device-এর জন্য sudo ifconfig en7 -alias 192.168.10.2 ওই অস্থায়ী ঠিকানা সরায়। সঠিক তারযুক্ত device দিন; অন্য ঠিকানা সরাবেন না।',
                ),
              ],
          commands: win
            ? undefined
            : [pc(macFolder + ' && /bin/bash scripts/stop-tftp.sh')],
          expected: t(
            'After the official install has fully finished, confirm one normal boot with TFTP OFF. Restore Wi-Fi/VPN as needed and test normal connectivity. Never perform this reboot to escape a flash-write error.',
            'Official install পুরো শেষ হলে TFTP বন্ধ রেখেই একবার স্বাভাবিক boot নিশ্চিত করুন। দরকারমতো Wi-Fi/VPN ফেরত দিয়ে স্বাভাবিক সংযোগ পরীক্ষা করুন। Flash-write error এড়াতে এই reboot করবেন না।',
          ),
        },
        {
          title: t(
            'Save the new OpenWrt configuration separately',
            'নতুন OpenWrt config আলাদা করে রাখুন',
          ),
          body: [
            t(
              'In LuCI, System → Backup / Flash Firmware → Generate archive saves the current OpenWrt settings. Keep this privately in a clearly labeled folder separate from the stock NAND/Factory backups. It is a configuration backup, not a replacement for those stock dumps.',
              'LuCI-তে System → Backup / Flash Firmware → Generate archive বর্তমান OpenWrt settings সংরক্ষণ করে। Stock NAND/Factory backup থেকে আলাদা নামযুক্ত ব্যক্তিগত ফোল্ডারে রাখুন। এটি config backup, stock dump-এর বিকল্প নয়।',
            ),
          ],
        },
      ],
      references: [device],
    },
  };
}
