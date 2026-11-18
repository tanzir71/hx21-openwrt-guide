# HX21 OpenWrt Guide

A bilingual (English and Bengali) research guide and visual walkthrough for installing OpenWrt on the HX21 router, written for macOS and Windows users. It also ships a sanitized, offline backup-preparation kit for each OS.

This is independent research, not official OpenWrt installation guidance or a safety guarantee. Recheck current official device instructions, releases and signatures before flashing anything.

- Vercel production: https://hx21-openwrt-guide.vercel.app/
- GitHub Pages mirror: https://tanzir71.github.io/hx21-openwrt-guide/
- Overview video (three minutes, English narration and captions): https://www.youtube.com/watch?v=0Cm5mRq9jlQ
- Related: [Ubuntu Home Server Guide](https://tanzir71.github.io/ubuntu-home-server-guide/) ([source](https://github.com/tanzir71/ubuntu-home-server-guide)), linked from the footer of every page.

## Features

- Twelve server-rendered pages across language (`/en`, `/bn`), OS (macOS by default, `/windows`) and view (research, `/steps`, `/prompt`). OS and language are encoded in the URL, so they work without JavaScript.
- Research: nine source-linked sections per page, with FAQs, a safety disclaimer and plain-language notes on terms such as TFTP and SSH.
- Walkthrough: eight installation checkpoints, each with a "How to actually do this" panel (command labels, exact clicks, expected results, stop conditions) and four conceptual illustrations. The illustrations do not show verified HX21 port positions, UART pinouts or real software screens.
- LLM Prompt tab: a complete, copyable prompt for an AI assistant covering prerequisites through cleanup, with separate checkpoints for destructive actions. No LLM API, credential form or router execution is built into the site.
- Conditional MAC persistence and repair guidance (`/en#mac-fix`, `/bn#mac-fix`).
- Downloads: backup-only ZIP kits for macOS (40 files) and Windows (20 files), version 25.12.5, with SHA-256 files and per-file manifests. The Windows kit uses PowerShell helpers and needs PowerShell 7.4+.
- Bengali text uses self-hosted Baloo Da 2 (SIL OFL text is bundled in `app/fonts/`).

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn / Base UI, pnpm. Linting with oxlint and formatting with oxfmt.

## Getting started

Requires Node.js 22.13 or later and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` / `pnpm build` / `pnpm start` | Next.js development, production build and server |
| `pnpm test` | Source checks: language/OS logic, translation parity, section and step counts, ZIP allowlists, archived hashes, absence of private paths and SSH keys, generated assets |
| `TEST_BASE_URL=http://localhost:3000 pnpm test` | Same, plus HTTP checks of routes, links, metadata, sitemap and downloads against a running server |
| `pnpm build:pages` | Static GitHub Pages export into `out/` |
| `pnpm test:pages` | Checks the static export |
| `pnpm test:powershell` | Parses the Windows helpers and runs the file verifier with success and corruption cases (needs PowerShell 7.4+, or set `POWERSHELL_BIN`); never contacts a router |
| `pnpm artifacts:windows` | Rebuilds the Windows archive from the public Mac ZIP's allowlisted files and `artifacts/windows/` |
| `pnpm lint` / `pnpm format` | oxlint / oxfmt |

These are source and HTTP checks, not physical router testing or browser visual testing.

## Language behavior

- Only `/` picks a language: a valid `hx21-language-v1` cookie wins; otherwise Vercel's `x-vercel-ip-country: BD` header selects Bengali and anything else selects English. Explicit `/en` and `/bn` URLs never change.
- The header EN/বাংলা control stores a first-party, one-year SameSite=Lax cookie. No third-party location lookup or tracking.
- Test locally with:

```sh
curl -I -H 'x-vercel-ip-country: BD' http://localhost:3000/
curl -I -H 'x-vercel-ip-country: BD' -H 'Cookie: hx21-language-v1=en' http://localhost:3000/
```

- The GitHub Pages mirror is static: it reads the saved cookie in the browser and otherwise opens English. There is no country detection.

## Deployment

**Vercel.** Import as a Next.js project using pnpm (`vercel.json` sets the build and install commands). Set `SITE_URL` to the final canonical HTTPS origin before the production build; otherwise Vercel's production-domain variable is used, and local development falls back to `http://localhost:3000`. See `docs/DEPLOYMENT.md`.

**GitHub Pages.** The `Publish GitHub Pages` workflow runs `pnpm test`, `pnpm build:pages` and `pnpm test:pages`, then deploys `out/` on pushes to `main`. Set the Pages source to GitHub Actions. Pages cannot send the custom download headers used on Vercel, and a project site's `robots.txt` is not authoritative, so the public archive may be indexed. Neither robots rules nor noindex provide access control.

Production HTTPS builds can be indexed; local and Vercel preview builds use noindex.

## Backup archive and safety

`public/downloads/` holds sanitized, allowlisted preparation kits, not copies of anyone's router. The kit includes an optional community SSH-unlock configuration with a reported MAC-data risk. The four firmware image SHA-256 values matched official HTTPS records during preparation, but detached GPG signatures were not verified. Shell helpers were syntax-checked offline, not run against a router.

`scripts/prepare-artifacts.mjs` copies only an explicit allowlist from a local source kit, generates a blank worksheet and sanitizes source paths. Regenerating an archive changes its hash, so rerun the tests and update its verification record. Never add private worksheets, credentials, SSH state, host keys or stock NAND/Factory backups.

## Images

The four walkthrough illustrations and the social card were generated with built-in image generation; prompts are in `docs/image-prompts-*` and `docs/image-prompt-social-card.txt`. Rebuild WebP variants and favicons with `node scripts/prepare-images.mjs`.

## Further docs

`docs/` has the verification records and source reviews: `VERIFICATION.md`, `VERIFIED-WORKFLOW-UPDATE.md`, `MAC-REFERENCE-REVIEW.md`, `WINDOWS-REFERENCE-REVIEW.md`, `WALKTHROUGH-REFERENCE-REVIEW.md`.

The guide credits [Tanzir Rahman](https://tanziro.com/) in the footer.
