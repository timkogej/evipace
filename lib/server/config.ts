import "server-only";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function bool(name: string, fallback: boolean): boolean {
  const value = process.env[name];
  if (value === undefined) return fallback;
  return value === "true" || value === "1";
}

/**
 * Derives the direct Storage hostname (<project-ref>.storage.supabase.co)
 * from SUPABASE_URL (<project-ref>.supabase.co), rather than hardcoding
 * the project ref anywhere. Supabase's resumable (TUS) upload endpoint
 * must be reached via this direct Storage hostname — the main API
 * gateway hostname (SUPABASE_URL itself) does not route
 * /storage/v1/upload/resumable and returns 404 for it.
 */
function deriveStorageUrl(supabaseUrl: string): string {
  const parsed = new URL(supabaseUrl);
  const labels = parsed.hostname.split(".");
  const [projectRef, domain, tld] = [
    labels[0],
    labels[labels.length - 2],
    labels[labels.length - 1]
  ];

  if (labels.length < 3 || domain !== "supabase" || tld !== "co") {
    throw new Error(
      `Cannot derive the Storage URL: SUPABASE_URL ("${supabaseUrl}") does not match the expected <project-ref>.supabase.co pattern.`
    );
  }

  return `https://${projectRef}.storage.supabase.co`;
}

/**
 * All server-only configuration for the ESG request-upload feature. Reading
 * any of the `required*` accessors throws immediately with a clear message
 * if the variable is missing — fail loudly at request time rather than
 * silently misbehaving.
 */
export const requestUploadsConfig = {
  /** Master switch. Defaults to false — must be explicitly enabled. */
  uploadsEnabled: () => bool("EVIPACE_REQUEST_UPLOADS_ENABLED", false),
  /** Visitor-facing confirmation email. Defaults to false pending a verified Evipace sending domain. */
  visitorConfirmationEnabled: () =>
    bool("EVIPACE_VISITOR_CONFIRMATION_ENABLED", false),

  supabaseUrl: () => required("SUPABASE_URL"),
  /**
   * The direct Storage hostname, for the TUS resumable-upload endpoint
   * specifically — see deriveStorageUrl() above for why this differs
   * from supabaseUrl().
   */
  supabaseStorageUrl: () => deriveStorageUrl(requestUploadsConfig.supabaseUrl()),
  supabaseSecretKey: () => required("SUPABASE_SECRET_KEY"),
  storageBucket: () => process.env.SUPABASE_STORAGE_BUCKET?.trim() ?? "inbound-requests",

  resendApiKey: () => required("RESEND_API_KEY"),
  notificationRecipient: () => required("EVIPACE_REQUEST_NOTIFICATION_EMAIL"),
  notificationSender: () => required("EVIPACE_NOTIFICATION_SENDER_EMAIL"),
  confirmationSender: () => process.env.EVIPACE_CONFIRMATION_SENDER_EMAIL?.trim(),

  rateLimitHmacKey: () => required("RATE_LIMIT_HMAC_KEY"),
  submissionTokenHmacKey: () => required("SUBMISSION_TOKEN_HMAC_KEY"),

  /** Guards POST /api/requests/retry-notifications — for external scheduling only. */
  internalRetrySecret: () => required("INTERNAL_RETRY_SECRET")
};
