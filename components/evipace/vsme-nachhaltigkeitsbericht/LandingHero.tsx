import { ServiceHero } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

export function LandingHero() {
  return (
    <ServiceHero
      actions={{
        primary: { label: "VSME-Projekt anfragen", href: SEND_REQUEST_HREF },
        secondary: { label: "So erstellen wir den Bericht", href: "#ablauf" }
      }}
      breadcrumb="VSME-Nachhaltigkeitsbericht"
      eyebrow="VSME-Nachhaltigkeitsbericht"
      lead="Sie liefern die vorhandenen Unternehmensdaten und Unterlagen. Wir strukturieren die relevanten Nachhaltigkeitsinformationen, bereiten Kennzahlen und Inhalte auf und führen alles zu einem nachvollziehbaren Bericht nach dem aktuellen freiwilligen europäischen Berichtsrahmen zusammen."
      note="Daten · Kennzahlen · Dokumentation · Bericht"
      title="VSME-Nachhaltigkeitsbericht erstellen - ohne daraus ein monatelanges Projekt zu machen."
    />
  );
}
