"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import {
  getActiveNavigationSection,
  getLanguageDestinations,
  isCurrentNavigationItem,
  siteNavigation,
  type NavigationDirectory,
  type SiteLocale
} from "@/lib/site-navigation";
import { BrandLogo } from "./BrandLogo";

type NavbarProps = { locale: SiteLocale };
type DesktopPanel = NavigationDirectory["id"] | "language" | null;

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const navigation = siteNavigation[locale];
  const activeSection = getActiveNavigationSection(locale, pathname);
  const languageDestinations = getLanguageDestinations(locale, pathname);
  const [scrolled, setScrolled] = useState(false);
  const [desktopPanel, setDesktopPanel] = useState<DesktopPanel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSections, setMobileSections] = useState<Set<string>>(
    () =>
      new Set(
        activeSection === "services" || activeSection === "resources"
          ? [activeSection]
          : []
      )
  );
  const headerRef = useRef<HTMLElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const closeAll = () => {
    setDesktopPanel(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!desktopPanel) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setDesktopPanel(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [desktopPanel]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mobileOpen) {
          event.preventDefault();
          setMobileOpen(false);
          requestAnimationFrame(() => mobileButtonRef.current?.focus());
        } else if (desktopPanel) {
          event.preventDefault();
          const panel = desktopPanel;
          setDesktopPanel(null);
          requestAnimationFrame(() => triggerRefs.current[panel]?.focus());
        }
        return;
      }

      if (event.key !== "Tab" || !mobileOpen || !mobilePanelRef.current) return;
      const panelItems = Array.from(
        mobilePanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);
      const items = mobileButtonRef.current
        ? [mobileButtonRef.current, ...panelItems]
        : panelItems;
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [desktopPanel, mobileOpen]);

  const toggleMobileSection = (id: string) => {
    setMobileSections((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const solid = scrolled || mobileOpen || Boolean(desktopPanel);

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 transition duration-300 ${
          solid
            ? "border-b border-[rgba(21,21,21,0.08)] bg-[rgba(250,249,246,0.94)] shadow-[0_18px_60px_rgba(21,21,21,0.06)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
        ref={headerRef}
      >
      <nav
        aria-label={navigation.labels.primaryNavigation}
        className="site-shell flex h-20 items-center justify-between gap-5"
      >
        <Link
          aria-label={navigation.home.label}
          className="inline-flex h-16 shrink-0 items-center pr-3 lg:pr-5"
          href={navigation.home.href}
          onClick={closeAll}
        >
          <BrandLogo priority />
        </Link>

        <div className="hidden min-w-0 items-center justify-center gap-5 lg:flex xl:gap-7">
          <Link
            aria-current={activeSection === "home" ? "page" : undefined}
            className={`relative inline-flex min-h-11 items-center rounded-md px-1 text-sm font-semibold transition ${
              activeSection === "home"
                ? "text-ink after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:rounded-full after:bg-orange"
                : "text-[rgba(21,21,21,0.64)] hover:text-ink"
            }`}
            href={navigation.homeLink.href}
            onClick={closeAll}
          >
            {navigation.homeLink.label}
          </Link>

          {navigation.directories.map((directory) => {
            const isOpen = desktopPanel === directory.id;
            const isActive = activeSection === directory.id;
            const panelId = `desktop-${locale}-${directory.id}`;

            return (
              <div className="relative" key={directory.id}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={`relative inline-flex min-h-11 items-center rounded-md px-1 text-sm font-semibold transition ${
                    isActive
                      ? "text-ink after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:rounded-full after:bg-orange"
                      : "text-[rgba(21,21,21,0.64)] hover:text-ink"
                  }`}
                  onClick={() =>
                    setDesktopPanel((current) =>
                      current === directory.id ? null : directory.id
                    )
                  }
                  ref={(element) => {
                    triggerRefs.current[directory.id] = element;
                  }}
                  type="button"
                >
                  {directory.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={`ml-1.5 h-3.5 w-3.5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen ? (
                  <DesktopDirectory
                    directory={directory}
                    id={panelId}
                    onNavigate={closeAll}
                    pathname={pathname}
                  />
                ) : null}
              </div>
            );
          })}

          {navigation.directLinks.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`relative inline-flex min-h-11 items-center rounded-md px-1 text-sm font-semibold transition ${
                  isActive
                    ? "text-ink after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:rounded-full after:bg-orange"
                    : "text-[rgba(21,21,21,0.64)] hover:text-ink"
                }`}
                href={item.href}
                key={item.href}
                onClick={closeAll}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <div className="relative">
            <button
              aria-controls={`desktop-${locale}-language`}
              aria-expanded={desktopPanel === "language"}
              aria-haspopup="true"
              aria-label={`${navigation.labels.language}: ${locale.toUpperCase()}`}
              className="inline-flex min-h-11 items-center rounded-md px-2 text-xs font-bold tracking-[0.12em] text-[rgba(21,21,21,0.62)] transition hover:text-ink"
              onClick={() =>
                setDesktopPanel((current) =>
                  current === "language" ? null : "language"
                )
              }
              ref={(element) => {
                triggerRefs.current.language = element;
              }}
              type="button"
            >
              {locale.toUpperCase()}
              <ChevronDown
                aria-hidden="true"
                className={`ml-1.5 h-3.5 w-3.5 transition-transform ${
                  desktopPanel === "language" ? "rotate-180" : ""
                }`}
              />
            </button>
            {desktopPanel === "language" ? (
              <div
                className="absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-2xl border border-[rgba(21,21,21,0.1)] bg-[rgba(255,255,255,0.98)] p-2 shadow-[0_24px_70px_rgba(21,21,21,0.12)]"
                id={`desktop-${locale}-language`}
              >
                <p className="px-3 pb-2 pt-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-orange">
                  {navigation.labels.language}
                </p>
                {languageDestinations.map((destination) => (
                  <LanguageLink
                    destination={destination}
                    key={destination.locale}
                    locale={locale}
                    onNavigate={closeAll}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <Link
            aria-current={
              isCurrentNavigationItem(pathname, navigation.primaryAction.href)
                ? "page"
                : undefined
            }
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-orange bg-orange px-4 py-2.5 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#e96500] hover:bg-[#e96500]"
            href={navigation.primaryAction.href}
            onClick={closeAll}
          >
            <span>{navigation.primaryAction.label}</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <button
          aria-controls={`mobile-${locale}-navigation`}
          aria-expanded={mobileOpen}
          aria-label={
            mobileOpen
              ? navigation.labels.closeNavigation
              : navigation.labels.openNavigation
          }
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(21,21,21,0.14)] bg-white/80 text-ink shadow-[0_10px_30px_rgba(21,21,21,0.08)] backdrop-blur lg:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          ref={mobileButtonRef}
          type="button"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      </header>

      {mobileOpen ? (
        <div
          aria-labelledby={`mobile-${locale}-navigation-title`}
          aria-modal="true"
          className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto overscroll-contain border-t border-[rgba(21,21,21,0.08)] bg-[rgba(250,249,246,0.98)] px-[var(--section-x)] pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl lg:hidden"
          id={`mobile-${locale}-navigation`}
          ref={mobilePanelRef}
          role="dialog"
        >
          <div className="mx-auto max-w-[38rem]">
            <h2 className="sr-only" id={`mobile-${locale}-navigation-title`}>
              {navigation.labels.mobileNavigationTitle}
            </h2>
            <div className="divide-y divide-[rgba(21,21,21,0.1)]">
              <Link
                aria-current={activeSection === "home" ? "page" : undefined}
                className={`flex min-h-16 items-center py-3 text-xl font-semibold ${
                  activeSection === "home" ? "text-orange" : "text-ink"
                }`}
                href={navigation.homeLink.href}
                onClick={closeAll}
              >
                {navigation.homeLink.label}
              </Link>
              {navigation.directories.map((directory) => {
                const isOpen = mobileSections.has(directory.id);
                const isActive = activeSection === directory.id;
                const panelId = `mobile-${locale}-${directory.id}`;
                return (
                  <section key={directory.id}>
                    <button
                      aria-controls={panelId}
                      aria-expanded={isOpen}
                      className={`flex min-h-16 w-full items-center justify-between gap-4 py-3 text-left text-xl font-semibold ${
                        isActive ? "text-orange" : "text-ink"
                      }`}
                      onClick={() => toggleMobileSection(directory.id)}
                      type="button"
                    >
                      <span>{directory.label}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen ? (
                      <MobileDirectory
                        directory={directory}
                        id={panelId}
                        onNavigate={closeAll}
                        pathname={pathname}
                      />
                    ) : null}
                  </section>
                );
              })}
              {navigation.directLinks.map((item) => {
                const isActive = activeSection === item.section;
                return (
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-16 items-center py-3 text-xl font-semibold ${
                      isActive ? "text-orange" : "text-ink"
                    }`}
                    href={item.href}
                    key={item.href}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <section className="mt-6 border-t border-[rgba(21,21,21,0.1)] pt-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-orange">
                {navigation.labels.language}
              </h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {languageDestinations.map((destination) => (
                  <LanguageLink
                    destination={destination}
                    key={destination.locale}
                    locale={locale}
                    mobile
                    onNavigate={closeAll}
                  />
                ))}
              </div>
            </section>

            <Link
              aria-current={
                isCurrentNavigationItem(pathname, navigation.primaryAction.href)
                  ? "page"
                  : undefined
              }
              className="mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-lg border border-orange bg-orange px-5 py-3 text-center text-sm font-bold text-white transition hover:border-[#e96500] hover:bg-[#e96500]"
              href={navigation.primaryAction.href}
              onClick={closeAll}
            >
              <span>{navigation.primaryAction.label}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

type DirectoryProps = {
  directory: NavigationDirectory;
  id: string;
  pathname: string;
  onNavigate: () => void;
};

function DesktopDirectory({ directory, id, pathname, onNavigate }: DirectoryProps) {
  const gridClass =
    directory.groups.length >= 4
      ? "lg:grid-cols-4"
      : directory.groups.length === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-1";
  const widthClass =
    directory.groups.length >= 4
      ? "w-[min(74rem,calc(100vw-3rem))]"
      : directory.groups.length === 3
        ? "w-[min(58rem,calc(100vw-3rem))]"
        : "w-[28rem]";

  return (
    <div
      className={`fixed left-1/2 top-[4.75rem] -translate-x-1/2 rounded-[1.35rem] border border-[rgba(21,21,21,0.1)] bg-[rgba(255,255,255,0.98)] p-6 shadow-[0_30px_90px_rgba(21,21,21,0.13)] ${widthClass}`}
      id={id}
    >
      <div className={`grid gap-7 ${gridClass}`}>
        {directory.groups.map((group) => (
          <section key={group.label}>
            <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.17em] text-orange">
              {group.label}
            </h2>
            <ul className="mt-3 grid gap-1.5">
              {group.items.map((item) => {
                const current = isCurrentNavigationItem(pathname, item.href);
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        aria-current={current ? "page" : undefined}
                        className={`relative block rounded-xl px-3 py-2.5 text-sm leading-5 transition ${
                          current
                            ? "bg-[var(--soft-orange)] font-bold text-ink before:absolute before:bottom-2.5 before:left-0 before:top-2.5 before:w-0.5 before:rounded-full before:bg-orange"
                            : "font-semibold text-[rgba(21,21,21,0.68)] hover:bg-[var(--paper)] hover:text-ink"
                        }`}
                        href={item.href}
                        onClick={onNavigate}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="block px-3 py-2 text-sm font-semibold leading-5 text-[rgba(21,21,21,0.64)]">
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      {directory.actions?.length ? (
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-[rgba(21,21,21,0.1)] pt-4">
          {directory.actions.map((action) => {
            const current = isCurrentNavigationItem(pathname, action.href);

            return (
              <Link
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-bold transition ${
                  current
                    ? "bg-[var(--soft-orange)] text-ink"
                    : "text-ink hover:text-orange"
                }`}
                href={action.href}
                key={action.href}
                onClick={onNavigate}
              >
                {action.label}
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function MobileDirectory({ directory, id, pathname, onNavigate }: DirectoryProps) {
  return (
    <div className="pb-6" id={id}>
      <div className="grid gap-6 sm:grid-cols-2">
        {directory.groups.map((group) => (
          <section key={group.label}>
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-orange">
              {group.label}
            </h3>
            <ul className="mt-2 grid gap-1">
              {group.items.map((item) => {
                const current = isCurrentNavigationItem(pathname, item.href);
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        aria-current={current ? "page" : undefined}
                        className={`block min-h-11 rounded-xl px-3 py-2.5 text-sm leading-6 ${
                          current
                            ? "bg-[var(--soft-orange)] font-bold text-ink"
                            : "font-semibold text-[rgba(21,21,21,0.68)]"
                        }`}
                        href={item.href}
                        onClick={onNavigate}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="block px-3 py-2 text-sm font-semibold leading-6 text-[rgba(21,21,21,0.64)]">
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      {directory.actions?.length ? (
        <div className="mt-5 grid gap-2 border-t border-[rgba(21,21,21,0.1)] pt-4">
          {directory.actions.map((action) => {
            const current = isCurrentNavigationItem(pathname, action.href);

            return (
              <Link
                aria-current={current ? "page" : undefined}
                className={`flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-sm font-bold text-ink ${
                  current ? "bg-[var(--soft-orange)]" : ""
                }`}
                href={action.href}
                key={action.href}
                onClick={onNavigate}
              >
                {action.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-orange" />
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

type LanguageLinkProps = {
  destination: ReturnType<typeof getLanguageDestinations>[number];
  locale: SiteLocale;
  mobile?: boolean;
  onNavigate: () => void;
};

function LanguageLink({
  destination,
  locale,
  mobile = false,
  onNavigate
}: LanguageLinkProps) {
  const labels = siteNavigation[locale].labels;
  return (
    <Link
      aria-current={destination.isCurrent ? "page" : undefined}
      className={
        mobile
          ? `min-h-12 rounded-xl border px-4 py-3 text-sm transition ${
              destination.isCurrent
                ? "border-orange bg-[var(--soft-orange)] font-bold text-ink"
                : "border-[rgba(21,21,21,0.12)] bg-white/70 font-semibold text-ink"
            }`
          : `block rounded-xl px-3 py-2.5 text-sm transition ${
              destination.isCurrent
                ? "bg-[var(--paper)] font-bold text-ink"
                : "font-semibold text-[rgba(21,21,21,0.66)] hover:bg-[var(--paper)] hover:text-ink"
            }`
      }
      href={destination.href}
      onClick={onNavigate}
    >
      <span>{destination.label}</span>
      {destination.isCurrent && !mobile ? (
        <span className="ml-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-orange">
          {labels.currentLanguage}
        </span>
      ) : null}
      {!destination.isEquivalent ? (
        <span className="mt-1 block text-xs font-normal leading-5 text-muted">
          {labels.unavailableTranslation}
        </span>
      ) : null}
    </Link>
  );
}
