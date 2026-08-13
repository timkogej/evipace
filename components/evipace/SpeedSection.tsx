"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Reveal } from "./Reveal";

const stages = [
  "Documents",
  "Structured data",
  "Preparation",
  "Review",
  "Deliverable"
];

export function SpeedSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-padding overflow-hidden bg-dark text-white">
      <div className="site-shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal>
          <p className="eyebrow">Built for speed</p>
          <h2 className="heading-md font-display mt-6 max-w-[11ch] text-white">
            A faster way to get ESG work done.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            Evipace combines structured workflows, efficient document processing
            and ESG expertise to reduce the manual work behind reporting and
            customer requests.
          </p>
        </Reveal>

        <div className="relative rounded-[1.25rem] border border-white/12 bg-white/[0.04] p-5 sm:p-8">
          <div className="absolute -right-8 -top-8 hidden font-display text-9xl text-white/[0.035] sm:block">
            EVIDENCE
          </div>

          <div className="grid gap-4">
            {stages.map((stage, index) => (
              <motion.div
                className="workflow-stage relative rounded-2xl border border-white/12 bg-[#202020] p-5"
                initial={reducedMotion ? false : { opacity: 0, x: 24 }}
                key={stage}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true, amount: 0.35 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center justify-between gap-5">
                  <span className="text-sm font-bold uppercase tracking-[0.16em] text-white/74">
                    {stage}
                  </span>
                  <span className="font-mono text-xs text-orange">
                    0{index + 1}
                  </span>
                </div>
                {index < stages.length - 1 ? (
                  <ArrowDown
                    aria-hidden="true"
                    className="absolute -bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border border-white/12 bg-dark p-1.5 text-orange"
                  />
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
