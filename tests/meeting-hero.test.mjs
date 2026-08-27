import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = new URL("../", import.meta.url);

/**
 * The meeting photograph is no longer the active homepage hero — the animated
 * Evipace mark is (see animated-mark-hero.test.mjs). This file's job changed
 * with it: it now pins the meeting hero as a complete, working rollback
 * implementation. Component, both plates, registry entry and CSS block all
 * stay exactly as approved, so restoring the photographic hero is a matter of
 * pointing the two locale heroes back at <MeetingHero>.
 */

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

/** Rollback implementations, frozen byte-for-byte. */
const rollbackHashes = {
  "components/evipace/hero-meeting/MeetingHero.tsx":
    "3a8bf8dce2ac0caa1ce563af5971d81ec957a4dd3176508bf5e78f40e7674987",
  "public/images/evipace/homepage/hero-meeting-desktop.webp":
    "382ee4a74446d1759557422f925b2e0c68b395bc3bcfe5af6dc503b38e9fe9c3",
  "public/images/evipace/homepage/hero-meeting-mobile.webp":
    "633aeb8fd69d79d4d8f165740daa4c87434756846a390d0c7f2b192398c98763",
  "components/evipace/hero-evidence-desk/EvidenceDeskHero.tsx":
    "0d769218ea90d82fb72d0b5c7af35efa563eb04ada159f377c775afbc93229bf",
  "components/evipace/hero-evidence-desk/process-labels.ts":
    "59016f28310f4058809d1097aff5277b9835e004d4e13fd2ad61707c1eedd3d4",
  "public/images/evipace/homepage/hero-evidence-desk-desktop.webp":
    "0430937eb073b613ad19a807b6078a61e6cf53026644a4df9628b06bc3a609fd",
  "public/images/evipace/homepage/hero-evidence-desk-mobile.webp":
    "8d79331f332aea9596c69a5f48c1b5c33316c29e26349048934e034fa0f95006"
};

function pathOf(file) {
  return new URL(file, root);
}

function source(file) {
  return readFile(pathOf(file), "utf8");
}

function hashFile(file) {
  return createHash("sha256").update(readFileSync(pathOf(file))).digest("hex");
}

function extractMeetingCss(sourceText) {
  const start = sourceText.indexOf("   Homepage hero — meeting photograph");
  assert.ok(start > -1, "meeting hero CSS block not found");
  const next = sourceText.indexOf("   Homepage hero — animated Evipace mark", start);
  assert.ok(next > start, "animated mark CSS block not found");
  return sourceText.slice(start, next);
}

test("MeetingHero remains a complete static shared server component", async () => {
  const hero = await source(files.meetingHero);

  assert.ok(hero.includes("export function MeetingHero"));
  assert.ok(hero.includes("children: ReactNode"));
  assert.ok(hero.includes("getImageProps"));
  assert.ok(hero.includes("<picture className=\"meeting-hero__picture\">"));
  assert.ok(hero.includes('media="(min-width: 1024px)"'));
  assert.ok(hero.includes('media="(max-width: 1023.98px)"'));
  assert.ok(hero.includes("sizes={desktopSizes}"));
  assert.ok(hero.includes("sizes={mobileImageProps.sizes}"));
  assert.ok(hero.includes('fetchPriority="high"'));
  assert.ok(hero.includes('loading="eager"'));
  assert.ok(hero.includes('className="meeting-hero__image"'));
  assert.ok(!hero.includes('"use client"'));
  assert.ok(!hero.includes("'use client'"));
  assert.ok(!hero.includes("framer-motion"));
  assert.ok(!hero.includes("motion."));
  assert.ok(!hero.includes("IntersectionObserver"));
});

test("neither locale hero renders the meeting photograph any more", async () => {
  const [en, de] = await Promise.all([source(files.enHero), source(files.deHome)]);

  for (const [label, hero] of [
    ["en", en],
    ["de", de]
  ]) {
    assert.ok(!hero.includes("MeetingHero"), label);
    assert.ok(!hero.includes("meeting-hero"), label);
    assert.ok(!hero.includes("EvidenceDeskHero"), label);
    assert.ok(!hero.includes("hero-desk"), label);
    assert.ok(!hero.includes("<picture"), label);
    assert.ok(!hero.includes("getImageProps"), label);
    assert.ok(!hero.includes("imageAvailable"), label);
  }
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

test("the image registry keeps its meeting hero entry for rollback", async () => {
  const [registry, availability] = await Promise.all([
    source(files.registry),
    source(files.availability)
  ]);

  assert.ok(registry.includes("src: `${homepageBase}/hero-meeting-desktop.webp`"));
  assert.ok(registry.includes("mobileSrc: `${homepageBase}/hero-meeting-mobile.webp`"));
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

test("meeting hero CSS block survives unchanged and stays isolated", async () => {
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

  // The new hero never reaches back into this namespace, and this one never
  // grew animation of its own.
  assert.ok(!css.includes("hero-desk"));
  assert.ok(!css.includes("mark-hero"));
  assert.ok(!css.includes("@keyframes"));
  assert.ok(!css.includes("animation"));
  assert.ok(!css.includes("transition"));
});

test("both rollback heroes and their assets remain byte-identical", () => {
  for (const [file, expectedHash] of Object.entries(rollbackHashes)) {
    assert.ok(existsSync(pathOf(file)), file);
    assert.equal(hashFile(file), expectedHash, file);
  }
});
