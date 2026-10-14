import { ServiceHero, StatusPanel } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

/**
 * Bespoke hero for this landing page rather than the shared trust PageHero —
 * needs a primary + secondary CTA and microcopy, which PageHero doesn't
 * support. Kept to the same eyebrow/heading/intro typographic system as
 * every other page.
 */

export function LandingHero() {
  return (
    <ServiceHero
      actions={{
        primary: { label: "ESG-Anfrage senden", href: SEND_REQUEST_HREF },
        secondary: { label: "So funktioniert es", href: "#ablauf" }
      }}
      breadcrumb="ESG-Fragebögen für Lieferanten"
      eyebrow="ESG-Fragebögen für Lieferanten"
      lead="Sie senden uns den Fragebogen und Ihre vorhandenen Unterlagen. Wir übernehmen die operative Vorbereitung: Wir bearbeiten die Fragen, bereiten Antworten vor, ordnen Nachweise zu und markieren Lücken. Ihr Team bestätigt die Unternehmensangaben und gibt die finale Antwort frei."
      note="Excel · PDF · Word · kundenspezifische Anforderungen"
      title="ESG-Fragebogen vom Kunden erhalten? Wir bereiten die Antworten für Sie vor."
    >
      <StatusPanel
        label="ESG-Fragebogen"
        rows={[
          { label: "Scope 1 & Scope 2", status: "Vorbereitet" },
          { label: "Umweltpolitik", status: "Nachweis zugeordnet" },
          { label: "Code of Conduct", status: "Nachweis zugeordnet" },
          { label: "Zertifikate", status: "Offen — Angabe nötig", open: true }
        ]}
      />
    </ServiceHero>
  );
}
