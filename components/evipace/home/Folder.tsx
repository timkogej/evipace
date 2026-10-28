import type { ReactNode } from "react";
import styles from "../HomeLandingPage.module.css";

/**
 * The brand-book taupe folder, built in layers so documents can sit inside it:
 *
 *   peek      pages behind the back wall; only what sticks out above it shows
 *   back      taupe wall with the tab, the orange folded corner and the label
 *   children  content placed in the folder (document rows, for example)
 *   pocket    the front lip; content slides behind it as it is filed
 *
 * Size and position come from `className`. Purely decorative layers are
 * hidden from assistive tech; `children` keep their own semantics.
 */
export function Folder({
  label,
  lines = false,
  pocket = false,
  peek,
  className,
  children
}: {
  label?: string;
  lines?: boolean;
  pocket?: boolean;
  peek?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={className ? `${styles.folderBox} ${className}` : styles.folderBox}>
      {peek ? (
        <div aria-hidden="true" className={styles.folderPeek}>
          {peek}
        </div>
      ) : null}
      <div aria-hidden="true" className={styles.folderBack}>
        <span className={styles.folderTab} />
        <span className={styles.folderFold} />
        {label ? <span className={styles.folderLabel}>{label}</span> : null}
        {lines ? <span className={styles.folderLines} /> : null}
      </div>
      {children}
      {pocket ? <span aria-hidden="true" className={styles.folderPocket} /> : null}
    </div>
  );
}
