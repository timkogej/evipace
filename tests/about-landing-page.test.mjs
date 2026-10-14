import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [route, page, css] = await Promise.all([
  read("app/[locale]/about/page.tsx"),
  read("components/evipace/about/AboutLandingPage.tsx"),
  read("components/evipace/about/AboutLandingPage.module.css")
]);

test("both About routes use the same localized page and retain schema", () => {
  assert.match(route, /<AboutLandingPage locale="en"/);
  assert.match(route, /<AboutLandingPage locale="de"/);
  assert.match(route, /<JsonLd graph=\{schemaGraph\}/);
});

test("About uses no photographs; illustrations are the site's own SVG", () => {
  assert.doesNotMatch(page, /next\/image|\/images\/evipace\/about\/|evipaceImages/);
  assert.ok(page.includes("<TrustIllustration"));
  assert.doesNotMatch(page, /data-photo-slot="about-founder"|founderPhoto|founderShade/);
});

test("the active About page keeps localized service paths, founder facts and limits", () => {
  for (const path of [
    "/en/esg-customer-requests", "/en/esg-questionnaire-support",
    "/en/ecovadis-support", "/en/integritynext-support",
    "/en/scope-1-2-calculation", "/en/vsme-sustainability-report",
    "/de/esg-kundenanfragen", "/de/esg-fragebogen-lieferanten",
    "/de/ecovadis-unterstuetzung", "/de/integritynext-unterstuetzung",
    "/de/scope-1-2-berechnung", "/de/vsme-nachhaltigkeitsbericht"
  ]) assert.ok(page.includes(path), path);
  assert.ok(page.includes("Tim Kogej"));
  assert.ok(page.includes("does not issue ESG certifications"));
  assert.ok(page.includes("vergibt keine ESG-Zertifizierungen"));
});

test("both locales retain a direct request path and contact alternative", () => {
  assert.ok(page.includes("`${prefix}/send-request`"));
  assert.ok(page.includes("publicContactEmail"));
  assert.ok(page.includes("An ESG request on your desk?"));
  assert.ok(page.includes("Eine ESG-Anfrage liegt auf Ihrem Tisch?"));
});

test("the founder section offers a direct call in both languages without a portrait placeholder", () => {
  assert.ok(page.includes('href="tel:+38668663410"'));
  assert.ok(page.includes("+386 68 663 410"));
  assert.ok(page.includes("Call Tim"));
  assert.ok(page.includes("Tim anrufen"));
  assert.ok(page.includes('id="founder-title"'));
  assert.ok(css.includes(".contact {"));
});

test("About follows the homepage layout and the example is labeled accurately", () => {
  assert.ok(page.includes('import h from "../HomeLandingPage.module.css"'));
  assert.ok(page.includes("<ClosingCta"));
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(css.includes("font-family: var(--font-gfs-didot)"));
  assert.ok(page.includes("Illustrative handover · not a client case"));
  assert.ok(page.includes("Beispielhafte Übergabe · kein Kundenfall"));
  assert.ok(page.includes("your team still needs to confirm"));
  assert.ok(page.includes("Ihr Team noch bestätigen muss"));
});
