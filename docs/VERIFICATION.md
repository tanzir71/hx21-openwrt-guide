# Verification — 2 September 2026

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
- Publication is awaiting the user's GitHub and Vercel CLI sign-ins. No live-host verification has been completed yet.
