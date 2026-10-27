"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

/**
 * Writes how far the element has travelled through the viewport into the CSS
 * variable `--p` (0 when its top enters near the bottom, 1 once its centre
 * reaches the middle of the screen). CSS decides what to do with it. Without JavaScript, or
 * with reduced motion, `--p` is never set and the content renders complete.
 */
export function ScrollProgress({
  children,
  pin = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  /** Track a tall element with a sticky child instead: 0 when its top reaches
   *  the top of the screen, 1 when its bottom reaches the bottom. */
  pin?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // One cheap layout read per scroll event; no animation-frame queue, so the
    // value can never lag behind the scroll position.
    const update = () => {
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const pinLength = rect.height - viewport;
      // Pinned: progress across the sticky run. Otherwise (or when the layout
      // is too short to pin, e.g. phones): 0 as the top edge enters near the
      // bottom, 1 once the centre reaches mid-screen.
      const progress = pin && pinLength > 80
        ? -rect.top / pinLength
        : (viewport * 0.88 - rect.top) / (rect.height * 0.5 + viewport * 0.38);
      element.style.setProperty("--p", Math.min(1, Math.max(0, progress)).toFixed(4));
    };

    element.dataset.progress = "on";
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pin]);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
