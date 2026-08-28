export const CONSENT_COOKIE_NAME = "evipace_cookie_consent";
export const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
export const CONSENT_COOKIE_VERSION = "v1";
export const CONSENT_SETTINGS_EVENT = "evipace:open-cookie-settings";

export type ConsentDecision = "accepted" | "rejected";
export type ConsentCookieValue = `${typeof CONSENT_COOKIE_VERSION}:${ConsentDecision}`;

export const consentDefaults = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied"
} as const;

export const analyticsGrantedConsent = {
  analytics_storage: "granted",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied"
} as const;

export const analyticsDeniedConsent = {
  ...consentDefaults
} as const;

export function serializeConsentDecision(decision: ConsentDecision): ConsentCookieValue {
  return `${CONSENT_COOKIE_VERSION}:${decision}`;
}

export function parseConsentDecision(value: string | undefined): ConsentDecision | null {
  if (value === serializeConsentDecision("accepted")) return "accepted";
  if (value === serializeConsentDecision("rejected")) return "rejected";
  return null;
}

export function privacyPathForLocale(locale: "en" | "de"): string {
  return `/${locale}/privacy`;
}
