"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "../HomeLandingPage.module.css";

/** Blocks that reveal on their own. Only the outermost match counts, so a card
 *  moves as one piece and its inner paragraphs do not animate separately. */
const ITEM_SELECTOR = "h2, h3, p, li, figure, table, details, dl, img, svg, [data-reveal-item]";
/** Most items that can share one stagger, so long lists never wait. */
const MAX_STAGGER_STEPS = 6;

/**
 * Content is visible in the server HTML. After hydration, each block still
 * below the fold is hidden and then revealed as it scrolls into view. Blocks
 * that enter together follow each other in reading order, and headings rise
 * out of a mask. Reduced motion and missing IntersectionObserver leave
 * everything as rendered.
 */
export function RevealOnView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const items = Array.from(root.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter((item) => {
      const parent = item.parentElement?.closest(ITEM_SELECTOR);
      // Never hide what the reader already sees, including after a deep link.
      return !(parent && root.contains(parent)) && item.getBoundingClientRect().top > window.innerHeight;
    });
    if (items.length === 0) return;

    const order = new Map(items.map((item, index) => [item, index]));
    const finish = (event: TransitionEvent) => {
      const item = event.currentTarget as HTMLElement;
      if (event.target !== item) return;
      // Hand the element back to its own styles (hover transitions etc.).
      delete item.dataset.ri;
      item.style.removeProperty("--rd");
      item.removeEventListener("transitionend", finish);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));
        entering.forEach((item, index) => {
          item.style.setProperty("--rd", String(Math.min(index, MAX_STAGGER_STEPS)));
          item.addEventListener("transitionend", finish);
          item.dataset.ri = "in";
          observer.unobserve(item);
        });
      },
      { rootMargin: "0px 0px -6% 0px" }
    );

    for (const item of items) {
      item.dataset.ri = "pending";
      if (item.tagName === "H2") item.dataset.riKind = "heading";
      observer.observe(item);
    }

    return () => {
      observer.disconnect();
      for (const item of items) {
        delete item.dataset.ri;
        delete item.dataset.riKind;
        item.removeEventListener("transitionend", finish);
      }
    };
  }, []);

  return (
    <div className={`${styles.reveal} ${className}`} ref={ref}>
      {children}
    </div>
  );
}
