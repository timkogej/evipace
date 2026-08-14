"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "./ButtonLink";

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
      className="relative isolate min-h-[92svh] overflow-hidden bg-[#e9e3d8] md:min-h-[88svh] xl:min-h-[min(92vh,56rem)]"
      id="top"
      aria-labelledby="hero-title"
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 z-0"
        initial={reducedMotion ? false : { opacity: 0.96, scale: 1.015 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {imageAvailable ? (
          <Image
            alt=""
            aria-hidden="true"
            className={`object-cover ${evipaceImages.hero.imageClassName}`}
            fill
            priority={evipaceImages.hero.priority}
            quality={evipaceImages.hero.quality}
            sizes={evipaceImages.hero.sizes}
            src={evipaceImages.hero.src}
          />
        ) : (
          <div
            aria-hidden="true"
            className="image-fallback-grid absolute inset-0 bg-[#efede6]"
          />
        )}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(247,246,242,0.94)_0%,rgba(247,246,242,0.84)_40%,rgba(247,246,242,0.30)_66%,rgba(247,246,242,0.04)_88%,rgba(247,246,242,0)_100%)] sm:hidden" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_28%_37%,rgba(250,249,246,0.42)_0%,rgba(247,246,242,0.22)_38%,rgba(247,246,242,0)_66%)] sm:hidden" />
      <div className="pointer-events-none absolute inset-0 z-10 hidden bg-[linear-gradient(90deg,rgba(247,246,242,0.96)_0%,rgba(247,246,242,0.88)_23%,rgba(247,246,242,0.42)_46%,rgba(247,246,242,0.10)_64%,rgba(247,246,242,0)_80%)] sm:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-[linear-gradient(180deg,rgba(250,249,246,0.14)_0%,rgba(247,246,242,0.06)_48%,rgba(247,246,242,0)_100%)] sm:h-24 sm:bg-[linear-gradient(180deg,rgba(250,249,246,0.20)_0%,rgba(247,246,242,0.08)_50%,rgba(247,246,242,0)_100%)]" />
      <div className="pointer-events-none absolute inset-x-[-4rem] bottom-[-3.5rem] z-10 h-[clamp(12rem,30vh,20rem)] bg-[rgba(247,246,242,0.34)] backdrop-blur-[22px] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_42%,rgba(0,0,0,0.72)_62%,transparent_100%)] [mask-image:linear-gradient(to_top,black_0%,black_42%,rgba(0,0,0,0.72)_62%,transparent_100%)] sm:bottom-[-4.5rem] sm:h-[clamp(14rem,34vh,24rem)] sm:backdrop-blur-[28px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-[linear-gradient(0deg,rgba(250,249,246,1)_0%,rgba(247,246,242,0.88)_24%,rgba(247,246,242,0.46)_56%,rgba(247,246,242,0)_100%)] sm:h-[clamp(10rem,25vh,16rem)] sm:bg-[linear-gradient(0deg,rgba(250,249,246,1)_0%,rgba(247,246,242,0.9)_22%,rgba(247,246,242,0.48)_54%,rgba(247,246,242,0)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-[radial-gradient(ellipse_at_50%_100%,rgba(250,249,246,0.74)_0%,rgba(247,246,242,0.34)_46%,rgba(247,246,242,0)_82%)] sm:h-[clamp(7rem,17vh,11rem)]" />

      <div className="site-shell relative z-20 flex min-h-[92svh] items-start pb-14 pt-32 md:min-h-[88svh] md:items-center md:py-20 xl:min-h-[min(92vh,56rem)]">
        <motion.div
          animate="show"
          className="w-full max-w-[31.5rem] pt-1 md:w-[42%] md:max-w-[33rem] md:pt-0 xl:w-[39%]"
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
            className="font-display mt-6 max-w-[7ch] text-[4.25rem] leading-[0.88] text-ink sm:text-[5.2rem] lg:text-[6.2rem] 2xl:text-[6.8rem]"
            id="hero-title"
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            variants={fastReveal}
          >
            <span className="block">ESG,</span>
            <span className="block">done</span>
            <span className="block">faster.</span>
          </motion.h1>

          <motion.p
            className="body-lg mt-6 max-w-[15.25rem] text-[rgba(21,21,21,0.76)] [overflow-wrap:anywhere] sm:max-w-[34rem] md:max-w-[30rem]"
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            variants={fastReveal}
          >
            We handle the ESG work your customers ask for - from supplier
            questionnaires and VSME reports to Scope 1 & 2 calculations and
            supporting documentation.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:items-start lg:flex-row lg:items-center"
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            variants={fastReveal}
          >
            <ButtonLink
              className="w-full max-w-full whitespace-nowrap text-center shadow-[0_16px_38px_rgba(254,112,1,0.22)] sm:w-fit"
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
            className="mt-7 flex max-w-[15.25rem] flex-wrap items-center gap-3 text-sm font-semibold text-[rgba(21,21,21,0.66)] md:max-w-[28rem]"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            variants={fastReveal}
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange" />
            <span className="min-w-0 flex-1">
              Fast execution. Human-reviewed. Ready for your customer.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
