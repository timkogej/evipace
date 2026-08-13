"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "./ButtonLink";

export function FinalCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--soft-orange)] py-[clamp(5rem,9vw,9rem)]"
      id="final-cta"
    >
      <motion.div
        aria-hidden="true"
        className="absolute right-[6vw] top-8 hidden font-display text-[16vw] leading-none text-[rgba(254,112,1,0.11)] lg:block"
        initial={reducedMotion ? false : { x: 48, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        whileInView={{ x: 0, opacity: 1 }}
      >
        DONE
      </motion.div>

      <div className="site-shell relative z-10 max-w-5xl">
        <p className="eyebrow">Next step</p>
        <h2 className="font-display mt-6 text-[clamp(3.6rem,8vw,7.5rem)] leading-[0.88]">
          Got an ESG request on your desk?
          <br />
          <span className="text-orange">Let&apos;s get it done.</span>
        </h2>
        <p className="mt-7 max-w-2xl text-xl leading-8 text-[rgba(21,21,21,0.68)]">
          Send us the questionnaire or tell us what your customer is asking for.
          We will show you the fastest way forward.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="mailto:hello@evipace.com?subject=ESG%20request">
            Send us your ESG request
          </ButtonLink>
          <ButtonLink href="#book-call" variant="secondary">
            Book a 20-minute call
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
