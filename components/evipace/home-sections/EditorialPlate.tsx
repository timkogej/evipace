import Image from "next/image";
import type { EvipaceImageAsset } from "@/lib/evipace-images";

/**
 * A photograph treated as an editorial plate rather than a UI card: square
 * corners, no frame, image running to every edge of its own box.
 *
 * Deliberately separate from HomeImage, which keeps the rounded, bordered
 * figure treatment other sections still rely on.
 *
 * The box carries an explicit aspect ratio so the plate reserves its space
 * before the image decodes and nothing shifts.
 */
type EditorialPlateProps = {
  asset: EvipaceImageAsset;
  available: boolean;
  /**
   * e.g. "1.08 / 1". Set as a custom property so a breakpoint can override
   * it in CSS; the plate always reserves its box before the image decodes.
   */
  ratio: string;
  className?: string;
  sizes?: string;
  /** Optional object-position override for this placement. */
  position?: string;
};

export function EditorialPlate({
  asset,
  available,
  ratio,
  className = "",
  sizes,
  position
}: EditorialPlateProps) {
  return (
    <figure
      className={`plate ${className}`}
      style={{ "--plate-ratio": ratio } as React.CSSProperties}
    >
      {available ? (
        <Image
          alt={asset.alt}
          className="plate__image"
          fill
          quality={asset.quality}
          sizes={sizes ?? asset.sizes}
          src={asset.src}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <div
          aria-label={asset.alt}
          className="image-fallback-grid plate__fallback"
          role="img"
        />
      )}
    </figure>
  );
}
