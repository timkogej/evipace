import { RevealOnView } from "../home/RevealOnView";
import h from "../HomeLandingPage.module.css";
import { SourceNote } from "../trust/SourceNote";
import { primarySources, type PrimarySource } from "@/lib/seo/primary-sources";
import sp from "./ServicePage.module.css";

export type DirectAnswerService =
  | "questionnaire"
  | "ecovadis"
  | "integritynext"
  | "scope12"
  | "vsme";

type Answer = { question: string; answer: string[] };
type Block = { items: Answer[]; sources?: PrimarySource[] };

/**
 * German "Kurz und klar" block: two self-contained answers placed directly
 * under the hero, mirroring the English "The short version". Each answer
 * leads with the fact, so it can be read and quoted without the rest of
 * the page.
 */
const blocks: Record<DirectAnswerService, Block> = {
  questionnaire: {
    items: [
      {
        question: "Was ist ein ESG-Fragebogen für Lieferanten?",
        answer: [
          "Ein ESG-Fragebogen für Lieferanten ist eine Anfrage, mit der ein Kunde Angaben zu Umwelt, Sozialem und Unternehmensführung verlangt, etwa zu Emissionen, Energie, Richtlinien, Zertifikaten und Arbeitsbedingungen.",
          "Er kommt meist als Excel-Datei, PDF oder Online-Formular und hat eine Frist."
        ]
      },
      {
        question: "Was übernimmt Evipace dabei?",
        answer: [
          "Evipace liest die Anfrage, ordnet die Fragen Ihren vorhandenen Daten und Nachweisen zu, bereitet die Antwort vor und listet offene Punkte auf.",
          "Sie senden die Antwort selbst an Ihren Kunden. Dass der Kunde sie akzeptiert, kann Evipace nicht garantieren."
        ]
      }
    ]
  },
  ecovadis: {
    items: [
      {
        question: "Was ist EcoVadis?",
        answer: [
          "EcoVadis ist eine Plattform, auf der Unternehmen ihre Nachhaltigkeitsleistung bewerten lassen, meist weil ein Kunde es verlangt.",
          "Das Unternehmen beantwortet einen Fragebogen und lädt Nachweise hoch."
        ]
      },
      {
        question: "Was macht Evipace bei einer EcoVadis-Anfrage?",
        answer: [
          "Evipace bereitet Antworten und Nachweise vor und zeigt Lücken offen. Ihr Unternehmen behält sein Konto und reicht die Bewertung selbst ein.",
          "Evipace ist unabhängig und nicht mit EcoVadis verbunden. Einen Score oder eine Medaille versprechen wir nicht."
        ]
      }
    ],
    sources: [primarySources.ecovadisSupportingDocuments]
  },
  integritynext: {
    items: [
      {
        question: "Was ist IntegrityNext?",
        answer: [
          "IntegrityNext ist eine Plattform, über die Kunden ihre Lieferanten zu Nachhaltigkeit und Compliance befragen.",
          "Lieferanten werden per Einladung gebeten, ein Profil auszufüllen, Fragen zu beantworten und Zertifikate oder Nachweise bereitzustellen."
        ]
      },
      {
        question: "Was macht Evipace bei einer IntegrityNext-Einladung?",
        answer: [
          "Evipace ordnet Ihre Zertifikate und Nachweise, bereitet die Antworten vor und zeigt Lücken. Ihr Unternehmen behält sein Konto.",
          "Evipace ist unabhängig und nicht mit IntegrityNext verbunden. Einen Status oder die Akzeptanz durch Ihren Kunden versprechen wir nicht."
        ]
      }
    ],
    sources: [primarySources.integrityNextCompletingAssessment]
  },
  scope12: {
    items: [
      {
        question: "Was sind Scope 1 und Scope 2?",
        answer: [
          "Scope 1 umfasst direkte Treibhausgasemissionen aus Quellen, die ein Unternehmen besitzt oder kontrolliert. Scope 2 umfasst indirekte Emissionen aus eingekaufter Elektrizität, Wärme, Dampf oder Kälte.",
          "In einem Produktionsbetrieb bedeutet Scope 1 meist Erdgas und andere Brennstoffe vor Ort, Kraftstoff in eigenen Fahrzeugen und Kältemittelverluste. Scope 2 bedeutet meist Strom und Fernwärme."
        ]
      },
      {
        question: "Welche Daten braucht man für die Berechnung?",
        answer: [
          "Verbrauchsdaten für einen festgelegten Berichtszeitraum und dazu passende Emissionsfaktoren.",
          "Praktisch sind das Zählerstände oder Rechnungen für Strom und Wärme, Kraftstoff- und Fahrzeugnachweise, Nachfüllprotokolle für Kältemittel und die Standorte, für die die Werte gelten. Muss ein Wert geschätzt werden, halten wir die Annahme neben der Zahl fest."
        ]
      }
    ],
    sources: [primarySources.ghgCorporateStandard, primarySources.ghgScope2Guidance]
  },
  vsme: {
    items: [
      {
        question: "Was ist VSME?",
        answer: [
          "VSME ist ein freiwilliger Standard der EFRAG für die Nachhaltigkeitsberichterstattung kleiner und mittlerer Unternehmen.",
          "Er legt fest, welche Angaben ein KMU zu Umwelt, Sozialem und Unternehmensführung machen kann."
        ]
      },
      {
        question: "Was macht Evipace beim VSME-Bericht?",
        answer: [
          "Evipace bereitet den Bericht aus Ihren Unternehmensdaten und vorhandenen Unterlagen vor und hält Lücken und Annahmen sichtbar.",
          "Das ist keine Prüfung und keine Zertifizierung. Ein VSME-Bericht ist außerdem nicht dasselbe wie ein ESG-Fragebogen Ihres Kunden."
        ]
      }
    ],
    sources: [primarySources.efragVoluntaryStandard]
  }
};

export function DirectAnswers({ service }: { service: DirectAnswerService }) {
  const { items, sources } = blocks[service];

  return (
    <section aria-labelledby="direct-answers-title" className={h.section} id="kurz-und-klar">
      <RevealOnView className={h.shell}>
        <header className={h.sectionHead}>
          <p className={h.eyebrow}>Kurz und klar</p>
          <h2 className={h.srOnly} id="direct-answers-title">
            Kurz und klar
          </h2>
        </header>
        <div className={sp.grid2}>
          {items.map((item) => (
            <article className={`${sp.card} ${sp.answerCard}`} key={item.question}>
              <h3>{item.question}</h3>
              {item.answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
        {sources ? (
          <div className={sp.sources}>
            <SourceNote locale="de" sources={sources} />
          </div>
        ) : null}
      </RevealOnView>
    </section>
  );
}
