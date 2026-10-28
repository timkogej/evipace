import type { CSSProperties, ReactNode } from "react";
import styles from "../HomeLandingPage.module.css";
import type { ForwardIcon } from "./content";
import { INK, ORANGE, TAUPE, TAUPE_DARK, foldPath, pagePath } from "./paper";

/** The Evipace sheet on the 48 px grid (same shape as Document.tsx). */
const SHEET = pagePath(10, 6, 28, 36, 8, 2);
const CORNER = foldPath(10, 6, 28, 8, 2);

/* Motion hooks. On card hover, `draw` strokes are drawn again and `pop`
   shapes spring in; --d staggers them. At rest both show finished. */
const draw = (d: number) => ({
  className: styles.iconDraw,
  pathLength: 1,
  style: { "--d": d } as CSSProperties
});
const pop = (d: number) => ({ className: styles.iconPop, style: { "--d": d } as CSSProperties });
const grow = (d: number) => ({ className: styles.iconGrow, style: { "--d": d } as CSSProperties });

const line = { stroke: INK, strokeLinecap: "round" as const, strokeOpacity: 0.35, strokeWidth: 2 };
const tick = { stroke: "#fff", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.5 };

function Sheet({ children }: { children?: ReactNode }) {
  return (
    <>
      {/* A second page behind, which fans out when the card is hovered. */}
      <path className={styles.iconBack} d={SHEET} fill={TAUPE} />
      <g className={styles.iconFront}>
        <path d={SHEET} fill="#fff" stroke={INK} strokeLinejoin="round" strokeWidth="1.75" />
        <path d={CORNER} fill={INK} opacity="0.1" transform="translate(-0.75 0.75)" />
        <path d={CORNER} fill={ORANGE} />
        {children}
      </g>
    </>
  );
}

const icons: Record<ForwardIcon, ReactNode> = {
  // Questionnaire: answered tick boxes and one still open.
  questionnaire: (
    <Sheet>
      <rect {...pop(0)} fill={ORANGE} height="5" rx="1.2" width="5" x="15" y="17" />
      <path {...draw(1)} d="M16.3 19.6l1.2 1.2 2-2.4" {...tick} />
      <rect {...pop(2)} fill={ORANGE} height="5" rx="1.2" width="5" x="15" y="25" />
      <path {...draw(3)} d="M16.3 27.6l1.2 1.2 2-2.4" {...tick} />
      <rect fill="#fff" height="5" rx="1.2" stroke={INK} strokeWidth="1.5" width="5" x="15" y="33" />
      <path {...draw(1)} d="M23.5 19.5h9M23.5 27.5h9M23.5 35.5h6" {...line} />
    </Sheet>
  ),
  // Assessment: a scored page with an approval seal.
  assessment: (
    <Sheet>
      <path {...draw(0)} d="M15 18h12M15 23h15M15 28h8" {...line} />
      <circle {...pop(2)} cx="31" cy="34" fill={ORANGE} r="6.5" stroke={INK} strokeWidth="1.75" />
      <path {...draw(4)} d="M28.2 34l2 2 3.6-4" {...tick} strokeWidth="1.8" />
    </Sheet>
  ),
  // Carbon data: a rising bar chart, the latest bar in orange.
  carbon: (
    <Sheet>
      <rect {...grow(0)} fill="#fff" height="6" rx="1" stroke={INK} strokeWidth="1.5" width="4" x="15" y="31" />
      <rect {...grow(1)} fill="#fff" height="11" rx="1" stroke={INK} strokeWidth="1.5" width="4" x="21.5" y="26" />
      <rect {...grow(2)} fill={ORANGE} height="16" rx="1" stroke={INK} strokeWidth="1.5" width="4" x="28" y="21" />
      <path d="M14 37.5h20" stroke={INK} strokeLinecap="round" strokeWidth="1.5" />
    </Sheet>
  ),
  // Code of conduct: a shield with the confirmation tick.
  conduct: (
    <Sheet>
      <path
        {...draw(0)}
        d="M24 17l8 3v6c0 5-3.5 8.6-8 10.6-4.5-2-8-5.6-8-10.6v-6z"
        fill="#fff"
        stroke={INK}
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
      <path {...draw(4)} d="M20.4 26.6l2.6 2.6 4.6-5.2" stroke={ORANGE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
    </Sheet>
  ),
  // Self-assessment: form fields being filled in with a pencil.
  selfAssessment: (
    <Sheet>
      <path {...draw(0)} d="M15 17h7" {...line} />
      <rect fill="#fff" height="5" rx="1" stroke={INK} strokeWidth="1.5" width="18" x="15" y="20" />
      <path {...draw(1)} d="M15 29h7" {...line} />
      <rect fill="#fff" height="5" rx="1" stroke={INK} strokeWidth="1.5" width="11" x="15" y="32" />
      <path
        {...pop(3)}
        d="M27 42l1-4.2 10.4-10.4 3.2 3.2L31.2 41z"
        fill={ORANGE}
        stroke={INK}
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Sheet>
  ),
  // Evidence: an open folder with two filed pages sticking out of it.
  evidence: (
    <>
      <path d="M6 13a2 2 0 012-2h9.5l3 3H40a2 2 0 012 2v20H6z" fill={TAUPE_DARK} stroke={INK} strokeLinejoin="round" strokeWidth="1.75" />
      <path className={styles.iconBack} d={pagePath(12, 8, 18, 22, 5, 1.5)} fill="#fff" stroke={INK} strokeWidth="1.5" />
      <g className={styles.iconFront}>
        <path d={pagePath(19, 4, 19, 24, 6, 1.5)} fill="#fff" stroke={INK} strokeLinejoin="round" strokeWidth="1.75" />
        <path d={foldPath(19, 4, 19, 6, 1.5)} fill={ORANGE} />
        <path {...draw(0)} d="M23 12h7M23 16.5h10" {...line} />
      </g>
      {/* Front panel, open towards the viewer. */}
      <path d="M5 21h38l-2.6 17.2a2 2 0 01-2 1.8H9.6a2 2 0 01-2-1.8z" fill={TAUPE} stroke={INK} strokeLinejoin="round" strokeWidth="1.75" />
      <path d="M7.5 22.6h33" stroke="#fff" strokeLinecap="round" strokeOpacity=".6" strokeWidth="1.2" />
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
