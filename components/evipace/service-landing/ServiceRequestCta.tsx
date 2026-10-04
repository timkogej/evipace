import { ButtonLink } from "../ButtonLink";
import styles from "./ServiceRequestCta.module.css";

type ServiceRequestCtaProps = {
  eyebrow: string;
  title: string;
  body: string;
  button: string;
  href: string;
};

export function ServiceRequestCta({
  eyebrow,
  title,
  body,
  button,
  href
}: ServiceRequestCtaProps) {
  return (
    <section aria-label={eyebrow} className={styles.section}>
      <div className={`${styles.inner} site-shell`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>
          <ButtonLink className={styles.button} href={href}>
            {button}
          </ButtonLink>
        </div>
        <div aria-hidden="true" className={styles.artwork}>
          <span className={`${styles.sheet} ${styles.sheetBack}`} />
          <span className={`${styles.sheet} ${styles.sheetMiddle}`} />
          <span className={`${styles.sheet} ${styles.sheetFront}`}>
            <span className={styles.sheetAccent} />
            <span className={styles.sheetLines} />
            <span className={styles.sheetBlock} />
            <span className={styles.sheetSeal} />
          </span>
        </div>
      </div>
    </section>
  );
}
