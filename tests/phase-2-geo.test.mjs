import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [
  organizationSchema,
  articleSchema,
  idsSchema,
  registry,
  primarySources,
  preparedBy,
  lastReviewed,
  serviceBreadcrumb,
  sourceNote,
  legalInfo,
  requestForm,
  englishHome,
  homeContent,
  servicesSection,
  aboutEvipace,
  germanHome,
  englishAbout,
  germanAbout,
  englishMethodology,
  germanMethodology,
  commercialTemplate,
  commercialContent,
  englishHub,
  germanHub
] = await Promise.all(
  [
    "lib/seo/schema/organization.ts",
    "lib/seo/schema/article.ts",
    "lib/seo/schema/ids.ts",
    "lib/seo/page-registry.ts",
    "lib/seo/primary-sources.ts",
    "components/evipace/trust/PreparedBy.tsx",
    "components/evipace/trust/LastReviewed.tsx",
    "components/evipace/trust/ServiceBreadcrumb.tsx",
    "components/evipace/trust/SourceNote.tsx",
    "lib/legal-info.ts",
    "components/evipace/send-request/RequestForm.tsx",
    "components/evipace/EnglishHomePage.tsx",
    "components/evipace/english-home/content.ts",
    "components/evipace/english-home/ServicesSection.tsx",
    "components/evipace/english-home/AboutEvipace.tsx",
    "components/evipace/GermanHomePage.tsx",
    "components/evipace/EnglishAboutPage.tsx",
    "components/evipace/GermanAboutPage.tsx",
    "components/evipace/EnglishMethodologyPage.tsx",
    "components/evipace/GermanMethodologyPage.tsx",
    "components/evipace/english-commercial/EnglishCommercialServicePage.tsx",
    "components/evipace/english-commercial/content.ts",
    "components/evipace/resources/EnglishResourceHub.tsx",
    "components/evipace/resources/GermanResourceHub.tsx"
  ].map(read)
);

const DE_SERVICES = [
  ["ecovadis-unterstuetzung", "EcoVadis-Unterstützung"],
  ["integritynext-unterstuetzung", "IntegrityNext-Unterstützung"],
  ["esg-kundenanfragen", "ESG-Kundenanfragen"],
  ["esg-fragebogen-lieferanten", "ESG-Fragebögen für Lieferanten"],
  ["vsme-nachhaltigkeitsbericht", "VSME-Nachhaltigkeitsbericht"],
  ["scope-1-2-berechnung", "Scope 1 & 2"]
];

const EN_SERVICE_ROUTES = [
  "esg-customer-requests",
  "esg-questionnaire-support",
  "ecovadis-support",
  "integritynext-support",
  "scope-1-2-calculation",
  "vsme-sustainability-report"
];

/* ────────────────────────────────────────────────────────────────────────
   No FAQPage structured data anywhere
   ──────────────────────────────────────────────────────────────────────── */

test("visible FAQs are plain HTML — no FAQPage schema exists anywhere", async () => {
  const walk = async (dir) => {
    const entries = await readdir(new URL(dir, root), { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      const next = `${dir}${entry.name}${entry.isDirectory() ? "/" : ""}`;
      if (entry.isDirectory()) files.push(...(await walk(next)));
      else if (/\.(tsx?|mjs)$/.test(entry.name)) files.push(next);
    }
    return files;
  };

  const files = [
    ...(await walk("app/")),
    ...(await walk("components/")),
    ...(await walk("lib/"))
  ];
  assert.ok(files.length > 100, `only ${files.length} files walked`);

  for (const file of files) {
    const text = await read(file);
    // Match the JSON-LD type value and its properties, not prose that
    // merely names the type — several comments explain why it is absent.
    for (const forbidden of ['"FAQPage"', "acceptedAnswer", "mainEntity:"]) {
      assert.ok(!text.includes(forbidden), `${file}: ${forbidden}`);
    }
  }

  // The FAQ markup itself is the established <details> pattern, server
  // rendered — no client boundary, so it is in the initial HTML.
  assert.ok(commercialTemplate.includes("<details"));
  assert.ok(!commercialTemplate.includes('"use client"'));
});

/* ────────────────────────────────────────────────────────────────────────
   Organization entity
   ──────────────────────────────────────────────────────────────────────── */

test("Organization schema adds only visibly supported properties", () => {
  for (const supported of [
    "description:",
    "email: publicContactEmail",
    "areaServed:",
    "founder:",
    'name: "Tim Kogej"',
    'jobTitle: "Founder & Managing Director"',
    "FOUNDER_ID"
  ]) {
    assert.ok(organizationSchema.includes(supported), supported);
  }

  // The founder is the one already published on the About page — same name
  // and same job title, nothing added.
  assert.ok(englishAbout.includes('name: "Tim Kogej"'));
  assert.ok(englishAbout.includes('role: "Founder & Managing Director"'));
  assert.ok(englishAbout.includes("publicContactEmail"));

  // Property syntax, so the doc comment listing what must stay out does
  // not trip the guard it is describing.
  for (const forbidden of [
    "sameAs:",
    "foundingDate:",
    "numberOfEmployees:",
    "award:",
    "memberOf:",
    "hasCredential:",
    "taxID:",
    "vatID:",
    "aggregateRating:",
    "address:",
    "telephone:",
    "priceRange:"
  ]) {
    assert.ok(!organizationSchema.includes(forbidden), forbidden);
  }

  assert.ok(idsSchema.includes("FOUNDER_ID"));
  assert.ok(idsSchema.includes("ORGANIZATION_ID"));
  assert.ok(idsSchema.includes("WEBSITE_ID"));
});

/* ────────────────────────────────────────────────────────────────────────
   Article authorship and date discipline
   ──────────────────────────────────────────────────────────────────────── */

test("Article authorship resolves to the Organization and dates stay unfabricated", () => {
  assert.ok(articleSchema.includes('author: { "@id": ORGANIZATION_ID }'));
  assert.ok(articleSchema.includes('publisher: { "@id": ORGANIZATION_ID }'));
  assert.ok(!articleSchema.includes('"@type": "Person"'));

  // Dates are conditional on the registry carrying them.
  assert.ok(
    articleSchema.includes(
      "...(entry.datePublished ? { datePublished: entry.datePublished } : {})"
    )
  );
  assert.ok(
    articleSchema.includes(
      "...(entry.dateModified ? { dateModified: entry.dateModified } : {})"
    )
  );
  assert.ok(!/\d{4}-\d{2}-\d{2}/.test(articleSchema));

  // The registry declares the fields but carries no resource dates: the
  // repository has no publication record to derive them from, and a
  // fabricated date is a worse signal than none.
  assert.ok(registry.includes("datePublished?: string;"));
  assert.ok(registry.includes("dateModified?: string;"));
  assert.equal((registry.match(/^\s*datePublished: "/gm) ?? []).length, 0);
  assert.equal((registry.match(/^\s*dateModified: "/gm) ?? []).length, 0);

  // The one real date on the site is the hand-set methodology review.
  assert.equal((registry.match(/lastReviewed: "/g) ?? []).length, 2);
  assert.ok(registry.includes('lastReviewed: "2026-08-21"'));
});

test("resource pages credit Evipace and render registry dates only", async () => {
  const routes = [];
  for (const dir of ["app/[locale]/resources/", "app/[locale]/ressourcen/"]) {
    for (const entry of await readdir(new URL(dir, root), {
      withFileTypes: true
    })) {
      if (entry.isDirectory()) routes.push(`${dir}${entry.name}/page.tsx`);
    }
  }
  assert.equal(routes.length, 30, `found ${routes.length} resource routes`);

  for (const route of routes) {
    const source = await read(route);
    assert.ok(source.includes("<PreparedBy"), route);
    assert.ok(source.includes("datePublished={entry?.datePublished}"), route);
    assert.ok(source.includes("dateModified={entry?.dateModified}"), route);
    assert.ok(source.includes("getPageMetadataEntry(locale, PAGE_KEY)"), route);
    // No date literal may live in a route.
    assert.ok(!/\d{4}-\d{2}-\d{2}/.test(source), route);
  }

  assert.ok(preparedBy.includes('preparedBy: "Prepared by Evipace"'));
  assert.ok(preparedBy.includes('preparedBy: "Erstellt von Evipace"'));
  // Dates only render when they exist, and always inside semantic markup.
  assert.ok(preparedBy.includes("<time dateTime={datePublished}>"));
  assert.ok(preparedBy.includes("<time dateTime={dateModified}>"));
  assert.ok(!/\d{4}-\d{2}-\d{2}/.test(preparedBy));
  // No invented editorial persona.
  for (const forbidden of ["Evipace Research", "Editorial Team", "Redaktion"]) {
    assert.ok(!preparedBy.includes(forbidden), forbidden);
  }
});

/* ────────────────────────────────────────────────────────────────────────
   Methodology review date
   ──────────────────────────────────────────────────────────────────────── */

test("the methodology review date comes from the registry, in semantic markup", () => {
  assert.ok(lastReviewed.includes("<time dateTime={date}>"));
  assert.ok(lastReviewed.includes('label: "Last methodologically reviewed"'));
  assert.ok(lastReviewed.includes('label: "Zuletzt methodisch geprüft"'));
  assert.ok(!/\d{4}-\d{2}-\d{2}/.test(lastReviewed));

  for (const [label, source] of [
    ["en", englishMethodology],
    ["de", germanMethodology]
  ]) {
    assert.ok(source.includes("<LastReviewed date={date}"), label);
    // The production debug line is gone, and no date is hardcoded.
    assert.ok(!source.includes("Registry lastReviewed:"), label);
    assert.ok(!source.includes("sr-only"), label);
    assert.ok(!/\d{4}-\d{2}-\d{2}/.test(source), label);
    assert.ok(!source.includes("21 August 2026"), label);
    assert.ok(!source.includes("21. August 2026"), label);
  }
});

/* ────────────────────────────────────────────────────────────────────────
   Methodology sources and internal links
   ──────────────────────────────────────────────────────────────────────── */

test("primary sources are official and shared from one place", () => {
  for (const host of [
    "https://ghgprotocol.org/corporate-standard",
    "https://ghgprotocol.org/scope-2-guidance",
    "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard",
    "https://eur-lex.europa.eu/eli/dir/2026/470/oj",
    "https://finance.ec.europa.eu/",
    "https://support.ecovadis.com/hc/en-us/",
    "https://helpdesk.integritynext.com/hc/en-us/"
  ]) {
    assert.ok(primarySources.includes(host), host);
  }

  // Citations are attached to the claim, and open safely.
  assert.ok(sourceNote.includes('rel="noreferrer"'));
  assert.ok(sourceNote.includes('target="_blank"'));

  // Methodology cites rather than merely naming the standards.
  for (const [label, source, links] of [
    [
      "en",
      englishMethodology,
      [
        "/en/scope-1-2-calculation",
        "/en/resources/scope-1-2-3-explained",
        "/en/ecovadis-support",
        "/en/integritynext-support",
        "/en/resources/ecovadis-documents-evidence",
        "/en/resources/integritynext-invitation-for-suppliers",
        "/en/resources/esg-evidence-for-suppliers",
        "/en/vsme-sustainability-report",
        "/en/resources/vsme-data-sustainability-report"
      ]
    ],
    [
      "de",
      germanMethodology,
      [
        "/de/scope-1-2-berechnung",
        "/de/ressourcen/scope-1-2-3-einfach-erklaert",
        "/de/ecovadis-unterstuetzung",
        "/de/integritynext-unterstuetzung",
        "/de/ressourcen/ecovadis-dokumente-nachweise",
        "/de/ressourcen/integritynext-einladung-lieferanten",
        "/de/ressourcen/esg-nachweise-lieferanten",
        "/de/vsme-nachhaltigkeitsbericht",
        "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht"
      ]
    ]
  ]) {
    assert.ok(source.includes("<SourceNote"), label);
    assert.ok(source.includes("primarySources.ghgCorporateStandard"), label);
    assert.ok(source.includes("primarySources.ghgScope2Guidance"), label);
    assert.ok(source.includes("primarySources.efragVoluntaryStandard"), label);
    for (const href of links) {
      assert.ok(source.includes(`href="${href}"`), `${label}: ${href}`);
    }
  }
});

/* ────────────────────────────────────────────────────────────────────────
   Homepages
   ──────────────────────────────────────────────────────────────────────── */

test("the English homepage answers entity questions and links both platforms", () => {
  assert.ok(englishHome.includes("<HomeFaq />"));
  // Sits directly before the conversion CTA.
  assert.ok(
    englishHome.indexOf("<HomeFaq />") < englishHome.indexOf("<HomeFinalCta />")
  );

  for (const question of [
    "What does Evipace do?",
    "Who is Evipace for?",
    "What kinds of ESG requests can Evipace handle?",
    "Does Evipace support EcoVadis and IntegrityNext?",
    "Do we need an ESG system in place before starting?",
    "What should we send to get started?"
  ]) {
    assert.ok(homeContent.includes(question), question);
  }

  // Platform independence is restated, not softened.
  assert.ok(
    homeContent.includes(
      "Evipace is not affiliated with either platform, does not control scoring or document acceptance, and does not promise a score, medal or status."
    )
  );

  // Both platform services get a real, descriptive link from the body.
  assert.ok(homeContent.includes('href: "/en/ecovadis-support"'));
  assert.ok(homeContent.includes('href: "/en/integritynext-support"'));
  assert.ok(servicesSection.includes("platformServices"));
  assert.ok(servicesSection.includes("Platform assessments"));

  // Geography names the relevant markets without narrowing the scope.
  assert.ok(
    aboutEvipace.includes(
      "including suppliers answering to\n              customers in markets such as Germany and Austria"
    )
  );
  assert.ok(aboutEvipace.includes("European supply chains"));
});

test("the German homepage carries the entity layer and a resources link", () => {
  assert.ok(germanHome.includes('id="ueber-evipace"'));
  assert.ok(germanHome.includes("Gegründet in Slowenien."));
  assert.ok(germanHome.includes("Gebaut für europäische Lieferketten."));
  assert.ok(germanHome.includes("europäischen\n                    Lieferketten"));
  assert.ok(germanHome.includes("Deutschland und Österreich"));
  assert.ok(germanHome.includes('href="/de/ressourcen"'));
  assert.ok(
    germanHome.includes("praktischen ESG-Leitfäden und Checklisten für Lieferanten")
  );
  // The established FAQ and limits sections are untouched.
  assert.ok(germanHome.includes('id="faq"'));
  assert.ok(germanHome.includes('id="grenzen"'));
});

/* ────────────────────────────────────────────────────────────────────────
   About as entity anchor
   ──────────────────────────────────────────────────────────────────────── */

test("About opens with a plain entity definition and links its topics", () => {
  assert.ok(
    englishAbout.includes(
      "Evipace is a Slovenia-based ESG service provider that helps"
    )
  );
  assert.ok(
    germanAbout.includes(
      "Evipace ist ein in Slowenien gegründeter ESG-Dienstleister"
    )
  );

  for (const href of [
    "/en/esg-customer-requests",
    "/en/esg-questionnaire-support",
    "/en/ecovadis-support",
    "/en/integritynext-support",
    "/en/scope-1-2-calculation",
    "/en/vsme-sustainability-report",
    "/en/resources",
    "/en/methodology"
  ]) {
    assert.ok(englishAbout.includes(`href="${href}"`), href);
  }
  for (const href of [
    "/de/esg-kundenanfragen",
    "/de/esg-fragebogen-lieferanten",
    "/de/ecovadis-unterstuetzung",
    "/de/integritynext-unterstuetzung",
    "/de/scope-1-2-berechnung",
    "/de/vsme-nachhaltigkeitsbericht",
    "/de/ressourcen",
    "/de/methodology"
  ]) {
    assert.ok(germanAbout.includes(`href="${href}"`), href);
  }
});

/* ────────────────────────────────────────────────────────────────────────
   English service pages
   ──────────────────────────────────────────────────────────────────────── */

test("every English service page carries a FAQ, and platform pages define themselves", () => {
  assert.ok(commercialTemplate.includes("function FaqSection"));
  assert.ok(commercialTemplate.includes("function DirectAnswers"));
  assert.ok(commercialTemplate.includes("function RelatedServicesSection"));

  // FAQ sits after the resources block and before the final CTA.
  const order = ["<ResourcesSection", "<FaqSection", "<FinalCta"].map((tag) =>
    commercialTemplate.lastIndexOf(tag)
  );
  assert.deepEqual([...order].sort((a, b) => a - b), order);

  const contents = [
    "customerRequestsContent",
    "questionnaireSupportContent",
    "scope12CalculationContent",
    "ecovadisSupportContent",
    "integrityNextSupportContent",
    "vsmeSustainabilityReportContent"
  ];
  for (const name of contents) {
    const start = commercialContent.indexOf(`export const ${name}`);
    assert.ok(start > -1, name);
    const end = commercialContent.indexOf("\n};\n", start);
    const block = commercialContent.slice(start, end);
    const questions = block.match(/^\s{6}question:/gm) ?? [];
    assert.ok(
      questions.length >= 5 && questions.length <= 10,
      `${name} has ${questions.length} FAQ/answer entries`
    );
  }

  // Definitional answers where a first-time reader needs one.
  assert.ok(
    commercialContent.includes(
      "EcoVadis is an independent business sustainability rating provider"
    )
  );
  assert.ok(
    commercialContent.includes(
      "IntegrityNext is a supply-chain sustainability and compliance platform"
    )
  );
  assert.ok(
    commercialContent.includes(
      "VSME is the voluntary sustainability reporting standard for non-listed small and medium-sized enterprises developed by EFRAG"
    )
  );
  assert.ok(
    commercialContent.includes("No. VSME is a voluntary standard; it does not")
  );
  assert.ok(
    commercialContent.includes(
      "Scope 1 covers direct greenhouse-gas emissions from sources a company owns or controls"
    )
  );

  // Regulatory and platform claims are cited from official documentation.
  for (const source of [
    "primarySources.ecovadisSupportingDocuments",
    "primarySources.ecovadisDocumentLimit",
    "primarySources.integrityNextCompletingAssessment",
    "primarySources.efragVoluntaryStandard",
    "primarySources.eurLexReportingDirective",
    "primarySources.ghgCorporateStandard",
    "primarySources.ghgScope2Guidance"
  ]) {
    assert.ok(commercialContent.includes(source), source);
  }

  // Outcome promises stay off the page. The disclaimers that use the same
  // words ("we do not guarantee a score") must survive, so the guard bans
  // the affirmative phrasing only.
  for (const forbidden of [
    "we guarantee",
    "guaranteed medal",
    "guaranteed score",
    "will improve your score",
    "certified partner",
    "official partner",
    "EcoVadis partner",
    "IntegrityNext partner"
  ]) {
    assert.ok(!commercialContent.includes(forbidden), forbidden);
  }
  assert.ok(
    commercialContent.includes(
      "We do not guarantee a score or assessment outcome."
    )
  );
  assert.ok(
    commercialContent.includes(
      "Evipace is an independent service provider and is not affiliated with EcoVadis."
    )
  );
});

test("the customer-request and questionnaire pages state their distinct scope", () => {
  assert.ok(commercialContent.includes("This page covers all of those formats."));
  assert.ok(
    commercialContent.includes(
      "This page is for that case: a defined questionnaire or assessment document that has to be answered field by field."
    )
  );
  assert.ok(
    commercialContent.includes(
      "How is this different from your ESG questionnaire support?"
    )
  );
  assert.ok(
    commercialContent.includes(
      "How is this different from your customer ESG requests page?"
    )
  );
});

/* ────────────────────────────────────────────────────────────────────────
   Internal knowledge graph
   ──────────────────────────────────────────────────────────────────────── */

test("both resource hubs link every service", () => {
  for (const route of EN_SERVICE_ROUTES) {
    assert.ok(englishHub.includes(`"/en/${route}"`), route);
  }
  for (const [slug] of DE_SERVICES) {
    assert.ok(germanHub.includes(`"/de/${slug}"`), slug);
  }
});

test("VSME and Scope 1 & 2 reference each other", () => {
  const between = (from, to) => {
    const start = commercialContent.indexOf(`export const ${from}`);
    const end = commercialContent.indexOf("\n};\n", start);
    return commercialContent.slice(start, end).includes(to);
  };
  assert.ok(between("vsmeSustainabilityReportContent", "/en/scope-1-2-calculation"));
  assert.ok(between("scope12CalculationContent", "/en/vsme-sustainability-report"));
});

/* ────────────────────────────────────────────────────────────────────────
   German service breadcrumbs
   ──────────────────────────────────────────────────────────────────────── */

test("German service pages have matching visible and structured breadcrumbs", async () => {
  assert.ok(serviceBreadcrumb.includes('aria-label="Brotkrümelnavigation"'));
  assert.ok(serviceBreadcrumb.includes('aria-current="page"'));

  for (const [slug, label] of DE_SERVICES) {
    const hero = await read(`components/evipace/${slug}/LandingHero.tsx`);
    const route = await read(`app/[locale]/${slug}/page.tsx`);

    assert.ok(hero.includes(`<ServiceBreadcrumb current="${label}" />`), slug);
    assert.ok(route.includes("buildBreadcrumbListSchema(["), slug);
    assert.ok(route.includes('{ name: "Startseite", path: "/de" }'), slug);
    // The visible label and the structured one are the same string.
    assert.ok(
      route.includes(`{ name: "${label}", path: "/de/${slug}" }`),
      slug
    );
    assert.ok(!route.includes("FAQPage"), slug);
  }
});

/* ────────────────────────────────────────────────────────────────────────
   Locale-aware privacy link
   ──────────────────────────────────────────────────────────────────────── */

test("the request form links the privacy policy for its own locale", () => {
  assert.ok(legalInfo.includes("export function getPrivacyPolicyPath"));
  assert.ok(legalInfo.includes('candidate.pageKey === "privacy"'));
  assert.ok(!legalInfo.includes('export const privacyPolicyPath'));
  assert.ok(requestForm.includes("getPrivacyPolicyPath(locale)"));
  assert.ok(!requestForm.includes('href="/en/privacy"'));
});

/* ────────────────────────────────────────────────────────────────────────
   Nothing new under /sl, and Phase 1 systems untouched
   ──────────────────────────────────────────────────────────────────────── */

test("no Slovenian routes were created and the registry stays the source of truth", () => {
  assert.ok(registry.includes("sl: {}"));
  assert.ok(registry.includes("export function getActivePageGroup"));
  assert.ok(registry.includes("export function isPageReachable"));
});
