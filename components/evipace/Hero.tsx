"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Image from "next/image";
import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "./ButtonLink";
import { ImageSlot } from "./ImageSlot";

const documentLayers = [
  {
    title: "Supplier ESG Questionnaire",
    meta: "47 / 47 fields reviewed",
    status: "Ready for customer",
    className: "-left-4 top-[18%] w-[min(17rem,70vw)] sm:-left-6 lg:-left-8"
  },
  {
    title: "Scope 1 & 2",
    meta: "Calculation prepared",
    status: "Ready for review",
    className: "-right-3 top-[27%] w-[min(15rem,64vw)] sm:-right-5 lg:-right-7"
  },
  {
    title: "VSME",
    meta: "Draft prepared",
    status: "Evidence packed",
    className: "-left-3 bottom-[9%] w-[min(14rem,62vw)] sm:-left-5 lg:-left-7"
  }
];

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
      <div className="pointer-events-none absolute left-[4vw] top-28 hidden font-display text-[14vw] leading-none text-[rgba(21,21,21,0.035)] xl:block">
        FASTER
      </div>

      <div className="site-shell grid items-start gap-12 py-8 sm:py-12 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16">
        <motion.div
          animate="show"
          className="relative z-10 max-w-3xl"
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
            className="heading-xl font-display mt-7 max-w-[11ch]"
            id="hero-title"
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            variants={fastReveal}
          >
            ESG, done faster.
          </motion.h1>

          <motion.p
            className="body-lg mt-7 max-w-2xl [overflow-wrap:anywhere]"
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            variants={fastReveal}
          >
            We handle the ESG work your customers ask for - from supplier
            questionnaires and VSME reports to Scope 1 & 2 calculations and
            supporting documentation.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
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
            className="mt-7 flex flex-wrap items-center gap-3 text-sm font-semibold text-[rgba(21,21,21,0.62)]"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            variants={fastReveal}
          >
            <span className="h-2 w-2 rounded-full bg-orange" />
            <span className="min-w-0 flex-1">
              Fast execution. Human-reviewed. Ready for your customer.
            </span>
          </motion.div>
        </motion.div>

        <div className="relative min-h-[30rem] sm:min-h-[36rem] lg:min-h-[44rem]">
          <div className="absolute inset-0">
            {imageAvailable ? (
              <figure className="absolute inset-0 isolate overflow-hidden rounded-[1.25rem] border border-[rgba(21,21,21,0.12)] bg-[#efede6]">
                <Image
                  alt={evipaceImages.hero.alt}
                  className={`object-cover ${evipaceImages.hero.imageClassName}`}
                  fill
                  priority={evipaceImages.hero.priority}
                  quality={evipaceImages.hero.quality}
                  sizes={evipaceImages.hero.sizes}
                  src={evipaceImages.hero.src}
                />
              </figure>
            ) : (
              <ImageSlot
                {...evipaceImages.hero}
                className="absolute inset-0 rounded-[1.25rem]"
                renderActualImage={false}
              />
            )}
          </div>

          {documentLayers.map((doc, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={`absolute z-10 overflow-hidden rounded-lg border border-white/70 bg-white/90 p-4 shadow-premium backdrop-blur-xl ${doc.className}`}
              initial={reducedMotion ? false : { opacity: 0, y: 26 }}
              key={doc.title}
              transition={{
                duration: 0.58,
                delay: 0.55 + index * 0.14,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <span aria-hidden="true" className="document-fold" />
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                  <FileText aria-hidden="true" className="h-4 w-4" />
                </div>
                <span className="font-mono text-[0.68rem] text-muted">
                  ESG / 2026
                </span>
              </div>
              <p className="text-sm font-bold text-ink">{doc.title}</p>
              <p className="mt-1 text-xs font-semibold text-muted">{doc.meta}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase text-[rgba(21,21,21,0.64)]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-orange"
                />
                {doc.status}
              </p>
              <div className="mt-4 space-y-1.5">
                <span className="block h-1.5 w-full rounded-full bg-[rgba(21,21,21,0.10)]" />
                <span className="block h-1.5 w-3/4 rounded-full bg-[rgba(254,112,1,0.42)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
