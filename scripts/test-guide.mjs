import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import ts from 'typescript';
const root = resolve(import.meta.dirname, '..');
async function loadTs(file) {
  const source = await readFile(resolve(root, file), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  return import(
    'data:text/javascript;base64,' + Buffer.from(outputText).toString('base64')
  );
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
assert.match(
  languageCookie('en', true),
  /Max-Age=31536000; SameSite=Lax; Secure$/,
);
assert.doesNotMatch(languageCookie('bn', false), /Secure/);
const { findings, artifacts, ui } = await loadTs('lib/content.ts');
const { steps, faqs } = await loadTs('lib/steps.ts');
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
  'PASS: locale precedence; translation parity; 9 findings / 8 steps per language; four image files; favicon; exact 40-file ZIP allowlist, byte counts, SHA-256, privacy scan and shell syntax.',
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
    for (const view of ['findings', 'steps']) {
      const path = guidePath(locale, view),
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
      assert.ok(
        html.includes('href="/en' + (view === 'steps' ? '/steps' : '') + '"'),
      );
      assert.ok(
        html.includes('href="/bn' + (view === 'steps' ? '/steps' : '') + '"'),
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
      } else assert.ok(html.includes(guidePath(locale) + '#mac-fix'));
      if (locale === 'bn' && view === 'steps') {
        const styles = [
          ...html.matchAll(/<link[^>]+href="([^"]+\.css(?:\?[^"]*)?)"[^>]*>/g),
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
      assert.ok(html.includes(manifest.name));
      const ids =
        view === 'findings'
          ? findings[locale].map((f) => f.id)
          : steps[locale].map((s) => 'step-' + s.id);
      for (const id of ids)
        assert.ok(html.includes('id="' + id + '"'), path + ' missing ' + id);
      if (view === 'steps')
        for (const name of ['prepare', 'backup', 'verify', 'finish'])
          assert.ok(html.includes(name + '.webp'), path + ' missing ' + name);
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
  assert.equal((xml.match(/<url>/g) || []).length, 4);
  assert.ok(xml.includes('hreflang="bn"'));
  const download = await fetch(base + '/downloads/' + manifest.name);
  assert.equal(download.status, 200);
  assert.match(download.headers.get('x-robots-tag'), /noindex/);
  assert.equal(
    hash(Buffer.from(await download.arrayBuffer())),
    manifest.sha256,
  );
  console.log(
    'PASS: HTTP locale redirects, cookie precedence, explicit-language stability, all 4 full pages, translated HTML, canonical/hreflang/JSON-LD/social metadata, favicon and images, 404, sitemap and served ZIP integrity.',
  );
}
