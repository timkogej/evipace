"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Site-wide smooth scrolling for mouse wheels and trackpads. Touch devices keep
 * native scrolling, and reduced-motion visitors get no smoothing at all. The
 * page still scrolls natively underneath, so scroll listeners keep working.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
      // A locked page (e.g. the open mobile menu) scrolls natively inside its overlay.
      prevent: () => document.body.style.overflow === "hidden"
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
