import type { ReactNode } from "react";
import {
  BarChart3,
  Building2,
  CircleAlert,
  ClipboardCheck,
  Droplets,
  ExternalLink,
  Factory,
  FileCheck2,
  Link2,
  Recycle,
  ShieldCheck,
  Target,
  Users,
  Zap
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";

const COMMISSION_STATUS_URL =
  "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/corporate-sustainability-reporting-directive_en";
const COMMISSION_NEWS_URL =
  "https://finance.ec.europa.eu/news/commission-adopts-revised-sustainability-reporting-standards-2026-07-03_en";
const EFRAG_STANDARD_URL =
  "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard";
const EUR_LEX_URL = "https://eur-lex.europa.eu/eli/dir/2026/470/oj";
const BMWE_DNK_URL =
  "https://www.bundeswirtschaftsministerium.de/Redaktion/DE/Dossier/PolitikfuerdenMittelstand/schwerpunkt-11.html";
const DNK_REPORTS_URL =
  "https://www.deutscher-nachhaltigkeitskodex.de/de/berichte-einsehen/vsme-berichte-einsehen/";
const DNK_VSME_URL =
  "https://www.deutscher-nachhaltigkeitskodex.de/de/berichtspflichten/voluntary-sustainability-standard-for-smes-vsme/";

const quickAreas = [
  ["01", "Unternehmens- und Berichtsdaten", "Gesellschaft, Zeitraum, Rechtsform, NACE-Code, Umsatz, Bilanzsumme, Mitarbeitende, Standorte und Zertifizierungen."],
  ["02", "Praktiken und Policies", "Welche Maßnahmen, Richtlinien, Initiativen und Ziele existieren tatsächlich?"],
  ["03", "Energie und Emissionen", "Strom, Brennstoffe, Scope 1 und location-based Scope 2."],
  ["04", "Weitere Umweltdaten", "Schadstoffe, Biodiversität, Wasser, Abfall, Recycling und relevante Materialströme."],
  ["05", "Mitarbeiterdaten", "Mitarbeiterzahl, Vertragsarten, Geschlecht, Länder und weitere Workforce-Kennzahlen."],
  ["06", "Arbeitssicherheit", "Arbeitsunfälle, Unfallrate und gegebenenfalls relevante Todesfälle."],
  ["07", "Vergütung und Weiterbildung", "Mindestlohn-Compliance, Tarifabdeckung und Trainingsstunden."],
  ["08", "Governance", "Relevante Verurteilungen oder Geldbußen wegen Korruption und Bestechung, falls vorhanden."],
  ["09", "Comprehensive Reporting", "Geschäftsmodell, Märkte, Klimaziele, Klimarisiken, zusätzliche Workforce- und Menschenrechtsdaten."]
] as const;

const certificationRows = [
  ["ISO 14001", "Beispiel GmbH", "Werk A", "2027", "vorhanden"],
  ["ISO 50001", "Beispiel GmbH", "Werk A + B", "2026", "vorhanden"]
] as const;

const wasteRows = [
  ["Metall", "24,2", "t", "Nein", "Recycling", "Entsorger"],
  ["Altöl", "1,3", "t", "Ja", "Behandlung", "Entsorger"],
  ["Karton", "8,6", "t", "Nein", "Recycling", "noch zuordnen"]
] as const;

const dataMapRows = [
  ["B1", "Umsatz", "Jahresabschluss", "Finance", "Abschluss", "bereit"],
  ["B1", "Mitarbeitende", "HR-System", "HR", "HR-Auswertung", "bereit"],
  ["B3", "Strom", "Energieabrechnung", "Finance", "Rechnungen", "bereit"],
  ["B3", "Scope 1", "Energie-/Fuel-Daten", "Operations", "Berechnung", "berechnen"],
  ["B6", "Wasser", "Wasserrechnung", "Facility", "Rechnung", "bereit"],
  ["B7", "gefährlicher Abfall", "Entsorger", "EHS", "Jahresreport", "prüfen"],
  ["B8", "Vertragsarten", "HR", "HR", "HR-Auswertung", "bereit"],
  ["B9", "Unfallrate", "H&S", "HSE", "Unfallregister", "berechnen"],
  ["B10", "Trainingsstunden", "HR", "HR", "Trainingsliste", "teilweise"],
  ["B11", "Korruptionsfälle", "GF/Compliance", "GF", "Bestätigung", "bestätigen"]
] as const;

const faqItems = [
  { question: "Welche Daten braucht man für einen VSME-Bericht?", answer: "Der Basic Module umfasst Unternehmensinformationen, Nachhaltigkeitspraktiken und Policies sowie Angaben zu Energie und Treibhausgasemissionen, Umwelt, Workforce, Arbeitssicherheit, Vergütung und Weiterbildung sowie bestimmten Governance-Themen. Welche Angaben tatsächlich benötigt werden, hängt zusätzlich von den if-applicable-Regeln und der Situation des Unternehmens ab." },
  { question: "Muss jedes Unternehmen den Comprehensive Module verwenden?", answer: "Nein. Der Comprehensive Module ergänzt den Basic Module insbesondere um Informationen, die für Banken, Investoren und Unternehmenskunden relevant sein können. Der Basic Module ist Voraussetzung für die Comprehensive-Ebene." },
  { question: "Brauche ich Scope 1 und Scope 2 für VSME?", answer: "Im 2026 Voluntary Standard enthält B3 Angaben zu Scope-1-Emissionen und location-based Scope-2-Emissionen in tCO₂e; für Unternehmen mit 10 Beschäftigten oder weniger sind diese Angaben ausdrücklich als freiwillig gekennzeichnet." },
  { question: "Brauche ich Scope 3?", answer: "Nicht automatisch als grundlegenden B3-Datenpunkt. Der Standard weist jedoch darauf hin, dass Scope 3 je nach Tätigkeit relevant sein kann und nennt Manufacturing als einen Bereich, in dem wesentliche Scope-3-Kategorien wahrscheinlich sein können." },
  { question: "Muss ich Daten melden, die für unser Unternehmen nicht zutreffen?", answer: "Bestimmte Disclosures unterliegen dem if-applicable-Prinzip. Sie werden nur angegeben, wenn die im jeweiligen Disclosure beschriebenen Umstände tatsächlich auf das Unternehmen zutreffen." },
  { question: "Braucht ein VSME-Bericht eine Prüfung oder Zertifizierung?", answer: "Der Voluntary Standard selbst ist ein Reporting Standard und macht aus dem Bericht nicht automatisch ein zertifiziertes oder assurance-geprüftes Dokument. Andere freiwillige Plattformen oder Programme können eigene Plausibilitätschecks oder Signets anbieten; das sollte davon getrennt betrachtet werden." },
  { question: "Muss der Bericht über den DNK erstellt werden?", answer: "Nein. In Deutschland bietet der DNK jedoch ein kostenloses digitales VSME-Tool an, das Unternehmen durch den Berichtsprozess führt." },
  { question: "Wie oft sollte ein VSME-Bericht aktualisiert werden?", answer: "Wenn der Bericht Informationsbedürfnisse großer Unternehmen oder Banken bedient, die jährlich aktualisierte Daten verlangen, sieht der Standard eine jährliche Erstellung vor. Wenn Finanzberichte erstellt werden, soll der Berichtszeitraum mit deren Zeitraum übereinstimmen. Ab dem zweiten Berichtsjahr werden grundsätzlich Vorjahresvergleichsinformationen vorgesehen." },
  { question: "Ist VSME 2026 schon in Kraft?", answer: "Die Kommission hat den neuen Voluntary Standard am 3. Juli 2026 angenommen. Nach dem offiziellen Stand vom 22. August 2026 ist der delegierte Rechtsakt jedoch noch nicht in Kraft, solange er nicht im Amtsblatt der Europäischen Union veröffentlicht wurde." },
  { question: "Kann Evipace garantieren, dass ein Kunde einen VSME-Bericht akzeptiert?", answer: "Nein. Evipace kann Daten, Berechnungen, Nachweise und Berichtsgrundlagen strukturiert vorbereiten. Welche Informationen ein konkreter Kunde, eine Bank oder eine andere Stelle akzeptiert beziehungsweise zusätzlich verlangt, liegt beim jeweiligen Empfänger und den anwendbaren Anforderungen." }
];

function ExternalSourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange" href={href} rel="noreferrer" target="_blank">{children}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0"/></a>;
}

function BulletList({ items }: { items: string[] }) {
  return <ul className="mt-6 grid gap-3">{items.map((item) => <li className="flex gap-3 leading-7 text-muted" key={item}><span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange"/><span>{item}</span></li>)}</ul>;
}

function ArticleSection({ children, id, number, title }: { children: ReactNode; id: string; number: string; title: string }) {
  return <section aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-[rgba(21,21,21,0.12)] py-14 sm:py-16" id={id}><div className="flex items-start gap-4 sm:gap-6"><span className="mt-1 font-mono text-xs font-bold tracking-[0.15em] text-orange">{number}</span><h2 className="font-display max-w-[21ch] text-[clamp(2.15rem,4.1vw,3.7rem)] leading-[1.02]" id={`${id}-title`}>{title}</h2></div><div className="resource-prose mt-8 sm:pl-[3.35rem]">{children}</div></section>;
}

function Principle({ label, children }: { label?: string; children: ReactNode }) {
  return <div className="my-8 rounded-[1.1rem] bg-ink p-7 text-white sm:p-8">{label ? <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">{label}</p> : null}<p className={`font-display text-[clamp(1.8rem,4vw,3.05rem)] leading-[1.1] ${label ? "mt-4" : ""}`}>{children}</p></div>;
}

function StatusPill({ status }: { status: string }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.06em] ${status === "bereit" ? "border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] text-[#b94f00]" : "border-[rgba(21,21,21,0.16)] bg-[rgba(21,21,21,0.05)] text-ink"}`}>{status}</span>;
}

function ResponsiveTable({ caption, headers, rows, marker }: { caption: string; headers: string[]; rows: readonly (readonly string[])[]; marker: string }) {
  return <div className="mt-8" data-table={marker}><div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block"><div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-sm"><caption className="sr-only">{caption}</caption><thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]"><tr>{headers.map((heading) => <th className="border-b border-[rgba(21,21,21,0.12)] px-4 py-4 font-bold" key={heading} scope="col">{heading}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0" key={`${row[0]}-${rowIndex}`}>{row.map((value, index) => index === 0 ? <th className="px-4 py-5 font-bold text-ink" key={`${value}-${index}`} scope="row">{value}</th> : <td className="px-4 py-5 text-muted" key={`${value}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div></div><div className="grid gap-4 md:hidden">{rows.map((row, rowIndex) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5" key={`${row[0]}-${rowIndex}`}><h3 className="border-b border-[rgba(21,21,21,0.1)] pb-4 font-bold text-ink">{row[0]}</h3><dl className="mt-4 grid gap-3 text-sm">{headers.slice(1).map((label, index) => <div className="grid grid-cols-[6.9rem_1fr] gap-3" key={label}><dt className="font-semibold text-[rgba(21,21,21,0.56)]">{label}</dt><dd className="min-w-0 break-words text-ink">{row[index + 1]}</dd></div>)}</dl></article>)}</div></div>;
}

function DataMapTable() {
  const headers = ["VSME", "Datenpunkt", "Interne Quelle", "Verantwortlich", "Nachweis", "Status"];
  return <div className="mt-8" data-vsme-data-map><div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block"><div className="overflow-x-auto"><table className="w-full min-w-[960px] border-collapse text-left text-sm"><caption className="sr-only">Beispiel einer praktischen VSME Data Map</caption><thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]"><tr>{headers.map((heading) => <th className="border-b border-[rgba(21,21,21,0.12)] px-4 py-4 font-bold" key={heading} scope="col">{heading}</th>)}</tr></thead><tbody>{dataMapRows.map((row, rowIndex) => <tr className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0" key={`${row[0]}-${row[1]}-${rowIndex}`}><th className="px-4 py-5 font-mono text-xs font-bold text-orange" scope="row">{row[0]}</th>{row.slice(1, 5).map((value, index) => <td className="px-4 py-5 text-muted" key={`${value}-${index}`}>{value}</td>)}<td className="px-4 py-5"><StatusPill status={row[5]}/></td></tr>)}</tbody></table></div></div><div className="grid gap-4 md:hidden">{dataMapRows.map((row, rowIndex) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5" key={`${row[0]}-${row[1]}-${rowIndex}`}><div className="flex items-start justify-between gap-3 border-b border-[rgba(21,21,21,0.1)] pb-4"><div><p className="font-mono text-xs font-bold text-orange">{row[0]}</p><h3 className="mt-2 font-bold text-ink">{row[1]}</h3></div><StatusPill status={row[5]}/></div><dl className="mt-4 grid gap-3 text-sm">{headers.slice(2, 5).map((label, index) => <div className="grid grid-cols-[6.9rem_1fr] gap-3" key={label}><dt className="font-semibold text-[rgba(21,21,21,0.56)]">{label}</dt><dd className="min-w-0 break-words text-ink">{row[index + 2]}</dd></div>)}</dl></article>)}</div></div>;
}

function DataArtwork() {
  return <div aria-hidden="true" className="resource-hero-art"><svg className="resource-hero-art__sheet" fill="none" viewBox="0 0 520 650" xmlns="http://www.w3.org/2000/svg"><path d="M68 66H448V592H68V66Z" fill="currentColor" fillOpacity="0.018" stroke="currentColor" strokeWidth="2"/><path d="M68 150H448M68 238H448M68 326H448M68 414H448M68 502H448M176 66V592M324 66V592" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2"/><circle cx="176" cy="150" fill="#FE7001" r="12"/><circle cx="324" cy="326" fill="#FE7001" r="12"/><circle cx="176" cy="502" fill="#FE7001" r="12"/><text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2" x="68" y="40">B1 — B11 · C1 — C9</text></svg><span className="resource-hero-art__code">DATA · OWNER · SOURCE · EVIDENCE</span></div>;
}

export function VsmeDataGuide() {
  return <><main id="top"><article><header aria-labelledby="article-title" className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28"><DataArtwork/><div className="site-shell relative z-10"><nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"><Link className="transition hover:text-orange" href="/de">Startseite</Link><span aria-hidden="true">/</span><Link className="transition hover:text-orange" href="/de/ressourcen">Ressourcen</Link><span aria-hidden="true">/</span><span className="text-ink">VSME-Datenerfassung</span></nav><div className="mt-12 max-w-6xl"><p className="eyebrow">VSME · Datenerfassung</p><h1 className="font-display mt-7 max-w-[18ch] break-words hyphens-auto text-[clamp(3.05rem,6.8vw,6.35rem)] leading-[0.92]" id="article-title">VSME: Welche Daten braucht ein Unternehmen für den Nachhaltigkeitsbericht?</h1></div><div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16"><div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted"><p>Sie möchten einen VSME-Nachhaltigkeitsbericht erstellen. Dann beginnt die Arbeit normalerweise nicht mit dem Schreiben des Berichts.</p><p className="font-display mt-7 text-3xl leading-tight text-ink">Welche Daten müssen wir überhaupt zusammentragen?</p><p className="mt-6">Ein Teil liegt in der Buchhaltung, ein Teil bei HR. Energieverbräuche stehen auf Rechnungen, Abfalldaten beim Entsorger, Zertifikate beim Qualitätsmanagement und Arbeitssicherheitsinformationen wieder an anderer Stelle.</p><p className="mt-6">Manche Kennzahlen – insbesondere Scope 1 und Scope 2 – müssen aus vorhandenen Ausgangsdaten erst berechnet werden.</p></div><aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7"><ClipboardCheck aria-hidden="true" className="h-8 w-8 text-orange"/><p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">Die praktische Logik</p><p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">Anforderung → interne Datenquelle → Berechnung oder Aussage → Nachweis → Bericht</p></aside></div><p className="mt-12 max-w-4xl text-lg leading-8 text-muted">Dieser Leitfaden zeigt, welche Informationen Sie für den Basic Module vorbereiten sollten, wann zusätzliche Angaben aus dem Comprehensive Module relevant werden und wie Sie die Daten für Kunden, Banken und ESG-Fragebögen wiederverwendbar strukturieren.</p></div></header>

      <section aria-labelledby="quick-answer-title" className="scroll-mt-24 bg-ink py-20 text-white sm:py-24" id="schnellantwort"><div className="site-shell"><div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16"><div><p className="eyebrow">Quick Answer</p><h2 className="font-display mt-6 max-w-[14ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]" id="quick-answer-title">Welche Daten brauchen Sie für einen VSME-Bericht?</h2></div><ol className="grid gap-6 sm:grid-cols-2">{quickAreas.map(([number, title, body], index) => <li className={`border-t border-white/20 pt-4 ${index === quickAreas.length - 1 ? "sm:col-span-2" : ""}`} key={number}><span className="font-mono text-xs text-orange">{number}</span><h3 className="mt-2 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{body}</p></li>)}</ol></div><div className="mt-14 border-t border-white/15 pt-9"><p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">Der Bericht entsteht erst danach.</p><p className="font-display mt-5 text-[clamp(2.1rem,5vw,4.2rem)] leading-none">Zuerst entsteht eine belastbare Datenbasis.</p></div></div></section>

      <div className="site-shell grid items-start gap-12 py-10 lg:grid-cols-[15rem_minmax(0,55rem)] lg:justify-center lg:gap-16 lg:py-16"><aside className="hidden lg:block"><nav aria-label="Inhalt des Leitfadens" className="sticky top-28 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[rgba(255,255,255,0.72)] p-5 backdrop-blur"><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Im Leitfaden</p><ol className="mt-5 grid gap-3 text-sm font-semibold leading-5 text-[rgba(21,21,21,0.62)]">{[["01","Status 2026","#status-2026"],["02","Basic / Comprehensive","#basic-comprehensive"],["04","B1 Berichtsbasis","#b1-berichtsbasis"],["08","B3 Energie","#b3-energie"],["13","B7 Abfall","#b7-abfall"],["19","VSME Data Map","#vsme-data-map"],["20","Comprehensive","#comprehensive-module"],["27","Evidence","#nachvollziehbarkeit"],["31","Value Chain Cap","#value-chain-cap"],["32","Erste vier Stunden","#erste-vier-stunden"]].map(([number, label, href]) => <li key={href}><a className="group flex gap-3 transition hover:text-ink" href={href}><span className="font-mono text-[0.65rem] text-orange">{number}</span><span>{label}</span></a></li>)}</ol></nav></aside><div className="min-w-0">
        <ArticleSection id="status-2026" number="01" title="VSME oder „Voluntary Standard“ – was gilt 2026 eigentlich?">
          <p>Der Begriff VSME bleibt in Unternehmen, Suchmaschinen und vielen Unterstützungsangeboten die gebräuchlichste Bezeichnung. Rechtlich hat sich 2026 aber etwas verändert.</p>
          <p>Die Europäische Kommission hat am 3. Juli 2026 einen neuen Sustainability Reporting Standard for Voluntary Use – kurz Voluntary Standard – angenommen.</p>
          <p>Er basiert auf dem VSME, den EFRAG entwickelt hatte und den die Kommission 2025 mit Recommendation (EU) 2025/1710 unterstützt hatte. Die Änderungen wurden bewusst begrenzt und dienen insbesondere der Abstimmung mit den 2026 überarbeiteten ESRS und dem neuen Value-Chain-Cap-System.</p>
          <div className="my-8 rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Stand · 22. August 2026</p><p className="font-display mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-ink">Angenommen bedeutet noch nicht in Kraft.</p><p className="mt-5 leading-7 text-muted">Laut offizieller Kommissionsseite ist der delegierte Rechtsakt noch nicht in Kraft, solange die Veröffentlichung im Amtsblatt der Europäischen Union aussteht. Er bleibt dem einschlägigen Prüfungs- und Veröffentlichungsverfahren unterworfen.</p></div>
          <p>Der Standard richtet sich an Unternehmen, die nicht der verpflichtenden Nachhaltigkeitsberichterstattung unterliegen und im vorhergehenden Geschäftsjahr durchschnittlich nicht mehr als 1.000 Beschäftigte hatten. Er selbst schafft für diese Unternehmen keine verpflichtende Sustainability-Reporting-Pflicht.</p>
          <p>Für diesen Leitfaden verwenden wir deshalb weiterhin den etablierten Begriff VSME, beziehen die Datenstruktur aber auf den von der Kommission angenommenen 2026 Voluntary Standard.</p>
          <p>Die aktuelle Einordnung finden Sie bei der <ExternalSourceLink href={COMMISSION_NEWS_URL}>Europäischen Kommission: Annahme vom 3. Juli 2026</ExternalSourceLink> und auf der <ExternalSourceLink href={COMMISSION_STATUS_URL}>offiziellen Seite zu den delegierten Rechtsakten</ExternalSourceLink>.</p>
        </ArticleSection>

        <ArticleSection id="basic-comprehensive" number="02" title="Basic oder Comprehensive: Diese Entscheidung kommt zuerst.">
          <p>Der 2026 Voluntary Standard besteht weiterhin aus zwei Ebenen.</p>
          <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] bg-ink p-7 text-white"><p className="font-mono text-xs font-bold tracking-[0.12em] text-orange">B1–B11</p><h3 className="font-display mt-4 text-3xl">Basic Module</h3><p className="mt-4 text-sm leading-7 text-white/65">Der Kern des Standards mit grundlegenden Unternehmens-, Umwelt-, Sozial- und Governance-Informationen.</p></article><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-7"><p className="font-mono text-xs font-bold tracking-[0.12em] text-orange">C1–C9</p><h3 className="font-display mt-4 text-3xl">Comprehensive Module</h3><p className="mt-4 text-sm leading-7 text-muted">Zusätzliche Informationen, die besonders für Kunden, Banken, Investoren und andere Geschäftspartner interessant sein können.</p></article></div>
          <p>Der Basic Module ist Voraussetzung für die Anwendung des Comprehensive Module.</p>
          <p>Für ein Produktionsunternehmen sollte deshalb vor Beginn geklärt werden: Warum erstellen wir den Bericht? Nur als erste strukturierte ESG-Datenbasis – oder soll er möglichst viele wiederkehrende Informationsanforderungen von Kunden und Banken abdecken?</p>
          <Principle label="Entscheidung vor der Datensammlung">Berichtsziel → Basic oder Basic + Comprehensive → benötigte Datentiefe</Principle>
        </ArticleSection>

        <ArticleSection id="anwendbarkeit" number="03" title="Nicht jeder Datenpunkt gilt automatisch für jedes Unternehmen.">
          <p>Der Standard unterscheidet unter anderem zwischen grundlegenden Datenpunkten, Angaben unter bestimmten Bedingungen, freiwilligen Angaben und zusätzlichen sektorspezifischen Informationen.</p>
          <p>Einige Datenpunkte sind außerdem für Unternehmen mit 10 Beschäftigten oder weniger freiwillig, obwohl sie für größere Unternehmen innerhalb des Standards grundsätzlich dazugehören.</p>
          <p>Deshalb sollte die Datensammlung nicht so funktionieren: „Hier sind 100 Felder – bitte alles irgendwie ausfüllen.“</p>
          <Principle>Disclosure → trifft auf uns zu? → Datenquelle → Verantwortlicher → Status</Principle>
          <p>„Nicht anwendbar“ und „nicht vorhanden“ sind dabei zwei unterschiedliche Ergebnisse.</p>
        </ArticleSection>

        <ArticleSection id="b1-berichtsbasis" number="04" title="B1: Zuerst die Basis des Berichts festlegen.">
          <p>Bevor Sie Strom, Abfall oder Mitarbeiterkennzahlen sammeln, müssen Sie definieren: Worüber berichten wir eigentlich?</p>
          <p>Unter B1 verlangt der 2026 Standard unter anderem Angaben zur gewählten Berichtsoption sowie dazu, ob der Report auf Einzelunternehmensebene oder konsolidiert erstellt wird.</p>
          <BulletList items={["Rechtsform", "NACE-Sektorcode", "Bilanzsumme", "Umsatz", "Mitarbeiterzahl", "Land der Hauptgeschäftstätigkeit", "bedeutende Assets beziehungsweise Standorte", "Geolokation relevanter eigener, gemieteter oder gemanagter Standorte", "bei konsolidierter Berichterstattung: einbezogene Tochtergesellschaften"]}/>
          <div className="my-8 rounded-[1rem] bg-[rgba(21,21,21,0.05)] p-6"><Building2 aria-hidden="true" className="h-7 w-7 text-orange"/><h3 className="mt-5 font-bold text-ink">Typische interne Quellen</h3><p className="mt-3 leading-7 text-muted">Jahresabschluss, ERP, Handelsregister- und Unternehmensdaten, HR, Standortliste sowie Immobilien- und Facility-Unterlagen.</p></div>
          <Principle label="Scope-Warnung">Nicht den Umsatz der Gruppe mit dem Energieverbrauch nur eines Werkes kombinieren.</Principle>
        </ArticleSection>

        <ArticleSection id="zertifizierungen" number="05" title="Zertifizierungen: Nicht nur sammeln, sondern den Scope prüfen.">
          <p>Wenn Ihr Unternehmen sustainability-related Certifications oder Labels besitzt, sieht B1 eine kurze Beschreibung vor. Dazu können – wenn relevant – beispielsweise Aussteller, Datum sowie Rating beziehungsweise Ergebnis gehören.</p>
          <p>Praktisch sollten Sie für jedes Dokument mindestens Gesellschaft, Standort beziehungsweise Scope, Gültigkeit und Dokumentstatus erfassen.</p>
          <ResponsiveTable caption="Beispiel zur Erfassung des Zertifizierungsumfangs" headers={["Zertifizierung", "Gesellschaft", "Standort / Scope", "Gültigkeit", "Dokument"]} marker="vsme-certifications" rows={certificationRows}/>
          <p>Ein Zertifikat sollte nicht nur existieren. Es sollte auch klar sein, für welchen Teil der berichtenden Organisation es tatsächlich gilt. Zertifizierungen sind dabei nicht automatisch verpflichtend und ein Dokument deckt nicht pauschal jede Gesellschaft oder jeden Standort ab.</p>
        </ArticleSection>

        <ArticleSection id="b2-praktiken" number="06" title="B2: Welche Nachhaltigkeitspraktiken existieren bereits?">
          <p>B2 ist kein Auftrag, möglichst viele neue Policies zu erfinden. Der Standard fragt nach dem, was tatsächlich bereits vorhanden beziehungsweise in Umsetzung ist.</p>
          <div className="my-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)] sm:grid-cols-2"><div className="bg-white p-5 font-bold text-ink">Praktiken</div><div className="bg-white p-5 font-bold text-ink">Policies</div><div className="bg-white p-5 font-bold text-ink">zukünftige Initiativen / Pläne</div><div className="bg-white p-5 font-bold text-ink">Ziele zur Überwachung der Umsetzung</div></div>
          <p>Für ein Produktionsunternehmen können reale Praktiken beispielsweise geringeren Energieverbrauch, Emissionsreduktion, Abfallvermeidung, Recycling, Arbeitssicherheit, Produktqualität oder -sicherheit, bessere Arbeitsbedingungen und Lieferantenanforderungen betreffen.</p>
          <Principle label="Die richtigen Fragen">Was machen wir tatsächlich? Wo ist das dokumentiert? Wer kann es intern bestätigen?</Principle>
        </ArticleSection>

        <ArticleSection id="policy-status" number="07" title="Policies: Vorhanden, Entwurf oder nicht vorhanden?">
          <p>Für jede relevante Richtlinie sollten Sie sauber unterscheiden.</p>
          <div className="my-8 grid gap-4">
            {[
              ["01", "Vorhanden und verabschiedet", "Als existierende Policy erfassen."],
              ["02", "Praxis existiert, formelle Policy fehlt", "Prüfen, ob sie sachgerecht dokumentiert und intern verabschiedet werden soll."],
              ["03", "Entwurf vorhanden", "Noch nicht automatisch als gültige Unternehmensrichtlinie behandeln."],
              ["04", "Praxis existiert nicht", "Keinen Text erstellen, der das Gegenteil behauptet."]
            ].map(([number, title, body]) => <article className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.11)] p-5" key={number}><span className="font-mono text-xs font-bold text-orange">{number}</span><div><h3 className="font-bold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{body}</p></div></article>)}
          </div>
          <p>Beispiele können Environmental Policy, Code of Conduct, Human Rights Policy, Health &amp; Safety Policy, Anti-Corruption Policy oder Supplier Code of Conduct sein.</p>
          <Principle>Ein VSME-Bericht sollte Unternehmensrealität strukturieren – nicht eine attraktivere Unternehmensrealität erfinden.</Principle>
        </ArticleSection>

        <ArticleSection id="b3-energie" number="08" title="B3: Energieverbrauch – welche Daten brauchen Sie?">
          <p>Für Unternehmen mit mehr als 10 Beschäftigten sieht der 2026 Standard im Basic Module die Offenlegung des gesamten Energieverbrauchs in MWh vor.</p>
          <p>Wenn die notwendigen Informationen verfügbar sind, wird außerdem eine Aufschlüsselung nach Strom und Brennstoffen sowie erneuerbarer und nicht erneuerbarer Energie vorgesehen.</p>
          <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] bg-[var(--soft-orange)] p-6"><Zap aria-hidden="true" className="h-7 w-7 text-orange"/><h3 className="mt-5 font-bold text-ink">Strom und Wärme</h3><p className="mt-3 text-sm leading-7 text-muted">kWh oder MWh je Standort, Rechnungen und Zählerdaten; Fernwärme und andere Energieformen, soweit relevant.</p></article><article className="rounded-[1rem] bg-[rgba(21,21,21,0.05)] p-6"><Factory aria-hidden="true" className="h-7 w-7 text-orange"/><h3 className="mt-5 font-bold text-ink">Brennstoffe</h3><p className="mt-3 text-sm leading-7 text-muted">Erdgas in kWh oder m³, Heizöl in Litern, LPG und andere Brennstoffe in ihrer jeweiligen Originaleinheit.</p></article></div>
          <Principle label="Wichtigste Regel">Originaleinheit und Originalquelle behalten. Die Umrechnung in MWh kommt danach.</Principle>
        </ArticleSection>

        <ArticleSection id="b3-emissionen" number="09" title="B3: Scope 1 und Scope 2 müssen aus den Aktivitätsdaten berechnet werden.">
          <p>Der 2026 Voluntary Standard sieht im Basic Module die Angabe geschätzter absoluter Brutto-Treibhausgasemissionen in tCO₂e vor: Scope 1 und location-based Scope 2 unter Berücksichtigung des GHG Protocol Corporate Standard.</p>
          <p>Für Unternehmen mit 10 Beschäftigten oder weniger sind diese Angaben im Standard ausdrücklich freiwillig.</p>
          <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="font-mono text-xs font-bold text-orange">SCOPE 1</p><p className="mt-4 text-sm leading-7 text-muted">Erdgas, Heizöl, andere Brennstoffe, relevante Fuhrparkkraftstoffe, Kältemittel und gegebenenfalls Prozessemissionen.</p></article><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="font-mono text-xs font-bold text-orange">SCOPE 2</p><p className="mt-4 text-sm leading-7 text-muted">Eingekaufter Strom sowie Wärme, Kälte und Dampf.</p></article></div>
          <Principle>Aktivitätsdaten → Emissionsfaktor → Berechnung → tCO₂e</Principle>
          <p>Welche Ausgangsdaten Sie zuerst zusammentragen sollten, zeigt <Link href="/de/ressourcen/scope-1-2-daten-berechnung">Scope 1 und Scope 2: Welche Daten braucht man?</Link>. Unterstützung bei der eigentlichen Berechnung finden Sie unter <Link href="/de/scope-1-2-berechnung">Scope 1 und Scope 2 berechnen</Link>.</p>
        </ArticleSection>

        <ArticleSection id="b4-schadstoffe" number="10" title="B4: Schadstoffe – nicht jedes Unternehmen braucht eine neue Messkampagne.">
          <p>B4 betrifft Emissionen von Schadstoffen in Luft, Wasser und Boden aus eigenen Tätigkeiten.</p>
          <p>Der Standard verlangt jedoch nicht pauschal, dass jedes kleine Unternehmen für den VSME-Bericht ein komplett neues Schadstoff-Monitoring startet.</p>
          <p>Die Angabe greift, wenn das Unternehmen solche Emissionen bereits aufgrund von EU- oder nationalem Recht an zuständige Behörden melden muss oder sie freiwillig im Rahmen eines Environmental Management Systems berichtet. Sind Informationen bereits öffentlich verfügbar, kann auf das entsprechende Dokument verwiesen werden.</p>
          <Principle label="Interne Prüffrage">Melden wir heute bereits Umwelt-Schadstoffdaten an eine Behörde oder im Rahmen unseres Umweltmanagementsystems?</Principle>
          <p>Wenn nein, sollte nicht automatisch ein Wert erfunden werden.</p>
        </ArticleSection>

        <ArticleSection id="b5-biodiversitaet" number="11" title="B5: Biodiversität beginnt mit der Standortliste.">
          <p>Für B5 ist zunächst keine abstrakte Biodiversity Strategy notwendig. Die praktische Ausgangsfrage lautet:</p>
          <Principle>Liegt einer unserer Standorte in oder nahe an einem biodiversitätssensiblen Gebiet?</Principle>
          <p>Falls ja, sieht der Standard die Angabe des Standorts sowie des entsprechenden Gebiets vor.</p>
          <BulletList items={["vollständige Standortliste", "genaue Lage beziehungsweise Geokoordinaten", "Prüfung gegenüber relevanten Schutz- beziehungsweise Biodiversitätsgebieten"]}/>
          <p>Für Produktionsunternehmen mit mehreren Werken sollte dies standortbezogen erfolgen.</p>
        </ArticleSection>

        <ArticleSection id="b6-wasser" number="12" title="B6: Wasser – beginnen Sie mit der Wasserentnahme.">
          <p>Der Standard fragt nach der gesamten Water Withdrawal – also dem Wasser, das in die organisatorische beziehungsweise Standortgrenze entnommen wird.</p>
          <p>Wenn Produktionsprozesse wesentlich Wasser verbrauchen, kann zusätzlich der Wasserverbrauch relevant sein, also vereinfacht die Differenz zwischen Entnahme und Abgabe aus den Produktionsprozessen. Bei Standorten in Water-Stress-Gebieten wird diese Information zusätzlich separat relevant.</p>
          <div className="my-8 rounded-[1rem] bg-[#eaf6f7] p-7"><Droplets aria-hidden="true" className="h-8 w-8 text-[#137b83]"/><h3 className="mt-5 font-bold text-ink">Typische Datenquellen</h3><p className="mt-3 leading-7 text-muted">Wasserrechnungen, Zähler, Facility Management, Produktionsmessungen sowie eigene Brunnen- oder Entnahmeaufzeichnungen, soweit vorhanden.</p></div>
          <Principle label="Erfassungsstruktur">Standort | Zeitraum | Wassermenge | Einheit | Quelle</Principle>
        </ArticleSection>

        <ArticleSection id="b7-abfall" number="13" title="B7: Abfall ist für Produktionsunternehmen besonders praktisch relevant.">
          <p>Für viele Fertigungsunternehmen ist B7 einer der datenintensiveren Bereiche.</p>
          <p>Der Standard umfasst unter anderem die Anwendung von Circular-Economy-Prinzipien, das Gesamtgewicht des erzeugten Abfalls, die Aufteilung in gefährlichen und nicht gefährlichen Abfall sowie den Anteil, der Recycling oder Vorbereitung zur Wiederverwendung zugeführt wird.</p>
          <p>Für Unternehmen in Branchen mit wesentlichen Materialströmen – ausdrücklich beispielsweise Manufacturing – kann zusätzlich der jährliche Massenstrom relevanter verwendeter Materialien relevant sein.</p>
          <div className="my-8 flex items-start gap-4 rounded-[1rem] bg-[var(--soft-orange)] p-6"><Recycle aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-orange"/><p className="leading-7 text-muted">Typische Quellen sind Entsorgerberichte, Wiegescheine, Rechnungen, Abfallregister, Produktionsdaten, Materialeinkauf und ERP.</p></div>
          <ResponsiveTable caption="Beispiel zur Erfassung von Abfalldaten" headers={["Abfallart", "Menge", "Einheit", "gefährlich?", "Verwertung", "Quelle"]} marker="vsme-waste" rows={wasteRows}/>
          <p>Die dargestellten Abfallarten sind Beispiele und keine universelle Kategorienliste für jedes Unternehmen.</p>
        </ArticleSection>

        <ArticleSection id="materialstroeme" number="14" title="Materialströme: Für Manufacturing nicht übersehen.">
          <p>Dieser Punkt ist für die Zielunternehmen von Evipace besonders wichtig. Der 2026 Standard nennt Unternehmen in Sektoren mit bedeutenden Materialströmen und führt Manufacturing ausdrücklich als Beispiel auf.</p>
          <p>Bei einem Produktionsunternehmen sollten deshalb früh die wesentlichen Rohstoffe und Inputs geprüft werden:</p>
          <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-3">{["Metalle", "Kunststoffe", "Chemikalien", "Holz", "Verpackungen", "weitere wesentliche Inputs"].map((material) => <div className="rounded-[0.85rem] border border-[rgba(21,21,21,0.11)] bg-white p-4 text-center text-sm font-bold text-ink" key={material}>{material}</div>)}</div>
          <Principle>Material → jährliche Masse → Einheit → Quelle</Principle>
          <p>Die Quelle kann im ERP, Einkauf, Lager, Produktionssystem oder in Lieferantenabrechnungen liegen. Nicht jede Schraube muss ein eigener Datenpunkt sein. Ziel ist ein relevanter, nachvollziehbarer Materialfluss.</p>
        </ArticleSection>

        <ArticleSection id="b8-workforce" number="15" title="B8: Mitarbeiterdaten kommen meist aus HR – aber Definitionen vorher klären.">
          <p>Der Basic Module verlangt Workforce-Informationen nach Vertragsart – temporär oder permanent –, Geschlecht und bei Tätigkeit in mehreren Ländern auch nach Land des Arbeitsvertrags.</p>
          <p>Die Werte können in Headcount oder FTE angegeben werden, entsprechend der verwendeten Berichtslogik.</p>
          <div className="my-8 rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><Users aria-hidden="true" className="h-7 w-7 text-orange"/><h3 className="mt-5 font-bold text-ink">Vor dem HR-Export festlegen</h3><BulletList items={["Stichtag oder Berichtslogik", "Headcount oder FTE", "welche Gesellschaften dazugehören", "wie Mitarbeitende mehreren Standorten zugeordnet werden"]}/></div>
          <p>HR kann 143 Mitarbeitende liefern und Finance mit 137 FTE arbeiten – beide Zahlen sind möglicherweise korrekt, aber nicht dasselbe.</p>
        </ArticleSection>

        <ArticleSection id="b9-arbeitssicherheit" number="16" title="B9: Arbeitssicherheit braucht mehr als die Aussage „wir arbeiten sicher“.">
          <p>Der Standard verlangt Angaben über die Anzahl recordable work-related accidents und die entsprechende Unfallrate sowie – vorbehaltlich rechtlicher Einschränkungen – relevante Todesfälle aus Arbeitsunfällen beziehungsweise arbeitsbedingter Erkrankung.</p>
          <p>Typische Quellen sind H&amp;S beziehungsweise EHS, HR, Unfallregister, Berufsgenossenschafts- oder Versicherungsunterlagen und interne Arbeitssicherheitsstatistiken.</p>
          <Principle label="Wichtig">Absolute Zahl und Rate sind nicht dasselbe.</Principle>
          <p>Wenn eine Rate berichtet wird, muss die verwendete Berechnungslogik nachvollziehbar bleiben. Dieser Leitfaden erfindet dafür keine unternehmensfremde Formel.</p>
        </ArticleSection>

        <ArticleSection id="b10-verguetung" number="17" title="B10: Vergütung, Tarifbindung und Weiterbildung.">
          <p>Für B10 benötigen Sie je nach Unternehmenssituation Angaben dazu:</p>
          <BulletList items={["ob Mitarbeitende mindestens nach dem anwendbaren gesetzlichen Mindestlohn beziehungsweise einschlägiger tariflicher Grundlage vergütet werden", "welcher Anteil der Beschäftigten von Tarifvereinbarungen erfasst ist", "durchschnittliche jährliche Trainingsstunden pro Mitarbeiter"]}/>
          <p>Eine Gender-Pay-Gap-Angabe wird in diesem Bereich nur verlangt, wenn das Unternehmen bereits aufgrund einschlägigen EU- oder nationalen Rechts verpflichtet ist, sie zu berichten.</p>
          <p>Typische Quellen sind Payroll, HR, Tarif- oder Betriebsvereinbarungen, Learning Management System und Schulungslisten. Bei Trainingsstunden sollte klar sein, welche Schulungen zählen und für welchen Mitarbeiterkreis.</p>
        </ArticleSection>

        <ArticleSection id="b11-korruption" number="18" title="B11: Korruption und Bestechung – ein „Nullwert“ sollte trotzdem bestätigt werden.">
          <p>Falls im Berichtszeitraum Verurteilungen oder Geldbußen aufgrund von Verstößen gegen Anti-Corruption- oder Anti-Bribery-Gesetze vorlagen, sieht B11 die Angabe der Anzahl der Verurteilungen und des Gesamtbetrags der Geldbußen vor.</p>
          <div className="my-8 grid items-center gap-4 rounded-[1rem] bg-ink p-7 text-white sm:grid-cols-[auto_1fr]"><ShieldCheck aria-hidden="true" className="h-8 w-8 text-orange"/><div><p className="font-display text-3xl">0 ist ebenfalls ein Datenpunkt.</p><p className="mt-3 text-sm leading-6 text-white/65">Er sollte aus interner Bestätigung entstehen – nicht aus Vermutung.</p></div></div>
          <p>Die Bestätigung kann je nach Unternehmensstruktur durch Geschäftsführung, Compliance oder Legal erfolgen. Eine externe Person sollte den Nullwert nicht stellvertretend annehmen.</p>
        </ArticleSection>

        <ArticleSection id="vsme-data-map" number="19" title="So sieht eine praktische VSME Data Map aus.">
          <p>Noch bevor der Bericht geschrieben wird, ordnet die Data Map jede Disclosure einer internen Quelle, einem Verantwortlichen, einem Nachweis und einem Status zu.</p>
          <DataMapTable/>
          <p>Der Status kann beispielsweise lauten: bereit, beschaffen, berechnen, bestätigen, nicht anwendbar oder Gap.</p>
          <Principle>Damit wird aus einem Nachhaltigkeitsbericht ein kontrollierbares Datenprojekt.</Principle>
        </ArticleSection>

        <ArticleSection id="comprehensive-module" number="20" title="Comprehensive Module: Wann sollten Sie zusätzliche Daten sammeln?">
          <p>Der Comprehensive Module ist darauf ausgelegt, zusätzliche Informationsbedürfnisse von Banken, Investoren und Unternehmenskunden abzudecken.</p>
          <p>Für einen Produktionslieferanten kann er besonders interessant sein, wenn der Bericht nicht nur öffentlich existieren soll, sondern als wiederverwendbare ESG-Datenbasis für die Lieferkette dienen soll. Nicht jeder Comprehensive-Datenpunkt gilt dabei automatisch für jedes Unternehmen.</p>
          <div className="my-8 grid gap-3 sm:grid-cols-2">
            {[
              ["C1", "Geschäftsmodell, Produkte, Märkte und Geschäftsbeziehungen"],
              ["C2", "Vertiefung bestehender Practices, Policies, Initiativen und Ziele"],
              ["C3", "GHG-Reduktionsziele und Climate Transition"],
              ["C4", "Klimarisiken"],
              ["C5", "Weitere Workforce-Informationen"],
              ["C6", "Human-Rights-Policies und Prozesse"],
              ["C7", "Bestätigte Menschenrechtsvorfälle"],
              ["C8", "Umsätze aus bestimmten Aktivitäten"],
              ["C9", "Gender Diversity im Governance Body"]
            ].map(([code, body]) => <article className={`grid grid-cols-[2.6rem_1fr] gap-4 rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] p-5 ${code === "C9" ? "sm:col-span-2" : ""}`} key={code}><span className="font-mono text-xs font-bold text-orange">{code}</span><p className="text-sm font-semibold leading-6 text-ink">{body}</p></article>)}
          </div>
        </ArticleSection>

        <ArticleSection id="c1-geschaeftsmodell" number="21" title="C1: Geschäftsmodell und Lieferkette nicht erst im Bericht erfinden.">
          <p>Für C1 können Informationen über wesentliche Produkt- und Dienstleistungsgruppen, wichtige Märkte, wesentliche Geschäftsbeziehungen und sustainability-related Elemente der Strategie relevant sein.</p>
          <p>Typische Quellen sind Unternehmenspräsentation, Website, Vertrieb, Finance, Einkauf und Geschäftsführung.</p>
          <div className="my-8 rounded-[1rem] bg-[var(--soft-orange)] p-7"><h3 className="font-bold text-ink">In klarer Sprache beantworten</h3><div className="mt-5 grid gap-3 text-sm font-semibold text-muted sm:grid-cols-2">{["Was stellen wir her?", "Für welche Märkte?", "In welchen Ländern?", "Wer sind die wesentlichen Kundengruppen?", "Welche Lieferanten- und Distributionsbeziehungen prägen das Geschäftsmodell?"].map((question) => <p className="border-t border-[rgba(254,112,1,0.25)] pt-3" key={question}>{question}</p>)}</div></div>
          <p>Keine Marketingsprache nötig. Eine präzise Unternehmensbeschreibung ist wertvoller.</p>
        </ArticleSection>

        <ArticleSection id="c3-klimaziele" number="22" title="C3: Klimaziele nur berichten, wenn sie tatsächlich definiert sind.">
          <p>Hat ein Unternehmen Treibhausgas-Reduktionsziele festgelegt, sieht C3 unter anderem Informationen vor zu Zieljahr, Zielwert, Basisjahr, Basiswert, verwendeter Einheit, erfassten Scopes und wesentlichen geplanten Maßnahmen.</p>
          <div className="my-8 rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-7"><Target aria-hidden="true" className="h-8 w-8 text-orange"/><p className="mt-6 font-display text-[clamp(1.7rem,4vw,2.8rem)] leading-tight text-ink">Basisjahr → Baseline → Zieljahr → Zielwert → Scope → Maßnahmen</p></div>
          <p>„Wir wollen nachhaltiger werden“ ist kein sauber definiertes GHG-Reduktionsziel. Wenn die Elemente intern noch nicht festgelegt wurden, sollte der Bericht sie nicht nachträglich erfinden.</p>
        </ArticleSection>

        <ArticleSection id="c4-klimarisiken" number="23" title="C4: Klimarisiken brauchen zuerst eine echte Risikobetrachtung.">
          <p>Wenn ein Unternehmen klimabezogene Gefahren oder Transition Events identifiziert hat, die Klimarisiken erzeugen, sieht C4 unter anderem Angaben dazu vor:</p>
          <BulletList items={["welche Gefahren beziehungsweise Transition Events identifiziert wurden", "wie Exposition und Sensitivität von Assets, Aktivitäten und Value Chain beurteilt wurden", "welche Zeithorizonte relevant sind", "ob Anpassungsmaßnahmen umgesetzt wurden"]}/>
          <p>Potenzielle finanzielle oder operative Auswirkungen können zusätzlich beschrieben und beispielsweise als hoch, mittel oder niedrig eingeschätzt werden.</p>
          <p>Die zugrunde liegenden Informationen können aus Risk Management, Versicherungen, Operations, Facility, Lieferkettenanalyse und Geschäftsführung kommen.</p>
          <Principle>C4 ist kein Auftrag, eine hübsche Climate-Risk-Matrix nachträglich zu erfinden.</Principle>
        </ArticleSection>

        <ArticleSection id="scope-3" number="24" title="Scope 3: Für Manufacturing sollte es zumindest bewusst geprüft werden.">
          <p>Der 2026 Standard weist darauf hin, dass Scope-3-Informationen abhängig von der Geschäftstätigkeit relevant sein können. Manufacturing wird als ein Bereich genannt, bei dem wesentliche Scope-3-Kategorien wahrscheinlich sein können.</p>
          <div className="my-8 rounded-[1rem] border-l-4 border-orange bg-white p-6 shadow-lift"><p className="font-bold text-ink">Das bedeutet nicht:</p><p className="font-display mt-3 text-3xl leading-tight text-ink">Jeder VSME-Bericht muss automatisch eine vollständige Scope-3-Bilanz enthalten.</p></div>
          <p>Vielmehr sollte geprüft werden, ob Scope 3 für die Tätigkeit relevant ist, ob ein Kunde oder eine Bank es benötigt, welche Daten bereits vorliegen und welche Kategorien wesentlich wären.</p>
          <p>Wenn Scope 3 Teil des vereinbarten Reporting-Umfangs ist, sollte die Datenerhebung gesondert und methodisch vorbereitet werden.</p>
        </ArticleSection>

        <ArticleSection id="c5-c9" number="25" title="C5 bis C9: Viele Informationen liegen bereits irgendwo im Unternehmen.">
          <p>Zusätzliche Comprehensive-Daten können unter anderem umfassen:</p>
          <div className="my-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Workforce", "Mitarbeiterfluktuation, gegebenenfalls Gender Ratio im Management und bestimmte externe oder temporäre Arbeitskräfte"],
              ["Human Rights", "Code of Conduct beziehungsweise Human Rights Policy, Themenabdeckung und Beschwerdemechanismus"],
              ["Incidents", "bestätigte relevante Menschenrechtsvorfälle in der eigenen Workforce beziehungsweise – soweit gefragt – in der Value Chain"],
              ["Bestimmte Branchenumsätze", "nur wenn die im Standard genannten Tätigkeiten tatsächlich relevant sind"],
              ["Governance Diversity", "Gender Diversity Ratio des Governance Body, sofern ein solcher vorhanden ist"]
            ].map(([title, body], index) => <article className={`border-t border-[rgba(21,21,21,0.13)] pt-5 ${index === 4 ? "sm:col-span-2" : ""}`} key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></article>)}
          </div>
          <Principle>Diese Felder sollte nicht eine ESG-Person allein ausfüllen. Jeder Datenpunkt braucht den richtigen internen Owner.</Principle>
        </ArticleSection>

        <ArticleSection id="interne-owner" number="26" title="Wer liefert welche VSME-Daten?">
          <p>Für ein typisches Produktionsunternehmen könnte die interne Zuordnung so aussehen:</p>
          <div className="my-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Geschäftsführung", "Strategie, Policies, Ziele, Governance und Bestätigung von Unternehmensangaben"],
              ["Finance / Controlling", "Umsatz, Bilanzsumme, Energieabrechnungen und quantitative Daten"],
              ["HR", "Mitarbeitende, Verträge, Gender-Daten, Tarifabdeckung, Training und Fluktuation"],
              ["HSE / Qualität / Umwelt", "Arbeitssicherheit, Zertifikate, Umweltmanagement, Pollution, Abfall und Wasser"],
              ["Facility / Operations", "Energie, Brennstoffe, Kältemittel, Wasser und Standortinformationen"],
              ["Einkauf", "Materialströme, Lieferantenprozesse, Supplier Policies und Value-Chain-Informationen"],
              ["Compliance / Legal", "Antikorruption, Menschenrechtsprozesse, bestätigte Vorfälle und relevante Geldbußen"]
            ].map(([title, body], index) => <article className={`rounded-[1rem] border border-[rgba(21,21,21,0.11)] p-5 ${index === 6 ? "sm:col-span-2" : ""}`} key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></article>)}
          </div>
          <Principle>Eine Person kann das Projekt koordinieren. Aber eine Person sollte nicht alle Unternehmensdaten aus dem Gedächtnis beantworten.</Principle>
          <p>Eine ausführlichere Zuordnung von ESG-Daten zu Finance, HR, Einkauf, Qualität, Operations und Management finden Sie in unserer <Link href="/de/ressourcen/esg-daten-verantwortliche-abteilungen">Data-Owner-Übersicht</Link>.</p>
        </ArticleSection>

        <ArticleSection id="nachvollziehbarkeit" number="27" title="Behalten Sie zu jeder Zahl die Quelle.">
          <p>Ein häufiger Fehler bei Nachhaltigkeitsberichten: Die finale Zahl wird sauber formatiert. Die Berechnungsgrundlage verschwindet.</p>
          <div className="my-8 rounded-[1rem] bg-[rgba(21,21,21,0.05)] p-7"><p className="font-mono text-xs font-bold text-orange">BEISPIEL</p><p className="font-display mt-4 text-4xl">Scope 1: 184 t CO₂e</p><p className="mt-5 leading-7 text-muted">Zwei Jahre später muss noch erkennbar sein, welche Gasrechnungen und Fahrzeuge enthalten waren, welcher Faktor verwendet wurde und welches Berichtsjahr gemeint war.</p></div>
          <Principle label="Traceability Chain">Berichtsaussage → Datenpunkt → Berechnung → Quelle → Nachweis</Principle>
          <p>Dasselbe gilt für Energie, Wasser, Abfall, Workforce, Training, Unfallraten und Materialströme.</p>
          <p>Der Report ist das Output-Dokument. Die Datenbasis dahinter ist das eigentliche Asset. Vertiefend: <Link href="/de/ressourcen/esg-nachweise-lieferanten">ESG-Nachweise für Lieferanten</Link> und <Link href="/de/methodology">Unsere Methodik</Link>.</p>
        </ArticleSection>

        <ArticleSection id="zweites-berichtsjahr" number="28" title="Das zweite Berichtsjahr sollte deutlich einfacher werden.">
          <p>Der Standard sieht ab dem zweiten Berichtsjahr grundsätzlich Vergleichsinformationen zum Vorjahr vor, außer bei erstmals offengelegten Metrics.</p>
          <p>Wenn Sie Year 1 sauber aufbauen, speichern Sie deshalb nicht nur den fertigen PDF-Bericht.</p>
          <div className="my-8 grid gap-4 sm:grid-cols-[0.8fr_auto_1.2fr]"><article className="rounded-[1rem] bg-ink p-6 text-white"><p className="font-mono text-xs font-bold text-orange">YEAR 1</p><h3 className="font-display mt-4 text-3xl">Struktur aufbauen</h3><p className="mt-4 text-sm leading-6 text-white/62">Quelle, Owner, Einheit, Formeln, Faktorversionen, Policies, Gültigkeiten, Scope und Gaps sichern.</p></article><span aria-hidden="true" className="hidden self-center font-display text-4xl text-orange sm:block">→</span><article className="rounded-[1rem] border border-[rgba(254,112,1,0.25)] bg-[var(--soft-orange)] p-6"><p className="font-mono text-xs font-bold text-orange">YEAR 2</p><h3 className="font-display mt-4 text-3xl">Veränderungen prüfen</h3><p className="mt-4 text-sm leading-6 text-muted">Aus „Woher bekommen wir die Daten?“ wird „Welche Werte haben sich seit dem Vorjahr verändert?“</p></article></div>
        </ArticleSection>

        <ArticleSection id="datenwiederverwendung" number="29" title="Ein VSME-Bericht ist besonders wertvoll, wenn die Daten wiederverwendbar bleiben.">
          <p>Der neue Voluntary Standard soll Unternehmen dabei unterstützen, Informationsbedürfnisse unter anderem von CSRD-berichtspflichtigen Geschäftspartnern, Banken und Investoren strukturierter zu bedienen.</p>
          <p>Die Energiezahl aus B3 ist deshalb nicht nur eine VSME-Zahl. Sie kann später für Kundenfragebogen, Supplier Portal, Bank, EcoVadis, IntegrityNext und interne ESG-Steuerung relevant werden.</p>
          <p>Dasselbe gilt für Zertifikate, Policies, Workforce-Daten, Abfall, Wasser sowie Scope 1 und Scope 2.</p>
          <div className="my-8 flex items-start gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><FileCheck2 aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-orange"/><div><p className="text-sm font-bold uppercase tracking-[0.1em] text-orange">Interne Struktur</p><p className="font-display mt-3 text-3xl leading-tight text-ink">ESG-Datenpunkt → Quelle → Zeitraum → Nachweis → verwendbare Outputs</p></div></div>
          <p>Die Wiederverwendung wird konkret, wenn später ein <Link href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">ESG-Fragebogen vom Kunden</Link>, ein <Link href="/de/ressourcen/ecovadis-dokumente-nachweise">EcoVadis-Assessment</Link> oder eine <Link href="/de/ressourcen/integritynext-einladung-lieferanten">IntegrityNext-Einladung</Link> eintrifft.</p>
        </ArticleSection>

        <ArticleSection id="dnk-tool" number="30" title="Muss man den Bericht über den DNK erstellen?">
          <p>Nein. Der Voluntary Standard schreibt keine bestimmte deutsche Softwareplattform für die Erstellung vor.</p>
          <p>Für Unternehmen in Deutschland gibt es jedoch ein relevantes kostenloses Angebot: Der Deutsche Nachhaltigkeitskodex stellt ein digitales VSME-Modul bereit, das Unternehmen durch den Berichtsprozess führt. Das Angebot wird von der Bundesregierung unterstützt und seit März 2026 als kostenfreies Werkzeug zur VSME-Berichterstattung für KMU positioniert.</p>
          <p>Der DNK veröffentlicht inzwischen auch reale VSME-Berichte als Beispiele.</p>
          <div className="my-8 rounded-[1rem] bg-ink p-7 text-white"><BarChart3 aria-hidden="true" className="h-8 w-8 text-orange"/><p className="font-display mt-6 text-[clamp(1.8rem,4vw,3rem)] leading-tight">Das Tool ersetzt nicht die zugrunde liegende Datenarbeit.</p><p className="mt-5 leading-7 text-white/65">Unternehmensdaten müssen unabhängig vom Ausgabeweg gefunden, geprüft, berechnet, zugeordnet und dokumentiert werden.</p></div>
          <p>Evipace ist unabhängig vom DNK, nicht mit ihm verbunden und besitzt die Plattform nicht. Der DNK ist weder verpflichtend noch die einzige mögliche Ausgabeform. Offizielle Informationen bieten das <ExternalSourceLink href={BMWE_DNK_URL}>Bundeswirtschaftsministerium zum DNK</ExternalSourceLink> und die <ExternalSourceLink href={DNK_REPORTS_URL}>veröffentlichten VSME-Beispiele des DNK</ExternalSourceLink>.</p>
        </ArticleSection>

        <ArticleSection id="value-chain-cap" number="31" title="Was bedeutet der Value Chain Cap für den VSME?">
          <p>Der neue Voluntary Standard hat neben freiwilligem Reporting eine zweite wichtige Funktion: Er bildet die Referenz für den sogenannten Value Chain Cap.</p>
          <p>Die 2026 geänderte Accounting Directive sieht den freiwilligen Standard für Unternehmen mit durchschnittlich höchstens 1.000 Beschäftigten vor und verknüpft ihn mit einer Begrenzung bestimmter Informationsanforderungen entlang der Wertschöpfungskette.</p>
          <p>Annex II des 2026 Voluntary Standard listet die Datenpunkte auf, die vom Value Chain Cap umfasst werden. Dabei bestehen auch Unterschiede für Unternehmen mit höchstens 10 Beschäftigten und größere geschützte Unternehmen.</p>
          <div className="my-8 rounded-[1rem] border-l-4 border-orange bg-white p-6 shadow-lift"><p className="font-bold text-ink">Nicht pauschal verallgemeinern</p><p className="mt-4 leading-7 text-muted">Der Value Chain Cap bedeutet nicht, dass ein Kunde einem Lieferanten nie zusätzliche Informationen abfragen darf. Der Mechanismus bezieht sich auf bestimmte Sustainability-Informationsanforderungen im Kontext der Accounting Directive; andere rechtliche, vertragliche oder kommerzielle Anforderungen müssen getrennt beurteilt werden.</p></div>
          <p>Außerdem ist der delegierte Voluntary-Standard-Akt nach dem offiziellen Stand vom 22. August 2026 noch nicht in Kraft, solange die Veröffentlichung im Amtsblatt aussteht.</p>
          <p>Die rechtliche Grundlage finden Sie in <ExternalSourceLink href={EUR_LEX_URL}>Directive (EU) 2026/470, insbesondere Artikel 29ca</ExternalSourceLink>; die konkrete 2026 Datenstruktur einschließlich Annex II im <ExternalSourceLink href={EFRAG_STANDARD_URL}>EFRAG Knowledge Hub</ExternalSourceLink>.</p>
        </ArticleSection>

        <ArticleSection id="erste-vier-stunden" number="32" title="Die ersten vier Stunden eines VSME-Projekts.">
          <p>Wenn Sie heute beginnen, sollten Sie noch keinen Bericht schreiben.</p>
          <ol className="my-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)]">
            {[
              "Berichtsjahr und berichtende Gesellschaft festlegen.",
              "Basic oder Basic + Comprehensive als Ziel definieren.",
              "B1–B11 in eine Data Map übertragen.",
              "Jeden Datenpunkt einem internen Owner zuordnen.",
              "Status vergeben: bereit, beschaffen, berechnen, bestätigen, Gap oder nicht anwendbar.",
              "Mit Energie, Scope 1, Scope 2, Wasser, Abfall und Materialströmen beginnen.",
              "Parallel Policies, Zertifikate und bestehende Dokumentation einsammeln.",
              "HR- und H&S-Daten separat strukturieren.",
              "Erst wenn die Datenbasis steht, Narrative schreiben."
            ].map((step, index) => <li className="grid grid-cols-[3rem_1fr] gap-4 bg-white p-5" key={step}><span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span><span className="font-semibold leading-6 text-ink">{step}</span></li>)}
          </ol>
          <Principle>Der schlechteste Workflow ist: Bericht von oben nach unten schreiben und bei jedem Absatz neu nach Daten suchen.</Principle>
        </ArticleSection>

        <ArticleSection id="typische-fehler" number="33" title="Welche Fehler sollten Unternehmen vermeiden?">
          <div className="my-8 rounded-[1rem] bg-ink p-6 text-white sm:p-8"><CircleAlert aria-hidden="true" className="h-8 w-8 text-orange"/><div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">{[
            ["Den Bericht vor den Daten schreiben", "Dann entstehen Aussagen, für die später keine Quelle existiert."],
            ["Alte VSME-Checkliste blind verwenden", "2026 wurde der neue Voluntary Standard angenommen. Versionsstand dokumentieren."],
            ["Nicht vorhanden und nicht anwendbar verwechseln", "Das sind unterschiedliche Situationen."],
            ["Policies nur für den Bericht produzieren", "Eine Policy sollte echte Praxis oder eine tatsächlich verabschiedete neue Verpflichtung darstellen."],
            ["Scope 1 und Scope 2 ohne Berechnungsgrundlage übernehmen", "Quellen und Faktoren erhalten."],
            ["Nur Gesamtwerte speichern", "Standort-, Zeitraum- und Quelldaten behalten."],
            ["Alles einer Person geben", "VSME-Daten gehören mehreren Fachbereichen."],
            ["Nach Veröffentlichung Arbeitsdateien löschen", "Die wiederverwendbare Datenbasis ist mindestens genauso wichtig wie der Bericht."]
          ].map(([title, body], index) => <article className="border-t border-white/18 pt-4" key={title}><p className="font-mono text-xs text-orange">0{index + 1}</p><h3 className="mt-2 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/62">{body}</p></article>)}</div></div>
        </ArticleSection>

        <ArticleSection id="externe-unterstuetzung" number="34" title="Wann externe Unterstützung sinnvoll wird.">
          <p>Ein sehr kleines Unternehmen mit einem Standort, wenigen Datenquellen und überschaubarer Organisation kann einen Basic Report durchaus selbst strukturieren.</p>
          <p>Unterstützung wird interessanter, wenn:</p>
          <BulletList items={["mehrere Produktionsstandorte vorhanden sind", "Verantwortlichkeiten intern unklar sind", "Scope 1 und Scope 2 noch berechnet werden müssen", "Abfall- oder Materialdaten aus mehreren Quellen kommen", "bestehende Policies geprüft werden müssen", "Comprehensive Reporting sinnvoll ist", "der Report gleichzeitig Kunden- und Bankanfragen bedienen soll", "aus dem Projekt eine wiederverwendbare ESG-Datenbasis entstehen soll"]}/>
          <p>Dann besteht die Arbeit nicht primär daraus, einen Nachhaltigkeitsbericht zu schreiben, sondern aus:</p>
          <Principle>Scope → Datapoints → Owner → Source → Calculation → Evidence → Review → Report</Principle>
        </ArticleSection>

        <section aria-labelledby="article-cta-title" className="my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12">
          <ClipboardCheck aria-hidden="true" className="h-7 w-7 text-orange"/>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-orange">Ihr nächster Schritt</p>
          <h2 className="font-display mt-5 max-w-[16ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]" id="article-cta-title">Sie möchten einen VSME-Bericht erstellen, aber die Daten liegen noch überall?</h2>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-white/68"><p>Senden Sie uns die vorhandenen Unternehmensinformationen und Unterlagen.</p><p>Wir strukturieren die benötigten VSME-Daten, identifizieren vorhandene Quellen und Lücken, bereiten notwendige Berechnungen vor und führen die Informationen zu einer nachvollziehbaren Berichtsgrundlage zusammen.</p></div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>VSME-Projekt anfragen</ButtonLink><ButtonLink className="w-full sm:w-auto" href="/de/vsme-nachhaltigkeitsbericht" variant="light">VSME-Nachhaltigkeitsbericht erstellen</ButtonLink></div>
          <p className="mt-6 text-sm font-semibold text-white/50">Energie · Emissionen · Abfall · Wasser · Mitarbeitende · Policies · Nachweise</p>
        </section>

        <section aria-labelledby="faq-title" className="scroll-mt-24 border-t border-[rgba(21,21,21,0.12)] py-16" id="faq">
          <p className="eyebrow">FAQ</p><h2 className="font-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-none" id="faq-title">Häufige Fragen zu den Daten für einen VSME-Bericht</h2>
          <div className="mt-9 grid gap-3">{faqItems.map((faq) => <details className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white px-5 py-5 sm:px-6" key={faq.question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold leading-6 text-ink marker:content-none">{faq.question}<span aria-hidden="true" className="text-2xl font-light text-orange transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{faq.answer}</p></details>)}</div>
        </section>

        <section aria-labelledby="sources-title" className="border-t border-[rgba(21,21,21,0.12)] pb-16 pt-12">
          <div className="flex items-center gap-3"><Link2 aria-hidden="true" className="h-4 w-4 text-orange"/><h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink" id="sources-title">Quellen &amp; weiterführende Informationen</h2></div>
          <ul className="mt-6 grid gap-6 text-sm leading-6 text-muted">
            <li><ExternalSourceLink href={COMMISSION_STATUS_URL}>Europäische Kommission — Delegierte Rechtsakte zur Nachhaltigkeitsberichterstattung</ExternalSourceLink><p className="mt-1">Offizieller Status des am 3. Juli 2026 angenommenen Voluntary Standard und Hinweis zur noch ausstehenden Inkraftsetzung.</p></li>
            <li><ExternalSourceLink href={COMMISSION_NEWS_URL}>Europäische Kommission — Annahme der überarbeiteten Standards am 3. Juli 2026</ExternalSourceLink><p className="mt-1">Zielgruppe, Zweck und Value-Chain-Cap-Kontext des Voluntary Standard.</p></li>
            <li><ExternalSourceLink href={EFRAG_STANDARD_URL}>EFRAG Knowledge Hub — 2026 Voluntary Standard</ExternalSourceLink><p className="mt-1">Aktuelle Struktur von B1–B11 und C1–C9, if-applicable-Logik, Größenunterschiede und Annex II.</p></li>
            <li><ExternalSourceLink href={EUR_LEX_URL}>EUR-Lex — Directive (EU) 2026/470</ExternalSourceLink><p className="mt-1">Rechtliche Grundlage für den freiwilligen Standard, das 1.000-Beschäftigten-Framework und den Value Chain Cap.</p></li>
            <li><ExternalSourceLink href={BMWE_DNK_URL}>Bundesministerium für Wirtschaft und Energie — Deutscher Nachhaltigkeitskodex</ExternalSourceLink><p className="mt-1">Offizieller deutscher Umsetzungskontext und staatliche Unterstützung des DNK-Angebots.</p></li>
            <li><ExternalSourceLink href={DNK_VSME_URL}>Deutscher Nachhaltigkeitskodex — VSME-Modul</ExternalSourceLink><p className="mt-1">Informationen zum kostenlosen digitalen Berichtsmodul in Deutschland.</p></li>
            <li><ExternalSourceLink href={DNK_REPORTS_URL}>Deutscher Nachhaltigkeitskodex — VSME-Berichte einsehen</ExternalSourceLink><p className="mt-1">Praktische Beispiele bereits veröffentlichter deutscher VSME-Berichte.</p></li>
          </ul>
        </section>
      </div></div>
    </article></main>
  </>;
}
