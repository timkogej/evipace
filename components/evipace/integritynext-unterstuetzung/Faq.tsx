import { Reveal } from "../Reveal";

const faqs = [
  {
    question: "Was ist IntegrityNext?",
    answer:
      "IntegrityNext ist eine Nachhaltigkeits- und Compliance-Plattform, über die Unternehmen Nachhaltigkeits- und Compliance-Informationen von Geschäftspartnern und Lieferanten anfordern und verwalten können. Wenn Ihr Unternehmen eingeladen wurde, möchte in der Regel ein Geschäftspartner entsprechende Informationen über die Plattform erhalten."
  },
  {
    question: "Warum wurden wir zu IntegrityNext eingeladen?",
    answer:
      "In der Regel hat ein Kunde oder anderer Geschäftspartner Ihr Unternehmen aufgefordert, Nachhaltigkeits- und Compliance-Informationen über IntegrityNext bereitzustellen."
  },
  {
    question: "Kostet IntegrityNext für eingeladene Lieferanten etwas?",
    answer:
      "Nach aktuellem IntegrityNext Help Center entstehen eingeladenen Lieferanten für die Teilnahme, das Unternehmensprofil und die Bearbeitung angeforderter Assessments keine Kosten. Eigene zusätzliche Plattformnutzung, etwa das Einladen eigener Lieferanten, ist davon zu unterscheiden."
  },
  {
    question: "Brauchen wir für jedes Thema ein Zertifikat?",
    answer:
      "Nein. Je nach Thema kann ein passendes zertifiziertes Managementsystem verwendet werden. Wenn kein entsprechendes Zertifikat vorhanden ist, können die vorgesehenen Fragen beantwortet werden."
  },
  {
    question: "Können Sie IntegrityNext für uns ausfüllen?",
    answer:
      "Wir können einen großen Teil der operativen Vorbereitung übernehmen - beispielsweise Informationen strukturieren, vorhandene Zertifikate und Nachweise zuordnen und Antwortgrundlagen vorbereiten. Die Angaben müssen jedoch die tatsächliche Situation Ihres Unternehmens widerspiegeln und von den zuständigen Personen geprüft und bestätigt werden."
  },
  {
    question: "Können Sie direkt auf unser IntegrityNext-Konto zugreifen?",
    answer:
      "Die konkrete Zusammenarbeit stimmen wir je nach Anfrage ab. Zugangsdaten sollten grundsätzlich nicht ungesichert weitergegeben werden. Für die inhaltliche Vorbereitung können häufig bereits die angeforderten Themen, Screenshots und relevanten Unternehmensunterlagen ausreichen."
  },
  {
    question: "Was bedeutet \"Nachbesserungsbedarf\"?",
    answer:
      "IntegrityNext verwendet diesen Begriff, wenn bei der Validierung einer Selbstauskunft Unklarheiten oder Widersprüche festgestellt wurden und zu einem bestimmten Thema eine Überarbeitung oder Ergänzung erforderlich ist."
  },
  {
    question: "Können Sie unseren IntegrityNext-Status auf Grün bringen?",
    answer:
      "Wir können helfen, Antworten vollständiger vorzubereiten, vorhandene Nachweise sinnvoll zuzuordnen und tatsächliche Lücken sichtbar zu machen. Einen bestimmten Status oder ein bestimmtes Bewertungsergebnis können wir jedoch nicht garantieren."
  },
  {
    question: "Können bereits beantwortete Informationen für weitere Kunden verwendet werden?",
    answer:
      "Ein bestehendes IntegrityNext-Profil kann grundsätzlich mit weiteren anfragenden Unternehmen geteilt werden. Welche zusätzlichen oder kundenspezifischen Anforderungen entstehen, hängt jedoch vom jeweiligen Kunden ab."
  },
  {
    question: "Wie lange dauert die Unterstützung?",
    answer:
      "Das hängt davon ab, welche Assessments angefordert wurden, wie viele Informationen bereits vorhanden sind und wie viele interne Abstimmungen notwendig sind. Nach Sichtung der Ausgangslage können wir den Aufwand und einen realistischen Zeitrahmen einschätzen."
  }
];

export function Faq() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Häufige Fragen zur IntegrityNext-Unterstützung
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-3">
          {faqs.map((faq, index) => (
            <Reveal delay={index * 0.03} key={faq.question}>
              <details className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] px-6 py-5 shadow-[0_10px_30px_rgba(21,21,21,0.04)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ink marker:content-none">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl leading-none text-orange transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-muted">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
