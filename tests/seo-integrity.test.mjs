import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { loadProjectModule as load } from "./helpers/load-project-module.mjs";

const registry = load("lib/seo/page-registry.ts");
const root = new URL("../", import.meta.url);

// Hard ceilings catch regressions. The targets (title <= 60, description
// <= 160) are what search engines show without truncation; the keyword-map
// step tightens these ceilings as titles are rewritten.
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;
const DESCRIPTION_MIN = 70;

const entries = [];
for (const locale of ["en", "de"]) {
  for (const [key, entry] of Object.entries(registry.pageRegistry[locale])) {
    entries.push({ locale, key, entry });
  }
}

test("every registry title and description is present, unique per locale and within length ceilings", () => {
  for (const locale of ["en", "de"]) {
    const titles = new Set();
    const descriptions = new Set();
    for (const { key, entry } of entries.filter((e) => e.locale === locale)) {
      const id = `${locale}/${key}`;
      assert.ok(entry.title.includes("Evipace"), `${id}: brand in title`);
      assert.ok(entry.title.length <= TITLE_MAX, `${id}: title ${entry.title.length}`);
      assert.ok(
        entry.description.length >= DESCRIPTION_MIN &&
          entry.description.length <= DESCRIPTION_MAX,
        `${id}: description ${entry.description.length}`
      );
      assert.ok(!titles.has(entry.title), `${id}: duplicate title`);
      assert.ok(!descriptions.has(entry.description), `${id}: duplicate description`);
      titles.add(entry.title);
      descriptions.add(entry.description);
    }
  }
});

test("registry paths are locale-prefixed, lowercase and unique", () => {
  const seen = new Set();
  for (const { locale, key, entry } of entries) {
    assert.ok(entry.path.startsWith(`/${locale}`), `${locale}/${key}`);
    assert.equal(entry.path, entry.path.toLowerCase(), entry.path);
    assert.ok(!entry.path.endsWith("/") || entry.path.length === 1, entry.path);
    assert.ok(!seen.has(entry.path), `duplicate path ${entry.path}`);
    seen.add(entry.path);
  }
});

test("dates in the registry are real ISO dates, never in the future, modified not before published", () => {
  const today = new Date().toISOString().slice(0, 10);
  for (const { locale, key, entry } of entries) {
    for (const field of ["lastReviewed", "datePublished", "dateModified"]) {
      const value = entry[field];
      if (value === undefined) continue;
      assert.match(value, /^\d{4}-\d{2}-\d{2}$/, `${locale}/${key} ${field}`);
      assert.ok(value <= today, `${locale}/${key} ${field} is in the future`);
    }
    if (entry.datePublished && entry.dateModified) {
      assert.ok(entry.dateModified >= entry.datePublished, `${locale}/${key}`);
    }
  }
});

async function walk(dir) {
  const out = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(tsx?|mdx?)$/.test(item.name)) out.push(full);
  }
  return out;
}

const sourceFiles = [
  ...(await walk(new URL("components/evipace/", root).pathname)),
  ...(await walk(new URL("app/", root).pathname)),
  new URL("lib/seo/page-registry.ts", root).pathname,
  new URL("lib/seo/service-buyer-questions.ts", root).pathname
];
const sources = await Promise.all(
  sourceFiles.map(async (file) => ({
    file: path.relative(new URL(".", root).pathname, file),
    text: await readFile(file, "utf8")
  }))
);

// Claims Evipace does not make. Each rule is checked line by line; a line
// that negates the claim ("not", "nicht", "kein", "no") is allowed, because
// the site must be free to say what it does not do.
const NEGATION = /\b(not|never|no|without|nor|nicht|kein|keine|keinen|keiner|ohne|weder)\b|n't/i;
const bannedClaims = [
  // FAQ questions ("Can Evipace guarantee ...?") are answered with a no.
  { name: "guarantee", pattern: /guarantee|garantier/i, allowLine: /\?"/, skip: /TransparencySection|EnglishFinalResourceGuides/ },
  { name: "permits", pattern: /\bpermits?\b|Genehmigung/i, skip: /resources\/|app\/robots/ },
  { name: "certified by Evipace", pattern: /Evipace[^.]{0,40}(zertifizier|certif(?:ies|y))/i },
  { name: "assurance", pattern: /independent assurance|unabhängige (Prüfung|Bestätigung)/i },
  { name: "ratings and awards", pattern: /award-winning|preisgekr|AggregateRating|⭐|★/i }
];

test("public copy makes none of the claims Evipace does not stand behind", () => {
  const problems = [];
  for (const { file, text } of sources) {
    // Tests, contracts and primary-source titles are not public claims.
    text.split("\n").forEach((line, index) => {
      for (const { name, pattern, skip, allowLine } of bannedClaims) {
        if (skip?.test(file) || allowLine?.test(line)) continue;
        if (pattern.test(line) && !NEGATION.test(line)) {
          problems.push(`${file}:${index + 1} [${name}] ${line.trim().slice(0, 120)}`);
        }
      }
    });
  }
  assert.deepEqual(problems, []);
});

const COMMERCIAL_KEYS = [
  "home", "offers", "about", "methodology", "recordsDeadlines", "esgKundenanfragen",
  "ecovadisUnterstuetzung", "integrityNextUnterstuetzung", "scope12Berechnung",
  "vsmeNachhaltigkeitsbericht"
];

test("Scope 3 and LCA are never offered in commercial page metadata", () => {
  for (const { locale, key, entry } of entries) {
    if (!COMMERCIAL_KEYS.includes(key)) continue;
    assert.doesNotMatch(
      `${entry.title} ${entry.description}`,
      /Scope[\s-]?3|Lebenszyklus|\bLCA\b|Ökobilanz/i,
      `${locale}/${key}`
    );
  }
});

test("no source says Evipace calculates Scope 3 or runs an LCA", () => {
  const offer = /(calculat|berechn|analys|erstell)[^.\n]{0,40}(Scope[\s-]?3|LCA|Ökobilanz)/i;
  const problems = [];
  for (const { file, text } of sources) {
    if (file.includes("resources/")) continue; // explainers cite sources
    text.split("\n").forEach((line, index) => {
      if (offer.test(line) && !NEGATION.test(line) && !/\?"/.test(line)) {
        problems.push(`${file}:${index + 1} ${line.trim().slice(0, 120)}`);
      }
    });
  }
  assert.deepEqual(problems, []);
});

test("approval wording stays out of registry titles and descriptions", () => {
  for (const { locale, key, entry } of entries) {
    if (!COMMERCIAL_KEYS.includes(key)) continue;
    const text = `${entry.title} ${entry.description}`;
    assert.doesNotMatch(text, /\bapprov|Freigabe|freigeb|you confirm|Sie bestätigen/i, `${locale}/${key}`);
  }
});

test("the language-neutral sl registry stays empty", () => {
  assert.deepEqual(registry.pageRegistry.sl, {});
});

test("every German service page carries a Kurz und klar block under the hero", async () => {
  const pages = {
    "esg-kundenanfragen": "questionnaire",
    "ecovadis-unterstuetzung": "ecovadis",
    "integritynext-unterstuetzung": "integritynext",
    "scope-1-2-berechnung": "scope12",
    "vsme-nachhaltigkeitsbericht": "vsme"
  };
  for (const [dir, service] of Object.entries(pages)) {
    const source = await readFile(new URL(`app/[locale]/${dir}/page.tsx`, root), "utf8");
    const hero = source.indexOf("<LandingHero />");
    const answers = source.indexOf(`<DirectAnswers service="${service}" />`);
    assert.ok(hero > -1 && answers > hero, dir);
  }
  const component = await readFile(new URL("components/evipace/service-landing/DirectAnswers.tsx", root), "utf8");
  assert.doesNotMatch(component, /€|Preis|garantiert /);
});

test("Organization and Service schema state only what the site shows", () => {
  const org = load("lib/seo/schema/organization.ts").buildOrganizationSchema();
  assert.equal(org.address.addressLocality, "Ljubljana");
  assert.equal(org.address.addressCountry, "SI");
  assert.equal(org.address.streetAddress, undefined);
  assert.equal(org.contactPoint.email, org.email);
  assert.equal(org.telephone, org.contactPoint.telephone);
  assert.doesNotMatch(org.description, /polic|certif|guarantee|Scope 3/i);
  const service = load("lib/seo/schema/service.ts").buildServiceSchema("en", "ecovadisUnterstuetzung", "EcoVadis support");
  assert.equal(service.areaServed.name, "Europe");
  for (const field of ["offers", "aggregateRating", "review", "price"]) {
    assert.ok(!(field in service), field);
  }
});

test("llms.txt is generated from the registry and keeps the do-not-do list", () => {
  const text = load("lib/seo/llms-txt.ts").buildLlmsTxt();
  assert.ok(text.startsWith("# Evipace\n"));
  for (const { entry } of entries) {
    if (entry.path.endsWith("/privacy")) continue;
    assert.ok(text.includes(`https://evipace.com${entry.path}`), entry.path);
  }
  assert.ok(!text.includes("/send-request"));
  assert.match(text, /does not provide: Scope 3/);
  assert.match(text, /service, not software/);
  assert.doesNotMatch(text, /€|\bawards?\b|\brated\b/i);
  const robots = load("app/robots.ts").default();
  assert.equal(robots.rules.disallow, "/api/");
  assert.equal(robots.sitemap, "https://evipace.com/sitemap.xml");
});
