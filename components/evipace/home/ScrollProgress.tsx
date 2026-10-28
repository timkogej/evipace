"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

/**
 * Writes how far the element has travelled through the viewport into the CSS
 * variable `--p` (0 when its top enters near the bottom, 1 once its centre
 * reaches the middle of the screen). CSS decides what to do with it. Without
 * JavaScript, or with reduced motion, `--p` is never set and the content
 * renders complete.
 *
 * All instances share one scheduler (below), so a scroll costs one batch of
 * layout reads and one batch of writes per frame, never a read after a write.
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

    element.dataset.progress = "on";
    return track(element, pin);
  }, [pin]);

  return (
    <div data-scroll-progress="" ref={ref} {...rest}>
      {children}
    </div>
  );
}

/**
 * Lets a component inside a ScrollProgress stage follow its progress in
 * JavaScript, for effects that are cheaper to drive directly than through
 * CSS (see TypedText). The callback gets the same 0..1 value as `--p`.
 * Returns an unsubscribe function; does nothing outside a stage.
 */
export function subscribeProgress(inside: Element, callback: (progress: number) => void) {
  const stage = inside.closest("[data-scroll-progress]");
  if (!stage) return () => {};

  const set = listeners.get(stage) ?? new Set();
  listeners.set(stage, set);
  set.add(callback);

  const current = entries.get(stage)?.last;
  if (current) callback(Number(current));

  return () => {
    set.delete(callback);
    if (set.size === 0) listeners.delete(stage);
  };
}

/* ---- Shared scheduler ------------------------------------------------- */

type Entry = {
  element: HTMLElement;
  pin: boolean;
  /** Last value written, so an unchanged value is never written again. */
  last: string;
  /** Near the viewport (IntersectionObserver). */
  near: boolean;
  /** Off-screen and already written once in its resting value. */
  settled: boolean;
};

const entries = new Map<Element, Entry>();
const listeners = new Map<Element, Set<(progress: number) => void>>();
let frame = 0;

function write(entry: Entry, value: string) {
  entry.element.style.setProperty("--p", value);
  entry.last = value;
  listeners.get(entry.element)?.forEach((callback) => callback(Number(value)));
}
let observer: IntersectionObserver | null = null;

function progressOf(entry: Entry, rect: DOMRect, viewport: number) {
  const pinLength = rect.height - viewport;
  // Pinned: progress across the sticky run. Otherwise (or when the layout is
  // too short to pin, e.g. phones): 0 as the top edge enters near the bottom,
  // 1 once the centre reaches mid-screen.
  const progress = entry.pin && pinLength > 80
    ? -rect.top / pinLength
    : (viewport * 0.88 - rect.top) / (rect.height * 0.5 + viewport * 0.38);
  return Math.min(1, Math.max(0, progress)).toFixed(3);
}

/** One frame: read every rect first, then write the values that changed. */
function flush() {
  frame = 0;
  const viewport = window.innerHeight;
  const writes: Array<[Entry, string]> = [];

  entries.forEach((entry) => {
    if (!entry.near) {
      if (entry.settled) return;
      entry.settled = true;
    }
    const value = progressOf(entry, entry.element.getBoundingClientRect(), viewport);
    if (value !== entry.last) writes.push([entry, value]);
  });

  for (const [entry, value] of writes) write(entry, value);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush);
}

function onResize() {
  entries.forEach((entry) => {
    entry.settled = false;
  });
  schedule();
}

function track(element: HTMLElement, pin: boolean) {
  const entry: Entry = { element, pin, last: "", near: true, settled: false };
  entries.set(element, entry);

  if (entries.size === 1) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
  }

  // Off-screen stages stop measuring; a margin keeps them live just before
  // they scroll in, and one last write settles them as they leave.
  observer ??= new IntersectionObserver(
    (records) => {
      for (const record of records) {
        const tracked = entries.get(record.target);
        if (!tracked) continue;
        tracked.near = record.isIntersecting;
        tracked.settled = false;
      }
      schedule();
    },
    { rootMargin: "25% 0px" }
  );
  observer.observe(element);

  // First value right away, so the stage never paints without --p.
  write(entry, progressOf(entry, element.getBoundingClientRect(), window.innerHeight));

  return () => {
    observer?.unobserve(element);
    entries.delete(element);
    if (entries.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}
