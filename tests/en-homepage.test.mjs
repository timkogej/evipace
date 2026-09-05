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
      'title: "ESG Consulting for Manufacturing Companies | Evipace"'
    )
  );
  assert.ok(
    englishRegistry.includes(
      '"Practical ESG consulting for manufacturing companies and suppliers: customer requests, questionnaires, Scope 1 & 2 and sustainability reporting prepared from real company data."'
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
  for (const line of ["ESG-Arbeit.", "Richtig gemacht.", "Schneller erledigt."]) {
    assert.ok(germanHomeSource.includes(line), line);
  }
  assert.ok(!germanHomeSource.includes("Your customer asked for ESG data"));
});

test("approved homepage sections, copy, workflow and CTAs are present", () => {
  const requiredCopy = [
    "ESG work.",
    "Done right.",
    "Done faster.",
    "Your ESG data is probably not missing.",
    "It is scattered.",
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
    "Collect once.",
    "Use many times.",
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
    "/en/resources/reusable-esg-data",
    // Platform assessments are named services with their own pages; the
    // services section links both directly rather than only mentioning them.
    "/en/ecovadis-support",
    "/en/integritynext-support"
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
  // The active hero is the animated Evipace mark — an inline SVG, not a
  // photograph — so it no longer reads from the registry. The registry's
  // `hero` entry stays in place for the meeting-hero rollback path.
  const expectedAssets = [
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

test("the hero leads with the approved headline as its only heading", () => {
  const heroSource = homeFiles.includes("HomeHero.tsx")
    ? sectionSources[homeFiles.indexOf("HomeHero.tsx")]
    : "";
  const normalizedHero = heroSource.replace(/\s+/g, " ");

  assert.equal(heroSource.match(/<h1/g)?.length, 1);
  assert.ok(normalizedHero.includes('id="hero-title"'));
  // Three sentences, one <span className="block"> each, inside the single
  // <h1>. The breaks are explicit so "faster." can never be stranded on a
  // line of its own at display size.
  assert.ok(
    normalizedHero.includes(
      '<span className="block">ESG work.</span>' +
        ' <span className="block">Done right.</span>' +
        ' <span className="block">Done faster.</span> </h1>'
    )
  );
  assert.ok(normalizedHero.includes("mark-hero__title"));
  assert.ok(!normalizedHero.includes("<h2"));
  assert.ok(!normalizedHero.includes("hero-desk"));
  assert.ok(normalizedHero.includes("<AnimatedMarkHero"));
  assert.ok(!normalizedHero.includes("<MeetingHero"));
  assert.ok(!normalizedHero.includes("meeting-hero"));

  assert.ok(!normalizedHero.includes('className="eyebrow"'));
  assert.ok(!normalizedHero.includes("ESG execution for manufacturing suppliers"));
  assert.ok(!normalizedHero.includes("hero-desk__lead"));
  assert.ok(!normalizedHero.includes("Your customer asked for ESG data."));
  assert.ok(!normalizedHero.includes("We help you get it done."));

  // The secondary paragraph stays in the markup and is hidden with CSS
  // below the desktop breakpoint, never deleted from the content.
  assert.ok(normalizedHero.includes('className="mark-hero__body-secondary"'));
  assert.ok(normalizedHero.includes("Evipace takes care of the practical ESG work"));

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
  // Three sentences, one <span className="block"> each, mirroring the
  // English hero's rhythm. Explicit breaks so no German line is left with
  // an orphaned word at display size.
  assert.ok(
    normalizedGerman.includes(
      '<span className="block">ESG-Arbeit.</span>' +
        ' <span className="block">Richtig gemacht.</span>' +
        ' <span className="block">Schneller erledigt.</span> </h1>'
    )
  );
  assert.ok(normalizedGerman.includes("mark-hero__title"));
  assert.ok(!normalizedGerman.includes("meeting-hero"));
  assert.ok(!normalizedGerman.includes("hero-desk"));
  assert.ok(!normalizedGerman.includes("hero-desk__lead"));
  assert.ok(!normalizedGerman.includes("ESG für produzierende Unternehmen</p>"));
  assert.ok(normalizedGerman.includes('className="mark-hero__body-secondary"'));
  assert.ok(normalizedGerman.includes('href={SEND_REQUEST_HREF}'));
  assert.ok(normalizedGerman.includes("ESG-Anfrage senden"));
  assert.ok(normalizedGerman.includes('href="#leistungen"'));
  assert.ok(normalizedGerman.includes("Leistungen ansehen"));
  assert.ok(!normalizedGerman.includes("ESG consulting for manufacturing"));
});
