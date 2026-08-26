import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = new URL("../", import.meta.url);
const repo = new URL(".", root).pathname;
const expectedHead = "c2f43d5b03bbd0473a450c31b1151c927304aff6";

const files = {
  meetingHero: "components/evipace/hero-meeting/MeetingHero.tsx",
  enHero: "components/evipace/english-home/HomeHero.tsx",
  deHome: "components/evipace/GermanHomePage.tsx",
  registry: "lib/evipace-images.ts",
  availability: "lib/evipace-image-availability.ts",
  globals: "app/globals.css",
  desktop: "public/images/evipace/homepage/hero-meeting-desktop.webp",
  mobile: "public/images/evipace/homepage/hero-meeting-mobile.webp",
  rawDesktop: "public/images/evipace/homepage/evipace-hero-meeting.png",
  rawMobile: "public/images/evipace/homepage/evipace-hero-meeting-mobile.png"
};

const oldEvidenceHashes = {
  "components/evipace/hero-evidence-desk/EvidenceDeskHero.tsx":
    "0d769218ea90d82fb72d0b5c7af35efa563eb04ada159f377c775afbc93229bf",
  "components/evipace/hero-evidence-desk/process-labels.ts":
    "59016f28310f4058809d1097aff5277b9835e004d4e13fd2ad61707c1eedd3d4",
  "public/images/evipace/homepage/hero-evidence-desk-desktop.webp":
    "0430937eb073b613ad19a807b6078a61e6cf53026644a4df9628b06bc3a609fd",
  "public/images/evipace/homepage/hero-evidence-desk-mobile.webp":
    "8d79331f332aea9596c69a5f48c1b5c33316c29e26349048934e034fa0f95006"
};

const protectedSeoAndRouteFiles = [
  "app/[locale]/page.tsx",
  "app/[locale]/layout.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "lib/seo/page-registry.ts",
  "lib/seo/build-metadata.ts",
  "lib/seo/schema/organization.ts",
  "lib/seo/schema/website.ts",
  "lib/seo/schema/webpage.ts"
];

function pathOf(file) {
  return new URL(file, root);
}

function source(file) {
  return readFile(pathOf(file), "utf8");
}

function hashFile(file) {
  return createHash("sha256").update(readFileSync(pathOf(file))).digest("hex");
}

function git(args) {
  return execFileSync("git", args, { cwd: repo, encoding: "utf8" }).trim();
}

function extractMeetingCss(sourceText) {
  const start = sourceText.indexOf("   Homepage hero \u2014 meeting photograph");
  assert.ok(start > -1, "meeting hero CSS block not found");
  const next = sourceText.indexOf("   Homepage sections \u2014 evidence board", start);
  return sourceText.slice(start, next);
}

test("MeetingHero is a static shared server component", async () => {
  const hero = await source(files.meetingHero);

  assert.ok(hero.includes("export function MeetingHero"));
  assert.ok(hero.includes("children: ReactNode"));
  assert.ok(hero.includes("getImageProps"));
  assert.ok(hero.includes("<picture className=\"meeting-hero__picture\">"));
  assert.ok(hero.includes('media="(min-width: 1024px)"'));
  assert.ok(hero.includes('media="(max-width: 1023.98px)"'));
  assert.ok(hero.includes('sizes={desktopSizes}'));
  assert.ok(hero.includes('sizes={mobileImageProps.sizes}'));
  assert.ok(hero.includes('fetchPriority="high"'));
  assert.ok(hero.includes('loading="eager"'));
  assert.ok(hero.includes('className="meeting-hero__image"'));
  assert.ok(!hero.includes('"use client"'));
  assert.ok(!hero.includes("'use client'"));
  assert.ok(!hero.includes("framer-motion"));
  assert.ok(!hero.includes("motion."));
  assert.ok(!hero.includes("IntersectionObserver"));
  assert.ok(!hero.includes("<svg"));
  assert.ok(!hero.includes("<path"));
  assert.ok(!hero.includes("process-labels"));
  assert.ok(!hero.includes("heroProcessLabels"));
});

test("active EN and DE home heroes use the shared meeting component", async () => {
  const [en, de] = await Promise.all([source(files.enHero), source(files.deHome)]);

  assert.ok(en.includes('import { MeetingHero } from "../hero-meeting/MeetingHero"'));
  assert.ok(de.includes('import { MeetingHero } from "./hero-meeting/MeetingHero"'));
  assert.ok(en.includes("<MeetingHero"));
  assert.ok(de.includes("<MeetingHero"));
  assert.ok(!en.includes("EvidenceDeskHero"));
  assert.ok(!de.includes("EvidenceDeskHero"));
  assert.ok(!en.includes("hero-desk"));
  assert.ok(!de.includes("hero-desk"));

  assert.equal(en.match(/<h1/g)?.length, 1);
  assert.equal(de.match(/<h1/g)?.length, 1);
  assert.ok(en.includes('id="hero-title"'));
  assert.ok(de.includes('id="hero-title"'));
  assert.ok(en.includes("ESG, done faster."));
  assert.ok(de.includes("ESG, schneller erledigt."));

  assert.ok(en.includes("Customer questionnaires, emissions data, evidence, policies"));
  assert.ok(en.includes("Evipace takes care of the practical ESG work"));
  assert.ok(en.includes('href="/en/send-request"'));
  assert.ok(en.includes("Send your ESG request"));
  assert.ok(en.includes('href="#services"'));
  assert.ok(en.includes("See what we handle"));
  assert.ok(en.includes("Customer requests · ESG questionnaires"));

  assert.ok(de.includes("Ihre Kunden verlangen ESG-Daten"));
  assert.ok(de.includes("Wir strukturieren die Informationen"));
  assert.ok(de.includes("href={SEND_REQUEST_HREF}"));
  assert.ok(de.includes("ESG-Anfrage senden"));
  assert.ok(de.includes('href="#leistungen"'));
  assert.ok(de.includes("Leistungen ansehen"));
  assert.ok(de.includes("Kundenanfragen · Fragebögen"));
});

test("meeting assets exist, decode and keep exact approved dimensions", async () => {
  assert.ok(existsSync(pathOf(files.desktop)));
  assert.ok(existsSync(pathOf(files.mobile)));
  assert.ok(!existsSync(pathOf(files.rawDesktop)));
  assert.ok(!existsSync(pathOf(files.rawMobile)));

  const [desktop, mobile] = await Promise.all([
    sharp(pathOf(files.desktop).pathname).metadata(),
    sharp(pathOf(files.mobile).pathname).metadata()
  ]);

  assert.equal(desktop.format, "webp");
  assert.equal(desktop.width, 3840);
  assert.equal(desktop.height, 2160);
  assert.equal(mobile.format, "webp");
  assert.equal(mobile.width, 941);
  assert.equal(mobile.height, 1672);
});

test("image registry and availability point the active hero at meeting assets", async () => {
  const [registry, availability] = await Promise.all([
    source(files.registry),
    source(files.availability)
  ]);

  assert.ok(registry.includes('src: `${homepageBase}/hero-meeting-desktop.webp`'));
  assert.ok(registry.includes('mobileSrc: `${homepageBase}/hero-meeting-mobile.webp`'));
  assert.ok(registry.includes("width: 3840"));
  assert.ok(registry.includes("height: 2160"));
  assert.ok(registry.includes("mobileWidth: 941"));
  assert.ok(registry.includes("mobileHeight: 1672"));
  assert.ok(registry.includes('alt: ""'));
  assert.ok(registry.includes('sizes: "100vw"'));
  assert.ok(registry.includes('mobileSizes: "100vw"'));
  assert.ok(availability.includes("hasPublicAsset(evipaceImages.hero.src)"));
  assert.ok(
    availability.includes(
      "hasPublicAsset(evipaceImages.hero.mobileSrc ?? evipaceImages.hero.src)"
    )
  );
});

test("meeting hero CSS is isolated, static and art-directed", async () => {
  const css = extractMeetingCss(await source(files.globals));

  assert.ok(css.includes(".meeting-hero {"));
  assert.ok(css.includes(".meeting-hero__picture"));
  assert.ok(css.includes(".meeting-hero__image"));
  assert.ok(css.includes(".meeting-hero__scrim"));
  assert.ok(css.includes(".meeting-hero__inner"));
  assert.ok(css.includes(".meeting-hero__content"));
  assert.ok(css.includes("min-height: max("));
  assert.ok(css.includes("clamp(960px, 118svh, 1120px)"));
  assert.ok(css.includes("aspect-ratio: 941 / 1672"));
  assert.ok(css.includes("object-fit: contain"));
  assert.ok(css.includes("object-position: bottom center"));
  assert.ok(css.includes("@media (min-width: 1024px)"));
  assert.ok(css.includes("object-fit: cover"));
  assert.ok(css.includes("rgba(190, 178, 169, 0.98) 0%"));
  assert.ok(css.includes("rgba(190, 178, 169, 0.9) 24%"));
  assert.ok(css.includes("rgba(190, 178, 169, 0.42) 35%"));
  assert.ok(css.includes("rgba(190, 178, 169, 0) 48%"));
  assert.ok(css.includes(".meeting-hero__body-secondary"));
  assert.ok(css.includes("display: none"));
  assert.ok(css.includes("display: block"));
  assert.ok(!css.includes("hero-desk"));
  assert.ok(!css.includes("@keyframes"));
  assert.ok(!css.includes("animation"));
  assert.ok(!css.includes("transition"));
  assert.ok(!css.includes("backdrop-filter"));
  assert.ok(!css.includes("blur("));
  assert.ok(!css.includes("border-radius: 0.4375rem"));
});

test("old Evidence Desk fallback files and assets remain byte-identical", () => {
  for (const [file, expectedHash] of Object.entries(oldEvidenceHashes)) {
    assert.ok(existsSync(pathOf(file)), file);
    assert.equal(hashFile(file), expectedHash, file);
  }
});

test("routes, metadata and SEO sources were not modified for the meeting hero", () => {
  for (const file of protectedSeoAndRouteFiles) {
    assert.equal(
      git(["diff", "--stat", expectedHead, "--", file]),
      "",
      `${file} changed unexpectedly`
    );
  }
});
