import styles from "../HomeLandingPage.module.css";
import { INK, ORANGE, TAUPE, TAUPE_DARK, foldPath, pagePath } from "./paper";
import { ScrollProgress } from "./ScrollProgress";

/* The same sheet as everywhere else (paper.ts), drawn large. */
const DOC = { x: 92, y: 14, w: 92, h: 116, fold: 24, r: 6 };
const PAGE = pagePath(DOC.x, DOC.y, DOC.w, DOC.h, DOC.fold, DOC.r);
const FOLD = foldPath(DOC.x, DOC.y, DOC.w, DOC.fold, DOC.r);
/** The document's text lines, written one after another. */
const LINES = ["M106 48h52", "M106 60h62", "M106 72h40"];
/** Back wall of the folder, with the brand's folded corner. */
const BACK = pagePath(40, 46, 200, 106, 22, 8);
const BACK_FOLD = foldPath(40, 46, 200, 22, 8);

/**
 * Own SVG in the brand-book style: taupe folder, document, approval stamp.
 * As it scrolls into view the document drops into the folder (behind its
 * front pocket), its lines are written, then the stamp is pressed and its
 * tick drawn. Without JavaScript or with reduced motion it shows the
 * finished picture.
 */
export function TrustIllustration({ label }: { label: string }) {
  return (
    <ScrollProgress className={styles.trustStage}>
      <svg
        aria-label={label}
        className={styles.trustArt}
        fill="none"
        role="img"
        viewBox="0 0 320 170"
      >
        {/* folder: tab and back wall */}
        <path d="M40 42a8 8 0 018-8h44l12 12H40z" fill={TAUPE_DARK} />
        <path d={BACK} fill={TAUPE_DARK} />
        <path d={BACK_FOLD} fill={ORANGE} />

        {/* document, filed between the back wall and the pocket */}
        <g className={styles.trustDoc}>
          <path d={PAGE} fill="#fff" stroke={INK} strokeLinejoin="round" strokeWidth="2" />
          <path d={FOLD} fill={INK} opacity="0.1" transform="translate(-2.5 2.5)" />
          <path d={FOLD} fill={ORANGE} />
          {LINES.map((d, index) => (
            <path
              className={styles.trustLine}
              d={d}
              key={d}
              pathLength={1}
              stroke={INK}
              strokeLinecap="round"
              strokeOpacity=".35"
              strokeWidth="4"
              style={{ "--i": index } as React.CSSProperties}
            />
          ))}
        </g>

        {/* front pocket, slightly open, lit on its top edge */}
        <path d="M34 88h212l-6 56a8 8 0 01-8 7H48a8 8 0 01-8-7z" fill={TAUPE} />
        <path d="M36 88.75h208" stroke="#fff" strokeLinecap="round" strokeOpacity=".55" strokeWidth="1.5" />

        {/* approval stamp: pressed down, ring drawn, then the tick */}
        <g className={styles.trustSeal}>
          <circle cx="258" cy="116" fill="#fff" r="30" />
          <circle
            className={styles.trustRing}
            cx="258"
            cy="116"
            pathLength={1}
            r="30"
            stroke={INK}
            strokeWidth="2.5"
            transform="rotate(-90 258 116)"
          />
          <circle cx="258" cy="116" r="24" stroke={ORANGE} strokeDasharray="2 4" strokeOpacity=".5" strokeWidth="1.5" />
          <path
            className={styles.trustTick}
            d="M245 116l9 9 17-19"
            pathLength={1}
            stroke={ORANGE}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
          />
        </g>
      </svg>
    </ScrollProgress>
  );
}
