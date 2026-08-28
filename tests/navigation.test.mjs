import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(new URL("../", import.meta.url).pathname);

const [
  navigationSource,
  navbarSource,
  footerSource,
  layoutSource,
  registrySource,
  globalCssSource
] = await Promise.all([
  readFile(path.join(root, "lib/site-navigation.ts"), "utf8"),
  readFile(path.join(root, "components/evipace/Navbar.tsx"), "utf8"),
  readFile(path.join(root, "components/evipace/Footer.tsx"), "utf8"),
  readFile(path.join(root, "app/[locale]/layout.tsx"), "utf8"),
  readFile(path.join(root, "lib/seo/page-registry.ts"), "utf8"),
  readFile(path.join(root, "app/globals.css"), "utf8")
]);

const routeCatalog = navigationSource.slice(
  navigationSource.indexOf("export const pageRoutes"),
  navigationSource.indexOf("function route(")
);

const routeEntries = [
  ...routeCatalog.matchAll(
    /pageKey:\s*"([^"]+)"\s*,\s*href:\s*"([^"]+)"/gs
  )
].map((match) => ({ pageKey: match[1], href: match[2] }));

const hrefs = routeEntries.map((entry) => entry.href);

function routeFileFor(href) {
  const [, , ...segments] = href.split("/");
  return path.join(root, "app/[locale]", ...segments, "page.tsx");
}

async function getTsxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return getTsxFiles(fullPath);
      return entry.isFile() && entry.name.endsWith(".tsx") ? [fullPath] : [];
    })
  );
  return nested.flat();
}

test("the locale layout is the only site-chrome integration point", async () => {
  assert.ok(layoutSource.includes("<Navbar locale={activeLocale} />"));
  assert.ok(layoutSource.includes("<Footer locale={activeLocale} />"));
  assert.ok(layoutSource.includes("isSiteLocale(activeLocale)"));

  const files = await getTsxFiles(path.join(root, "components"));
  const pageFiles = await getTsxFiles(path.join(root, "app/[locale]"));
  const sources = await Promise.all(
    [...files, ...pageFiles]
      .filter(
        (file) =>
          !file.endsWith("/Navbar.tsx") &&
          !file.endsWith("/Footer.tsx") &&
          !file.endsWith("/layout.tsx")
      )
      .map(async (file) => ({ file, source: await readFile(file, "utf8") }))
  );

  for (const { file, source } of sources) {
    assert.ok(!source.includes("<Navbar"), `page-owned Navbar in ${file}`);
    assert.ok(!source.includes("<Footer"), `page-owned Footer in ${file}`);
  }
});

test("every chrome route maps to a real route and the reachability registry", async () => {
  assert.equal(routeEntries.length, 50);
  assert.equal(new Set(hrefs).size, hrefs.length);

  for (const entry of routeEntries) {
    await access(routeFileFor(entry.href));
    if (entry.pageKey === "sendRequest") {
      assert.match(registrySource, /en:\s*\["sendRequest"\]/);
      assert.match(registrySource, /de:\s*\["sendRequest"\]/);
    } else {
      assert.ok(
        registrySource.includes(`path: "${entry.href}"`),
        `registry is missing ${entry.href}`
      );
    }
  }
});

test("German services and resources use the exact genuine inventory", () => {
  const expectedServices = [
    "/de/esg-kundenanfragen",
    "/de/esg-fragebogen-lieferanten",
    "/de/ecovadis-unterstuetzung",
    "/de/integritynext-unterstuetzung",
    "/de/vsme-nachhaltigkeitsbericht",
    "/de/scope-1-2-berechnung"
  ];
  const expectedResources = [
    "/de/ressourcen",
    "/de/ressourcen/welche-esg-daten-kunden-lieferanten",
    "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
    "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
    "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
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

  for (const href of [...expectedServices, ...expectedResources]) {
    assert.ok(hrefs.includes(href), href);
  }

  for (const group of [
    "Kundenanfragen",
    "Plattformen",
    "Berichte & Emissionen",
    "Nachweise & Plattformen",
    "Carbon & Emissionen",
    "Berichterstattung"
  ]) {
    assert.ok(navigationSource.includes(`label: "${group}"`), group);
  }

  assert.equal(hrefs.filter((href) => href === "/de/ressourcen").length, 1);
  assert.ok(navigationSource.includes('label: "Alle Ressourcen"'));
});

test("English navigation remains deliberately smaller and route-correct", () => {
  const englishHrefs = hrefs.filter((href) => href.startsWith("/en"));
  assert.deepEqual(englishHrefs, [
    "/en",
    "/en/about",
    "/en/privacy",
    "/en/methodology",
    "/en/send-request",
    "/en/esg-customer-requests",
    "/en/esg-questionnaire-support",
    "/en/scope-1-2-calculation",
    "/en/ecovadis-support",
    "/en/integritynext-support",
    "/en/vsme-sustainability-report",
    "/en/resources",
    "/en/resources/customer-esg-questionnaire-received",
    "/en/resources/esg-data-customers-request-from-suppliers",
    "/en/resources/esg-evidence-for-suppliers",
    "/en/resources/ecovadis-documents-evidence",
    "/en/resources/integritynext-invitation-for-suppliers",
    "/en/resources/scope-1-2-data-calculation",
    "/en/resources/scope-1-2-3-explained",
    "/en/resources/vsme-data-sustainability-report",
    "/en/resources/esg-data-owners",
    "/en/resources/environmental-policy",
    "/en/resources/supplier-code-of-conduct",
    "/en/resources/reusable-esg-data"
  ]);
  assert.ok(navigationSource.includes('href: "/en#services"'));
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
  assert.ok(!navigationSource.includes("/en/ressourcen/"));
  assert.ok(navigationSource.includes('id: "resources",\n  label: "Resources"'));
  assert.ok(navigationSource.includes('matchPrefixes: ["/en/resources/"]'));
  assert.ok(navigationSource.includes('label: "All resources"'));
  assert.ok(!navigationSource.includes("/sl/"));
  assert.ok(!navigationSource.includes('label: "SL"'));
});

test("active groups and current items use route-group matching", () => {
  assert.ok(navigationSource.includes("getActiveNavigationSection"));
  assert.ok(navigationSource.includes('matchPrefixes: ["/de/ressourcen/"]'));
  assert.ok(navigationSource.includes("currentPath.startsWith(prefix)"));
  assert.ok(navigationSource.includes("directory.groups.some"));
  assert.ok(navigationSource.includes("directory.actions?.some"));
  assert.ok(navigationSource.includes("directLink?.section ?? null"));
  assert.ok(navbarSource.includes("activeSection === directory.id"));
  assert.ok(navbarSource.includes('aria-current={current ? "page" : undefined}'));
  assert.ok(navbarSource.includes("directory.actions.map"));

  for (const href of [
    "/de/esg-kundenanfragen",
    "/de/ecovadis-unterstuetzung",
    "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
    "/de/ressourcen/scope-1-2-3-einfach-erklaert",
    "/de/methodology",
    "/en/about"
  ]) {
    assert.ok(hrefs.includes(href), href);
  }
});

test("language switching uses page-key equivalence and an explicit homepage fallback", () => {
  assert.ok(navigationSource.includes("candidate.pageKey === currentRoute.pageKey"));
  assert.ok(navigationSource.includes('equivalent?.href ?? route(locale, "home")'));
  assert.ok(navigationSource.includes("isEquivalent: isCurrent || Boolean(equivalent)"));
  assert.ok(navbarSource.includes("unavailableTranslation"));
  assert.ok(footerSource.includes("unavailableTranslation"));
  assert.ok(!navigationSource.includes("replace(`/${currentLocale}`"));
});

test("desktop and mobile menus expose the required accessible behavior", () => {
  for (const token of [
    "aria-expanded={isOpen}",
    'event.key === "Escape"',
    'event.key !== "Tab"',
    'role="dialog"',
    'aria-modal="true"',
    'document.body.style.overflow = "hidden"',
    "safe-area-inset-bottom",
    "overscroll-contain"
  ]) {
    assert.ok(navbarSource.includes(token), token);
  }

  assert.ok(navbarSource.includes("pointerdown"));
  assert.ok(globalCssSource.includes(":focus-visible"));
  assert.ok(!navbarSource.includes("onMouseEnter"));
  assert.ok(!navbarSource.includes("onMouseLeave"));
});

test("footer has contact and genuine links without placeholders or fake legal routes", () => {
  assert.ok(navigationSource.includes("hello@evipace.com"));
  assert.ok(footerSource.includes("siteNavigation[locale]"));
  assert.ok(!footerSource.includes("#top"));
  assert.ok(navigationSource.includes("/en/privacy"));
  assert.ok(navigationSource.includes("/de/privacy"));
  assert.ok(footerSource.includes("CONSENT_SETTINGS_EVENT"));
  assert.ok(footerSource.includes("<button"));
  assert.ok(!navigationSource.includes("/datenschutz"));
  assert.ok(!navigationSource.includes("/impressum"));
  assert.ok(!navigationSource.includes("/terms"));
  assert.ok(!footerSource.includes('label: "SL"'));
  const germanFooter = navigationSource.slice(
    navigationSource.indexOf('title: "Ressourcen"'),
    navigationSource.indexOf('title: "Unternehmen"')
  );
  assert.ok(germanFooter.includes('label: "Alle Ressourcen"'));
  assert.ok(germanFooter.includes('route("de", "resourcesHub")'));
});

test("checklist print mode hides the global chrome", () => {
  const printCss = globalCssSource.slice(globalCssSource.indexOf("@media print"));
  assert.ok(printCss.includes(".site-header"));
  assert.ok(printCss.includes(".site-footer"));
  assert.ok(printCss.includes(".esg-checklist-page .checklist-screen-controls"));
});
