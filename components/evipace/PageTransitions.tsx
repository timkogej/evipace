"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Longest a transition may hold the old page before giving up. */
const MAX_WAIT_MS = 2500;
/** Longest the browser may take to capture the old page before we skip the effect. */
const START_TIMEOUT_MS = 400;

/**
 * Soft cross-fade between pages for in-site links, using the browser's View
 * Transitions API. Browsers without it, reduced motion, modified clicks, new
 * tabs, downloads, hash links and other sites all navigate exactly as before.
 * The header keeps its own name in CSS, so it stays put while pages change.
 */
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const finish = useRef<(() => void) | null>(null);

  // The new page has rendered: let the transition animate to it.
  useEffect(() => {
    finish.current?.();
    finish.current = null;
  }, [pathname]);

  useEffect(() => {
    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link || link.target && link.target !== "_self" || link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      const here = window.location;
      if (url.origin !== here.origin) return;
      // Files (PDFs, templates) and API routes are not pages.
      if (/\.[a-z0-9]+$/i.test(url.pathname) || url.pathname.startsWith("/api/")) return;
      // Same page (only the hash or nothing changes): leave it to the browser.
      if (url.pathname === here.pathname && url.search === here.search) return;

      event.preventDefault();
      const href = url.pathname + url.search + url.hash;
      let pushed = false;
      const transition = document.startViewTransition(() => {
        if (pushed) return;
        pushed = true;
        return new Promise<void>((resolve) => {
          const timer = window.setTimeout(resolve, MAX_WAIT_MS);
          finish.current = () => {
            window.clearTimeout(timer);
            resolve();
          };
          router.push(href);
        });
      });
      // A skipped transition rejects these promises; that is expected, not an error.
      const ignore = () => {};
      transition.ready.catch(ignore);
      transition.finished.catch(ignore);
      transition.updateCallbackDone.catch(ignore);
      // If the browser cannot start the transition promptly (no frames are
      // being painted), skip the effect and navigate normally.
      window.setTimeout(() => {
        if (pushed) return;
        pushed = true;
        transition.skipTransition();
        router.push(href);
      }, START_TIMEOUT_MS);
    };

    // Capture phase, so this runs before Next's own <Link> handler.
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
