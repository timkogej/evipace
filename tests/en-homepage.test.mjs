import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const homeDirectory = new URL(
  "../components/evipace/english-home/",
  import.meta.url
);

const homeFiles = (await readdir(homeDirectory)).filter((file) =>
  file.endsWith(".tsx") || file.endsWith(".ts")
);

const [
  registrySource,
  metadataSource,
  sitemapSource,
  pageSource,
  englishHomeSource,
  germanHomeSource,
  ...sectionSources
] = await Promise.all([
  readFile(new URL("lib/seo/page-registry.ts", root), "utf8"),
  readFile(new URL("lib/seo/build-metadata.ts", root), "utf8"),
  readFile(new URL("app/sitemap.ts", root), "utf8"),
  readFile(new URL("app/[locale]/page.tsx", root), "utf8"),
  readFile(new URL("components/evipace/EnglishHomePage.tsx", root), "utf8"),
  readFile(new URL("components/evipace/GermanHomePage.tsx", root), "utf8"),
  ...homeFiles.map((file) => readFile(new URL(file, homeDirectory), "utf8"))
]);

const homepageSource = [englishHomeSource, ...sectionSources].join("\n");
const normalizedHomepage = homepageSource.replace(/\s+/g, " ");

test("English homepage metadata uses the exact approved registry values", () => {
  const englishStart = registrySource.indexOf("  en: {");
  const germanStart = registrySource.indexOf("\n  de: {", englishStart);
  const englishRegistry = registrySource.slice(englishStart, germanStart);

  assert.ok(
    englishRegistry.includes(
      'title: "ESG for Manufacturing Companies & Suppliers | evipace"'
    )
  );
  assert.ok(
    englishRegistry.includes(
      '"evipace handles practical ESG work for manufacturing suppliers — from customer questionnaires and evidence to Scope 1 & 2 and sustainability reporting."'
    )
  );
  assert.ok(englishRegistry.includes('path: "/en"'));
  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes('languages["x-default"]'));
  assert.ok(sitemapSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(registrySource.includes("sl: {}"));
});

test("English and German homepages remain separate locale implementations", () => {
  assert.ok(pageSource.includes('locale === "de"'));
  assert.ok(pageSource.includes("<GermanHomePage"));
  assert.ok(pageSource.includes("<EnglishHomePage"));
  assert.ok(pageSource.includes('buildWebPageSchema(locale, "home")'));
  assert.ok(pageSource.includes("buildOrganizationSchema()"));
  assert.ok(pageSource.includes("buildWebsiteSchema()"));
  assert.ok(germanHomeSource.includes("ESG-Anforderungen erledigen"));
  assert.ok(!germanHomeSource.includes("Your customer asked for ESG data"));
});

test("approved homepage sections, copy, workflow and CTAs are present", () => {
  const requiredCopy = [
    "ESG execution for manufacturing suppliers",
    "Your customer asked for ESG data. We help you get it done.",
    "Your ESG data is probably not missing. It is scattered.",
    "A customer asks for ESG information. What happens next?",
    "Practical ESG work, from request to deliverable.",
    "Customer ESG requests",
    "ESG questionnaires",
    "Scope 1 & 2",
    "Sustainability reporting",
    "Policies & documentation",
    "Evidence preparation",
    "We do the work behind the reporting.",
    "From customer request to a usable answer.",
    "Send us the request",
    "We map what is needed",
    "We prepare the work",
    "Your company confirms the facts",
    "The output becomes reusable",
    "ESG looks different inside a manufacturing company.",
    "Collect once. Use many times.",
    "If we cannot trace it, we should not overstate it.",
    "Between a large consultancy and doing everything yourself.",
    "Not just advice about what you should do.",
    "ESG should not be more complicated than the task itself.",
    "Already have an ESG request in your inbox?",
    "Just send us what your customer sent you."
  ];

  for (const copy of requiredCopy) {
    assert.ok(normalizedHomepage.includes(copy), copy);
  }

  assert.equal(
    (homepageSource.match(/title: "Customer ESG requests"/g) ?? []).length,
    1
  );
  assert.equal(
    (homepageSource.match(/number: "0[1-5]"/g) ?? []).filter((entry) =>
      ["01", "02", "03", "04", "05"].some((number) => entry.includes(number))
    ).length >= 5,
    true
  );
  assert.ok(homepageSource.includes('href="#services"'));
  assert.ok(homepageSource.includes('href="/en/send-request"'));
  assert.ok(homepageSource.includes('href="/en/about"'));
  assert.ok(homepageSource.includes('href="/en/methodology"'));
});

test("English homepage route and claim discipline stay within scope", () => {
  const allowedEnglishPaths = new Set([
    "/en",
    "/en/about",
    "/en/methodology",
    "/en/send-request",
    "/en/esg-customer-requests",
    "/en/esg-questionnaire-support",
    "/en/scope-1-2-calculation",
    "/en/vsme-sustainability-report",
    "/en/resources",
    "/en/resources/reusable-esg-data"
  ]);
  const englishHrefs = [
    ...homepageSource.matchAll(/href[=:]\s*[{"'`]([^"'`}]+)["'`}]/g)
  ]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/en"));

  for (const href of englishHrefs) {
    assert.ok(allowedEnglishPaths.has(href), `Unexpected EN route: ${href}`);
  }

  assert.ok(!homepageSource.includes("/de/ressourcen/"));
  assert.ok(!homepageSource.includes("FAQPage"));
  assert.ok(!homepageSource.includes("AggregateRating"));
  assert.ok(!homepageSource.includes("Article"));

  const disallowedClaims = [
    "official EcoVadis partner",
    "official IntegrityNext partner",
    "guaranteed EcoVadis score",
    "ensure compliance",
    "guarantee compliance",
    "fully compliant",
    "certified ESG experts",
    "trusted by",
    "AI-powered"
  ];

  for (const claim of disallowedClaims) {
    assert.ok(!homepageSource.toLowerCase().includes(claim.toLowerCase()), claim);
  }
});

test("homepage preserves optimized local imagery without adding dependencies", () => {
  // The service cards moved to full-bleed plates driven by the shared
  // home-sections/service-images mapping, so they no longer read from
  // evipaceImages.services here; that mapping is covered separately below.
  const expectedAssets = [
    "evipaceImages.hero",
    "evipaceImages.questionnaireForward",
    "evipaceImages.howItWorks",
    "evipaceImages.industrialBreak"
  ];

  for (const asset of expectedAssets) {
    assert.ok(homepageSource.includes(asset), asset);
  }

  assert.ok(homepageSource.includes('import Image from "next/image"'));
  assert.ok(!homepageSource.includes("use client"));
  assert.ok(!homepageSource.includes('from "../Reveal"'));
});

test("hero leads with the approved tagline and keeps the former heading as copy", () => {
  const heroSource = homeFiles.includes("HomeHero.tsx")
    ? sectionSources[homeFiles.indexOf("HomeHero.tsx")]
    : "";
  const normalizedHero = heroSource.replace(/\s+/g, " ");

  // Exactly one semantic h1, carrying the approved tagline as a
  // deliberate two-line composition.
  assert.equal(heroSource.match(/<h1/g)?.length, 1);
  assert.ok(normalizedHero.includes('id="hero-title"'));
  assert.ok(
    normalizedHero.includes(
      '<span className="hero-desk__title-line">ESG, done</span>'
    )
  );
  assert.ok(
    normalizedHero.includes(
      '<span className="hero-desk__title-line">faster.</span>'
    )
  );

  // The previous heading survives as visible supporting copy, not as a
  // second heading.
  assert.ok(
    normalizedHero.includes(
      'className="hero-desk__lead mt-6"> Your customer asked for ESG data. We help you get it done.'
    )
  );
  assert.ok(!normalizedHero.includes("<h2"));

  // The secondary paragraph stays in the markup and is hidden with CSS
  // below the desktop breakpoint, never deleted from the content.
  assert.ok(normalizedHero.includes('className="hero-desk__body-secondary"'));
  assert.ok(normalizedHero.includes("evipace takes care of the practical ESG work"));

  // CTA labels and destinations are unchanged.
  assert.ok(normalizedHero.includes('href="/en/send-request"'));
  assert.ok(normalizedHero.includes("Send your ESG request"));
  assert.ok(normalizedHero.includes('href="#services"'));
  assert.ok(normalizedHero.includes("See what we handle"));

  // The hero stays server-rendered.
  assert.ok(!heroSource.includes("use client"));
});

test("German hero mirrors the approved hierarchy in its own locale", () => {
  const normalizedGerman = germanHomeSource.replace(/\s+/g, " ");

  assert.equal(germanHomeSource.match(/<h1/g)?.length, 1);
  assert.ok(
    normalizedGerman.includes(
      '<span className="hero-desk__title-line">ESG, schneller</span>'
    )
  );
  assert.ok(
    normalizedGerman.includes(
      '<span className="hero-desk__title-line">erledigt.</span>'
    )
  );
  assert.ok(
    normalizedGerman.includes(
      'className="hero-desk__lead mt-6"> ESG-Anforderungen erledigen'
    )
  );
  assert.ok(normalizedGerman.includes('className="hero-desk__body-secondary"'));
  assert.ok(normalizedGerman.includes('href={SEND_REQUEST_HREF}'));
  assert.ok(normalizedGerman.includes("ESG-Anfrage senden"));
  assert.ok(normalizedGerman.includes('href="#leistungen"'));
  assert.ok(normalizedGerman.includes("Leistungen ansehen"));
  assert.ok(!normalizedGerman.includes("ESG, done faster"));
});
