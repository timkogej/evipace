import type { ReactNode } from "react";
import styles from "../HomeLandingPage.module.css";
import type { ForwardIcon } from "./content";

/* Brand-book colours, as in the other homepage illustrations. */
const INK = "#171717";
const ORANGE = "#fe7001";
const TAUPE = "#d8d0c7";
const TAUPE_DARK = "#c9bfb4";

/** The Evipace sheet: a page with the orange folded corner (48 px grid). */
const SHEET = "M12 6h18l8 8v26a2 2 0 01-2 2H12a2 2 0 01-2-2V8a2 2 0 012-2z";
const CORNER = "M30 6v6a2 2 0 002 2h6z";

function Sheet({ children }: { children?: ReactNode }) {
  return (
    <>
      {/* A second page behind, which fans out when the card is hovered. */}
      <path className={styles.iconBack} d={SHEET} fill={TAUPE} />
      <g className={styles.iconFront}>
        <path d={SHEET} fill="#fff" stroke={INK} strokeWidth="1.75" />
        <path d={CORNER} fill={ORANGE} />
        {children}
      </g>
    </>
  );
}

const line = { stroke: INK, strokeLinecap: "round" as const, strokeOpacity: 0.35, strokeWidth: 2 };

const icons: Record<ForwardIcon, ReactNode> = {
  // Questionnaire: answered tick boxes and one still open.
  questionnaire: (
    <Sheet>
      <rect fill={ORANGE} height="5" rx="1.2" width="5" x="15" y="17" />
      <path d="M16.3 19.6l1.2 1.2 2-2.4" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <rect fill={ORANGE} height="5" rx="1.2" width="5" x="15" y="25" />
      <path d="M16.3 27.6l1.2 1.2 2-2.4" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <rect fill="#fff" height="5" rx="1.2" stroke={INK} strokeWidth="1.5" width="5" x="15" y="33" />
      <path d="M23.5 19.5h9M23.5 27.5h9M23.5 35.5h6" {...line} />
    </Sheet>
  ),
  // Assessment: a scored page with an approval seal.
  assessment: (
    <Sheet>
      <path d="M15 18h12M15 23h15M15 28h8" {...line} />
      <circle cx="31" cy="34" fill={ORANGE} r="6.5" stroke={INK} strokeWidth="1.75" />
      <path d="M28.2 34l2 2 3.6-4" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </Sheet>
  ),
  // Carbon data: a rising bar chart, the latest bar in orange.
  carbon: (
    <Sheet>
      <rect fill="#fff" height="6" rx="1" stroke={INK} strokeWidth="1.5" width="4" x="15" y="31" />
      <rect fill="#fff" height="11" rx="1" stroke={INK} strokeWidth="1.5" width="4" x="21.5" y="26" />
      <rect fill={ORANGE} height="16" rx="1" stroke={INK} strokeWidth="1.5" width="4" x="28" y="21" />
      <path d="M14 37.5h20" stroke={INK} strokeLinecap="round" strokeWidth="1.5" />
    </Sheet>
  ),
  // Code of conduct: a shield with the confirmation tick.
  conduct: (
    <Sheet>
      <path
        d="M24 17l8 3v6c0 5-3.5 8.6-8 10.6-4.5-2-8-5.6-8-10.6v-6z"
        fill="#fff"
        stroke={INK}
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
      <path d="M20.4 26.6l2.6 2.6 4.6-5.2" stroke={ORANGE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
    </Sheet>
  ),
  // Self-assessment: form fields being filled in with a pencil.
  selfAssessment: (
    <Sheet>
      <path d="M15 17h7" {...line} />
      <rect fill="#fff" height="5" rx="1" stroke={INK} strokeWidth="1.5" width="18" x="15" y="20" />
      <path d="M15 29h7" {...line} />
      <rect fill="#fff" height="5" rx="1" stroke={INK} strokeWidth="1.5" width="11" x="15" y="32" />
      <path
        d="M27 42l1-4.2 10.4-10.4 3.2 3.2L31.2 41z"
        fill={ORANGE}
        stroke={INK}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Sheet>
  ),
  // Evidence: a confirmed page filed into the taupe folder.
  evidence: (
    <>
      <path d="M6 15a2 2 0 012-2h10l3 3h19a2 2 0 012 2v20a2 2 0 01-2 2H8a2 2 0 01-2-2z" fill={TAUPE} />
      <g className={styles.iconFront}>
        <path d="M15 7h15l6 6v17H15z" fill="#fff" stroke={INK} strokeLinejoin="round" strokeWidth="1.75" />
        <path d="M30 7v4.5a1.5 1.5 0 001.5 1.5H36z" fill={ORANGE} />
        <path d="M19 15h8M19 19h12" {...line} />
      </g>
      <path
        d="M6 23a2 2 0 012-2h32a2 2 0 012 2v15a2 2 0 01-2 2H8a2 2 0 01-2-2z"
        fill={TAUPE_DARK}
        stroke={INK}
        strokeWidth="1.75"
      />
    </>
  )
};

/** Request-type icons in the brand style: the Evipace sheet with a motif. */
export function BrandIcon({ name, className }: { name: ForwardIcon; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" focusable="false" viewBox="0 0 48 48">
      {icons[name]}
    </svg>
  );
}
