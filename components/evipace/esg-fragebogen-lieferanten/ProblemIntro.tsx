import Link from "next/link";
import { Reveal } from "../Reveal";

export function ProblemIntro() {
  return (
    <section className="border-y border-[rgba(21,21,21,0.09)] bg-[#f8f8f6] py-12 sm:py-16">
      <div className="site-shell grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Der Ausgangspunkt</p>
          <h2 className="type-heading font-display mt-5 max-w-[18ch]">
            Die Fragen stehen im Dokument. Die Antworten liegen im Unternehmen.
          </h2>
        </Reveal>
        <Reveal className="max-w-2xl lg:pt-7" delay={0.08}>
          <p className="text-lg leading-8 text-muted">
            Energieverbrauch, Emissionen, Richtlinien und Zertifikate liegen oft
            bei verschiedenen Teams. Wir ordnen vorhandene Angaben den Fragen
            Ihres Kunden zu und zeigen, welche Antworten belegt sind und wo
            noch eine Bestätigung fehlt.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">
            Sie möchten zuerst den Fragebogen selbst einordnen? Unsere{" "}
            <Link className="orange-link" href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten">
              ESG-Fragebogen-Checkliste
            </Link>{" "}
            hilft beim ersten Überblick.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">
            Zur Vorbereitung: <Link className="orange-link" href="/de/ressourcen/welche-esg-daten-kunden-lieferanten">Welche ESG-Daten Kunden verlangen</Link>{" "}
            und <Link className="orange-link" href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">wie Sie geprüfte ESG-Daten wiederverwenden</Link>.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">
            ESG-Fragebogen erhalten? <Link className="orange-link" href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">Lesen Sie unseren praktischen Leitfaden für die ersten Schritte.</Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
