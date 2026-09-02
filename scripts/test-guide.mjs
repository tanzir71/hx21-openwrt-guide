import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import ts from 'typescript';
const root = resolve(import.meta.dirname, '..');
async function moduleUrl(file) {
  const source = await readFile(file, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  let output = outputText;
  for (const match of outputText.matchAll(/from ['"](\.\.?\/[^'"]+)['"]/g)) {
    const dependency = await moduleUrl(
      resolve(dirname(file), match[1] + '.ts'),
    );
    output = output.replace(match[0], `from '${dependency}'`);
  }
  return (
    'data:text/javascript;base64,' + Buffer.from(output).toString('base64')
  );
}
async function loadTs(file) {
  return import(await moduleUrl(resolve(root, file)));
}
const { chooseLocale, guidePath, languageCookie, isLocale } =
  await loadTs('lib/locale.ts');
assert.equal(chooseLocale(null, 'BD'), 'bn');
assert.equal(chooseLocale(null, ' bd '), 'bn');
assert.equal(chooseLocale(null, 'US'), 'en');
assert.equal(chooseLocale(null, null), 'en');
assert.equal(chooseLocale('en', 'BD'), 'en');
assert.equal(chooseLocale('bn', 'US'), 'bn');
assert.equal(chooseLocale('bad', 'BD'), 'bn');
assert.equal(isLocale('fr'), false);
assert.equal(guidePath('bn', 'steps'), '/bn/steps');
assert.equal(guidePath('bn', 'steps', 'windows'), '/bn/windows/steps');
assert.equal(guidePath('en', 'findings', 'windows'), '/en/windows');
assert.equal(guidePath('en', 'findings', 'mac'), '/en');
assert.match(
  languageCookie('en', true),
  /Max-Age=31536000; SameSite=Lax; Secure$/,
);
assert.doesNotMatch(languageCookie('bn', false), /Secure/);
const { findings, artifacts, ui } = await loadTs('lib/content.ts');
const { steps, faqs } = await loadTs('lib/steps.ts');
const { walkthroughHelp } = await loadTs('lib/walkthrough-help.ts');
const { terminology, stepTerms, findingTerms } =
  await loadTs('lib/terminology.ts');
for (const [id, term] of Object.entries(terminology)) {
  assert.deepEqual(Object.keys(term).sort(), ['bn', 'en']);
  assert.ok(term.en.name && term.bn.name && term.en.meaning.length > 80, id);
  assert.match(term.bn.meaning, /[\u0980-\u09ff]/, id);
}
for (const groups of [stepTerms, findingTerms])
  for (const ids of Object.values(groups)) {
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(ids.every((id) => terminology[id]));
  }
assert.equal(stepTerms.verify[0], 'tftp');
assert.match(terminology.tftp.en.meaning, /Trivial File Transfer Protocol/);
assert.match(terminology.tftp.en.meaning, /computer.*HX21/);
assert.match(terminology.recovery.en.meaning, /may still modify flash/);
assert.match(terminology.signature.en.meaning, /remain unverified/);
const { platformFindings, platformSteps, platformUi } = await loadTs(
  'lib/platform-content.ts',
);
for (const locale of ['en', 'bn']) {
  assert.equal(findings[locale].length, 9);
  assert.equal(steps[locale].length, 8);
  assert.equal(faqs[locale].length, 5);
  assert.equal(new Set(findings[locale].map((f) => f.id)).size, 9);
  assert.deepEqual(Object.keys(ui[locale]).sort(), Object.keys(ui.en).sort());
  for (const step of steps[locale]) {
    assert.ok(step.checklist.length >= 3);
    assert.ok(step.checkpoint.length > 30);
  }
  for (const platform of ['mac', 'windows']) {
    const help = walkthroughHelp(locale, platform);
    assert.ok(
      platformFindings(locale, platform).every(
        (f) => findingTerms[f.id]?.length,
      ),
    );
    assert.deepEqual(
      Object.keys(stepTerms),
      steps[locale].map((step) => step.id),
    );
    assert.deepEqual(
      Object.keys(help),
      steps[locale].map((step) => step.id),
    );
    for (const [id, detail] of Object.entries(help)) {
      assert.ok(detail.intro.length > 50 && detail.items.length >= 2, id);
      assert.ok(detail.references.length > 0, id);
      for (const item of detail.items) {
        assert.ok(
          item.title && item.body.length && item.body.every(Boolean),
          id,
        );
        for (const command of item.commands ?? []) {
          assert.ok(['computer', 'router'].includes(command.where), id);
          assert.ok(command.text && !command.text.includes('\n'), id);
          assert.doesNotMatch(
            command.text,
            /mtd\s+write|dd\s+of=|sysupgrade\s|StrictHostKeyChecking=no/,
            id,
          );
          if (platform === 'windows')
            assert.doesNotMatch(
              command.text,
              /\/bin\/bash|shasum|networksetup/,
            );
          else assert.doesNotMatch(command.text, /\.ps1|Get-FileHash|ipconfig/);
        }
      }
    }
    assert.equal(help.access.problems.length, 4);
    assert.ok(
      help.access.items.some((item) =>
        item.commands?.some(
          (command) =>
            command.where === 'computer' &&
            command.text === 'ssh -o ConnectTimeout=5 root@192.168.10.1',
        ),
      ),
    );
    assert.ok(
      help.access.items.some((item) =>
        item.commands?.some(
          (command) => command.where === 'router' && command.text === 'exit',
        ),
      ),
    );
    assert.match(JSON.stringify(help.connect), /255\.255\.255\.0/);
    assert.match(
      JSON.stringify(help.connect),
      platform === 'mac' ? /add-stock-address\.sh/ : /ncpa\.cpl/,
    );
    assert.equal(platformFindings(locale, platform).length, 9);
    assert.equal(platformSteps(locale, platform).length, 8);
    assert.equal(
      new Set(platformFindings(locale, platform).map((f) => f.id)).size,
      9,
    );
    assert.ok(
      platformFindings(locale, platform).some((f) => f.id === platform),
    );
    assert.deepEqual(
      Object.keys(platformUi(locale, platform)).sort(),
      Object.keys(ui.en).sort(),
    );
    for (const step of platformSteps(locale, platform)) {
      assert.ok(
        step.checklist.length >= 3 && step.checklist.every(Boolean),
        step.id,
      );
      assert.ok(step.checkpoint.length > 30);
    }
    if (platform === 'windows')
      assert.doesNotMatch(
        JSON.stringify(platformSteps(locale, platform)),
        /\bMac\b|ম্যাক/,
      );
  }
}
const manifest = JSON.parse(
  await readFile(
    resolve(root, 'public/downloads/artifact-manifest.json'),
    'utf8',
  ),
);
const zipPath = resolve(root, 'public/downloads', manifest.name);
const zip = await readFile(zipPath);
const hash = (data) => createHash('sha256').update(data).digest('hex');
assert.equal(zip.length, manifest.bytes);
assert.equal(hash(zip), manifest.sha256);
execFileSync('/usr/bin/unzip', ['-t', zipPath], { stdio: 'pipe' });
const names = execFileSync('/usr/bin/unzip', ['-Z1', zipPath], {
  encoding: 'utf8',
})
  .trim()
  .split('\n');
assert.deepEqual(
  names.slice().sort(),
  manifest.files.map((f) => 'HX21-OpenWrt-Mac-Kit/' + f.path).sort(),
);
assert.ok(
  !names.some(
    (name) =>
      name.includes('..') ||
      name.startsWith('/') ||
      /\/(state|backups)\/.+/.test(name),
  ),
);
for (const file of manifest.files) {
  const data = execFileSync(
    '/usr/bin/unzip',
    ['-p', zipPath, 'HX21-OpenWrt-Mac-Kit/' + file.path],
    { maxBuffer: 128 * 1024 * 1024 },
  );
  assert.equal(data.length, file.bytes, file.path);
  assert.equal(hash(data), file.sha256, file.path);
  if (!/\.(bin|itb|fip|apk)$/.test(file.path))
    assert.doesNotMatch(
      data.toString('utf8'),
      /\/Users\/|\/home\/|BEGIN (?:OPENSSH|RSA|EC) PRIVATE KEY/,
      file.path,
    );
  if (/\.(sh|command)$/.test(file.path))
    execFileSync('/bin/bash', ['-n'], {
      input: data,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
}
for (const artifact of artifacts) {
  const file = manifest.files.find(
    (f) =>
      f.path ===
      'firmware/openwrt-25.12.5-mediatek-filogic-imou_hx21-' + artifact.suffix,
  );
  assert.ok(file);
  assert.equal(file.bytes, artifact.size);
  assert.equal(file.sha256, artifact.hash);
}
const windowsManifest = JSON.parse(
  await readFile(
    resolve(root, 'public/downloads/windows-artifact-manifest.json'),
    'utf8',
  ),
);
const windowsZip = resolve(root, 'public/downloads', windowsManifest.name);
const windowsBytes = await readFile(windowsZip);
assert.equal(windowsBytes.length, windowsManifest.bytes);
assert.equal(hash(windowsBytes), windowsManifest.sha256);
assert.equal(windowsManifest.sourceArchiveSha256, manifest.sha256);
const shared = manifest.files.filter((f) =>
  /^(firmware|sources|tftp|optional-ssh-unlock)\//.test(f.path),
);
const windowsOnly = [
  'START-HERE.md',
  'README-BN.md',
  'DEVICE-WORKSHEET.md',
  'scripts/Verify-Files.ps1',
  'scripts/Backup-Stock.ps1',
];
assert.equal(windowsManifest.files.length, 20);
assert.deepEqual(
  windowsManifest.files
    .map((f) => f.path)
    .sort((a, b) => a.localeCompare(b, 'en')),
  [...shared.map((f) => f.path), ...windowsOnly].sort((a, b) =>
    a.localeCompare(b, 'en'),
  ),
);
execFileSync('/usr/bin/unzip', ['-t', windowsZip], { stdio: 'pipe' });
assert.deepEqual(
  execFileSync('/usr/bin/unzip', ['-Z1', windowsZip], { encoding: 'utf8' })
    .trim()
    .split('\n')
    .sort(),
  windowsManifest.files.map((f) => 'HX21-OpenWrt-Windows-Kit/' + f.path).sort(),
);
for (const file of windowsManifest.files) {
  const data = execFileSync(
    '/usr/bin/unzip',
    ['-p', windowsZip, 'HX21-OpenWrt-Windows-Kit/' + file.path],
    { maxBuffer: 128 * 1024 * 1024 },
  );
  assert.equal(data.length, file.bytes, file.path);
  assert.equal(hash(data), file.sha256, file.path);
  const original = shared.find((f) => f.path === file.path);
  if (original) assert.equal(file.sha256, original.sha256, file.path);
  if (!/\.(bin|itb|fip|apk)$/.test(file.path))
    assert.doesNotMatch(
      data.toString(),
      /\/Users\/|\/home\/|BEGIN (?:OPENSSH|RSA|EC) PRIVATE KEY/,
      file.path,
    );
  if (windowsOnly.includes(file.path) && file.path !== 'DEVICE-WORKSHEET.md')
    assert.deepEqual(
      data,
      await readFile(resolve(root, 'artifacts/windows', file.path)),
      file.path,
    );
  if (file.path.endsWith('.ps1')) {
    const script = data.toString();
    assert.match(script, /^#Requires -Version 7\.4/);
    const commands = script
      .split('\n')
      .filter((line) => !line.trim().startsWith('#'))
      .join('\n');
    assert.doesNotMatch(
      commands,
      /2>&1|Out-File|StrictHostKeyChecking=no|(?:^|[\s'"])sysupgrade(?:[\s'"]|$)|mtd\s+write|dd\s+of=/im,
    );
  }
}
for (const name of ['prepare', 'backup', 'verify', 'finish'])
  assert.ok(
    (await readFile(resolve(root, 'public/illustrations', name + '.webp')))
      .length > 1000,
  );
assert.ok((await readFile(resolve(root, 'public/favicon.ico'))).length > 100);
const font = await readFile(resolve(root, 'app/fonts/BalooDa2-Variable.ttf'));
assert.equal(
  createHash('sha1')
    .update(Buffer.from('blob ' + font.length + '\0'))
    .update(font)
    .digest('hex'),
  '2a4e952b1c9d98dd814f22b919f36742df446ce8',
);
console.log(
  'PASS: locale/OS routing and translation parity; 9 findings / 8 steps per language and OS; artwork/font/favicon; exact 40-file macOS and 20-file Windows archives, hashes, shared-image parity, privacy and helper source checks.',
);
if (process.env.TEST_BASE_URL) {
  const base = process.env.TEST_BASE_URL;
  for (const [headers, expected] of [
    [{}, '/en'],
    [{ 'x-vercel-ip-country': 'BD' }, '/bn'],
    [{ 'x-vercel-ip-country': 'BD', cookie: 'hx21-language-v1=en' }, '/en'],
    [{ 'x-vercel-ip-country': 'US', cookie: 'hx21-language-v1=bn' }, '/bn'],
  ]) {
    const response = await fetch(base + '/', { headers, redirect: 'manual' });
    assert.equal(response.status, 307);
    assert.equal(
      new URL(response.headers.get('location'), base).pathname,
      expected,
    );
    assert.match(response.headers.get('cache-control'), /private, no-store/);
    assert.match(response.headers.get('vary'), /Cookie/);
  }
  for (const locale of ['en', 'bn'])
    for (const platform of ['mac', 'windows'])
      for (const view of ['findings', 'steps']) {
        const path = guidePath(locale, view, platform),
          response = await fetch(base + path, {
            headers: {
              'x-vercel-ip-country': locale === 'en' ? 'BD' : 'US',
              cookie: 'hx21-language-v1=' + (locale === 'en' ? 'bn' : 'en'),
            },
          });
        assert.equal(response.status, 200, path);
        assert.equal(new URL(response.url).pathname, path);
        const html = await response.text();
        assert.match(html, new RegExp('<html lang="' + locale + '"'));
        assert.ok(html.includes(ui[locale].title));
        for (const language of ['en', 'bn'])
          assert.ok(
            html.includes('href="' + guidePath(language, view, platform) + '"'),
            path + ' language link',
          );
        for (const os of ['mac', 'windows'])
          assert.ok(
            html.includes('href="' + guidePath(locale, view, os) + '"'),
            path + ' OS link',
          );
        const selected = [...html.matchAll(/<a[^>]+>/g)]
          .map((m) => m[0])
          .find((a) => a.includes('platform-active'));
        assert.ok(selected?.includes('href="' + path + '"'));
        assert.ok(selected.includes('aria-current="page"'));
        assert.ok(html.includes('href="https://tanziro.com/"'));
        assert.ok(html.includes('rel="author"'));
        assert.ok(html.includes('id="terms-download"'));
        assert.ok(
          html.includes(
            locale === 'bn'
              ? 'এই অংশের শব্দগুলো সহজ ভাষায়'
              : 'What these terms mean here',
          ),
        );
        assert.ok(
          html.indexOf('class="platform-bar"') < html.indexOf('<main>'),
        );
        assert.ok(html.includes('rel="canonical"'));
        assert.ok(
          html.includes('hrefLang="en"') ||
            html.includes('hrefLang="en-US"') ||
            html.includes('hreflang="en"'),
        );
        assert.ok(html.includes('application/ld+json'));
        assert.ok(html.includes('property="og:image"'));
        assert.ok(html.includes('name="twitter:card"'));
        assert.ok(html.includes('/favicon.svg'));
        if (view === 'findings') {
          assert.ok(html.includes('id="mac-fix"'));
          assert.ok(html.includes('0x4'));
          assert.ok(html.includes('id="terms-mac-fix"'));
          assert.ok(html.includes('data-term="uci"'));
          for (const finding of platformFindings(locale, platform))
            assert.ok(html.includes('id="terms-finding-' + finding.id + '"'));
        } else
          assert.ok(
            html.includes(guidePath(locale, 'findings', platform) + '#mac-fix'),
          );
        if (locale === 'bn' && view === 'steps') {
          const styles = [
            ...html.matchAll(
              /<link[^>]+href="([^"]+\.css(?:\?[^"]*)?)"[^>]*>/g,
            ),
          ].map((match) => match[1].replaceAll('&amp;', '&'));
          assert.ok(styles.length);
          const sheets = await Promise.all(
            styles.map(
              async (path) => await (await fetch(new URL(path, base))).text(),
            ),
          );
          assert.ok(sheets.some((css) => css.includes('--font-baloo-da-2')));
          const fontUrls = sheets.flatMap((css, index) =>
            [...css.matchAll(/url\(["']?([^"')]+\.ttf)["']?\)/g)].map(
              (match) => new URL(match[1], new URL(styles[index], base)),
            ),
          );
          assert.ok(fontUrls.length);
          assert.equal((await fetch(fontUrls[0])).status, 200);
        }
        const selectedManifest =
          platform === 'windows' ? windowsManifest : manifest;
        assert.ok(html.includes(selectedManifest.name));
        assert.ok(html.includes(selectedManifest.sha256));
        assert.ok(
          !html.includes(
            platform === 'windows' ? manifest.name : windowsManifest.name,
          ),
        );
        if (platform === 'windows') {
          assert.ok(html.includes('Get-FileHash'));
          assert.doesNotMatch(html, /shasum -a 256/);
          if (view === 'steps') {
            assert.ok(html.includes('Backup-Stock.ps1'));
            assert.ok(html.includes('Verify-Files.ps1'));
          }
        }
        const ids =
          view === 'findings'
            ? platformFindings(locale, platform).map((f) => f.id)
            : platformSteps(locale, platform).map((s) => 'step-' + s.id);
        for (const id of ids)
          assert.ok(html.includes('id="' + id + '"'), path + ' missing ' + id);
        if (view === 'steps') {
          for (const step of steps[locale]) {
            assert.ok(html.includes('id="terms-step-' + step.id + '"'));
            assert.ok(
              html.indexOf('id="terms-step-' + step.id + '"') <
                html.indexOf('id="howto-' + step.id + '"'),
            );
            for (const id of stepTerms[step.id])
              assert.ok(html.includes('data-term="' + id + '"'));
          }
          assert.ok(html.includes('Trivial File Transfer Protocol'));
          assert.ok(html.includes('data-term="server"'));
          const panels = [
            ...html.matchAll(/<details[^>]*class="step-how-to"[^>]*>/g),
          ].map((m) => m[0]);
          assert.equal(panels.length, 8, path + ' detailed instructions');
          assert.deepEqual(
            panels
              .filter((p) => /\sopen(?:[=>\s])/.test(p))
              .map((p) => p.match(/id="([^"]+)"/)[1]),
            ['howto-connect', 'howto-access'],
          );
          assert.ok(html.includes('ssh -o ConnectTimeout=5 root@192.168.10.1'));
          assert.ok(html.includes('REMOTE HOST IDENTIFICATION HAS CHANGED'));
          assert.ok(
            html.includes(
              locale === 'bn' ? 'রাউটারের ভেতরে' : 'Inside the router',
            ),
          );
          for (const step of steps[locale])
            assert.ok(html.includes('id="howto-' + step.id + '"'));
          for (const name of ['prepare', 'backup', 'verify', 'finish'])
            assert.ok(html.includes(name + '.webp'), path + ' missing ' + name);
        }
      }
  const invalid = await fetch(base + '/fr');
  assert.equal(invalid.status, 404);
  for (const path of [
    '/favicon.ico',
    '/favicon.svg',
    '/favicon-32.png',
    '/apple-touch-icon.png',
    '/og.png',
    '/illustrations/prepare.webp',
    '/illustrations/backup.webp',
    '/illustrations/verify.webp',
    '/illustrations/finish.webp',
    '/sitemap.xml',
    '/robots.txt',
  ])
    assert.equal((await fetch(base + path)).status, 200, path);
  const xml = await (await fetch(base + '/sitemap.xml')).text();
  assert.equal((xml.match(/<url>/g) || []).length, 8);
  assert.ok(xml.includes('hreflang="bn"'));
  for (const archive of [manifest, windowsManifest]) {
    const download = await fetch(base + '/downloads/' + archive.name);
    assert.equal(download.status, 200);
    assert.match(download.headers.get('x-robots-tag'), /noindex/);
    assert.equal(
      hash(Buffer.from(await download.arrayBuffer())),
      archive.sha256,
    );
  }
  console.log(
    'PASS: HTTP locale redirects, all 8 complete pages, OS/language/view links, selected control, OS-specific downloads and commands, footer credit, metadata/font/artwork, 404, sitemap and both served ZIP hashes.',
  );
}
