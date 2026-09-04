import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [
  registrySource,
  metadataSource,
  sitemapSource,
  routeSource,
  guideSource,
  toolSource,
  dataSource,
  hubSource,
  globalCssSource,
  evidenceGuideSource,
  questionnaireChecklistGuideSource,
  dataOwnersGuideSource,
  ecovadisGuideSource,
  commercialRequirementSource
] = await Promise.all([
  readFile(new URL("../lib/seo/page-registry.ts", import.meta.url), "utf8"),
  readFile(new URL("../lib/seo/build-metadata.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../app/[locale]/ressourcen/esg-nachweise-checkliste/page.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EsgEvidenceReadinessGuide.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/EsgEvidenceReadinessTool.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/esg-evidence-readiness-data.ts",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(
    new URL(
      "../components/evipace/resources/GermanResourceHub.tsx",
      import.meta.url
    ),
    "utf8"
  ),
  readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  readFile(
    new URL(
      "../components/evipace/resources/EsgEvidenceGuide.tsx",
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
      "../components/evipace/resources/EsgDataOwnersGuide.tsx",
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
      "../components/evipace/esg-fragebogen-lieferanten/RequirementCategories.tsx",
      import.meta.url
    ),
    "utf8"
  )
]);

const PAGE_PATH = "/de/ressourcen/esg-nachweise-checkliste";

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
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

function evidenceSectionsSource() {
  const start = dataSource.indexOf("export const evidenceSections");
  const end = dataSource.indexOf("export const allEvidenceChecks", start);
  assert.notEqual(start, -1);
  assert.notEqual(end, -1);
  return dataSource.slice(start, end);
}

function checkObjects() {
  return [
    ...evidenceSectionsSource().matchAll(
      /\{\s*id: "(\d{2})",\s*critical: (true|false|"conditional"),([\s\S]*?)\n      \}/g
    )
  ].map((match) => ({
    id: match[1],
    critical: match[2],
    body: match[3]
  }));
}

test("German evidence resource has exact metadata and a genuine English equivalent", () => {
  const germanRegistry = normalizeWhitespace(localeRegistryBlock("de"));
  const englishRegistry = normalizeWhitespace(localeRegistryBlock("en"));

  assert.ok(germanRegistry.includes("esgNachweiseCheckliste: {"));
  assert.ok(
    germanRegistry.includes(
      'title: "ESG-Nachweise prüfen: Checkliste für Lieferanten | Evipace"'
    )
  );
  assert.ok(
    germanRegistry.includes(
      'description: "Prüfen Sie ESG-Nachweise systematisch auf Aussage, Gültigkeit, Zeitraum, Scope und Nachvollziehbarkeit – mit einer praktischen Checkliste für Lieferanten."'
    )
  );
  assert.ok(germanRegistry.includes(`path: "${PAGE_PATH}"`));
  assert.ok(englishRegistry.includes("esgNachweiseCheckliste: {"));
  assert.ok(
    englishRegistry.includes(
      'path: "/en/resources/esg-evidence-readiness-check"'
    )
  );
  assert.ok(!localeRegistryBlock("sl").includes("esgNachweiseCheckliste"));
  assert.ok(metadataSource.includes("getActivePageGroup(pageKey)"));
  assert.ok(sitemapSource.includes("getAllPageKeys()"));
  assert.equal((registrySource.match(/path: "\/de\/ressourcen\/esg-nachweise-checkliste"/g) ?? []).length, 1);
});

test("route is German-only and uses restrained resource Article schema", () => {
  for (const marker of [
    'const PAGE_KEY = "esgNachweiseCheckliste"',
    "buildPageMetadata(locale, PAGE_KEY)",
    "isPageReachable(locale, PAGE_KEY)",
    'locale !== "de"',
    "buildOrganizationSchema()",
    "buildWebsiteSchema()",
    "buildWebPageSchema(locale, PAGE_KEY)",
    "buildArticleSchema(locale, PAGE_KEY, PAGE_TITLE)",
    "buildBreadcrumbListSchema"
  ]) {
    assert.ok(routeSource.includes(marker), marker);
  }

  for (const forbidden of [
    "FAQPage",
    "HowTo",
    "SoftwareApplication",
    "Dataset",
    "AggregateRating",
    "Review",
    "datePublished",
    "dateModified",
    '"@type": "Person"'
  ]) {
    assert.ok(!routeSource.includes(forbidden), forbidden);
  }
});

test("dataset has exactly six sections, thirty checks, unique IDs, five checks per section, and correct critical rules", () => {
  const sections = evidenceSectionsSource();
  const checks = checkObjects();

  assert.equal((sections.match(/number: "[1-6]"/g) ?? []).length, 6);
  assert.equal(checks.length, 30);
  const ids = [...new Set(checks.map((check) => check.id))].sort();
  assert.deepEqual(ids, [
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
  ]);
  for (let index = 0; index < 6; index += 1) {
    assert.deepEqual(
      ids.slice(index * 5, index * 5 + 5),
      Array.from({ length: 5 }, (_, offset) =>
        String(index * 5 + offset + 1).padStart(2, "0")
      )
    );
  }

  assert.deepEqual(
    checks.filter((check) => check.critical === "true").map((check) => check.id),
    ["01", "06", "08", "11", "16", "21", "24", "26", "30"]
  );
  assert.deepEqual(
    checks.filter((check) => check.critical === '"conditional"').map((check) => check.id),
    ["07", "27"]
  );
  assert.deepEqual(
    checks
      .filter((check) => check.body.includes("allowNotRelevant: true"))
      .map((check) => check.id),
    ["07", "27"]
  );
});

test("status, progress, red-flag, unresolved, and next-step engines encode the required qualitative behavior", () => {
  for (const title of [
    "Prüfung noch nicht abgeschlossen",
    "Vor Verwendung prüfen",
    "Klärung erforderlich",
    "Weitgehend vorbereitet",
    "Bereit für interne Bestätigung"
  ]) {
    assert.ok(dataSource.includes(title), title);
  }

  assert.ok(dataSource.includes("counts.answeredRelevant < counts.relevant"));
  assert.ok(dataSource.includes('answers[check.id] !== "na"'));
  assert.ok(dataSource.includes('answers[check.id] === "no"'));
  assert.ok(dataSource.includes('answers[check.id] === "unclear"'));
  assert.ok(dataSource.includes("isCriticalCheck(check)"));
  assert.ok(dataSource.includes("getSummaryCounts"));
  assert.ok(dataSource.includes("getSectionProgress"));
  assert.ok(dataSource.includes("getReadinessStatus"));
  assert.ok(dataSource.includes("getUnresolvedItems"));
  assert.ok(dataSource.includes("getNextSteps"));

  for (const title of [
    "Aussage nicht direkt belegt",
    "Aussage geht über den Nachweis hinaus",
    "Widersprüchliche Angaben",
    "Falsche Gesellschaft",
    "Konzernbezug unklar",
    "Falscher Standort oder Scope",
    "Falscher Zeitraum",
    "Zeitraum unvollständig",
    "Quelle nicht nachvollziehbar",
    "Berechnung nicht ausreichend dokumentiert",
    "Nachweis möglicherweise nicht mehr gültig",
    "Entwurf statt verabschiedetem Dokument",
    "Evidence Chain unvollständig",
    "Kennzahl nicht reproduzierbar",
    "Interne Bestätigung fehlt"
  ]) {
    assert.ok(dataSource.includes(title), title);
  }

  assert.ok(dataSource.includes('evidenceType === "calculation" && answers["19"] === "no"'));
  assert.ok(dataSource.includes('answers["07"] === "no" || answers["07"] === "unclear"'));
  assert.ok(dataSource.includes('answers["27"] === "no"'));
});

test("client tool uses localStorage safely, accessible controls, progressbar semantics, reset dialog, anchors, and print behavior", () => {
  assert.ok(toolSource.includes('"use client"'));
  assert.ok(toolSource.includes("EVIDENCE_READINESS_STORAGE_KEY"));
  assert.ok(toolSource.includes("window.localStorage.getItem"));
  assert.ok(toolSource.includes("window.localStorage.setItem"));
  assert.ok(toolSource.includes("window.localStorage.removeItem(storageKey)"));
  assert.ok(toolSource.includes("EN_EVIDENCE_READINESS_STORAGE_KEY"));
  assert.ok(!toolSource.includes("localStorage.clear"));
  assert.ok(toolSource.includes("parseStoredReadinessState"));
  assert.ok(toolSource.includes("serializeReadinessState"));
  assert.ok(dataSource.includes("return { evidenceLabel: \"\", answers: {} }"));

  for (const marker of [
    "<fieldset",
    "<legend",
    'type="radio"',
    'role="progressbar"',
    "aria-valuemin",
    "aria-valuemax",
    "aria-valuenow",
    "<dialog",
    "showModal()",
    "resetDialogRef",
    "window.print()",
    "evidence-print-summary",
    "ESG Evidence Readiness Check",
    "Erstellt mit der Evipace ESG-Nachweise-Checkliste",
    "focus({ preventScroll: true })",
    "Zu Punkt"
  ]) {
    assert.ok(toolSource.includes(marker), marker);
  }

  assert.ok(globalCssSource.includes("@media print"));
  assert.ok(globalCssSource.includes(".evidence-print-summary"));
  assert.ok(globalCssSource.includes(".evidence-screen-only"));
});

test("resource copy, links, breadcrumbs, privacy copy, and claim safety are present", () => {
  const normalizedGuide = normalizeWhitespace(`${guideSource} ${toolSource}`);
  for (const copy of [
    "ESG EVIDENCE READINESS CHECK",
    "Ist dieser ESG-Nachweis wirklich verwendbar?",
    "Nachweis jetzt prüfen",
    "Keine Registrierung. Keine Dokumente werden hochgeladen. Die Prüfung erfolgt ausschließlich in Ihrem Browser.",
    "Nehmen Sie einen konkreten Nachweis zur Hand.",
    "Ihre Daten bleiben bei Ihnen.",
    "Was ist ein ESG-Nachweis?",
    "Ein passendes Dokument ist nicht automatisch ein guter Nachweis",
    "Von der Kundenfrage bis zur Quelle",
    "Eine Richtlinie ist nicht dasselbe wie ein Nachweis der Umsetzung",
    "Bei Kennzahlen zählt die Datenkette",
    "Typische ESG-Nachweise in produzierenden Unternehmen",
    "Sie haben die Unterlagen – aber noch keine klare Evidence-Struktur?",
    "Aus Dokumenten werden belastbare Antworten."
  ]) {
    assert.ok(normalizedGuide.includes(copy), copy);
  }

  for (const href of [
    "/de/ressourcen",
    "/de/ressourcen/esg-nachweise-lieferanten",
    "/de/ressourcen/ecovadis-dokumente-nachweise",
    "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
    "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
    "/de/esg-fragebogen-lieferanten",
    "/de/send-request",
    "/de/methodology"
  ]) {
    assert.ok(guideSource.includes(`href="${href}"`) || guideSource.includes(`href={SEND_REQUEST_HREF}`), href);
  }

  assert.ok(guideSource.includes("Startseite"));
  assert.ok(guideSource.includes("Ressourcen"));
  assert.ok(guideSource.includes("ESG-Nachweise-Checkliste"));

  for (const forbidden of [
    "EcoVadis-approved",
    "IntegrityNext-approved",
    "Audit Report",
    "Validation Certificate",
    "Zertifikat</h1>",
    "AggregateRating",
    "garantiert"
  ]) {
    assert.ok(!guideSource.includes(forbidden), forbidden);
  }
});

test("hub and relevant backlinks expose the new resource without making it an orphan", () => {
  assert.ok(hubSource.includes(PAGE_PATH));
  assert.ok(hubSource.includes("ESG-Nachweise prüfen: Checkliste für Lieferanten"));
  assert.ok(hubSource.includes("INTERAKTIVER CHECK"));
  assert.ok(hubSource.includes("Evidence Check öffnen"));

  for (const [source, label] of [
    [evidenceGuideSource, "evidence guide"],
    [questionnaireChecklistGuideSource, "questionnaire checklist"],
    [dataOwnersGuideSource, "data owners guide"],
    [ecovadisGuideSource, "ecovadis guide"],
    [commercialRequirementSource, "commercial questionnaire page"]
  ]) {
    assert.ok(source.includes(PAGE_PATH), label);
  }
});
