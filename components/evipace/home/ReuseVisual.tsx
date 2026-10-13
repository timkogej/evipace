import styles from "../HomeLandingPage.module.css";
import type { HomeContent } from "./content";
import { ScrollProgress } from "./ScrollProgress";

/**
 * Illustrative evidence folder. The stage reports its scroll progress as
 * `--p`; each document carries an index `--i`, and CSS files the documents
 * into the folder one after another as the section scrolls into view.
 */
export function ReuseVisual({ copy }: { copy: HomeContent["reuse"] }) {
  return (
    <ScrollProgress className={styles.scrollStage} data-scroll-stage="reuse">
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
    </ScrollProgress>
  );
}
