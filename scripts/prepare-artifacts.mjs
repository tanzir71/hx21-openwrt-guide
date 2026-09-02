import {
  readFile,
  writeFile,
  mkdir,
  cp,
  chmod,
  stat,
  readdir,
} from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve, join, dirname } from 'node:path';
const source = process.argv[2];
if (!source)
  throw new Error(
    'Pass the private research kit path. Only the explicit allowlist is copied.',
  );
const root = resolve(import.meta.dirname, '..');
const stamp = '25.12.5';
const target = join(root, 'work', 'public-artifacts', 'HX21-OpenWrt-Mac-Kit');
const files = [
  '00-Open-Guide.command',
  '01-Verify-Files.command',
  '02-Add-Stock-Address.command',
  '03-Backup-Stock.command',
  '04-Start-TFTP.command',
  '05-Stop-TFTP-and-Remove-Alias.command',
  'START-HERE.md',
  'TEST-RESULTS.md',
  'config/ssh-config',
  'config/tftp-template.plist',
  'guides/FLASHING-MAC.md',
  'guides/FIRST-BOOT.md',
  'guides/RECOVERY-AND-TROUBLESHOOTING.md',
  'scripts/add-stock-address.sh',
  'scripts/backup-stock.sh',
  'scripts/common.sh',
  'scripts/download-assets.sh',
  'scripts/start-tftp.sh',
  'scripts/stop-tftp.sh',
  'scripts/test-offline.sh',
  'scripts/validate-stock-layout.awk',
  'scripts/verify-files.sh',
  'sources/EXTRA-FILES-SHA256.txt',
  'sources/PROVENANCE.md',
  'sources/sha256sums',
  'sources/sha256sums.asc',
  'sources/sha256sums.sig',
  'sources/openwrt-build-system-nitrokey3.asc',
  'sources/profiles.json',
  'optional-ssh-unlock/HX21-ssh.bin',
  'optional-ssh-unlock/READ-BEFORE-USING.md',
  'optional-bl2/README.md',
  'optional-bl2/kmod-mtd-rw-6.12.94.2021.02.28~e8776739-r1.apk',
  'firmware/SHA256SUMS-HX21.txt',
  ...[
    'bl31-uboot.fip',
    'preloader.bin',
    'initramfs-recovery.itb',
    'squashfs-sysupgrade.itb',
  ].map((s) => `firmware/openwrt-${stamp}-mediatek-filogic-imou_hx21-${s}`),
  'tftp/openwrt-mediatek-filogic-imou_hx21-initramfs-recovery.itb',
];
// Refuse non-empty staging so no forgotten file can enter a newly built archive.
try {
  if ((await readdir(target)).length)
    throw new Error(
      'Staging already exists. Use its audited archive, or review/remove this exact generated staging before rebuilding.',
    );
} catch (e) {
  if (e.code !== 'ENOENT') throw e;
}
await mkdir(target, { recursive: true });
const binary = /\.(?:bin|itb|fip|apk)$/;
for (const file of files) {
  const dest = join(target, file);
  await mkdir(dirname(dest), { recursive: true });
  if (binary.test(file)) await cp(join(source, file), dest);
  else {
    let text = await readFile(join(source, file), 'utf8');
    text = text
      .replaceAll(resolve(source), '~/Desktop/HX21-OpenWrt-Mac-Kit')
      .replace(
        /Prepared 2 September 2026 for [^\n]+/,
        'Prepared 2 September 2026. Public, portable copy of the Mac research kit.',
      );
    if (/\/Users\/|\/home\//i.test(text))
      throw new Error(`Private path in ${file}`);
    if (file === 'START-HERE.md')
      text =
        '> BACKUP ARCHIVE ONLY. Check https://openwrt.org/toh/imou/hx21 and official repositories for current instructions, images and signatures before use. No device backups or private settings are included.\n\n' +
        text;
    await writeFile(dest, text);
  }
  await chmod(dest, /\.(sh|command)$/.test(file) ? 0o755 : 0o644);
}
// Never read the user's worksheet, state directory, credentials or NAND backups.
await writeFile(
  join(target, 'DEVICE-WORKSHEET.md'),
  '# Private worksheet — fill in locally; never upload\n\n- Model and revision:\n- Stock firmware:\n- Original sticker / WAN / LAN / radio MACs:\n- ISP credentials stored privately at:\n- Backup before or after SSH config restore:\n- Verified backup folder:\n- Second private backup location:\n- Previous Mac network settings:\n- Recovery plan:\n',
);
for (const dir of ['state', 'backups'])
  await mkdir(join(target, dir), { recursive: true, mode: 0o700 });
const packaged = [...files, 'DEVICE-WORKSHEET.md'];
const entries = [];
for (const file of packaged) {
  const data = await readFile(join(target, file));
  entries.push({
    path: file,
    bytes: data.length,
    sha256: createHash('sha256').update(data).digest('hex'),
  });
}
const out = join(root, 'public', 'downloads');
await mkdir(out, { recursive: true });
const name = 'hx21-mac-kit-25.12.5-backup.zip';
// Explicit file arguments, no recursive archive of the source directory.
execFileSync(
  '/usr/bin/zip',
  [
    '-X',
    '-q',
    join(out, name),
    ...packaged.map((p) => 'HX21-OpenWrt-Mac-Kit/' + p),
  ],
  { cwd: dirname(target) },
);
execFileSync('/usr/bin/unzip', ['-t', join(out, name)], { stdio: 'pipe' });
const data = await readFile(join(out, name));
const manifest = {
  name,
  version: stamp,
  reviewed: '2026-09-02',
  purpose: 'Backup only. Use current official repositories first.',
  containsPrivateDeviceData: false,
  signatureVerification:
    'Image SHA-256 matched official HTTPS records; GPG signatures were NOT verified.',
  bytes: (await stat(join(out, name))).size,
  sha256: createHash('sha256').update(data).digest('hex'),
  files: entries,
};
await writeFile(
  join(out, 'artifact-manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
);
await writeFile(
  join(out, name + '.sha256'),
  manifest.sha256 + '  ' + name + '\n',
);
console.log(
  JSON.stringify({
    name: manifest.name,
    bytes: manifest.bytes,
    sha256: manifest.sha256,
    files: entries.length,
  }),
);
