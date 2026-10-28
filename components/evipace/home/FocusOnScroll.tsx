"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A list whose items get `data-focus` while they pass through the middle of
 * the screen. On touch screens there is no hover, so the card motion that a
 * mouse triggers (lift, icon drawn again) plays as the reader scrolls past.
 * Devices with hover and reduced motion keep the list as it is.
 */
export function FocusOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (
      !list ||
      typeof IntersectionObserver === "undefined" ||
      !window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const items = Array.from(list.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).toggleAttribute("data-focus", entry.isIntersecting);
        }
      },
      // A band a little above the middle of the screen, where the eye rests.
      { rootMargin: "-38% 0px -42% 0px" }
    );
    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      items.forEach((item) => item.removeAttribute("data-focus"));
    };
  }, []);

  return (
    <ul className={className} ref={ref}>
      {children}
    </ul>
  );
}
