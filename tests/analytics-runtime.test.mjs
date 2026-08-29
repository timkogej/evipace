import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  commandsOfType,
  createEnvironment,
  loadAnalyticsModules,
  readDataLayer
} from "./helpers/analytics-runtime.mjs";

// A placeholder id: never the production one, and deliberately longer than a
// real measurement id so the hardcoded-id scan cannot mistake it for one.
const MEASUREMENT_ID = "G-EVIPACETESTID";
const CONSENT_COOKIE = "evipace_cookie_consent";

const root = path.resolve(new URL("../", import.meta.url).pathname);
const managerSource = await readFile(
  path.join(root, "components/evipace/analytics/ConsentManager.tsx"),
  "utf8"
);

/**
 * The effects ConsentManager runs for a given stored decision. Kept in one
 * place so every case below exercises the same sequence the component does;
 * "consent manager drives exactly this sequence" pins it to the component.
 */
function runManagerEffects(ga, decision, measurementId = MEASUREMENT_ID) {
  // Effect keyed on [decision, measurementId].
  ga.initializeConsentDefaults();
  if (decision === "accepted") {
    ga.loadGoogleAnalytics(measurementId);
    ga.sendControlledPageView(measurementId);
  } else {
    ga.updateAnalyticsConsent("rejected");
  }

  // Effect keyed on [decision, measurementId, pathname].
  if (decision !== "accepted") return;
  ga.loadGoogleAnalytics(measurementId);
  ga.sendControlledPageView(measurementId);
}

function eventRequests(environment, eventName) {
  return environment.collectRequests.filter(
    (url) => new URL(url).searchParams.get("en") === eventName
  );
}

/**
 * One page load. React Strict Mode mounts effects twice in development and
 * a re-render can repeat them at any time, so every visit runs them twice.
 */
async function visit({ cookies = {}, path: pathname = "/en", measurementId = MEASUREMENT_ID } = {}) {
  const environment = createEnvironment({ path: pathname, cookies });
  environment.install();
  const { ga, cookies: gaCookies } = await loadAnalyticsModules();

  const stored = environment.jar.values.get(CONSENT_COOKIE);
  const decision =
    stored === "v1:accepted" ? "accepted" : stored === "v1:rejected" ? "rejected" : null;

  const settle = () => environment.runInjectedScripts();

  const session = {
    environment,
    ga,
    decision,
    /** Clicking Accept / Reject in the banner. */
    choose(next) {
      environment.document.cookie = `${CONSENT_COOKIE}=v1:${next}; Max-Age=15552000; Path=/; SameSite=Lax; Secure`;

      if (next === "accepted") {
        ga.loadGoogleAnalytics(measurementId);
        ga.sendControlledPageView(measurementId);
      } else {
        gaCookies.removeGoogleAnalyticsCookies();
        ga.disableGoogleAnalytics(measurementId);
      }

      session.decision = next;
      runManagerEffects(ga, next, measurementId);
      settle();
    },
    /** A Next.js client-side route change. */
    navigate(nextPath) {
      environment.navigate(nextPath);
      if (session.decision !== "accepted") return;
      ga.loadGoogleAnalytics(measurementId);
      ga.sendControlledPageView(measurementId);
      settle();
    },
    end() {
      environment.uninstall();
    }
  };

  runManagerEffects(ga, decision, measurementId);
  settle();
  return session;
}

test("consent manager drives exactly the initialization sequence under test", () => {
  const effects = managerSource.slice(
    managerSource.indexOf("useEffect(() => {"),
    managerSource.indexOf("useEffect(() => {\n    const root = document.documentElement")
  );
  assert.ok(effects.includes("initializeConsentDefaults();"));
  assert.ok(effects.includes('if (decision === "accepted")'));
  assert.ok(effects.includes('updateAnalyticsConsent("rejected");'));
  assert.ok(effects.includes("loadGoogleAnalytics(measurementId);"));
  assert.ok(effects.includes("sendControlledPageView(measurementId);"));
  assert.ok(effects.includes("[decision, measurementId, pathname]"));

  const choose = managerSource.slice(
    managerSource.indexOf("function choose("),
    managerSource.indexOf("if (!(open || decision === null)")
  );
  assert.ok(choose.includes("writeConsentCookie(nextDecision)"));
  assert.ok(choose.includes("removeGoogleAnalyticsCookies();"));
  assert.ok(choose.includes("disableGoogleAnalytics(measurementId);"));
});

test("before a decision nothing Google is requested and no GA cookie is set", async () => {
  const session = await visit();
  const { environment } = session;

  assert.deepEqual(environment.requests, []);
  assert.deepEqual(environment.loaderRequests, []);
  assert.deepEqual(environment.collectRequests, []);
  assert.equal(environment.scripts.length, 0);
  assert.ok(!environment.jar.names().some((name) => name.startsWith("_ga")));

  for (const entry of commandsOfType(environment, "consent")) {
    assert.equal(entry[2].ad_storage, "denied");
    assert.equal(entry[2].ad_user_data, "denied");
    assert.equal(entry[2].ad_personalization, "denied");
    assert.equal(entry[2].analytics_storage, "denied");
  }
  session.end();
});

test("rejection keeps Google unloaded, and the stored rejection survives a reload", async () => {
  const first = await visit();
  first.choose("rejected");

  assert.deepEqual(first.environment.requests, []);
  assert.equal(first.environment.jar.values.get(CONSENT_COOKIE), "v1:rejected");
  assert.ok(
    commandsOfType(first.environment, "consent", "update").every(
      (entry) => entry[2].analytics_storage === "denied"
    )
  );
  first.end();

  const reload = await visit({ cookies: { [CONSENT_COOKIE]: "v1:rejected" } });
  assert.equal(reload.decision, "rejected");
  assert.deepEqual(reload.environment.requests, []);
  assert.deepEqual(reload.environment.collectRequests, []);
  assert.ok(!reload.environment.jar.names().some((name) => name.startsWith("_ga")));
  reload.end();
});

test("acceptance bootstraps gtag once and collects exactly one page view", async () => {
  const session = await visit({ path: "/en" });
  session.choose("accepted");
  const { environment, ga } = session;
  const { window } = environment;

  assert.ok(Array.isArray(window.dataLayer));
  assert.equal(typeof window.gtag, "function");

  // The regression that broke production: commands must reach the queue as
  // `arguments` objects, or gtag.js queues them and executes none of them.
  for (const entry of window.dataLayer) {
    assert.equal(Object.prototype.toString.call(entry), "[object Arguments]");
  }
  assert.equal(environment.tag.ignored, 0);

  assert.equal(environment.scripts.length, 1);
  assert.equal(environment.loaderRequests.length, 1);
  assert.equal(
    environment.loaderRequests[0],
    `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  );

  const defaults = commandsOfType(environment, "consent", "default");
  assert.equal(defaults.length, 1);
  assert.deepEqual(defaults[0][2], {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  const granted = commandsOfType(environment, "consent", "update").filter(
    (entry) => entry[2].analytics_storage === "granted"
  );
  assert.equal(granted.length, 1);
  assert.deepEqual(environment.tag.consent, {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  assert.equal(commandsOfType(environment, "js").length, 1);
  assert.equal(environment.tag.js, 1);

  const configs = commandsOfType(environment, "config");
  assert.equal(configs.length, 1);
  assert.equal(configs[0][1], MEASUREMENT_ID);
  assert.equal(configs[0][2].send_page_view, false);
  assert.equal(environment.tag.configs.length, 1);

  assert.equal(commandsOfType(environment, "event").length, 1);
  assert.equal(environment.pageViewRequests.length, 1);

  const hit = new URL(environment.pageViewRequests[0]);
  assert.equal(hit.searchParams.get("tid"), MEASUREMENT_ID);
  assert.equal(hit.searchParams.get("en"), "page_view");
  assert.equal(hit.searchParams.get("page_path"), "/en");
  assert.equal(hit.searchParams.get("page_location"), "https://evipace.com/en");
  assert.equal(hit.searchParams.get("send_to"), MEASUREMENT_ID);

  // Further renders must not duplicate anything.
  runManagerEffects(ga, "accepted");
  environment.runInjectedScripts();
  assert.equal(environment.loaderRequests.length, 1);
  assert.equal(commandsOfType(environment, "config").length, 1);
  assert.equal(environment.pageViewRequests.length, 1);
  session.end();
});

test("each real pathname navigation sends exactly one further page view", async () => {
  const session = await visit({ path: "/en" });
  session.choose("accepted");
  const { environment } = session;

  session.navigate("/en/about");
  session.navigate("/en/about"); // a re-render on the same route
  session.navigate("/en");

  assert.deepEqual(
    environment.pageViewRequests.map((url) => new URL(url).searchParams.get("page_path")),
    ["/en", "/en/about", "/en"]
  );
  assert.equal(environment.loaderRequests.length, 1);
  assert.equal(commandsOfType(environment, "config").length, 1);
  assert.equal(commandsOfType(environment, "js").length, 1);
  session.end();
});

test("page views carry the pathname only — no query string, fragment or form data", async () => {
  const session = await visit({ path: "/en/send-request" });
  session.environment.window.location.search = "?utm_source=mail&email=a%40b.test";
  session.environment.window.location.hash = "#company";
  session.choose("accepted");

  const [event] = commandsOfType(session.environment, "event");
  assert.deepEqual(Object.keys(event[2]).sort(), [
    "page_location",
    "page_path",
    "page_title",
    "send_to"
  ]);
  assert.equal(event[2].page_path, "/en/send-request");
  assert.equal(event[2].page_location, "https://evipace.com/en/send-request");

  const serialized = JSON.stringify(readDataLayer(session.environment));
  for (const forbidden of ["utm_source", "email", "@", "#company"]) {
    assert.ok(!serialized.includes(forbidden), forbidden);
  }
  session.end();
});

test("lead form events no-op before consent and after rejection", async () => {
  const undecided = await visit();
  assert.equal(
    undecided.ga.sendLeadAnalyticsEvent("request_form_start", "en"),
    false
  );
  assert.equal(undecided.environment.collectRequests.length, 0);
  undecided.end();

  const rejected = await visit({ cookies: { [CONSENT_COOKIE]: "v1:rejected" } });
  assert.equal(rejected.ga.sendLeadAnalyticsEvent("request_form_start", "de"), false);
  assert.equal(rejected.ga.sendLeadAnalyticsEvent("generate_lead", "de"), false);
  assert.equal(rejected.environment.collectRequests.length, 0);
  rejected.end();
});

test("request_form_start uses only the allowlisted EN and DE payload", async () => {
  const en = await visit({ cookies: { [CONSENT_COOKIE]: "v1:accepted" } });
  assert.equal(en.ga.sendLeadAnalyticsEvent("request_form_start", "en"), true);

  const enHits = eventRequests(en.environment, "request_form_start");
  assert.equal(enHits.length, 1);
  const enHit = new URL(enHits[0]);
  assert.equal(enHit.searchParams.get("form_name"), "esg_request");
  assert.equal(enHit.searchParams.get("form_locale"), "en");
  assert.deepEqual(
    Array.from(enHit.searchParams.keys()).sort(),
    ["en", "form_locale", "form_name", "tid", "v"].sort()
  );
  en.end();

  const de = await visit({ cookies: { [CONSENT_COOKIE]: "v1:accepted" } });
  assert.equal(de.ga.sendLeadAnalyticsEvent("request_form_start", "de"), true);
  const deHit = new URL(eventRequests(de.environment, "request_form_start")[0]);
  assert.equal(deHit.searchParams.get("form_locale"), "de");
  de.end();
});

test("generate_lead uses the official event name and only the allowlisted payload", async () => {
  const session = await visit({ cookies: { [CONSENT_COOKIE]: "v1:accepted" } });
  assert.equal(session.ga.sendLeadAnalyticsEvent("generate_lead", "de"), true);

  const hits = eventRequests(session.environment, "generate_lead");
  assert.equal(hits.length, 1);
  const hit = new URL(hits[0]);
  assert.equal(hit.searchParams.get("form_name"), "esg_request");
  assert.equal(hit.searchParams.get("form_locale"), "de");
  assert.equal(hit.searchParams.get("lead_source"), "website_request_form");
  assert.deepEqual(
    Array.from(hit.searchParams.keys()).sort(),
    ["en", "form_locale", "form_name", "lead_source", "tid", "v"].sort()
  );

  const serialized = JSON.stringify(readDataLayer(session.environment));
  for (const forbidden of [
    "email",
    "company",
    "message",
    "deadline",
    "requestId",
    "submissionToken",
    "filename",
    "mimeType",
    "size",
    "signedUrl"
  ]) {
    assert.ok(!serialized.includes(forbidden), forbidden);
  }
  session.end();
});

test("lead form events do not change page-view or loader behavior", async () => {
  const session = await visit({ cookies: { [CONSENT_COOKIE]: "v1:accepted" } });

  session.ga.sendLeadAnalyticsEvent("request_form_start", "en");
  session.ga.sendLeadAnalyticsEvent("generate_lead", "en");
  runManagerEffects(session.ga, "accepted");
  session.environment.runInjectedScripts();

  assert.equal(session.environment.loaderRequests.length, 1);
  assert.equal(session.environment.pageViewRequests.length, 1);
  assert.equal(commandsOfType(session.environment, "config").length, 1);
  assert.equal(commandsOfType(session.environment, "js").length, 1);
  session.end();
});

test("a stored acceptance initializes on the next visit without a banner", async () => {
  const session = await visit({
    cookies: { [CONSENT_COOKIE]: "v1:accepted", _ga: "GA1.1.7.7" },
    path: "/de/about"
  });
  const { environment } = session;

  assert.equal(session.decision, "accepted");
  assert.equal(environment.loaderRequests.length, 1);
  assert.equal(commandsOfType(environment, "consent", "default").length, 1);
  assert.equal(commandsOfType(environment, "js").length, 1);
  assert.equal(commandsOfType(environment, "config").length, 1);
  assert.equal(environment.pageViewRequests.length, 1);
  assert.equal(
    new URL(environment.pageViewRequests[0]).searchParams.get("page_path"),
    "/de/about"
  );
  session.end();
});

test("withdrawal clears accessible GA cookies and leaves Google unloaded afterwards", async () => {
  const accepted = await visit({ cookies: { [CONSENT_COOKIE]: "v1:accepted" } });
  assert.ok(accepted.environment.jar.names().some((name) => name === "_ga"));
  assert.ok(accepted.environment.jar.names().some((name) => name.startsWith("_ga_")));

  accepted.choose("rejected");

  assert.ok(!accepted.environment.jar.names().some((name) => name.startsWith("_ga")));
  assert.equal(accepted.environment.jar.values.get(CONSENT_COOKIE), "v1:rejected");
  assert.deepEqual(
    commandsOfType(accepted.environment, "consent", "update").at(-1)[2].analytics_storage,
    "denied"
  );

  const collectsBefore = accepted.environment.collectRequests.length;
  accepted.navigate("/en/about");
  accepted.ga.loadGoogleAnalytics(MEASUREMENT_ID);
  accepted.ga.sendControlledPageView(MEASUREMENT_ID);
  accepted.environment.runInjectedScripts();
  assert.equal(accepted.environment.collectRequests.length, collectsBefore);
  accepted.end();

  // The safe reload the manager performs, arriving with the stored rejection.
  const reloaded = await visit({ cookies: { [CONSENT_COOKIE]: "v1:rejected" } });
  assert.deepEqual(reloaded.environment.requests, []);
  assert.equal(reloaded.environment.scripts.length, 0);
  reloaded.end();
});

test("without a measurement id nothing is loaded and nothing is collected", async () => {
  const environment = createEnvironment();
  environment.install();
  const { ga } = await loadAnalyticsModules();

  ga.loadGoogleAnalytics("");
  ga.sendControlledPageView("");

  assert.deepEqual(environment.requests, []);
  assert.equal(environment.scripts.length, 0);
  environment.uninstall();
});
