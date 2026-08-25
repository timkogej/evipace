import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  ExternalLink,
  Link2,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";
import { EsgQuestionnaireChecklist } from "./EsgQuestionnaireChecklist";

const SEND_REQUEST_HREF = "/de/send-request";

const ECOVADIS_DOCUMENTS_URL =
  "https://support.ecovadis.com/hc/en-us/articles/210460307-Understanding-supporting-documents";
const ECOVADIS_LIMIT_URL =
  "https://support.ecovadis.com/hc/en-us/articles/115002646148-Why-is-there-a-limit-to-the-number-of-documents-that-can-be-provided";
const INTEGRITYNEXT_HELP_URL = "https://helpdesk.integritynext.com/hc/de";
const INTEGRITYNEXT_ASSESSMENT_URL =
  "https://helpdesk.integritynext.com/hc/de/articles/360018443680-Wie-beantworte-ich-das-Assessment";
const EFRAG_STANDARD_URL =
  "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard";
const GHG_PROTOCOL_URL = "https://ghgprotocol.org/corporate-standard";

const redFlags = [
  "Ja-Antwort ohne bekannte Grundlage",
  "Policy wurde erst jetzt erstellt, aber als historischer Nachweis verwendet",
  "Zertifikat gehört zu einer anderen Gesellschaft oder einem anderen Standort",
  "Scope-1- oder Scope-2-Zahl ohne Faktorquelle",
  "Mitarbeiterzahl ohne Headcount- oder FTE-Definition",
  "Null Compliance-Vorfälle ohne interne Bestätigung",
  "Unterschiedliche Stromzahlen ohne Reconciliation",
  "Group Data und Entity Data vermischt",
  "Nicht anwendbar nur verwendet, weil Information fehlt",
  "Fremde Vorlage als bestehende Unternehmenspraxis dargestellt",
  "Altes Dokument hochgeladen, ohne Gültigkeit zu prüfen",
  "Plattformregeln aus dem Vorjahr ungeprüft übernommen",
  "Finale Antwort noch nicht von der Unternehmensseite bestätigt"
];

const faqItems = [
  {
    question:
      "Was sollte ich als Erstes tun, wenn ein Kunde einen ESG-Fragebogen schickt?",
    answer:
      "Nicht sofort Feld für Feld antworten. Zuerst sollten Kunde, Deadline, Gesellschaft, Standorte, Berichtszeitraum und Format geklärt und anschließend die Fragen nach Themen und internen Verantwortlichen sortiert werden."
  },
  {
    question: "Wer sollte den Fragebogen ausfüllen?",
    answer:
      "Eine Person kann den Prozess koordinieren. Die zugrunde liegenden Informationen sollten jedoch von den jeweiligen internen Fachbereichen kommen – beispielsweise Finance, HR, Qualität, Facility, Einkauf, Operations oder Compliance."
  },
  {
    question: "Brauche ich für jede Antwort einen Nachweis?",
    answer:
      "Nicht jede Kundenfrage funktioniert gleich. Bei wesentlichen Aussagen sollte aber geprüft werden, welche interne Quelle die Antwort trägt und ob ein Dokument oder anderer Nachweis verlangt beziehungsweise sinnvoll ist. Bei EcoVadis können Antworten nur dann entsprechend berücksichtigt werden, wenn geeignete Supporting Documents sie stützen."
  },
  {
    question: "Was mache ich, wenn eine Policy fehlt?",
    answer:
      "Zuerst prüfen, ob die zugrunde liegende Unternehmenspraxis tatsächlich existiert. Existiert sie, kann eine Policy vorbereitet, intern geprüft und autorisiert verabschiedet werden. Ein neuer Entwurf sollte aber nicht als bereits historisch bestehende Unternehmensrichtlinie dargestellt werden."
  },
  {
    question: "Was mache ich, wenn Daten fehlen?",
    answer:
      "Unterscheiden Sie zwischen noch nicht beschafft, zu berechnen, zu bestätigen, Dokumentations-Gap, realem Gap und nicht anwendbar. Diese Situationen brauchen unterschiedliche Lösungen."
  },
  {
    question: "Kann ich alte Antworten aus einem früheren Fragebogen wiederverwenden?",
    answer:
      "Ja, aber nicht ungeprüft. Gesellschaft, Standort, Berichtszeitraum, Definition, Quelle, Dokumentversion und aktuelle Kundenfrage müssen weiterhin passen. Der Leitfaden zur wiederverwendbaren ESG-Datengrundlage zeigt, wie Daten und Nachweise für spätere Anfragen strukturiert werden können."
  },
  {
    question: "Kann ich dieselben Nachweise für mehrere Kunden verwenden?",
    answer:
      "Die zugrunde liegende Unternehmensquelle häufig ja. Ob das konkrete Dokument in einer bestimmten Plattform oder Anfrage akzeptiert wird, hängt aber vom jeweiligen Assessment und dessen Regeln ab."
  },
  {
    question: "Was soll ich nach der Einreichung speichern?",
    answer:
      "Die finale Antwort, verwendete Daten, Quellen, Evidence Map, Data Owner, Berechnungen, Faktorversionen, Policy-Versionen und offene Gaps. Dadurch kann die nächste Kundenanfrage deutlich schneller bearbeitet werden."
  },
  {
    question: "Garantiert die Checkliste, dass mein Kunde die Antworten akzeptiert?",
    answer:
      "Nein. Sie dient als interne Vorbereitungs- und Quality-Control-Struktur. Die konkrete Akzeptanz hängt vom Kunden, der Plattform und den jeweiligen Anforderungen ab."
  }
];

function ExternalSourceLink({
  children,
  href
}: {
  children: ReactNode;
  href: string;
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

function ChecklistArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art">
      <svg
        className="resource-hero-art__sheet"
        fill="none"
        viewBox="0 0 520 650"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          height="520"
          rx="18"
          stroke="currentColor"
          strokeOpacity="0.42"
          strokeWidth="2"
          width="390"
          x="65"
          y="58"
        />
        {[142, 216, 290, 364, 438].map((y, index) => (
          <g key={y}>
            <rect
              fill={index < 3 ? "#FE7001" : "none"}
              fillOpacity={index < 3 ? 0.18 : 0}
              height="30"
              rx="5"
              stroke="currentColor"
              strokeWidth="2"
              width="30"
              x="112"
              y={y}
            />
            {index < 3 ? (
              <path
                d={`M120 ${y + 15}L128 ${y + 23}L145 ${y + 5}`}
                stroke="#FE7001"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            ) : null}
            <path
              d={`M170 ${y + 9}H388M170 ${y + 22}H330`}
              stroke="currentColor"
              strokeOpacity="0.34"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>
      <span className="resource-hero-art__code">
        SCOPE · DATA · EVIDENCE · REVIEW
      </span>
    </div>
  );
}

export function EsgQuestionnaireChecklistGuide() {
  return (
    <div className="esg-checklist-page">

      <main id="top">
        <article>
          <header
            aria-labelledby="article-title"
            className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28"
          >
            <ChecklistArtwork />
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
                <span className="text-ink">ESG-Fragebogen Checkliste</span>
              </nav>

              <div className="mt-12 max-w-6xl">
                <p className="eyebrow">
                  ESG-Fragebogen · Checkliste für Lieferanten
                </p>
                <h1
                  className="font-display mt-7 max-w-[16ch] break-words hyphens-auto text-[clamp(3.05rem,6.8vw,6.35rem)] leading-[0.92]"
                  id="article-title"
                >
                  ESG-Fragebogen Checkliste für Lieferanten
                </h1>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
                <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                  <p>
                    Ihr Kunde hat einen ESG- oder Nachhaltigkeitsfragebogen
                    geschickt. Bevor Sie Antworten Feld für Feld eintragen,
                    sollten Scope, Daten, Belegbarkeit und der finale Review
                    geklärt sein.
                  </p>
                  <p className="mt-6">
                    Diese Checkliste können Sie direkt beim Bearbeiten der
                    Kundenanfrage verwenden – über eine halbe Stunde, mehrere
                    Stunden oder mehrere Arbeitssitzungen hinweg.
                  </p>
                </div>
                <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                  <ClipboardCheck aria-hidden="true" className="h-8 w-8 text-orange" />
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                    Arbeitsablauf
                  </p>
                  <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">
                    Anfrage → Scope → Verantwortliche → Daten → Nachweise →
                    Berechnungen → Review → Einreichung → Wiederverwendung
                  </p>
                </aside>
              </div>

              <div className="mt-12 grid gap-3 border-t border-[rgba(21,21,21,0.12)] pt-7 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Sie wissen, für wen Sie antworten.",
                  "Sie haben die richtigen Daten.",
                  "Ihre Aussagen sind belegbar.",
                  "Jemand prüft die finale Antwort als Ganzes."
                ].map((item, index) => (
                  <div className="flex gap-3" key={item}>
                    <span className="font-mono text-xs font-bold text-orange">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold leading-6 text-ink">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <section className="bg-ink py-16 text-white sm:py-20">
            <div className="site-shell grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
              <div>
                <p className="eyebrow">Direkt loslegen</p>
                <h2 className="font-display mt-6 max-w-[14ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]">
                  Kein ESG-Grundkurs. Ein konkreter Arbeitsprozess.
                </h2>
              </div>
              <div className="max-w-3xl text-lg leading-8 text-white/68">
                <p>
                  Arbeiten Sie nicht linear, wenn Ihre internen Quellen in
                  anderer Reihenfolge eintreffen. Die Checkliste sperrt keine
                  Abschnitte. Jeder Punkt lässt sich unabhängig bearbeiten.
                </p>
                <p className="mt-5">
                  Wenn die Anfrage gerade erst eingegangen ist, hilft zunächst
                  der Überblick{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/welche-esg-daten-kunden-lieferanten"
                  >
                    welche ESG-Daten Kunden von Lieferanten verlangen
                  </Link>
                  . Danach ordnet der Leitfaden{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten"
                  >
                    ESG-Fragebogen vom Kunden erhalten
                  </Link>
                  . Danach können Sie hier praktisch weiterarbeiten.
                </p>
                <p className="mt-5">
                  Wenn eine Umweltrichtlinie fehlt oder nur als Entwurf
                  vorliegt, hilft der Leitfaden{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/environmental-policy-erstellen"
                  >
                    Environmental Policy erstellen
                  </Link>
                  , damit Praxis, Scope, Freigabe und Nachweise nicht
                  verwechselt werden.
                </p>
                <p className="mt-5">
                  Geht es um Lieferantenanforderungen, hilft der Leitfaden{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/supplier-code-of-conduct-erstellen"
                  >
                    Supplier Code of Conduct erstellen
                  </Link>
                  , damit Code, Kommunikation, Bestätigung und vertraglicher
                  Status getrennt bleiben.
                </p>
                <p className="mt-5">
                  Nach der Bearbeitung hilft der Leitfaden zur{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"
                  >
                    wiederverwendbaren ESG-Datengrundlage
                  </Link>
                  , damit Daten, Quellen und Nachweise nicht bei jeder Anfrage
                  neu zusammengesucht werden.
                </p>
              </div>
            </div>
          </section>

          <div className="site-shell max-w-[70rem] py-10 sm:py-16">
            <EsgQuestionnaireChecklist />

            <section
              aria-labelledby="red-flags-title"
              className="checklist-red-flags mt-10 scroll-mt-28 overflow-hidden rounded-[1.3rem] border border-[rgba(254,112,1,0.35)] bg-[#fff4ea] p-6 sm:mt-12 sm:p-9 lg:p-11"
              id="red-flags"
            >
              <div className="flex items-start gap-4">
                <ShieldAlert
                  aria-hidden="true"
                  className="mt-1 h-8 w-8 shrink-0 text-orange"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a84800]">
                    Red Flags
                  </p>
                  <h2
                    className="font-display mt-4 max-w-[16ch] text-[clamp(2.4rem,5vw,4.5rem)] leading-none text-ink"
                    id="red-flags-title"
                  >
                    Stop – vor der Einreichung noch einmal prüfen
                  </h2>
                  <p className="mt-5 max-w-2xl leading-7 text-muted">
                    Diese Warnungen zählen bewusst nicht zum Erfolgsfortschritt.
                    Wenn einer dieser Fälle vorliegt, sollte er vor der
                    Einreichung geklärt werden.
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                    Wenn Sie nicht den ganzen Fragebogen, sondern einen einzelnen
                    Nachweis prüfen möchten, nutzen Sie den{" "}
                    <Link
                      className="font-bold text-ink underline decoration-orange/60 underline-offset-4 hover:text-orange"
                      href="/de/ressourcen/esg-nachweise-checkliste"
                    >
                      ESG Evidence Readiness Check
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <ul className="mt-8 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {redFlags.map((flag) => (
                  <li
                    className="flex gap-3 border-t border-[rgba(168,72,0,0.18)] py-4 text-sm font-semibold leading-6 text-ink"
                    key={flag}
                  >
                    <AlertTriangle
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#a84800]"
                    />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="article-cta-title"
              className="checklist-cta my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12"
            >
              <ClipboardCheck aria-hidden="true" className="h-7 w-7 text-orange" />
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                Ihr nächster Schritt
              </p>
              <h2
                className="font-display mt-5 max-w-[14ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]"
                id="article-cta-title"
              >
                Der Fragebogen ist länger als die Checkliste?
              </h2>
              <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-white/68">
                <p>Senden Sie uns die ursprüngliche Kundenanfrage.</p>
                <p>
                  Wir zerlegen den Fragebogen in konkrete Datenpunkte, ordnen
                  interne Quellen und Verantwortliche zu, bereiten notwendige
                  Berechnungen vor, strukturieren Nachweise und machen Gaps
                  sichtbar.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink
                  className="w-full sm:w-auto"
                  href={SEND_REQUEST_HREF}
                >
                  ESG-Fragebogen senden
                </ButtonLink>
                <ButtonLink
                  className="w-full sm:w-auto"
                  href="/de/esg-fragebogen-lieferanten"
                  variant="light"
                >
                  ESG-Fragebogen für Lieferanten
                </ButtonLink>
                <Link
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-orange hover:text-orange sm:w-auto"
                  href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten"
                >
                  ESG-Fragebogen erhalten – was jetzt?
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-6 text-sm font-semibold text-white/50">
                Fragebogen · Daten · Nachweise · Berechnungen · Review
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
                Häufige Fragen zur ESG-Fragebogen-Checkliste
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
                    EcoVadis — Understanding supporting documents
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Offizielle Anforderungen an Relevanz, Aktualität, Scope und
                    Belegfunktion von Supporting Documents.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={ECOVADIS_LIMIT_URL}>
                    EcoVadis — Dokumentenlimit
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Aktuelles Limit von 55 Dokumenten pro Assessment und Regeln
                    zu absichtlich kombinierten Dokumenten.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={INTEGRITYNEXT_HELP_URL}>
                    IntegrityNext — Supplier Help Center
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Aktuelle Informationen zu Supplier Profile, Assessments und
                    Aktualisierungen.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={INTEGRITYNEXT_ASSESSMENT_URL}>
                    IntegrityNext — Assessment beantworten
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Offizielle Beschreibung der Zertifikats- oder
                    Fragebogenlogik.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={EFRAG_STANDARD_URL}>
                    EFRAG — 2026 Voluntary Standard
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Offizielle Struktur relevanter Umwelt-, Social- und
                    Governance-Datenpunkte.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={GHG_PROTOCOL_URL}>
                    GHG Protocol — Corporate Standard
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Grundlage für Corporate-GHG-Inventare und die Einordnung
                    von Scope 1 und Scope 2.
                  </p>
                </li>
              </ul>
              <p className="mt-7 text-xs leading-6 text-[rgba(21,21,21,0.48)]">
                Evipace ist unabhängig von EcoVadis und IntegrityNext und weder
                offizieller Partner noch Validierungsstelle dieser Plattformen.
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
