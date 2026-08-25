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
  commercialCustomerSource,
  commercialQuestionnaireSource,
  questionnaireGuideSource,
  dataOwnersGuideSource,
  checklistGuideSource
] = await Promise.all([
  readFile(new URL("../lib/seo/page-registry.ts", import.meta.url), "utf8"),
  readFile(new URL("../lib/seo/build-metadata.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/welche-esg-daten-kunden-lieferanten/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EsgCustomerDataGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL("../components/evipace/resources/GermanResourceHub.tsx", import.meta.url),
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
  ),
  readFile(
    new URL("../components/evipace/resources/EsgQuestionnaireGuide.tsx", import.meta.url),
    "utf8"
  ),
  readFile(
    new URL("../components/evipace/resources/EsgDataOwnersGuide.tsx", import.meta.url),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EsgQuestionnaireChecklistGuide.tsx",
      import.meta.url
    ),
    "utf8"
  )
]);

const PAGE_KEY = "welcheEsgDatenKundenLieferanten";
const PAGE_PATH = "/de/ressourcen/welche-esg-daten-kunden-lieferanten";

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

test("customer data resource has exact German metadata and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));

  assert.ok(germanRegistry.includes(`${PAGE_KEY}: {`));
  assert.ok(
    germanRegistry.includes(
      'title: "Welche ESG-Daten verlangen Kunden von Lieferanten? | evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Welche ESG-Daten fragen Kunden bei Lieferanten ab? Überblick über Emissionen, Energie, Umwelt, Mitarbeitende, Policies, Lieferkette, Compliance und typische Nachweise."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${PAGE_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.equal((registrySource.match(new RegExp(`path: "${PAGE_PATH}"`, "g")) ?? []).length, 1);
  assert.ok(englishRegistry.includes(`${PAGE_KEY}: {`));
  assert.ok(
    englishRegistry.includes(
      'path: "/en/resources/esg-data-customers-request-from-suppliers"'
    )
  );
  assert.ok(englishRegistry.includes('openGraphType: "article"'));
  assert.ok(!localeRegistryBlock("sl").includes(PAGE_KEY));
  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes('if (englishEntry)'));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("customer data route is German-only and uses restrained article schema", () => {
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
    "datePublished",
    "dateModified",
    '"@type": "Person"'
  ]) {
    assert.ok(!routeSource.includes(forbidden), forbidden);
  }
});

test("customer data guide preserves required editorial structure", () => {
  const normalized = normalizeWhitespace(guideSource);
  const requiredCopy = [
    "Welche ESG-Daten verlangen Kunden von Lieferanten?",
    "ESG-DATEN FÜR KUNDENANFRAGEN",
    "Kurz gesagt",
    "Von der Kundenfrage zur belastbaren Antwort",
    "Es gibt keine universelle ESG-Datenliste für jeden Lieferanten.",
    "Nicht alles sammeln. Das Richtige sammeln.",
    "Nicht jede ESG-Frage verlangt eine Zahl.",
    "Daten und Nachweise sind nicht dasselbe.",
    "Wo liegen ESG-Daten im Unternehmen?",
    "Meistens nicht in einer einzelnen „ESG-Abteilung“.",
    "Sie haben gerade einen ESG-Fragebogen erhalten – womit beginnen?",
    "Was Sie nicht automatisch vorbereiten müssen",
    "EcoVadis",
    "IntegrityNext",
    "Kann VSME helfen, häufig benötigte ESG-Daten zu strukturieren?",
    "Die ESG Data Request Map",
    "Sechs typische Fehler bei ESG-Datenanfragen",
    "Sie möchten die Anfrage jetzt strukturiert bearbeiten?",
    "Ihr Kunde hat die Liste bereits geschickt?",
    "Methodische Einordnung",
    "Sie müssen nicht zuerst ein ESG-System aufbauen."
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  for (const heading of [
    "Unternehmens- und Standortdaten",
    "Energie und Treibhausgasemissionen",
    "Umwelt, Ressourcen und betriebliche Auswirkungen",
    "Mitarbeitende und Arbeitsbedingungen",
    "Gesundheit und Sicherheit am Arbeitsplatz",
    "Menschenrechte und soziale Mindeststandards",
    "Richtlinien, Maßnahmen und Ziele",
    "Ethik, Compliance und Unternehmensführung",
    "Lieferkette und nachhaltige Beschaffung",
    "Zertifikate, Dokumente und andere Nachweise"
  ]) {
    assert.ok(normalized.includes(heading), heading);
  }

  assert.ok(guideSource.includes("data-esg-data-category"));
  assert.ok(guideSource.includes("data-esg-request-map"));
  assert.ok(guideSource.includes("data-esg-data-owner-map"));
  assert.ok(guideSource.includes("data-first-action-workflow"));
  assert.ok(guideSource.includes("data-common-mistakes"));
  assert.ok(guideSource.includes("data-tool-bridge"));
  assert.ok(!guideSource.includes("FAQPage"));
});

test("customer data guide links required internal destinations", () => {
  const requiredPaths = [
    "/de/ressourcen",
    "/de/esg-kundenanfragen",
    "/de/esg-fragebogen-lieferanten",
    "/de/ecovadis-unterstuetzung",
    "/de/integritynext-unterstuetzung",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
    "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/esg-nachweise-checkliste",
    "/de/ressourcen/scope-1-2-datenerfassungs-vorlage",
    "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
    "/de/send-request",
    "/de/methodology"
  ];

  for (const path of requiredPaths) {
    assert.ok(guideSource.includes(path), path);
  }
});

test("hub and relevant pages backlink to customer data guide naturally", () => {
  assert.ok(hubSource.includes(PAGE_PATH));
  assert.ok(hubSource.includes("Welche ESG-Daten verlangen Kunden von Lieferanten?"));

  const backlinkSources = [
    commercialCustomerSource,
    commercialQuestionnaireSource,
    questionnaireGuideSource,
    dataOwnersGuideSource,
    checklistGuideSource
  ];

  for (const source of backlinkSources) {
    assert.ok(source.includes(PAGE_PATH));
  }
});
