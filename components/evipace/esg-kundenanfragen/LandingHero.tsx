import { ServiceHero } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

export function LandingHero() {
  return (
    <ServiceHero
      actions={{
        primary: { label: "ESG-Anfrage senden", href: SEND_REQUEST_HREF },
        secondary: { label: "So funktioniert es", href: "#ablauf" }
      }}
      breadcrumb="ESG-Kundenanfragen"
      eyebrow="ESG-Fragebögen und Kundenanfragen"
      lead="Senden Sie uns die Anfrage Ihres Kunden – als E-Mail, Fragebogen, Excel-Datei oder Portal-Einladung. Wir klären die Anforderungen, ordnen vorhandene Daten und Nachweise zu und bereiten die Antwort vor. Eine Person bei Evipace prüft sie, Sie geben frei und senden sie selbst."
      note="Starten Sie mit der Anfrage. Sie müssen die ESG-Daten noch nicht selbst zusammenstellen."
      title="Ihr Kunde schickt einen ESG-Fragebogen? Wir bereiten die Antwort vor, Sie geben frei."
    />
  );
}
