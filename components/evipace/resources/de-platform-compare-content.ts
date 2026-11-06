import { primarySources } from "@/lib/seo/primary-sources";
import type { EnglishResourceArticleContent } from "./EnglishResourceArticle";

/** German edition of the EcoVadis vs IntegrityNext guide (see english-batch3-content.ts for scope notes). */
export const ecovadisVsIntegritynextContentDe: EnglishResourceArticleContent = {
  eyebrow: "EcoVadis und IntegrityNext",
  title: "EcoVadis oder IntegrityNext: Was ist der Unterschied für Lieferanten?",
  deck:
    "Beide beginnen mit einer Kundenanfrage, verlangen aber Unterschiedliches. Ein nüchterner Vergleich und wie Sie sich einmal für beide vorbereiten.",
  methodNote:
    "Kundenanfrage - Plattform - Fragen - Nachweise - Lücken - Ihre Einreichung.",
  quickAnswerTitle: "Gleicher Kunde, andere Plattform, größtenteils dieselben Dokumente.",
  summary: [
    "EcoVadis ist ein Anbieter von Nachhaltigkeitsbewertungen: Ihr Unternehmen beantwortet online einen Fragebogen und lädt Dokumente hoch, die die Antworten belegen. IntegrityNext ist eine Plattform für Nachhaltigkeit und Compliance in der Lieferkette, über die Kunden Lieferanteninformationen mit Firmenprofil und Assessments einholen und überwachen.",
    "Welche Plattform gilt, entscheidet Ihr Kunde. Was Sie vorbereiten, ist weitgehend gleich: Unternehmensdaten, Richtlinien, Zertifikate und Aufzeichnungen, jeweils der Antwort zugeordnet, die sie belegen."
  ],
  quickChecks: [
    {
      title: "Einladung lesen.",
      body: "Notieren Sie Plattform, Kunde und eine genannte Frist."
    },
    {
      title: "Anforderungen auflisten.",
      body: "Fragen, Zertifikate und Dokumente, die die Plattform verlangt."
    },
    {
      title: "Dokumente zuordnen.",
      body: "Ordnen Sie jeder Antwort ein aktuelles Dokument zu und benennen Sie, was fehlt."
    },
    {
      title: "Selbst einreichen.",
      body: "Konto und Einreichung bleiben bei beiden Plattformen bei Ihrem Unternehmen."
    }
  ],
  nav: [
    { number: "01", label: "Im Überblick", href: "#ueberblick" },
    { number: "02", label: "Gegenüberstellung", href: "#gegenueberstellung" },
    { number: "03", label: "Überschneidungen", href: "#ueberschneidungen" },
    { number: "04", label: "Einmal vorbereiten", href: "#einmal-vorbereiten" },
    { number: "05", label: "Was Evipace tut", href: "#evipace" }
  ],
  sections: [
    {
      id: "ueberblick",
      number: "01",
      title: "Was die beiden Plattformen sind",
      paragraphs: [
        "EcoVadis versteht sich als Anbieter von Nachhaltigkeitsbewertungen. Ein Unternehmen beantwortet online einen Fragebogen zu Umwelt, Arbeits- und Menschenrechten, Ethik und nachhaltiger Beschaffung und lädt Dokumente hoch, die seine Antworten belegen.",
        "IntegrityNext ist eine Plattform, mit der Kunden Nachhaltigkeit und Compliance ihrer Lieferanten steuern. Ein Lieferant wird eingeladen, pflegt ein Firmenprofil, beantwortet Assessments und wird gegebenenfalls nach Zertifikaten und weiteren Nachweisen gefragt."
      ],
      sources: [
        primarySources.ecovadisSupportingDocuments,
        primarySources.integrityNextCompletingAssessment
      ]
    },
    {
      id: "gegenueberstellung",
      number: "02",
      title: "Gegenüberstellung",
      paragraphs: [
        "Die Tabelle zeigt, was ein Lieferant auf der jeweiligen Plattform typischerweise tut. Bewertungsmethoden, Bewertungsstufen und Bearbeitungszeiten legen die Plattformen fest und ändern sie, prüfen Sie dazu die aktuellen Hilfeseiten."
      ],
      matrix: {
        caption: "EcoVadis und IntegrityNext im Vergleich für Lieferanten",
        columns: ["", "EcoVadis", "IntegrityNext"],
        rows: [
          [
            "Wer startet es",
            "Meist ein Kunde, der Sie um Teilnahme bittet.",
            "Ein Kunde, der Sie in sein Lieferantenprogramm einlädt."
          ],
          [
            "Was Sie ausfüllen",
            "Einen auf das Unternehmen zugeschnittenen Online-Fragebogen.",
            "Ein Firmenprofil und Assessments."
          ],
          [
            "Nachweise",
            "Hochgeladene Dokumente zu den Antworten; ihre Anzahl ist begrenzt.",
            "Zertifikate und weitere Nachweise, die die Plattform prüfen kann."
          ],
          [
            "Aktualisierung",
            "Eine spätere Bewertung kann angefordert werden.",
            "Ein Assessment kann aktualisiert und zur Prüfung zurückgesendet werden."
          ],
          [
            "Wem das Konto gehört",
            "Ihrem Unternehmen.",
            "Ihrem Unternehmen."
          ]
        ]
      },
      sources: [
        primarySources.ecovadisDocumentLimit,
        primarySources.integrityNextUpdatedAssessments
      ]
    },
    {
      id: "ueberschneidungen",
      number: "03",
      title: "Was sich überschneidet",
      paragraphs: [
        "Beide Plattformen greifen auf dieselben Grundtatsachen über das Unternehmen zurück."
      ],
      bullets: [
        "Unternehmensprofil: Rechtseinheit, Standorte, Tätigkeiten und Mitarbeitende.",
        "Richtlinien und Verhaltenskodizes, die Ihr Unternehmen tatsächlich eingeführt hat.",
        "Zertifikate und ihre Gültigkeit.",
        "Aufzeichnungen hinter Umwelt- und Sozialantworten, etwa Energieverbrauch oder Schulungen."
      ],
      principle: {
        label: "Faustregel",
        text: "Pflegen Sie einen Satz aktueller Dokumente und beantworten Sie jede Plattform daraus, statt für jeden Kunden neu anzufangen."
      }
    },
    {
      id: "einmal-vorbereiten",
      number: "04",
      title: "Einmal für beide vorbereiten",
      paragraphs: [
        "Beginnen Sie bei den Dokumenten, nicht bei der Plattform. Sammeln Sie, was vorhanden ist, prüfen Sie die Aktualität und notieren Sie, welche Antwort jedes Dokument belegt. Eine fehlende Richtlinie oder ein fehlendes Zertifikat bleibt eine Lücke in der Antwort und wird nie als vorhanden dargestellt.",
        "Beantworten Sie dann die Fragen der Plattform aus diesem einen Satz und vermerken Sie, wo eine Plattform mehr verlangt als die andere."
      ],
      links: [
        {
          label: "EcoVadis-Dokumente und Nachweise",
          href: "/de/ressourcen/ecovadis-dokumente-nachweise"
        },
        {
          label: "IntegrityNext-Einladung für Lieferanten",
          href: "/de/ressourcen/integritynext-einladung-lieferanten"
        },
        {
          label: "ESG-Daten einmal sammeln und mehrfach nutzen",
          href: "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"
        }
      ]
    },
    {
      id: "evipace",
      number: "05",
      title: "Was Evipace tut und was nicht",
      paragraphs: [
        "Evipace bereitet für beide Plattformen die Antworten und Nachweise vor und zeigt Lücken. Eine Person bei Evipace prüft das Ergebnis. Ihr Unternehmen behält sein Konto und reicht die Bewertung selbst ein.",
        "Evipace ist ein unabhängiger Dienstleister und nicht mit EcoVadis oder IntegrityNext verbunden. Wir versprechen weder einen Score noch einen Status oder die Akzeptanz durch Ihren Kunden."
      ],
      links: [
        { label: "EcoVadis-Unterstützung", href: "/de/ecovadis-unterstuetzung" },
        { label: "IntegrityNext-Unterstützung", href: "/de/integritynext-unterstuetzung" }
      ]
    }
  ],
  cta: {
    eyebrow: "EcoVadis und IntegrityNext",
    title: "Zu einer der beiden Plattformen eingeladen?",
    body:
      "Leiten Sie uns die Einladung weiter. Wir ordnen zu, was verlangt wird, gleichen es mit Ihren vorhandenen Dokumenten ab und sagen Ihnen, was fehlt.",
    primaryLabel: "ESG-Anfrage senden",
    primaryHref: "/de/send-request",
    secondaryLabel: "EcoVadis-Unterstützung",
    secondaryHref: "/de/ecovadis-unterstuetzung"
  },
  faq: [
    {
      question: "Ist EcoVadis dasselbe wie IntegrityNext?",
      answer:
        "Nein. EcoVadis ist ein Anbieter von Nachhaltigkeitsbewertungen mit eigenem Fragebogen. IntegrityNext ist eine Plattform, über die Kunden Lieferanteninformationen mit Profilen und Assessments einholen und überwachen. Ein Kunde kann eine oder beide nutzen."
    },
    {
      question: "Kann ich meine EcoVadis-Dokumente für IntegrityNext wiederverwenden?",
      answer:
        "Oft gelten dieselben Unterlagen, etwa Richtlinien, Zertifikate und Aufzeichnungen. Jede Plattform stellt eigene Fragen, prüfen Sie daher, ob jedes Dokument aktuell ist und die gestellte Frage beantwortet."
    },
    {
      question: "Welche Plattform muss ich wählen?",
      answer:
        "In der Regel wählen Sie nicht. Ihr Kunde entscheidet, welche Plattform er nutzt, und sendet die Einladung oder Anfrage."
    },
    {
      question: "Kann Evipace einen Score oder Status garantieren?",
      answer:
        "Nein. Evipace bereitet Antworten und Nachweise vor und zeigt die Lücken. Das Ergebnis hängt von der Bewertung der Plattform und der tatsächlichen Praxis Ihres Unternehmens ab."
    }
  ],
  sources: [
    primarySources.ecovadisSupportingDocuments,
    primarySources.ecovadisDocumentLimit,
    primarySources.integrityNextCompletingAssessment,
    primarySources.integrityNextUpdatedAssessments
  ]
};
