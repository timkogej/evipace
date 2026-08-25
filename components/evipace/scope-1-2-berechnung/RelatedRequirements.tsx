import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";

const relatedLinks = [
  {
    title: "VSME-Nachhaltigkeitsbericht",
    body: "Die Emissionswerte können Teil der Umwelt- und Klimadaten eines freiwilligen Nachhaltigkeitsberichts sein.",
    href: "/de/vsme-nachhaltigkeitsbericht"
  },
  {
    title: "ESG-Anforderungen von Kunden",
    body: "Ihr Kunde fordert konkrete Emissionsdaten? Eine dokumentierte Scope-1-&-2-Berechnung schafft eine belastbare Grundlage für die Antwort.",
    href: "/de/esg-kundenanfragen"
  },
  {
    title: "ESG-Fragebogen für Lieferanten",
    body: "Viele Lieferantenfragebögen enthalten Fragen zu Treibhausgasemissionen, Energieverbrauch oder bestehenden Carbon-Daten.",
    href: "/de/esg-fragebogen-lieferanten"
  },
  {
    title: "EcoVadis-Unterstützung",
    body: "Emissions- und Energiedaten können auch bei der Vorbereitung bestimmter Nachhaltigkeitsbewertungen relevant sein.",
    href: "/de/ecovadis-unterstuetzung"
  },
  {
    title: "IntegrityNext-Unterstützung",
    body: "Auch in angeforderten Supplier Assessments können Carbon- und Energiedaten eine Rolle spielen.",
    href: "/de/integritynext-unterstuetzung"
  }
];

export function RelatedRequirements() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Verwendungszwecke</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Eine Berechnung, mehrere Verwendungszwecke.
          </h2>
          <p className="body-lg mt-7">
            Scope-1- und Scope-2-Werte werden heute in unterschiedlichen
            ESG-Prozessen benötigt.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {relatedLinks.map((link, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.05}
              key={link.href}
            >
              <h3 className="text-xl font-bold text-ink">{link.title}</h3>
              <p className="mt-4 leading-7 text-muted">{link.body}</p>
              <Link
                className="orange-link mt-6 inline-flex items-center gap-2 text-sm"
                href={link.href}
              >
                {link.title}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
