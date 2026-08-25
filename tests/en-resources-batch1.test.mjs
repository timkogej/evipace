import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [
  registrySource,
  metadataSource,
  sitemapSource,
  navigationSource,
  hubRouteSource,
  hubSource,
  articleRendererSource,
  contentSource,
  batch2ContentSource,
  requestRouteSource,
  dataRouteSource,
  evidenceRouteSource,
  ecovadisRouteSource,
  integrityNextRouteSource,
  scope12RouteSource,
  scope123RouteSource,
  vsmeRouteSource,
  ownersRouteSource
] = await Promise.all([
  readFile(new URL("../lib/seo/page-registry.ts", import.meta.url), "utf8"),
  readFile(new URL("../lib/seo/build-metadata.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  readFile(new URL("../lib/site-navigation.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../components/evipace/resources/EnglishResourceHub.tsx", import.meta.url), "utf8"),
  readFile(new URL("../components/evipace/resources/EnglishResourceArticle.tsx", import.meta.url), "utf8"),
  readFile(new URL("../components/evipace/resources/english-batch1-content.ts", import.meta.url), "utf8"),
  readFile(new URL("../components/evipace/resources/english-batch2-content.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/customer-esg-questionnaire-received/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/esg-data-customers-request-from-suppliers/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/esg-evidence-for-suppliers/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/ecovadis-documents-evidence/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/integritynext-invitation-for-suppliers/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/scope-1-2-data-calculation/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/scope-1-2-3-explained/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/vsme-data-sustainability-report/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/[locale]/resources/esg-data-owners/page.tsx", import.meta.url), "utf8")
]);

const pages = [
  {
    key: "esgFragebogenVomKundenErhalten",
    en: "/en/resources/customer-esg-questionnaire-received",
    de: "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    h1: "Received an ESG questionnaire from a customer? Start here.",
    title: "Received a Customer ESG Questionnaire? Start Here | evipace"
  },
  {
    key: "welcheEsgDatenKundenLieferanten",
    en: "/en/resources/esg-data-customers-request-from-suppliers",
    de: "/de/ressourcen/welche-esg-daten-kunden-lieferanten",
    h1: "What ESG data do customers ask suppliers for?",
    title: "What ESG Data Do Customers Ask Suppliers For? | evipace"
  },
  {
    key: "esgNachweiseLieferanten",
    en: "/en/resources/esg-evidence-for-suppliers",
    de: "/de/ressourcen/esg-nachweise-lieferanten",
    h1: "ESG evidence for suppliers: what documents actually support your answers?",
    title: "ESG Evidence for Suppliers: What Documents Support Answers? | evipace"
  },
  {
    key: "ecovadisDokumenteNachweise",
    en: "/en/resources/ecovadis-documents-evidence",
    de: "/de/ressourcen/ecovadis-dokumente-nachweise",
    h1: "EcoVadis documents and evidence: what suppliers should prepare.",
    title: "EcoVadis Documents & Evidence for Suppliers | evipace"
  },
  {
    key: "integrityNextEinladungLieferanten",
    en: "/en/resources/integritynext-invitation-for-suppliers",
    de: "/de/ressourcen/integritynext-einladung-lieferanten",
    h1: "Received an IntegrityNext invitation? A practical guide for suppliers.",
    title: "IntegrityNext Invitation for Suppliers: What to Do Next | evipace"
  }
];

const batch2Pages = [
  {
    key: "scope12DatenBerechnung",
    en: "/en/resources/scope-1-2-data-calculation",
    de: "/de/ressourcen/scope-1-2-daten-berechnung",
    h1: "What data do you need to calculate Scope 1 and Scope 2?",
    title: "Scope 1 & 2 Calculation: Data You Need | evipace"
  },
  {
    key: "scope123EinfachErklaert",
    en: "/en/resources/scope-1-2-3-explained",
    de: "/de/ressourcen/scope-1-2-3-einfach-erklaert",
    h1: "Scope 1, 2 and 3 explained for companies and suppliers.",
    title: "Scope 1, 2 & 3 Explained for Companies | evipace"
  },
  {
    key: "vsmeDatenNachhaltigkeitsbericht",
    en: "/en/resources/vsme-data-sustainability-report",
    de: "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
    h1: "What data do you need for a VSME sustainability report?",
    title: "VSME Data for Sustainability Reporting | evipace"
  },
  {
    key: "esgDatenVerantwortlicheAbteilungen",
    en: "/en/resources/esg-data-owners",
    de: "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
    h1: "Who owns ESG data inside the company?",
    title: "ESG Data Owners: Who Owns Which Data? | evipace"
  }
];

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function localeRegistryBlock(locale) {
  const localeOrder = ["en", "de", "sl"];
  const localeIndex = localeOrder.indexOf(locale);
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

test("English Batch 1 resources are registered as genuine DE/EN pairs only", () => {
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(englishRegistry.includes("resourcesHub: {"));
  assert.ok(englishRegistry.includes('path: "/en/resources"'));
  assert.ok(germanRegistry.includes('path: "/de/ressourcen"'));
  assert.ok(!slovenianRegistry.includes("resourcesHub"));

  for (const page of pages) {
    assert.ok(englishRegistry.includes(`${page.key}: {`), page.key);
    assert.ok(englishRegistry.includes(`title: "${page.title}"`), page.title);
    assert.ok(englishRegistry.includes(`path: "${page.en}"`), page.en);
    assert.ok(englishRegistry.includes('openGraphType: "article"'));
    assert.ok(germanRegistry.includes(`path: "${page.de}"`), page.de);
    assert.ok(!slovenianRegistry.includes(page.key), page.key);
  }

  for (const page of batch2Pages) {
    assert.ok(englishRegistry.includes(`${page.key}: {`), page.key);
    assert.ok(englishRegistry.includes(`title: "${page.title}"`), page.title);
    assert.ok(englishRegistry.includes(`path: "${page.en}"`), page.en);
    assert.ok(germanRegistry.includes(`path: "${page.de}"`), page.de);
    assert.ok(!slovenianRegistry.includes(page.key), page.key);
  }

  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes('languages["x-default"]'));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
  assert.ok(sitemapSource.includes("getActivePageGroup(pageKey)"));
});

test("English Batch 1 route files are English-only and use restrained schema", () => {
  const routeSources = [
    hubRouteSource,
    requestRouteSource,
    dataRouteSource,
    evidenceRouteSource,
    ecovadisRouteSource,
    integrityNextRouteSource,
    scope12RouteSource,
    scope123RouteSource,
    vsmeRouteSource,
    ownersRouteSource
  ];

  for (const source of routeSources) {
    assert.ok(source.includes('locale !== "en"'));
    assert.ok(source.includes("buildPageMetadata(locale, PAGE_KEY)"));
    assert.ok(source.includes("isPageReachable(locale, PAGE_KEY)"));
    assert.ok(source.includes("buildOrganizationSchema()"));
    assert.ok(source.includes("buildWebsiteSchema()"));
    assert.ok(source.includes("buildWebPageSchema(locale, PAGE_KEY"));
    assert.ok(source.includes("buildBreadcrumbListSchema"));

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
      assert.ok(!source.includes(forbidden), forbidden);
    }
  }

  for (const source of [
    requestRouteSource,
    dataRouteSource,
    evidenceRouteSource,
    ecovadisRouteSource,
    integrityNextRouteSource
  ]) {
    assert.ok(source.includes("buildArticleSchema(locale, PAGE_KEY"));
  }

  assert.ok(hubRouteSource.includes('"CollectionPage"'));
  assert.ok(!hubRouteSource.includes("buildArticleSchema"));
});

test("English hub exposes all genuine English resources and no placeholders", () => {
  for (const page of pages) {
    assert.ok(hubSource.includes(page.en), page.en);
  }
  for (const page of batch2Pages) {
    assert.ok(hubSource.includes(page.en), page.en);
  }
  for (const page of [
    "/en/resources/esg-questionnaire-checklist",
    "/en/resources/esg-evidence-readiness-check",
    "/en/resources/scope-1-2-data-collection-template"
  ]) {
    assert.ok(hubSource.includes(page), page);
  }

  for (const page of [
    "/en/resources/environmental-policy",
    "/en/resources/supplier-code-of-conduct",
    "/en/resources/reusable-esg-data"
  ]) {
    assert.ok(hubSource.includes(page), page);
  }

  for (const forbidden of [
    "/en/resources/supplier-code\"",
    "/en/resources/esg-evidence-check",
    "coming soon",
    "/de/ressourcen/"
  ]) {
    assert.ok(!hubSource.includes(forbidden), forbidden);
  }

  assert.ok(hubSource.includes("Practical ESG resources for suppliers."));
  assert.ok(hubSource.includes("Statement - source - evidence"));
  assert.ok(hubSource.includes("Boundary - activity data - emission factor - CO2e"));
  assert.ok(hubSource.includes("/en/send-request"));
  assert.ok(hubSource.includes("/en/methodology"));
});

test("English article content preserves methodology, claim discipline and distinct intents", () => {
  for (const page of pages) {
    assert.ok(contentSource.includes(page.h1), page.h1);
  }
  for (const page of batch2Pages) {
    assert.ok(batch2ContentSource.includes(page.h1), page.h1);
  }

  for (const required of [
    "Customer request - scope - data owner - source - evidence -",
    "Statement - source - evidence.",
    "Boundary - activity data - emission factor - CO2e - method.",
    "Policy is not the same as implementation",
    "A gap can be closed. It should not be rewritten as though it never existed.",
    "The current Sustainability Rating limit is 55 new documents per assessment.",
    "evipace is independent from EcoVadis",
    "The company reviews the facts and handles submission or approval through its own IntegrityNext profile.",
    "does not guarantee acceptance, medals, scores or platform outcomes",
    "does not control platform validation, customer decisions or platform status"
  ]) {
    assert.ok(
      normalizeWhitespace(`${articleRendererSource}\n${contentSource}\n${batch2ContentSource}`).includes(
        normalizeWhitespace(required)
      ),
      required
    );
  }

  const englishResourceSurface = `${hubSource}\n${contentSource}`;
  assert.ok(englishResourceSurface.includes("/en/resources/customer-esg-questionnaire-received"));
  assert.ok(englishResourceSurface.includes("/en/resources/esg-data-customers-request-from-suppliers"));
  assert.ok(englishResourceSurface.includes("/en/resources/esg-evidence-for-suppliers"));
  assert.ok(englishResourceSurface.includes("/en/resources/ecovadis-documents-evidence"));
  assert.ok(englishResourceSurface.includes("/en/resources/integritynext-invitation-for-suppliers"));
  assert.ok(englishResourceSurface.includes("/en/resources/esg-questionnaire-checklist"));
  assert.ok(englishResourceSurface.includes("/en/resources/esg-evidence-readiness-check"));
  assert.ok(contentSource.includes("/en/send-request"));
  assert.ok(contentSource.includes("/en/methodology"));
});

test("English Batch 2 content preserves carbon, VSME and owner boundaries", () => {
  for (const required of [
    "Activity data is not the same as emissions",
    "Do not write 'green electricity = zero'",
    "The scope depends on the reporting company.",
    "Drafts and proposals should not be presented as already applicable requirements.",
    "adopted the new Voluntary Standard on 3 July 2026",
    "as of 22 August 2026, adoption did not yet mean entry into force",
    "Does VSME automatically satisfy customer ESG requests?",
    "Source owner",
    "Calculation owner",
    "Statement owner",
    "Approver",
    "/en/resources/scope-1-2-data-calculation",
    "/en/resources/scope-1-2-data-collection-template",
    "/en/resources/scope-1-2-3-explained",
    "/en/resources/vsme-data-sustainability-report",
    "/en/resources/esg-data-owners"
  ]) {
    assert.ok(batch2ContentSource.includes(required), required);
  }

  for (const forbidden of [
    "/en/resources/esg-questionnaire-checklist",
    "/en/resources/esg-evidence-check",
    "/de/ressourcen/"
  ]) {
    assert.ok(!batch2ContentSource.includes(forbidden), forbidden);
  }
});

test("English resources avoid German UI leakage and unsupported routes", () => {
  const englishSources = [
    hubSource,
    articleRendererSource,
    contentSource,
    batch2ContentSource
  ].join("\n");

  for (const forbidden of [
    "Ressourcen",
    "Startseite",
    "Mehr erfahren",
    "Methodische Einordnung",
    "Nachweise",
    "Unternehmen",
    "Lieferanten",
    "Fragebogen",
    "Zur",
    "Mehr ueber",
    "Freigegeben",
    "Standort",
    "Zeitraum",
    "/en/ressourcen/",
    "/de/ressourcen/",
    "/sl/"
  ]) {
    assert.ok(!englishSources.includes(forbidden), forbidden);
  }

  assert.ok(navigationSource.includes('matchPrefixes: ["/en/resources/"]'));
  assert.ok(navigationSource.includes('label: "Resources"'));
  assert.ok(!navigationSource.includes("/en/ressourcen/"));
});
