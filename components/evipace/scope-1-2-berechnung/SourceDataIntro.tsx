import Link from "next/link";
import { Reveal } from "../Reveal";

export function SourceDataIntro() {
  return (
    <section className="border-y border-[rgba(21,21,21,0.09)] bg-[#f8f8f6] py-12 sm:py-16">
      <div className="site-shell grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Ausgangsdaten</p>
          <h2 className="type-heading font-display mt-5 max-w-[18ch]">
            Die Berechnung beginnt bei Ihren Verbrauchsdaten.
          </h2>
        </Reveal>
        <Reveal className="max-w-2xl lg:pt-7" delay={0.08}>
          <p className="text-lg leading-8 text-muted">
            Stromrechnungen, Brennstoff- und Fuhrparkdaten, Kältemittel und
            eingekaufte Wärme bilden die Grundlage. Wir grenzen Standorte und
            Zeitraum ab, vereinheitlichen die Angaben und dokumentieren die
            verwendeten Emissionsfaktoren.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">
            Zum Einstieg:{" "}
            <Link className="orange-link" href="/de/ressourcen/scope-1-2-daten-berechnung">
              benötigte Scope-1- und Scope-2-Daten
            </Link>{" "}
            und die{" "}
            <Link className="orange-link" href="/de/ressourcen/scope-1-2-datenerfassungs-vorlage">
              Datenerfassungs-Vorlage
            </Link>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
