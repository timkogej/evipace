import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

/**
 * Methodology, rebuilt in the homepage's centred layout. The page files keep
 * their copy and data; MethodologyParts.tsx and Methodology.module.css own the
 * layout. These checks guard the content and structure, not the styling.
 */
const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [english, german, parts, css] = await Promise.all([
  read("components/evipace/EnglishMethodologyPage.tsx"),
  read("components/evipace/GermanMethodologyPage.tsx"),
  read("components/evipace/methodology/MethodologyParts.tsx"),
  read("components/evipace/methodology/Methodology.module.css")
]);
const pages = [
  ["English", english],
  ["German", german]
];
const normalize = (value) => value.replace(/\s+/g, " ").trim();

test("each Methodology page renders exactly one h1, from the shared hero", () => {
  assert.equal((parts.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(parts.includes('id="methodology-title"'));
  for (const [label, source] of pages) {
    assert.equal((source.match(/<h1\b/g) ?? []).length, 0, label);
    assert.equal((source.match(/<MethodHero\b/g) ?? []).length, 1, label);
  }
});

test("the Section helper renders exactly one h2 in both of its variants", () => {
  const section = parts.slice(parts.indexOf("export function Section("), parts.indexOf("export function CheckList("));
  assert.equal((section.match(/<h2\b/g) ?? []).length, 2); // collapsible + open
  assert.ok(section.includes("if (collapsible)"));
});

test("EN and DE keep every section anchor, in the same order", () => {
  const ids = (source) => [...source.matchAll(/^\s{10}id="([\w-]+)"/gm)].map((m) => m[1]);
  assert.deepEqual(ids(english), [
    "principle", "process", "traceability", "emissions", "emissions-factors", "data-gaps",
    "platforms", "evidence", "policies", "technology", "responsibility", "standards", "vsme",
    "documents", "deliverables", "boundaries", "contact"
  ]);
  assert.deepEqual(ids(german), [
    "grundprinzip", "ablauf", "nachvollziehbarkeit", "emissionen", "emissionsfaktoren",
    "datenluecken", "plattformen", "nachweise", "richtlinien", "technologie", "verantwortung",
    "standards", "vsme", "unterlagen", "output", "grenzen", "kontakt"
  ]);
});

test("the Methodology keeps its core copy", () => {
  const englishCopy = [
    "How company data becomes reliable ESG work.",
    "Our first principle: source before statement.",
    "We turn your existing records into ESG answers and calculations",
    "Direct emissions from owned or controlled sources.",
    "Understand the requirement",
    "Evipace is responsible for",
    "Have a concrete ESG requirement?",
    "Show us what you are working with.",
    "Questionnaires · Emissions · Reporting · Evidence · Policies",
    "This date reflects the latest substantive review of this"
  ];
  const germanCopy = [
    "So wird aus Unternehmensdaten belastbare ESG-Arbeit.",
    "Unser Grundprinzip: Quelle vor Aussage.",
    "Wir machen aus vorhandenen Unternehmensdaten prüfbare ESG-Antworten",
    "Direkte Emissionen aus eigenen oder kontrollierten Quellen.",
    "Aufgabe verstehen",
    "Sie haben eine konkrete ESG-Anforderung?",
    "Was Sie am Ende erhalten."
  ];
  for (const copy of englishCopy) assert.ok(normalize(english).includes(normalize(copy)), copy);
  for (const copy of germanCopy) assert.ok(normalize(german).includes(normalize(copy)), copy);
});

test("the closing CTA still leads to the request form", () => {
  assert.ok(english.includes('const SEND_REQUEST_HREF = "/en/send-request"'));
  assert.ok(german.includes('const SEND_REQUEST_HREF = "/de/send-request"'));
  for (const [label, source] of pages) {
    assert.ok(source.includes("formHref={SEND_REQUEST_HREF}"), label);
    assert.ok(source.includes("<ClosingCta"), label);
  }
  assert.ok(english.includes('formLabel="Send your ESG request"'));
  assert.ok(german.includes('formLabel="ESG-Anfrage senden"'));
  assert.ok((german.match(/className=\{m\.link\}/g) ?? []).length >= 3);
});

test("no photos of people and no hidden copy", () => {
  for (const [label, source] of pages) {
    assert.ok(!source.includes("MethodologyImages"), label);
    assert.ok(!source.includes("next/image"), label);
    for (const bad of ["truncate", "line-clamp", "<br"]) {
      assert.ok(!source.includes(bad), `${label} uses ${bad}`);
    }
  }
});

test("German is marked for the shared locale styles; reveal stays progressive", () => {
  assert.ok(german.includes('data-locale="de"'));
  assert.ok(english.includes('data-locale="en"'));
  assert.ok(parts.includes('import { RevealOnView } from "../home/RevealOnView"'));
  assert.ok(css.includes("prefers-reduced-motion: reduce"));
});
