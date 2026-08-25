import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

const [
  registrySource,
  navigationSource,
  sitemapSource,
  customerPageSource,
  questionnairePageSource,
  scopePageSource,
  deCustomerPageSource,
  deQuestionnairePageSource,
  deScopePageSource,
  contentSource,
  componentSource,
  batch1Source,
  batch2Source,
  interactiveSource,
  finalGuidesSource,
  homepageSource
] = await Promise.all([
  readFile(new URL("lib/seo/page-registry.ts", root), "utf8"),
  readFile(new URL("lib/site-navigation.ts", root), "utf8"),
  readFile(new URL("app/sitemap.ts", root), "utf8"),
  readFile(new URL("app/[locale]/esg-customer-requests/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/esg-questionnaire-support/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/scope-1-2-calculation/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/esg-kundenanfragen/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/esg-fragebogen-lieferanten/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/scope-1-2-berechnung/page.tsx", root), "utf8"),
  readFile(new URL("components/evipace/english-commercial/content.ts", root), "utf8"),
  readFile(
    new URL(
      "components/evipace/english-commercial/EnglishCommercialServicePage.tsx",
      root
    ),
    "utf8"
  ),
  readFile(new URL("components/evipace/resources/english-batch1-content.ts", root), "utf8"),
  readFile(new URL("components/evipace/resources/english-batch2-content.ts", root), "utf8"),
  readFile(new URL("components/evipace/resources/EnglishInteractiveResourceGuides.tsx", root), "utf8"),
  readFile(new URL("components/evipace/resources/EnglishFinalResourceGuides.tsx", root), "utf8"),
  readFile(new URL("components/evipace/english-home/CustomerRequest.tsx", root), "utf8")
]);

const enRegistry = registrySource.slice(
  registrySource.indexOf("  en: {"),
  registrySource.indexOf("\n  de: {")
);
const deRegistry = registrySource.slice(
  registrySource.indexOf("  de: {"),
  registrySource.indexOf("\n  sl: {}")
);

test("English commercial Batch A uses exact approved metadata and H1 copy", () => {
  const expected = [
    [
      "ESG Customer Requests for Suppliers | evipace",
      "evipace helps manufacturing suppliers handle customer ESG requests — from data and evidence to policies, emissions and questionnaire responses.",
      "/en/esg-customer-requests",
      "Your customer asked for ESG information. We help you prepare the response."
    ],
    [
      "ESG Questionnaire Support for Suppliers | evipace",
      "Support for suppliers completing customer ESG questionnaires: scope the request, gather data and evidence, prepare answers and get the response ready for internal confirmation.",
      "/en/esg-questionnaire-support",
      "Received an ESG questionnaire? We help you prepare the response."
    ],
    [
      "Scope 1 & 2 Calculation for Manufacturing Companies | evipace",
      "evipace prepares Scope 1 and Scope 2 calculations from company activity data, with emission factors, sources, assumptions and methodology documented clearly.",
      "/en/scope-1-2-calculation",
      "Scope 1 and Scope 2 emissions calculated from your actual company data."
    ]
  ];

  for (const [title, description, path, h1] of expected) {
    assert.ok(enRegistry.includes(`title: "${title}"`), title);
    assert.ok(enRegistry.includes(`"${description}"`), description);
    assert.ok(enRegistry.includes(`path: "${path}"`), path);
    assert.ok(contentSource.includes(h1), h1);
  }
});

test("Batch A pages are genuine DE/EN registry pairs with no SL variants", () => {
  const pairs = [
    ["esgKundenanfragen", "/en/esg-customer-requests", "/de/esg-kundenanfragen"],
    [
      "esgFragebogenLieferanten",
      "/en/esg-questionnaire-support",
      "/de/esg-fragebogen-lieferanten"
    ],
    ["scope12Berechnung", "/en/scope-1-2-calculation", "/de/scope-1-2-berechnung"]
  ];

  for (const [pageKey, enPath, dePath] of pairs) {
    assert.ok(enRegistry.includes(`${pageKey}: {`), pageKey);
    assert.ok(enRegistry.includes(`path: "${enPath}"`), enPath);
    assert.ok(deRegistry.includes(`${pageKey}: {`), pageKey);
    assert.ok(deRegistry.includes(`path: "${dePath}"`), dePath);
  }

  assert.ok(registrySource.includes("sl: {}"));
  assert.ok(sitemapSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(sitemapSource.includes("alternates: { languages }"));
});

test("wrong-locale commercial slugs remain guarded", () => {
  for (const source of [
    customerPageSource,
    questionnairePageSource,
    scopePageSource
  ]) {
    assert.ok(source.includes('locale !== "en"'));
    assert.ok(source.includes("robots: { index: false, follow: false }"));
    assert.ok(source.includes("notFound()"));
  }

  for (const source of [
    deCustomerPageSource,
    deQuestionnairePageSource,
    deScopePageSource
  ]) {
    assert.ok(source.includes('locale !== "de"'));
    assert.ok(source.includes("robots: { index: false, follow: false }"));
    assert.ok(source.includes("notFound()"));
  }
});

test("commercial pages use restrained service schema and matching breadcrumbs", () => {
  for (const source of [
    customerPageSource,
    questionnairePageSource,
    scopePageSource
  ]) {
    assert.ok(source.includes("buildOrganizationSchema()"));
    assert.ok(source.includes("buildWebsiteSchema()"));
    assert.ok(source.includes("buildWebPageSchema(locale, PAGE_KEY)"));
    assert.ok(source.includes("buildServiceSchema("));
    assert.ok(source.includes("buildBreadcrumbListSchema(["));
    assert.ok(!source.includes("FAQPage"));
    assert.ok(!source.includes("AggregateRating"));
    assert.ok(!source.includes("Review"));
  }

  assert.ok(componentSource.includes('aria-label="Breadcrumb"'));
  assert.ok(componentSource.includes('href="/en"'));
});

test("navigation and homepage expose genuine English service routes", () => {
  for (const href of [
    "/en/esg-customer-requests",
    "/en/esg-questionnaire-support",
    "/en/scope-1-2-calculation",
    "/en/ecovadis-support",
    "/en/integritynext-support",
    "/en/vsme-sustainability-report"
  ]) {
    assert.ok(navigationSource.includes(`href: "${href}"`), href);
  }

  assert.ok(navigationSource.includes('href: route("en", "esgKundenanfragen")'));
  assert.ok(
    navigationSource.includes('href: route("en", "esgFragebogenLieferanten")')
  );
  assert.ok(navigationSource.includes('href: route("en", "scope12Berechnung")'));
  assert.ok(navigationSource.includes('href: route("en", "ecovadisUnterstuetzung")'));
  assert.ok(
    navigationSource.includes('href: route("en", "integrityNextUnterstuetzung")')
  );
  assert.ok(
    navigationSource.includes('href: route("en", "vsmeNachhaltigkeitsbericht")')
  );
  assert.ok(homepageSource.includes("/en/esg-customer-requests"));
  assert.ok(homepageSource.includes("/en/resources"));
});

test("targeted English resources bridge to the commercial layer", () => {
  const resourceSources = [
    batch1Source,
    batch2Source,
    interactiveSource,
    finalGuidesSource
  ].join("\n");

  for (const href of [
    "/en/esg-customer-requests",
    "/en/esg-questionnaire-support",
    "/en/scope-1-2-calculation"
  ]) {
    assert.ok(resourceSources.includes(href), href);
  }

  assert.ok(contentSource.includes("/en/resources/customer-esg-questionnaire-received"));
  assert.ok(contentSource.includes("/en/resources/esg-questionnaire-checklist"));
  assert.ok(contentSource.includes("/en/resources/scope-1-2-data-collection-template"));
  assert.ok(contentSource.includes("/en/resources/scope-1-2-data-calculation"));
});

test("Batch A copy preserves commercial differentiation and claim safeguards", () => {
  const requiredCopy = [
    "What we can take off your desk",
    "Start with what you already have.",
    "A response you can actually review.",
    "What if some information is missing?",
    "Why ESG questionnaires take longer than they look",
    "Questionnaire workflow",
    "What we need you to confirm",
    "From source data to a calculation you can trace.",
    "The calculation model we preserve",
    "What this service is not",
    "Renewable electricity claims do not automatically make Scope 2 zero."
  ];

  for (const copy of requiredCopy) {
    assert.ok(contentSource.includes(copy), copy);
  }

  const disallowedClaims = [
    "guaranteed customer acceptance",
    "guaranteed approval",
    "certified footprint",
    "verified inventory",
    "assured emissions",
    "official EcoVadis partner",
    "trusted by",
    "from €",
    "48 hours",
    "Book demo",
    "Start free trial"
  ];

  for (const claim of disallowedClaims) {
    assert.ok(!contentSource.toLowerCase().includes(claim.toLowerCase()), claim);
  }
});

test("new English commercial source has no unintended German UI leakage", () => {
  const germanTerms = [
    "Kundenanfragen",
    "Fragebogen",
    "Lieferanten",
    "Nachweise",
    "Berechnung",
    "Unternehmen",
    "Standort",
    "Zeitraum",
    "Methodik",
    "Ressourcen",
    "Mehr erfahren",
    "Anfrage senden",
    "Startseite"
  ];

  const newEnglishSource = [contentSource, componentSource].join("\n");
  for (const term of germanTerms) {
    assert.ok(!newEnglishSource.includes(term), term);
  }
});
