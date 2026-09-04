import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [
  registrySource,
  metadataSource,
  sitemapSource,
  routeSource,
  guideSource,
  toolSource,
  dataSource,
  hubSource,
  globalCssSource,
  scope12DataGuideSource,
  scope123GuideSource,
  evidenceReadinessGuideSource,
  commercialSource
] = await Promise.all([
  readFile(new URL("../lib/seo/page-registry.ts", import.meta.url), "utf8"),
  readFile(new URL("../lib/seo/build-metadata.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/scope-1-2-datenerfassungs-vorlage/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/Scope12DataCollectionGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/Scope12DataCollectionTool.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/scope12-data-collection-data.ts",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/GermanResourceHub.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../components/evipace/resources/Scope12DataGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/Scope123ExplainerGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EsgEvidenceReadinessGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/scope-1-2-berechnung/SourceDataIntro.tsx",
      import.meta.url
    ),
    "utf8"
  )
]);

const PAGE_PATH = "/de/ressourcen/scope-1-2-datenerfassungs-vorlage";
const STORAGE_KEY = "evipace:de:scope12-data-collection:v1";

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function localeRegistryBlock(locale) {
  const localeOrder = ["en", "de", "sl"];
  const localeIndex = localeOrder.indexOf(locale);
  assert.notEqual(localeIndex, -1, `Unknown locale ${locale}`);

  const start = registrySource.indexOf(`  ${locale}: {`);
  assert.notEqual(start, -1, `Missing ${locale} registry block`);

  const nextLocale = localeOrder[localeIndex + 1];
  const nextLocaleStart = nextLocale
    ? registrySource.indexOf(`\n  ${nextLocale}:`, start + 1)
    : -1;

  return nextLocaleStart === -1
    ? registrySource.slice(start)
    : registrySource.slice(start, nextLocaleStart);
}

function sourceCompletenessBlock() {
  const start = dataSource.indexOf("export const sourceCompletenessChecks");
  const end = dataSource.indexOf("] as const;", start);
  assert.notEqual(start, -1);
  assert.notEqual(end, -1);
  return dataSource.slice(start, end);
}

test("German Scope 1 & 2 data collection resource has exact metadata and a genuine English equivalent", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));

  assert.ok(germanRegistry.includes("scope12DatenerfassungsVorlage: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "Scope 1 & 2 Datenerfassungs-Vorlage | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Sammeln Sie Strom-, Brennstoff-, Fahrzeug-, Kältemittel- und Wärmedaten strukturiert für Ihre Scope-1-&-2-Berechnung – mit einer praktischen Vorlage."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${PAGE_PATH}"`));
  assert.ok(englishRegistry.includes("scope12DatenerfassungsVorlage"));
  assert.ok(
    englishRegistry.includes(
      'path: "/en/resources/scope-1-2-data-collection-template"'
    )
  );
  assert.ok(!localeRegistryBlock("sl").includes("scope12DatenerfassungsVorlage"));
  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
  assert.equal((registrySource.match(/path: "\/de\/ressourcen\/scope-1-2-datenerfassungs-vorlage"/g) ?? []).length, 1);
});

test("route is German-only and emits restrained resource Article schema", () => {
  for (const marker of [
    'const PAGE_KEY = "scope12DatenerfassungsVorlage"',
    "buildPageMetadata(locale, PAGE_KEY)",
    "isPageReachable(locale, PAGE_KEY)",
    'locale !== "de"',
    "buildOrganizationSchema()",
    "buildWebsiteSchema()",
    "buildWebPageSchema(locale, PAGE_KEY)",
    "buildArticleSchema(locale, PAGE_KEY, PAGE_TITLE)",
    "buildBreadcrumbListSchema"
  ]) {
    assert.ok(routeSource.includes(marker), marker);
  }

  assert.equal((routeSource.match(/buildWebPageSchema\(/g) ?? []).length, 1);
  for (const forbidden of [
    "FAQPage",
    "HowTo",
    "SoftwareApplication",
    "Dataset",
    "AggregateRating",
    "Review",
    "datePublished",
    "dateModified",
    '"@type": "Person"'
  ]) {
    assert.ok(!routeSource.includes(forbidden), forbidden);
  }
});

test("data model encodes the required activity-data categories, checks, status, storage key, and CSV safety", () => {
  assert.ok(dataSource.includes("SCOPE12_COLLECTION_STORAGE_KEY"));
  assert.ok(dataSource.includes(`"${STORAGE_KEY}"`));

  for (const category of [
    "stationary-combustion",
    "mobile-combustion",
    "refrigerants",
    "process-emissions",
    "electricity",
    "purchased-energy"
  ]) {
    assert.ok(dataSource.includes(`id: "${category}"`), category);
  }

  for (const marker of [
    '"stationary-combustion": "unclear"',
    '"mobile-combustion": "unclear"',
    'refrigerants: "unclear"',
    '"process-emissions": "unclear"',
    'electricity: "unclear"',
    '"purchased-energy": "unclear"'
  ]) {
    assert.ok(dataSource.includes(marker), marker);
  }

  const checks = [...sourceCompletenessBlock().matchAll(/id: "([^"]+)"/g)].map(
    (match) => match[1]
  );
  assert.deepEqual(checks, [
    "period-complete",
    "units-clear",
    "locations-assigned",
    "source-available",
    "duplicates-checked",
    "gaps-documented",
    "boundary-confirmed",
    "internal-review"
  ]);

  assert.ok(dataSource.includes("Bereit für interne Prüfung und Berechnungsvorbereitung"));
  assert.ok(dataSource.includes("sanitizeCsvCell"));
  assert.ok(dataSource.includes("/^[=+\\-@]/.test(raw)"));
  assert.ok(dataSource.includes("formulaSafe"));
  assert.ok(dataSource.includes("replace(/\"/g, '\"\"')"));
  for (const header of [
    '"Scope"',
    '"Kategorie"',
    '"Standort"',
    '"Menge"',
    '"Einheit"',
    '"Quelle"',
    '"Quellenreferenz"',
    '"Status"'
  ]) {
    assert.ok(dataSource.includes(header), header);
  }
  assert.ok(!dataSource.includes("emissionFactor"));
  assert.ok(!dataSource.includes("co2e"));
  assert.ok(!dataSource.includes("scope3"));
});

test("client workspace persists only its own key and supports accessible CRUD, CSV export, print, duplicate, and reset", () => {
  for (const marker of [
    "Scope12DataCollectionTool",
    "window.localStorage.getItem(storageKey)",
    "window.localStorage.setItem(",
    "window.localStorage.removeItem(storageKey)",
    "buildScope12Csv(state, locale)",
    "new Blob([csv], { type: \"text/csv;charset=utf-8\" })",
    "URL.createObjectURL(blob)",
    "window.print()",
    "duplicateEntry(entry)",
    "removeLocationWithLinkedEntries",
    "<dialog",
    "showModal()",
    "role=\"progressbar\"",
    "<fieldset",
    "<legend",
    "type=\"radio\"",
    "scope12-print-summary"
  ]) {
    assert.ok(toolSource.includes(marker), marker);
  }

  assert.ok(!toolSource.includes("localStorage.clear"));
  assert.ok(toolSource.includes("Datensatz wirklich entfernen?"));
  assert.ok(toolSource.includes("Standort wirklich entfernen?"));
  assert.ok(toolSource.includes("Datensammlung wirklich zurücksetzen?"));
});

test("guide has exact hero contract, collection framing, required internal links, breadcrumbs, and no calculator framing", () => {
  for (const marker of [
    "SCOPE 1 &amp; 2 DATA COLLECTION",
    "Sammeln Sie alle Daten für Scope 1 &amp; 2 an einem Ort.",
    "Datensammlung starten",
    "Erst Datenbasis, dann CO₂e.",
    "Diese Vorlage deckt Schritt 1 ab.",
    "Welche Daten gehören zu Scope 1?",
    "Welche Daten gehören zu Scope 2?",
    "Warum bei Strom mehr als nur kWh relevant sein können",
    "Welche Belege sollten Sie aufbewahren?",
    "Fünf typische Fehler bei der Datensammlung",
    "Startseite",
    "Ressourcen",
    "Scope 1 &amp; 2 Datenerfassungs-Vorlage"
  ]) {
    assert.ok(guideSource.includes(marker), marker);
  }

  for (const href of [
    "/de/ressourcen",
    "/de/ressourcen/scope-1-2-daten-berechnung",
    "/de/ressourcen/scope-1-2-3-einfach-erklaert",
    "/de/ressourcen/esg-nachweise-checkliste",
    "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
    "/de/scope-1-2-berechnung",
    "/de/send-request",
    "/de/methodology"
  ]) {
    assert.ok(guideSource.includes(`"${href}"`), href);
  }

  assert.ok(guideSource.includes("berechnet keine CO₂e-Werte"));
  assert.ok(guideSource.includes("Vorlage statt Rechner"));
  assert.ok(!guideSource.includes("Emissionen berechnen</"));
});

test("hub and related pages link the new template with the approved hub card copy", () => {
  for (const marker of [
    "INTERAKTIVE VORLAGE",
    "Scope 1 &amp; 2 Datenerfassungs-Vorlage",
    "Scope 1 & 2 Datenerfassungs-Vorlage",
    "Strom, Brennstoffe, Fahrzeuge, Kältemittel und weitere Aktivitätsdaten strukturiert je Standort erfassen."
  ]) {
    assert.ok(hubSource.includes(marker), marker);
  }

  for (const source of [
    hubSource,
    scope12DataGuideSource,
    scope123GuideSource,
    evidenceReadinessGuideSource,
    commercialSource
  ]) {
    assert.ok(source.includes(PAGE_PATH));
  }

  assert.ok(globalCssSource.includes(".scope12-print-summary"));
  assert.ok(globalCssSource.includes(".scope12-data-page .scope12-dialog"));
});
