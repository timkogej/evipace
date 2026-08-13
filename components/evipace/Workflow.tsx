"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { evipaceImages } from "@/lib/evipace-images";
import { ImageSlot } from "./ImageSlot";
import { Reveal } from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Send us what you already have",
    body: "Invoices, spreadsheets, certificates, policies, reports and the questionnaire you received."
  },
  {
    number: "02",
    title: "We organise the information",
    body: "We identify the relevant data, structure the documentation and determine what is still missing."
  },
  {
    number: "03",
    title: "We prepare the deliverable",
    body: "We prepare the questionnaire responses, calculations, report or supporting documentation required for the task."
  },
  {
    number: "04",
    title: "Final review",
    body: "The work is reviewed before it is delivered back to you."
  }
];

type WorkflowProps = {
  imageAvailable: boolean;
};

export function Workflow({ imageAvailable }: WorkflowProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-padding bg-[var(--warm)]" id="how-it-works">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="heading-md font-display mt-6">
              From scattered documents to a finished ESG response.
            </h2>
            <ImageSlot
              {...evipaceImages.howItWorks}
              className="mt-10 min-h-[20rem] rounded-[1rem]"
              renderActualImage={imageAvailable}
            />
          </Reveal>

          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-[rgba(21,21,21,0.13)] md:block" />
            <motion.div
              className="absolute left-6 top-0 hidden w-px origin-top bg-orange md:block"
              initial={reducedMotion ? false : { scaleY: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.25 }}
              whileInView={{ scaleY: 1 }}
              style={{ height: "100%" }}
            />

            <div className="grid gap-5">
              {steps.map((step, index) => (
                <Reveal
                  className="relative grid gap-5 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)] md:ml-16 md:grid-cols-[11rem_1fr]"
                  delay={index * 0.06}
                  key={step.title}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-5xl leading-none text-orange">
                      {step.number}
                    </span>
                    {index < steps.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="hidden h-4 w-4 text-muted md:block"
                      />
                    ) : null}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 leading-7 text-muted">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-14 border-t border-[rgba(21,21,21,0.13)] pt-8">
          <p className="font-display text-[clamp(2.4rem,5vw,5.2rem)] leading-[0.98]">
            You send us the request.
            <br />
            <span className="text-orange">We handle the work behind it.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
