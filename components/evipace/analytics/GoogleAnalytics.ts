import {
  analyticsDeniedConsent,
  analyticsGrantedConsent,
  consentDefaults
} from "./consent";

type ConsentPayload = typeof consentDefaults;
type ConsentUpdatePayload = {
  analytics_storage: "granted" | "denied";
  ad_storage: "denied";
  ad_user_data: "denied";
  ad_personalization: "denied";
};

type GtagCommand =
  | ["consent", "default" | "update", ConsentPayload]
  | ["consent", "update", ConsentUpdatePayload]
  | ["js", Date]
  | ["config", string, { send_page_view: false; allow_google_signals: false; allow_ad_personalization_signals: false }]
  | ["event", "page_view", { page_title: string; page_location: string; page_path: string; send_to: string }];

declare global {
  interface Window {
    // gtag.js appends its own bookkeeping entries to the same queue, so the
    // data layer is deliberately not typed as our command tuples only.
    dataLayer?: unknown[];
    gtag?: (...args: GtagCommand) => void;
    __evipaceGa?: {
      id: string;
      configured: boolean;
      scriptLoading: boolean;
      lastPagePath?: string;
      disabled: boolean;
    };
  }
}

function safePageLocation(): string {
  return `${window.location.origin}${window.location.pathname}`;
}

function safePagePath(): string {
  return window.location.pathname;
}

// The last consent state actually queued, so repeated renders and route
// changes cannot pile identical `consent update` commands onto the queue.
let queuedConsentDecision: "accepted" | "rejected" | null = null;

export function initializeConsentDefaults(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];

  // Bootstrap exactly once per page load: the presence of window.gtag is the
  // marker, so the Consent Mode defaults are queued once and only once.
  if (window.gtag) return;

  /*
   * gtag.js only *executes* a data-layer entry when that entry is a real
   * `arguments` object — it walks the queue and ignores anything else. The
   * previous implementation pushed a plain array (`push(args)` with a rest
   * parameter), so every consent/js/config/event command was queued but
   * never interpreted: the loader ran, and GA4 collected nothing. Keeping
   * the canonical `push(arguments)` shape is what makes the queue live.
   */
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  }

  window.gtag = gtag;
  window.gtag("consent", "default", consentDefaults);
}

export function updateAnalyticsConsent(decision: "accepted" | "rejected"): void {
  initializeConsentDefaults();
  if (queuedConsentDecision === decision) return;

  queuedConsentDecision = decision;
  window.gtag?.(
    "consent",
    "update",
    decision === "accepted" ? analyticsGrantedConsent : analyticsDeniedConsent
  );
}

export function loadGoogleAnalytics(measurementId: string): void {
  if (!measurementId || typeof document === "undefined") return;
  initializeConsentDefaults();

  const state =
    window.__evipaceGa ??
    (window.__evipaceGa = {
      id: measurementId,
      configured: false,
      scriptLoading: false,
      disabled: false
    });

  if (state.disabled || state.id !== measurementId) return;

  updateAnalyticsConsent("accepted");

  if (
    !state.scriptLoading &&
    !document.querySelector(`script[data-evipace-ga4="${measurementId}"]`)
  ) {
    state.scriptLoading = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.evipaceGa4 = measurementId;
    script.addEventListener("error", () => {
      state.scriptLoading = false;
    });
    document.head.appendChild(script);
  }

  if (!state.configured) {
    window.gtag?.("js", new Date());
    window.gtag?.("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    state.configured = true;
  }
}

export function sendControlledPageView(measurementId: string): void {
  const state = window.__evipaceGa;
  if (!measurementId || !state || state.disabled || !state.configured) return;

  const pagePath = safePagePath();
  if (state.lastPagePath === pagePath) return;

  state.lastPagePath = pagePath;
  window.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: safePageLocation(),
    page_path: pagePath,
    send_to: measurementId
  });
}

export function disableGoogleAnalytics(measurementId: string): void {
  updateAnalyticsConsent("rejected");
  window.__evipaceGa = {
    id: measurementId,
    configured: false,
    scriptLoading: false,
    disabled: true
  };
}
