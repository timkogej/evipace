"use client";

import { useEffect } from "react";

let introStarted = false;

export function WelcomeIntroController() {
  useEffect(() => {
    if (introStarted) return;
    introStarted = true;
    runIntro();
  }, []);

  return null;
}

function runIntro() {
  const root = document.documentElement;
  const overlay = document.querySelector<HTMLElement>("[data-site-intro-overlay]");
  const sentence = overlay?.querySelector<HTMLElement>("[data-intro-sentence]");

  if (root.getAttribute("data-site-intro") !== "playing" || !overlay || !sentence) {
    overlay?.remove();
    return;
  }

  const bootFailsafe = (window as unknown as { __eviIntroFailsafe?: number }).__eviIntroFailsafe;
  if (typeof bootFailsafe === "number") window.clearTimeout(bootFailsafe);

  const characters = Array.from(sentence.textContent ?? "");
  const timers: number[] = [];
  let finished = false;
  let index = 0;

  const finish = () => {
    if (finished) return;
    finished = true;
    for (const timer of timers) window.clearTimeout(timer);
    const failsafe = (window as unknown as { __eviIntroFailsafe?: number }).__eviIntroFailsafe;
    if (typeof failsafe === "number") window.clearTimeout(failsafe);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    overlay.removeEventListener("animationend", onAnimationEnd);
    overlay.removeEventListener("click", finish);
    root.style.removeProperty("overflow");
    root.removeAttribute("data-site-intro-revealing");
    document.body.style.removeProperty("overflow");
    root.setAttribute("data-site-intro", "done");
    overlay.remove();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") finish();
  };
  const onVisibilityChange = () => {
    if (document.hidden) finish();
  };
  const onAnimationEnd = (event: AnimationEvent) => {
    if (event.target === overlay && overlay.hasAttribute("data-intro-exit")) finish();
  };
  const later = (delay: number, action: () => void) => {
    timers.push(window.setTimeout(action, delay));
  };
  const typeNext = () => {
    if (finished) return;
    index += 1;
    sentence.textContent = characters.slice(0, index).join("");
    if (index < characters.length) {
      later(characters[index - 1] === "." ? 280 : 42, typeNext);
    } else {
      overlay.dataset.introTyped = "";
      later(650, () => {
        root.setAttribute("data-site-intro-revealing", "");
        overlay.dataset.introExit = "";
      });
    }
  };

  sentence.textContent = "";
  overlay.dataset.introActive = "";
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("visibilitychange", onVisibilityChange);
  overlay.addEventListener("animationend", onAnimationEnd);
  overlay.addEventListener("click", finish);
  later(220, typeNext);
  later(4400, finish);
}
