import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

/**
 * Focused coverage for the global site intro: the branded opening that plays
 * once per document, hands its mark to the homepage hero, and then removes
 * itself completely.
 *
 * Every guard reads the working tree directly — no git, no HEAD, no "has this
 * been committed yet" — so the suite behaves the same before and after review.
 */

const files = {
  intro: "components/evipace/site-intro/SiteIntro.tsx",
  controller: "components/evipace/site-intro/SiteIntroController.tsx",
  introMark: "components/evipace/site-intro/SiteIntroMark.tsx",
  graphic: "components/evipace/hero-mark/EvipaceMarkGraphic.tsx",
  heroMark: "components/evipace/hero-mark/AnimatedEvipaceMark.tsx",
  hero: "components/evipace/hero-mark/AnimatedMarkHero.tsx",
  workflow: "components/evipace/hero-mark/HeroWorkflow.tsx",
  steps: "components/evipace/hero-mark/workflow-steps.ts",
  layout: "app/[locale]/layout.tsx",
  enHero: "components/evipace/english-home/HomeHero.tsx",
  deHome: "components/evipace/GermanHomePage.tsx",
  globals: "app/globals.css",
  approvedSvg: "public/images/brand/evipace-mark-vector.svg",
  packageJson: "package.json"
};

const [
  intro,
  controller,
  introMark,
  graphic,
  heroMark,
  hero,
  workflow,
  steps,
  layout,
  enHero,
  deHome,
  globals,
  approvedSvg
] = await Promise.all([
  read(files.intro),
  read(files.controller),
  read(files.introMark),
  read(files.graphic),
  read(files.heroMark),
  read(files.hero),
  read(files.workflow),
  read(files.steps),
  read(files.layout),
  read(files.enHero),
  read(files.deHome),
  read(files.globals),
  read(files.approvedSvg)
]);

/**
 * Source with comments removed. Prose legitimately names the very things the
 * code must not contain ("no localStorage", "no elastic overshoot"), so every
 * "must not appear" guard reads this rather than the raw file.
 */
function codeOnly(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

/** One named CSS block, so a guard cannot pass on someone else's rules. */
function cssBlock(source, heading, nextHeading) {
  const start = source.indexOf(heading);
  assert.ok(start > -1, `CSS block not found: ${heading}`);
  const end = source.indexOf(nextHeading, start);
  assert.ok(end > start, `CSS block end not found: ${nextHeading}`);
  return source.slice(start, end);
}

const workflowCss = cssBlock(
  globals,
  "   Homepage hero — workflow steps",
  "   Site intro — the branded opening"
);
const introCss = cssBlock(
  globals,
  "   Site intro — the branded opening",
  "   Homepage sections — evidence board"
);

test("only the controller is a client component", () => {
  assert.ok(controller.includes('"use client"'));

  for (const [label, source] of [
    ["SiteIntro", intro],
    ["SiteIntroMark", introMark],
    ["EvipaceMarkGraphic", graphic],
    ["AnimatedEvipaceMark", heroMark],
    ["AnimatedMarkHero", hero],
    ["HeroWorkflow", workflow],
    ["layout", layout],
    ["HomeHero", enHero],
    ["GermanHomePage", deHome]
  ]) {
    assert.ok(!source.includes('"use client"'), label);
    assert.ok(!source.includes("'use client'"), label);
    assert.ok(!source.includes("useState"), label);
    assert.ok(!source.includes("useEffect"), label);
  }

  // The controller renders nothing and owns no state.
  assert.ok(controller.includes("return null;"));
  assert.ok(!controller.includes("useState"));
  assert.ok(!controller.includes("createContext"));
  assert.ok(!controller.includes("zustand"));
  assert.ok(!controller.includes("redux"));
});

test("the intro adds no animation dependency and fetches no asset", () => {
  const pkg = JSON.parse(readFileSync(new URL(files.packageJson, root), "utf8"));
  const declared = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {})
  ];
  for (const banned of [
    "gsap",
    "lottie-web",
    "lottie-react",
    "animejs",
    "@lottiefiles/dotlottie-react",
    "motion"
  ]) {
    assert.ok(!declared.includes(banned), banned);
  }

  for (const [label, source] of [
    ["SiteIntro", intro],
    ["controller", controller],
    ["introMark", introMark]
  ]) {
    assert.ok(!source.includes("framer-motion"), label);
    assert.ok(!source.includes("gsap"), label);
    assert.ok(!source.includes("lottie"), label);
    assert.ok(!source.includes("<canvas"), label);
    assert.ok(!source.includes("WebGL"), label);
    assert.ok(!source.includes("<video"), label);
    assert.ok(!source.includes("fetch("), label);
    assert.ok(!source.includes("next/image"), label);
    assert.ok(!source.includes(".gif"), label);
    assert.ok(!source.includes(".mp4"), label);
  }

  // Native APIs only.
  assert.ok(controller.includes(".animate("));
  assert.ok(controller.includes("matchMedia"));
  assert.ok(controller.includes("getBoundingClientRect"));
  assert.ok(controller.includes("requestAnimationFrame"));

  // The mark is inline markup, never a request, in both variants.
  assert.ok(!introCss.replace(/\/\*[\s\S]*?\*\//g, "").includes("url("));
  assert.ok(!introMark.includes("<img"));
  assert.ok(!intro.includes("<img"));
});

test("one shared geometry source feeds every drawing of the mark", () => {
  assert.equal(
    createHash("sha256")
      .update(readFileSync(new URL(files.approvedSvg, root)))
      .digest("hex"),
    "aa3fd5b9097ec414105b48a065ae96e8b54fdab0e3439eb9b0cda473d53c8d52",
    "approved source SVG changed"
  );

  // Both variants delegate; neither carries geometry of its own.
  assert.ok(heroMark.includes("EvipaceMarkGraphic"));
  assert.ok(introMark.includes("EvipaceMarkGraphic"));
  assert.ok(heroMark.includes('namespace="mark-hero"'));
  assert.ok(introMark.includes('namespace="site-intro"'));
  for (const [label, source] of [
    ["AnimatedEvipaceMark", heroMark],
    ["SiteIntroMark", introMark]
  ]) {
    assert.ok(!/\sd="M/.test(source), `${label} holds its own path data`);
    assert.ok(!source.includes("<rect"), `${label} holds its own rects`);
    assert.ok(!source.includes("viewBox"), `${label} holds its own viewBox`);
  }

  // The shared graphic reproduces the approved file exactly.
  const paths = (source) =>
    [...source.matchAll(/\sd="([^"]+)"/g)].map((match) => match[1]);
  const approvedPaths = paths(approvedSvg);
  assert.equal(approvedPaths.length, 3);
  assert.deepEqual(paths(graphic), approvedPaths);

  assert.ok(approvedSvg.includes('viewBox="0 0 1254 1254"'));
  assert.ok(graphic.includes('viewBox="0 0 1254 1254"'));

  const approvedRects = [...approvedSvg.matchAll(/<rect ([^>]*)\/>/g)].map((match) =>
    Object.fromEntries(
      [...match[1].matchAll(/(\w+)="([^"]+)"/g)].map((attr) => [attr[1], attr[2]])
    )
  );
  assert.equal(approvedRects.length, 3);
  for (const rect of approvedRects) {
    for (const key of ["x", "y", "width", "height", "rx"]) {
      assert.ok(
        new RegExp(`${key}="${rect[key]}"`).test(graphic),
        `rect ${key}="${rect[key]}" missing`
      );
    }
  }

  const fills = new Set([...graphic.matchAll(/fill="([^"]+)"/g)].map((m) => m[1]));
  assert.deepEqual([...fills].sort(), ["#0E151B", "#FE7001"]);

  // All four logical parts stay addressable, without minting duplicate ids —
  // both marks are in the document at once during the handoff.
  for (const part of [
    "document-frame",
    "document-lines",
    "fold-underlay",
    "orange-corner"
  ]) {
    assert.ok(graphic.includes(`data-mark-part="${part}"`), part);
  }
  assert.ok(!graphic.includes('id="evipace-'), "duplicate-prone ids reintroduced");

  // The redundant second copy of the source file is gone; the kept one stays.
  assert.ok(existsSync(new URL(files.approvedSvg, root)));
  assert.ok(
    !existsSync(new URL("public/images/evipace/brand/evipace-mark-vector.svg", root))
  );
});

test("the overlay is decorative, silent and never a click target", () => {
  assert.ok(intro.includes('aria-hidden="true"'));
  assert.ok(intro.includes('role="presentation"'));
  assert.ok(intro.includes("data-site-intro-overlay"));
  assert.ok(introCss.includes("pointer-events: none;"));

  // No loading language, no progress affordance, no sound.
  for (const banned of [
    "Loading",
    "loading",
    "Welcome",
    "spinner",
    "progress",
    "%",
    "<audio"
  ]) {
    assert.ok(!codeOnly(intro).includes(banned), banned);
  }
  assert.ok(!intro.includes("aria-live"));
  assert.ok(!intro.includes("aria-busy"));
  assert.ok(!intro.includes("tabIndex"));
});

test("playback is per document and never replays on client navigation", () => {
  // A module binding, not storage: a new document resets it, a route change
  // does not.
  assert.ok(/^let introConsumed = false;$/m.test(controller));
  assert.ok(controller.includes("if (introConsumed) return;"));
  assert.ok(controller.includes("introConsumed = true;"));

  // Storage of any kind would break refresh eligibility.
  const controllerCode = codeOnly(controller);
  const introCode = codeOnly(intro);
  for (const [label, source] of [
    ["controller", controllerCode],
    ["SiteIntro", introCode]
  ]) {
    assert.ok(!source.includes("localStorage"), label);
    assert.ok(!source.includes("sessionStorage"), label);
    assert.ok(!source.includes("document.cookie"), label);
  }

  // Mounted once in the persistent layout, so a route change cannot remount it.
  assert.ok(layout.includes("<SiteIntro />"));
  assert.ok(layout.includes('import { SiteIntro }'));

  // The effect runs on mount only.
  assert.ok(controller.includes("useEffect(() => {"));
  assert.ok(controller.includes("}, []);"));

  // bfcache: a restore reuses the realm, and the pageshow guard reveals rather
  // than replays.
  assert.ok(controller.includes("pageshow"));
  assert.ok(controller.includes("event.persisted"));
  assert.ok(controller.includes("if (event.persisted) finish();"));
});

test("route classification covers both locales and trailing slashes", () => {
  // The rule lives in the controller. Reading the shipped literal straight out
  // of the source means this can never drift from the regex that actually runs.
  const match = controller.match(/return (\/\^[^;]+)\.test\(pathname\);/);
  assert.ok(match, "isHomepagePath regex not found");
  const [, pattern, flags] = match[1].match(/^\/(.*)\/([a-z]*)$/);
  const shipped = new RegExp(pattern, flags);

  for (const path of ["/en", "/en/", "/de", "/de/"]) {
    assert.ok(shipped.test(path), path);
  }
  for (const path of [
    "/en/about",
    "/de/about",
    "/en/esg-customer-requests",
    "/sl",
    "/",
    "/end"
  ]) {
    assert.ok(!shipped.test(path), path);
  }

  // Query and hash never reach the matcher: it is fed location.pathname.
  assert.ok(controller.includes("isHomepagePath(window.location.pathname)"));
});

test("desktop homepage measures a target; nothing else looks for one", () => {
  // The landing path is gated on all three conditions together.
  assert.ok(
    controller.includes(
      'if (!isMobile && isDesktop && onHomepage && heroMark) mode = "flip";'
    )
  );
  assert.ok(controller.includes('let mode: Mode = isMobile ? "phone" : "fade";'));

  // Measurement only happens inside the flip branch.
  assert.ok(controller.includes('if (mode === "flip") {'));
  assert.ok(controller.includes("measureHeroTarget(heroMark as HTMLElement, content)"));
  assert.ok(controller.includes("function measureHeroTarget("));
  assert.ok(controller.includes("heroMark.getBoundingClientRect()"));

  // A hero that is missing, unlaid-out or scrolled away falls back to the
  // fade exit rather than throwing the mark off screen.
  assert.ok(controller.includes("if (!target || !source.width) {"));
  assert.ok(controller.includes("runFadeExit();"));
  assert.ok(controller.includes("if (!rect.width || !rect.height) return null;"));
  assert.ok(controller.includes("visibleHeight < rect.height * 0.6"));

  // Premium settle, no spring.
  assert.ok(controller.includes('const EASE_LAND = "cubic-bezier(0.22, 1, 0.36, 1)"'));
  const code = codeOnly(controller);
  assert.ok(!code.includes("elastic"));
  assert.ok(!code.includes("bounce"));
  assert.ok(!code.includes("rotate("));
});

test("the handoff swaps both marks in one frame, at the same position", () => {
  // Same rect, same scale: the intro mark is animated onto the hero mark's box.
  assert.ok(controller.includes("const scale = target.width / source.width;"));
  assert.ok(controller.includes("target.left + target.width / 2 - (source.left + source.width / 2)"));
  assert.ok(controller.includes("target.top + target.height / 2 - (source.top + source.height / 2)"));

  // Reveal the hero mark and stop painting the intro mark together, then
  // remove the overlay on the next frame.
  const handoff = controller.slice(controller.indexOf("move.finished"));
  assert.ok(handoff.includes('heroMark.style.opacity = "1";'));
  assert.ok(handoff.includes('introMark.style.opacity = "0";'));
  assert.ok(handoff.includes("requestAnimationFrame(() => finish(false))"));
  assert.ok(
    handoff.indexOf('heroMark.style.opacity = "1";') <
      handoff.indexOf("requestAnimationFrame(() => finish(false))")
  );

  // The hero mark is held back only on the landing path, so no second mark is
  // ever visible elsewhere on the page while the intro mark is in flight. On
  // every other path it is marked finished up front, so the reveal never shows
  // a half-drawn assembly either.
  assert.ok(controller.includes('if (mode === "flip") heroMark.style.opacity = "0";'));
  assert.ok(controller.includes('else heroMark.dataset.introLanded = "true";'));

  // And the mark it lands on never replays its own assembly underneath.
  assert.ok(controller.includes('heroMark.dataset.introLanded = "true";'));
  assert.ok(introCss.includes(".mark-hero__mark[data-intro-landed] .mark-hero__frame"));
  assert.ok(introCss.includes("animation: none !important;"));
});

test("phones lift the mark away rather than whipping it off screen", () => {
  const code = codeOnly(controller);

  // The leftward camera whip is gone: no sideways travel, no scale-up, no
  // motion blur anywhere in the controller.
  assert.ok(!code.includes("whip"));
  assert.ok(!code.includes("EASE_WHIP"));
  assert.ok(!code.includes("blur("));
  assert.ok(!code.includes("vw, 0, 0)"));
  assert.ok(!/scale\(1\.0[1-9]\)/.test(code));
  assert.ok(!code.includes("rotate("));
  assert.ok(!code.includes("skew"));

  // Phones take the same lift as tablets and subpages, on their own clock.
  assert.ok(controller.includes('let mode: Mode = isMobile ? "phone" : "fade";'));
  assert.ok(controller.includes('if (mode !== "flip") at(T[mode].start, runFadeExit);'));
  assert.ok(controller.includes('type Mode = "flip" | "fade" | "phone";'));
  assert.ok(controller.includes("phone: { start: 1080, duration: 320 }"));
  assert.ok(controller.includes('const MOBILE_QUERY = "(max-width: 767.98px)"'));

  // One exit motion for both: shrink slightly, fade out.
  const exit = controller.slice(
    controller.indexOf("const runFadeExit"),
    controller.indexOf("/* ── the white surface lifts ── */")
  );
  assert.ok(exit.includes('{ opacity: 1, transform: "scale(1)" }'));
  assert.ok(exit.includes('{ opacity: 0, transform: "scale(0.95)" }'));

  // The content reveal is vertical everywhere now — the sideways entry only
  // made sense as the tail of a sideways exit.
  assert.ok(controller.includes('{ opacity: 0, transform: "translate3d(0, 16px, 0)" }'));
  assert.ok(!code.includes("translate3d(20px, 0, 0)"));

  // Only the dedicated wrapper is ever transformed.
  assert.ok(layout.includes('<div data-site-intro-content="">{children}</div>'));
  assert.ok(controller.includes('document.querySelector<HTMLElement>("[data-site-intro-content]")'));
  assert.ok(!controller.includes("document.body.style.transform"));
  assert.ok(!controller.includes("document.documentElement.style.transform"));
  assert.ok(!controller.includes("root.style.transform"));
});

test("reduced motion skips the intro instead of shortening it", () => {
  // CSS removes the layer outright, so there is no white frame at all.
  const query = introCss.slice(introCss.indexOf("@media (prefers-reduced-motion: reduce)"));
  assert.ok(query.includes(".site-intro {"));
  assert.ok(query.includes("display: none !important;"));

  // The boot script never arms it, and the controller bails immediately.
  assert.ok(intro.includes('matchMedia("(prefers-reduced-motion: reduce)").matches'));
  assert.ok(intro.includes("{reveal();return;}"));
  assert.ok(
    controller.includes(
      'const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"'
    )
  );
  assert.ok(controller.includes("prefersReducedMotion ||"));

  // No scroll lock, no staged reveal: the bail happens before either is set.
  const bail = controller.indexOf("finish();\n    return;");
  assert.ok(bail > -1);
  assert.ok(controller.indexOf('root.style.overflow = "hidden";') > bail);
  assert.ok(controller.indexOf('content.style.opacity = "0"') > bail);
});

test("no-JS bypasses the overlay and leaves the page complete", () => {
  assert.ok(intro.includes("<noscript>"));
  assert.ok(
    intro.includes('"[data-site-intro-overlay]{display:none !important}"')
  );

  // Nothing the page needs is created by JavaScript: the overlay, the marks,
  // the hero and the workflow steps are all server-rendered.
  assert.ok(!controller.includes("createElement"));
  assert.ok(!controller.includes("innerHTML"));
  assert.ok(hero.includes("<HeroWorkflow"));
  assert.ok(workflow.includes("<ol"));

  // The workflow entrance is opt-in, so the steps can never be left hidden by
  // a reveal signal that did not arrive.
  assert.ok(workflowCss.includes(".mark-hero__stage[data-workflow-enter] .mark-hero__workflow-node"));
  const ungated = workflowCss.replace(/\/\*[\s\S]*?\*\//g, "");
  assert.ok(!/^\.mark-hero__workflow-node \{[^}]*animation:/m.test(ungated));
  assert.ok(controller.includes('stage.dataset.workflowEnter = "";'));
});

test("the intro survives React Strict Mode's double mount", () => {
  // Strict Mode runs every effect twice (mount, cleanup, mount). A cleanup
  // that tore the intro down aborted it a few hundred ms in, and the
  // per-document latch then stopped the remount restarting it — a white flash
  // in dev. The effect must therefore return nothing.
  const effect = controller.slice(
    controller.indexOf("export function SiteIntroController()"),
    controller.indexOf("function runIntro(")
  );
  assert.ok(effect.includes("runIntro();"));
  assert.ok(!effect.includes("return runIntro"));
  assert.ok(!/return\s*\(\)\s*=>/.test(effect));
  assert.ok(controller.includes("function runIntro(): void {"));
});

test("a late start plays the exit out instead of collapsing it", () => {
  // Phase clocks are anchored to document parse, but hydration can land after
  // the whole schedule (dev server, cold cache, slow device). Subtracting
  // performance.now() would fire every phase with a zero delay.
  assert.ok(controller.includes("const ASSEMBLY_END = { desktop: 1260, mobile: 1080 }"));
  assert.ok(
    controller.includes(
      "startedAt - (isMobile ? ASSEMBLY_END.mobile : ASSEMBLY_END.desktop)"
    )
  );
  assert.ok(controller.includes("const shift = Math.max("));

  // One clock reading for the whole setup, and every schedule rides the shift.
  assert.ok(controller.includes("const startedAt = performance.now();"));
  assert.ok(
    controller.includes(
      "timers.push(window.setTimeout(fn, Math.max(0, delay + shift - startedAt)));"
    )
  );
  assert.ok(controller.includes("landsAt + shift - startedAt"));
  assert.equal((codeOnly(controller).match(/performance\.now\(\)/g) ?? []).length, 1);

  // The boot failsafe is handed over as soon as the controller takes charge,
  // so it cannot tear the overlay away mid-exit.
  const setup = controller.slice(controller.indexOf("  try {"));
  assert.ok(setup.indexOf("clearBootFailsafe();") < setup.indexOf("const isMobile"));
});

test("the pre-hydration attribute cannot report a hydration mismatch", () => {
  // The boot script stamps data-site-intro on <html> before React arrives, so
  // the attribute is script-owned. Flagged on that element only.
  assert.ok(layout.includes("suppressHydrationWarning"));
  assert.ok(intro.includes('r.setAttribute("data-site-intro","playing")'));

  // <html> is not server-rendered with the attribute: no-JS must never be left
  // holding a state the boot script would have moved on from.
  assert.ok(!layout.includes('data-site-intro="'));

  // And nothing is left gating an animation on that attribute, so a state that
  // never advances can no longer strand a paused entrance.
  assert.ok(!globals.includes("animation-play-state: paused;\n}\n\n/* The mark"));
  assert.ok(!/data-site-intro="playing"\][^{]*\{[^}]*animation-play-state/.test(globals));
});

test("Escape skips, hidden tabs finish, and the failsafe always reveals", () => {
  assert.ok(controller.includes('if (event.key === "Escape") finish();'));
  assert.ok(controller.includes('document.addEventListener("keydown", onKeyDown, true)'));
  assert.ok(controller.includes("if (document.hidden) finish();"));
  assert.ok(controller.includes('document.addEventListener("visibilitychange", onVisibilityChange)'));

  // Two independent failsafes, one of them armed before hydration.
  assert.ok(intro.includes("window.setTimeout(reveal,3000)"));
  assert.ok(controller.includes("at(3000, finish);"));

  // A setup failure reveals rather than traps.
  assert.ok(controller.includes("} catch {\n    finish();\n  }"));
  assert.ok(intro.includes("}catch(e){reveal();}"));

  // The boot failsafe undoes the same things the controller does, without
  // needing the controller.
  assert.ok(intro.includes('r.style.removeProperty("overflow")'));
  assert.ok(intro.includes('document.body.style.removeProperty("overflow")'));
  assert.ok(intro.includes('o.parentNode.removeChild(o)'));
});

test("every exit path restores scrolling and disposes of the overlay", () => {
  const finish = controller.slice(
    controller.indexOf("const finish = (skipped = true) => {"),
    controller.indexOf("function onKeyDown")
  );

  assert.ok(finish.includes("if (finished) return;"));

  // A skip must not leave Phase 4 waiting on a delay that no longer means
  // anything: the steps drop back to their permanently-visible default.
  assert.ok(finish.includes("const finish = (skipped = true) => {"));
  assert.ok(finish.includes('stage.removeAttribute("data-workflow-enter");'));
  assert.ok(finish.includes('stage.style.removeProperty("--workflow-delay");'));
  assert.ok(finish.includes("for (const id of timers) window.clearTimeout(id);"));
  assert.ok(finish.includes("animation.cancel();"));
  assert.ok(finish.includes('document.removeEventListener("keydown", onKeyDown, true)'));
  assert.ok(finish.includes('document.removeEventListener("visibilitychange", onVisibilityChange)'));
  assert.ok(finish.includes('window.removeEventListener("pageshow", onPageShow)'));
  assert.ok(finish.includes('root.style.removeProperty("overflow");'));
  assert.ok(finish.includes('document.body.style.removeProperty("overflow");'));
  assert.ok(finish.includes("window.scrollTo(0, scrollY)"));
  assert.ok(finish.includes('root.setAttribute("data-site-intro", "done");'));
  assert.ok(finish.includes("overlay?.remove();"));

  // Scroll position is captured before the lock, so a refresh part-way down
  // the page cannot jump.
  assert.ok(controller.includes("const scrollY = window.scrollY;"));
  assert.ok(
    controller.indexOf("const scrollY = window.scrollY;") <
      controller.indexOf('root.style.overflow = "hidden";')
  );

  // finish() is reached on every path, so teardown never depends on unmount.
  assert.ok(controller.includes("at(3000, finish);"));

  // Even a layer that somehow survived stops painting and stops taking hits.
  assert.ok(introCss.includes('html[data-site-intro="done"] .site-intro'));

  // No smooth-scroll shim and no scroll-linked animation.
  assert.ok(!controller.includes("scroll-behavior"));
  assert.ok(!controller.includes('addEventListener("scroll"'));
  assert.ok(!controller.includes("ScrollTimeline"));
});

test("the workflow steps are semantic content with the approved copy", () => {
  assert.ok(workflow.includes("<ol aria-label={label}"));
  assert.ok(workflow.includes("<li"));
  assert.ok(workflow.includes("heroWorkflow[locale]"));

  // One data structure, one visual component.
  assert.ok(steps.includes("en:"));
  assert.ok(steps.includes("de:"));
  assert.equal((workflow.match(/<ol/g) ?? []).length, 1);

  for (const line of [
    "You send the request",
    "We handle the ESG work",
    "You receive a ready-to-submit result",
    "Sie senden die Anfrage",
    "Wir übernehmen die ESG-Arbeit",
    "Sie erhalten ein einreichungsfertiges Ergebnis"
  ]) {
    assert.ok(steps.includes(line), line);
  }
  const stepsCode = codeOnly(steps);
  for (const number of ["01", "02", "03"]) {
    assert.equal(
      (stepsCode.match(new RegExp(`number: "${number}"`, "g")) ?? []).length,
      2,
      number
    );
  }

  // Localized accessible name for the list, in both locales.
  assert.ok(steps.includes("label: \"How working with Evipace runs\""));
  assert.ok(steps.includes("label: \"So läuft die Zusammenarbeit mit Evipace\""));

  // Wired to the hero, per locale, and nowhere else.
  assert.ok(hero.includes("<HeroWorkflow locale={locale} />"));
  assert.ok(enHero.includes('locale="en"'));
  assert.ok(deHome.includes('locale="de"'));
});

test("nothing in the hero or the intro loops", () => {
  const rules = (block) => block.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const [label, block] of [
    ["workflow", rules(workflowCss)],
    ["intro", rules(introCss)]
  ]) {
    assert.ok(!block.includes("infinite"), label);
    assert.ok(!block.includes("alternate"), label);
    assert.ok(!block.includes("animation-iteration-count"), label);
  }

  // Every shorthand is a one-shot with a `backwards` fill, so the resting
  // state is always the finished composition.
  const shorthands = [...`${workflowCss}${introCss}`.matchAll(/animation:\s*([^;]+);/g)]
    .map((m) => m[1].replace(/\s+/g, " ").trim())
    .filter((value) => value !== "none !important");
  assert.ok(shorthands.length >= 8);
  for (const shorthand of shorthands) {
    assert.ok(shorthand.includes("backwards"), shorthand);
    assert.ok(!shorthand.includes("forwards"), shorthand);
    assert.ok(!shorthand.includes("infinite"), shorthand);
  }

  // The controller's own animations fill forwards only where the element is
  // about to be removed; nothing repeats.
  assert.ok(!controller.includes("iterations: Infinity"));
  assert.ok(!controller.includes('direction: "alternate"'));
});

test("metadata, routes and SEO sources are untouched by the intro", async () => {
  const untouched = {
    "app/[locale]/page.tsx":
      "4110a483a5303c827f51b2bd2dd684f208b506802d38e1ab93fe676d65cc13d4",
    "app/sitemap.ts":
      "c9d09c0eaadea76b6cdc80ffe69c7e70448d46b596a346ca1e0a1921ef066b50",
    "app/robots.ts":
      "07569ca82f2afb62270f93d18845f81e8230d03bcb7d62082bd6af92261f33ab",
    "lib/seo/page-registry.ts":
      "8197cba5fa57fca8e5e0671194ebc54bc8ef4040816c555244951bd2d64ff28e",
    "lib/seo/build-metadata.ts":
      "ff619511537efc58dcfbb34af01c84473c066d23b75b9396847631d27af67bf6",
    "lib/seo/schema/organization.ts":
      "875184d8c7044008c58799f5c4cf8b9c8296633f2bb58d4c00f792051e62aba7",
    "lib/seo/schema/website.ts":
      "cc72f403d12576331c5bb591776b6b8c9f6a717d283b464689f17348e43206f1",
    "lib/seo/schema/webpage.ts":
      "2650144cc2e462e462eacc9b8c7ab75ba02d72706fd1126dca5e6fc361120eb3"
  };
  for (const [file, expected] of Object.entries(untouched)) {
    const url = new URL(file, root);
    assert.ok(existsSync(url), file);
    assert.equal(
      createHash("sha256").update(readFileSync(url)).digest("hex"),
      expected,
      `${file} changed unexpectedly`
    );
  }

  // The layout is the one file the intro touches, and only to mount itself
  // and wrap the children. Its metadata surface is unchanged.
  assert.ok(layout.includes("export const metadata: Metadata = {"));
  assert.ok(layout.includes("metadataBase: new URL(SITE_URL)"));
  assert.ok(layout.includes("export function generateStaticParams()"));
  assert.ok(layout.includes("export const viewport: Viewport = {"));
  assert.ok(layout.includes("if (!isLocale(locale)) {"));
  const layoutCode = codeOnly(layout);
  assert.ok(!layoutCode.includes("canonical"));
  assert.ok(!layoutCode.includes("hreflang"));
  assert.ok(!layoutCode.includes("title:"));
  assert.ok(!layoutCode.includes("description:"));

  // The Navbar is reached through its existing element, never rewritten.
  const navbar = await read("components/evipace/Navbar.tsx");
  assert.ok(navbar.includes('className={`site-header fixed inset-x-0 top-0 z-50'));
  assert.ok(!navbar.includes("site-intro"));
  assert.ok(controller.includes('document.querySelector<HTMLElement>(".site-header")'));
});

test("rollback heroes and their assets remain byte-identical", () => {
  const rollback = {
    "components/evipace/hero-meeting/MeetingHero.tsx":
      "3a8bf8dce2ac0caa1ce563af5971d81ec957a4dd3176508bf5e78f40e7674987",
    "public/images/evipace/homepage/hero-meeting-desktop.webp":
      "382ee4a74446d1759557422f925b2e0c68b395bc3bcfe5af6dc503b38e9fe9c3",
    "public/images/evipace/homepage/hero-meeting-mobile.webp":
      "633aeb8fd69d79d4d8f165740daa4c87434756846a390d0c7f2b192398c98763",
    "components/evipace/hero-evidence-desk/EvidenceDeskHero.tsx":
      "0d769218ea90d82fb72d0b5c7af35efa563eb04ada159f377c775afbc93229bf",
    "components/evipace/hero-evidence-desk/process-labels.ts":
      "59016f28310f4058809d1097aff5277b9835e004d4e13fd2ad61707c1eedd3d4",
    "public/images/evipace/homepage/hero-evidence-desk-desktop.webp":
      "0430937eb073b613ad19a807b6078a61e6cf53026644a4df9628b06bc3a609fd",
    "public/images/evipace/homepage/hero-evidence-desk-mobile.webp":
      "8d79331f332aea9596c69a5f48c1b5c33316c29e26349048934e034fa0f95006"
  };
  for (const [file, expected] of Object.entries(rollback)) {
    const url = new URL(file, root);
    assert.ok(existsSync(url), file);
    assert.equal(
      createHash("sha256").update(readFileSync(url)).digest("hex"),
      expected,
      file
    );
  }
});
