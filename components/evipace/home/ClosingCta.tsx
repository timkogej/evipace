import Link from "next/link";
import { deskForwardEmail } from "@/lib/company-info";
import styles from "../HomeLandingPage.module.css";

type ClosingCtaProps = {
  slogan: string;
  title: string;
  body: string;
  forwardLabel: string;
  formLabel: string;
  formHref: string;
  /** Secondary link to the Offers page; omitted on the Offers page itself. */
  offers?: { label: string; href: string };
};

export function ClosingCta({ slogan, title, body, forwardLabel, formLabel, formHref, offers }: ClosingCtaProps) {
  return (
    <section aria-labelledby="closing-cta-title" className={styles.cta}>
      <div className={`${styles.shell} ${styles.ctaInner}`}>
        <div>
          <p className={styles.ctaSlogan}>{slogan}</p>
          <h2 className={styles.heading} id="closing-cta-title">{title}</h2>
          <p className={styles.ctaBody}>{body}</p>
        </div>
        <div className={styles.actions}>
          <a className={styles.pillButton} href={`mailto:${deskForwardEmail}`}>
            {forwardLabel}
            <span aria-hidden="true" className={styles.pillArrow}>→</span>
          </a>
          <Link className={`${styles.textLink} ${styles.textLinkOnDark}`} href={formHref}>
            {formLabel}<span aria-hidden="true">→</span>
          </Link>
          {offers ? (
            <Link className={`${styles.textLink} ${styles.textLinkOnDark}`} href={offers.href}>
              {offers.label}<span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
