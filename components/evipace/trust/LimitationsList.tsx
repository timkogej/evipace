import { MinusCircle } from "lucide-react";
import { Reveal } from "../Reveal";

const doesNotProvide = [
  "We do not issue ESG certifications of any kind.",
  "We do not provide statutory audit or third-party assurance.",
  "We do not provide legal advice.",
  "We do not guarantee that any output meets a specific regulatory requirement or legal standard.",
  "We do not guarantee that a customer, procurement platform or other third party will accept the completed work."
];

/**
 * Standalone "what we don't provide" card for the methodology page. Built
 * independently from TransparencySection's similar-looking card (rather
 * than extracted/shared) so the homepage component is never touched by
 * changes made here.
 */
export function LimitationsList() {
  return (
    <section className="section-padding py-8 sm:py-10">
      <div className="site-shell">
        <Reveal className="max-w-3xl rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            What Evipace does not provide
          </h2>
          <ul className="mt-7 grid gap-4">
            {doesNotProvide.map((item) => (
              <li className="flex gap-3 text-lg leading-8 text-muted" key={item}>
                <MinusCircle
                  aria-hidden="true"
                  className="mt-1.5 h-5 w-5 shrink-0 text-[rgba(21,21,21,0.42)]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
