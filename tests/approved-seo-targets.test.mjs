import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

const [
  registrySource,
  metadataSource,
  homepageSource,
  englishHeroSource,
  germanHomeSource,
  englishCommercialContent,
  englishCommercialComponent,
  germanScopeHeroSource,
  englishScopePageSource,
  germanScopePageSource,
  analyticsConsentSource
] = await Promise.all([
  readFile(new URL("lib/seo/page-registry.ts", root), "utf8"),
  readFile(new URL("lib/seo/build-metadata.ts", root), "utf8"),
  readFile(new URL("app/[locale]/page.tsx", root), "utf8"),
  readFile(new URL("components/evipace/english-home/HomeHero.tsx", root), "utf8"),
  readFile(new URL("components/evipace/GermanHomePage.tsx", root), "utf8"),
  readFile(new URL("components/evipace/english-commercial/content.ts", root), "utf8"),
  readFile(
    new URL(
      "components/evipace/english-commercial/EnglishCommercialServicePage.tsx",
      root
    ),
    "utf8"
  ),
  readFile(
    new URL("components/evipace/scope-1-2-berechnung/LandingHero.tsx", root),
    "utf8"
  ),
  readFile(new URL("app/[locale]/scope-1-2-calculation/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/scope-1-2-berechnung/page.tsx", root), "utf8"),
  readFile(new URL("tests/analytics-consent.test.mjs", root), "utf8")
]);

const enRegistry = registrySource.slice(
  registrySource.indexOf("  en: {"),
  registrySource.indexOf("\n  de: {")
);
const deRegistry = registrySource.slice(
  registrySource.indexOf("  de: {"),
  registrySource.indexOf("\n  sl: {}")
);

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

test("approved EN and DE SEO titles and H1s are exact", () => {
  const expected = [
    [
      enRegistry,
      'title: "ESG Consulting for Manufacturing Companies | evipace"',
      englishHeroSource,
      "Practical ESG consulting for manufacturing companies — done faster."
    ],
    [
      deRegistry,
      'title: "ESG-Beratung für produzierende Unternehmen | evipace"',
      germanHomeSource,
      "Praktische ESG-Beratung für produzierende Unternehmen – schneller erledigt."
    ],
    [
      enRegistry,
      'title: "Corporate Carbon Footprint & Scope 1–2 Calculation | evipace"',
      englishCommercialContent,
      "Calculate and document your company’s Scope 1 and Scope 2 emissions.",
      englishCommercialComponent
    ],
    [
      deRegistry,
      'title: "CO₂-Bilanz für Unternehmen: Scope 1 & 2 berechnen | evipace"',
      germanScopeHeroSource,
      "CO₂-Bilanz für Ihr Unternehmen: Scope 1 und Scope 2 nachvollziehbar berechnen."
    ]
  ];

  for (const [registry, title, source, h1, h1Source = source] of expected) {
    assert.ok(registry.includes(title), title);
    assert.ok(normalizeWhitespace(source).includes(h1), h1);
    assert.equal((h1Source.match(/<h1\b/g) ?? []).length, 1, h1);
  }
});

test("locale-specific titles, canonical paths and hreflang behavior stay on registry infrastructure", () => {
  assert.ok(enRegistry.includes('path: "/en"'));
  assert.ok(enRegistry.includes('path: "/en/scope-1-2-calculation"'));
  assert.ok(deRegistry.includes('path: "/de"'));
  assert.ok(deRegistry.includes('path: "/de/scope-1-2-berechnung"'));
  assert.ok(metadataSource.includes("canonical: entry.path"));
  assert.ok(metadataSource.includes("languages[locale] = entry.path"));
  assert.ok(metadataSource.includes('languages["x-default"]'));
  assert.ok(homepageSource.includes('locale === "de"'));
  assert.ok(homepageSource.includes("<GermanHomePage"));
  assert.ok(homepageSource.includes("<EnglishHomePage"));
  assert.ok(englishScopePageSource.includes('locale !== "en"'));
  assert.ok(germanScopePageSource.includes('locale !== "de"'));
});

test("approved Scope 1 and 2 copy targets carbon-footprint terms without calculator or assurance claims", () => {
  assert.ok(englishCommercialContent.includes("corporate carbon footprint"));
  assert.ok(
    normalizeWhitespace(germanScopeHeroSource).includes(
      "CO₂-Bilanz für Unternehmen"
    )
  );

  const changedSources = [englishCommercialContent, germanScopeHeroSource].join("\n");
  for (const claim of [
    "free calculator",
    "automated carbon calculator",
    "certified footprint",
    "guaranteed compliance",
    "we provide audit",
    "we provide assurance"
  ]) {
    assert.ok(!changedSources.toLowerCase().includes(claim), claim);
  }
});

test("no duplicate SEO routes, meta keywords or hardcoded analytics secrets were introduced", () => {
  for (const forbidden of [
    "meta keywords",
    "keywords:",
    "/en/esg-consultancy",
    "/en/esg-advisory",
    "/de/esg-beratung",
    "/de/nachhaltigkeitsbericht-erstellen"
  ]) {
    assert.ok(!registrySource.toLowerCase().includes(forbidden.toLowerCase()), forbidden);
  }

  assert.ok(
    analyticsConsentSource.includes("no production GA4 measurement ID is hardcoded in source or tests")
  );
  assert.equal(registrySource.match(/\bG-[A-Z0-9]{8,}\b/g), null);
});
