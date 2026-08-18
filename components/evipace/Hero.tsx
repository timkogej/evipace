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
      className="evipace-hero relative isolate min-h-[100svh] overflow-hidden"
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0">
        {imageAvailable ? (
          <>
            <Image
              alt=""
              aria-hidden="true"
              className={`evipace-hero__desktop-image object-cover ${heroImage.imageClassName}`}
              fill
              priority={heroImage.priority}
              quality={heroImage.quality}
              sizes={heroImage.sizes}
              src={heroImage.src}
            />
            <div className="evipace-hero__mobile-image absolute inset-0">
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

        <div className="evipace-hero__mobile-overlay pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(250,249,246,0.96)_0%,rgba(250,249,246,0.84)_34%,rgba(250,249,246,0.18)_55%,rgba(247,246,242,0)_100%)]" />
        <div className="evipace-hero__desktop-overlay pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--paper)] to-transparent" />
      </div>

      <div className="evipace-hero__content relative z-10 flex min-h-[100svh] w-full min-w-0 items-start justify-center px-6 pb-[18svh] pt-[9.25rem] text-center">
        <div className="evipace-hero__copy w-full min-w-0 max-w-[34rem]">
          <h1
            className="evipace-hero__title mx-auto max-w-full font-display text-[2.25rem] leading-[0.92] text-ink [overflow-wrap:anywhere] [text-shadow:0_1px_26px_rgba(255,255,255,0.78)] min-[380px]:text-[2.35rem]"
            id="hero-title"
          >
            <span className="evipace-hero__title-mobile">
              ESG, done
              <br />
              faster.
            </span>
            <span className="evipace-hero__title-desktop">
              <span className="whitespace-nowrap">ESG done</span>
              <br />
              faster
            </span>
          </h1>

          <p
            className="evipace-hero__body mx-auto mt-5 max-w-full text-[0.98rem] font-medium leading-7 text-[rgba(21,21,21,0.74)] [overflow-wrap:anywhere]"
          >
            <span className="evipace-hero__body-mobile">
              Send the ESG request.
              <br />
              We organise the evidence.
            </span>
            <span className="evipace-hero__body-desktop">
              We handle the ESG work your customers ask for - from supplier
              questionnaires and VSME reports to Scope 1 & 2 calculations and
              supporting documentation.
            </span>
          </p>

          <div
            className="evipace-hero__actions mx-auto mt-7 flex w-full max-w-[20rem] flex-col items-center justify-center gap-3"
          >
            <ButtonLink
              className="evipace-hero__primary-cta w-full max-w-full text-center sm:w-auto"
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

          <div className="evipace-hero__proof mx-auto mt-7 hidden max-w-[28rem] flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[rgba(21,21,21,0.62)] min-[640px]:mx-0 min-[640px]:flex min-[640px]:justify-start">
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
