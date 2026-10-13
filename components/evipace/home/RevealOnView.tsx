"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "../HomeLandingPage.module.css";

/**
 * Content is visible in the server HTML. Only elements still below the fold
 * after hydration are hidden and then revealed on scroll; reduced motion and
 * missing IntersectionObserver leave everything as rendered.
 */
export function RevealOnView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      element.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.reveal = "in";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.reveal} ${className}`} ref={ref}>
      {children}
    </div>
  );
}
