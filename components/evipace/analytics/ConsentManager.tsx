"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CONSENT_COOKIE_MAX_AGE_SECONDS,
  CONSENT_COOKIE_NAME,
  CONSENT_SETTINGS_EVENT,
  type ConsentDecision,
  parseConsentDecision,
  serializeConsentDecision
} from "./consent";
import { getConsentCopy, type ConsentLocale } from "./consent-copy";
import {
  disableGoogleAnalytics,
  initializeConsentDefaults,
  loadGoogleAnalytics,
  sendControlledPageView,
  updateAnalyticsConsent
} from "./GoogleAnalytics";

type ConsentManagerProps = {
  locale: ConsentLocale;
  measurementId: string;
};

function readCookie(name: string): string | undefined {
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function writeConsentCookie(decision: ConsentDecision): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${serializeConsentDecision(
    decision
  )}; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

function deleteCookieForDomain(name: string, domain?: string): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const domainPart = domain ? `; Domain=${domain}` : "";
  document.cookie = `${name}=; Max-Age=0; Path=/${domainPart}; SameSite=Lax${secure}`;
}

function candidateCookieDomains(hostname: string): string[] {
  if (!hostname || hostname === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return [];
  }

  const parts = hostname.split(".");
  const domains = new Set<string>();
  for (let index = 0; index <= Math.max(0, parts.length - 2); index += 1) {
    const domain = parts.slice(index).join(".");
    domains.add(domain);
    domains.add(`.${domain}`);
  }
  return Array.from(domains);
}

function removeGoogleAnalyticsCookies(): void {
  const gaCookieNames = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  for (const name of gaCookieNames) {
    deleteCookieForDomain(name);
    for (const domain of candidateCookieDomains(window.location.hostname)) {
      deleteCookieForDomain(name, domain);
    }
  }
}

export function ConsentManager({ locale, measurementId }: ConsentManagerProps) {
  const pathname = usePathname();
  const copy = getConsentCopy(locale);
  const [decision, setDecision] = useState<ConsentDecision | null>(() =>
    typeof document === "undefined"
      ? null
      : parseConsentDecision(readCookie(CONSENT_COOKIE_NAME))
  );
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const closeSettings = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  }, []);

  useEffect(() => {
    initializeConsentDefaults();

    if (decision === "accepted") {
      loadGoogleAnalytics(measurementId);
      sendControlledPageView(measurementId);
      return;
    }

    updateAnalyticsConsent("rejected");
  }, [decision, measurementId]);

  useEffect(() => {
    if (decision !== "accepted") return;
    loadGoogleAnalytics(measurementId);
    sendControlledPageView(measurementId);
  }, [decision, measurementId, pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const reveal = () => setReady(true);

    if (root.getAttribute("data-site-intro") === "done") {
      reveal();
      return;
    }

    const observer = new MutationObserver(() => {
      if (root.getAttribute("data-site-intro") === "done") {
        reveal();
        observer.disconnect();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-site-intro"] });

    const fallback = window.setTimeout(reveal, 3600);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    function onOpenSettings() {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }

    window.addEventListener(CONSENT_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, onOpenSettings);
  }, []);

  useEffect(() => {
    if (!open) return;
    const button = panelRef.current?.querySelector<HTMLButtonElement>("button");
    window.requestAnimationFrame(() => button?.focus());
  }, [open]);

  useEffect(() => {
    if (!open || decision === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeSettings();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeSettings, decision, open]);

  function choose(nextDecision: ConsentDecision) {
    writeConsentCookie(nextDecision);
    setDecision(nextDecision);
    setOpen(false);

    if (nextDecision === "accepted") {
      loadGoogleAnalytics(measurementId);
      sendControlledPageView(measurementId);
      previousFocusRef.current?.focus();
      return;
    }

    removeGoogleAnalyticsCookies();
    disableGoogleAnalytics(measurementId);
    previousFocusRef.current?.focus();
    if (document.querySelector("[data-evipace-ga4]")) {
      window.location.reload();
    }
  }

  if (!(open || decision === null) || !ready) return null;

  const status =
    decision === "accepted"
      ? copy.currentAccepted
      : decision === "rejected"
        ? copy.currentRejected
        : null;
  const isReopenedSettings = open && decision !== null;

  return (
    <section
      aria-labelledby="evipace-cookie-consent-title"
      className="cookie-consent"
      ref={panelRef}
    >
      <div className="cookie-consent__panel">
        <div className="cookie-consent__copy">
          {isReopenedSettings ? (
            <button
              aria-label={copy.close}
              className="cookie-consent__close"
              onClick={closeSettings}
              type="button"
            >
              ×
            </button>
          ) : null}
          {status ? <p className="cookie-consent__status">{status}</p> : null}
          <h2 id="evipace-cookie-consent-title">{copy.heading}</h2>
          <p>{copy.explanation}</p>
          <Link className="cookie-consent__link" href={copy.privacyPath}>
            {copy.privacyLink}
          </Link>
        </div>
        <div className="cookie-consent__actions">
          <button
            className="cookie-consent__button cookie-consent__button--secondary"
            onClick={() => choose("rejected")}
            type="button"
          >
            {copy.reject}
          </button>
          <button
            className="cookie-consent__button cookie-consent__button--primary"
            onClick={() => choose("accepted")}
            type="button"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </section>
  );
}
