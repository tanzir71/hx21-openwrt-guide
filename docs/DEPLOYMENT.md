# Hosting

The user authorized public GitHub Pages and Vercel hosting, including a new public repository named `tanzir71/hx21-openwrt-guide`.

## Published — 3 September 2026 (Asia/Dhaka)

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
- Both targets include the full English/Bengali guide, corrected conditional MAC advice, Baloo Da 2, four walkthrough illustrations, social card, favicons and the same SHA-256-checked backup ZIP.

## GitHub Pages

Publishing is configured in `.github/workflows/pages.yml`. The workflow installs pinned pnpm, validates the original archive, builds the isolated static version, validates navigation/assets/downloads, then publishes `out/` with the official Pages actions.

Enable **Settings → Pages → Source: GitHub Actions** before running it. The workflow grants only read access for building and Pages/OIDC permissions for the deployment job.

## Vercel

`vercel.json` selects Next.js and the frozen pnpm install. `.vercelignore` excludes private/local staging, environment files and build intermediates. The project needs no database or application secrets. Do not set `NEXT_PUBLIC_STATIC_MIRROR` or `NEXT_PUBLIC_BASE_PATH` on Vercel.

Use the final production origin for `SITE_URL`, or allow the trusted Vercel production-domain variable to provide it. Preview deployments remain noindex. Do not weaken preview deployment protection to test them.

## Publication scope

The original Desktop kit and any device-specific backups remain local. Only the existing sanitized archive under `public/downloads/` is included. It has 40 allowlisted files and SHA-256 `c167fc6ac4ac7b6950cc0780a3de33ac996ecfc2269f7ca9354087e15de63b49`.

References: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [Vercel deployments](https://vercel.com/docs/deployments/overview).
