import { Band, CardGrid, Head, LinkCard } from "../service-landing/Blocks";

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
    <Band>
      <Head
        eyebrow="Verwendungszwecke"
        lead="Scope-1- und Scope-2-Werte werden heute in unterschiedlichen ESG-Prozessen benötigt."
        title="Eine Berechnung, mehrere Verwendungszwecke."
      />
      <CardGrid>
        {relatedLinks.map((link) => (
          <LinkCard body={link.body} href={link.href} key={link.href} more={link.title} title={link.title} />
        ))}
      </CardGrid>
    </Band>
  );
}
