import type { ReactNode } from "react";
import {
  CircleAlert,
  ClipboardCheck,
  ExternalLink,
  FileCheck2,
  Link2,
  Network
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";
const EFRAG_STANDARD_URL = "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard";
const INTEGRITYNEXT_COLLEAGUE_URL = "https://helpdesk.integritynext.com/hc/en-us/articles/360018479559-How-can-I-invite-add-a-colleague-to-my-supplier-profile";
const BMW_SAQ_URL = "https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/responsibility/downloads/en/2022/Sustainability-Assessment-Questionnaire_SAQ_5.0_EN.pdf";
const BMOE_QUESTIONNAIRE_URL = "https://bmoe.at/lieferanten-nachhaltigkeitsfragebogen/";

const quickDepartments = [
  ["Geschäftsführung", ["Unternehmensangaben und Verantwortlichkeiten", "Nachhaltigkeitsziele und Governance", "formelle Policy-Freigaben", "Bestätigung strategischer Aussagen"]],
  ["Finance / Controlling", ["Umsatz und Bilanzdaten", "Strom- und Gasrechnungen", "Energieeinkäufe", "Kraftstoffkosten und quantitative Unternehmensdaten"]],
  ["HR", ["Mitarbeiterzahl, FTE und Headcount", "Vertragsarten und Trainingsstunden", "Tarifbindung", "weitere Workforce-Kennzahlen"]],
  ["Qualität / Umwelt / HSE", ["ISO-Zertifikate und Managementsysteme", "Auditunterlagen und Umweltprozesse", "Arbeitssicherheit", "Abfall- und Umweltkennzahlen"]],
  ["Facility / Operations / Produktion", ["Energieverbrauch und Anlagen", "Brennstoffe und Kältemittel", "Wasser", "Produktions- und Prozessdaten"]],
  ["Einkauf / Supply Chain", ["Lieferantenprozesse und Supplier Code", "nachhaltige Beschaffung", "Rohstoffinformationen", "Lieferantenbewertungen und Materialdaten"]],
  ["Compliance / Legal", ["Antikorruption und Code of Conduct", "Hinweisgebersystem", "Compliance-Prozesse", "bestätigte Vorfälle und Governance-Angaben"]],
  ["Engineering / Produkt / Technik", ["Produktmaterialien und Stücklisten", "technische Produktspezifikationen", "Materialgewichte und Recyclinganteile", "Produkt- oder Prozessinformationen"]]
] as const;

const dataOwnerRows = [
  ["Unternehmensdaten", "GF / Finance", "Umsatz, Gesellschaft, Standorte", "Abschluss / Stammdaten"],
  ["Energie", "Finance / Facility", "Strom, Gas, Wärme", "Rechnungen / Zähler"],
  ["Scope 1 & 2", "Operations / Finance / ESG", "Aktivitätsdaten, Emissionen", "Rechnungen + Berechnung"],
  ["Kältemittel", "Facility / Technik", "Stoff, nachgefüllte kg", "Serviceprotokolle"],
  ["Workforce", "HR", "Headcount, FTE, Verträge", "HR-System"],
  ["Training", "HR / Fachbereich", "Stunden, Teilnahmen", "Trainingsregister"],
  ["Arbeitssicherheit", "HSE / HR", "Unfälle, Prozesse", "Unfallregister"],
  ["Umweltmanagement", "Qualität / Umwelt", "ISO, Prozesse", "Zertifikate / EMS"],
  ["Abfall", "HSE / Facility", "Mengen, Abfallarten", "Entsorgerdaten"],
  ["Wasser", "Facility / Produktion", "Verbrauch / Entnahme", "Rechnungen / Zähler"],
  ["Ethics", "Compliance / GF", "Antikorruption, Code", "Policies"],
  ["Lieferanten", "Einkauf", "Supplier Code, Prozesse", "Procurement-Unterlagen"],
  ["Materialien", "Einkauf / Produktion", "Materialmengen", "ERP / Einkauf"],
  ["Produktdaten", "Engineering / Produkt", "Zusammensetzung, Gewicht", "BOM / technische Daten"]
] as const;

const requestMapRows = [
  ["Scope 1 2025", "tCO₂e", "Finance + Operations", "Calculation Review", "Workbook", "berechnen"],
  ["Strom 2025", "kWh", "Finance", "Facility", "Rechnung", "bereit"],
  ["Mitarbeiterzahl", "Headcount", "HR", "HR", "HR-Auswertung", "bereit"],
  ["ISO 14001", "gültiges Zertifikat", "Quality", "Quality", "Zertifikat", "bereit"],
  ["Umweltpolitik", "Policy", "Environment", "GF", "Policy", "prüfen"],
  ["Supplier Code", "gültiges Dokument", "Einkauf", "Einkauf / GF", "Policy", "bereit"],
  ["Korruptionsfälle", "Anzahl", "Compliance", "GF / Legal", "Bestätigung", "bestätigen"],
  ["Abfall", "t nach Typ", "HSE", "HSE", "Entsorgerreport", "beschaffen"]
] as const;

const faqItems = [
  ["Wer sollte einen ESG-Fragebogen im Unternehmen ausfüllen?", "Am besten wird der Fragebogen von einer Person zentral koordiniert, während die einzelnen Daten von den jeweils zuständigen Fachbereichen geliefert werden. Je nach Thema können Finance, HR, Einkauf, Qualität, HSE, Operations, Compliance oder Geschäftsführung beteiligt sein."],
  ["Muss ein Unternehmen einen ESG Manager haben?", "Nein. Gerade kleinere Unternehmen können ESG-Anfragen auch mit einer klaren Koordinations- und Data-Owner-Struktur bearbeiten. Entscheidend ist, dass für jeden relevanten Datenpunkt eine belastbare interne Quelle identifiziert werden kann."],
  ["Wer liefert Energie- und Emissionsdaten?", "Die Rohdaten liegen häufig bei Finance, Facility, Operations oder Fuhrpark. Die eigentliche Emissionsberechnung kann anschließend von einer anderen Person beziehungsweise Stelle durchgeführt werden."],
  ["Wer liefert Mitarbeiterdaten?", "Typischerweise HR. Dabei sollte immer geklärt werden, welche Definition und welcher Zeitraum verlangt werden – beispielsweise Headcount oder FTE."],
  ["Wer ist für ESG-Policies zuständig?", "Das hängt vom Thema ab. Ein Entwurf kann beispielsweise aus Environment, HR, Compliance oder Procurement kommen. Eine formelle Unternehmensrichtlinie sollte jedoch von der dafür autorisierten internen Stelle geprüft und verabschiedet werden."],
  ["Sollte man den gesamten Fragebogen an alle Abteilungen schicken?", "In der Regel ist eine strukturierte Datenanfrage effizienter. Fachbereiche sollten möglichst nur die benötigten Datenpunkte, den Scope, Zeitraum, Einheit und gewünschte Quelle erhalten."],
  ["Was tun, wenn zwei Abteilungen unterschiedliche Zahlen liefern?", "Zuerst Scope, Zeitraum, Definition, Einheit und Originalquelle vergleichen. Die Differenz sollte verstanden und dokumentiert werden, bevor ein finaler Wert verwendet wird."],
  ["Können dieselben Data Owner für EcoVadis, IntegrityNext und VSME genutzt werden?", "Häufig ja. Die Plattform beziehungsweise der Bericht kann sich ändern, die zugrunde liegenden Unternehmensinformationen bleiben aber oft dieselben. IntegrityNext unterstützt beispielsweise ausdrücklich die Zusammenarbeit mehrerer Kolleginnen und Kollegen im Supplier Profile."],
  ["Wer bestätigt die finale Antwort an den Kunden?", "Das hängt von der internen Governance ab. Fachliche Daten sollten vom zuständigen Owner stammen; Unternehmens- und Managementaussagen benötigen gegebenenfalls eine zusätzliche Freigabe durch die entsprechend autorisierte Person."],
  ["Kann evipace alle Angaben selbst bestätigen?", "Nein. evipace kann Anforderungen strukturieren, Datenquellen zuordnen, Berechnungen und Entwürfe vorbereiten und die Unterlagen reviewen. Unternehmensspezifische Tatsachen und Aussagen müssen auf den vom Kunden bereitgestellten Quellen beruhen und gegebenenfalls intern bestätigt werden."]
] as const;

function ExternalSourceLink({ children, href }: { children: ReactNode; href: string }) {
  return <a className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange" href={href} rel="noreferrer" target="_blank">{children}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /></a>;
}

function BulletList({ items }: { items: readonly string[] }) {
  return <ul className="mt-6 grid gap-3">{items.map((item) => <li className="flex gap-3 leading-7 text-muted" key={item}><span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" /><span>{item}</span></li>)}</ul>;
}

function ArticleSection({ children, id, number, title }: { children: ReactNode; id: string; number: string; title: string }) {
  return <section aria-labelledby={id + "-title"} className="scroll-mt-28 border-t border-[rgba(21,21,21,0.12)] py-14 sm:py-16" id={id}><div className="flex items-start gap-4 sm:gap-6"><span className="mt-1 font-mono text-xs font-bold tracking-[0.15em] text-orange">{number}</span><h2 className="font-display max-w-[21ch] text-[clamp(2.15rem,4.1vw,3.7rem)] leading-[1.02]" id={id + "-title"}>{title}</h2></div><div className="resource-prose mt-8 sm:pl-[3.35rem]">{children}</div></section>;
}

function Principle({ children, label }: { children: ReactNode; label?: string }) {
  return <div className="my-8 rounded-[1.1rem] bg-ink p-7 text-white sm:p-8">{label ? <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">{label}</p> : null}<p className={"font-display text-[clamp(1.8rem,4vw,3.05rem)] leading-[1.1] " + (label ? "mt-4" : "")}>{children}</p></div>;
}

function StatusPill({ status }: { status: string }) {
  const ready = status === "bereit";
  return <span className={"inline-flex rounded-full border px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.06em] " + (ready ? "border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] text-[#b94f00]" : "border-[rgba(21,21,21,0.16)] bg-[rgba(21,21,21,0.05)] text-ink")}>{status}</span>;
}

function ResponsiveMap({ caption, headers, marker, rows, statusColumn }: { caption: string; headers: readonly string[]; marker: string; rows: readonly (readonly string[])[]; statusColumn?: number }) {
  return <div className="mt-8" data-esg-map={marker}><div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block"><div className="overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left text-sm"><caption className="sr-only">{caption}</caption><thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]"><tr>{headers.map((heading) => <th className="border-b border-[rgba(21,21,21,0.12)] px-4 py-4 font-bold" key={heading} scope="col">{heading}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0" key={row[0] + "-" + rowIndex}>{row.map((value, columnIndex) => columnIndex === 0 ? <th className="px-4 py-5 font-bold text-ink" key={value + "-" + columnIndex} scope="row">{value}</th> : <td className="px-4 py-5 text-muted" key={value + "-" + columnIndex}>{statusColumn === columnIndex ? <StatusPill status={value} /> : value}</td>)}</tr>)}</tbody></table></div></div><div className="grid gap-4 md:hidden">{rows.map((row, rowIndex) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5" key={row[0] + "-" + rowIndex}><div className="flex items-start justify-between gap-3 border-b border-[rgba(21,21,21,0.1)] pb-4"><h3 className="min-w-0 break-words font-bold text-ink">{row[0]}</h3>{typeof statusColumn === "number" ? <StatusPill status={row[statusColumn]} /> : null}</div><dl className="mt-4 grid gap-3 text-sm">{headers.slice(1).map((label, index) => { const columnIndex = index + 1; if (statusColumn === columnIndex) return null; return <div className="grid grid-cols-[6.7rem_minmax(0,1fr)] gap-3" key={label}><dt className="font-semibold text-[rgba(21,21,21,0.56)]">{label}</dt><dd className="min-w-0 break-words text-ink">{row[columnIndex]}</dd></div>; })}</dl></article>)}</div></div>;
}

function DataOwnerArtwork() {
  const nodes = [[260, 78], [260, 178], [112, 294], [260, 294], [408, 294], [112, 438], [260, 438], [408, 438]] as const;
  return <div aria-hidden="true" className="resource-hero-art"><svg className="resource-hero-art__sheet" fill="none" viewBox="0 0 520 650" xmlns="http://www.w3.org/2000/svg"><path d="M260 78V178M260 178L112 294M260 178L260 294M260 178L408 294M112 294V438M260 294V438M408 294V438" stroke="currentColor" strokeOpacity="0.72" strokeWidth="2" />{nodes.map(([cx, cy], index) => <circle cx={cx} cy={cy} fill={index === 1 ? "#FE7001" : "currentColor"} fillOpacity={index === 1 ? 1 : 0.08} key={cx + "-" + cy} r={index === 1 ? 15 : 11} stroke="currentColor" strokeWidth="2" />)}<text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2" x="64" y="536">OWNER · SOURCE · REVIEW</text></svg><span className="resource-hero-art__code">FINANCE · HR · QUALITY · OPERATIONS</span></div>;
}

export function EsgDataOwnersGuide() {
  return (
    <>
      <main id="top">
        <article>
          <header aria-labelledby="article-title" className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
            <DataOwnerArtwork />
            <div className="site-shell relative z-10">
              <nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]">
                <Link className="transition hover:text-orange" href="/de">Startseite</Link><span aria-hidden="true">/</span><Link className="transition hover:text-orange" href="/de/ressourcen">Ressourcen</Link><span aria-hidden="true">/</span><span className="text-ink">ESG-Datenverantwortung</span>
              </nav>
              <div className="mt-12 max-w-6xl"><p className="eyebrow">ESG-Daten · Interne Verantwortlichkeiten</p><h1 className="font-display mt-7 max-w-[18ch] break-words hyphens-auto text-[clamp(3.05rem,6.8vw,6.35rem)] leading-[0.92]" id="article-title">ESG-Daten vom Kunden angefragt: Wer im Unternehmen liefert welche Informationen?</h1></div>
              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
                <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                  <p>Ein Kunde schickt einen ESG-Fragebogen. Die Datei landet bei Einkauf, Qualität, Geschäftsführung oder bei der Person, die gerade als Kontakt im Kundenportal hinterlegt ist.</p>
                  <p className="mt-6">Diese Person kann den Fragebogen koordinieren. Aber sie besitzt normalerweise nicht alle Informationen, die für eine belastbare Antwort benötigt werden.</p>
                  <p className="font-display mt-7 text-3xl leading-tight text-ink">Wer besitzt für jeden Datenpunkt die verlässlichste interne Quelle?</p>
                </div>
                <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7"><Network aria-hidden="true" className="h-8 w-8 text-orange" /><p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">Die Kernfrage</p><p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">Kundenfrage → Datenpunkt → interner Owner → Quelle → Review</p></aside>
              </div>
              <p className="mt-12 max-w-4xl text-lg leading-8 text-muted">Stromverbrauch kann in Finance liegen, Kältemittel bei Facility, Mitarbeiterdaten bei HR und Zertifikate im Qualitätsmanagement. Dieser Leitfaden zeigt eine praktische, nicht universell vorgeschriebene Data-Owner-Struktur für produzierende Unternehmen.</p>
            </div>
          </header>

          <section aria-labelledby="quick-answer-title" className="scroll-mt-24 bg-ink py-20 text-white sm:py-24" id="schnellantwort">
            <div className="site-shell">
              <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
                <div><p className="eyebrow">Quick Answer</p><h2 className="font-display mt-6 max-w-[14ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]" id="quick-answer-title">Wer liefert typischerweise welche ESG-Daten?</h2><p className="mt-6 max-w-sm leading-7 text-white/62">Die genaue Organisation ist in jedem Unternehmen anders. Diese Zuordnung ist eine praktische Orientierung für ein typisches produzierendes KMU.</p></div>
                <div className="grid gap-x-7 gap-y-8 sm:grid-cols-2">{quickDepartments.map(([title, items], index) => <section className="border-t border-white/20 pt-4" key={title}><p className="font-mono text-xs text-orange">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 font-bold text-white">{title}</h3><ul className="mt-3 grid gap-1.5 text-sm leading-6 text-white/62">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>
              </div>
              <div className="mt-14 border-t border-white/15 pt-9"><p className="font-display max-w-5xl text-[clamp(2.1rem,5vw,4.2rem)] leading-none">Eine Person koordiniert.<br />Die Fachbereiche liefern die Quellen.<br />Verantwortliche Personen bestätigen die Aussagen.</p></div>
            </div>
          </section>

          <div className="site-shell grid items-start gap-12 py-10 lg:grid-cols-[15rem_minmax(0,55rem)] lg:justify-center lg:gap-16 lg:py-16">
            <aside className="hidden lg:block"><nav aria-label="Inhalt des Leitfadens" className="sticky top-28 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[rgba(255,255,255,0.72)] p-5 backdrop-blur"><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Im Leitfaden</p><ol className="mt-5 grid gap-3 text-sm font-semibold leading-5 text-[rgba(21,21,21,0.62)]">{[
              ["01", "ESG ist verteilt", "#esg-cross-functional"],
              ["03", "Data Owner Map", "#data-owner-map"],
              ["15", "Owner-Rollen", "#owner-rollen"],
              ["20", "Request Map", "#request-map"],
              ["23", "Traceability", "#traceability"],
              ["29", "60 Minuten", "#erste-60-minuten"],
              ["FAQ", "Häufige Fragen", "#faq"]
            ].map(([number, label, href]) => <li key={href}><a className="flex gap-3 hover:text-orange" href={href}><span className="font-mono text-[0.65rem] text-orange">{number}</span><span>{label}</span></a></li>)}</ol></nav></aside>
            <div className="min-w-0">
              <ArticleSection id="esg-cross-functional" number="01" title="ESG ist kein einzelnes Fachgebiet.">
                <p>Ein Nachhaltigkeitsfragebogen kann gleichzeitig Fragen zu Umwelt, Menschenrechten, Arbeitssicherheit, Unternehmensethik, Beschaffung, Lieferantenmanagement, Emissionen und Zertifizierungen enthalten. Nicht jeder Fragebogen enthält jedes dieser Themen.</p>
                <p>Der <ExternalSourceLink href={BMW_SAQ_URL}>BMW Group Supplier Sustainability Questionnaire</ExternalSourceLink> ist ein reales Beispiel für diese thematische Breite. Auch der <ExternalSourceLink href={EFRAG_STANDARD_URL}>2026 Voluntary Standard im EFRAG Knowledge Hub</ExternalSourceLink> verbindet unter anderem Energie, Treibhausgasemissionen, Wasser, Abfall, Workforce, Arbeitsunfälle, Vergütung und Weiterbildung in einem Reporting-System.</p>
                <Principle>ESG-Koordination kann zentral sein. ESG-Daten sind es meistens nicht.</Principle>
              </ArticleSection>

              <ArticleSection id="fragebogen-strukturieren" number="02" title="Zuerst den Fragebogen strukturieren – dann Aufgaben verteilen.">
                <p>Ein häufiger Fehler ist, den kompletten Excel-Fragebogen an HR, Finance, Qualität, Einkauf und Geschäftsführung weiterzuleiten – verbunden mit der Bitte, „die eigenen Fragen“ zu beantworten.</p>
                <p>Das führt häufig zu mehreren Dateiversionen, widersprüchlichen Antworten, doppelter Arbeit, fehlenden Quellen und unklarer Verantwortung.</p>
                <ol className="my-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)]">{["Fragen zuerst zentral analysieren.", "Jede Frage einem Thema zuordnen.", "Data Owner identifizieren.", "Nur die tatsächlich benötigte Information anfordern.", "Quelle beziehungsweise Nachweis mit anfordern."].map((step, index) => <li className="grid grid-cols-[3rem_1fr] gap-4 bg-white p-5" key={step}><span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span><span className="font-semibold leading-6 text-ink">{step}</span></li>)}</ol>
                <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Zu allgemein</p><p className="font-display mt-4 text-2xl">„Bitte ESG-Fragebogen ausfüllen.“</p></article><article className="rounded-[1rem] border border-[rgba(254,112,1,0.25)] bg-[var(--soft-orange)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Gezielte Anfrage</p><p className="font-display mt-4 text-2xl">„Wir benötigen für Werk A den Stromverbrauch 2025 in kWh sowie die zugrunde liegende Jahresabrechnung.“</p></article></div>
                <p>Wenn zunächst unklar ist, welche Informationen überhaupt gefragt sein können, bietet der Leitfaden <Link href="/de/ressourcen/welche-esg-daten-kunden-lieferanten">Welche ESG-Daten verlangen Kunden von Lieferanten?</Link> eine Orientierung. Den Gesamtprozess nach Eingang einer Anfrage erklärt anschließend <Link href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">ESG-Fragebogen vom Kunden erhalten – was jetzt?</Link></p>
              </ArticleSection>

              <ArticleSection id="data-owner-map" number="03" title="Eine praktische ESG Data Owner Map.">
                <ResponsiveMap caption="Praktische ESG Data Owner Map" headers={["Themenbereich", "Typischer Data Owner", "Typische Informationen", "Typische Quelle"]} marker="data-owner-map" rows={dataOwnerRows} />
                <p>Diese Tabelle ist keine universelle Organisationsvorgabe. In einem Unternehmen kann Energie bei Controlling liegen, im nächsten bei Facility und im dritten beim Energiemanager.</p>
                <Principle>Entscheidend ist die Quelle – nicht der Abteilungsname.</Principle>
              </ArticleSection>

              <ArticleSection id="geschaeftsfuehrung" number="04" title="Geschäftsführung: Aussagen, die nicht einfach aus Excel kommen.">
                <p>Bestimmte Fragen lassen sich nicht ausschließlich aus einem System exportieren: Wer trägt Verantwortung für Nachhaltigkeit? Gibt es definierte Umweltziele? Welche Unternehmensrichtlinien gelten? Welche Governance-Strukturen bestehen?</p>
                <p>Hier ist häufig eine Bestätigung durch Geschäftsführung, Management oder eine entsprechend autorisierte Person notwendig.</p>
                <div className="my-8 rounded-[1rem] border-l-4 border-orange bg-white p-6 shadow-lift"><p className="font-bold text-ink">Policies benötigen Freigabe</p><p className="mt-4 leading-7 text-muted">Eine externe Person sollte nicht selbst entscheiden, dass das Unternehmen eine Human Rights Policy besitzt. Die Policy muss tatsächlich existieren und ordnungsgemäß verabschiedet sein.</p></div>
              </ArticleSection>

              <ArticleSection id="finance-controlling" number="05" title="Finance und Controlling: Hier beginnt ein großer Teil der Umwelt-Datensammlung.">
                <p>Viele Umweltinformationen wirken technisch. Die Ausgangsdaten liegen trotzdem häufig in der Buchhaltung: Strom- und Gasrechnungen, Fernwärme, Heizöllieferungen sowie teilweise Tankkartenabrechnungen.</p>
                <div className="my-8 grid gap-4 sm:grid-cols-2">{[
                  ["Strom", "Jahres- oder Monatsabrechnungen und Verbrauch in kWh"],
                  ["Erdgas", "kWh, m³ und Rechnungszeitraum"],
                  ["Fernwärme", "MWh oder kWh und Rechnungen"],
                  ["Heizöl / Fuhrpark", "Liefermengen, Liter, Tankkarten und Ausgaben"]
                ].map(([title, body]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5" key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></article>)}</div>
                <p>Finance besitzt häufig Originalbelege, muss aber nicht automatisch die finale ESG-Kennzahl berechnen. Aus 420.000 kWh Erdgas wird erst mit Einheit, Bilanzgrenze, Emissionsfaktor, Faktorquelle und Berechnung eine Scope-1-Kennzahl.</p>
                <Principle>Data Owner und Calculation Owner können unterschiedliche Personen sein.</Principle>
              </ArticleSection>

              <ArticleSection id="hr-workforce" number="06" title="HR: Workforce-Daten sind mehr als nur die Mitarbeiterzahl.">
                <p>ESG-Fragebögen fragen häufig nach Mitarbeiterzahl, Headcount, FTE, Geschlecht, Vertragsarten, Trainings, Arbeitssicherheit, Tarifbindung, Fluktuation oder weiteren Workforce-Kennzahlen. Auch der aktuelle Voluntary Standard enthält mehrere solcher Datenpunkte.</p>
                <p>Vor einer internen Anfrage sollte deshalb klar sein:</p>
                <BulletList items={["Welche Definition: Headcount oder FTE?", "Welcher Zeitpunkt: Jahresende, Durchschnitt oder anderer Stichtag?", "Welcher Scope: Gesellschaft, Standorte oder Konzern?", "Welche Vertragsarten beziehungsweise Workforce-Kategorien sind gefragt?"]} />
                <Principle>Eine Zahl wie „184 Mitarbeitende“ ist ohne Scope und Definition weniger eindeutig, als sie aussieht.</Principle>
              </ArticleSection>

              <ArticleSection id="health-safety" number="07" title="Arbeitssicherheit kann zwischen HR, HSE und Produktion liegen.">
                <p>Je nach Unternehmensstruktur liegen Health-&amp;-Safety-Daten bei HR, HSE, Qualitätsmanagement, Operations oder einer externen Arbeitssicherheitsfachkraft.</p>
                <BulletList items={["Arbeitsunfälle und Unfallraten", "Schulungen und Sicherheitsprozesse", "Gefährdungsbeurteilungen", "Arbeitsschutzmanagementsystem und ISO 45001"]} />
                <p>Die Person, die eine Policy besitzt, besitzt nicht automatisch die Unfallstatistik. Ein Policy-Dokument kann bei Quality liegen, Unfallzahlen bei HR und Trainingsunterlagen bei Operations.</p>
              </ArticleSection>

              <ArticleSection id="qualitaet-umwelt" number="08" title="Qualität / Umweltmanagement: Häufig die wichtigste Dokumentenquelle.">
                <p>In vielen Produktionsunternehmen liegen hier bereits ISO 14001, ISO 45001, ISO 50001, weitere Zertifizierungen, Auditberichte, Managementsystem-Dokumentation, Umweltprozesse, Policies und Maßnahmenpläne.</p>
                <Principle>Prüfen Sie zuerst die bestehende operative Dokumentation, bevor ESG ein paralleles Dokumentenuniversum aufbaut.</Principle>
                <p>Die beste Quelle ist häufig das Dokument, das das Unternehmen ohnehin operativ verwendet – nicht eine zweite ESG-Version desselben Dokuments.</p>
              </ArticleSection>

              <ArticleSection id="facility-technik" number="09" title="Facility und Technik: Hier liegen Daten, die auf Rechnungen oft fehlen.">
                <div className="my-8 grid gap-4 sm:grid-cols-[0.85fr_auto_1.15fr] sm:items-center"><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Finance sieht</p><p className="font-display mt-4 text-3xl">Klimaanlagen-Service: 1.420 €</p></article><span aria-hidden="true" className="hidden font-display text-4xl text-orange sm:block">+</span><article className="rounded-[1rem] border border-[rgba(254,112,1,0.25)] bg-[var(--soft-orange)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Technik dokumentiert</p><p className="font-display mt-4 text-3xl">R410A – 2,3 kg nachgefüllt</p></article></div>
                <p>Die technische Information liegt eher bei Facility, Instandhaltung, technischem Service oder einem externen Wartungsunternehmen. Dasselbe gilt für Zählerstände, Kälteanlagen, Wärmepumpen, Generatoren, Heiztechnik, eigene Energieanlagen und Wasserzähler.</p>
                <Principle>Kaufmännische Quelle + technische Quelle.</Principle>
              </ArticleSection>

              <ArticleSection id="operations-produktion" number="10" title="Produktion / Operations: Unternehmensrealität statt nur Dokumentation.">
                <p>Bestimmte Informationen können nur Personen liefern, die den tatsächlichen Betrieb kennen: welche Anlagen genutzt werden, wo Brennstoffe eingesetzt werden, welche Prozesse Materialien verbrauchen, welche Abfälle entstehen und wie Umweltmaßnahmen tatsächlich funktionieren.</p>
                <p>Eine Policy kann sagen: „Wir reduzieren Produktionsabfälle.“ Operations kann beantworten: Wie? Und welche Daten zeigen das?</p>
                <Principle>Policy → tatsächliche Maßnahme → messbare Information</Principle>
              </ArticleSection>

              <ArticleSection id="fuhrpark" number="11" title="Fuhrpark: Kraftstoffdaten nicht aus Kosten schätzen, wenn Liter verfügbar sind.">
                <p>Wenn Scope 1 gefragt wird, kann der eigene beziehungsweise kontrollierte Fuhrpark relevant sein. Typische Quellen sind Tankkartenanbieter, Flottenmanagement, Finance und die fuhrparkverantwortliche Person.</p>
                <div className="my-8 rounded-[1rem] bg-[rgba(21,21,21,0.05)] p-7"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Bevorzugte Ausgangsbasis</p><p className="font-display mt-4 text-4xl">12.480 Liter Diesel</p><p className="mt-4 text-muted">statt nur 19.700 € Tankkosten, wenn physische Mengen verfügbar sind.</p></div>
                <p>Für Emissionsberechnungen sind physische Aktivitätsdaten normalerweise die bessere Ausgangsbasis. Das schließt andere methodisch begründete Ansätze bei tatsächlich fehlenden Mengeninformationen nicht pauschal aus. Vertiefend: <Link href="/de/ressourcen/scope-1-2-daten-berechnung">Scope 1 und Scope 2: Welche Daten braucht man?</Link> und <Link href="/de/scope-1-2-berechnung">Scope 1 und Scope 2 berechnen</Link>.</p>
              </ArticleSection>

              <ArticleSection id="einkauf" number="12" title="Einkauf: Besonders wichtig für Supplier- und Materialfragen.">
                <p>Procurement besitzt oft Informationen über Lieferantenstruktur, Supplier Code of Conduct, Lieferantenbewertungen, nachhaltige Beschaffungsprozesse, Rohstoffe, Materiallieferanten, bestimmte Herkunftsinformationen und Lieferanten-Zertifikate.</p>
                <p>Wenn ein Supplier Code neu vorbereitet oder aktualisiert wird, hilft der Leitfaden <Link href="/de/ressourcen/supplier-code-of-conduct-erstellen">Supplier Code of Conduct strukturiert erstellen</Link>, Erwartungen, Geltungsbereich, Freigabe und Anwendung nicht mit Lieferanten-Compliance zu verwechseln.</p>
                <p>Der <ExternalSourceLink href={BMOE_QUESTIONNAIRE_URL}>BMÖ Lieferanten-Nachhaltigkeitsfragebogen</ExternalSourceLink> beschreibt bei seiner Entwicklung ausdrücklich die Einbindung interner Fachleute unter anderem aus Nachhaltigkeit und Einkauf.</p>
                <p>Das macht Procurement zu einer wichtigen Schnittstelle, aber nicht automatisch zum Owner jeder ESG-Information in der Lieferkette.</p>
              </ArticleSection>

              <ArticleSection id="produkt-engineering" number="13" title="Produkt- und Materialdaten brauchen oft Engineering, Einkauf und Produktion gemeinsam.">
                <p>Manche Kunden fragen nach Produktmaterialien, Aluminiumanteilen, Recyclinganteilen, Herkunft, Bauteilgewicht oder produktspezifischen Emissionsinformationen. Dann reichen Corporate ESG-Daten nicht mehr.</p>
                <div className="my-8 grid gap-4 sm:grid-cols-2">{[
                  ["Engineering", "BOM, technische Zeichnungen und Produktspezifikationen"],
                  ["Einkauf", "Materiallieferanten, Einkaufsmengen und Materialdeklarationen"],
                  ["Produktion", "tatsächlicher Materialeinsatz, Ausschuss und Prozessdaten"],
                  ["Qualität", "Materialzertifikate und Prüfunterlagen"]
                ].map(([title, body]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] p-5" key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></article>)}</div>
                <Principle>Unternehmensdaten und Produktdaten sind zwei unterschiedliche Ebenen.</Principle>
              </ArticleSection>

              <ArticleSection id="compliance-legal" number="14" title="Compliance / Legal: Bei Governance-Aussagen nicht raten.">
                <p>Typische Themen sind Antikorruption, Code of Conduct, Whistleblowing, Compliance-Prozesse, Menschenrechte, bestätigte Verstöße sowie gegebenenfalls bestimmte Geldbußen oder Verfahren.</p>
                <p>Diese Angaben können sensibel sein. Eine koordinierende Person sollte aus einer alten Präsentation deshalb nicht einfach „Keine Vorfälle“ ableiten. Je nach Organisation sollte Compliance, Legal oder Geschäftsführung die Aussage bestätigen.</p>
                <Principle>Keine bekannte Information ist nicht automatisch dasselbe wie ein bestätigter Nullwert.</Principle>
              </ArticleSection>

              <ArticleSection id="owner-rollen" number="15" title="Wer ist eigentlich der „Owner“ eines ESG-Datenpunkts?">
                <p>Ein Datenpunkt kann vier verschiedene Rollen haben. Eine Person kann mehrere davon übernehmen, aber die Rollen sind nicht automatisch identisch.</p>
                <div className="my-8 grid gap-4 sm:grid-cols-2">{[
                  ["1 — Source Owner", "Besitzt die Originalinformation. Beispiel: Finance besitzt die Stromrechnung."],
                  ["2 — Calculation Owner", "Berechnet aus Quellen eine Kennzahl. Beispiel: Scope-2-Emissionen."],
                  ["3 — Statement Owner", "Kann die fachliche Richtigkeit einer Aussage bestätigen. Beispiel: HSE bestätigt den Arbeitssicherheitsprozess."],
                  ["4 — Approver", "Darf eine formelle Aussage oder Policy freigeben. Beispiel: Geschäftsführung verabschiedet eine Environmental Policy."]
                ].map(([title, body]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}><h3 className="font-display text-2xl text-ink">{title}</h3><p className="mt-4 text-sm leading-6 text-muted">{body}</p></article>)}</div>
              </ArticleSection>

              <ArticleSection id="scope-2-owner" number="16" title="Beispiel: Eine einzige Scope-2-Zahl kann mehrere Owner haben.">
                <p>Der Kunde fragt: „Wie hoch waren Ihre Scope-2-Emissionen 2025?“ Die Datenkette kann mehrere Stellen verbinden.</p>
                <div className="my-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)]">{[
                  ["Finance", "842.000 kWh und die Stromrechnung"],
                  ["Einkauf", "gegebenenfalls Stromvertrag, Tarif und Beschaffungsinformationen"],
                  ["Facility", "Standorte, Zähler und technische Abgrenzung"],
                  ["Calculation Owner", "Methode, Emissionsfaktor, Faktorquelle und Ergebnis"],
                  ["Koordination / Management", "Scope, Berichtszeitraum und Konsistenz zur Kundenanfrage"]
                ].map(([owner, contribution]) => <article className="grid gap-2 bg-white p-5 sm:grid-cols-[10rem_1fr]" key={owner}><h3 className="font-bold text-ink">{owner}</h3><p className="text-sm leading-6 text-muted">{contribution}</p></article>)}</div>
                <Principle>„Scope 2 gehört Finance“ ist zu grob. Finance besitzt vielleicht nur einen wichtigen Teil der Datenkette.</Principle>
              </ArticleSection>

              <ArticleSection id="policy-owner" number="17" title="Beispiel: Eine Policy braucht andere Rollen.">
                <p>Der Kunde fragt, ob eine Environmental Policy existiert. Quality oder Environment kann das Dokument finden, Operations kann die reale Umsetzung beschriebener Praktiken bestätigen und Management kann die formelle Verabschiedung bestätigen.</p>
                <p>Existiert die Praxis, aber noch keine formelle Policy, kann ein Entwurf vorbereitet werden. Gültig wird die Richtlinie erst durch:</p>
                <Principle>Review → Korrektur → autorisierte Verabschiedung</Principle>
                <p>Ein externer Anbieter sollte weder Praxis erfinden noch eine Kunden-Policy selbst freigeben oder rückdatieren.</p>
              </ArticleSection>

              <ArticleSection id="gezielte-anfragen" number="18" title="Geben Sie Fachbereichen kleine Datenanfragen – nicht den ganzen Fragebogen.">
                <p>Statt HR die Seiten 18 bis 29 eines Kundenfragebogens interpretieren zu lassen, kann eine gezielte Anfrage so aussehen:</p>
                <div className="my-8 rounded-[1rem] border border-[rgba(254,112,1,0.24)] bg-[var(--soft-orange)] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Anfrage an HR</p><BulletList items={["Headcount zum 31.12.2025", "FTE zum 31.12.2025", "Anteil permanent / temporary", "Trainingsstunden im Jahr 2025", "Scope: Beispiel GmbH Deutschland", "Quelle beziehungsweise HR-Auswertung beilegen"]} /></div>
                <p>HR muss so die Kundenlogik nicht selbst interpretieren, die Koordination behält die Kontrolle über die finale Antwort und die Originalquelle bleibt erhalten.</p>
              </ArticleSection>

              <ArticleSection id="fuenf-anfragefelder" number="19" title="Eine interne Anfrage sollte fünf Dinge enthalten.">
                <ol className="my-8 grid gap-4 sm:grid-cols-2">{[
                  ["1 — Was brauchen wir?", "Den exakten Datenpunkt."],
                  ["2 — Für wen?", "Die Gesellschaft beziehungsweise den Standort."],
                  ["3 — Für welchen Zeitraum?", "Die Berichtsperiode oder den Stichtag."],
                  ["4 — In welcher Einheit oder Definition?", "Zum Beispiel kWh, Liter, FTE, Stunden oder Tonnen."],
                  ["5 — Welche Quelle oder welcher Nachweis?", "Zum Beispiel Rechnung, ERP-Auswertung, Policy oder Zertifikat."]
                ].map(([title, body], index) => <li className={"rounded-[1rem] border border-[rgba(21,21,21,0.11)] p-5 " + (index === 4 ? "sm:col-span-2" : "")} key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></li>)}</ol>
                <Principle>So wird aus „Der Kunde will ESG-Daten“ eine beherrschbare interne Aufgabe.</Principle>
              </ArticleSection>

              <ArticleSection id="request-map" number="20" title="So kann eine interne ESG Request Map aussehen.">
                <ResponsiveMap caption="Beispiel einer internen ESG Request Map" headers={["Kundenfrage", "Benötigter Datenpunkt", "Source Owner", "Bestätigung", "Nachweis", "Status"]} marker="request-map" rows={requestMapRows} statusColumn={5} />
                <p className="mt-8">Empfohlene Statuswerte:</p>
                <div className="mt-4 flex flex-wrap gap-2">{["bereit", "beschaffen", "berechnen", "bestätigen", "prüfen", "Gap", "nicht anwendbar"].map((status) => <StatusPill key={status} status={status} />)}</div>
              </ArticleSection>

              <ArticleSection id="status-taxonomie" number="21" title="„Nicht vorhanden“ ist nicht dasselbe wie „noch nicht gefunden“.">
                <div className="my-8 grid gap-4">{[
                  ["Noch nicht beschafft", "Niemand hat die vorhandene Stromrechnung geschickt."],
                  ["Zu berechnen", "Die Stromrechnung existiert, Scope 2 wurde aber noch nie berechnet."],
                  ["Zu bestätigen", "Die Policy existiert, ihre Freigabe ist jedoch unklar."],
                  ["Dokumentations-Gap", "Die Unternehmenspraxis existiert, wurde aber nie formal dokumentiert."],
                  ["Realer Gap", "Die zugrunde liegende Praxis existiert tatsächlich nicht."]
                ].map(([status, meaning]) => <article className="grid gap-2 border-t border-[rgba(21,21,21,0.12)] pt-5 sm:grid-cols-[11rem_1fr]" key={status}><h3 className="font-bold text-ink">{status}</h3><p className="text-sm leading-6 text-muted">{meaning}</p></article>)}</div>
                <Principle>Nicht gesammelt, zu berechnen, zu bestätigen, Dokumentations-Gap und realer Gap sind fünf verschiedene Situationen.</Principle>
              </ArticleSection>

              <ArticleSection id="widerspruechliche-zahlen" number="22" title="Was tun, wenn zwei Abteilungen unterschiedliche Zahlen liefern?">
                <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Finance</p><p className="font-display mt-4 text-3xl">810.000 kWh</p></article><article className="rounded-[1rem] border border-[rgba(254,112,1,0.25)] bg-[var(--soft-orange)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Facility</p><p className="font-display mt-4 text-3xl">846.000 kWh</p></article></div>
                <p>Nicht mitteln und nicht die günstigere Zahl auswählen. Vergleichen Sie Scope, Zeitraum, Quelle, Einheit und Abgrenzung. Sind dieselben Standorte enthalten? Kalender- oder Abrechnungsjahr? Rechnung oder Zähler? Ist Eigenstrom enthalten oder ein Mieter herausgerechnet?</p>
                <Principle>Konsistenz entsteht durch Source Reconciliation – nicht durch Auswahl der schöneren Zahl.</Principle>
              </ArticleSection>

              <ArticleSection id="traceability" number="23" title="Jede Zahl sollte eine Herkunft haben.">
                <p>Für einen belastbaren ESG-Prozess sollte die Datenkette nachvollziehbar bleiben:</p>
                <Principle label="Traceability Chain">Kundenfrage → Datenpunkt → Source Owner → Originalquelle → Berechnung / Aussage → Review → finale Antwort</Principle>
                <p>Quantitative Daten sollten zusätzlich Einheit, Zeitraum, Faktor, Faktorversion und Annahmen behalten. Bei Policies sind Version, Scope, Freigabe und Gültigkeit relevant.</p>
                <p>Diese Struktur bildet ein Evidence Register: Die finale Zahl bleibt mit der zugrunde liegenden Quelle verbunden. Vertiefend erklärt unser Leitfaden, welche <Link href="/de/ressourcen/esg-nachweise-lieferanten">ESG-Nachweise für Lieferanten</Link> tatsächlich zu einer Aussage passen. Wenn ein konkretes Dokument vorliegt, hilft die <Link href="/de/ressourcen/esg-nachweise-checkliste">ESG-Nachweise-Checkliste</Link> bei Aussage, Scope, Zeitraum und Quelle. Die Grundsätze unserer Prüfung finden Sie unter <Link href="/de/methodology">Unsere Methodik</Link>.</p>
              </ArticleSection>

              <ArticleSection id="plattform-koordination" number="24" title="EcoVadis und IntegrityNext machen interne Koordination nicht überflüssig.">
                <p>Plattformzugang löst nicht automatisch das Data-Ownership-Problem. <ExternalSourceLink href={INTEGRITYNEXT_COLLEAGUE_URL}>IntegrityNext beschreibt im eigenen Help Center</ExternalSourceLink>, wie Kollegen aus unterschiedlichen Abteilungen zum Supplier Profile eingeladen werden können, um Assessments zu prüfen, zu bearbeiten und zu aktualisieren.</p>
                <p>Das bestätigt einen einfachen Punkt: Plattformzugang ersetzt keine interne Zuständigkeit. Ein Fragebogen kann zentral koordiniert werden, HR-, Umwelt- und Procurement-Daten benötigen aber weiterhin ihre fachlichen Quellen.</p>
                <p className="text-sm text-muted">evipace ist unabhängig von IntegrityNext und EcoVadis und weder deren offizieller Partner noch deren Validierungsstelle.</p>
              </ArticleSection>

              <ArticleSection id="vsme-wiederverwendung" number="25" title="VSME zeigt, warum eine wiederverwendbare Data Owner Map sinnvoll ist.">
                <p>Der aktuelle Voluntary Standard umfasst unter anderem Unternehmensinformationen, Energie, Emissionen, Wasser, Abfall, Materialien, Workforce, Arbeitssicherheit und Training.</p>
                <p>Wenn intern bereits klar ist, dass B3 Energie beispielsweise bei Finance und Facility, B8 Workforce bei HR und B9 Arbeitssicherheit bei HSE beginnt, kann dieselbe Struktur auch Kundenanfragen unterstützen.</p>
                <p>Weiterlesen: <Link href="/de/ressourcen/vsme-daten-nachhaltigkeitsbericht">VSME: Welche Daten braucht ein Nachhaltigkeitsbericht?</Link></p>
              </ArticleSection>

              <ArticleSection id="data-owner-wiederverwenden" number="26" title="Der eigentliche Hebel: Data Owner einmal definieren, mehrfach nutzen.">
                <p>Ein Kunde fragt nach dem Stromverbrauch 2025. Ein weiterer Kunde fragt später nach „Total electricity consumption“. EcoVadis fragt nach Energiedaten und VSME benötigt B3. Die Formulierungen ändern sich, die interne Quelle häufig nicht.</p>
                <div className="my-8 flex items-start gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><FileCheck2 aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-orange" /><div><p className="text-sm font-bold uppercase tracking-[0.1em] text-orange">Wiederverwendbare Struktur</p><p className="font-display mt-3 text-3xl leading-tight text-ink">ESG-Datenpunkt → Owner → Quelle → Zeitraum → Nachweis → letzte Prüfung</p></div></div>
                <p>Dann muss beim nächsten Fragebogen nicht das Unternehmen erneut durchsucht werden. Nur die neue Kundenformulierung wird mit der vorhandenen Datenbasis verbunden. Wie daraus eine <Link href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">wiederverwendbare ESG-Datengrundlage</Link> entsteht, erklärt der Reuse-Leitfaden.</p>
                <p>Sind die Verantwortlichen zugeordnet, führt die vollständige <Link href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten">ESG-Fragebogen-Checkliste</Link> durch Datensammlung, Evidence Review und Einreichung.</p>
              </ArticleSection>

              <ArticleSection id="esg-manager" number="27" title="Braucht jedes Unternehmen einen ESG Manager?">
                <p>Nein. Gerade kleinere und mittlere Produktionsunternehmen können ESG-Anfragen auch ohne eigene Sustainability-Abteilung strukturieren.</p>
                <div className="my-8 grid gap-4 sm:grid-cols-3">{[
                  ["Zentrale Koordination", "Zum Beispiel Qualität, Operations, Finance, Geschäftsführung oder ESG-Koordination."],
                  ["Fachliche Data Owner", "Zum Beispiel HR, Einkauf, Facility und Finance."],
                  ["Management Approval", "Dort, wo formelle Aussagen oder Policies eine autorisierte Freigabe benötigen."]
                ].map(([title, body]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] p-5" key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></article>)}</div>
                <Principle>Entscheidend ist weniger „Haben wir einen ESG Manager?“ als „Wissen wir, wer welche Information besitzt?“</Principle>
              </ArticleSection>

              <ArticleSection id="finaler-review" number="28" title="Wer sollte die finale Antwort an den Kunden kontrollieren?">
                <p>Am Ende sollte eine zentrale Person beziehungsweise ein zentraler Prozess den gesamten Fragebogen prüfen.</p>
                <div className="my-8 grid gap-4 sm:grid-cols-2">{[
                  ["Scope", "Antworten wir für die richtige Gesellschaft und die richtigen Standorte?"],
                  ["Zeitraum", "Sind alle Daten zeitlich konsistent?"],
                  ["Definitionen", "Headcount oder FTE? Welche Scope-2-Methode ist relevant?"],
                  ["Konsistenz", "Widersprechen sich verschiedene Antworten?"],
                  ["Evidence", "Unterstützt der Nachweis die konkrete Aussage?"],
                  ["Freigaben", "Sind Management-Aussagen intern bestätigt?"]
                ].map(([title, body]) => <article className="border-t border-[rgba(21,21,21,0.13)] pt-5" key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></article>)}</div>
                <p>So landet kein technisch korrektes Einzelstück in einem insgesamt inkonsistenten Fragebogen.</p>
              </ArticleSection>

              <ArticleSection id="erste-60-minuten" number="29" title="Die ersten 60 Minuten nach einer neuen Kundenanfrage.">
                <p>Beginnen Sie noch nicht mit langen Antworttexten. Organisieren Sie zuerst die Datenbasis.</p>
                <ol className="my-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)]">{[
                  ["Minute 0–10", "Kunde, Deadline, Gesellschaft, Standorte, Zeitraum und Format prüfen."],
                  ["Minute 10–25", "Fragen nach Unternehmensdaten, Umwelt, Workforce, Governance, Supply Chain und Produkt gruppieren."],
                  ["Minute 25–40", "Data Owner zuweisen."],
                  ["Minute 40–50", "Status setzen: vorhanden, beschaffen, berechnen, bestätigen oder Gap."],
                  ["Minute 50–60", "Gezielte interne Datenanfragen versenden."]
                ].map(([time, task]) => <li className="grid gap-2 bg-white p-5 sm:grid-cols-[9rem_1fr]" key={time}><span className="font-mono text-xs font-bold text-orange">{time}</span><span className="font-semibold leading-6 text-ink">{task}</span></li>)}</ol>
              </ArticleSection>

              <ArticleSection id="typische-fehler" number="30" title="Die häufigsten Fehler bei interner ESG-Datensammlung.">
                <div className="my-8 rounded-[1rem] bg-ink p-6 text-white sm:p-8"><CircleAlert aria-hidden="true" className="h-8 w-8 text-orange" /><div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">{[
                  ["Den gesamten Fragebogen an alle schicken", "Erzeugt Chaos statt Zusammenarbeit."],
                  ["Koordinator und Data Owner verwechseln", "Koordination bedeutet nicht, alle Zahlen selbst zu besitzen."],
                  ["Zahlen ohne Zeitraum anfordern", "„Stromverbrauch?“ ist keine ausreichend präzise Anfrage."],
                  ["Nur Endwerte speichern", "Die Originalquelle geht verloren."],
                  ["Fachbereiche die Kundenfrage interpretieren lassen", "Besser eine klar definierte Datenanfrage senden."],
                  ["Managementaussagen nicht bestätigen lassen", "Besonders bei Policies und Governance."],
                  ["Gesellschaften vermischen", "Group, Entity und Site sind nicht automatisch derselbe Scope."],
                  ["Jede Anfrage von vorne beginnen", "Der Data Owner bleibt häufig derselbe, auch wenn der nächste Kunde anders fragt."]
                ].map(([title, body], index) => <article className="border-t border-white/18 pt-4" key={title}><p className="font-mono text-xs text-orange">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/62">{body}</p></article>)}</div></div>
              </ArticleSection>

              <ArticleSection id="externe-unterstuetzung" number="31" title="Wann externe Unterstützung sinnvoll wird.">
                <p>Ein kurzer ESG-Fragebogen mit fünf bekannten Kennzahlen braucht normalerweise kein großes Projekt.</p>
                <p>Unterstützung wird interessanter, wenn:</p>
                <BulletList items={["mehrere Fachbereiche oder Standorte beteiligt sind", "niemand die Anfrage zentral strukturiert", "Scope 1 und Scope 2 berechnet werden müssen", "Nachweise zugeordnet oder Policies geprüft werden müssen", "widersprüchliche Daten existieren", "mehrere Kunden ähnliche Informationen verlangen", "aus der Anfrage eine wiederverwendbare ESG-Datenbasis entstehen soll"]} />
                <Principle>Kundenanforderung → Datenpunkt → Owner → Quelle → Berechnung → Evidence → Review → Antwort</Principle>
                <p>Wie evipace konkrete Kundenanforderungen unterstützt, zeigt die Seite <Link href="/de/esg-kundenanfragen">ESG-Anforderungen von Kunden</Link>.</p>
              </ArticleSection>

              <section aria-labelledby="article-cta-title" className="my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12">
                <ClipboardCheck aria-hidden="true" className="h-7 w-7 text-orange" />
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-orange">Ihr nächster Schritt</p>
                <h2 className="font-display mt-5 max-w-[17ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]" id="article-cta-title">Ihr Kunde verlangt ESG-Daten – aber intern ist unklar, wer was liefern soll?</h2>
                <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-white/68"><p>Senden Sie uns die Kundenanfrage oder den Fragebogen.</p><p>Wir strukturieren die benötigten Datenpunkte, ordnen vorhandene Quellen und Nachweise zu und machen sichtbar, welche Informationen aus Finance, HR, Einkauf, Qualität, Operations oder Management noch benötigt werden.</p></div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>ESG-Anfrage senden</ButtonLink><ButtonLink className="w-full sm:w-auto" href="/de/esg-kundenanfragen" variant="light">ESG-Anforderungen von Kunden</ButtonLink><Link className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/25 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-orange hover:text-orange sm:w-auto" href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">ESG-Fragebogen erhalten – was jetzt?</Link></div>
                <p className="mt-6 text-sm font-semibold text-white/50">Finance · HR · Einkauf · Qualität · Operations · Nachweise</p>
              </section>

              <section aria-labelledby="faq-title" className="scroll-mt-24 border-t border-[rgba(21,21,21,0.12)] py-16" id="faq">
                <p className="eyebrow">FAQ</p><h2 className="font-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-none" id="faq-title">Häufige Fragen zu internen ESG-Verantwortlichkeiten</h2>
                <div className="mt-9 grid gap-3">{faqItems.map(([question, answer]) => <details className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white px-5 py-5 sm:px-6" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold leading-6 text-ink marker:content-none">{question}<span aria-hidden="true" className="text-2xl font-light text-orange transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{answer}</p></details>)}</div>
              </section>

              <section aria-labelledby="sources-title" className="border-t border-[rgba(21,21,21,0.12)] pb-16 pt-12">
                <div className="flex items-center gap-3"><Link2 aria-hidden="true" className="h-4 w-4 text-orange" /><h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink" id="sources-title">Quellen &amp; weiterführende Informationen</h2></div>
                <ul className="mt-6 grid gap-6 text-sm leading-6 text-muted">
                  <li><ExternalSourceLink href={EFRAG_STANDARD_URL}>EFRAG Knowledge Hub — 2026 Voluntary Standard</ExternalSourceLink><p className="mt-1">Offizielle aktuelle Themen- und Datenpunktstruktur von Energie und Umwelt bis Workforce, Arbeitssicherheit und Training.</p></li>
                  <li><ExternalSourceLink href={INTEGRITYNEXT_COLLEAGUE_URL}>IntegrityNext Help Center — Invite / add a colleague</ExternalSourceLink><p className="mt-1">Offizielle Beschreibung der Zusammenarbeit mehrerer Kolleginnen und Kollegen in einem Supplier Profile.</p></li>
                  <li><ExternalSourceLink href={BMW_SAQ_URL}>BMW Group — Sustainability Assessment Questionnaire</ExternalSourceLink><p className="mt-1">Praxisbeispiel für die thematische Breite eines Lieferanten-Nachhaltigkeitsfragebogens.</p></li>
                  <li><ExternalSourceLink href={BMOE_QUESTIONNAIRE_URL}>BMÖ — Lieferanten-Nachhaltigkeitsfragebogen</ExternalSourceLink><p className="mt-1">Aktueller Kontext zur Standardisierung von Lieferantenfragen und zur Einbindung von Nachhaltigkeit und Einkauf.</p></li>
                </ul>
                <p className="mt-7 text-xs leading-6 text-[rgba(21,21,21,0.48)]">Die vorgeschlagene Data-Owner-Struktur ist praktische evipace-Orientierung und keine gesetzlich vorgeschriebene Organisationsform.</p>
              </section>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
