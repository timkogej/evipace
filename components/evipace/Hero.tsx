"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "./ButtonLink";
import { ImageSlot } from "./ImageSlot";

type HeroProps = {
  imageAvailable: boolean;
};

export function Hero({ imageAvailable }: HeroProps) {
  const reducedMotion = useReducedMotion();

  const fastReveal = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section
      className="relative isolate overflow-hidden pt-24"
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="hero-shell py-7 sm:py-10 xl:py-8">
        <div className="relative grid min-w-0 gap-9 xl:block">
          <div className="relative z-20 w-full min-w-0 max-w-3xl xl:absolute xl:inset-y-0 xl:left-[clamp(2rem,4vw,4.75rem)] xl:flex xl:w-[min(32rem,40%)] xl:items-center">
            <motion.div
              animate="show"
              initial="hidden"
              transition={{ staggerChildren: 0.09 }}
            >
              <motion.p
                className="eyebrow"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                variants={fastReveal}
              >
                ESG for European manufacturers
              </motion.p>

              <motion.h1
                className="heading-xl font-display mt-6 max-w-[10ch] text-ink"
                id="hero-title"
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                variants={fastReveal}
              >
                ESG, done faster.
              </motion.h1>

              <motion.p
                className="body-lg mt-6 max-w-full text-[rgba(21,21,21,0.72)] [overflow-wrap:anywhere] sm:max-w-[34rem] xl:max-w-[30rem]"
                transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                variants={fastReveal}
              >
                We handle the ESG work your customers ask for - from supplier
                questionnaires and VSME reports to Scope 1 & 2 calculations and
                supporting documentation.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                variants={fastReveal}
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
              </motion.div>

              <motion.div
                className="mt-7 flex flex-wrap items-center gap-3 text-sm font-semibold text-[rgba(21,21,21,0.62)] xl:max-w-[28rem]"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                variants={fastReveal}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-orange"
                />
                <span className="min-w-0 flex-1">
                  Fast execution. Human-reviewed. Ready for your customer.
                </span>
              </motion.div>
            </motion.div>
          </div>

          <figure className="relative w-full min-w-0 overflow-hidden rounded-[1.35rem] border border-[rgba(21,21,21,0.10)] bg-[#efede6] shadow-[0_28px_90px_rgba(21,21,21,0.13)] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] xl:h-[min(76vh,50rem)] xl:min-h-[43rem] xl:aspect-auto">
            {imageAvailable ? (
              <Image
                alt={evipaceImages.hero.alt}
                className={`object-cover ${evipaceImages.hero.imageClassName}`}
                fill
                priority={evipaceImages.hero.priority}
                quality={evipaceImages.hero.quality}
                sizes={evipaceImages.hero.sizes}
                src={evipaceImages.hero.src}
              />
            ) : (
              <ImageSlot
                {...evipaceImages.hero}
                className="absolute inset-0 border-0"
                renderActualImage={false}
              />
            )}

            <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(250,249,246,0.98)_0%,rgba(250,249,246,0.93)_21%,rgba(250,249,246,0.62)_42%,rgba(250,249,246,0.12)_66%,rgba(250,249,246,0)_100%)] xl:block" />
            <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_82%_24%,rgba(255,255,255,0.22),transparent_30%),linear-gradient(180deg,rgba(21,21,21,0)_70%,rgba(21,21,21,0.16)_100%)] xl:block" />
          </figure>
        </div>
      </div>
    </section>
  );
}
