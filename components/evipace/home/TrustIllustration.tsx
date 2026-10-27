import styles from "../HomeLandingPage.module.css";
import { ScrollProgress } from "./ScrollProgress";

/** The document's text lines, written one after another. */
const LINES = ["M130 58h56", "M130 74h66", "M130 90h66", "M130 106h40"];

/**
 * Own SVG in the brand-book style: taupe folder, document, approval mark.
 * As it scrolls into view the document drops into the folder, its lines are
 * written and the approval tick is drawn. Without JavaScript or with reduced
 * motion it shows the finished picture.
 */
export function TrustIllustration({ label }: { label: string }) {
  return (
    <ScrollProgress className={styles.trustStage}>
      <svg
        aria-label={label}
        className={styles.trustArt}
        fill="none"
        role="img"
        viewBox="0 0 320 150"
      >
        {/* folder */}
        <path d="M22 44h58l12 14h92v70a8 8 0 01-8 8H30a8 8 0 01-8-8z" fill="#d8d0c7" />
        <path d="M22 44a8 8 0 018-8h42l12 14H22z" fill="#c9bfb4" />
        {/* document with the folded orange corner */}
        <g className={styles.trustDoc}>
          <path d="M118 18h70l22 22v84a6 6 0 01-6 6h-86a6 6 0 01-6-6V24a6 6 0 016-6z" fill="#fff" stroke="#171717" strokeWidth="2" />
          <path d="M188 18v16a6 6 0 006 6h16z" fill="#fe7001" />
          {LINES.map((d, index) => (
            <path
              className={styles.trustLine}
              d={d}
              key={d}
              pathLength={1}
              stroke="#171717"
              strokeLinecap="round"
              strokeOpacity=".35"
              strokeWidth="3"
              style={{ "--i": index } as React.CSSProperties}
            />
          ))}
        </g>
        {/* approval mark */}
        <circle className={styles.trustSeal} cx="252" cy="92" fill="#fff" r="34" stroke="#171717" strokeWidth="2" />
        <path
          className={styles.trustTick}
          d="M237 92l11 11 20-22"
          pathLength={1}
          stroke="#fe7001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="6"
        />
      </svg>
    </ScrollProgress>
  );
}
