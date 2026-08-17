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
      className="relative isolate min-h-[76svh] overflow-hidden"
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10">
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
            <Image
              alt=""
              aria-hidden="true"
              className={`object-cover md:hidden ${heroImage.mobileImageClassName}`}
              fill
              priority={heroImage.priority}
              quality={heroImage.quality}
              sizes={heroImage.mobileSizes}
              src={heroImage.mobileSrc}
            />
          </>
        ) : (
          <ImageSlot
            {...heroImage}
            className="absolute inset-0 border-0"
            renderActualImage={false}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(250,249,246,0.96)_0%,rgba(250,249,246,0.91)_39%,rgba(250,249,246,0.58)_60%,rgba(247,246,242,0.24)_100%)] md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(250,249,246,0.96)_0%,rgba(250,249,246,0.88)_25%,rgba(250,249,246,0.40)_48%,rgba(250,249,246,0.08)_70%,rgba(250,249,246,0)_100%)] md:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--paper)] to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[76svh] w-full min-w-0 items-start justify-center px-6 pb-[20svh] pt-[7.25rem] text-center sm:items-center sm:px-[var(--section-x)] sm:pb-20 sm:pt-24 lg:justify-start lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="w-full min-w-0 max-w-[34rem]">
          <h1
            className="mx-auto max-w-full font-display text-[2.25rem] leading-[0.92] text-ink [overflow-wrap:anywhere] [text-shadow:0_1px_26px_rgba(255,255,255,0.78)] min-[380px]:text-[2.35rem] sm:max-w-[10.5ch] sm:text-[4.65rem] sm:leading-[0.88] lg:text-[5.55rem] xl:text-[6rem]"
            id="hero-title"
          >
            <span className="sm:hidden">
              ESG evidence,
              <br />
              ready faster.
            </span>
            <span className="hidden sm:inline">
              ESG evidence, ready faster.
            </span>
          </h1>

          <p
            className="mx-auto mt-5 max-w-full text-[0.98rem] font-medium leading-7 text-[rgba(21,21,21,0.74)] [overflow-wrap:anywhere] sm:mt-6 sm:max-w-[31rem] sm:text-lg lg:text-xl lg:leading-8"
          >
            <span className="sm:hidden">
              Send the ESG request.
              <br />
              We organise the evidence.
            </span>
            <span className="hidden sm:inline">
              We turn supplier questionnaires, VSME reports, Scope 1 & 2 data
              and supporting documents into customer-ready ESG responses.
            </span>
          </p>

          <div
            className="mx-auto mt-7 flex w-full max-w-[20rem] flex-col items-center justify-center gap-3 sm:mt-8 sm:max-w-[28rem] sm:flex-row"
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

          <div className="mx-auto mt-7 hidden max-w-[27rem] flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[rgba(21,21,21,0.62)] sm:flex">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-orange"
            />
            <span className="min-w-0 [overflow-wrap:anywhere]">
              Prepared evidence. Human-reviewed. Ready for your customer.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
