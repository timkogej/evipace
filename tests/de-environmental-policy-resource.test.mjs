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
  evidenceGuideSource,
  questionnaireChecklistGuideSource,
  evidenceReadinessGuideSource,
  reusableDataGuideSource,
  commercialCustomerSource
] = await Promise.all([
  readFile(new URL("../lib/seo/page-registry.ts", import.meta.url), "utf8"),
  readFile(new URL("../lib/seo/build-metadata.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/environmental-policy-erstellen/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EnvironmentalPolicyGuide.tsx",
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
      "../components/evipace/resources/EsgEvidenceGuide.tsx",
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
      "../components/evipace/resources/EsgReusableDataGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL("../components/evipace/esg-kundenanfragen/DataSources.tsx", import.meta.url),
    "utf8"
  )
]);

const PAGE_KEY = "environmentalPolicyErstellen";
const PAGE_PATH = "/de/ressourcen/environmental-policy-erstellen";

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

function sourceBlock(name) {
  const start = guideSource.indexOf(`const ${name} = [`);
  assert.notEqual(start, -1, `Missing ${name}`);
  const end = guideSource.indexOf("] as const;", start);
  assert.notEqual(end, -1, `Missing end for ${name}`);
  return guideSource.slice(start, end);
}

function countTupleRows(name) {
  return (sourceBlock(name).match(/^\s*\[/gm) ?? []).length;
}

test("environmental policy resource has exact German SEO metadata and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));

  assert.ok(germanRegistry.includes(`${PAGE_KEY}: {`));
  assert.ok(
    germanRegistry.includes(
      'title: "Environmental Policy erstellen: Leitfaden für Unternehmen | evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Environmental Policy erstellen: So strukturieren Lieferanten Geltungsbereich, Umweltgrundsätze, Verantwortlichkeiten, Ziele und interne Freigabe nachvollziehbar."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${PAGE_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.equal((registrySource.match(new RegExp(`path: "${PAGE_PATH}"`, "g")) ?? []).length, 1);
  assert.ok(englishRegistry.includes(`${PAGE_KEY}: {`));
  assert.ok(
    englishRegistry.includes(
      'title: "Environmental Policy: How to Create One | evipace"'
    )
  );
  assert.ok(englishRegistry.includes('path: "/en/resources/environmental-policy"'));
  assert.ok(!localeRegistryBlock("sl").includes(PAGE_KEY));
  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes('if (englishEntry)'));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("environmental policy route is German-only and uses restrained article schema", () => {
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
    "Service",
    "Product",
    "SoftwareApplication",
    "Review",
    "AggregateRating",
    "datePublished",
    "dateModified",
    '"@type": "Person"'
  ]) {
    assert.ok(!routeSource.includes(forbidden), forbidden);
  }
});

test("environmental policy guide preserves required editorial structure and counts", () => {
  const normalized = normalizeWhitespace(guideSource);
  const requiredCopy = [
    "Environmental Policy erstellen: Was eine belastbare Umweltrichtlinie enthalten sollte",
    "ENVIRONMENTAL POLICY",
    "Kurz gesagt",
    "Eine Policy ist nicht dasselbe wie ihre Umsetzung.",
    "Policy ≠ Umsetzung ≠ Nachweis",
    "Bevor Sie schreiben: Was existiert im Unternehmen bereits?",
    "Wofür ist eine Environmental Policy da?",
    "Sieben Bausteine einer belastbaren Environmental Policy",
    "Was nicht in eine Environmental Policy gehört",
    "Eine Vorlage ist nur der Ausgangspunkt.",
    "Welche Dokumente gehören zusammen?",
    "Welche Nachweise können eine Environmental Policy ergänzen?",
    "Welchen Status hat Ihre Environmental Policy?",
    "Eine Policy braucht eine eindeutige Version.",
    "Beispiel für den Aufbau einer Environmental Policy",
    "Was tun, wenn der Kunde nach einer Environmental Policy fragt?",
    "Was, wenn Ihr Unternehmen noch keine Environmental Policy hat?",
    "Brauchen Unternehmen mit ISO 14001 zusätzlich eine separate Environmental Policy?",
    "Environmental Policies in Supplier Assessments",
    "Eine freigegebene Policy sollte nicht im nächsten Fragebogen wieder gesucht werden müssen.",
    "Von der tatsächlichen Praxis zur freigegebenen Policy",
    "Sieben typische Fehler bei Environmental Policies",
    "Vor der internen Freigabe prüfen",
    "Environmental Policy im ESG-System einordnen",
    "Ihr Kunde verlangt eine Environmental Policy",
    "Methodische Einordnung",
    "Eine gute Environmental Policy beginnt nicht mit Text."
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  assert.equal(countTupleRows("purposeBlocks"), 4);
  assert.equal((sourceBlock("buildingBlocks").match(/title: "/g) ?? []).length, 7);
  assert.equal(countTupleRows("notInPolicyItems"), 6);
  assert.equal(countTupleRows("statusModel"), 5);
  assert.equal(countTupleRows("outlineSections"), 8);
  assert.equal(countTupleRows("workflowSteps"), 6);
  assert.equal(countTupleRows("commonMistakes"), 7);
  assert.equal((sourceBlock("preApprovalItems").match(/"[^"]+"/g) ?? []).length, 10);

  for (const marker of [
    "data-policy-distinction",
    "data-pre-drafting-assessment",
    "data-policy-purpose-blocks",
    "data-policy-building-blocks",
    "data-not-in-policy-items",
    "data-generic-specific-comparison",
    "data-document-hierarchy",
    "data-supporting-evidence",
    "data-policy-status-model",
    "data-version-control-example",
    "data-policy-outline",
    "data-customer-policy-workflow",
    "data-policy-readiness-map",
    "data-common-policy-mistakes",
    "data-pre-approval-checklist",
    "data-resource-bridge"
  ]) {
    assert.ok(guideSource.includes(marker), marker);
  }

  assert.ok(guideSource.includes("Draft ≠ verabschiedete Policy"));
  assert.ok(guideSource.includes("Keine rückwirkenden Freigabedaten erfinden."));
  assert.ok(!guideSource.includes("localStorage"));
  assert.ok(!guideSource.includes("useState"));
  assert.ok(!guideSource.includes("FAQPage"));
});

test("environmental policy guide links required internal destinations", () => {
  const requiredPaths = [
    "/de/ressourcen",
    "/de/ressourcen/welche-esg-daten-kunden-lieferanten",
    "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
    "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/esg-nachweise-checkliste",
    "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen",
    "/de/esg-kundenanfragen",
    "/de/esg-fragebogen-lieferanten",
    "/de/ecovadis-unterstuetzung",
    "/de/integritynext-unterstuetzung",
    "/de/send-request",
    "/de/methodology"
  ];

  for (const path of requiredPaths) {
    assert.ok(guideSource.includes(path), path);
  }
});

test("hub and relevant pages backlink to environmental policy guide naturally", () => {
  assert.ok(hubSource.includes(PAGE_PATH));
  assert.ok(hubSource.includes("Environmental Policy erstellen"));

  const backlinkSources = [
    hubSource,
    customerDataGuideSource,
    evidenceGuideSource,
    questionnaireChecklistGuideSource,
    evidenceReadinessGuideSource,
    reusableDataGuideSource,
    commercialCustomerSource
  ];

  for (const source of backlinkSources) {
    assert.ok(source.includes(PAGE_PATH));
  }
});
