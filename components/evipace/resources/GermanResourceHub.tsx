import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  GitBranch,
  Send,
  ShieldCheck
} from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { allEvidenceChecks } from "./esg-evidence-readiness-data";
import { allChecklistItems } from "./esg-questionnaire-checklist-data";

const links = {
  customerData: "/de/ressourcen/welche-esg-daten-kunden-lieferanten",
  environmentalPolicy: "/de/ressourcen/environmental-policy-erstellen",
  supplierCode: "/de/ressourcen/supplier-code-of-conduct-erstellen",
  reusableData: "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen",
  request: "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
  owners: "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
  checklist: "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
  evidenceCheck: "/de/ressourcen/esg-nachweise-checkliste",
  evidence: "/de/ressourcen/esg-nachweise-lieferanten",
  ecovadis: "/de/ressourcen/ecovadis-dokumente-nachweise",
  integrityNext: "/de/ressourcen/integritynext-einladung-lieferanten",
  scopes: "/de/ressourcen/scope-1-2-3-einfach-erklaert",
  scopeData: "/de/ressourcen/scope-1-2-daten-berechnung",
  scopeDataTemplate: "/de/ressourcen/scope-1-2-datenerfassungs-vorlage",
  vsmeData: "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht"
} as const;

/**
 * Die kommerzielle Entsprechung zu den Leitfäden oben. Der Hub bleibt
 * redaktionell, deshalb steht dieser Block als ruhiges Band am Seitenfuß —
 * aber jede Leistung bekommt von hier einen echten, beschreibenden Link.
 */
const services = [
  {
    title: "ESG-Kundenanfragen",
    href: "/de/esg-kundenanfragen",
    body: "Kundenanfragen in jedem Format – von Excel-Dateien bis zu Portalformularen."
  },
  {
    title: "ESG-Fragebögen für Lieferanten",
    href: "/de/esg-fragebogen-lieferanten",
    body: "Ein konkreter Fragebogen oder ein Lieferanten-Assessment, das Feld für Feld beantwortet werden muss."
  },
  {
    title: "EcoVadis-Unterstützung",
    href: "/de/ecovadis-unterstuetzung",
    body: "Antworten, Nachweise und offene Punkte strukturiert vor der Einreichung vorbereiten."
  },
  {
    title: "IntegrityNext-Unterstützung",
    href: "/de/integritynext-unterstuetzung",
    body: "Profil, Assessments, Zertifikate und die Unternehmensdaten hinter jeder Angabe."
  },
  {
    title: "Scope 1 & 2 berechnen",
    href: "/de/scope-1-2-berechnung",
    body: "Eine dokumentierte Berechnung mit Aktivitätsdaten, Faktoren, Quellen und Annahmen."
  },
  {
    title: "VSME-Nachhaltigkeitsbericht",
    href: "/de/vsme-nachhaltigkeitsbericht",
    body: "Freiwillige Berichterstattung auf einer geprüften Datengrundlage."
  }
];

const checklistCount = allChecklistItems.length;
const evidenceCheckCount = allEvidenceChecks.length;

type ResourceCardProps = {
  title: string;
  type: string;
  description: string;
  cta: string;
  href: string;
  featured?: boolean;
};

function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  light = false
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="min-w-0 max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={id}
        className={`font-display mt-5 scroll-mt-28 break-words hyphens-auto text-[clamp(2.6rem,5.2vw,5rem)] leading-[0.98] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <div
          className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${
            light ? "text-white/64" : "text-muted"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink transition hover:text-orange"
      href={href}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 text-orange transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

function ResourceCard({
  title,
  type,
  description,
  cta,
  href,
  featured = false
}: ResourceCardProps) {
  return (
    <article
      className={`flex h-full min-w-0 flex-col border-t pt-6 ${
        featured
          ? "border-orange bg-[var(--soft-orange)] px-5 pb-5 sm:px-6"
          : "border-[rgba(21,21,21,0.16)]"
      }`}
    >
      <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-orange">
        {type}
      </p>
      <h3 className="font-display mt-4 break-words hyphens-auto text-[2rem] leading-[1.06] text-ink">
        {title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted">{description}</p>
      <div className="mt-5">
        <InlineLink href={href}>{cta}</InlineLink>
      </div>
    </article>
  );
}

const startSteps = [
  {
    number: "01",
    label: "DATENANFORDERUNG VERSTEHEN",
    title: "Welche ESG-Daten verlangen Kunden von Lieferanten?",
    description:
      "Ein kompakter Einstieg in typische Datenbereiche: Unternehmens- und Standortdaten, Energie, Emissionen, Umwelt, Mitarbeitende, Policies, Lieferkette, Compliance und Nachweise.",
    cta: "Datenanforderungen ansehen",
    href: links.customerData,
    interactive: false
  },
  {
    number: "02",
    label: "ANFRAGE VERSTEHEN",
    title: "ESG-Fragebogen vom Kunden erhalten – was jetzt?",
    description:
      "Ein Kunde hat einen ESG- oder Nachhaltigkeitsfragebogen geschickt? Dieser Leitfaden zeigt, was Sie zuerst prüfen sollten: Deadline, Scope, benötigte Daten, interne Quellen, Nachweise und echte Informationslücken.",
    cta: "Mit der Anfrage beginnen",
    href: links.request,
    interactive: false
  },
  {
    number: "03",
    label: "VERANTWORTLICHE FINDEN",
    title: "Wer liefert welche ESG-Daten im Unternehmen?",
    description:
      "Stromdaten liegen vielleicht bei Finance, Mitarbeiterdaten bei HR, Zertifikate bei Quality und technische Informationen bei Facility oder Operations. Diese Übersicht zeigt, wer typischerweise welche Informationen besitzt und wie Source Owner, Calculation Owner, Statement Owner und Approver voneinander unterschieden werden.",
    cta: "Data Owner verstehen",
    href: links.owners,
    interactive: false
  },
  {
    number: "04",
    label: "ANFRAGE ABARBEITEN",
    title: "ESG-Fragebogen Checkliste für Lieferanten",
    description:
      "Eine vollständige interaktive Checkliste vom Eingang der Anfrage bis zum finalen Submission Review. Arbeiten Sie sich durch Scope, Daten, Nachweise, Berechnungen, Policies, Gaps, Konsistenz und Freigaben.",
    cta: "Checkliste starten",
    href: links.checklist,
    interactive: true
  }
] as const;

const systemSteps = [
  "Anforderung",
  "Datenpunkt",
  "Verantwortlicher",
  "Quelle",
  "Nachweis",
  "Berechnung",
  "Review",
  "verwendbarer Output"
];

export function GermanResourceHub() {
  return (
    <main id="top">
      <header className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-32 top-20 h-[32rem] w-[32rem] rounded-full border border-orange/15" />
          <div className="absolute -right-16 top-36 h-[22rem] w-[22rem] rounded-full border border-orange/20" />
          <div className="absolute bottom-0 left-[54%] top-0 w-px bg-gradient-to-b from-transparent via-orange/15 to-transparent" />
        </div>
        <div className="site-shell">
          <nav
            aria-label="Brotkrümelnavigation"
            className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
          >
            <Link className="transition hover:text-orange" href="/de">
              Startseite
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">
              Ressourcen
            </span>
          </nav>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(18rem,0.52fr)] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow">RESSOURCEN · LEITFÄDEN · CHECKLISTEN</p>
              <h1 className="font-display mt-7 max-w-[16ch] text-[clamp(3.5rem,7.4vw,7.2rem)] leading-[0.9]">
                Praktische ESG-Ressourcen für Lieferanten.
              </h1>
              <p className="font-display mt-8 text-[clamp(1.65rem,3vw,2.8rem)] leading-tight text-ink">
                Keine Theorie-Sammlung.
              </p>
              <div className="mt-7 max-w-3xl space-y-4 text-[clamp(1.05rem,1.55vw,1.3rem)] leading-[1.65] text-muted">
                <p>
                  Hier finden Sie Leitfäden, Checklisten und praktische Hilfsmittel für die Aufgaben, die entstehen, wenn Kunden ESG-Daten, Nachweise, Emissionszahlen oder Nachhaltigkeitsinformationen verlangen.
                </p>
                <p>
                  Von der ersten Kundenanfrage bis zur strukturierten Datensammlung, Berechnung und finalen Prüfung.
                </p>
              </div>
            </div>

            <aside className="border-l-2 border-orange pl-6 lg:mb-2 lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                Themen
              </p>
              <p className="mt-4 text-sm font-semibold leading-7 text-muted">
                Kundenanfragen · Nachweise · Scope 1–3 · VSME · EcoVadis · IntegrityNext
              </p>
              <div className="mt-5">
                <InlineLink href="/de/send-request">ESG-Anfrage senden</InlineLink>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section aria-labelledby="start-title" className="bg-ink py-20 text-white sm:py-24 lg:py-28">
        <div className="site-shell">
          <SectionHeading id="start-title" eyebrow="START HERE" light title="Sie haben gerade eine ESG-Anfrage erhalten?">
            <p>Dann müssen Sie nicht zuerst alle ESG-Themen verstehen.</p>
            <p className="mt-3">Beginnen Sie mit der konkreten Anfrage und arbeiten Sie sich von dort aus vor.</p>
          </SectionHeading>

          <ol className="mt-14 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {startSteps.map((step, index) => (
              <li
                className={`relative flex min-w-0 flex-col rounded-[1.25rem] border p-6 sm:p-7 ${
                  step.interactive
                    ? "border-orange/55 bg-orange/[0.09]"
                    : "border-white/16 bg-white/[0.035]"
                }`}
                key={step.number}
              >
                {index < startSteps.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-[1.35rem] top-9 z-10 hidden h-5 w-5 text-orange xl:block"
                  />
                ) : null}
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-bold text-orange">{step.number}</span>
                  {step.interactive ? (
                    <span className="rounded-full bg-orange px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white">
                      Interaktiv
                    </span>
                  ) : null}
                </div>
                <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-orange">
                  {step.label}
                </p>
                <h3 className="font-display mt-4 text-[2rem] leading-[1.06] text-white">
                  {step.title}
                </h3>
                <p className="mt-5 flex-1 text-sm leading-7 text-white/62">{step.description}</p>
                {step.interactive ? (
                  <p className="mt-5 text-xs font-semibold leading-6 text-white/74">
                    {checklistCount} Prüfpunkte · Fortschritt lokal gespeichert · Druckbar
                  </p>
                ) : null}
                <Link
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white transition hover:text-orange"
                  href={step.href}
                >
                  {step.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-orange transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="customer-title" className="py-20 sm:py-24 lg:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <SectionHeading id="customer-title" eyebrow="KUNDENANFRAGEN" title="Wenn ein Kunde ESG-Daten verlangt.">
            <p>Die schwierigste Frage ist häufig nicht: „Was ist ESG?“</p>
            <p className="font-display mt-4 text-2xl leading-tight text-ink">„Was genau will unser Kunde – und wie bekommen wir die Antwort aus unserem Unternehmen zusammen?“</p>
            <p className="mt-4">Diese Ressourcen helfen beim operativen Teil der Kundenanfrage.</p>
          </SectionHeading>
          <div className="grid gap-10 sm:grid-cols-2">
            <ResourceCard
              cta="Überblick öffnen"
              description="Von Energie und Emissionen bis Mitarbeitende, Policies und Nachweise: Welche Informationen in ESG-Kundenanfragen typischerweise vorkommen."
              featured
              href={links.customerData}
              title="Welche ESG-Daten verlangen Kunden von Lieferanten?"
              type="LEITFADEN"
            />
            <ResourceCard
              cta="Leitfaden öffnen"
              description="Von Deadline und Reporting Scope bis zu internen Datenquellen, Nachweisen und dem ersten sinnvollen Arbeitsablauf."
              href={links.request}
              title="ESG-Fragebogen vom Kunden erhalten – was jetzt?"
              type="LEITFADEN"
            />
            <ResourceCard
              cta="Verantwortlichkeiten zuordnen"
              description="Eine praktische Data-Owner-Struktur für Finance, HR, Einkauf, Qualität, Facility, Operations, Compliance und Management."
              href={links.owners}
              title="Wer liefert welche ESG-Daten?"
              type="LEITFADEN"
            />
            <ResourceCard
              cta="Wiederverwendung planen"
              description="So strukturieren Lieferanten Daten, Quellen und Nachweise als wiederverwendbare Grundlage für neue Kundenanfragen."
              href={links.reusableData}
              title="ESG-Daten einmal sammeln, mehrfach nutzen"
              type="LEITFADEN"
            />
            <div className="sm:col-span-2">
              <ResourceCard
                cta="Checkliste starten"
                description={`${checklistCount} Prüfpunkte für die systematische Bearbeitung einer ESG-Kundenanfrage – von Scope und Datensammlung bis Evidence Review und Submission.`}
                featured
                href={links.checklist}
                title="ESG-Fragebogen Checkliste für Lieferanten"
                type="INTERAKTIVE CHECKLISTE"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="evidence-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-20 sm:py-24 lg:py-28">
        <div className="site-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <SectionHeading id="evidence-title" eyebrow="NACHWEISE & PLATTFORMEN" title="Eine Antwort ist nur so belastbar wie ihre Grundlage.">
              <p>Kunden und Supplier-Plattformen fragen nicht nur nach Aussagen. Sie wollen häufig auch wissen, worauf diese Aussagen basieren.</p>
            </SectionHeading>
            <div className="rounded-[1.1rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">Darum von Anfang an</p>
              <p className="font-display mt-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">Aussage → Quelle → Nachweis</p>
            </div>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            <ResourceCard
              cta="Nachweise strukturieren"
              description="Welche Dokumente eine Aussage tatsächlich stützen, worauf bei Scope, Aktualität und Nachvollziehbarkeit zu achten ist und wie ein Evidence Register aufgebaut werden kann."
              href={links.evidence}
              title="ESG-Nachweise für Lieferanten: Welche Dokumente zählen?"
              type="LEITFADEN"
            />
            <ResourceCard
              cta="Policy vorbereiten"
              description="So entwickeln Lieferanten eine Umweltrichtlinie aus tatsächlicher Praxis, klarem Scope, Verantwortlichkeiten und interner Freigabe."
              href={links.environmentalPolicy}
              title="Environmental Policy erstellen"
              type="LEITFADEN"
            />
            <ResourceCard
              cta="Supplier Code vorbereiten"
              description="So strukturieren Unternehmen realistische ESG- und Compliance-Erwartungen an Lieferanten – mit klarem Scope, Freigabe und Anwendung."
              href={links.supplierCode}
              title="Supplier Code of Conduct erstellen"
              type="LEITFADEN"
            />
            <ResourceCard
              cta="Nachweis prüfen"
              description="Interaktiver 30-Punkte-Check für ein konkretes Dokument, eine Kennzahl oder andere Evidence – mit Status, Red Flags, offenen Klärungen und druckbarer Übersicht."
              featured
              href={links.evidenceCheck}
              title="ESG-Nachweise prüfen: Checkliste für Lieferanten"
              type="INTERAKTIVER CHECK"
            />
            <ResourceCard
              cta="EcoVadis-Nachweise verstehen"
              description="Welche Supporting Documents bei einem EcoVadis Assessment relevant sein können, wie Aussagen und Dokumente zusammenpassen und welche typischen Evidence-Fehler vermieden werden sollten."
              href={links.ecovadis}
              title="EcoVadis-Dokumente und Nachweise"
              type="PLATTFORM-LEITFADEN"
            />
            <ResourceCard
              cta="IntegrityNext-Ablauf verstehen"
              description="Was nach einer IntegrityNext-Einladung passiert, welche Assessments angefragt werden können und wie Zertifikate, Fragebögen, interne Zusammenarbeit und Nachbesserungsbedarf zusammenspielen."
              href={links.integrityNext}
              title="IntegrityNext für Lieferanten"
              type="PLATTFORM-LEITFADEN"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="carbon-title" className="py-20 sm:py-24 lg:py-28">
        <div className="site-shell">
          <SectionHeading id="carbon-title" eyebrow="EMISSIONEN" title="Scope verstehen. Daten sammeln. Berechnung vorbereiten.">
            <p>Bei Treibhausgasemissionen hilft eine klare Reihenfolge.</p>
            <p className="mt-3">Zuerst verstehen, was Scope 1, 2 und 3 bedeuten. Dann die richtigen Aktivitätsdaten sammeln. Erst danach rechnen.</p>
          </SectionHeading>
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <ResourceCard
              cta="Scopes verstehen"
              description="Was direkte Emissionen, eingekaufte Energie und Emissionen entlang der Wertschöpfungskette voneinander unterscheidet – mit konkreten Beispielen für produzierende Unternehmen und allen 15 Scope-3-Kategorien."
              href={links.scopes}
              title="Scope 1, 2 und 3 einfach erklärt"
              type="GRUNDLAGEN-LEITFADEN"
            />
            <ResourceCard
              cta="Benötigte Daten prüfen"
              description="Welche Ausgangsdaten Sie für eine Scope-1-&-2-Berechnung typischerweise benötigen – von Strom, Gas und Kraftstoffen bis zu Kältemitteln, Wärme und den zugrunde liegenden Quellen."
              href={links.scopeData}
              title="Scope 1 und Scope 2: Welche Daten braucht man?"
              type="PRAXIS-LEITFADEN"
            />
            <ResourceCard
              cta="Vorlage öffnen"
              description="Strom, Brennstoffe, Fahrzeuge, Kältemittel und weitere Aktivitätsdaten strukturiert je Standort erfassen."
              featured
              href={links.scopeDataTemplate}
              title="Scope 1 & 2 Datenerfassungs-Vorlage"
              type="INTERAKTIVE VORLAGE"
            />
          </div>
          <div className="mt-12 grid gap-7 rounded-[1.25rem] border border-orange/30 bg-white p-6 shadow-lift sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">Sie haben die Daten bereits?</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">Aus Verbrauchsdaten wird erst durch Bilanzgrenze, Methode, Emissionsfaktoren und dokumentierte Quellen eine nachvollziehbare Berechnung.</p>
            </div>
            <InlineLink href="/de/scope-1-2-berechnung">Scope 1 &amp; 2 berechnen lassen</InlineLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="reporting-title" className="bg-[var(--warm)] py-20 sm:py-24 lg:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <SectionHeading id="reporting-title" eyebrow="REPORTING" title="Nachhaltigkeitsdaten strukturiert vorbereiten.">
            <p>Ein Nachhaltigkeitsbericht beginnt nicht beim Layout.</p>
            <p className="font-display mt-4 text-2xl leading-tight text-ink">Er beginnt bei den Unternehmensdaten dahinter.</p>
          </SectionHeading>
          <div>
            <ResourceCard
              cta="VSME-Daten vorbereiten"
              description="Ein praktischer Überblick über die Daten, die für das aktuelle europäische freiwillige Nachhaltigkeitsreporting relevant sein können – von Energie und Emissionen über Wasser, Abfall und Mitarbeitende bis zu Policies und weiteren Unternehmensangaben."
              href={links.vsmeData}
              title="VSME: Welche Daten braucht ein Nachhaltigkeitsbericht?"
              type="LEITFADEN"
            />
            <div className="mt-10 border-l-2 border-orange pl-5 sm:pl-7">
              <h3 className="font-display text-2xl leading-tight">Sie möchten daraus einen Bericht erstellen?</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">Wir strukturieren die zugrunde liegenden Unternehmensdaten und bereiten die Inhalte für einen nachvollziehbaren Nachhaltigkeitsbericht vor.</p>
              <div className="mt-4"><InlineLink href="/de/vsme-nachhaltigkeitsbericht">VSME-Unterstützung ansehen</InlineLink></div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="tools-title" className="bg-ink py-20 text-white sm:py-24 lg:py-28">
        <div className="site-shell">
          <SectionHeading id="tools-title" eyebrow="TOOLS & CHECKLISTEN" light title="Ressourcen, mit denen Sie direkt arbeiten können.">
            <p>Nicht jede ESG-Ressource muss ein langer Leitfaden sein.</p>
            <p className="mt-3">Manche Aufgaben lassen sich besser mit einer klaren Arbeitsstruktur erledigen.</p>
          </SectionHeading>
          <div className="mt-14 grid gap-5 xl:grid-cols-2">
          <article className="overflow-hidden rounded-[1.4rem] border border-white/16 bg-white/[0.04]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-white/14 p-6 sm:p-9 lg:border-b-0 lg:border-r">
                <ClipboardCheck aria-hidden="true" className="h-10 w-10 text-orange" />
                <p className="mt-8 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-orange">INTERAKTIV</p>
                <h3 className="font-display mt-4 text-[clamp(2.3rem,4vw,4rem)] leading-[0.98]">ESG-Fragebogen Checkliste für Lieferanten</h3>
                <p className="mt-5 text-lg font-semibold text-white/82">Von der ersten Prüfung bis zum finalen Submit.</p>
              </div>
              <div className="p-6 sm:p-9">
                <p className="leading-7 text-white/62">Die Checkliste führt durch den vollständigen internen Preparation-Prozess:</p>
                <p className="font-display mt-5 text-2xl leading-[1.35] text-white">Anfrage → Scope → Verantwortliche → Daten → Nachweise → Berechnungen → Review → Submission → Wiederverwendung</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[`${checklistCount} Prüfpunkte`, "Lokal gespeichert", "Druckbar"].map((item) => (
                    <div className="flex items-center gap-2 rounded-lg border border-white/14 px-3 py-3 text-sm font-bold" key={item}>
                      <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-orange" />{item}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-7 text-white/58">Der Fortschritt wird ausschließlich lokal im Browser gespeichert. Die Checkliste kann jederzeit weitergeführt, zurückgesetzt oder gedruckt werden.</p>
                <div className="mt-7"><ButtonLink href={links.checklist}>Interaktive Checkliste öffnen</ButtonLink></div>
                <p className="mt-4 text-xs font-semibold text-white/46">Kein Login · lokale Speicherung · druckbar</p>
              </div>
            </div>
          </article>
          <article className="overflow-hidden rounded-[1.4rem] border border-orange/35 bg-orange/[0.07]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-white/14 p-6 sm:p-9 lg:border-b-0 lg:border-r">
                <ClipboardCheck aria-hidden="true" className="h-10 w-10 text-orange" />
                <p className="mt-8 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-orange">INTERAKTIV</p>
                <h3 className="font-display mt-4 text-[clamp(2.3rem,4vw,4rem)] leading-[0.98]">ESG-Nachweise prüfen</h3>
                <p className="mt-5 text-lg font-semibold text-white/82">Für ein konkretes Dokument oder eine konkrete Kennzahl.</p>
              </div>
              <div className="p-6 sm:p-9">
                <p className="leading-7 text-white/62">Der Evidence Readiness Check prüft nicht den ganzen Fragebogen, sondern einen einzelnen Nachweis:</p>
                <p className="font-display mt-5 text-2xl leading-[1.35] text-white">Aussage → Gesellschaft → Scope → Zeitraum → Quelle → Gültigkeit → Freigabe</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[`${evidenceCheckCount} Prüfpunkte`, "Lokal gespeichert", "Druckbar"].map((item) => (
                    <div className="flex items-center gap-2 rounded-lg border border-white/14 px-3 py-3 text-sm font-bold" key={item}>
                      <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-orange" />{item}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-7 text-white/58">Die Eingaben bleiben im Browser. Es werden keine Dokumente hochgeladen und keine Daten übertragen.</p>
                <div className="mt-7"><ButtonLink href={links.evidenceCheck}>Evidence Check öffnen</ButtonLink></div>
                <p className="mt-4 text-xs font-semibold text-white/46">Kein Login · keine Uploads · lokale Speicherung</p>
              </div>
            </div>
          </article>
          <article className="overflow-hidden rounded-[1.4rem] border border-white/16 bg-white/[0.04]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-white/14 p-6 sm:p-9 lg:border-b-0 lg:border-r">
                <ClipboardCheck aria-hidden="true" className="h-10 w-10 text-orange" />
                <p className="mt-8 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-orange">INTERAKTIVE VORLAGE</p>
                <h3 className="font-display mt-4 text-[clamp(2.3rem,4vw,4rem)] leading-[0.98]">Scope 1 &amp; 2 Datenerfassungs-Vorlage</h3>
                <p className="mt-5 text-lg font-semibold text-white/82">Für Aktivitätsdaten vor der CO₂e-Berechnung.</p>
              </div>
              <div className="p-6 sm:p-9">
                <p className="leading-7 text-white/62">Strom, Brennstoffe, Fahrzeuge, Kältemittel und weitere Aktivitätsdaten strukturiert je Standort erfassen.</p>
                <p className="font-display mt-5 text-2xl leading-[1.35] text-white">Standorte → Relevanz → Datensätze → Quellen → Datenlücken → CSV</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {["Lokal gespeichert", "CSV-Export", "Druckbar"].map((item) => (
                    <div className="flex items-center gap-2 rounded-lg border border-white/14 px-3 py-3 text-sm font-bold" key={item}>
                      <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-orange" />{item}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-7 text-white/58">Die Vorlage ist kein Emissionsrechner und enthält keine Emissionsfaktoren. Sie bereitet die Datenbasis für die spätere Berechnung vor.</p>
                <div className="mt-7"><ButtonLink href={links.scopeDataTemplate}>Vorlage öffnen</ButtonLink></div>
                <p className="mt-4 text-xs font-semibold text-white/46">Kein Login · lokale Speicherung · CSV-Export</p>
              </div>
            </div>
          </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="system-title" className="py-20 sm:py-24 lg:py-28">
        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading id="system-title" eyebrow="EIN SYSTEM STATT EINZELNER ANTWORTEN" title="Die nächste ESG-Anfrage sollte leichter werden.">
              <p>Viele Kundenanfragen verwenden andere Formulierungen. Die zugrunde liegenden Unternehmensinformationen bleiben jedoch oft dieselben.</p>
              <p className="mt-3">Ein guter ESG-Prozess verbindet deshalb nicht nur eine Frage mit einer Antwort.</p>
            </SectionHeading>
            <div>
              <GitBranch aria-hidden="true" className="h-9 w-9 text-orange" />
              <ol className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {systemSteps.map((step, index) => (
                  <li className="relative min-w-0 rounded-[0.9rem] border border-[rgba(21,21,21,0.12)] bg-white p-4" key={step}>
                    <span className="font-mono text-[0.62rem] font-bold text-orange">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-2 break-words text-sm font-bold leading-5 text-ink">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-7 text-base leading-8 text-muted">So kann aus einer einmaligen Kundenanfrage schrittweise eine wiederverwendbare ESG-Datenbasis entstehen.</p>
              <div className="mt-5">
                <InlineLink href={links.reusableData}>ESG-Daten für spätere Anfragen wiederverwendbar strukturieren</InlineLink>
              </div>
              <p className="font-display mt-5 text-2xl leading-tight text-ink">Nicht durch blindes Kopieren alter Antworten. Sondern durch strukturierte, überprüfbare Quellen.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="method-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-20 sm:py-24 lg:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <ShieldCheck aria-hidden="true" className="h-10 w-10 text-orange" />
            <SectionHeading id="method-title" eyebrow="WIE WIR INHALTE AUFBAUEN" title="Praktisch, nachvollziehbar und quellengestützt.">
              <p>Die Ressourcen von Evipace sollen operative ESG-Arbeit verständlicher machen.</p>
            </SectionHeading>
          </div>
          <div>
            <p className="text-base leading-8 text-muted">Dabei unterscheiden wir bewusst zwischen:</p>
            <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {[
                ["Unternehmensdaten", "Was tatsächlich aus dem Unternehmen stammt."],
                ["Berechnungen", "Wie aus Ausgangsdaten eine Kennzahl entsteht."],
                ["Nachweisen", "Welche Quelle eine Aussage stützt."],
                ["Annahmen", "Wo eine Methode Interpretation oder Schätzung benötigt."],
                ["Gaps", "Was tatsächlich noch fehlt."]
              ].map(([term, description]) => (
                <div className="border-t border-[rgba(21,21,21,0.14)] pt-4" key={term}>
                  <dt className="font-bold text-ink">{term}</dt>
                  <dd className="mt-2 text-sm leading-6 text-muted">{description}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 space-y-3 border-l-2 border-orange pl-5 text-sm leading-7 text-muted sm:pl-7">
              <p>Neue Dokumente werden nicht als historische Nachweise dargestellt.</p>
              <p>Unsichere Informationen werden nicht als gesicherte Tatsachen formuliert.</p>
              <p>Und relevante methodische oder regulatorische Änderungen werden nicht als geltende Regeln dargestellt, bevor sie tatsächlich gelten.</p>
            </div>
            <div className="mt-7"><InlineLink href="/de/methodology">Unsere Methodik ansehen</InlineLink></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="bridge-title" className="py-20 sm:py-24 lg:py-28">
        <div className="site-shell">
          <div className="overflow-hidden rounded-[1.5rem] border border-orange/25 bg-[var(--soft-orange)]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <Send aria-hidden="true" className="h-10 w-10 text-orange" />
                <SectionHeading id="bridge-title" eyebrow="VON DER RESSOURCE ZUR UMSETZUNG" title="Sie müssen nicht alles selbst zusammensetzen." />
              </div>
              <div className="border-t border-orange/20 bg-white/55 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <div className="space-y-4 text-base leading-8 text-muted">
                  <p>Die Ressourcen zeigen, wie einzelne ESG-Aufgaben strukturiert werden können.</p>
                  <p>Wenn bereits eine konkrete Kundenanfrage vorliegt, können Sie aber auch direkt damit starten.</p>
                  <p>Senden Sie uns den ursprünglichen Fragebogen, die Kunden-E-Mail oder die angeforderten Unterlagen.</p>
                  <p>Wir prüfen, welche Daten benötigt werden, welche Quellen bereits vorhanden sind, was berechnet werden muss und wo echte Gaps bestehen.</p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href="/de/send-request">ESG-Anfrage senden</ButtonLink>
                  <ButtonLink href="/de/esg-kundenanfragen" variant="secondary">ESG-Kundenanfragen ansehen</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="services-title"
        className="py-20 sm:py-24 lg:py-28"
      >
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">WENN SIE ES NICHT INTERN ERLEDIGEN MÖCHTEN</p>
            <h2
              className="font-display mt-5 text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.98] text-ink"
              id="services-title"
            >
              Dieselbe Arbeit – für Sie vorbereitet.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
              Hinter jedem Leitfaden steht eine Leistung. Gleiche Methodik,
              gleiche Nachweisdisziplin – nur übernimmt Evipace die Umsetzung.
            </p>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                className="border-t border-[rgba(21,21,21,0.16)] pt-5"
                key={service.href}
              >
                <h3 className="text-base font-bold leading-tight text-ink">
                  <Link
                    className="transition hover:text-orange"
                    href={service.href}
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="final-title" className="bg-orange py-20 text-white sm:py-24">
        <div className="site-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink">STARTEN SIE MIT DER ANFRAGE</p>
            <h2 className="font-display mt-6 text-[clamp(3rem,6vw,6rem)] leading-[0.92]" id="final-title">Der Kunde hat bereits gefragt?</h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/85">Sie müssen nicht zuerst entscheiden, welcher Leitfaden oder welche Leistung die richtige ist.</p>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-white/85">Senden Sie uns einfach das, was Ihr Kunde Ihnen geschickt hat. Wir beginnen mit der tatsächlichen Anfrage.</p>
          </div>
          <div className="lg:text-right">
            <ButtonLink href="/de/send-request" variant="dark">ESG-Anfrage senden</ButtonLink>
            <p className="mt-4 text-xs font-bold text-ink/68">Fragebogen · Excel · PDF · Portal · Kunden-E-Mail</p>
          </div>
        </div>
      </section>
    </main>
  );
}
