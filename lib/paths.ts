/** Set only at build time for the GitHub Pages project subdirectory. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const isStaticMirror = process.env.NEXT_PUBLIC_STATIC_MIRROR === '1';

/** For native anchors and public assets. Next Link applies basePath itself. */
export function publicPath(path: string) {
  return basePath + path;
}
