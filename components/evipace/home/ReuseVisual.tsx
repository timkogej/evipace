import styles from "../HomeLandingPage.module.css";
import type { HomeContent } from "./content";

/**
 * Illustrative evidence folder. The outer stage carries `data-scroll-stage`
 * and each document a `--i` index, so a scroll-driven animation can be added
 * later in CSS without touching this markup. Nothing animates today.
 */
export function ReuseVisual({ copy }: { copy: HomeContent["reuse"] }) {
  return (
    <div className={styles.scrollStage} data-scroll-stage="reuse">
      <figure aria-label={copy.visualLabel} className={styles.reuseVisual}>
        <div aria-hidden="true" className={styles.reuseFolder}>
          <span className={styles.folderTab} />
          <span className={styles.folderFold} />
          <span className={styles.folderLabel}>{copy.folder}</span>
        </div>
        <ul className={styles.reuseDocs}>
          {copy.documents.map((doc, index) => (
            <li
              className={styles.reuseDoc}
              data-status={doc.status}
              key={doc.name}
              style={{ "--i": index } as React.CSSProperties}
            >
              <span aria-hidden="true" className={styles.docIcon} />
              <span className={styles.panelText}>
                <strong>{doc.name}</strong>
                <span>{doc.detail}</span>
              </span>
              <span className={styles.pill} data-tone={doc.status === "update" ? "open" : "ok"}>
                {doc.status === "update" ? copy.needsUpdate : copy.confirmed}
              </span>
            </li>
          ))}
        </ul>
        <figcaption className={styles.reuseCaption}>
          <span className={styles.badge}>{copy.badge}</span>
        </figcaption>
      </figure>
    </div>
  );
}
