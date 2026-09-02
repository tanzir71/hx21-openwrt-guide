import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next'))('sharp');
for (const name of ['prepare', 'backup', 'verify', 'finish']) {
  await sharp(resolve(root, 'public/illustrations', name + '.png'))
    .webp({ quality: 83 })
    .toFile(resolve(root, 'public/illustrations', name + '.webp'));
}
await sharp(resolve(root, 'public/favicon.svg'))
  .resize(32, 32)
  .png()
  .toFile(resolve(root, 'public/favicon-32.png'));
await sharp(resolve(root, 'public/favicon.svg'))
  .resize(180, 180)
  .png()
  .toFile(resolve(root, 'public/apple-touch-icon.png'));
// ICO container with an embedded 32px PNG for browsers that request /favicon.ico.
const png = await readFile(resolve(root, 'public/favicon-32.png'));
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(
  resolve(root, 'public/favicon.ico'),
  Buffer.concat([header, png]),
);
console.log('Prepared four WebP illustrations, PNG icons and favicon.ico.');
