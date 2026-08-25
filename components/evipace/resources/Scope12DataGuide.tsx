import type { ReactNode } from "react";
import {
  Calculator,
  CircleAlert,
  ExternalLink,
  Factory,
  FileCheck2,
  Flame,
  Fuel,
  Gauge,
  Link2,
  Snowflake,
  Table2,
  Zap
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";

const CORPORATE_STANDARD_URL = "https://ghgprotocol.org/corporate-standard";
const CORPORATE_FAQ_URL =
  "https://ghgprotocol.org/corporate-standard-frequently-asked-questions";
const SCOPE_2_GUIDANCE_URL = "https://ghgprotocol.org/scope-2-guidance";
const SCOPE_2_FAQ_URL =
  "https://ghgprotocol.org/scope-2-frequently-asked-questions";
const UBA_ELECTRICITY_URL =
  "https://www.umweltbundesamt.de/publikationen/entwicklung-der-spezifischen-treibhausgas-0";
const STANDARDS_UPDATE_URL =
  "https://ghgprotocol.org/blog/ghg-protocol-announces-key-standard-development-updates";
const STANDARDS_UPDATE_FAQ_URL =
  "https://ghgprotocol.org/blog/ghg-protocol-announces-key-standard-development-updates-faq-resource";

const scopeOneChecks = [
  ["01", "Stationäre Brennstoffe", "Erdgas, Heizöl, Flüssiggas, Generator-Diesel und andere Brennstoffe in Anlagen, Öfen oder Heizungen."],
  ["02", "Eigener beziehungsweise kontrollierter Fuhrpark", "Diesel, Benzin und andere Kraftstoffe."],
  ["03", "Kältemittel", "Verwendeter Kältemitteltyp und nachgefüllte beziehungsweise verlorene Menge."],
  ["04", "Direkte Prozessemissionen", "Falls diese im Produktionsprozess tatsächlich auftreten."]
] as const;

const scopeTwoChecks = [
  ["05", "Eingekaufter Strom", "kWh pro Standort, Zeitraum, Lieferant, Tarif beziehungsweise Beschaffungsinformation."],
  ["06", "Eingekaufte Wärme, Kälte oder Dampf", "Falls diese Energieformen vorhanden sind."]
] as const;

const sharedChecks = [
  ["07", "Bilanzgrenze", "Welche Gesellschaften, Standorte und Anlagen gehören in die Berechnung?"],
  ["08", "Berichtszeitraum", "Zum Beispiel 1. Januar bis 31. Dezember 2025."],
  ["09", "Quellen und Einheiten", "Rechnung, Zählerwert, Tankkarte, ERP-Auswertung oder Wartungsprotokoll – plus verwendete Einheit."],
  ["10", "Emissionsfaktor und Version", "Welcher Faktor wurde für welchen Datenpunkt verwendet?"]
] as const;

const stationaryRows = [
  ["Erdgas", "kWh, m³ oder andere Abrechnungseinheit", "Gasrechnung"],
  ["Heizöl", "Liter", "Lieferrechnung / Tankbuch"],
  ["Flüssiggas", "kg / Liter", "Lieferantenrechnung"],
  ["Diesel Generator", "Liter", "Tankbeleg / internes Verbrauchsregister"],
  ["andere Brennstoffe", "Menge + Einheit", "Einkauf / Produktion"]
] as const;

const electricityRows = [
  ["Standort", "Werk München"],
  ["Zeitraum", "2025"],
  ["Verbrauch", "842.000 kWh"],
  ["Quelle", "Jahresabrechnung"],
  ["Lieferant", "Energieversorger X"],
  ["Tarif / Produkt", "Vertrag Y"],
  ["Beschaffungsnachweis", "falls relevant vorhanden"]
] as const;

const rawDataRows = [
  ["1", "Erdgas Heizung", "Werk A", "420.000", "kWh", "Gasrechnung", "bereit"],
  ["1", "Diesel Fuhrpark", "Unternehmen", "18.400", "Liter", "Tankkarten", "bereit"],
  ["1", "Kältemittel R410A", "Werk A", "2,5", "kg", "Servicebericht", "prüfen"],
  ["2", "Strom", "Werk A", "680.000", "kWh", "Jahresrechnung", "bereit"],
  ["2", "Strom", "Werk B", "310.000", "kWh", "Monatsrechnungen", "prüfen"],
  ["2", "Fernwärme", "Büro", "42", "MWh", "Abrechnung", "ergänzen"]
] as const;

const faqItems = [
  { question: "Welche Daten brauche ich für Scope 1?", answer: "Typischerweise benötigen Sie Daten zu Brennstoffen in eigenen oder kontrollierten Anlagen, Kraftstoffverbrauch im relevanten Fuhrpark, Kältemitteln und – falls für Ihr Unternehmen relevant – direkten Prozessemissionen. Welche Quellen enthalten sind, hängt von Ihrer organisatorischen Bilanzgrenze ab." },
  { question: "Welche Daten brauche ich für Scope 2?", answer: "Vor allem den Verbrauch eingekaufter Elektrizität sowie – falls vorhanden – eingekaufter Wärme, Kälte und Dampf. Zusätzlich können für market-based Scope 2 Informationen über Energieverträge und geeignete vertragliche Instrumente erforderlich sein." },
  { question: "Reichen Strom- und Gasrechnungen?", answer: "Für einfache Unternehmen können sie einen großen Teil der benötigten Aktivitätsdaten liefern. Zusätzlich sollten jedoch beispielsweise Fuhrpark, Kältemittel, weitere Brennstoffe, Wärme/Kälte/Dampf und mögliche Prozessemissionen geprüft werden." },
  { question: "Brauche ich die Rechnungsbeträge in Euro?", answer: "Für emissionsbasierte Berechnungen sind physische Aktivitätsdaten wie kWh, Liter, kg oder MWh normalerweise wesentlich geeigneter. GHG Protocol beschreibt Aktivitätsdaten in Kombination mit Emissionsfaktoren als verbreiteten Berechnungsansatz." },
  { question: "Gehören Kältemittel zu Scope 1?", answer: "Fugitive Emissionen aus Kühl- und Klimaanlagen können Scope-1-Emissionen sein. Deshalb sollten Kältemitteltyp und relevante Mengen aus Wartungs- oder Serviceunterlagen geprüft werden." },
  { question: "Gehört Ökostrom zu Scope 2?", answer: "Ja, der Stromverbrauch bleibt Teil der Scope-2-Betrachtung. Wie die Emissionen bilanziert werden, hängt unter anderem von location-based und market-based Methodik sowie den vorhandenen contractual instruments ab." },
  { question: "Muss ich Scope 2 location-based und market-based berechnen?", answer: "Die aktuelle GHG Protocol Scope 2 Guidance sieht dual reporting für Unternehmen in Märkten vor, in denen produkt- oder lieferantenspezifische Daten über geeignete contractual instruments verfügbar sind. Welche Anforderungen für Ihren konkreten Bericht gelten, hängt zusätzlich vom verwendeten Reporting Framework beziehungsweise Kundenrequest ab." },
  { question: "Was mache ich, wenn Verbrauchsdaten fehlen?", answer: "Zuerst sollte nach alternativen Primärquellen gesucht werden. Wenn Daten tatsächlich fehlen, kann je nach Quelle eine transparente Schätzung oder Proxy-Methode erforderlich sein. Die Annahme sollte dokumentiert werden und nicht als gemessener Wert dargestellt werden." },
  { question: "Ist Scope 1 plus Scope 2 mein gesamter CO₂-Fußabdruck?", answer: "Nicht zwingend. Scope 3 umfasst weitere indirekte Emissionen entlang der vor- und nachgelagerten Wertschöpfungskette und kann je nach Unternehmen erhebliche zusätzliche Quellen enthalten." },
  { question: "Garantiert evipace, dass ein Kunde die Berechnung akzeptiert?", answer: "Nein. Evipace kann die Berechnung strukturiert vorbereiten und Quellen, Faktoren, Annahmen und Datenlücken dokumentieren. Die konkreten Anforderungen und die finale Akzeptanz liegen jedoch beim jeweiligen Kunden, Standard, Assessment oder Empfänger." }
];

function ExternalSourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange" href={href} rel="noreferrer" target="_blank">{children}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /></a>;
}

function BulletList({ items }: { items: string[] }) {
  return <ul className="mt-6 grid gap-3">{items.map((item) => <li className="flex gap-3 leading-7 text-muted" key={item}><span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" /><span>{item}</span></li>)}</ul>;
}

function ArticleSection({ children, id, number, title }: { children: ReactNode; id: string; number: string; title: string }) {
  return <section aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-[rgba(21,21,21,0.12)] py-14 sm:py-16" id={id}><div className="flex items-start gap-4 sm:gap-6"><span className="mt-1 font-mono text-xs font-bold tracking-[0.15em] text-orange">{number}</span><h2 className="font-display max-w-[20ch] text-[clamp(2.15rem,4.1vw,3.7rem)] leading-[1.02]" id={`${id}-title`}>{title}</h2></div><div className="resource-prose mt-8 sm:pl-[3.35rem]">{children}</div></section>;
}

function Principle({ label, children }: { label?: string; children: ReactNode }) {
  return <div className="my-8 rounded-[1.1rem] bg-ink p-7 text-white sm:p-8">{label ? <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">{label}</p> : null}<p className={`font-display text-[clamp(1.8rem,4vw,3.05rem)] leading-[1.1] ${label ? "mt-4" : ""}`}>{children}</p></div>;
}

function StatusPill({ status }: { status: string }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.06em] ${status === "bereit" ? "border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] text-[#b94f00]" : "border-[rgba(21,21,21,0.16)] bg-[rgba(21,21,21,0.05)] text-ink"}`}>{status}</span>;
}

function SimpleResponsiveTable({ caption, headers, rows, marker }: { caption: string; headers: string[]; rows: readonly (readonly string[])[]; marker: string }) {
  return <div className="mt-8" data-table={marker}><div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block"><div className="overflow-x-auto"><table className="w-full min-w-[720px] border-collapse text-left text-sm"><caption className="sr-only">{caption}</caption><thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]"><tr>{headers.map((heading) => <th className="border-b border-[rgba(21,21,21,0.12)] px-4 py-4 font-bold" key={heading} scope="col">{heading}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0" key={`${row[0]}-${rowIndex}`}>{row.map((value, index) => index === 0 ? <th className="px-4 py-5 font-bold text-ink" key={`${value}-${index}`} scope="row">{value}</th> : <td className="px-4 py-5 text-muted" key={`${value}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div></div><div className="grid gap-4 md:hidden">{rows.map((row, rowIndex) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5" key={`${row[0]}-${rowIndex}`}><h3 className="border-b border-[rgba(21,21,21,0.1)] pb-4 font-bold text-ink">{row[0]}</h3><dl className="mt-4 grid gap-3 text-sm">{headers.slice(1).map((label, index) => <div className="grid grid-cols-[6.9rem_1fr] gap-3" key={label}><dt className="font-semibold text-[rgba(21,21,21,0.56)]">{label}</dt><dd className="min-w-0 break-words text-ink">{row[index + 1]}</dd></div>)}</dl></article>)}</div></div>;
}

function RawDataTable() {
  const headers = ["Scope", "Emissionsquelle", "Standort", "Aktivitätswert", "Einheit", "Datenquelle", "Status"];
  return <div className="mt-8" data-scope12-raw-data-table><div className="resource-answer-map hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block"><div className="overflow-x-auto"><table className="w-full min-w-[1020px] border-collapse text-left text-sm"><caption className="sr-only">Beispiel einer Datenerfassungstabelle für Scope 1 und Scope 2</caption><thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]"><tr>{headers.map((heading) => <th className="border-b border-[rgba(21,21,21,0.12)] px-4 py-4 font-bold" key={heading} scope="col">{heading}</th>)}</tr></thead><tbody>{rawDataRows.map((row, rowIndex) => <tr className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0" key={`${row[1]}-${rowIndex}`}>{row.slice(0, 6).map((value, index) => index === 0 ? <th className="px-4 py-5 font-bold text-orange" key={`${value}-${index}`} scope="row">Scope {value}</th> : <td className="px-4 py-5 text-muted" key={`${value}-${index}`}>{value}</td>)}<td className="px-4 py-5"><StatusPill status={row[6]} /></td></tr>)}</tbody></table></div></div><div className="grid gap-4 md:hidden">{rawDataRows.map((row, rowIndex) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5" key={`${row[1]}-${rowIndex}`}><div className="flex items-start justify-between gap-3 border-b border-[rgba(21,21,21,0.1)] pb-4"><div><p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-orange">Scope {row[0]}</p><h3 className="mt-2 font-bold text-ink">{row[1]}</h3></div><StatusPill status={row[6]} /></div><dl className="mt-4 grid gap-3 text-sm">{headers.slice(2, 6).map((label, index) => <div className="grid grid-cols-[6.9rem_1fr] gap-3" key={label}><dt className="font-semibold text-[rgba(21,21,21,0.56)]">{label}</dt><dd className="min-w-0 break-words text-ink">{row[index + 2]}</dd></div>)}</dl></article>)}</div></div>;
}

function DataArtwork() {
  return <div aria-hidden="true" className="resource-hero-art"><svg className="resource-hero-art__sheet" fill="none" viewBox="0 0 520 650" xmlns="http://www.w3.org/2000/svg"><path d="M72 72H444V590H72V72Z" fill="currentColor" fillOpacity="0.018" stroke="currentColor" strokeWidth="2"/><path d="M72 160H444M72 248H444M72 336H444M72 424H444M72 512H444M182 72V590M324 72V590" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2"/><circle cx="182" cy="160" fill="#FE7001" r="12"/><circle cx="324" cy="248" fill="#FE7001" r="12"/><circle cx="182" cy="424" fill="#FE7001" r="12"/><text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2" x="72" y="44">ACTIVITY DATA</text></svg><span className="resource-hero-art__code">BOUNDARY · PERIOD · SOURCE · UNIT</span></div>;
}

export function Scope12DataGuide() {
  return <><main id="top"><article><header aria-labelledby="article-title" className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28"><DataArtwork/><div className="site-shell relative z-10"><nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"><Link className="transition hover:text-orange" href="/de">Startseite</Link><span aria-hidden="true">/</span><Link className="transition hover:text-orange" href="/de/ressourcen">Ressourcen</Link><span aria-hidden="true">/</span><span className="text-ink">Scope-1-&amp;-2-Datenerfassung</span></nav><div className="mt-12 max-w-6xl"><p className="eyebrow">Scope 1 &amp; 2 · Datenerfassung</p><h1 className="font-display mt-7 max-w-[17ch] text-[clamp(3.15rem,7vw,6.55rem)] leading-[0.91]" id="article-title">Scope 1 und Scope 2: Welche Daten braucht man für die Berechnung?</h1></div><div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16"><div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted"><p>Sie sollen die Scope-1- und Scope-2-Emissionen Ihres Unternehmens angeben.</p><p className="mt-6">Vielleicht für einen Kunden. Vielleicht für einen ESG-Fragebogen. Vielleicht für EcoVadis, IntegrityNext oder einen Nachhaltigkeitsbericht.</p><p className="font-display mt-7 text-3xl leading-tight text-ink">„Wir haben diese CO₂-Zahlen noch gar nicht.“</p><p className="mt-6">Das bedeutet nicht automatisch, dass die Berechnung nicht möglich ist. Für den Einstieg brauchen Sie meistens zuerst die Aktivitätsdaten, aus denen Emissionen berechnet werden.</p></div><aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7"><Calculator aria-hidden="true" className="h-8 w-8 text-orange"/><p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">Danach kommt die Berechnung</p><p className="font-display mt-4 text-3xl leading-tight text-ink">Aktivitätsdaten × geeigneter Emissionsfaktor</p><p className="mt-4 text-sm leading-7 text-muted">→ Treibhausgasemissionen</p></aside></div><div className="mt-14 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"><div className="grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:gap-12"><div><span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-orange">Die eigentliche Frage</span><p className="font-display mt-4 text-3xl leading-[1.08]">Welche Quellen gehören überhaupt in Scope 1 und Scope 2?</p></div><div className="grid gap-2 self-center text-sm font-semibold text-muted sm:grid-cols-2">{["Kilowattstunden Erdgas", "Liter Diesel und Heizöl", "Stromverbrauch in kWh", "eingekaufte Fernwärme", "Kältemitteltyp", "nachgefüllte Kältemittelmenge"].map((item) => <span className="rounded-[0.75rem] bg-[var(--paper)] px-3 py-2.5" key={item}>{item}</span>)}</div></div></div></div></header>

          <section aria-labelledby="quick-answer-title" className="scroll-mt-24 bg-ink py-20 text-white sm:py-24" id="schnellantwort"><div className="site-shell"><div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16"><div><p className="eyebrow">Quick Answer</p><h2 className="font-display mt-6 max-w-[14ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]" id="quick-answer-title">Für Scope 1 und Scope 2 sollten Sie zuerst diese Daten sammeln.</h2></div><div className="grid gap-10"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-orange">Scope 1 · Direkte Quellen</p><ol className="mt-5 grid gap-5 sm:grid-cols-2">{scopeOneChecks.map(([number,title,body]) => <li className="border-t border-white/20 pt-4" key={number}><span className="font-mono text-xs text-orange">{number}</span><h3 className="mt-2 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{body}</p></li>)}</ol></div><div><p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-orange">Scope 2 · Eingekaufte Energie</p><ol className="mt-5 grid gap-5 sm:grid-cols-2">{scopeTwoChecks.map(([number,title,body]) => <li className="border-t border-white/20 pt-4" key={number}><span className="font-mono text-xs text-orange">{number}</span><h3 className="mt-2 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{body}</p></li>)}</ol></div><div><p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-orange">Für beide Scopes</p><ol className="mt-5 grid gap-5 sm:grid-cols-2">{sharedChecks.map(([number,title,body]) => <li className="border-t border-white/20 pt-4" key={number}><span className="font-mono text-xs text-orange">{number}</span><h3 className="mt-2 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/65">{body}</p></li>)}</ol></div></div></div><div className="mt-14 border-t border-white/15 pt-9"><p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">Nicht mit CO₂-Zahlen anfangen.</p><p className="font-display mt-5 text-[clamp(2.1rem,5vw,4.2rem)] leading-none">Beginnen Sie mit einer vollständigen Liste Ihrer Emissionsquellen.</p></div></div></section>

          <div className="site-shell grid items-start gap-12 py-10 lg:grid-cols-[15rem_minmax(0,55rem)] lg:justify-center lg:gap-16 lg:py-16"><aside className="hidden lg:block"><nav aria-label="Inhalt des Leitfadens" className="sticky top-28 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[rgba(255,255,255,0.72)] p-5 backdrop-blur"><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Im Leitfaden</p><ol className="mt-5 grid gap-3 text-sm font-semibold leading-5 text-[rgba(21,21,21,0.62)]">{[["02","Bilanzgrenze","#bilanzgrenze"],["04","Stationäre Verbrennung","#stationaere-verbrennung"],["08","Kältemittel","#kaeltemittel"],["10","Scope-2-Strom","#scope-2-strom"],["12","Location / Market","#location-market"],["16","Datentabelle","#datenerfassungstabelle"],["18","Audit Trail","#originalunterlagen"],["24","Erste zwei Stunden","#erste-zwei-stunden"],["25","Methodik-Update","#methodik-update"]].map(([number,label,href]) => <li key={href}><a className="group flex gap-3 transition hover:text-ink" href={href}><span className="font-mono text-[0.65rem] text-orange">{number}</span><span>{label}</span></a></li>)}</ol></nav></aside><div className="min-w-0">
            <ArticleSection id="scope-kurz-erklaert" number="01" title="Scope 1 und Scope 2 kurz erklärt.">
              <p>Nach dem Greenhouse Gas Protocol sind Scope-1-Emissionen direkte Treibhausgasemissionen aus Quellen, die dem berichtenden Unternehmen gehören oder von ihm kontrolliert werden.</p>
              <p>Scope 2 umfasst indirekte Emissionen aus der Erzeugung von eingekaufter oder anderweitig bezogener und vom Unternehmen verbrauchter Elektrizität, Wärme, Kälte und Dampf.</p>
              <div className="my-8 grid gap-4 sm:grid-cols-2">
                <article className="rounded-[1rem] bg-[var(--soft-orange)] p-6"><Flame aria-hidden="true" className="h-7 w-7 text-orange"/><p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-orange">Scope 1</p><h3 className="font-display mt-2 text-3xl">Emission entsteht bei Ihnen.</h3><p className="mt-4 text-sm leading-6 text-muted">Beispiel: Gas wird in Ihrem Heizkessel verbrannt.</p></article>
                <article className="rounded-[1rem] bg-[rgba(21,21,21,0.05)] p-6"><Zap aria-hidden="true" className="h-7 w-7 text-orange"/><p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-orange">Scope 2</p><h3 className="font-display mt-2 text-3xl">Energie wird bei Ihnen verbraucht.</h3><p className="mt-4 text-sm leading-6 text-muted">Die Emission entsteht bei der Erzeugung außerhalb Ihres Unternehmens – etwa bei Strom aus dem öffentlichen Netz.</p></article>
              </div>
              <p>Diese Unterscheidung klingt einfach. In der Praxis wird sie erst dann sauber, wenn vorher geklärt wurde: Was gehört überhaupt zur Unternehmensbilanz?</p>
              <p>Wenn die Anfrage aus einem Kundenfragebogen stammt, hilft zusätzlich der Leitfaden <Link href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">ESG-Fragebogen vom Kunden erhalten – was jetzt?</Link>.</p>
            </ArticleSection>

            <ArticleSection id="bilanzgrenze" number="02" title="Bevor Sie Daten sammeln: Legen Sie die Bilanzgrenze fest.">
              <p>Ein häufiger Fehler ist, sofort Strom- und Gasrechnungen zusammenzurechnen. Vorher sollten Sie klären, welche Organisation eigentlich bilanziert wird.</p>
              <BulletList items={["nur eine juristische Gesellschaft oder mehrere Gesellschaften", "ein bestimmter Produktionsstandort oder mehrere Werke", "gemietete Standorte", "eigener Fuhrpark oder geleaste Fahrzeuge", "eigene oder fremdbetriebene Anlagen"]}/>
              <p>Der GHG Protocol Corporate Standard kennt verschiedene Ansätze zur organisatorischen Konsolidierung:</p>
              <div className="my-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)] sm:grid-cols-3">
                {["Equity Share", "Financial Control", "Operational Control"].map((item) => <div className="bg-white p-5 font-bold text-ink" key={item}>{item}</div>)}
              </div>
              <p>Der gewählte Ansatz beeinflusst, welche Aktivitäten innerhalb Ihrer Scope-1- und Scope-2-Grenze liegen, und sollte konsistent angewendet werden.</p>
              <Principle label="Praktische Frage">Welche Standorte, Anlagen und Aktivitäten gehören nach unserer gewählten Bilanzlogik tatsächlich zu diesem Inventory?</Principle>
              <p>Erst danach wissen Sie, welche Rechnungen Sie sammeln müssen. Die methodische Grundlage beschreibt der <ExternalSourceLink href={CORPORATE_STANDARD_URL}>GHG Protocol Corporate Standard</ExternalSourceLink>.</p>
            </ArticleSection>

            <ArticleSection id="berichtszeitraum" number="03" title="Definieren Sie einen eindeutigen Berichtszeitraum.">
              <p>Die zweite Grundentscheidung lautet: Für welches Jahr rechnen wir?</p>
              <div className="my-8 rounded-[1rem] border-l-4 border-orange bg-white p-6 shadow-lift"><p className="font-mono text-sm font-bold tracking-[0.08em] text-ink">01.01.2025 – 31.12.2025</p><p className="mt-2 text-sm text-muted">Oder bei abweichendem Geschäftsjahr der tatsächliche Unternehmenszeitraum.</p></div>
              <p>Danach sollten Strom, Gas, Kraftstoffe, Wärme, Kältemittel und Prozessemissionen möglichst denselben Zeitraum abdecken.</p>
              <p>Achten Sie besonders auf Rechnungen, die Zeiträume überschneiden. Umfasst eine Gasrechnung den Zeitraum 15.12.2024 bis 14.01.2025, sollte nicht automatisch der komplette Wert dem Jahr 2025 zugerechnet werden.</p>
              <p>Das Ziel ist eine Berechnung, bei der klar bleibt, welcher Verbrauch welchem Zeitraum zugeordnet wurde.</p>
            </ArticleSection>

            <ArticleSection id="stationaere-verbrennung" number="04" title="Scope 1: Beginnen Sie mit stationärer Verbrennung.">
              <div className="flex items-center gap-4 rounded-[1rem] bg-[var(--soft-orange)] p-5"><Factory aria-hidden="true" className="h-8 w-8 shrink-0 text-orange"/><p className="font-semibold text-ink">Für viele Produktionsunternehmen ist das die erste große Scope-1-Datenquelle.</p></div>
              <p>Dazu gehören Brennstoffe, die in eigenen oder kontrollierten stationären Anlagen verbrannt werden – etwa in Heizkesseln, Öfen, Brennern, Generatoren, Trocknungsanlagen oder bestimmten Produktionsanlagen.</p>
              <p>GHG Protocol führt stationary combustion als eine der zentralen Scope-1-Quellkategorien.</p>
              <SimpleResponsiveTable caption="Typische Aktivitätsdaten für stationäre Verbrennung" headers={["Quelle", "Aktivitätsdaten", "Mögliche Datenquelle"]} marker="stationary-combustion" rows={stationaryRows}/>
              <Principle label="Wichtig">Nicht nur Eurobeträge sammeln.</Principle>
              <p>Eine Rechnung über 18.430 € Erdgas ist deutlich schlechtere Ausgangsbasis als der tatsächlich abgerechnete Energieverbrauch.</p>
            </ArticleSection>

            <ArticleSection id="brennstoffdaten" number="05" title="Wo finden Sie Brennstoffdaten?">
              <p>Bei kleineren Unternehmen liegen diese Informationen häufig nicht in einem ESG-System, sondern verteilt im Unternehmen.</p>
              <div className="my-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Buchhaltung", "Energie- und Lieferantenrechnungen, Heizöllieferungen, Kraftstoffrechnungen"],
                  ["Facility Management", "Zählerstände, Heizungsdaten, Tankstände, Anlageninformationen"],
                  ["Produktion", "Verbräuche bestimmter Maschinen oder Prozesse, interne Energieaufzeichnungen"],
                  ["Energiemanagement", "strukturierte Verbrauchsdaten, Messstellen und Standortdaten – falls vorhanden"]
                ].map(([title, body]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] p-5" key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></article>)}
              </div>
              <p>Die beste Datenquelle ist nicht automatisch dieselbe in jedem Unternehmen. Wenn beispielsweise ein geeichter Zähler einen belastbaren Jahresverbrauch liefert, kann dieser geeigneter sein als das manuelle Addieren einzelner Monatsrechnungen.</p>
            </ArticleSection>

            <ArticleSection id="mobile-verbrennung" number="06" title="Scope 1: Fuhrpark und mobile Verbrennung.">
              <p>Kraftstoff, der in Fahrzeugen verbrannt wird, die innerhalb Ihrer gewählten Unternehmensgrenze liegen, kann Scope 1 sein. GHG Protocol führt mobile combustion als eigene direkte Emissionsquelle.</p>
              <div className="my-8 rounded-[1rem] bg-ink p-7 text-white"><Fuel aria-hidden="true" className="h-8 w-8 text-orange"/><div className="mt-6 grid gap-7 sm:grid-cols-2"><div><h3 className="font-bold">Typische Daten</h3><p className="mt-3 text-sm leading-7 text-white/65">Diesel, Benzin, LPG, CNG oder andere Kraftstoffe – jeweils in der passenden physischen Einheit.</p></div><div><h3 className="font-bold">Mögliche Quellen</h3><p className="mt-3 text-sm leading-7 text-white/65">Tankkartenabrechnungen, Kraftstoffrechnungen, Fuhrparkmanagement, Tankbelege und Flottenauswertungen.</p></div></div></div>
              <p>Am besten ist normalerweise die tatsächlich verbrauchte Kraftstoffmenge nach Kraftstoffart. Wenn diese nicht verfügbar ist, können je nach Methodik andere Ansätze notwendig werden – beispielsweise auf Basis von Fahrleistung und Fahrzeugdaten.</p>
              <p>GHG Protocol nennt für mobile Verbrennung sowohl fuel- als auch distance-based data als mögliche Grundlagen. Weitere fachliche Erläuterungen enthält die <ExternalSourceLink href={CORPORATE_FAQ_URL}>Corporate Standard FAQ</ExternalSourceLink>.</p>
            </ArticleSection>

            <ArticleSection id="elektrofahrzeuge" number="07" title="Elektrofahrzeuge sind nicht einfach „Scope 1 = null und fertig“.">
              <p>Ein Elektrofahrzeug verbrennt im Fahrzeug selbst keinen Benzin- oder Dieselkraftstoff. Deshalb entstehen dort keine entsprechenden direkten Verbrennungsemissionen.</p>
              <div className="my-8 grid items-center gap-3 rounded-[1rem] border border-[rgba(21,21,21,0.11)] p-6 text-center sm:grid-cols-[1fr_auto_1fr]"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Scope 1</p><p className="mt-2 font-bold">kein Dieselverbrauch</p></div><span aria-hidden="true" className="font-display text-3xl text-orange">→</span><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Scope 2</p><p className="mt-2 font-bold">möglicher Ladestrom</p></div></div>
              <p>Wenn das Unternehmen Strom zum Laden bezieht, gehört dieser Energieverbrauch – soweit innerhalb der gewählten Unternehmensgrenze – grundsätzlich in die Betrachtung der eingekauften Elektrizität.</p>
              <p>Verhindern Sie, dass der Ladeverbrauch komplett vergessen oder gleichzeitig zweimal im Gebäude- und Fahrzeugstrom erfasst wird.</p>
            </ArticleSection>

            <ArticleSection id="kaeltemittel" number="08" title="Scope 1: Kältemittel werden besonders häufig vergessen.">
              <p>Für viele Produktionsunternehmen ist das einer der klassischen blinden Flecken. GHG Protocol zählt fugitive emissions ausdrücklich zu Scope 1 und nennt unter anderem Emissionen aus Kühl- und Klimaanlagen.</p>
              <div className="my-8 rounded-[1rem] bg-[#eaf6f7] p-7"><Snowflake aria-hidden="true" className="h-8 w-8 text-[#137b83]"/><div className="mt-6 grid gap-5 sm:grid-cols-2"><div><h3 className="font-bold">Relevant können sein</h3><p className="mt-2 text-sm leading-7 text-muted">Klimaanlagen, Kälteanlagen, Wärmepumpen, Produktionskühlung, Kühlräume und andere technische Anlagen.</p></div><div><h3 className="font-bold">Typische Quellen</h3><p className="mt-2 text-sm leading-7 text-muted">Wartungsprotokoll, Servicebericht, Kältemittelbuch oder Rechnung des Kälte-/Klimatechnikers.</p></div></div></div>
              <p>Sie brauchen typischerweise den genauen Kältemitteltyp, die relevante Menge in kg, den Zeitraum und die Originalquelle.</p>
              <Principle>„Klimaservice 940 €“ reicht nicht. Entscheidend ist: Welches Kältemittel – und wie viele Kilogramm?</Principle>
            </ArticleSection>

            <ArticleSection id="prozessemissionen" number="09" title="Scope 1: Gibt es direkte Prozessemissionen?">
              <p>Nicht jedes Produktionsunternehmen hat relevante Prozessemissionen. Bei manchen Branchen sind sie aber wesentlich.</p>
              <p>GHG Protocol unterscheidet neben stationärer und mobiler Verbrennung auch process emissions, also direkte Emissionen aus physikalischen oder chemischen Produktionsprozessen.</p>
              <BulletList items={["Entstehen Treibhausgase direkt durch einen Produktionsprozess?", "Werden relevante Industriegase eingesetzt?", "Gibt es chemische Reaktionen, die Treibhausgase freisetzen?"]}/>
              <p>Für viele typische kleinere Fertigungsunternehmen lautet die Antwort möglicherweise „nein“ beziehungsweise „nicht wesentlich“. Aber dieser Punkt sollte geprüft und nicht einfach vergessen werden.</p>
            </ArticleSection>

            <ArticleSection id="scope-2-strom" number="10" title="Scope 2: Stromverbrauch pro Standort sammeln.">
              <p>Für die meisten Unternehmen ist eingekaufter Strom die wichtigste Scope-2-Quelle. GHG Protocol definiert Scope 2 als Emissionen aus der Erzeugung eingekaufter oder bezogener Elektrizität, Wärme, Kälte und Dampf, die das Unternehmen verbraucht.</p>
              <SimpleResponsiveTable caption="Benötigte Stromdaten pro Standort" headers={["Datenpunkt", "Beispiel"]} marker="scope2-electricity" rows={electricityRows}/>
              <p>Bei mehreren Standorten sollten Sie nicht sofort alles zusammenwerfen. Besser ist zunächst:</p>
              <Principle>Standort → Stromverbrauch → Lieferant → Vertrag → Zeitraum</Principle>
              <p>So können unterschiedliche Netze, Länder oder Beschaffungsverträge sauber behandelt werden. Die fachliche Einordnung finden Sie in der <ExternalSourceLink href={SCOPE_2_GUIDANCE_URL}>GHG Protocol Scope 2 Guidance</ExternalSourceLink>.</p>
            </ArticleSection>

            <ArticleSection id="waerme-kaelte-dampf" number="11" title="Scope 2 besteht nicht nur aus Strom.">
              <p>Prüfen Sie zusätzlich Fernwärme, Fernkälte, eingekauften Dampf und andere extern erzeugte und eingekaufte Energieformen, die unter Scope 2 fallen.</p>
              <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{["Fernwärme", "Fernkälte", "Dampf", "weitere Energie"].map((item) => <div className="rounded-[0.85rem] border border-[rgba(21,21,21,0.11)] bg-white p-4 text-center text-sm font-bold text-ink" key={item}>{item}</div>)}</div>
              <p>Typische Aktivitätsdaten sind kWh, MWh, GJ oder eine andere gelieferte Energiemenge. Mögliche Quellen sind Versorgerrechnungen, Wärmezähler, Nebenkostenabrechnungen, Energieverträge oder Standortabrechnungen.</p>
              <Principle label="Datenminimum">Menge + Einheit + Zeitraum + Standort + Quelle</Principle>
            </ArticleSection>

            <ArticleSection id="location-market" number="12" title="Location-based und market-based: Warum brauchen Sie mehr als nur die Strommenge?">
              <p>Bei Scope 2 gibt es einen wichtigen methodischen Unterschied.</p>
              <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Location-based</p><p className="mt-4 leading-7 text-muted">Die Berechnung basiert auf der durchschnittlichen Emissionsintensität des Stromnetzes beziehungsweise der relevanten geografischen Region.</p></article><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Market-based</p><p className="mt-4 leading-7 text-muted">Soweit die Voraussetzungen erfüllt sind, werden geeignete vertragliche Instrumente beziehungsweise lieferantenspezifische Beschaffungsinformationen berücksichtigt.</p></article></div>
              <p>Die aktuelle GHG Protocol Scope 2 Guidance enthält deshalb zwei Methoden und Qualitätskriterien für contractual instruments.</p>
              <p>Für Strom sollten Sie neben der Verbrauchsmenge auch Lieferant, Produkt, lieferantenspezifische Emissionsinformationen, geeignete Energieattribute, geografische Region und Datenqualität prüfen.</p>
              <p>Stromverbrauch ist der gemeinsame Ausgangspunkt. Der verwendete Emissionsfaktor kann sich je nach Methode unterscheiden. Praktische methodische Antworten bietet die <ExternalSourceLink href={SCOPE_2_FAQ_URL}>GHG Protocol Scope 2 FAQ</ExternalSourceLink>.</p>
            </ArticleSection>

            <ArticleSection id="oekostrom" number="13" title="„Wir haben Ökostrom“ ist noch keine vollständige Scope-2-Berechnung.">
              <p>Eine häufige Aussage lautet: „Unser Strom ist 100 % grün, also ist Scope 2 null.“ So pauschal sollte man nicht rechnen.</p>
              <p>GHG Protocol stellt Anforderungen an vertragliche Instrumente, die für market-based Scope-2-Accounting verwendet werden können. Für location-based reporting bleibt außerdem die netzbezogene Emissionsintensität relevant.</p>
              <p>Bei einem Grünstromvertrag sollten Sie mindestens dokumentieren:</p>
              <BulletList items={["Verbrauch", "Lieferant", "Vertrags- und Produktinformationen", "relevante Energieattribute beziehungsweise Nachweise", "Zeitraum", "verwendete Berechnungsmethode"]}/>
              <Principle>Nicht einfach „Ökostrom = 0“ in eine Excel-Zelle schreiben.</Principle>
            </ArticleSection>

            <ArticleSection id="stromfaktor-deutschland" number="14" title="Welchen Strom-Emissionsfaktor soll man in Deutschland verwenden?">
              <p>Dafür gibt es nicht eine Zahl, die für jedes Unternehmen, jedes Jahr und jede Scope-2-Methode automatisch richtig ist. Für location-based Berechnungen sind relevante Netz- beziehungsweise Strommixfaktoren wichtig.</p>
              <p>Das Umweltbundesamt veröffentlicht regelmäßig Daten und Methodik zu den spezifischen Emissionen des deutschen Strommixes und aktualisierte die entsprechende Reihe für 2025 im März 2026.</p>
              <div className="my-8 rounded-[1rem] border border-[rgba(254,112,1,0.24)] bg-[var(--soft-orange)] p-6"><Gauge aria-hidden="true" className="h-7 w-7 text-orange"/><h3 className="mt-5 font-bold">Dokumentieren Sie den Faktor vollständig</h3><dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="font-bold text-ink">Quelle</dt><dd className="mt-1 leading-6 text-muted">Zum Beispiel Umweltbundesamt oder eine andere fachlich geeignete Quelle.</dd></div><div><dt className="font-bold text-ink">Version / Jahr</dt><dd className="mt-1 leading-6 text-muted">Welcher Datensatz wurde verwendet?</dd></div><div><dt className="font-bold text-ink">Einheit</dt><dd className="mt-1 leading-6 text-muted">Zum Beispiel g/kWh oder kg/kWh.</dd></div><div><dt className="font-bold text-ink">Methodischer Kontext</dt><dd className="mt-1 leading-6 text-muted">CO₂ oder CO₂e, Systemgrenze und Scope-2-Methode.</dd></div></dl></div>
              <p>Ein Emissionsfaktor ohne Quellenangabe ist später kaum nachvollziehbar. Die offizielle Reihe finden Sie beim <ExternalSourceLink href={UBA_ELECTRICITY_URL}>Umweltbundesamt: deutscher Strommix 1990–2025</ExternalSourceLink>.</p>
            </ArticleSection>

            <ArticleSection id="formel-einheiten" number="15" title="Aktivitätsdaten × Emissionsfaktor – aber mit Einheitenkontrolle.">
              <Principle>Aktivitätsdaten × Emissionsfaktor = Emissionen</Principle>
              <div className="my-8 rounded-[1rem] bg-[rgba(21,21,21,0.05)] p-7 font-mono text-sm leading-8 text-ink"><p>10.000 Liter Kraftstoff</p><p className="text-orange">× kg CO₂e / Liter</p><p>= kg CO₂e</p><p className="mt-3 border-t border-[rgba(21,21,21,0.12)] pt-3">kg CO₂e ÷ 1.000 = t CO₂e</p></div>
              <p>Genau hier passieren viele kleine Fehler: kWh werden mit einem Faktor pro MWh multipliziert, Liter und kg verwechselt, der Faktor für Erdgas auf Heizöl angewendet oder CO₂ und CO₂e vermischt.</p>
              <p>Deshalb sollte jede Berechnungszeile mindestens enthalten:</p>
              <div className="my-8 overflow-x-auto rounded-[1rem] bg-ink px-6 py-7 text-white"><p className="min-w-[45rem] font-mono text-sm font-bold tracking-[0.04em]">Menge | Einheit | Faktor | Faktoreinheit | Ergebnis | Quelle</p></div>
              <p>GHG Protocol beschreibt die Kombination aus Aktivitätsdaten und geeigneten Emissionsfaktoren als üblichen Berechnungsweg und empfiehlt, wo verfügbar, möglichst passende spezifische Daten gegenüber zu generischen Annahmen.</p>
            </ArticleSection>

            <ArticleSection id="datenerfassungstabelle" number="16" title="So kann eine Datenerfassungstabelle aussehen.">
              <p>Noch bevor gerechnet wird, kann eine einfache Struktur verwendet werden:</p>
              <RawDataTable/>
              <p>Erst danach werden Emissionsfaktor, Faktorquelle, Faktorversion, Berechnung, t CO₂e, Annahmen und Review-Status ergänzt. Für die reine Rohdatensammlung können Sie zusätzlich die <Link href="/de/ressourcen/scope-1-2-datenerfassungs-vorlage">Scope 1 &amp; 2 Datenerfassungs-Vorlage</Link> nutzen.</p>
              <div className="my-8 flex items-center gap-4 rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><Table2 aria-hidden="true" className="h-8 w-8 shrink-0 text-orange"/><p className="font-display text-2xl leading-tight text-ink">Rohdaten und Berechnung bleiben voneinander getrennt. Das ist wesentlich leichter zu prüfen.</p></div>
            </ArticleSection>

            <ArticleSection id="datenverantwortliche" number="17" title="Wo liegen die Daten normalerweise im Unternehmen?">
              <div className="my-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Buchhaltung / Controlling", "Strom, Gas, Heizöl, Kraftstoff, Fernwärme und andere Energieeinkäufe"],
                  ["Facility / Technik", "Zähler, Heizungs- und Kälteanlagen, Kältemittel, Generatoren und Standortdetails"],
                  ["Fuhrpark", "Tankkarten, Fahrzeugliste, Kraftstoffarten und Fahrleistung"],
                  ["Produktion", "Prozessbrennstoffe, Anlagen, spezielle Energieverbräuche und Prozessemissionen"],
                  ["Einkauf", "Energieverträge, Lieferanteninformationen und Beschaffungsprodukte"],
                  ["Nachhaltigkeit / Qualität / Umwelt", "bestehende Klimabilanzen, ISO-Unterlagen, Energiemanagement und dokumentierte Faktoren"]
                ].map(([title, body]) => <article className="border-t border-[rgba(21,21,21,0.13)] pt-5" key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></article>)}
              </div>
              <Principle>Die Scope-1-&amp;-2-Berechnung ist deshalb oft zuerst ein Datensammlungsprojekt.</Principle>
            </ArticleSection>

            <ArticleSection id="originalunterlagen" number="18" title="Welche Originalunterlagen sollten Sie aufbewahren?">
              <p>Nicht nur die finale Excel-Datei. Für jeden wesentlichen Datenpunkt sollte nachvollziehbar bleiben, woher er stammt.</p>
              <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Energie", "Jahres- und Monatsrechnung, Zählerauswertung"],
                  ["Kraftstoff", "Tankkartenübersicht, Lieferantenabrechnung"],
                  ["Heizöl", "Lieferrechnungen, Tankbuch"],
                  ["Kältemittel", "Wartungs- und Serviceprotokoll, Anlagenregister"],
                  ["Strombeschaffung", "Energievertrag, Versorgerinformation, Beschaffungsnachweise"],
                  ["Emissionsfaktor", "Quelle, Veröffentlichungsjahr, Tabelle und Version"]
                ].map(([title, body]) => <article className="rounded-[1rem] bg-[rgba(21,21,21,0.05)] p-5" key={title}><FileCheck2 aria-hidden="true" className="h-6 w-6 text-orange"/><h3 className="mt-4 font-bold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{body}</p></article>)}
              </div>
              <Principle label="Idealer Audit Trail">Ergebnis → Berechnung → Faktor → Aktivitätsdaten → Originalquelle</Principle>
              <p>Nicht: „Die Zahl stand letztes Jahr schon in dieser Excel-Datei.“ Wie Sie Quellen als wiederverwendbare Evidence strukturieren, zeigt unser Leitfaden zu <Link href="/de/ressourcen/esg-nachweise-lieferanten">ESG-Nachweisen für Lieferanten</Link>.</p>
            </ArticleSection>

            <ArticleSection id="fehlende-daten" number="19" title="Was tun, wenn Daten fehlen?">
              <p>Das ist normal. Aber zuerst sollte unterschieden werden, was genau fehlt.</p>
              <div className="my-8 grid gap-3">
                {[
                  ["Rechnung fehlt, Zählerwert existiert", "Alternative belastbare Quelle verwenden."],
                  ["Einzelne Monate fehlen", "Datenlücke identifizieren und sachgerecht behandeln."],
                  ["Kraftstoffliter fehlen, Fahrleistung existiert", "Prüfen, ob eine methodisch geeignete Ersatzberechnung möglich ist."],
                  ["Kältemittelmenge fehlt", "Serviceunternehmen beziehungsweise Wartungsunterlagen prüfen."],
                  ["Nur der Gesamtgebäudeverbrauch ist bekannt", "Bilanzgrenze und mögliche Zuordnung klären."],
                  ["Daten existieren tatsächlich nicht", "Gap dokumentieren und gegebenenfalls transparent schätzen, wenn methodisch angemessen."]
                ].map(([gap, action]) => <div className="grid gap-2 rounded-[0.85rem] border border-[rgba(21,21,21,0.11)] p-5 sm:grid-cols-[0.82fr_auto_1fr] sm:items-center" key={gap}><p className="font-bold text-ink">{gap}</p><span aria-hidden="true" className="hidden text-orange sm:block">→</span><p className="text-sm leading-6 text-muted">{action}</p></div>)}
              </div>
              <p>GHG Protocol erkennt an, dass bei fehlenden direkten Aktivitätsdaten Schätzungen notwendig sein können. Der Ansatz sollte zur verfügbaren Datenqualität und zum Reporting-Kontext passen.</p>
              <Principle>Eine dokumentierte Schätzung ist besser als eine versteckte Vermutung.</Principle>
            </ArticleSection>

            <ArticleSection id="geleaste-assets" number="20" title="Gemietete Gebäude und geleaste Assets: Nicht automatisch ausschließen.">
              <p>„Das Gebäude gehört uns nicht, also gehört der Strom nicht in unsere Bilanz.“ So einfach ist es nicht.</p>
              <p>Die Einordnung geleaster Assets hängt unter anderem von der gewählten organisatorischen Konsolidierungslogik und dem Kontrollverhältnis ab. GHG Protocol beschreibt beispielsweise, dass beim operational-control-Ansatz Energieverbrauch in gemieteten Räumen unter bestimmten Bedingungen innerhalb von Scope 2 liegen kann; andere Leasingkonstellationen können anders eingeordnet werden.</p>
              <BulletList items={["Wer kontrolliert den Betrieb?", "Wer bezieht beziehungsweise verbraucht die Energie?", "Wie lautet die gewählte Boundary-Methode?", "Wie wird Energie abgerechnet?"]}/>
              <p>Eigentum allein entscheidet nicht immer über den Scope. Beachten Sie dazu auch die Hinweise zu leased assets in der <ExternalSourceLink href={SCOPE_2_FAQ_URL}>Scope 2 FAQ</ExternalSourceLink>.</p>
            </ArticleSection>

            <ArticleSection id="scope-3-abgrenzung" number="21" title="Scope 1 und 2 sind nicht automatisch der komplette Corporate Carbon Footprint.">
              <p>Scope 1 und Scope 2 erfassen wichtige direkte beziehungsweise energiebezogene Emissionen. Andere Emissionen können jedoch unter Scope 3 liegen.</p>
              <p>Noch unsicher, wie sich direkte Emissionen, eingekaufte Energie und die Wertschöpfungskette unterscheiden? Unser Grundlagenleitfaden erklärt <Link href="/de/ressourcen/scope-1-2-3-einfach-erklaert">Scope 1, 2 und 3 mit konkreten Unternehmensbeispielen</Link>.</p>
              <BulletList items={["eingekaufte Materialien", "externe Transporte", "Geschäftsreisen und Pendeln", "Abfall", "vorgelagerte Brennstoff- und Energieemissionen", "Lieferkette", "Nutzung verkaufter Produkte"]}/>
              <p>GHG Protocol definiert Scope 3 als die übrigen indirekten Emissionen der Wertschöpfungskette, die nicht in Scope 2 enthalten sind.</p>
              <div className="my-8 rounded-[1rem] bg-[var(--soft-orange)] p-6"><p className="text-sm font-bold uppercase tracking-[0.1em] text-orange">Präzise Aussage</p><p className="font-display mt-4 text-3xl leading-tight text-ink">„Wir haben Scope 1 und Scope 2 für die definierte Bilanzgrenze und den definierten Zeitraum berechnet.“</p></div>
              <p>Wenn die Zahlen anschließend in einen freiwilligen Nachhaltigkeitsbericht einfließen, finden Sie die passende Leistung unter <Link href="/de/vsme-nachhaltigkeitsbericht">VSME-Nachhaltigkeitsbericht</Link>.</p>
            </ArticleSection>

            <ArticleSection id="dokumentation" number="22" title="Welche fünf Informationen sollte jede Berechnung dokumentieren?">
              <ol className="my-8 grid gap-4">
                {[
                  ["01", "Bilanzgrenze", "Welche Gesellschaften, Standorte und Quellen sind enthalten?"],
                  ["02", "Zeitraum", "Für welches Berichtsjahr?"],
                  ["03", "Aktivitätsdaten", "Welche Mengen wurden verwendet?"],
                  ["04", "Emissionsfaktoren", "Welche Quelle, Version und Einheit?"],
                  ["05", "Annahmen und Datenlücken", "Wo waren Zuordnungen, Schätzungen oder methodische Entscheidungen nötig?"]
                ].map(([number, title, body]) => <li className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-[rgba(21,21,21,0.12)] pt-5" key={number}><span className="font-mono text-xs font-bold text-orange">{number}</span><div><h3 className="font-bold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{body}</p></div></li>)}
              </ol>
              <p>Danach kann eine andere Person die Berechnung nachvollziehen. Genau das ist der Unterschied zwischen einer CO₂-Zahl und einer belastbaren Berechnungsgrundlage.</p>
            </ArticleSection>

            <ArticleSection id="typische-fehler" number="23" title="Acht typische Fehler bei der Datensammlung.">
              <div className="my-8 rounded-[1rem] bg-ink p-6 text-white sm:p-8"><CircleAlert aria-hidden="true" className="h-8 w-8 text-orange"/><ol className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">{[
                ["Nur Eurobeträge sammeln", "Besser tatsächliche Mengen: kWh, Liter, kg, MWh."],
                ["Einen Standort vergessen", "Auch kleinere Lager, Büros oder Produktionsstätten prüfen."],
                ["Kältemittel ignorieren", "Sie sind eine häufig übersehene direkte Emissionsquelle."],
                ["Strom aller Jahre vermischen", "Berichtsperiode sauber halten."],
                ["Ökostrom automatisch mit null bewerten", "Scope-2-Methode und Vertragsinformationen prüfen."],
                ["Einheiten nicht standardisieren", "kWh sind nicht MWh."],
                ["Faktor ohne Quelle speichern", "Sonst ist die Berechnung schlecht reproduzierbar."],
                ["Ergebnis überschreiben", "Rohdaten und Originalquelle getrennt erhalten."]
              ].map(([title, body], index) => <li className="border-t border-white/18 pt-4" key={title}><p className="font-mono text-xs text-orange">0{index + 1}</p><h3 className="mt-2 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/62">{body}</p></li>)}</ol></div>
            </ArticleSection>

            <ArticleSection id="erste-zwei-stunden" number="24" title="Eine praktische Checkliste für die ersten zwei Stunden.">
              <p>Wenn Sie heute mit Scope 1 und Scope 2 beginnen:</p>
              <ol className="my-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)]">
                {["Berichtsjahr festlegen.", "Gesellschaften und Standorte auflisten.", "Alle stationären Brennstoffquellen erfassen.", "Fuhrpark prüfen.", "Kälte- und Klimaanlagen prüfen.", "Mögliche Prozessemissionen prüfen.", "Stromverbrauch pro Standort sammeln.", "Fernwärme, Fernkälte und Dampf prüfen.", "Verträge und Beschaffungsinformationen zum Strom sichern.", "Für jeden Datenpunkt Quelle und Einheit dokumentieren."].map((step, index) => <li className="grid grid-cols-[3rem_1fr] gap-4 bg-white p-5" key={step}><span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span><span className="font-semibold text-ink">{step}</span></li>)}
              </ol>
              <Principle>Erst danach sollten Sie anfangen, Emissionsfaktoren einzusetzen.</Principle>
            </ArticleSection>

            <ArticleSection id="methodik-update" number="25" title="Scope-2-Regeln werden derzeit weiterentwickelt – was bedeutet das für eine Berechnung 2026?">
              <p>GHG Protocol arbeitet derzeit gemeinsam mit ISO an einer umfassenderen Überarbeitung der Corporate-GHG-Standards.</p>
              <p>Im Bereich Scope 2 wurden 2025/26 vorgeschlagene Änderungen öffentlich konsultiert. Diese betreffen unter anderem die location-based und market-based Methodik. Die Vorschläge sind jedoch nicht als bereits geltende neue Regeln zu behandeln.</p>
              <div className="my-8 grid gap-3 sm:grid-cols-3"><div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-5"><p className="font-mono text-xs text-orange">HEUTE</p><p className="mt-3 font-bold">Aktuell anwendbare Methodik</p></div><div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-5"><p className="font-mono text-xs text-orange">Q2 2027</p><p className="mt-3 font-bold">Gemeinsame öffentliche Konsultation geplant</p></div><div className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-5"><p className="font-mono text-xs text-orange">Q4 2028</p><p className="mt-3 font-bold">Finaler harmonisierter Corporate Standard vorgesehen</p></div></div>
              <p>Für eine heutige Berechnung bedeutet das: mit der aktuell anwendbaren Methodik arbeiten und Quellen, Faktoren, Verträge sowie Berechnungslogik so dokumentieren, dass spätere Updates nachvollziehbar umgesetzt werden können.</p>
              <p>Die Zeitplanung stammt aus dem offiziellen <ExternalSourceLink href={STANDARDS_UPDATE_URL}>GHG Protocol Standards Update vom Juli 2026</ExternalSourceLink> und der zugehörigen <ExternalSourceLink href={STANDARDS_UPDATE_FAQ_URL}>FAQ zum Entwicklungsplan</ExternalSourceLink>. Wie evipace methodische Entscheidungen transparent behandelt, erklären wir unter <Link href="/de/methodology">Unsere Methodik</Link>.</p>
            </ArticleSection>

            <ArticleSection id="externe-unterstuetzung" number="26" title="Wann externe Unterstützung sinnvoll wird.">
              <p>Für ein Unternehmen mit einem Standort, einer Gasrechnung, einer Stromrechnung und wenigen Fahrzeugen kann eine erste Scope-1-&amp;-2-Berechnung relativ überschaubar sein.</p>
              <p>Unterstützung wird sinnvoller, wenn:</p>
              <BulletList items={["mehrere Standorte oder Länder betroffen sind", "die Bilanzgrenze unklar ist", "mehrere Energieverträge bestehen", "Kältemittel oder Prozessemissionen relevant sind", "Datenlücken bestehen", "market-based Scope 2 benötigt wird", "die Berechnung für einen Kunden oder ein Assessment nachvollziehbar dokumentiert werden soll", "die Daten später für VSME, ESG-Fragebögen und andere Anforderungen wiederverwendet werden sollen"]}/>
              <p>Welche weiteren Daten neben Scope 1 und Scope 2 für den Bericht benötigt werden, zeigt unser <Link href="/de/ressourcen/vsme-daten-nachhaltigkeitsbericht">Leitfaden zur VSME-Datenerfassung</Link>.</p>
              <p>Plattformspezifisch können die Daten etwa für <Link href="/de/ressourcen/ecovadis-dokumente-nachweise">EcoVadis-Dokumente und Nachweise</Link> oder eine <Link href="/de/ressourcen/integritynext-einladung-lieferanten">IntegrityNext-Einladung</Link> relevant werden.</p>
              <Principle>Boundary → Quellen → Aktivitätsdaten → Faktoren → Berechnung → Review → Evidence</Principle>
            </ArticleSection>

            <section aria-labelledby="article-cta-title" className="my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12">
              <Calculator aria-hidden="true" className="h-7 w-7 text-orange"/>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-orange">Ihr nächster Schritt</p>
              <h2 className="font-display mt-5 max-w-[16ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]" id="article-cta-title">Sie haben die Verbrauchsdaten – aber noch keine Scope-1-&amp;-2-Berechnung?</h2>
              <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-white/68"><p>Senden Sie uns die vorhandenen Unterlagen.</p><p>Wir strukturieren die relevanten Emissionsquellen, prüfen die Datengrundlage und erstellen eine nachvollziehbare Scope-1- und Scope-2-Berechnung mit dokumentierten Quellen, Faktoren und offenen Datenlücken.</p></div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>Scope-1-&amp;-2-Berechnung anfragen</ButtonLink><ButtonLink className="w-full sm:w-auto" href="/de/scope-1-2-berechnung" variant="light">Scope 1 und Scope 2 berechnen</ButtonLink></div>
              <p className="mt-6 text-sm font-semibold text-white/50">Strom · Erdgas · Kraftstoffe · Kältemittel · Wärme · Emissionsfaktoren</p>
            </section>

            <section aria-labelledby="faq-title" className="scroll-mt-24 border-t border-[rgba(21,21,21,0.12)] py-16" id="faq">
              <p className="eyebrow">FAQ</p><h2 className="font-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-none" id="faq-title">Häufige Fragen zur Scope-1-&amp;-2-Datenerfassung</h2>
              <div className="mt-9 grid gap-3">{faqItems.map((faq) => <details className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white px-5 py-5 sm:px-6" key={faq.question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold leading-6 text-ink marker:content-none">{faq.question}<span aria-hidden="true" className="text-2xl font-light text-orange transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{faq.answer}</p></details>)}</div>
            </section>

            <section aria-labelledby="sources-title" className="border-t border-[rgba(21,21,21,0.12)] pb-16 pt-12">
              <div className="flex items-center gap-3"><Link2 aria-hidden="true" className="h-4 w-4 text-orange"/><h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink" id="sources-title">Quellen &amp; weiterführende Informationen</h2></div>
              <ul className="mt-6 grid gap-6 text-sm leading-6 text-muted">
                <li><ExternalSourceLink href={CORPORATE_STANDARD_URL}>GHG Protocol — Corporate Standard</ExternalSourceLink><p className="mt-1">Definitionen, organisatorische Bilanzgrenzen und Grundlagen des Corporate GHG Inventory.</p></li>
                <li><ExternalSourceLink href={CORPORATE_FAQ_URL}>GHG Protocol — Corporate Standard FAQ</ExternalSourceLink><p className="mt-1">Stationary und mobile combustion, process und fugitive emissions sowie Berechnungsgrundlagen.</p></li>
                <li><ExternalSourceLink href={SCOPE_2_GUIDANCE_URL}>GHG Protocol — Scope 2 Guidance</ExternalSourceLink><p className="mt-1">Elektrizität, Dampf, Wärme und Kälte sowie das location-based und market-based Framework.</p></li>
                <li><ExternalSourceLink href={SCOPE_2_FAQ_URL}>GHG Protocol — Scope 2 FAQ</ExternalSourceLink><p className="mt-1">Methodische Hinweise für market-based electricity und geleaste Assets.</p></li>
                <li><ExternalSourceLink href={UBA_ELECTRICITY_URL}>Umweltbundesamt — Treibhausgas-Emissionen des deutschen Strommix 1990–2025</ExternalSourceLink><p className="mt-1">Offizielle deutsche Daten und Methodik zur Entwicklung des nationalen Strommixes.</p></li>
                <li><ExternalSourceLink href={STANDARDS_UPDATE_URL}>GHG Protocol — Corporate Standards Update vom Juli 2026</ExternalSourceLink><p className="mt-1">Status und Zeitplan der gemeinsamen Standardentwicklung mit ISO.</p></li>
                <li><ExternalSourceLink href={STANDARDS_UPDATE_FAQ_URL}>GHG Protocol — FAQ zum Standards Update</ExternalSourceLink><p className="mt-1">Einordnung der Konsultation und des vorgesehenen Veröffentlichungszeitplans.</p></li>
              </ul>
            </section>
          </div></div>
        </article></main>
    </>;
}
