import type { ReactNode } from "react";
import { ArrowRight, RefreshCw, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";

const reusableComponents = [
  ["Datenpunkt", "Stromverbrauch Standort A", "Nicht nur eine Zahl speichern, sondern klar definieren, welche Information gemeint ist."],
  ["Wert", "428 MWh", "Der Wert bleibt nur nutzbar, wenn Einheit, Scope und Zeitraum mitgeführt werden."],
  ["Definition", "Eingekaufter Strom des Produktionsstandorts innerhalb des Berichtszeitraums.", "Eine Definition verhindert, dass ähnliche Kennzahlen später verwechselt werden."],
  ["Zeitraum", "01.01.2025 – 31.12.2025", "Zeitbezug ist bei Kennzahlen, Zertifikaten und Nachweisen ein zentraler Prüfpunkt."],
  ["Quelle / Nachweis", "12 Stromrechnungen + interne Jahresübersicht", "Die ursprüngliche Grundlage sollte später noch auffindbar sein."],
  ["Verantwortliche Stelle", "Facility Management / Finance", "Ein Owner hilft, Aktualität und fachliche Richtigkeit erneut zu bestätigen."]
] as const;

const statusExamples = ["bestätigt", "zu prüfen", "veraltet", "Daten fehlen"] as const;

const dataRecord = [
  ["Datenpunkt", "Stromverbrauch"],
  ["Gesellschaft", "Muster GmbH"],
  ["Standort", "Werk A"],
  ["Zeitraum", "2025"],
  ["Wert", "428 MWh"],
  ["Einheit", "MWh"],
  ["Quelle", "Stromrechnungen"],
  ["Nachweis", "Jahresübersicht + Originalbelege"],
  ["Owner", "Facility / Finance"],
  ["Bestätigt durch", "zuständige interne Stelle"],
  ["Status", "aktuell"],
  ["Letzte Prüfung", "interner Review-Zeitpunkt"]
] as const;

const reuseGroups = [
  {
    title: "Häufig langfristig wiederverwendbar",
    items: [
      "Unternehmensstammdaten",
      "Standortinformationen",
      "grundlegende Policies, solange sie aktuell sind",
      "Zertifikate und deren Gültigkeit",
      "KPI-Definitionen",
      "interne Verantwortlichkeiten",
      "dokumentierte Berechnungsmethoden"
    ]
  },
  {
    title: "Periodisch aktualisierbar",
    items: [
      "Stromverbrauch",
      "Brennstoffe",
      "Scope 1 & 2",
      "Mitarbeitendenzahl",
      "Unfallkennzahlen",
      "Wasserverbrauch",
      "Abfallmengen",
      "Trainingskennzahlen"
    ]
  },
  {
    title: "Kunden- oder anfragespezifisch",
    items: [
      "konkrete Frageformulierung",
      "geforderter Scope",
      "gefordertes Berichtsjahr",
      "Plattformfelder",
      "kundenspezifische Erklärungen",
      "produktbezogene Informationen",
      "spezielle Nachweisanforderungen"
    ]
  }
] as const;

const foundationLayers = [
  ["1 · Stammdaten", "Gesellschaften, Standorte, Mitarbeitendenstruktur, Geschäftstätigkeit und organisatorischer Scope."],
  ["2 · Kennzahlen", "Energie, Emissionen, Umwelt-, Workforce- und andere wiederkehrende quantitative Daten."],
  ["3 · Policies & Prozesse", "Aktuelle intern verabschiedete Richtlinien, Verfahren und Verantwortlichkeiten."],
  ["4 · Evidence", "Rechnungen, Zertifikate, Berichte, HR-Auswertungen, Protokolle und weitere nachvollziehbare Quellen."],
  ["5 · Request Mapping", "Welche Datenpunkte wurden für welche Kundenfrage, Plattform oder Reporting-Anforderung verwendet?"]
] as const;

const ownerExamples = [
  ["Energy", "Facility / Finance"],
  ["Employees", "HR"],
  ["Waste", "EHS / Quality"],
  ["Supplier data", "Procurement"],
  ["Policies", "Fachbereich + Management"]
] as const;

const freshnessStatuses = [
  "Aktuell",
  "Neue Periode erforderlich",
  "Zu prüfen",
  "Ersetzt",
  "Nicht mehr gültig",
  "Daten fehlen"
] as const;

const platformCards = [
  ["EcoVadis", "EcoVadis-Unterstützung", "/de/ecovadis-unterstuetzung"],
  ["IntegrityNext", "IntegrityNext-Unterstützung", "/de/integritynext-unterstuetzung"],
  ["VSME", "VSME-Daten im Überblick", "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht"]
] as const;

const workflowSteps = [
  ["Anfrage analysieren", "Was wird tatsächlich verlangt?"],
  ["Datenpunkt definieren", "Welche konkrete Unternehmensinformation wird für die Antwort benötigt?"],
  ["Originalquelle finden", "Woher stammt die Information?"],
  ["Nachweis & Owner zuordnen", "Was unterstützt die Antwort und wer kann sie intern bestätigen?"],
  ["Strukturiert speichern", "Wert, Definition, Zeitraum, Scope, Quelle und Status gemeinsam dokumentieren."],
  ["Bei neuer Anfrage erneut prüfen", "Was ist noch aktuell, was muss aktualisiert und was neu erhoben werden?"]
] as const;

const copyPasteWarnings = [
  ["Falscher Zeitraum", "Daten aus einem früheren Berichtsjahr werden ungeprüft in eine neue Anfrage übernommen."],
  ["Falsche Gesellschaft", "Ein Gruppenwert wird für eine einzelne Gesellschaft verwendet, obwohl der Geltungsbereich nicht passt."],
  ["Falscher Standort", "Daten eines Werks werden als Wert für das gesamte Unternehmen verwendet."],
  ["Veraltete Policy", "Eine inzwischen ersetzte oder nicht mehr gültige Richtlinie wird erneut verwendet."],
  ["Geänderte Definition", "Der neue Kunde verwendet eine andere KPI-Definition oder Abgrenzung."],
  ["Neue Kundenanforderung", "Eine ähnlich formulierte Frage wird automatisch als identische Anforderung behandelt."]
] as const;

const resourceSystem = [
  ["Welche ESG-Daten werden verlangt?", "/de/ressourcen/welche-esg-daten-kunden-lieferanten"],
  ["Wer besitzt die Daten intern?", "/de/ressourcen/esg-daten-verantwortliche-abteilungen"],
  ["Wie bearbeite ich die Anfrage?", "/de/ressourcen/esg-fragebogen-checkliste-lieferanten"],
  ["Ist der Nachweis verwendbar?", "/de/ressourcen/esg-nachweise-checkliste"],
  ["Wie strukturiere ich Scope 1 & 2?", "/de/ressourcen/scope-1-2-datenerfassungs-vorlage"],
  ["Wie verwende ich die Struktur später erneut?", "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"]
] as const;

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink underline decoration-[rgba(254,112,1,0.35)] underline-offset-4 transition hover:text-orange"
      href={href}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-orange transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  light = false
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className={`font-display mt-5 scroll-mt-28 break-words hyphens-auto text-[clamp(2.35rem,4.8vw,4.8rem)] leading-[1] ${
          light ? "text-white" : "text-ink"
        }`}
        id={id}
      >
        {title}
      </h2>
      {children ? (
        <div className={`mt-6 space-y-4 text-base leading-8 sm:text-lg ${light ? "text-white/66" : "text-muted"}`}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li className="flex gap-3 text-sm leading-6 text-muted" key={item}>
          <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FlowLine({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((item, index) => (
        <li className={`relative min-w-0 border-t pt-4 ${dark ? "border-white/20" : "border-[rgba(21,21,21,0.16)]"}`} key={item}>
          {index < items.length - 1 ? (
            <ArrowRight aria-hidden="true" className="absolute -right-3 top-4 hidden h-4 w-4 text-orange lg:block" />
          ) : null}
          <span className="font-mono text-[0.62rem] font-bold text-orange">{String(index + 1).padStart(2, "0")}</span>
          <p className={`mt-2 break-words text-sm font-bold leading-5 ${dark ? "text-white" : "text-ink"}`}>{item}</p>
        </li>
      ))}
    </ol>
  );
}

function ReusableDataArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art">
      <svg className="resource-hero-art__sheet" fill="none" viewBox="0 0 520 650" xmlns="http://www.w3.org/2000/svg">
        <path d="M102 132H418M102 214H418M102 296H418M102 378H418M102 460H418" stroke="currentColor" strokeOpacity="0.52" strokeWidth="2" />
        {[132, 214, 296, 378, 460].map((y, index) => (
          <g key={y}>
            <rect height="34" rx="8" stroke="currentColor" strokeOpacity="0.62" strokeWidth="2" width="54" x="118" y={y - 17} />
            <path d={`M194 ${y}H386`} stroke="currentColor" strokeOpacity={index === 2 ? "0.74" : "0.34"} strokeWidth={index === 2 ? "9" : "6"} />
          </g>
        ))}
        <path d="M260 520V584M228 552H292" stroke="currentColor" strokeOpacity="0.74" strokeWidth="2" />
      </svg>
      <span className="resource-hero-art__code">DATA POINT · SOURCE · STATUS · REUSE</span>
    </div>
  );
}

export function EsgReusableDataGuide() {
  return (
    <main id="top">
      <article>
        <header aria-labelledby="article-title" className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
          <ReusableDataArtwork />
          <div className="site-shell relative z-10">
            <nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]">
              <Link className="transition hover:text-orange" href="/de">Startseite</Link>
              <span aria-hidden="true">/</span>
              <Link className="transition hover:text-orange" href="/de/ressourcen">Ressourcen</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">ESG-Daten einmal sammeln, mehrfach nutzen</span>
            </nav>

            <div className="mt-12 max-w-6xl">
              <p className="eyebrow">REUSABLE ESG DATA FOUNDATION</p>
              <h1 className="font-display mt-7 max-w-[17ch] break-words hyphens-auto text-[clamp(3.05rem,6.8vw,6.35rem)] leading-[0.92]" id="article-title">
                ESG-Daten einmal sammeln. Für die nächste Anfrage wiederverwenden.
              </h1>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
              <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                <p>Viele Lieferanten beantworten ESG-Anfragen noch wie Einzelprojekte: Fragebogen öffnen, Daten zusammensuchen, Nachweise anfordern, Antworten vorbereiten – und beim nächsten Kunden beginnt ein großer Teil der Arbeit erneut.</p>
                <p className="mt-6">Mit einer strukturierten Datengrundlage lassen sich häufig benötigte Unternehmensdaten, Kennzahlen, Quellen und Nachweise so organisieren, dass sie für spätere Kundenanfragen schneller geprüft, aktualisiert und wiederverwendet werden können.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink className="w-full sm:w-auto" href="#struktur">So funktioniert die Struktur ↓</ButtonLink>
                  <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF} variant="secondary">ESG-Anfrage bereits erhalten?</ButtonLink>
                </div>
              </div>
              <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                <RefreshCw aria-hidden="true" className="h-8 w-8 text-orange" />
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">Grundsatz</p>
                <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">Wiederverwendbare Information, aber kontextspezifische Antwort.</p>
                <p className="mt-5 text-sm leading-7 text-muted">Wiederverwendung bedeutet nicht, alte Antworten ungeprüft zu kopieren. Zeitraum, Scope, Definition und Kundenanforderung müssen bei jeder neuen Anfrage erneut geprüft werden.</p>
              </aside>
            </div>
          </div>
        </header>

        <section aria-labelledby="quick-answer-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24" id="kurz-gesagt">
          <div className="site-shell grid gap-9 lg:grid-cols-[0.52fr_1.48fr] lg:gap-16">
            <div>
              <p className="eyebrow">Quick Answer</p>
              <h2 className="font-display mt-6 text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]" id="quick-answer-title">Kurz gesagt</h2>
            </div>
            <div className="max-w-4xl text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">
              <p>Eine wiederverwendbare ESG-Datengrundlage verbindet häufig benötigte Datenpunkte, interne Verantwortliche, Originalquellen, Nachweise, Definitionen, Zeiträume und Freigabestatus.</p>
              <p className="mt-6">Bei einer neuen Kundenanfrage muss dann nicht jede Information von Grund auf neu gesucht werden. Stattdessen wird geprüft, welche vorhandenen Angaben passen, was aktualisiert werden muss und welche neuen Daten tatsächlich fehlen.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="problem-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <SectionHeading eyebrow="Ausgangspunkt" id="problem-title" title="Warum beginnt ESG bei vielen Lieferanten jedes Mal wieder bei null?" />
            <div className="resource-prose">
              <p>ESG-Informationen liegen häufig über mehrere Funktionen verteilt. Finance besitzt Energierechnungen, HR Mitarbeitendendaten, Facility Management Verbrauchswerte, Quality Zertifikate und Procurement Informationen zur Lieferkette.</p>
              <p>Wird eine Kundenanfrage nur als einmaliges Projekt bearbeitet, entstehen häufig einzelne Excel-Dateien, E-Mail-Verläufe und Ordner, ohne dass klar dokumentiert wird, welche Information später wiederverwendbar ist.</p>
              <p>Beim nächsten Fragebogen müssen deshalb dieselben internen Personen erneut gefragt und dieselben Quellen erneut gesucht werden.</p>
              <div className="mt-8 rounded-[1rem] border-l-4 border-orange bg-[var(--soft-orange)] p-6">
                <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Das Problem ist oft nicht fehlende Information. Das Problem ist fehlende Struktur.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="before-after-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Before / After" id="before-after-title" title="Was sich mit einer wiederverwendbaren Struktur verändert" />
            <div className="mt-12 grid gap-6 lg:grid-cols-2" data-before-after>
              <article className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-[var(--warm)] p-6 sm:p-8">
                <h3 className="font-display text-3xl leading-tight text-ink">Ohne wiederverwendbare Struktur</h3>
                <FlowLine dark={false} items={["Kunde A", "neue Excel-Datei", "Finance fragen", "HR fragen", "Rechnungen suchen", "Nachweise suchen"]} />
                <div className="mt-7 border-l-2 border-orange pl-5">
                  <p className="font-display text-2xl leading-tight text-ink">Kunde B → wieder von vorne</p>
                  <p className="mt-3 text-sm leading-7 text-muted">Antworten vorbereiten bleibt ein isoliertes Projekt.</p>
                </div>
              </article>
              <article className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8">
                <h3 className="font-display text-3xl leading-tight text-ink">Mit strukturierter Datengrundlage</h3>
                <div className="mt-6 rounded-[1rem] bg-white p-5 shadow-lift">
                  <p className="font-display text-2xl leading-tight text-ink">Datenpunkt + Quelle + Nachweis + Owner + Zeitraum + Status</p>
                </div>
                <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Kundenfragebogen", "EcoVadis", "IntegrityNext", "VSME", "interne ESG-Auswertung"].map((item) => (
                    <li className="rounded-[0.9rem] border border-orange/20 bg-white px-4 py-3 text-sm font-bold text-ink" key={item}>{item}</li>
                  ))}
                </ol>
              </article>
            </div>
            <p className="mt-8 max-w-4xl text-base leading-8 text-muted">Nicht jeder Datenpunkt passt automatisch zu jedem Anwendungsfall. Die vorhandene Grundlage reduziert Sucharbeit; die konkrete Anforderung muss trotzdem geprüft werden.</p>
          </div>
        </section>

        <section aria-labelledby="struktur-title" className="py-16 sm:py-20 lg:py-24" id="struktur">
          <div className="site-shell">
            <SectionHeading eyebrow="Reusable ESG Data" id="struktur-title" title="Was sollte wiederverwendbar gespeichert werden?">
              <p>Eine nützliche ESG-Datengrundlage enthält Kontext, nicht nur einen Wert.</p>
            </SectionHeading>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-reusable-components>
              {reusableComponents.map(([title, example, copy], index) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift" key={title}>
                  <p className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="font-display mt-4 text-3xl leading-tight text-ink">{title}</h3>
                  <p className="mt-4 rounded-[0.8rem] bg-[var(--warm)] p-4 text-sm font-bold leading-6 text-ink">{example}</p>
                  <p className="mt-4 text-sm leading-7 text-muted">{copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {statusExamples.map((status) => (
                <span className="rounded-full border border-orange/25 bg-[var(--soft-orange)] px-3 py-2 text-xs font-bold uppercase tracking-[0.09em] text-[#b94f00]" key={status}>{status}</span>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="record-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Beispiel" id="record-title" title="Die kleinste sinnvolle ESG-Dateneinheit">
              <p>Dieses Beispiel ist illustrativ. Es zeigt keine realen Kundendaten und keine Aussage über ein echtes Unternehmen.</p>
            </SectionHeading>
            <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-5 sm:p-7" data-reusable-data-record>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Beispiel</p>
              <dl className="mt-5 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)] sm:grid-cols-2">
                {dataRecord.map(([term, description]) => (
                  <div className="bg-white p-4" key={term}>
                    <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{term}</dt>
                    <dd className="mt-2 break-words font-semibold text-ink">{description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="reuse-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Reuse Logic" id="reuse-title" title="Nicht jede Antwort sollte kopiert werden. Viele Datenpunkte können es." />
            <div className="mt-12 grid gap-5 lg:grid-cols-3" data-reuse-groups>
              {reuseGroups.map((group) => (
                <section className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={group.title}>
                  <h3 className="font-display text-3xl leading-tight text-ink">{group.title}</h3>
                  <BulletList items={group.items} />
                </section>
              ))}
            </div>
            <p className="font-display mt-10 max-w-4xl text-[clamp(1.8rem,3vw,2.7rem)] leading-tight text-ink">Ziel ist deshalb nicht eine universelle „Master-Antwort“, sondern eine zuverlässige Informationsbasis, aus der passende Antworten vorbereitet werden können.</p>
          </div>
        </section>

        <section aria-labelledby="layers-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Framework" id="layers-title" light title="Fünf Ebenen einer wiederverwendbaren ESG-Struktur" />
            <ol className="mt-12 grid gap-5 lg:grid-cols-5" data-foundation-layers>
              {foundationLayers.map(([title, copy]) => (
                <li className="rounded-[1rem] border border-white/16 bg-white/[0.04] p-6" key={title}>
                  <h3 className="font-display text-2xl leading-tight text-white">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/62">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="evidence-chain-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Nachvollziehbarkeit" id="evidence-chain-title" title="Wiederverwendung funktioniert nur mit Nachvollziehbarkeit." />
            <div>
              <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-evidence-chain>
                <FlowLine items={["Kundenfrage", "Antwort", "Datenpunkt", "Nachweis", "Originalquelle"]} />
              </div>
              <div className="resource-prose mt-8">
                <p>Wird nur die finale Antwort gespeichert, geht ein großer Teil des späteren Nutzens verloren.</p>
                <p>Wird dagegen dokumentiert, auf welchem Datenpunkt und welcher Quelle die Antwort basiert, kann bei der nächsten Anfrage gezielt geprüft werden, ob dieselbe Information noch aktuell und für den neuen Scope geeignet ist.</p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:items-start">
                <InlineLink href="/de/ressourcen/esg-nachweise-lieferanten">Mehr über ESG-Nachweise</InlineLink>
                <InlineLink href="/de/ressourcen/esg-nachweise-checkliste">Nachweis mit dem Evidence Readiness Check prüfen</InlineLink>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="examples-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Praxisbeispiele" id="examples-title" title="Drei Beispiele für Wiederverwendung mit Prüfung" />
            <div className="mt-12 grid gap-6" data-practical-examples>
              <article className="rounded-[1.1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Illustratives Beispiel</p>
                <h3 className="font-display mt-4 text-3xl leading-tight text-ink">Beispiel: Stromverbrauch</h3>
                <p className="mt-5 text-base leading-8 text-muted">Erste Anfrage: Kunde A fragt nach dem Stromverbrauch 2025.</p>
                <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[["Datenpunkt", "Stromverbrauch"], ["Gesellschaft", "Gesellschaft A"], ["Standort", "Werk A"], ["Zeitraum", "2025"], ["Wert", "X MWh"], ["Quelle", "Stromrechnungen"], ["Owner", "Facility / Finance"]].map(([term, description]) => (
                    <div className="rounded-[0.9rem] bg-white p-4" key={term}><dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{term}</dt><dd className="mt-2 font-semibold text-ink">{description}</dd></div>
                  ))}
                </dl>
                <p className="mt-6 text-base leading-8 text-muted">Nächste Anfrage: Kunde B fragt einige Monate später nach Energie- und Emissionsdaten.</p>
                <p className="mt-4 text-base leading-8 text-muted">Der Stromverbrauch muss nicht erneut aus zwölf Rechnungen zusammengesucht werden. Zuerst wird geprüft, ob Gesellschaft, Standort, Zeitraum und Definition zur neuen Anfrage passen. Ist das der Fall, kann derselbe bestätigte Datenpunkt als Ausgangspunkt verwendet werden.</p>
              </article>
              <article className="rounded-[1.1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-8">
                <h3 className="font-display text-3xl leading-tight text-ink">Beispiel: Environmental Policy</h3>
                <p className="mt-5 text-base leading-8 text-muted">Wurde eine aktuelle Environmental Policy bereits intern verabschiedet, muss bei jeder neuen Kundenanfrage nicht automatisch eine neue Richtlinie geschrieben werden.</p>
                <p className="mt-5 text-base leading-8 text-muted">Stattdessen wird geprüft:</p>
                <BulletList items={["Ist die Policy noch aktuell?", "Gilt sie für die antwortende Gesellschaft?", "Wurde sie seit der letzten Anfrage ersetzt?", "Unterstützt sie tatsächlich die konkrete Kundenfrage?"]} />
                <div className="mt-6 rounded-[1rem] border-l-4 border-orange bg-[var(--soft-orange)] p-5">
                  <p className="font-display text-2xl leading-tight text-ink">Wiederverwenden heißt prüfen – nicht blind kopieren.</p>
                </div>
                <div className="mt-6">
                  <InlineLink href="/de/ressourcen/environmental-policy-erstellen">
                    Environmental Policy richtig vorbereiten
                  </InlineLink>
                </div>
                <div className="mt-3">
                  <InlineLink href="/de/ressourcen/supplier-code-of-conduct-erstellen">
                    Supplier Code wiederverwendbar vorbereiten
                  </InlineLink>
                </div>
              </article>
              <article className="rounded-[1.1rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8">
                <h3 className="font-display text-3xl leading-tight text-ink">Beispiel: Scope 1 &amp; 2</h3>
                <p className="mt-5 text-base leading-8 text-muted">Eine strukturierte Scope-1-&amp;-2-Datengrundlage kann für mehrere ESG-Anfragen nützlich sein, wenn Aktivitätsdaten, Quellen, Einheiten, Zeitraum, verwendete Methodik und spätere Berechnung nachvollziehbar dokumentiert bleiben.</p>
                <p className="mt-5 text-base leading-8 text-muted">Bei einem neuen Berichtsjahr werden dann nicht alte Emissionen einfach übernommen. Stattdessen wird die bestehende Struktur mit neuen Aktivitätsdaten aktualisiert.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Aktivitätsdaten", "Emissionsfaktor", "berechnete CO₂e"].map((item) => <div className="rounded-[0.9rem] bg-white p-4 text-sm font-bold text-ink" key={item}>{item}</div>)}
                </div>
                <div className="mt-6"><InlineLink href="/de/ressourcen/scope-1-2-datenerfassungs-vorlage">Scope-1-&amp;-2-Daten strukturiert erfassen</InlineLink></div>
                <div className="mt-3"><InlineLink href="/de/ressourcen/scope-1-2-daten-berechnung">Scope-1-&amp;-2-Ausgangsdaten einordnen</InlineLink></div>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="system-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="System" id="system-title" title="Die reusable ESG database beginnt nicht unbedingt mit neuer Software." />
            <div className="resource-prose">
              <p>Unternehmen benötigen nicht zwingend ein neues ESG-System, bevor sie Informationen strukturieren können.</p>
              <p>Entscheidend ist zunächst, dass Datenpunkte konsistent definiert, Verantwortliche bekannt, Quellen nachvollziehbar und Aktualisierungen organisiert sind.</p>
              <p>Ob diese Struktur zunächst in bestehenden Unternehmenssystemen, kontrollierten Tabellen oder später in einer spezialisierten Lösung gepflegt wird, ist eine zweite Frage.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="owner-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Ownership" id="owner-title" title="Jeder wiederverwendbare Datenpunkt braucht einen Owner.">
              <p>Ohne klare Verantwortlichkeit veraltet auch eine gut strukturierte Datensammlung.</p>
              <p>Für jeden wichtigen Datenbereich sollte klar sein, welche interne Funktion die Originalinformation besitzt, wer Änderungen kennt und wer die Angabe vor externer Nutzung bestätigen kann.</p>
            </SectionHeading>
            <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" data-owner-examples>
              {ownerExamples.map(([term, description]) => (
                <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-5" key={term}>
                  <dt className="font-display text-2xl text-ink">{term}</dt>
                  <dd className="mt-3 text-sm font-semibold leading-6 text-muted">{description}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8"><InlineLink href="/de/ressourcen/esg-daten-verantwortliche-abteilungen">Zur ESG Data Owner Map</InlineLink></div>
          </div>
        </section>

        <section aria-labelledby="freshness-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Status" id="freshness-title" title="Wiederverwendbare Daten brauchen einen Aktualitätsstatus.">
              <p>Besonders bei Kennzahlen, Zertifikaten, Policies und zeitbezogenen Nachweisen sollte sichtbar sein, ob eine Information weiterhin verwendet werden kann oder vor einer neuen Kundenantwort aktualisiert werden muss.</p>
            </SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2" data-freshness-statuses>
              {freshnessStatuses.map((status) => <div className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 font-bold text-ink" key={status}>{status}</div>)}
            </div>
          </div>
        </section>

        <section aria-labelledby="request-mapping-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-20">
            <SectionHeading eyebrow="Request Mapping" id="request-mapping-title" title="Speichern Sie nicht nur den Datenpunkt – speichern Sie auch, wo er verwendet wurde." />
            <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-request-mapping>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Illustrative Labels</p>
              <h3 className="font-display mt-4 text-3xl leading-tight text-ink">Scope 2 emissions 2025</h3>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.11em] text-muted">Verwendet für</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {["Customer A questionnaire", "EcoVadis assessment", "VSME preparation", "Customer B sustainability request"].map((item) => <li className="rounded-[0.9rem] bg-white p-4 text-sm font-bold text-ink" key={item}>{item}</li>)}
              </ul>
              <p className="mt-6 text-sm leading-7 text-muted">So entsteht mit jeder bearbeiteten Anfrage eine bessere Übersicht darüber, welche ESG-Informationen im Unternehmen wiederholt benötigt werden.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="platform-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Kontexte" id="platform-title" title="Warum Wiederverwendung über mehrere ESG-Anfragen hinweg sinnvoll ist">
              <p>Unterschiedliche Kunden und Plattformen können ähnliche Themen in unterschiedlichen Formaten abfragen. Ein Stromverbrauch bleibt beispielsweise derselbe zugrunde liegende Unternehmensdatenpunkt, auch wenn Frageformulierung, Einheit, Zeitraum oder Kontext einer neuen Anfrage erneut geprüft werden müssen.</p>
              <p>Deshalb lohnt es sich, die zugrunde liegenden Unternehmensinformationen von der jeweiligen Fragebogenoberfläche zu trennen.</p>
            </SectionHeading>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {platformCards.map(([title, cta, href]) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}>
                  <h3 className="font-display text-3xl leading-tight text-ink">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">Ein eigener Kontext mit eigener Formulierung, Prüfung und Nachweislogik.</p>
                  <div className="mt-5"><InlineLink href={href}>{cta}</InlineLink></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="workflow-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Workflow" id="workflow-title" light title="So wird aus einer einzelnen ESG-Anfrage eine wiederverwendbare Grundlage" />
            <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.1rem] bg-white/14" data-reuse-workflow>
              {workflowSteps.map(([title, copy], index) => (
                <li className="grid gap-4 bg-ink p-5 sm:grid-cols-[4rem_1fr] sm:p-6" key={title}>
                  <span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/62">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8"><ButtonLink href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten">ESG-Fragebogen strukturiert bearbeiten</ButtonLink></div>
          </div>
        </section>

        <section aria-labelledby="copy-paste-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Warnung" id="copy-paste-title" title="Wiederverwendung darf nicht zu Copy-and-Paste-ESG werden.">
              <p>Eine wiederverwendbare Datengrundlage soll Sucharbeit reduzieren – nicht die fachliche Prüfung ersetzen.</p>
            </SectionHeading>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-copy-paste-warnings>
              {copyPasteWarnings.map(([title, copy]) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}>
                  <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-[1rem] border-l-4 border-orange bg-[var(--soft-orange)] p-6">
              <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Quelle wiederverwenden. Kontext neu prüfen.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="resource-system-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Resource System" id="resource-system-title" title="Aus einzelnen Tools wird ein System" />
            <div className="mt-10 rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-resource-system-map>
              <FlowLine items={["Request", "Data", "Owner", "Evidence", "Carbon Data", "Reuse"]} />
              <ol className="mt-8 grid gap-3 lg:grid-cols-2">
                {resourceSystem.map(([label, href]) => (
                  <li className="rounded-[0.9rem] bg-white p-4" key={label}>
                    <InlineLink href={href}>{label}</InlineLink>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section aria-labelledby="commercial-title" className="bg-[var(--warm)] py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <div className="overflow-hidden rounded-[1.4rem] border border-orange/25 bg-[var(--soft-orange)]">
              <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
                <div className="p-7 sm:p-10 lg:p-12">
                  <Send aria-hidden="true" className="h-10 w-10 text-orange" />
                  <SectionHeading eyebrow="Umsetzung" id="commercial-title" title="Ihre ESG-Daten liegen bereits im Unternehmen – aber nicht als wiederverwendbare Struktur?" />
                </div>
                <div className="border-t border-orange/20 bg-white/65 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <p className="text-base leading-8 text-muted">Wir helfen Ihnen, eine konkrete Kundenanfrage zu bearbeiten und die dabei verwendeten Daten, Quellen und Nachweise so zu strukturieren, dass die Arbeit nicht beim nächsten Fragebogen wieder von vorne beginnen muss.</p>
                  <p className="mt-4 text-base leading-8 text-muted">
                    Wenn Sie zunächst den operativen Fragebogenkontext
                    einordnen möchten, lesen Sie auch{" "}
                    <Link className="font-semibold text-ink underline decoration-orange/45 underline-offset-4 transition hover:text-orange" href="/de/esg-fragebogen-lieferanten">
                      ESG-Fragebogen für Lieferanten
                    </Link>
                    .
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>ESG-Anfrage senden</ButtonLink>
                    <ButtonLink className="w-full sm:w-auto" href="/de/esg-kundenanfragen" variant="secondary">Mehr über ESG-Kundenanfragen</ButtonLink>
                  </div>
                  <p className="mt-5 text-sm font-semibold leading-7 text-muted">Jede neue externe Antwort wird weiterhin gegen Scope, Zeitraum und konkrete Kundenanforderung geprüft.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="method-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <ShieldCheck aria-hidden="true" className="h-10 w-10 text-orange" />
              <SectionHeading eyebrow="Methodik" id="method-title" title="Methodische Einordnung" />
            </div>
            <div className="resource-prose">
              <p>Wiederverwendung bedeutet auf dieser Seite die strukturierte Wiederverwendung zugrunde liegender Unternehmensinformationen und Nachweise. Sie bedeutet nicht, dass eine frühere Antwort ungeprüft auf einen anderen Kunden, Zeitraum, Standort, Fragebogen oder Reporting-Kontext übertragen werden kann.</p>
              <div className="mt-7"><InlineLink href="/de/methodology">Wie Evipace mit ESG-Daten und Nachweisen arbeitet</InlineLink></div>
            </div>
          </div>
        </section>

        <section className="bg-ink py-16 text-white sm:py-20 lg:py-24" aria-labelledby="final-title">
          <div className="site-shell">
            <div className="max-w-4xl">
              <p className="eyebrow">Nächster Schritt</p>
              <h2 className="font-display mt-6 text-[clamp(2.75rem,6vw,5.8rem)] leading-[0.95]" id="final-title">Jede beantwortete Anfrage sollte die nächste einfacher machen.</h2>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">Aus verstreuten Unternehmensdaten wird mit der Zeit eine nachvollziehbare, wiederverwendbare ESG-Datengrundlage.</p>
              <div className="mt-8"><ButtonLink href={SEND_REQUEST_HREF}>Anfrage an Evipace senden</ButtonLink></div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
