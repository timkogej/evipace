import { getImageProps } from "next/image";
import type { ReactNode } from "react";
import type { EvipaceImageAsset } from "@/lib/evipace-images";

type MeetingHeroProps = {
  asset: EvipaceImageAsset;
  imageAvailable: boolean;
  headingId: string;
  children: ReactNode;
};

export function MeetingHero({
  asset: heroImage,
  imageAvailable,
  headingId,
  children
}: MeetingHeroProps) {
  const shared = {
    alt: heroImage.alt,
    quality: heroImage.quality,
    sizes: heroImage.sizes ?? "100vw"
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
    props: {
      decoding,
      height,
      loading,
      srcSet: mobileSrcSet,
      width,
      ...mobileImageProps
    }
  } = getImageProps({
    ...shared,
    sizes: heroImage.mobileSizes ?? "100vw",
    src: heroImage.mobileSrc ?? heroImage.src,
    width: heroImage.mobileWidth ?? 941,
    height: heroImage.mobileHeight ?? 1672
  });
  void loading;

  return (
    <section aria-labelledby={headingId} className="meeting-hero" id="top">
      {imageAvailable ? (
        <picture className="meeting-hero__picture">
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
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is intentionally empty on the decorative image */}
          <img
            {...mobileImageProps}
            className="meeting-hero__image"
            decoding={decoding}
            fetchPriority="high"
            height={height}
            loading="eager"
            width={width}
          />
        </picture>
      ) : (
        <div aria-hidden="true" className="meeting-hero__picture meeting-hero__picture--empty" />
      )}

      <div aria-hidden="true" className="meeting-hero__scrim" />

      <div className="meeting-hero__inner site-shell">
        <div className="meeting-hero__content">{children}</div>
      </div>
    </section>
  );
}
