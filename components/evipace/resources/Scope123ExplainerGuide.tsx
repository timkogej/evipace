import type { ReactNode } from "react";
import {
  ArrowDownUp,
  CircleAlert,
  ExternalLink,
  Factory,
  FileCheck2,
  Link2,
  Network,
  Zap
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";
const CORPORATE_STANDARD_URL = "https://ghgprotocol.org/corporate-standard";
const SCOPE_2_GUIDANCE_URL = "https://ghgprotocol.org/scope-2-guidance";
const SCOPE_3_STANDARD_URL =
  "https://ghgprotocol.org/corporate-value-chain-scope-3-standard";
const SCOPE_3_CALCULATION_URL =
  "https://ghgprotocol.org/scope-3-calculation-guidance-2";
const STANDARDS_UPDATE_FAQ_URL =
  "https://ghgprotocol.org/blog/ghg-protocol-announces-key-standard-development-updates-faq-resource";
const EFRAG_STANDARD_URL =
  "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard";

const articleNavItems = [
  { label: "Scope 1", href: "#scope-1" },
  { label: "Scope 2", href: "#scope-2" },
  { label: "Scope 3", href: "#scope-3" },
  { label: "15 Kategorien", href: "#scope-3-kategorien" }
];

const quickScopes = [
  ["Scope 1", "Direkte Emissionen aus eigenen oder kontrollierten Quellen", "Erdgas im Heizkessel, Diesel im eigenen Fuhrpark, Kältemittelverlust"],
  ["Scope 2", "Emissionen aus der Erzeugung eingekaufter Energie", "Strom für Produktionsmaschinen, Fernwärme"],
  ["Scope 3", "Weitere indirekte Emissionen der Wertschöpfungskette", "eingekaufter Stahl, Lieferantentransport, Geschäftsreisen, Abfall, Nutzung verkaufter Produkte"]
] as const;

const upstreamCategories = [
  ["1", "Purchased goods and services", "Eingekaufte Waren und Dienstleistungen – zum Beispiel Stahl, Aluminium, Kunststoffgranulat, Bauteile, Verpackungen und externe Dienstleistungen."],
  ["2", "Capital goods", "Kapitalgüter wie Maschinen, Produktionsanlagen, Gebäude und größere Betriebsausstattung."],
  ["3", "Fuel- and energy-related activities not included in Scope 1 or 2", "Weitere vorgelagerte Emissionen der eingesetzten Brennstoffe und Energieträger, die nicht bereits Scope 1 oder Scope 2 sind."],
  ["4", "Upstream transportation and distribution", "Transport und Distribution eingekaufter Güter – etwa wenn ein externer Spediteur Rohmaterial zum Werk bringt."],
  ["5", "Waste generated in operations", "Behandlung und Entsorgung des durch die eigene Tätigkeit entstehenden Abfalls durch externe Akteure."],
  ["6", "Business travel", "Zum Beispiel Flug- und Bahnreisen, Mietwagen sowie bestimmte weitere Geschäftsreisekomponenten."],
  ["7", "Employee commuting", "Arbeitswege der Mitarbeitenden zwischen Wohnort und Arbeitsplatz."],
  ["8", "Upstream leased assets", "Bestimmte gemietete oder geleaste Assets, soweit deren Emissionen nicht bereits in Scope 1 und 2 enthalten sind."]
] as const;

const downstreamCategories = [
  ["9", "Downstream transportation and distribution", "Transport und Distribution verkaufter Produkte unter den entsprechenden Abgrenzungen."],
  ["10", "Processing of sold products", "Weitere Verarbeitung verkaufter Zwischenprodukte – für Zulieferer potenziell besonders relevant."],
  ["11", "Use of sold products", "Emissionen während der Nutzung verkaufter Produkte; bei energieverbrauchenden Produkten potenziell wesentlich."],
  ["12", "End-of-life treatment of sold products", "Behandlung der verkauften Produkte am Ende ihrer Lebensdauer."],
  ["13", "Downstream leased assets", "Bestimmte Vermögenswerte, die das Unternehmen anderen zur Nutzung überlässt."],
  ["14", "Franchises", "Emissionen relevanter Franchise-Aktivitäten."],
  ["15", "Investments", "Emissionen aus relevanten Investitionen."]
] as const;

const faqItems = [
  ["Was ist der Unterschied zwischen Scope 1, 2 und 3?", "Scope 1 umfasst direkte Emissionen aus eigenen oder kontrollierten Quellen. Scope 2 umfasst indirekte Emissionen aus der Erzeugung eingekaufter Elektrizität, Wärme, Kälte und Dampf. Scope 3 umfasst weitere indirekte Emissionen entlang der vor- und nachgelagerten Wertschöpfungskette."],
  ["Ist Erdgas Scope 1 oder Scope 2?", "Wird Erdgas in einer eigenen beziehungsweise kontrollierten Anlage des Unternehmens verbrannt, gehören die daraus entstehenden direkten Emissionen typischerweise zu Scope 1."],
  ["Ist Strom Scope 2?", "Eingekaufter beziehungsweise bezogener und vom Unternehmen verbrauchter Strom gehört grundsätzlich zur Scope-2-Betrachtung. Die aktuelle Guidance unterscheidet dabei location-based und – wo anwendbar – market-based Accounting."],
  ["Sind Kältemittel Scope 1?", "Emissionen durch Kältemittelverluste aus eigenen oder kontrollierten Anlagen können als fugitive emissions Scope 1 sein."],
  ["Sind Geschäftsreisen Scope 3?", "Geschäftsreisen sind im GHG Protocol eine eigene vorgelagerte Scope-3-Kategorie – Category 6."],
  ["Ist der Arbeitsweg der Mitarbeitenden Scope 3?", "Employee commuting ist Category 7 der upstream Scope-3-Kategorien."],
  ["Sind eingekaufte Rohstoffe Scope 3?", "Die vorgelagerten Emissionen eingekaufter Waren und Dienstleistungen können unter Scope 3 Category 1 fallen. Für Produktionsunternehmen kann dies Rohstoffe und Vorprodukte betreffen."],
  ["Muss jedes Unternehmen Scope 3 berechnen?", "Nicht pauschal aus demselben Grund. Der ursprüngliche GHG Protocol Corporate Standard behandelt Scope 3 anders als Scope 1 und 2; der separate Scope 3 Standard enthält die 15-Kategorien-Systematik. Zusätzlich können andere Reporting Frameworks, Kunden oder Programme Scope-3-Informationen verlangen."],
  ["Muss jede der 15 Kategorien relevant sein?", "Nein. Die Kategorien bilden das vollständige Framework; je nach Geschäftsmodell können einzelne Kategorien nicht anwendbar beziehungsweise nicht relevant sein. Die Bewertung sollte strukturiert und begründet erfolgen."],
  ["Kann dieselbe Emission Scope 1 eines Lieferanten und Scope 3 seines Kunden sein?", "Ja. Die Scope-Klassifizierung erfolgt aus Perspektive des jeweiligen berichtenden Unternehmens. Direkte Emissionen eines Lieferanten können mit eingekauften Waren oder Dienstleistungen verbunden sein und damit im Value-Chain-Inventar eines Kunden relevant werden."],
  ["Werden Scope 1, 2 und 3 gerade geändert?", "GHG Protocol und ISO entwickeln derzeit einen konsolidierten Corporate Standard. Nach dem im Juli 2026 veröffentlichten Zeitplan ist die öffentliche Konsultation für Q2 2027 und der finale gemeinsame Standard für Q4 2028 geplant. Bis neue Anforderungen finalisiert sind, sollten Drafts nicht als bereits geltende Regeln behandelt werden."]
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

function ScopeFlow({ rows }: { rows: readonly (readonly string[])[] }) {
  return <div className="my-8 grid gap-3">{rows.map(([source, relation, scope]) => <article className="grid gap-2 rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 sm:grid-cols-[1fr_auto_1fr_auto_5rem] sm:items-center" key={source}><p className="font-bold text-ink">{source}</p><span aria-hidden="true" className="hidden text-orange sm:block">→</span><p className="text-sm text-muted">{relation}</p><span aria-hidden="true" className="hidden text-orange sm:block">→</span><strong className="text-orange">{scope}</strong></article>)}</div>;
}

function ScopeArtwork() {
  return <div aria-hidden="true" className="resource-hero-art"><svg className="resource-hero-art__sheet" fill="none" viewBox="0 0 520 650" xmlns="http://www.w3.org/2000/svg"><circle cx="260" cy="260" r="72" stroke="currentColor" strokeOpacity="0.72" strokeWidth="2" /><circle cx="260" cy="260" r="138" stroke="currentColor" strokeOpacity="0.42" strokeWidth="2" /><circle cx="260" cy="260" r="205" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2" /><path d="M260 40V480M40 260H480" stroke="currentColor" strokeDasharray="6 8" strokeOpacity="0.18" /><circle cx="260" cy="260" fill="#FE7001" r="13" /><text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="14" fontWeight="700" letterSpacing="2" x="205" y="265">SCOPE 1</text><text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="14" fontWeight="700" letterSpacing="2" x="205" y="164">SCOPE 2</text><text fill="currentColor" fontFamily="Inter, Arial, sans-serif" fontSize="14" fontWeight="700" letterSpacing="2" x="205" y="92">SCOPE 3</text></svg><span className="resource-hero-art__code">DIRECT · ENERGY · VALUE CHAIN</span></div>;
}

export function Scope123ExplainerGuide() {
  return (
    <>
      <main id="top">
        <article>
          <header aria-labelledby="article-title" className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
            <ScopeArtwork />
            <div className="site-shell relative z-10">
              <nav aria-label="Brotkrümelnavigation" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"><Link className="transition hover:text-orange" href="/de">Startseite</Link><span aria-hidden="true">/</span><Link className="transition hover:text-orange" href="/de/ressourcen">Ressourcen</Link><span aria-hidden="true">/</span><span className="text-ink">Scope 1, 2 und 3</span></nav>
              <div className="mt-12 max-w-6xl"><p className="eyebrow">Treibhausgasemissionen · Grundlagen</p><h1 className="font-display mt-7 max-w-[19ch] break-words hyphens-auto text-[clamp(3.05rem,6.8vw,6.35rem)] leading-[0.92]" id="article-title">Scope 1, 2 und 3 einfach erklärt – mit Beispielen für Unternehmen</h1></div>
              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
                <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted"><p>Erdgas in der eigenen Heizung. Strom aus dem Netz. Stahl vom Lieferanten. Geschäftsreisen. Abfall aus der Produktion. Transport zum Kunden. Die Nutzung eines verkauften Produkts.</p><p className="mt-6">All diese Aktivitäten können Treibhausgasemissionen verursachen. Aber sie gehören nicht alle in dieselbe Kategorie.</p><p className="mt-6">Das Greenhouse Gas Protocol ordnet Unternehmensemissionen deshalb in drei sogenannte Scopes ein.</p></div>
                <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7"><Network aria-hidden="true" className="h-8 w-8 text-orange" /><div className="mt-6 grid gap-4"><p><strong className="text-orange">Scope 1</strong><br /><span className="text-sm leading-6 text-muted">direkte Emissionen</span></p><p><strong className="text-orange">Scope 2</strong><br /><span className="text-sm leading-6 text-muted">eingekaufte Energie</span></p><p><strong className="text-orange">Scope 3</strong><br /><span className="text-sm leading-6 text-muted">Wertschöpfungskette</span></p></div></aside>
              </div>
              <div className="mt-12 max-w-4xl text-lg leading-8 text-muted"><p>Die Unterscheidung entscheidet darüber, welche Daten Sie benötigen, wo Sie diese finden, welche Emissionsquellen Sie direkt kontrollieren und welche Informationen Sie von Lieferanten oder anderen Partnern brauchen.</p></div>
            </div>
          </header>

          <section aria-labelledby="quick-answer-title" className="scroll-mt-24 bg-ink py-20 text-white sm:py-24" id="schnellantwort">
            <div className="site-shell"><div className="grid gap-10 lg:grid-cols-[0.48fr_1.52fr] lg:gap-16"><div><p className="eyebrow">Quick Answer</p><h2 className="font-display mt-6 max-w-[12ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]" id="quick-answer-title">Scope 1, 2 und 3 in 30 Sekunden</h2></div><div data-scope-comparison="quick-answer"><div className="hidden overflow-hidden rounded-[1rem] border border-white/16 md:block"><table className="w-full border-collapse text-left text-sm"><caption className="sr-only">Scope 1, 2 und 3 im Vergleich</caption><thead className="bg-white/[0.06] text-xs uppercase tracking-[0.09em] text-white/55"><tr><th className="px-5 py-4" scope="col">Scope</th><th className="px-5 py-4" scope="col">Was gehört hinein?</th><th className="px-5 py-4" scope="col">Produktionsbeispiel</th></tr></thead><tbody>{quickScopes.map(([scope, meaning, example]) => <tr className="border-t border-white/12" key={scope}><th className="px-5 py-5 text-orange" scope="row">{scope}</th><td className="px-5 py-5 leading-6 text-white/78">{meaning}</td><td className="px-5 py-5 leading-6 text-white/58">{example}</td></tr>)}</tbody></table></div><div className="grid gap-4 md:hidden">{quickScopes.map(([scope, meaning, example]) => <article className="rounded-[1rem] border border-white/16 p-5" key={scope}><h3 className="font-display text-3xl text-orange">{scope}</h3><p className="mt-4 leading-7 text-white/85">{meaning}</p><p className="mt-3 text-sm leading-6 text-white/55">{example}</p></article>)}</div><div className="mt-8 grid gap-3 border-t border-white/14 pt-7"><p><strong className="text-orange">Scope 1:</strong> Wir emittieren direkt.</p><p><strong className="text-orange">Scope 2:</strong> Jemand erzeugt Energie für uns.</p><p><strong className="text-orange">Scope 3:</strong> Emissionen entstehen in unserer vor- oder nachgelagerten Wertschöpfungskette.</p><p className="mt-2 text-sm leading-6 text-white/52">Diese Faustregel ersetzt keine saubere Bilanzgrenze.</p></div></div></div></div>
          </section>

          <div className="site-shell py-6 sm:py-10"><div className="mx-auto max-w-[1120px]"><div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16"><div className="min-w-0">
            <ArticleSection id="scope-bedeutung" number="01" title="Was bedeutet „Scope“ überhaupt?">
              <p>Scope bedeutet in diesem Zusammenhang sinngemäß Geltungsbereich. Das GHG Protocol verwendet die drei Scopes, um Treibhausgasemissionen eines Unternehmens systematisch einzuordnen.</p>
              <p>Der Corporate Standard deckt nicht nur CO₂ ab, sondern sieben Treibhausgase beziehungsweise Gasgruppen:</p>
              <div className="my-7 flex flex-wrap gap-2">{["CO₂", "CH₄", "N₂O", "HFCs", "PFCs", "SF₆", "NF₃"].map((gas) => <span className="rounded-full border border-[rgba(21,21,21,0.14)] bg-white px-4 py-2 font-mono text-sm font-bold text-ink" key={gas}>{gas}</span>)}</div>
              <p>Für die Bilanz werden unterschiedliche Treibhausgase typischerweise in CO₂-Äquivalente – CO₂e – umgerechnet. Deshalb ist der alltägliche Begriff CO₂-Bilanz praktisch verständlich. Technisch geht es jedoch um eine Treibhausgasbilanz.</p>
            </ArticleSection>

            <ArticleSection id="scope-1" number="02" title="Scope 1: Direkte Emissionen">
              <p>Scope 1 umfasst direkte Treibhausgasemissionen aus Quellen, die einem Unternehmen gehören oder von ihm kontrolliert werden.</p>
              <div className="my-8 grid gap-4 sm:grid-cols-2">{[
                ["Stationäre Verbrennung", "Erdgas oder andere Brennstoffe in Heizkesseln, Öfen, Brennern, Produktionsanlagen oder Generatoren."],
                ["Mobile Verbrennung", "Eigene oder kontrollierte Firmen-Pkw, Lieferwagen, Lkw und andere betriebliche Fahrzeuge."],
                ["Fugitive Emissionen", "Kältemittelverluste aus Klimaanlagen, Kälteanlagen, Wärmepumpen oder Produktionskühlung."],
                ["Prozessemissionen", "Treibhausgase, die bei bestimmten chemischen oder physikalischen Produktionsprozessen direkt entstehen."]
              ].map(([title, body]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] p-5" key={title}><h3 className="font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{body}</p></article>)}</div>
              <p>GHG Protocol unterscheidet bei Scope 1 insbesondere stationäre Verbrennung, mobile Verbrennung, Prozessemissionen und fugitive Emissionen.</p>
            </ArticleSection>

            <ArticleSection id="scope-1-beispiel" number="03" title="Einfaches Scope-1-Beispiel">
              <p>Ein Metallverarbeiter betreibt einen gasbetriebenen Heizkessel, zwei dieselbetriebene Firmenfahrzeuge und eine Produktionskühlanlage.</p>
              <ScopeFlow rows={[["Erdgas", "stationäre Verbrennung", "Scope 1"], ["Diesel eigener Fahrzeuge", "mobile Verbrennung", "Scope 1"], ["Kältemittelverlust", "fugitive Emissionen", "Scope 1"]]} />
              <Principle>Die Emissionen werden nicht deshalb Scope 1, weil sie „auf dem Firmengelände“ entstehen. Entscheidend ist die Beziehung zur eigenen oder kontrollierten Quelle.</Principle>
            </ArticleSection>

            <ArticleSection id="scope-2" number="04" title="Scope 2: Eingekaufte Energie">
              <p>Scope 2 umfasst indirekte Emissionen aus der Erzeugung von Energie, die das Unternehmen einkauft oder bezieht und selbst verbraucht.</p>
              <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{[["Elektrizität", Zap], ["Dampf", Factory], ["Wärme", Factory], ["Kälte", ArrowDownUp]].map(([label, Icon]) => { const ScopeIcon = Icon; return <article className="rounded-[0.9rem] bg-[var(--soft-orange)] p-5" key={String(label)}><ScopeIcon aria-hidden="true" className="h-6 w-6 text-orange" /><h3 className="mt-4 font-bold text-ink">{String(label)}</h3></article>; })}</div>
              <p>Das Unternehmen verursacht diese Emission nicht direkt in der eigenen Anlage. Die Emission entsteht beispielsweise im Kraftwerk. Das Unternehmen nutzt aber die erzeugte Energie.</p>
            </ArticleSection>

            <ArticleSection id="scope-2-beispiel" number="05" title="Einfaches Scope-2-Beispiel">
              <p>Dasselbe Produktionsunternehmen kauft jährlich <strong>780.000 kWh Strom</strong> für CNC-Maschinen, Beleuchtung, Kompressoren, IT und Gebäudetechnik.</p>
              <Principle label="Einordnung">Extern erzeugter und vom Unternehmen eingekaufter Strom → Scope 2</Principle>
              <p>Dasselbe kann für bezogene Fernwärme, Fernkälte und Dampf gelten.</p>
            </ArticleSection>

            <ArticleSection id="location-market" number="06" title="Scope 2: location-based und market-based">
              <p>Bei Scope 2 gibt es eine wichtige Besonderheit.</p>
              <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Location-based</p><p className="mt-4 leading-7 text-muted">Orientiert sich an der durchschnittlichen Emissionsintensität des Stromnetzes beziehungsweise der relevanten geografischen Region.</p></article><article className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Market-based</p><p className="mt-4 leading-7 text-muted">Berücksichtigt geeignete lieferanten- oder produktspezifische Informationen und vertragliche Instrumente, sofern die Anforderungen der Scope 2 Guidance erfüllt sind.</p></article></div>
              <p>In Märkten, in denen entsprechende contractual instruments verfügbar sind, sieht die aktuelle Scope 2 Guidance grundsätzlich ein duales Reporting beider Methoden vor.</p>
              <Principle>„Wir beziehen Ökostrom“ bedeutet nicht automatisch: „Unsere gesamte Scope-2-Bilanz ist einfach null.“</Principle>
              <p>Die verwendete Methode und die zugrunde liegenden Beschaffungsinformationen müssen geprüft werden.</p>
            </ArticleSection>

            <ArticleSection id="scope-3" number="07" title="Scope 3: Alles Weitere in der Wertschöpfungskette?">
              <p>Fast. Scope 3 umfasst die weiteren indirekten Emissionen, die in der Wertschöpfungskette des berichtenden Unternehmens entstehen und nicht Scope 2 sind.</p>
              <p>Das GHG Protocol unterteilt Scope 3 in 15 Kategorien – acht vorgelagerte und sieben nachgelagerte. Für ein Produktionsunternehmen können dazu etwa Rohstoffherstellung, gekaufte Maschinen, externe Transporte, Abfallbehandlung, Geschäftsreisen, Pendeln, Verarbeitung, Produktnutzung und Entsorgung gehören.</p>
              <p>Scope 3 ist deshalb meistens der Bereich, in dem die meisten unterschiedlichen Datenquellen vorkommen.</p>
            </ArticleSection>

            <ArticleSection id="upstream-downstream" number="08" title="Upstream und downstream – was bedeutet das?">
              <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] bg-ink p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Upstream</p><p className="font-display mt-4 text-3xl leading-tight">Inputs vor und für die eigene Tätigkeit</p><p className="mt-4 text-sm leading-6 text-white/62">Lieferanten → Rohstoffe → gekaufte Maschinen → eingehender Transport → Geschäftsreisen</p></article><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Downstream</p><p className="font-display mt-4 text-3xl leading-tight text-ink">Aktivitäten nach dem Verkauf</p><p className="mt-4 text-sm leading-6 text-muted">Transport zum Kunden → weitere Verarbeitung → Produktnutzung → End-of-Life</p></article></div>
              <p>Für einen produzierenden Zulieferer ist diese Unterscheidung besonders hilfreich, weil sowohl Einkauf als auch Verkauf erhebliche Scope-3-Aktivitäten erzeugen können.</p>
            </ArticleSection>

            <ArticleSection id="scope-3-kategorien" number="09" title="Die 15 Scope-3-Kategorien im Überblick">
              <p>Das GHG Protocol verwendet diese 15 Kategorien als systematische Struktur für Scope-3-Inventare. Nicht jede Kategorie trifft auf jedes Geschäftsmodell zu.</p>
              <div className="my-9 grid gap-8" data-scope3-categories="all-15">
                <section aria-labelledby="upstream-categories-title"><div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-orange" /><h3 className="font-display text-3xl text-ink" id="upstream-categories-title">Upstream Scope 3 · Kategorien 1–8</h3></div><ol className="mt-5 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)]">{upstreamCategories.map(([number, name, description]) => <li className="grid min-w-0 grid-cols-[2.6rem_minmax(0,1fr)] gap-3 bg-white p-5 sm:grid-cols-[3rem_minmax(13rem,0.7fr)_minmax(0,1fr)] sm:gap-5" key={number}><span className="font-mono text-xs font-bold text-orange">{number.padStart(2, "0")}</span><h4 className="min-w-0 break-words font-bold leading-6 text-ink">{name}</h4><p className="col-start-2 min-w-0 break-words text-sm leading-6 text-muted sm:col-start-3">{description}</p></li>)}</ol></section>
                <section aria-labelledby="downstream-categories-title"><div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-ink" /><h3 className="font-display text-3xl text-ink" id="downstream-categories-title">Downstream Scope 3 · Kategorien 9–15</h3></div><ol className="mt-5 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)]">{downstreamCategories.map(([number, name, description]) => <li className="grid min-w-0 grid-cols-[2.6rem_minmax(0,1fr)] gap-3 bg-white p-5 sm:grid-cols-[3rem_minmax(13rem,0.7fr)_minmax(0,1fr)] sm:gap-5" key={number}><span className="font-mono text-xs font-bold text-orange">{number.padStart(2, "0")}</span><h4 className="min-w-0 break-words font-bold leading-6 text-ink">{name}</h4><p className="col-start-2 min-w-0 break-words text-sm leading-6 text-muted sm:col-start-3">{description}</p></li>)}</ol></section>
              </div>
            </ArticleSection>

            <ArticleSection id="produktionsbeispiel" number="10" title="Ein Produktionsunternehmen als komplettes Beispiel">
              <p>Nehmen wir eine fiktive GmbH, die industrielle Pumpen produziert.</p>
              <div className="my-8 grid gap-4 sm:grid-cols-2">{[
                ["Scope 1", "Erdgas für die Heizung, eigene Dieseltransporter und Kältemittelverlust aus einer Klimaanlage."],
                ["Scope 2", "Eingekaufter Strom für Maschinen und Fernwärme für ein Büro."],
                ["Scope 3 upstream", "Stahl, Elektromotoren, Verpackungen, eine neue CNC-Maschine sowie Lieferanten und externe Spediteure."],
                ["Scope 3 downstream", "Externer Transport, weitere Verarbeitung, Energie in der Nutzungsphase und Entsorgung oder Recycling."]
              ].map(([scope, example]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] p-6" key={scope}><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">{scope}</p><p className="mt-4 text-sm leading-7 text-muted">{example}</p></article>)}</div>
              <Principle>Die drei Scopes beschreiben drei unterschiedliche Beziehungen zwischen einem Unternehmen und seinen Emissionsquellen.</Principle>
              <p className="text-sm text-muted">Das Beispiel ist fiktiv und enthält keine Kundendaten.</p>
            </ArticleSection>

            <ArticleSection id="unterschiedliche-perspektiven" number="11" title="Warum kann dieselbe Emission bei zwei Unternehmen auftauchen?">
              <p>Ein Stahlhersteller verbrennt Erdgas. Für den Stahlhersteller sind die direkten Emissionen <strong>Scope 1</strong>. Kauft ein Maschinenbauer diesen Stahl, können die vorgelagerten Emissionen des Materials für ihn Teil von <strong>Scope 3 Category 1</strong> sein.</p>
              <div className="my-8 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><article className="rounded-[1rem] bg-ink p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Stahlhersteller</p><p className="font-display mt-4 text-3xl">Erdgas → Scope 1</p></article><span aria-hidden="true" className="hidden text-2xl text-orange sm:block">→</span><article className="rounded-[1rem] bg-[var(--soft-orange)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Maschinenbauer</p><p className="font-display mt-4 text-3xl">Stahl → Scope 3.1</p></article></div>
              <p>Das ist nicht automatisch ein Fehler. Die Scopes werden aus Sicht jedes berichtenden Unternehmens bestimmt. Über verschiedene Unternehmen entlang einer Wertschöpfungskette können sich Inventare naturgemäß überlagern.</p>
            </ArticleSection>

            <ArticleSection id="nicht-automatisch-scope-3" number="12" title="Was gehört NICHT automatisch in Scope 3?">
              <Principle label="Häufiger Fehler">„Alles, was extern passiert, ist Scope 3.“</Principle>
              <p>Ihr Unternehmen kauft Strom aus dem Netz. Die Stromerzeugung passiert extern. Trotzdem ist die entsprechende Erzeugungsemission Scope 2 und nicht einfach Scope 3.</p>
              <p>Auch ein gemietetes Asset kann – abhängig von Boundary und Kontrollansatz – möglicherweise in Scope 1 und 2 liegen und nicht automatisch in Scope 3.</p>
              <ScopeFlow rows={[["Organisationsgrenze", "eigene/kontrollierte Quellen", "Scope 1"], ["Energiebezug", "eingekaufte Energie", "Scope 2"], ["übrige Value Chain", "anwendbare Kategorien", "Scope 3"]]} />
            </ArticleSection>

            <ArticleSection id="nicht-nur-firmengelaende" number="13" title="Scope 1 ist nicht einfach „alles im eigenen Gebäude“.">
              <p>Ein Firmenfahrzeug fährt 500 Kilometer von Ihrem Werk entfernt. Der Kraftstoffverbrauch kann trotzdem Scope 1 sein. Umgekehrt kann eine externe Anlage direkt neben Ihrem Werk stehen, ohne Teil Ihres Scope 1 zu sein.</p>
              <BulletList items={["Eigentum", "Kontrolle", "gewählte organisatorische Bilanzgrenze"]} />
              <p>Diese Beziehungen entscheiden – nicht die geografische Entfernung zur Firmenzentrale.</p>
            </ArticleSection>

            <ArticleSection id="scope-3-manufacturing" number="14" title="Warum Scope 3 für Produktionsunternehmen oft besonders relevant ist.">
              <p>Vor dem eigenen Werk können Emissionen durch Rohstoffgewinnung, Materialproduktion, Vorprodukte, Energieeinsatz beim Lieferanten und Logistik entstehen. Danach können Distribution, Verarbeitung, Nutzung und End-of-Life folgen.</p>
              <p>Ein Unternehmen kann deshalb relativ überschaubare direkte Emissionen besitzen, während ein großer Teil seines gesamten Wertschöpfungsketten-Fußabdrucks außerhalb der eigenen Werke liegt.</p>
              <Principle>Das heißt nicht: „Scope 3 ist immer der größte Scope.“ Die tatsächliche Verteilung hängt vom Geschäftsmodell ab.</Principle>
            </ArticleSection>

            <ArticleSection id="scope-3-screening" number="15" title="Muss jedes Unternehmen alle 15 Scope-3-Kategorien berechnen?">
              <p>Die 15 Kategorien bilden die systematische Struktur des GHG Protocol Scope 3 Standard. Aber nicht jede Kategorie ist für jedes Geschäftsmodell tatsächlich relevant. Ein normales Produktionsunternehmen hat möglicherweise keine Franchises, keine relevanten Downstream Leased Assets oder keine Investment-Aktivitäten im Sinne der jeweiligen Kategorie.</p>
              <p>Die erste Scope-3-Arbeit besteht deshalb häufig aus einem Screening:</p>
              <ol className="my-8 grid gap-3">{[
                "Welche Kategorien treffen grundsätzlich auf unser Geschäftsmodell zu?",
                "Wo könnten wesentliche Emissionen liegen?",
                "Welche Daten besitzen wir?",
                "Welche Daten müssen von Lieferanten oder anderen Partnern kommen?",
                "Welche Berechnungsmethode ist angemessen?"
              ].map((step, index) => <li className="grid grid-cols-[2.4rem_1fr] gap-4 border-t border-[rgba(21,21,21,0.12)] pt-4" key={step}><span className="font-mono text-xs font-bold text-orange">{index + 1}</span><span className="font-semibold leading-6 text-ink">{step}</span></li>)}</ol>
              <p>GHG Protocol stellt für alle 15 Kategorien eigene Calculation Guidance und unterschiedliche Berechnungsmethoden bereit.</p>
            </ArticleSection>

            <ArticleSection id="scope-3-pflicht" number="16" title="Muss man Scope 3 überhaupt berechnen?">
              <p>Hier muss man unterscheiden. Der klassische GHG Protocol Corporate Standard verlangt für ein Corporate Inventory Scope 1 und Scope 2; Scope 3 war in diesem ursprünglichen Corporate Standard optional. Wer dagegen ein Inventory nach dem separaten Corporate Value Chain (Scope 3) Standard erstellt, arbeitet nach dessen Anforderungen und 15-Kategorien-Struktur.</p>
              <p>Zusätzlich können Scope-3-Informationen durch Reporting Frameworks, Kundenanforderungen, Klimaziele, Banken oder Supplier Assessments relevant werden.</p>
              <Principle>Die richtige Frage lautet: „Für welchen Reporting- oder Kundenkontext erstellen wir die Bilanz?“</Principle>
            </ArticleSection>

            <ArticleSection id="scope-1-daten" number="17" title="Welche Daten braucht Scope 1?">
              <p>Für viele Produktionsunternehmen sind die Daten relativ greifbar: Erdgas in kWh oder m³, Heizöl in Litern, Diesel oder Benzin in Litern, andere Brennstoffe, Kältemitteltyp und kg sowie Daten zu relevanten Prozessemissionen.</p>
              <p>Typische Quellen sind Rechnungen, Tankkarten, Anlagenregister, Wartungsprotokolle und Produktionsdaten.</p>
            </ArticleSection>

            <ArticleSection id="scope-2-daten" number="18" title="Welche Daten braucht Scope 2?">
              <p>Typischerweise benötigen Sie Stromverbrauch je Standort, kWh oder MWh, Lieferant, Berichtszeitraum, Energievertrag, gegebenenfalls produkt- oder lieferantenspezifische Informationen sowie Daten zu Fernwärme, Fernkälte und Dampf.</p>
              <div className="my-8 flex items-start gap-4 rounded-[1rem] bg-[var(--soft-orange)] p-6"><FileCheck2 aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-orange" /><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Detaillierte Datensammlung</p><p className="mt-3 leading-7 text-ink">Weiterlesen: <Link href="/de/ressourcen/scope-1-2-daten-berechnung">Scope 1 und Scope 2: Welche Daten braucht man?</Link> Oder direkt mit der <Link href="/de/ressourcen/scope-1-2-datenerfassungs-vorlage">Scope 1 &amp; 2 Datenerfassungs-Vorlage</Link> starten.</p></div></div>
            </ArticleSection>

            <ArticleSection id="scope-3-daten" number="19" title="Welche Daten braucht Scope 3?">
              <p>Hier wird es vielfältiger. Es gibt keinen universellen Scope-3-Datensatz.</p>
              <div className="my-8 grid gap-4 sm:grid-cols-2">{[
                ["Einkauf", "Materialmenge, Einkaufsvolumen, Produkttyp, Lieferanten- und produktspezifische Emissionsdaten"],
                ["Transport", "Gewicht, Entfernung und Transportmittel"],
                ["Abfall", "Menge, Abfallart und Behandlungsmethode"],
                ["Geschäftsreisen", "Verkehrsmittel, Entfernung und Reisedaten"],
                ["Mitarbeitendenmobilität", "Entfernung, Verkehrsmittel und Arbeitstage"],
                ["Verkauftes Produkt", "Stückzahl, Nutzungsprofil, Energieverbrauch, Lebensdauer und End-of-Life-Szenario"]
              ].map(([area, data]) => <article className="border-t border-[rgba(21,21,21,0.13)] pt-5" key={area}><h3 className="font-bold text-ink">{area}</h3><p className="mt-3 text-sm leading-6 text-muted">{data}</p></article>)}</div>
              <p>Je nach Kategorie erlaubt die GHG Protocol Calculation Guidance unterschiedliche Methoden und Datenqualitäten.</p>
            </ArticleSection>

            <ArticleSection id="primaer-sekundaer" number="20" title="Primärdaten oder Durchschnittswerte?">
              <p>Nicht jede Scope-3-Berechnung beginnt sofort mit perfekten Lieferantendaten. Je nach Kategorie und Datenverfügbarkeit können supplier-specific data, activity-based data, physical proxies, secondary emission factors oder spend-based approaches verwendet werden.</p>
              <p>Die passende Methode hängt von Kategorie, Materialität, Datenverfügbarkeit und Verwendungszweck ab. Ein erstes Screening kann mit gröberen Daten beginnen; für besonders relevante Quellen lässt sich die Datenqualität später verbessern.</p>
              <Principle>Schätzung nicht als Messung darstellen.</Principle>
              <p>Datenquelle, Methode und Annahmen sollten dokumentiert bleiben. Wie daraus belastbare Evidence entsteht, erklärt der Leitfaden zu <Link href="/de/ressourcen/esg-nachweise-lieferanten">ESG-Nachweisen für Lieferanten</Link>. Unsere Prüfgrundsätze finden Sie unter <Link href="/de/methodology">Unsere Methodik</Link>.</p>
            </ArticleSection>

            <ArticleSection id="lieferantenperspektive" number="21" title="Was bedeutet Scope 1, 2 und 3 für einen Lieferanten?">
              <p>Ihr Kunde fragt möglicherweise: „Bitte geben Sie Ihre Scope-1- und Scope-2-Emissionen an.“ Ein möglicher Grund ist, dass Ihre Emissionen für ihn Teil seiner eigenen Scope-3-Wertschöpfungskette sein können.</p>
              <p>Produzieren Sie Metallteile für einen Automobilzulieferer, gehören Ihre Erdgasemissionen, Stromeinkäufe und Produktionsaktivitäten zunächst zu Ihrem eigenen Corporate Inventory. Beim Kunden können Emissionen aus den von Ihnen gekauften Produkten wiederum in dessen Scope 3 relevant werden.</p>
              <Principle label="Perspektive">Ihr Scope 1 und 2 → potenziell Teil der Scope-3-Wertschöpfungskette Ihres Kunden</Principle>
            </ArticleSection>

            <ArticleSection id="esg-fragebogen" number="22" title="Scope 1, 2 und 3 in einem ESG-Fragebogen">
              <p>Wenn ein Kunde nach Scope 1 fragt, sollten Sie nicht einfach den gesamten Corporate Carbon Footprint eintragen. Bei Scope 2 sollte klar sein, ob location-based, market-based oder beides verlangt wird.</p>
              <p>Bei Scope 3 sollten Sie prüfen, ob eine Gesamtsumme verlangt wird, welche Kategorien enthalten sind, welches Jahr und welche Boundary gelten und welche Methodik verwendet wurde. Ein Feld mit der Beschriftung „Scope 3 emissions“ ist ohne Kontext weniger eindeutig, als es aussieht.</p>
              <p>Wenn ein Kunde bereits eine solche Anfrage gestellt hat: <Link href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">ESG-Fragebogen vom Kunden erhalten – was jetzt?</Link></p>
            </ArticleSection>

            <ArticleSection id="vollstaendiger-fussabdruck" number="23" title="Scope 1 + Scope 2 ist nicht automatisch der komplette Carbon Footprint.">
              <p>Wenn ein Unternehmen ausschließlich Scope 1 und 2 berechnet, hat es Scope 1 und Scope 2 berechnet – nicht automatisch alle Emissionen seiner gesamten Wertschöpfungskette.</p>
              <p>Begriffe wie CO₂-Bilanz, Corporate Carbon Footprint, GHG Inventory und Scope 1 &amp; 2 werden in der Praxis oft unscharf verwendet.</p>
              <Principle label="Saubere Dokumentation">Boundary + Zeitraum + enthaltene Scopes + verwendete Methodik</Principle>
            </ArticleSection>

            <ArticleSection id="product-carbon-footprint" number="24" title="Und was ist ein Product Carbon Footprint?">
              <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] bg-ink p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Corporate GHG Inventory</p><p className="font-display mt-4 text-3xl leading-tight">betrachtet Emissionen aus Sicht eines Unternehmens.</p></article><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Product Carbon Footprint</p><p className="font-display mt-4 text-3xl leading-tight text-ink">betrachtet den Lebenszyklus oder eine definierte Systemgrenze eines Produkts.</p></article></div>
              <p>Scope 1, 2 und 3 sind primär eine Corporate-Inventory-Systematik. Sie sollten nicht einfach mit einzelnen Lebenszyklusphasen eines Produktes gleichgesetzt werden. Ein Kunde, der den Carbon Footprint eines Bauteils verlangt, stellt eine andere Datenfrage als ein Kunde, der Ihre Corporate Scope-1- und Scope-2-Emissionen verlangt.</p>
            </ArticleSection>

            <ArticleSection id="wo-anfangen" number="25" title="Wo sollte ein Unternehmen anfangen?">
              <p>Wenn bisher noch keine Treibhausgasbilanz existiert, ist dies eine praktische Empfehlung – keine universelle gesetzliche Reihenfolge:</p>
              <ol className="my-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)]">{[
                "Berichtsjahr festlegen.",
                "Organisatorische Bilanzgrenze definieren.",
                "Scope-1-Quellen identifizieren.",
                "Scope-2-Energie erfassen.",
                "Scope 1 und 2 sauber berechnen und dokumentieren.",
                "Scope-3-Kategorien screenen.",
                "Wesentliche Kategorien priorisieren.",
                "Datenqualität schrittweise verbessern."
              ].map((step, index) => <li className="grid grid-cols-[3rem_1fr] gap-4 bg-white p-5" key={step}><span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span><span className="font-semibold leading-6 text-ink">{step}</span></li>)}</ol>
              <p>Damit entsteht eine belastbare Basis statt einer riesigen Excel-Datei voller Schätzungen ohne klare Herkunft.</p>
            </ArticleSection>

            <ArticleSection id="scope-1-2-erster-schritt" number="26" title="Warum Scope 1 und 2 häufig der beste erste operative Schritt sind.">
              <p>Für viele kleinere Produktionsunternehmen liegen Gasrechnung, Stromrechnung, Tankkarten, Heizöl-, Kältemittel- und Fernwärmeunterlagen bereits intern. Das macht Scope 1 und 2 häufig greifbarer als eine vollständige Scope-3-Bilanz.</p>
              <Principle>Erst Scope 1 und 2 strukturiert aufbauen – Scope 3 danach gezielt nach Geschäftsmodell und Informationsbedarf erweitern.</Principle>
              <p>Weiterlesen: <Link href="/de/scope-1-2-berechnung">Scope 1 und Scope 2 berechnen</Link></p>
            </ArticleSection>

            <ArticleSection id="vsme" number="27" title="Wie passt das zum VSME?">
              <p>Für Unternehmen, die den aktuellen VSME beziehungsweise Voluntary Standard nutzen, sind Scope 1 und location-based Scope 2 Teil der grundlegenden Emissionsdatenerfassung unter B3, mit den im Standard vorgesehenen Differenzierungen für sehr kleine Unternehmen.</p>
              <p>Scope 3 kann abhängig von Unternehmensaktivität und Informationsbedarf zusätzlich relevant werden; Manufacturing wird im aktuellen Standard ausdrücklich als ein Bereich genannt, in dem relevante Scope-3-Kategorien auftreten können.</p>
              <p>Für die vollständige Datenvorbereitung: <Link href="/de/ressourcen/vsme-daten-nachhaltigkeitsbericht">VSME: Welche Daten braucht ein Nachhaltigkeitsbericht?</Link></p>
            </ArticleSection>

            <ArticleSection id="standards-revision" number="28" title="Die GHG-Protocol-Standards werden überarbeitet – ändern sich die drei Scopes jetzt?">
              <p>Noch nicht in dem Sinn, dass Unternehmen die aktuellen Standards ignorieren sollten. GHG Protocol und ISO haben 2026 angekündigt, ihre Corporate-GHG-Standards in einem neuen harmonisierten globalen Corporate Standard zusammenzuführen.</p>
              <p>Der zukünftige Standard soll unter anderem Corporate Standard, Scope 2 Guidance, Scope 3 Standard, Actions and Market Instruments und ISO 14064-1 zusammenführen.</p>
              <div className="my-8 grid gap-4 sm:grid-cols-2"><article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Q2 2027</p><p className="font-display mt-4 text-3xl leading-tight text-ink">konsolidierte öffentliche Konsultation vorgesehen</p></article><article className="rounded-[1rem] border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Q4 2028</p><p className="font-display mt-4 text-3xl leading-tight text-ink">finaler gemeinsamer Corporate Standard derzeit geplant</p></article></div>
              <p>Auch Scope 2 und Scope 3 befinden sich in Revision-Prozessen.</p>
              <Principle>Vorschläge und Drafts sind keine bereits geltenden neuen Regeln.</Principle>
              <p>Für eine Berechnung heute gilt: Arbeiten Sie mit der aktuell anwendbaren Methodik und dokumentieren Sie Boundary, Daten, Faktoren, Methoden und Annahmen so, dass spätere Updates nachvollziehbar umgesetzt werden können.</p>
            </ArticleSection>

            <ArticleSection id="missverstaendnisse" number="29" title="Die häufigsten Scope-Verwechslungen">
              <div className="my-8 rounded-[1rem] bg-ink p-6 text-white sm:p-8"><CircleAlert aria-hidden="true" className="h-8 w-8 text-orange" /><div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">{[
                ["„Strom ist Scope 3, weil das Kraftwerk extern ist.“", "Nein. Eingekaufte Elektrizität fällt grundsätzlich unter Scope 2."],
                ["„Alles auf unserem Gelände ist Scope 1.“", "Nein. Entscheidend sind Ownership, Control und die Bilanzgrenze."],
                ["„Scope 3 bedeutet nur Lieferanten.“", "Nein. Scope 3 umfasst upstream und downstream."],
                ["„Scope 3 bedeutet nur eingekaufte Materialien.“", "Nein. Es gibt 15 Kategorien."],
                ["„Ökostrom bedeutet immer Scope 2 = 0.“", "Zu einfach. Scope-2-Methode und contractual instruments müssen berücksichtigt werden."],
                ["„Scope 1 + Scope 2 = gesamte Klimabilanz.“", "Nicht automatisch. Die Wertschöpfungskette kann zusätzliche Scope-3-Emissionen enthalten."],
                ["„Keine perfekten Lieferantendaten = Scope 3 unmöglich.“", "Nicht zwingend. Je nach Kategorie existieren verschiedene Berechnungsmethoden."]
              ].map(([claim, correction], index) => <article className="border-t border-white/18 pt-4" key={claim}><p className="font-mono text-xs text-orange">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 font-bold">{claim}</h3><p className="mt-2 text-sm leading-6 text-white/62">{correction}</p></article>)}</div></div>
            </ArticleSection>

            <ArticleSection id="wichtigster-unterschied" number="30" title="Der wichtigste Unterschied in einem Satz.">
              <p>Wenn Sie sich nur eine Sache merken:</p>
              <div className="my-8 grid gap-4 sm:grid-cols-3">{[
                ["Scope 1", "Emissionen aus Quellen, die wir besitzen oder kontrollieren."],
                ["Scope 2", "Emissionen aus der Erzeugung der Energie, die wir einkaufen und verbrauchen."],
                ["Scope 3", "Weitere indirekte Emissionen unserer vor- und nachgelagerten Wertschöpfungskette."]
              ].map(([scope, definition]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] p-5" key={scope}><p className="font-display text-3xl text-orange">{scope}</p><p className="mt-4 text-sm leading-6 text-muted">{definition}</p></article>)}</div>
              <Principle label="Danach beginnt die Arbeit">Quelle identifizieren → Daten sammeln → Methode wählen → berechnen → dokumentieren.</Principle>
            </ArticleSection>

            <section aria-labelledby="article-cta-title" className="my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12">
              <Factory aria-hidden="true" className="h-7 w-7 text-orange" /><p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-orange">Ihr nächster Schritt</p><h2 className="font-display mt-5 max-w-[17ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]" id="article-cta-title">Sie kennen die Scopes – aber die Zahlen fehlen noch?</h2><div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-white/68"><p>Für Scope 1 und Scope 2 liegen die Ausgangsdaten häufig bereits im Unternehmen.</p><p>Senden Sie uns vorhandene Energie-, Kraftstoff- und Verbrauchsdaten. Wir strukturieren die Emissionsquellen, dokumentieren die Berechnungsgrundlage und machen offene Datenlücken sichtbar.</p></div><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>Scope-1-&amp;-2-Berechnung anfragen</ButtonLink><ButtonLink className="w-full sm:w-auto" href="/de/scope-1-2-berechnung" variant="light">Scope 1 und Scope 2 berechnen</ButtonLink><Link className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/25 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-orange hover:text-orange sm:w-auto" href="/de/ressourcen/scope-1-2-daten-berechnung">Welche Daten brauche ich für Scope 1 und Scope 2?</Link></div><p className="mt-6 text-sm font-semibold text-white/50">Scope 1 · Scope 2 · Aktivitätsdaten · Emissionsfaktoren · Nachweise</p>
            </section>

            <section aria-labelledby="faq-title" className="scroll-mt-24 border-t border-[rgba(21,21,21,0.12)] py-16" id="faq">
              <p className="eyebrow">FAQ</p><h2 className="font-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-none" id="faq-title">Häufige Fragen zu Scope 1, 2 und 3</h2><div className="mt-9 grid gap-3">{faqItems.map(([question, answer]) => <details className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white px-5 py-5 sm:px-6" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold leading-6 text-ink marker:content-none">{question}<span aria-hidden="true" className="text-2xl font-light text-orange transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{answer}</p></details>)}</div>
            </section>

            <section aria-labelledby="sources-title" className="border-t border-[rgba(21,21,21,0.12)] pb-16 pt-12">
              <div className="flex items-center gap-3"><Link2 aria-hidden="true" className="h-4 w-4 text-orange" /><h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink" id="sources-title">Quellen &amp; weiterführende Informationen</h2></div><ul className="mt-6 grid gap-6 text-sm leading-6 text-muted"><li><ExternalSourceLink href={CORPORATE_STANDARD_URL}>GHG Protocol — Corporate Standard</ExternalSourceLink><p className="mt-1">Grundlage für das Corporate GHG Inventory, Scope 1 und den grundlegenden Scope-2-Rahmen.</p></li><li><ExternalSourceLink href={SCOPE_2_GUIDANCE_URL}>GHG Protocol — Scope 2 Guidance</ExternalSourceLink><p className="mt-1">Offizielle Guidance zu Elektrizität, Dampf, Wärme und Kälte sowie location-based und market-based Accounting.</p></li><li><ExternalSourceLink href={SCOPE_3_STANDARD_URL}>GHG Protocol — Corporate Value Chain (Scope 3) Standard</ExternalSourceLink><p className="mt-1">Offizieller Scope-3-Rahmen und Struktur der 15 Kategorien.</p></li><li><ExternalSourceLink href={SCOPE_3_CALCULATION_URL}>GHG Protocol — Scope 3 Calculation Guidance</ExternalSourceLink><p className="mt-1">Berechnungsmethoden und Datengrundlagen für alle 15 Kategorien.</p></li><li><ExternalSourceLink href={STANDARDS_UPDATE_FAQ_URL}>GHG Protocol — Corporate Standards Update / July 2026 FAQ</ExternalSourceLink><p className="mt-1">Aktueller offizieller Revisionsstatus und Zeitplan von Q2 2027 bis Q4 2028.</p></li><li><ExternalSourceLink href={EFRAG_STANDARD_URL}>EFRAG Knowledge Hub — Voluntary Standard</ExternalSourceLink><p className="mt-1">Offizielle aktuelle Grundlage für die im Artikel knapp erläuterte VSME-Verbindung.</p></li></ul><p className="mt-7 text-xs leading-6 text-[rgba(21,21,21,0.48)]">Evipace ist unabhängig von GHG Protocol, WRI, WBCSD, ISO und EFRAG. Die Verweise dienen ausschließlich der fachlichen Einordnung.</p>
            </section>
          </div><aside className="hidden lg:block"><div className="sticky top-28 border-l border-[rgba(21,21,21,0.12)] pl-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">Orientierung</p><nav aria-label="Artikelabschnitte" className="mt-5 grid gap-3 text-sm leading-5 text-muted">{articleNavItems.map((item) => <a className="transition hover:text-orange" href={item.href} key={item.href}>{item.label}</a>)}</nav></div></aside></div></div></div>
        </article>
      </main>
    </>
  );
}
