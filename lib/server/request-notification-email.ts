import "server-only";

/**
 * The single server-side builder for the internal "new ESG request"
 * notification, shared by the English and German request forms. Both
 * locales submit through the same API route and the same
 * deliverInternalNotification() call, so there is exactly one email
 * template — the submitted locale is reported as a field inside it rather
 * than by branching into a second template.
 *
 * The email is internal, so its chrome stays English; only the visitor's
 * own words are reproduced verbatim, and every one of those is escaped
 * before it reaches the HTML.
 *
 * Deliberately email-client-safe: table-based layout, inline CSS, no
 * JavaScript, no forms, no web fonts, no remotely loaded images. The one
 * <style> block carries a narrow-screen padding tweak only — the layout is
 * already correct without it, for clients that strip <style>.
 */

/** How a single uploaded document reached the recipient. */
export type FileDelivery = "attached" | "link" | "unavailable";

export type NotificationFile = {
  /** Sanitized display name — never a storage path. */
  filename: string;
  sizeBytes: number;
  mimeType: string;
  delivery: FileDelivery;
  /** Time-limited signed URL. Only set when delivery === "link". */
  downloadUrl?: string;
  /** Short operational note shown when delivery === "unavailable". */
  note?: string;
};

export type NotificationEmailInput = {
  requestId: string;
  /** ISO timestamp of the submission. */
  submittedAt: string;
  /** "en" | "de", or null when the record predates locale capture. */
  locale: string | null;
  name: string;
  email: string;
  company: string;
  deadline: string | null;
  message: string | null;
  files: NotificationFile[];
  /** Validity of any signed download link, in days. */
  linkExpiryDays: number;
  /** Operational warnings to surface — never containing storage paths. */
  warnings: string[];
};

export type BuiltEmail = {
  subject: string;
  html: string;
  text: string;
};

const PALETTE = {
  page: "#f7f6f2",
  card: "#ffffff",
  cardWarm: "#fbfaf7",
  ink: "#151515",
  muted: "#66635f",
  border: "#e6e2d9",
  hairline: "#efece5",
  /** Decorative accent only — never behind or under text. */
  accent: "#fe7001",
  /** Text/button orange, darkened to clear WCAG AA against white. */
  accentText: "#b64f08",
  warnBg: "#fff6ec",
  warnBorder: "#f0c9a3"
};

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const NOT_PROVIDED = "Not provided";

/**
 * Escapes every character that could break out of HTML text or an
 * attribute value. Applied to all visitor-controlled input without
 * exception — name, company, deadline, message and filenames.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Escapes, then turns the visitor's own line breaks into <br />. Escaping
 * happens first, so a message containing markup is shown as text and can
 * never inject an element.
 */
export function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />");
}

/**
 * Strips CR/LF from anything placed in a mail header. Company names reach
 * the subject line, so this closes header injection at the boundary
 * rather than trusting the provider to do it.
 */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "unknown size";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 1 : 0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin"
  }).format(date) + " (Europe/Berlin)";
}

function formatLocale(locale: string | null): string {
  if (locale === "en") return "English form (/en/send-request)";
  if (locale === "de") return "German form (/de/send-request)";
  return "Not recorded";
}

function optional(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

// ── HTML fragments ───────────────────────────────────────────────────

function sectionLabel(label: string): string {
  return `<p style="margin:0 0 12px;font:700 11px/1.4 ${FONT_STACK};letter-spacing:1.4px;text-transform:uppercase;color:${PALETTE.muted};">${escapeHtml(label)}</p>`;
}

function hairline(): string {
  return `<div style="height:1px;line-height:1px;font-size:0;background:${PALETTE.hairline};margin:26px 0;">&nbsp;</div>`;
}

/**
 * One label/value pair. Rendered as a two-row stack on narrow screens by
 * virtue of being a full-width table with a fixed-width label cell that
 * degrades gracefully — no float, no flexbox, nothing Outlook drops.
 */
function detailRow(label: string, valueHtml: string): string {
  return `<tr>
        <td style="padding:0 0 10px;font:400 13px/1.5 ${FONT_STACK};color:${PALETTE.muted};width:110px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:0 0 10px;font:600 14px/1.55 ${FONT_STACK};color:${PALETTE.ink};vertical-align:top;">${valueHtml}</td>
      </tr>`;
}

function statusBadge(file: NotificationFile): string {
  const map: Record<FileDelivery, { text: string; color: string; bg: string; border: string }> = {
    attached: {
      text: "Attached to this email",
      color: "#1f5130",
      bg: "#eef6f0",
      border: "#cbe2d3"
    },
    link: {
      text: "Secure download",
      color: PALETTE.accentText,
      bg: PALETTE.warnBg,
      border: PALETTE.warnBorder
    },
    unavailable: {
      text: "Action needed",
      color: "#8a2b16",
      bg: "#fdeeea",
      border: "#f2c4b8"
    }
  };
  const style = map[file.delivery];
  return `<span style="display:inline-block;padding:3px 9px;border:1px solid ${style.border};background:${style.bg};color:${style.color};font:700 10px/1.5 ${FONT_STACK};letter-spacing:0.8px;text-transform:uppercase;border-radius:2px;">${escapeHtml(style.text)}</span>`;
}

function downloadButton(url: string, filename: string): string {
  const safeUrl = escapeHtml(url);
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:12px 0 0;">
            <tr>
              <td style="background:${PALETTE.accentText};border-radius:3px;">
                <a href="${safeUrl}" style="display:inline-block;padding:10px 18px;font:700 13px/1 ${FONT_STACK};color:#ffffff;text-decoration:none;">Download ${escapeHtml(filename)}</a>
              </td>
            </tr>
          </table>`;
}

function fileBlock(file: NotificationFile, expiryDays: number): string {
  const meta = `${formatBytes(file.sizeBytes)} &middot; ${escapeHtml(file.mimeType)}`;

  let extra = "";
  if (file.delivery === "link" && file.downloadUrl) {
    extra =
      downloadButton(file.downloadUrl, file.filename) +
      `<p style="margin:8px 0 0;font:400 12px/1.6 ${FONT_STACK};color:${PALETTE.muted};">Link expires in ${expiryDays} day${expiryDays === 1 ? "" : "s"}. Too large to attach to this email.</p>`;
  } else if (file.delivery === "unavailable") {
    extra = `<p style="margin:8px 0 0;font:400 12px/1.6 ${FONT_STACK};color:#8a2b16;">${escapeHtml(file.note ?? "Retrieve this document from secure storage.")}</p>`;
  }

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid ${PALETTE.border};border-radius:3px;background:${PALETTE.cardWarm};margin:0 0 12px;">
          <tr>
            <td style="padding:16px 18px;">
              <p style="margin:0 0 6px;font:600 14px/1.5 ${FONT_STACK};color:${PALETTE.ink};word-break:break-word;">${escapeHtml(file.filename)}</p>
              <p style="margin:0 0 10px;font:400 12px/1.5 ${FONT_STACK};color:${PALETTE.muted};">${meta}</p>
              ${statusBadge(file)}
              ${extra}
            </td>
          </tr>
        </table>`;
}

function warningBlock(warnings: string[]): string {
  if (warnings.length === 0) return "";
  const items = warnings
    .map(
      (warning) =>
        `<li style="margin:0 0 6px;font:400 13px/1.6 ${FONT_STACK};color:#8a2b16;">${escapeHtml(warning)}</li>`
    )
    .join("");
  return `${hairline()}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid ${PALETTE.warnBorder};background:${PALETTE.warnBg};border-radius:3px;">
          <tr>
            <td style="padding:16px 18px;">
              ${sectionLabel("Operational notice")}
              <ul style="margin:0;padding:0 0 0 18px;">${items}</ul>
            </td>
          </tr>
        </table>`;
}

export function buildRequestNotificationEmail(
  input: NotificationEmailInput
): BuiltEmail {
  const company = sanitizeHeaderValue(input.company);
  const subject = sanitizeHeaderValue(`New ESG request — ${company}`).slice(0, 180);

  const message = optional(input.message);
  const deadline = optional(input.deadline);

  const attachedCount = input.files.filter((f) => f.delivery === "attached").length;
  const linkCount = input.files.filter((f) => f.delivery === "link").length;

  const preheader = `${company} — ${input.files.length} document${input.files.length === 1 ? "" : "s"}, ${attachedCount} attached, ${linkCount} via secure link.`;

  const detailRows = [
    detailRow("Name", escapeHtml(input.name)),
    detailRow(
      "Email",
      `<a href="mailto:${escapeHtml(input.email)}" style="color:${PALETTE.accentText};text-decoration:underline;">${escapeHtml(input.email)}</a>`
    ),
    detailRow("Company", escapeHtml(company)),
    detailRow(
      "Deadline",
      deadline
        ? escapeHtml(deadline)
        : `<span style="font-weight:400;color:${PALETTE.muted};">${NOT_PROVIDED}</span>`
    )
  ].join("\n");

  const metaRows = [
    detailRow("Received", escapeHtml(formatTimestamp(input.submittedAt))),
    detailRow(
      "Reference",
      `<span style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:13px;">${escapeHtml(input.requestId)}</span>`
    ),
    detailRow("Locale", escapeHtml(formatLocale(input.locale)))
  ].join("\n");

  const filesHtml =
    input.files.length > 0
      ? input.files.map((file) => fileBlock(file, input.linkExpiryDays)).join("\n")
      : `<p style="margin:0;font:400 14px/1.7 ${FONT_STACK};color:${PALETTE.muted};">${NOT_PROVIDED}</p>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(subject)}</title>
<style>
  @media only screen and (max-width: 480px) {
    .evi-pad { padding-left: 20px !important; padding-right: 20px !important; }
    .evi-outer { padding: 16px 8px !important; }
    .evi-title { font-size: 22px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${PALETTE.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:${PALETTE.page};">
  <tr>
    <td class="evi-outer" align="center" style="padding:32px 16px;">
      <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:620px;">

        <tr>
          <td style="padding:0 0 14px;font:700 12px/1.4 ${FONT_STACK};letter-spacing:2.6px;text-transform:uppercase;color:${PALETTE.ink};">EVIPACE</td>
        </tr>

        <tr>
          <td style="background:${PALETTE.card};border:1px solid ${PALETTE.border};border-top:3px solid ${PALETTE.accent};border-radius:4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
              <tr>
                <td class="evi-pad" style="padding:32px 36px 36px;">

                  <p style="margin:0 0 10px;font:700 11px/1.4 ${FONT_STACK};letter-spacing:1.6px;text-transform:uppercase;color:${PALETTE.accentText};">New ESG request</p>
                  <h1 class="evi-title" style="margin:0 0 22px;font:400 27px/1.25 ${FONT_STACK};color:${PALETTE.ink};">A new ESG request has arrived</h1>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
${metaRows}
                  </table>

                  ${hairline()}

                  ${sectionLabel("Contact")}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
${detailRows}
                  </table>

                  ${hairline()}

                  ${sectionLabel("Message")}
                  ${
                    message
                      ? `<p style="margin:0;font:400 14px/1.75 ${FONT_STACK};color:${PALETTE.ink};word-break:break-word;">${escapeMultiline(message)}</p>`
                      : `<p style="margin:0;font:400 14px/1.75 ${FONT_STACK};color:${PALETTE.muted};">${NOT_PROVIDED}</p>`
                  }

                  ${hairline()}

                  ${sectionLabel(`Uploaded documents (${input.files.length})`)}
                  ${filesHtml}
                  ${warningBlock(input.warnings)}

                  ${hairline()}

                  <p style="margin:0;font:400 12px/1.7 ${FONT_STACK};color:${PALETTE.muted};">Treat the company facts and uploaded documents above as confidential. Review them on a secure device, and do not forward this email or its download links outside Evipace.</p>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 4px 0;font:400 12px/1.6 ${FONT_STACK};color:${PALETTE.muted};">Sent automatically by the Evipace website request form. Reply directly to this email to answer the sender.</td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  // ── Plain-text fallback: the same information, every button URL spelled out.
  const textLines: string[] = [
    "EVIPACE — NEW ESG REQUEST",
    "A new ESG request has arrived",
    "",
    `Received:  ${formatTimestamp(input.submittedAt)}`,
    `Reference: ${input.requestId}`,
    `Locale:    ${formatLocale(input.locale)}`,
    "",
    "CONTACT",
    `Name:     ${input.name}`,
    `Email:    ${input.email}`,
    `Company:  ${company}`,
    `Deadline: ${deadline ?? NOT_PROVIDED}`,
    "",
    "MESSAGE",
    message ?? NOT_PROVIDED,
    "",
    `UPLOADED DOCUMENTS (${input.files.length})`
  ];

  if (input.files.length === 0) {
    textLines.push(NOT_PROVIDED);
  } else {
    for (const file of input.files) {
      textLines.push("");
      textLines.push(`- ${file.filename} (${formatBytes(file.sizeBytes)}, ${file.mimeType})`);
      if (file.delivery === "attached") {
        textLines.push("  Status: attached to this email");
      } else if (file.delivery === "link" && file.downloadUrl) {
        textLines.push(
          `  Status: secure download, expires in ${input.linkExpiryDays} day${input.linkExpiryDays === 1 ? "" : "s"}`
        );
        textLines.push(`  ${file.downloadUrl}`);
      } else {
        textLines.push(`  Status: action needed — ${file.note ?? "retrieve from secure storage"}`);
      }
    }
  }

  if (input.warnings.length > 0) {
    textLines.push("", "OPERATIONAL NOTICE");
    for (const warning of input.warnings) textLines.push(`- ${warning}`);
  }

  textLines.push(
    "",
    "Treat the company facts and uploaded documents above as confidential.",
    "Review them on a secure device, and do not forward this email or its",
    "download links outside Evipace.",
    "",
    "Sent automatically by the Evipace website request form.",
    "Reply directly to this email to answer the sender."
  );

  return { subject, html, text: textLines.join("\n") };
}
