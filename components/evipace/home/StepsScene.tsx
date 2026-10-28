import styles from "../HomeLandingPage.module.css";
import type { HomeContent } from "./content";
import { Document } from "./Document";
import { fileTypeOf } from "./paper";

type Scene = HomeContent["steps"]["scene"];

/**
 * Decorative desk card beside the pinned "How it works" steps. It reads the
 * same scroll progress (--p) as the steps and shows one scene per step: the
 * request arrives, the answer is prepared, then it is approved. The steps
 * themselves carry the content, so the card is hidden from assistive tech.
 * Without --p (no JavaScript, reduced motion) it shows the approved scene.
 */
export function StepsScene({ scene }: { scene: Scene }) {
  const fileType = fileTypeOf(scene.received.file);

  return (
    <div aria-hidden="true" className={styles.scene}>
      {/* 1. The customer's request arrives. */}
      <div className={styles.scenePane} style={{ "--a": -1, "--b": 0.37 } as React.CSSProperties}>
        <div className={styles.sceneHead}>
          <span className={styles.panelTitle}>{scene.received.title}</span>
          <span className={styles.badge}>{scene.badge}</span>
        </div>
        <div className={styles.sceneFile}>
          <Document className={styles.sceneDoc} type={fileType} />
          <span className={styles.panelText}>
            <strong>{scene.received.file}</strong>
            <span>{scene.received.meta}</span>
          </span>
        </div>
      </div>

      {/* 2. The answer is prepared: each row is ticked in turn. */}
      <div className={styles.scenePane} style={{ "--a": 0.35, "--b": 0.68 } as React.CSSProperties}>
        <div className={styles.sceneHead}>
          <span className={styles.panelTitle}>{scene.preparing.title}</span>
          <span className={styles.badge}>{scene.badge}</span>
        </div>
        <ul className={styles.sceneRows}>
          {scene.preparing.rows.map((row, index) => (
            <li key={row} style={{ "--j": index } as React.CSSProperties}>
              <span className={styles.sceneTick} />
              {row}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Ready for approval; the button is pressed and turns green. */}
      <div className={styles.scenePane} style={{ "--a": 0.66, "--b": 2 } as React.CSSProperties}>
        <div className={styles.sceneHead}>
          <span className={styles.panelTitle}>{scene.ready.title}</span>
          <span className={styles.badge}>{scene.badge}</span>
        </div>
        <div className={styles.sceneFile}>
          <Document className={styles.sceneDoc} type={fileType} />
          <span className={styles.panelText}>
            <strong>{scene.ready.summary}</strong>
            <span>{scene.received.file}</span>
          </span>
        </div>
        <span className={styles.sceneApprove}>
          <span className={styles.sceneApproveIdle}>{scene.ready.approve}</span>
          <span className={styles.sceneApproveDone}>✓ {scene.ready.approved}</span>
        </span>
      </div>
    </div>
  );
}
