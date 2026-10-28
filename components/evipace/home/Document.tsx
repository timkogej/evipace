import type { CSSProperties } from "react";
import styles from "../HomeLandingPage.module.css";
import { FILE_TYPES, INK, ORANGE, foldPath, pagePath, type FileType } from "./paper";

/* Sheet on a 40 × 50 grid; the badge may overhang the left edge. */
const PAGE = pagePath(2, 1, 36, 48, 11, 3);
const FOLD = foldPath(2, 1, 36, 11, 3);
const LINE_WIDTHS = [22, 26, 17, 24, 20];

/**
 * The Evipace sheet: white page, orange folded corner with its small shadow,
 * text lines and, when the file type is known, a PDF / XLS / DOC badge.
 * Decorative: the surrounding text always names the file.
 *
 * Each text line carries `--l` (its index) and the `docLine` class, so a
 * parent can write the lines in one after another.
 */
export function Document({
  type,
  lines = 3,
  className,
  style
}: {
  type?: FileType;
  lines?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const badge = type ? FILE_TYPES[type] : undefined;
  const count = badge ? Math.min(lines, 3) : Math.min(lines, LINE_WIDTHS.length);

  return (
    <svg
      aria-hidden="true"
      className={className ? `${styles.doc} ${className}` : styles.doc}
      fill="none"
      focusable="false"
      style={style}
      viewBox="0 0 40 50"
    >
      <path d={PAGE} fill="#fff" stroke={INK} strokeLinejoin="round" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      {/* The fold casts a hard, faint shadow onto the page. */}
      <path d={FOLD} fill={INK} opacity="0.1" transform="translate(-1 1)" />
      <path d={FOLD} fill={ORANGE} />
      {LINE_WIDTHS.slice(0, count).map((width, index) => (
        <path
          className={styles.docLine}
          d={`M8 ${17 + index * 5.5}h${width}`}
          key={index}
          pathLength={1}
          stroke={INK}
          strokeLinecap="round"
          strokeOpacity="0.32"
          strokeWidth="2.2"
          style={{ "--l": index } as CSSProperties}
        />
      ))}
      {badge ? (
        <g>
          <rect fill={badge.color} height="10" rx="2" width="21" x="-1" y="34" />
          <text
            fill="#fff"
            fontSize="7.2"
            fontWeight="800"
            letterSpacing="0.3"
            textAnchor="middle"
            x="9.5"
            y="41.6"
          >
            {badge.label}
          </text>
        </g>
      ) : null}
    </svg>
  );
}
