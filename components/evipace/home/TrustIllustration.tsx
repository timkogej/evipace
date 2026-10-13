import styles from "../HomeLandingPage.module.css";

/** Own SVG in the brand-book style: taupe folder, document, approval mark. */
export function TrustIllustration({ label }: { label: string }) {
  return (
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
      <path d="M118 18h70l22 22v84a6 6 0 01-6 6h-86a6 6 0 01-6-6V24a6 6 0 016-6z" fill="#fff" stroke="#171717" strokeWidth="2" />
      <path d="M188 18v16a6 6 0 006 6h16z" fill="#fe7001" />
      <path d="M130 58h56M130 74h66M130 90h66M130 106h40" stroke="#171717" strokeLinecap="round" strokeOpacity=".35" strokeWidth="3" />
      {/* approval mark */}
      <circle cx="252" cy="92" fill="#f6f2ec" r="34" stroke="#171717" strokeWidth="2" />
      <path d="M237 92l11 11 20-22" stroke="#fe7001" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
    </svg>
  );
}
