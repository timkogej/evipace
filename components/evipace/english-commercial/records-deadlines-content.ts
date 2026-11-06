import {
  CalendarClock,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Factory,
  FolderOpen,
  Search,
  ShieldCheck,
  Users
} from "lucide-react";
import type { CommercialServicePageContent } from "./content";

/**
 * Records and deadlines: the service that keeps a plant's
 * documents current. It describes what we keep track of and how the
 * work is shared (system prepares, a person at Evipace reviews, the client
 * approves). It deliberately makes no legal-compliance promise: the company
 * stays responsible for its obligations.
 */
export const recordsDeadlinesContent: CommercialServicePageContent = {
  streamlinedService: true,
  eyebrow: "Records and deadlines",
  title: "Your records, kept current and on time.",
  intro: [
    "Permits, certificates, measurement reports and evidence each have a date. We keep the register, watch the deadlines, prepare what is due and ask you to approve it. You stop chasing paperwork, and nothing is submitted without your approval."
  ],
  primaryCta: "Hand over your records",
  secondaryCta: {
    label: "See how it works",
    href: "#process"
  },
  qualifier:
    "Start with what you have today, in folders, spreadsheets or email. It does not need to be organised first.",
  heroVisual: {
    label: "Record register",
    items: ["Record", "Deadline", "Preparation", "Your approval"]
  },
  fit: {
    eyebrow: "When it fits",
    title: "Typical situations we take over",
    intro:
      "The register depends on your plant and your obligations. These are the situations we hear most often.",
    items: [
      {
        title: "Dates live in someone's head",
        quote: "Only one colleague knows when the certificate expires.",
        body: "We put every record and its date into one register, so the knowledge no longer depends on one person.",
        icon: Users
      },
      {
        title: "Evidence is scattered",
        quote: "The invoice is somewhere in an old email.",
        body: "We collect the supporting documents, link them to the record they prove and keep them in one place.",
        icon: FolderOpen
      },
      {
        title: "A customer or auditor asks",
        quote: "We need the certificate and the latest report by Friday.",
        body: "With the register in place, the answer is a lookup instead of a search through folders.",
        icon: Search
      }
    ]
  },
  service: {
    eyebrow: "What we take over",
    title: "The upkeep your team does not have time for",
    intro:
      "The system prepares and reminds, a person at Evipace reviews, and you approve. Your company remains responsible for its obligations; we make the paperwork reliable.",
    items: [
      {
        title: "A register of records",
        body: "Permits, certificates, policies, measurement reports and evidence, each with an owner, a period and a status.",
        icon: ClipboardCheck
      },
      {
        title: "Deadline tracking",
        body: "Expiry and renewal dates, and recurring reporting dates, watched for you with reminders ahead of time.",
        icon: CalendarClock
      },
      {
        title: "Preparation of what is due",
        body: "Renewal documents, updated policies and periodic reports prepared from your data for your review.",
        icon: FileText
      },
      {
        title: "Evidence kept with the record",
        body: "Invoices, reports and certificates linked to the record they support, with their validity checked.",
        icon: FileCheck2
      },
      {
        title: "Review by a person",
        body: "A person at Evipace checks each prepared document before it reaches you.",
        icon: ShieldCheck
      },
      {
        title: "Ready when asked",
        body: "Customers, banks and auditors get a current, organised answer from the same register.",
        icon: Factory
      }
    ]
  },
  inputs: {
    title: "What you can send us to start",
    body: "Send what you already have. We list what is missing and ask only for that.",
    items: [
      "Permits and certificates, as scans or files",
      "Management system documents, for example ISO 14001 or ISO 45001",
      "Measurement and inspection reports",
      "Invoices for energy and water",
      "Existing spreadsheets or calendars with dates",
      "Names of the people who own each topic"
    ]
  },
  process: {
    title: "From a pile of files to a register you can rely on",
    intro: "You hand over once. After that the register keeps itself current.",
    steps: [
      {
        title: "You hand it over",
        body: "Send the files and lists you have, by email or through the form. No new brief is needed."
      },
      {
        title: "We build the register",
        body: "Our system reads your documents, creates the records and dates, and lists what is missing."
      },
      {
        title: "A person reviews",
        body: "A person at Evipace checks the register and prepared documents and asks you only for what is unclear."
      },
      {
        title: "You approve and we keep watch",
        body: "You approve in your Evipace portal. From then on we remind you and prepare what is due."
      }
    ]
  },
  deliverables: {
    title: "What you get",
    qualifier: "Delivered through your Evipace portal, ready to share with customers or auditors.",
    items: [
      "A register of your records",
      "A calendar of expiry, renewal and reporting dates",
      "Reminders before each date, to the right person",
      "Prepared renewal documents and periodic reports for your approval",
      "Evidence stored with the record it supports"
    ]
  },
  trust: {
    eyebrow: "How we work",
    title: "A service with people in it",
    body: [
      "Preparation uses automation, and a person at Evipace reviews the result. You approve, and nothing is submitted or sent before that."
    ],
    items: [
      {
        label: "Your responsibility stays yours",
        body: "We do not take over your legal obligations or give legal advice. We keep the paperwork complete and on time."
      },
      {
        label: "Your files stay private",
        body: "Files you send are stored privately and used only to process your work."
      }
    ]
  },
  resources: {
    title: "Guides that go with this",
    body: "Short practical guides on evidence and responsibilities.",
    links: [
      {
        title: "ESG evidence for suppliers",
        body: "Which documents customers usually ask for and how to keep them ready.",
        href: "/en/resources/esg-evidence-for-suppliers"
      },
      {
        title: "ESG data owners",
        body: "Who in a company usually holds which information.",
        href: "/en/resources/esg-data-owners"
      },
      {
        title: "Reusable ESG data",
        body: "Collect once and reuse for later requests.",
        href: "/en/resources/reusable-esg-data"
      }
    ]
  },
  finalCta: {
    title: "Have records waiting?",
    body: "Send what you have today, and we will tell you what we can take over.",
    primaryLabel: "Use the request form",
    secondaryLabel: "See the ways to work with us",
    secondaryHref: "/en/offers"
  },
  relatedServices: {
    title: "Related services",
    body: "Records and calculations often belong together.",
    links: [
      {
        title: "Scope 1 & 2 calculation",
        body: "Turn your energy and fuel records into a documented emissions calculation.",
        href: "/en/scope-1-2-calculation"
      },
      {
        title: "Customer ESG requests",
        body: "Answer customer questionnaires from the same records.",
        href: "/en/esg-customer-requests"
      }
    ]
  },
  faq: [
    {
      question: "Which records can you keep?",
      answer:
        "Permits, certificates, policies, management system documents, measurement and inspection reports, and the evidence behind them. We agree the list with you at the start."
    },
    {
      question: "Do you tell us which obligations apply to us?",
      answer:
        "No. We do not give legal advice. You or your advisers tell us which records and dates matter, and we keep them organised and on time."
    },
    {
      question: "Do you carry out measurements and inspections?",
      answer:
        "No. We do not carry out measurements or inspections. Where an accredited one is needed, a provider of your choice does it, and we bring the results into your register."
    },
    {
      question: "Does anything get submitted without our approval?",
      answer: "No. We prepare, a person at Evipace reviews, and you approve and submit."
    },
    {
      question: "How do you decide scope and price?",
      answer: "After reviewing what you send, we confirm scope and price before we start."
    }
  ]
};

export const recordsDeadlinesContentDe: CommercialServicePageContent = {
  streamlinedService: true,
  eyebrow: "Nachweise und Fristen",
  title: "Ihre Nachweise, aktuell und pünktlich.",
  intro: [
    "Genehmigungen, Zertifikate, Messberichte und Nachweise haben jeweils ein Datum. Wir führen das Register, behalten die Fristen im Blick, bereiten vor, was ansteht, und bitten Sie um Freigabe. Sie müssen dem Papierkram nicht mehr hinterherlaufen, und ohne Ihre Freigabe wird nichts eingereicht."
  ],
  primaryCta: "Nachweise übergeben",
  secondaryCta: {
    label: "So funktioniert es",
    href: "#process"
  },
  qualifier:
    "Beginnen Sie mit dem, was Sie heute haben, in Ordnern, Tabellen oder E-Mails. Es muss nicht vorher geordnet sein.",
  heroVisual: {
    label: "Nachweisregister",
    items: ["Nachweis", "Frist", "Vorbereitung", "Ihre Freigabe"]
  },
  fit: {
    eyebrow: "Wann es passt",
    title: "Typische Situationen, die wir übernehmen",
    intro:
      "Das Register hängt von Ihrem Werk und Ihren Pflichten ab. Diese Situationen hören wir am häufigsten.",
    items: [
      {
        title: "Termine stehen nur im Kopf",
        quote: "Nur eine Kollegin weiß, wann das Zertifikat abläuft.",
        body: "Wir bringen jeden Nachweis und sein Datum in ein Register, damit das Wissen nicht an einer Person hängt.",
        icon: Users
      },
      {
        title: "Nachweise sind verstreut",
        quote: "Die Rechnung liegt irgendwo in einer alten E-Mail.",
        body: "Wir sammeln die Belege, ordnen sie dem Nachweis zu, den sie belegen, und halten sie an einem Ort.",
        icon: FolderOpen
      },
      {
        title: "Ein Kunde oder Auditor fragt",
        quote: "Wir brauchen das Zertifikat und den neuesten Bericht bis Freitag.",
        body: "Mit dem Register ist die Antwort ein Nachschlagen statt einer Suche durch Ordner.",
        icon: Search
      }
    ]
  },
  service: {
    eyebrow: "Was wir übernehmen",
    title: "Die Pflege, für die Ihr Team keine Zeit hat",
    intro:
      "Das System bereitet vor und erinnert, eine Person bei Evipace prüft, und Sie geben frei. Ihr Unternehmen bleibt für seine Pflichten verantwortlich; wir machen den Papierkram verlässlich.",
    items: [
      {
        title: "Ein Register der Nachweise",
        body: "Genehmigungen, Zertifikate, Richtlinien, Messberichte und Belege, jeweils mit Verantwortlichem, Zeitraum und Status.",
        icon: ClipboardCheck
      },
      {
        title: "Fristenüberwachung",
        body: "Ablauf-, Verlängerungs- und wiederkehrende Berichtstermine, für Sie überwacht, mit Erinnerungen im Voraus.",
        icon: CalendarClock
      },
      {
        title: "Vorbereitung dessen, was ansteht",
        body: "Verlängerungsunterlagen, aktualisierte Richtlinien und regelmäßige Berichte, aus Ihren Daten zur Prüfung vorbereitet.",
        icon: FileText
      },
      {
        title: "Belege beim Nachweis",
        body: "Rechnungen, Berichte und Zertifikate, dem jeweiligen Nachweis zugeordnet und auf Gültigkeit geprüft.",
        icon: FileCheck2
      },
      {
        title: "Prüfung durch eine Person",
        body: "Eine Person bei Evipace prüft jedes vorbereitete Dokument, bevor es Sie erreicht.",
        icon: ShieldCheck
      },
      {
        title: "Bereit, wenn gefragt wird",
        body: "Kunden, Banken und Auditoren erhalten aus demselben Register eine aktuelle, geordnete Antwort.",
        icon: Factory
      }
    ]
  },
  inputs: {
    title: "Was Sie uns zum Start senden können",
    body: "Senden Sie, was Sie bereits haben. Wir listen auf, was fehlt, und fragen nur danach.",
    items: [
      "Genehmigungen und Zertifikate als Scans oder Dateien",
      "Dokumente des Managementsystems, zum Beispiel ISO 14001 oder ISO 45001",
      "Mess- und Prüfberichte",
      "Rechnungen für Energie und Wasser",
      "Vorhandene Tabellen oder Kalender mit Terminen",
      "Namen der Personen, die jedes Thema verantworten"
    ]
  },
  process: {
    title: "Vom Dateienberg zum Register, auf das Sie sich verlassen können",
    intro: "Sie übergeben einmal. Danach hält sich das Register selbst aktuell.",
    steps: [
      {
        title: "Sie übergeben",
        body: "Senden Sie die vorhandenen Dateien und Listen per E-Mail oder über das Formular. Ein neues Briefing ist nicht nötig."
      },
      {
        title: "Wir bauen das Register",
        body: "Unser System liest Ihre Dokumente, legt Nachweise und Termine an und listet auf, was fehlt."
      },
      {
        title: "Eine Person prüft",
        body: "Eine Person bei Evipace prüft Register und vorbereitete Dokumente und fragt nur nach, was unklar ist."
      },
      {
        title: "Sie geben frei, wir behalten den Überblick",
        body: "Sie geben in Ihrem Evipace-Portal frei. Danach erinnern wir Sie und bereiten vor, was ansteht."
      }
    ]
  },
  deliverables: {
    title: "Was Sie erhalten",
    qualifier: "Bereitgestellt über Ihr Evipace-Portal, bereit zum Teilen mit Kunden oder Auditoren.",
    items: [
      "Ein Register Ihrer Nachweise",
      "Ein Kalender mit Ablauf-, Verlängerungs- und Berichtsterminen",
      "Erinnerungen vor jedem Termin an die richtige Person",
      "Vorbereitete Verlängerungsunterlagen und Berichte zu Ihrer Freigabe",
      "Belege, gespeichert beim jeweiligen Nachweis"
    ]
  },
  trust: {
    eyebrow: "So arbeiten wir",
    title: "Eine Dienstleistung mit Menschen",
    body: [
      "Die Vorbereitung nutzt Automatisierung, und eine Person bei Evipace prüft das Ergebnis. Sie geben frei, und vorher wird nichts eingereicht oder versendet."
    ],
    items: [
      {
        label: "Ihre Verantwortung bleibt bei Ihnen",
        body: "Wir übernehmen weder Ihre gesetzlichen Pflichten noch geben wir Rechtsberatung. Wir halten den Papierkram vollständig und pünktlich."
      },
      {
        label: "Ihre Dateien bleiben vertraulich",
        body: "Dateien, die Sie senden, werden vertraulich gespeichert und nur zur Bearbeitung Ihrer Aufgabe verwendet."
      }
    ]
  },
  resources: {
    title: "Passende Leitfäden",
    body: "Kurze praktische Leitfäden zu Nachweisen und Zuständigkeiten.",
    links: [
      {
        title: "ESG-Nachweise für Lieferanten",
        body: "Welche Dokumente Kunden üblicherweise verlangen und wie Sie sie bereithalten.",
        href: "/de/ressourcen/esg-nachweise-lieferanten"
      },
      {
        title: "Wer liefert welche ESG-Daten?",
        body: "Wer in einem Unternehmen üblicherweise welche Informationen hat.",
        href: "/de/ressourcen/esg-daten-verantwortliche-abteilungen"
      },
      {
        title: "ESG-Daten wiederverwenden",
        body: "Einmal sammeln und für spätere Anfragen wiederverwenden.",
        href: "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"
      }
    ]
  },
  finalCta: {
    title: "Warten Nachweise auf Sie?",
    body: "Senden Sie heute, was Sie haben, und wir sagen Ihnen, was wir übernehmen können.",
    primaryLabel: "Anfrageformular nutzen",
    secondaryLabel: "Wege der Zusammenarbeit ansehen",
    secondaryHref: "/de/angebot"
  },
  relatedServices: {
    title: "Verwandte Leistungen",
    body: "Nachweise und Berechnungen gehören oft zusammen.",
    links: [
      {
        title: "Scope-1- und Scope-2-Berechnung",
        body: "Aus Ihren Energie- und Kraftstoffnachweisen eine dokumentierte Emissionsberechnung machen.",
        href: "/de/scope-1-2-berechnung"
      },
      {
        title: "ESG-Kundenanfragen",
        body: "Kundenfragebögen aus denselben Nachweisen beantworten.",
        href: "/de/esg-kundenanfragen"
      }
    ]
  },
  faq: [
    {
      question: "Welche Nachweise können Sie führen?",
      answer:
        "Genehmigungen, Zertifikate, Richtlinien, Dokumente des Managementsystems, Mess- und Prüfberichte und die Belege dazu. Die Liste stimmen wir zu Beginn mit Ihnen ab."
    },
    {
      question: "Sagen Sie uns, welche Pflichten für uns gelten?",
      answer:
        "Nein. Wir geben keine Rechtsberatung. Sie oder Ihre Berater sagen uns, welche Nachweise und Termine wichtig sind, und wir halten sie geordnet und pünktlich."
    },
    {
      question: "Führen Sie Messungen und Prüfungen durch?",
      answer:
        "Nein. Wir führen keine Messungen oder Prüfungen durch. Wo eine akkreditierte nötig ist, übernimmt sie ein Anbieter Ihrer Wahl, und wir übernehmen die Ergebnisse in Ihr Register."
    },
    {
      question: "Wird ohne unsere Freigabe etwas eingereicht?",
      answer: "Nein. Wir bereiten vor, eine Person bei Evipace prüft, und Sie geben frei und reichen ein."
    },
    {
      question: "Wie legen Sie Umfang und Preis fest?",
      answer: "Nach der Prüfung dessen, was Sie senden, bestätigen wir Umfang und Preis, bevor wir beginnen."
    }
  ]
};
