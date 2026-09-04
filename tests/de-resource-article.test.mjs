import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [
  registrySource,
  metadataSource,
  sitemapSource,
  routeSource,
  articleSource,
  articleSchemaSource,
  breadcrumbSchemaSource,
  commercialIntroSource,
  sendRequestSource,
  evidenceRouteSource,
  evidenceArticleSource,
  questionnaireCategoriesSource,
  ecovadisEvidenceSource,
  ecovadisDocumentsRouteSource,
  ecovadisDocumentsArticleSource,
  integrityNextInvitationRouteSource,
  integrityNextInvitationArticleSource,
  integrityNextCommercialIntroSource,
  scope12DataRouteSource,
  scope12DataArticleSource,
  scope12CommercialSource,
  vsmeDataRouteSource,
  vsmeDataArticleSource,
  vsmeCommercialSource,
  esgDataOwnersRouteSource,
  esgDataOwnersArticleSource,
  esgCustomersDataSourcesSource,
  scope123RouteSource,
  scope123ArticleSource,
  checklistRouteSource,
  checklistGuideSource,
  checklistClientSource,
  checklistDataSource,
  globalCssSource
] = await Promise.all([
  readFile(new URL("../lib/seo/page-registry.ts", import.meta.url), "utf8"),
  readFile(new URL("../lib/seo/build-metadata.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/esg-fragebogen-vom-kunden-erhalten/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EsgQuestionnaireGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(new URL("../lib/seo/schema/article.ts", import.meta.url), "utf8"),
  readFile(
    new URL("../lib/seo/schema/breadcrumb-list.ts", import.meta.url),
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
    new URL("../app/[locale]/send-request/page.tsx", import.meta.url),
    "utf8"
  ),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/esg-nachweise-lieferanten/page.tsx",
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
      "../components/evipace/esg-fragebogen-lieferanten/RequirementCategories.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/ecovadis-unterstuetzung/RelevantEvidence.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/ecovadis-dokumente-nachweise/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EcovadisDocumentsGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/integritynext-einladung-lieferanten/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/IntegrityNextInvitationGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/integritynext-unterstuetzung/RequestIntro.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/scope-1-2-daten-berechnung/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/Scope12DataGuide.tsx",
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
  ),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/vsme-daten-nachhaltigkeitsbericht/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/VsmeDataGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/vsme-nachhaltigkeitsbericht/DataFoundation.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/esg-daten-verantwortliche-abteilungen/page.tsx",
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
      "../components/evipace/esg-kundenanfragen/DataSources.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/scope-1-2-3-einfach-erklaert/page.tsx",
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
      "../app/[locale]/ressourcen/esg-fragebogen-checkliste-lieferanten/page.tsx",
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
      "../components/evipace/resources/EsgQuestionnaireChecklist.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/esg-questionnaire-checklist-data.ts",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8"
  )
]);

const ARTICLE_PATH = "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten";
const EVIDENCE_ARTICLE_PATH = "/de/ressourcen/esg-nachweise-lieferanten";
const ECOVADIS_DOCUMENTS_PATH =
  "/de/ressourcen/ecovadis-dokumente-nachweise";
const INTEGRITYNEXT_INVITATION_PATH =
  "/de/ressourcen/integritynext-einladung-lieferanten";
const SCOPE12_DATA_PATH = "/de/ressourcen/scope-1-2-daten-berechnung";
const VSME_DATA_PATH = "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht";
const ESG_DATA_OWNERS_PATH =
  "/de/ressourcen/esg-daten-verantwortliche-abteilungen";
const SCOPE123_PATH = "/de/ressourcen/scope-1-2-3-einfach-erklaert";
const CHECKLIST_PATH =
  "/de/ressourcen/esg-fragebogen-checkliste-lieferanten";

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizedIncludes(source, copy) {
  return normalizeWhitespace(source).includes(normalizeWhitespace(copy));
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

test("German resource has exact metadata, canonical path, sitemap discovery, and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(germanRegistry.includes("esgFragebogenVomKundenErhalten: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "ESG-Fragebogen vom Kunden erhalten? So gehen Sie vor | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Ihr Kunde hat einen ESG-Fragebogen geschickt? Erfahren Sie, welche Daten Sie zuerst brauchen, wer im Unternehmen helfen kann und wie Sie Antworten und Nachweise strukturiert vorbereiten."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${ARTICLE_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.ok(englishRegistry.includes("esgFragebogenVomKundenErhalten: {"));
  assert.ok(
    englishRegistry.includes(
      'path: "/en/resources/customer-esg-questionnaire-received"'
    )
  );
  assert.ok(englishRegistry.includes('openGraphType: "article"'));
  assert.ok(!slovenianRegistry.includes("esgFragebogenVomKundenErhalten"));

  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes('entry.openGraphType ?? "website"'));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
  assert.ok(sitemapSource.includes("getActivePageGroup(pageKey)"));
});

test("resource route is German-only, indexable through the registry, and uses the intended schema graph", () => {
  assert.ok(
    routeSource.includes(
      'const PAGE_KEY = "esgFragebogenVomKundenErhalten"'
    )
  );
  assert.ok(routeSource.includes("buildPageMetadata(locale, PAGE_KEY)"));
  assert.ok(routeSource.includes("isPageReachable(locale, PAGE_KEY)"));
  assert.ok(routeSource.includes('locale !== "de"'));
  assert.ok(routeSource.includes("buildOrganizationSchema()"));
  assert.ok(routeSource.includes("buildWebsiteSchema()"));
  assert.ok(routeSource.includes("buildWebPageSchema(locale, PAGE_KEY)"));
  assert.ok(routeSource.includes("buildArticleSchema(locale, PAGE_KEY"));
  assert.ok(routeSource.includes("buildBreadcrumbListSchema"));
  assert.ok(!routeSource.includes("buildServiceSchema"));
  assert.ok(!routeSource.includes("FAQPage"));

  assert.ok(articleSchemaSource.includes('"@type": "Article"'));
  assert.ok(articleSchemaSource.includes("mainEntityOfPage"));
  assert.ok(articleSchemaSource.includes("publisher"));
  // Authorship resolves to the Evipace Organization entity — the truthful
  // credit, since no individual is named as author of any resource.
  assert.ok(
    articleSchemaSource.includes('author: { "@id": ORGANIZATION_ID }')
  );
  assert.ok(
    articleSchemaSource.includes('publisher: { "@id": ORGANIZATION_ID }')
  );
  // Dates are emitted only when the registry genuinely carries them, and
  // the builder never hardcodes one.
  assert.ok(
    articleSchemaSource.includes(
      "...(entry.datePublished ? { datePublished: entry.datePublished } : {})"
    )
  );
  assert.ok(!/\d{4}-\d{2}-\d{2}/.test(articleSchemaSource));
  assert.ok(!articleSchemaSource.includes('"@type": "Person"'));
  assert.ok(breadcrumbSchemaSource.includes('"@type": "BreadcrumbList"'));
});

test("resource preserves the practical guide, Answer Map, evidence integrity, and policy distinction", () => {
  const normalizedArticle = normalizeWhitespace(articleSource);
  const requiredCopy = [
    "ESG-Fragebogen vom Kunden erhalten – was jetzt?",
    "ESG-Fragebogen erhalten? Beginnen Sie mit diesen sechs Schritten.",
    "Zuerst: Nicht jede Frage einzeln bearbeiten.",
    "Die meisten Informationen liegen bereits irgendwo im Unternehmen.",
    "Erstellen Sie eine einfache Answer Map.",
    "Antwort → Quelle → Nachweis",
    "Die Praxis existiert – das Dokument fehlt.",
    "Die Praxis existiert nicht.",
    "Ein neues Dokument kann fehlende historische Unternehmenspraxis nicht rückwirkend erzeugen.",
    "Was tun, wenn Daten fehlen?",
    "Aktivitätsdaten × geeigneter Emissionsfaktor → Treibhausgasemissionen in CO₂e",
    "Müssen Lieferanten jeden ESG-Fragebogen beantworten?",
    "Stand 21. August 2026",
    "Der Mechanismus gilt nicht pauschal für jede mögliche Kundenanfrage",
    "Eine praktische Reihenfolge für die ersten 24 Stunden.",
    "Häufige Fragen",
    "Quellen &amp; weiterführende Informationen"
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalizedArticle.includes(copy), copy);
  }

  for (const heading of [
    "Frage",
    "Benötigte Information",
    "Quelle",
    "Verantwortlich",
    "Nachweis",
    "Status"
  ]) {
    assert.ok(articleSource.includes(`"${heading}"`), heading);
  }

  assert.ok(articleSource.includes("data-answer-map"));
  assert.ok(articleSource.includes("md:hidden"));
  assert.ok(articleSource.includes("hidden overflow-hidden"));
  assert.ok(!articleSource.includes("FAQPage"));
  assert.ok(!articleSource.includes("utm_"));
});

test("resource has all required internal destinations, CTA paths, and clean first-party sources", () => {
  const internalPaths = [
    "/de/esg-fragebogen-lieferanten",
    "/de/esg-kundenanfragen",
    "/de/scope-1-2-berechnung",
    "/de/ecovadis-unterstuetzung",
    "/de/integritynext-unterstuetzung",
    "/de/methodology"
  ];

  for (const path of internalPaths) {
    assert.ok(articleSource.includes(`href=\"${path}\"`), path);
  }

  assert.ok(articleSource.includes('const SEND_REQUEST_HREF = "/de/send-request"'));
  assert.ok(
    articleSource.includes(
      "<ButtonLink className=\"w-full sm:w-auto\" href={SEND_REQUEST_HREF}>ESG-Fragebogen senden</ButtonLink>"
    )
  );
  assert.ok(
    articleSource.includes(
      'href="/de/esg-fragebogen-lieferanten" variant="light">Unterstützung bei ESG-Fragebögen</ButtonLink>'
    )
  );

  const sourceHosts = [
    "finance.ec.europa.eu",
    "knowledgehub.efrag.org",
    "support.ecovadis.com",
    "bmoe.at"
  ];
  for (const host of sourceHosts) {
    assert.ok(articleSource.includes(host), host);
  }
});

test("commercial page adds exactly one natural resource backlink and leaves send-request unlisted", () => {
  const backlinks = commercialIntroSource.match(
    /\/de\/ressourcen\/esg-fragebogen-vom-kunden-erhalten/g
  );
  assert.equal(backlinks?.length, 1);
  assert.ok(
    normalizeWhitespace(commercialIntroSource).includes(
      "ESG-Fragebogen erhalten? Lesen Sie unseren praktischen Leitfaden für die ersten Schritte."
    )
  );

  const germanRegistry = localeRegistryBlock("de");
  assert.ok(!germanRegistry.includes("sendRequest: {"));
  assert.ok(sendRequestSource.includes("buildPageMetadata(locale, \"sendRequest\")"));
  assert.ok(registrySource.includes('de: ["sendRequest"]'));
});

test("evidence guide has exact metadata, sitemap discovery, and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(germanRegistry.includes("esgNachweiseLieferanten: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "ESG-Nachweise für Lieferanten: Welche Dokumente zählen? | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Welche ESG-Nachweise brauchen Lieferanten wirklich? Erfahren Sie, welche Dokumente Aussagen belegen, worauf Kunden und Plattformen achten und wie Sie Ihre Nachweise strukturiert vorbereiten."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${EVIDENCE_ARTICLE_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.ok(englishRegistry.includes("esgNachweiseLieferanten: {"));
  assert.ok(
    englishRegistry.includes(
      'path: "/en/resources/esg-evidence-for-suppliers"'
    )
  );
  assert.ok(englishRegistry.includes('openGraphType: "article"'));
  assert.ok(!slovenianRegistry.includes("esgNachweiseLieferanten"));

  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes("activeEntries.length === 0"));
  assert.ok(metadataSource.includes("if (englishEntry)"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("evidence guide route is indexable, German-only, and emits the article schema graph without dates or FAQ schema", () => {
  assert.ok(
    evidenceRouteSource.includes('const PAGE_KEY = "esgNachweiseLieferanten"')
  );
  assert.ok(evidenceRouteSource.includes("buildPageMetadata(locale, PAGE_KEY)"));
  assert.ok(evidenceRouteSource.includes("isPageReachable(locale, PAGE_KEY)"));
  assert.ok(evidenceRouteSource.includes('locale !== "de"'));
  assert.ok(evidenceRouteSource.includes("buildOrganizationSchema()"));
  assert.ok(evidenceRouteSource.includes("buildWebsiteSchema()"));
  assert.ok(evidenceRouteSource.includes("buildWebPageSchema(locale, PAGE_KEY)"));
  assert.ok(evidenceRouteSource.includes("buildArticleSchema(locale, PAGE_KEY"));
  assert.ok(evidenceRouteSource.includes("buildBreadcrumbListSchema"));
  assert.ok(!evidenceRouteSource.includes("buildServiceSchema"));
  assert.ok(!evidenceRouteSource.includes("FAQPage"));
  // The route may pass registry dates through, but must never carry a
  // date literal of its own.
  assert.ok(!/\d{4}-\d{2}-\d{2}/.test(evidenceRouteSource));
  assert.ok(!evidenceRouteSource.includes('"@type": "Person"'));
});

test("evidence guide preserves its evidence-first principles and complete practical structure", () => {
  const normalized = normalizeWhitespace(evidenceArticleSource);
  const requiredCopy = [
    "ESG-Nachweise für Lieferanten: Welche Dokumente werden wirklich gebraucht?",
    "Was macht einen guten ESG-Nachweis aus?",
    "Aussage → Quelle → Nachweis",
    "Was ist überhaupt ein ESG-Nachweis?",
    "Diese Arten von ESG-Nachweisen begegnen Lieferanten besonders häufig.",
    "Dokumenttyp + Geltungsbereich + Zeitraum + konkrete Aussage müssen zusammenpassen.",
    "Bauen Sie eine Evidence Map statt eines Dokumentenordners.",
    "Eine Policy beweist eine Policy. Nicht automatisch deren Umsetzung.",
    "Commitment und Implementation sind zwei verschiedene Dinge.",
    "Zertifikate: Vier Dinge sollten Sie vor dem Upload prüfen.",
    "Bei Kennzahlen ist die Berechnungsgrundlage Teil des Nachweises.",
    "Kann man einen fehlenden Nachweis einfach neu erstellen?",
    "Was tun, wenn ein Nachweis fehlt?",
    "Welche Dokumente sind oft schwache ESG-Nachweise?",
    "Wiederverwendbare Quelle bedeutet nicht automatisch wiederverwendbare Einreichung.",
    "EcoVadis und IntegrityNext gehen unterschiedlich mit Nachweisen um.",
    "Ein einfacher Evidence Check vor jeder Einreichung.",
    "Anforderung → Unternehmensinformation → Nachweis → Gap → Freigabe",
    "Häufige Fragen zu ESG-Nachweisen",
    "Quellen &amp; weiterführende Informationen"
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  for (const heading of [
    "Angefragte Information",
    "Aussage / Datenpunkt",
    "Möglicher Nachweis",
    "Scope",
    "Zeitraum / Gültigkeit",
    "Status"
  ]) {
    assert.ok(evidenceArticleSource.includes(`"${heading}"`), heading);
  }

  assert.ok(evidenceArticleSource.includes("data-evidence-map"));
  assert.ok(evidenceArticleSource.includes("md:hidden"));
  assert.ok(evidenceArticleSource.includes("hidden overflow-hidden"));
  assert.ok(!evidenceArticleSource.includes("FAQPage"));
  assert.ok(!evidenceArticleSource.includes("utm_"));
});

test("evidence guide has required internal links, CTAs, and clean first-party source links", () => {
  const internalPaths = [
    "/de/esg-fragebogen-lieferanten",
    "/de/esg-kundenanfragen",
    "/de/ecovadis-unterstuetzung",
    "/de/integritynext-unterstuetzung",
    "/de/scope-1-2-berechnung",
    "/de/methodology",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten"
  ];

  for (const path of internalPaths) {
    assert.ok(evidenceArticleSource.includes(path), path);
  }

  assert.ok(
    evidenceArticleSource.includes('const SEND_REQUEST_HREF = "/de/send-request"')
  );
  assert.ok(
    normalizeWhitespace(evidenceArticleSource).includes(
      "<ButtonLink className=\"w-full sm:w-auto\" href={SEND_REQUEST_HREF}> ESG-Anfrage senden </ButtonLink>"
    )
  );
  assert.ok(
    normalizeWhitespace(evidenceArticleSource).includes(
      'href="/de/esg-fragebogen-lieferanten" variant="light" > Unterstützung bei ESG-Fragebögen'
    )
  );

  for (const host of ["support.ecovadis.com", "helpdesk.integritynext.com"]) {
    assert.ok(evidenceArticleSource.includes(host), host);
  }
});

test("resource and commercial pages add contextual evidence-guide backlinks without duplicate blocks", () => {
  const guideBacklinks = articleSource.match(
    /\/de\/ressourcen\/esg-nachweise-lieferanten/g
  );
  assert.equal(guideBacklinks?.length, 1);
  assert.ok(
    normalizeWhitespace(articleSource).includes(
      "Welche Dokumente tatsächlich als Nachweis taugen, erklären wir in unserem"
    )
  );
  assert.ok(articleSource.includes("Leitfaden zu ESG-Nachweisen für Lieferanten"));

  for (const source of [questionnaireCategoriesSource, ecovadisEvidenceSource]) {
    const backlinks = source.match(
      /\/de\/ressourcen\/esg-nachweise-lieferanten/g
    );
    assert.equal(backlinks?.length, 1);
  }
});

test("EcoVadis documents guide has exact metadata, sitemap discovery, and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(germanRegistry.includes("ecovadisDokumenteNachweise: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "EcoVadis-Dokumente und Nachweise: Was zählt als Beleg? | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Welche Dokumente zählen bei EcoVadis als Nachweis? Erfahren Sie, welche Belege relevant sind, wie das 55-Dokumente-Limit funktioniert und welche Fehler Sie vermeiden sollten."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${ECOVADIS_DOCUMENTS_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.ok(englishRegistry.includes("ecovadisDokumenteNachweise: {"));
  assert.ok(
    englishRegistry.includes(
      'path: "/en/resources/ecovadis-documents-evidence"'
    )
  );
  assert.ok(englishRegistry.includes('openGraphType: "article"'));
  assert.ok(!slovenianRegistry.includes("ecovadisDokumenteNachweise"));

  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes("if (englishEntry)"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("EcoVadis documents route is German-only and uses the established article schema graph", () => {
  assert.ok(
    ecovadisDocumentsRouteSource.includes(
      'const PAGE_KEY = "ecovadisDokumenteNachweise"'
    )
  );
  assert.ok(
    ecovadisDocumentsRouteSource.includes(
      "buildPageMetadata(locale, PAGE_KEY)"
    )
  );
  assert.ok(
    ecovadisDocumentsRouteSource.includes(
      "isPageReachable(locale, PAGE_KEY)"
    )
  );
  assert.ok(ecovadisDocumentsRouteSource.includes('locale !== "de"'));
  assert.ok(ecovadisDocumentsRouteSource.includes("buildOrganizationSchema()"));
  assert.ok(ecovadisDocumentsRouteSource.includes("buildWebsiteSchema()"));
  assert.ok(
    ecovadisDocumentsRouteSource.includes(
      "buildWebPageSchema(locale, PAGE_KEY)"
    )
  );
  assert.ok(
    ecovadisDocumentsRouteSource.includes(
      "buildArticleSchema(locale, PAGE_KEY"
    )
  );
  assert.ok(
    ecovadisDocumentsRouteSource.includes("buildBreadcrumbListSchema")
  );
  assert.ok(!ecovadisDocumentsRouteSource.includes("buildServiceSchema"));
  assert.ok(!ecovadisDocumentsRouteSource.includes("FAQPage"));
  // The route may pass registry dates through, but must never carry a
  // date literal of its own.
  assert.ok(!/\d{4}-\d{2}-\d{2}/.test(ecovadisDocumentsRouteSource));
  assert.ok(!ecovadisDocumentsRouteSource.includes('"@type": "Person"'));
});

test("EcoVadis documents guide preserves platform-specific evidence rules and practical tools", () => {
  const normalized = normalizeWhitespace(ecovadisDocumentsArticleSource);
  const requiredCopy = [
    "EcoVadis-Dokumente und Nachweise: Was zählt als Beleg?",
    "Welche EcoVadis-Dokumente sollten Sie zuerst vorbereiten?",
    "Relevanz schlägt Dokumentenmenge.",
    "Frage → tatsächliche Unternehmenspraxis → Dokument → passende Antwortoption",
    "Assessment Scope zuerst prüfen.",
    "Das richtige Dokument für die falsche Gesellschaft kann immer noch der falsche Nachweis sein.",
    "Antwort und Dokument müssen miteinander verknüpft werden.",
    "Das 55-Dokumente-Limit verändert die Strategie.",
    "55 neuen Dokumenten pro Assessment",
    "Ein gutes Dokument kann mehrere Antworten unterstützen.",
    "Erstellen Sie keine künstlichen „Super-PDFs“, um das Limit zu umgehen.",
    "Policy, Action und Reporting sind nicht dasselbe.",
    "Policies und Actions",
    "KPI-/Results-Reporting",
    "Stand dieser Information: August 2026.",
    "Auditberichte spielen inzwischen eine größere Rolle.",
    "Dokumente Dritter: oft wertvoll, aber der Bezug muss klar sein.",
    "Machine-readable: Ein guter Nachweis muss auch verarbeitet werden können.",
    "Der beste Evidence Pack ist nicht der größte.",
    "Nutzen Sie ein internes EcoVadis Evidence Register.",
    "Was sollten Sie nicht hochladen?",
    "Ein Gap ist keine Einladung, eine rückwirkende Unternehmensrealität zu erzeugen.",
    "EcoVadis ist kein Dokumenten-Schreibwettbewerb.",
    "Antwortoption → benötigter Nachweis → vorhandene Quelle → Gap",
    "Nach der Bewertung: Evidence Library nicht wegwerfen.",
    "Häufige Fragen zu EcoVadis-Dokumenten",
    "Quellen &amp; weiterführende Informationen"
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  assert.ok(
    ecovadisDocumentsArticleSource.includes("data-ecovadis-evidence-map")
  );
  assert.ok(
    ecovadisDocumentsArticleSource.includes("data-ecovadis-evidence-register")
  );
  assert.ok(ecovadisDocumentsArticleSource.includes("md:hidden"));
  assert.ok(ecovadisDocumentsArticleSource.includes("hidden overflow-hidden"));
  assert.ok(!ecovadisDocumentsArticleSource.includes("FAQPage"));
  assert.ok(!ecovadisDocumentsArticleSource.includes("utm_"));
});

test("EcoVadis documents guide has the required links, CTAs, independence language, and clean official sources", () => {
  for (const path of [
    "/de/ecovadis-unterstuetzung",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    "/de/esg-fragebogen-lieferanten",
    "/de/scope-1-2-berechnung",
    "/de/methodology"
  ]) {
    assert.ok(ecovadisDocumentsArticleSource.includes(path), path);
  }

  assert.ok(
    ecovadisDocumentsArticleSource.includes(
      'const SEND_REQUEST_HREF = "/de/send-request"'
    )
  );
  assert.ok(
    normalizeWhitespace(ecovadisDocumentsArticleSource).includes(
      '<ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>EcoVadis-Anfrage senden</ButtonLink>'
    )
  );
  assert.ok(
    normalizeWhitespace(ecovadisDocumentsArticleSource).includes(
      'href="/de/ecovadis-unterstuetzung" variant="light">EcoVadis-Unterstützung</ButtonLink>'
    )
  );
  assert.ok(
    ecovadisDocumentsArticleSource.includes(
      "Evipace ist ein unabhängiger Dienstleister"
    )
  );
  assert.ok(
    ecovadisDocumentsArticleSource.includes(
      "garantiert aber weder die Anerkennung einzelner Dokumente noch eine bestimmte Punktzahl, Medaille oder Bewertung"
    )
  );

  assert.ok(ecovadisDocumentsArticleSource.includes("support.ecovadis.com"));
  assert.ok(!ecovadisDocumentsArticleSource.includes("helpdesk.integritynext.com"));
});

test("EcoVadis commercial page and general evidence guide each add one contextual backlink", () => {
  for (const source of [ecovadisEvidenceSource, evidenceArticleSource]) {
    const backlinks = source.match(
      /\/de\/ressourcen\/ecovadis-dokumente-nachweise/g
    );
    assert.equal(backlinks?.length, 1);
  }

  assert.ok(
    normalizeWhitespace(ecovadisEvidenceSource).includes(
      "Welche Dokumente EcoVadis als Supporting Evidence berücksichtigt und wie Sie das 55-Dokumente-Limit sinnvoll nutzen"
    )
  );
  assert.ok(
    normalizeWhitespace(evidenceArticleSource).includes(
      "Welche Supporting Documents Sie innerhalb der plattformspezifischen Regeln priorisieren sollten"
    )
  );
});

test("IntegrityNext invitation guide has exact metadata, sitemap discovery, and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(germanRegistry.includes("integrityNextEinladungLieferanten: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "IntegrityNext für Lieferanten: Einladung erhalten – was jetzt? | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Sie wurden von einem Kunden zu IntegrityNext eingeladen? Erfahren Sie, wie das Assessment abläuft, welche Daten und Zertifikate Sie brauchen und was Nachbesserungsbedarf bedeutet."'
    )
  );
  assert.ok(
    germanRegistry.includes(`path: "${INTEGRITYNEXT_INVITATION_PATH}"`)
  );
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.ok(englishRegistry.includes("integrityNextEinladungLieferanten: {"));
  assert.ok(
    englishRegistry.includes(
      'path: "/en/resources/integritynext-invitation-for-suppliers"'
    )
  );
  assert.ok(englishRegistry.includes('openGraphType: "article"'));
  assert.ok(!slovenianRegistry.includes("integrityNextEinladungLieferanten"));
  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("IntegrityNext invitation route is German-only and uses the established article schema graph", () => {
  assert.ok(
    integrityNextInvitationRouteSource.includes(
      'const PAGE_KEY = "integrityNextEinladungLieferanten"'
    )
  );
  assert.ok(
    integrityNextInvitationRouteSource.includes(
      "buildPageMetadata(locale, PAGE_KEY)"
    )
  );
  assert.ok(
    integrityNextInvitationRouteSource.includes(
      "isPageReachable(locale, PAGE_KEY)"
    )
  );
  assert.ok(integrityNextInvitationRouteSource.includes('locale !== "de"'));
  assert.ok(
    integrityNextInvitationRouteSource.includes("buildOrganizationSchema()")
  );
  assert.ok(integrityNextInvitationRouteSource.includes("buildWebsiteSchema()"));
  assert.ok(
    integrityNextInvitationRouteSource.includes(
      "buildWebPageSchema(locale, PAGE_KEY)"
    )
  );
  assert.ok(
    integrityNextInvitationRouteSource.includes(
      "buildArticleSchema(locale, PAGE_KEY"
    )
  );
  assert.ok(
    integrityNextInvitationRouteSource.includes("buildBreadcrumbListSchema")
  );
  assert.ok(!integrityNextInvitationRouteSource.includes("buildServiceSchema"));
  assert.ok(!integrityNextInvitationRouteSource.includes("FAQPage"));
  // The route may pass registry dates through, but must never carry a
  // date literal of its own.
  assert.ok(!/\d{4}-\d{2}-\d{2}/.test(integrityNextInvitationRouteSource));
  assert.ok(!integrityNextInvitationRouteSource.includes('"@type": "Person"'));
});

test("IntegrityNext invitation guide preserves the supplier workflow and practical tools", () => {
  const normalized = normalizeWhitespace(integrityNextInvitationArticleSource);
  const requiredCopy = [
    "IntegrityNext für Lieferanten: Was passiert nach der Einladung?",
    "IntegrityNext-Einladung erhalten? Gehen Sie so vor.",
    "Einladung → Scope → Assessment → Zertifikat oder Fragebogen → Nachweise → Review → Aktualisierung",
    "Warum hat mein Kunde uns zu IntegrityNext eingeladen?",
    "Kostet IntegrityNext für Lieferanten etwas?",
    "Bevor Sie antworten: Prüfen Sie, für welches Unternehmen und welchen Standort Sie sprechen.",
    "Welche Assessments muss ich ausfüllen?",
    "Zertifikat oder Fragebogen: Das ist eine der wichtigsten IntegrityNext-Logiken.",
    "Aber nicht jedes Zertifikat passt zu jedem Thema.",
    "Kein Zertifikat? Beantworten Sie den Fragebogen aus Ihrer tatsächlichen Unternehmenspraxis.",
    "Wer sollte IntegrityNext intern ausfüllen?",
    "Erstellen Sie vor der Bearbeitung eine kleine Assessment Map.",
    "Welche Dokumente sollte man vorbereiten?",
    "Eine Policy sollte reale Praxis beschreiben.",
    "Muss ich jede Frage mit „Ja“ beantworten?",
    "Was bedeutet der IntegrityNext-Status?",
    "Was bedeutet „Nachbesserungsbedarf“?",
    "So gehen Sie bei Nachbesserungsbedarf vor.",
    "Was sieht mein Kunde?",
    "Bereits IntegrityNext-Profil vorhanden? Nicht automatisch von vorne anfangen.",
    "IntegrityNext ist kein einmaliges Projekt.",
    "Was bedeutet „Updated Assessments – Please Review“?",
    "Nutzen Sie IntegrityNext nicht als einzige ESG-Datenablage.",
    "IntegrityNext und EcoVadis sind nicht dasselbe.",
    "Ein praktischer Ablauf für die ersten 24 Stunden.",
    "Welche Fehler sollten Lieferanten vermeiden?",
    "Wann externe Unterstützung sinnvoll wird.",
    "Häufige Fragen zu IntegrityNext für Lieferanten",
    "Quellen &amp; weiterführende Informationen"
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  assert.equal(
    integrityNextInvitationArticleSource.match(/number="\d{2}"/g)?.length,
    24
  );
  assert.ok(
    integrityNextInvitationArticleSource.includes(
      "data-integritynext-assessment-map"
    )
  );
  assert.ok(integrityNextInvitationArticleSource.includes("md:hidden"));
  assert.ok(integrityNextInvitationArticleSource.includes("hidden overflow-hidden"));
  assert.ok(!integrityNextInvitationArticleSource.includes("FAQPage"));
  assert.ok(!integrityNextInvitationArticleSource.includes("utm_"));
});

test("IntegrityNext invitation guide has required links, CTAs, independence language, and official sources", () => {
  for (const path of [
    "/de/integritynext-unterstuetzung",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/ecovadis-dokumente-nachweise",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    "/de/esg-fragebogen-lieferanten",
    "/de/scope-1-2-berechnung",
    "/de/methodology"
  ]) {
    assert.ok(integrityNextInvitationArticleSource.includes(path), path);
  }

  assert.ok(
    integrityNextInvitationArticleSource.includes(
      'const SEND_REQUEST_HREF = "/de/send-request"'
    )
  );
  assert.ok(
    integrityNextInvitationArticleSource.includes(
      "IntegrityNext-Anfrage senden"
    ) &&
      integrityNextInvitationArticleSource.includes(
        "href={SEND_REQUEST_HREF}"
      )
  );
  assert.ok(
    integrityNextInvitationArticleSource.includes(
      'href="/de/integritynext-unterstuetzung"'
    ) &&
      integrityNextInvitationArticleSource.includes(
        "IntegrityNext-Unterstützung"
      )
  );
  assert.ok(
    normalizedIncludes(
      integrityNextInvitationArticleSource,
      "Sie behalten die Kontrolle über Ihr Unternehmensprofil und reichen die Angaben selbst in IntegrityNext ein."
    )
  );
  assert.ok(
    normalizedIncludes(
      integrityNextInvitationArticleSource,
      "Evipace ist ein unabhängiger Dienstleister"
    )
  );
  assert.ok(
    integrityNextInvitationArticleSource.includes(
      "kontrolliert aber weder die IntegrityNext-Validierung noch einen bestimmten Plattformstatus"
    )
  );
  assert.ok(
    integrityNextInvitationArticleSource.includes("helpdesk.integritynext.com")
  );
  assert.ok(!integrityNextInvitationArticleSource.includes("support.ecovadis.com"));
});

test("IntegrityNext commercial page and general evidence guide each add one contextual backlink", () => {
  for (const source of [
    integrityNextCommercialIntroSource,
    evidenceArticleSource
  ]) {
    const backlinks = source.match(
      /\/de\/ressourcen\/integritynext-einladung-lieferanten/g
    );
    assert.equal(backlinks?.length, 1);
  }

  assert.ok(
    normalizedIncludes(
      integrityNextCommercialIntroSource,
      "Unser Leitfaden erklärt den Ablauf vom Supplier Profile über Zertifikate und Fragebögen bis zum möglichen Nachbesserungsbedarf"
    )
  );
  assert.ok(
    normalizedIncludes(
      evidenceArticleSource,
      "Den vollständigen Ablauf nach einer Kundeneinladung erklären wir im Leitfaden"
    )
  );
});

test("Scope 1 and Scope 2 data guide has exact metadata, sitemap discovery, and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = localeRegistryBlock("en");
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(germanRegistry.includes("scope12DatenBerechnung: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "Scope 1 und Scope 2: Welche Daten braucht man? | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Welche Daten brauchen Sie für Scope 1 und Scope 2? Von Gas, Kraftstoffen und Kältemitteln bis Strom und Fernwärme – praktische Checkliste für die CO₂-Berechnung."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${SCOPE12_DATA_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.ok(englishRegistry.includes("scope12DatenBerechnung"));
  assert.ok(
    englishRegistry.includes('path: "/en/resources/scope-1-2-data-calculation"')
  );
  assert.ok(!slovenianRegistry.includes("scope12DatenBerechnung"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("Scope 1 and Scope 2 data route is German-only and uses the article schema graph", () => {
  assert.ok(
    scope12DataRouteSource.includes('const PAGE_KEY = "scope12DatenBerechnung"')
  );
  assert.ok(scope12DataRouteSource.includes("buildPageMetadata(locale, PAGE_KEY)"));
  assert.ok(scope12DataRouteSource.includes("isPageReachable(locale, PAGE_KEY)"));
  assert.ok(scope12DataRouteSource.includes('locale !== "de"'));
  assert.ok(scope12DataRouteSource.includes("buildOrganizationSchema()"));
  assert.ok(scope12DataRouteSource.includes("buildWebsiteSchema()"));
  assert.ok(scope12DataRouteSource.includes("buildWebPageSchema(locale, PAGE_KEY)"));
  assert.ok(scope12DataRouteSource.includes("buildArticleSchema(locale, PAGE_KEY"));
  assert.ok(scope12DataRouteSource.includes("buildBreadcrumbListSchema"));
  assert.ok(!scope12DataRouteSource.includes("buildServiceSchema"));
  assert.ok(!scope12DataRouteSource.includes("FAQPage"));
  assert.ok(!scope12DataRouteSource.includes("Dataset"));
  // The route may pass registry dates through, but must never carry a
  // date literal of its own.
  assert.ok(!/\d{4}-\d{2}-\d{2}/.test(scope12DataRouteSource));
  assert.ok(!scope12DataRouteSource.includes('"@type": "Person"'));
});

test("Scope 1 and Scope 2 guide preserves all 26 sections, calculations, and responsive data tools", () => {
  const normalized = normalizeWhitespace(scope12DataArticleSource);
  const requiredCopy = [
    "Scope 1 und Scope 2: Welche Daten braucht man für die Berechnung?",
    "Nicht mit CO₂-Zahlen anfangen.",
    "Scope 1 und Scope 2 kurz erklärt.",
    "Equity Share",
    "Financial Control",
    "Operational Control",
    "Scope 1: Beginnen Sie mit stationärer Verbrennung.",
    "Scope 1: Fuhrpark und mobile Verbrennung.",
    "Scope 1: Kältemittel werden besonders häufig vergessen.",
    "Scope 1: Gibt es direkte Prozessemissionen?",
    "Scope 2: Stromverbrauch pro Standort sammeln.",
    "Location-based und market-based",
    "Welchen Strom-Emissionsfaktor soll man in Deutschland verwenden?",
    "Aktivitätsdaten × Emissionsfaktor = Emissionen",
    "Menge | Einheit | Faktor | Faktoreinheit | Ergebnis | Quelle",
    "So kann eine Datenerfassungstabelle aussehen.",
    "Ergebnis → Berechnung → Faktor → Aktivitätsdaten → Originalquelle",
    "Eine dokumentierte Schätzung ist besser als eine versteckte Vermutung.",
    "Scope 1 und 2 sind nicht automatisch der komplette Corporate Carbon Footprint.",
    "Acht typische Fehler bei der Datensammlung.",
    "Eine praktische Checkliste für die ersten zwei Stunden.",
    "Q2 2027",
    "Q4 2028",
    "Die Vorschläge sind jedoch nicht als bereits geltende neue Regeln zu behandeln.",
    "Boundary → Quellen → Aktivitätsdaten → Faktoren → Berechnung → Review → Evidence",
    "Häufige Fragen zur Scope-1-&amp;-2-Datenerfassung",
    "Quellen &amp; weiterführende Informationen"
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  assert.equal(scope12DataArticleSource.match(/number="\d{2}"/g)?.length, 26);
  assert.ok(scope12DataArticleSource.includes('marker="stationary-combustion"'));
  assert.ok(scope12DataArticleSource.includes('marker="scope2-electricity"'));
  assert.ok(scope12DataArticleSource.includes("data-scope12-raw-data-table"));
  assert.ok(scope12DataArticleSource.includes("hidden overflow-hidden"));
  assert.ok(scope12DataArticleSource.includes("md:hidden"));
  assert.ok(!scope12DataArticleSource.includes("FAQPage"));
  assert.ok(!scope12DataArticleSource.includes("utm_"));
});

test("Scope 1 and Scope 2 guide has required links, exact CTAs, and clean first-party sources", () => {
  for (const path of [
    "/de/scope-1-2-berechnung",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/ecovadis-dokumente-nachweise",
    "/de/ressourcen/integritynext-einladung-lieferanten",
    "/de/vsme-nachhaltigkeitsbericht",
    "/de/methodology"
  ]) {
    assert.ok(scope12DataArticleSource.includes(path), path);
  }

  assert.ok(scope12DataArticleSource.includes('const SEND_REQUEST_HREF = "/de/send-request"'));
  assert.ok(
    normalizedIncludes(
      scope12DataArticleSource,
      '<ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>Scope-1-&amp;-2-Berechnung anfragen</ButtonLink>'
    )
  );
  assert.ok(
    normalizedIncludes(
      scope12DataArticleSource,
      'href="/de/scope-1-2-berechnung" variant="light">Scope 1 und Scope 2 berechnen</ButtonLink>'
    )
  );
  assert.ok(
    scope12DataArticleSource.includes(
      "Strom · Erdgas · Kraftstoffe · Kältemittel · Wärme · Emissionsfaktoren"
    )
  );

  for (const url of [
    "https://ghgprotocol.org/corporate-standard",
    "https://ghgprotocol.org/corporate-standard-frequently-asked-questions",
    "https://ghgprotocol.org/scope-2-guidance",
    "https://ghgprotocol.org/scope-2-frequently-asked-questions",
    "https://www.umweltbundesamt.de/publikationen/entwicklung-der-spezifischen-treibhausgas-0",
    "https://ghgprotocol.org/blog/ghg-protocol-announces-key-standard-development-updates",
    "https://ghgprotocol.org/blog/ghg-protocol-announces-key-standard-development-updates-faq-resource"
  ]) {
    assert.ok(scope12DataArticleSource.includes(url), url);
  }
});

test("Scope 1 commercial page and first resource each add exactly one contextual backlink", () => {
  for (const source of [scope12CommercialSource, articleSource]) {
    const backlinks = source.match(
      /\/de\/ressourcen\/scope-1-2-daten-berechnung/g
    );
    assert.equal(backlinks?.length, 1);
  }

  assert.ok(
    normalizedIncludes(
      scope12CommercialSource,
      "Unser Leitfaden zeigt die benötigten Daten für Scope 1 und Scope 2 – von Brennstoffen und Kältemitteln bis zu Strom und Fernwärme"
    )
  );
  assert.ok(
    normalizedIncludes(
      articleSource,
      "Welche Rechnungen, Verbrauchsdaten, Kraftstoffinformationen und Kältemittelunterlagen Sie dafür zuerst zusammentragen sollten"
    )
  );
});

test("VSME data guide has exact metadata, sitemap discovery, and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = localeRegistryBlock("en");
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(germanRegistry.includes("vsmeDatenNachhaltigkeitsbericht: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "VSME: Welche Daten braucht ein Nachhaltigkeitsbericht? | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Welche Daten brauchen Sie für einen VSME-Nachhaltigkeitsbericht? Praktischer Überblick zu Energie, Emissionen, Wasser, Abfall, Mitarbeitenden, Policies und weiteren VSME-Angaben."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${VSME_DATA_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.ok(englishRegistry.includes("vsmeDatenNachhaltigkeitsbericht"));
  assert.ok(
    englishRegistry.includes(
      'path: "/en/resources/vsme-data-sustainability-report"'
    )
  );
  assert.ok(!slovenianRegistry.includes("vsmeDatenNachhaltigkeitsbericht"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("VSME data route is German-only and uses the established article schema graph", () => {
  assert.ok(
    vsmeDataRouteSource.includes(
      'const PAGE_KEY = "vsmeDatenNachhaltigkeitsbericht"'
    )
  );
  assert.ok(vsmeDataRouteSource.includes("buildPageMetadata(locale, PAGE_KEY)"));
  assert.ok(vsmeDataRouteSource.includes("isPageReachable(locale, PAGE_KEY)"));
  assert.ok(vsmeDataRouteSource.includes('locale !== "de"'));
  assert.ok(vsmeDataRouteSource.includes("buildOrganizationSchema()"));
  assert.ok(vsmeDataRouteSource.includes("buildWebsiteSchema()"));
  assert.ok(vsmeDataRouteSource.includes("buildWebPageSchema(locale, PAGE_KEY)"));
  assert.ok(vsmeDataRouteSource.includes("buildArticleSchema(locale, PAGE_KEY"));
  assert.ok(vsmeDataRouteSource.includes("buildBreadcrumbListSchema"));
  assert.ok(!vsmeDataRouteSource.includes("buildServiceSchema"));
  assert.ok(!vsmeDataRouteSource.includes("FAQPage"));
  assert.ok(!vsmeDataRouteSource.includes("Dataset"));
  assert.ok(!vsmeDataRouteSource.includes("Certification"));
  assert.ok(!vsmeDataRouteSource.includes("Review"));
  assert.ok(!vsmeDataRouteSource.includes("Report"));
  // The route may pass registry dates through, but must never carry a
  // date literal of its own.
  assert.ok(!/\d{4}-\d{2}-\d{2}/.test(vsmeDataRouteSource));
  assert.ok(!vsmeDataRouteSource.includes('"@type": "Person"'));
});

test("VSME data guide preserves all 34 sections, Basic requirements, applicability, and responsive tables", () => {
  const normalized = normalizeWhitespace(vsmeDataArticleSource);
  const requiredCopy = [
    "VSME: Welche Daten braucht ein Unternehmen für den Nachhaltigkeitsbericht?",
    "Welche Daten brauchen Sie für einen VSME-Bericht?",
    "VSME oder „Voluntary Standard“ – was gilt 2026 eigentlich?",
    "3. Juli 2026",
    "Angenommen bedeutet noch nicht in Kraft.",
    "Stand · 22. August 2026",
    "Basic oder Comprehensive: Diese Entscheidung kommt zuerst.",
    "B1–B11",
    "C1–C9",
    "Der Basic Module ist Voraussetzung",
    "Nicht jeder Datenpunkt gilt automatisch für jedes Unternehmen.",
    "10 Beschäftigten oder weniger",
    "Disclosure → trifft auf uns zu? → Datenquelle → Verantwortlicher → Status",
    "B1: Zuerst die Basis des Berichts festlegen.",
    "Zertifizierungen: Nicht nur sammeln, sondern den Scope prüfen.",
    "B2: Welche Nachhaltigkeitspraktiken existieren bereits?",
    "Policies: Vorhanden, Entwurf oder nicht vorhanden?",
    "Ein VSME-Bericht sollte Unternehmensrealität strukturieren – nicht eine attraktivere Unternehmensrealität erfinden.",
    "B3: Energieverbrauch – welche Daten brauchen Sie?",
    "Originaleinheit und Originalquelle behalten.",
    "B3: Scope 1 und Scope 2 müssen aus den Aktivitätsdaten berechnet werden.",
    "location-based Scope 2",
    "Aktivitätsdaten → Emissionsfaktor → Berechnung → tCO₂e",
    "B4: Schadstoffe – nicht jedes Unternehmen braucht eine neue Messkampagne.",
    "B5: Biodiversität beginnt mit der Standortliste.",
    "B6: Wasser – beginnen Sie mit der Wasserentnahme.",
    "B7: Abfall ist für Produktionsunternehmen besonders praktisch relevant.",
    "Materialströme: Für Manufacturing nicht übersehen.",
    "B8: Mitarbeiterdaten kommen meist aus HR",
    "B9: Arbeitssicherheit braucht mehr als die Aussage",
    "B10: Vergütung, Tarifbindung und Weiterbildung.",
    "B11: Korruption und Bestechung",
    "So sieht eine praktische VSME Data Map aus.",
    "Comprehensive Module: Wann sollten Sie zusätzliche Daten sammeln?",
    "C1: Geschäftsmodell und Lieferkette nicht erst im Bericht erfinden.",
    "C3: Klimaziele nur berichten, wenn sie tatsächlich definiert sind.",
    "C4: Klimarisiken brauchen zuerst eine echte Risikobetrachtung.",
    "Scope 3: Für Manufacturing sollte es zumindest bewusst geprüft werden.",
    "Jeder VSME-Bericht muss automatisch eine vollständige Scope-3-Bilanz enthalten.",
    "C5 bis C9: Viele Informationen liegen bereits irgendwo im Unternehmen.",
    "Wer liefert welche VSME-Daten?",
    "Berichtsaussage → Datenpunkt → Berechnung → Quelle → Nachweis",
    "Das zweite Berichtsjahr sollte deutlich einfacher werden.",
    "ESG-Datenpunkt → Quelle → Zeitraum → Nachweis → verwendbare Outputs",
    "Muss man den Bericht über den DNK erstellen?",
    "Der DNK ist weder verpflichtend noch die einzige mögliche Ausgabeform.",
    "Was bedeutet der Value Chain Cap für den VSME?",
    "Der Value Chain Cap bedeutet nicht, dass ein Kunde einem Lieferanten nie zusätzliche Informationen abfragen darf.",
    "Die ersten vier Stunden eines VSME-Projekts.",
    "Welche Fehler sollten Unternehmen vermeiden?",
    "Häufige Fragen zu den Daten für einen VSME-Bericht",
    "Quellen &amp; weiterführende Informationen"
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  for (const code of ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"]) {
    assert.ok(vsmeDataArticleSource.includes(`["${code}",`), code);
  }

  assert.equal(vsmeDataArticleSource.match(/number="\d{2}"/g)?.length, 34);
  assert.ok(vsmeDataArticleSource.includes('marker="vsme-certifications"'));
  assert.ok(vsmeDataArticleSource.includes('marker="vsme-waste"'));
  assert.ok(vsmeDataArticleSource.includes("data-vsme-data-map"));
  assert.ok(vsmeDataArticleSource.includes("hidden overflow-hidden"));
  assert.ok(vsmeDataArticleSource.includes("md:hidden"));
  assert.ok(!vsmeDataArticleSource.includes("FAQPage"));
  assert.ok(!vsmeDataArticleSource.includes("utm_"));
});

test("VSME data guide has required internal links, exact CTAs, independence language, and official sources", () => {
  for (const path of [
    "/de/vsme-nachhaltigkeitsbericht",
    "/de/ressourcen/scope-1-2-daten-berechnung",
    "/de/scope-1-2-berechnung",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    "/de/ressourcen/ecovadis-dokumente-nachweise",
    "/de/ressourcen/integritynext-einladung-lieferanten",
    "/de/methodology"
  ]) {
    assert.ok(vsmeDataArticleSource.includes(path), path);
  }

  assert.ok(vsmeDataArticleSource.includes('const SEND_REQUEST_HREF = "/de/send-request"'));
  assert.ok(
    normalizedIncludes(
      vsmeDataArticleSource,
      '<ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>VSME-Projekt anfragen</ButtonLink>'
    )
  );
  assert.ok(
    normalizedIncludes(
      vsmeDataArticleSource,
      'href="/de/vsme-nachhaltigkeitsbericht" variant="light">VSME-Nachhaltigkeitsbericht erstellen</ButtonLink>'
    )
  );
  assert.ok(
    vsmeDataArticleSource.includes(
      "Energie · Emissionen · Abfall · Wasser · Mitarbeitende · Policies · Nachweise"
    )
  );
  assert.ok(vsmeDataArticleSource.includes("Evipace ist unabhängig vom DNK"));

  for (const url of [
    "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/corporate-sustainability-reporting-directive_en",
    "https://finance.ec.europa.eu/news/commission-adopts-revised-sustainability-reporting-standards-2026-07-03_en",
    "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard",
    "https://eur-lex.europa.eu/eli/dir/2026/470/oj",
    "https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Dossier/PolitikfuerdenMittelstand/schwerpunkt-11.html",
    "https://www.deutscher-nachhaltigkeitskodex.de/de/berichte-einsehen/vsme-berichte-einsehen/"
  ]) {
    assert.ok(vsmeDataArticleSource.includes(url), url);
  }
});

test("VSME commercial page and Scope data guide each add exactly one contextual backlink", () => {
  for (const source of [vsmeCommercialSource, scope12DataArticleSource]) {
    const backlinks = source.match(
      /\/de\/ressourcen\/vsme-daten-nachhaltigkeitsbericht/g
    );
    assert.equal(backlinks?.length, 1);
  }

  assert.ok(
    normalizedIncludes(
      vsmeCommercialSource,
      "Unser Leitfaden zeigt die wichtigsten VSME-Daten von Energie und Emissionen bis zu Abfall, Mitarbeitenden und Policies"
    )
  );
  assert.ok(
    normalizedIncludes(
      scope12DataArticleSource,
      "Welche weiteren Daten neben Scope 1 und Scope 2 für den Bericht benötigt werden"
    )
  );
});

test("VSME data guide contains no accidental Slovenian drafting fragments", () => {
  for (const fragment of [
    "posebej pomemben",
    "izrecno omenja",
    "Zato bi",
    "glavne surovine",
    "letna masa",
    "enota → vir",
    "Ni nujno",
    "ki naj jih izpolni",
    "pravega internega ownerja"
  ]) {
    assert.ok(!vsmeDataArticleSource.includes(fragment), fragment);
  }
});

test("ESG data-owner guide has exact metadata, sitemap discovery, and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = localeRegistryBlock("en");
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(germanRegistry.includes("esgDatenVerantwortlicheAbteilungen: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "ESG-Daten vom Kunden angefragt: Wer liefert welche Daten? | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Ihr Kunde verlangt ESG-Daten? Erfahren Sie, welche Informationen typischerweise bei Finance, HR, Einkauf, Qualität, Produktion und Geschäftsführung liegen."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${ESG_DATA_OWNERS_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.ok(englishRegistry.includes("esgDatenVerantwortlicheAbteilungen"));
  assert.ok(englishRegistry.includes('path: "/en/resources/esg-data-owners"'));
  assert.ok(!slovenianRegistry.includes("esgDatenVerantwortlicheAbteilungen"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
});

test("ESG data-owner route is German-only and uses the established article schema graph", () => {
  assert.ok(
    esgDataOwnersRouteSource.includes(
      'const PAGE_KEY = "esgDatenVerantwortlicheAbteilungen"'
    )
  );
  assert.ok(
    esgDataOwnersRouteSource.includes("buildPageMetadata(locale, PAGE_KEY)")
  );
  assert.ok(
    esgDataOwnersRouteSource.includes("isPageReachable(locale, PAGE_KEY)")
  );
  assert.ok(esgDataOwnersRouteSource.includes('locale !== "de"'));
  assert.ok(esgDataOwnersRouteSource.includes("buildOrganizationSchema()"));
  assert.ok(esgDataOwnersRouteSource.includes("buildWebsiteSchema()"));
  assert.ok(
    esgDataOwnersRouteSource.includes("buildWebPageSchema(locale, PAGE_KEY)")
  );
  assert.ok(
    esgDataOwnersRouteSource.includes("buildArticleSchema(locale, PAGE_KEY")
  );
  assert.ok(esgDataOwnersRouteSource.includes("buildBreadcrumbListSchema"));

  for (const forbidden of [
    "buildServiceSchema",
    "FAQPage",
    "HowTo",
    "Dataset",
    // Dates may only ever come from the page registry, never from a
    // literal in the route — see lib/seo/page-registry.ts.
    'datePublished: "',
    'dateModified: "',
    '"@type": "Person"'
  ]) {
    assert.ok(!esgDataOwnersRouteSource.includes(forbidden), forbidden);
  }
});

test("ESG data-owner guide preserves the full operational flow and responsive maps", () => {
  const normalized = normalizeWhitespace(esgDataOwnersArticleSource);
  const requiredCopy = [
    "ESG-Daten vom Kunden angefragt: Wer im Unternehmen liefert welche Informationen?",
    "Wer liefert typischerweise welche ESG-Daten?",
    "Eine Person koordiniert.",
    "Die Fachbereiche liefern die Quellen.",
    "Verantwortliche Personen bestätigen die Aussagen.",
    "ESG ist kein einzelnes Fachgebiet.",
    "ESG-Koordination kann zentral sein. ESG-Daten sind es meistens nicht.",
    "Zuerst den Fragebogen strukturieren – dann Aufgaben verteilen.",
    "Wir benötigen für Werk A den Stromverbrauch 2025 in kWh sowie die zugrunde liegende Jahresabrechnung.",
    "Eine praktische ESG Data Owner Map.",
    "Entscheidend ist die Quelle – nicht der Abteilungsname.",
    "Geschäftsführung: Aussagen, die nicht einfach aus Excel kommen.",
    "Finance und Controlling: Hier beginnt ein großer Teil der Umwelt-Datensammlung.",
    "Data Owner und Calculation Owner können unterschiedliche Personen sein.",
    "HR: Workforce-Daten sind mehr als nur die Mitarbeiterzahl.",
    "Arbeitssicherheit kann zwischen HR, HSE und Produktion liegen.",
    "Qualität / Umweltmanagement: Häufig die wichtigste Dokumentenquelle.",
    "Facility und Technik: Hier liegen Daten, die auf Rechnungen oft fehlen.",
    "R410A – 2,3 kg nachgefüllt",
    "Produktion / Operations: Unternehmensrealität statt nur Dokumentation.",
    "Policy → tatsächliche Maßnahme → messbare Information",
    "Fuhrpark: Kraftstoffdaten nicht aus Kosten schätzen, wenn Liter verfügbar sind.",
    "Einkauf: Besonders wichtig für Supplier- und Materialfragen.",
    "Produkt- und Materialdaten brauchen oft Engineering, Einkauf und Produktion gemeinsam.",
    "Compliance / Legal: Bei Governance-Aussagen nicht raten.",
    "Keine bekannte Information ist nicht automatisch dasselbe wie ein bestätigter Nullwert.",
    "Wer ist eigentlich der „Owner“ eines ESG-Datenpunkts?",
    "1 — Source Owner",
    "2 — Calculation Owner",
    "3 — Statement Owner",
    "4 — Approver",
    "Eine einzige Scope-2-Zahl kann mehrere Owner haben.",
    "Eine Policy braucht andere Rollen.",
    "Review → Korrektur → autorisierte Verabschiedung",
    "Geben Sie Fachbereichen kleine Datenanfragen – nicht den ganzen Fragebogen.",
    "Eine interne Anfrage sollte fünf Dinge enthalten.",
    "1 — Was brauchen wir?",
    "2 — Für wen?",
    "3 — Für welchen Zeitraum?",
    "4 — In welcher Einheit oder Definition?",
    "5 — Welche Quelle oder welcher Nachweis?",
    "So kann eine interne ESG Request Map aussehen.",
    "Nicht vorhanden“ ist nicht dasselbe wie „noch nicht gefunden",
    "Dokumentations-Gap",
    "Realer Gap",
    "Was tun, wenn zwei Abteilungen unterschiedliche Zahlen liefern?",
    "Konsistenz entsteht durch Source Reconciliation – nicht durch Auswahl der schöneren Zahl.",
    "Jede Zahl sollte eine Herkunft haben.",
    "Kundenfrage → Datenpunkt → Source Owner → Originalquelle → Berechnung / Aussage → Review → finale Antwort",
    "Evidence Register",
    "EcoVadis und IntegrityNext machen interne Koordination nicht überflüssig.",
    "VSME zeigt, warum eine wiederverwendbare Data Owner Map sinnvoll ist.",
    "ESG-Datenpunkt → Owner → Quelle → Zeitraum → Nachweis → letzte Prüfung",
    "Braucht jedes Unternehmen einen ESG Manager?",
    "Wer sollte die finale Antwort an den Kunden kontrollieren?",
    "Die ersten 60 Minuten nach einer neuen Kundenanfrage.",
    "Die häufigsten Fehler bei interner ESG-Datensammlung.",
    "Wann externe Unterstützung sinnvoll wird.",
    "Häufige Fragen zu internen ESG-Verantwortlichkeiten",
    "Quellen &amp; weiterführende Informationen"
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  assert.equal(esgDataOwnersArticleSource.match(/number="\d{2}"/g)?.length, 31);
  assert.ok(esgDataOwnersArticleSource.includes('marker="data-owner-map"'));
  assert.ok(esgDataOwnersArticleSource.includes('marker="request-map"'));
  assert.ok(esgDataOwnersArticleSource.includes("hidden overflow-hidden"));
  assert.ok(esgDataOwnersArticleSource.includes("md:hidden"));
  assert.ok(!esgDataOwnersArticleSource.includes("FAQPage"));
  assert.ok(!esgDataOwnersArticleSource.includes("HowTo"));
});

test("ESG data-owner guide has all statuses, internal links, CTAs, and clean official sources", () => {
  for (const status of [
    "bereit",
    "beschaffen",
    "berechnen",
    "bestätigen",
    "prüfen",
    "Gap",
    "nicht anwendbar"
  ]) {
    assert.ok(esgDataOwnersArticleSource.includes(`"${status}"`), status);
  }

  for (const path of [
    "/de/esg-kundenanfragen",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/scope-1-2-daten-berechnung",
    "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
    "/de/scope-1-2-berechnung",
    "/de/methodology"
  ]) {
    assert.ok(esgDataOwnersArticleSource.includes(path), path);
  }

  assert.ok(
    normalizedIncludes(
      esgDataOwnersArticleSource,
      '<ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>ESG-Anfrage senden</ButtonLink>'
    )
  );
  assert.ok(
    normalizedIncludes(
      esgDataOwnersArticleSource,
      'href="/de/esg-kundenanfragen" variant="light">ESG-Anforderungen von Kunden</ButtonLink>'
    )
  );
  assert.ok(
    esgDataOwnersArticleSource.includes("ESG-Fragebogen erhalten – was jetzt?")
  );
  assert.ok(
    esgDataOwnersArticleSource.includes(
      "Finance · HR · Einkauf · Qualität · Operations · Nachweise"
    )
  );
  assert.ok(
    normalizedIncludes(
      esgDataOwnersArticleSource,
      "Evipace ist unabhängig von IntegrityNext und EcoVadis"
    )
  );

  for (const url of [
    "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard",
    "https://helpdesk.integritynext.com/hc/en-us/articles/360018479559-How-can-I-invite-add-a-colleague-to-my-supplier-profile",
    "https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/responsibility/downloads/en/2022/Sustainability-Assessment-Questionnaire_SAQ_5.0_EN.pdf",
    "https://bmoe.at/lieferanten-nachhaltigkeitsfragebogen/"
  ]) {
    assert.ok(esgDataOwnersArticleSource.includes(url), url);
  }
  assert.ok(!esgDataOwnersArticleSource.includes("utm_"));
});

test("commercial, questionnaire, and optional VSME pages each add one contextual data-owner backlink", () => {
  for (const source of [
    esgCustomersDataSourcesSource,
    articleSource,
    vsmeDataArticleSource
  ]) {
    assert.equal(
      source.match(/\/de\/ressourcen\/esg-daten-verantwortliche-abteilungen/g)
        ?.length,
      1
    );
  }

  assert.ok(
    normalizedIncludes(
      esgCustomersDataSourcesSource,
      "Unser Leitfaden zeigt eine praktische"
    )
  );
  assert.ok(
    normalizedIncludes(
      esgCustomersDataSourcesSource,
      "Data-Owner-Struktur für ESG-Kundenanfragen"
    )
  );
  assert.ok(
    normalizedIncludes(
      articleSource,
      "Wer typischerweise welche ESG-Daten im Unternehmen besitzt, zeigt unsere praktische"
    )
  );
  assert.ok(articleSource.includes("Data-Owner-Übersicht"));
  assert.ok(
    normalizedIncludes(
      vsmeDataArticleSource,
      "Eine ausführlichere Zuordnung von ESG-Daten zu Finance, HR, Einkauf, Qualität, Operations und Management finden Sie in unserer"
    )
  );
  assert.ok(vsmeDataArticleSource.includes("Data-Owner-Übersicht"));
});

test("ESG data-owner production copy contains no accidental Slovenian fragments", () => {
  for (const fragment of [
    "Za vsak datapoint",
    "Kaj potrebujemo",
    "Za koga",
    "Za kateri čas",
    "V kateri enoti",
    "Kateri vir",
    "Tako iz",
    "nastane obvladljiva",
    "Na produkcijski",
    "Dober primary source",
    "Uradna potrditev"
  ]) {
    assert.ok(!esgDataOwnersArticleSource.includes(fragment), fragment);
  }
});

test("Scope 1/2/3 guide has exact metadata, sitemap discovery, and English pairing", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = localeRegistryBlock("en");
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(germanRegistry.includes("scope123EinfachErklaert: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "Scope 1, 2 und 3 einfach erklärt: Unterschiede & Beispiele | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Was ist der Unterschied zwischen Scope 1, 2 und 3? Einfache Erklärung mit konkreten Beispielen für produzierende Unternehmen und Überblick über die 15 Scope-3-Kategorien."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${SCOPE123_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.ok(englishRegistry.includes("scope123EinfachErklaert"));
  assert.ok(
    englishRegistry.includes('path: "/en/resources/scope-1-2-3-explained"')
  );
  assert.ok(!slovenianRegistry.includes("scope123EinfachErklaert"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
  assert.ok(
    normalizedIncludes(
      metadataSource,
      'if (englishEntry) { languages["x-default"] = englishEntry.entry.path; }'
    )
  );
});

test("Scope 1/2/3 route is German-only and uses the established article schema graph", () => {
  assert.ok(
    scope123RouteSource.includes('const PAGE_KEY = "scope123EinfachErklaert"')
  );
  assert.ok(scope123RouteSource.includes("buildPageMetadata(locale, PAGE_KEY)"));
  assert.ok(scope123RouteSource.includes("isPageReachable(locale, PAGE_KEY)"));
  assert.ok(scope123RouteSource.includes('locale !== "de"'));
  assert.ok(scope123RouteSource.includes("buildOrganizationSchema()"));
  assert.ok(scope123RouteSource.includes("buildWebsiteSchema()"));
  assert.ok(scope123RouteSource.includes("buildWebPageSchema(locale, PAGE_KEY)"));
  assert.ok(scope123RouteSource.includes("buildArticleSchema(locale, PAGE_KEY"));
  assert.ok(scope123RouteSource.includes("buildBreadcrumbListSchema"));

  for (const forbidden of [
    "buildServiceSchema",
    "FAQPage",
    "HowTo",
    "Dataset",
    // Dates may only ever come from the page registry, never from a
    // literal in the route — see lib/seo/page-registry.ts.
    'datePublished: "',
    'dateModified: "',
    '"@type": "Person"'
  ]) {
    assert.ok(!scope123RouteSource.includes(forbidden), forbidden);
  }
});

test("Scope 1/2/3 guide preserves the full 30-section educational flow and responsive overview", () => {
  const normalized = normalizeWhitespace(scope123ArticleSource);
  const requiredCopy = [
    "Scope 1, 2 und 3 einfach erklärt – mit Beispielen für Unternehmen",
    "Scope 1, 2 und 3 in 30 Sekunden",
    "Wir emittieren direkt.",
    "Jemand erzeugt Energie für uns.",
    "Emissionen entstehen in unserer vor- oder nachgelagerten Wertschöpfungskette.",
    "Was bedeutet „Scope“ überhaupt?",
    "CO₂",
    "CH₄",
    "N₂O",
    "HFCs",
    "PFCs",
    "SF₆",
    "NF₃",
    "CO₂-Äquivalente – CO₂e",
    "Scope 1: Direkte Emissionen",
    "Stationäre Verbrennung",
    "Mobile Verbrennung",
    "Prozessemissionen",
    "Fugitive Emissionen",
    "Einfaches Scope-1-Beispiel",
    "Scope 2: Eingekaufte Energie",
    "Elektrizität",
    "Dampf",
    "Wärme",
    "Kälte",
    "780.000 kWh Strom",
    "Scope 2: location-based und market-based",
    "Unsere gesamte Scope-2-Bilanz ist einfach null.",
    "Scope 3: Alles Weitere in der Wertschöpfungskette?",
    "Upstream und downstream – was bedeutet das?",
    "Die 15 Scope-3-Kategorien im Überblick",
    "Ein Produktionsunternehmen als komplettes Beispiel",
    "Warum kann dieselbe Emission bei zwei Unternehmen auftauchen?",
    "Was gehört NICHT automatisch in Scope 3?",
    "Scope 1 ist nicht einfach „alles im eigenen Gebäude“.",
    "Scope 3 ist immer der größte Scope.",
    "Muss jedes Unternehmen alle 15 Scope-3-Kategorien berechnen?",
    "Muss man Scope 3 überhaupt berechnen?",
    "Für welchen Reporting- oder Kundenkontext erstellen wir die Bilanz?",
    "Welche Daten braucht Scope 1?",
    "Welche Daten braucht Scope 2?",
    "Welche Daten braucht Scope 3?",
    "Primärdaten oder Durchschnittswerte?",
    "Schätzung nicht als Messung darstellen.",
    "Was bedeutet Scope 1, 2 und 3 für einen Lieferanten?",
    "Scope 1, 2 und 3 in einem ESG-Fragebogen",
    "Scope 1 + Scope 2 ist nicht automatisch der komplette Carbon Footprint.",
    "Und was ist ein Product Carbon Footprint?",
    "Wo sollte ein Unternehmen anfangen?",
    "Warum Scope 1 und 2 häufig der beste erste operative Schritt sind.",
    "Wie passt das zum VSME?",
    "Die GHG-Protocol-Standards werden überarbeitet",
    "Q2 2027",
    "Q4 2028",
    "Vorschläge und Drafts sind keine bereits geltenden neuen Regeln.",
    "Die häufigsten Scope-Verwechslungen",
    "Der wichtigste Unterschied in einem Satz.",
    "Quelle identifizieren → Daten sammeln → Methode wählen → berechnen → dokumentieren.",
    "Häufige Fragen zu Scope 1, 2 und 3",
    "Quellen &amp; weiterführende Informationen"
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalized.includes(copy), copy);
  }

  assert.equal(scope123ArticleSource.match(/number="\d{2}"/g)?.length, 30);
  assert.ok(scope123ArticleSource.includes('data-scope-comparison="quick-answer"'));
  assert.ok(scope123ArticleSource.includes("hidden overflow-hidden"));
  assert.ok(scope123ArticleSource.includes("md:hidden"));
  assert.ok(scope123ArticleSource.includes('data-scope3-categories="all-15"'));
  assert.ok(!scope123ArticleSource.includes("FAQPage"));
  assert.ok(!scope123ArticleSource.includes("HowTo"));
  assert.ok(!scope123ArticleSource.includes("Scope 3 ist immer optional"));
  assert.ok(!scope123ArticleSource.includes("Scope 3 ist immer verpflichtend"));
});

test("Scope 1/2/3 guide contains all 15 Scope 3 categories in official order", () => {
  const categories = [
    "Purchased goods and services",
    "Capital goods",
    "Fuel- and energy-related activities not included in Scope 1 or 2",
    "Upstream transportation and distribution",
    "Waste generated in operations",
    "Business travel",
    "Employee commuting",
    "Upstream leased assets",
    "Downstream transportation and distribution",
    "Processing of sold products",
    "Use of sold products",
    "End-of-life treatment of sold products",
    "Downstream leased assets",
    "Franchises",
    "Investments"
  ];

  let previousIndex = -1;
  for (const category of categories) {
    const categoryIndex = scope123ArticleSource.indexOf(category);
    assert.ok(categoryIndex > previousIndex, category);
    previousIndex = categoryIndex;
  }

  assert.equal(upstreamCategoryCount(scope123ArticleSource), 8);
  assert.equal(downstreamCategoryCount(scope123ArticleSource), 7);
});

test("Scope 1/2/3 guide has required links, exact CTAs, and clean first-party sources", () => {
  for (const path of [
    "/de/ressourcen/scope-1-2-daten-berechnung",
    "/de/scope-1-2-berechnung",
    "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/methodology"
  ]) {
    assert.ok(scope123ArticleSource.includes(path), path);
  }

  assert.ok(
    normalizedIncludes(
      scope123ArticleSource,
      '<ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>Scope-1-&amp;-2-Berechnung anfragen</ButtonLink>'
    )
  );
  assert.ok(
    normalizedIncludes(
      scope123ArticleSource,
      'href="/de/scope-1-2-berechnung" variant="light">Scope 1 und Scope 2 berechnen</ButtonLink>'
    )
  );
  assert.ok(
    scope123ArticleSource.includes(
      "Welche Daten brauche ich für Scope 1 und Scope 2?"
    )
  );
  assert.ok(
    scope123ArticleSource.includes(
      "Scope 1 · Scope 2 · Aktivitätsdaten · Emissionsfaktoren · Nachweise"
    )
  );
  assert.ok(
    normalizedIncludes(
      scope123ArticleSource,
      "Evipace ist unabhängig von GHG Protocol, WRI, WBCSD, ISO und EFRAG"
    )
  );

  for (const url of [
    "https://ghgprotocol.org/corporate-standard",
    "https://ghgprotocol.org/scope-2-guidance",
    "https://ghgprotocol.org/corporate-value-chain-scope-3-standard",
    "https://ghgprotocol.org/scope-3-calculation-guidance-2",
    "https://ghgprotocol.org/blog/ghg-protocol-announces-key-standard-development-updates-faq-resource"
  ]) {
    assert.ok(scope123ArticleSource.includes(url), url);
  }
  assert.ok(!scope123ArticleSource.includes("utm_"));
});

test("Scope 1/2 data guide adds exactly one contextual backlink and commercial page stays unchanged", () => {
  assert.equal(
    scope12DataArticleSource.match(
      /\/de\/ressourcen\/scope-1-2-3-einfach-erklaert/g
    )?.length,
    1
  );
  assert.ok(
    normalizedIncludes(
      scope12DataArticleSource,
      "Noch unsicher, wie sich direkte Emissionen, eingekaufte Energie und die Wertschöpfungskette unterscheiden?"
    )
  );
  assert.ok(
    scope12DataArticleSource.includes(
      "Scope 1, 2 und 3 mit konkreten Unternehmensbeispielen"
    )
  );
  assert.ok(!scope12CommercialSource.includes(SCOPE123_PATH));
});

test("Scope 1/2/3 production copy contains no accidental Slovenian drafting fragments", () => {
  for (const fragment of [
    "Na produkcijski",
    "Uradni Scope",
    "Tukaj je",
    "Naravno naj",
    "Ni potrebno",
    "Tako tri strani",
    "če naravno paše"
  ]) {
    assert.ok(!scope123ArticleSource.includes(fragment), fragment);
  }
});

test("interactive ESG questionnaire checklist has exact metadata and genuine English registry availability", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = localeRegistryBlock("en");
  const slovenianRegistry = localeRegistryBlock("sl");

  assert.ok(
    germanRegistry.includes("esgFragebogenChecklisteLieferanten: {")
  );
  assert.ok(
    germanRegistry.includes(
      'title: "ESG-Fragebogen Checkliste für Lieferanten | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "ESG-Fragebogen vom Kunden erhalten? Diese praktische Checkliste führt Sie von Scope und Datensammlung über Nachweise und Berechnungen bis zur finalen Prüfung."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${CHECKLIST_PATH}"`));
  assert.ok(germanRegistry.includes('openGraphType: "article"'));
  assert.ok(englishRegistry.includes("esgFragebogenChecklisteLieferanten"));
  assert.ok(englishRegistry.includes("/en/resources/esg-questionnaire-checklist"));
  assert.ok(!slovenianRegistry.includes("esgFragebogenChecklisteLieferanten"));

  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
  assert.ok(sitemapSource.includes("getActivePageGroup(pageKey)"));
});

test("interactive checklist route is German-only and uses the editorial schema graph without application schemas", () => {
  assert.ok(
    checklistRouteSource.includes(
      'const PAGE_KEY = "esgFragebogenChecklisteLieferanten"'
    )
  );
  assert.ok(checklistRouteSource.includes("buildPageMetadata(locale, PAGE_KEY)"));
  assert.ok(checklistRouteSource.includes("isPageReachable(locale, PAGE_KEY)"));
  assert.ok(checklistRouteSource.includes('locale !== "de"'));
  assert.ok(checklistRouteSource.includes("buildOrganizationSchema()"));
  assert.ok(checklistRouteSource.includes("buildWebsiteSchema()"));
  assert.ok(checklistRouteSource.includes("buildWebPageSchema(locale, PAGE_KEY)"));
  assert.ok(checklistRouteSource.includes("buildArticleSchema(locale, PAGE_KEY"));
  assert.ok(checklistRouteSource.includes("buildBreadcrumbListSchema"));

  for (const forbidden of [
    "FAQPage",
    "HowTo",
    "ServiceSchema",
    "SoftwareApplication",
    "WebApplication",
    '"@type": "Person"',
    // Dates may only ever come from the page registry, never from a
    // literal in the route — see lib/seo/page-registry.ts.
    'datePublished: "',
    'dateModified: "'
  ]) {
    assert.ok(!checklistRouteSource.includes(forbidden), forbidden);
  }
});

test("checklist data contains all 23 sections, 293 unique actionable items, six final gates, and precise working statuses", () => {
  const sectionTitles = [
    "Anfrage verstehen",
    "Reporting Scope festlegen",
    "Fragebogen triagieren",
    "Data Owner zuweisen",
    "Unternehmensdaten prüfen",
    "Umwelt- und Emissionsdaten sammeln",
    "Weitere Umweltdaten prüfen",
    "Workforce und Social Data",
    "Governance und Compliance",
    "Supply Chain und Beschaffung",
    "Policies prüfen",
    "Zertifikate prüfen",
    "Evidence Check",
    "Plattform-spezifische Regeln prüfen",
    "Zahlen und Berechnungen prüfen",
    "Widersprüche suchen",
    "Gaps richtig behandeln",
    "Antworten formulieren",
    "Final Evidence Review",
    "Finaler Management / Quality Review",
    "Submission Check",
    "Nach der Einreichung",
    "Reuse Check"
  ];

  for (const title of sectionTitles) {
    assert.ok(checklistDataSource.includes(`title: "${title}"`), title);
  }
  assert.equal(sectionTitles.length, 23);

  const actionableIds = [
    ...checklistDataSource.matchAll(/\{ id: "([^"]+\.[^"]+)"/g)
  ].map((match) => match[1]);
  assert.equal(actionableIds.length, 293);
  assert.equal(new Set(actionableIds).size, 293);
  assert.equal(
    actionableIds.filter((id) => id.startsWith("final-gate.")).length,
    6
  );

  for (const status of [
    "bereit",
    "beschaffen",
    "berechnen",
    "bestätigen",
    "prüfen",
    "Gap",
    "nicht anwendbar"
  ]) {
    assert.ok(checklistDataSource.includes(`"${status}"`), status);
  }

  for (const concept of [
    "request.deadline-recorded",
    "scope.legal-entity",
    "scope.reporting-period",
    "owners.source-owner",
    "environment.scope-one",
    "environment.scope-two",
    "workforce.definition",
    "governance.review",
    "supply-chain.esg-criteria",
    "policies.no-backdating",
    "certificates.scope",
    "evidence.statement-fit",
    "platform.current-rules",
    "calculations.factor-source",
    "consistency.energy-period",
    "gaps.practice",
    "final-evidence.mapping",
    "submission.approval",
    "reuse.previous-uses"
  ]) {
    assert.ok(checklistDataSource.includes(concept), concept);
  }
});

test("checklist interaction uses semantic controls, derived progress, section progress, local-only persistence, and confirmed reset", () => {
  assert.ok(checklistClientSource.startsWith('"use client"'));
  assert.ok(checklistClientSource.includes('type="checkbox"'));
  assert.ok(checklistClientSource.includes("htmlFor={inputId}"));
  assert.ok(checklistClientSource.includes("checked={checked}"));
  assert.ok(checklistClientSource.includes("onChange={() => onToggle(item.id)}"));
  assert.ok(checklistClientSource.includes('role="progressbar"'));
  assert.ok(checklistClientSource.includes("aria-valuemin={0}"));
  assert.ok(checklistClientSource.includes("aria-valuemax={total}"));
  assert.ok(checklistClientSource.includes("aria-valuenow={completed}"));
  assert.ok(checklistClientSource.includes("aria-live=\"polite\""));

  assert.ok(checklistClientSource.includes("const totalCount = items.length"));
  assert.ok(
    checklistClientSource.includes(
      "itemIds.filter((id) => checkedItems[id]).length"
    )
  );
  assert.ok(checklistClientSource.includes("sectionItems.filter("));
  assert.ok(checklistClientSource.includes("completedCount === totalCount"));
  assert.ok(checklistClientSource.includes("Checkliste vollständig bearbeitet."));

  assert.ok(
    checklistDataSource.includes(
      '"evipace:de:esg-questionnaire-checklist:v1"'
    )
  );
  assert.ok(
    checklistClientSource.includes("EN_CHECKLIST_STORAGE_KEY")
  );
  assert.ok(
    checklistClientSource.includes(
      "window.localStorage.getItem(storageKey)"
    )
  );
  assert.ok(
    checklistClientSource.includes(
      "window.localStorage.setItem("
    )
  );
  assert.ok(
    checklistClientSource.includes(
      "window.localStorage.removeItem(storageKey)"
    )
  );
  assert.ok(!checklistClientSource.includes("localStorage.clear"));
  assert.ok(!checklistClientSource.includes("fetch("));
  assert.ok(!checklistClientSource.includes("supabase"));
  assert.ok(!checklistClientSource.includes("/api/"));

  assert.ok(
    checklistClientSource.includes(
      "Möchten Sie wirklich alle Häkchen dieser Checkliste zurücksetzen?"
    )
  );
  assert.ok(checklistClientSource.includes("window.confirm("));
  assert.ok(checklistClientSource.includes("window.print()"));
  assert.ok(checklistClientSource.includes('type="button"'));
  assert.ok(
    normalizedIncludes(
      checklistClientSource,
      "Ihr Fortschritt wird nur lokal in diesem Browser gespeichert und nicht an Evipace übertragen."
    )
  );
});

test("checklist guide contains the workflow, final gate, warnings, exact CTAs, FAQ, sources, and natural internal links", () => {
  const normalizedGuide = normalizeWhitespace(
    `${checklistGuideSource}\n${checklistClientSource}`
  );

  for (const copy of [
    "ESG-Fragebogen Checkliste für Lieferanten",
    "Anfrage → Scope → Verantwortliche → Daten → Nachweise → Berechnungen → Review → Einreichung → Wiederverwendung",
    "Final Submission Gate",
    "Ist der ESG-Fragebogen bereit zur Einreichung?",
    "Red Flags",
    "Stop – vor der Einreichung noch einmal prüfen",
    "Der Fragebogen ist länger als die Checkliste?",
    "Häufige Fragen zur ESG-Fragebogen-Checkliste",
    "Quellen &amp; weiterführende Informationen"
  ]) {
    assert.ok(normalizedGuide.includes(copy), copy);
  }

  assert.ok(!checklistGuideSource.includes('type="checkbox"'));
  assert.ok(!checklistGuideSource.includes("FAQPage"));
  assert.ok(checklistGuideSource.includes("href={SEND_REQUEST_HREF}"));
  assert.ok(checklistGuideSource.includes("ESG-Fragebogen senden"));

  for (const path of [
    "/de/send-request",
    "/de/esg-fragebogen-lieferanten",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/scope-1-2-daten-berechnung",
    "/de/ressourcen/scope-1-2-3-einfach-erklaert",
    "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
    "/de/ressourcen/ecovadis-dokumente-nachweise",
    "/de/ressourcen/integritynext-einladung-lieferanten"
  ]) {
    assert.ok(
      checklistGuideSource.includes(path) || checklistClientSource.includes(path),
      path
    );
  }

  for (const host of [
    "support.ecovadis.com",
    "helpdesk.integritynext.com",
    "knowledgehub.efrag.org",
    "ghgprotocol.org"
  ]) {
    assert.ok(checklistGuideSource.includes(host), host);
  }
  assert.ok(!checklistGuideSource.includes("utm_"));
});

test("required checklist backlinks appear exactly once on the three approved upstream pages", () => {
  for (const source of [
    commercialIntroSource,
    articleSource,
    esgDataOwnersArticleSource
  ]) {
    assert.equal(source.match(new RegExp(CHECKLIST_PATH, "g"))?.length, 1);
  }

  assert.ok(
    normalizedIncludes(
      commercialIntroSource,
      "Unsere ESG-Fragebogen-Checkliste führt Sie von Scope und Datensammlung bis zum finalen Submission Review."
    )
  );
  assert.ok(
    normalizedIncludes(
      articleSource,
      "Wenn Sie den Fragebogen jetzt praktisch abarbeiten möchten, nutzen Sie unsere vollständige"
    )
  );
  assert.ok(
    normalizedIncludes(
      esgDataOwnersArticleSource,
      "Sind die Verantwortlichen zugeordnet, führt die vollständige"
    )
  );
});

test("checklist print styling preserves a neutral readable checkbox state and hides interactive clutter", () => {
  const printBlock = globalCssSource.slice(globalCssSource.indexOf("@media print"));
  assert.ok(printBlock.includes(".site-header"));
  assert.ok(printBlock.includes(".site-footer"));
  assert.ok(printBlock.includes(".checklist-screen-controls"));
  assert.ok(printBlock.includes(".checklist-cta"));
  assert.ok(printBlock.includes(".checklist-checkbox"));
  assert.ok(printBlock.includes(".checklist-print-box"));
  assert.ok(printBlock.includes(".checklist-item--checked label"));
  assert.ok(printBlock.includes("break-inside: avoid"));
  assert.ok(printBlock.includes("background: #fff !important"));
});

test("public checklist copy contains no accidental Slovenian drafting fragments", () => {
  const publicCopy = `${checklistGuideSource}\n${checklistDataSource}`;
  for (const fragment of [
    "Na strani",
    "Ne uporabljajte",
    "Ne kopirajte",
    "Če vprašanje",
    "Ne izpolnite",
    "samo zato",
    "Če praksa",
    "Ne dokumentirajte",
    "Vedno preverite",
    "Za GHG",
    "Ne delajte tega",
    "Naredite zadnji",
    "Za vsako pomembno",
    "Pred Submit",
    "Če se zgodi",
    "ni garancija"
  ]) {
    assert.ok(!publicCopy.includes(fragment), fragment);
  }
});

function upstreamCategoryCount(source) {
  const block = source.slice(
    source.indexOf("const upstreamCategories"),
    source.indexOf("const downstreamCategories")
  );
  return block.match(/^  \["\d+",/gm)?.length ?? 0;
}

function downstreamCategoryCount(source) {
  const block = source.slice(
    source.indexOf("const downstreamCategories"),
    source.indexOf("const faqItems")
  );
  return block.match(/^  \["\d+",/gm)?.length ?? 0;
}
