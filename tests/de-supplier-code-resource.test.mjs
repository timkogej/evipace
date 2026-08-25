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
  dataOwnersGuideSource,
  questionnaireChecklistGuideSource,
  evidenceReadinessGuideSource,
  environmentalPolicyGuideSource,
  reusableDataGuideSource,
  commercialCustomerSource
] = await Promise.all([
  readFile(new URL("../lib/seo/page-registry.ts", import.meta.url), "utf8"),
  readFile(new URL("../lib/seo/build-metadata.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/supplier-code-of-conduct-erstellen/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/SupplierCodeOfConductGuide.tsx",
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
      "../components/evipace/resources/EnvironmentalPolicyGuide.tsx",
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

const PAGE_KEY = "supplierCodeOfConductErstellen";
const PAGE_PATH = "/de/ressourcen/supplier-code-of-conduct-erstellen";

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
  const end = guideSource.indexOf("\n] as const;", start);
  assert.notEqual(end, -1, `Missing end for ${name}`);
  return guideSource.slice(start, end);
}

function countTupleRows(name) {
  return (sourceBlock(name).match(/^\s*\[/gm) ?? []).length;
}

test("supplier code resource has exact German SEO metadata and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));

  assert.ok(germanRegistry.includes(`${PAGE_KEY}: {`));
  assert.ok(
    germanRegistry.includes(
      'title: "Supplier Code of Conduct erstellen: Leitfaden | evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Supplier Code of Conduct erstellen: So strukturieren Unternehmen Erwartungen an Umwelt, Menschenrechte, Arbeitsbedingungen, Ethik und Lieferanten nachvollziehbar."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${PAGE_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.equal((registrySource.match(new RegExp(`path: "${PAGE_PATH}"`, "g")) ?? []).length, 1);
  assert.ok(englishRegistry.includes(`${PAGE_KEY}: {`));
  assert.ok(
    englishRegistry.includes(
      'title: "Supplier Code of Conduct: How to Create One | evipace"'
    )
  );
  assert.ok(englishRegistry.includes('path: "/en/resources/supplier-code-of-conduct"'));
  assert.ok(!localeRegistryBlock("sl").includes(PAGE_KEY));
  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes('if (englishEntry)'));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("supplier code route is German-only and uses restrained article schema", () => {
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

test("supplier code guide preserves required editorial structure and counts", () => {
  const normalized = normalizeWhitespace(guideSource);
  const requiredCopy = [
    "Supplier Code of Conduct erstellen: Was ein belastbarer Lieferantenkodex enthalten sollte",
    "SUPPLIER CODE OF CONDUCT",
    "Kurz gesagt",
    "Ein Supplier Code ist eine Erwartung – kein Beweis für Lieferantenleistung.",
    "Code ≠ Umsetzung ≠ Lieferanten-Compliance",
    "Bevor Sie einen Lieferantenkodex schreiben: Wie funktioniert Ihre Beschaffung heute?",
    "Wofür ist ein Supplier Code of Conduct da?",
    "Sieben Bausteine eines belastbaren Supplier Code of Conduct",
    "Was nicht in einen Supplier Code of Conduct gehört",
    "Ist ein Supplier Code automatisch Vertragsbestandteil?",
    "Veröffentlicht ≠ kommuniziert ≠ bestätigt ≠ vertraglich vereinbart",
    "Was bedeutet es, wenn ein Lieferant den Kodex bestätigt?",
    "Welche Nachweise zeigen, dass der Supplier Code tatsächlich genutzt wird?",
    "Welchen Status hat Ihr Supplier Code?",
    "Auch ein Lieferantenkodex braucht Versionskontrolle.",
    "Beispiel für den Aufbau eines Supplier Code of Conduct",
    "Was passiert, wenn ein Lieferant eine Anforderung nicht erfüllt?",
    "Muss jeder Lieferant gleich behandelt werden?",
    "Was tun, wenn Ihr Kunde nach einem Supplier Code of Conduct fragt?",
    "Was, wenn Ihr Unternehmen noch keinen Supplier Code of Conduct hat?",
    "Supplier Code und Supplier Questionnaire haben unterschiedliche Aufgaben.",
    "Kundenanforderung und eigener Supplier Code sind nicht dasselbe.",
    "Supplier Code of Conduct in ESG Assessments",
    "Ein freigegebener Supplier Code sollte bei der nächsten ESG-Anfrage auffindbar sein.",
    "Von den tatsächlichen Erwartungen zum angewendeten Supplier Code",
    "Acht typische Fehler bei Supplier Codes of Conduct",
    "Vor der internen Freigabe prüfen",
    "Supplier Code of Conduct im ESG-System einordnen",
    "Ihr Kunde verlangt einen Supplier Code",
    "Methodische Einordnung",
    "Ein guter Supplier Code beginnt nicht mit einer Vorlage."
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  assert.equal(countTupleRows("purposeBlocks"), 4);
  assert.equal((guideSource.match(/title: "[1-7] · /g) ?? []).length, 7);
  assert.equal(countTupleRows("notIncludedItems"), 6);
  assert.equal(countTupleRows("statusModel"), 5);
  assert.equal(countTupleRows("outlineSections"), 9);
  assert.equal(countTupleRows("workflowSteps"), 6);
  assert.equal(countTupleRows("commonMistakes"), 8);
  assert.equal((sourceBlock("preApprovalItems").match(/"[^"]+"/g) ?? []).length, 12);
  assert.equal(countTupleRows("resourceBridgeCards"), 5);

  for (const marker of [
    "data-code-compliance-distinction",
    "data-procurement-assessment",
    "data-supplier-code-purpose-blocks",
    "data-supplier-code-building-blocks",
    "data-not-in-supplier-code-items",
    "data-contract-status-distinction",
    "data-supplier-acknowledgment",
    "data-supplier-code-evidence",
    "data-supplier-code-status-model",
    "data-supplier-code-version-control",
    "data-supplier-code-outline",
    "data-deviation-workflow",
    "data-supplier-code-customer-workflow",
    "data-code-questionnaire-comparison",
    "data-supplier-code-lifecycle",
    "data-common-supplier-code-mistakes",
    "data-supplier-code-pre-approval-checklist",
    "data-supplier-code-resource-bridge"
  ]) {
    assert.ok(guideSource.includes(marker), marker);
  }

  assert.ok(guideSource.includes("Entwurf ≠ freigegebener Supplier Code"));
  assert.ok(guideSource.includes("Ein veröffentlichter oder unterzeichneter Supplier Code of Conduct beweist nicht automatisch"));
  assert.ok(!guideSource.includes("localStorage"));
  assert.ok(!guideSource.includes("useState"));
  assert.ok(!guideSource.includes("FAQPage"));
});

test("supplier code guide links required internal destinations", () => {
  const requiredPaths = [
    "/de/ressourcen",
    "/de/ressourcen/welche-esg-daten-kunden-lieferanten",
    "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
    "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/esg-nachweise-checkliste",
    "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen",
    "/de/ressourcen/environmental-policy-erstellen",
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

test("hub and relevant pages backlink to supplier code guide naturally", () => {
  assert.ok(hubSource.includes(PAGE_PATH));
  assert.ok(hubSource.includes("Supplier Code of Conduct erstellen"));
  assert.ok(hubSource.includes("So strukturieren Unternehmen realistische ESG- und Compliance-Erwartungen an Lieferanten"));

  const backlinkSources = [
    hubSource,
    customerDataGuideSource,
    evidenceGuideSource,
    dataOwnersGuideSource,
    questionnaireChecklistGuideSource,
    evidenceReadinessGuideSource,
    environmentalPolicyGuideSource,
    reusableDataGuideSource,
    commercialCustomerSource
  ];

  for (const source of backlinkSources) {
    assert.ok(source.includes(PAGE_PATH));
  }
});
