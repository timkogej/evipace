import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "./ButtonLink";
import { ImageSlot } from "./ImageSlot";

type HeroProps = {
  imageAvailable: boolean;
};

export function Hero({ imageAvailable }: HeroProps) {
  const heroImage = evipaceImages.hero;

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden md:min-h-[76svh]"
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0">
        {imageAvailable ? (
          <>
            <Image
              alt=""
              aria-hidden="true"
              className={`hidden object-cover md:block ${heroImage.imageClassName}`}
              fill
              priority={heroImage.priority}
              quality={heroImage.quality}
              sizes={heroImage.sizes}
              src={heroImage.src}
            />
            <div className="absolute inset-0 md:hidden">
              <Image
                alt=""
                aria-hidden="true"
                className={`object-contain object-bottom ${heroImage.mobileImageClassName}`}
                fill
                priority={heroImage.priority}
                quality={heroImage.quality}
                sizes={heroImage.mobileSizes}
                src={heroImage.mobileSrc}
              />
            </div>
          </>
        ) : (
          <ImageSlot
            {...heroImage}
            className="absolute inset-0 border-0"
            renderActualImage={false}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(250,249,246,0.96)_0%,rgba(250,249,246,0.84)_34%,rgba(250,249,246,0.18)_55%,rgba(247,246,242,0)_100%)] md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(250,249,246,0.99)_0%,rgba(250,249,246,0.96)_24%,rgba(250,249,246,0.78)_39%,rgba(250,249,246,0.28)_58%,rgba(250,249,246,0)_100%)] md:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--paper)] to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] w-full min-w-0 items-start justify-center px-6 pb-[18svh] pt-[9.25rem] text-center md:min-h-[76svh] md:items-center md:justify-start md:px-[var(--section-x)] md:pb-20 md:pt-24 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="w-full min-w-0 max-w-[34rem] md:max-w-[32rem] md:text-left">
          <h1
            className="mx-auto max-w-full font-display text-[2.25rem] leading-[0.92] text-ink [overflow-wrap:anywhere] [text-shadow:0_1px_26px_rgba(255,255,255,0.78)] min-[380px]:text-[2.35rem] md:mx-0 md:max-w-[10ch] md:text-[clamp(3.8rem,8.6vw,6.9rem)] md:leading-[0.86]"
            id="hero-title"
          >
            <span className="md:hidden">
              ESG, done
              <br />
              faster.
            </span>
            <span className="hidden md:inline">
              ESG, done
              <br />
              faster.
            </span>
          </h1>

          <p
            className="mx-auto mt-5 max-w-full text-[0.98rem] font-medium leading-7 text-[rgba(21,21,21,0.74)] [overflow-wrap:anywhere] md:mx-0 md:mt-6 md:max-w-[30rem] md:text-[clamp(1.05rem,1.55vw,1.35rem)] md:leading-[1.55]"
          >
            <span className="md:hidden">
              Send the ESG request.
              <br />
              We organise the evidence.
            </span>
            <span className="hidden md:inline">
              We handle the ESG work your customers ask for - from supplier
              questionnaires and VSME reports to Scope 1 & 2 calculations and
              supporting documentation.
            </span>
          </p>

          <div
            className="mx-auto mt-7 flex w-full max-w-[20rem] flex-col items-center justify-center gap-3 md:mx-0 md:mt-8 md:max-w-[28rem] md:flex-row md:justify-start"
          >
            <ButtonLink
              className="w-full max-w-full text-center sm:w-auto"
              href="#questionnaire"
            >
              Send us your ESG request
            </ButtonLink>
            <a
              className="orange-link inline-flex min-h-12 items-center gap-2 px-1 text-sm"
              href="#how-it-works"
            >
              <span>See how it works</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          <div className="mx-auto mt-7 hidden max-w-[28rem] flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[rgba(21,21,21,0.62)] md:mx-0 md:flex md:justify-start">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-orange"
            />
            <span className="min-w-0 [overflow-wrap:anywhere]">
              Fast execution. Human-reviewed. Ready for your customer.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
