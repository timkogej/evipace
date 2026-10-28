import styles from "../HomeLandingPage.module.css";
import type { HomeContent } from "./content";
import { Document } from "./Document";
import { fileTypeOf } from "./paper";

type Scene = HomeContent["steps"]["scene"];

/* Each phase is visible inside a window [--a, --b] of the steps' scroll
   progress --p, matching the three steps beside it. */
const PHASES = {
  received: { "--a": -1, "--b": 0.36 },
  preparing: { "--a": 0.34, "--b": 0.67 },
  ready: { "--a": 0.65, "--b": 2 }
} as Record<string, React.CSSProperties>;

/**
 * Decorative desk card beside the pinned "How it works" steps. One document
 * travels through all three steps as the steps' scroll progress (--p) runs:
 * it arrives by email, its lines are written while the preparation rows are
 * ticked, then the approve button is pressed and an approval stamp lands on
 * it. The steps themselves carry the content, so the card is hidden from
 * assistive tech. Without --p (no JavaScript, reduced motion) it shows the
 * approved state.
 */
export function StepsScene({ scene }: { scene: Scene }) {
  return (
    <div aria-hidden="true" className={styles.scene}>
      <div className={styles.sceneHead}>
        <span className={styles.sceneTitles}>
          <span className={`${styles.panelTitle} ${styles.scenePhase}`} style={PHASES.received}>
            {scene.received.title}
          </span>
          <span className={`${styles.panelTitle} ${styles.scenePhase}`} style={PHASES.preparing}>
            {scene.preparing.title}
          </span>
          <span className={`${styles.panelTitle} ${styles.scenePhase}`} style={PHASES.ready}>
            {scene.ready.title}
          </span>
        </span>
        <span className={styles.badge}>{scene.badge}</span>
      </div>

      <div className={styles.sceneBody}>
        {/* The one document, with the stamp it receives at the end. */}
        <div className={styles.sceneDocStage}>
          <Document className={styles.sceneDoc} lines={3} type={fileTypeOf(scene.received.file)} />
          <span className={styles.sceneStamp}>
            <svg fill="none" viewBox="0 0 12 12">
              <path d="M2.5 6.3l2.4 2.4 4.6-5.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            {scene.ready.approved}
          </span>
        </div>

        <div className={styles.sceneSide}>
          {/* 1. The customer's request arrives by email. */}
          <div className={`${styles.sceneInfo} ${styles.scenePhase}`} style={PHASES.received}>
            <strong>{scene.received.file}</strong>
            <span className={styles.sceneMail}>
              <svg fill="none" viewBox="0 0 16 16">
                <rect height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" width="13" x="1.5" y="3" />
                <path d="M2 4l6 4.6L14 4" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
              </svg>
              {scene.received.meta}
            </span>
          </div>

          {/* 2. The answer is prepared: each row is ticked in turn. */}
          <ul className={`${styles.sceneRows} ${styles.scenePhase}`} style={PHASES.preparing}>
            {scene.preparing.rows.map((row, index) => (
              <li key={row} style={{ "--j": index } as React.CSSProperties}>
                <span className={styles.sceneTick} />
                {row}
              </li>
            ))}
          </ul>

          {/* 3. Ready for approval; the button is pressed and turns green. */}
          <div className={`${styles.sceneInfo} ${styles.scenePhase}`} style={PHASES.ready}>
            <strong>{scene.ready.summary}</strong>
            <span>{scene.received.file}</span>
            <span className={styles.sceneApprove}>
              <span className={styles.sceneApproveIdle}>{scene.ready.approve}</span>
              <span className={styles.sceneApproveDone}>✓ {scene.ready.approved}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
