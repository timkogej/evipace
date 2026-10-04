import { ServiceRequestCta } from "../service-landing/ServiceRequestCta";

export function LandingFinalCTA() {
  return (
    <ServiceRequestCta
      eyebrow="Nächster Schritt"
      title="IntegrityNext-Anfrage erhalten? Zeigen Sie uns die angeforderten Themen."
      body="Senden Sie uns die Einladung, Screenshots der Assessments und vorhandene Unterlagen. Wir ordnen ein, was bereits vorliegt und welche Angaben noch geklärt werden müssen."
      button="IntegrityNext-Anfrage senden"
      href="/de/send-request"
    />
  );
}
