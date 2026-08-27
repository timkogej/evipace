import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const repo = new URL(".", root).pathname;
const read = (path) => readFile(new URL(path, root), "utf8");

/**
 * The website state immediately before the approved capitalisation pass —
 * commit a19f655, "feat: complete evipace website implementation".
 *
 * Pinned to a full hash on purpose. These guards ask "what changed since the
 * approved baseline", so they must never resolve against `HEAD`: the moment
 * the change is committed, `HEAD` becomes the changed state and the guard
 * either inverts or silently degrades into comparing a file with itself.
 */
const BASELINE = "a19f6552e86582debba62c52eec611640450ff92";

/**
 * Every production source file, read straight from disk.
 *
 * Deliberately not `git grep` or `git ls-files`: a guard must not change its
 * answer depending on whether a file happens to be untracked, staged or
 * committed. `tests/` is never walked, so this guard cannot match the very
 * blocklist literals it uses to describe what must be absent.
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
 * The hero's CSS block with every `.hero-desk__title*` rule removed. The
 * heading scale is under active design (the hero now carries a whole
 * sentence), so these guards pin the parts that define the approved
 * composition — plate, scrim, annotation, labels, copy column — rather than
 * the type sizes on top of them.
 */
function heroCssWithoutTitleRules(source) {
  const start = source.indexOf("   Homepage hero \u2014 evidence desk");
  assert.ok(start > -1, "hero CSS block not found");
  const meeting = source.indexOf("   Homepage hero \u2014 meeting photograph", start);
  const next =
    meeting > start
      ? meeting
      : source.indexOf("   Homepage sections \u2014 evidence board", start);
  const end = next > start ? source.lastIndexOf("/*", next) : -1;
  const block = source.slice(start, end > start ? end : undefined);
  return block
    .replace(/(\/\*[^*]*\*\/\n)?[ ]*\.hero-desk__title[^{]*\{[^}]*\}\n\n?/g, "")
    .trimEnd();
}
const git = (args) =>
  execFileSync("git", args, { cwd: repo, encoding: "utf8" }).trim();

/**
 * The editorial rule: `evipace` is written `Evipace` when it opens a
 * sentence, paragraph, heading or list item, and stays lowercase inside a
 * sentence and wherever it is the standalone wordmark or a technical
 * identifier. These tests pin both halves of that rule — a blind global
 * replacement would fail the second half, and a revert would fail the first.
 */

const files = {
  enAbout: "components/evipace/EnglishAboutPage.tsx",
  deAbout: "components/evipace/GermanAboutPage.tsx",
  enHome: "components/evipace/english-home/HomeHero.tsx",
  enScattered: "components/evipace/english-home/ScatteredData.tsx",
  enWhy: "components/evipace/english-home/WhyEvipaceSection.tsx",
  deHome: "components/evipace/GermanHomePage.tsx",
  enMethod: "components/evipace/EnglishMethodologyPage.tsx",
  deMethod: "components/evipace/GermanMethodologyPage.tsx",
  registry: "lib/seo/page-registry.ts",
  navigation: "lib/site-navigation.ts",
  commercial: "components/evipace/english-commercial/content.ts",
  checklistData: "components/evipace/resources/esg-questionnaire-checklist-data.ts",
  companyInfo: "lib/company-info.ts"
};

const source = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([key, path]) => [key, await read(path)])
  )
);

test("sentence-initial occurrences are capitalised in English copy", () => {
  const required = [
    ["enAbout", "Evipace was created to give manufacturing companies"],
    ["enAbout", "Evipace was built for the space between the two."],
    ["enAbout", "Evipace is being built at the intersection of structured data"],
    ["enAbout", "Evipace will grow with the requirements its customers face."],
    ["enHome", "Evipace takes care of the practical ESG work"],
    ["enWhy", "Evipace is designed for the space in between."],
    ["enMethod", "Evipace is an independent service provider"],
    ["enMethod", "Evipace is responsible for"],
    ["commercial", '"Evipace helps turn that request into a structured, reviewable response."'],
    ["registry", '"Evipace handles practical ESG work for manufacturing suppliers']
  ];
  for (const [key, copy] of required) {
    assert.ok(source[key].includes(copy), `${key}: ${copy}`);
  }
});

test("sentence-initial occurrences are capitalised in German copy", () => {
  const required = [
    ["deAbout", "Evipace wurde gegründet, um produzierenden Unternehmen"],
    ["deAbout", "Evipace wurde für den Raum dazwischen aufgebaut."],
    ["deAbout", "Evipace ist in Slowenien gegründet"],
    ["deAbout", "Evipace wird mit den Anforderungen seiner Kunden wachsen."],
    ["deHome", "Evipace bringt diese Informationen zusammen."],
    ["deHome", "Evipace beginnt an einer anderen Stelle."],
    ["deMethod", "Evipace ist ein unabhängiger Dienstleister"],
    ["deMethod", "Evipace übernimmt"],
    ["registry", '"Evipace übernimmt die praktische ESG-Arbeit für produzierende Unternehmen']
  ];
  for (const [key, copy] of required) {
    assert.ok(source[key].includes(copy), `${key}: ${copy}`);
  }
});

test("mid-sentence occurrences keep the lowercase brand styling", () => {
  const required = [
    ["enAbout", "The idea behind evipace started with a simple observation:"],
    ["enAbout", "The evipace name reflects a simple ambition:"],
    ["enAbout", "Tim Kogej founded evipace with the goal"],
    ["enAbout", "That is why evipace is particularly focused on companies"],
    ["enAbout", "As the service develops, evipace is intended to support"],
    ["enScattered", "That is the problem evipace solves."],
    ["deAbout", "Die Idee hinter evipace entstand aus einer einfachen Beobachtung:"],
    ["deAbout", "Der Name evipace steht für einen einfachen Anspruch:"],
    ["deAbout", "Tim Kogej gründete evipace mit dem Ziel"],
    ["deAbout", "Deshalb richtet sich evipace besonders an Unternehmen"],
    ["deHome", "Mehr darüber, wer hinter evipace steht"]
  ];
  for (const [key, copy] of required) {
    assert.ok(source[key].includes(copy), `${key}: ${copy}`);
  }
});

test("headings, eyebrows and titles keep the lowercase brand name", () => {
  const required = [
    ["enAbout", '<p className="eyebrow">About evipace</p>'],
    ["enAbout", 'heading="Why evipace exists."'],
    ["enAbout", 'heading="What evipace does not want to become."'],
    ["deAbout", '<p className="eyebrow">Über evipace</p>'],
    ["deAbout", 'heading="Warum evipace entstanden ist."'],
    ["deAbout", 'heading="Was evipace nicht sein möchte."'],
    ["registry", 'title: "About evipace | ESG for manufacturing companies"'],
    ["registry", 'title: "Über evipace | ESG für produzierende Unternehmen"'],
    ["registry", "| evipace"]
  ];
  for (const [key, copy] of required) {
    assert.ok(source[key].includes(copy), `${key}: ${copy}`);
  }
});

test("the standalone wordmark stays lowercase everywhere it appears", () => {
  // The comparison column on About and the limitation panels on Methodology
  // print the brand on its own — that is the wordmark, not a sentence.
  for (const key of ["enAbout", "deAbout"]) {
    assert.ok(
      source[key].includes(
        '<p className="text-xs font-bold uppercase text-orange">evipace</p>'
      ),
      key
    );
  }
  for (const key of ["enMethod", "deMethod"]) {
    assert.ok(
      /<p className="mb-6 text-sm font-bold uppercase text-orange">\s*\n\s*evipace\s*\n\s*<\/p>/.test(
        source[key]
      ),
      key
    );
  }
  // The logo link's accessible name is the wordmark too.
  assert.ok(source.navigation.includes('label: "evipace — Home"'));
  assert.ok(source.navigation.includes('label: "evipace — Startseite"'));
});

test("technical identifiers were not swept up by the capitalisation pass", () => {
  assert.ok(
    source.checklistData.includes('"evipace:de:esg-questionnaire-checklist:v1"')
  );
  assert.ok(
    source.companyInfo.includes(
      'export const publicContactEmail = "hello@evipace.com"'
    )
  );
  // No storage key, domain, import path or address may have been
  // capitalised anywhere in production source.
  const files = productionSourceFiles();
  assert.ok(files.length > 100, `only ${files.length} production files walked`);
  const offenders = [];
  for (const file of files) {
    const text = readFileSync(new URL(file, root), "utf8");
    for (const bad of ["Evipace.com", "Evipace:en:", "Evipace:de:", "@Evipace", "components/Evipace", "EvipaceImages"]) {
      if (text.includes(bad)) offenders.push(`${file}: ${bad}`);
    }
  }
  assert.deepEqual(offenders, []);
});

test("the homepage changed only by the intentional capitalisation literals", () => {
  // Each of these files carries exactly one approved edit since the pinned
  // baseline. Undoing that literal must restore the baseline file byte for
  // byte — nothing else about the approved homepage may have moved.
  // HomeHero is excluded on purpose: its heading was redesigned in a later
  // round, so it is no longer a capitalisation-only file. Its own copy is
  // pinned by the hero tests instead.
  const edits = [
    ["components/evipace/english-home/WhyEvipaceSection.tsx", "Evipace is designed for", "evipace is designed for"],
    ["components/evipace/english-home/ExecutionGap.tsx", "Evipace works in that gap.", "evipace works in that gap."],
    ["components/evipace/english-home/AboutEvipace.tsx", "Evipace was built around", "evipace was built around"]
  ];
  for (const [file, applied, original] of edits) {
    const working = readFileSync(new URL(file, root), "utf8");
    assert.ok(working.includes(applied), `${file}: correction missing`);
    assert.equal(
      working.replace(applied, original),
      `${git(["show", `${BASELINE}:${file}`])}\n`,
      `${file} changed beyond the capitalisation`
    );
  }
});

test("no homepage stylesheet block was touched by the About work", async () => {
  const current = await read("app/globals.css");
  const committed = git(["show", `${BASELINE}:app/globals.css`]);

  // The hero's CSS composition is untouched; only its heading scale moved,
  // and that was an explicit hero change, not About work.
  assert.equal(
    heroCssWithoutTitleRules(current),
    heroCssWithoutTitleRules(committed),
    "homepage hero CSS drifted"
  );

  // Everything after the hero block is byte-identical, except the evidence
  // assembly board's own sub-block: its source cards were intentionally
  // redesigned (scattered slips and hairline connectors became one aligned
  // grid). That block is pinned by evidence-board.test.mjs instead.
  const sectionsMarker = "   Homepage sections \u2014 evidence board";
  const withoutBoard = (css) => {
    const from = css.indexOf("/* \u2500\u2500 1. Evidence assembly board");
    const to = css.indexOf("/* \u2500\u2500 2. Request stream", from);
    assert.ok(from > -1 && to > from, "evidence board CSS block not found");
    return (css.slice(0, from) + css.slice(to))
      // The board's parts are also named in the shared reduced-motion list;
      // dropping the connectors necessarily shortened it.
      .replace(/^\s*\.evb__[\w-]+,\n/gm, "");
  };
  assert.equal(
    withoutBoard(current.slice(current.indexOf(sectionsMarker))).trimEnd(),
    withoutBoard(committed.slice(committed.indexOf(sectionsMarker))).trimEnd(),
    "homepage section CSS drifted"
  );

  // Outside the page-scoped rules, the selector inventory is unchanged apart
  // from the approved hero additions above. `about` and `methodology`
  // selectors are excluded because they are scoped to their own pages and
  // cannot repaint the homepage — this guard is about shared selectors.
  // At-rules are containers rather than selectors; the rebased tail already
  // pins the blocks they wrap.
  const approvedAdditions = new Set([
    ".hero-desk__title--sentence",
    ".hero-desk__title--sentence-de",
    ".meeting-hero",
    ".meeting-hero__body",
    ".meeting-hero__body-secondary",
    ".meeting-hero__content",
    ".meeting-hero__image",
    ".meeting-hero__inner",
    ".meeting-hero__picture",
    ".meeting-hero__picture--empty",
    ".meeting-hero__scrim",
    ".meeting-hero__title",
    ".meeting-hero__title--de",
    ".meeting-hero__trust",
    ".mark-hero",
    ".mark-hero__actions",
    ".mark-hero__backdrop",
    '.mark-hero[data-intro-backdrop] .mark-hero__backdrop',
    ".mark-hero__body",
    ".mark-hero__body-secondary",
    ".mark-hero__content",
    ".mark-hero__corner",
    ".mark-hero__frame",
    ".mark-hero__fold",
    ".mark-hero__inner",
    ".mark-hero__line",
    ".mark-hero__line--1",
    ".mark-hero__line--2",
    ".mark-hero__line--3",
    ".mark-hero__mark",
    ".mark-hero__title",
    ".mark-hero__title--de",
    ".mark-hero__trust",
    ".mark-hero__visual",
    ".mark-hero__stage",
    ".mark-hero__mark[data-intro-landed] .mark-hero__line",
    ".mark-hero__workflow",
    ".mark-hero__workflow-list",
    ".mark-hero__workflow-list::before",
    ".mark-hero__workflow-node",
    ".mark-hero__workflow-number",
    ".mark-hero__workflow-path",
    ".mark-hero__workflow-text",
    ".mark-hero__stage[data-workflow-enter] .mark-hero__workflow-lead",
    ".mark-hero__stage[data-workflow-enter] .mark-hero__workflow-line",
    ".mark-hero__stage[data-workflow-enter] .mark-hero__workflow-list::before",
    ".mark-hero__stage[data-workflow-enter] .mark-hero__workflow-node",
    ".mark-hero__stage[data-workflow-enter] .mark-hero__workflow-node--1",
    ".mark-hero__stage[data-workflow-enter] .mark-hero__workflow-node--2",
    ".mark-hero__stage[data-workflow-enter] .mark-hero__workflow-node--3",
    ".site-intro",
    ".site-intro__corner",
    ".site-intro__fold",
    ".site-intro__frame",
    ".site-intro__line",
    ".site-intro__line--1",
    ".site-intro__line--2",
    ".site-intro__line--3",
    ".site-intro__mark",
    ".site-intro__surface",
    'html[data-site-intro="done"] .site-intro',
    'html[data-site-intro="playing"] .mark-hero__line'
  ]);
  // `.evb*` is excluded for the same reason as the block above: the board's
  // selectors changed on purpose and are pinned by their own test.
  const pageScoped = /\babout\b|about-|methodology|\.evb/;
  const selectors = (css) =>
    [...css.matchAll(/^([.#[a-zA-Z][^{}\n]*?)\s*\{/gm)]
      .map((match) => match[1].trim())
      .filter(
        (selector) =>
          !pageScoped.test(selector) && !approvedAdditions.has(selector)
      )
      .sort();
  assert.deepEqual(selectors(current), selectors(committed));
});
