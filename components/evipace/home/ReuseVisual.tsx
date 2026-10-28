import styles from "../HomeLandingPage.module.css";
import type { HomeContent } from "./content";
import { Document } from "./Document";
import { Folder } from "./Folder";
import { ScrollProgress } from "./ScrollProgress";

/**
 * Illustrative evidence folder. The stage reports its scroll progress as
 * `--p`; each document carries an index `--i`. As the section scrolls in,
 * CSS drops the documents into the folder one after another, behind its
 * front pocket, then ticks the confirmed ones. Without JavaScript or with
 * reduced motion everything shows filed.
 */
export function ReuseVisual({ copy }: { copy: HomeContent["reuse"] }) {
  return (
    <ScrollProgress className={styles.scrollStage} data-scroll-stage="reuse">
      <figure aria-label={copy.visualLabel} className={styles.reuseVisual}>
        <Folder className={styles.reuseFolder} label={copy.folder} pocket>
          <ul className={styles.reuseDocs}>
            {copy.documents.map((doc, index) => (
              <li
                className={styles.reuseDoc}
                data-status={doc.status}
                key={doc.name}
                style={{ "--i": index } as React.CSSProperties}
              >
                <Document className={styles.reuseDocIcon} type={doc.type} />
                <span className={styles.panelText}>
                  <strong>{doc.name}</strong>
                  <span>{doc.detail}</span>
                </span>
                <span
                  className={doc.status === "update" ? styles.pill : `${styles.pill} ${styles.pillTicked}`}
                  data-tone={doc.status === "update" ? "open" : "ok"}
                >
                  {doc.status === "update" ? null : (
                    <svg aria-hidden="true" className={styles.pillCheck} fill="none" focusable="false" viewBox="0 0 12 12">
                      <path
                        d="M2.5 6.3l2.4 2.4 4.6-5.2"
                        pathLength={1}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                  {doc.status === "update" ? copy.needsUpdate : copy.confirmed}
                </span>
              </li>
            ))}
          </ul>
        </Folder>
        <figcaption className={styles.reuseCaption}>
          <span className={styles.badge}>{copy.badge}</span>
        </figcaption>
      </figure>
    </ScrollProgress>
  );
}
