import styles from "../HomeLandingPage.module.css";

/**
 * Text that a parent can "type" in, one character at a time, by setting the
 * 0..1 variable `--t` (see `.typed` in the CSS). An orange caret sits on the
 * character being typed. Assistive tech reads the plain text once; the
 * character spans are hidden from it. Without `--t` the text shows complete.
 */
export function TypedText({ text }: { text: string }) {
  const characters = Array.from(text);

  return (
    <>
      <span className={styles.srOnly}>{text}</span>
      <span
        aria-hidden="true"
        className={styles.typed}
        style={{ "--n": characters.length } as React.CSSProperties}
      >
        {characters.map((character, index) => (
          <span key={index} style={{ "--c": index } as React.CSSProperties}>
            {character}
          </span>
        ))}
      </span>
    </>
  );
}
