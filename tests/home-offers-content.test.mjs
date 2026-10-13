import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const [home, offers, homePage, offersPage, reuseVisual, scrollProgress] = await Promise.all([
  read("components/evipace/home/content.ts"),
  read("components/evipace/offers/content.ts"),
  read("components/evipace/HomeLandingPage.tsx"),
  read("components/evipace/offers/OffersPage.tsx"),
  read("components/evipace/home/ReuseVisual.tsx"),
  read("components/evipace/home/ScrollProgress.tsx")
]);

test("the portal is always named as the client's Evipace portal", () => {
  for (const [label, source] of [["home", home], ["offers", offers]]) {
    assert.ok(!/\byour portal\b/i.test(source), `${label}: bare "your portal"`);
    assert.ok(!/\bIhrem Portal\b/.test(source), `${label}: bare "Ihrem Portal"`);
  }
  assert.ok(home.includes("your Evipace portal"));
  assert.ok(home.includes("Ihrem Evipace-Portal"));
  assert.ok(offers.includes("your Evipace portal"));
  assert.ok(offers.includes("Ihrem Evipace-Portal"));
});

test("homepage and Offers copy carries no prices, deadlines or partner claims", () => {
  for (const [label, source] of [["home", home], ["offers", offers]]) {
    assert.ok(!/[€$£]|\bEUR\b/.test(source), `${label}: currency`);
    assert.ok(!/\b\d+\s*(days?|hours?|Tage|Stunden|Werktage)\b/i.test(source), `${label}: deadline`);
    assert.ok(!/subsid|voucher|Förder|Gutschein/i.test(source), `${label}: subsidy`);
    assert.ok(!/(accredited|official|certified) (EcoVadis )?partner/i.test(source), `${label}: partner claim`);
  }
  assert.ok(home.includes("Evipace is not affiliated with EcoVadis"));
  assert.ok(offers.includes("not affiliated with, accredited by or endorsed by EcoVadis"));
});

test("the homepage has the agreed sections, the statement and one h1", () => {
  assert.equal((homePage.match(/<h1\b/g) ?? []).length, 1);
  for (const id of [
    "hero-title",
    "home-steps-title",
    "home-forwardable-title",
    "home-reuse-title",
    "home-example-title",
    "home-trust-title",
    "home-faq-title"
  ]) {
    assert.ok(homePage.includes(`id="${id}"`), id);
  }
  assert.ok(homePage.includes("copy.assurances.items"));
  assert.ok(homePage.includes("<ClosingCta"));
  assert.ok(!homePage.includes("copy.offers"));
  assert.ok(home.includes('"Illustrative example"'));
  // Scroll-linked motion goes through ScrollProgress, which leaves content
  // complete without JavaScript and under reduced motion.
  assert.ok(reuseVisual.includes('data-scroll-stage="reuse"'));
  assert.ok(reuseVisual.includes("<ScrollProgress"));
  assert.ok(homePage.includes("copy.statement"));
  assert.ok(scrollProgress.includes("prefers-reduced-motion: reduce"));
  assert.ok(!scrollProgress.includes("requestAnimationFrame"));
});

test("Offers has anchored Request, Desk and Report sections and no portal question", () => {
  assert.equal((offersPage.match(/<h1\b/g) ?? []).length, 1);
  for (const id of ['id: "request"', 'id: "desk"', 'id: "report"']) {
    assert.equal(offers.split(id).length - 1, 2, id);
  }
  assert.ok(offersPage.includes("id={offer.id}"));
  assert.ok(!/Do I have to use the portal/i.test(offers));
  assert.ok(
    offers.includes(
      "Files and information you send us are stored privately and used only to process your request."
    )
  );
});
