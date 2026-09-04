import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [
  registrySource,
  metadataSource,
  sitemapSource,
  routeSource,
  guideSource,
  hubSource,
  customerDataGuideSource,
  dataOwnersGuideSource,
  questionnaireChecklistGuideSource,
  evidenceReadinessGuideSource,
  scope12DataCollectionGuideSource,
  commercialCustomerSource,
  commercialQuestionnaireSource
] = await Promise.all([
  readFile(new URL("../lib/seo/page-registry.ts", import.meta.url), "utf8"),
  readFile(new URL("../lib/seo/build-metadata.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EsgReusableDataGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(new URL("../components/evipace/resources/GermanResourceHub.tsx", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../components/evipace/resources/EsgCustomerDataGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EsgDataOwnersGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EsgQuestionnaireChecklistGuide.tsx",
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
      "../components/evipace/resources/Scope12DataCollectionGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL("../components/evipace/esg-kundenanfragen/DataSources.tsx", import.meta.url),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/esg-fragebogen-lieferanten/ProblemIntro.tsx",
      import.meta.url
    ),
    "utf8"
  )
]);

const PAGE_KEY = "esgDatenEinmalSammelnMehrfachNutzen";
const PAGE_PATH = "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen";

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

test("reusable data resource has exact German SEO metadata and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));

  assert.ok(germanRegistry.includes(`${PAGE_KEY}: {`));
  assert.ok(
    germanRegistry.includes(
      'title: "ESG-Daten einmal sammeln und mehrfach nutzen | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "ESG-Daten nicht für jeden Kunden neu zusammensuchen: So bauen Lieferanten eine wiederverwendbare Datengrundlage für Fragebögen, Nachweise, VSME und weitere ESG-Anfragen auf."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${PAGE_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.equal((registrySource.match(new RegExp(`path: "${PAGE_PATH}"`, "g")) ?? []).length, 1);
  assert.ok(englishRegistry.includes(`${PAGE_KEY}: {`));
  assert.ok(
    englishRegistry.includes(
      'title: "Collect ESG Data Once and Reuse It | Evipace"'
    )
  );
  assert.ok(englishRegistry.includes('path: "/en/resources/reusable-esg-data"'));
  assert.ok(!localeRegistryBlock("sl").includes(PAGE_KEY));
  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes('if (englishEntry)'));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("reusable data route is German-only and uses restrained article schema", () => {
  for (const marker of [
    `const PAGE_KEY = "${PAGE_KEY}"`,
    "buildPageMetadata(locale, PAGE_KEY)",
    "isPageReachable(locale, PAGE_KEY)",
    'locale !== "de"',
    "buildOrganizationSchema()",
    "buildWebsiteSchema()",
    "buildWebPageSchema(locale, PAGE_KEY)",
    "buildArticleSchema(locale, PAGE_KEY",
    "buildBreadcrumbListSchema"
  ]) {
    assert.ok(routeSource.includes(marker), marker);
  }

  for (const forbidden of [
    "FAQPage",
    "HowTo",
    "Dataset",
    "SoftwareApplication",
    "Product",
    "AggregateRating",
    // Dates may only ever come from the page registry, never from a
    // literal in the route — see lib/seo/page-registry.ts.
    'datePublished: "',
    'dateModified: "',
    '"@type": "Person"'
  ]) {
    assert.ok(!routeSource.includes(forbidden), forbidden);
  }
});

test("reusable data guide preserves required editorial structure", () => {
  const normalized = normalizeWhitespace(guideSource);
  const requiredCopy = [
    "ESG-Daten einmal sammeln. Für die nächste Anfrage wiederverwenden.",
    "REUSABLE ESG DATA FOUNDATION",
    "Kurz gesagt",
    "Warum beginnt ESG bei vielen Lieferanten jedes Mal wieder bei null?",
    "Was sich mit einer wiederverwendbaren Struktur verändert",
    "Was sollte wiederverwendbar gespeichert werden?",
    "Die kleinste sinnvolle ESG-Dateneinheit",
    "Nicht jede Antwort sollte kopiert werden. Viele Datenpunkte können es.",
    "Fünf Ebenen einer wiederverwendbaren ESG-Struktur",
    "Wiederverwendung funktioniert nur mit Nachvollziehbarkeit.",
    "Beispiel: Stromverbrauch",
    "Beispiel: Environmental Policy",
    "Beispiel: Scope 1 &amp; 2",
    "Die reusable ESG database beginnt nicht unbedingt mit neuer Software.",
    "Jeder wiederverwendbare Datenpunkt braucht einen Owner.",
    "Wiederverwendbare Daten brauchen einen Aktualitätsstatus.",
    "Speichern Sie nicht nur den Datenpunkt",
    "Warum Wiederverwendung über mehrere ESG-Anfragen hinweg sinnvoll ist",
    "So wird aus einer einzelnen ESG-Anfrage eine wiederverwendbare Grundlage",
    "Wiederverwendung darf nicht zu Copy-and-Paste-ESG werden.",
    "Aus einzelnen Tools wird ein System",
    "Ihre ESG-Daten liegen bereits im Unternehmen",
    "Methodische Einordnung",
    "Jede beantwortete Anfrage sollte die nächste einfacher machen."
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  for (const marker of [
    "data-before-after",
    "data-reusable-components",
    "data-reusable-data-record",
    "data-reuse-groups",
    "data-foundation-layers",
    "data-evidence-chain",
    "data-practical-examples",
    "data-owner-examples",
    "data-freshness-statuses",
    "data-request-mapping",
    "data-reuse-workflow",
    "data-copy-paste-warnings",
    "data-resource-system-map"
  ]) {
    assert.ok(guideSource.includes(marker), marker);
  }

  for (const field of [
    "Datenpunkt",
    "Gesellschaft",
    "Standort",
    "Zeitraum",
    "Wert",
    "Einheit",
    "Quelle",
    "Nachweis",
    "Owner",
    "Bestätigt durch",
    "Status",
    "Letzte Prüfung"
  ]) {
    assert.ok(guideSource.includes(field), field);
  }

  assert.ok(guideSource.includes("Muster GmbH"));
  assert.ok(guideSource.includes("Dieses Beispiel ist illustrativ"));
  assert.ok(!guideSource.includes("FAQPage"));
});

test("reusable data guide links required internal destinations", () => {
  const requiredPaths = [
    "/de/ressourcen",
    "/de/esg-kundenanfragen",
    "/de/esg-fragebogen-lieferanten",
    "/de/ecovadis-unterstuetzung",
    "/de/integritynext-unterstuetzung",
    "/de/ressourcen/welche-esg-daten-kunden-lieferanten",
    "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
    "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/esg-nachweise-checkliste",
    "/de/ressourcen/scope-1-2-daten-berechnung",
    "/de/ressourcen/scope-1-2-datenerfassungs-vorlage",
    "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
    "/de/send-request",
    "/de/methodology"
  ];

  for (const path of requiredPaths) {
    assert.ok(guideSource.includes(path), path);
  }
});

test("hub and relevant pages backlink to reusable data guide naturally", () => {
  assert.ok(hubSource.includes(PAGE_PATH));
  assert.ok(hubSource.includes("ESG-Daten einmal sammeln, mehrfach nutzen"));

  const backlinkSources = [
    hubSource,
    customerDataGuideSource,
    dataOwnersGuideSource,
    questionnaireChecklistGuideSource,
    evidenceReadinessGuideSource,
    scope12DataCollectionGuideSource,
    commercialCustomerSource,
    commercialQuestionnaireSource
  ];

  for (const source of backlinkSources) {
    assert.ok(source.includes(PAGE_PATH));
  }
});
