import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  loadNotificationModules,
  installStorageMock,
  clearStorageMock
} from "./helpers/load-server-module.mjs";

/**
 * Covers the internal "new ESG request" notification: who receives it,
 * how uploaded documents reach the recipient, and what the rendered email
 * is allowed to contain.
 *
 * No real email is ever sent. Supabase Storage is faked by the helper
 * above, and the Resend client is never constructed — the tests that
 * concern delivery read the delivery code rather than executing it, while
 * everything that can be exercised for real (the builder, the sanitiser,
 * the size policy) runs the production modules unmodified.
 */

const read = (relative) =>
  readFile(new URL(relative, import.meta.url), "utf8");

const [notifySource, configSource, routeSource, validationSource, formSource, pageSource] =
  await Promise.all([
    read("../lib/server/notify.ts"),
    read("../lib/server/config.ts"),
    read("../app/api/requests/route.ts"),
    read("../lib/validation/request-form.ts"),
    read("../components/evipace/send-request/RequestForm.tsx"),
    read("../app/[locale]/send-request/page.tsx")
  ]);

const { email: emailModule, attachments: attachmentsModule } =
  await loadNotificationModules();

const { buildRequestNotificationEmail, escapeHtml, escapeMultiline } = emailModule;
const {
  prepareRequestAttachments,
  base64Size,
  isPathOwnedByRequest,
  displayFilename,
  ATTACHMENT_ENCODED_BUDGET_BYTES,
  EMAIL_BODY_RESERVE_BYTES,
  RESEND_MAX_MESSAGE_BYTES,
  SIGNED_LINK_EXPIRY_SECONDS,
  SIGNED_LINK_EXPIRY_DAYS
} = attachmentsModule;

const REQUEST_ID = "11111111-2222-4333-8444-555555555555";

function baseInput(overrides = {}) {
  return {
    requestId: REQUEST_ID,
    submittedAt: "2026-08-26T09:30:00.000Z",
    locale: "de",
    name: "Anna Berger",
    email: "anna.berger@example.com",
    company: "Berger Präzisionsteile GmbH",
    deadline: "End of Q3",
    message: "First line.\nSecond line.",
    files: [],
    linkExpiryDays: SIGNED_LINK_EXPIRY_DAYS,
    warnings: [],
    ...overrides
  };
}

function row(path, filename, size, mime) {
  return {
    storage_path: path,
    original_filename: filename,
    declared_size: size,
    declared_mime: mime
  };
}

// ── Recipient ────────────────────────────────────────────────────────

test("the active recipient resolves to hello@evipace.com", async () => {
  // company-info.ts is TypeScript, so read the literal rather than import it.
  const companyInfo = await read("../lib/company-info.ts");
  assert.ok(
    /export const publicContactEmail = "hello@evipace\.com";/.test(companyInfo),
    "publicContactEmail should be hello@evipace.com"
  );

  // The recipient accessor falls back to that constant, so a deployment
  // that sets no environment variable already notifies the right inbox.
  assert.match(
    configSource,
    /notificationRecipient: \(\) =>\s*process\.env\.EVIPACE_REQUEST_NOTIFICATION_EMAIL\?\.trim\(\) \|\| publicContactEmail/,
    "notificationRecipient should default to publicContactEmail"
  );
  assert.ok(configSource.includes('import { publicContactEmail } from "@/lib/company-info";'));
});

test("the previous personal recipient appears nowhere in the request flow", async () => {
  const sources = [notifySource, configSource, routeSource, validationSource, formSource, pageSource];
  for (const source of sources) {
    assert.ok(
      !source.includes("jedroplus"),
      "the old personal notification address must not remain in the request flow"
    );
  }
});

test("the recipient is configured in exactly one server-only place", () => {
  // Neither the route nor the delivery code names an address of its own —
  // both go through the single accessor.
  assert.ok(notifySource.includes("requestUploadsConfig.notificationRecipient()"));
  assert.equal(
    (notifySource.match(/notificationRecipient\(\)/g) ?? []).length,
    1,
    "only the internal notification should resolve the recipient"
  );
  assert.ok(!/to:\s*"[^"]*@/.test(notifySource), "no hardcoded recipient literal");
});

// ── One builder for both locales ─────────────────────────────────────

test("English and German submissions use the same notification builder", () => {
  assert.ok(
    notifySource.includes('import { buildRequestNotificationEmail } from "./request-notification-email";')
  );
  assert.equal(
    (notifySource.match(/buildRequestNotificationEmail\(/g) ?? []).length,
    1,
    "there should be exactly one call site, shared by both locales"
  );
  // No locale branching in delivery: the locale is reported as data.
  assert.ok(
    !/locale\s*===\s*"de"/.test(notifySource),
    "delivery must not branch on locale"
  );
  // Both pages render the one shared form, which reports its locale.
  assert.ok(pageSource.includes('locale={isGerman ? "de" : "en"}'));
  assert.ok(formSource.includes("locale,"));
  assert.ok(validationSource.includes('locale: z.enum(["en", "de"]).optional()'));
});

test("the submitted locale is reported in the email", () => {
  const de = buildRequestNotificationEmail(baseInput({ locale: "de" }));
  assert.ok(de.html.includes("German form (/de/send-request)"));
  assert.ok(de.text.includes("German form (/de/send-request)"));

  const en = buildRequestNotificationEmail(baseInput({ locale: "en" }));
  assert.ok(en.html.includes("English form (/en/send-request)"));

  const unknown = buildRequestNotificationEmail(baseInput({ locale: null }));
  assert.ok(unknown.html.includes("Not recorded"));
});

// ── Sender and reply-to ──────────────────────────────────────────────

test("the submitter's address becomes replyTo, never the authenticated from", () => {
  assert.ok(
    notifySource.includes("replyTo: request.email"),
    "the visitor's address should be the reply-to"
  );
  assert.ok(
    notifySource.includes("from: requestUploadsConfig.notificationSender()"),
    "the verified Evipace sender must stay in from"
  );
  assert.ok(
    !/from:\s*request\.email/.test(notifySource),
    "the visitor's address must never be the authenticated sender"
  );
  // The verified sender is still required configuration, unchanged.
  assert.ok(configSource.includes('notificationSender: () => required("EVIPACE_NOTIFICATION_SENDER_EMAIL")'));
});

// ── HTML and plain text ──────────────────────────────────────────────

test("both an HTML and a plain-text body are produced", () => {
  const built = buildRequestNotificationEmail(baseInput());
  assert.ok(built.html.startsWith("<!doctype html>"));
  assert.ok(built.html.includes("A new ESG request has arrived"));
  assert.ok(built.text.includes("A new ESG request has arrived"));
  assert.ok(built.subject.includes("New ESG request"));
  assert.ok(!built.text.includes("<"), "the text part should carry no markup");
  assert.ok(notifySource.includes("html: email.html"));
  assert.ok(notifySource.includes("text: email.text"));
});

test("the email is client-safe: no script, no form, no remote asset", () => {
  const built = buildRequestNotificationEmail(
    baseInput({
      files: [
        {
          filename: "questionnaire.pdf",
          sizeBytes: 1024,
          mimeType: "application/pdf",
          delivery: "attached"
        }
      ]
    })
  );
  assert.ok(!/<script/i.test(built.html));
  assert.ok(!/<form/i.test(built.html));
  assert.ok(!/<img/i.test(built.html));
  assert.ok(!/https?:\/\/fonts\./i.test(built.html));
  assert.ok(!/@import/i.test(built.html));
  assert.ok(built.html.includes("max-width:620px"));
  assert.ok(built.html.includes("@media only screen and (max-width: 480px)"));
});

test("the submitter's email is clickable in HTML and plain in text", () => {
  const built = buildRequestNotificationEmail(baseInput());
  assert.ok(built.html.includes('href="mailto:anna.berger@example.com"'));
  assert.ok(built.text.includes("anna.berger@example.com"));
});

test("optional empty values render as Not provided", () => {
  const built = buildRequestNotificationEmail(
    baseInput({ deadline: null, message: "   " })
  );
  assert.ok(built.html.includes("Not provided"));
  assert.equal((built.text.match(/Not provided/g) ?? []).length >= 2, true);
});

// ── Escaping ─────────────────────────────────────────────────────────

test("every user-controlled value is HTML-escaped", () => {
  const payload = '<script>alert("x")</script> & \'quote\'';
  const built = buildRequestNotificationEmail(
    baseInput({
      name: payload,
      company: payload,
      deadline: payload,
      message: payload,
      files: [
        {
          filename: '<img src=x onerror="alert(1)">.pdf',
          sizeBytes: 10,
          mimeType: "application/pdf",
          delivery: "attached"
        }
      ]
    })
  );

  assert.ok(!built.html.includes("<script>"), "no script element may survive");
  assert.ok(!/<img/i.test(built.html), "no element may survive");
  // The handler text survives only in neutralised form — as escaped
  // characters inside a text node, never as a live attribute.
  assert.ok(!built.html.includes('onerror="alert(1)"'), "no live event handler");
  assert.ok(built.html.includes("onerror=&quot;alert(1)&quot;"), "escaped instead");
  assert.ok(built.html.includes("&lt;script&gt;"));
  assert.ok(built.html.includes("&amp;"));
  assert.ok(built.html.includes("&#39;"));

  assert.equal(escapeHtml("<a>&\"'"), "&lt;a&gt;&amp;&quot;&#39;");
});

test("message line breaks are preserved without allowing injection", () => {
  const built = buildRequestNotificationEmail(
    baseInput({ message: "One\nTwo\r\nThree<br>literal" })
  );
  assert.ok(built.html.includes("One<br />Two<br />Three&lt;br&gt;literal"));
  assert.ok(built.text.includes("One\nTwo\r\nThree<br>literal"));

  assert.equal(escapeMultiline("a\nb"), "a<br />b");
  assert.equal(escapeMultiline("<b>\n"), "&lt;b&gt;<br />");
});

test("the subject line cannot carry a header injection", () => {
  const built = buildRequestNotificationEmail(
    baseInput({ company: "Acme\r\nBcc: attacker@example.com" })
  );
  assert.ok(!built.subject.includes("\n"));
  assert.ok(!built.subject.includes("\r"));
  assert.ok(built.subject.startsWith("New ESG request — Acme"));
});

// ── Filename sanitising ──────────────────────────────────────────────

test("filenames are sanitized before they reach the email or an attachment", () => {
  assert.equal(displayFilename("../../etc/passwd"), "passwd");
  assert.equal(displayFilename("C:\\Windows\\evil.pdf"), "evil.pdf");
  assert.equal(displayFilename("report 2026.pdf"), "report-2026.pdf");
  assert.ok(!displayFilename("<script>.pdf").includes("<"));
});

test("a storage path is refused unless it belongs to this request", () => {
  assert.ok(isPathOwnedByRequest(`${REQUEST_ID}/0-report.pdf`, REQUEST_ID));
  assert.ok(!isPathOwnedByRequest(`${REQUEST_ID}/../other/0-report.pdf`, REQUEST_ID));
  assert.ok(!isPathOwnedByRequest("other-request/0-report.pdf", REQUEST_ID));
  assert.ok(!isPathOwnedByRequest(`${REQUEST_ID}/nested/0-report.pdf`, REQUEST_ID));
  assert.ok(!isPathOwnedByRequest(`${REQUEST_ID}\\0-report.pdf`, REQUEST_ID));
});

// ── Attachment policy ────────────────────────────────────────────────

test("eligible files become real attachments with filename and MIME preserved", async (t) => {
  t.after(clearStorageMock);
  const path = `${REQUEST_ID}/0-questionnaire.pdf`;
  const bytes = Buffer.from("%PDF-1.7 pretend document");
  const mock = installStorageMock({ objects: { [path]: bytes } });

  const plan = await prepareRequestAttachments(REQUEST_ID, [
    row(path, "questionnaire.pdf", bytes.byteLength, "application/pdf")
  ]);

  assert.equal(plan.attachments.length, 1);
  assert.equal(plan.attachments[0].filename, "questionnaire.pdf");
  assert.equal(plan.attachments[0].contentType, "application/pdf");
  assert.ok(Buffer.isBuffer(plan.attachments[0].content));
  assert.equal(plan.attachments[0].content.toString(), bytes.toString());

  assert.equal(plan.files[0].delivery, "attached");
  assert.equal(plan.files[0].sizeBytes, bytes.byteLength);
  assert.equal(plan.warnings.length, 0);
  assert.equal(mock.signed.length, 0, "an attached file needs no signed link");
});

test("the canonical MIME type wins over an inconsistent browser-reported one", async (t) => {
  t.after(clearStorageMock);
  const path = `${REQUEST_ID}/0-data.csv`;
  installStorageMock({ objects: { [path]: Buffer.from("a,b\n1,2\n") } });

  // Browsers commonly report .csv as application/vnd.ms-excel.
  const plan = await prepareRequestAttachments(REQUEST_ID, [
    row(path, "data.csv", 8, "application/vnd.ms-excel")
  ]);

  assert.equal(plan.attachments[0].contentType, "text/csv");
  assert.equal(plan.files[0].mimeType, "text/csv");
});

test("the aggregate size budget stays safely under the provider limit", () => {
  assert.equal(RESEND_MAX_MESSAGE_BYTES, 40 * 1024 * 1024);
  assert.ok(
    ATTACHMENT_ENCODED_BUDGET_BYTES < RESEND_MAX_MESSAGE_BYTES,
    "the budget must leave headroom"
  );
  // Budgeting happens on base64-encoded bytes, which is what actually
  // travels, plus a reserve for the bodies and headers.
  assert.equal(base64Size(3), 4);
  assert.equal(base64Size(1), 4);
  assert.equal(base64Size(1024 * 1024), Math.ceil((1024 * 1024) / 3) * 4);
  assert.ok(EMAIL_BODY_RESERVE_BYTES > 0);

  // Even a full budget of encoded attachments plus the reserve cannot
  // reach the provider ceiling.
  assert.ok(
    ATTACHMENT_ENCODED_BUDGET_BYTES + EMAIL_BODY_RESERVE_BYTES <
      RESEND_MAX_MESSAGE_BYTES
  );
});

test("the aggregate limit is enforced and the overflow falls back to signed links", async (t) => {
  t.after(clearStorageMock);
  // Three files that individually fit but together exceed the budget.
  const raw = Math.floor((ATTACHMENT_ENCODED_BUDGET_BYTES / 4) * 3);
  const paths = [0, 1, 2].map((i) => `${REQUEST_ID}/${i}-doc${i}.pdf`);
  const objects = Object.fromEntries(
    paths.map((path) => [path, Buffer.alloc(1024, 1)])
  );
  const mock = installStorageMock({ objects });

  const plan = await prepareRequestAttachments(
    REQUEST_ID,
    paths.map((path, i) => row(path, `doc${i}.pdf`, raw, "application/pdf"))
  );

  assert.equal(plan.files.length, 3, "no file may be dropped");
  const attached = plan.files.filter((f) => f.delivery === "attached");
  const linked = plan.files.filter((f) => f.delivery === "link");
  assert.ok(attached.length < 3, "the budget must stop some attachments");
  assert.equal(attached.length + linked.length, 3);
  assert.equal(plan.attachments.length, attached.length);
  assert.equal(mock.signed.length, linked.length);

  // Deterministic: the same input always splits the same way.
  const again = await prepareRequestAttachments(
    REQUEST_ID,
    paths.map((path, i) => row(path, `doc${i}.pdf`, raw, "application/pdf"))
  );
  assert.deepEqual(
    again.files.map((f) => f.delivery),
    plan.files.map((f) => f.delivery)
  );
});

test("a single oversized file is never attached and never dropped", async (t) => {
  t.after(clearStorageMock);
  const path = `${REQUEST_ID}/0-huge.pdf`;
  const mock = installStorageMock({ objects: { [path]: Buffer.alloc(16, 7) } });

  const plan = await prepareRequestAttachments(REQUEST_ID, [
    row(path, "huge.pdf", 25 * 1024 * 1024 * 4, "application/pdf")
  ]);

  assert.equal(plan.attachments.length, 0);
  assert.equal(plan.files.length, 1);
  assert.equal(plan.files[0].delivery, "link");
  assert.ok(plan.files[0].downloadUrl);
  assert.equal(mock.downloads.length, 0, "an over-budget file is never downloaded");
});

test("signed links are time-limited to seven days and are never public", async (t) => {
  t.after(clearStorageMock);
  const path = `${REQUEST_ID}/0-big.pdf`;
  const mock = installStorageMock({ objects: { [path]: Buffer.alloc(8) } });

  await prepareRequestAttachments(REQUEST_ID, [
    row(path, "big.pdf", ATTACHMENT_ENCODED_BUDGET_BYTES, "application/pdf")
  ]);

  assert.equal(SIGNED_LINK_EXPIRY_SECONDS, 7 * 24 * 60 * 60);
  assert.equal(SIGNED_LINK_EXPIRY_DAYS, 7);
  assert.equal(mock.signed.length, 1);
  assert.equal(mock.signed[0].expiresIn, SIGNED_LINK_EXPIRY_SECONDS);
  assert.deepEqual(mock.signed[0].options, { download: true });
  // A signed URL, not a permanent public object URL.
  assert.ok(!/\/object\/public\//.test(
    (await prepareRequestAttachments(REQUEST_ID, [
      row(path, "big.pdf", ATTACHMENT_ENCODED_BUDGET_BYTES, "application/pdf")
    ])).files[0].downloadUrl
  ));
});

test("the storage copy survives being attached to an email", async (t) => {
  t.after(clearStorageMock);
  const path = `${REQUEST_ID}/0-keep.pdf`;
  const bytes = Buffer.from("original bytes");
  const mock = installStorageMock({ objects: { [path]: bytes } });

  await prepareRequestAttachments(REQUEST_ID, [
    row(path, "keep.pdf", bytes.byteLength, "application/pdf")
  ]);

  const remaining = mock.remaining();
  assert.equal(remaining.size, 1);
  assert.equal(remaining.get(path).toString(), "original bytes");
  // Nothing in the module deletes or moves an object.
  const attachmentsSource = await read("../lib/server/request-attachments.ts");
  assert.ok(!/\.remove\(/.test(attachmentsSource));
  assert.ok(!/\.move\(/.test(attachmentsSource));
});

test("a file is never silently omitted when storage misbehaves", async (t) => {
  t.after(clearStorageMock);
  const good = `${REQUEST_ID}/0-good.pdf`;
  const bad = `${REQUEST_ID}/1-bad.pdf`;
  installStorageMock({
    objects: { [good]: Buffer.from("ok") },
    failDownloadFor: new Set([bad])
  });

  const plan = await prepareRequestAttachments(REQUEST_ID, [
    row(good, "good.pdf", 2, "application/pdf"),
    row(bad, "bad.pdf", 2, "application/pdf")
  ]);

  assert.equal(plan.files.length, 2);
  assert.equal(plan.files[0].delivery, "attached");
  // A failed download still reaches the recipient — as a signed link.
  assert.equal(plan.files[1].delivery, "link");
  assert.ok(plan.files[1].downloadUrl);
});

test("an unsignable file produces a clear warning instead of a raw path", async (t) => {
  t.after(clearStorageMock);
  const path = `${REQUEST_ID}/0-lost.pdf`;
  installStorageMock({
    objects: {},
    failDownloadFor: new Set([path]),
    failSignFor: new Set([path])
  });

  const plan = await prepareRequestAttachments(REQUEST_ID, [
    row(path, "lost.pdf", 12, "application/pdf")
  ]);

  assert.equal(plan.files[0].delivery, "unavailable");
  assert.equal(plan.warnings.length, 1);
  assert.ok(plan.warnings[0].includes("lost.pdf"));
  assert.ok(!plan.warnings[0].includes(REQUEST_ID));

  const built = buildRequestNotificationEmail(
    baseInput({ files: plan.files, warnings: plan.warnings })
  );
  assert.ok(built.html.includes("Operational notice"));
  assert.ok(built.html.includes("Action needed"));
  assert.ok(built.text.includes("OPERATIONAL NOTICE"));
});

test("a foreign storage path is refused rather than fetched", async (t) => {
  t.after(clearStorageMock);
  const foreign = "another-request/0-secret.pdf";
  const mock = installStorageMock({ objects: { [foreign]: Buffer.from("secret") } });

  const plan = await prepareRequestAttachments(REQUEST_ID, [
    row(foreign, "secret.pdf", 6, "application/pdf")
  ]);

  assert.equal(mock.downloads.length, 0);
  assert.equal(mock.signed.length, 0);
  assert.equal(plan.files[0].delivery, "unavailable");
  assert.equal(plan.attachments.length, 0);
});

// ── No raw storage paths anywhere visible ────────────────────────────

test("no raw internal storage path appears in the rendered email", async (t) => {
  t.after(clearStorageMock);
  const attachedPath = `${REQUEST_ID}/0-attached.pdf`;
  const linkedPath = `${REQUEST_ID}/1-linked.pdf`;
  installStorageMock({
    objects: {
      [attachedPath]: Buffer.from("small"),
      [linkedPath]: Buffer.from("small")
    }
  });

  const plan = await prepareRequestAttachments(REQUEST_ID, [
    row(attachedPath, "attached.pdf", 5, "application/pdf"),
    row(linkedPath, "linked.pdf", ATTACHMENT_ENCODED_BUDGET_BYTES, "application/pdf")
  ]);

  const built = buildRequestNotificationEmail(
    baseInput({ files: plan.files, warnings: plan.warnings })
  );

  // A signed URL necessarily embeds the bucket and object key in its link
  // target — that is how the provider addresses the object. What must
  // never happen is a path being *shown*. So the check runs against the
  // visible copy with every link target removed: hrefs stripped from the
  // HTML, and URL lines stripped from the text part. The reference id on
  // its own is deliberately displayed; the path built from it is not.
  const visibleHtml = built.html.replace(/href="[^"]*"/g, 'href=""');
  const visibleText = built.text
    .split("\n")
    .filter((line) => !/^\s*https?:\/\//.test(line))
    .join("\n");

  for (const body of [visibleHtml, visibleText]) {
    assert.ok(!body.includes(`${REQUEST_ID}/0-`), "object key displayed");
    assert.ok(!body.includes(`${REQUEST_ID}/1-`), "object key displayed");
    assert.ok(!body.includes("inbound-requests"), "bucket name displayed");
    assert.ok(!/Supabase/i.test(body), "storage vendor detail displayed");
    assert.ok(!body.includes("storage_path"), "column name displayed");
  }
  // Only the sanitized filenames are shown to the reader.
  assert.ok(visibleHtml.includes("attached.pdf"));
  assert.ok(visibleHtml.includes("linked.pdf"));
  // The signed URL is opaque and percent-encoded, so the path is not
  // readable even inside the href.
  assert.ok(built.html.includes("storage.example.test"));
  assert.ok(built.text.includes("storage.example.test"));
});

test("attached and linked files are labelled distinctly", async (t) => {
  t.after(clearStorageMock);
  const attachedPath = `${REQUEST_ID}/0-a.pdf`;
  const linkedPath = `${REQUEST_ID}/1-b.pdf`;
  installStorageMock({
    objects: { [attachedPath]: Buffer.from("x"), [linkedPath]: Buffer.from("y") }
  });

  const plan = await prepareRequestAttachments(REQUEST_ID, [
    row(attachedPath, "a.pdf", 1, "application/pdf"),
    row(linkedPath, "b.pdf", ATTACHMENT_ENCODED_BUDGET_BYTES, "application/pdf")
  ]);

  const built = buildRequestNotificationEmail(
    baseInput({ files: plan.files, warnings: plan.warnings })
  );

  assert.ok(built.html.includes("Attached to this email"));
  assert.ok(built.html.includes("Secure download"));
  assert.ok(built.html.includes("Link expires in 7 days"));
  assert.ok(built.text.includes("Status: attached to this email"));
  assert.ok(built.text.includes("expires in 7 days"));
  // Every button URL is spelled out in the plain-text part.
  const linked = plan.files.find((f) => f.delivery === "link");
  assert.ok(built.text.includes(linked.downloadUrl));
  assert.ok(built.html.includes(`href="${linked.downloadUrl.replace(/&/g, "&amp;")}"`));
});

// ── Delivery wiring ──────────────────────────────────────────────────

test("prepared attachments are handed to the provider as real attachments", () => {
  assert.ok(notifySource.includes("attachments: plan.attachments.map("));
  assert.ok(notifySource.includes("filename: attachment.filename"));
  assert.ok(notifySource.includes("content: attachment.content"));
  assert.ok(notifySource.includes("contentType: attachment.contentType"));
  // The old behaviour — naming a bucket in the body — is gone.
  assert.ok(!notifySource.includes("Supabase dashboard"));
  assert.ok(!notifySource.includes("Storage > inbound-requests"));
});

test("a provider or storage failure never loses the notification or the request", () => {
  // Preparation failure degrades to naming every file with a warning.
  assert.ok(notifySource.includes('delivery: "unavailable" as const'));
  assert.ok(notifySource.includes("They remain safely in storage"));
  // Send failure is recorded durably for the retry sweep, and never
  // turns the visitor's submission into an error.
  assert.ok(notifySource.includes('internal_notification_status: "failed"'));
  assert.ok(notifySource.includes("internal_notification_last_error"));
  assert.ok(notifySource.includes("retryUnsentNotifications"));
});

test("document bytes are never logged", () => {
  const combined = `${notifySource}`;
  assert.ok(!/console\.(log|info|warn|error)/.test(combined), "no logging in the delivery path");
});

// ── Existing behaviour preserved ─────────────────────────────────────

test("validation, upload limits and anti-spam behaviour are unchanged", () => {
  assert.ok(validationSource.includes('website: z.string().max(0, "").optional()'), "honeypot");
  assert.ok(validationSource.includes('.min(1, "Attach at least one file.")'));
  assert.ok(validationSource.includes("MAX_FILES"));
  assert.ok(validationSource.includes("MAX_FILE_SIZE_BYTES"));
  assert.ok(validationSource.includes("MAX_TOTAL_SIZE_BYTES"));
  assert.ok(validationSource.includes("isAllowedFile(file.filename, file.mimeType)"));

  assert.ok(routeSource.includes("RATE_LIMIT_MAX_PER_HOUR"), "rate limiting");
  assert.ok(routeSource.includes('{ error: "rate_limited" }'));
  assert.ok(routeSource.includes('{ error: "validation_failed"'));
  assert.ok(routeSource.includes("hmacIp(ip)"));
  // Uploads still go straight to storage over the signed TUS endpoint.
  assert.ok(routeSource.includes("/storage/v1/upload/resumable/sign"));
  assert.ok(routeSource.includes("createSignedUploads"));
});

test("the visitor-facing success condition is unchanged", async () => {
  const finalizeSource = await read("../app/api/requests/[id]/finalize/route.ts");
  // Success still follows verification plus the atomic DB transition, and
  // notification delivery remains a best-effort step afterwards.
  assert.ok(finalizeSource.includes("verifyUploadedFiles"));
  assert.ok(finalizeSource.includes('supabase.rpc(\n    "finalize_inbound_request"'));
  const rpcAt = finalizeSource.indexOf("finalize_inbound_request");
  const notifyAt = finalizeSource.indexOf("await deliverInternalNotification(requestId);\n  await deliverVisitorConfirmation");
  const successAt = finalizeSource.lastIndexOf("{ success: true, requestId }");
  assert.ok(rpcAt > -1 && notifyAt > rpcAt && successAt > notifyAt);
  // The form still only shows success on a finalize OK.
  assert.ok(formSource.includes("if (!finalizeRes.ok)"));
  assert.ok(formSource.includes('setStage("success")'));
});
