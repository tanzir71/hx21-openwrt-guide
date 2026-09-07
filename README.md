# HX21 OpenWrt Guide

Related guide: [Ubuntu Home Server Guide](https://tanzir71.github.io/ubuntu-home-server-guide/)
([standalone source repository](https://github.com/tanzir71/ubuntu-home-server-guide))
covers an agent-assisted Ubuntu/Tailscale home server, downloads, files, media,
notifications and optional local voiceover. It also covers [Ubuntu vs Windows on an old PC](https://tanzir71.github.io/ubuntu-home-server-guide/old-pc-server-ubuntu-vs-windows/) and [Wake-on-LAN through HX21 with inexpensive Ethernet-card buying guidance](https://tanzir71.github.io/ubuntu-home-server-guide/wake-on-lan-openwrt-ethernet-card/). The shared footer links to it in
every language, OS and view on both hosting targets.

The [three-minute video overview](https://www.youtube.com/watch?v=0Cm5mRq9jlQ) is embedded near the top of all English/Bengali and Windows/macOS views. A local preview loads first; pressing Play opens YouTube's privacy-enhanced player. English narration/captions cover Ethernet, power protection, backups, firmware checks, staged installation and final setup. The written guide remains the reference for exact commands and checkpoints.

## Complete assistant workflow and verified guidance

The **LLM Prompt** tab covers prerequisites through final cleanup, with Windows/macOS branches, existing-device-state detection, independent chat connectivity, private backups, reviewed files and separate destructive-action checkpoints. Open `/en/prompt` or `/en/windows/prompt`; Bengali interfaces are at `/bn/prompt` and `/bn/windows/prompt`. The prompt requests replies in the selected language. OS/language switches preserve the view, and the complete prompt is selectable in server-rendered HTML and copyable with JavaScript. No LLM API, credentials form or router execution is built into the site.

The walkthrough now includes generalized lessons from a completed Windows installation and wired-AP workflow. It adapts to the user's upstream network and country; private session information and household device details are excluded. See [verified workflow, sources and limits](docs/VERIFIED-WORKFLOW-UPDATE.md). The two dated downloadable firmware/helper archives remain byte-for-byte unchanged; current online instructions explain the later verification and connection-preserving workflow.

There are now **twelve** OS/language/view pages. `pnpm test`, `pnpm build:pages`, and `pnpm test:pages` cover the complete prompt, navigation, metadata and unchanged downloads. Windows validation uses Git for Windows unzip/bash (override with `UNZIP_BIN` / `BASH_BIN` if needed), LF text checkout and same-drive build staging. `pnpm test:powershell` checks helper parsing and file-verification failure cases without contacting a router.

Bilingual Next.js site with a full Vercel deployment and a static GitHub Pages build. This is independent research, not official installation guidance or a safety guarantee. See `docs/DEPLOYMENT.md` for hosting setup and verification.

- [Vercel production](https://hx21-openwrt-guide.vercel.app/)
- [GitHub Pages mirror](https://tanzir71.github.io/hx21-openwrt-guide/)
- [Source repository](https://github.com/tanzir71/hx21-openwrt-guide)

Updated and live-checked on 8 September 2026 (Asia/Dhaka). Both GitHub Pages and Vercel serve the current guide, including the standalone home-server guide link on all twelve language/OS/view pages. The earlier Vercel commit-author blocker did not recur. GitHub Pages updates automatically on pushes to `main`; Vercel was published with the CLI, and future GitHub push-to-deploy behavior has not been verified.

## Run on a Mac

Install Node.js 22.13 or later and pnpm, then from this folder:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. The complete content is rendered on the server:

Bengali text uses self-hosted Baloo Da 2, with the original open font license bundled. The English typeface remains unchanged. Conditional MAC persistence/repair guidance is included at `/en#mac-fix` and `/bn#mac-fix`, with a link from the last walkthrough step. The user-supplied AI reference was corrected against primary OpenWrt sources; see `docs/MAC-REFERENCE-REVIEW.md`.

- `/en` and `/bn`: nine detailed, source-linked research sections.
- `/en/steps` and `/bn/steps`: eight installation checkpoints, four generated illustrations and precise text diagrams.
- `/en/windows` and `/bn/windows`: Windows-specific findings; append `/steps` for the Windows walkthrough.
- All eight pages include the matching OS backup-only ZIP, archive SHA-256, safety disclaimer, sources, FAQs and language privacy notice.

Each walkthrough step now has a server-rendered **How to actually do this** panel, with computer/router command labels, exact setup clicks, expected results and stop conditions. Network alias and stock SSH panels start expanded. Instructions adapt to both operating systems and languages; they explain the existing helpers without executing them. Model-specific flash writes still require the official device procedure. See `docs/WALKTHROUGH-REFERENCE-REVIEW.md` for sources and limits.

Visible **What these terms mean here** notes explain relevant technical vocabulary at every step, in the detailed findings, beside the download and in MAC troubleshooting. They explain the role of TFTP, SSH, storage, firmware-file types and other abbreviations in plain English/Bengali without requiring hover, a glossary jump or JavaScript. TFTP explicitly distinguishes the computer serving a file from the router requesting it; starting the server is not installation.

## Computer selection and credit

The macOS / Windows selector sits above the hero. OS selection is encoded in the URL, so it works without JavaScript and survives language/view changes, refreshes and sharing. Existing Mac URLs are unchanged; `/windows` selects Windows. A fresh visit to `/` still defaults to the Mac guide after language selection; there is no device sniffing or OS cookie.

Windows pages replace the computer-specific network setup, TFTP, binary-backup, verification and cleanup instructions. Firmware images and router-side precautions are identical. The Windows download has PowerShell helpers and no macOS shell/`.command` helpers. It requires PowerShell 7.4+ for byte-preserving SSH redirection. See `docs/WINDOWS-REFERENCE-REVIEW.md` for sources and test limits.

Both languages credit [Tanzir Rahman](https://tanziro.com/) in the footer. The structured article metadata lists him as a contributor; the guide remains independent, not official OpenWrt documentation.

## Language behavior

Only `/` chooses a language. A valid `hx21-language-v1` preference cookie wins. Otherwise Vercel's `x-vercel-ip-country: BD` selects Bengali; other or missing countries select English. The redirect is private and non-cacheable. Explicit `/en` and `/bn` URLs never change language based on country/cookie, so bookmarks, search indexing and sharing remain stable.

The visible EN/বাংলা header control saves a first-party, one-year SameSite=Lax cookie (Secure on HTTPS) while navigating to the equivalent view. No third-party location lookup, tracking or precise location storage. Without JavaScript/cookies, the language links still work but preference is not saved. Localhost has no real country header; test it as shown below. Real Vercel geolocation requires a request from the relevant country.

GitHub Pages is a static mirror: the entry page reads the saved language cookie in the browser and otherwise opens English. There is no country detection. Both languages remain directly accessible without JavaScript. The mirror's footer explains this difference.

## Verify

```sh
pnpm test
TEST_BASE_URL=http://localhost:3000 pnpm test
pnpm build
```

The tests check language/OS logic and translation parity, all section/step counts, both exact ZIP allowlists, every archived byte count/hash, absence of private paths/SSH private keys, helper source checks, official pinned firmware hashes, and generated assets. HTTP mode also checks all eight routes, selected OS and language/view links, OS-specific commands/downloads, footer credit, metadata, sitemap, favicon and both downloaded ZIP hashes. These are source/HTTP checks, not physical router testing or browser interaction/visual testing.

Optional: with PowerShell 7.4+ installed, run `pnpm test:powershell` (or set `POWERSHELL_BIN` to its executable). This parses both Windows helpers and runs the file verifier with success and deliberate corruption/missing-record cases. It does not connect to a router or exercise Windows networking.

```sh
curl -I -H 'x-vercel-ip-country: BD' http://localhost:3000/
curl -I -H 'x-vercel-ip-country: BD' -H 'Cookie: hx21-language-v1=en' http://localhost:3000/
```

## Vercel hosting

Import this project as Next.js using pnpm. Set `SITE_URL` to the final canonical HTTPS origin before the production build. Without `SITE_URL`, the trusted Vercel production-domain variable is used; local development falls back to `http://localhost:3000`. Do not use arbitrary request Host/Forwarded headers for canonical URLs.

## GitHub Pages hosting

The `Publish GitHub Pages` workflow builds and publishes the static mirror on pushes to `main`. Set the repository's Pages publishing source to **GitHub Actions**. The default local export target is `/hx21-openwrt-guide` on `https://tanzir71.github.io`; CI uses the repository's actual Pages settings.

```sh
pnpm build:pages
pnpm test:pages
```

The export is built in an isolated temporary folder, so it never rewrites the live app's country-aware route. Public output goes into `out/`. Move an existing `out/` aside before rebuilding; the script refuses to mix different exports. Native links, public assets, font files, metadata and downloads include the project subpath.

GitHub Pages cannot send the custom download response headers used on Vercel. The exported `robots.txt` requests download exclusion, but a project site's nested robots file is not authoritative for the host: crawler rules must be served from the domain root. The public archive may therefore be indexed. Neither robots rules nor noindex provide access control.

English/Bengali pages have distinct titles/descriptions, correct HTML language, canonical and reciprocal hreflang links, JSON-LD, a sitemap, Open Graph/X metadata and custom favicons. Production HTTPS builds can be indexed; local and Vercel preview builds use noindex. The `/downloads/` archive is excluded from indexing and is secondary to official repositories. No search ranking or rich-result guarantee is implied.

## Image assets

Built-in imagegen created the four walkthrough illustrations and the social card. Original PNGs and web-optimized WebPs are in `public/illustrations/`; `public/og.png` is the social card. Exact prompts are under `docs/image-prompts-*` and `docs/image-prompt-social-card.txt`. Rebuild the WebP variants and PNG/ICO favicon exports with `node scripts/prepare-images.mjs`.

Illustrations are explicitly labeled conceptual: they do not show verified HX21 port positions, UART pinouts or actual software screens. IP addresses, filenames and safety checks are real text rather than generated image text.

## Public backup archive

`public/downloads/` contains separate macOS (40 files) and Windows (20 files) 25.12.5 backup ZIPs, checksum files and full per-file manifests. These are sanitized allowlisted preparation kits, not copies of the user's router. Never add private worksheets, credentials, SSH state, host keys or stock NAND/Factory backups to this repository or either archive.

The kit includes optional community SSH-unlock configuration with a reported MAC-data risk. The four firmware image SHA-256 values matched official HTTPS records during preparation; **detached GPG signatures were not verified**. Recheck current official device instructions, releases and signatures before implementation. Shell helpers were syntax/offline checked, not run against a router.

`scripts/prepare-artifacts.mjs` accepts a local source-kit folder, copies only an explicit allowlist, generates a blank worksheet, sanitizes source paths and refuses to reuse non-empty staging. It intentionally never traverses a user's backup or SSH-state folder. Do not rebuild the archive without reviewing the source and updating its verification record.

`pnpm artifacts:windows` builds the Windows archive from the already-public Mac ZIP's allowlisted shared files plus the reviewed sources in `artifacts/windows/` and a blank worksheet. It verifies the source ZIP and each shared file hash before packaging; it never reads the private Desktop kit. Regenerating changes the archive hash, so rerun the tests and update its verification record.
