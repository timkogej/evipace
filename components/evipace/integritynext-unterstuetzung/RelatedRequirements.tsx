import { Band, CardGrid, Head, LinkCard } from "../service-landing/Blocks";

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
    <Band tone="tinted">
      <Head
        eyebrow="Weitere Anforderungen"
        lead="Nicht jeder Kunde verwendet dieselbe Plattform oder denselben Prozess."
        title="IntegrityNext ist eine von mehreren möglichen ESG-Kundenanforderungen."
      />
      <CardGrid columns={2}>
        {relatedLinks.map((link) => (
          <LinkCard body={link.body} href={link.href} key={link.href} more={link.title} title={link.title} />
        ))}
      </CardGrid>
    </Band>
  );
}
