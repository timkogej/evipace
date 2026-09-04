import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

const [
  registrySource,
  metadataBuilderSource,
  navigationSource,
  sitemapSource,
  ecovadisPageSource,
  integrityNextPageSource,
  vsmePageSource,
  deEcovadisPageSource,
  deIntegrityNextPageSource,
  deVsmePageSource,
  contentSource,
  componentSource,
  batch1Source,
  batch2Source,
  homepageSource
] = await Promise.all([
  readFile(new URL("lib/seo/page-registry.ts", root), "utf8"),
  readFile(new URL("lib/seo/build-metadata.ts", root), "utf8"),
  readFile(new URL("lib/site-navigation.ts", root), "utf8"),
  readFile(new URL("app/sitemap.ts", root), "utf8"),
  readFile(new URL("app/[locale]/ecovadis-support/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/integritynext-support/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/vsme-sustainability-report/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/ecovadis-unterstuetzung/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/integritynext-unterstuetzung/page.tsx", root), "utf8"),
  readFile(new URL("app/[locale]/vsme-nachhaltigkeitsbericht/page.tsx", root), "utf8"),
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
  readFile(new URL("components/evipace/english-home/content.ts", root), "utf8")
]);

const enRegistry = registrySource.slice(
  registrySource.indexOf("  en: {"),
  registrySource.indexOf("\n  de: {")
);
const deRegistry = registrySource.slice(
  registrySource.indexOf("  de: {"),
  registrySource.indexOf("\n  sl: {}")
);

test("English commercial Batch B uses exact approved metadata and H1 copy", () => {
  const expected = [
    [
      "ecovadisUnterstuetzung",
      "EcoVadis Support for Suppliers | Evipace",
      "Evipace helps suppliers prepare EcoVadis questionnaire responses and supporting evidence, organise documentation and identify gaps before submission.",
      "/en/ecovadis-support",
      "Need help preparing for EcoVadis? We organise the answers and evidence with you."
    ],
    [
      "integrityNextUnterstuetzung",
      "IntegrityNext Support for Suppliers | Evipace",
      "Evipace helps suppliers respond to IntegrityNext requests by organising company data, supporting evidence and questionnaire inputs for internal confirmation and submission.",
      "/en/integritynext-support",
      "Received an IntegrityNext request? We help prepare the information and evidence."
    ],
    [
      "vsmeNachhaltigkeitsbericht",
      "VSME Sustainability Reporting for SMEs | Evipace",
      "Evipace helps SMEs prepare VSME sustainability reporting from company data, existing documents and supporting evidence, with gaps and assumptions kept visible.",
      "/en/vsme-sustainability-report",
      "Need to prepare VSME sustainability information? We help structure the report from your company data."
    ]
  ];

  for (const [pageKey, title, description, path, h1] of expected) {
    assert.ok(enRegistry.includes(`${pageKey}: {`), pageKey);
    assert.ok(enRegistry.includes(`title: "${title}"`), title);
    assert.ok(enRegistry.includes(`"${description}"`), description);
    assert.ok(enRegistry.includes(`path: "${path}"`), path);
    assert.ok(contentSource.includes(h1), h1);
  }
});

test("Batch B pages are correct DE/EN registry pairs with x-default and no SL", () => {
  const pairs = [
    ["ecovadisUnterstuetzung", "/en/ecovadis-support", "/de/ecovadis-unterstuetzung"],
    [
      "integrityNextUnterstuetzung",
      "/en/integritynext-support",
      "/de/integritynext-unterstuetzung"
    ],
    [
      "vsmeNachhaltigkeitsbericht",
      "/en/vsme-sustainability-report",
      "/de/vsme-nachhaltigkeitsbericht"
    ]
  ];

  for (const [pageKey, enPath, dePath] of pairs) {
    assert.ok(enRegistry.includes(`${pageKey}: {`), pageKey);
    assert.ok(enRegistry.includes(`path: "${enPath}"`), enPath);
    assert.ok(deRegistry.includes(`${pageKey}: {`), pageKey);
    assert.ok(deRegistry.includes(`path: "${dePath}"`), dePath);
  }

  assert.ok(
    metadataBuilderSource.includes(
      "languages[\"x-default\"] = englishEntry.entry.path"
    )
  );
  assert.ok(registrySource.includes("sl: {}"));
  assert.ok(sitemapSource.includes("getActivePageGroup(pageKey)"));
});

test("Batch B route files use restrained commercial schema and breadcrumbs", () => {
  const sources = [ecovadisPageSource, integrityNextPageSource, vsmePageSource];

  for (const source of sources) {
    assert.ok(source.includes('locale !== "en"'));
    assert.ok(source.includes("robots: { index: false, follow: false }"));
    assert.ok(source.includes("notFound()"));
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
});

test("wrong-locale German slug pages are guarded after EN pair registration", () => {
  for (const source of [
    deEcovadisPageSource,
    deIntegrityNextPageSource,
    deVsmePageSource
  ]) {
    assert.ok(source.includes('locale !== "de"'));
    assert.ok(source.includes("robots: { index: false, follow: false }"));
    assert.ok(source.includes("notFound()"));
  }
});

test("navigation, homepage and resources expose real Batch B commercial routes", () => {
  const expectedRoutes = [
    "/en/ecovadis-support",
    "/en/integritynext-support",
    "/en/vsme-sustainability-report"
  ];

  for (const href of expectedRoutes) {
    assert.ok(navigationSource.includes(`href: "${href}"`), href);
  }

  assert.ok(
    navigationSource.includes('href: route("en", "ecovadisUnterstuetzung")')
  );
  assert.ok(
    navigationSource.includes('href: route("en", "integrityNextUnterstuetzung")')
  );
  assert.ok(
    navigationSource.includes('href: route("en", "vsmeNachhaltigkeitsbericht")')
  );
  assert.ok(homepageSource.includes('href: "/en/vsme-sustainability-report"'));
  assert.ok(batch1Source.includes('secondaryHref: "/en/ecovadis-support"'));
  assert.ok(batch1Source.includes('secondaryHref: "/en/integritynext-support"'));
  assert.ok(batch2Source.includes('secondaryHref: "/en/vsme-sustainability-report"'));
});

test("Batch B copy preserves commercial differentiation and claim safeguards", () => {
  const requiredCopy = [
    "Evipace is an independent service provider and is not affiliated with EcoVadis.",
    "We do not guarantee a score or assessment outcome.",
    "Evipace is an independent service provider and is not affiliated with IntegrityNext.",
    "We do not guarantee platform outcomes or customer acceptance.",
    "Your company stays in control of the platform submission.",
    "A missing certificate should stay a fact.",
    "The company confirms the company facts.",
    "A VSME report and a customer ESG questionnaire are not the same thing.",
    "This service does not provide assurance, audit, certification or universal customer acceptance.",
    "/en/resources/ecovadis-documents-evidence",
    "/en/resources/environmental-policy",
    "/en/resources/supplier-code-of-conduct",
    "/en/resources/integritynext-invitation-for-suppliers",
    "/en/resources/vsme-data-sustainability-report"
  ];

  for (const copy of requiredCopy) {
    assert.ok(contentSource.includes(copy), copy);
  }

  const disallowedClaims = [
    "guaranteed customer acceptance",
    "guaranteed platform acceptance",
    "guaranteed assessment score",
    "guaranteed score improvement",
    "official EcoVadis partner",
    "official IntegrityNext partner",
    "certified VSME",
    "VSME compliance",
    "assured report",
    "verified by Evipace",
    "Book consultation",
    "Start free trial"
  ];

  for (const claim of disallowedClaims) {
    assert.ok(!contentSource.toLowerCase().includes(claim.toLowerCase()), claim);
  }
});

test("full English commercial layer has the six genuine core service routes", () => {
  const commercialRoutes = [
    "/en/esg-customer-requests",
    "/en/esg-questionnaire-support",
    "/en/scope-1-2-calculation",
    "/en/ecovadis-support",
    "/en/integritynext-support",
    "/en/vsme-sustainability-report"
  ];

  for (const href of commercialRoutes) {
    assert.ok(enRegistry.includes(`path: "${href}"`), href);
  }

  for (const wrongSlug of [
    "/en/ecovadis-unterstuetzung",
    "/en/integritynext-unterstuetzung",
    "/en/vsme-nachhaltigkeitsbericht",
    "/de/ecovadis-support",
    "/de/integritynext-support",
    "/de/vsme-sustainability-report"
  ]) {
    assert.ok(!registrySource.includes(`path: "${wrongSlug}"`), wrongSlug);
  }
});

test("Batch B English source has no unintended German UI leakage", () => {
  const germanTerms = [
    "Unterstützung",
    "Lieferanten",
    "Nachweise",
    "Fragebogen",
    "Einladung",
    "Unternehmen",
    "Daten",
    "Nachhaltigkeitsbericht",
    "Berechnung",
    "Ressourcen",
    "Methodik",
    "Anfrage",
    "Freigegeben",
    "Standort",
    "Zeitraum"
  ];

  const batchBSource = contentSource;
  for (const term of germanTerms) {
    assert.ok(!batchBSource.includes(term), term);
  }
});
