import assert from 'node:assert/strict';
import { readFile, stat, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const out = join(root, 'out');
const entry = await readFile(join(out, 'index.html'), 'utf8');
const enPath = entry.match(/<a href="([^"]+)" lang="en"/)[1];
const basePath = enPath.replace(/\/en\/$/, '');
const redirectScript = entry.match(/<script>([\s\S]+?)<\/script>/)[1];
for (const [cookie, locale] of [
  ['', 'en'],
  ['hx21-language-v1=bn', 'bn'],
  ['hx21-language-v1=en', 'en'],
  ['hx21-language-v1=invalid', 'en'],
]) {
  let target;
  runInNewContext(redirectScript, {
    document: { cookie },
    location: {
      replace: (url) => {
        target = url;
      },
    },
  });
  assert.equal(target, `${basePath}/${locale}/`);
}

const files = new Set();
const publicUrl = new URL('https://pages.test' + basePath + '/');
for (const locale of ['en', 'bn']) {
  for (const route of [
    locale,
    `${locale}/steps`,
    `${locale}/windows`,
    `${locale}/windows/steps`,
  ]) {
    const html = await readFile(join(out, route, 'index.html'), 'utf8');
    assert.match(html, new RegExp(`<html lang="${locale}"`));
    assert.match(html, /rel="canonical"/);
    assert.ok(html.includes(`${basePath}/${route}`));
    assert.ok(html.includes(`${basePath}/favicon.svg`));
    assert.ok(html.includes(`${basePath}/downloads/`));
    assert.ok(html.includes('GitHub Pages'));
    assert.ok(html.includes('href="https://tanziro.com/"'));
    assert.ok(html.includes('aria-current="page"'));
    const windows = route.includes('/windows');
    assert.ok(html.includes(windows ? 'hx21-windows-kit-' : 'hx21-mac-kit-'));
    assert.ok(!html.includes(windows ? 'hx21-mac-kit-' : 'hx21-windows-kit-'));
    const suffix =
      (windows ? '/windows' : '') + (route.endsWith('/steps') ? '/steps' : '');
    for (const language of ['en', 'bn'])
      assert.ok(html.includes(`${basePath}/${language}${suffix}`));
    if (windows) assert.doesNotMatch(html, /shasum -a 256/);
    assert.doesNotMatch(html, /http:\/\/localhost/);
    assert.doesNotMatch(
      html,
      /href="\/(?:en|bn|downloads)|src="\/illustrations/,
    );
    if (route.endsWith('/steps')) {
      assert.equal(
        [...html.matchAll(/<details[^>]*class="step-how-to"[^>]*>/g)].length,
        8,
      );
      assert.ok(html.includes('id="howto-connect"'));
      assert.ok(html.includes('id="howto-access"'));
      assert.ok(html.includes('ssh -o ConnectTimeout=5 root@192.168.10.1'));
      assert.ok(html.includes(windows ? 'ncpa.cpl' : 'add-stock-address.sh'));
      for (const name of ['prepare', 'backup', 'verify', 'finish']) {
        assert.ok(html.includes(`${basePath}/illustrations/${name}.webp`));
      }
    } else assert.ok(html.includes('id="mac-fix"'));
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), publicUrl);
      if (
        url.origin !== publicUrl.origin ||
        !url.pathname.startsWith(basePath + '/')
      )
        continue;
      const path = decodeURIComponent(url.pathname.slice(basePath.length));
      let local = join(out, path);
      const info = await stat(local);
      if (info.isDirectory()) local = join(local, 'index.html');
      await access(local);
      files.add(local);
    }
  }
}
let fontChecked = false;
for (const file of files) {
  if (!file.endsWith('.css')) continue;
  const css = await readFile(file, 'utf8');
  if (css.includes('--font-baloo-da-2')) fontChecked = true;
  for (const match of css.matchAll(/url\(["']?([^"')]+\.ttf)["']?\)/g)) {
    const path = match[1].startsWith(basePath + '/')
      ? join(out, match[1].slice(basePath.length))
      : resolve(file, '..', match[1]);
    const actual = await readFile(path);
    const expected = await readFile(
      join(root, 'app/fonts/BalooDa2-Variable.ttf'),
    );
    assert.deepEqual(actual, expected);
  }
}
assert.ok(fontChecked);
await access(join(out, '.nojekyll'));
await access(join(out, '404.html'));
const xml = await readFile(join(out, 'sitemap.xml'), 'utf8');
assert.equal((xml.match(/<url>/g) || []).length, 8);
assert.ok(xml.includes(`${basePath}/bn/steps`));
assert.ok(xml.includes(`${basePath}/bn/windows/steps`));
for (const name of [
  'artifact-manifest.json',
  'windows-artifact-manifest.json',
]) {
  const manifest = JSON.parse(
    await readFile(join(out, 'downloads', name), 'utf8'),
  );
  const zip = await readFile(join(out, 'downloads', manifest.name));
  assert.equal(createHash('sha256').update(zip).digest('hex'), manifest.sha256);
}
console.log(
  'PASS: static entry preference, all eight OS/language/view pages, matching downloads, footer credit, subpath navigation/assets, Baloo Da 2 bytes, sitemap, 404 and both ZIP hashes.',
);
