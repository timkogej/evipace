import { getServiceBuyerQuestions } from "@/lib/seo/service-buyer-questions";
import { Faq as FaqBlock } from "../service-landing/Blocks";

const faqs = [
  {
    question: "Was ist EcoVadis?",
    answer:
      "EcoVadis ist ein unabhängiger Anbieter von Nachhaltigkeitsratings für Unternehmen. Unternehmen beantworten online einen Fragebogen zu Umwelt, Arbeits- und Menschenrechten, Ethik und nachhaltiger Beschaffung und laden Dokumente hoch, die ihre Antworten belegen. Große Kunden bitten ihre Lieferanten häufig um ein solches Assessment. Evipace ist nicht mit EcoVadis verbunden; die Bewertung erfolgt allein durch EcoVadis."
  },
  ...getServiceBuyerQuestions("de", "ecovadisUnterstuetzung"),
  {
    question: "Ist der EcoVadis-Fragebogen für jedes Unternehmen gleich?",
    answer:
      "Nein. Der konkrete Fragebogen hängt vom Unternehmensprofil ab. Deshalb sollte die Vorbereitung immer auf Basis des tatsächlich zugewiesenen Assessments erfolgen."
  },
  {
    question: "Welche Dokumente brauche ich für EcoVadis?",
    answer:
      "Das hängt von den konkreten Fragen ab. Relevant können beispielsweise Richtlinien, Zertifikate, Kennzahlen, Berichte, Verfahrensbeschreibungen oder andere formalisierte Unternehmensdokumente sein. Entscheidend ist, dass der jeweilige Nachweis zur entsprechenden Aussage passt."
  },
  {
    question: "Können Sie den EcoVadis-Fragebogen für uns ausfüllen?",
    answer:
      "Wir können einen großen Teil der operativen Vorbereitung von Antworten, Daten und Nachweisen übernehmen. Aussagen, die eine interne Bestätigung, Freigabe oder Entscheidung Ihres Unternehmens erfordern, müssen von Ihnen geprüft und bestätigt werden."
  },
  {
    question: "Erstellen Sie fehlende Richtlinien?",
    answer:
      "Nein, nicht als Teil dieser Leistung. Fehlt eine relevante Richtlinie, halten wir das als Lücke fest. Ob Ihr Unternehmen ein Dokument erstellt, entscheidet es selbst. Wir erstellen keine fingierten oder rückdatierten Dokumente, die nur als Nachweis in einer Bewertung dienen sollen."
  },
  {
    question: "Können Sie unseren EcoVadis-Score verbessern?",
    answer:
      "Wir können dazu beitragen, dass vorhandene Informationen und Nachweise strukturierter und nachvollziehbarer vorbereitet werden. Eine bestimmte Punktzahl, Medaille oder Verbesserung des EcoVadis-Scores können wir jedoch nicht garantieren."
  },
  {
    question: "Sind Sie offizieller EcoVadis-Partner?",
    answer:
      "Nein. Evipace ist ein unabhängiger Dienstleister und nicht mit EcoVadis verbunden oder von EcoVadis akkreditiert."
  },
  {
    question: "Können Sie auch bei einer erneuten Bewertung helfen?",
    answer:
      "Ja. Wenn bereits eine Scorecard vorhanden ist, kann diese als Ausgangspunkt genutzt werden, um bestehende Dokumentation, offene Punkte und reale Verbesserungen seit der letzten Bewertung strukturiert zu prüfen."
  },
  {
    question: "Muss unser Unternehmen bereits ein vollständiges ESG-System haben?",
    answer:
      "Nein. Viele relevante Informationen, Richtlinien und Nachweise existieren bereits in verschiedenen Bereichen des Unternehmens. Wir starten mit dem tatsächlichen Assessment und prüfen, was bereits vorhanden ist und was noch fehlt."
  },
  {
    question: "Wie lange dauert die Vorbereitung?",
    answer:
      "Das hängt vom Umfang des Fragebogens, der vorhandenen Dokumentation und der Anzahl offener Punkte ab. Nach Sichtung des Assessments und der vorhandenen Unterlagen kann der Aufwand und ein realistischer Zeitrahmen eingeschätzt werden."
  }
];

export function Faq() {
  return (
    <FaqBlock
      eyebrow="Häufige Fragen"
      items={faqs}
      title="Häufige Fragen zur EcoVadis-Unterstützung"
    />
  );
}
