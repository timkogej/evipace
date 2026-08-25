import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [
  registrySource,
  metadataSource,
  sitemapSource,
  companyInfoSource,
  pageSource,
  aboutPageSource,
  methodologyPageSource,
  germanHomeSource,
  englishAboutSource,
  germanAboutSource,
  englishMethodologySource,
  germanMethodologySource,
  navigationSource
] = await Promise.all([
    readFile(new URL("../lib/seo/page-registry.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/seo/build-metadata.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/company-info.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/page.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../app/[locale]/about/page.tsx", import.meta.url),
      "utf8"
    ),
    readFile(
      new URL("../app/[locale]/methodology/page.tsx", import.meta.url),
      "utf8"
    ),
    readFile(
      new URL("../components/evipace/GermanHomePage.tsx", import.meta.url),
      "utf8"
    ),
    readFile(
      new URL("../components/evipace/EnglishAboutPage.tsx", import.meta.url),
      "utf8"
    ),
    readFile(
      new URL("../components/evipace/GermanAboutPage.tsx", import.meta.url),
      "utf8"
    ),
    readFile(
      new URL("../components/evipace/EnglishMethodologyPage.tsx", import.meta.url),
      "utf8"
    ),
    readFile(
      new URL("../components/evipace/GermanMethodologyPage.tsx", import.meta.url),
      "utf8"
    ),
    readFile(new URL("../lib/site-navigation.ts", import.meta.url), "utf8")
  ]);

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

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

test("English and German About and methodology pages are genuine registry equivalents", () => {
  const germanRegistry = localeRegistryBlock("de");
  const englishRegistry = localeRegistryBlock("en");

  assert.ok(englishRegistry.includes("home: {"));
  assert.ok(englishRegistry.includes("about: {"));
  assert.ok(
    englishRegistry.includes(
      'title: "About evipace | ESG for manufacturing companies"'
    )
  );
  assert.ok(
    englishRegistry.includes(
      '"Evipace helps manufacturing companies handle practical ESG requirements — from customer requests and questionnaires to emissions data, reports and evidence."'
    )
  );
  assert.ok(englishRegistry.includes('path: "/en/about"'));
  assert.ok(englishRegistry.includes("methodology: {"));
  assert.ok(
    englishRegistry.includes(
      'title: "ESG Methodology & Quality Assurance | evipace"'
    )
  );
  assert.ok(
    englishRegistry.includes(
      '"How evipace prepares ESG questionnaires, emissions calculations, sustainability reports and supporting evidence — with traceable sources and human review."'
    )
  );
  assert.ok(englishRegistry.includes('path: "/en/methodology"'));
  assert.ok(englishRegistry.includes('lastReviewed: "2026-08-21"'));
  assert.ok(germanRegistry.includes("home: {"));
  assert.ok(
    germanRegistry.includes('title: "ESG für produzierende Unternehmen | evipace"')
  );
  assert.ok(
    germanRegistry.includes(
      '"Evipace übernimmt die praktische ESG-Arbeit für produzierende Unternehmen – von Kundenanfragen und Fragebögen bis zu Scope 1 & 2 und Nachhaltigkeitsberichten."'
    )
  );
  assert.ok(germanRegistry.includes('path: "/de"'));
  assert.ok(germanRegistry.includes("about: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "Über evipace | ESG für produzierende Unternehmen"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      '"Evipace unterstützt produzierende Unternehmen bei der praktischen Umsetzung von ESG-Anforderungen. Erfahren Sie, warum evipace gegründet wurde und wie wir arbeiten."'
    )
  );
  assert.ok(germanRegistry.includes('path: "/de/about"'));
  assert.ok(germanRegistry.includes("methodology: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "ESG-Methodik & Qualitätssicherung | evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      '"So bereitet evipace ESG-Fragebögen, Emissionsberechnungen, Nachhaltigkeitsberichte und Nachweise vor – mit nachvollziehbaren Quellen und menschlicher Prüfung."'
    )
  );
  assert.ok(germanRegistry.includes('path: "/de/methodology"'));
  assert.ok(germanRegistry.includes('lastReviewed: "2026-08-21"'));
  assert.ok(!germanRegistry.includes("sendRequest:"));
  assert.ok(registrySource.includes('en: ["sendRequest"]'));
  assert.ok(registrySource.includes('de: ["sendRequest"]'));
});

test("homepage rendering and global English About navigation remain locale-specific", () => {
  assert.ok(pageSource.includes('locale === "de"'));
  assert.ok(pageSource.includes("<GermanHomePage"));
  assert.ok(pageSource.includes('buildWebPageSchema(locale, "home")'));
  assert.ok(navigationSource.includes('label: "About"'));
  assert.ok(navigationSource.includes('href: route("en", "about")'));
});

test("German global navigation links the live commercial cluster and homepage CTAs remain intact", () => {
  const serviceHrefs = [
    "/de/esg-kundenanfragen",
    "/de/esg-fragebogen-lieferanten",
    "/de/ecovadis-unterstuetzung",
    "/de/integritynext-unterstuetzung",
    "/de/vsme-nachhaltigkeitsbericht",
    "/de/scope-1-2-berechnung"
  ];

  for (const href of serviceHrefs) {
    assert.ok(navigationSource.includes(`href: "${href}"`));
  }

  assert.ok(germanHomeSource.includes('const SEND_REQUEST_HREF = "/de/send-request"'));
  assert.ok(
    (germanHomeSource.match(/href=\{SEND_REQUEST_HREF\}/g) ?? []).length >= 3
  );
  assert.ok(germanHomeSource.includes('href="#leistungen"'));
  assert.ok(germanHomeSource.includes('href="/de/methodology"'));
  assert.ok(germanHomeSource.includes('href="/de/about"'));
  assert.ok(germanHomeSource.includes("Über-uns-Seite"));
  assert.ok(germanHomeSource.includes("Unsere Methodik"));
  assert.ok(navigationSource.includes('href: route("de", "about")'));
  assert.ok(navigationSource.includes("Über evipace"));
});

test("homepage, About, and methodology stay on the existing SEO and schema infrastructure", () => {
  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(sitemapSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(pageSource.includes("buildOrganizationSchema()"));
  assert.ok(pageSource.includes("buildWebsiteSchema()"));
  assert.ok(pageSource.includes('buildWebPageSchema(locale, "home")'));
  assert.ok(aboutPageSource.includes("buildOrganizationSchema()"));
  assert.ok(aboutPageSource.includes("buildWebsiteSchema()"));
  assert.ok(aboutPageSource.includes('buildWebPageSchema(locale, "about")'));
  assert.ok(aboutPageSource.includes('locale === "de"'));
  assert.ok(aboutPageSource.includes('locale === "en"'));
  assert.ok(aboutPageSource.includes("<EnglishAboutPage"));
  assert.ok(aboutPageSource.includes("<GermanAboutPage"));
  assert.ok(methodologyPageSource.includes("buildOrganizationSchema()"));
  assert.ok(methodologyPageSource.includes("buildWebsiteSchema()"));
  assert.ok(
    methodologyPageSource.includes('buildWebPageSchema(locale, "methodology")')
  );
  assert.ok(methodologyPageSource.includes('locale === "de"'));
  assert.ok(methodologyPageSource.includes('locale === "en"'));
  assert.ok(methodologyPageSource.includes("<EnglishMethodologyPage"));
  assert.ok(methodologyPageSource.includes("<GermanMethodologyPage"));
  assert.ok(!pageSource.includes("buildServiceSchema"));
  assert.ok(!aboutPageSource.includes("buildServiceSchema"));
  assert.ok(!methodologyPageSource.includes("buildServiceSchema"));
  assert.ok(!germanHomeSource.includes("FAQPage"));
  assert.ok(!englishAboutSource.includes("FAQPage"));
  assert.ok(!englishAboutSource.includes("Person"));
  assert.ok(!germanAboutSource.includes("FAQPage"));
  assert.ok(!germanAboutSource.includes("Person"));
  assert.ok(!englishMethodologySource.includes("FAQPage"));
  assert.ok(!englishMethodologySource.includes("Person"));
  assert.ok(!germanMethodologySource.includes("FAQPage"));
});

test("English About preserves the approved story, founder data, links, and claim limits", () => {
  const requiredCopy = [
    "ESG should not become more complicated than the task itself.",
    "ESG requirements from larger companies are reaching smaller suppliers",
    "The information may already exist. It simply does not exist in the form the questionnaire expects.",
    "Evipace was built for the space between the two.",
    "ESG, done faster.",
    "Faster does not mean more superficial. It means more structured.",
    "Founded on practical work.",
    "Tim Kogej",
    "Founder & Managing Director",
    "Where a project requires additional specialist knowledge, the working model is designed to involve appropriate external expertise when needed.",
    "Founded in Slovenia. Built for European supply chains.",
    "Source before statement.",
    "Digital and AI-assisted tools can support the preparation process.",
    "We do not issue ESG certifications.",
    "We do not replace independent assurance."
  ];

  const normalizedAbout = normalizeWhitespace(englishAboutSource);

  for (const copy of requiredCopy) {
    assert.ok(normalizedAbout.includes(normalizeWhitespace(copy)), copy);
  }

  assert.ok(englishAboutSource.includes('href="/en/methodology"'));
  assert.ok(englishAboutSource.includes("Our methodology"));
  assert.ok(englishAboutSource.includes('href="/en#services"'));
  assert.ok(englishAboutSource.includes("Explore our services"));
  assert.ok(englishAboutSource.includes("publicContactEmail"));
  assert.ok(
    companyInfoSource.includes(
      'export const publicContactEmail = "hello@evipace.com"'
    )
  );
  assert.ok(englishAboutSource.includes('const SEND_REQUEST_HREF = "/en/send-request"'));
  assert.ok(englishAboutSource.includes("<ButtonLink href={SEND_REQUEST_HREF}>"));
  assert.ok(englishAboutSource.includes("evipaceImages.industrialBreak.src"));
  assert.ok(!englishAboutSource.includes("evipaceImages.founder"));
  assert.ok(!englishAboutSource.includes("about-founder"));

  const disallowedCopy = [
    "certified ESG experts",
    "leading ESG expert",
    "recognised industry expert",
    "our global team",
    "our offices",
    "hundreds of companies",
    "trusted by",
    "industry-leading",
    "EcoVadis partner",
    "IntegrityNext partner",
    "client logos",
    "testimonials",
    "d.o.o.",
    "GmbH",
    "VAT number"
  ];

  for (const copy of disallowedCopy) {
    assert.ok(!englishAboutSource.includes(copy), copy);
  }
});

test("German About preserves the approved founder story, trust links, and claim limits", () => {
  const requiredCopy = [
    "ESG sollte für kleinere Unternehmen nicht komplizierter sein als die Aufgabe selbst.",
    "Die ESG-Anforderungen großer Unternehmen erreichen längst auch ihre kleineren Lieferanten",
    "Die Informationen sind häufig vorhanden. Aber sie liegen nicht dort, wo der Fragebogen sie erwartet.",
    "Evipace wurde für den Raum dazwischen aufgebaut.",
    "ESG, done faster.",
    "Schneller bedeutet nicht oberflächlicher. Es bedeutet strukturierter.",
    "Aus der Praxis entstanden.",
    "Tim Kogej",
    "Founder & Managing Director",
    "Für Aufgaben, die zusätzliche spezialisierte Fachkenntnisse erfordern, ist das Arbeitsmodell darauf ausgelegt, bei Bedarf passende externe Fachleute einzubeziehen.",
    "In Slowenien gegründet. Für europäische Lieferketten gedacht.",
    "Quelle vor Aussage.",
    "Digitale und AI-gestützte Werkzeuge können die Vorbereitung unterstützen.",
    "Wir vergeben keine ESG-Zertifizierungen.",
    "Wir ersetzen keine unabhängige Assurance."
  ];

  const normalizedAbout = normalizeWhitespace(germanAboutSource);

  for (const copy of requiredCopy) {
    assert.ok(normalizedAbout.includes(normalizeWhitespace(copy)), copy);
  }

  assert.ok(germanAboutSource.includes('href="/de/methodology"'));
  assert.ok(germanAboutSource.includes("Unsere Methodik"));
  assert.ok(germanAboutSource.includes("publicContactEmail"));
  assert.ok(
    companyInfoSource.includes(
      'export const publicContactEmail = "hello@evipace.com"'
    )
  );
  assert.ok(germanAboutSource.includes('const SEND_REQUEST_HREF = "/de/send-request"'));
  assert.ok(germanAboutSource.includes("<ButtonLink href={SEND_REQUEST_HREF}>"));
  assert.ok(germanAboutSource.includes("evipaceImages.industrialBreak.src"));
  assert.ok(!germanAboutSource.includes("evipaceImages.founder"));
  assert.ok(!germanAboutSource.includes("about-founder"));

  const disallowedCopy = [
    "zertifizierte ESG-Experten",
    "führender ESG-Experte",
    "unser Team",
    "unsere Büros",
    "hunderten Unternehmen",
    "EcoVadis-Partner",
    "IntegrityNext-Partner",
    "Kundenlogos",
    "Testimonials",
    "d.o.o.",
    "GmbH",
    "USt-Id"
  ];

  for (const copy of disallowedCopy) {
    assert.ok(!germanAboutSource.includes(copy), copy);
  }
});

test("German methodology preserves critical trust language and claim limits", () => {
  const requiredCopy = [
    "Quelle vor Aussage",
    "Wenn eine Information fehlt, behandeln wir sie als Lücke",
    "Das Ergebnis soll nicht nur fertig aussehen. Es soll nachvollziehbar sein.",
    "Jeder Deliverable wird vor der Rückgabe an den Kunden menschlich geprüft.",
    "Technologie beschleunigt die Vorbereitung. Verantwortung wird nicht automatisiert.",
    "Beleg vor Behauptung.",
    "Wir erstellen keine fingierten, rückdatierten oder irreführend dargestellten Nachweise.",
    "Ein Entwurf ist noch keine Unternehmensrichtlinie.",
    "Wenn Scope 3 Teil des vereinbarten Auftrags ist",
    "Scheinbare Präzision ist nicht besser als transparent dokumentierte Unsicherheit.",
    "Die endgültige Eingabe beziehungsweise Einreichung auf der Plattform erfolgt durch das Unternehmen selbst.",
    "Evipace ist ein unabhängiger Dienstleister und weder mit EcoVadis noch mit IntegrityNext verbunden.",
    "Zuletzt methodisch geprüft: 21. August 2026"
  ];

  const normalizedMethodology = normalizeWhitespace(germanMethodologySource);

  for (const copy of requiredCopy) {
    assert.ok(normalizedMethodology.includes(normalizeWhitespace(copy)), copy);
  }

  const disallowedCopy = [
    "AI-powered ESG",
    "automated compliance",
    "proprietary AI",
    "EcoVadis-Partner",
    "IntegrityNext-Partner",
    "garantiert eine bestimmte EcoVadis",
    "garantiert eine bestimmte IntegrityNext",
    "automatisch gelöscht",
    "30 Tage",
    "90 Tage"
  ];

  for (const copy of disallowedCopy) {
    assert.ok(!germanMethodologySource.includes(copy), copy);
  }
});

test("English methodology preserves the approved workflow, trust language, and claim limits", () => {
  const requiredCopy = [
    "Our first principle: source before statement.",
    "If information is missing, we treat it as a gap",
    "The result should not only look complete. It should be traceable.",
    "Understand the requirement",
    "Gather source information",
    "Structure the information",
    "Prepare the work",
    "Human review",
    "Company confirmation",
    "Every deliverable is reviewed by a person before it is returned to the client.",
    "Technology can accelerate preparation. Responsibility is not automated.",
    "Evidence before claim.",
    "We do not create fictitious, backdated or misleading evidence.",
    "A draft is not yet a company policy.",
    "Where Scope 3 is part of the agreed engagement",
    "False precision is not better than transparently documented uncertainty.",
    "The final entry or submission on the external platform is made by the company itself.",
    "Evipace is an independent service provider and is not affiliated with EcoVadis or IntegrityNext.",
    "Your responsibility. Our responsibility.",
    "Announced changes are not treated as rules that are already in force.",
    "Last methodologically reviewed: 21 August 2026"
  ];

  const normalizedMethodology = normalizeWhitespace(englishMethodologySource);

  for (const copy of requiredCopy) {
    assert.ok(normalizedMethodology.includes(normalizeWhitespace(copy)), copy);
  }

  assert.ok(
    englishMethodologySource.includes(
      'const SEND_REQUEST_HREF = "/en/send-request"'
    )
  );
  assert.ok(
    englishMethodologySource.includes(
      "<ButtonLink href={SEND_REQUEST_HREF}>"
    )
  );

  const disallowedCopy = [
    "AI-powered ESG",
    "automated compliance",
    "proprietary AI",
    "EcoVadis partner",
    "IntegrityNext partner",
    "guaranteed EcoVadis",
    "guaranteed IntegrityNext",
    "automatically deleted",
    "30 days",
    "90 days"
  ];

  for (const copy of disallowedCopy) {
    assert.ok(!englishMethodologySource.includes(copy), copy);
  }
});

test("localized homepage, About, and methodology components do not render internal notes", () => {
  assert.ok(!germanHomeSource.includes("Implementation notes"));
  assert.ok(!germanHomeSource.includes("SECTION "));
  assert.ok(!germanHomeSource.includes("Zdaj se /de"));
  assert.ok(!englishAboutSource.includes("Implementation notes"));
  assert.ok(!englishAboutSource.includes("SECTION "));
  assert.ok(!englishAboutSource.includes("Zdaj lahko"));
  assert.ok(!germanAboutSource.includes("Implementation notes"));
  assert.ok(!germanAboutSource.includes("SECTION "));
  assert.ok(!germanAboutSource.includes("Za implementacijo"));
  assert.ok(!englishMethodologySource.includes("Implementation notes"));
  assert.ok(!englishMethodologySource.includes("SECTION "));
  assert.ok(!englishMethodologySource.includes("Ta copy"));
  assert.ok(!germanMethodologySource.includes("Implementation notes"));
  assert.ok(!germanMethodologySource.includes("SECTION "));
  assert.ok(!germanMethodologySource.includes("Za to stran"));
});
