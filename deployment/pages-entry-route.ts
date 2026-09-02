// Copied over app/route.ts only inside the isolated GitHub Pages build.
import { publicPath } from '@/lib/paths';
export const dynamic = 'force-static';
export function GET() {
  const en = publicPath('/en/');
  const bn = publicPath('/bn/');
  return new Response(
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>HX21 OpenWrt Guide · Choose your language</title>
<meta name="robots" content="noindex,follow">
<link rel="icon" href="${publicPath('/favicon.svg')}" type="image/svg+xml">
<style>body{font:20px/1.6 system-ui,sans-serif;background:#faf9f5;color:#20473d;max-width:44rem;margin:15vh auto;padding:24px}a{display:inline-block;color:inherit;margin:12px 24px 12px 0}</style>
<script>try{const saved=document.cookie.split('; ').find(v=>v.startsWith('hx21-language-v1='))?.split('=')[1];location.replace(saved==='bn'?${JSON.stringify(bn)}:${JSON.stringify(en)});}catch{location.replace(${JSON.stringify(en)});}</script>
</head><body><h1>HX21 OpenWrt Guide</h1><p>Choose your language / ভাষা বেছে নিন</p><a href="${en}" lang="en">English</a><a href="${bn}" lang="bn">বাংলা</a><p>This static mirror has no country detection.</p></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}
