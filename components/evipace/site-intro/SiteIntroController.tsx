"use client";

import { useEffect } from "react";

/**
 * Choreographs the branded opening, then gets out of the way permanently.
 *
 * Scope, deliberately narrow: this is the only client component the intro
 * adds. It owns no state, publishes nothing, and renders nothing — the
 * overlay, its mark, the navbar, the hero and every word on the page stay
 * server-rendered. It uses native APIs only (Web Animations, matchMedia,
 * getBoundingClientRect, requestAnimationFrame) and no library.
 *
 * Playback is per *document*, enforced by `introConsumed` below. A module
 * binding lives exactly as long as the JavaScript realm does, so:
 *
 *   • a fresh navigation or a refresh creates a new realm  → plays once;
 *   • a client-side route change reuses the same realm     → never replays;
 *   • a bfcache restore resurrects the same realm          → never replays.
 *
 * No storage of any kind is involved, so a refresh is always eligible again —
 * which is exactly the required behaviour and what localStorage/sessionStorage
 * would have broken.
 */

/** Per-document latch. Reset only by a real document load. */
let introConsumed = false;

const DESKTOP_QUERY = "(min-width: 1024px)";
const MOBILE_QUERY = "(max-width: 767.98px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Premium settle, no spring and no elastic overshoot. */
const EASE_LAND = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_REVEAL = "cubic-bezier(0.22, 0.61, 0.28, 1)";

/**
 * When the CSS assembly on `.site-intro__*` has finished drawing the mark.
 * It is anchored to document parse and runs with no JavaScript at all, so
 * this is the earliest moment the exit can sensibly begin.
 */
const ASSEMBLY_END = { desktop: 1260, mobile: 1080 } as const;

/**
 * Phase clocks, in ms from document parse. The CSS assembly on
 * `.site-intro__*` runs 0 → ~1250ms (~1050ms under 768px) on its own.
 */
const T = {
  flip: { start: 1250, duration: 950 },
  fade: { start: 1250, duration: 340 },
  phone: { start: 1080, duration: 320 },
  surface: {
    flip: { start: 1400, duration: 500 },
    fade: { start: 1250, duration: 400 },
    phone: { start: 1080, duration: 360 }
  },
  nav: {
    flip: { start: 1550, duration: 520 },
    fade: { start: 1300, duration: 450 },
    phone: { start: 1130, duration: 420 }
  },
  content: {
    flip: { start: 1620, duration: 580 },
    fade: { start: 1380, duration: 520 },
    phone: { start: 1200, duration: 460 }
  }
} as const;

/**
 * How the intro mark leaves.
 *
 *   flip   the desktop homepage: it travels to its resting place in the hero
 *   fade   tablet and every subpage: it lifts away where it stands
 *   phone  the same lift, on the phone's shorter clock
 *
 * Two motions, three clocks. Phones once had a leftward camera whip; it read
 * as abrupt on a real device and swept the mark straight across the headline,
 * so they now lift away like everything else.
 */
type Mode = "flip" | "fade" | "phone";

/** Homepage routes, trailing slash included; query and hash are ignored. */
export function isHomepagePath(pathname: string): boolean {
  return /^\/(en|de)\/?$/.test(pathname);
}

export function SiteIntroController() {
  useEffect(() => {
    if (introConsumed) return;
    introConsumed = true;
    runIntro();

    /*
     * Deliberately no cleanup function.
     *
     * React Strict Mode (on in dev) runs every effect twice: mount, cleanup,
     * mount. Returning `runIntro`'s teardown made that second pass abort the
     * intro a few hundred milliseconds in, and the latch above then stopped
     * the remount from starting it again — the whole opening reduced to a
     * white flash, in dev only.
     *
     * Tying the sequence to the effect's lifetime was the mistake. The intro
     * is a document-level, one-shot, self-terminating thing: `finish()` is
     * reached on every path (completion, Escape, a hidden tab, a thrown
     * error, or the 3s backstop) and is what clears the timers, cancels the
     * animations, removes the listeners and disposes of the overlay. Teardown
     * is guaranteed by the sequence itself, not by unmounting — and the only
     * way this component unmounts is the document going away.
     */
  }, []);

  return null;
}

function runIntro(): void {
  const root = document.documentElement;
  const overlay = document.querySelector<HTMLElement>("[data-site-intro-overlay]");
  const introMark = overlay?.querySelector<HTMLElement>(".site-intro__mark") ?? null;
  const surface = overlay?.querySelector<HTMLElement>(".site-intro__surface") ?? null;
  const content = document.querySelector<HTMLElement>("[data-site-intro-content]");
  const nav = document.querySelector<HTMLElement>(".site-header");
  const heroMark = document.querySelector<HTMLElement>(".mark-hero__mark");
  const stage = document.querySelector<HTMLElement>(".mark-hero__stage");
  const hero = document.querySelector<HTMLElement>(".mark-hero");

  const timers: number[] = [];
  const animations: Animation[] = [];
  let finished = false;
  const scrollY = window.scrollY;

  const clearBootFailsafe = () => {
    const failsafe = (window as unknown as { __eviIntroFailsafe?: number })
      .__eviIntroFailsafe;
    if (typeof failsafe === "number") window.clearTimeout(failsafe);
  };

  /**
   * The single exit. Every path — normal completion, Escape, a hidden tab, a
   * setup failure, unmount — lands here, so scrolling is always restored and
   * the overlay never survives as an invisible click target.
   *
   * `skipped` distinguishes "the sequence played out" from "get me out of
   * here now". Only the planned completion leaves Phase 4 to its schedule; a
   * skip drops the stage back to its default state, where the workflow steps
   * are simply present. Skipping must never mean waiting another second and a
   * half for content to fade in.
   */
  const finish = (skipped = true) => {
    if (finished) return;
    finished = true;

    if (skipped) {
      if (stage) {
        stage.removeAttribute("data-workflow-enter");
        stage.style.removeProperty("--workflow-delay");
      }
      if (hero) {
        hero.removeAttribute("data-intro-backdrop");
        hero.style.removeProperty("--backdrop-delay");
      }
    }

    clearBootFailsafe();
    for (const id of timers) window.clearTimeout(id);
    for (const animation of animations) {
      try {
        animation.cancel();
      } catch {
        /* already gone */
      }
    }

    document.removeEventListener("keydown", onKeyDown, true);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pageshow", onPageShow);

    // The hero mark is complete from here on: no assembly replay behind the
    // handoff, and nothing left at partial opacity.
    if (heroMark) {
      heroMark.dataset.introLanded = "true";
      heroMark.style.removeProperty("opacity");
    }
    if (content) {
      content.style.removeProperty("opacity");
      content.style.removeProperty("transform");
    }
    if (nav) {
      nav.style.removeProperty("opacity");
      nav.style.removeProperty("transform");
    }

    root.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow");
    if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);

    // Last, so the overlay and the flag it is styled by change together and
    // nothing can paint in between.
    root.setAttribute("data-site-intro", "done");
    overlay?.remove();
  };

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") finish();
  }
  function onVisibilityChange() {
    if (document.hidden) finish();
  }
  function onPageShow(event: PageTransitionEvent) {
    if (event.persisted) finish();
  }

  // Nothing to play: reduced motion, no overlay, or the boot script already
  // revealed the page. Reveal and leave, with no white frame.
  const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  if (
    prefersReducedMotion ||
    !overlay ||
    !introMark ||
    root.getAttribute("data-site-intro") !== "playing"
  ) {
    finish();
    return;
  }

  document.addEventListener("keydown", onKeyDown, true);
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("pageshow", onPageShow);

  try {
    // One reading for the whole setup, so every phase is scheduled against the
    // same instant rather than a clock that moves between statements.
    const startedAt = performance.now();

    // The boot script's 3s failsafe exists for the case where this never runs.
    // It has run, so take the timer over now — otherwise a slow start could
    // have the failsafe tear the overlay away mid-exit.
    clearBootFailsafe();

    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
    const onHomepage = isHomepagePath(window.location.pathname);

    /*
     * How late this controller is, absorbed once.
     *
     * The clocks in `T` are measured from document parse, which is also what
     * the CSS assembly is anchored to — fine when hydration lands in the first
     * few dozen milliseconds, as it does in production. But a slow start (a
     * dev server, a cold cache, a busy device) can put us *past* the whole
     * schedule, and scheduling each phase at `planned - performance.now()`
     * would then fire all of them with a zero delay: the entire exit collapses
     * into one frame and the intro reads as a flash.
     *
     * Up to the end of the assembly this is zero and nothing changes. Beyond
     * it, every phase keeps its offset *relative to the end of the assembly*
     * rather than to parse — the mark has already drawn itself, so the exit
     * simply begins now and then plays out at its real speed.
     */
    const shift = Math.max(
      0,
      startedAt - (isMobile ? ASSEMBLY_END.mobile : ASSEMBLY_END.desktop)
    );

    // Scroll is locked only for the short active intro, and the position is
    // captured above so a refresh part-way down the page cannot jump.
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Held back so the reveal is a deliberate phase rather than a flash. Both
    // are plain inline styles, so the failsafe can undo them without knowing
    // anything about this module.
    if (content) content.style.opacity = "0";
    if (nav) nav.style.opacity = "0";

    let mode: Mode = isMobile ? "phone" : "fade";
    if (!isMobile && isDesktop && onHomepage && heroMark) mode = "flip";

    // Only the landing path hides the hero mark: on every other path it simply
    // arrives with the rest of the content — as the *finished* mark, marked
    // landed right now so its own assembly cannot still be drawing itself
    // while the page fades in around it.
    if (heroMark) {
      if (mode === "flip") heroMark.style.opacity = "0";
      else heroMark.dataset.introLanded = "true";
    }

    /*
     * The photographic backdrop settles as the white surface lifts, so the
     * two read as one move rather than a cut — on every width, each against
     * its own surface clock.
     */
    if (hero) {
      hero.style.setProperty(
        "--backdrop-delay",
        `${Math.max(0, Math.round(T.surface[mode].start - 100 + shift - startedAt))}ms`
      );
      hero.dataset.introBackdrop = "";
    }

    /*
     * Phase 4. Opting the stage into its entrance now — while the overlay is
     * still opaque — means the steps are hidden by the animation's own
     * backwards fill rather than by anything this file has to remember to
     * undo. `--workflow-delay` is measured from this moment to just after the
     * mark settles, so the steps arrive around it rather than with the rest of
     * the copy. Without this attribute the steps are permanently visible, so a
     * controller that dies here costs an animation, never the content.
     */
    if (stage) {
      const landsAt =
        mode === "flip"
          ? T.flip.start + T.flip.duration + 80
          : T.content[mode].start + T.content[mode].duration - 120;
      stage.style.setProperty(
        "--workflow-delay",
        `${Math.max(0, Math.round(landsAt + shift - startedAt))}ms`
      );
      stage.dataset.workflowEnter = "";
    }

    const at = (delay: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, Math.max(0, delay + shift - startedAt)));
    };

    const play = (
      element: Element,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions
    ) => {
      const animation = element.animate(keyframes, options);
      animations.push(animation);
      return animation;
    };

    /* ── the intro mark's exit ── */
    if (mode === "flip") {
      at(T.flip.start, () => {
        const target = measureHeroTarget(heroMark as HTMLElement, content);
        const source = introMark.getBoundingClientRect();

        // A refresh far down the page, or a hero that never laid out, means
        // there is nothing sensible to fly to — fade out instead of throwing
        // the mark off screen.
        if (!target || !source.width) {
          runFadeExit();
          return;
        }

        const dx =
          target.left + target.width / 2 - (source.left + source.width / 2);
        const dy = target.top + target.height / 2 - (source.top + source.height / 2);
        const scale = target.width / source.width;

        const move = play(
          introMark,
          [
            { transform: "translate3d(0, 0, 0) scale(1)" },
            {
              transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`
            }
          ],
          { duration: T.flip.duration, easing: EASE_LAND, fill: "forwards" }
        );

        // The handoff: in one frame, at the exact target position, the hero
        // mark becomes visible and the intro mark stops being painted. They
        // are pixel-aligned at that instant, so there is never a frame with
        // two marks — and never a frame with none.
        move.finished
          .then(() => {
            if (finished) return;
            if (heroMark) {
              heroMark.dataset.introLanded = "true";
              heroMark.style.opacity = "1";
            }
            introMark.style.opacity = "0";
            requestAnimationFrame(() => finish(false));
          })
          .catch(() => {
            /* cancelled by an earlier exit */
          });
      });
    }

    /** Lifts away where it stands: a small shrink and a clean fade. */
    const runFadeExit = () => {
      play(
        introMark,
        [
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0.95)" }
        ],
        {
          duration: mode === "phone" ? T.phone.duration : T.fade.duration,
          easing: EASE_REVEAL,
          fill: "forwards"
        }
      );
    };

    if (mode !== "flip") at(T[mode].start, runFadeExit);

    /* ── the white surface lifts ── */
    const surfaceClock = T.surface[mode];
    if (surface) {
      at(surfaceClock.start, () => {
        play(surface, [{ opacity: 1 }, { opacity: 0 }], {
          duration: surfaceClock.duration,
          easing: EASE_REVEAL,
          fill: "forwards"
        });
      });
    }

    /* ── navbar, then page content ── */
    const navClock = T.nav[mode];
    if (nav) {
      at(navClock.start, () => {
        nav.style.removeProperty("opacity");
        play(
          nav,
          [
            { opacity: 0, transform: "translate3d(0, -14px, 0)" },
            { opacity: 1, transform: "translate3d(0, 0, 0)" }
          ],
          { duration: navClock.duration, easing: EASE_REVEAL }
        );
      });
    }

    const contentClock = T.content[mode];
    if (content) {
      at(contentClock.start, () => {
        content.style.removeProperty("opacity");
        play(
          content,
          [
            { opacity: 0, transform: "translate3d(0, 16px, 0)" },
            { opacity: 1, transform: "translate3d(0, 0, 0)" }
          ],
          { duration: contentClock.duration, easing: EASE_REVEAL }
        );
      });
    }

    /* ── the last thing to happen closes the intro ── */
    if (mode !== "flip") {
      at(contentClock.start + contentClock.duration, () => finish(false));
    }

    // Belt and braces on top of the boot script's own 3s failsafe.
    at(3000, finish);
  } catch {
    finish();
  }
}

/**
 * The hero mark's *final* box.
 *
 * The content wrapper carries no transform at measuring time (its reveal is
 * scheduled, not filled backwards), but this strips one anyway and restores it
 * synchronously — no paint happens in between — so the returned rect is always
 * the resting layout position rather than a mid-reveal one.
 *
 * Returns null when the hero is missing, has no layout, or sits mostly outside
 * the viewport, which is the caller's signal to fade out instead.
 */
function measureHeroTarget(
  heroMark: HTMLElement,
  content: HTMLElement | null
): DOMRect | null {
  const previousTransform = content?.style.transform ?? "";
  if (content) content.style.transform = "none";
  const rect = heroMark.getBoundingClientRect();
  if (content) content.style.transform = previousTransform;

  if (!rect.width || !rect.height) return null;

  const visibleHeight =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  if (visibleHeight < rect.height * 0.6) return null;

  return rect;
}
