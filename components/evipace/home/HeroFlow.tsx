"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../HomeLandingPage.module.css";
import type { HomeContent } from "./content";

/**
 * Hero card: one questionnaire that is prepared, reviewed and then waits for
 * the client. Stages: 0 prepared, 1 reviewed, 2 ready, 3 approved. It starts
 * once on screen, and the client's Approve button works. With reduced motion
 * it opens on the ready stage.
 */
const STAGE_AT = [900, 1900, 2700]; // ms to stages 1, 2 and 3 (ready is stage 2)

export function HeroFlow({ copy }: { copy: HomeContent["flow"] }) {
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const [seen, setSeen] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setStill(true);
            setStage(2);
          }
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || still) return;
    const timers = [
      window.setTimeout(() => setStage(1), STAGE_AT[0]),
      window.setTimeout(() => setStage(2), STAGE_AT[1])
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [seen, still]);

  const approved = stage === 3;
  const ready = stage === 2;

  return (
    <figure
      aria-label={copy.label}
      className={styles.flow}
      data-approved={approved || undefined}
      data-ready={ready || undefined}
      ref={ref}
    >
      <div className={styles.flowHead}>
        <p className={styles.flowTitle}>
          {copy.title}
          <span>{copy.due}</span>
        </p>
        <span className={styles.flowBadge}>{copy.badge}</span>
      </div>

      <ol className={styles.flowSteps}>
        {copy.steps.map((label, index) => {
          const done = index < 2 ? stage > index : approved;
          const state = done ? "done" : index === Math.min(stage, 2) ? "current" : "todo";
          return (
            <li className={styles.flowStep} data-state={state} key={label}>
              {label}
            </li>
          );
        })}
      </ol>

      <div className={styles.flowFoot}>
        <p aria-live="polite" className={styles.flowStatus}>
          {approved ? copy.sent : ready ? copy.ready : ""}
        </p>
        <button className={styles.flowButton} disabled={!ready} onClick={() => setStage(3)} type="button">
          {approved ? copy.approved : copy.approve}
        </button>
      </div>
    </figure>
  );
}
