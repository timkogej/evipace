import { FileText } from "lucide-react";
import { Reveal } from "../Reveal";

const statusCards = [
  {
    title: "Vom VSME zum Voluntary Standard",
    body: "Der Begriff VSME hat sich im Markt als Bezeichnung für den freiwilligen Nachhaltigkeitsstandard für kleinere Unternehmen etabliert. Der 2025 von der Europäischen Kommission empfohlene VSME bildet die wesentliche Grundlage des neuen europäischen Voluntary Standard."
  },
  {
    title: "Was hat sich 2026 geändert?",
    body: "Die Europäische Kommission hat am 3. Juli 2026 einen neuen Voluntary Standard als delegierten Rechtsakt angenommen. Er richtet sich an Unternehmen außerhalb der verpflichtenden Nachhaltigkeitsberichterstattung, die im vorausgegangenen Geschäftsjahr durchschnittlich nicht mehr als 1.000 Beschäftigte hatten. Die Grundstruktur mit Basic und Comprehensive Module wurde beibehalten."
  },
  {
    title: "Ist der neue Standard bereits in Kraft?",
    body: "Zum aktuellen Stand noch nicht. Nach der Annahme durch die Europäische Kommission muss der delegierte Rechtsakt zunächst das vorgesehene europäische Prüfverfahren durchlaufen und anschließend im Amtsblatt der Europäischen Union veröffentlicht werden. Erst danach wird er rechtlich wirksam."
  }
];

export function RegulatoryStatus() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Regulatorischer Stand</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            VSME, Voluntary Standard und 2026: Was gilt aktuell?
          </h2>
          <p className="body-lg mt-7">
            Der europäische Rahmen für freiwillige
            Nachhaltigkeitsberichterstattung wurde 2026 weiterentwickelt.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {statusCards.map((card, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.06}
              key={card.title}
            >
              <FileText aria-hidden="true" className="h-5 w-5 text-orange" />
              <h3 className="mt-5 text-lg font-bold text-ink">{card.title}</h3>
              <p className="mt-3 leading-7 text-muted">{card.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.12}>
          Evipace richtet neue Projekte am jeweils aktuellen europäischen Rahmen
          aus und berücksichtigt den Übergang vom bisherigen VSME zum neuen
          Voluntary Standard.
        </Reveal>
      </div>
    </section>
  );
}
