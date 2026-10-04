import styles from "./HomeLandingPage.module.css";

export function MethodologyCtaArtwork() {
  return (
    <div aria-hidden="true" className={`${styles.ctaArtwork} methodology-contact-artwork`}>
      <div className={`${styles.ctaSheet} ${styles.ctaSheetBack}`}>
        <span className={styles.sheetLabel} />
        <span className={styles.sheetLines} />
        <span className={styles.sheetBlock} />
      </div>
      <div className={`${styles.ctaSheet} ${styles.ctaSheetMiddle}`}>
        <span className={styles.sheetLabel} />
        <span className={styles.sheetLines} />
        <span className={styles.sheetBlock} />
      </div>
      <div className={`${styles.ctaSheet} ${styles.ctaSheetFront}`}>
        <span className={styles.sheetLabel} />
        <span className={styles.sheetLines} />
        <span className={styles.sheetBlock} />
        <span className={styles.sheetStamp} />
      </div>
    </div>
  );
}
