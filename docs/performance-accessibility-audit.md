# Performance and accessibility audit (2026-11-06)

Production build (`next build` + `next start`), Lighthouse 13, headless Chrome,
default throttling. Pages: /en, /de/ecovadis-unterstuetzung,
/en/resources/esg-evidence-for-suppliers.

| Page | Device | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| /en | desktop | 99 | 96 | 96 | 100 | 1.0 s | 0 | 0 ms |
| /en | mobile | 83 | 96 | 96 | 100 | 4.5 s | 0 | 20 ms |
| /de/ecovadis-unterstuetzung | mobile | 84 | 96 | 96 | 100 | 4.5 s | 0 | 30 ms |
| /en/resources/esg-evidence-for-suppliers | mobile | 86 | 96 | 96 | 100 | 4.2 s | 0 | 20 ms |

## Findings
1. Mobile LCP is the hero entrance animation, not weight or scripts.
   FCP is 1.3-1.4 s; the LCP element (hero text) then waits about 1.1-1.5 s
   for its `ev-rise` animation delay and duration (`HomeLandingPage.module.css`,
   `.heroCopy > *`). With `prefers-reduced-motion` forced, the same page
   scores 100 with LCP 1.3 s. Needs a design decision.
2. Colour contrast: white text on the orange `#fe7001` buttons is 2.78:1
   (needs 4.5:1). Brand colour, so a design decision.
   The low-contrast step cards are captured mid fade-in and are not a real
   fault.
3. Console 404 `/_vercel/insights/script.js` appears only outside Vercel;
   not a production issue.
4. Render-blocking CSS (4 chunks, ~600 ms estimated) is not fixed by
   `experimental.inlineCss` (tested: no gain, reverted).
5. Four resource pages have two H1s: the print-only summary in
   `EsgEvidenceReadinessTool`, `Scope12DataCollectionTool` and
   `EnglishScope12DataCollectionTool` uses `<h1>`. Fixing it means changing
   selectors in `app/globals.css`, which is hash-locked by
   `docs/geo/redesign-baseline.json`. Needs approval to update the hash.
6. Checked on all 54 sitemap pages: one canonical, one description, `lang`
   set, no heading level skips, no `<img>` without `alt`. Only the two
   Privacy pages have no JSON-LD (intentional).

## Update: hero entrance shortened (same day)
`HomeLandingPage.module.css`, hero block only (`app/globals.css` untouched):
- Entrance 700 ms -> 450 ms, delays 80-630 ms -> 40-250 ms, title lines
  1000 ms -> 600 ms.
- Text no longer starts at opacity 0; it rises into place from its first
  frame (`ev-rise` is transform-only, `ev-line-in` starts 40% revealed), so
  the browser can count the hero text as painted straight away.
- Final layout and colours are unchanged.

Mobile Lighthouse after: /en 100, /de/ecovadis-unterstuetzung 100,
/en/resources/esg-evidence-for-suppliers 100; LCP 1.4 s (was 4.2-4.5 s).
Shortening the timings alone (still fading from opacity 0) did not move LCP.
