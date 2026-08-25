import Image from "next/image";
import type { EvipaceImageAsset } from "@/lib/evipace-images";

type HomeImageProps = {
  asset: EvipaceImageAsset;
  available: boolean;
  className: string;
  imageClassName?: string;
  position?: "relative" | "absolute";
};

export function HomeImage({
  asset,
  available,
  className,
  imageClassName = "",
  position = "relative"
}: HomeImageProps) {
  return (
    <figure
      className={`${position} isolate overflow-hidden border border-[rgba(21,21,21,0.12)] bg-[#efede6] ${className}`}
    >
      {available ? (
        <Image
          alt={asset.alt}
          className={`object-cover ${asset.imageClassName ?? ""} ${imageClassName}`}
          fill
          priority={asset.priority}
          quality={asset.quality}
          sizes={asset.sizes}
          src={asset.src}
        />
      ) : (
        <div
          aria-label={asset.alt}
          className="image-fallback-grid absolute inset-0 flex items-end p-5 text-sm font-semibold text-muted"
          role="img"
        >
          Image unavailable
        </div>
      )}
    </figure>
  );
}
