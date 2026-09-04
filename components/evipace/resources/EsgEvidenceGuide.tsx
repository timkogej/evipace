import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Calculator,
  Check,
  CircleAlert,
  ExternalLink,
  FileBadge2,
  FileCheck2,
  FileClock,
  FileCog,
  FileStack,
  FileText,
  FolderTree,
  Link2,
  ShieldCheck,
  Table2,
  UsersRound
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";
const QUESTIONNAIRE_GUIDE_HREF =
  "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten";

const ECOVADIS_DOCUMENTS_URL =
  "https://support.ecovadis.com/hc/en-us/articles/210460307-Understanding-supporting-documents";
const ECOVADIS_THIRD_PARTY_URL =
  "https://support.ecovadis.com/hc/en-us/articles/19091385747346-How-should-I-submit-third-party-documents";
const INTEGRITYNEXT_ASSESSMENT_URL =
  "https://helpdesk.integritynext.com/hc/en-us/articles/360018443680-How-do-I-answer-complete-the-assessment";
const INTEGRITYNEXT_VALIDATION_URL =
  "https://helpdesk.integritynext.com/hc/de/articles/14737296721180-Ich-habe-eine-E-Mail-mit-dem-Betreff-Nachbesserungsbedarf-erhalten-Wie-kann-ich-weiter-vorgehen";

const quickChecks = [
  {
    title: "Passt der Nachweis zur Aussage?",
    body: "Ein ISO-14001-Zertifikat kann ein Umweltmanagementsystem belegen. Es belegt aber nicht automatisch jede einzelne Umweltmaßnahme Ihres Unternehmens."
  },
  {
    title: "Gehört er zum richtigen Unternehmen oder Standort?",
    body: "Ein Dokument der Muttergesellschaft ist nicht automatisch ein Nachweis für jede Tochtergesellschaft oder jedes Werk."
  },
  {
    title: "Ist der Nachweis aktuell?",
    body: "Bei Zertifikaten ist die Gültigkeit offensichtlich. Aber auch Richtlinien, KPI-Berichte und andere Dokumente können veraltet sein."
  },
  {
    title: "Ist nachvollziehbar, was das Dokument belegt?",
    body: "Firmenname, Zeitraum, Geltungsbereich, Freigabe oder Quelle sollten dort erkennbar sein, wo sie relevant sind."
  },
  {
    title: "Existiert die zugrunde liegende Praxis tatsächlich?",
    body: "Ein Dokument sollte eine reale Unternehmenspraxis dokumentieren – nicht erst eine Praxis erfinden, damit im Fragebogen ein Ja angekreuzt werden kann."
  }
];

const evidenceCategories = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Richtlinien und formelle Verpflichtungen",
    intro: "Sie zeigen vor allem, was das Unternehmen formell beschlossen oder festgelegt hat.",
    items: [
      "Environmental Policy",
      "Code of Conduct",
      "Anti-Corruption Policy",
      "Human Rights Policy",
      "Health & Safety Policy",
      "Supplier Code of Conduct",
      "Sustainable Procurement Policy",
      "andere interne Richtlinien"
    ]
  },
  {
    icon: FileBadge2,
    number: "02",
    title: "Zertifikate",
    intro: "Sie können zeigen, dass ein Managementsystem oder definierter Geltungsbereich extern zertifiziert wurde.",
    items: [
      "ISO 14001",
      "ISO 45001",
      "ISO 50001",
      "branchenspezifische Zertifizierungen",
      "andere für die konkrete Anfrage relevante Zertifikate"
    ]
  },
  {
    icon: FileCog,
    number: "03",
    title: "Verfahren und operative Dokumentation",
    intro: "Sie können helfen zu zeigen, wie eine Unternehmenspraxis tatsächlich organisiert ist.",
    items: [
      "Prozessbeschreibungen",
      "interne Arbeitsanweisungen",
      "Risikobewertungen",
      "dokumentierte Kontrollprozesse",
      "Umwelt-, Compliance- und Beschaffungsprozesse"
    ]
  },
  {
    icon: Calculator,
    number: "04",
    title: "Kennzahlen und Berechnungsgrundlagen",
    intro: "Hier ist häufig nicht nur die Endzahl relevant. Auch die Grundlage sollte nachvollziehbar bleiben.",
    items: [
      "Energie-, Kraftstoff- und Wasserverbrauch",
      "Abfallmengen",
      "Scope-1- und Scope-2-Berechnungen",
      "vereinbarte Scope-3-Daten",
      "Mitarbeiter- und Arbeitssicherheitskennzahlen",
      "andere ESG-KPIs"
    ]
  },
  {
    icon: UsersRound,
    number: "05",
    title: "Schulungs- und Umsetzungsnachweise",
    intro: "Wenn die Umsetzung gefragt ist, kann ein Policy-Dokument allein zu wenig sein.",
    items: [
      "Schulungsunterlagen",
      "Teilnahmeaufzeichnungen",
      "interne Kommunikation",
      "Maßnahmenprotokolle",
      "dokumentierte Kontrollen",
      "andere Umsetzungsnachweise"
    ]
  },
  {
    icon: FileCheck2,
    number: "06",
    title: "Externe beziehungsweise Third-Party-Dokumente",
    intro: "Sie können wertvoll sein, weil die Information nicht ausschließlich vom Unternehmen selbst erstellt wurde.",
    items: [
      "Rechnungen und Verträge",
      "externe Auditberichte",
      "Entsorgungsnachweise",
      "Berichte externer Dienstleister",
      "Zertifikate und Prüfberichte",
      "bestimmte Behördenunterlagen"
    ]
  },
  {
    icon: FileStack,
    number: "07",
    title: "Berichte",
    intro: "Ein Bericht kann mehrere Datenpunkte bündeln. Für jede Frage bleibt zu prüfen, was er tatsächlich belegt.",
    items: [
      "Nachhaltigkeitsberichte",
      "Jahresberichte mit Nachhaltigkeitsinformationen",
      "Umwelt- und HSE-Berichte",
      "Social-Audit-Berichte",
      "interne KPI-Berichte"
    ]
  }
];

const evidenceMapRows = [
  {
    requested: "Umweltmanagement",
    claim: "ISO 14001 vorhanden",
    evidence: "ISO-14001-Zertifikat",
    scope: "Werk A",
    period: "gültig bis 2027",
    status: "bereit"
  },
  {
    requested: "Stromverbrauch",
    claim: "482.000 kWh",
    evidence: "Rechnungen / Zählerdaten",
    scope: "Werk A",
    period: "2025",
    status: "bereit"
  },
  {
    requested: "Scope 2",
    claim: "126 t CO₂e",
    evidence: "Verbrauchsdaten + Berechnung",
    scope: "Unternehmen",
    period: "2025",
    status: "berechnet"
  },
  {
    requested: "Antikorruption",
    claim: "Richtlinie vorhanden",
    evidence: "freigegebene Policy",
    scope: "Unternehmen",
    period: "aktuell",
    status: "bereit"
  },
  {
    requested: "Compliance-Schulung",
    claim: "Mitarbeitende geschult",
    evidence: "Trainingsnachweis",
    scope: "relevante Mitarbeitende",
    period: "2026",
    status: "prüfen"
  },
  {
    requested: "Umweltpolitik",
    claim: "formelle Policy",
    evidence: "Policy",
    scope: "Unternehmen",
    period: "aktuell",
    status: "bereit"
  }
];

const certificateChecks = [
  {
    title: "Unternehmen",
    body: "Ist der richtige Firmenname genannt?"
  },
  {
    title: "Standort und Geltungsbereich",
    body: "Welche Standorte, Tätigkeiten oder Einheiten sind tatsächlich zertifiziert?"
  },
  {
    title: "Thema",
    body: "Belegt das Zertifikat genau das Managementsystem beziehungsweise Thema, nach dem gefragt wird?"
  },
  {
    title: "Gültigkeit",
    body: "Ist das Zertifikat noch gültig?"
  }
];

const calculationTrail = [
  {
    label: "Aktivitätsdaten",
    body: "zum Beispiel Stromverbrauch in kWh"
  },
  {
    label: "Quelle",
    body: "zum Beispiel Rechnungen, Zählerwerte oder strukturierte Verbrauchsdaten"
  },
  {
    label: "Methode / Emissionsfaktor",
    body: "welcher Faktor beziehungsweise welche methodische Grundlage wurde verwendet?"
  },
  {
    label: "Berechnung",
    body: "wie wurde aus dem Ausgangswert das Ergebnis ermittelt?"
  },
  { label: "Ergebnis", body: "t CO₂e" }
];

const weakEvidence = [
  {
    title: "Allgemeine Marketingbroschüren",
    body: "Sie können Nachhaltigkeitsaktivitäten beschreiben, sind aber nicht automatisch formelle Nachweise für konkrete Prozesse oder KPIs."
  },
  {
    title: "Nicht freigegebene Vorlagen",
    body: "Ein Policy Template ist noch keine verabschiedete Unternehmensrichtlinie."
  },
  {
    title: "Abgelaufene Zertifikate",
    body: "Sie können historische Information liefern, belegen aber nicht automatisch einen aktuellen Zertifizierungsstatus."
  },
  {
    title: "Dokumente einer anderen Gesellschaft",
    body: "Auch wenn beide Unternehmen zur gleichen Gruppe gehören."
  },
  {
    title: "Screenshots ohne Kontext",
    body: "Wenn weder Quelle, Datum, Gesellschaft noch Bedeutung nachvollziehbar sind."
  },
  {
    title: "Dokumente mit widersprüchlichen Zahlen",
    body: "Wenn zwei Dateien unterschiedliche Werte für denselben Zeitraum ausweisen, muss die Ursache zuerst geklärt werden."
  },
  {
    title: "Kopierte Richtlinien",
    body: "Ein professionell klingendes Dokument ist kein glaubwürdiger Nachweis, wenn es nicht die tatsächliche Unternehmenspraxis beschreibt."
  }
];

const evidenceChecks = [
  ["Relevanz", "Belegt das Dokument tatsächlich die konkrete Aussage?"],
  ["Unternehmen", "Gilt es für die richtige Gesellschaft?"],
  ["Standort", "Ist der richtige Standort beziehungsweise Scope enthalten?"],
  ["Zeitraum", "Passt der Zeitraum zur Anfrage?"],
  ["Aktualität", "Ist der Nachweis noch gültig beziehungsweise fachlich aktuell?"],
  ["Authentizität", "Handelt es sich um einen echten Bestandteil der Unternehmensdokumentation?"],
  ["Freigabe", "Wenn es eine interne Richtlinie ist: Wurde sie tatsächlich verabschiedet?"],
  ["Konsistenz", "Widerspricht der Nachweis anderen Angaben, die Sie im selben Fragebogen machen?"]
];

const faqItems = [
  {
    question: "Welche Dokumente gelten als ESG-Nachweis?",
    answer:
      "Das hängt von der konkreten Aussage ab. Typische Nachweise können Zertifikate, freigegebene Richtlinien, Berichte, KPI-Auswertungen, Rechnungen, Berechnungen, Auditunterlagen, Prozessdokumentation oder Schulungsnachweise sein. Entscheidend ist, dass das Dokument die konkrete Aussage tatsächlich unterstützt."
  },
  {
    question: "Braucht ein Lieferant ESG-Zertifikate?",
    answer:
      "Nicht pauschal. Manche Kunden oder Plattformen fragen nach bestimmten Zertifizierungen, aber viele ESG-Informationen werden durch andere Daten und Dokumente belegt. Bei IntegrityNext kann bei bestimmten Themen beispielsweise ein Fragebogen beantwortet werden, wenn kein entsprechendes Zertifikat vorhanden ist."
  },
  {
    question: "Kann ein Dokument mehrere Antworten belegen?",
    answer:
      "Ja, wenn es tatsächlich mehrere relevante Aussagen unterstützt. Trotzdem sollte für jede einzelne Antwort geprüft werden, welcher Teil des Dokuments die Aussage belegt und ob Scope und Zeitraum passen."
  },
  {
    question: "Kann eine fehlende ESG-Policy neu erstellt werden?",
    answer:
      "Ein Entwurf kann auf Basis der tatsächlichen Unternehmenspraxis erstellt werden. Er wird jedoch erst durch interne Prüfung und ausdrückliche Annahme durch eine autorisierte Person zur gültigen Unternehmensrichtlinie. Ein neu erstelltes Dokument sollte nicht als historisch bestehender Nachweis dargestellt werden."
  },
  {
    question: "Wie aktuell müssen ESG-Nachweise sein?",
    answer:
      "Das hängt vom Dokument und vom Empfänger ab. Zertifikate haben häufig eine feste Gültigkeit. Plattformen können zusätzliche Regeln haben. EcoVadis verwendet beispielsweise derzeit eigene Gültigkeitszeiträume für Policies, Actions und KPI-Reporting."
  },
  {
    question: "Können wir dieselben Nachweise für verschiedene Kunden verwenden?",
    answer:
      "Häufig ja. Die zugrunde liegenden Unternehmensdokumente können wiederverwendbar sein. Vor jeder Einreichung sollte jedoch erneut geprüft werden, ob das Dokument zum gefragten Unternehmen, Standort, Zeitraum und konkreten Informationsbedarf passt."
  },
  {
    question: "Was tun, wenn ein geforderter Nachweis nicht existiert?",
    answer:
      "Zuerst sollte geklärt werden, ob nur die Dokumentation fehlt oder ob auch die zugrunde liegende Unternehmenspraxis nicht existiert. Fehlt die Praxis tatsächlich, sollte der Punkt als Gap behandelt werden und nicht durch einen irreführenden Nachweis ersetzt werden."
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
      <div className="flex items-start gap-4 sm:gap-6">
        <span className="mt-1 font-mono text-xs font-bold tracking-[0.15em] text-orange">
          {number}
        </span>
        <h2
          className="font-display max-w-[20ch] text-[clamp(2.15rem,4.1vw,3.7rem)] leading-[1.02]"
          id={`${id}-title`}
        >
          {title}
        </h2>
      </div>
      <div className="resource-prose mt-8 sm:pl-[3.35rem]">{children}</div>
    </section>
  );
}

function StatusPill({ status }: { status: string }) {
  const highlight = status === "prüfen";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] ${
        highlight
          ? "border-[rgba(21,21,21,0.16)] bg-[rgba(21,21,21,0.05)] text-ink"
          : "border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] text-[#b94f00]"
      }`}
    >
      {status}
    </span>
  );
}

function EvidenceMap() {
  const fields: Array<[string, keyof (typeof evidenceMapRows)[number]]> = [
    ["Aussage / Datenpunkt", "claim"],
    ["Möglicher Nachweis", "evidence"],
    ["Scope", "scope"],
    ["Zeitraum / Gültigkeit", "period"]
  ];

  return (
    <div className="mt-8" data-evidence-map>
      <div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[930px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Beispiel einer Evidence Map mit angefragter Information,
              Aussage, Nachweis, Scope, Zeitraum und Status
            </caption>
            <thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]">
              <tr>
                {[
                  "Angefragte Information",
                  "Aussage / Datenpunkt",
                  "Möglicher Nachweis",
                  "Scope",
                  "Zeitraum / Gültigkeit",
                  "Status"
                ].map((heading) => (
                  <th
                    className="border-b border-[rgba(21,21,21,0.12)] px-4 py-4 font-bold"
                    key={heading}
                    scope="col"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evidenceMapRows.map((row) => (
                <tr
                  className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0"
                  key={row.requested}
                >
                  <th className="px-4 py-5 font-bold text-ink" scope="row">
                    {row.requested}
                  </th>
                  <td className="px-4 py-5 text-muted">{row.claim}</td>
                  <td className="px-4 py-5 text-muted">{row.evidence}</td>
                  <td className="px-4 py-5 text-muted">{row.scope}</td>
                  <td className="px-4 py-5 text-muted">{row.period}</td>
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
        {evidenceMapRows.map((row) => (
          <article
            className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_10px_30px_rgba(21,21,21,0.035)]"
            key={row.requested}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[rgba(21,21,21,0.1)] pb-4">
              <h3 className="font-bold text-ink">{row.requested}</h3>
              <StatusPill status={row.status} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              {fields.map(([label, key]) => (
                <div className="grid grid-cols-[7.35rem_1fr] gap-3" key={label}>
                  <dt className="font-semibold text-[rgba(21,21,21,0.56)]">
                    {label}
                  </dt>
                  <dd className="min-w-0 break-words text-ink">{row[key]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function EvidenceArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art">
      <svg
        className="resource-hero-art__sheet"
        fill="none"
        viewBox="0 0 520 650"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M86 40H361L463 142V603H86V40Z"
          fill="currentColor"
          fillOpacity="0.018"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M361 40V142H463" stroke="currentColor" strokeWidth="2" />
        <circle cx="274" cy="262" r="74" stroke="currentColor" strokeWidth="2" />
        <path
          d="M238 262L263 286L313 232"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        {[385, 426, 467].map((y, index) => (
          <g key={y}>
            <path d={`M139 ${y}H${index === 1 ? 373 : 405}`} stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            <path d={`M139 ${y + 17}H${index === 2 ? 332 : 353}`} stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </g>
        ))}
        <path d="M117 545H306" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2" x="132" y="108">
          EVIDENCE / 02
        </text>
      </svg>
      <span className="resource-hero-art__code">
        CLAIM · SOURCE · EVIDENCE
      </span>
    </div>
  );
}

function Principle({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-[1.1rem] bg-ink p-7 text-white sm:p-8">
      <p className="font-display text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.1]">
        {children}
      </p>
    </div>
  );
}

export function EsgEvidenceGuide() {
  return (
    <>

      <main id="top">
        <article>
          <header
            aria-labelledby="article-title"
            className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28"
          >
            <EvidenceArtwork />
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
                <span className="text-ink">ESG-Nachweise</span>
              </nav>

              <div className="mt-12 max-w-6xl">
                <p className="eyebrow">ESG-Nachweise · Praxisleitfaden</p>
                <h1
                  className="font-display mt-7 max-w-[17ch] text-[clamp(3.15rem,7vw,6.55rem)] leading-[0.91]"
                  id="article-title"
                >
                  ESG-Nachweise für Lieferanten: Welche Dokumente werden
                  wirklich gebraucht?
                </h1>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.6fr)] lg:items-start lg:gap-16">
                <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                  <p>Ihr Kunde fragt nicht mehr nur:</p>
                  <p className="font-display mt-4 text-3xl text-ink">
                    „Haben Sie eine Umweltpolitik?“
                  </p>
                  <p className="mt-7">Sondern:</p>
                  <p className="font-display mt-4 text-3xl text-ink">
                    „Bitte Nachweis beifügen.“
                  </p>
                  <p className="mt-7">
                    Plötzlich reicht eine Antwort im Fragebogen nicht mehr.
                    Benötigt werden Zertifikate, Richtlinien, Verbrauchsdaten,
                    Berechnungen, Schulungsnachweise, Berichte oder andere
                    Dokumente, die zeigen, worauf Ihre Aussagen tatsächlich
                    beruhen.
                  </p>
                </div>

                <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.76)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                  <FileCheck2 aria-hidden="true" className="h-6 w-6 text-orange" />
                  <p className="mt-7 text-sm font-bold uppercase tracking-[0.12em] text-orange">
                    Die entscheidende Frage
                  </p>
                  <p className="font-display mt-4 text-3xl leading-[1.08] text-ink">
                    Welches Dokument beweist eigentlich was?
                  </p>
                  <p className="mt-6 border-t border-[rgba(21,21,21,0.1)] pt-5 leading-7 text-muted">
                    Ein guter ESG-Nachweis ist nicht das Dokument, das am
                    professionellsten aussieht. Es ist das Dokument, das die
                    konkrete Aussage tatsächlich unterstützt.
                  </p>
                </aside>
              </div>

              <div className="mt-14 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9">
                <div className="grid gap-6 lg:grid-cols-[0.45fr_1fr] lg:gap-12">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-orange">
                      Dieser Leitfaden
                    </span>
                    <p className="font-display mt-4 text-3xl leading-[1.08]">
                      Von verstreuten Dateien zu einer wiederverwendbaren
                      Evidence-Struktur.
                    </p>
                  </div>
                  <p className="self-center text-lg leading-8 text-muted">
                    Sie erfahren, welche Nachweise typischerweise relevant
                    sind, worauf Sie bei ihrer Auswahl achten sollten und wie
                    Aussagen, Quellen und Dokumente belastbar zusammengeführt
                    werden.
                  </p>
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
              <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
                <div>
                  <p className="eyebrow">Quick Answer</p>
                  <h2
                    className="font-display mt-6 max-w-[12ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]"
                    id="quick-answer-title"
                  >
                    Was macht einen guten ESG-Nachweis aus?
                  </h2>
                  <p className="mt-7 max-w-sm leading-7 text-white/65">
                    Bevor Sie ein Dokument hochladen oder an einen Kunden
                    senden, prüfen Sie fünf Dinge.
                  </p>
                </div>
                <ol className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {quickChecks.map((check, index) => (
                    <li
                      className={`border-t border-white/20 pt-5 ${
                        index === quickChecks.length - 1 ? "sm:col-span-2" : ""
                      }`}
                      key={check.title}
                    >
                      <div className="flex gap-4">
                        <span className="font-mono text-xs font-bold tracking-[0.13em] text-orange">
                          {index + 1} —
                        </span>
                        <div>
                          <h3 className="font-bold leading-6 text-white">
                            {check.title}
                          </h3>
                          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                            {check.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-14 border-t border-white/15 pt-9">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                  Die Grundlogik
                </p>
                <p className="sr-only">Aussage → Quelle → Nachweis</p>
                <div className="mt-5 flex flex-col gap-3 font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none sm:flex-row sm:items-center">
                  <span>Aussage</span>
                  <ArrowRight aria-hidden="true" className="h-7 w-7 text-orange" />
                  <span>Quelle</span>
                  <ArrowRight aria-hidden="true" className="h-7 w-7 text-orange" />
                  <span>Nachweis</span>
                </div>
              </div>
            </div>
          </section>

          <div className="site-shell grid items-start gap-12 py-10 lg:grid-cols-[15rem_minmax(0,55rem)] lg:justify-center lg:gap-16 lg:py-16">
            <aside className="hidden lg:block">
              <nav
                aria-label="Inhalt des Leitfadens"
                className="sticky top-28 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[rgba(255,255,255,0.72)] p-5 backdrop-blur"
              >
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                  Im Leitfaden
                </p>
                <ol className="mt-5 grid gap-3 text-sm font-semibold leading-5 text-[rgba(21,21,21,0.62)]">
                  {[
                    ["01", "Was ist ein Nachweis?", "#was-ist-ein-esg-nachweis"],
                    ["02", "Arten von Nachweisen", "#arten-von-nachweisen"],
                    ["04", "Evidence Map", "#evidence-map"],
                    ["05", "Policy vs. Umsetzung", "#policy-und-umsetzung"],
                    ["07", "Berechnungsgrundlage", "#berechnungsgrundlage"],
                    ["09", "Fehlende Nachweise", "#nachweis-neu-erstellen"],
                    ["13", "Interne Struktur", "#nachweise-strukturieren"],
                    ["15", "Plattformen", "#plattformen"],
                    ["16", "Evidence Check", "#evidence-check"],
                    ["18", "Unterstützung", "#externe-unterstuetzung"]
                  ].map(([number, label, href]) => (
                    <li key={href}>
                      <a className="group flex gap-3 transition hover:text-ink" href={href}>
                        <span className="font-mono text-[0.65rem] text-orange">
                          {number}
                        </span>
                        <span>{label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <ArticleSection
                id="was-ist-ein-esg-nachweis"
                number="01"
                title="Was ist überhaupt ein ESG-Nachweis?"
              >
                <p>
                  Ein ESG-Nachweis ist eine Information oder ein Dokument, das
                  eine konkrete Aussage über Ihr Unternehmen unterstützt.
                </p>
                <div className="mt-8 grid gap-4">
                  {[
                    {
                      label: "Zertifizierung",
                      claim: "Unser Unternehmen verfügt über ein zertifiziertes Umweltmanagementsystem.",
                      evidence: "Ein gültiges ISO-14001-Zertifikat für die relevante Gesellschaft beziehungsweise den relevanten Standort."
                    },
                    {
                      label: "Verbrauchsdaten",
                      claim: "Unser Stromverbrauch betrug im Geschäftsjahr 2025 482.000 kWh.",
                      evidence: "Stromrechnungen, Zählerdaten oder eine belastbare Verbrauchsauswertung für den entsprechenden Zeitraum."
                    },
                    {
                      label: "Umsetzung",
                      claim: "Mitarbeitende werden zu einem bestimmten Compliance-Thema geschult.",
                      evidence: "Eine entsprechende interne Regelung zusammen mit geeigneten Schulungs- oder Teilnahmenachweisen."
                    }
                  ].map((example) => (
                    <section
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6"
                      key={example.label}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
                        {example.label}
                      </p>
                      <dl className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[rgba(21,21,21,0.48)]">
                            Aussage
                          </dt>
                          <dd className="mt-2 text-sm leading-6 text-ink">
                            {example.claim}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[rgba(21,21,21,0.48)]">
                            Möglicher Nachweis
                          </dt>
                          <dd className="mt-2 text-sm leading-6 text-ink">
                            {example.evidence}
                          </dd>
                        </div>
                      </dl>
                    </section>
                  ))}
                </div>
                <p className="font-bold text-ink">
                  Es gibt keine universelle Liste von Dokumenten, die jede
                  ESG-Anfrage beantwortet.
                </p>
                <p>Welche Nachweise sinnvoll oder erforderlich sind, hängt immer davon ab:</p>
                <BulletList
                  items={[
                    "was konkret gefragt wird",
                    "welcher Zeitraum betroffen ist",
                    "für welche Gesellschaft oder welchen Standort die Antwort gilt",
                    "und welche Anforderungen der Kunde oder die jeweilige Plattform an den Nachweis stellt"
                  ]}
                />
                <p>
                  Wenn die Kundenanfrage selbst noch unklar ist, hilft unser
                  Leitfaden {" "}
                  <Link className="orange-link" href={QUESTIONNAIRE_GUIDE_HREF}>
                    ESG-Fragebogen vom Kunden erhalten – was jetzt?
                  </Link>
                  {" "}bei der ersten Strukturierung.
                </p>
              </ArticleSection>

              <ArticleSection
                id="arten-von-nachweisen"
                number="02"
                title="Diese Arten von ESG-Nachweisen begegnen Lieferanten besonders häufig."
              >
                <p>
                  Für die interne Vorbereitung hilft es, Nachweise nicht als
                  einen großen Dokumentenordner zu betrachten, sondern in
                  Gruppen zu strukturieren.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {evidenceCategories.map((category, index) => (
                    <section
                      className={`rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 ${
                        index === evidenceCategories.length - 1
                          ? "sm:col-span-2"
                          : ""
                      }`}
                      key={category.title}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <category.icon aria-hidden="true" className="h-5 w-5 text-orange" />
                        <span className="font-mono text-[0.65rem] font-bold tracking-[0.12em] text-[rgba(21,21,21,0.42)]">
                          {category.number}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-ink">
                        {category.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        {category.intro}
                      </p>
                      <BulletList items={category.items} />
                    </section>
                  ))}
                </div>
                <p>
                  EcoVadis nennt beispielsweise unter bestimmten
                  Voraussetzungen Rechnungen, externe Berichte,
                  Trainingszertifikate und andere Third-Party-Unterlagen als
                  mögliche Supporting Documents. Diese Beispiele sind keine
                  universelle Pflichtliste.
                </p>
              </ArticleSection>

              <ArticleSection
                id="dokumenttyp-reicht-nicht"
                number="03"
                title="Nicht jeder richtige Dokumenttyp ist automatisch ein guter Nachweis."
              >
                <p>
                  Nehmen wir an, Ihr Kunde verlangt einen Nachweis für ein
                  Umweltmanagementsystem. Sie haben tatsächlich ein
                  ISO-14001-Zertifikat. Damit ist die Prüfung noch nicht
                  abgeschlossen.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Für wen gilt das Zertifikat?", "Steht darauf die richtige Gesellschaft?"],
                    ["Welcher Standort ist umfasst?", "Deckt es das Werk ab, um das es in der Kundenanfrage geht?"],
                    ["Welcher Scope ist zertifiziert?", "Passt der Geltungsbereich zum Geschäft, auf das sich die Antwort bezieht?"],
                    ["Ist es noch gültig?", "Wann läuft es ab?"],
                    ["Passt es überhaupt zur Frage?", "Belegt das Zertifikat die tatsächlich abgefragte Thematik?"]
                  ].map(([title, body], index) => (
                    <div
                      className={`rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 ${
                        index === 4 ? "sm:col-span-2" : ""
                      }`}
                      key={title}
                    >
                      <h3 className="font-bold text-ink">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                    </div>
                  ))}
                </div>
                <p>
                  IntegrityNext weist ausdrücklich darauf hin, dass ein
                  Zertifikat zur abgefragten Thematik passen muss. Ein
                  Zertifikat für Energiemanagement ist nicht automatisch ein
                  geeigneter Ersatz, wenn Umweltschutz beziehungsweise ein
                  anderes Managementthema abgefragt wird. Bei Unklarheiten oder
                  Widersprüchen kann das Validation Team eine Nachbesserung
                  verlangen.
                </p>
                <Principle>
                  Dokumenttyp + Geltungsbereich + Zeitraum + konkrete Aussage
                  müssen zusammenpassen.
                </Principle>
              </ArticleSection>

              <ArticleSection
                id="evidence-map"
                number="04"
                title="Bauen Sie eine Evidence Map statt eines Dokumentenordners."
              >
                <p>
                  Ein Ordner mit 80 PDFs ist noch keine strukturierte
                  ESG-Dokumentation. Viel hilfreicher ist eine einfache
                  Zuordnung zwischen Aussage und Nachweis.
                </p>
                <EvidenceMap />
                <p>Damit sehen Sie sofort:</p>
                <BulletList
                  items={[
                    "welche Aussage bereits belegt ist",
                    "welcher Nachweis verwendet wird",
                    "für welchen Scope er gilt",
                    "ob er noch aktuell ist",
                    "und wo etwas fehlt"
                  ]}
                />
                <p className="font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.16] text-ink">
                  Ein Evidence Register ist wertvoller als ein Ordner mit
                  Dateinamen, deren Bedeutung niemand mehr kennt.
                </p>
              </ArticleSection>

              <ArticleSection
                id="policy-und-umsetzung"
                number="05"
                title="Eine Policy beweist eine Policy. Nicht automatisch deren Umsetzung."
              >
                <p>
                  Nehmen wir an, Ihr Unternehmen verfügt über eine
                  Antikorruptionsrichtlinie. Damit können Sie möglicherweise
                  belegen, dass das Unternehmen eine formelle
                  Antikorruptionsrichtlinie verabschiedet hat.
                </p>
                <p>Aber wenn die Frage lautet:</p>
                <blockquote className="my-7 rounded-[1rem] border-l-2 border-orange bg-white p-6 font-display text-[clamp(1.55rem,3vw,2.25rem)] leading-[1.2] text-ink">
                  „Werden relevante Mitarbeitende regelmäßig zu Antikorruption
                  geschult?“
                </blockquote>
                <p>
                  ist dieselbe Policy nicht automatisch ausreichender Beleg.
                  Dann können andere Informationen relevant werden:
                </p>
                <BulletList
                  items={[
                    "Schulungsprogramm",
                    "Trainingsunterlagen",
                    "Teilnahmeaufzeichnungen",
                    "Terminübersichten",
                    "interne Kommunikationsnachweise"
                  ]}
                />
                <p>
                  Ähnlich zeigt eine Environmental Policy eine formelle
                  Verpflichtung. Sie beweist nicht automatisch tatsächliche
                  Emissionsreduktionen, erreichte Umweltziele, korrekte
                  Abfalltrennung oder die Umsetzung aller darin genannten
                  Maßnahmen.
                </p>
                <Principle>
                  Commitment und Implementation sind zwei verschiedene Dinge.
                </Principle>
                <p>
                  Das sollte auch Ihre Evidence Map widerspiegeln. Wenn der
                  Kunde konkret eine Environmental Policy verlangt, zeigt der
                  Leitfaden{" "}
                  <Link className="orange-link" href="/de/ressourcen/environmental-policy-erstellen">
                    Policy, Freigabe und Nachweise sauber zu trennen
                  </Link>
                  .
                </p>
                <p>
                  Für Lieferantenanforderungen ist dieselbe Trennung relevant:
                  Der Leitfaden{" "}
                  <Link className="orange-link" href="/de/ressourcen/supplier-code-of-conduct-erstellen">
                    Lieferantenkodex und Umsetzung sauber abgrenzen
                  </Link>{" "}
                  ordnet Supplier Code, Kommunikation, Bestätigung und
                  ergänzende Nachweise ein.
                </p>
              </ArticleSection>

              <ArticleSection
                id="zertifikate-pruefen"
                number="06"
                title="Zertifikate: Vier Dinge sollten Sie vor dem Upload prüfen."
              >
                <p>
                  Zertifikate gehören zu den einfachsten Nachweisen – solange
                  sie wirklich passen.
                </p>
                <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                  {certificateChecks.map((item, index) => (
                    <li
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6"
                      key={item.title}
                    >
                      <span className="font-mono text-xs font-bold text-orange">
                        0{index + 1}
                      </span>
                      <h3 className="mt-4 text-lg font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ol>
                <p>
                  IntegrityNext ermöglicht Lieferanten bei bestimmten
                  Assessments, ein vorhandenes zertifiziertes Managementsystem
                  hochzuladen. Wenn kein entsprechendes Zertifikat vorhanden
                  ist, kann stattdessen der zugehörige Fragebogen beantwortet
                  werden. Das Fehlen eines Zertifikats bedeutet dort also nicht
                  automatisch, dass die Anfrage nicht bearbeitet werden kann.
                </p>
                <p className="font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.16] text-ink">
                  Kein Zertifikat ist besser als ein unpassendes Zertifikat,
                  das etwas anderes suggeriert.
                </p>
              </ArticleSection>

              <ArticleSection
                id="berechnungsgrundlage"
                number="07"
                title="Bei Kennzahlen ist die Berechnungsgrundlage Teil des Nachweises."
              >
                <p>
                  Eine ESG-Kennzahl sollte nicht nur als einzelne Zahl irgendwo
                  stehen. Beispiel:
                </p>
                <div className="my-7 rounded-[1rem] border border-[rgba(254,112,1,0.25)] bg-[var(--soft-orange)] p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                    Ergebnis
                  </p>
                  <p className="font-display mt-3 text-[clamp(2.2rem,5vw,4rem)] leading-none text-ink">
                    Scope 2: 126 t CO₂e
                  </p>
                </div>
                <p>
                  Für eine nachvollziehbare Berechnungsgrundlage sollten –
                  abhängig vom Anwendungsfall – Elemente wie diese erhalten
                  bleiben:
                </p>
                <ol className="mt-8 grid gap-0">
                  {calculationTrail.map((step, index) => (
                    <li
                      className="relative grid grid-cols-[2.8rem_1fr] gap-4 pb-8 last:pb-0"
                      key={step.label}
                    >
                      {index < calculationTrail.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-[1.36rem] top-11 w-px bg-[rgba(254,112,1,0.3)]"
                        />
                      ) : null}
                      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(254,112,1,0.3)] bg-[var(--soft-orange)]">
                        {index < calculationTrail.length - 1 ? (
                          <ArrowDown aria-hidden="true" className="h-4 w-4 text-orange" />
                        ) : (
                          <Check aria-hidden="true" className="h-4 w-4 text-orange" />
                        )}
                      </span>
                      <div className="pt-1">
                        <h3 className="font-bold text-ink">{step.label}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p>
                  So entsteht aus einer Zahl eine nachvollziehbare Kennzahl.
                  Dasselbe Prinzip gilt auch für Energie, Wasser, Abfall,
                  Unfallraten, Mitarbeiterkennzahlen und andere berechnete
                  ESG-KPIs.
                </p>
                <Link
                  className="orange-link mt-7 inline-flex items-center gap-2 text-sm"
                  href="/de/scope-1-2-berechnung"
                >
                  Scope 1 und Scope 2 berechnen
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </ArticleSection>

              <ArticleSection
                id="externe-dokumente"
                number="08"
                title="Auch externe Dokumente können wichtige Nachweise sein."
              >
                <p>
                  Nicht jeder belastbare Nachweis muss eine intern erstellte
                  Richtlinie sein. Manchmal ist gerade ein externes Dokument
                  die beste Quelle.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Energieverbrauch", "Strom- oder Gasrechnung."],
                    ["Entsorgung", "Vertrag, Abrechnung oder Dokumentation eines Entsorgungsdienstleisters."],
                    ["Investition in energieeffiziente Technik", "Rechnung zusammen mit geeigneter Produkt- beziehungsweise Projektdokumentation."],
                    ["Externe Schulung", "Teilnahmebestätigung oder Zertifikat in Verbindung mit der internen Zuordnung."],
                    ["Zertifizierung", "Gültiges Zertifikat beziehungsweise geeignete Dokumentation des Zertifizierungsprozesses."]
                  ].map(([title, body], index) => (
                    <div
                      className={`rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 ${
                        index === 4 ? "sm:col-span-2" : ""
                      }`}
                      key={title}
                    >
                      <h3 className="font-bold text-ink">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Auch EcoVadis unterscheidet ausdrücklich Third-Party-Dokumente
                  und beschreibt, wie solche Unterlagen mit dem Assessment Scope
                  verbunden werden können.
                </p>
                <p className="font-bold text-ink">
                  Nicht die Herkunft entscheidet allein über die Qualität eines
                  Nachweises, sondern wie eindeutig er die konkrete Aussage
                  unterstützt.
                </p>
              </ArticleSection>

              <ArticleSection
                id="nachweis-neu-erstellen"
                number="09"
                title="Kann man einen fehlenden Nachweis einfach neu erstellen?"
              >
                <p>
                  Manchmal ja. Manchmal ausdrücklich nicht in dem Sinn, in dem
                  die Frage gemeint ist. Entscheidend ist der Unterschied
                  zwischen einer realen Praxis, die dokumentiert wird, und
                  einer nicht vorhandenen Praxis, die erfunden wird.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <section className="rounded-[1.05rem] border border-[rgba(254,112,1,0.25)] bg-[var(--soft-orange)] p-6 sm:p-7">
                    <span className="font-mono text-xs font-bold text-orange">
                      BEISPIEL A
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-ink">
                      Die Praxis existiert.
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Das Unternehmen arbeitet bereits nach bestimmten
                      Umweltgrundsätzen. Diese wurden bisher nur nicht formal in
                      einer Environmental Policy dokumentiert.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Dann kann aus der tatsächlichen Unternehmenspraxis ein
                      Entwurf erstellt werden. Dieser muss intern geprüft,
                      gegebenenfalls korrigiert und von einer autorisierten
                      Person ausdrücklich verabschiedet werden.
                    </p>
                    <p className="mt-4 text-sm font-bold leading-7 text-ink">
                      Die Richtlinie existiert ab ihrer tatsächlichen
                      Verabschiedung – nicht rückwirkend seit drei Jahren.
                    </p>
                  </section>
                  <section className="rounded-[1.05rem] border border-[rgba(21,21,21,0.14)] bg-white p-6 sm:p-7">
                    <span className="font-mono text-xs font-bold text-[rgba(21,21,21,0.5)]">
                      BEISPIEL B
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-ink">
                      Die Praxis existiert nicht.
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Das Unternehmen führt keine entsprechenden Maßnahmen
                      durch. Dann sollte keine Policy erstellt werden, die
                      behauptet, diese Maßnahmen seien bereits etabliert.
                    </p>
                  </section>
                </div>
                <div className="mt-7 flex gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.13)] bg-white p-5">
                  <CircleAlert aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-orange" />
                  <p className="text-sm leading-7 text-muted">
                    EcoVadis verlangt für seine Bewertung formalisierten,
                    relevanten und bereits bestehenden Nachweis des tatsächlichen
                    Sustainability Management Systems. Insbesondere werden keine
                    Dokumente akzeptiert, die ausschließlich zur Erfüllung des
                    Fragebogens erstellt oder ohne nachweisbare Umsetzung aus
                    anderen Quellen übernommen wurden.
                  </p>
                </div>
              </ArticleSection>

              <ArticleSection
                id="aktualitaet"
                number="10"
                title="Aktualität: Ein alter Nachweis ist nicht automatisch noch ein guter Nachweis."
              >
                <p>
                  Die Aktualität hängt vom Dokumenttyp und vom Empfänger ab. Ein
                  Zertifikat hat meistens ein eindeutiges Gültigkeitsdatum. Bei
                  anderen Unterlagen ist es weniger offensichtlich.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {["alte Policies", "KPI-Berichte", "Schulungsunterlagen", "Prozessbeschreibungen", "Auditberichte"].map((item) => (
                    <div
                      className="flex items-center gap-3 rounded-[0.9rem] border border-[rgba(21,21,21,0.1)] bg-white p-4 text-sm font-semibold text-ink last:sm:col-span-2"
                      key={item}
                    >
                      <FileClock aria-hidden="true" className="h-4 w-4 shrink-0 text-orange" />
                      {item}
                    </div>
                  ))}
                </div>
                <p>können fachlich oder organisatorisch überholt sein.</p>
                <p>
                  EcoVadis verwendet derzeit für seine eigene
                  Bewertungsmethodik unterschiedliche Zeitgrenzen: Policies und
                  Actions werden grundsätzlich über einen längeren Zeitraum
                  betrachtet, während KPI-Reporting deutlich aktueller sein
                  muss. Die Plattform nennt aktuell acht Jahre für
                  Policies/Actions und zwei Jahre für KPI-Reporting.
                </p>
                <div className="my-7 rounded-[1rem] border-l-2 border-orange bg-[var(--soft-orange)] p-5 text-sm font-bold leading-7 text-ink">
                  Diese Regel ist EcoVadis-spezifisch und sollte nicht pauschal
                  auf jede Kundenanfrage übertragen werden.
                </div>
                <p>
                  Für Ihr internes Evidence Register ist deshalb sinnvoll,
                  nicht nur „Dokument vorhanden“, sondern auch „gültig“,
                  „geprüft bis“ oder „zuletzt aktualisiert“ zu speichern.
                </p>
              </ArticleSection>

              <ArticleSection
                id="wenn-nachweis-fehlt"
                number="11"
                title="Was tun, wenn ein Nachweis fehlt?"
              >
                <p>
                  Nicht sofort ein Dokument erstellen. Zuerst herausfinden,
                  warum er fehlt.
                </p>
                <div className="mt-8 grid gap-4">
                  {[
                    ["Die Praxis existiert und es gibt bereits einen Nachweis.", "Dokument finden."],
                    ["Die Praxis existiert, der Nachweis ist aber veraltet.", "Prüfen, ob eine aktuelle Version existiert beziehungsweise aktualisiert werden muss."],
                    ["Die Praxis existiert, wurde aber nie formal dokumentiert.", "Geeignete Dokumentation kann vorbereitet und intern freigegeben werden."],
                    ["Die Information existiert, benötigt aber eine Bestätigung.", "Zuständige Person einbeziehen."],
                    ["Die Praxis oder Information existiert tatsächlich nicht.", "Gap."]
                  ].map(([situation, action], index) => (
                    <div
                      className="grid gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 sm:grid-cols-[2.2rem_1fr_auto] sm:items-start"
                      key={situation}
                    >
                      <span className="font-mono text-xs font-bold text-orange">
                        0{index + 1}
                      </span>
                      <p className="font-bold leading-7 text-ink">{situation}</p>
                      <span className="max-w-xs rounded-[0.8rem] bg-[var(--soft-orange)] px-3 py-2 text-xs font-bold leading-5 text-[#b94f00]">
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
                <p>
                  Das letzte Ergebnis ist nicht automatisch ein Fehler. Es ist
                  eine Information über den aktuellen Zustand des Unternehmens.
                </p>
                <p className="font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.16] text-ink">
                  Ein sichtbarer Gap ist professioneller als ein Nachweis, der
                  etwas belegen soll, das nicht existiert.
                </p>
              </ArticleSection>

              <ArticleSection
                id="schwache-nachweise"
                number="12"
                title="Welche Dokumente sind oft schwache ESG-Nachweise?"
              >
                <p>
                  Nicht jedes Dokument, das das richtige Schlagwort enthält,
                  ist automatisch belastbar. Besonders vorsichtig sollten Sie
                  bei diesen Unterlagen sein:
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {weakEvidence.map((item, index) => (
                    <div
                      className={`flex gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 ${
                        index === weakEvidence.length - 1 ? "sm:col-span-2" : ""
                      }`}
                      key={item.title}
                    >
                      <CircleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                      <div>
                        <h3 className="font-bold leading-6 text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p>Die richtige Frage lautet nicht: „Können wir etwas hochladen?“</p>
                <Principle>„Belegt dieses Dokument wirklich unsere Antwort?“</Principle>
              </ArticleSection>

              <ArticleSection
                id="nachweise-strukturieren"
                number="13"
                title="So strukturieren Sie Ihre ESG-Nachweise intern."
              >
                <p>
                  Sie brauchen dafür am Anfang keine komplexe Software. Eine
                  einfache Struktur kann bereits viel bewirken.
                </p>
                <div className="mt-8 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <FolderTree aria-hidden="true" className="h-5 w-5 text-orange" />
                    <h3 className="font-bold text-ink">Beispielstruktur</h3>
                  </div>
                  <ul className="mt-6 grid gap-2 font-mono text-sm text-[rgba(21,21,21,0.7)] sm:grid-cols-2">
                    {[
                      "01_Environment",
                      "02_Employees_Health_Safety",
                      "03_Ethics_Compliance",
                      "04_Sustainable_Procurement",
                      "05_GHG_Energy_Data",
                      "06_Certificates",
                      "07_Customer_Requests"
                    ].map((folder) => (
                      <li className="rounded-lg bg-[var(--paper)] px-4 py-3" key={folder}>
                        {folder}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  Innerhalb der Struktur sollten Dokumente eindeutige Dateinamen
                  haben. Statt „scan004_final_neu2.pdf“ besser
                  „ISO14001_Werk-A_gueltig-bis-2027-06.pdf“ oder
                  „Stromverbrauch_Werk-A_2025.xlsx“.
                </p>
                <div className="mt-8 rounded-[1rem] border border-[rgba(254,112,1,0.24)] bg-[var(--soft-orange)] p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <Table2 aria-hidden="true" className="h-5 w-5 text-orange" />
                    <h3 className="font-bold text-ink">Im Evidence Register</h3>
                  </div>
                  <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {[
                      "Dokumentname",
                      "ESG-Thema",
                      "verantwortliche Person",
                      "Gesellschaft",
                      "Standort",
                      "Zeitraum",
                      "Gültigkeit",
                      "letzte interne Prüfung",
                      "unterstützte Aussagen",
                      "verwendete Kunden/Plattformen",
                      "Status"
                    ].map((field) => (
                      <div className="flex gap-3 text-sm leading-6 text-muted" key={field}>
                        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-orange" />
                        {field}
                      </div>
                    ))}
                  </div>
                </div>
                <p>
                  So wird aus einer Ablage eine wiederverwendbare Evidence
                  Library.
                </p>
              </ArticleSection>

              <ArticleSection
                id="nachweise-wiederverwenden"
                number="14"
                title="Derselbe Nachweis kann wiederverwendbar sein – aber nicht blind."
              >
                <p>
                  Ein ISO-Zertifikat ändert sich nicht, nur weil der nächste
                  Kunde einen anderen Fragebogen verwendet. Dasselbe gilt
                  häufig für freigegebene Richtlinien, Emissionsberechnungen,
                  Energieinformationen, Mitarbeiterkennzahlen, Prozesse,
                  Zertifikate und bestimmte Auditunterlagen.
                </p>
                <p>
                  Deshalb lohnt es sich, einmal geprüfte Nachweise strukturiert
                  aufzubewahren. Aber jeder Empfänger kann andere Anforderungen
                  haben: EcoVadis kann andere Dokumentregeln anwenden als
                  IntegrityNext, ein Kunde kann nach einem Werk fragen, der
                  nächste nach der gesamten Unternehmensgruppe.
                </p>
                <Principle>
                  Wiederverwendbare Quelle bedeutet nicht automatisch
                  wiederverwendbare Einreichung.
                </Principle>
                <p>
                  Bei jeder neuen Anfrage sollte erneut geprüft werden: Passt
                  der Nachweis zur konkreten Aussage, zum Scope und zum
                  Zeitraum?
                </p>
              </ArticleSection>

              <ArticleSection
                id="plattformen"
                number="15"
                title="EcoVadis und IntegrityNext gehen unterschiedlich mit Nachweisen um."
              >
                <p>
                  Das ist ein gutes Beispiel dafür, warum Sie Ihre internen
                  ESG-Unterlagen nicht nach nur einer Plattform strukturieren
                  sollten.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <section className="rounded-[1.05rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 sm:p-7">
                    <BadgeCheck aria-hidden="true" className="h-5 w-5 text-orange" />
                    <h3 className="font-display mt-5 text-3xl text-ink">EcoVadis</h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Bei der vollständigen EcoVadis-Bewertung spielen
                      Supporting Documents eine zentrale Rolle. EcoVadis
                      beschreibt die Bewertung als evidence-based und
                      berücksichtigt Antworten auf Basis geeigneter Supporting
                      Documentation. Dokumente sollen unter anderem relevant,
                      aktuell, vollständig und dem Assessment Scope zuzuordnen
                      sein.
                    </p>
                    <Link
                      className="orange-link mt-6 inline-flex items-center gap-2 text-sm"
                      href="/de/ecovadis-unterstuetzung"
                    >
                      EcoVadis-Unterstützung
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </section>
                  <section className="rounded-[1.05rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 sm:p-7">
                    <FileBadge2 aria-hidden="true" className="h-5 w-5 text-orange" />
                    <h3 className="font-display mt-5 text-3xl text-ink">IntegrityNext</h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Bei bestimmten IntegrityNext-Assessments kann ein
                      passendes Zertifikat für ein zertifiziertes
                      Managementsystem hochgeladen werden. Existiert kein
                      entsprechendes Zertifikat, kann stattdessen der jeweilige
                      Fragebogen beantwortet werden. IntegrityNext prüft
                      eingehende Antworten und Dokumente und kann bei
                      Unklarheiten oder Widersprüchen Nachbesserungen verlangen.
                    </p>
                    <Link
                      className="orange-link mt-6 inline-flex items-center gap-2 text-sm"
                      href="/de/integritynext-unterstuetzung"
                    >
                      IntegrityNext-Unterstützung
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                    <p className="mt-5 text-sm leading-7 text-muted">
                      Den vollständigen Ablauf nach einer Kundeneinladung
                      erklären wir im Leitfaden{" "}
                      <Link
                        className="orange-link"
                        href="/de/ressourcen/integritynext-einladung-lieferanten"
                      >
                        IntegrityNext für Lieferanten
                      </Link>
                      .
                    </p>
                  </section>
                </div>
                <div className="mt-7 rounded-[1rem] border border-[rgba(254,112,1,0.25)] bg-[var(--soft-orange)] p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
                    Die praktische Konsequenz
                  </p>
                  <p className="mt-4 text-lg font-bold leading-8 text-ink">
                    Bauen Sie Ihre interne Evidence-Struktur um die
                    Unternehmensrealität herum. Nicht um EcoVadis. Nicht um
                    IntegrityNext. Nicht um den Fragebogen von Kunde A.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    Dann können dieselben belastbaren Quellen später für
                    unterschiedliche Anforderungen passend zugeordnet werden.
                  </p>
                </div>
                <p>
                  Welche Supporting Documents Sie innerhalb der
                  plattformspezifischen Regeln priorisieren sollten, zeigt unser {" "}
                  <Link
                    className="orange-link"
                    href="/de/ressourcen/ecovadis-dokumente-nachweise"
                  >
                    Leitfaden zu EcoVadis-Dokumenten und Nachweisen
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection
                id="evidence-check"
                number="16"
                title="Ein einfacher Evidence Check vor jeder Einreichung."
              >
                <p>
                  Bevor Sie einen Nachweis an einen Kunden oder eine Plattform
                  senden, stellen Sie sich diese Fragen:
                </p>
                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  {evidenceChecks.map(([term, description]) => (
                    <div
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
                      key={term}
                    >
                      <dt className="flex items-center gap-3 font-bold text-ink">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--soft-orange)]">
                          <Check aria-hidden="true" className="h-3.5 w-3.5 text-orange" />
                        </span>
                        {term}
                      </dt>
                      <dd className="mt-3 text-sm leading-6 text-muted">
                        {description}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p>
                  Wenn eine dieser Fragen nicht klar beantwortet werden kann,
                  sollte der Nachweis vor der Einreichung noch einmal geprüft
                  werden.
                </p>
                <Link
                  className="orange-link mt-7 inline-flex items-center gap-2 text-sm"
                  href="/de/ressourcen/esg-nachweise-checkliste"
                >
                  Einzelnen Nachweis mit der interaktiven Checkliste prüfen
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </ArticleSection>

              <ArticleSection
                id="nach-dem-evidence-pack"
                number="17"
                title="Was nach dem ersten Evidence Pack passiert."
              >
                <p>
                  Die erste strukturierte Sammlung kostet am meisten Zeit.
                  Danach beginnt der eigentliche Vorteil.
                </p>
                <div className="my-8 grid gap-3 font-mono text-sm sm:grid-cols-3">
                  {[
                    "Wo war noch einmal unsere ISO 14001?",
                    "Welche Zahl haben wir letztes Mal für Scope 2 verwendet?",
                    "Welche Version des Code of Conduct haben wir dem Kunden geschickt?"
                  ].map((question) => (
                    <blockquote
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 leading-6 text-[rgba(21,21,21,0.68)]"
                      key={question}
                    >
                      „{question}“
                    </blockquote>
                  ))}
                </div>
                <p>Stattdessen haben Sie:</p>
                <BulletList
                  items={[
                    "geprüfte Quellen",
                    "dokumentierte Gültigkeiten",
                    "bekannte Verantwortliche",
                    "klare Datenzeiträume",
                    "wiederverwendbare Berechnungen",
                    "und bekannte Gaps"
                  ]}
                />
                <p className="font-display text-[clamp(1.75rem,3vw,2.45rem)] leading-[1.16] text-ink">
                  Der Wert einer guten Evidence-Struktur liegt darin, dass die
                  nächste Anfrage nicht wieder bei null beginnt.
                </p>
              </ArticleSection>

              <ArticleSection
                id="externe-unterstuetzung"
                number="18"
                title="Wann externe Unterstützung sinnvoll wird."
              >
                <p>
                  Ein einzelnes Zertifikat zu finden, erfordert normalerweise
                  keine ESG-Beratung. Unterstützung wird interessanter, wenn:
                </p>
                <BulletList
                  items={[
                    "ein umfangreicher Fragebogen viele Nachweise verlangt",
                    "mehrere Abteilungen beteiligt sind",
                    "unklar ist, welche Dokumente welche Aussagen tatsächlich stützen",
                    "EcoVadis oder IntegrityNext vorbereitet werden",
                    "Emissionsberechnungen fehlen",
                    "Policies noch nicht formalisiert sind",
                    "verschiedene Gesellschaften oder Standorte betroffen sind",
                    "oder Sie aus verstreuten Dokumenten eine wiederverwendbare Evidence-Struktur aufbauen möchten"
                  ]}
                />
                <p>
                  Dann liegt die eigentliche Arbeit nicht im Hochladen von
                  PDFs. Sie liegt in der Zuordnung:
                </p>
                <Principle>
                  Anforderung → Unternehmensinformation → Nachweis → Gap →
                  Freigabe
                </Principle>
                <p>
                  Wie Evipace diese Zuordnung prüft, beschreibt auch {" "}
                  <Link className="orange-link" href="/de/methodology">
                    Unsere Methodik
                  </Link>
                  . Für den Ausgangspunkt einer Kundenanforderung finden Sie
                  weitere Hinweise unter {" "}
                  <Link className="orange-link" href="/de/esg-kundenanfragen">
                    ESG-Anforderungen von Kunden
                  </Link>
                  .
                </p>
              </ArticleSection>

              <section
                aria-labelledby="article-cta-title"
                className="my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12"
              >
                <FileText aria-hidden="true" className="h-7 w-7 text-orange" />
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                  Ihr nächster Schritt
                </p>
                <h2
                  className="font-display mt-5 max-w-[14ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]"
                  id="article-cta-title"
                >
                  Die Antworten sind da. Die Nachweise liegen überall?
                </h2>
                <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-white/68">
                  <p>
                    Senden Sie uns die ESG-Anfrage, den Fragebogen und die
                    Unterlagen, die bereits vorhanden sind.
                  </p>
                  <p>
                    Wir strukturieren, welche Aussagen welche Nachweise
                    benötigen, welche Dokumente bereits passen und wo noch
                    Informationen oder belastbare Evidence fehlen.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>
                    ESG-Anfrage senden
                  </ButtonLink>
                  <ButtonLink
                    className="w-full sm:w-auto"
                    href="/de/esg-fragebogen-lieferanten"
                    variant="light"
                  >
                    Unterstützung bei ESG-Fragebögen
                  </ButtonLink>
                </div>
                <p className="mt-6 text-sm font-semibold text-white/50">
                  Zertifikate · Richtlinien · Berechnungen · Nachweise · Daten
                </p>
              </section>

              <section
                aria-labelledby="faq-title"
                className="scroll-mt-24 border-t border-[rgba(21,21,21,0.12)] py-16"
                id="faq"
              >
                <p className="eyebrow">FAQ</p>
                <h2
                  className="font-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-none"
                  id="faq-title"
                >
                  Häufige Fragen zu ESG-Nachweisen
                </h2>
                <div className="mt-9 grid gap-3">
                  {faqItems.map((faq) => (
                    <details
                      className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white px-5 py-5 sm:px-6"
                      key={faq.question}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold leading-6 text-ink marker:content-none">
                        {faq.question}
                        <span
                          aria-hidden="true"
                          className="text-2xl font-light text-orange transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              <section
                aria-labelledby="sources-title"
                className="border-t border-[rgba(21,21,21,0.12)] pb-16 pt-12"
              >
                <div className="flex items-center gap-3">
                  <Link2 aria-hidden="true" className="h-4 w-4 text-orange" />
                  <h2
                    className="text-sm font-bold uppercase tracking-[0.12em] text-ink"
                    id="sources-title"
                  >
                    Quellen &amp; weiterführende Informationen
                  </h2>
                </div>
                <ul className="mt-6 grid gap-6 text-sm leading-6 text-muted">
                  <li>
                    <ExternalSourceLink href={ECOVADIS_DOCUMENTS_URL}>
                      EcoVadis Help Center — Understanding supporting documents
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Offizielle Regeln zu Relevanz, Aktualität, Assessment
                      Scope und Integrität von Supporting Documents.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={ECOVADIS_THIRD_PARTY_URL}>
                      EcoVadis Help Center — How should I submit third-party
                      documents?
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Regeln und Beispiele für externe beziehungsweise
                      Third-Party-Evidence.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={INTEGRITYNEXT_ASSESSMENT_URL}>
                      IntegrityNext Help Center — How do I answer / complete the
                      assessment?
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Offizielle Erläuterung zum Ansatz Zertifikat oder
                      Fragebogen.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={INTEGRITYNEXT_VALIDATION_URL}>
                      IntegrityNext Helpdesk — Nachbesserungsbedarf
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Informationen zum Validation-Prozess, zur thematischen
                      Passung von Zertifikaten und zum Umgang mit Unklarheiten.
                    </p>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
