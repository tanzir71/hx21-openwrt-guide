import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

// Optional cross-platform parser/verifier check. This does not simulate Windows
// networking or run the stock-backup helper against any device.
const root = resolve(import.meta.dirname, '..');
const pwsh = process.env.POWERSHELL_BIN || 'pwsh';
const unzip =
  process.env.UNZIP_BIN ||
  (process.platform === 'win32'
    ? resolve(
        process.env.ProgramFiles || 'C:/Program Files',
        'Git/usr/bin/unzip.exe',
      )
    : 'unzip');
const staging = await mkdtemp(join(tmpdir(), 'hx21-powershell-test-'));
execFileSync(unzip, [
  '-q',
  join(root, 'public/downloads/hx21-windows-kit-25.12.5-backup.zip'),
  '-d',
  staging,
]);
const kit = join(staging, 'HX21-OpenWrt-Windows-Kit');
const args = ['-NoLogo', '-NoProfile', '-NonInteractive'];
for (const name of ['Verify-Files.ps1', 'Backup-Stock.ps1']) {
  const file = join(kit, 'scripts', name);
  const parse = spawnSync(
    pwsh,
    [
      ...args,
      '-Command',
      '$tokens = $null; $issues = $null; $null = [System.Management.Automation.Language.Parser]::ParseFile($env:HX21_SCRIPT, [ref]$tokens, [ref]$issues); if ($issues.Count) { $issues | ForEach-Object { Write-Error $_ }; exit 1 }',
    ],
    { encoding: 'utf8', env: { ...process.env, HX21_SCRIPT: file } },
  );
  assert.equal(parse.status, 0, parse.stderr || String(parse.error));
}
function verify(success, message) {
  const result = spawnSync(
    pwsh,
    [...args, '-File', join(kit, 'scripts/Verify-Files.ps1')],
    { encoding: 'utf8' },
  );
  if (success)
    assert.equal(result.status, 0, result.stderr || String(result.error));
  else {
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, message);
  }
}
verify(true);
const firmware = join(
  kit,
  'firmware/openwrt-25.12.5-mediatek-filogic-imou_hx21-preloader.bin',
);
const original = await readFile(firmware);
const altered = Buffer.from(original);
altered[0] ^= 0xff;
await writeFile(firmware, altered);
verify(false, /SHA-256 mismatch/);
await writeFile(firmware, original);
const records = join(kit, 'firmware/SHA256SUMS-HX21.txt');
const checksumText = await readFile(records, 'utf8');
await writeFile(records, '');
verify(false, /exactly four/);
await writeFile(
  records,
  checksumText.trim() + '\n' + checksumText.split('\n')[0] + '\n',
);
verify(false, /duplicate firmware record/);
await writeFile(records, checksumText);
const recovery = join(
  kit,
  'tftp/openwrt-mediatek-filogic-imou_hx21-initramfs-recovery.itb',
);
await writeFile(recovery, 'Not the recovery image');
verify(false, /recovery copy does not match/);
if (process.platform !== 'win32') {
  const result = spawnSync(
    pwsh,
    [
      ...args,
      '-File',
      join(kit, 'scripts/Backup-Stock.ps1'),
      '-Destination',
      join(staging, 'not-created'),
    ],
    { encoding: 'utf8' },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /intended for Windows/);
}
console.log(
  'PASS: PowerShell parser; four real firmware hashes; rejects corrupt firmware, empty/duplicate manifest and mismatched TFTP image. Non-Windows host guard checked when applicable. No router connections made.',
);
