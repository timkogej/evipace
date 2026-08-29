import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(new URL("../", import.meta.url).pathname);
const read = (file) => readFile(path.join(root, file), "utf8");

const [formSource, pageSource, gaSource] = await Promise.all([
  read("components/evipace/send-request/RequestForm.tsx"),
  read("app/[locale]/send-request/page.tsx"),
  read("components/evipace/analytics/GoogleAnalytics.ts")
]);

function indexOfRequired(source, token) {
  const index = source.indexOf(token);
  assert.notEqual(index, -1, token);
  return index;
}

test("shared EN and DE request form passes only locale codes to analytics", () => {
  assert.equal((formSource.match(/sendLeadAnalyticsEvent/g) ?? []).length, 3);
  assert.ok(formSource.includes('locale?: "en" | "de";'));
  assert.ok(formSource.includes('locale = "en"'));
  assert.ok(pageSource.includes('locale={isGerman ? "de" : "en"}'));
  assert.ok(pageSource.includes("copy={isGerman ? deSendRequestCopy : undefined}"));
});

test("request_form_start is interaction-gated, consent-controlled and excludes the honeypot", () => {
  assert.ok(formSource.includes("formStartTrackedRef"));
  assert.ok(formSource.includes("function markFormStarted(target: EventTarget | null)"));
  assert.ok(formSource.includes('target instanceof HTMLInputElement && target.name === "website"'));
  assert.ok(formSource.includes('sendLeadAnalyticsEvent(\n      "request_form_start",\n      locale\n    )'));
  assert.ok(formSource.includes("onFocus={(event) => markFormStarted(event.target)}"));
  assert.ok(formSource.includes("onChange={(event) => markFormStarted(event.target)}"));
  assert.ok(formSource.includes("onPointerDown={(event) => markFormStarted(event.target)}"));
  assert.ok(formSource.includes("markFormStarted(null);\n            setFiles(nextFiles);"));
  assert.ok(!formSource.includes('useEffect(() => {\n    sendLeadAnalyticsEvent("request_form_start"'));
});

test("generate_lead is sent only after upload, finalize success and rendered success state", () => {
  const uploadAt = indexOfRequired(formSource, "await Promise.all(");
  const finalizeAt = indexOfRequired(formSource, "const finalizeRes = await fetch");
  const finalizeFailureAt = indexOfRequired(formSource, "if (!finalizeRes.ok)");
  const workflowAt = indexOfRequired(formSource, "workflowSucceededRef.current = true;");
  const successAt = indexOfRequired(formSource, 'setStage("success")');
  const effectAt = indexOfRequired(formSource, 'if (stage !== "success") return;');
  const leadAt = indexOfRequired(formSource, 'sendLeadAnalyticsEvent("generate_lead", locale)');

  assert.ok(uploadAt < finalizeAt);
  assert.ok(finalizeAt < finalizeFailureAt);
  assert.ok(finalizeFailureAt < workflowAt);
  assert.ok(workflowAt < successAt);
  assert.ok(effectAt < leadAt);
  assert.ok(formSource.includes("if (!workflowSucceededRef.current || leadTrackedRef.current) return;"));
});

test("validation failure, upload failure and finalize failure cannot emit generate_lead", () => {
  const noFilesAt = indexOfRequired(formSource, "if (files.length === 0)");
  const inFlightSetAt = indexOfRequired(formSource, "submitInFlightRef.current = true;");
  const uploadAt = indexOfRequired(formSource, "await Promise.all(");
  const finalizeFailureAt = indexOfRequired(formSource, "if (!finalizeRes.ok)");
  const workflowAt = indexOfRequired(formSource, "workflowSucceededRef.current = true;");

  assert.ok(noFilesAt < inFlightSetAt);
  assert.ok(uploadAt < workflowAt);
  assert.ok(finalizeFailureAt < workflowAt);
  assert.ok(formSource.includes('setStage("form");'));
  assert.ok(formSource.includes('if (stage !== "success") return;'));
  assert.ok(formSource.includes("if (!workflowSucceededRef.current || leadTrackedRef.current) return;"));
  assert.equal((formSource.match(/sendLeadAnalyticsEvent\("generate_lead", locale\)/g) ?? []).length, 1);
});

test("double-clicks, retries and re-renders are deduped with refs", () => {
  assert.ok(formSource.includes("const submitInFlightRef = useRef(false);"));
  assert.ok(formSource.includes("if (submitInFlightRef.current) return;"));
  assert.ok(formSource.includes("submitInFlightRef.current = true;"));
  assert.ok(formSource.includes("submitInFlightRef.current = false;"));
  assert.ok(formSource.includes("const leadTrackedRef = useRef(false);"));
  assert.ok(formSource.includes("leadTrackedRef.current = sendLeadAnalyticsEvent"));
  assert.ok(formSource.includes("[locale, stage]"));
});

test("lead event helper allowlists event names and exact payload keys only", () => {
  assert.ok(gaSource.includes('type LeadAnalyticsEventName = "request_form_start" | "generate_lead";'));
  assert.ok(gaSource.includes('type LeadFormLocale = "en" | "de";'));
  assert.ok(gaSource.includes('if (!hasAcceptedAnalyticsConsent()) return false;'));
  assert.ok(gaSource.includes('if (!window.gtag) return false;'));
  assert.ok(gaSource.includes('window.gtag("event", "request_form_start", {'));
  assert.ok(gaSource.includes('window.gtag("event", "generate_lead", {'));

  const startPayload = gaSource.slice(
    gaSource.indexOf('window.gtag("event", "request_form_start", {'),
    gaSource.indexOf("    return true;", gaSource.indexOf('window.gtag("event", "request_form_start", {'))
  );
  assert.ok(startPayload.includes('form_name: "esg_request"'));
  assert.ok(startPayload.includes("form_locale: formLocale"));
  assert.ok(!startPayload.includes("lead_source"));

  const leadPayload = gaSource.slice(
    gaSource.indexOf('window.gtag("event", "generate_lead", {'),
    gaSource.indexOf("    return true;", gaSource.indexOf('window.gtag("event", "generate_lead", {'))
  );
  assert.ok(leadPayload.includes('form_name: "esg_request"'));
  assert.ok(leadPayload.includes("form_locale: formLocale"));
  assert.ok(leadPayload.includes('lead_source: "website_request_form"'));
});

test("analytics sources do not pass PII, ids, filenames or document metadata to gtag", () => {
  const analyticsOnly = `${gaSource}\n${formSource.match(/sendLeadAnalyticsEvent[^\n]+/g)?.join("\n") ?? ""}`;
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
    "signedUrl",
    "upload.path",
    "caughtError"
  ]) {
    assert.ok(!analyticsOnly.includes(forbidden), forbidden);
  }
});
