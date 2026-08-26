import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const EN = "components/evipace/EnglishMethodologyPage.tsx";
const DE = "components/evipace/GermanMethodologyPage.tsx";

const [english, german, globals, englishAbout, germanAbout, inView] =
  await Promise.all([
    read(EN),
    read(DE),
    read("app/globals.css"),
    read("components/evipace/EnglishAboutPage.tsx"),
    read("components/evipace/GermanAboutPage.tsx"),
    read("components/evipace/home-sections/InView.tsx")
  ]);

const pages = [
  ["English", english],
  ["German", german]
];

const normalize = (value) => value.replace(/\s+/g, " ").trim();

/**
 * Every production source file, read straight from disk.
 *
 * Deliberately not `git grep` or `git ls-files`: a guard must not change its
 * answer depending on whether a file is untracked, staged or committed, and
 * `tests/` is never walked so a scan can never match its own literals.
 */
const PRODUCTION_DIRS = ["app", "components", "lib"];

function productionSourceFiles() {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(new URL(`${dir}/`, root), {
      withFileTypes: true
    })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (/\.(ts|tsx|mjs|js|css)$/.test(entry.name)) files.push(path);
    }
  };
  for (const dir of PRODUCTION_DIRS) walk(dir);
  return files;
}

/**
 * Heading levels in rendered order.
 *
 * Scanned from the page component onward, so the local `Section` helper
 * declared above it is not counted twice; each `<Section>` renders exactly
 * one `h2` (asserted separately), so it contributes a level-2 heading at
 * that point in the tree.
 */
function headingLevels(source) {
  const body = source.slice(source.indexOf("export function"));
  return [...body.matchAll(/<Section\b|<h([1-6])[\s>]/g)].map((m) =>
    m[1] ? Number(m[1]) : 2
  );
}

/* ── Document structure ──────────────────────────────────────────── */

test("each Methodology page has exactly one H1", () => {
  for (const [label, source] of pages) {
    assert.equal((source.match(/<h1[\s>]/g) ?? []).length, 1, label);
  }
});

test("EN and DE heading order stays valid", () => {
  for (const [label, source] of pages) {
    const levels = headingLevels(source);
    assert.ok(levels.length > 5, label);
    assert.equal(levels[0], 1, `${label} starts at h1`);
    assert.equal(levels.filter((l) => l === 1).length, 1, `${label} single h1`);
    let deepest = 1;
    for (const level of levels) {
      assert.ok(level <= deepest + 1, `${label} jumps to h${level}`);
      deepest = Math.max(deepest, level);
    }
    assert.ok(levels.includes(2) && levels.includes(3), `${label} uses h2/h3`);
  }
});

test("the Section helper renders exactly one h2", () => {
  for (const [label, source] of pages) {
    const helper = source.slice(
      source.indexOf("function Section({"),
      source.indexOf("function CheckList({")
    );
    assert.equal((helper.match(/<h2[\s>]/g) ?? []).length, 1, label);
    assert.equal((helper.match(/<h[1345][\s>]/g) ?? []).length, 0, label);
    assert.ok(helper.includes("methodology-h2"), label);
  }
});

test("EN and DE keep the same section count and anchor shape", () => {
  // Section ids are localized on purpose (`#contact` vs `#kontakt`), so the
  // guarantee is an equal number of anchors in the same positions.
  const ids = (source) =>
    [...source.matchAll(/\bid="([a-z0-9-]+)"/g)].map((m) => m[1]);
  const en = ids(english);
  const de = ids(german);
  assert.equal(en.length, de.length);
  assert.ok(en.length > 15);
  assert.deepEqual(en.slice(0, 2), ["top", "methodology-title"]);
  assert.deepEqual(de.slice(0, 2), ["top", "methodology-title"]);
  assert.equal(en.at(-1), "contact");
  assert.equal(de.at(-1), "kontakt");
});

/* ── Scoped typography is actually applied ───────────────────────── */

test("Methodology typography runs through its own scoped classes", () => {
  const required = [
    "methodology-page",
    "methodology-hero",
    "methodology-section",
    "methodology-h1",
    "methodology-h2",
    "methodology-h2--cta",
    "methodology-h3",
    "methodology-step-title",
    "methodology-card-title",
    "methodology-statement",
    "methodology-step-number",
    "methodology-lead",
    "methodology-body",
    "methodology-quote",
    "methodology-ghost"
  ];
  for (const [label, source] of pages) {
    for (const cls of required) {
      assert.ok(source.includes(cls), `${label} is missing .${cls}`);
    }
  }
  for (const cls of required) {
    assert.ok(globals.includes(`.${cls}`), `.${cls} has no rule`);
  }
});

test("the German page carries the locale modifier and the English page does not", () => {
  assert.ok(german.includes('className="methodology-page methodology--de"'));
  assert.ok(english.includes('className="methodology-page"'));
  assert.ok(!english.includes("methodology--de"));
  // And the modifier actually has smaller display rules of its own.
  for (const selector of [
    ".methodology--de .methodology-h1",
    ".methodology--de .methodology-h2",
    ".methodology--de .methodology-statement"
  ]) {
    assert.ok(globals.includes(selector), selector);
  }
});

test("no raw display-size utility survives on either Methodology page", () => {
  // The point of the refinement: sizes live in scoped CSS, not in ad-hoc
  // Tailwind utilities that nobody can tune per locale.
  for (const [label, source] of pages) {
    for (const utility of [
      "text-7xl",
      "text-6xl",
      "text-5xl",
      "text-4xl",
      "text-3xl",
      "text-2xl",
      "text-xl",
      "text-lg",
      "heading-lg",
      "body-lg"
    ]) {
      assert.ok(!source.includes(utility), `${label} still uses ${utility}`);
    }
  }
});

test("every Methodology rule is scoped and no shared selector was retargeted", () => {
  // Each `methodology` rule must be scoped to a `.methodology*` class.
  const rules = [...globals.matchAll(/^\s*([^\s@}][^{}\n]*?)\s*\{/gm)]
    .map((m) => m[1].trim())
    .filter((selector) => selector.includes("methodology"));
  assert.ok(rules.length > 20, `only ${rules.length} methodology rules`);
  for (const selector of rules) {
    // Every rule must be anchored on a `.methodology*` class — either
    // directly or behind the reveal attribute — and must never lead with a
    // bare element or a shared class.
    assert.ok(
      /^(\[data-evi-reveal="(?:pending|in)"\])?\.methodology/.test(selector),
      `unscoped methodology rule: ${selector}`
    );
  }

  // The shared typography primitives keep their original declarations.
  for (const declaration of [
    ".heading-xl {\n  font-size: clamp(3.8rem, 8.6vw, 6.9rem);",
    ".heading-lg {\n  font-size: clamp(2.7rem, 6vw, 5.9rem);",
    ".heading-md {\n  font-size: clamp(2.15rem, 4.3vw, 4.35rem);",
    ".body-lg {\n  color: var(--muted);\n  font-size: clamp(1.05rem, 1.55vw, 1.35rem);",
    ".font-display {\n  font-family: var(--font-gfs-didot), Georgia, serif;"
  ]) {
    assert.ok(globals.includes(declaration), `shared rule changed: ${declaration.slice(0, 24)}`);
  }
});

test("the Methodology work did not leak into About or the homepage", () => {
  for (const [label, source] of [
    ["English About", englishAbout],
    ["German About", germanAbout]
  ]) {
    assert.ok(!source.includes("methodology-"), `${label} picked up a methodology class`);
    assert.ok(source.includes("about-h1") || source.includes("about-h2"), label);
  }
  const strays = productionSourceFiles().filter((file) => {
    if (file.includes("MethodologyPage") || file === "app/globals.css") return false;
    return readFileSync(new URL(file, root), "utf8").includes("methodology-h");
  });
  assert.deepEqual(strays, []);
});

/* ── Copy, links and content integrity ───────────────────────────── */

test("the approved Methodology copy is unchanged", () => {
  const englishCopy = [
    "How company data becomes reliable ESG work.",
    "Our first principle: source before statement.",
    "Evipace does not start with generic answers or pre-written ESG language.",
    "Sources · Calculations · Evidence · Review · Transparency",
    "Direct emissions from owned or controlled sources.",
    "Understand the requirement",
    "Evipace is responsible for",
    "Have a concrete ESG requirement?",
    "Show us what you are working with.",
    "Questionnaires · Emissions · Reporting · Evidence · Policies",
    "This date reflects the latest substantive review of this"
  ];
  const germanCopy = [
    "So wird aus Unternehmensdaten belastbare ESG-Arbeit.",
    "Unser Grundprinzip: Quelle vor Aussage.",
    "Evipace beginnt nicht mit generischen Antworten oder fertigen",
    "Direkte Emissionen aus eigenen oder kontrollierten Quellen.",
    "Aufgabe verstehen",
    "Sie haben eine konkrete ESG-Anforderung?",
    "Was Sie am Ende erhalten."
  ];
  for (const copy of englishCopy) {
    assert.ok(normalize(english).includes(normalize(copy)), copy);
  }
  for (const copy of germanCopy) {
    assert.ok(normalize(german).includes(normalize(copy)), copy);
  }
});

test("CTA labels and every href are unchanged", () => {
  assert.ok(english.includes('const SEND_REQUEST_HREF = "/en/send-request"'));
  assert.ok(german.includes('const SEND_REQUEST_HREF = "/de/send-request"'));
  for (const [label, source] of pages) {
    assert.ok(source.includes("<ButtonLink href={SEND_REQUEST_HREF}>"), label);
  }
  assert.ok(english.includes("Send your ESG request"));
  assert.ok(german.includes("ESG-Anfrage senden"));
  // The German page's extra in-body links survive the refactor.
  assert.ok((german.match(/orange-link/g) ?? []).length >= 3);
});

test("no content is truncated, clamped or conditionally dropped", () => {
  for (const [label, source] of pages) {
    for (const bad of ["truncate", "line-clamp", "text-ellipsis", "overflow-hidden text-"]) {
      assert.ok(!source.includes(bad), `${label} uses ${bad}`);
    }
    // No copy hidden behind a breakpoint.
    assert.ok(!/\bhidden\s+(sm|md|lg):(block|flex|grid)/.test(
      source.replace(/hidden font-display/g, "")
    ), `${label} hides copy at a breakpoint`);
  }
});

test("no manual line breaks were introduced for layout", () => {
  // Wrapping is handled by measure + text-wrap: balance, never by <br>.
  for (const [label, source] of pages) {
    assert.equal((source.match(/<br\s*\/?>/g) ?? []).length, 0, label);
  }
  assert.ok(globals.includes("text-wrap: balance"));
  assert.ok(globals.includes("text-wrap: pretty"));
});

/* ── Decorative wordmark ─────────────────────────────────────────── */

test("the decorative METHOD wordmark is inert and out of the a11y tree", () => {
  for (const [label, source] of pages) {
    const at = source.indexOf("methodology-ghost");
    assert.ok(at > -1, `${label} has no ghost`);
    // The aria-hidden sits on the same element as the class.
    const element = source.slice(source.lastIndexOf("<", at), source.indexOf(">", at));
    assert.ok(element.includes('aria-hidden="true"'), `${label} ghost not aria-hidden`);
    assert.ok(element.includes("pointer-events-none"), `${label} ghost is interactive`);
    // It is a plain div, never a heading or a link.
    assert.ok(element.startsWith("<div"), `${label} ghost is not a div`);
  }
  const block = globals.slice(globals.indexOf(".methodology-ghost {"));
  assert.ok(block.includes("pointer-events: none"));
  assert.ok(block.includes("user-select: none"));
});

/* ── Rendering: shared InView, no Framer Motion ──────────────────── */

test("Methodology uses the shared InView and no longer imports Reveal", () => {
  for (const [label, source] of pages) {
    assert.ok(
      source.includes('import { InView } from "./home-sections/InView"'),
      `${label} does not import the shared InView`
    );
    assert.ok(!source.includes('from "./Reveal"'), `${label} still imports Reveal`);
    assert.ok(!source.includes("<Reveal"), `${label} still renders <Reveal>`);
    assert.ok(!source.includes("framer-motion"), `${label} still pulls in Framer Motion`);
    assert.ok(source.includes("<Rise"), `${label} has no Rise wrappers`);
    assert.ok(source.includes("methodology-rise"), label);
  }
  // The shared component stays: other pages still depend on it.
  assert.ok(existsSync(new URL("components/evipace/Reveal.tsx", root)));
});

test("both Methodology pages stay server components", () => {
  for (const [label, source] of pages) {
    assert.ok(!source.includes('"use client"'), `${label} declares a client boundary`);
    // The only client boundary is the shared wrapper, imported not redefined.
    assert.ok(!source.includes("useEffect"), label);
    assert.ok(!source.includes("IntersectionObserver"), label);
  }
});

test("Methodology content is hidden only once InView marks it pending", () => {
  // No unconditional rule may hide the wrapper: without JavaScript the
  // attribute is never set, so the finished page is what ships.
  assert.ok(!/(^|\})\s*\.methodology-rise[^{]*\{[^}]*opacity:\s*0/.test(globals));
  assert.ok(globals.includes('[data-evi-reveal="pending"].methodology-rise {'));
  assert.ok(globals.includes('[data-evi-reveal="in"].methodology-rise {'));

  const pending = globals.slice(
    globals.indexOf('[data-evi-reveal="pending"].methodology-rise {'),
    globals.indexOf('[data-evi-reveal="in"].methodology-rise {')
  );
  assert.ok(pending.includes("opacity: 0"));
  // A restrained vertical settle, per the approved motion character.
  const y = Number(pending.match(/translateY\((\d+)px\)/)[1]);
  assert.ok(y >= 12 && y <= 14, `reveal distance ${y}px is outside 12–14px`);

  const inRule = globals.slice(globals.indexOf('[data-evi-reveal="in"].methodology-rise {'));
  const ms = Number(inRule.match(/opacity (\d+)ms/)[1]);
  assert.ok(ms >= 600 && ms <= 650, `reveal duration ${ms}ms is outside 600–650ms`);
  assert.ok(inRule.includes("cubic-bezier(0.16, 1, 0.3, 1)"));
});

test("reduced motion pins Methodology to its final state", () => {
  const block = globals.slice(
    globals.lastIndexOf("@media (prefers-reduced-motion: reduce)", globals.indexOf(".methodology-ghost"))
  );
  assert.ok(block.includes(".methodology-rise"));
  assert.ok(block.includes("opacity: 1 !important"));
  assert.ok(block.includes("transform: none !important"));
  assert.ok(block.includes("transition: none !important"));
  // InView itself never marks anything pending under reduced motion.
  assert.ok(
    inView.includes('window.matchMedia("(prefers-reduced-motion: reduce)")')
  );
});

test("the stagger ladder covers every delay the pages ask for", () => {
  for (let step = 1; step <= 5; step += 1) {
    assert.ok(globals.includes(`.methodology-rise--d${step} {`), `d${step}`);
  }
  // Rise maps a seconds delay onto that ladder; it never emits an inline style.
  for (const [label, source] of pages) {
    assert.ok(source.includes("methodology-rise--d${step}"), label);
    assert.ok(!/<Rise[^>]*style=/.test(source), `${label} sets an inline style`);
  }
});

/* ── Scope-card clipping ─────────────────────────────────────────── */

test("Methodology grid items may shrink, without hiding overflow", () => {
  const rule = globals.slice(
    globals.indexOf(".methodology-page .methodology-rise {"),
    globals.indexOf('[data-evi-reveal="pending"].methodology-rise {')
  );
  const declarations = rule.replace(/\/\*[\s\S]*?\*\//g, "");
  assert.ok(declarations.includes("min-width: 0"), "min-width: 0 missing");
  // The fix must not be an overflow workaround.
  assert.ok(!/overflow\s*:/.test(declarations), "overflow used as a workaround");
  for (const [label, source] of pages) {
    assert.ok(
      !/rounded-lg[^"]*overflow-hidden/.test(source),
      `${label} clips a card with overflow-hidden`
    );
  }
});

/* ── Approved typography must not drift ──────────────────────────── */

test("the approved Methodology typography values are unchanged", () => {
  const approved = [
    ".methodology-page .methodology-h1 {\n  max-width: 20ch;\n  font-size: clamp(2.45rem, 4.35vw, 3.95rem);",
    ".methodology-page .methodology-h2 {\n  max-width: 24ch;\n  font-size: clamp(1.8rem, 2.85vw, 2.85rem);",
    ".methodology-page .methodology-h2--cta {\n  max-width: 18ch;\n  font-size: clamp(2.05rem, 3.2vw, 3.1rem);",
    ".methodology-page .methodology-h3 {\n  max-width: 28ch;\n  font-size: clamp(1.3rem, 1.75vw, 1.575rem);",
    ".methodology-page .methodology-step-title {\n  max-width: 30ch;",
    ".methodology-page .methodology-lead {\n  max-width: 50ch;",
    ".methodology-page .methodology-body {\n  max-width: 62ch;",
    ".methodology-page .methodology-quote {\n  max-width: 44ch;",
    ".methodology-page .methodology-prose {\n  max-width: 60ch;",
    ".methodology--de .methodology-h1 {\n  max-width: 23ch;\n  font-size: clamp(2.1rem, 3.7vw, 3.35rem);",
    ".methodology--de .methodology-h2 {\n  max-width: 26ch;\n  font-size: clamp(1.65rem, 2.5vw, 2.5rem);",
    ".methodology-section {\n  padding-block: clamp(3rem, 4.6vw, 4.75rem);"
  ];
  for (const declaration of approved) {
    assert.ok(globals.includes(declaration), declaration.split("{")[0].trim());
  }
});
