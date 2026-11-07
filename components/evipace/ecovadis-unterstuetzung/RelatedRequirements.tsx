import { Band, CardGrid, Head, LinkCard } from "../service-landing/Blocks";

const relatedLinks = [
  {
    title: "ESG-Anforderungen von Kunden",
    body: "Wenn Ihr Kunde einzelne ESG-Daten, Dokumente oder Nachweise verlangt, unterstützen wir bei der strukturierten Vorbereitung der Antwort.",
    href: "/de/esg-kundenanfragen"
  },
  {
    title: "IntegrityNext-Unterstützung",
    body: "Wenn Ihr Kunde stattdessen oder zusätzlich eine IntegrityNext-Einladung schickt.",
    href: "/de/integritynext-unterstuetzung"
  },
  {
    title: "Scope 1 und 2 berechnen",
    body: "Wenn die Bewertung Emissionswerte verlangt, die Ihr Unternehmen noch nicht berechnet.",
    href: "/de/scope-1-2-berechnung"
  }
];

export function RelatedRequirements() {
  return (
    <Band>
      <Head
        eyebrow="Weitere Formate"
        lead="Manche Kunden verlangen eine EcoVadis-Bewertung. Andere verwenden eigene Fragebögen, Excel-Dateien, Lieferantenportale oder individuelle ESG-Anfragen. Evipace unterstützt auch bei diesen Formaten."
        title="EcoVadis ist nur eine Form von ESG-Kundenanforderungen."
      />
      <CardGrid columns={3}>
        {relatedLinks.map((link) => (
          <LinkCard body={link.body} href={link.href} key={link.href} more={link.title} title={link.title} />
        ))}
      </CardGrid>
    </Band>
  );
}
