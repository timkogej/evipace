import { createHash } from "node:crypto";
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
const git = (args) =>
  execFileSync("git", args, { cwd: repo, encoding: "utf8" }).trim();

/**
 * The editorial rule: the brand is written `Evipace` — capital E, all
 * remaining letters lowercase — everywhere it is read by a human. That
 * covers page copy, headings, eyebrows, the standalone wordmark, metadata
 * titles and descriptions, accessible names and structured-data names,
 * in both EN and DE.
 *
 * Lowercase `evipace` survives only where the string is a machine-readable
 * identifier rather than the brand: the domain and email address, import
 * specifiers and file paths, asset filenames, DOM ids and CSS hooks,
 * storage keys, custom event names and analytics globals.
 *
 * These tests pin both halves. A blind global replacement would fail the
 * second half; a revert to the old mixed-case rule would fail the first.
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
  companyInfo: "lib/company-info.ts",
  consent: "components/evipace/analytics/consent.ts"
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
    ["commercial", '"Evipace does the execution work behind the response: reading the requirement, finding the right data and preparing a clear output for company confirmation."'],
    ["registry", '"Evipace prepares a documented corporate carbon footprint']
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
    ["registry", '"Evipace unterstützt produzierende Unternehmen bei der praktischen Umsetzung']
  ];
  for (const [key, copy] of required) {
    assert.ok(source[key].includes(copy), `${key}: ${copy}`);
  }
});

test("mid-sentence occurrences carry the brand capitalisation too", () => {
  const required = [
    ["enAbout", "The idea behind Evipace started with a simple observation:"],
    ["enAbout", "The Evipace name reflects a simple ambition:"],
    ["enAbout", "Tim Kogej founded Evipace with the goal"],
    ["enAbout", "That is why Evipace is particularly focused on companies"],
    ["enAbout", "As the service develops, Evipace is intended to support"],
    ["enScattered", "That is the problem Evipace solves."],
    ["deAbout", "Die Idee hinter Evipace entstand aus einer einfachen Beobachtung:"],
    ["deAbout", "Der Name Evipace steht für einen einfachen Anspruch:"],
    ["deAbout", "Tim Kogej gründete Evipace mit dem Ziel"],
    ["deAbout", "Deshalb richtet sich Evipace besonders an Unternehmen"],
    ["deHome", "Mehr darüber, wer hinter Evipace steht"]
  ];
  for (const [key, copy] of required) {
    assert.ok(source[key].includes(copy), `${key}: ${copy}`);
  }
});

test("headings, eyebrows and titles carry the brand capitalisation", () => {
  const required = [
    ["enAbout", '<p className="eyebrow">About Evipace</p>'],
    ["enAbout", 'heading="Why Evipace exists."'],
    ["enAbout", 'heading="What Evipace does not want to become."'],
    ["deAbout", '<p className="eyebrow">Über Evipace</p>'],
    ["deAbout", 'heading="Warum Evipace entstanden ist."'],
    ["deAbout", 'heading="Was Evipace nicht sein möchte."'],
    ["registry", 'title: "About Evipace | ESG for manufacturing companies"'],
    ["registry", 'title: "Über Evipace | ESG für produzierende Unternehmen"'],
    // The intended English homepage result title, exactly as Google should
    // read it.
    [
      "registry",
      'title: "ESG Consulting for Manufacturing Companies | Evipace"'
    ]
  ];
  for (const [key, copy] of required) {
    assert.ok(source[key].includes(copy), `${key}: ${copy}`);
  }
  // No page title anywhere in the registry may still carry the old spelling.
  assert.ok(!source.registry.includes("| evipace"));
});

test("the standalone wordmark carries the brand capitalisation everywhere", () => {
  // The comparison column on About and the limitation panels on Methodology
  // print the brand on its own. The CSS uppercases it visually; the source
  // still has to spell the brand, not a lowercase variant of it.
  for (const key of ["enAbout", "deAbout"]) {
    assert.ok(
      source[key].includes(
        '<p className="text-xs font-bold uppercase text-orange">Evipace</p>'
      ),
      key
    );
  }
  for (const key of ["enMethod", "deMethod"]) {
    assert.ok(
      /<p className="mb-6 text-sm font-bold uppercase text-orange">\s*\n\s*Evipace\s*\n\s*<\/p>/.test(
        source[key]
      ),
      key
    );
  }
  // The logo link's accessible name is the wordmark too.
  assert.ok(source.navigation.includes('label: "Evipace — Home"'));
  assert.ok(source.navigation.includes('label: "Evipace — Startseite"'));
});

test("technical identifiers were not swept up by the capitalisation pass", () => {
  assert.ok(
    source.checklistData.includes('"evipace:de:esg-questionnaire-checklist:v1"')
  );
  assert.ok(
    source.consent.includes(
      'export const CONSENT_SETTINGS_EVENT = "evipace:open-cookie-settings"'
    )
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
    for (const bad of [
      "Evipace.com",
      "Evipace:en:",
      "Evipace:de:",
      "Evipace:open-cookie-settings",
      "Evipace_cookie_consent",
      "@Evipace",
      "components/Evipace",
      "EvipaceImages",
      'id="Evipace-',
      "data-Evipace"
    ]) {
      if (text.includes(bad)) offenders.push(`${file}: ${bad}`);
    }
  }
  assert.deepEqual(offenders, []);
});

test("homepage copy and layout survive capitalisation and the shared type scale", () => {
  // Each of these files carries only capitalisation edits since the pinned
  // baseline. Undoing those literals must restore the baseline file byte for
  // byte — nothing else about the approved homepage may have moved.
  // HomeHero is excluded on purpose: its heading was redesigned in a later
  // round, so it is no longer a capitalisation-only file. Its own copy is
  // pinned by the hero tests instead.
  const edits = [
    [
      "components/evipace/english-home/WhyEvipaceSection.tsx",
      [
        ["Evipace is designed for", "evipace is designed for"],
        ['eyebrow="Why Evipace"', 'eyebrow="Why evipace"']
      ]
    ],
    [
      "components/evipace/english-home/ExecutionGap.tsx",
      [["Evipace works in that gap.", "evipace works in that gap."]]
    ],
    // AboutEvipace is excluded on purpose: a later round added the
    // geography paragraph naming Germany and Austria, so it is no longer a
    // capitalisation-only file. Its copy is pinned by phase-2-geo.test.mjs.
  ];
  for (const [file, replacements] of edits) {
    let working = readFileSync(new URL(file, root), "utf8");
    for (const [applied, original] of replacements) {
      assert.ok(working.includes(applied), `${file}: missing ${applied}`);
      working = working.replace(applied, original);
    }
    // Normalize only the approved statement-size change before comparison.
    working = working.replaceAll(
      'type-statement font-display mt-4 max-w-2xl text-white',
      'font-display mt-4 max-w-2xl text-4xl leading-[1.04] text-white sm:text-5xl'
    );
    assert.equal(
      working,
      `${git(["show", `${BASELINE}:${file}`])}\n`,
      `${file} changed beyond the capitalisation`
    );
  }
});

test("GEO work preserves the current redesign stylesheet", async () => {
  const baseline = JSON.parse(await read("docs/geo/redesign-baseline.json"));
  const css = await read("app/globals.css");
  assert.equal(createHash("sha256").update(css).digest("hex"), baseline["app/globals.css"]);
});
