import Link from "next/link";
import { Reveal } from "../Reveal";

export function RequestIntro() {
  return (
    <section className="border-y border-[rgba(21,21,21,0.09)] bg-[#f8f8f6] py-12 sm:py-16">
      <div className="site-shell grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Der Ausgangspunkt</p>
          <h2 className="type-heading font-display mt-5 max-w-[18ch]">
            Eine Anfrage. Viele verstreute Informationen.
          </h2>
        </Reveal>
        <Reveal className="max-w-2xl lg:pt-7" delay={0.08}>
          <p className="text-lg leading-8 text-muted">
            Kunden fragen nach Emissionen, Richtlinien, Zertifikaten oder
            sozialen Daten. Die Antwort liegt oft verteilt in Rechnungen,
            Tabellen und Dokumenten verschiedener Teams. Wir machen sichtbar,
            was bereits belegt ist, was fehlt und was vor der Antwort intern
            bestätigt werden muss.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">
            Geht es konkret um einen Lieferantenfragebogen? Lesen Sie mehr zur{" "}
            <Link className="orange-link" href="/de/esg-fragebogen-lieferanten">
              Unterstützung bei ESG-Fragebögen
            </Link>.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">
            Zur Vorbereitung: <Link className="orange-link" href="/de/ressourcen/welche-esg-daten-kunden-lieferanten">Welche ESG-Daten Kunden verlangen</Link>{" "}
            und <Link className="orange-link" href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">wie Sie geprüfte ESG-Daten wiederverwenden</Link>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
