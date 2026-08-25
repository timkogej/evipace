import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(new URL("../", import.meta.url).pathname);
const resourceRoot = path.join(root, "app/[locale]/ressourcen");
const resourceComponentRoot = path.join(root, "components/evipace/resources");

const [
  registrySource,
  metadataSource,
  sitemapSource,
  navigationSource,
  navbarSource,
  hubRouteSource,
  hubSource,
  webPageSchemaSource
] = await Promise.all([
  readFile(path.join(root, "lib/seo/page-registry.ts"), "utf8"),
  readFile(path.join(root, "lib/seo/build-metadata.ts"), "utf8"),
  readFile(path.join(root, "app/sitemap.ts"), "utf8"),
  readFile(path.join(root, "lib/site-navigation.ts"), "utf8"),
  readFile(path.join(root, "components/evipace/Navbar.tsx"), "utf8"),
  readFile(path.join(resourceRoot, "page.tsx"), "utf8"),
  readFile(path.join(resourceComponentRoot, "GermanResourceHub.tsx"), "utf8"),
  readFile(path.join(root, "lib/seo/schema/webpage.ts"), "utf8")
]);

const resourceInventory = [
  "/de/ressourcen/welche-esg-daten-kunden-lieferanten",
  "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
  "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
  "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
  "/de/ressourcen/esg-nachweise-checkliste",
  "/de/ressourcen/esg-nachweise-lieferanten",
  "/de/ressourcen/ecovadis-dokumente-nachweise",
  "/de/ressourcen/integritynext-einladung-lieferanten",
  "/de/ressourcen/scope-1-2-3-einfach-erklaert",
  "/de/ressourcen/scope-1-2-daten-berechnung",
  "/de/ressourcen/scope-1-2-datenerfassungs-vorlage",
  "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
  "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen",
  "/de/ressourcen/environmental-policy-erstellen",
  "/de/ressourcen/supplier-code-of-conduct-erstellen"
];

function localeRegistryBlock(locale) {
  const start = registrySource.indexOf(`  ${locale}: {`);
  assert.notEqual(start, -1);
  const next = locale === "en" ? "de" : locale === "de" ? "sl" : null;
  const end = next ? registrySource.indexOf(`\n  ${next}:`, start + 1) : -1;
  return end === -1 ? registrySource.slice(start) : registrySource.slice(start, end);
}

test("hub has exact German metadata, English pairing, and registry-driven indexability", () => {
  const germanRegistry = localeRegistryBlock("de").replace(/\s+/g, " ");
  const englishRegistry = localeRegistryBlock("en").replace(/\s+/g, " ");

  assert.ok(germanRegistry.includes("resourcesHub: {"));
  assert.ok(germanRegistry.includes('title: "ESG-Ressourcen für Lieferanten & Unternehmen | evipace"'));
  assert.ok(germanRegistry.includes('description: "Praktische ESG-Leitfäden, Checklisten und Tools für Lieferanten und produzierende Unternehmen – von Kundenfragebögen und Nachweisen bis Scope 1 & 2 und VSME."'));
  assert.ok(germanRegistry.includes('path: "/de/ressourcen"'));
  assert.ok(englishRegistry.includes("resourcesHub: {"));
  assert.ok(englishRegistry.includes('path: "/en/resources"'));
  assert.ok(!localeRegistryBlock("sl").includes("resourcesHub"));

  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(metadataSource.includes('languages["x-default"]'));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
  assert.equal((registrySource.match(/path: "\/de\/ressourcen"\s*[,}]/g) ?? []).length, 1);
  assert.equal((registrySource.match(/path: "\/en\/resources"\s*[,}]/g) ?? []).length, 1);
});

test("hub route is German-only and emits one coherent CollectionPage graph", () => {
  for (const marker of [
    'const PAGE_KEY = "resourcesHub"',
    "buildPageMetadata(locale, PAGE_KEY)",
    "isPageReachable(locale, PAGE_KEY)",
    'locale !== "de"',
    "buildOrganizationSchema()",
    "buildWebsiteSchema()",
    'buildWebPageSchema(locale, PAGE_KEY, "CollectionPage")',
    "buildBreadcrumbListSchema"
  ]) {
    assert.ok(hubRouteSource.includes(marker), marker);
  }

  assert.ok(webPageSchemaSource.includes('"WebPage" | "CollectionPage"'));
  assert.equal((hubRouteSource.match(/buildWebPageSchema\(/g) ?? []).length, 1);
  for (const forbidden of [
    "buildArticleSchema",
    "BlogPosting",
    "FAQPage",
    "HowTo",
    "ItemList",
    "buildServiceSchema",
    "Dataset",
    '"@type": "Person"',
    "datePublished",
    "dateModified"
  ]) {
    assert.ok(!hubRouteSource.includes(forbidden), forbidden);
  }
});

test("approved hub structure and operational copy are present", () => {
  const requiredMarkers = [
    "Praktische ESG-Ressourcen für Lieferanten.",
    "Keine Theorie-Sammlung.",
    "START HERE",
    "ANFRAGE VERSTEHEN",
    "VERANTWORTLICHE FINDEN",
    "ANFRAGE ABARBEITEN",
    "KUNDENANFRAGEN",
    "NACHWEISE & PLATTFORMEN",
    "Aussage → Quelle → Nachweis",
    "Scope verstehen. Daten sammeln. Berechnung vorbereiten.",
    "Nachhaltigkeitsdaten strukturiert vorbereiten.",
    "TOOLS & CHECKLISTEN",
    "EIN SYSTEM STATT EINZELNER ANTWORTEN",
    "Praktisch, nachvollziehbar und quellengestützt.",
    "VON DER RESSOURCE ZUR UMSETZUNG",
    "STARTEN SIE MIT DER ANFRAGE",
    "Der Kunde hat bereits gefragt?"
  ];

  for (const marker of requiredMarkers) {
    assert.ok(hubSource.includes(marker), marker);
  }

  assert.equal((hubSource.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(hubSource.includes("allChecklistItems.length"));
  assert.ok(hubSource.includes("Fortschritt lokal gespeichert · Druckbar"));
  assert.ok(hubSource.includes("Kein Login · lokale Speicherung · druckbar"));
  assert.ok(!hubSource.includes("Finden Sie die Ressource nach Ihrer konkreten Aufgabe."));
});

test("all fifteen genuine resources and only genuine commercial bridges are linked", () => {
  for (const href of resourceInventory) {
    assert.ok(hubSource.includes(`"${href}"`), href);
  }

  for (const href of [
    "/de/send-request",
    "/de/esg-kundenanfragen",
    "/de/scope-1-2-berechnung",
    "/de/vsme-nachhaltigkeitsbericht",
    "/de/methodology"
  ]) {
    assert.ok(hubSource.includes(`"${href}"`), href);
  }

  for (const forbidden of [
    "/en/resources",
    "/sl/ressourcen",
    "Coming soon",
    "Demnächst",
    "Lesezeit",
    "Blog",
    "Magazin"
  ]) {
    assert.ok(!hubSource.includes(forbidden), forbidden);
  }
});

test("German navigation and footer expose one current-aware hub destination", () => {
  const resourcesDirectory = navigationSource.slice(
    navigationSource.indexOf("const deResources"),
    navigationSource.indexOf("const enServices")
  );
  const germanFooter = navigationSource.slice(
    navigationSource.indexOf('title: "Ressourcen"'),
    navigationSource.indexOf('title: "Unternehmen"')
  );

  assert.equal((resourcesDirectory.match(/pageKey: "resourcesHub"/g) ?? []).length, 1);
  assert.equal((resourcesDirectory.match(/label: "Alle Ressourcen"/g) ?? []).length, 1);
  assert.equal((germanFooter.match(/label: "Alle Ressourcen"/g) ?? []).length, 1);
  assert.ok(navigationSource.includes("directory.actions?.some"));
  assert.ok(navbarSource.includes("directory.actions.map"));
  assert.ok(navbarSource.includes('aria-current={current ? "page" : undefined}'));
  assert.ok(localeRegistryBlock("en").includes("resourcesHub"));
});

test("all fifteen resource pages link visible and structured breadcrumbs through the hub", async () => {
  const routeEntries = await readdir(resourceRoot, { withFileTypes: true });
  const articleDirectories = routeEntries.filter((entry) => entry.isDirectory());
  assert.equal(articleDirectories.length, 15);

  for (const directory of articleDirectories) {
    const route = await readFile(path.join(resourceRoot, directory.name, "page.tsx"), "utf8");
    assert.ok(route.includes('{ name: "Ressourcen", path: "/de/ressourcen" }'), directory.name);
  }

  const componentFiles = (await readdir(resourceComponentRoot))
    .filter((name) => name.endsWith("Guide.tsx"));
  assert.equal(componentFiles.length, 15);
  for (const filename of componentFiles) {
    const source = await readFile(path.join(resourceComponentRoot, filename), "utf8");
    assert.ok(source.includes('href="/de/ressourcen"'), filename);
  }
});
