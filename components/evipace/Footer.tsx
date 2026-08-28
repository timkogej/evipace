"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CONSENT_SETTINGS_EVENT } from "@/components/evipace/analytics/consent";
import { getConsentCopy } from "@/components/evipace/analytics/consent-copy";
import {
  getLanguageDestinations,
  isCurrentNavigationItem,
  siteNavigation,
  type SiteLocale
} from "@/lib/site-navigation";
import { BrandLogo } from "./BrandLogo";

type FooterProps = { locale: SiteLocale };

export function Footer({ locale }: FooterProps) {
  const pathname = usePathname();
  const navigation = siteNavigation[locale];
  const languageDestinations = getLanguageDestinations(locale, pathname);
  const consent = getConsentCopy(locale);

  function openCookieSettings() {
    window.dispatchEvent(new CustomEvent(CONSENT_SETTINGS_EVENT));
  }

  return (
    <footer className="site-footer border-t border-[rgba(21,21,21,0.1)] bg-[var(--warm)] pb-8 pt-16 text-ink">
      <div className="site-shell">
        <div className="grid gap-12 border-b border-[rgba(21,21,21,0.12)] pb-12 xl:grid-cols-[0.75fr_1.55fr] xl:gap-16">
          <div>
            <Link
              aria-label={navigation.home.label}
              className="inline-flex"
              href={navigation.home.href}
            >
              <BrandLogo variant="footer" />
            </Link>
            <p className="mt-5 text-lg font-semibold text-[rgba(21,21,21,0.66)]">
              ESG, done faster.
            </p>
            <Link
              aria-current={
                isCurrentNavigationItem(pathname, navigation.primaryAction.href)
                  ? "page"
                  : undefined
              }
              className="group mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-orange bg-orange px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-[#e96500] hover:bg-[#e96500]"
              href={navigation.primaryAction.href}
            >
              <span>{navigation.primaryAction.label}</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div
            className={`grid gap-x-8 gap-y-10 sm:grid-cols-2 ${
              navigation.footerColumns.length > 3
                ? "lg:grid-cols-4"
                : "lg:grid-cols-3"
            }`}
          >
            {navigation.footerColumns.map((column) => (
              <section key={column.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-orange">
                  {column.title}
                </h2>
                <ul className="mt-5 grid gap-3">
                  {column.links.map((link) => {
                    const current = isCurrentNavigationItem(pathname, link.href);
                    const className = `text-sm leading-6 transition ${
                      current
                        ? "font-bold text-ink"
                        : "font-semibold text-[rgba(21,21,21,0.62)] hover:text-ink"
                    }`;

                    return (
                      <li key={`${column.title}-${link.href}-${link.label}`}>
                        {link.href.startsWith("mailto:") ? (
                          <a className={className} href={link.href}>
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            aria-current={current ? "page" : undefined}
                            className={className}
                            href={link.href}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-sm font-semibold text-[rgba(21,21,21,0.5)] sm:flex-row sm:items-start sm:justify-between">
          <p>&copy; Evipace</p>
          <div>
            <p className="sr-only">{navigation.labels.language}</p>
            <div className="flex flex-wrap items-start justify-start gap-4 sm:justify-end">
              <button
                className="font-semibold transition hover:text-ink"
                onClick={openCookieSettings}
                type="button"
              >
                {consent.reopen}
              </button>
              {languageDestinations.map((destination) => (
                <Link
                  aria-current={destination.isCurrent ? "page" : undefined}
                  className={
                    destination.isCurrent
                      ? "font-bold text-ink"
                      : "transition hover:text-ink"
                  }
                  href={destination.href}
                  key={destination.locale}
                  title={
                    destination.isEquivalent
                      ? undefined
                      : navigation.labels.unavailableTranslation
                  }
                >
                  {destination.label}
                  {!destination.isEquivalent ? (
                    <span className="ml-2 text-xs font-normal text-[rgba(21,21,21,0.46)]">
                      · {navigation.labels.unavailableTranslation}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
