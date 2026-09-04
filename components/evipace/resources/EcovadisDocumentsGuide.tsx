import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  CircleAlert,
  ExternalLink,
  FileBadge2,
  FileCheck2,
  FileSearch,
  FileStack,
  FileText,
  Gauge,
  Link2,
  ListChecks,
  ScanText,
  ShieldCheck,
  Table2
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";

const SUPPORTING_DOCUMENTS_URL =
  "https://support.ecovadis.com/hc/de/articles/210460307-Kenntnisse-%C3%BCber-belegende-Dokumente";
const DOCUMENT_LIMIT_URL =
  "https://support.ecovadis.com/hc/de/articles/115002646148-Warum-ist-die-Anzahl-der-Dokumente-die-eingereicht-werden-k%C3%B6nnen-begrenzt";
const MACHINE_READABLE_URL =
  "https://support.ecovadis.com/hc/de/articles/28380694175890-Vorbereitung-maschinenlesbarer-Dokumente-f%C3%BCr-Ihre-EcoVadis-Bewertung";
const THIRD_PARTY_URL =
  "https://support.ecovadis.com/hc/de/articles/19091385747346-Wie-sollte-ich-Dokumente-von-Dritten-absenden";
const METHODOLOGY_UPDATES_URL =
  "https://support.ecovadis.com/hc/de/articles/34621845310994-Aktualisierungen-der-Methodik-im-Q1-2026";
const ASSESSMENT_SCOPE_URL =
  "https://support.ecovadis.com/hc/de/articles/210459737-Verst%C3%A4ndnis-des-Bewertungsrahmens";
const PREVIOUS_DOCUMENTS_URL =
  "https://support.ecovadis.com/hc/de/articles/360017254660-Kann-ich-Dokumente-von-vorherigen-Bewertungen-l%C3%B6schen";

const quickChecks = [
  {
    title: "Gehört das Dokument zum richtigen Assessment Scope?",
    body: "Gesellschaft, Gruppe oder Standort müssen zur konkreten EcoVadis-Bewertung passen."
  },
  {
    title: "Belegt das Dokument genau die ausgewählte Antwort?",
    body: "Ein Dokument sollte nicht nur thematisch ähnlich sein. Es sollte die konkrete Aussage tatsächlich unterstützen."
  },
  {
    title: "Ist es ein realer Bestandteil Ihres Managementsystems?",
    body: "Ein Nachweis sollte bereits vorhandene Unternehmenspraxis dokumentieren – nicht erst für eine bessere Antwort erfunden werden."
  },
  {
    title: "Ist er noch aktuell?",
    body: "Für verschiedene Dokumenttypen gelten unterschiedliche Aktualitätsanforderungen."
  },
  {
    title: "Ist das Dokument formal und nachvollziehbar?",
    body: "Unternehmensbezug, Datum, Inhalt und Geltungsbereich sollten dort erkennbar sein, wo sie relevant sind."
  },
  {
    title: "Ist die Datei gut lesbar?",
    body: "Wo möglich, sollten Dokumente als digitaler, maschinenlesbarer Text vorliegen."
  },
  {
    title: "Ist dieses Dokument wirklich einer Ihrer besten 55 Uploads?",
    body: "Bei EcoVadis ist nicht die Menge entscheidend. Relevanz schlägt Dokumentenmenge."
  }
];

const documentGroups = [
  {
    icon: ShieldCheck,
    title: "Richtlinien",
    items: [
      "Environmental Policy",
      "Health & Safety Policy",
      "Human Rights Policy",
      "Code of Ethics / Code of Conduct",
      "Sustainable Procurement Policy",
      "andere relevante Unternehmensrichtlinien"
    ]
  },
  {
    icon: FileBadge2,
    title: "Zertifikate",
    items: [
      "ISO 14001",
      "ISO 45001",
      "ISO 27001",
      "weitere relevante und anerkannte Zertifizierungen"
    ]
  },
  {
    icon: ListChecks,
    title: "Verfahren und Maßnahmen",
    items: [
      "Umweltverfahren",
      "Compliance-Prozesse",
      "Risikobewertungen",
      "Schulungsprogramme",
      "Beschaffungsprozesse",
      "konkrete dokumentierte Maßnahmen"
    ]
  },
  {
    icon: FileStack,
    title: "Berichte",
    items: [
      "Nachhaltigkeitsbericht",
      "Jahresbericht mit Nachhaltigkeitsinformationen",
      "HSE-Bericht",
      "Social-Audit-Bericht",
      "externe Auditberichte",
      "KPI-Berichte"
    ]
  },
  {
    icon: Gauge,
    title: "Datengrundlagen und Reporting",
    items: [
      "Energiekennzahlen",
      "Scope-1- und Scope-2-Reporting",
      "Wasser- und Abfallkennzahlen",
      "Arbeitssicherheitskennzahlen",
      "andere relevante ESG-KPIs"
    ]
  },
  {
    icon: FileCheck2,
    title: "Dokumente Dritter",
    items: [
      "Rechnungen",
      "Serviceverträge",
      "gesetzlich vorgeschriebene Berichte",
      "externe Schulungsnachweise",
      "andere geeignete Third-Party-Dokumente"
    ]
  }
];

const evidenceMapRows = [
  ["Environment", "Umweltpolitik vorhanden", "Environmental Policy", "Unternehmen", "aktuell", "bereit"],
  ["Environment", "ISO 14001", "Zertifikat", "Werk A", "gültig", "bereit"],
  ["Environment", "Scope 2 berichtet", "GHG Reporting", "Unternehmen", "2025", "prüfen"],
  ["Labor & Human Rights", "H&S Policy", "H&S Policy", "Unternehmen", "aktuell", "bereit"],
  ["Ethics", "Antikorruptionsrichtlinie", "Anti-Corruption Policy", "Unternehmen", "aktuell", "bereit"],
  ["Sustainable Procurement", "Lieferantenanforderungen", "Supplier Code", "Unternehmen", "aktuell", "prüfen"]
] as const;

const registerRows = [
  ["Umweltpolitik", "Environment", "Environmental Policy", "1–3", "Unternehmen", "aktuell", "bereit"],
  ["ISO 14001", "Environment", "Zertifikat", "1", "Werk A", "gültig", "bereit"],
  ["Scope 1", "Environment", "GHG Report", "8–10", "Unternehmen", "2025", "bereit"],
  ["Arbeitssicherheit", "Labor & Human Rights", "H&S Policy", "1–5", "Unternehmen", "aktuell", "bereit"],
  ["Antikorruption", "Ethics", "Code of Conduct", "7–9", "Unternehmen", "aktuell", "bereit"],
  ["Supplier Code", "Sustainable Procurement", "Supplier Code", "1–6", "Unternehmen", "aktuell", "prüfen"]
] as const;

const prioritisation = [
  ["Scope", "Passt das Dokument wirklich zum bewerteten Unternehmen beziehungsweise Standort?"],
  ["Relevanz", "Unterstützt es eine konkrete ausgewählte Antwort?"],
  ["Glaubwürdigkeit", "Ist es formal, authentisch und Teil des tatsächlichen Managementsystems?"],
  ["Aktualität", "Ist es innerhalb der relevanten EcoVadis-Regeln noch nutzbar und fachlich aktuell?"],
  ["Abdeckung", "Wie viel der relevanten Unternehmensrealität beziehungsweise des Assessment Scope deckt es ab?"],
  ["Informationsdichte", "Kann ein echtes bestehendes Dokument mehrere relevante Aussagen sauber belegen?"],
  ["Lesbarkeit", "Kann der relevante Inhalt schnell und eindeutig gefunden werden?"]
];

const faqItems = [
  {
    question: "Wie viele Dokumente kann man bei EcoVadis hochladen?",
    answer:
      "Für das Sustainability Rating gilt derzeit ein Limit von 55 neuen Dokumenten pro Assessment. Dokumente aus früheren Assessments zählen nicht zu diesem neuen Kontingent, können aber weiterhin berücksichtigt werden, solange sie gültig sind."
  },
  {
    question: "Kann ein Dokument mehrere EcoVadis-Antworten belegen?",
    answer:
      "Ja. Ein echtes bestehendes Dokument kann mehreren passenden Antwortoptionen zugeordnet werden, wenn es die jeweiligen Aussagen tatsächlich unterstützt. EcoVadis nennt konsolidierte Sustainability Reports als Beispiel für Dokumente, die mehrere relevante Informationen enthalten können."
  },
  {
    question: "Kann ich mehrere Nachweise in einer PDF zusammenfügen?",
    answer:
      "Nicht einfach, um das 55-Dokumente-Limit zu umgehen. EcoVadis akzeptiert künstlich kombinierte Dokumente aus mehreren eigenständigen Unterlagen nicht als entsprechende Evidence-Strategie. Ein echter, bereits bestehender konsolidierter Unternehmensbericht ist davon zu unterscheiden."
  },
  {
    question: "Wie alt dürfen EcoVadis-Dokumente sein?",
    answer:
      "Nach aktuell veröffentlichten Regeln gelten für Policies und Actions grundsätzlich bis zu acht Jahre, für KPI-/Results-Reporting bis zu zwei Jahre. Zusätzlich sollte immer geprüft werden, ob das Dokument das Unternehmen noch sachlich korrekt widerspiegelt."
  },
  {
    question: "Kann ich eine fehlende Policy für EcoVadis neu erstellen?",
    answer:
      "Ein Unternehmen kann selbstverständlich eine neue Richtlinie einführen, wenn diese seine tatsächlichen Entscheidungen und Praktiken widerspiegelt und intern ordnungsgemäß verabschiedet wird. Sie sollte jedoch nicht als bereits bestehender historischer Nachweis dargestellt oder ausschließlich als künstlicher Beleg für den Fragebogen erstellt werden."
  },
  {
    question: "Müssen EcoVadis-Dokumente auf Englisch sein?",
    answer:
      "Nicht zwingend. EcoVadis nennt unter anderem Englisch, Französisch, Spanisch, Deutsch, Chinesisch und Japanisch als Sprachen, bei denen Dokumente textbasiert verarbeitet werden können. Bei anderen Sprachen ist insbesondere die maschinenlesbare Textdarstellung wichtig."
  },
  {
    question: "Zählen Scans als Dokumente?",
    answer:
      "Sie können technisch Dokumente darstellen, aber EcoVadis empfiehlt maschinenlesbare Inhalte. Nicht maschinenlesbare Scans oder Fotos können bei automatischer Extraktion und Übersetzung problematisch sein. Wenn eine digitale, textbasierte Version verfügbar ist, ist diese deshalb vorzuziehen."
  },
  {
    question: "Kann Evipace garantieren, dass EcoVadis unsere Dokumente akzeptiert?",
    answer:
      "Nein. Die finale Bewertung und Anerkennung von Nachweisen liegt bei EcoVadis. Evipace kann bei Strukturierung, Zuordnung, Vorbereitung und Review der Unterlagen unterstützen, garantiert aber weder die Anerkennung einzelner Dokumente noch eine bestimmte Punktzahl, Medaille oder Bewertung."
  }
];

function ExternalSourceLink({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] decoration-1 underline-offset-4 transition hover:text-orange"
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
          <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
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
        <span className="mt-1 font-mono text-xs font-bold tracking-[0.15em] text-orange">{number}</span>
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

function Principle({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="my-8 rounded-[1.1rem] bg-ink p-7 text-white sm:p-8">
      {label ? (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">{label}</p>
      ) : null}
      <p className={`font-display text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.1] ${label ? "mt-4" : ""}`}>
        {children}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] ${
        status === "prüfen"
          ? "border-[rgba(21,21,21,0.16)] bg-[rgba(21,21,21,0.05)] text-ink"
          : "border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] text-[#b94f00]"
      }`}
    >
      {status}
    </span>
  );
}

function EvidenceMap() {
  const fields = ["Aussage / Option", "Dokument", "Scope", "Aktualität"];

  return (
    <div className="mt-8" data-ecovadis-evidence-map>
      <div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] border-collapse text-left text-sm">
            <caption className="sr-only">Beispiel einer EcoVadis Evidence Map mit Thema, Aussage, Dokument, Scope, Aktualität und Status</caption>
            <thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]">
              <tr>
                {["EcoVadis-Thema", ...fields, "Status"].map((heading) => (
                  <th className="border-b border-[rgba(21,21,21,0.12)] px-4 py-4 font-bold" key={heading} scope="col">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evidenceMapRows.map((row) => (
                <tr className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0" key={`${row[0]}-${row[1]}`}>
                  <th className="px-4 py-5 font-bold text-ink" scope="row">{row[0]}</th>
                  {row.slice(1, 5).map((value, index) => (
                    <td className="px-4 py-5 text-muted" key={`${value}-${index}`}>{value}</td>
                  ))}
                  <td className="px-4 py-5"><StatusPill status={row[5]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:hidden">
        {evidenceMapRows.map((row) => (
          <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_10px_30px_rgba(21,21,21,0.035)]" key={`${row[0]}-${row[1]}`}>
            <div className="flex items-start justify-between gap-3 border-b border-[rgba(21,21,21,0.1)] pb-4">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-orange">{row[0]}</p>
                <h3 className="mt-2 font-bold text-ink">{row[1]}</h3>
              </div>
              <StatusPill status={row[5]} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              {fields.slice(1).map((label, index) => (
                <div className="grid grid-cols-[6.5rem_1fr] gap-3" key={label}>
                  <dt className="font-semibold text-[rgba(21,21,21,0.56)]">{label}</dt>
                  <dd className="min-w-0 break-words text-ink">{row[index + 2]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function EvidenceRegister() {
  const fields = ["Thema", "Dokument", "relevante Seite", "Scope", "Aktualität"];

  return (
    <div className="mt-8" data-ecovadis-evidence-register>
      <div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1010px] border-collapse text-left text-sm">
            <caption className="sr-only">Beispiel eines EcoVadis Evidence Registers mit Frage, Thema, Dokument, relevanter Seite, Scope, Aktualität und Status</caption>
            <thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]">
              <tr>
                {["Frage / Option", ...fields, "Status"].map((heading) => (
                  <th className="border-b border-[rgba(21,21,21,0.12)] px-4 py-4 font-bold" key={heading} scope="col">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {registerRows.map((row) => (
                <tr className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0" key={row[0]}>
                  <th className="px-4 py-5 font-bold text-ink" scope="row">{row[0]}</th>
                  {row.slice(1, 6).map((value, index) => (
                    <td className="px-4 py-5 text-muted" key={`${value}-${index}`}>{value}</td>
                  ))}
                  <td className="px-4 py-5"><StatusPill status={row[6]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:hidden">
        {registerRows.map((row) => (
          <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5" key={row[0]}>
            <div className="flex items-start justify-between gap-3 border-b border-[rgba(21,21,21,0.1)] pb-4">
              <h3 className="font-bold text-ink">{row[0]}</h3>
              <StatusPill status={row[6]} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              {fields.map((label, index) => (
                <div className="grid grid-cols-[6.5rem_1fr] gap-3" key={label}>
                  <dt className="font-semibold text-[rgba(21,21,21,0.56)]">{label}</dt>
                  <dd className="min-w-0 break-words text-ink">{row[index + 1]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function DocumentsArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art">
      <svg className="resource-hero-art__sheet" fill="none" viewBox="0 0 520 650" xmlns="http://www.w3.org/2000/svg">
        <path d="M96 58H359L446 145V587H96V58Z" fill="currentColor" fillOpacity="0.018" stroke="currentColor" strokeWidth="2" />
        <path d="M359 58V145H446" stroke="currentColor" strokeWidth="2" />
        <path d="M68 88H331L418 175V617H68V88Z" fill="currentColor" fillOpacity="0.025" stroke="currentColor" strokeWidth="2" />
        <path d="M331 88V175H418" stroke="currentColor" strokeWidth="2" />
        <text fill="currentColor" fontFamily="GFS Didot, Georgia, serif" fontSize="132" x="126" y="357">55</text>
        <path d="M126 406H357M126 438H334M126 470H369M126 502H301" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2" x="126" y="137">DOCUMENT SLOTS</text>
      </svg>
      <span className="resource-hero-art__code">SCOPE · RELEVANCE · EVIDENCE</span>
    </div>
  );
}

export function EcovadisDocumentsGuide() {
  return (
    <>

      <main id="top">
        <article>
          <header aria-labelledby="article-title" className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
            <DocumentsArtwork />
            <div className="site-shell relative z-10">
              <nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]">
                <Link className="transition hover:text-orange" href="/de">Startseite</Link>
                <span aria-hidden="true">/</span>
                <Link className="transition hover:text-orange" href="/de/ressourcen">
                  Ressourcen
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-ink">EcoVadis-Dokumente</span>
              </nav>

              <div className="mt-12 max-w-6xl">
                <p className="eyebrow">EcoVadis · Dokumente &amp; Nachweise</p>
                <h1 className="font-display mt-7 max-w-[16ch] text-[clamp(3.15rem,7vw,6.55rem)] leading-[0.91]" id="article-title">
                  EcoVadis-Dokumente und Nachweise: Was zählt als Beleg?
                </h1>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.6fr)] lg:items-start lg:gap-16">
                <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                  <p>Beim EcoVadis-Fragebogen reicht es nicht, die richtige Antwort zu kennen.</p>
                  <p className="mt-6">Entscheidend ist häufig auch:</p>
                  <p className="font-display mt-4 text-3xl leading-tight text-ink">Können Sie die Antwort mit einem geeigneten Dokument belegen?</p>
                  <div className="mt-7 flex flex-wrap gap-x-3 gap-y-2 text-sm font-bold text-[rgba(21,21,21,0.62)]">
                    {["Richtlinie", "Zertifikat", "Auditbericht", "KPI-Auswertung", "Nachhaltigkeitsbericht", "Rechnung"].map((item) => (
                      <span className="rounded-full border border-[rgba(21,21,21,0.13)] bg-white px-3 py-1.5" key={item}>{item}</span>
                    ))}
                  </div>
                  <p className="mt-7">Aber nicht jedes Dokument, das thematisch passend aussieht, wird automatisch zu einem guten EcoVadis-Nachweis.</p>
                </div>

                <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.76)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                  <span className="font-display text-[5.5rem] leading-none text-orange">55</span>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-orange">neue Dokumente pro Assessment</p>
                  <p className="mt-6 border-t border-[rgba(21,21,21,0.1)] pt-5 leading-7 text-muted">
                    Eine gute Dokumentenstrategie ist wichtiger als möglichst viele Uploads. Jede Datei sollte einen klaren Zweck haben.
                  </p>
                </aside>
              </div>

              <div className="mt-14 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9">
                <div className="grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:gap-12">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-orange">Evidence first</span>
                    <p className="font-display mt-4 text-3xl leading-[1.08]">Dokumente sollen das tatsächliche Managementsystem widerspiegeln.</p>
                  </div>
                  <p className="self-center text-lg leading-8 text-muted">
                    EcoVadis bewertet dokumentenbasiert. Die Unterlagen sollten zur konkreten Antwort und zum richtigen Bewertungsumfang passen. Dieser Leitfaden zeigt, welche Dokumente sinnvoll sein können und wie Sie sie auswählen.
                  </p>
                </div>
              </div>
            </div>
          </header>

          <section aria-labelledby="quick-answer-title" className="scroll-mt-24 bg-ink py-20 text-white sm:py-24" id="schnellantwort">
            <div className="site-shell">
              <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
                <div>
                  <p className="eyebrow">Quick Answer</p>
                  <h2 className="font-display mt-6 max-w-[13ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]" id="quick-answer-title">
                    Welche EcoVadis-Dokumente sollten Sie zuerst vorbereiten?
                  </h2>
                  <p className="mt-7 max-w-sm leading-7 text-white/65">Bevor Sie Dateien hochladen, prüfen Sie sieben Dinge.</p>
                </div>
                <ol className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {quickChecks.map((check, index) => (
                    <li className={index === quickChecks.length - 1 ? "border-t border-white/20 pt-5 sm:col-span-2" : "border-t border-white/20 pt-5"} key={check.title}>
                      <div className="flex gap-4">
                        <span className="font-mono text-xs font-bold tracking-[0.13em] text-orange">{index + 1} —</span>
                        <div>
                          <h3 className="font-bold leading-6 text-white">{check.title}</h3>
                          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">{check.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-14 border-t border-white/15 pt-9">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">Die Grundregel</p>
                <p className="font-display mt-5 text-[clamp(2.2rem,5vw,4.5rem)] leading-none">Relevanz schlägt Dokumentenmenge.</p>
              </div>
            </div>
          </section>

          <div className="site-shell grid items-start gap-12 py-10 lg:grid-cols-[15rem_minmax(0,55rem)] lg:justify-center lg:gap-16 lg:py-16">
            <aside className="hidden lg:block">
              <nav aria-label="Inhalt des Leitfadens" className="sticky top-28 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[rgba(255,255,255,0.72)] p-5 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Im Leitfaden</p>
                <ol className="mt-5 grid gap-3 text-sm font-semibold leading-5 text-[rgba(21,21,21,0.62)]">
                  {[
                    ["01", "Warum Dokumente?", "#warum-dokumente"],
                    ["03", "Assessment Scope", "#assessment-scope"],
                    ["04", "Evidence Map", "#antwort-dokument"],
                    ["05", "55-Dokumente-Limit", "#dokumentenlimit"],
                    ["08", "Richtlinien", "#richtlinien"],
                    ["11", "Methodik 2026", "#zertifikate-2026"],
                    ["14", "Machine-readable", "#machine-readable"],
                    ["16", "Evidence Register", "#evidence-register"],
                    ["17", "Nicht hochladen", "#nicht-hochladen"],
                    ["22", "Unterstützung", "#externe-unterstuetzung"]
                  ].map(([number, label, href]) => (
                    <li key={href}><a className="group flex gap-3 transition hover:text-ink" href={href}><span className="font-mono text-[0.65rem] text-orange">{number}</span><span>{label}</span></a></li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <ArticleSection id="warum-dokumente" number="01" title="Warum Dokumente bei EcoVadis so wichtig sind.">
                <p>EcoVadis bewertet nicht ausschließlich die Antworten, die Sie im Fragebogen anklicken.</p>
                <p>Supporting Documents sind ein zentraler Bestandteil des Ratings.</p>
                <p>
                  EcoVadis erklärt ausdrücklich, dass Antworten nur dann entsprechend berücksichtigt werden können, wenn geeignete Dokumentation sie unterstützt. Die Unterlagen werden von Sustainability Analysts zusammen mit den Antworten analysiert.
                </p>
                <p>Das verändert die Art, wie Sie den Fragebogen vorbereiten sollten.</p>
                <div className="my-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[rgba(21,21,21,0.45)]">Nicht</p>
                    <p className="mt-4 font-mono text-sm leading-7 text-muted">Frage lesen → bestmögliche Antwort auswählen → später nach Dokument suchen</p>
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Sondern</p>
                    <p className="mt-4 font-mono text-sm font-bold leading-7 text-ink">Frage → tatsächliche Unternehmenspraxis → Dokument → passende Antwortoption</p>
                  </div>
                </div>
                <p>
                  Das reduziert das Risiko, eine Aussage auszuwählen, die intern zwar plausibel klingt, aber nicht belastbar dokumentiert werden kann. Wenn Sie den Fragebogen gerade erst erhalten haben, hilft zunächst {" "}
                  <Link className="orange-link" href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">ESG-Fragebogen vom Kunden erhalten – was jetzt?</Link>
                  {" "}bei der allgemeinen Arbeitsstruktur.
                </p>
              </ArticleSection>

              <ArticleSection id="dokumenttypen" number="02" title="Was kann grundsätzlich als EcoVadis-Nachweis dienen?">
                <p>
                  Es gibt keine einzelne universelle EcoVadis-Dokumentenliste, die für jedes Unternehmen gleich ist. Der Fragebogen wird unter anderem anhand von Unternehmensgröße, Branche und Standort angepasst.
                </p>
                <p>Typische formalisierte Dokumente können jedoch beispielsweise sein:</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {documentGroups.map((group) => (
                    <section className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={group.title}>
                      <group.icon aria-hidden="true" className="h-5 w-5 text-orange" />
                      <h3 className="mt-5 text-lg font-bold text-ink">{group.title}</h3>
                      <BulletList items={group.items} />
                    </section>
                  ))}
                </div>
                <p className="font-bold text-ink">Entscheidend ist nicht der Dateityp allein, sondern was das Dokument tatsächlich belegt.</p>
                <p>
                  Die allgemeinen Qualitätskriterien dahinter erläutert unser Leitfaden zu {" "}
                  <Link className="orange-link" href="/de/ressourcen/esg-nachweise-lieferanten">ESG-Nachweisen für Lieferanten</Link>
                  . Für die Aufbereitung von Emissionsdaten finden Sie außerdem {" "}
                  <Link className="orange-link" href="/de/scope-1-2-berechnung">Scope 1 und Scope 2 berechnen</Link>.
                </p>
              </ArticleSection>

              <ArticleSection id="assessment-scope" number="03" title="Assessment Scope zuerst prüfen.">
                <p>Einer der wichtigsten Punkte wird häufig unterschätzt.</p>
                <p>EcoVadis bewertet einen bestimmten Assessment Scope. Dieser kann sich beispielsweise auf eine Gruppe, eine juristische Einheit oder einen Standort beziehen.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Group", "Ein Konzern beziehungsweise eine Einheit mit einbezogenen Tochtergesellschaften."],
                    ["Entity", "Eine juristische Einheit ohne einbezogene Tochterunternehmen."],
                    ["Site", "Ein konkreter geografischer Standort oder eine Einrichtung einer juristischen Einheit."]
                  ].map(([title, body]) => (
                    <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5" key={title}>
                      <h3 className="font-display text-2xl text-orange">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Ein Dokument muss deshalb nicht nur thematisch relevant sein. Es sollte auch zum Unternehmen beziehungsweise zum Scope passen, der tatsächlich bewertet wird. EcoVadis unterscheidet ausdrücklich zwischen Group-, Entity- und Site-Level Assessments.
                </p>
                <div className="my-8 rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Beispiel</p>
                  <p className="mt-4 leading-7 text-muted">Ihr Produktionsstandort in Deutschland wird bewertet. Sie laden eine Environmental Policy der internationalen Muttergesellschaft hoch.</p>
                  <p className="mt-4 font-bold leading-7 text-ink">Die entscheidende Frage ist nicht nur: „Ist das eine Environmental Policy?“</p>
                  <p className="mt-2 font-bold leading-7 text-ink">Sondern: „Deckt sie den bewerteten Standort und dessen tatsächliche Aktivitäten ausreichend ab?“</p>
                </div>
                <p>Dasselbe gilt für Zertifikate, Kennzahlen, Berichte, Richtlinien und Auditunterlagen.</p>
                <Principle>Das richtige Dokument für die falsche Gesellschaft kann immer noch der falsche Nachweis sein.</Principle>
              </ArticleSection>

              <ArticleSection id="antwort-dokument" number="04" title="Antwort und Dokument müssen miteinander verknüpft werden.">
                <p>EcoVadis strukturiert den Fragebogen in vier große Nachhaltigkeitsthemen:</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {["Environment", "Labor & Human Rights", "Ethics", "Sustainable Procurement"].map((theme) => (
                    <div className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-white px-5 py-4 text-sm font-bold text-ink" key={theme}>{theme}</div>
                  ))}
                </div>
                <p>
                  Innerhalb des Fragebogens werden passende Antwortoptionen mit den entsprechenden Supporting Documents verknüpft. EcoVadis beschreibt diese Dokumentzuordnung als wesentlichen Teil des Bewertungsprozesses. Deshalb ist intern eine einfache Evidence Map sehr hilfreich.
                </p>
                <EvidenceMap />
                <p>Eine solche Struktur zeigt sofort:</p>
                <p className="font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.18] text-ink">Welche Antwort wird durch welches Dokument gestützt?</p>
                <p>Und ebenso wichtig: Wo haben wir noch keine belastbare Dokumentation?</p>
              </ArticleSection>

              <ArticleSection id="dokumentenlimit" number="05" title="Das 55-Dokumente-Limit verändert die Strategie.">
                <p>
                  Für das EcoVadis Sustainability Rating gilt derzeit eine Begrenzung von 55 neuen Dokumenten pro Assessment, unabhängig von der Unternehmensgröße. EcoVadis begründet dies damit, dass Unternehmen die relevantesten Unterlagen auswählen und Informationen strukturiert offenlegen sollen.
                </p>
                <div className="my-8 grid gap-6 rounded-[1.1rem] border border-[rgba(254,112,1,0.26)] bg-[var(--soft-orange)] p-7 sm:grid-cols-[9rem_1fr] sm:items-center sm:p-8">
                  <span className="font-display text-[6rem] leading-none text-orange">55</span>
                  <div>
                    <p className="text-lg font-bold text-ink">neue Dokumente pro Assessment</p>
                    <p className="mt-2 text-sm leading-7 text-muted">Eine EcoVadis-spezifische Begrenzung für das Sustainability Rating – keine allgemeine Regel für ESG-Fragebögen.</p>
                  </div>
                </div>
                <p>Sie sollten nicht einfach alles hochladen, was irgendwie mit Nachhaltigkeit zu tun hat.</p>
                <p>Ein Unternehmen mit 180 internen Dateien, 25 Policies, 14 Zertifikaten und 40 KPI-Auswertungen braucht eine Auswahlstrategie.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <blockquote className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 text-muted">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[rgba(21,21,21,0.45)]">Nicht fragen</span>
                    <p className="font-display mt-4 text-2xl leading-tight text-ink">„Welche 55 Dateien können wir hochladen?“</p>
                  </blockquote>
                  <blockquote className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Sondern</span>
                    <p className="font-display mt-4 text-2xl leading-tight text-ink">„Welche Dokumente belegen die wichtigsten ausgewählten Antworten am klarsten?“</p>
                  </blockquote>
                </div>
              </ArticleSection>

              <ArticleSection id="mehrere-antworten" number="06" title="Ein gutes Dokument kann mehrere Antworten unterstützen.">
                <p>Das 55-Dokumente-Limit bedeutet nicht, dass jedes Dokument nur zu einer einzigen Antwort gehören darf.</p>
                <p>Ein echtes, bereits vorhandenes Dokument kann mehrere relevante Aussagen unterstützen.</p>
                <div className="my-8 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <BookOpenCheck aria-hidden="true" className="h-5 w-5 text-orange" />
                    <h3 className="font-bold text-ink">Beispiel: Nachhaltigkeitsbericht</h3>
                  </div>
                  <BulletList items={["Energieverbrauch", "Emissionen", "Arbeitssicherheit", "Diversity", "Governance", "nachhaltige Beschaffung"]} />
                </div>
                <p>
                  Wenn diese Informationen tatsächlich im Bericht enthalten sind, kann derselbe Bericht sinnvoll mehreren passenden Antwortoptionen zugeordnet werden. EcoVadis weist selbst darauf hin, dass konsolidierte Sustainability Reports mehreren Antworten zugeordnet werden können.
                </p>
                <p className="font-bold text-ink">Aber ein echtes konsolidiertes Unternehmensdokument ist nicht dasselbe wie eine künstlich zusammengefügte PDF-Datei.</p>
              </ArticleSection>

              <ArticleSection id="super-pdfs" number="07" title="Erstellen Sie keine künstlichen „Super-PDFs“, um das Limit zu umgehen.">
                <p>Angenommen, Sie haben fünf eigenständige Dokumente:</p>
                <BulletList items={["Environmental Policy", "Risk Assessment", "Trainingsunterlagen", "Energieauswertung", "Supplier Code of Conduct"]} />
                <p>Dann wäre es keine gute Lösung, diese fünf Dateien nur für EcoVadis zu einer einzigen 90-seitigen PDF namens:</p>
                <div className="my-7 rounded-[0.9rem] border border-dashed border-[rgba(21,21,21,0.25)] bg-white p-5 text-center font-mono text-sm font-bold text-ink">EcoVadis_Evidence_All.pdf</div>
                <p>
                  zusammenzufügen. EcoVadis akzeptiert solche künstlich kombinierten Dokumente nicht als Methode zur Umgehung des 55-Dokumente-Limits. Die Plattform unterscheidet solche Dateien von echten, bereits bestehenden konsolidierten Reports.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Valide Grundlage</p>
                    <p className="mt-3 text-sm leading-7 text-muted">Ein echter konsolidierter Unternehmensbericht, der bereits als solcher existiert.</p>
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[rgba(21,21,21,0.45)]">Keine Limit-Strategie</p>
                    <p className="mt-3 text-sm leading-7 text-muted">Unabhängige Dateien allein für den Upload zu einer künstlichen Sammel-PDF verbinden.</p>
                  </div>
                </div>
                <p>Ihre Dokumentation sollte widerspiegeln, wie Ihr Managementsystem tatsächlich organisiert ist – nicht, wie kreativ Sie das Upload-Limit umgehen können.</p>
              </ArticleSection>

              <ArticleSection id="richtlinien" number="08" title="Richtlinien: Was macht eine Policy brauchbar?">
                <p>Eine Richtlinie ist besonders dann sinnvoll, wenn sie eine tatsächliche formelle Unternehmensverpflichtung dokumentiert.</p>
                <p>Eine gute Policy sollte deshalb nicht nur einen professionellen Titel haben. Je nach Kontext sollte erkennbar sein:</p>
                <BulletList items={["für welches Unternehmen sie gilt", "welches Thema sie abdeckt", "welche Verpflichtungen oder Ziele bestehen", "wann sie erstellt oder überprüft wurde", "und dass sie tatsächlich Teil des Unternehmensmanagements ist"]} />
                <p>
                  EcoVadis erwartet formalisierte, relevante und bereits bestehende Dokumentation und lehnt Dokumente ab, die ausschließlich zur Erfüllung des Fragebogens erstellt wurden.
                </p>
                <p>Das bedeutet nicht, dass ein Unternehmen nie eine neue Richtlinie erstellen darf. Natürlich kann es seine Prozesse verbessern und eine Policy neu einführen. Aber die Chronologie muss korrekt bleiben:</p>
                <Principle label="Korrekte Chronologie">tatsächliche Unternehmensentscheidung → Entwurf → interne Prüfung → formelle Verabschiedung → gültige Policy</Principle>
                <p className="font-bold text-ink">Nicht: EcoVadis-Frage erscheint → generische Policy kopieren → so tun, als hätte sie bereits bestanden.</p>
              </ArticleSection>

              <ArticleSection id="policy-action-reporting" number="09" title="Maßnahmen brauchen andere Nachweise als Richtlinien.">
                <p>Eine Policy zeigt häufig eine formelle Verpflichtung. Eine Maßnahme zeigt, dass etwas tatsächlich umgesetzt wurde.</p>
                <div className="mt-8 grid gap-4">
                  {[
                    ["Policy", "Wir verfügen über eine Antikorruptionsrichtlinie.", "Freigegebene Anti-Corruption Policy."],
                    ["Action", "Relevante Mitarbeitende werden zu Antikorruption geschult.", "Schulungsunterlagen, Teilnahmeaufzeichnungen, Trainingsplan oder andere formalisierte Umsetzungsbelege."],
                    ["Reporting", "Wir messen bestimmte Nachhaltigkeitskennzahlen.", "KPI Reporting, Datengrundlage, Berechnung und dokumentiertes Ergebnis."]
                  ].map(([type, claim, evidence]) => (
                    <div className="grid gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:grid-cols-[7rem_1fr_1fr]" key={type}>
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-orange">{type}</span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[rgba(21,21,21,0.45)]">Aussage</p>
                        <p className="mt-2 text-sm leading-6 text-ink">{claim}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[rgba(21,21,21,0.45)]">Nachweis</p>
                        <p className="mt-2 text-sm leading-6 text-muted">{evidence}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Principle>Policy, Action und Reporting sind nicht dasselbe.</Principle>
                <p>Ihre Dokumentenstrategie sollte diese Unterschiede widerspiegeln.</p>
              </ArticleSection>

              <ArticleSection id="aktualitaet" number="10" title="Wie aktuell müssen EcoVadis-Dokumente sein?">
                <p>Nach den derzeit veröffentlichten EcoVadis-Regeln gilt grundsätzlich:</p>
                <div className="my-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <p className="font-display text-4xl text-orange">bis zu 8 Jahre</p>
                    <p className="mt-3 text-sm font-bold text-ink">Policies und Actions</p>
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <p className="font-display text-4xl text-orange">bis zu 2 Jahre</p>
                    <p className="mt-3 text-sm font-bold text-ink">KPI-/Results-Reporting</p>
                  </div>
                </div>
                <div className="my-7 rounded-[1rem] border-l-2 border-orange bg-white p-5 text-sm font-bold leading-7 text-ink">Diese Zeiträume sind EcoVadis-spezifische Dokumentenregeln und keine allgemeine gesetzliche ESG-Regel.</div>
                <p>Aber die reine Altersgrenze ist nicht das einzige Kriterium.</p>
                <p>Ein sechs Jahre altes Dokument kann formal noch innerhalb des EcoVadis-Zeitraums liegen und trotzdem fachlich überholt sein, wenn Verantwortlichkeiten geändert wurden, Prozesse nicht mehr gelten, neue Standorte hinzugekommen sind, Ziele geändert wurden oder Unternehmensstrukturen anders sind.</p>
                <p className="font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.18] text-ink">Ist das Dokument nicht nur formal gültig, sondern beschreibt es unser Unternehmen noch korrekt?</p>
              </ArticleSection>

              <ArticleSection id="zertifikate-2026" number="11" title="Zertifikate: 2026 haben sich die Nachweisregeln verändert.">
                <p>EcoVadis hat seine Methodik im April 2026 bei Zertifizierungen erweitert.</p>
                <p>
                  Neben dem eigentlichen Zertifikat können unter bestimmten Voraussetzungen zusätzliche Nachweisarten berücksichtigt werden, insbesondere wenn für den Zertifizierungsstandard eine öffentlich überprüfbare Datenbank existiert.
                </p>
                <p>Mögliche Nachweise können laut EcoVadis unter den jeweiligen Voraussetzungen unter anderem umfassen:</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {["Datenbank-Screenshot", "Auditbericht", "Jahres- oder Nachhaltigkeitsbericht", "Website-Screenshot", "Rechnung", "Kommunikation mit der Zertifizierungsstelle"].map((item) => (
                    <div className="flex items-center gap-3 rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-white p-4 text-sm font-semibold text-ink" key={item}>
                      <FileCheck2 aria-hidden="true" className="h-4 w-4 shrink-0 text-orange" />
                      {item}
                    </div>
                  ))}
                </div>
                <p>Bei einem Nachweis aus einer öffentlichen Zertifizierungsdatenbank sollen insbesondere erkennbar sein:</p>
                <BulletList items={["Unternehmensname", "Standard", "Zertifizierungsumfang", "Gültigkeitsstatus"]} />
                <div className="my-8 flex gap-4 rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                  <CircleAlert aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-orange" />
                  <p className="text-sm font-bold leading-7 text-ink">Gleichzeitig akzeptiert EcoVadis Managementsystem-Zertifikate mit dem Status „in Bearbeitung“ nicht mehr als entsprechenden Zertifizierungsnachweis.</p>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-orange">Stand dieser Information: August 2026.</p>
                <p>Da EcoVadis seine Bewertungsmethodik regelmäßig weiterentwickelt, sollten aktuelle Help Content- und Methodology-Hinweise im jeweiligen Fragebogen immer mitgeprüft werden.</p>
              </ArticleSection>

              <ArticleSection id="auditberichte" number="12" title="Auditberichte spielen inzwischen eine größere Rolle.">
                <p>Ein weiterer EcoVadis-Methodology-Update aus 2026 betrifft externe Sustainability- und Certification-Auditberichte.</p>
                <p>Diese können inzwischen breiter als Nachweis für Policies, Actions und Reporting verwendet werden, wenn die jeweiligen Anforderungen erfüllt sind.</p>
                <div className="my-8 grid gap-4 sm:grid-cols-3">
                  {["Policies", "Actions", "Reporting"].map((item) => (
                    <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 text-center" key={item}>
                      <FileSearch aria-hidden="true" className="mx-auto h-5 w-5 text-orange" />
                      <p className="mt-4 font-bold text-ink">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="font-bold text-ink">Das bedeutet aber nicht: Jeder Auditbericht beweist automatisch jede Aussage.</p>
                <p>Auch hier müssen Inhalt, Scope, Coverage und konkrete Frage zusammenpassen.</p>
                <p>
                  Bei Policies und Reporting nennt EcoVadis im entsprechenden 2026 Update beispielsweise Coverage-Anforderungen; für Energy/GHG KPI reporting gelten dort noch strengere Coverage-Regeln.
                </p>
                <Principle>Was steht tatsächlich im Auditbericht – und welche Antwort kann er wirklich tragen?</Principle>
              </ArticleSection>

              <ArticleSection id="third-party" number="13" title="Dokumente Dritter: oft wertvoll, aber der Bezug muss klar sein.">
                <p>Nicht jedes Dokument muss direkt vom eigenen Unternehmen erstellt worden sein.</p>
                <p>EcoVadis akzeptiert unter bestimmten Bedingungen auch Third-Party Documentation. Beispiele können sein:</p>
                <BulletList items={["Rechnungen", "Verträge mit externen Dienstleistern", "bestimmte gesetzlich vorgeschriebene Berichte", "externe Trainingsunterlagen", "Teilnahmebestätigungen", "externe Auditunterlagen"]} />
                <p>Aber ein Third-Party-Dokument trägt möglicherweise nicht automatisch den Namen Ihres Unternehmens. Dann muss der Bezug zum Assessment Scope anderweitig nachvollziehbar sein.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Recyclingdienstleister</p>
                    <p className="mt-3 text-sm leading-7 text-muted">Externes Dienstleisterdokument zusammen mit einem entsprechenden Vertrag oder einer Vereinbarung.</p>
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Externe Schulung</p>
                    <p className="mt-3 text-sm leading-7 text-muted">Teilnahmebestätigung in Verbindung mit internen Schulungsinformationen oder einer eindeutigen Zuordnung.</p>
                  </div>
                </div>
                <p className="font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.18] text-ink">Der Analyst muss nachvollziehen können, warum dieses externe Dokument etwas über das bewertete Unternehmen belegt.</p>
              </ArticleSection>

              <ArticleSection id="machine-readable" number="14" title="Machine-readable: Ein guter Nachweis muss auch verarbeitet werden können.">
                <p>Ein häufig unterschätztes Problem ist nicht der Inhalt. Sondern das Dateiformat.</p>
                <p>EcoVadis weist darauf hin, dass Dokumente maschinenlesbar sein sollten, damit Informationen automatisiert extrahiert und gegebenenfalls übersetzt werden können.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_0.82fr]">
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6">
                    <div className="flex items-center gap-3">
                      <CircleAlert aria-hidden="true" className="h-5 w-5 text-orange" />
                      <h3 className="font-bold text-ink">Problematisch können sein</h3>
                    </div>
                    <BulletList items={["reine Scans", "Fotos von Dokumenten", "handschriftliche Inhalte", "Text als Bild", "verschlüsselte Dateien", "passwortgeschützte Dateien", "beschädigte Dateien"]} />
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <ScanText aria-hidden="true" className="h-6 w-6 text-orange" />
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-orange">Wo möglich</p>
                    <p className="mt-3 text-lg font-bold leading-7 text-ink">PDF direkt aus dem Ursprungssystem exportieren.</p>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[rgba(21,21,21,0.45)]">Nicht unnötig</p>
                    <p className="mt-3 text-sm leading-7 text-muted">Ausdrucken → unterschreiben → fotografieren → wieder als PDF speichern.</p>
                  </div>
                </div>
                <p>Für Excel-, Word-, ERP-, HR- oder Accounting-Daten gilt dasselbe: Wenn eine digitale, lesbare Originalausgabe verfügbar ist, ist sie meist die sauberere Arbeitsgrundlage.</p>
              </ArticleSection>

              <ArticleSection id="priorisieren" number="15" title="Welche Dokumente sollten Sie priorisieren?">
                <p>Wenn Sie mehr potenzielle Nachweise als verfügbare Uploads haben, priorisieren Sie nicht nach Dateigröße oder danach, was zuerst gefunden wurde.</p>
                <p>Eine sinnvolle Reihenfolge ist:</p>
                <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                  {prioritisation.map(([title, body], index) => (
                    <li className={index === prioritisation.length - 1 ? "rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 sm:col-span-2" : "rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"} key={title}>
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-orange">0{index + 1}</span>
                        <div>
                          <h3 className="font-bold text-ink">{title}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
                <Principle>Der beste Evidence Pack ist nicht der größte.</Principle>
                <p>Er ist der, bei dem jede Datei einen klaren Zweck hat.</p>
              </ArticleSection>

              <ArticleSection id="evidence-register" number="16" title="Nutzen Sie ein internes EcoVadis Evidence Register.">
                <p>Bevor Sie mit dem Upload beginnen, lohnt sich eine einfache Arbeitsübersicht.</p>
                <EvidenceRegister />
                <div className="my-8 rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <Table2 aria-hidden="true" className="h-5 w-5 text-orange" />
                    <h3 className="font-bold text-ink">Besonders hilfreich: relevante Seite</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">Ein 70-seitiger Bericht ist weniger hilfreich, wenn niemand mehr weiß, wo genau die relevante Information steht.</p>
                </div>
              </ArticleSection>

              <ArticleSection id="nicht-hochladen" number="17" title="Was sollten Sie nicht hochladen?">
                <div className="grid gap-4">
                  {[
                    ["Dokumente, die nur für den Fragebogen erfunden wurden", "EcoVadis verlangt bereits bestehende, glaubwürdige Dokumentation des tatsächlichen Managementsystems."],
                    ["Kopierte Standard-Policies ohne reale Umsetzung", "Ein professionelles Template ist kein Nachweis dafür, dass die beschriebene Praxis im Unternehmen existiert."],
                    ["Gefälschte Zertifikate oder externe Unterlagen", "EcoVadis prüft die Integrität von Supporting Documents und kann zweifelhafte Dokumente ablehnen."],
                    ["Dokumente für die falsche Gesellschaft", "Der Konzernname allein macht ein Dokument nicht automatisch für jeden Assessment Scope geeignet."],
                    ["Künstlich kombinierte Sammel-PDFs", "Mehrere separate Dokumente nur zur Umgehung des 55-Dokumente-Limits zusammenzufügen, ist keine akzeptierte Strategie."],
                    ["Veraltetes Reporting", "Besonders KPI-Daten müssen ausreichend aktuell sein."],
                    ["Schlecht lesbare Scans", "Wenn eine maschinenlesbare Originalversion verfügbar ist, ist sie in der Regel vorzuziehen."]
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

              <ArticleSection id="fehlender-nachweis" number="18" title="Was tun, wenn ein geforderter Nachweis fehlt?">
                <p>Zuerst unterscheiden:</p>
                <div className="mt-8 grid gap-4">
                  {[
                    ["Die Praxis existiert und das Dokument existiert irgendwo.", "Dokument finden."],
                    ["Die Praxis existiert und wurde nie formal dokumentiert.", "Prüfen, ob sie sachgerecht formalisiert werden kann."],
                    ["Eine Berechnung fehlt, aber die Ausgangsdaten existieren.", "Berechnung vorbereiten."],
                    ["Das Dokument ist veraltet.", "Prüfen, ob eine aktuelle Version vorhanden oder sachlich zu aktualisieren ist."],
                    ["Die zugrunde liegende Praxis existiert nicht.", "Gap."]
                  ].map(([situation, action], index) => (
                    <div className="grid gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 sm:grid-cols-[2.2rem_1fr_auto] sm:items-start" key={situation}>
                      <span className="font-mono text-xs font-bold text-orange">0{index + 1}</span>
                      <p className="font-bold leading-7 text-ink">{situation}</p>
                      <span className="max-w-xs rounded-[0.8rem] bg-[var(--soft-orange)] px-3 py-2 text-xs font-bold leading-5 text-[#b94f00]">{action}</span>
                    </div>
                  ))}
                </div>
                <Principle>Ein Gap ist keine Einladung, eine rückwirkende Unternehmensrealität zu erzeugen.</Principle>
                <p>Ein Unternehmen kann selbstverständlich heute neue Maßnahmen einführen. Aber diese sollten dann als neue Maßnahmen behandelt werden – nicht als Beweis dafür, dass sie schon seit Jahren bestanden.</p>
              </ArticleSection>

              <ArticleSection id="kein-schreibwettbewerb" number="19" title="EcoVadis ist kein Dokumenten-Schreibwettbewerb.">
                <p>Der vielleicht größte Denkfehler bei der Vorbereitung lautet:</p>
                <blockquote className="my-7 rounded-[1rem] border-l-2 border-orange bg-white p-6 font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.16] text-ink">„Wir brauchen mehr Policies.“</blockquote>
                <p>Manchmal stimmt das. Häufig lautet die bessere Frage aber:</p>
                <p className="font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.18] text-ink">„Welche Managementpraktiken existieren bereits und wie sind sie dokumentiert?“</p>
                <p>Ein Unternehmen kann 25 professionell gestaltete Policies besitzen und trotzdem nur wenig belastbare Umsetzung zeigen. Ein anderes Unternehmen kann weniger Dokumente haben, aber:</p>
                <BulletList items={["klare Prozesse", "reale Maßnahmen", "aktuelle KPIs", "passende Zertifikate", "belastbare Datengrundlagen"]} />
                <Principle>Die Dokumente sind der Nachweis für das Sustainability Management System. Nicht das Managementsystem selbst.</Principle>
                <p>
                  Wie Evipace Aussagen, Quellen und Nachweise grundsätzlich behandelt, beschreibt {" "}
                  <Link className="orange-link" href="/de/methodology">Unsere Methodik</Link>.
                </p>
                <p>
                  Für die interne Vorprüfung eines einzelnen Dokuments können
                  Sie außerdem die {" "}
                  <Link
                    className="orange-link"
                    href="/de/ressourcen/esg-nachweise-checkliste"
                  >
                    ESG-Nachweise-Checkliste
                  </Link>{" "}
                  verwenden.
                </p>
              </ArticleSection>

              <ArticleSection id="gemeinsam-vorbereiten" number="20" title="Bereiten Sie den Fragebogen und die Dokumente gemeinsam vor.">
                <p>Die effizienteste Arbeitsweise ist nicht, erst den gesamten Fragebogen zu beantworten und danach alle Dokumente zu sammeln.</p>
                <Principle label="Besser">Antwortoption → benötigter Nachweis → vorhandene Quelle → Gap</Principle>
                <p>Dadurch sehen Sie früh:</p>
                <BulletList items={["welche Antworten gut belegbar sind", "wo noch interne Informationen fehlen", "welche Dokumente mehrfach relevant sind", "wo der Assessment Scope problematisch ist", "und welche Bereiche echte Verbesserung benötigen"]} />
                <p>Das reduziert Arbeit kurz vor der Submission.</p>
                <Link className="orange-link mt-7 inline-flex items-center gap-2 text-sm" href="/de/esg-fragebogen-lieferanten">
                  ESG-Fragebogen für Lieferanten
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </ArticleSection>

              <ArticleSection id="evidence-library" number="21" title="Nach der Bewertung: Evidence Library nicht wegwerfen.">
                <p>Die Dokumentenarbeit ist nicht nur für das aktuelle EcoVadis Assessment wertvoll.</p>
                <p>Viele der zugrunde liegenden Informationen können später wieder relevant sein für:</p>
                <BulletList items={["EcoVadis reassessment", "ESG-Fragebögen von Kunden", "IntegrityNext", "Nachhaltigkeitsberichte", "Scope-1- und Scope-2-Anfragen", "Bank- oder Finanzierungsanfragen", "andere Supplier Assessments"]} />
                <p>
                  Dokumente aus vorherigen EcoVadis Assessments werden nach den EcoVadis-Regeln außerdem weiter berücksichtigt, solange sie gültig bleiben; bei einer neuen Bewertung besteht wiederum ein neues Kontingent für bis zu 55 neue Dokumente.
                </p>
                <Principle>Dokument → Aussage → Gültigkeit → Scope → Plattformen / Kunden → Verantwortlicher</Principle>
                <p>So wird aus einem EcoVadis-Projekt eine wiederverwendbare ESG-Grundlage. Die konkrete Einreichung muss für jeden Empfänger trotzdem neu geprüft werden.</p>
              </ArticleSection>

              <ArticleSection id="externe-unterstuetzung" number="22" title="Wann externe Unterstützung sinnvoll wird.">
                <p>Sie brauchen nicht zwingend externe Unterstützung, um Dokumente in EcoVadis hochzuladen.</p>
                <p>Sie wird interessanter, wenn:</p>
                <BulletList items={["viele interne Abteilungen beteiligt sind", "mehr potenzielle Dokumente vorhanden sind als sinnvoll eingereicht werden können", "unklar ist, welche Nachweise zu welchen Antworten gehören", "mehrere Gesellschaften oder Standorte betroffen sind", "Scope 1 und Scope 2 noch fehlen", "Policies oder Prozesse nur teilweise dokumentiert sind", "alte und neue Dokumentversionen vermischt sind", "oder Sie die Vorbereitung nicht nur für EcoVadis, sondern als wiederverwendbare ESG-Datengrundlage aufbauen möchten"]} />
                <p>Dann besteht die eigentliche Arbeit nicht im Upload. Sondern in:</p>
                <Principle>Frage → reale Praxis → Antwort → Nachweis → Scope → Review</Principle>
              </ArticleSection>

              <section aria-labelledby="article-cta-title" className="my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12">
                <FileText aria-hidden="true" className="h-7 w-7 text-orange" />
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-orange">Ihr nächster Schritt</p>
                <h2 className="font-display mt-5 max-w-[15ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]" id="article-cta-title">
                  Ihr EcoVadis-Fragebogen ist offen – aber die Dokumente sind noch nicht sortiert?
                </h2>
                <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-white/68">
                  <p>Senden Sie uns die vorhandene Ausgangslage.</p>
                  <p>Wir helfen dabei, Antworten, Daten und Supporting Documents strukturiert zusammenzubringen und sichtbar zu machen, welche Informationen bereits belastbar sind und wo noch Lücken bestehen.</p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>EcoVadis-Anfrage senden</ButtonLink>
                  <ButtonLink className="w-full sm:w-auto" href="/de/ecovadis-unterstuetzung" variant="light">EcoVadis-Unterstützung</ButtonLink>
                </div>
                <p className="mt-6 text-sm font-semibold text-white/50">Fragebogen · Policies · Zertifikate · KPIs · Nachweise</p>
                <p className="mt-4 max-w-2xl text-xs leading-6 text-white/42">Evipace ist ein unabhängiger Dienstleister und weder von EcoVadis akkreditiert noch mit EcoVadis verbunden. Die finale Bewertung und Anerkennung von Nachweisen liegt bei EcoVadis.</p>
              </section>

              <section aria-labelledby="faq-title" className="scroll-mt-24 border-t border-[rgba(21,21,21,0.12)] py-16" id="faq">
                <p className="eyebrow">FAQ</p>
                <h2 className="font-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-none" id="faq-title">Häufige Fragen zu EcoVadis-Dokumenten</h2>
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
              </section>

              <section aria-labelledby="sources-title" className="border-t border-[rgba(21,21,21,0.12)] pb-16 pt-12">
                <div className="flex items-center gap-3">
                  <Link2 aria-hidden="true" className="h-4 w-4 text-orange" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink" id="sources-title">Quellen &amp; weiterführende Informationen</h2>
                </div>
                <ul className="mt-6 grid gap-6 text-sm leading-6 text-muted">
                  <li>
                    <ExternalSourceLink href={SUPPORTING_DOCUMENTS_URL}>EcoVadis Hilfe-Center — Kenntnisse über belegende Dokumente</ExternalSourceLink>
                    <p className="mt-1">Grundregeln für Relevanz, Vollständigkeit, Bewertungsumfang, Aktualität und Integrität von Supporting Documents.</p>
                  </li>
                  <li>
                    <ExternalSourceLink href={DOCUMENT_LIMIT_URL}>EcoVadis Hilfe-Center — Warum ist die Anzahl der Dokumente begrenzt?</ExternalSourceLink>
                    <p className="mt-1">55-Dokumente-Limit und Regeln zu künstlich kombinierten Dokumenten.</p>
                  </li>
                  <li>
                    <ExternalSourceLink href={MACHINE_READABLE_URL}>EcoVadis Hilfe-Center — Vorbereitung maschinenlesbarer Dokumente</ExternalSourceLink>
                    <p className="mt-1">Hinweise zu Textformat, OCR und verarbeitbaren Dateien.</p>
                  </li>
                  <li>
                    <ExternalSourceLink href={THIRD_PARTY_URL}>EcoVadis Hilfe-Center — Dokumente von Dritten</ExternalSourceLink>
                    <p className="mt-1">Regeln und Beispiele für Third-Party Evidence.</p>
                  </li>
                  <li>
                    <ExternalSourceLink href={METHODOLOGY_UPDATES_URL}>EcoVadis Hilfe-Center — Aktualisierungen der Methodik im Q1 2026</ExternalSourceLink>
                    <p className="mt-1">Änderungen zu Zertifizierungsnachweisen, Auditberichten und Zertifikaten mit Status „in Bearbeitung“.</p>
                  </li>
                  <li>
                    <ExternalSourceLink href={ASSESSMENT_SCOPE_URL}>EcoVadis Hilfe-Center — Verständnis des Bewertungsrahmens</ExternalSourceLink>
                    <p className="mt-1">Group-, Entity- und Site-Level Assessment Scope.</p>
                  </li>
                  <li>
                    <ExternalSourceLink href={PREVIOUS_DOCUMENTS_URL}>EcoVadis Hilfe-Center — Dokumente aus vorherigen Bewertungen</ExternalSourceLink>
                    <p className="mt-1">Neues Dokumentenkontingent und weitere Berücksichtigung gültiger früherer Dokumente.</p>
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
