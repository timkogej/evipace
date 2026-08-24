import { getImageProps } from "next/image";
import type { ReactNode } from "react";
import type { EvipaceImageAsset } from "@/lib/evipace-images";
import { heroProcessLabels, type HeroProcessLocale } from "./process-labels";

/**
 * Full-bleed editorial hero built on the approved evidence-desk photography.
 *
 * Layering, bottom to top:
 *   1. the art-directed photograph (a real <picture>, so it stays the LCP
 *      element and only one of the two plates is ever downloaded),
 *   2. a localized ivory readability scrim,
 *   3. a restrained CSS/SVG process annotation,
 *   4. the locale's own hero copy, passed in as children.
 *
 * The component is deliberately copy-free: every word on the left belongs to
 * the locale page that renders it, so this file never becomes a place where
 * English leaks into other locales.
 */

/**
 * Anchor points for the annotation, expressed in the desktop plate's own
 * 3840x2160 pixel space. The SVG below uses that as its viewBox with
 * `xMidYMid slice`, which is exactly what `object-fit: cover` +
 * `object-position: center` does to the photograph, so the two stay locked
 * together at every aspect ratio. The HTML labels reproduce the same crop in
 * CSS (see `--hero-cover-w` / `--hero-cover-h` in globals.css).
 */
const anchors = {
  /** Right edge of the supplier questionnaire, where the request leaves it. */
  request: { x: 2115, y: 265 },
  invoice: { x: 2255, y: 630 },
  spreadsheet: { x: 2680, y: 700 },
  policy: { x: 3130, y: 730 },
  evidence: { x: 3620, y: 790 },
  /** Left margin of the finished supplier ESG response dossier. */
  dossier: { x: 2705, y: 1320 }
} as const;

/** Questionnaire -> each source document, arcing over the bare desk. */
const evidencePaths = [
  "M2115 265 Q2230 400 2255 630",
  "M2115 265 Q2500 300 2680 700",
  "M2115 265 Q2850 250 3130 730",
  "M2115 265 Q3300 300 3620 790"
];

/** Each source document -> the finished dossier. */
const dossierPaths = [
  "M2255 630 Q2320 1020 2705 1320",
  "M2680 700 Q2610 1030 2705 1320",
  "M3130 730 Q3040 1060 2705 1320",
  "M3620 790 Q3400 1190 2705 1320"
];

const evidenceDots = [
  anchors.invoice,
  anchors.spreadsheet,
  anchors.policy,
  anchors.evidence
];

type EvidenceDeskHeroProps = {
  locale: HeroProcessLocale;
  /** The two-plate hero asset; `mobileSrc` carries the vertical crop. */
  asset: EvipaceImageAsset;
  imageAvailable: boolean;
  /** id of the <h1> the locale renders inside `children`. */
  headingId: string;
  children: ReactNode;
};

export function EvidenceDeskHero({
  locale,
  asset: heroImage,
  imageAvailable,
  headingId,
  children
}: EvidenceDeskHeroProps) {
  const labels = heroProcessLabels[locale];

  const shared = {
    alt: heroImage.alt,
    priority: heroImage.priority,
    quality: heroImage.quality,
    sizes: heroImage.sizes
  };

  const {
    props: { srcSet: desktopSrcSet, sizes: desktopSizes }
  } = getImageProps({
    ...shared,
    src: heroImage.src,
    width: heroImage.width ?? 3840,
    height: heroImage.height ?? 2160
  });

  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps }
  } = getImageProps({
    ...shared,
    src: heroImage.mobileSrc ?? heroImage.src,
    width: heroImage.mobileWidth ?? 941,
    height: heroImage.mobileHeight ?? 1672
  });

  return (
    <section
      aria-labelledby={headingId}
      className="hero-desk"
      id="top"
    >
      {imageAvailable ? (
        <picture className="hero-desk__media">
          <source
            media="(min-width: 1024px)"
            sizes={desktopSizes}
            srcSet={desktopSrcSet}
          />
          <source
            media="(max-width: 1023.98px)"
            sizes={mobileImageProps.sizes}
            srcSet={mobileSrcSet}
          />
          {/*
            The <img> is only the fallback source; whichever <source>
            matches is what the browser actually fetches. It carries the
            LCP hints explicitly because getImageProps does not emit them.
          */}
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from mobileImageProps */}
          <img
            {...mobileImageProps}
            className="hero-desk__image"
            fetchPriority="high"
            loading="eager"
          />
        </picture>
      ) : (
        <div aria-hidden="true" className="hero-desk__media hero-desk__media--empty" />
      )}

      <div aria-hidden="true" className="hero-desk__scrim" />

      <div aria-hidden="true" className="hero-desk__annotation">
        <svg
          className="hero-desk__lines"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 3840 2160"
          focusable="false"
        >
          {/*
            Marks the supplier questionnaire by tracing the rule already
            printed under its title, then hands off to the connections.
          */}
          <path className="hero-desk__rule" d="M1583 236 L2110 257" pathLength={1} />

          {evidencePaths.map((d, index) => (
            <path
              className={`hero-desk__link hero-desk__link--e${index + 1}`}
              d={d}
              key={d}
              pathLength={1}
            />
          ))}

          {evidenceDots.map((dot, index) => (
            <circle
              className={`hero-desk__dot hero-desk__dot--e${index + 1}`}
              cx={dot.x}
              cy={dot.y}
              key={`${dot.x}-${dot.y}`}
              r={9}
            />
          ))}

          {/* One incomplete row of the questionnaire, kept visible. */}
          <rect
            className="hero-desk__gap"
            height={62}
            rx={10}
            transform="rotate(4.9 1790 686)"
            width={380}
            x={1600}
            y={655}
          />

          {dossierPaths.map((d, index) => (
            <path
              className={`hero-desk__link hero-desk__link--d${index + 1}`}
              d={d}
              key={d}
              pathLength={1}
            />
          ))}

          <circle
            className="hero-desk__dot hero-desk__dot--final"
            cx={anchors.dossier.x}
            cy={anchors.dossier.y}
            r={11}
          />
        </svg>

        <span className="hero-desk__label hero-desk__label--request">
          <span className="hero-desk__label-dot" />
          <span>{labels.requestReceived}</span>
        </span>

        <span className="hero-desk__label hero-desk__label--evidence">
          <span className="hero-desk__label-dot" />
          <span>{labels.evidenceLinked}</span>
        </span>

        <span className="hero-desk__label hero-desk__label--gap">
          <span className="hero-desk__label-dot" />
          <span>{labels.gapVisible}</span>
        </span>

        <span className="hero-desk__label hero-desk__label--final">
          <span className="hero-desk__label-dot" />
          <span>
            {labels.humanReviewed}
            <span className="hero-desk__label-line">
              {labels.readyForConfirmation}
            </span>
          </span>
        </span>
      </div>

      <div className="hero-desk__content">{children}</div>
    </section>
  );
}
