import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { serviceCardImages, type ServiceImageKey } from "./service-images";

/**
 * A service presented as a full-bleed editorial plate.
 *
 * The photograph fills the whole card — there is no separate white text
 * block and no inset thumbnail. Copy sits directly on the image over a
 * tuned scrim, and is always visible rather than revealed on hover.
 *
 * All wording arrives as props; the component itself is locale-neutral.
 */
type ServiceImageCardProps = {
  imageKey: ServiceImageKey;
  locale: "en" | "de";
  number: string;
  title: string;
  body: string;
  /** Optional secondary line some locales carry under the description. */
  detail?: string;
  /** Optional extra note rendered under the detail. */
  note?: string;
  href?: string;
  /** Localised label for the action cue; required when `href` is set. */
  linkLabel?: string;
  className?: string;
  /** Passed to next/image so each card requests a sensible width. */
  sizes?: string;
};

export function ServiceImageCard({
  imageKey,
  locale,
  number,
  title,
  body,
  detail,
  note,
  href,
  linkLabel,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw"
}: ServiceImageCardProps) {
  const image = serviceCardImages[imageKey];

  return (
    <article
      className={`svc-card svc-card--${image.overlay} ${className}`}
      data-interactive={href ? "true" : undefined}
    >
      <Image
        alt={image.imageAlt[locale]}
        className="svc-card__image"
        fill
        // Must be one of next.config.mjs `images.qualities`.
        quality={84}
        sizes={sizes}
        src={image.imageSrc}
        style={{ objectPosition: image.imagePosition }}
      />
      <span aria-hidden="true" className="svc-card__scrim" />

      <div className="svc-card__body">
        <p aria-hidden="true" className="svc-card__number">
          {number}
        </p>

        <div className="svc-card__text">
          <h3 className="svc-card__title">
            {href ? (
              // The pseudo-element on this link stretches over the whole
              // card, so the card has exactly one focusable target.
              <Link className="svc-card__link" href={href}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          <p className="svc-card__desc">{body}</p>
          {detail ? <p className="svc-card__detail">{detail}</p> : null}
          {note ? <p className="svc-card__note">{note}</p> : null}
          {href && linkLabel ? (
            <p aria-hidden="true" className="svc-card__cue">
              <span>{linkLabel}</span>
              <ArrowRight className="svc-card__cue-icon" />
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
