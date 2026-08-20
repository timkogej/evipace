import "server-only";

function required(name: string): string {
  const value = process.env[name];
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
  supabaseSecretKey: () => required("SUPABASE_SECRET_KEY"),
  storageBucket: () => process.env.SUPABASE_STORAGE_BUCKET ?? "inbound-requests",

  resendApiKey: () => required("RESEND_API_KEY"),
  notificationRecipient: () => required("EVIPACE_REQUEST_NOTIFICATION_EMAIL"),
  notificationSender: () => required("EVIPACE_NOTIFICATION_SENDER_EMAIL"),
  confirmationSender: () => process.env.EVIPACE_CONFIRMATION_SENDER_EMAIL,

  rateLimitHmacKey: () => required("RATE_LIMIT_HMAC_KEY"),
  submissionTokenHmacKey: () => required("SUBMISSION_TOKEN_HMAC_KEY"),

  /** Guards POST /api/requests/retry-notifications — for external scheduling only. */
  internalRetrySecret: () => required("INTERNAL_RETRY_SECRET")
};
