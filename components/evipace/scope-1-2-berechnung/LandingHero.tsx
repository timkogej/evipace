import { ServiceHero } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

export function LandingHero() {
  return (
    <ServiceHero
      actions={{
        primary: { label: "Scope-1-&-2-Berechnung anfragen", href: SEND_REQUEST_HREF },
        secondary: { label: "So funktioniert die Berechnung", href: "#ablauf" }
      }}
      breadcrumb="Scope 1 & 2"
      eyebrow="Scope 1 & 2"
      lead="Sie senden uns Stromrechnungen, Brennstoffverbräuche, Fuhrparkdaten und weitere relevante Unterlagen für die CO₂-Bilanz für Unternehmen. Wir strukturieren die Emissionsquellen, bereiten die Berechnung auf und dokumentieren nachvollziehbar, wie Ihre Scope-1- und Scope-2-Werte entstanden sind."
      note="Energie · Brennstoffe · Fuhrpark · Kältemittel · CO₂e"
      title="CO₂-Bilanz für Ihr Unternehmen: Scope 1 und Scope 2 nachvollziehbar berechnen."
    />
  );
}
