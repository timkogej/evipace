import type { ReactNode } from "react";
import {
  CircleAlert,
  ExternalLink,
  FileBadge2,
  FileCheck2,
  FileText,
  Link2,
  Mail,
  RefreshCw,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";

const WHAT_IS_INTEGRITYNEXT_URL =
  "https://helpdesk.integritynext.com/hc/de/articles/360018458320-Was-ist-IntegrityNext";
const ANSWER_ASSESSMENT_URL =
  "https://helpdesk.integritynext.com/hc/de/articles/360018443680-Wie-beantworte-ich-das-Assessment";
const SMALL_BUSINESS_URL =
  "https://helpdesk.integritynext.com/hc/de/articles/360018481719-Die-Fragen-treffen-auf-unser-Unternehmen-nicht-zu";
const VALIDATION_URL =
  "https://helpdesk.integritynext.com/hc/de/articles/14737296721180-Ich-habe-eine-E-Mail-mit-dem-Betreff-Nachbesserungsbedarf-erhalten-Wie-kann-ich-weiter-vorgehen";
const KEEP_CURRENT_URL =
  "https://helpdesk.integritynext.com/hc/de/articles/360018505660-Wie-kann-ich-die-Daten-meines-Unternehmens-auf-dem-neuesten-Stand-halten";
const SUPPLIER_COST_URL =
  "https://helpdesk.integritynext.com/hc/de/articles/360018494219-Entstehen-dabei-Kosten";
const SUPPLIER_TERMS_URL =
  "https://www.integritynext.com/de/geschaeftsbedingungen";
const ADD_COLLEAGUE_URL =
  "https://helpdesk.integritynext.com/hc/en-us/articles/360018479559-How-can-I-invite-add-a-colleague-to-my-supplier-profile";
const UPDATED_ASSESSMENTS_URL =
  "https://helpdesk.integritynext.com/hc/en-us/articles/15190118617756-I-received-an-email-with-the-subject-Updated-Assessments-Please-Review-How-should-I-proceed";

const quickSteps = [
  {
    title: "Prüfen Sie, welcher Kunde Sie eingeladen hat.",
    body: "Die Anfrage kommt über IntegrityNext, aber dahinter steht ein Geschäftspartner, der Informationen zu Ihrem Unternehmen anfordert."
  },
  {
    title: "Prüfen Sie das Unternehmensprofil.",
    body: "Stimmen Firmenname, Standort und andere grundlegende Angaben mit der Einheit überein, für die Sie antworten?"
  },
  {
    title: "Sehen Sie sich die tatsächlich angeforderten Assessments an.",
    body: "Relevant sind die Assessments, die für Ihr Profil beziehungsweise durch den anfragenden Kunden verlangt werden."
  },
  {
    title: "Prüfen Sie je Thema: Zertifikat oder Fragebogen?",
    body: "Existiert ein passendes zertifiziertes Managementsystem, kann je nach Assessment ein Zertifikat verwendet werden. Sonst kann der entsprechende Fragebogen bearbeitet werden."
  },
  {
    title: "Antworten Sie aus der tatsächlichen Unternehmenspraxis.",
    body: "Nicht danach, welche Antwort am besten aussieht."
  },
  {
    title: "Sammeln Sie Unterlagen parallel.",
    body: "Zertifikate, Policies, Prozesse und andere relevante Unterlagen sollten zur jeweiligen Aussage passen."
  },
  {
    title: "Prüfen Sie das Ergebnis nach der Bearbeitung weiter.",
    body: "Zertifikate können ablaufen, Assessments können aktualisiert werden und bei Unklarheiten kann IntegrityNext Nachbesserungsbedarf melden."
  }
];

const assessmentRows = [
  ["Umwelt", "Qualität", "ISO 14001", "ggf. nicht nötig", "Zertifikat", "bereit"],
  ["Arbeitssicherheit", "HR / HSE", "kein Zertifikat", "erforderlich", "Policy / Prozess", "bearbeiten"],
  ["Ethics", "Compliance / GF", "—", "erforderlich", "Code of Conduct", "bearbeiten"],
  ["Procurement", "Einkauf", "—", "erforderlich", "Supplier Code", "prüfen"],
  ["Carbon", "Operations / Finance", "—", "erforderlich", "GHG-/Energiedaten", "Daten beschaffen"]
] as const;

const faqItems = [
  {
    question: "Warum wurden wir zu IntegrityNext eingeladen?",
    answer:
      "Ein Geschäftspartner möchte über IntegrityNext Sustainability- und Compliance-Informationen zu Ihrem Unternehmen einholen. Die Plattform ermöglicht Kunden, Lieferanten zu Assessments einzuladen und deren Antworten und Unterlagen strukturiert zu erfassen."
  },
  {
    question: "Ist IntegrityNext für Lieferanten kostenlos?",
    answer:
      "Ja. Nach den aktuellen IntegrityNext-Informationen ist der Lieferanten-Account für Unternehmen, die von einem Kunden zur Teilnahme eingeladen werden, kostenlos."
  },
  {
    question: "Brauche ich Zertifikate für IntegrityNext?",
    answer:
      "Nicht zwingend. Bei entsprechenden Assessment-Themen kann ein passendes Managementsystem-Zertifikat verwendet werden. Wenn kein entsprechendes Zertifikat vorhanden ist, kann stattdessen der jeweilige Fragebogen ausgefüllt werden."
  },
  {
    question: "Ist es schlecht, bei IntegrityNext kein Zertifikat zu haben?",
    answer:
      "Nicht automatisch. IntegrityNext weist ausdrücklich darauf hin, dass ein fehlendes Zertifikat nicht bedeutet, dass ein Unternehmen schlechte Geschäftspraktiken hat. In entsprechenden Fällen kann der Fragebogen statt des Zertifikats bearbeitet werden."
  },
  {
    question: "Was bedeutet „Nachbesserungsbedarf“?",
    answer:
      "IntegrityNext kann bei der Prüfung eingereichter Antworten und Dokumente Unklarheiten oder Widersprüche feststellen. In diesem Fall kann das Validation Team eine Nachbesserung für ein bestimmtes Thema anfordern."
  },
  {
    question: "Kann ich Kollegen bei der Bearbeitung einbeziehen?",
    answer:
      "Ja. IntegrityNext ermöglicht es, weitere Personen aus dem Unternehmen zum Supplier Profile einzuladen, sodass mehrere Kolleginnen und Kollegen bei Review, Bearbeitung und Aktualisierung unterstützen können."
  },
  {
    question: "Müssen wir alle Fragen mit Ja beantworten?",
    answer:
      "Nein. Die Fragebögen sehen Ja- und Nein-Antworten vor. Entscheidend ist, die tatsächliche Situation Ihres Unternehmens korrekt wiederzugeben."
  },
  {
    question: "Können wir unser bestehendes IntegrityNext-Profil für einen weiteren Kunden verwenden?",
    answer:
      "IntegrityNext ermöglicht die Weitergabe eines bereits vorhandenen Profils an weitere anfragende Kunden. Dadurch müssen bestimmte Standardinformationen nicht zwingend von Grund auf neu beantwortet werden. Zusätzliche oder aktualisierte Anforderungen sollten dennoch geprüft werden."
  },
  {
    question: "Wer gibt die Antworten bei IntegrityNext ein?",
    answer:
      "Bei einer Unterstützung durch evipace bereiten wir die relevanten Informationen, Antworten, Daten und Nachweise vor. Die finale Prüfung der Unternehmensangaben und die Eingabe beziehungsweise Freigabe im eigenen IntegrityNext-Profil bleibt beim Kunden."
  },
  {
    question: "Garantiert evipace einen bestimmten IntegrityNext-Status?",
    answer:
      "Nein. Evipace kann bei Vorbereitung, Strukturierung und Review unterstützen, kontrolliert aber weder die IntegrityNext-Validierung noch einen bestimmten Plattformstatus oder die Entscheidung eines Kunden."
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
      className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange"
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

function Principle({
  label,
  children
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 rounded-[1.1rem] bg-ink p-7 text-white sm:p-8">
      {label ? (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
          {label}
        </p>
      ) : null}
      <p
        className={`font-display text-[clamp(1.8rem,4vw,3.1rem)] leading-[1.1] ${label ? "mt-4" : ""}`}
      >
        {children}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const active = status === "bereit";
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.06em] ${
        active
          ? "border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] text-[#b94f00]"
          : "border-[rgba(21,21,21,0.16)] bg-[rgba(21,21,21,0.05)] text-ink"
      }`}
    >
      {status}
    </span>
  );
}

function AssessmentMap() {
  const fields = [
    "Zuständig",
    "Zertifikat",
    "Fragebogen",
    "Zusatznachweis"
  ];

  return (
    <div className="mt-8" data-integritynext-assessment-map>
      <div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Beispiel einer IntegrityNext Assessment Map mit Thema,
              Zuständigkeit, Zertifikat, Fragebogen, Zusatznachweis und Status
            </caption>
            <thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]">
              <tr>
                {["Assessment / Thema", ...fields, "Status"].map((heading) => (
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
              {assessmentRows.map((row) => (
                <tr
                  className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0"
                  key={row[0]}
                >
                  <th className="px-4 py-5 font-bold text-ink" scope="row">
                    {row[0]}
                  </th>
                  {row.slice(1, 5).map((value, index) => (
                    <td className="px-4 py-5 text-muted" key={`${value}-${index}`}>
                      {value}
                    </td>
                  ))}
                  <td className="px-4 py-5">
                    <StatusPill status={row[5]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:hidden">
        {assessmentRows.map((row) => (
          <article
            className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5"
            key={row[0]}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[rgba(21,21,21,0.1)] pb-4">
              <h3 className="font-bold text-ink">{row[0]}</h3>
              <StatusPill status={row[5]} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              {fields.map((label, index) => (
                <div className="grid grid-cols-[6.7rem_1fr] gap-3" key={label}>
                  <dt className="font-semibold text-[rgba(21,21,21,0.56)]">
                    {label}
                  </dt>
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

function InvitationArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art">
      <svg
        className="resource-hero-art__sheet"
        fill="none"
        viewBox="0 0 520 650"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M66 156H454V494H66V156Z"
          fill="currentColor"
          fillOpacity="0.02"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M67 157L260 326L453 157" stroke="currentColor" strokeWidth="2" />
        <path d="M67 493L214 303M453 493L306 303" stroke="currentColor" strokeWidth="2" />
        <circle cx="417" cy="170" fill="#FE7001" r="46" />
        <path d="M397 170L412 185L438 154" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
        <text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2" x="66" y="126">SUPPLIER INVITATION</text>
      </svg>
      <span className="resource-hero-art__code">
        PROFILE · ASSESSMENT · REVIEW
      </span>
    </div>
  );
}

export function IntegrityNextInvitationGuide() {
  return (
    <>

      <main id="top">
        <article>
          <header
            aria-labelledby="article-title"
            className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28"
          >
            <InvitationArtwork />
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
                <span className="text-ink">IntegrityNext für Lieferanten</span>
              </nav>

              <div className="mt-12 max-w-6xl">
                <p className="eyebrow">IntegrityNext · Leitfaden für Lieferanten</p>
                <h1
                  className="font-display mt-7 max-w-[17ch] text-[clamp(3.15rem,7vw,6.55rem)] leading-[0.91]"
                  id="article-title"
                >
                  IntegrityNext für Lieferanten: Was passiert nach der Einladung?
                </h1>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
                <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                  <p>Eine E-Mail kommt von IntegrityNext.</p>
                  <p className="mt-6">
                    Ein Kunde möchte, dass Ihr Unternehmen ein Nachhaltigkeits-
                    oder Compliance-Assessment ausfüllt.
                  </p>
                  <p className="mt-6">
                    Vielleicht kennen Sie die Plattform noch nicht. Vielleicht
                    weiß intern niemand genau, wer zuständig ist.
                  </p>
                  <div className="mt-7 grid gap-2 text-sm font-semibold text-[rgba(21,21,21,0.66)] sm:grid-cols-2">
                    {[
                      "Warum wurden wir eingeladen?",
                      "Was müssen wir jetzt ausfüllen?",
                      "Brauchen wir Zertifikate?",
                      "Welche Unterlagen werden benötigt?",
                      "Was sieht unser Kunde?",
                      "Was passiert, wenn wir nicht jede Frage mit „Ja“ beantworten können?"
                    ].map((question) => (
                      <span
                        className="rounded-[0.8rem] border border-[rgba(21,21,21,0.12)] bg-white/75 px-3 py-2.5"
                        key={question}
                      >
                        {question}
                      </span>
                    ))}
                  </div>
                  <p className="font-display mt-7 text-3xl leading-tight text-ink">
                    Was müssen wir jetzt ausfüllen – und was passiert, wenn nicht
                    jede Antwort „Ja“ lautet?
                  </p>
                </div>

                <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.76)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                  <Mail aria-hidden="true" className="h-8 w-8 text-orange" />
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                    Die wichtigste Nachricht zuerst
                  </p>
                  <p className="mt-4 leading-7 text-muted">
                    Eine Einladung bedeutet nicht, dass Sie über jedes Zertifikat
                    oder ein vollständig aufgebautes ESG-System verfügen müssen.
                  </p>
                </aside>
              </div>

              <div className="mt-14 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9">
                <div className="grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:gap-12">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-orange">
                      Der Arbeitsauftrag
                    </span>
                    <p className="font-display mt-4 text-3xl leading-[1.08]">
                      Die tatsächliche Unternehmenssituation korrekt abbilden.
                    </p>
                  </div>
                  <p className="self-center text-lg leading-8 text-muted">
                    Identifizieren Sie die angeforderten Assessments und bringen
                    Sie passende Zertifikate, Antworten und zusätzliche Nachweise
                    strukturiert zusammen. Dieser Leitfaden zeigt den Ablauf
                    Schritt für Schritt.
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
                    className="font-display mt-6 max-w-[14ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]"
                    id="quick-answer-title"
                  >
                    IntegrityNext-Einladung erhalten? Gehen Sie so vor.
                  </h2>
                </div>
                <ol className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {quickSteps.map((step, index) => (
                    <li
                      className={`border-t border-white/20 pt-5 ${
                        index === quickSteps.length - 1 ? "sm:col-span-2" : ""
                      }`}
                      key={step.title}
                    >
                      <div className="flex gap-4">
                        <span className="font-mono text-xs font-bold tracking-[0.13em] text-orange">
                          {index + 1} —
                        </span>
                        <div>
                          <h3 className="font-bold leading-6 text-white">
                            {step.title}
                          </h3>
                          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-14 border-t border-white/15 pt-9">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                  Kurz gesagt
                </p>
                <p className="font-display mt-5 text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.08]">
                  Einladung → Scope → Assessment → Zertifikat oder Fragebogen →
                  Nachweise → Review → Aktualisierung
                </p>
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
                    ["01", "Warum eingeladen?", "#warum-eingeladen"],
                    ["03", "Unternehmensprofil", "#unternehmensprofil"],
                    ["05", "Zertifikat oder Fragebogen", "#zertifikat-oder-fragebogen"],
                    ["09", "Assessment Map", "#assessment-map"],
                    ["14", "Nachbesserungsbedarf", "#nachbesserungsbedarf"],
                    ["18", "Aktualisierung", "#kein-einmalprojekt"],
                    ["22", "Erste 24 Stunden", "#erste-24-stunden"],
                    ["24", "Unterstützung", "#externe-unterstuetzung"]
                  ].map(([number, label, href]) => (
                    <li key={href}>
                      <a
                        className="group flex gap-3 transition hover:text-ink"
                        href={href}
                      >
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
                id="warum-eingeladen"
                number="01"
                title="Warum hat mein Kunde uns zu IntegrityNext eingeladen?"
              >
                <p>
                  IntegrityNext ist eine Plattform für Sustainability- und
                  Compliance-Informationen in Lieferketten. Unternehmen nutzen
                  die Plattform unter anderem, um Informationen und
                  Selbstauskünfte ihrer Lieferanten strukturiert einzuholen.
                </p>
                <p>
                  Wenn Sie eine Einladung erhalten haben, möchte einer Ihrer
                  Geschäftspartner Informationen zu Ihrem Unternehmen über
                  IntegrityNext erhalten.
                </p>
                <div className="my-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[rgba(21,21,21,0.45)]">
                      Nicht die erste Frage
                    </p>
                    <p className="font-display mt-4 text-2xl leading-tight text-ink">
                      „Was will IntegrityNext von uns?“
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
                      Sondern
                    </p>
                    <p className="font-display mt-4 text-2xl leading-tight text-ink">
                      „Welche Informationen möchte unser Kunde über
                      IntegrityNext von uns erhalten?“
                    </p>
                  </div>
                </div>
                <p>
                  IntegrityNext stellt die Plattform und die Assessments bereit.
                  Die geschäftliche Anfrage entsteht aber aus der
                  Lieferantenbeziehung zu Ihrem Kunden.
                </p>
                <p>
                  Für die allgemeine Struktur einer neuen Kundenanfrage hilft
                  ergänzend unser Leitfaden{" "}
                  <Link
                    className="orange-link"
                    href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten"
                  >
                    ESG-Fragebogen vom Kunden erhalten – was jetzt?
                  </Link>
                </p>
              </ArticleSection>

              <ArticleSection
                id="kosten"
                number="02"
                title="Kostet IntegrityNext für Lieferanten etwas?"
              >
                <p>
                  Wenn Sie von einem Kunden als Lieferant zur Teilnahme
                  eingeladen wurden, ist die Nutzung des Lieferanten-Accounts
                  nach den aktuellen IntegrityNext-Informationen kostenlos.
                </p>
                <p>Kosten entstehen nicht dadurch, dass Sie:</p>
                <BulletList
                  items={[
                    "ein Lieferantenprofil anlegen",
                    "angeforderte Assessments beantworten",
                    "Zertifikate hochladen",
                    "oder Ihr Profil für den anfragenden Kunden bereitstellen"
                  ]}
                />
                <p>
                  Das ist etwas anderes als ein Unternehmen, das IntegrityNext
                  selbst als Kundenlösung verwenden möchte, um seine eigenen
                  Lieferanten einzuladen.
                </p>
                <Principle>
                  Für die Bearbeitung einer erhaltenen Kundenanfrage brauchen Sie
                  normalerweise kein kostenpflichtiges IntegrityNext-Abo.
                </Principle>
              </ArticleSection>

              <ArticleSection
                id="unternehmensprofil"
                number="03"
                title="Bevor Sie antworten: Prüfen Sie, für welches Unternehmen und welchen Standort Sie sprechen."
              >
                <p>
                  Das klingt banal, ist aber für die Qualität der gesamten
                  Selbstauskunft wichtig.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Firmenname", "Ist die richtige rechtliche Bezeichnung hinterlegt?"],
                    ["Juristische Einheit", "Für welche Gesellschaft gelten die Antworten?"],
                    ["Standort", "Welches Werk beziehungsweise welcher Standort wird dargestellt?"],
                    ["Unternehmensdaten", "Stimmen Umsatzsteuer- und Basisdaten?"],
                    ["Kontaktperson", "Wer koordiniert und bestätigt die Angaben?"]
                  ].map(([title, body]) => (
                    <div
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
                      key={title}
                    >
                      <h3 className="font-bold text-ink">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Antworten und hochgeladene Zertifikate sollten zu genau dem
                  Unternehmen passen, das im Profil dargestellt wird.
                  IntegrityNext nennt bei der Validierung ausdrücklich als
                  Prüfpunkt, dass die Selbstauskunft für den im Bereich
                  Unternehmensinformationen angegebenen Firmennamen und Standort
                  gilt.
                </p>
                <Principle>
                  Ein ISO-Zertifikat der Muttergesellschaft ist nicht automatisch
                  ein Nachweis für jede Tochtergesellschaft oder jeden Standort.
                </Principle>
              </ArticleSection>

              <ArticleSection
                id="assessments"
                number="04"
                title="Welche Assessments muss ich ausfüllen?"
              >
                <p>
                  IntegrityNext umfasst verschiedene Sustainability- und
                  Compliance-Themen. Welche Themen für Sie praktisch relevant
                  werden, hängt von der konkreten Kundenanfrage und Ihrem Profil
                  ab.
                </p>
                <p>IntegrityNext nennt aktuell unter anderem Bereiche rund um:</p>
                <BulletList
                  items={[
                    "Sustainability und Compliance",
                    "Supply-Chain-Due-Diligence",
                    "Product and Material Compliance",
                    "Carbon Emissions",
                    "Sustainability Reporting",
                    "Supply-Chain Visibility und Risk Management"
                  ]}
                />
                <p>
                  Zusätzlich gibt es themenspezifische Assessments, beispielsweise
                  für Konfliktmineralien, EUDR oder Diversity &amp; Inclusion.
                </p>
                <Principle label="Startpunkt">
                  Welche Assessments sind in unserem Profil tatsächlich offen?
                </Principle>
                <p>
                  Beginnen Sie nicht mit einer allgemeinen ESG-Dokumentensammlung.
                  Wenn der Kunde einen klassischen Lieferantenfragebogen statt
                  einer Plattform nutzt, finden Sie die passende Arbeitsweise auf{" "}
                  <Link
                    className="orange-link"
                    href="/de/esg-fragebogen-lieferanten"
                  >
                    ESG-Fragebogen für Lieferanten
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection
                id="zertifikat-oder-fragebogen"
                number="05"
                title="Zertifikat oder Fragebogen: Das ist eine der wichtigsten IntegrityNext-Logiken."
              >
                <p>
                  Bei verschiedenen IntegrityNext-Themen kann ein Unternehmen ein
                  passendes zertifiziertes Managementsystem nachweisen. Dann kann
                  das entsprechende Zertifikat hochgeladen werden.
                </p>
                <p>
                  Wenn kein solches Zertifikat vorhanden ist, ist das nicht
                  automatisch ein Problem. IntegrityNext sieht für entsprechende
                  Themen alternativ einen Fragebogen vor.
                </p>
                <div className="my-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <FileBadge2 aria-hidden="true" className="h-6 w-6 text-orange" />
                    <h3 className="mt-5 text-lg font-bold text-ink">
                      Passendes Zertifikat vorhanden
                    </h3>
                    <p className="mt-4 font-mono text-sm leading-7 text-muted">
                      Zertifikat prüfen → hochladen → Gültigkeit korrekt erfassen
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6">
                    <FileText aria-hidden="true" className="h-6 w-6 text-orange" />
                    <h3 className="mt-5 text-lg font-bold text-ink">
                      Kein passendes Zertifikat vorhanden
                    </h3>
                    <p className="mt-4 font-mono text-sm leading-7 text-muted">
                      Eingangsfrage mit Nein beantworten → Fragebogen bearbeiten
                    </p>
                  </div>
                </div>
                <p>
                  IntegrityNext erklärt ausdrücklich, dass das Ausfüllen des
                  Fragebogens als Alternative zum Zertifikat vorgesehen ist.
                </p>
                <Principle>
                  „Wir haben kein ISO-Zertifikat“ bedeutet nicht: „Wir können
                  IntegrityNext nicht ausfüllen.“
                </Principle>
              </ArticleSection>

              <ArticleSection
                id="passendes-zertifikat"
                number="06"
                title="Aber nicht jedes Zertifikat passt zu jedem Thema."
              >
                <p>
                  Angenommen, das Assessment betrifft Umweltschutz. Ihr
                  Unternehmen hat ISO 50001 Energiemanagement.
                </p>
                <p>
                  Das bedeutet nicht automatisch, dass dieses Zertifikat einen
                  anderen abgefragten Managementbereich ersetzt. IntegrityNext
                  nennt genau diesen Punkt in seinen Validation-Hinweisen: Das
                  Zertifikat muss die abgefragte Thematik abdecken.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Thema", "Welches Managementsystem zertifiziert das Dokument?"],
                    ["Unternehmen", "Für welche Gesellschaft wurde es ausgestellt?"],
                    ["Standort / Scope", "Welche Tätigkeiten beziehungsweise Standorte sind abgedeckt?"],
                    ["Gültigkeit", "Ist das Zertifikat aktuell?"]
                  ].map(([title, body]) => (
                    <div
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
                      key={title}
                    >
                      <h3 className="font-bold text-ink">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                    </div>
                  ))}
                </div>
                <p className="font-bold text-ink">
                  Ein Zertifikat ist nur dann nützlich, wenn es zur konkreten
                  Assessment-Frage passt.
                </p>
              </ArticleSection>

              <ArticleSection
                id="kein-zertifikat"
                number="07"
                title="Kein Zertifikat? Beantworten Sie den Fragebogen aus Ihrer tatsächlichen Unternehmenspraxis."
              >
                <p>
                  Gerade kleinere Unternehmen machen häufig einen Denkfehler:
                  Eine Frage klingt formal, also scheint sie nur für große
                  Konzerne zu gelten.
                </p>
                <p>
                  IntegrityNext weist selbst darauf hin, dass manche
                  Formulierungen stärker nach formalen Managementsystemen klingen
                  können, die Plattform aber auch von kleineren Unternehmen
                  genutzt werden kann.
                </p>
                <div className="my-8 rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
                    Beispiel
                  </p>
                  <p className="mt-4 leading-7 text-muted">
                    Wird nach einer verantwortlichen Person gefragt, kann diese
                    Verantwortung in einem kleineren Unternehmen direkt beim
                    Geschäftsführer, Inhaber, Qualitätsverantwortlichen, bei HR,
                    Einkauf oder Operations liegen.
                  </p>
                </div>
                <Principle>
                  Entscheidend ist nicht, ob Ihre Organisation wie ein Konzern
                  aussieht. Entscheidend ist, was in Ihrem Unternehmen
                  tatsächlich passiert.
                </Principle>
              </ArticleSection>

              <ArticleSection
                id="zustaendigkeit"
                number="08"
                title="Wer sollte IntegrityNext intern ausfüllen?"
              >
                <p>
                  Bei einem kleineren Produktionsunternehmen liegt die Anfrage
                  häufig zuerst bei Einkauf, Qualität, Administration oder
                  Geschäftsführung. Diese Person besitzt aber selten alle
                  Antworten.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {[
                    ["Qualität / Umwelt", ["Zertifikate", "Managementsysteme", "Umweltprozesse", "H&S", "Auditinformationen"]],
                    ["HR", ["Mitarbeitende", "Arbeitsbedingungen", "Trainings", "Diversity", "Health & Safety"]],
                    ["Einkauf", ["Lieferantenmanagement", "Beschaffungsanforderungen", "Supplier Code of Conduct", "Lieferketteninformationen"]],
                    ["Compliance / Geschäftsführung", ["Ethics", "Antikorruption", "Verantwortlichkeiten", "formelle Unternehmenspraktiken"]],
                    ["Finance / Operations", ["Energie", "Emissionen", "Produktions- und Verbrauchsdaten"]]
                  ].map(([title, items]) => (
                    <section
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6"
                      key={title as string}
                    >
                      <UsersRound aria-hidden="true" className="h-5 w-5 text-orange" />
                      <h3 className="mt-5 font-bold text-ink">{title as string}</h3>
                      <BulletList items={items as string[]} />
                    </section>
                  ))}
                </div>
                <p>
                  IntegrityNext ermöglicht zudem, weitere Kollegen zum Supplier
                  Profile hinzuzufügen, sodass mehrere Personen bei Review,
                  Completion und Updates unterstützen können.
                </p>
                <Principle>
                  Eine Person sollte koordinieren. Aber sie muss nicht jede
                  Antwort selbst erfinden.
                </Principle>
              </ArticleSection>

              <ArticleSection
                id="assessment-map"
                number="09"
                title="Erstellen Sie vor der Bearbeitung eine kleine Assessment Map."
              >
                <p>
                  Statt jedes Thema direkt in der Plattform zu bearbeiten, lohnt
                  sich eine interne Arbeitsübersicht.
                </p>
                <AssessmentMap />
                <p>Der Status kann einfach sein:</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "bereit",
                    "intern prüfen",
                    "Daten beschaffen",
                    "Dokument fehlt",
                    "Frage unklar"
                  ].map((status) => (
                    <span
                      className="rounded-full border border-[rgba(21,21,21,0.13)] bg-white px-3 py-1.5 text-xs font-bold text-ink"
                      key={status}
                    >
                      {status}
                    </span>
                  ))}
                </div>
                <p>
                  So sehen Sie den tatsächlichen Aufwand, bevor fünf Personen
                  gleichzeitig in verschiedenen Dokumenten suchen.
                </p>
              </ArticleSection>

              <ArticleSection
                id="dokumente"
                number="10"
                title="Welche Dokumente sollte man vorbereiten?"
              >
                <p>
                  Das hängt vom angeforderten Assessment ab. Je nach Frage können
                  beispielsweise relevant sein:
                </p>
                <BulletList
                  items={[
                    "Managementsystem-Zertifikate",
                    "Environmental Policy",
                    "Code of Conduct",
                    "Anti-Corruption Policy",
                    "Human Rights Policy",
                    "Supplier Code of Conduct",
                    "Health & Safety Dokumentation",
                    "Schulungsunterlagen und interne Prozesse",
                    "GHG-/Energiedaten",
                    "andere thematisch passende Nachweise"
                  ]}
                />
                <Principle>
                  Frage → reale Unternehmenspraxis → passende Antwort → passender
                  Nachweis
                </Principle>
                <p>
                  Nicht jedes Dokument gehört automatisch in jedes Assessment.
                  Für die allgemeine Evidence-Struktur ist ein separates Register
                  sinnvoll. Weiterlesen: {" "}
                  <Link
                    className="orange-link"
                    href="/de/ressourcen/esg-nachweise-lieferanten"
                  >
                    ESG-Nachweise für Lieferanten
                  </Link>
                  .
                </p>
                <p>
                  Für fehlende Emissionsdaten finden Sie außerdem den Arbeitsweg
                  zu {" "}
                  <Link className="orange-link" href="/de/scope-1-2-berechnung">
                    Scope 1 und Scope 2 berechnen
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection
                id="policy"
                number="11"
                title="Eine Policy sollte reale Praxis beschreiben."
              >
                <p>
                  Wenn eine IntegrityNext-Frage nach einer Policy, einem Prozess
                  oder einer Maßnahme fragt, sollte die Antwort auf der
                  tatsächlichen Unternehmenssituation beruhen.
                </p>
                <p>
                  Hat Ihr Unternehmen beispielsweise seit Jahren einen klaren
                  Arbeitssicherheitsprozess, der nie sauber in einem formellen
                  Dokument zusammengeführt wurde, kann es sinnvoll sein, die
                  tatsächliche bestehende Praxis zu dokumentieren.
                </p>
                <div className="my-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
                      Sachgerechter Ablauf
                    </p>
                    <p className="mt-4 font-mono text-sm font-bold leading-7 text-ink">
                      bestehende Praxis → Entwurf → Prüfung → Korrektur → formelle
                      interne Annahme
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[rgba(21,21,21,0.48)]">
                      Nicht
                    </p>
                    <p className="mt-4 font-mono text-sm leading-7 text-muted">
                      gewünschte Antwort → Policy kopieren → so tun, als hätte sie
                      bereits bestanden
                    </p>
                  </div>
                </div>
                <p>
                  Ein neu verabschiedetes Dokument ist eine neue Richtlinie. Es
                  wird dadurch nicht rückwirkend zu einem historischen Nachweis.
                  Wie evipace Quellen, Nachweise und Review trennt, erläutert{" "}
                  <Link className="orange-link" href="/de/methodology">
                    Unsere Methodik
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection
                id="nicht-alles-ja"
                number="12"
                title="Muss ich jede Frage mit „Ja“ beantworten?"
              >
                <p>Nein.</p>
                <p>
                  Ein ESG-Assessment ist keine Prüfung, bei der jede Antwort
                  zwingend Ja lauten muss. IntegrityNext sieht bei Fragebögen
                  ausdrücklich Ja- und Nein-Antworten vor.
                </p>
                <div className="my-8 rounded-[1rem] border-l-2 border-orange bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
                    Die richtige Grundlage
                  </p>
                  <p className="font-display mt-4 text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.16] text-ink">
                    „Wie ist der tatsächliche Stand unseres Unternehmens?“
                  </p>
                </div>
                <p>
                  Das schließt nicht aus, dass Sie anschließend Verbesserungen
                  umsetzen. Aber Verbesserung sollte auf einen sichtbaren Gap
                  folgen – nicht auf eine erfundene Antwort.
                </p>
              </ArticleSection>

              <ArticleSection
                id="status"
                number="13"
                title="Was bedeutet der IntegrityNext-Status?"
              >
                <p>
                  Nach der Bearbeitung können verschiedene Ergebnisse
                  beziehungsweise Statusdarstellungen sichtbar werden.
                  IntegrityNext empfiehlt Lieferanten, insbesondere Themen zu
                  überprüfen, die nicht den gewünschten Status haben,
                  Informationen aktuell zu halten und ablaufende Zertifikate zu
                  erneuern.
                </p>
                <p>
                  Ein Status ist nicht nur eine grafische Farbe, die „optimiert“
                  werden soll. Wenn ein Thema Schwächen zeigt, sollte zuerst
                  geprüft werden:
                </p>
                <BulletList
                  items={[
                    "Welche Frage verursacht das Ergebnis?",
                    "Fehlt eine reale Praxis?",
                    "Fehlt nur die Dokumentation?",
                    "Ist ein Zertifikat abgelaufen?",
                    "Ist eine Antwort falsch oder veraltet?",
                    "Gibt es einen echten Verbesserungsbedarf?"
                  ]}
                />
                <Principle>
                  Status verbessern sollte bedeuten: Unternehmensrealität
                  verbessern – und sie korrekt dokumentieren.
                </Principle>
              </ArticleSection>

              <ArticleSection
                id="nachbesserungsbedarf"
                number="14"
                title="Was bedeutet „Nachbesserungsbedarf“?"
              >
                <p>
                  Das ist einer der wichtigsten Begriffe für Lieferanten.
                  IntegrityNext kann eingereichte Antworten und Dokumente
                  überprüfen.
                </p>
                <p>
                  Wenn das Validation Team dabei Unklarheiten oder Widersprüche
                  feststellt, kann der Lieferant eine Nachricht mit dem Betreff
                  „Nachbesserungsbedarf“ erhalten.
                </p>
                <div className="my-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[rgba(21,21,21,0.48)]">
                      Bedeutet nicht automatisch
                    </p>
                    <p className="font-display mt-4 text-2xl text-ink">
                      „Ihr gesamtes Assessment ist falsch.“
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
                      Bedeutet
                    </p>
                    <p className="font-display mt-4 text-2xl text-ink">
                      Ein bestimmter Punkt muss geklärt oder korrigiert werden.
                    </p>
                  </div>
                </div>
                <p>IntegrityNext nennt als typische Prüfbereiche:</p>
                <BulletList
                  items={[
                    "Selbstauskunft passt zu Firmenname und Standort",
                    "alle angeforderten Fragebögen wurden bearbeitet",
                    "Fragen wurden beantwortet",
                    "Zertifikat passt zum abgefragten Thema",
                    "Zertifikat ist hochgeladen",
                    "Gültigkeit wurde korrekt angegeben"
                  ]}
                />
              </ArticleSection>

              <ArticleSection
                id="nachbesserung-bearbeiten"
                number="15"
                title="So gehen Sie bei Nachbesserungsbedarf vor."
              >
                <div className="grid gap-4">
                  {[
                    ["Nicht das gesamte Assessment neu bearbeiten.", "Prüfen Sie zuerst genau, welches Thema IntegrityNext markiert hat."],
                    ["Lesen Sie die konkrete Anweisung.", "Die Nachricht beziehungsweise Plattforminformation sollte zeigen, was geklärt werden muss."],
                    ["Prüfen Sie die Quelle Ihrer ursprünglichen Antwort.", "War die Antwort korrekt?"],
                    ["Prüfen Sie das Dokument.", "Passt es wirklich zum Thema, Unternehmen und Standort?"],
                    ["Korrigieren Sie die tatsächliche Ursache.", "Nicht nur die sichtbare Formulierung."],
                    ["Falls unklar, IntegrityNext Support nutzen.", "Bei technischen oder Validierungsfragen ist IntegrityNext selbst die maßgebliche Stelle."]
                  ].map(([title, body], index) => (
                    <div
                      className="grid gap-3 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 sm:grid-cols-[2.2rem_1fr]"
                      key={title}
                    >
                      <span className="font-mono text-xs font-bold text-orange">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="font-bold leading-6 text-ink">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="my-8 rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
                    Beispiel
                  </p>
                  <p className="mt-4 leading-7 text-muted">
                    Das Problem ist möglicherweise nicht, dass ein ISO-Zertifikat
                    „nicht akzeptiert“ wurde. Die tatsächliche Ursache kann sein,
                    dass das hochgeladene Zertifikat ein anderes Managementthema
                    betrifft.
                  </p>
                </div>
              </ArticleSection>

              <ArticleSection
                id="kundensicht"
                number="16"
                title="Was sieht mein Kunde?"
              >
                <p>
                  IntegrityNext beschreibt sein Modell so, dass der anfragende
                  Geschäftspartner die Informationen des Lieferanten erhält,
                  nachdem der Lieferant an der entsprechenden Anfrage teilnimmt.
                </p>
                <p>
                  Ihre Antworten sollten deshalb nicht als internes Testformular
                  behandelt werden. Bevor Sie Informationen freigeben, sollten
                  Unternehmensangaben:
                </p>
                <BulletList
                  items={[
                    "intern korrekt sein",
                    "zum richtigen Unternehmen gehören",
                    "konsistent sein",
                    "und von den jeweils zuständigen Personen bestätigt werden"
                  ]}
                />
                <p>
                  Besonders bei Aussagen über Policies, Compliance,
                  Menschenrechte, Unternehmensprozesse oder Emissionen sollte
                  nicht eine einzelne administrative Person etwas behaupten, was
                  intern nie bestätigt wurde.
                </p>
              </ArticleSection>

              <ArticleSection
                id="profil-wiederverwenden"
                number="17"
                title="Bereits IntegrityNext-Profil vorhanden? Nicht automatisch von vorne anfangen."
              >
                <p>
                  Einer der praktischen Vorteile eines bestehenden Supplier
                  Profiles ist die Wiederverwendung. IntegrityNext beschreibt,
                  dass ein vorhandenes Profil mit weiteren anfragenden Kunden
                  geteilt werden kann, sodass nicht dieselben Standardinformationen
                  jedes Mal vollständig neu beantwortet werden müssen.
                </p>
                <p>Das heißt aber nicht: Einmal ausgefüllt = für immer erledigt.</p>
                <p>Ein neuer Kunde kann:</p>
                <BulletList
                  items={[
                    "weitere Themen anfordern",
                    "zusätzliche Assessments aktivieren",
                    "oder inzwischen aktualisierte Informationen benötigen"
                  ]}
                />
                <p>
                  Deshalb sollte ein bestehendes Profil vor einer neuen
                  Kundenfreigabe trotzdem geprüft werden.
                </p>
              </ArticleSection>

              <ArticleSection
                id="kein-einmalprojekt"
                number="18"
                title="IntegrityNext ist kein einmaliges Projekt."
              >
                <p>
                  Nach der ersten Bearbeitung sollten mindestens drei Dinge
                  weiter gepflegt werden.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-3">
                  {[
                    ["Zertifikate", "Laufen Zertifikate ab, müssen sie aktualisiert werden."],
                    ["Unternehmensinformationen", "Ändern sich Verantwortlichkeiten oder Prozesse, sollten Antworten aktualisiert werden."],
                    ["Assessments", "Fragebögen können angepasst werden und zusätzliche Themen können relevant werden."]
                  ].map(([title, body]) => (
                    <div
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
                      key={title}
                    >
                      <RefreshCw aria-hidden="true" className="h-5 w-5 text-orange" />
                      <h3 className="mt-5 font-bold text-ink">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
                    </div>
                  ))}
                </div>
                <p>
                  IntegrityNext weist Lieferanten nach eigener Dokumentation
                  beispielsweise bei ablaufenden Zertifikaten, neuen Einladungen
                  oder neuen offenen Themen auf Aktualisierungsbedarf hin.
                </p>
                <Principle>
                  Nicht „IntegrityNext erledigt“, sondern:
                  „IntegrityNext-Datenbasis gepflegt.“
                </Principle>
              </ArticleSection>

              <ArticleSection
                id="updated-assessments"
                number="19"
                title="Was bedeutet „Updated Assessments – Please Review“?"
              >
                <p>
                  IntegrityNext aktualisiert seine Fragebögen im Zeitverlauf. Für
                  betroffene Profile kann deshalb die Aufforderung „Updated
                  Assessments – Please Review“ erscheinen.
                </p>
                <p>
                  Dann sollten markierte Assessments erneut geprüft und die
                  Antworten bestätigt beziehungsweise aktualisiert werden.
                  IntegrityNext beschreibt außerdem, dass bei offenen Fragen
                  weitere Kollegen über die Plattform eingebunden werden können.
                </p>
                <Principle>
                  Eine dokumentierte Quelle ist hilfreicher als: „Ich glaube, das
                  hatten wir letztes Mal so angeklickt.“
                </Principle>
              </ArticleSection>

              <ArticleSection
                id="eigene-datenbasis"
                number="20"
                title="Nutzen Sie IntegrityNext nicht als einzige ESG-Datenablage."
              >
                <p>Das ist strategisch wichtig.</p>
                <p>
                  Zertifikate, Policies, Compliance-Informationen, Energie- und
                  Emissionsdaten, Mitarbeitendendaten und Lieferantenprozesse
                  gehören nicht ausschließlich zu IntegrityNext.
                </p>
                <p>Morgen kann ein Kunde dieselben Inhalte verlangen:</p>
                <BulletList
                  items={[
                    "per Excel-Fragebogen",
                    "über EcoVadis",
                    "in einem eigenen Supplier Portal",
                    "für einen Sustainability Report",
                    "oder in einer direkten ESG-Datenanfrage"
                  ]}
                />
                <Principle>
                  Unternehmensinformation → Quelle → Nachweis → Gültigkeit →
                  verwendbare Anfragen
                </Principle>
                <p>
                  IntegrityNext ist dann ein Ausgabekanal für Ihre
                  ESG-Datengrundlage – nicht deren einziger Besitzer.
                </p>
              </ArticleSection>

              <ArticleSection
                id="integritynext-ecovadis"
                number="21"
                title="IntegrityNext und EcoVadis sind nicht dasselbe."
              >
                <p>
                  Beide Plattformen können im Supplier-ESG-Kontext auftauchen.
                  Die Workflows unterscheiden sich aber.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6">
                    <FileBadge2 aria-hidden="true" className="h-5 w-5 text-orange" />
                    <h3 className="mt-5 font-display text-3xl text-ink">
                      IntegrityNext
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Je nach Thema steht für Lieferanten stark die Kombination
                      aus passendem Managementsystem-Zertifikat oder
                      entsprechendem Fragebogen im Vordergrund.
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6">
                    <FileCheck2 aria-hidden="true" className="h-5 w-5 text-orange" />
                    <h3 className="mt-5 font-display text-3xl text-ink">EcoVadis</h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      EcoVadis arbeitet mit einem eigenen Sustainability Rating
                      und umfangreicher Supporting-Document-Methodik.
                    </p>
                  </div>
                </div>
                <Principle>
                  gleiche Unternehmensrealität → gleiche belastbare Quellen →
                  plattformspezifische Aufbereitung
                </Principle>
                <p>
                  Weiterlesen: {" "}
                  <Link
                    className="orange-link"
                    href="/de/ressourcen/ecovadis-dokumente-nachweise"
                  >
                    EcoVadis-Dokumente und Nachweise
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection
                id="erste-24-stunden"
                number="22"
                title="Ein praktischer Ablauf für die ersten 24 Stunden."
              >
                <p>Wenn die IntegrityNext-Einladung heute angekommen ist:</p>
                <div className="mt-8 grid gap-4">
                  {[
                    "Einladung sichern und feststellen, welcher Kunde dahintersteht.",
                    "Prüfen, ob bereits ein Unternehmensprofil existiert.",
                    "Firmenname und Standort prüfen.",
                    "Offene beziehungsweise angeforderte Assessment-Themen erfassen.",
                    "Je Assessment einordnen: Zertifikat vorhanden / Fragebogen erforderlich / intern prüfen.",
                    "Verantwortliche Person pro Thema bestimmen.",
                    "Vorhandene Zertifikate und Nachweise sammeln.",
                    "Erst danach Antworten finalisieren.",
                    "Vor Freigabe Konsistenz prüfen."
                  ].map((step, index) => (
                    <div
                      className="grid grid-cols-[2.6rem_1fr] gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
                      key={step}
                    >
                      <span className="font-mono text-xs font-bold text-orange">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="font-bold leading-7 text-ink">{step}</p>
                    </div>
                  ))}
                </div>
                <p>
                  So wird aus „Wir haben irgendeine IntegrityNext-E-Mail
                  bekommen“ ein klar definiertes internes Projekt.
                </p>
              </ArticleSection>

              <ArticleSection
                id="fehler"
                number="23"
                title="Welche Fehler sollten Lieferanten vermeiden?"
              >
                <div className="grid gap-4">
                  {[
                    ["Irgendein Zertifikat hochladen, weil der Dateiname passend klingt.", "Das Zertifikat muss zum Thema passen."],
                    ["Jede Frage unbedingt mit Ja beantworten wollen.", "Die Antwort sollte den tatsächlichen Unternehmensstand widerspiegeln."],
                    ["Eine nicht vorhandene Policy rückwirkend erzeugen.", "Neue Dokumentation darf neue Unternehmenspraxis dokumentieren – nicht eine erfundene Vergangenheit."],
                    ["Eine Person alle Fachfragen allein beantworten lassen.", "Datenquellen liegen häufig in mehreren Abteilungen."],
                    ["Unternehmens- und Standortbezug ignorieren.", "Zertifikate und Policies müssen zum relevanten Scope passen."],
                    ["Nach der ersten Bearbeitung nie wieder ins Profil schauen.", "Zertifikate, Assessments und Unternehmensdaten verändern sich."],
                    ["Nur für IntegrityNext Daten sammeln.", "Die zugrunde liegenden ESG-Informationen können auch für andere Kundenanfragen wertvoll sein."]
                  ].map(([title, body]) => (
                    <div
                      className="flex gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
                      key={title}
                    >
                      <CircleAlert
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-orange"
                      />
                      <div>
                        <h3 className="font-bold leading-6 text-ink">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ArticleSection>

              <ArticleSection
                id="externe-unterstuetzung"
                number="24"
                title="Wann externe Unterstützung sinnvoll wird."
              >
                <p>Nicht jede IntegrityNext-Einladung braucht externe Hilfe.</p>
                <p>
                  Sind nur wenige Assessments offen, alle Informationen vorhanden,
                  passende Zertifikate verfügbar und die Zuständigkeit klar, kann
                  die Bearbeitung relativ unkompliziert sein.
                </p>
                <p>Unterstützung wird sinnvoller, wenn:</p>
                <BulletList
                  items={[
                    "niemand intern die Anfrage koordinieren kann",
                    "mehrere Assessments gleichzeitig offen sind",
                    "Zertifikate und Fragebogenantworten korrekt zugeordnet werden müssen",
                    "benötigte Policies fehlen",
                    "Scope-1- oder Scope-2-Daten verlangt werden",
                    "mehrere Standorte betroffen sind",
                    "Antworten zwischen Abteilungen widersprüchlich sind",
                    "Nachbesserungsbedarf entstanden ist",
                    "oder die Informationen für weitere ESG-Anfragen wiederverwendet werden sollen"
                  ]}
                />
                <p>
                  Dann liegt die eigentliche Arbeit nicht im Anklicken der
                  Plattform. Sondern in:
                </p>
                <Principle>
                  Anforderung → Datenquelle → Antwort → Nachweis → interne
                  Bestätigung → Plattform
                </Principle>
              </ArticleSection>

              <section
                aria-labelledby="article-cta-title"
                className="my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12"
              >
                <ShieldCheck aria-hidden="true" className="h-7 w-7 text-orange" />
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                  Ihr nächster Schritt
                </p>
                <h2
                  className="font-display mt-5 max-w-[15ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]"
                  id="article-cta-title"
                >
                  Sie wurden zu IntegrityNext eingeladen?
                </h2>
                <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-white/68">
                  <p>
                    Senden Sie uns die Kundenanfrage beziehungsweise die
                    Informationen zu den angeforderten Assessments und die
                    Unterlagen, die bereits vorhanden sind.
                  </p>
                  <p>
                    Wir helfen dabei, die benötigten Informationen zu
                    strukturieren, Zertifikate und Nachweise zuzuordnen, offene
                    Punkte sichtbar zu machen und die Antworten für die Eingabe in
                    IntegrityNext vorzubereiten.
                  </p>
                  <p className="font-semibold text-white">
                    Sie behalten die Kontrolle über Ihr Unternehmensprofil und
                    reichen die Angaben selbst in IntegrityNext ein.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink
                    className="w-full sm:w-auto"
                    href={SEND_REQUEST_HREF}
                  >
                    IntegrityNext-Anfrage senden
                  </ButtonLink>
                  <ButtonLink
                    className="w-full sm:w-auto"
                    href="/de/integritynext-unterstuetzung"
                    variant="light"
                  >
                    IntegrityNext-Unterstützung
                  </ButtonLink>
                </div>
                <p className="mt-6 text-sm font-semibold text-white/50">
                  Einladung · Assessments · Zertifikate · Fragebögen · Nachweise
                </p>
                <p className="mt-4 max-w-2xl text-xs leading-6 text-white/42">
                  Evipace ist ein unabhängiger Dienstleister und weder mit
                  IntegrityNext verbunden noch ein offizieller
                  IntegrityNext-Partner. Die Eingabe und Freigabe im
                  IntegrityNext-Profil sowie die finale Validierung liegen beim
                  Lieferanten beziehungsweise bei IntegrityNext.
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
                  Häufige Fragen zu IntegrityNext für Lieferanten
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
                    <ExternalSourceLink href={WHAT_IS_INTEGRITYNEXT_URL}>
                      IntegrityNext Helpdesk — Was ist IntegrityNext?
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Supplier Workflow, Einladung, Zertifikat-oder-Fragebogen-
                      Modell und Wiederverwendung eines vorhandenen Profils.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={ANSWER_ASSESSMENT_URL}>
                      IntegrityNext Helpdesk — Wie beantworte ich das Assessment?
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Offizielle Erläuterung der Zertifikat-oder-Fragebogen-Logik.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={SMALL_BUSINESS_URL}>
                      IntegrityNext Helpdesk — Die Fragen treffen auf unser
                      Unternehmen nicht zu
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Hinweise für kleinere Lieferanten und Unternehmen ohne
                      formales Zertifikat.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={VALIDATION_URL}>
                      IntegrityNext Helpdesk — Nachbesserungsbedarf
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Validation, Widersprüche, Unternehmens- und Standortbezug
                      sowie Zertifikatsanforderungen.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={KEEP_CURRENT_URL}>
                      IntegrityNext Helpdesk — Unternehmensdaten aktuell halten
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Profilaktualisierungen, ablaufende Zertifikate und neue
                      Anfragen.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={SUPPLIER_COST_URL}>
                      IntegrityNext Helpdesk — Entstehen dabei Kosten?
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Kostenfreie Nutzung für eingeladene Lieferanten und
                      Abgrenzung zur eigenen Kundennutzung der Plattform.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={SUPPLIER_TERMS_URL}>
                      IntegrityNext — Geschäftsbedingungen für Lieferanten
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Offizielle Bedingungen zum Lieferanten-Account, zur
                      wahrheitsgemäßen Beantwortung und zur Nutzung durch weitere
                      Personen im Unternehmen.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={ADD_COLLEAGUE_URL}>
                      IntegrityNext Helpdesk — Kollegen zum Supplier Profile
                      hinzufügen
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Einbindung weiterer interner Personen in die Bearbeitung.
                    </p>
                  </li>
                  <li>
                    <ExternalSourceLink href={UPDATED_ASSESSMENTS_URL}>
                      IntegrityNext Helpdesk — Updated Assessments – Please Review
                    </ExternalSourceLink>
                    <p className="mt-1">
                      Prüfung und Bestätigung aktualisierter Assessments.
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
