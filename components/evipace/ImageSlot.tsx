"use client";

import Image from "next/image";
import { useState } from "react";

type ImageSlotProps = {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  quality?: number;
  renderActualImage?: boolean;
};

export function ImageSlot({
  src,
  alt,
  label = src,
  caption,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  imageClassName = "",
  quality,
  renderActualImage = true
}: ImageSlotProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = renderActualImage && !imageFailed;
  const showFallbackAsImage = !renderActualImage || imageFailed;

  return (
    <figure
      className={`relative isolate overflow-hidden border border-[rgba(21,21,21,0.12)] bg-[#efede6] ${className}`}
    >
      {showImage ? (
        <Image
          alt={alt}
          className={`z-10 object-cover ${imageClassName}`}
          fill
          onError={() => setImageFailed(true)}
          priority={priority}
          quality={quality}
          sizes={sizes}
          src={src}
          style={{ zIndex: 10 }}
        />
      ) : null}

      {showFallbackAsImage ? (
        <div
          aria-label={alt}
          className="image-fallback-grid pointer-events-none absolute inset-0 z-0 flex flex-col justify-between p-5 text-ink"
          role="img"
          style={{ zIndex: 0 }}
        >
          <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[rgba(21,21,21,0.48)]">
            <span>Missing image</span>
            <span>ESG / 2026</span>
          </div>

          <div className="mx-auto flex h-[48%] w-[72%] items-end justify-between gap-3 opacity-75">
            <div className="h-[42%] flex-1 rounded-t-sm bg-[rgba(21,21,21,0.14)]" />
            <div className="h-[78%] flex-1 rounded-t-sm bg-[rgba(254,112,1,0.74)]" />
            <div className="h-[55%] flex-1 rounded-t-sm bg-[rgba(21,21,21,0.18)]" />
            <div className="h-[88%] flex-1 rounded-t-sm bg-[rgba(21,21,21,0.26)]" />
            <div className="h-[62%] flex-1 rounded-t-sm bg-[rgba(254,112,1,0.36)]" />
          </div>

          <div className="transition-opacity duration-200">
            <div className="mb-3 h-px w-full bg-[rgba(21,21,21,0.14)]" />
            <div className="flex flex-wrap items-end justify-between gap-3">
              <span className="font-mono text-[0.74rem] text-[rgba(21,21,21,0.58)]">
                {label}
              </span>
              <span className="rounded-full border border-[rgba(21,21,21,0.12)] bg-white/60 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[rgba(21,21,21,0.55)]">
                Replace later
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {caption ? (
        <figcaption className="absolute bottom-4 left-4 z-20 rounded-full border border-white/40 bg-white/80 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
