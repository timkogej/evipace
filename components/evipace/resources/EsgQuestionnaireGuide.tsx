import type { ReactNode } from "react";
import {
  ArrowRight,
  Calculator,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Link2,
  Paperclip,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";

const EU_DELEGATED_ACT_URL =
  "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/corporate-sustainability-reporting-directive_en";
const EU_VALUE_CHAIN_QA_URL =
  "https://finance.ec.europa.eu/news/feedback-sustainability-reporting-standards-additional-explanatory-information-regarding-value-chain-2026-05-06_en";
const EFRAG_STANDARD_URL =
  "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard";
const ECOVADIS_DOCUMENTS_URL =
  "https://support.ecovadis.com/hc/en-us/articles/210460307-Understanding-supporting-documents";
const BMOE_QUESTIONNAIRE_URL =
  "https://bmoe.at/lieferanten-nachhaltigkeitsfragebogen/";

const quickSteps = [
  {
    title: "Fragebogen nicht sofort Feld für Feld beantworten.",
    body: "Prüfen Sie zuerst Umfang, Deadline, angefragte Gesellschaft beziehungsweise Standorte und benötigte Nachweise."
  },
  {
    title: "Fragen nach Themen sortieren.",
    body: "Zum Beispiel Energie und Emissionen, Mitarbeitende, Richtlinien, Zertifikate, Compliance und Lieferkette."
  },
  {
    title: "Verantwortliche Datenquellen im Unternehmen identifizieren.",
    body: "Viele Antworten liegen bereits bei Buchhaltung, HR, Qualitätsmanagement, Einkauf, Produktion oder Geschäftsführung."
  },
  {
    title: "Nachweise parallel zu den Antworten sammeln.",
    body: "Eine Antwort und der dazugehörige Beleg sollten nicht erst am Ende zusammengeführt werden."
  },
  {
    title: "Lücken sichtbar lassen.",
    body: "Fehlende Daten, Richtlinien oder Nachweise nicht durch plausible Annahmen ersetzen."
  },
  {
    title: "Die fertige Datenbasis aufbewahren.",
    body: "Ein großer Teil der Arbeit lässt sich bei der nächsten Kundenanfrage wiederverwenden."
  }
];

const questionnaireChecks = [
  "Wer stellt die Anfrage?",
  "Für welche Gesellschaft ist die Antwort gedacht?",
  "Betrifft sie das gesamte Unternehmen oder einen bestimmten Standort?",
  "Welcher Berichtszeitraum wird verlangt?",
  "Welche Deadline wurde gesetzt?",
  "Müssen Dokumente hochgeladen werden?",
  "Werden absolute Werte oder Kennzahlen verlangt?",
  "Gibt es Pflichtfelder?",
  "Sind bestimmte Standards oder Berechnungsmethoden genannt?",
  "Muss die Antwort in Excel, PDF oder einer Plattform abgegeben werden?"
];

const topicGroups = [
  {
    title: "Umwelt und Klima",
    icon: Calculator,
    items: [
      "Stromverbrauch",
      "Erdgas, Heizöl und Kraftstoffe",
      "erneuerbare Energie",
      "Scope 1, Scope 2 und gegebenenfalls Scope 3",
      "Wasser, Abfall und Recycling",
      "Umweltziele und Managementsysteme"
    ]
  },
  {
    title: "Mitarbeitende und Soziales",
    icon: UsersRound,
    items: [
      "Mitarbeiterzahl",
      "Arbeitssicherheit und Arbeitsunfälle",
      "Schulungen",
      "Gleichbehandlung und Menschenrechte",
      "Arbeitsbedingungen",
      "Diversity-Kennzahlen und HR-Richtlinien"
    ]
  },
  {
    title: "Governance und Compliance",
    icon: ShieldCheck,
    items: [
      "Code of Conduct",
      "Antikorruptionsrichtlinie",
      "Hinweisgebersystem",
      "Compliance-Prozesse",
      "Datenschutz und Verantwortlichkeiten",
      "Lieferantenanforderungen"
    ]
  },
  {
    title: "Zertifikate und Managementsysteme",
    icon: FileCheck2,
    items: [
      "ISO 14001",
      "ISO 45001",
      "ISO 50001",
      "ISO 9001",
      "weitere branchenspezifische Zertifikate"
    ]
  }
];

const evidenceExamples = [
  "Zertifikate",
  "Richtlinien",
  "Berichte",
  "Verbrauchsübersichten",
  "Berechnungen",
  "dokumentierte Prozesse",
  "andere relevante Unternehmensunterlagen"
];

const departmentSources = [
  {
    title: "Buchhaltung / Controlling",
    items: [
      "Strom- und Gasrechnungen",
      "Kraftstoffkosten",
      "Energieabrechnungen",
      "teilweise Abfall- oder Wasserkosten",
      "finanzielle Unternehmensinformationen"
    ]
  },
  {
    title: "HR",
    items: [
      "Mitarbeiterzahl und Beschäftigungsstruktur",
      "Schulungsdaten",
      "Arbeitssicherheitsdaten",
      "relevante HR-Prozesse",
      "bestehende Richtlinien"
    ]
  },
  {
    title: "Qualitäts- oder Umweltmanagement",
    items: [
      "ISO-Zertifikate",
      "Managementsysteme",
      "Prozess- und Auditunterlagen",
      "Umweltinformationen",
      "bestehende Policies"
    ]
  },
  {
    title: "Produktion / Operations",
    items: [
      "Energieverbrauch und Produktionsmengen",
      "Materialien und Maschinen",
      "Abfall",
      "Kältemittel",
      "Betriebsprozesse"
    ]
  },
  {
    title: "Einkauf",
    items: [
      "Lieferanteninformationen",
      "Supplier Code of Conduct",
      "Lieferantenbewertungen",
      "Beschaffungsrichtlinien",
      "Herkunfts- oder Materialinformationen"
    ]
  },
  {
    title: "Geschäftsführung",
    items: [
      "Verantwortlichkeiten",
      "Governance-Strukturen",
      "tatsächliche Unternehmenspraktiken",
      "Ziele",
      "formell verabschiedete Richtlinien"
    ]
  }
];

const statuses = [
  {
    status: "vorhanden",
    title: "Vorhanden",
    body: "Information und gegebenenfalls Nachweis existieren."
  },
  {
    status: "zu berechnen",
    title: "Zu berechnen",
    body: "Aktivitätsdaten existieren, aber die Kennzahl muss noch berechnet werden."
  },
  {
    status: "zu bestätigen",
    title: "Zu bestätigen",
    body: "Die Information muss durch eine verantwortliche Person bestätigt werden."
  },
  {
    status: "fehlt",
    title: "Fehlt",
    body: "Die angefragte Information oder Dokumentation existiert aktuell nicht."
  },
  {
    status: "unklar",
    title: "Unklar",
    body: "Die Frage oder ihr geforderter Umfang muss zuerst geklärt werden."
  }
];

const answerMapRows = [
  {
    question: "Stromverbrauch 2025",
    information: "kWh",
    source: "Stromrechnungen",
    owner: "Buchhaltung",
    evidence: "Rechnungen",
    status: "vorhanden"
  },
  {
    question: "Scope 1",
    information: "t CO₂e",
    source: "Brennstoffdaten",
    owner: "Operations",
    evidence: "Berechnung",
    status: "zu berechnen"
  },
  {
    question: "ISO 14001",
    information: "gültiges Zertifikat",
    source: "QMS",
    owner: "Qualität",
    evidence: "Zertifikat",
    status: "vorhanden"
  },
  {
    question: "Umweltpolitik",
    information: "formelle Policy",
    source: "GF / QM",
    owner: "Geschäftsführung",
    evidence: "Policy",
    status: "fehlt"
  },
  {
    question: "Mitarbeiterzahl",
    information: "FTE",
    source: "HR-System",
    owner: "HR",
    evidence: "HR-Auswertung",
    status: "zu bestätigen"
  }
];

const scopeOneSources = [
  "Erdgas",
  "Heizöl",
  "Diesel",
  "Benzin",
  "andere Brennstoffe",
  "Fuhrpark",
  "Kältemittel",
  "relevante direkte Prozessemissionen"
];

const scopeTwoSources = [
  "eingekaufter Strom",
  "Fernwärme",
  "Fernkälte",
  "eingekaufter Dampf"
];

const ownershipRows = [
  {
    role: "Geschäftsführung",
    responsibility:
      "Bestätigung von Unternehmenspraktiken, Governance, Zielen und Richtlinien."
  },
  {
    role: "Qualität / Umwelt",
    responsibility:
      "Zertifikate, Managementsysteme, Prozesse, Audit- und Umweltinformationen."
  },
  {
    role: "Buchhaltung / Controlling",
    responsibility:
      "Energie-, Kraftstoff- und andere abrechnungsbasierte Verbrauchsdaten."
  },
  {
    role: "HR",
    responsibility:
      "Mitarbeiter-, Schulungs-, Diversity- und Arbeitssicherheitsinformationen."
  },
  {
    role: "Produktion / Operations",
    responsibility:
      "Prozess-, Maschinen-, Produktions-, Material- und teilweise Umweltdaten."
  },
  {
    role: "Einkauf",
    responsibility:
      "Lieferantenprozesse, Supplier Code of Conduct und Beschaffungsinformationen."
  }
];

const firstDaySteps = [
  "Originaldatei sichern und eine Arbeitskopie erstellen.",
  "Deadline, Scope, angefragte Gesellschaft und Standorte prüfen.",
  "Fragen in Themenblöcke sortieren.",
  "Für jede Frage den Status vorhanden / berechnen / bestätigen / fehlt / unklar setzen.",
  "Nur die tatsächlich benötigten internen Personen ansprechen – nicht den kompletten Fragebogen an sechs Abteilungen weiterleiten.",
  "Dokumente und Daten in einer gemeinsamen Arbeitsstruktur sammeln.",
  "Erst dann Antworten formulieren."
];

const faqItems = [
  {
    question: "Was mache ich zuerst, wenn ein Kunde einen ESG-Fragebogen schickt?",
    answer:
      "Prüfen Sie zuerst Scope, Deadline, angefragte Gesellschaft beziehungsweise Standorte und benötigte Nachweise. Anschließend sollten die Fragen nach Themen und internen Datenquellen strukturiert werden, bevor einzelne Antworten formuliert werden."
  },
  {
    question: "Müssen wir bereits einen Nachhaltigkeitsbericht haben?",
    answer:
      "Nein. Viele Kundenanfragen können auf Basis vorhandener Unternehmensdaten und Dokumente beantwortet werden. Ein strukturierter Nachhaltigkeitsbericht kann die Datenbasis später verbessern, ist aber nicht automatisch Voraussetzung für jeden Fragebogen."
  },
  {
    question: "Was, wenn wir Scope 1 und Scope 2 noch nie berechnet haben?",
    answer:
      "Wenn die notwendigen Aktivitätsdaten vorhanden sind, können die Emissionen nachträglich für den relevanten Zeitraum berechnet werden. Wichtig sind nachvollziehbare Datenquellen, geeignete Emissionsfaktoren und eine dokumentierte Berechnungsgrundlage."
  },
  {
    question: "Was, wenn ein angefragter Nachweis fehlt?",
    answer:
      "Dann sollte die Lücke sichtbar bleiben. Ein fehlender Nachweis sollte nicht durch ein Dokument ersetzt werden, das die behauptete Praxis nicht tatsächlich belegt."
  },
  {
    question: "Kann man fehlende ESG-Richtlinien neu erstellen?",
    answer:
      "Ein Entwurf kann erstellt werden, wenn er die tatsächliche Unternehmenspraxis widerspiegelt. Er wird aber erst durch interne Prüfung und ausdrückliche Annahme zu einer gültigen Unternehmensrichtlinie und sollte nicht als historisch vorhandener Nachweis dargestellt werden."
  },
  {
    question: "Können Antworten für spätere Kunden wiederverwendet werden?",
    answer:
      "Häufig ja. Kunden verwenden unterschiedliche Formulierungen und Formate, aber viele zugrunde liegende ESG-Daten, Zertifikate, Richtlinien und Berechnungen überschneiden sich. Deshalb ist eine strukturierte, wiederverwendbare Datengrundlage sinnvoll."
  }
];

function ExternalSourceLink({
  href,
  children,
  className = ""
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] decoration-1 underline-offset-4 transition hover:text-orange ${className}`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
      <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
    </a>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((item) => (
        <li className="flex gap-3 leading-7 text-muted" key={item}>
          <span
            aria-hidden="true"
            className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ArticleSection({
  children,
  id,
  number,
  title
}: {
  children: ReactNode;
  id: string;
  number: string;
  title: string;
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 border-t border-[rgba(21,21,21,0.12)] py-14 sm:py-16"
      id={id}
    >
      <div>
        <div className="flex items-start gap-4 sm:gap-6">
          <span className="mt-1 font-mono text-xs font-bold tracking-[0.15em] text-orange">
            {number}
          </span>
          <h2
            className="font-display max-w-[19ch] text-[clamp(2.15rem,4.1vw,3.7rem)] leading-[1.02]"
            id={`${id}-title`}
          >
            {title}
          </h2>
        </div>
        <div className="resource-prose mt-8 sm:pl-[3.35rem]">{children}</div>
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "vorhanden"
      ? "border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] text-[#b94f00]"
      : status === "fehlt"
        ? "border-[rgba(21,21,21,0.18)] bg-[rgba(21,21,21,0.06)] text-ink"
        : "border-[rgba(21,21,21,0.13)] bg-white text-[rgba(21,21,21,0.68)]";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] ${tone}`}
    >
      {status}
    </span>
  );
}

function AnswerMap() {
  return (
    <div className="mt-8" data-answer-map>
      <div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Beispiel einer Answer Map mit Frage, benötigter Information,
              Quelle, verantwortlicher Person, Nachweis und Status
            </caption>
            <thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]">
              <tr>
                {[
                  "Frage",
                  "Benötigte Information",
                  "Quelle",
                  "Verantwortlich",
                  "Nachweis",
                  "Status"
                ].map((heading) => (
                  <th className="border-b border-[rgba(21,21,21,0.12)] px-4 py-4 font-bold" key={heading} scope="col">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {answerMapRows.map((row) => (
                <tr className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0" key={row.question}>
                  <th className="px-4 py-5 font-bold text-ink" scope="row">
                    {row.question}
                  </th>
                  <td className="px-4 py-5 text-muted">{row.information}</td>
                  <td className="px-4 py-5 text-muted">{row.source}</td>
                  <td className="px-4 py-5 text-muted">{row.owner}</td>
                  <td className="px-4 py-5 text-muted">{row.evidence}</td>
                  <td className="px-4 py-5">
                    <StatusPill status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:hidden">
        {answerMapRows.map((row) => (
          <article
            className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_10px_30px_rgba(21,21,21,0.035)]"
            key={row.question}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[rgba(21,21,21,0.1)] pb-4">
              <h3 className="font-bold text-ink">{row.question}</h3>
              <StatusPill status={row.status} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              {[
                ["Benötigte Information", row.information],
                ["Quelle", row.source],
                ["Verantwortlich", row.owner],
                ["Nachweis", row.evidence]
              ].map(([label, value]) => (
                <div className="grid grid-cols-[7.6rem_1fr] gap-3" key={label}>
                  <dt className="font-semibold text-[rgba(21,21,21,0.56)]">
                    {label}
                  </dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function QuestionnaireArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art">
      <svg
        className="resource-hero-art__sheet"
        fill="none"
        viewBox="0 0 520 650"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M92 34H365L468 138V603H92V34Z" fill="currentColor" fillOpacity="0.018" stroke="currentColor" strokeWidth="2" />
        <path d="M365 34V138H468" stroke="currentColor" strokeWidth="2" />
        <path d="M132 185H330" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M132 213H412" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M132 241H386" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        {[300, 365, 430, 495].map((y) => (
          <g key={y}>
            <rect height="30" rx="4" stroke="currentColor" strokeWidth="2" width="30" x="132" y={y} />
            <path d={`M140 ${y + 15}L149 ${y + 23}L165 ${y + 6}`} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            <path d={`M187 ${y + 9}H405`} stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            <path d={`M187 ${y + 25}H346`} stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </g>
        ))}
        <path d="M54 171C22 171 20 220 54 220H112C134 220 135 187 112 187H70" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
        <text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2" x="132" y="105">
          ESG / 01
        </text>
      </svg>
      <span className="resource-hero-art__code">QUESTIONNAIRE · EVIDENCE · DATA</span>
    </div>
  );
}

export function EsgQuestionnaireGuide() {
  return (
    <>

      <main id="top">
        <article>
          <header
            aria-labelledby="article-title"
            className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28"
          >
            <QuestionnaireArtwork />
            <div className="site-shell relative z-10">
              <nav
                aria-label="Brotkrümelnavigation"
                className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
              >
                <Link className="transition hover:text-orange" href="/de">
                  Startseite
                </Link>
                <span aria-hidden="true">/</span>
                <Link className="transition hover:text-orange" href="/de/ressourcen">
                  Ressourcen
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-ink">Praxisleitfaden</span>
              </nav>

              <div className="mt-12 max-w-5xl">
                <p className="eyebrow">ESG-Fragebögen · Praxisleitfaden</p>
                <h1
                  className="font-display mt-7 max-w-[14ch] text-[clamp(3.15rem,7.2vw,6.7rem)] leading-[0.9]"
                  id="article-title"
                >
                  ESG-Fragebogen vom Kunden erhalten – was jetzt?
                </h1>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.62fr)] lg:items-start lg:gap-16">
                <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                  <p>
                    Ein wichtiger Kunde schickt einen Nachhaltigkeits- oder
                    ESG-Fragebogen.
                  </p>
                  <p className="mt-6">
                    Und intern ist zunächst nicht einmal klar, wer den
                    Fragebogen eigentlich beantworten soll.
                  </p>
                  <p className="mt-6">
                    Das ist bei produzierenden kleinen und mittleren
                    Unternehmen keine ungewöhnliche Situation.
                  </p>
                </div>

                <div className="relative rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.72)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <FileSpreadsheet aria-hidden="true" className="h-6 w-6 text-orange" />
                    <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.13em] text-[rgba(21,21,21,0.48)]">
                      Eingang / heute
                    </span>
                  </div>
                  <div className="mt-7 space-y-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
                    <p>Excel im Anhang.</p>
                    <p>Mehrere Tabs.</p>
                    <p>Eine Deadline.</p>
                  </div>
                  <p className="mt-6 border-t border-[rgba(21,21,21,0.1)] pt-5 leading-7 text-muted">
                    Fragen zu Emissionen, Mitarbeitenden, Richtlinien und
                    Zertifikaten.
                  </p>
                </div>
              </div>

              <div className="mt-14 grid gap-6 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9 lg:grid-cols-[0.38fr_1fr] lg:gap-10">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-orange">
                    Die gute Nachricht
                  </span>
                  <p className="font-display mt-4 text-3xl leading-[1.08]">
                    Sie müssen nicht zuerst ein vollständiges ESG-System
                    aufbauen.
                  </p>
                </div>
                <div className="space-y-5 text-lg leading-8 text-muted">
                  <p>
                    Der sinnvollste erste Schritt ist, den Fragebogen zu
                    strukturieren, vorhandene Informationen zusammenzubringen
                    und klar zwischen drei Dingen zu unterscheiden:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {["Was wissen wir bereits?", "Was können wir belegen?", "Was fehlt tatsächlich?"].map((item) => (
                      <div className="border-t border-orange pt-3 text-sm font-bold text-ink" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <p>Dieser Leitfaden zeigt Ihnen, wie Sie dabei vorgehen.</p>
                </div>
              </div>
            </div>
          </header>

          <section
            aria-labelledby="quick-answer-title"
            className="scroll-mt-24 bg-ink py-20 text-white sm:py-24"
            id="schnellantwort"
          >
            <div className="site-shell">
              <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
                <div>
                  <p className="eyebrow">Quick Answer</p>
                  <h2 className="font-display mt-6 max-w-[12ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]" id="quick-answer-title">
                    ESG-Fragebogen erhalten? Beginnen Sie mit diesen sechs
                    Schritten.
                  </h2>
                </div>
                <ol className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {quickSteps.map((step, index) => (
                    <li className="border-t border-white/20 pt-5" key={step.title}>
                      <div className="flex gap-4">
                        <span className="font-mono text-xs font-bold tracking-[0.13em] text-orange">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-bold leading-6 text-white">{step.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-white/65">{step.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <div className="site-shell grid items-start gap-12 py-10 lg:grid-cols-[15rem_minmax(0,55rem)] lg:justify-center lg:gap-16 lg:py-16">
            <aside className="hidden lg:block">
              <nav aria-label="Inhalt des Leitfadens" className="sticky top-28 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[rgba(255,255,255,0.72)] p-5 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Im Leitfaden</p>
                <ol className="mt-5 grid gap-3 text-sm font-semibold leading-5 text-[rgba(21,21,21,0.62)]">
                  {[
                    ["01", "Fragebogen strukturieren", "#fragebogen-strukturieren"],
                    ["02", "Typische ESG-Themen", "#typische-esg-themen"],
                    ["03", "Interne Datenquellen", "#interne-datenquellen"],
                    ["04", "Answer Map", "#answer-map"],
                    ["05", "Antwort und Nachweis", "#antwort-und-nachweis"],
                    ["06", "Fehlende Richtlinien", "#fehlende-richtlinie"],
                    ["07", "Fehlende Daten", "#fehlende-daten"],
                    ["08", "Scope 1 und 2", "#scope-1-und-2"],
                    ["09", "Pflicht und Kundenanfrage", "#rechtliche-einordnung"],
                    ["13", "Die ersten 24 Stunden", "#erste-24-stunden"]
                  ].map(([number, label, href]) => (
                    <li key={href}>
                      <a className="group flex gap-3 transition hover:text-ink" href={href}>
                        <span className="font-mono text-[0.65rem] text-orange">{number}</span>
                        <span>{label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <ArticleSection id="fragebogen-strukturieren" number="01" title="Zuerst: Nicht jede Frage einzeln bearbeiten.">
                <p>Der häufigste Fehler beginnt direkt nach dem Öffnen der Datei.</p>
                <div className="my-7 rounded-[1rem] border-l-2 border-orange bg-white px-6 py-5 font-mono text-sm leading-7 text-[rgba(21,21,21,0.68)] shadow-[0_10px_30px_rgba(21,21,21,0.035)]">
                  Frage 1 lesen. Antwort suchen. Frage 2 lesen. Kollegen
                  anschreiben. Frage 3 beantworten. Bei Frage 8 wieder dieselbe
                  Person kontaktieren.
                </div>
                <p>So wird aus einem Fragebogen schnell ein unübersichtliches internes Projekt.</p>
                <p>Besser ist es, den Fragebogen zuerst als Ganzes zu analysieren.</p>
                <p className="font-bold text-ink">Prüfen Sie insbesondere:</p>
                <BulletList items={questionnaireChecks} />
                <p>
                  Erst danach beginnt die eigentliche Datensammlung. Ein
                  strukturierter Fragebogen ist deutlich einfacher zu bearbeiten
                  als 70 einzelne Fragen.
                </p>
              </ArticleSection>

              <ArticleSection id="typische-esg-themen" number="02" title="Was wird in ESG-Fragebögen typischerweise gefragt?">
                <p>Jeder Kunde kann andere Fragen stellen. Die Themen überschneiden sich jedoch häufig.</p>
                <p>
                  Ein realer Lieferanten-Nachhaltigkeitsfragebogen kann
                  beispielsweise Fragen zu Nachhaltigkeitsverantwortung,
                  Berichterstattung, sozialen Standards, Compliance,
                  Umweltmanagement und Zertifizierungen enthalten. Auch aktuelle
                  standardisierungsorientierte Initiativen versuchen gerade deshalb,
                  die Vielzahl verschiedener Kundenanfragen zu reduzieren. Ein
                  Beispiel ist der öffentlich beschriebene {" "}
                  <ExternalSourceLink href={BMOE_QUESTIONNAIRE_URL}>
                    BMÖ Lieferanten-Nachhaltigkeitsfragebogen
                  </ExternalSourceLink>.
                </p>
                <p>Für die interne Vorbereitung hilft folgende Struktur.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {topicGroups.map((group) => {
                    const Icon = group.icon;
                    return (
                      <section className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-[0_12px_35px_rgba(21,21,21,0.035)]" key={group.title}>
                        <Icon aria-hidden="true" className="h-5 w-5 text-orange" />
                        <h3 className="mt-5 text-lg font-bold text-ink">{group.title}</h3>
                        <BulletList items={group.items} />
                      </section>
                    );
                  })}
                </div>
                <div className="mt-5 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--soft-orange)] p-6">
                  <div className="flex items-center gap-3">
                    <Paperclip aria-hidden="true" className="h-5 w-5 text-orange" />
                    <h3 className="text-lg font-bold text-ink">Nachweise und Dokumentation</h3>
                  </div>
                  <p className="mt-4">Manchmal reicht die Antwort „Ja“ nicht. Dann können beispielsweise benötigt werden:</p>
                  <BulletList items={evidenceExamples} />
                </div>
              </ArticleSection>

              <ArticleSection id="interne-datenquellen" number="03" title="Die meisten Informationen liegen bereits irgendwo im Unternehmen.">
                <p>
                  Ein ESG-Fragebogen vermittelt schnell den Eindruck, dass ein
                  komplett neues Informationssystem aufgebaut werden muss. In
                  vielen Unternehmen stimmt das nur teilweise.
                </p>
                <p>Die benötigten Informationen sind häufig bereits vorhanden – nur verteilt.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {departmentSources.map((department) => (
                    <section className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={department.title}>
                      <h3 className="text-lg font-bold text-ink">{department.title}</h3>
                      <BulletList items={department.items} />
                    </section>
                  ))}
                </div>
                <p className="mt-8 font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.16] text-ink">
                  Das erste ESG-Projekt ist deshalb häufig weniger ein Problem
                  fehlender Daten als ein Problem verteilter Daten.
                </p>
                <p>
                  Wer typischerweise welche ESG-Daten im Unternehmen besitzt,
                  zeigt unsere praktische{" "}
                  <Link href="/de/ressourcen/esg-daten-verantwortliche-abteilungen">
                    Data-Owner-Übersicht
                  </Link>
                  . Wenn die angefragten Datenbereiche noch unklar sind, hilft
                  zuerst der Überblick{" "}
                  <Link href="/de/ressourcen/welche-esg-daten-kunden-lieferanten">
                    Welche ESG-Daten verlangen Kunden von Lieferanten?
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection id="answer-map" number="04" title="Erstellen Sie eine einfache Answer Map.">
                <p>
                  Bevor Sie längere Texte schreiben, erstellen Sie für jede Frage
                  eine kleine Arbeitsstruktur. Der Status kann sehr einfach sein:
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {statuses.map((item) => (
                    <div className="rounded-[0.9rem] border border-[rgba(21,21,21,0.1)] bg-white p-5 last:sm:col-span-2" key={item.status}>
                      <StatusPill status={item.status} />
                      <h3 className="mt-3 font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
                <AnswerMap />
                <p>
                  Diese kleine Struktur verhindert, dass sich 50 Fragen
                  gleichzeitig wie 50 verschiedene Probleme anfühlen.
                </p>
              </ArticleSection>

              <ArticleSection id="antwort-und-nachweis" number="05" title="Antwort und Nachweis sollten zusammen vorbereitet werden.">
                <p>
                  Besonders bei Plattformen oder formelleren ESG-Assessments
                  reicht eine gute Formulierung allein nicht aus.
                </p>
                <p>
                  EcoVadis erklärt ausdrücklich, dass Antworten nur dann
                  entsprechend berücksichtigt werden können, wenn geeignete
                  supporting documents die jeweilige Aussage stützen. Dokumente
                  sollen relevant, aktuell, vollständig und zum Assessment Scope
                  passend sein. {" "}
                  <ExternalSourceLink href={ECOVADIS_DOCUMENTS_URL}>
                    EcoVadis: Understanding supporting documents
                  </ExternalSourceLink>
                </p>
                <div className="my-8 rounded-[1.1rem] bg-ink p-7 text-white sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">Das Grundprinzip</p>
                  <p className="sr-only">Antwort → Quelle → Nachweis</p>
                  <div className="mt-6 flex flex-col gap-3 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-none sm:flex-row sm:items-center">
                    <span>Antwort</span><ArrowRight aria-hidden="true" className="h-6 w-6 text-orange" />
                    <span>Quelle</span><ArrowRight aria-hidden="true" className="h-6 w-6 text-orange" />
                    <span>Nachweis</span>
                  </div>
                  <p className="mt-6 text-sm leading-6 text-white/62">Nicht: Antwort schreiben → später irgendein Dokument dazu suchen.</p>
                </div>
                <p>Ein Nachweis sollte tatsächlich zu der Aussage passen.</p>
                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Frage", "Verfügt Ihr Unternehmen über ein zertifiziertes Umweltmanagementsystem?"],
                    ["Gute Antwortbasis", "Ja – ISO 14001"],
                    ["Passender Nachweis", "Gültiges ISO-14001-Zertifikat für die tatsächlich relevante Gesellschaft beziehungsweise den Standort."]
                  ].map(([label, value]) => (
                    <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5" key={label}>
                      <p className="text-xs font-bold uppercase tracking-[0.11em] text-orange">{label}</p>
                      <p className="mt-3 text-sm leading-6 text-ink">{value}</p>
                    </div>
                  ))}
                </div>
                <p>Ein allgemeiner Nachhaltigkeitsflyer wäre dafür kein gleichwertiger Ersatz.</p>
                <p>
                  Welche Dokumente tatsächlich als Nachweis taugen, erklären
                  wir in unserem {" "}
                  <Link
                    className="orange-link"
                    href="/de/ressourcen/esg-nachweise-lieferanten"
                  >
                    Leitfaden zu ESG-Nachweisen für Lieferanten
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection id="fehlende-richtlinie" number="06" title="Was tun, wenn eine Richtlinie fehlt?">
                <p>ESG-Fragebögen fragen häufig nach Policies. Zum Beispiel:</p>
                <BulletList items={["Environmental Policy", "Human Rights Policy", "Code of Conduct", "Anti-Corruption Policy", "Supplier Code of Conduct"]} />
                <p>Wenn ein solches Dokument fehlt, gibt es einen wichtigen Unterschied.</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <section className="rounded-[1.05rem] border border-[rgba(254,112,1,0.25)] bg-[var(--soft-orange)] p-6 sm:p-7">
                    <span className="font-mono text-xs font-bold text-orange">FALL A</span>
                    <h3 className="mt-3 text-xl font-bold text-ink">Die Praxis existiert – das Dokument fehlt.</h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Das Unternehmen hat beispielsweise reale Umweltpraktiken
                      und interne Regeln, diese wurden aber noch nie in einer
                      formellen Environmental Policy zusammengefasst.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Dann kann auf Basis der tatsächlichen bestehenden Praxis ein
                      Entwurf vorbereitet werden. Dieser wird jedoch erst zu einer
                      Unternehmensrichtlinie, wenn eine autorisierte Person ihn
                      prüft, gegebenenfalls korrigiert und ausdrücklich verabschiedet.
                    </p>
                  </section>
                  <section className="rounded-[1.05rem] border border-[rgba(21,21,21,0.14)] bg-white p-6 sm:p-7">
                    <span className="font-mono text-xs font-bold text-[rgba(21,21,21,0.5)]">FALL B</span>
                    <h3 className="mt-3 text-xl font-bold text-ink">Die Praxis existiert nicht.</h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Dann sollte nicht einfach ein Dokument erstellt werden, das
                      behauptet, sie existiere.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Ein neues Dokument kann fehlende historische
                      Unternehmenspraxis nicht rückwirkend erzeugen.
                    </p>
                  </section>
                </div>
                <div className="mt-7 flex gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.13)] bg-white p-5">
                  <CircleAlert aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-orange" />
                  <p className="text-sm leading-7 text-muted">
                    Das ist besonders wichtig bei evidenzbasierten Assessments.
                    EcoVadis weist darauf hin, dass Dokumente, die nur für die
                    Beantwortung des Fragebogens erstellt wurden, nicht als
                    entsprechender Nachweis anerkannt werden; ebenso werden
                    kopierte oder fingierte Nachweise nicht akzeptiert. {" "}
                    <ExternalSourceLink href={ECOVADIS_DOCUMENTS_URL}>Quelle bei EcoVadis</ExternalSourceLink>
                  </p>
                </div>
              </ArticleSection>

              <ArticleSection id="fehlende-daten" number="07" title="Was tun, wenn Daten fehlen?">
                <p>Nicht jede Frage wird beim ersten Versuch beantwortbar sein. Dann gibt es mehrere Möglichkeiten.</p>
                <div className="mt-8 grid gap-4">
                  {[
                    ["Die Daten existieren, müssen aber gesucht werden.", "Kraftstoffverbrauch liegt in Rechnungen oder Tankkartenabrechnungen.", "Daten beschaffen."],
                    ["Die Daten existieren, aber die Kennzahl wurde noch nie berechnet.", "Strom- und Gasverbrauch liegen vor, Scope 1 und Scope 2 wurden aber noch nie berechnet.", "Berechnung vorbereiten."],
                    ["Die Information existiert, wurde aber noch nicht formal bestätigt.", "Eine verantwortliche Person muss die Angabe prüfen.", "Verantwortliche Person einbeziehen."],
                    ["Eine belastbare Information existiert tatsächlich nicht.", "Die Quelle oder Dokumentation fehlt.", "Gap dokumentieren."]
                  ].map(([title, example, action], index) => (
                    <div className="grid gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 sm:grid-cols-[2.2rem_1fr_auto] sm:items-start" key={title}>
                      <span className="font-mono text-xs font-bold text-orange">0{index + 1}</span>
                      <div>
                        <h3 className="font-bold text-ink">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">Beispiel: {example}</p>
                      </div>
                      <span className="rounded-full bg-[var(--soft-orange)] px-3 py-1.5 text-xs font-bold text-[#b94f00]">{action}</span>
                    </div>
                  ))}
                </div>
                <p>
                  Je nach konkreter Kennzahl kann eine methodisch begründete
                  Schätzung oder ein Proxy sinnvoll sein. Aber: Eine Schätzung
                  muss als Schätzung erkennbar bleiben. Und manche Fragen lassen
                  sich nicht seriös schätzen.
                </p>
                <p className="font-bold text-ink">
                  Wenn ein Kunde fragt, ob eine formelle Richtlinie existiert, ist
                  „wahrscheinlich ja“ keine sinnvolle Antwort.
                </p>
              </ArticleSection>

              <ArticleSection id="scope-1-und-2" number="08" title="Scope 1 und Scope 2 noch nicht berechnet?">
                <p>Das ist kein ungewöhnlicher Ausgangspunkt.</p>
                <p>
                  Wenn ein Fragebogen nach Treibhausgasemissionen fragt, beginnen
                  Sie nicht mit der CO₂e-Zahl. Beginnen Sie mit den Aktivitätsdaten.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-orange">Scope 1</p>
                    <BulletList items={scopeOneSources} />
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-orange">Scope 2</p>
                    <BulletList items={scopeTwoSources} />
                  </div>
                </div>
                <div className="my-8 rounded-[1rem] border border-[rgba(254,112,1,0.26)] bg-[var(--soft-orange)] p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Vereinfacht</p>
                  <p className="font-display mt-4 text-[clamp(1.7rem,3.8vw,2.8rem)] leading-[1.12] text-ink">
                    Aktivitätsdaten × geeigneter Emissionsfaktor → Treibhausgasemissionen in CO₂e
                  </p>
                </div>
                <p>Wichtig ist, dass neben dem Ergebnis auch nachvollziehbar bleibt:</p>
                <BulletList items={["welcher Zeitraum verwendet wurde", "welche organisatorische Abgrenzung gilt", "welche Einheiten genutzt wurden", "welche Faktoren verwendet wurden", "welche Annahmen notwendig waren"]} />
                <p>
                  Welche Rechnungen, Verbrauchsdaten, Kraftstoffinformationen
                  und Kältemittelunterlagen Sie dafür zuerst zusammentragen
                  sollten, zeigt unser Leitfaden{" "}
                  <Link
                    className="orange-link"
                    href="/de/ressourcen/scope-1-2-daten-berechnung"
                  >
                    Scope 1 und Scope 2: Welche Daten braucht man?
                  </Link>
                </p>
                <Link className="orange-link mt-7 inline-flex items-center gap-2 text-sm" href="/de/scope-1-2-berechnung">
                  Scope 1 und Scope 2 berechnen
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </ArticleSection>

              <ArticleSection id="rechtliche-einordnung" number="09" title="Müssen Lieferanten jeden ESG-Fragebogen beantworten?">
                <p>Nicht pauschal.</p>
                <p>Hier sollte man drei Dinge voneinander trennen:</p>
                <div className="mt-8 grid gap-4">
                  {[
                    ["1", "Eigene gesetzliche Berichtspflicht", "Ob Ihr Unternehmen selbst gesetzlich zur Nachhaltigkeitsberichterstattung verpflichtet ist, ist eine eigene Frage."],
                    ["2", "Informationsanfrage eines Kunden", "Ein Kunde kann Informationen im Rahmen seiner Lieferantenbewertung, Beschaffung, Vertragsbeziehung, Risikosteuerung oder eigenen Anforderungen anfordern. Das bedeutet nicht automatisch, dass jede einzelne Frage eine direkte gesetzliche Berichtspflicht Ihres Unternehmens ist."],
                    ["3", "EU-Regeln zu Informationsanfragen in der Wertschöpfungskette", "Die EU hat 2026 einen neuen freiwilligen Sustainability Reporting Standard einschließlich eines sogenannten value chain cap angenommen."]
                  ].map(([number, title, body]) => (
                    <div className="grid gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:grid-cols-[2rem_1fr]" key={number}>
                      <span className="font-display text-3xl text-orange">{number}</span>
                      <div>
                        <h3 className="font-bold text-ink">{title}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p>
                  Dieser value chain cap soll den Umfang bestimmter
                  Sustainability-Informationen begrenzen, die
                  CSRD-berichtspflichtige Unternehmen für ihre Berichterstattung
                  von geschützten Unternehmen in der Wertschöpfungskette verlangen
                  können.
                </p>
                <p>
                  Wichtig ist die Einschränkung: Der Mechanismus gilt nicht
                  pauschal für jede mögliche Kundenanfrage oder jede andere
                  gesetzliche beziehungsweise vertragliche Informationspflicht.
                  Die Europäische Kommission erläutert außerdem ausdrücklich,
                  dass der value chain cap selbst keine Pflicht des angefragten
                  Unternehmens begründet, Sustainability-Informationen
                  bereitzustellen. {" "}
                  <ExternalSourceLink href={EU_VALUE_CHAIN_QA_URL}>
                    Erläuterungen der Europäischen Kommission
                  </ExternalSourceLink>
                </p>
                <div className="my-8 rounded-[1rem] border border-[rgba(21,21,21,0.14)] bg-white p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Stand 21. August 2026</p>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    Die entsprechende Delegierte Verordnung wurde von der
                    Europäischen Kommission am 3. Juli 2026 angenommen, ist nach
                    Angaben der Kommission jedoch noch nicht in Kraft, solange sie
                    nicht im Amtsblatt der Europäischen Union veröffentlicht wurde.
                    Der eigentliche value-chain-cap-Artikel soll für Geschäftsjahre
                    gelten, die am oder nach dem 1. Januar 2027 beginnen. {" "}
                    <ExternalSourceLink href={EU_DELEGATED_ACT_URL}>
                      Status und delegierte Rechtsakte zur CSRD
                    </ExternalSourceLink>
                  </p>
                </div>
                <p>Deshalb wäre die falsche Reaktion:</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {["„Wir haben weniger als 1.000 Mitarbeiter, also müssen wir gar nichts beantworten.“", "„Der Kunde fragt, also sind wir gesetzlich verpflichtet, alles zu liefern.“"].map((statement) => (
                    <blockquote className="rounded-[1rem] border-l-2 border-orange bg-[var(--soft-orange)] p-5 font-bold leading-7 text-ink" key={statement}>{statement}</blockquote>
                  ))}
                </div>
                <p>
                  Bei Zweifeln sollte zunächst geklärt werden, auf welcher
                  Grundlage und zu welchem Zweck die Information verlangt wird.
                  Mehr zum praktischen Umgang mit {" "}
                  <Link className="orange-link" href="/de/esg-kundenanfragen">ESG-Anforderungen von Kunden</Link>.
                </p>
              </ArticleSection>

              <ArticleSection id="nicht-tun" number="10" title="Was sollten Sie nicht tun?">
                <div className="grid gap-4">
                  {[
                    ["Nicht einfach überall Ja eintragen.", "Eine positive Antwort kann später einen Nachweis oder eine Erklärung erfordern."],
                    ["Keine Richtlinie aus dem Internet kopieren.", "Ein Dokument ist nur sinnvoll, wenn es die tatsächliche Unternehmenspraxis beschreibt."],
                    ["Keine Zahlen schätzen, ohne die Schätzung sichtbar zu machen.", "False precision ist keine bessere ESG-Antwort."],
                    ["Nicht denselben Nachweis für fünf verschiedene Aussagen verwenden, wenn er sie nicht tatsächlich belegt.", "Ein Dokument muss zur konkreten Aussage passen."],
                    ["Nicht jede Abteilung unabhängig antworten lassen.", "Sonst entstehen widersprüchliche Zahlen und Aussagen."],
                    ["Den ausgefüllten Fragebogen nicht als einmaliges Wegwerfprojekt behandeln.", "Die darin gesammelten Informationen sind die Grundlage für den nächsten."]
                  ].map(([title, body]) => (
                    <div className="flex gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5" key={title}>
                      <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                      <div>
                        <h3 className="font-bold leading-6 text-ink">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ArticleSection>

              <ArticleSection id="daten-wiederverwenden" number="11" title="Der wichtigste Schritt kommt nach dem ersten Fragebogen.">
                <p>Nehmen wir an, Sie haben die Anfrage erfolgreich beantwortet.</p>
                <p>Dann haben Sie wahrscheinlich zum ersten Mal an einem Ort:</p>
                <BulletList items={["Energieinformationen", "Emissionsdaten", "Mitarbeiterdaten", "Zertifikate", "Unternehmensrichtlinien", "Antworten zu Compliance", "Nachweise", "Informationen über offene Lücken"]} />
                <p className="font-bold text-ink">Speichern Sie diese Struktur.</p>
                <p>
                  Denn der nächste Kunde wird die Fragen vielleicht anders
                  formulieren. Aber viele der zugrunde liegenden Informationen
                  bleiben gleich.
                </p>
                <div className="my-8 grid gap-3 font-mono text-sm sm:grid-cols-3">
                  {[
                    ["Heute", "Wie hoch waren Ihre Scope-1-Emissionen?"],
                    ["Morgen", "Bitte geben Sie die direkten THG-Emissionen des letzten Geschäftsjahres in t CO₂e an."],
                    ["Übermorgen", "Eine Plattform mit demselben zugrunde liegenden Datenpunkt."]
                  ].map(([label, text]) => (
                    <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5" key={label}>
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-orange">{label}</span>
                      <p className="mt-3 leading-6 text-[rgba(21,21,21,0.7)]">{text}</p>
                    </div>
                  ))}
                </div>
                <p className="font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.16] text-ink">
                  Die Frage ändert sich. Die Unternehmensinformation dahinter häufig nicht.
                </p>
                <p>
                  Genau deshalb lohnt es sich, ESG-Daten nicht nur für einen
                  Fragebogen, sondern als wiederverwendbare Datengrundlage aufzubauen.
                </p>
              </ArticleSection>

              <ArticleSection id="interne-verantwortung" number="12" title="Wer sollte intern eingebunden werden?">
                <p>Für einen typischen Produktionsbetrieb kann eine einfache Zuordnung so aussehen:</p>
                <div className="mt-8 overflow-hidden rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white">
                  {ownershipRows.map((row) => (
                    <div className="grid gap-2 border-b border-[rgba(21,21,21,0.09)] p-5 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6" key={row.role}>
                      <h3 className="font-bold text-ink">{row.role}</h3>
                      <p className="text-sm leading-6 text-muted">{row.responsibility}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Nicht jedes Unternehmen hat diese Abteilungen separat.
                  Entscheidend ist nicht der Titel der Person, sondern:
                </p>
                <p className="font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.16] text-ink">
                  Wer besitzt die belastbarste Quelle für die jeweilige Information?
                </p>
              </ArticleSection>

              <ArticleSection id="erste-24-stunden" number="13" title="Eine praktische Reihenfolge für die ersten 24 Stunden.">
                <p>
                  Wenn der Fragebogen heute eingegangen ist, würde ich nicht
                  versuchen, ihn heute vollständig zu beantworten.
                </p>
                <p>Stattdessen:</p>
                <ol className="mt-8 grid gap-0">
                  {firstDaySteps.map((step, index) => (
                    <li className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-7 last:pb-0" key={step}>
                      {index < firstDaySteps.length - 1 ? <span aria-hidden="true" className="absolute bottom-0 left-[1.34rem] top-9 w-px bg-[rgba(254,112,1,0.26)]" /> : null}
                      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] font-mono text-xs font-bold text-orange">{index + 1}</span>
                      <div className="pt-2">
                        <p className="font-bold leading-7 text-ink">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p>
                  Das reduziert Rückfragen und verhindert, dass verschiedene
                  Versionen derselben Zahl im Fragebogen landen.
                </p>
                <p>
                  Wenn Sie den Fragebogen jetzt praktisch abarbeiten möchten,
                  nutzen Sie unsere vollständige {" "}
                  <Link href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten">
                    ESG-Fragebogen-Checkliste für Lieferanten
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection id="externe-unterstuetzung" number="14" title="Wann externe Unterstützung sinnvoll ist.">
                <p>Nicht jeder ESG-Fragebogen benötigt externe Hilfe.</p>
                <p>
                  Wenn Sie einen kurzen Fragebogen erhalten und alle Informationen
                  intern sauber verfügbar sind, kann die Bearbeitung unkompliziert sein.
                </p>
                <p>Unterstützung wird besonders sinnvoll, wenn:</p>
                <BulletList items={["der Fragebogen umfangreich ist", "die Deadline knapp ist", "Scope 1 oder Scope 2 noch berechnet werden müssen", "mehrere Abteilungen beteiligt sind", "unklar ist, welche Nachweise zu welchen Antworten gehören", "Richtlinien fehlen", "EcoVadis oder IntegrityNext beteiligt ist", "Sie eine Datenbasis aufbauen möchten, die später wiederverwendet werden kann"]} />
                <p>
                  Für plattformspezifische Anforderungen finden Sie weitere
                  Informationen unter {" "}
                  <Link className="orange-link" href="/de/ecovadis-unterstuetzung">EcoVadis-Unterstützung</Link>
                  {" "}und {" "}
                  <Link className="orange-link" href="/de/integritynext-unterstuetzung">IntegrityNext-Unterstützung</Link>.
                  Wie evipace Daten, Aussagen und Nachweise behandelt, beschreibt {" "}
                  <Link className="orange-link" href="/de/methodology">Unsere Methodik</Link>.
                </p>
                <p>
                  Der Vorteil liegt dann nicht nur darin, den aktuellen
                  Fragebogen fertigzustellen. Es geht darum, den internen Aufwand
                  beim zweiten, dritten und vierten Fragebogen deutlich besser zu
                  strukturieren.
                </p>
                <Link className="orange-link mt-7 inline-flex items-center gap-2 text-sm" href="/de/esg-fragebogen-lieferanten">
                  ESG-Fragebogen für Lieferanten
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </ArticleSection>

              <section aria-labelledby="article-cta-title" className="my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white">
                    <FileText aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-orange">Ihr nächster Schritt</p>
                  <h2 className="font-display mt-5 max-w-[13ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]" id="article-cta-title">Ihr ESG-Fragebogen liegt bereits vor?</h2>
                  <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-white/68">
                    <p>Sie müssen ihn nicht zuerst selbst vollständig analysieren.</p>
                    <p>Senden Sie uns den Fragebogen und die Unterlagen, die Sie bereits haben.</p>
                    <p>Wir prüfen, welche Informationen benötigt werden, was bereits vorhanden ist und wo noch Daten, Berechnungen oder Nachweise fehlen.</p>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>ESG-Fragebogen senden</ButtonLink>
                    <ButtonLink className="w-full sm:w-auto" href="/de/esg-fragebogen-lieferanten" variant="light">Unterstützung bei ESG-Fragebögen</ButtonLink>
                  </div>
                  <p className="mt-6 text-sm font-semibold text-white/50">Excel · PDF · Kundenformular · Nachweise</p>
                </div>
              </section>

              <section aria-labelledby="faq-title" className="scroll-mt-24 border-t border-[rgba(21,21,21,0.12)] py-16" id="faq">
                <div>
                  <p className="eyebrow">FAQ</p>
                  <h2 className="font-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-none" id="faq-title">Häufige Fragen</h2>
                  <div className="mt-9 grid gap-3">
                    {faqItems.map((faq) => (
                      <details className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white px-5 py-5 sm:px-6" key={faq.question}>
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold leading-6 text-ink marker:content-none">
                          {faq.question}
                          <span aria-hidden="true" className="text-2xl font-light text-orange transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>

              <section aria-labelledby="sources-title" className="border-t border-[rgba(21,21,21,0.12)] pb-16 pt-12">
                <div>
                  <div className="flex items-center gap-3">
                    <Link2 aria-hidden="true" className="h-4 w-4 text-orange" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink" id="sources-title">Quellen &amp; weiterführende Informationen</h2>
                  </div>
                  <ul className="mt-6 grid gap-4 text-sm leading-6 text-muted">
                    <li><ExternalSourceLink href={EU_DELEGATED_ACT_URL}>Europäische Kommission — Delegierte Rechtsakte zur CSRD vom 3. Juli 2026</ExternalSourceLink></li>
                    <li><ExternalSourceLink href={EFRAG_STANDARD_URL}>EFRAG Knowledge Hub — 2026 Voluntary Standard</ExternalSourceLink></li>
                    <li><ExternalSourceLink href={ECOVADIS_DOCUMENTS_URL}>EcoVadis Help Center — Understanding supporting documents</ExternalSourceLink></li>
                    <li><ExternalSourceLink href={BMOE_QUESTIONNAIRE_URL}>BMÖ — Lieferanten-Nachhaltigkeitsfragebogen</ExternalSourceLink></li>
                  </ul>
                  <p className="mt-7 text-xs leading-6 text-[rgba(21,21,21,0.48)]">
                    Der Abschnitt zur regulatorischen Einordnung gibt den Stand
                    vom 21. August 2026 wieder und ist keine Rechtsberatung.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
