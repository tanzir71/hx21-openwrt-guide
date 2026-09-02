# Verification — 2 September 2026

## Beginner how-to panels — 3 September 2026

- Added practical, localized instructions to all eight walkthrough steps for both macOS and Windows. Native details/summary panels keep the complete content server-rendered and usable without JavaScript. Connect and Access start expanded; copy buttons do not execute commands.
- Regression checks cover all help IDs, nonempty instructions/references, computer-versus-router labels, one command per copy block, stock SSH command, four SSH troubleshooting cases, alias-helper/Windows GUI differences and absence of new flash-write/host-verification-bypass commands.
- Local HTTP tests passed for all eight routes, including eight help panels on every walkthrough and exactly the two intended expanded panels. Existing navigation, language, downloads, font, metadata and artwork checks passed.
- Both public ZIPs remain byte-for-byte unchanged. The existing archive/hash/privacy/source checks and lint passed.
- Production build/TypeScript and isolated GitHub Pages build/static checks passed, including all four localized OS walkthroughs and their new help panels.
- React review preserved server component boundaries, native list/disclosure semantics and only the existing clipboard interaction. New copy controls receive only the three necessary status strings, not the complete UI dictionary.
- Technical references, conditional stock-password scope and remaining official-procedure/signature-verification boundaries are recorded in `WALKTHROUGH-REFERENCE-REVIEW.md`. No physical device, network changes, browser-interaction or visual QA was performed.

## OS selector update — 3 September 2026

- macOS/Windows selection is server-rendered above the hero and encoded in the URL. Existing Mac URLs are preserved; four Windows pages bring the total to eight. Language, view, brand and MAC-troubleshooting links preserve the selected OS.
- Both languages include Tanzir Rahman's footer credit linking to https://tanziro.com/ and contributor metadata. Bengali continues to use Baloo Da 2.
- Local HTTP checks passed for all eight pages, matching download/manifests/hashes, OS-specific verification commands, selected-control semantics, footer, metadata, assets, sitemap and language preference behavior.
- GitHub Pages export and static tests passed for all eight pages, project-subpath navigation/assets, both downloaded archives and the exact font bytes.
- Archive checks passed for the unchanged 40-file Mac kit and the new 20-file Windows kit, every entry's size/hash, exact allowlists, identical shared firmware/source bytes, helper source matching and privacy scans.
- PowerShell parser and real-file verifier tests passed on macOS with PowerShell 7.6.5, including deliberate corrupt/missing/duplicate data and TFTP-copy failures. The backup helper refused the non-Windows host. See `WINDOWS-REFERENCE-REVIEW.md` for scope and sources.
- React review kept the OS control server-rendered with native accessible links, explicit current-page semantics and existing client boundaries. No client fetching, detection effect or hydration-dependent OS state was added.
- No actual Windows machine, router, flash, network-settings change or browser interaction/visual QA was used for these checks.
- Final production build, TypeScript and lint passed. A local Turbopack process-lookup failure cleared after setting aside its disposable production cache; the preview and source were preserved. The full local HTTP suite passed again afterward.
- GitHub Pages workflow and live checks passed for this update. Vercel's attempt was blocked by commit-author access verification before publication; its previous release remains live. Deployment details and required account connection are recorded in `DEPLOYMENT.md`.

The earlier verification history below describes the preceding four-page release.

- Production build: passed (Next.js 16.3.4); all four localized pages are statically generated, with a dynamic, non-cacheable language-entry redirect.
- TypeScript: passed as part of the production build.
- Code checks: oxlint passed with no errors or warnings.
- Local HTTP checks: passed for English/Bengali findings and walkthrough, cookie/country precedence, explicit-language stability, section coverage, MAC troubleshooting and step link, HTML language, canonical/hreflang/JSON-LD/social metadata, favicon, four generated illustrations, Baloo Da 2 CSS and font response, sitemap, robots, invalid-locale 404, and served ZIP SHA-256.
- Baloo Da 2: self-hosted original variable font (weights 400–800), used on Bengali pages and the বাংলা language control; content matches the upstream Google Fonts Git blob recorded in app/fonts/README.md. License retained. English typography is unchanged. Production build, TypeScript, lint and local HTTP checks were rerun successfully after this font change.
- Archive: exact 40-file manifest, every byte count and SHA-256, four pinned official image hashes, no unexpected backup/state entries, no personal home paths or SSH private-key blocks in text, and shell syntax checks passed. The original Desktop kit was not modified by website work.
- Generated artwork: all four illustrations and the social card visually inspected as image files. Conceptual illustrations are labeled; technical addresses and filenames remain real text.
- The shared Gemini MAC advice was checked against pinned HX21 source and OpenWrt network/wireless documentation. See MAC-REFERENCE-REVIEW.md for the specific corrections. No raw-write fix was executed or added to the archive.

Limits: no physical router, flashing, network-setting change, real Vercel geolocation, deployment, or browser interaction/visual QA was performed. Browser use was limited to reading the user-supplied Gemini reference. Local HTTP testing does not establish hardware compatibility, publication indexing, search ranking or a successful real-device repair.

## Hosting preparation — 3 September 2026

- Vercel-target production build and TypeScript passed after adding build-target-aware asset paths. All existing local HTTP tests passed.
- GitHub Pages static export passed, with all four localized pages. Export tests validated cookie-based entry selection, project-subpath navigation, local asset resolution, the exact Baloo Da 2 font bytes, sitemap, 404 output and backup ZIP integrity.
- The React review preserved server-rendered content, existing client component boundaries and event-driven language selection; no additional client fetching or state was introduced.
- Initial public source set was inspected for private paths and credentials. Local staging, environment files, original Desktop kit, unused font and generated build directories are excluded.
- Both CLI sign-ins succeeded and both hosts are published. See `DEPLOYMENT.md` for production URLs, deployment details and the outstanding optional Vercel GitHub auto-deploy connection.
- Live HTTP checks passed on Vercel and GitHub Pages: public entry behavior, all four English/Bengali pages, canonical/indexing metadata, linked assets, exact Baloo Da 2 font bytes and the full downloaded backup ZIP SHA-256. Vercel cookie precedence passed. GitHub Actions also passed the archive and static-export tests before publishing.
- The Vercel error-log query returned no logs. No browser-interaction/visual QA, external-location geolocation test or physical-router test was performed.
