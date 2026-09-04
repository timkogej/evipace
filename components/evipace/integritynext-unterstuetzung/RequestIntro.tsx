import { Reveal } from "../Reveal";
import Link from "next/link";

export function RequestIntro() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Einladung</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Ihr Kunde hat Sie eingeladen. Jetzt müssen die richtigen
            Informationen zusammenkommen.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Eine IntegrityNext-Anfrage beginnt häufig mit einer Einladung
              eines Kunden oder Geschäftspartners. Danach werden im
              Unternehmensprofil die angeforderten Nachhaltigkeits- und
              Compliance-Themen sichtbar.
            </p>
            <p>
              Was zunächst nach einer einzelnen Online-Selbstauskunft aussieht,
              betrifft intern schnell mehrere Bereiche.
            </p>
            <p>
              Informationen können beispielsweise im Qualitätsmanagement, in
              HR, im Einkauf, in der Produktion, bei Compliance oder in der
              Geschäftsführung liegen.
            </p>
            <p>
              Ein Zertifikat ist vorhanden - aber ist es für das gefragte Thema
              relevant?
            </p>
            <p>
              Eine Richtlinie existiert - aber wer kann bestätigen, dass sie
              noch aktuell ist?
            </p>
            <p>
              Verbrauchs- oder Emissionsdaten liegen vor - aber in welcher Form
              werden sie benötigt?
            </p>
            <p>
              Die Herausforderung ist häufig nicht das Portal selbst, sondern
              die richtigen Informationen aus verschiedenen
              Unternehmensbereichen zusammenzubringen.
            </p>
            <p>
              Sie wurden gerade von einem Kunden zu IntegrityNext eingeladen?{" "}
              <Link
                className="orange-link"
                href="/de/ressourcen/integritynext-einladung-lieferanten"
              >
                Unser Leitfaden erklärt den Ablauf vom Supplier Profile über
                Zertifikate und Fragebögen bis zum möglichen
                Nachbesserungsbedarf
              </Link>
              .
            </p>
            <p>Genau bei dieser operativen Vorbereitung unterstützt Evipace.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
