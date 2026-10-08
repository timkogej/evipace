import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { loadProjectModule as load } from "./helpers/load-project-module.mjs";

const registry = load("lib/seo/page-registry.ts");
const { buildPageMetadata } = load("lib/seo/build-metadata.ts");
const sitemap = load("app/sitemap.ts").default;
const { getServiceBuyerQuestions } = load("lib/seo/service-buyer-questions.ts");

test("every registered EN/DE page has reciprocal metadata and sitemap alternates", () => {
  const urls = sitemap();
  const seen = new Set();
  for (const key of registry.getAllPageKeys()) {
    const group = registry.getActivePageGroup(key);
    assert.equal(group.length, 2, key);
    for (const {locale,entry} of group) {
      assert.ok(!seen.has(entry.path)); seen.add(entry.path);
      assert.ok(registry.isPageReachable(locale,key));
      const meta = buildPageMetadata(locale,key);
      assert.equal(meta.alternates.canonical,entry.path);
      assert.ok(meta.title && meta.description);
      const row = urls.find(row => row.url === `https://evipace.com${entry.path}`);
      assert.ok(row,entry.path);
      for (const other of group) {
        assert.equal(meta.alternates.languages[other.locale],other.entry.path);
        assert.equal(row.alternates.languages[other.locale],`https://evipace.com${other.entry.path}`);
      }
      assert.equal(meta.alternates.languages["x-default"],group.find(x=>x.locale==="en").entry.path);
    }
  }
  assert.equal(seen.size,urls.length);
  for (const locale of ["en","de"]) {
    assert.equal(buildPageMetadata(locale,"sendRequest").robots.index,false);
    assert.ok(!urls.some(row => row.url.endsWith(`/${locale}/send-request`)));
  }
  assert.equal(buildPageMetadata("sl","home").robots.index,false);
});

test("all six service pairs have distinct buyer answers without invented prices or deadlines", () => {
  const keys = ["esgKundenanfragen","esgFragebogenLieferanten","ecovadisUnterstuetzung","integrityNextUnterstuetzung","scope12Berechnung","vsmeNachhaltigkeitsbericht"];
  for (const locale of ["en","de"]) {
    const answers = new Set();
    for (const key of keys) {
      const questions = getServiceBuyerQuestions(locale,key);
      assert.equal(questions.length,2);
      for (const {question,answer} of questions) {
        assert.ok(question.endsWith("?"));
        assert.ok(answer.length>150);
        assert.ok(!answers.has(answer)); answers.add(answer);
        assert.doesNotMatch(answer, /€|\$|within \d+ days|in \d+ Tagen/);
        if (locale === "en") assert.doesNotMatch(answer,/Unternehmen|Nachweise|Anfrage/);
      }
    }
  }
});

test("schema identifies supported entities and serializes text without breaking the script", () => {
  const {JsonLd} = load("lib/seo/schema/json-ld.tsx");
  const organization = load("lib/seo/schema/organization.ts").buildOrganizationSchema();
  const about = load("lib/seo/schema/webpage.ts").buildWebPageSchema("de","about");
  assert.equal(about["@type"],"AboutPage");
  assert.equal(about.mainEntity["@id"],organization["@id"]);
  assert.equal(organization.location.name,"Slovenia");
  assert.equal(organization.founder.name,"Tim Kogej");
  assert.deepEqual(organization.sameAs,["https://www.linkedin.com/company/evipace"]);
  for (const field of ["award","aggregateRating","numberOfEmployees","foundingDate"]) assert.ok(!(field in organization));
  const html = renderToStaticMarkup(createElement(JsonLd,{graph:[{name:"</script><script>alert(1)</script>"}]}));
  assert.equal((html.match(/<script/g)||[]).length,1);
  const json = JSON.parse(html.slice(html.indexOf(">")+1,html.lastIndexOf("</script>")));
  assert.equal(json["@graph"][0].name,"</script><script>alert(1)</script>");
});

test("VSME revision is shared and limited to an actual content update", () => {
  const status = load("lib/seo/voluntary-standard-status.ts").voluntaryStandardStatus;
  assert.equal(status.checkedOn,"2026-10-04");
  for (const language of ["en","de"]) {
    assert.match(status[language],/2026\/1560/);
    assert.match(status[language],/2027/);
    const entry = registry.getPageMetadataEntry(language,"vsmeDatenNachhaltigkeitsbericht");
    const schema = load("lib/seo/schema/article.ts").buildArticleSchema(language,"vsmeDatenNachhaltigkeitsbericht",entry.title);
    assert.equal(schema.dateModified,"2026-10-04");
    assert.ok(!schema.datePublished);
  }
});
