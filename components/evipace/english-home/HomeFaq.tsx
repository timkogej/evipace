import { homeFaq } from "./content";
import { SectionHeading } from "./SectionHeading";

/**
 * Entity-level questions about Evipace itself, using the same <details>
 * accordion the German homepage and the resource articles already use. It
 * sits directly above the final CTA: a reader who is still deciding what
 * Evipace actually is gets that answered immediately before being asked to
 * send a request.
 */
export function HomeFaq() {
  return (
    <section className="section-padding bg-[var(--warm)]" id="faq">
      <div className="site-shell max-w-5xl">
        <SectionHeading eyebrow="FAQ" heading="Common questions about Evipace." />

        <div className="mt-12 grid gap-4">
          {homeFaq.map((item) => (
            <details
              className="group rounded-lg border border-[rgba(21,21,21,0.11)] bg-white"
              key={item.question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 text-left text-xl font-bold text-ink marker:content-none sm:p-7">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(21,21,21,0.12)] text-2xl font-light leading-none text-orange transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 leading-8 text-muted sm:px-7 sm:pb-7">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
