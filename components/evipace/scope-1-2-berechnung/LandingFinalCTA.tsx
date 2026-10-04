import { ServiceRequestCta } from "../service-landing/ServiceRequestCta";

export function LandingFinalCTA() {
  return (
    <ServiceRequestCta
      eyebrow="Nächster Schritt"
      title="Ihre Verbrauchsdaten sind da. Machen wir daraus Scope-1- und Scope-2-Werte."
      body="Senden Sie uns vorhandene Energie-, Brennstoff- und Verbrauchsdaten. Wir strukturieren die Quellen und dokumentieren die Berechnungsgrundlage nachvollziehbar."
      button="Scope-1-&-2-Berechnung anfragen"
      href="/de/send-request"
    />
  );
}
