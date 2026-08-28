import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(new URL("../", import.meta.url).pathname);
const read = (file) => readFile(path.join(root, file), "utf8");

const files = {
  layout: "app/[locale]/layout.tsx",
  footer: "components/evipace/Footer.tsx",
  manager: "components/evipace/analytics/ConsentManager.tsx",
  ga: "components/evipace/analytics/GoogleAnalytics.ts",
  consent: "components/evipace/analytics/consent.ts",
  copy: "components/evipace/analytics/consent-copy.ts",
  privacy: "components/evipace/privacy/PrivacyPage.tsx",
  privacyRoute: "app/[locale]/privacy/page.tsx",
  registry: "lib/seo/page-registry.ts",
  navigation: "lib/site-navigation.ts",
  legalInfo: "lib/legal-info.ts",
  css: "app/globals.css"
};

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([key, file]) => [key, await read(file)])
  )
);

function relativeLuminance(hex) {
  const [red, green, blue] = hex
    .match(/[0-9a-f]{2}/gi)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((value) =>
      value <= 0.03928
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4
    );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground, background) {
  const [lighter, darker] = [
    relativeLuminance(foreground),
    relativeLuminance(background)
  ].sort((a, b) => b - a);

  return (lighter + 0.05) / (darker + 0.05);
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listFiles(fullPath);
      return entry.isFile() ? [fullPath] : [];
    })
  );
  return nested.flat();
}

test("no production GA4 measurement ID is hardcoded in source or tests", async () => {
  const filesToScan = await Promise.all(
    ["app", "components", "lib", "tests"].map((directory) =>
      listFiles(path.join(root, directory))
    )
  );

  for (const file of filesToScan.flat()) {
    const source = await readFile(file, "utf8");
    const matches = source.match(/\bG-[A-Z0-9]{10}\b/g) ?? [];
    assert.deepEqual(
      matches.filter((match) => match !== "G-FRAGEBOGEN"),
      [],
      file
    );
  }
});

test("missing GA_MEASUREMENT_ID is handled without rendering GA consent", () => {
  assert.ok(sources.layout.includes("process.env.GA_MEASUREMENT_ID"));
  assert.ok(sources.layout.includes("showSiteChrome && gaMeasurementId"));
  assert.ok(!sources.layout.includes("NEXT_PUBLIC_GA"));
  assert.ok(!sources.layout.includes("G-"));
  assert.ok(!sources.ga.includes("G-"));
});

test("consent manager and Vercel Analytics are each rendered once globally", () => {
  assert.equal((sources.layout.match(/<ConsentManager/g) ?? []).length, 1);
  assert.equal((sources.layout.match(/<Analytics\s*\/>/g) ?? []).length, 1);
  assert.equal(
    (sources.layout.match(/@vercel\/analytics\/next/g) ?? []).length,
    1
  );
  assert.ok(sources.layout.includes("<Footer locale={activeLocale} />"));
});

test("Consent Mode v2 defaults deny all four signals", () => {
  for (const token of [
    'analytics_storage: "denied"',
    'ad_storage: "denied"',
    'ad_user_data: "denied"',
    'ad_personalization: "denied"'
  ]) {
    assert.ok(sources.consent.includes(token), token);
  }
});

test("acceptance grants only analytics storage and advertising stays denied", () => {
  assert.ok(sources.consent.includes('analytics_storage: "granted"'));
  for (const token of [
    'ad_storage: "denied"',
    'ad_user_data: "denied"',
    'ad_personalization: "denied"'
  ]) {
    assert.ok(sources.consent.includes(token), token);
  }
  assert.ok(sources.ga.includes('decision === "accepted"'));
  assert.ok(!sources.ga.includes('ad_storage: "granted"'));
  assert.ok(!sources.ga.includes('ad_user_data: "granted"'));
  assert.ok(!sources.ga.includes('ad_personalization: "granted"'));
});

test("GA script is absent before a decision and after rejection", () => {
  assert.ok(sources.manager.includes("decision === null"));
  assert.ok(sources.manager.includes("!ready"));
  assert.ok(sources.manager.includes('decision === "accepted"'));
  assert.ok(sources.manager.includes('nextDecision === "accepted"'));
  assert.ok(sources.manager.includes('choose(nextDecision: ConsentDecision)'));
  assert.ok(sources.manager.includes("disableGoogleAnalytics(measurementId)"));
  assert.ok(!sources.manager.includes("loadGoogleAnalytics(measurementId);") || sources.manager.indexOf('stored === "accepted"') < sources.manager.indexOf("loadGoogleAnalytics(measurementId);"));
});

test("GA script loads once after acceptance and page views are deduplicated", () => {
  assert.ok(sources.ga.includes("script.dataset.evipaceGa4 = measurementId"));
  assert.ok(sources.ga.includes("document.querySelector(`script[data-evipace-ga4="));
  assert.ok(sources.ga.includes("send_page_view: false"));
  assert.ok(sources.ga.includes("state.lastPagePath === pagePath"));
  assert.ok(sources.ga.includes('"event", "page_view"'));
  assert.ok(sources.ga.includes("window.location.pathname"));
  assert.ok(!sources.ga.includes("window.location.search"));
});

test("decision persists and withdrawal deletes accessible GA cookies", () => {
  assert.ok(sources.consent.includes('CONSENT_COOKIE_NAME = "evipace_cookie_consent"'));
  assert.ok(sources.consent.includes("60 * 60 * 24 * 180"));
  assert.ok(sources.manager.includes("writeConsentCookie(nextDecision)"));
  assert.ok(sources.manager.includes('name === "_ga" || name.startsWith("_ga_")'));
  assert.ok(sources.manager.includes("window.location.reload()"));
  assert.ok(sources.manager.includes("parseConsentDecision(readCookie"));
});

test("EN and DE consent copy and privacy links are exact", () => {
  for (const text of [
    "Your privacy choices",
    "We use essential technologies to operate this website. With your permission, we also use Google Analytics to understand how the site is used and improve it. You can accept or reject analytics at any time.",
    "Reject analytics",
    "Accept analytics",
    "Privacy policy",
    "Cookie settings",
    "Ihre Datenschutzeinstellungen",
    "Wir verwenden technisch notwendige Technologien, um diese Website zu betreiben. Mit Ihrer Einwilligung nutzen wir außerdem Google Analytics, um die Nutzung der Website zu verstehen und sie zu verbessern. Sie können Analytics jederzeit akzeptieren oder ablehnen.",
    "Analytics ablehnen",
    "Analytics akzeptieren",
    "Datenschutzerklärung",
    "Cookie-Einstellungen",
    "Current choice: Analytics accepted.",
    "Current choice: Analytics rejected.",
    "Aktuelle Auswahl: Analytics akzeptiert.",
    "Aktuelle Auswahl: Analytics abgelehnt.",
    "Close cookie settings",
    "Cookie-Einstellungen schließen"
  ]) {
    assert.ok(sources.copy.includes(text), text);
  }
  assert.ok(!sources.copy.includes("Analytics has not been accepted or rejected yet."));
  assert.ok(!sources.copy.includes("Analytics wurde noch nicht akzeptiert oder abgelehnt."));
  assert.ok(sources.consent.includes("privacyPathForLocale"));
  assert.ok(sources.navigation.includes("/en/privacy"));
  assert.ok(sources.navigation.includes("/de/privacy"));
});

test("no PII or form values are passed to analytics and no GTM container is introduced", () => {
  assert.ok(!sources.ga.includes("useSearchParams"));
  assert.ok(!sources.ga.includes("email"));
  assert.ok(!sources.ga.includes("company"));
  assert.ok(!sources.ga.includes("filename"));
  assert.ok(!sources.ga.includes("form"));
  assert.ok(!sources.ga.includes("GTM-"));
  assert.ok(!sources.layout.includes("GTM-"));
  assert.ok(!sources.manager.includes("RequestForm"));
});

test("privacy pages disclose optional GA4, consent, cookies and withdrawal", () => {
  const normalizedPrivacy = sources.privacy.replace(/\s+/g, " ");
  for (const token of [
    "Google Analytics 4 is optional",
    "Google Analytics is not loaded before analytics consent is accepted",
    "You can reject analytics without losing access",
    "Cookie settings control",
    "evipace_cookie_consent",
    "_ga",
    "_ga_*",
    "Advertising",
    "form contents",
    "uploaded-document",
    "Google Analytics 4 ist",
    "Google Analytics wird nicht geladen",
    "eine Ablehnung verhindert",
    "Cookie-Einstellungen",
    "Formularinhalte",
    "hochgeladenen"
  ]) {
    assert.ok(normalizedPrivacy.includes(token), token);
  }
});

test("only the consent controller is a new client component", () => {
  assert.ok(sources.manager.includes('"use client"'));
  for (const [label, source] of [
    ["GA loader", sources.ga],
    ["consent helpers", sources.consent],
    ["consent copy", sources.copy],
    ["privacy page", sources.privacy],
    ["privacy route", sources.privacyRoute],
    ["layout", sources.layout]
  ]) {
    assert.ok(!source.includes('"use client"'), label);
  }
});

test("no unrelated SEO infrastructure or duplicate analytics provider is introduced", () => {
  assert.ok(sources.registry.includes('privacy: {'));
  assert.ok(sources.legalInfo.includes('"/en/privacy"'));
  for (const source of Object.values(sources)) {
    assert.ok(!source.includes("Google Tag Manager"));
    assert.ok(!source.includes("@next/third-parties/google"));
    assert.ok(!source.includes("cookiebot"));
    assert.ok(!source.includes("onetrust"));
  }
});

test("consent UI is semantic, keyboard reachable and styled in the evipace system", () => {
  assert.ok(sources.manager.includes("<button"));
  assert.ok(sources.manager.includes("aria-labelledby"));
  assert.ok(sources.manager.includes("requestAnimationFrame"));
  assert.ok(sources.manager.includes("isReopenedSettings"));
  assert.ok(sources.manager.includes("copy.close"));
  assert.ok(sources.manager.includes('event.key !== "Escape"'));
  assert.ok(sources.manager.includes("decision === null"));
  assert.ok(sources.manager.includes("closeSettings"));
  assert.ok(sources.footer.includes("<button"));
  assert.ok(sources.footer.includes("CustomEvent(CONSENT_SETTINGS_EVENT)"));
  assert.ok(sources.css.includes(".cookie-consent"));
  assert.ok(sources.css.includes(".cookie-consent__close"));
  assert.ok(sources.css.includes("safe-area-inset-bottom"));
  assert.ok(sources.css.includes("var(--orange)"));
  assert.ok(sources.css.includes("@media (max-width: 360px)"));
  assert.ok(sources.css.includes("@media (prefers-reduced-motion: reduce)"));
});

test("undecided banner has no status line and reopened settings show state only", () => {
  assert.ok(sources.manager.includes("status ? <p"));
  assert.ok(sources.manager.includes("copy.currentAccepted"));
  assert.ok(sources.manager.includes("copy.currentRejected"));
  assert.ok(!sources.manager.includes("currentUnset"));
  assert.ok(!sources.copy.includes("not been accepted or rejected"));
  assert.ok(!sources.copy.includes("noch nicht akzeptiert oder abgelehnt"));
});

test("settings close control is reopened-only and preserves consent", () => {
  assert.ok(sources.manager.includes("const isReopenedSettings = open && decision !== null"));
  assert.ok(sources.manager.includes("{isReopenedSettings ? ("));
  assert.ok(sources.manager.includes("aria-label={copy.close}"));
  assert.ok(sources.manager.includes("onClick={closeSettings}"));
  assert.ok(sources.manager.includes('if (!open || decision === null) return;'));
  assert.ok(sources.manager.includes("previousFocusRef.current?.focus()"));

  const closeBody = sources.manager.match(
    /const closeSettings = useCallback\(\(\) => \{(?<body>[\s\S]*?)\}, \[\]\);/
  )?.groups?.body;

  assert.ok(closeBody);
  assert.ok(closeBody.includes("setOpen(false)"));
  assert.ok(!closeBody.includes("writeConsentCookie"));
  assert.ok(!closeBody.includes("setDecision"));
  assert.ok(!closeBody.includes("location.reload"));
});

test("action buttons are equally prominent filled controls with AA contrast", () => {
  assert.ok(sources.css.includes(".cookie-consent__button--secondary"));
  assert.ok(sources.css.includes("background: var(--ink)"));
  assert.ok(sources.css.includes("color: #ffffff"));
  assert.ok(sources.css.includes(".cookie-consent__button--primary"));
  assert.ok(sources.css.includes("background: var(--orange)"));
  assert.ok(sources.css.includes("color: var(--ink)"));
  assert.ok(sources.css.includes("border: 2px solid transparent"));
  assert.ok(sources.css.includes("repeat(2, minmax(10rem, 1fr))"));

  assert.ok(contrastRatio("#ffffff", "#151515") >= 4.5);
  assert.ok(contrastRatio("#151515", "#fe7001") >= 4.5);
  assert.ok(contrastRatio("#ffffff", "#fe7001") < 4.5);
});
