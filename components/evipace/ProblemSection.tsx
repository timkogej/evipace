"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileSpreadsheet, FileText } from "lucide-react";
import { Reveal } from "./Reveal";

const sources = [
  "Invoices",
  "Excel files",
  "Energy bills",
  "Fuel records",
  "Policies",
  "Certificates",
  "HR documents",
  "Purchasing data"
];

const cards = [
  { label: "Energy bills", x: -92, y: -78, rotate: -10 },
  { label: "Fuel records", x: 92, y: -58, rotate: 8 },
  { label: "Policies", x: -112, y: 32, rotate: 6 },
  { label: "Certificates", x: 74, y: 76, rotate: -7 },
  { label: "Purchasing data", x: 6, y: -118, rotate: 4 },
  { label: "Invoices", x: 116, y: 18, rotate: 9 },
  { label: "HR documents", x: -78, y: 92, rotate: -8 },
  { label: "Excel files", x: 24, y: 116, rotate: 5 },
  { label: "Supplier forms", x: -18, y: -34, rotate: -4 }
];

export function ProblemSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-padding" id="resources">
      <div className="site-shell grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <p className="eyebrow">The problem</p>
          <h2 className="heading-md font-display mt-6 max-w-[12ch]">
            ESG requests arrive faster than most SMEs can deal with them.
          </h2>
          <p className="body-lg mt-7 max-w-2xl">
            Manufacturers increasingly receive ESG questionnaires and
            sustainability data requests from customers, while the information
            needed to answer them is scattered across everyday business files.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
            {sources.map((source) => (
              <div
                className="border-t border-[rgba(21,21,21,0.13)] pt-3 text-sm font-semibold text-[rgba(21,21,21,0.66)]"
                key={source}
              >
                {source}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative min-h-[36rem] rounded-[1.25rem] border border-[rgba(21,21,21,0.1)] bg-white p-6 shadow-lift">
          <div className="absolute right-6 top-6 rounded-full border border-[rgba(21,21,21,0.12)] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
            Evidence intake
          </div>

          <div className="absolute inset-6 rounded-2xl border border-dashed border-[rgba(21,21,21,0.16)]" />

          {cards.map((card, index) => (
            <motion.div
              className="absolute left-1/2 top-[45%] w-[15.2rem] max-w-[calc(100%_-_4rem)] rounded-2xl border border-[rgba(21,21,21,0.13)] bg-[var(--paper)] p-4 shadow-[0_14px_35px_rgba(21,21,21,0.09)]"
              initial={
                reducedMotion
                  ? false
                  : {
                      x: `calc(-50% + ${card.x}px)`,
                      y: `calc(-50% + ${card.y}px)`,
                      rotate: card.rotate,
                      opacity: 0.88
                    }
              }
              key={card.label}
              transition={{
                duration: 0.72,
                delay: 0.92 + index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: true, amount: 0.5 }}
              whileInView={{
                x: `calc(-50% + ${index * 7 - 28}px)`,
                y: `calc(-50% + ${index * 8 - 26}px)`,
                rotate: index * 0.85 - 3,
                opacity: 1
              }}
            >
              <div className="mb-8 flex items-center justify-between">
                <FileText className="h-5 w-5 text-orange" />
                <span className="font-mono text-[0.68rem] text-muted">
                  DOC-{index + 1}
                </span>
              </div>
              <p className="text-sm font-bold text-ink">{card.label}</p>
              <div className="mt-4 space-y-2">
                <span className="block h-1.5 w-full rounded-full bg-[rgba(21,21,21,0.09)]" />
                <span className="block h-1.5 w-2/3 rounded-full bg-[rgba(21,21,21,0.09)]" />
              </div>
            </motion.div>
          ))}

          <motion.div
            className="absolute bottom-7 left-7 right-7 overflow-hidden rounded-lg border border-[rgba(254,112,1,0.38)] bg-[var(--soft-orange)] p-5"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 1.35 }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span aria-hidden="true" className="document-fold" />
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange text-white">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.13em] text-orange">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-orange"
                  />
                  Ready for review
                </p>
                <p className="mt-1 text-sm text-[rgba(21,21,21,0.66)]">
                  Evidence organised around the customer request.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
