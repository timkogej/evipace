import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

/**
 * Focused coverage for the active homepage hero: a pure-white, two-column
 * composition whose only visual is the approved Evipace document mark,
 * inlined and animated once with CSS alone.
 *
 * Every guard here reads the working tree directly — no git, no HEAD, no
 * "has this been committed yet" — so the suite behaves the same before and
 * after review.
 */

const files = {
  hero: "components/evipace/hero-mark/AnimatedMarkHero.tsx",
  mark: "components/evipace/hero-mark/EvipaceMarkGraphic.tsx",
  markVariant: "components/evipace/hero-mark/AnimatedEvipaceMark.tsx",
  enHero: "components/evipace/english-home/HomeHero.tsx",
  enPage: "components/evipace/EnglishHomePage.tsx",
  deHome: "components/evipace/GermanHomePage.tsx",
  globals: "app/globals.css",
  approvedSvg: "public/images/brand/evipace-mark-vector.svg",
  packageJson: "package.json"
};

/** The approved source, verified byte-for-byte against the Downloads copy. */
const APPROVED_SVG_SHA256 =
  "aa3fd5b9097ec414105b48a065ae96e8b54fdab0e3439eb9b0cda473d53c8d52";

/**
 * Files this hero must not have touched.
 *
 * The locale layout is deliberately absent: the site intro mounts itself and
 * its content wrapper there. That its metadata, viewport and static-params
 * surface stayed unchanged is asserted in site-intro.test.mjs.
 */
const untouchedHashes = {
  "app/[locale]/page.tsx":
    "4110a483a5303c827f51b2bd2dd684f208b506802d38e1ab93fe676d65cc13d4",
  "app/sitemap.ts":
    "c9d09c0eaadea76b6cdc80ffe69c7e70448d46b596a346ca1e0a1921ef066b50",
  "app/robots.ts":
    "07569ca82f2afb62270f93d18845f81e8230d03bcb7d62082bd6af92261f33ab",
  "lib/seo/page-registry.ts":
    "e65b049a42c5782dad74a461ec83a2b961ace93e6a7a69dfe7dfee4d241b0f2a",
  "lib/seo/build-metadata.ts":
    "ff619511537efc58dcfbb34af01c84473c066d23b75b9396847631d27af67bf6",
  "lib/seo/schema/organization.ts":
    "6b3982189afad7a1ea9a058290a8005f73d385619a47afcc555c766b86a2d30a",
  "lib/seo/schema/website.ts":
    "cc72f403d12576331c5bb591776b6b8c9f6a717d283b464689f17348e43206f1",
  "lib/seo/schema/webpage.ts":
    "2650144cc2e462e462eacc9b8c7ab75ba02d72706fd1126dca5e6fc361120eb3"
};

const [hero, mark, markVariant, enHero, enPage, deHome, globals, approvedSvg] =
  await Promise.all([
    read(files.hero),
    read(files.mark),
    read(files.markVariant),
    read(files.enHero),
    read(files.enPage),
    read(files.deHome),
    read(files.globals),
    read(files.approvedSvg)
  ]);

/** The hero's own CSS block, so the guards can't pass on someone else's rules. */
function markHeroCss(source) {
  const start = source.indexOf("   Homepage hero — animated Evipace mark");
  assert.ok(start > -1, "animated mark CSS block not found");
  const next = source.indexOf("   Homepage hero — workflow steps", start);
  assert.ok(next > start, "workflow CSS block not found");
  return source.slice(start, next);
}

const css = markHeroCss(globals);

/**
 * The same block with comments removed, for "must not contain" guards — the
 * prose above legitimately names the things the rules must never do. The
 * slice starts just inside the block's opening `/*`, so it is restored first.
 */
const cssRules = `/*${css}`.replace(/\/\*[\s\S]*?\*\//g, "");

/** The mark component's JSX, without its explanatory header comment. */
const markJsx = mark.slice(mark.indexOf("export function"));

/** Every path `d`, in document order. The leading \\s keeps `id="…"` out. */
function pathData(source) {
  return [...source.matchAll(/\sd="([^"]+)"/g)].map((match) => match[1]);
}

test("the hero and the mark are plain server components", () => {
  for (const [label, source] of [
    ["AnimatedMarkHero", hero],
    ["EvipaceMarkGraphic", mark],
    ["AnimatedEvipaceMark", markVariant]
  ]) {
    assert.ok(!source.includes('"use client"'), label);
    assert.ok(!source.includes("'use client'"), label);
    assert.ok(!source.includes("useState"), label);
    assert.ok(!source.includes("useEffect"), label);
    assert.ok(!source.includes("useRef"), label);
    assert.ok(!source.includes("setTimeout"), label);
    assert.ok(!source.includes("setInterval"), label);
    assert.ok(!source.includes("requestAnimationFrame"), label);
    assert.ok(!source.includes("IntersectionObserver"), label);
    assert.ok(!source.includes("framer-motion"), label);
    assert.ok(!source.includes("motion."), label);
    assert.ok(!source.includes("gsap"), label);
    assert.ok(!source.includes("lottie"), label);
    assert.ok(!source.includes("<canvas"), label);
    assert.ok(!source.includes("animejs"), label);
  }

  assert.ok(hero.includes("export function AnimatedMarkHero"));
  assert.ok(hero.includes("children: ReactNode"));
  assert.ok(hero.includes('className="mark-hero"'));
  assert.ok(hero.includes("aria-labelledby={headingId}"));
  assert.ok(hero.includes("<AnimatedEvipaceMark"));
});

test("the hero introduces no dependency and no request for the mark", async () => {
  const before = JSON.parse(readFileSync(new URL(files.packageJson, root), "utf8"));
  const declared = [
    ...Object.keys(before.dependencies ?? {}),
    ...Object.keys(before.devDependencies ?? {})
  ];

  for (const banned of ["gsap", "lottie-web", "lottie-react", "animejs", "@lottiefiles/dotlottie-react"]) {
    assert.ok(!declared.includes(banned), banned);
  }

  // The mark is inline markup, never a fetched asset of any kind.
  assert.ok(!markJsx.includes("<img"));
  assert.ok(!markJsx.includes("next/image"));
  assert.ok(!markJsx.includes(".svg"));
  assert.ok(!markJsx.includes(".png"));
  assert.ok(!markJsx.includes(".webp"));
  assert.ok(!markJsx.includes("url("));
  const heroCode = hero.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  assert.ok(!heroCode.includes("<img"));
  assert.ok(!heroCode.includes("<picture"));
  assert.ok(!heroCode.includes("next/image"));
  // The mark itself is inline markup — never a request. The only url() in the
  // hero block is the desktop backdrop photograph, which is a separate thing.
  const urls = [...cssRules.matchAll(/url\("([^"]+)"\)/g)].map((m) => m[1]).sort();
  assert.deepEqual(urls, [
    "/images/evipace/homepage/hero-backdrop-desktop.webp",
    "/images/evipace/homepage/hero-backdrop-mobile.webp"
  ]);
  assert.ok(!cssRules.includes("evipace-mark-vector"));
});

test("the inlined mark reproduces the approved SVG exactly", () => {
  assert.equal(
    createHash("sha256")
      .update(readFileSync(new URL(files.approvedSvg, root)))
      .digest("hex"),
    APPROVED_SVG_SHA256,
    "approved source SVG changed"
  );

  // Same coordinate system.
  assert.ok(approvedSvg.includes('viewBox="0 0 1254 1254"'));
  assert.ok(mark.includes('viewBox="0 0 1254 1254"'));

  // Every approved path `d` survives verbatim, and the mark adds none.
  const approvedPaths = pathData(approvedSvg);
  const inlinedPaths = pathData(mark);
  assert.equal(approvedPaths.length, 3);
  assert.deepEqual(inlinedPaths, approvedPaths);

  // Every approved rect survives with its exact geometry.
  const approvedRects = [...approvedSvg.matchAll(/<rect ([^>]*)\/>/g)].map(
    (match) =>
      Object.fromEntries(
        [...match[1].matchAll(/(\w+)="([^"]+)"/g)].map((attr) => [attr[1], attr[2]])
      )
  );
  assert.equal(approvedRects.length, 3);
  for (const rect of approvedRects) {
    for (const key of ["x", "y", "width", "height", "rx"]) {
      assert.ok(
        new RegExp(`${key}="${rect[key]}"`).test(mark),
        `rect ${key}="${rect[key]}" missing`
      );
    }
  }

  // Both approved fills, and nothing else.
  assert.ok(mark.includes('fill="#0E151B"'));
  assert.ok(mark.includes('fill="#FE7001"'));
  const fills = new Set([...mark.matchAll(/fill="([^"]+)"/g)].map((m) => m[1]));
  assert.deepEqual([...fills].sort(), ["#0E151B", "#FE7001"]);

  // All four logical parts remain separately addressable.
  for (const [id, part] of [
    ["evipace-document-frame", "document-frame"],
    ["evipace-document-lines", "document-lines"],
    ["evipace-fold-underlay", "fold-underlay"],
    ["evipace-orange-corner", "orange-corner"]
  ]) {
    assert.ok(approvedSvg.includes(`id="${id}"`), id);
    assert.ok(mark.includes(`data-mark-part="${part}"`), part);
  }
});

test("the mark is decorative and adds no second logo announcement", () => {
  assert.ok(mark.includes('aria-hidden="true"'));
  assert.ok(mark.includes('focusable="false"'));
  assert.ok(!mark.includes("<title"));
  assert.ok(!mark.includes("<desc"));
  assert.ok(!mark.includes('role="img"'));
  assert.ok(!mark.includes("aria-label"));

  // Explicit intrinsic ratio, so the mark can never shift the layout.
  assert.ok(mark.includes('width="1254"'));
  assert.ok(mark.includes('height="1254"'));
  assert.ok(css.includes("aspect-ratio: 1 / 1"));
});

test("EN and DE both render the new hero with their approved copy", () => {
  assert.ok(
    enHero.includes('import { AnimatedMarkHero } from "../hero-mark/AnimatedMarkHero"')
  );
  assert.ok(
    deHome.includes('import { AnimatedMarkHero } from "./hero-mark/AnimatedMarkHero"')
  );
  assert.ok(enHero.includes("<AnimatedMarkHero"));
  assert.ok(deHome.includes("<AnimatedMarkHero"));
  assert.ok(enPage.includes("<HomeHero />"));

  // Exactly one H1 per locale, still carrying the id the section points at.
  assert.equal(enHero.match(/<h1/g)?.length, 1);
  assert.equal(deHome.match(/<h1/g)?.length, 1);
  assert.ok(enHero.includes('id="hero-title"'));
  assert.ok(deHome.includes('id="hero-title"'));
  assert.ok(enHero.includes('headingId="hero-title"'));
  assert.ok(deHome.includes('headingId="hero-title"'));

  // Approved headlines, verbatim and unchanged in capitalization.
  assert.ok(
    enHero.includes(
      "Practical ESG consulting for manufacturing companies — done faster."
    )
  );
  assert.ok(
    deHome.includes(
      "Praktische ESG-Beratung für produzierende Unternehmen – schneller"
    )
  );
  assert.ok(!enHero.includes("ESG-Beratung für produzierende Unternehmen"));
  assert.ok(!deHome.includes("ESG consulting for manufacturing"));

  // English lead, descriptive copy, trust line.
  assert.ok(
    enHero.includes("Customer questionnaires, emissions data, evidence, policies")
  );
  assert.ok(enHero.includes("Evipace takes care of the practical ESG work"));
  assert.ok(enHero.includes("Customer requests · ESG questionnaires · Scope 1 &amp; 2 · Reporting ·"));

  // German lead, descriptive copy, trust line.
  assert.ok(deHome.includes("Ihre Kunden verlangen ESG-Daten"));
  assert.ok(deHome.includes("Wir strukturieren die Informationen"));
  assert.ok(deHome.includes("Kundenanfragen · Fragebögen · Scope 1 &amp; 2 · VSME · Nachweise"));

  // The secondary paragraph is still in the markup at every width — hidden
  // by CSS below 1024px, never deleted from the server output.
  assert.ok(enHero.includes('className="mark-hero__body-secondary"'));
  assert.ok(deHome.includes('className="mark-hero__body-secondary"'));
  assert.ok(css.includes(".mark-hero__body-secondary"));
});

test("every CTA label and href is unchanged", () => {
  assert.ok(enHero.includes('href="/en/send-request"'));
  assert.ok(enHero.includes("Send your ESG request"));
  assert.ok(enHero.includes('href="#services"'));
  assert.ok(enHero.includes("See what we handle"));

  assert.ok(deHome.includes('const SEND_REQUEST_HREF = "/de/send-request"'));
  assert.ok(deHome.includes("href={SEND_REQUEST_HREF}"));
  assert.ok(deHome.includes("ESG-Anfrage senden"));
  assert.ok(deHome.includes('href="#leistungen"'));
  assert.ok(deHome.includes("Leistungen ansehen"));
});

test("the hero is white, two-column on desktop and stacked below 1024px", () => {
  assert.ok(css.includes(".mark-hero {"));
  assert.ok(css.includes("background: #ffffff;"));
  assert.ok(css.includes(".mark-hero__inner"));
  assert.ok(css.includes(".mark-hero__content"));
  assert.ok(css.includes(".mark-hero__visual"));
  assert.ok(css.includes(".mark-hero__mark"));

  // Stacked base layout: copy first, mark centred underneath.
  assert.ok(css.includes("flex-direction: column;"));
  assert.ok(css.includes("justify-content: center;"));

  // Desktop: a genuine two-column grid, copy left / mark right.
  assert.ok(css.includes("@media (min-width: 1024px)"));
  assert.ok(css.includes("grid-template-columns: minmax(0, 44fr) minmax(0, 56fr);"));
  assert.ok(css.includes("width: clamp(340px, 34vw, 535px);"));

  // The hero itself is still white. Neither photograph is declared outside a
  // media query, so the base layer paints nothing on its own and each plate
  // reaches only the widths it was cut for.
  const unqueried = cssRules.slice(0, cssRules.indexOf("@media"));
  assert.ok(!unqueried.includes("background-image"));
  assert.ok(!unqueried.includes("url("));
  assert.ok(!unqueried.includes("box-shadow"));

  // Still no scrim over the content, no glass, no blur, no raster hero plate.
  for (const banned of ["scrim", "picture", "backdrop-filter", "blur("]) {
    assert.ok(!cssRules.includes(banned), banned);
  }

  // The hero owns its namespace and never reaches into the rollback ones.
  assert.ok(!cssRules.includes("meeting-hero"));
  assert.ok(!cssRules.includes("hero-desk"));
});

test("each backdrop plate reaches only the widths it was cut for", () => {
  const mobileBlock = cssRules.slice(
    cssRules.indexOf("@media (max-width: 1023.98px)"),
    cssRules.indexOf("@media (min-width: 1024px)")
  );
  const desktop = cssRules.slice(cssRules.indexOf("@media (min-width: 1024px)"));

  // Landscape plate above 1024, portrait plate below it. Because each is
  // declared inside a media query, an unmatched query means the file is never
  // requested — a phone downloads no landscape plate at all, and vice versa.
  assert.ok(desktop.includes('url("/images/evipace/homepage/hero-backdrop-desktop.webp")'));
  assert.ok(!desktop.includes("hero-backdrop-mobile"));
  assert.ok(mobileBlock.includes('url("/images/evipace/homepage/hero-backdrop-mobile.webp")'));
  assert.ok(!mobileBlock.includes("hero-backdrop-desktop"));

  // Shared painting rules live on the base element, once.
  assert.ok(cssRules.includes("background-size: cover;"));
  assert.ok(cssRules.includes("background-position: center;"));
  assert.ok(cssRules.includes("pointer-events: none;"));

  // Readability washes, not decorative tints. The desktop one is densest
  // behind the copy column; the phone one holds the picture open across the
  // copy and closes to white under the mark and the step cards. Both end at
  // solid white so the hero meets the next section without a step.
  assert.ok(desktop.includes("rgba(255, 255, 255, 0.9) 0%"));
  assert.ok(desktop.includes("rgba(255, 255, 255, 0.55) 100%"));
  assert.ok(mobileBlock.includes("rgba(255, 255, 255, 0.66) 0%"));
  assert.ok(mobileBlock.includes("rgba(255, 255, 255, 0.94) 84%"));
  assert.equal((cssRules.match(/#ffffff 100%/g) ?? []).length, 2);

  // The trust line stopped being a translucent ink at every width, because
  // over a photograph its rendered colour would move with the picture.
  assert.ok(cssRules.includes("color: #4a443e;"));
  assert.ok(!cssRules.includes("rgba(21, 21, 21, 0.68)"));

  // The hero clips the backdrop, so the entrance scale cannot overflow.
  assert.ok(cssRules.includes("overflow: hidden;"));

  // Both assets are WebP, and neither raw PNG was left in public/.
  for (const name of ["hero-backdrop-desktop", "hero-backdrop-mobile"]) {
    assert.ok(existsSync(new URL(`public/images/evipace/homepage/${name}.webp`, root)), name);
  }
  for (const raw of [
    "evipace-hero-5-background.png",
    "evipace-hero-5-background-mobile.png"
  ]) {
    assert.ok(!existsSync(new URL(`public/images/evipace/homepage/${raw}`, root)), raw);
  }
});

test("the backdrop settles with the intro and is inert without it", () => {
  // Opt-in: no attribute, no animation. That is what reduced motion, no-JS
  // and client-side navigation to the homepage all get.
  assert.ok(cssRules.includes(".mark-hero[data-intro-backdrop] .mark-hero__backdrop"));
  assert.ok(cssRules.includes("animation: mark-hero-backdrop-settle 1400ms"));
  assert.ok(cssRules.includes("var(--backdrop-delay, 0ms) backwards"));

  // The phone intro is a shorter sequence, so its settle is too.
  const phone = cssRules.slice(cssRules.indexOf("@media (max-width: 767.98px)"));
  assert.ok(phone.includes("animation-duration: 1000ms;"));
  assert.ok(!/^\s*\.mark-hero__backdrop \{[^}]*animation:/m.test(cssRules));

  // It settles rather than fades: the white intro surface lifting away is
  // already the reveal, so a second fade underneath would only muddy it.
  const frames = cssRules.slice(cssRules.indexOf("@keyframes mark-hero-backdrop-settle"));
  assert.ok(frames.includes("transform: scale(1.06);"));
  assert.ok(frames.includes("transform: scale(1);"));
  assert.ok(!/@keyframes mark-hero-backdrop-settle \{[^@]*opacity/.test(frames));
});

test("the entrance runs once and every part ends on its final state", () => {
  // One-time only: nothing loops, alternates or repeats.
  assert.ok(!css.includes("infinite"));
  assert.ok(!css.includes("alternate"));
  assert.ok(!/animation-iteration-count/.test(css));

  // Four keyframe sets, one per phase of the assembly.
  for (const name of [
    "mark-hero-frame",
    "mark-hero-fold",
    "mark-hero-corner",
    "mark-hero-line"
  ]) {
    assert.ok(css.includes(`@keyframes ${name}`), name);
  }

  // `backwards`, never `forwards`/`both`: after the animation each part
  // reverts to its base rule, which is already the finished mark.
  const animations = [...css.matchAll(/^\s*animation: ([^;]+);/gm)]
    .map((m) => m[1])
    .filter((shorthand) => shorthand !== "none !important");
  assert.equal(animations.length, 5, animations.join(" | "));
  for (const shorthand of animations) {
    assert.ok(shorthand.includes("backwards"), shorthand);
    assert.ok(!shorthand.includes("forwards"), shorthand);
    assert.ok(!/\bboth\b/.test(shorthand), shorthand);
    assert.ok(!shorthand.includes("infinite"), shorthand);
  }

  // No base rule leaves a part hidden, displaced or clipped.
  assert.ok(!/^\s*opacity: 0;/m.test(css.replace(/@keyframes[\s\S]*?\n}\n/g, "")));
  const outsideKeyframes = css.replace(/@keyframes[\s\S]*?\n}\n/g, "");
  assert.ok(!/^\s*transform: (translate|rotate|scale)/m.test(outsideKeyframes));
  assert.ok(!/^\s*clip-path:/m.test(outsideKeyframes));

  // The corner pivots at the approved top join, in the mark's own space.
  assert.ok(css.includes("transform-origin: 668px 147px;"));

  // Approximate approved timing: the last line lands just past 2s.
  assert.ok(css.includes("animation: mark-hero-frame 900ms"));
  assert.ok(css.includes("mark-hero-fold 560ms cubic-bezier(0.22, 0.61, 0.28, 1) 700ms"));
  assert.ok(css.includes("mark-hero-corner 650ms cubic-bezier(0.25, 0.9, 0.3, 1) 850ms"));
  assert.ok(css.includes("animation-delay: 1180ms;"));
  assert.ok(css.includes("animation-delay: 1345ms;"));
  assert.ok(css.includes("animation-delay: 1510ms;"));
});

test("reduced motion shows the complete mark with no motion at all", () => {
  const query = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
  assert.ok(query.startsWith("@media (prefers-reduced-motion: reduce)"));

  for (const part of [
    ".mark-hero__frame",
    ".mark-hero__fold",
    ".mark-hero__corner",
    ".mark-hero__line"
  ]) {
    assert.ok(query.includes(part), part);
  }
  assert.ok(query.includes("animation: none !important;"));

  // Because the base states are the finished mark, killing the animation is
  // the whole implementation — there is no separate reduced-motion artwork,
  // and no transition left to play.
  assert.ok(!query.includes("transition"));
  assert.ok(!query.includes("opacity: 0"));
  assert.ok(!css.includes("transition:"));
});

test("no metadata, route or SEO source was modified", () => {
  for (const [file, expectedHash] of Object.entries(untouchedHashes)) {
    const url = new URL(file, root);
    assert.ok(existsSync(url), file);
    assert.equal(
      createHash("sha256").update(readFileSync(url)).digest("hex"),
      expectedHash,
      `${file} changed unexpectedly`
    );
  }
});
