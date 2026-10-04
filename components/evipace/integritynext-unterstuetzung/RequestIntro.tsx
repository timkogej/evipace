import Link from "next/link";
import { Reveal } from "../Reveal";

export function RequestIntro() {
  return (
    <section className="border-y border-[rgba(21,21,21,0.09)] bg-[#f8f8f6] py-12 sm:py-16">
      <div className="site-shell grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Einladung</p>
          <h2 className="type-heading font-display mt-5 max-w-[18ch]">
            Die Einladung ist da. Die Informationen liegen an vielen Orten.
          </h2>
        </Reveal>
        <Reveal className="max-w-2xl lg:pt-7" delay={0.08}>
          <p className="text-lg leading-8 text-muted">
            Eine IntegrityNext-Anfrage betrifft oft mehrere Teams, Zertifikate
            und Unternehmensbereiche. Wir prüfen die angeforderten Assessments,
            ordnen vorhandene Unterlagen zu und halten fest, was noch beantwortet
            oder intern bestätigt werden muss.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">
            Neu auf der Plattform? Unser{" "}
            <Link className="orange-link" href="/de/ressourcen/integritynext-einladung-lieferanten">
              Leitfaden zur IntegrityNext-Einladung
            </Link>{" "}
            erklärt die ersten Schritte.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
