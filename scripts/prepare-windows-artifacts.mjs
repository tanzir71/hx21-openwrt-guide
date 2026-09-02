import { readFile, writeFile, mkdir, mkdtemp, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve, join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
const root = resolve(import.meta.dirname, '..');
const downloads = join(root, 'public/downloads');
const mac = JSON.parse(
  await readFile(join(downloads, 'artifact-manifest.json'), 'utf8'),
);
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const original = join(downloads, mac.name);
if (hash(await readFile(original)) !== mac.sha256)
  throw new Error('Original public archive hash mismatch.');
const staging = await mkdtemp(join(tmpdir(), 'hx21-windows-kit-'));
const kitName = 'HX21-OpenWrt-Windows-Kit';
const kit = join(staging, kitName);
const manifestFiles = [];
async function include(path, bytes) {
  if (
    /\.(md|txt|ps1|json|asc|sig)$/.test(path) &&
    /\/Users\/|\/home\/|BEGIN (?:OPENSSH|RSA|EC) PRIVATE KEY/.test(
      bytes.toString('utf8'),
    )
  )
    throw new Error(`Private content: ${path}`);
  await mkdir(dirname(join(kit, path)), { recursive: true });
  await writeFile(join(kit, path), bytes);
  manifestFiles.push({ path, bytes: bytes.length, sha256: hash(bytes) });
}
for (const record of mac.files.filter((f) =>
  /^(firmware|sources|tftp|optional-ssh-unlock)\//.test(f.path),
)) {
  const bytes = execFileSync(
    'unzip',
    ['-p', original, 'HX21-OpenWrt-Mac-Kit/' + record.path],
    { maxBuffer: 128 * 1024 * 1024 },
  );
  if (bytes.length !== record.bytes || hash(bytes) !== record.sha256)
    throw new Error('Shared artifact mismatch: ' + record.path);
  await include(record.path, bytes);
}
for (const path of [
  'START-HERE.md',
  'README-BN.md',
  'scripts/Verify-Files.ps1',
  'scripts/Backup-Stock.ps1',
]) {
  await include(path, await readFile(join(root, 'artifacts/windows', path)));
}
await include(
  'DEVICE-WORKSHEET.md',
  Buffer.from(
    '# PRIVATE — fill locally; never upload\n\n- Model/revision:\n- Stock version:\n- Original sticker/WAN/LAN/radio MACs:\n- ISP details stored privately at:\n- Backup before/after SSH unlock:\n- Verified stock map and hashes:\n- Second private backup location:\n- Previous Windows Ethernet/DNS/DHCP settings:\n- Temporary firewall rule to remove:\n- Recovery plan:\n',
  ),
);
manifestFiles.sort((a, b) => a.path.localeCompare(b.path, 'en'));
const name = 'hx21-windows-kit-25.12.5-backup.zip';
const generated = join(staging, name);
execFileSync(
  'zip',
  ['-q', '-X', generated, ...manifestFiles.map((f) => kitName + '/' + f.path)],
  { cwd: staging },
);
const bytes = await readFile(generated);
const manifest = {
  name,
  bytes: bytes.length,
  sha256: hash(bytes),
  prepared: '2026-09-03',
  platform: 'windows',
  sourceArchiveSha256: mac.sha256,
  files: manifestFiles,
};
await cp(generated, join(downloads, name));
await writeFile(
  join(downloads, 'windows-artifact-manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
);
await writeFile(
  join(downloads, name + '.sha256'),
  manifest.sha256 + '  ' + name + '\n',
);
console.log(
  JSON.stringify({
    name,
    bytes: manifest.bytes,
    sha256: manifest.sha256,
    files: manifestFiles.length,
    staging,
  }),
);
