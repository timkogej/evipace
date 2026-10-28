"use client";

import { useEffect, useRef } from "react";
import styles from "../HomeLandingPage.module.css";
import { subscribeProgress } from "./ScrollProgress";

/**
 * Text that is typed in as its ScrollProgress stage scrolls into view, with
 * an orange caret after the last typed character. The row's 0..1 typing
 * progress is `progress * rate - start`, the same formula as the row's `--t`
 * in CSS (see `.exampleRow`), so it stays in step with the rest of the row.
 *
 * Typing is driven here rather than in CSS: only the two text nodes of the
 * row being typed change, instead of restyling a span per character on every
 * frame. Untyped text keeps its space (visibility: hidden), so lines never
 * reflow. Assistive tech reads the plain text once. Without JavaScript or
 * with reduced motion the text shows complete.
 */
export function TypedText({ text, rate, start }: { text: string; rate: number; start: number }) {
  const typedRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const restRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = typedRef.current;
    const caret = caretRef.current;
    const rest = restRef.current;
    if (!typed || !caret || !rest) return;

    let shown = text.length;
    return subscribeProgress(typed, (progress) => {
      const t = Math.min(1, Math.max(0, progress * rate - start));
      const count = Math.round(t * text.length);
      if (count === shown) return;
      shown = count;
      typed.textContent = text.slice(0, count);
      rest.textContent = text.slice(count);
      caret.toggleAttribute("data-on", count > 0 && count < text.length);
    });
  }, [text, rate, start]);

  return (
    <>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        <span ref={typedRef}>{text}</span>
        <span className={styles.caret} ref={caretRef} />
        <span className={styles.typedRest} ref={restRef} />
      </span>
    </>
  );
}
