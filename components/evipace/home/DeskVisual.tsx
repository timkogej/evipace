import styles from "../HomeLandingPage.module.css";
import type { HomeContent } from "./content";
import { Document } from "./Document";
import { Folder } from "./Folder";
import { ScrollProgress } from "./ScrollProgress";

/* Pages sticking out of the folder: position, resting tilt and order. */
const SHEETS = [
  { x: "44%", r: "-4deg", lines: 4 },
  { x: "57%", r: "3deg", lines: 3 }
];

/**
 * Illustrative HTML/CSS picture of the desk: the brand-book taupe folder with
 * its orange folded corner behind a status panel, two pages sticking out of
 * it. Not a screenshot of software.
 *
 * The stage reports its scroll progress as `--p`. As the visitor scrolls, the
 * finished steps are ticked green one after another, and
 * the step that needs the client's input is highlighted instead. At the end
 * of the scroll that input is in, and the approve button is pressed. Without
 * JavaScript or with reduced motion the panel shows the waiting state.
 */
export function DeskVisual({ copy }: { copy: HomeContent["visual"] }) {
  return (
    <ScrollProgress className={styles.visualStage}>
      <figure aria-label={copy.label} className={styles.visual}>
        <Folder
          className={styles.folder}
          label={copy.folder}
          lines
          peek={SHEETS.map((sheet, index) => (
            <Document
              className={styles.folderSheet}
              key={sheet.x}
              lines={sheet.lines}
              style={{ "--x": sheet.x, "--r": sheet.r, "--k": index } as React.CSSProperties}
            />
          ))}
        />
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <span className={styles.panelTitle}>{copy.title}</span>
            <span className={styles.badge}>{copy.badge}</span>
          </div>
          <ol className={styles.panelRows}>
            {copy.rows.map((row, index) => (
              <li
                className={styles.panelRow}
                data-tone={row.tone}
                key={row.step}
                style={{ "--i": index } as React.CSSProperties}
              >
                <span aria-hidden="true" className={styles.mark} />
                <span className={styles.panelText}>
                  <strong>{row.step}</strong>
                  <span>{row.detail}</span>
                </span>
                {row.tone === "open" ? (
                  <span className={styles.pill} data-tone="open">{row.status}</span>
                ) : (
                  <span className={styles.srOnly}>{row.status}</span>
                )}
              </li>
            ))}
          </ol>
          {/* At the end of the scroll the response is approved: the note and
              the button swap to their approved state. Assistive tech reads
              the waiting state only. */}
          <div className={styles.panelFoot}>
            <span className={styles.footNote}>
              <span className={styles.footWaiting}>{copy.reviewer}</span>
              <span aria-hidden="true" className={styles.footApproved}>{copy.approvedNote}</span>
            </span>
            <span aria-hidden="true" className={styles.mockButton}>
              <span className={styles.mockIdle}>{copy.approve}</span>
              <span className={styles.mockDone}>✓ {copy.approved}</span>
            </span>
          </div>
        </div>
      </figure>
    </ScrollProgress>
  );
}
