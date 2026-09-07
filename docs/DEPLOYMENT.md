# Hosting

The user authorized public GitHub Pages and Vercel hosting, including a new public repository named `tanzir71/hx21-openwrt-guide`.

## Illustrated Ubuntu guide and URL migration — 8 September 2026 (Asia/Dhaka)

- The maintained companion is now [ubuntu-home-server-guide](https://github.com/tanzir71/ubuntu-home-server-guide),
  published at [Ubuntu Home Server Guide](https://tanzir71.github.io/ubuntu-home-server-guide/).
  Its checkout moved to the ignored `ubuntu-home-server-guide/` folder, also excluded from Vercel uploads.
- The 26-page site uses the HX21 palette, four generated illustrations, readable
  chapter URLs, search, a mobile chapter menu and prompt copying. New chapters explain
  concepts, setup checkpoints, Ubuntu versus Windows on an old PC, and waking through
  HX21 with Ethernet-card compatibility and dated price guidance.
- New guide commit: `36f779cb241375f1863d8b11f326deffc013eb46`.
  [Pages run 34160324130](https://github.com/tanzir71/ubuntu-home-server-guide/actions/runs/34160324130)
  succeeded. Exact live HTML bytes for all 26 pages and all four image files matched
  the checked local build; 1,368 local links/assets/anchors and SEO metadata passed.
- The former repository preserves historical source. Commit `31218737bf15c0be65cd998077c7d54cde70b5c0`
  publishes 21 per-page HTML redirects; [run 34160214419](https://github.com/tanzir71/private-homelab-agent-guide/actions/runs/34160214419)
  succeeded. Every old page was checked, and browser navigation confirmed a deep
  redirect preserves its fragment. These are HTML redirects, not HTTP 301 responses.
- HX21 application commit: `3ddf515714cc5c91af4f7f72c1a605dde9b0ac15`.
  [Pages run 34160218639](https://github.com/tanzir71/hx21-openwrt-guide/actions/runs/34160218639)
  succeeded. Vercel deployment `dpl_8YzqSrMw75i84Btgk1pGuBK7NU7Z` reached **READY**
  with the production alias. Both guide and WoL links were verified on all 24 HX21
  pages across the two hosts. Guide tests, lint, Pages build/checks and the Vercel
  production build passed. No physical PC, NIC or router wake test is implied.

## Companion home-server guide — 8 September 2026 (Asia/Dhaka)

- Published [private-homelab-agent-guide](https://github.com/tanzir71/private-homelab-agent-guide)
  as a separate public repository with its own fresh history, AGPL license and
  [searchable GitHub Pages guide](https://tanzir71.github.io/private-homelab-agent-guide/).
  Its local checkout remains in the ignored `private-homelab-agent-guide/` folder;
  it is also excluded from Vercel uploads.
- HX21 application commit: `02d809fca954e24e2d1e6238c341c0ceaf16efe1`.
  The shared footer links to the new guide in English and Bengali on every view.
- HX21 [Pages workflow 34152167129](https://github.com/tanzir71/hx21-openwrt-guide/actions/runs/34152167129)
  succeeded. Vercel deployment `dpl_26wFZR663rqCLRz1YdSYSRRL826a` reached **READY**
  and was assigned to `hx21-openwrt-guide.vercel.app`; the earlier commit-author
  access blocker did not recur. No access-control changes were needed.
- `pnpm test`, `pnpm build`, `pnpm build:pages` and `pnpm test:pages` passed.
  Live HTTP checks confirmed the companion link on all 24 pages across the two
  hosts. The new guide's 21 pages, search index, CSS and license matched the
  verified local build byte for byte. Its separate workflow passed publication,
  syntax, Compose, checksum, strict build and generated-link checks.
- Vercel was deployed with the CLI. Future GitHub push-to-deploy behavior remains
  unverified. The dated failures below are historical records.

## In-context terminology update — 3 September 2026 (Asia/Dhaka)

- Application commit: `dad0b78298e564a78ff59c66293504615674e6f1`.
- GitHub Pages workflow [33672937067](https://github.com/tanzir71/hx21-openwrt-guide/actions/runs/33672937067) succeeded, including the terminology/content and static-export checks.
- Live HTTP checks passed for all eight pages, localized term notes and the TFTP explanation, original help panels, navigation, metadata, exact font bytes, 18 linked assets and both unchanged ZIP hashes.
- The existing local preview also serves the visible English/Bengali definitions. Firmware/helper commands and both public archives are unchanged.
- Vercel's previously confirmed commit-author identity blocker was not retried or bypassed; this update is not claimed to be on that host.

## Beginner walkthrough update — 3 September 2026 (Asia/Dhaka)

- Application commit: `1ad1cc2d1a45b5d628b87ab533b2c6c5cb2a0352`.
- GitHub Pages workflow [33672001011](https://github.com/tanzir71/hx21-openwrt-guide/actions/runs/33672001011) succeeded. Live checks passed for all eight pages, all new help panels and their OS-specific commands, intended expanded Network/SSH sections, links, metadata, 18 linked assets, exact font bytes and both unchanged archive hashes.
- The local development preview also serves this update. No new host or repository was created.
- Vercel was not retried: the existing commit-author verification blocker below remains unresolved. Its production URL is not claimed to contain this update.

## OS-selector update — 3 September 2026 (Asia/Dhaka)

- Application commit: `1eb9c5e2bf0ac2bef505266fecaf50983570596f`.
- GitHub Pages workflow [33670123203](https://github.com/tanzir71/hx21-openwrt-guide/actions/runs/33670123203) succeeded. Live HTTP checks passed for all eight OS/language/view pages, selected OS and language links, OS-specific downloads, footer credit, canonical/indexing metadata, exact Baloo Da 2 bytes, 18 linked assets and both ZIP hashes.
- Vercel deployment `dpl_HDEWSA6JDZ2g4PYv29FhqmmAsjT9` was **BLOCKED**, not published. API reason: commit author does not have permission to create deployments for this project; `seatBlock.blockCode` is `TEAM_ACCESS_REQUIRED` and `isVerified` is false. The CLI displayed UNKNOWN and waited, so the exact state was checked through its authenticated API.
- GitHub correctly attributes the commit to `tanzir71` (ID 13024434). Vercel account `tanzir71` did not report a connected GitHub identity. The user must connect the correct GitHub account in [Vercel Authentication](https://vercel.com/account/authentication) and retry. See [Vercel's commit-author troubleshooting](https://vercel.com/docs/deployments/troubleshoot-project-collaboration).
- The previous Vercel production deployment remains live. No deployment protection, team access, author identity, billing settings or project permissions were bypassed or changed.

## Initial publication — 3 September 2026 (Asia/Dhaka)

- Vercel production: https://hx21-openwrt-guide.vercel.app/
- GitHub Pages: https://tanzir71.github.io/hx21-openwrt-guide/
- Public source: https://github.com/tanzir71/hx21-openwrt-guide
- Deployed application commit: `3431f45598956f4508b2f02a1e8e26490296dd42`.
- GitHub Pages workflow: https://github.com/tanzir71/hx21-openwrt-guide/actions/runs/33668119848 — succeeded, including archive and static-export checks.
- Vercel deployment: `dpl_FXvQSoenYiwPiYREYQFaAaM3nQbP` — READY, production; remote build completed in approximately 31 seconds.
- Live HTTP checks passed on both hosts for all four pages, production canonical/indexing metadata, public entry behavior, navigation assets, exact Baloo Da 2 bytes and downloaded ZIP SHA-256. Saved language precedence was verified on Vercel. No browser-interaction or physical-router testing was performed.
- Vercel's production error-log query returned no logs. No dedicated monitoring or log drains were configured as part of this deployment.
- GitHub Pages is configured to publish through Actions with HTTPS enforced. Vercel's optional GitHub connection failed twice; this does not affect the successful CLI production deployment. Automatic Vercel deploys are **not** enabled. Resolve GitHub integration access for this repository in Vercel before relying on push-to-deploy there.

## Two build targets

- Vercel uses `pnpm build`. The `/` endpoint chooses the saved language first, then Vercel's country header. Explicit localized routes remain stable.
- GitHub Pages uses `pnpm build:pages`. A separate, static entry page remembers the saved language in the browser and defaults to English. No country detection or server-side download headers are available on this host.
- Both targets include the full English/Bengali guide for macOS and Windows (eight pages), corrected conditional MAC advice, Baloo Da 2, four walkthrough illustrations, social card, favicons, OS-specific SHA-256-checked backup ZIPs and the author's linked footer credit.

## GitHub Pages

Publishing is configured in `.github/workflows/pages.yml`. The workflow installs pinned pnpm, validates the original archive, builds the isolated static version, validates navigation/assets/downloads, then publishes `out/` with the official Pages actions.

Enable **Settings → Pages → Source: GitHub Actions** before running it. The workflow grants only read access for building and Pages/OIDC permissions for the deployment job.

## Vercel

`vercel.json` selects Next.js and the frozen pnpm install. `.vercelignore` excludes private/local staging, environment files and build intermediates. The project needs no database or application secrets. Do not set `NEXT_PUBLIC_STATIC_MIRROR` or `NEXT_PUBLIC_BASE_PATH` on Vercel.

Use the final production origin for `SITE_URL`, or allow the trusted Vercel production-domain variable to provide it. Preview deployments remain noindex. Do not weaken preview deployment protection to test them.

## Publication scope

The original Desktop kit and any device-specific backups remain local. The sanitized macOS archive under `public/downloads/` has 40 allowlisted files and SHA-256 `c167fc6ac4ac7b6950cc0780a3de33ac996ecfc2269f7ca9354087e15de63b49`.

The Windows adaptation adds a separate 20-file public archive built exclusively from the Mac archive's allowlisted shared files, reviewed PowerShell/Markdown sources and a blank worksheet. Its SHA-256 is `33016c62d8166f796122dbe33bb1b559736af5c84e7ccb387057589cd6acb1df`. Neither archive includes device backups or credentials.

References: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [Vercel deployments](https://vercel.com/docs/deployments/overview).
