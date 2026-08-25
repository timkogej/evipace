import type { ReactNode } from "react";
import { ArrowRight, FileCheck2, RefreshCw, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";

const procurementAssessment = [
  "Welche Lieferantenarten gibt es?",
  "Welche Länder sind relevant?",
  "Welche Materialien oder Dienstleistungen werden beschafft?",
  "Gibt es kritische oder strategische Lieferanten?",
  "Existiert bereits ein Einkaufshandbuch?",
  "Gibt es bestehende Vertragsbedingungen?",
  "Werden Lieferanten bereits bewertet?",
  "Gibt es bestehende ESG-Kriterien?",
  "Gibt es Qualitäts- oder Auditprozesse?",
  "Wer ist für Lieferantenbeziehungen verantwortlich?",
  "Wie werden neue Lieferanten freigegeben?",
  "Wie werden Abweichungen heute behandelt?"
] as const;

const purposeBlocks = [
  ["Erwartungen", "Er macht grundlegende Anforderungen an Lieferanten sichtbar."],
  ["Konsistenz", "Er schafft eine gemeinsame Ausgangsbasis für relevante Lieferantenbeziehungen."],
  ["Kommunikation", "Er hilft Einkauf und anderen Funktionen, ESG- und Compliance-Erwartungen strukturiert zu vermitteln."],
  ["Grundlage für Prozesse", "Er kann Supplier Assessments, Vertragsprozesse oder weitere Prüfungen unterstützen – ersetzt diese aber nicht."]
] as const;

const buildingBlocks = [
  {
    title: "1 · Geltungsbereich",
    copy:
      "Der Kodex sollte klar erkennen lassen, für welche Lieferanten, Gesellschaften oder Geschäftsbeziehungen er gedacht ist.",
    items: [
      "Alle Lieferanten?",
      "Nur direkte Lieferanten?",
      "Bestimmte Lieferantenkategorien?",
      "Gruppenunternehmen?",
      "Dienstleister?",
      "Subunternehmer?"
    ],
    note:
      "Nicht automatisch behaupten, dass alle indirekten Lieferkettenstufen vollständig vom Kodex erfasst oder kontrolliert werden."
  },
  {
    title: "2 · Menschenrechte und Arbeitsbedingungen",
    copy:
      "Inhalte sollten zum tatsächlichen Risikoprofil und zum vorgesehenen Anwendungsbereich passen.",
    items: [
      "Verbot von Kinderarbeit",
      "Verbot von Zwangsarbeit",
      "menschenwürdige Arbeitsbedingungen",
      "Diskriminierungsverbot",
      "Schutz vor Belästigung",
      "Vereinigungsfreiheit, soweit relevant",
      "Arbeitszeiten",
      "Vergütung im Rahmen tatsächlich anwendbarer Anforderungen",
      "Gesundheit und Sicherheit"
    ],
    note:
      "Nicht jeder Lieferant braucht identische Anforderungen oder dieselbe Nachweistiefe."
  },
  {
    title: "3 · Umwelt",
    copy:
      "Umweltanforderungen sollten je nach Tätigkeit, Lieferantenkategorie und tatsächlicher Relevanz formuliert werden.",
    items: [
      "verantwortungsvoller Ressourceneinsatz",
      "Energie",
      "Emissionen",
      "Abfall",
      "Wasser",
      "relevante Chemikalien / Stoffe",
      "Vermeidung unnötiger Umweltbelastungen",
      "Einhaltung tatsächlich anwendbarer Umweltanforderungen",
      "Verbesserung relevanter Umweltleistungen"
    ],
    link: ["/de/ressourcen/environmental-policy-erstellen", "Environmental Policy erstellen"] as const
  },
  {
    title: "4 · Geschäftsethik und Compliance",
    copy:
      "Der Kodex kann Erwartungen zu Integrität und rechtmäßigem Verhalten beschreiben, ersetzt aber keine rechtliche Compliance-Prüfung.",
    items: [
      "Korruption",
      "Bestechung",
      "Interessenkonflikte",
      "fairer Wettbewerb",
      "vertrauliche Informationen",
      "Datenschutz / Informationssicherheit, sofern relevant",
      "Meldung schwerwiegender Verstöße",
      "Einhaltung tatsächlich anwendbarer gesetzlicher Anforderungen"
    ]
  },
  {
    title: "5 · Erwartungen an eigene Lieferketten",
    copy:
      "Je nach Unternehmen und Beschaffungssituation kann ein Supplier Code auch Erwartungen dazu enthalten, wie relevante Grundsätze innerhalb der Lieferkette berücksichtigt werden sollen.",
    items: [
      "relevante Erwartungen weitergeben",
      "wesentliche Risiken berücksichtigen",
      "bei berechtigten Rückfragen Informationen bereitstellen",
      "bei Bedarf Nachweise unterstützen"
    ],
    note:
      "Nicht: Jeder Lieferant garantiert, dass jede vorgelagerte Lieferkettenstufe vollständig compliant ist."
  },
  {
    title: "6 · Kommunikation, Nachweise und Zusammenarbeit",
    copy:
      "Der Kodex kann beschreiben, wie Lieferanten Informationen bereitstellen, bei Rückfragen unterstützen und bei festgestellten Problemen in den Dialog gehen.",
    items: [
      "Bereitstellung relevanter Informationen, sofern erforderlich",
      "Unterstützung bei berechtigten Rückfragen",
      "relevante Nachweise",
      "Mitteilung wesentlicher Änderungen",
      "Dialog bei festgestellten Problemen",
      "gegebenenfalls corrective actions / Maßnahmen"
    ],
    note:
      "Keine uneingeschränkten Audit- oder Zugriffsrechte formulieren, wenn solche Rechte tatsächlich nicht vereinbart wurden."
  },
  {
    title: "7 · Freigabe, Version und Verantwortlichkeit",
    copy:
      "Der Supplier Code sollte klar zeigen, wer ihn herausgibt, welche Version gilt und welche interne Stelle für Inhalt und Pflege verantwortlich ist.",
    items: [
      "herausgebende Gesellschaft",
      "Version",
      "tatsächliches Freigabedatum",
      "Geltungsbereich",
      "Document Owner",
      "freigebende Stelle",
      "Status",
      "gegebenenfalls Review-Information"
    ],
    note: "Entwurf ≠ freigegebener Supplier Code"
  }
] as const;

const notIncludedItems = [
  ["Unrealistische Garantien", "Lieferanten sollten nicht zu pauschalen Garantien verpflichtet werden, die weder sinnvoll abgegrenzt noch praktisch überprüfbar sind."],
  ["Rechte, die nicht bestehen", "Keine Audit-, Zugriffs- oder Kündigungsrechte formulieren, wenn diese nicht tatsächlich vereinbart oder intern abgestimmt sind."],
  ["Copy-Paste-Verpflichtungen", "Anforderungen aus fremden Vorlagen sollten nicht ungeprüft übernommen werden."],
  ["Unklarer Geltungsbereich", "Es sollte erkennbar sein, für welche Lieferantenbeziehungen der Kodex gilt."],
  ["Nicht umsetzbare Anforderungen", "Erwartungen sollten zur tatsächlichen Lieferantenstruktur und zum eigenen Beschaffungsprozess passen."],
  ["Vergangenheit erfinden", "Ein neu eingeführter Supplier Code sollte nicht so dargestellt werden, als sei er bereits seit Jahren Bestandteil des Lieferantenmanagements."]
] as const;

const acknowledgmentStates = [
  "Erhalten",
  "zur Kenntnis genommen",
  "bestätigt",
  "vertraglich vereinbart",
  "überprüft"
] as const;

const evidenceItems = [
  "Lieferantenkommunikation",
  "Bestätigungs- / Acknowledgment-Nachweise",
  "Onboarding-Unterlagen",
  "Supplier Questionnaires",
  "Beschaffungsprozesse",
  "Lieferantenbewertungen",
  "Corrective-Action-Unterlagen",
  "Schulungsunterlagen für Procurement",
  "Risikoanalysen",
  "Vertragsverweise, sofern tatsächlich vorhanden",
  "Auditunterlagen, sofern tatsächlich durchgeführt"
] as const;

const statusModel = [
  ["Entwurf", "Inhalt wird vorbereitet."],
  ["Zur Freigabe", "Inhalt ist intern abgestimmt, aber noch nicht offiziell verabschiedet."],
  ["Freigegeben", "Die zuständige Stelle hat den Kodex offiziell bestätigt."],
  ["In Einführung", "Der Kodex wird in relevante Lieferantenprozesse integriert bzw. kommuniziert."],
  ["Zu überprüfen / ersetzt", "Inhalt oder Version muss geprüft bzw. durch eine aktuelle Version ersetzt werden."]
] as const;

const versionMetadata = [
  ["Dokument", "Supplier Code of Conduct"],
  ["Version", "1.0"],
  ["Herausgebende Gesellschaft", "Gesellschaft / Gruppe"],
  ["Geltungsbereich", "relevante Lieferanten"],
  ["Freigegeben am", "Datum der tatsächlichen Freigabe"],
  ["Freigegeben durch", "zuständige Funktion"],
  ["Document Owner", "Procurement / Compliance / Management"],
  ["Status", "Freigegeben"],
  ["Review", "gemäß internem Prozess bzw. bei wesentlichen Änderungen"]
] as const;

const outlineSections = [
  ["1. Zweck", "Warum der Kodex existiert."],
  ["2. Geltungsbereich", "Für welche Lieferantenbeziehungen er gedacht ist."],
  ["3. Menschenrechte & Arbeitsbedingungen", "Relevante soziale Erwartungen."],
  ["4. Gesundheit & Sicherheit", "Erwartungen an sichere Arbeitsbedingungen."],
  ["5. Umwelt", "Relevante Umweltgrundsätze."],
  ["6. Geschäftsethik", "Korruption, Interessenkonflikte und Integrität."],
  ["7. Erwartungen an Lieferantenmanagement", "Informationsbereitstellung, Zusammenarbeit und relevante Nachweise."],
  ["8. Umgang mit Abweichungen", "Dialog, Klärung und gegebenenfalls Maßnahmen."],
  ["9. Dokumentenstatus", "Version, Freigabe und Document Owner."]
] as const;

const deviationSteps = [
  "Hinweis / Abweichung",
  "Sachverhalt klären",
  "Risiko einordnen",
  "Maßnahme vereinbaren",
  "Fortschritt prüfen",
  "weitere Entscheidung"
] as const;

const workflowSteps = [
  ["Frage genau lesen", "Prüfen Sie, ob gefragt wird, ob ein Supplier Code existiert, kommuniziert wurde, bestätigt wird, vertraglich eingebunden ist oder tatsächlich im Lieferantenmanagement genutzt wird."],
  ["Bestehendes Dokument prüfen", "Prüfen Sie, ob bereits ein aktueller Lieferantenkodex oder eine vergleichbare freigegebene Regelung vorhanden ist."],
  ["Geltungsbereich prüfen", "Gilt das Dokument tatsächlich für die relevante Gesellschaft und die betreffenden Lieferantenbeziehungen?"],
  ["Freigabestatus prüfen", "Ist der Kodex Entwurf, freigegeben, in Einführung oder bereits ersetzt?"],
  ["Tatsächliche Einführung prüfen", "Wurde der Kodex tatsächlich an relevante Lieferanten kommuniziert oder in bestehende Prozesse integriert?"],
  ["Nur den aktuellen Status beantworten", "Unterscheiden Sie zwischen vorhanden, freigegeben, kommuniziert, bestätigt und tatsächlich angewendet."]
] as const;

const supplierComparison = [
  ["Supplier Code", "Welche Erwartungen stellen wir?"],
  ["Supplier Questionnaire", "Welche Informationen fragen wir beim Lieferanten konkret ab?"],
  ["Supplier Evidence", "Welche Unterlagen unterstützen die Antwort?"],
  ["Supplier Assessment", "Wie ordnen wir die Informationen intern ein?"]
] as const;

const lifecycleSteps = [
  "Lieferantenstruktur verstehen",
  "relevante Erwartungen bestimmen",
  "Scope definieren",
  "Code formulieren",
  "intern prüfen",
  "freigeben",
  "kommunizieren",
  "Anwendung dokumentieren"
] as const;

const commonMistakes = [
  ["Fremde Vorlage unverändert übernehmen", "Der Kodex passt nicht zur tatsächlichen Lieferantenstruktur."],
  ["Unklarer Geltungsbereich", "Es ist nicht erkennbar, welche Lieferanten betroffen sind."],
  ["Nicht bestehende Rechte formulieren", "Audit-, Informations- oder Kündigungsrechte werden behauptet, obwohl sie nicht entsprechend geregelt wurden."],
  ["Unrealistische Garantien verlangen", "Lieferanten sollen pauschal Sachverhalte garantieren, die sie selbst nicht vollständig kontrollieren können."],
  ["Kodex mit Lieferanten-Compliance gleichsetzen", "Ein bestätigtes Dokument beweist nicht automatisch tatsächliche Erfüllung."],
  ["Keine interne Verantwortlichkeit", "Niemand ist zuständig für Aktualisierung, Kommunikation oder Anwendung."],
  ["Einführung rückdatieren", "Ein neu eingeführter Kodex wird als langjährig bestehender Prozess dargestellt."],
  ["Versionen nicht kontrollieren", "Unterschiedliche oder veraltete Fassungen werden parallel verwendet."]
] as const;

const preApprovalItems = [
  "Ist die herausgebende Gesellschaft klar?",
  "Ist der Lieferanten-Scope definiert?",
  "Passen die Anforderungen zur tatsächlichen Beschaffung?",
  "Sind Menschenrechts- und Arbeitsbedingungen realistisch formuliert?",
  "Sind Umweltanforderungen relevant und angemessen?",
  "Sind Ethik- und Compliance-Erwartungen klar?",
  "Werden keine Rechte behauptet, die nicht bestehen?",
  "Werden keine unrealistischen Garantien verlangt?",
  "Ist der Umgang mit Abweichungen nachvollziehbar?",
  "Ist die interne Verantwortung geklärt?",
  "Sind Version und Freigabestatus dokumentiert?",
  "Gibt es einen realistischen Plan für Kommunikation und Anwendung?"
] as const;

const resourceBridgeCards = [
  ["Welche ESG-Daten fragt der Kunde?", "/de/ressourcen/welche-esg-daten-kunden-lieferanten"],
  ["Wer ist intern verantwortlich?", "/de/ressourcen/esg-daten-verantwortliche-abteilungen"],
  ["Wie Nachweise prüfen?", "/de/ressourcen/esg-nachweise-checkliste"],
  ["Dokument später wiederverwenden", "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"],
  ["Environmental Policy erstellen", "/de/ressourcen/environmental-policy-erstellen"]
] as const;

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink underline decoration-orange/35 underline-offset-4 transition hover:text-orange"
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

function FlowList({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ol className="grid gap-3 lg:grid-cols-4">
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

function SupplierCodeArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art">
      <svg className="resource-hero-art__sheet" fill="none" viewBox="0 0 520 650" xmlns="http://www.w3.org/2000/svg">
        <path d="M112 122H408M112 176H340M112 306H408M112 356H408M112 406H320" stroke="currentColor" strokeOpacity="0.44" strokeWidth="4" />
        <rect height="64" rx="12" stroke="currentColor" strokeOpacity="0.7" strokeWidth="3" width="296" x="112" y="214" />
        <path d="M138 246H236M270 246H382" stroke="currentColor" strokeOpacity="0.64" strokeWidth="8" />
        <rect height="42" rx="10" stroke="currentColor" strokeOpacity="0.34" strokeWidth="3" width="100" x="112" y="500" />
        <rect height="42" rx="10" stroke="currentColor" strokeOpacity="0.34" strokeWidth="3" width="100" x="240" y="500" />
      </svg>
      <span className="resource-hero-art__code">SCOPE · ACKNOWLEDGMENT · STATUS · EVIDENCE</span>
    </div>
  );
}

export function SupplierCodeOfConductGuide() {
  return (
    <main id="top">
      <article>
        <header aria-labelledby="article-title" className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
          <SupplierCodeArtwork />
          <div className="site-shell relative z-10">
            <nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]">
              <Link className="transition hover:text-orange" href="/de">Startseite</Link>
              <span aria-hidden="true">/</span>
              <Link className="transition hover:text-orange" href="/de/ressourcen">Ressourcen</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">Supplier Code of Conduct erstellen</span>
            </nav>

            <div className="mt-12 max-w-6xl">
              <p className="eyebrow">SUPPLIER CODE OF CONDUCT</p>
              <h1 className="font-display mt-7 max-w-[17ch] break-words hyphens-auto text-[clamp(3rem,6.7vw,6.25rem)] leading-[0.92]" id="article-title">
                Supplier Code of Conduct erstellen: Was ein belastbarer Lieferantenkodex enthalten sollte
              </h1>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
              <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                <p>Kunden und Supplier Assessments fragen häufig danach, ob Unternehmen klare ESG- und Compliance-Erwartungen an ihre Lieferanten stellen.</p>
                <p className="mt-6">Ein Supplier Code of Conduct kann diese Erwartungen strukturiert dokumentieren – etwa zu Arbeitsbedingungen, Menschenrechten, Umwelt, Geschäftsethik und verantwortungsvoller Beschaffung.</p>
                <p className="mt-6">Entscheidend ist jedoch, dass der Kodex zum tatsächlichen Unternehmen und seiner Lieferkette passt und nicht mehr verspricht, als intern umgesetzt und gesteuert werden kann.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink className="w-full sm:w-auto" href="#bausteine">Zum Aufbau des Supplier Code ↓</ButtonLink>
                  <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF} variant="secondary">Kunde fragt bereits danach?</ButtonLink>
                </div>
              </div>
              <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                <FileCheck2 aria-hidden="true" className="h-8 w-8 text-orange" />
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">Qualifier</p>
                <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">Unterschrift ist nicht Lieferanten-Compliance.</p>
                <p className="mt-5 text-sm leading-7 text-muted">Ein veröffentlichter oder unterzeichneter Supplier Code of Conduct beweist nicht automatisch, dass alle Lieferanten sämtliche darin beschriebenen Anforderungen tatsächlich erfüllen.</p>
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
              <p>Ein Supplier Code of Conduct beschreibt die grundlegenden Erwartungen eines Unternehmens an das Verhalten seiner Lieferanten – beispielsweise zu Menschenrechten, Arbeitsbedingungen, Umwelt, Geschäftsethik und verantwortungsvoller Beschaffung.</p>
              <p className="mt-6">Ein belastbarer Kodex sollte einen klaren Geltungsbereich haben, realistische Erwartungen formulieren, intern freigegeben sein und mit einem tatsächlichen Prozess für Kommunikation, Bestätigung und gegebenenfalls weitere Lieferantenprüfung verbunden sein.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="distinction-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Grundprinzip" id="distinction-title" title="Ein Supplier Code ist eine Erwartung – kein Beweis für Lieferantenleistung." />
            <div>
              <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-code-compliance-distinction>
                <ol className="grid gap-5">
                  {[
                    ["Supplier Code of Conduct", "Welche Erwartungen werden gestellt?"],
                    ["Kommunikation / Zustimmung", "Wurde der Kodex dem Lieferanten tatsächlich kommuniziert?"],
                    ["Prozess", "Wie werden relevante Lieferanten eingebunden oder bewertet?"],
                    ["Nachweis", "Was dokumentiert die tatsächliche Anwendung?"],
                    ["Ergebnis", "Was ist über den Lieferanten tatsächlich bekannt?"]
                  ].map(([title, copy], index) => (
                    <li className="grid gap-3 sm:grid-cols-[12rem_1fr] sm:items-start" key={title}>
                      <p className="font-display text-3xl leading-tight text-ink">{title}</p>
                      <p className="min-w-0 rounded-[0.9rem] bg-white p-4 text-sm font-bold leading-6 text-muted">{copy}</p>
                      {index < 4 ? <span aria-hidden="true" className="text-2xl font-bold text-orange sm:col-span-2">↓</span> : null}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="resource-prose mt-8">
                <p>Ein Lieferant kann einen Code erhalten oder bestätigen. Daraus folgt nicht automatisch, dass jede darin enthaltene Erwartung vollständig geprüft oder erfüllt wurde.</p>
              </div>
              <div className="mt-8 rounded-[1rem] border-l-4 border-orange bg-white p-6 shadow-lift">
                <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Code ≠ Umsetzung ≠ Lieferanten-Compliance</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="assessment-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Vor dem Entwurf" id="assessment-title" title="Bevor Sie einen Lieferantenkodex schreiben: Wie funktioniert Ihre Beschaffung heute?">
              <p>Ein Supplier Code of Conduct sollte nicht mit einer langen Liste allgemeiner ESG-Forderungen beginnen, sondern mit der tatsächlichen Lieferantenstruktur und den bestehenden Beschaffungsprozessen.</p>
            </SectionHeading>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-procurement-assessment>
              {procurementAssessment.map((item) => (
                <li className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-4 text-sm font-bold leading-6 text-ink" key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-8 rounded-[1rem] border-l-4 border-orange bg-[var(--soft-orange)] p-6">
              <p className="font-display text-[clamp(2rem,4vw,3.35rem)] leading-tight text-ink">Erst Beschaffung verstehen. Dann Erwartungen formulieren.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="purpose-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Zweck" id="purpose-title" title="Wofür ist ein Supplier Code of Conduct da?" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-supplier-code-purpose-blocks>
              {purposeBlocks.map(([title, copy], index) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift" key={title}>
                  <span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-4 text-3xl leading-tight text-ink">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="blocks-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24" id="bausteine">
          <div className="site-shell">
            <SectionHeading eyebrow="Framework" id="blocks-title" light title="Sieben Bausteine eines belastbaren Supplier Code of Conduct" />
            <div className="mt-12 grid gap-6" data-supplier-code-building-blocks>
              {buildingBlocks.map((block) => (
                <section className="rounded-[1.2rem] border border-white/14 bg-white/[0.04] p-6 sm:p-8" key={block.title}>
                  <div className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr]">
                    <div>
                      <h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-white">{block.title}</h3>
                      <p className="mt-5 text-base leading-8 text-white/66">{block.copy}</p>
                      {"link" in block ? (
                        <div className="mt-5">
                          <Link className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-orange/55 underline-offset-4 transition hover:text-orange" href={block.link[0]}>
                            <span>{block.link[1]}</span>
                            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-orange transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {block.items.map((item) => (
                          <li className="rounded-[0.8rem] border border-white/10 bg-white/[0.06] p-3 text-sm font-bold leading-6 text-white/78" key={item}>{item}</li>
                        ))}
                      </ul>
                      {"note" in block ? <p className="mt-5 rounded-[0.9rem] border-l-4 border-orange bg-white/[0.07] p-4 text-sm font-bold leading-6 text-white">{block.note}</p> : null}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="not-in-code-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Grenzen" id="not-in-code-title" title="Was nicht in einen Supplier Code of Conduct gehört" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-not-in-supplier-code-items>
              {notIncludedItems.map(([title, copy]) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}>
                  <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="contract-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Status" id="contract-title" title="Ist ein Supplier Code automatisch Vertragsbestandteil?" />
            <div className="resource-prose">
              <p className="font-display text-3xl leading-tight text-ink">Nicht automatisch.</p>
              <p>Ob und wie ein Supplier Code vertraglich eingebunden wird, hängt vom konkreten Vertrags- und Beschaffungsprozess ab.</p>
              <p>Ein separat veröffentlichter oder versendeter Kodex sollte daher nicht automatisch so dargestellt werden, als sei er in jeder bestehenden Lieferantenbeziehung rechtlich verbindlicher Vertragsbestandteil.</p>
              <div className="mt-8 rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-contract-status-distinction>
                <p className="sr-only">Veröffentlicht ist nicht gleich kommuniziert, bestätigt oder vertraglich vereinbart.</p>
                <p className="mb-6 font-display text-3xl leading-tight text-ink">Veröffentlicht ≠ kommuniziert ≠ bestätigt ≠ vertraglich vereinbart</p>
                <FlowList items={["Veröffentlicht", "kommuniziert", "bestätigt", "vertraglich vereinbart"]} />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="acknowledgment-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Acknowledgment" id="acknowledgment-title" title="Was bedeutet es, wenn ein Lieferant den Kodex bestätigt?">
              <p>Eine Bestätigung kann dokumentieren, dass der Lieferant den Kodex erhalten oder bestimmte Erwartungen anerkannt hat.</p>
              <p>Sie beweist jedoch nicht automatisch, dass sämtliche Inhalte geprüft, umgesetzt oder dauerhaft eingehalten werden.</p>
            </SectionHeading>
            <div className="mt-12 grid gap-3 md:grid-cols-5" data-supplier-acknowledgment>
              {acknowledgmentStates.map((state, index) => (
                <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5" key={state}>
                  <span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span>
                  <p className="font-display mt-3 text-2xl leading-tight text-ink">{state}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 max-w-3xl text-sm font-bold leading-7 text-muted">Diese Zustände sind nicht gleichwertig. Eine Bestätigung oder Unterschrift ist kein Beweis für vollständige Lieferanten-Compliance.</p>
          </div>
        </section>

        <section aria-labelledby="evidence-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Evidence" id="evidence-title" title="Welche Nachweise zeigen, dass der Supplier Code tatsächlich genutzt wird?">
              <p>Der Supplier Code selbst ist nur ein Teil des Nachweises. Für die tatsächliche Anwendung sind ergänzende Prozess- und Umsetzungsunterlagen relevant.</p>
            </SectionHeading>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-supplier-code-evidence>
              {evidenceItems.map((item) => (
                <li className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-4 text-sm font-bold leading-6 text-ink" key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:items-start">
              <InlineLink href="/de/ressourcen/esg-nachweise-lieferanten">Mehr über ESG-Nachweise</InlineLink>
              <InlineLink href="/de/ressourcen/esg-nachweise-checkliste">Evidence Readiness Check</InlineLink>
            </div>
          </div>
        </section>

        <section aria-labelledby="status-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Statusmodell" id="status-title" title="Welchen Status hat Ihr Supplier Code?" />
            <div className="mt-12 grid gap-4 md:grid-cols-5" data-supplier-code-status-model>
              {statusModel.map(([title, copy]) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5" key={title}>
                  <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="version-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Version" id="version-title" title="Auch ein Lieferantenkodex braucht Versionskontrolle.">
              <p>Keine rückwirkenden Freigabe- oder Einführungsdaten erfinden.</p>
            </SectionHeading>
            <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-5 sm:p-7" data-supplier-code-version-control>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Beispiel</p>
              <dl className="mt-5 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)] sm:grid-cols-2">
                {versionMetadata.map(([term, description]) => (
                  <div className="bg-white p-4" key={term}>
                    <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{term}</dt>
                    <dd className="mt-2 break-words font-semibold text-ink">{description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="outline-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Outline" id="outline-title" title="Beispiel für den Aufbau eines Supplier Code of Conduct">
              <p>Dies ist eine Strukturhilfe – kein universell gültiger Vertrags- oder Compliance-Text.</p>
            </SectionHeading>
            <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-supplier-code-outline>
              {outlineSections.map(([title, copy]) => (
                <li className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}>
                  <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="deviation-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Abweichungen" id="deviation-title" light title="Was passiert, wenn ein Lieferant eine Anforderung nicht erfüllt?">
              <p>Ein belastbarer Supplier Code sollte nicht automatisch jede Abweichung mit sofortiger Beendigung der Geschäftsbeziehung verknüpfen.</p>
              <p>Je nach Schweregrad, Risiko, tatsächlichem Sachverhalt und bestehenden vertraglichen Regelungen kann zunächst Klärung, ein Maßnahmenplan oder eine andere angemessene Reaktion sinnvoll sein.</p>
            </SectionHeading>
            <div className="mt-12 rounded-[1.2rem] border border-white/14 bg-white/[0.04] p-6 sm:p-8" data-deviation-workflow>
              <FlowList dark items={deviationSteps} />
            </div>
            <p className="mt-7 max-w-3xl text-sm font-bold leading-7 text-white/62">Die konkrete rechtliche oder vertragliche Reaktion ist nicht Gegenstand dieses Leitfadens.</p>
          </div>
        </section>

        <section aria-labelledby="risk-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Risikobasiert" id="risk-title" title="Muss jeder Lieferant gleich behandelt werden?" />
            <div className="resource-prose">
              <p>Nicht jede Lieferantenbeziehung hat dieselbe ESG-Relevanz.</p>
              <p>Ein lokaler Bürobedarfslieferant, ein kritischer Produktionslieferant und ein Anbieter sensibler Rohstoffe können unterschiedliche Risikoprofile und Informationsbedarfe haben.</p>
              <p>Deshalb kann es sinnvoll sein, Kommunikation, Nachweise oder weiterführende Prüfungen risikobasiert zu strukturieren.</p>
              <p className="font-bold text-ink">Das ist hier ein praktisches Organisationsprinzip, keine pauschale rechtliche Anforderung.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="workflow-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Kundenanfrage" id="workflow-title" title="Was tun, wenn Ihr Kunde nach einem Supplier Code of Conduct fragt?" />
            <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.1rem] bg-[rgba(21,21,21,0.12)]" data-supplier-code-customer-workflow>
              {workflowSteps.map(([title, copy], index) => (
                <li className="grid gap-4 bg-white p-5 sm:grid-cols-[4rem_1fr] sm:p-6" key={title}>
                  <span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8"><ButtonLink href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten">Zur ESG-Fragebogen Checkliste</ButtonLink></div>
          </div>
        </section>

        <section aria-labelledby="no-code-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Wenn er fehlt" id="no-code-title" title="Was, wenn Ihr Unternehmen noch keinen Supplier Code of Conduct hat?" />
            <div className="resource-prose">
              <p>Dann sollte nicht rückwirkend so geantwortet werden, als hätte bereits ein formeller Lieferantenkodex bestanden.</p>
              <p>Prüfen Sie zunächst, welche Erwartungen bereits in Einkauf, Verträgen, Qualitätsanforderungen oder anderen internen Prozessen enthalten sind.</p>
              <p>Darauf kann ein realistischer Supplier-Code-Entwurf aufgebaut und anschließend intern geprüft, freigegeben und in passende Lieferantenprozesse integriert werden.</p>
              <div className="mt-8 rounded-[1rem] border-l-4 border-orange bg-[var(--soft-orange)] p-6">
                <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Eine fehlende Policy kann aufgebaut werden. Eine nicht bestehende Vergangenheit sollte nicht erfunden werden.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="comparison-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Abgrenzung" id="comparison-title" title="Supplier Code und Supplier Questionnaire haben unterschiedliche Aufgaben." />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-code-questionnaire-comparison>
              {supplierComparison.map(([title, copy]) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-6" key={title}>
                  <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{copy}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-sm font-bold leading-7 text-muted">Ein Supplier Code ersetzt daher nicht automatisch einen Supplier Questionnaire oder ein Assessment.</p>
          </div>
        </section>

        <section aria-labelledby="customer-own-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Copy-Paste vermeiden" id="customer-own-title" title="Kundenanforderung und eigener Supplier Code sind nicht dasselbe." />
            <div className="resource-prose">
              <p>Ein Kunde kann von Ihrem Unternehmen verlangen, bestimmte ESG-Grundsätze gegenüber Lieferanten zu adressieren.</p>
              <p>Daraus sollte jedoch nicht automatisch ein fremder Supplier Code unverändert übernommen werden.</p>
              <p>Prüfen Sie, welche Erwartungen für Ihre eigene Lieferantenstruktur tatsächlich relevant sind und welche davon intern getragen und umgesetzt werden können.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="assessments-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="ESG Assessments" id="assessments-title" title="Supplier Code of Conduct in ESG Assessments">
              <p>ESG Assessments können danach fragen, ob nachhaltige Beschaffungsgrundsätze, Lieferantenanforderungen oder entsprechende Nachweise vorhanden sind.</p>
              <p>Die Existenz eines Supplier Code kann dabei ein relevanter Baustein sein. Sie sollte jedoch nicht mit vollständiger Umsetzung oder einer umfassenden Bewertung der gesamten Lieferkette gleichgesetzt werden.</p>
            </SectionHeading>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {[
                ["EcoVadis", "EcoVadis-Unterstützung", "/de/ecovadis-unterstuetzung"],
                ["IntegrityNext", "IntegrityNext-Unterstützung", "/de/integritynext-unterstuetzung"]
              ].map(([title, cta, href]) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}>
                  <h3 className="font-display text-3xl leading-tight text-ink">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">Kontext für Supplier Assessments. Keine Aussage über Partnerschaft, Score, automatische Akzeptanz oder Plattformfreigabe.</p>
                  <div className="mt-5"><InlineLink href={href}>{cta}</InlineLink></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="reuse-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Reuse" id="reuse-title" title="Ein freigegebener Supplier Code sollte bei der nächsten ESG-Anfrage auffindbar sein." />
            <div className="resource-prose">
              <p>Dokumentieren Sie Version, Geltungsbereich, Freigabestatus, Document Owner und den aktuellen Speicherort.</p>
              <p>Zusätzlich sollte nachvollziehbar sein, ob und wie der Kodex bereits an relevante Lieferanten kommuniziert wurde.</p>
              <div className="mt-7"><InlineLink href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">ESG-Daten und Nachweise wiederverwendbar strukturieren</InlineLink></div>
            </div>
          </div>
        </section>

        <section aria-labelledby="lifecycle-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Lifecycle" id="lifecycle-title" light title="Von den tatsächlichen Erwartungen zum angewendeten Supplier Code" />
            <div className="mt-12 rounded-[1.2rem] border border-white/14 bg-white/[0.04] p-6 sm:p-8" data-supplier-code-lifecycle>
              <FlowList dark items={lifecycleSteps} />
            </div>
          </div>
        </section>

        <section aria-labelledby="mistakes-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Fehler vermeiden" id="mistakes-title" title="Acht typische Fehler bei Supplier Codes of Conduct" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-common-supplier-code-mistakes>
              {commonMistakes.map(([title, copy], index) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}>
                  <p className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="font-display mt-4 text-2xl leading-tight text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="approval-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Pre-Approval" id="approval-title" title="Vor der internen Freigabe prüfen" />
            <ul className="mt-12 grid gap-3 md:grid-cols-2" data-supplier-code-pre-approval-checklist>
              {preApprovalItems.map((item) => (
                <li className="flex gap-3 rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-white p-4 text-sm font-bold leading-6 text-ink" key={item}>
                  <span aria-hidden="true" className="text-orange">☐</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="resource-bridge-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Resource Bridge" id="resource-bridge-title" title="Supplier Code of Conduct im ESG-System einordnen" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5" data-supplier-code-resource-bridge>
              {resourceBridgeCards.map(([title, href]) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-6" key={title}>
                  <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
                  <div className="mt-5"><InlineLink href={href}>Ressource öffnen</InlineLink></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="commercial-title" className="bg-[var(--warm)] py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <div className="overflow-hidden rounded-[1.4rem] border border-orange/25 bg-[var(--soft-orange)]">
              <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
                <div className="p-7 sm:p-10 lg:p-12">
                  <Send aria-hidden="true" className="h-10 w-10 text-orange" />
                  <SectionHeading eyebrow="Umsetzung" id="commercial-title" title="Ihr Kunde verlangt einen Supplier Code – aber Ihr aktueller Prozess ist noch nicht sauber dokumentiert?" />
                </div>
                <div className="border-t border-orange/20 bg-white/65 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <p className="text-base leading-8 text-muted">Wir prüfen mit Ihnen, welche Erwartungen und Beschaffungsprozesse tatsächlich bestehen, strukturieren relevante ESG- und Compliance-Themen und bereiten daraus einen Supplier-Code-Entwurf für Ihre interne Prüfung und Freigabe vor.</p>
                  <p className="mt-4 text-base leading-8 text-muted">Wenn der Kodex Teil eines konkreten Fragebogens ist, hilft auch der Überblick <Link className="font-semibold text-ink underline decoration-orange/45 underline-offset-4 transition hover:text-orange" href="/de/esg-fragebogen-lieferanten">ESG-Fragebogen für Lieferanten</Link>.</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>Anfrage an evipace senden</ButtonLink>
                    <ButtonLink className="w-full sm:w-auto" href="/de/esg-kundenanfragen" variant="secondary">Mehr über ESG-Kundenanfragen</ButtonLink>
                  </div>
                  <p className="mt-5 text-sm font-semibold leading-7 text-muted">Der Entwurf wird erst durch Ihre interne Prüfung, Anpassung und autorisierte Freigabe zu einem offiziellen Unternehmensdokument.</p>
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
              <p>Dieser Leitfaden beschreibt eine praktische Vorgehensweise zur Vorbereitung eines Supplier Code of Conduct im Kontext von ESG-Kundenanfragen und Lieferantenmanagement.</p>
              <p>Er stellt keine Rechts-, Vertrags-, Audit- oder Zertifizierungsberatung dar und definiert keine universell verpflichtenden Inhalte.</p>
              <p>Welche Anforderungen, Rechte und Prozesse für ein konkretes Unternehmen sinnvoll oder erforderlich sind, hängt unter anderem von Lieferantenstruktur, Produkten, Regionen, bestehenden Verträgen, Kundenanforderungen und tatsächlich anwendbaren Anforderungen ab.</p>
              <div className="mt-7"><InlineLink href="/de/methodology">Wie evipace ESG-Informationen einordnet</InlineLink></div>
            </div>
          </div>
        </section>

        <section aria-labelledby="final-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24">
          <div className="site-shell">
            <div className="max-w-4xl">
              <RefreshCw aria-hidden="true" className="h-10 w-10 text-orange" />
              <h2 className="font-display mt-6 text-[clamp(2.75rem,6vw,5.8rem)] leading-[0.95]" id="final-title">Ein guter Supplier Code beginnt nicht mit einer Vorlage. Er beginnt mit Ihrer tatsächlichen Lieferkette.</h2>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">Wenn Lieferantenstruktur, Erwartungen, Verantwortlichkeiten und Prozesse klar sind, lässt sich daraus ein Kodex formulieren, der nachvollziehbar, realistisch und intern anwendbar ist.</p>
              <div className="mt-8"><ButtonLink href={SEND_REQUEST_HREF}>Supplier-Code-Anfrage senden</ButtonLink></div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
