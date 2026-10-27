import type { ReactNode } from "react";
import Link from "next/link";
import { deskForwardEmail } from "@/lib/company-info";
import styles from "../HomeLandingPage.module.css";

type ClosingCtaProps = {
  slogan: string;
  title: string;
  body: ReactNode;
  /** Optional small line under the actions. */
  note?: string;
  id?: string;
  forwardLabel: string;
  formLabel: string;
  formHref: string;
  /** Secondary link to the Offers page; omitted on the Offers page itself. */
  offers?: { label: string; href: string };
};

export function ClosingCta({ slogan, title, body, note, id, forwardLabel, formLabel, formHref, offers }: ClosingCtaProps) {
  return (
    <section aria-labelledby="closing-cta-title" className={`${styles.tokens} ${styles.cta}`} id={id}>
      <div className={`${styles.shell} ${styles.ctaInner}`}>
        <div>
          <p className={styles.ctaSlogan}>{slogan}</p>
          <h2 className={styles.heading} id="closing-cta-title">{title}</h2>
          <div className={styles.ctaBody}>{body}</div>
        </div>
        <div className={styles.actions}>
          <a className={styles.pillButton} href={`mailto:${deskForwardEmail}`}>
            {forwardLabel}
            <span aria-hidden="true" className={styles.pillArrow}><span className={styles.arrowGlyph}>→</span></span>
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
        {note ? <p className={styles.ctaNote}>{note}</p> : null}
      </div>
    </section>
  );
}
