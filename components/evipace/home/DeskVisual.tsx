import styles from "../HomeLandingPage.module.css";
import type { HomeContent } from "./content";

/**
 * Illustrative HTML/CSS picture of the desk: the brand-book taupe folder with
 * its orange folded corner behind a status panel. Not a screenshot of software.
 */
export function DeskVisual({ copy }: { copy: HomeContent["visual"] }) {
  return (
    <figure aria-label={copy.label} className={styles.visual}>
      <div aria-hidden="true" className={styles.folder}>
        <span className={styles.folderTab} />
        <span className={styles.folderFold} />
        <span className={styles.folderLabel}>{copy.folder}</span>
        <span className={styles.folderLines} />
      </div>
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <span className={styles.panelTitle}>{copy.title}</span>
          <span className={styles.badge}>{copy.badge}</span>
        </div>
        <ol className={styles.panelRows}>
          {copy.rows.map((row) => (
            <li className={styles.panelRow} key={row.step}>
              <span aria-hidden="true" className={styles.dot} data-tone={row.tone} />
              <span className={styles.panelText}>
                <strong>{row.step}</strong>
                <span>{row.detail}</span>
              </span>
              <span className={styles.pill} data-tone={row.tone}>{row.status}</span>
            </li>
          ))}
        </ol>
        <div className={styles.panelFoot}>
          <span>{copy.reviewer}</span>
          <span aria-hidden="true" className={styles.mockButton}>{copy.approve}</span>
        </div>
      </div>
    </figure>
  );
}
