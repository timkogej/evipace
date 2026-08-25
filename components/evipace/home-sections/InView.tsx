"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Minimal viewport-entry utility for the homepage section visuals.
 *
 * Deliberately a progressive enhancement: the server-rendered markup is
 * already in its final, fully visible state, and the CSS only hides
 * anything once this component has marked the wrapper `pending`. So if
 * JavaScript never runs — or fails — the sections simply appear without
 * the reveal, and nothing is lost.
 *
 * Children stay server components; only this thin wrapper is client-side,
 * so no homepage content is pulled out of the server render.
 */
type InViewProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number;
  as?: "div" | "figure";
};

export function InView({
  children,
  className = "",
  threshold = 0.18,
  as: Tag = "div"
}: InViewProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "pending" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    // Someone who asked for less motion gets the final state, full stop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Anything already on screen when the page loads stays put rather than
    // blinking out and animating back in.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    setState("pending");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("in");
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      className={className}
      data-evi-reveal={state === "idle" ? undefined : state}
      ref={ref as never}
    >
      {children}
    </Tag>
  );
}
