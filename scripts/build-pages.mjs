import {
  cp,
  mkdtemp,
  symlink,
  writeFile,
  access,
  rename,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const basePath = process.env.PAGES_BASE_PATH ?? '/hx21-openwrt-guide';
if (basePath && !/^\/[a-zA-Z0-9._-]+$/.test(basePath)) {
  throw new Error('PAGES_BASE_PATH must be empty or one safe repository path.');
}
// Never temporarily rewrite the working app or interrupt its development server.
const staging = await mkdtemp(join(tmpdir(), 'hx21-pages-build-'));
for (const entry of [
  'app',
  'components',
  'lib',
  'public',
  'package.json',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'tsconfig.json',
  'next.config.ts',
  'postcss.config.mjs',
])
  await cp(join(root, entry), join(staging, entry), { recursive: true });
await cp(
  join(root, 'deployment/pages-entry-route.ts'),
  join(staging, 'app/route.ts'),
);
await symlink(join(root, 'node_modules'), join(staging, 'node_modules'), 'dir');
execFileSync(
  process.execPath,
  [join(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'],
  {
    cwd: staging,
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_PUBLIC_STATIC_MIRROR: '1',
      NEXT_PUBLIC_BASE_PATH: basePath,
      SITE_URL: process.env.PAGES_SITE_URL || 'https://tanzir71.github.io',
    },
  },
);
const output = join(staging, 'out');
// Next exports the root Route Handler as extensionless `index`.
await rename(join(output, 'index'), join(output, 'index.html'));
await access(join(output, 'index.html'));
await writeFile(join(output, '.nojekyll'), '');
// CI gets a new checkout; refuse to mix old and new exports on a developer Mac.
const destination = join(root, 'out');
try {
  await access(destination);
  throw new Error(
    `Existing out directory must be moved aside before exporting. New export: ${output}`,
  );
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
await cp(output, destination, { recursive: true });
console.log(`GitHub Pages output: ${destination}`);
