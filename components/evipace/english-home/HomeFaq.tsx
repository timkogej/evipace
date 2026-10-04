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

        <div className="faq-list">
          {homeFaq.map((item) => (
            <details
              className="faq-item group"
              key={item.question}
            >
              <summary className="faq-question">
                <span>{item.question}</span>
                <span aria-hidden="true" className="faq-toggle" />
              </summary>
              <p className="faq-answer">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
