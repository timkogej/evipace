import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";

const relatedLinks = [
  {
    title: "ESG-Anforderungen von Kunden",
    body: "Ihr Kunde verlangt einzelne ESG-Daten, Dokumente oder Nachweise - unabhängig von einer bestimmten Plattform? Wir helfen dabei, die Anfrage in konkrete Aufgaben zu übersetzen und die Antwort strukturiert vorzubereiten.",
    href: "/de/esg-kundenanfragen"
  },
  {
    title: "ESG-Fragebogen für Lieferanten",
    body: "Ihr Kunde hat einen eigenen Nachhaltigkeits- oder ESG-Fragebogen geschickt? Wir unterstützen bei der Vorbereitung der Antworten, Daten und Nachweise entlang der konkreten Fragen.",
    href: "/de/esg-fragebogen-lieferanten"
  },
  {
    title: "EcoVadis-Unterstützung",
    body: "Sie bereiten stattdessen eine EcoVadis-Bewertung vor? Wir unterstützen bei der strukturierten Vorbereitung von Antworten und Nachweisen.",
    href: "/de/ecovadis-unterstuetzung"
  }
];

export function RelatedRequirements() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Weitere Anforderungen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            IntegrityNext ist eine von mehreren möglichen
            ESG-Kundenanforderungen.
          </h2>
          <p className="body-lg mt-7">
            Nicht jeder Kunde verwendet dieselbe Plattform oder denselben
            Prozess.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {relatedLinks.map((link, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.08}
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
