import type { ReactNode } from "react";
import { ArrowRight, FileCheck2, RefreshCw, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";

const assessmentItems = [
  "relevante Standorte",
  "Produktionsprozesse",
  "Energieverbrauch",
  "Brennstoffe",
  "Abfall",
  "Wasser",
  "Gefahrstoffe / Chemikalien",
  "Emissionen",
  "Umweltgenehmigungen, sofern relevant",
  "vorhandene Umweltziele",
  "bestehende Arbeitsanweisungen",
  "Managementsysteme",
  "bestehende Zertifizierungen",
  "Verantwortliche für Umweltfragen",
  "bereits dokumentierte Maßnahmen"
] as const;

const purposeBlocks = [
  ["Orientierung", "Sie definiert grundlegende Umweltprinzipien des Unternehmens."],
  ["Verantwortung", "Sie schafft einen formellen Rahmen für interne Zuständigkeiten."],
  ["Kundenkommunikation", "Sie kann dokumentieren, welche Umweltgrundsätze ein Unternehmen offiziell vertritt."],
  ["Grundlage für Maßnahmen", "Sie kann Ziele und operative Prozesse einordnen, ersetzt diese aber nicht."]
] as const;

const buildingBlocks = [
  {
    title: "1 · Unternehmen und Geltungsbereich",
    copy:
      "Eine Environmental Policy sollte erkennen lassen, für welche Gesellschaft, Standorte oder Tätigkeiten sie gilt. Besonders bei Unternehmensgruppen sollte der Geltungsbereich nicht offenbleiben.",
    items: [
      "Welche rechtliche Einheit?",
      "Welche Standorte?",
      "Welche Tätigkeiten?",
      "Einzelgesellschaft oder Gruppe?",
      "Gilt die Policy für Produktionsstandorte, Verwaltung oder beides?"
    ],
    note: "Eine Gruppen-Policy deckt nicht automatisch jede rechtliche Einheit ab."
  },
  {
    title: "2 · Umweltrelevante Geschäftstätigkeit",
    copy:
      "Die Policy sollte zur tatsächlichen Tätigkeit passen. Ein Produktionsunternehmen hat andere relevante Umweltaspekte als eine reine Büroorganisation.",
    items: [
      "Energie",
      "Emissionen",
      "Abfall",
      "Materialien",
      "Wasser",
      "Chemikalien",
      "Vermeidung von Umweltbelastungen",
      "Ressourceneffizienz"
    ],
    note: "Nicht jedes Thema muss in jeder Policy gleich stark behandelt werden."
  },
  {
    title: "3 · Umweltgrundsätze",
    copy:
      "Umweltgrundsätze sollten belastbar formuliert und auf tatsächlich relevante Umweltaspekte bezogen sein.",
    items: [
      "verantwortungsvoller Ressourceneinsatz",
      "Vermeidung bzw. Verringerung unnötiger Umweltbelastungen",
      "Energieeffizienz",
      "Abfallvermeidung und Verwertung",
      "verantwortungsvoller Umgang mit Wasser",
      "sichere Handhabung relevanter Stoffe",
      "kontinuierliche Verbesserung",
      "Einhaltung tatsächlich anwendbarer Anforderungen"
    ],
    note: "Absolute Aussagen wie „Wir verursachen keine Umweltbelastung“ sind in der Regel nicht belastbar."
  },
  {
    title: "4 · Verantwortlichkeiten",
    copy:
      "Eine Policy sollte nicht so formuliert sein, als sei „das Unternehmen“ eine abstrakte verantwortliche Person. Für relevante Umweltbereiche sollten interne Zuständigkeiten klar sein.",
    items: ["Management", "EHS / Umweltmanagement", "Facility", "Production", "Quality"],
    link: ["/de/ressourcen/esg-daten-verantwortliche-abteilungen", "Zur ESG Data Owner Map"] as const
  },
  {
    title: "5 · Ziele und Maßnahmen",
    copy:
      "Quantitative Ziele sollten nur aufgenommen werden, wenn sie tatsächlich intern beschlossen wurden und Ausgangswert, Zeitraum und Verantwortlichkeit nachvollziehbar sind.",
    comparison: [
      ["Grundsatz", "Wir wollen den Energieeinsatz systematisch verbessern."],
      ["Konkretes Ziel", "15 % Reduktion bis 2028."]
    ] as const,
    note: "Keine Ziele erfinden. Nicht jede Environmental Policy braucht quantitative Ziele."
  },
  {
    title: "6 · Überwachung und Weiterentwicklung",
    copy:
      "Die Policy kann beschreiben, wie relevante Informationen beobachtet, Ziele oder Maßnahmen überprüft und Inhalte bei Änderungen weiterentwickelt werden.",
    items: [
      "Monitoring relevanter Informationen",
      "Prüfung von Zielen und Maßnahmen",
      "Updates bei geänderten Tätigkeiten oder Prozessen",
      "Management Review, sofern im Unternehmen so vorgesehen"
    ],
    note: "Praktisch ist die Formulierung „regelmäßig bzw. bei wesentlichen Änderungen“, wenn sie zur tatsächlichen Praxis passt."
  },
  {
    title: "7 · Interne Freigabe",
    copy:
      "Erst durch die tatsächliche interne Prüfung und Freigabe wird aus einem Entwurf eine offiziell verabschiedete Unternehmensrichtlinie.",
    items: [
      "Gesellschaft / Unternehmen",
      "Version",
      "Datum der tatsächlichen Freigabe",
      "Freigebende Stelle",
      "Document Owner",
      "Status",
      "gegebenenfalls Review-Information"
    ],
    note: "Draft ≠ verabschiedete Policy"
  }
] as const;

const notInPolicyItems = [
  ["Erfundene Maßnahmen", "Keine Prozesse beschreiben, die im Unternehmen nicht existieren."],
  ["Rückdatierte Aussagen", "Eine heute verabschiedete Policy sollte nicht so dargestellt werden, als habe sie bereits vor Jahren gegolten."],
  ["Unbelegte Ziele", "Keine quantitativen Reduktionsziele erfinden, nur um die Policy ambitionierter wirken zu lassen."],
  ["Unklarer Scope", "Nicht offenlassen, ob die Policy für einen Standort, eine Gesellschaft oder den gesamten Konzern gilt."],
  ["Absolute Umweltversprechen", "Formulierungen wie „keine Umweltbelastung“ sind in der Regel weder belastbar noch sinnvoll."],
  ["Copy-Paste ohne Unternehmensbezug", "Eine generische Vorlage sollte nicht unverändert als Unternehmenspolicy übernommen werden."]
] as const;

const evidenceItems = [
  "Energierechnungen",
  "Abfalldokumentation",
  "Umwelt-KPI-Auswertungen",
  "Schulungsnachweise",
  "interne Verfahren",
  "Zertifikate",
  "Genehmigungen",
  "Messprotokolle",
  "Management-Review-Unterlagen",
  "Maßnahmenpläne",
  "freigegebene Ziele"
] as const;

const statusModel = [
  ["Entwurf", "Inhalt wird noch vorbereitet oder intern abgestimmt."],
  ["Zur Freigabe", "Inhalt ist vorbereitet, aber noch nicht offiziell verabschiedet."],
  ["Freigegeben", "Die zuständige interne Stelle hat die Policy offiziell bestätigt."],
  ["Zu überprüfen", "Unternehmensstruktur, Prozesse oder Inhalte könnten sich verändert haben."],
  ["Ersetzt", "Eine neuere Version ist maßgeblich."]
] as const;

const versionMetadata = [
  ["Dokument", "Environmental Policy"],
  ["Version", "1.0"],
  ["Gültig für", "Gesellschaft / Standorte"],
  ["Freigegeben am", "Datum der tatsächlichen Freigabe"],
  ["Freigegeben durch", "zuständige Funktion"],
  ["Document Owner", "EHS / Management"],
  ["Status", "Freigegeben"],
  ["Review", "gemäß internem Prozess bzw. bei wesentlichen Änderungen"]
] as const;

const outlineSections = [
  ["1. Zweck", "Warum die Richtlinie existiert."],
  ["2. Geltungsbereich", "Für welche Gesellschaften, Standorte oder Tätigkeiten sie gilt."],
  ["3. Umweltgrundsätze", "Welche relevanten Umweltprinzipien das Unternehmen formal festlegt."],
  ["4. Wesentliche Umweltbereiche", "Zum Beispiel Energie, Emissionen, Abfall, Wasser oder relevante Stoffe – soweit für das Unternehmen tatsächlich relevant."],
  ["5. Verantwortlichkeiten", "Welche Funktionen zuständig sind."],
  ["6. Ziele und Maßnahmen", "Nur tatsächlich intern beschlossene Ziele und reale Maßnahmen."],
  ["7. Überwachung und Verbesserung", "Wie relevante Entwicklungen überprüft und bei Bedarf weiterentwickelt werden."],
  ["8. Freigabe und Dokumentenstatus", "Version, interne Freigabe und aktueller Status."]
] as const;

const workflowSteps = [
  ["Genaue Frage lesen", "Prüfen Sie, ob tatsächlich ein Policy-Dokument verlangt wird oder nur eine Ja/Nein-Angabe bzw. Beschreibung."],
  ["Bestehende Dokumente prüfen", "Möglicherweise existieren bereits eine Umweltrichtlinie, HSE-Policy, integrierte Management-Policy oder andere freigegebene Unterlagen."],
  ["Scope prüfen", "Gilt das vorhandene Dokument tatsächlich für die antwortende Gesellschaft und die relevante Tätigkeit?"],
  ["Status prüfen", "Ist das Dokument ein Entwurf, freigegeben, zu überprüfen oder bereits ersetzt?"],
  ["Nachweisanforderung prüfen", "Muss ein Dokument hochgeladen oder lediglich eine Information bestätigt werden?"],
  ["Antwort vorbereiten", "Nur auf Grundlage des tatsächlichen aktuellen Status antworten."]
] as const;

const readinessSteps = [
  "Bestehende Praxis verstehen",
  "relevante Umweltaspekte bestimmen",
  "Scope festlegen",
  "Grundsätze formulieren",
  "Verantwortlichkeiten zuordnen",
  "intern prüfen",
  "freigeben",
  "Umsetzung separat dokumentieren"
] as const;

const commonMistakes = [
  ["Generische Vorlage unverändert übernehmen", "Die Policy hat keinen erkennbaren Bezug zum tatsächlichen Unternehmen."],
  ["Geltungsbereich offenlassen", "Es ist unklar, für welche Gesellschaft oder Standorte das Dokument gilt."],
  ["Nicht bestehende Maßnahmen beschreiben", "Die Policy verspricht operative Prozesse, die intern noch nicht umgesetzt sind."],
  ["Ziele erfinden", "Quantitative Ziele werden genannt, obwohl sie intern nicht beschlossen oder messbar definiert wurden."],
  ["Entwurf als freigegebene Richtlinie behandeln", "Ein vorbereiteter Text ist noch keine offiziell verabschiedete Policy."],
  ["Policy mit Umsetzungsnachweis verwechseln", "Das Dokument allein beweist nicht, dass alle Aussagen operativ umgesetzt wurden."],
  ["Versionsstatus ignorieren", "Bei Kundenanfragen wird eine veraltete oder ersetzte Version weiterverwendet."]
] as const;

const preApprovalItems = [
  "Ist die Gesellschaft eindeutig?",
  "Ist der Standort-/Organisationsscope klar?",
  "Passt die Policy zur tatsächlichen Geschäftstätigkeit?",
  "Sind nur tatsächlich relevante Umweltbereiche enthalten?",
  "Sind Verantwortlichkeiten realistisch?",
  "Sind genannte Ziele tatsächlich beschlossen?",
  "Werden keine nicht bestehenden Maßnahmen behauptet?",
  "Ist klar, dass Umsetzung separat nachgewiesen wird?",
  "Sind Version und Freigabestatus dokumentiert?",
  "Wurde die Policy von der zuständigen Stelle intern geprüft?"
] as const;

const resourceBridgeCards = [
  ["Welche ESG-Daten fragt der Kunde?", "/de/ressourcen/welche-esg-daten-kunden-lieferanten"],
  ["Wer ist intern verantwortlich?", "/de/ressourcen/esg-daten-verantwortliche-abteilungen"],
  ["Ist der Nachweis verwendbar?", "/de/ressourcen/esg-nachweise-checkliste"],
  ["Policy später wiederverwenden", "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"],
  ["Lieferantenkodex vorbereiten", "/de/ressourcen/supplier-code-of-conduct-erstellen"]
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

function PolicyArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art">
      <svg className="resource-hero-art__sheet" fill="none" viewBox="0 0 520 650" xmlns="http://www.w3.org/2000/svg">
        <path d="M112 118H408M112 168H360M112 268H408M112 318H408M112 368H334M112 470H250" stroke="currentColor" strokeOpacity="0.44" strokeWidth="4" />
        <rect height="56" rx="10" stroke="currentColor" strokeOpacity="0.72" strokeWidth="3" width="296" x="112" y="198" />
        <rect height="42" rx="10" stroke="currentColor" strokeOpacity="0.38" strokeWidth="3" width="112" x="112" y="520" />
        <rect height="42" rx="10" stroke="currentColor" strokeOpacity="0.38" strokeWidth="3" width="112" x="252" y="520" />
        <path d="M126 220H238M266 220H388" stroke="currentColor" strokeOpacity="0.68" strokeWidth="8" />
      </svg>
      <span className="resource-hero-art__code">SCOPE · OWNER · STATUS · EVIDENCE</span>
    </div>
  );
}

export function EnvironmentalPolicyGuide() {
  return (
    <main id="top">
      <article>
        <header aria-labelledby="article-title" className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
          <PolicyArtwork />
          <div className="site-shell relative z-10">
            <nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]">
              <Link className="transition hover:text-orange" href="/de">Startseite</Link>
              <span aria-hidden="true">/</span>
              <Link className="transition hover:text-orange" href="/de/ressourcen">Ressourcen</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">Environmental Policy erstellen</span>
            </nav>

            <div className="mt-12 max-w-6xl">
              <p className="eyebrow">ENVIRONMENTAL POLICY</p>
              <h1 className="font-display mt-7 max-w-[17ch] break-words hyphens-auto text-[clamp(3rem,6.7vw,6.25rem)] leading-[0.92]" id="article-title">
                Environmental Policy erstellen: Was eine belastbare Umweltrichtlinie enthalten sollte
              </h1>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
              <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                <p>Kunden, ESG-Fragebögen und Supplier Assessments fragen häufig danach, ob ein Unternehmen eine Environmental Policy oder Umweltrichtlinie besitzt.</p>
                <p className="mt-6">Eine belastbare Policy sollte jedoch nicht nur gut formuliert sein. Sie sollte zum tatsächlichen Unternehmen passen, einen klaren Geltungsbereich haben, Verantwortlichkeiten benennen und nur Aussagen enthalten, die intern vertreten und umgesetzt werden können.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink className="w-full sm:w-auto" href="#bausteine">Zum Aufbau einer Environmental Policy ↓</ButtonLink>
                  <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF} variant="secondary">Kunde fragt bereits nach einer Policy?</ButtonLink>
                </div>
              </div>
              <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                <FileCheck2 aria-hidden="true" className="h-8 w-8 text-orange" />
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">Qualifier</p>
                <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">Keine rückwirkende Umsetzung durch neue Policy.</p>
                <p className="mt-5 text-sm leading-7 text-muted">Eine neu erstellte Environmental Policy ist kein rückwirkender Nachweis dafür, dass alle darin beschriebenen Grundsätze oder Maßnahmen bereits in der Vergangenheit umgesetzt wurden.</p>
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
              <p>Eine Environmental Policy beschreibt die grundlegenden Umweltprinzipien eines Unternehmens, ihren Geltungsbereich, interne Verantwortlichkeiten und den Rahmen für relevante Umweltziele und Maßnahmen.</p>
              <p className="mt-6">Sie sollte auf der tatsächlichen Geschäftstätigkeit basieren, intern geprüft und von einer zuständigen Stelle freigegeben werden. Die Policy selbst dokumentiert einen formellen Grundsatz – die tatsächliche Umsetzung sollte durch separate Prozesse, Kennzahlen und Nachweise belegbar sein.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="distinction-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Grundprinzip" id="distinction-title" title="Eine Policy ist nicht dasselbe wie ihre Umsetzung." />
            <div>
              <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-policy-distinction>
                <ol className="grid gap-5">
                  {[
                    ["Policy", "Was das Unternehmen formal festlegt."],
                    ["Prozess / Maßnahme", "Wie der Grundsatz umgesetzt wird."],
                    ["Kennzahl", "Wie ein Ergebnis gemessen wird."],
                    ["Nachweis", "Was die tatsächliche Umsetzung dokumentiert."]
                  ].map(([title, copy], index) => (
                    <li className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:items-start" key={title}>
                      <p className="font-display text-3xl leading-tight text-ink">{title}</p>
                      <p className="min-w-0 rounded-[0.9rem] bg-white p-4 text-sm font-bold leading-6 text-muted">{copy}</p>
                      {index < 3 ? <span aria-hidden="true" className="text-2xl font-bold text-orange sm:col-span-2">↓</span> : null}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="resource-prose mt-8">
                <p>Eine Environmental Policy kann beispielsweise festlegen, dass Energieverbrauch reduziert und Umweltbelastungen vermieden werden sollen.</p>
                <p>Ob und wie dies tatsächlich umgesetzt wird, ergibt sich jedoch aus Maßnahmen, Zuständigkeiten, Daten und Nachweisen – nicht allein aus dem Policy-Dokument.</p>
              </div>
              <div className="mt-8 rounded-[1rem] border-l-4 border-orange bg-white p-6 shadow-lift">
                <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Policy ≠ Umsetzung ≠ Nachweis</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="assessment-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Vor dem Entwurf" id="assessment-title" title="Bevor Sie schreiben: Was existiert im Unternehmen bereits?">
              <p>Eine Environmental Policy sollte nicht mit allgemeinen Nachhaltigkeitsformulierungen beginnen, sondern mit der tatsächlichen Situation des Unternehmens.</p>
              <p>Prüfen Sie zunächst, welche Umweltprozesse, Verantwortlichkeiten, Ziele und Dokumente bereits bestehen.</p>
            </SectionHeading>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-pre-drafting-assessment>
              {assessmentItems.map((item) => (
                <li className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-4 text-sm font-bold leading-6 text-ink" key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-8 rounded-[1rem] border-l-4 border-orange bg-[var(--soft-orange)] p-6">
              <p className="font-display text-[clamp(2rem,4vw,3.35rem)] leading-tight text-ink">Erst Realität erfassen. Dann Policy formulieren.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="purpose-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Zweck" id="purpose-title" title="Wofür ist eine Environmental Policy da?" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-policy-purpose-blocks>
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
            <SectionHeading eyebrow="Framework" id="blocks-title" light title="Sieben Bausteine einer belastbaren Environmental Policy" />
            <div className="mt-12 grid gap-6" data-policy-building-blocks>
              {buildingBlocks.map((block) => (
                <section className="rounded-[1.2rem] border border-white/14 bg-white/[0.04] p-6 sm:p-8" key={block.title}>
                  <div className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr]">
                    <div>
                      <h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-white">{block.title}</h3>
                      <p className="mt-5 text-base leading-8 text-white/66">{block.copy}</p>
                      {"link" in block ? (
                        <div className="mt-5">
                          <Link
                            className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-orange/55 underline-offset-4 transition hover:text-orange"
                            href={block.link[0]}
                          >
                            <span>{block.link[1]}</span>
                            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-orange transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      {"comparison" in block ? (
                        <dl className="grid gap-3 sm:grid-cols-2">
                          {block.comparison.map(([term, description]) => (
                            <div className="rounded-[0.9rem] bg-white p-5" key={term}>
                              <dt className="text-xs font-bold uppercase tracking-[0.11em] text-orange">{term}</dt>
                              <dd className="mt-3 text-sm font-bold leading-6 text-ink">{description}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {block.items.map((item) => (
                            <li className="rounded-[0.8rem] border border-white/10 bg-white/[0.06] p-3 text-sm font-bold leading-6 text-white/78" key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {"note" in block ? <p className="mt-5 rounded-[0.9rem] border-l-4 border-orange bg-white/[0.07] p-4 text-sm font-bold leading-6 text-white">{block.note}</p> : null}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="not-in-policy-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Grenzen" id="not-in-policy-title" title="Was nicht in eine Environmental Policy gehört" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-not-in-policy-items>
              {notInPolicyItems.map(([title, copy]) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}>
                  <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="generic-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Formulierung" id="generic-title" title="Eine Vorlage ist nur der Ausgangspunkt." />
            <div className="mt-12 grid gap-6 lg:grid-cols-2" data-generic-specific-comparison>
              <article className="rounded-[1.1rem] border border-[rgba(21,21,21,0.12)] bg-[var(--warm)] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Generisch</p>
                <blockquote className="font-display mt-5 text-3xl leading-tight text-ink">Wir verpflichten uns zum Schutz der Umwelt und zur Reduzierung unseres ökologischen Fußabdrucks.</blockquote>
                <p className="mt-5 text-sm leading-7 text-muted">Klingt gut, sagt aber wenig darüber aus, welche Umweltaspekte für das Unternehmen tatsächlich relevant sind.</p>
              </article>
              <article className="rounded-[1.1rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Unternehmensbezogener</p>
                <blockquote className="font-display mt-5 text-3xl leading-tight text-ink">Für unsere Produktionsstandorte berücksichtigen wir insbesondere Energieeinsatz, Abfall, relevante Betriebsstoffe und weitere wesentliche betriebliche Umweltaspekte. Verantwortlichkeiten und Maßnahmen werden innerhalb der zuständigen Funktionen gesteuert und bei Bedarf überprüft.</blockquote>
                <p className="mt-5 text-sm font-bold leading-7 text-muted">Auch diese Formulierung darf nur verwendet werden, wenn sie zum tatsächlichen Unternehmen passt.</p>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="hierarchy-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Dokumentensystem" id="hierarchy-title" title="Welche Dokumente gehören zusammen?" />
            <div>
              <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-document-hierarchy>
                <FlowList items={["Environmental Policy", "Procedure / Arbeitsanweisung", "Records", "KPI / Report"]} />
                <dl className="mt-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)] sm:grid-cols-2">
                  {[
                    ["Environmental Policy", "Grundsätze und Rahmen."],
                    ["Procedure / Arbeitsanweisung", "Wie ein konkreter Prozess funktioniert."],
                    ["Records", "Was tatsächlich durchgeführt wurde."],
                    ["KPI / Report", "Welches Ergebnis daraus entsteht."]
                  ].map(([term, description]) => (
                    <div className="bg-white p-4" key={term}>
                      <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{term}</dt>
                      <dd className="mt-2 font-semibold text-ink">{description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-8 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Illustratives Beispiel: Abfall</p>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Policy", "Abfall soll verantwortungsvoll behandelt werden."],
                    ["Procedure", "internes Verfahren für Abfalltrennung."],
                    ["Evidence", "Entsorgungsnachweis."],
                    ["KPI", "Abfallmenge im Berichtsjahr."]
                  ].map(([term, description]) => (
                    <div className="border-t border-[rgba(21,21,21,0.14)] pt-4" key={term}>
                      <dt className="font-bold text-ink">{term}</dt>
                      <dd className="mt-2 text-sm leading-6 text-muted">{description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="evidence-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Evidence" id="evidence-title" title="Welche Nachweise können eine Environmental Policy ergänzen?">
              <p>Nicht jedes Dokument ist für jede Aussage relevant.</p>
            </SectionHeading>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-supporting-evidence>
              {evidenceItems.map((item) => (
                <li className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-4 text-sm font-bold leading-6 text-ink" key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:items-start">
              <InlineLink href="/de/ressourcen/esg-nachweise-lieferanten">ESG-Nachweise richtig zuordnen</InlineLink>
              <InlineLink href="/de/ressourcen/esg-nachweise-checkliste">Evidence Readiness Check</InlineLink>
            </div>
          </div>
        </section>

        <section aria-labelledby="status-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Status" id="status-title" title="Welchen Status hat Ihre Environmental Policy?" />
            <div className="mt-12 grid gap-4 md:grid-cols-5" data-policy-status-model>
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
            <SectionHeading eyebrow="Version" id="version-title" title="Eine Policy braucht eine eindeutige Version.">
              <p>Keine rückwirkenden Freigabedaten erfinden.</p>
            </SectionHeading>
            <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-5 sm:p-7" data-version-control-example>
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
            <SectionHeading eyebrow="Outline" id="outline-title" title="Beispiel für den Aufbau einer Environmental Policy">
              <p>Dies ist eine Strukturhilfe – keine universell gültige Policy-Vorlage.</p>
            </SectionHeading>
            <ol className="mt-12 grid gap-4 md:grid-cols-2" data-policy-outline>
              {outlineSections.map(([title, copy]) => (
                <li className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}>
                  <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="workflow-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Kundenanfrage" id="workflow-title" light title="Was tun, wenn der Kunde nach einer Environmental Policy fragt?" />
            <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.1rem] bg-white/14" data-customer-policy-workflow>
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
            <div className="mt-8"><ButtonLink href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten">ESG-Fragebogen Checkliste</ButtonLink></div>
          </div>
        </section>

        <section aria-labelledby="no-policy-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Wenn sie fehlt" id="no-policy-title" title="Was, wenn Ihr Unternehmen noch keine Environmental Policy hat?" />
            <div className="resource-prose">
              <p>Dann sollte nicht rückwirkend so geantwortet werden, als hätte bereits eine freigegebene Policy bestanden.</p>
              <p>Prüfen Sie zuerst, welche Umweltpraktiken und Verantwortlichkeiten tatsächlich vorhanden sind. Daraus kann ein ehrlicher Policy-Entwurf vorbereitet werden, der anschließend intern geprüft, korrigiert und offiziell verabschiedet wird.</p>
              <div className="mt-8 rounded-[1rem] border-l-4 border-orange bg-[var(--soft-orange)] p-6">
                <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Eine Lücke kann geschlossen werden. Sie sollte nicht rückwirkend versteckt werden.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="iso-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="ISO 14001" id="iso-title" title="Brauchen Unternehmen mit ISO 14001 zusätzlich eine separate Environmental Policy?" />
            <div className="resource-prose">
              <p>Unternehmen mit einem bestehenden Umweltmanagementsystem verfügen möglicherweise bereits über eine Umweltpolitik oder vergleichbare dokumentierte Vorgaben.</p>
              <p>Bevor ein neues Dokument erstellt wird, sollte deshalb geprüft werden, welche freigegebenen Unterlagen bereits existieren und ob sie den konkreten Kundenbedarf abdecken.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="assessments-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Supplier Assessments" id="assessments-title" title="Environmental Policies in Supplier Assessments">
              <p>In Supplier Assessments kann nicht nur gefragt werden, ob eine Policy existiert, sondern auch nach unterstützenden Dokumenten, Maßnahmen oder Kennzahlen.</p>
              <p>Deshalb sollte die Policy nicht isoliert betrachtet werden. Entscheidend ist die Verbindung zwischen formeller Richtlinie, tatsächlicher Praxis und belastbaren Nachweisen.</p>
            </SectionHeading>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {[
                ["EcoVadis", "EcoVadis-Unterstützung", "/de/ecovadis-unterstuetzung"],
                ["IntegrityNext", "IntegrityNext-Unterstützung", "/de/integritynext-unterstuetzung"]
              ].map(([title, cta, href]) => (
                <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}>
                  <h3 className="font-display text-3xl leading-tight text-ink">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">Kontext für Supplier Assessments. Keine Aussage über automatische Akzeptanz, Bewertung oder Plattformfreigabe.</p>
                  <div className="mt-5"><InlineLink href={href}>{cta}</InlineLink></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="reuse-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Reuse" id="reuse-title" title="Eine freigegebene Policy sollte nicht im nächsten Fragebogen wieder gesucht werden müssen." />
            <div className="resource-prose">
              <p>Dokumentieren Sie, für welche Gesellschaft die Policy gilt, welche Version aktuell ist, wer sie freigegeben hat und wo die freigegebene Datei liegt.</p>
              <p>So kann bei der nächsten Kundenanfrage zuerst geprüft werden, ob die vorhandene Version noch passt, statt erneut eine neue Richtlinie zu erstellen.</p>
              <div className="mt-7"><InlineLink href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">ESG-Daten und Nachweise wiederverwendbar strukturieren</InlineLink></div>
            </div>
          </div>
        </section>

        <section aria-labelledby="readiness-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Readiness Map" id="readiness-title" title="Von der tatsächlichen Praxis zur freigegebenen Policy" />
            <div className="mt-12 rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-policy-readiness-map>
              <FlowList items={readinessSteps} />
            </div>
          </div>
        </section>

        <section aria-labelledby="mistakes-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Fehler vermeiden" id="mistakes-title" light title="Sieben typische Fehler bei Environmental Policies" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-common-policy-mistakes>
              {commonMistakes.map(([title, copy], index) => (
                <article className={`rounded-[1rem] border border-white/14 bg-white/[0.04] p-6 ${index === 6 ? "xl:col-span-3" : ""}`} key={title}>
                  <p className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="font-display mt-4 text-2xl leading-tight text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="approval-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Pre-Approval" id="approval-title" title="Vor der internen Freigabe prüfen" />
            <ul className="mt-12 grid gap-3 md:grid-cols-2" data-pre-approval-checklist>
              {preApprovalItems.map((item) => (
                <li className="flex gap-3 rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-white p-4 text-sm font-bold leading-6 text-ink" key={item}>
                  <span aria-hidden="true" className="text-orange">☐</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="resource-bridge-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Resource Bridge" id="resource-bridge-title" title="Environmental Policy im ESG-System einordnen" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-resource-bridge>
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
                  <SectionHeading eyebrow="Umsetzung" id="commercial-title" title="Ihr Kunde verlangt eine Environmental Policy – aber Sie möchten nichts erfinden?" />
                </div>
                <div className="border-t border-orange/20 bg-white/65 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <p className="text-base leading-8 text-muted">Wir prüfen mit Ihnen, welche Umweltpraktiken, Verantwortlichkeiten und Unterlagen tatsächlich vorhanden sind, strukturieren offene Punkte und bereiten auf dieser Basis einen Policy-Entwurf für Ihre interne Prüfung und Freigabe vor.</p>
                  <p className="mt-4 text-base leading-8 text-muted">Wenn die Policy Teil eines konkreten Fragebogens ist, hilft auch der Überblick <Link className="font-semibold text-ink underline decoration-orange/45 underline-offset-4 transition hover:text-orange" href="/de/esg-fragebogen-lieferanten">ESG-Fragebogen für Lieferanten</Link>.</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>Anfrage an Evipace senden</ButtonLink>
                    <ButtonLink className="w-full sm:w-auto" href="/de/esg-kundenanfragen" variant="secondary">Mehr über ESG-Kundenanfragen</ButtonLink>
                  </div>
                  <p className="mt-5 text-sm font-semibold leading-7 text-muted">Der Entwurf wird erst durch Ihre interne Prüfung, Korrektur und autorisierte Freigabe zu einer offiziellen Unternehmensrichtlinie.</p>
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
              <p>Diese Seite beschreibt eine praktische Vorgehensweise zur Vorbereitung einer Environmental Policy im Kontext von ESG-Kundenanfragen. Sie stellt keine Rechts-, Zertifizierungs- oder Auditberatung dar und definiert keine universell verpflichtenden Policy-Inhalte.</p>
              <p>Welche Inhalte für ein konkretes Unternehmen sinnvoll oder erforderlich sind, hängt unter anderem von Tätigkeit, Organisation, bestehenden Managementsystemen, Kundenanforderungen und tatsächlich anwendbaren Anforderungen ab.</p>
              <div className="mt-7"><InlineLink href="/de/methodology">Wie Evipace ESG-Informationen einordnet</InlineLink></div>
            </div>
          </div>
        </section>

        <section aria-labelledby="final-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24">
          <div className="site-shell">
            <div className="max-w-4xl">
              <RefreshCw aria-hidden="true" className="h-10 w-10 text-orange" />
              <h2 className="font-display mt-6 text-[clamp(2.75rem,6vw,5.8rem)] leading-[0.95]" id="final-title">Eine gute Environmental Policy beginnt nicht mit Text. Sie beginnt mit dem tatsächlichen Unternehmen.</h2>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">Wenn Scope, Verantwortlichkeiten und bestehende Praxis klar sind, lässt sich daraus eine Richtlinie formulieren, die nachvollziehbar, realistisch und intern vertretbar ist.</p>
              <div className="mt-8"><ButtonLink href={SEND_REQUEST_HREF}>Environmental-Policy-Anfrage senden</ButtonLink></div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
