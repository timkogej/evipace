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

test("the supplied full-resolution images are used in the first two positions", async () => {
  for (const [name, width, height] of [
    ["hero-team-review.png", 1122, 1402],
    ["focused-work-sunlit-office.png", 1448, 1086]
  ]) {
    const path = `public/images/evipace/about/${name}`;
    const image = await readFile(new URL(`../${path}`, import.meta.url));
    assert.ok(image.length > 1_000_000, `${name} was reduced unexpectedly`);
    assert.equal(image.readUInt32BE(16), width);
    assert.equal(image.readUInt32BE(20), height);
    assert.ok(page.includes(`/images/evipace/about/${name}`));
  }
  assert.doesNotMatch(page, /data-photo-slot="about-founder"|founderPhoto|founderShade/);
  assert.doesNotMatch(page, /evipaceImages\.founder/);
  assert.match(css, /\.whyPhoto\{aspect-ratio:4\/3/);
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
  assert.ok(page.includes("evipaceImages.industrialBreak.src"));
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
  assert.ok(css.includes(".founderContact{"));
});

test("About headings use the site's display font and the example is labeled accurately", () => {
  assert.ok(css.includes(".heroTitle,.sectionTitle{font-family:var(--font-gfs-didot)"));
  assert.ok(css.includes(".handoverGrid h3{font-family:var(--font-gfs-didot)"));
  assert.ok(!css.includes("--font-display"));
  assert.ok(page.includes("Illustrative handover · not a client case"));
  assert.ok(page.includes("Beispielhafte Übergabe · kein Kundenfall"));
  assert.ok(page.includes("your team still needs to confirm"));
  assert.ok(page.includes("Ihr Team noch bestätigen muss"));
});
