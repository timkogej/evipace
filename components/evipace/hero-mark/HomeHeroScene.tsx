"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Scene = { destroy: () => void };
type SceneWindow = Window & {
  EvipaceHero?: {
    play: (container: HTMLElement, options: { layout: "auto"; lang: "en" | "de" }) => Scene;
  };
};

export function HomeHeroScene({ locale }: { locale: "en" | "de" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || !containerRef.current) return;

    const container = containerRef.current;
    const root = document.documentElement;
    let scene: Scene | undefined;
    let visibleObserver: IntersectionObserver | undefined;
    let introObserver: MutationObserver | undefined;
    let cancelled = false;
    let inView = !("IntersectionObserver" in window);

    const start = () => {
      if (cancelled || scene || root.getAttribute("data-site-intro") === "playing") return;
      if (!inView || document.visibilityState === "hidden") return;
      const player = (window as SceneWindow).EvipaceHero;
      if (!player) return;
      scene = player.play(container, { layout: "auto", lang: locale });
      visibleObserver?.disconnect();
      introObserver?.disconnect();
      document.removeEventListener("visibilitychange", start);
    };

    if ("IntersectionObserver" in window) {
      visibleObserver = new IntersectionObserver((entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        if (inView) start();
      }, { threshold: 0.1 });
      visibleObserver.observe(container);
    }

    if (root.getAttribute("data-site-intro") === "playing") {
      introObserver = new MutationObserver(start);
      introObserver.observe(root, { attributes: true, attributeFilter: ["data-site-intro"] });
    }

    document.addEventListener("visibilitychange", start);
    if (inView) start();

    return () => {
      cancelled = true;
      visibleObserver?.disconnect();
      introObserver?.disconnect();
      document.removeEventListener("visibilitychange", start);
      scene?.destroy();
    };
  }, [locale, scriptReady]);

  return (
    <>
      <div
        aria-label={locale === "de"
          ? "Illustration: Aus Stromrechnung und Energiedaten entsteht eine nachvollziehbare Antwort auf eine ESG-Frage."
          : "Illustration: an electricity invoice and energy data become a traceable answer to an ESG question."}
        className="home-hero-scene"
        ref={containerRef}
        role="img"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#f8f8f6" }}
      />
      <Script
        onReady={() => setScriptReady(true)}
        src="/animations/evipace-hero/scene.js"
        strategy="afterInteractive"
      />
    </>
  );
}
