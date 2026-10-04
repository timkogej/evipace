"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Content is visible in HTML. Animate only after enhancement is available. */
export function Reveal({ children, className = "", delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Never hide content a reader is already looking at, including deep links.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    controls.set({ opacity: 0, y });
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        void controls.start({ opacity: 1, y: 0 });
        observer.disconnect();
      }
    }, { threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [controls, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={controls}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
