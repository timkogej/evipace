import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  FolderKanban,
  MinusCircle
} from "lucide-react";
import Link from "next/link";
import type { EvipaceImageAvailability } from "@/lib/evipace-image-availability";
import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "./ButtonLink";
import { AnimatedMarkHero } from "./hero-mark/AnimatedMarkHero";
import { DeliveryDossier } from "./home-sections/DeliveryDossier";
import { EditorialPlate } from "./home-sections/EditorialPlate";
import { EvidenceAssemblyBoard } from "./home-sections/EvidenceAssemblyBoard";
import { ProcessSpine } from "./home-sections/ProcessSpine";
import { ReuseDataPassport } from "./home-sections/ReuseDataPassport";
import { RequestStream } from "./home-sections/RequestStream";
import { ServiceImageCard } from "./home-sections/ServiceImageCard";
import type { ServiceImageKey } from "./home-sections/service-images";
import { ImageSlot } from "./ImageSlot";
import { Reveal } from "./Reveal";

const SEND_REQUEST_HREF = "/de/send-request";

/** Column spans, plates and source widths for the Leistungen grid. */
const germanServiceLayouts = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5"
];

const germanServiceImageKeys: ServiceImageKey[] = [
  "customer-requests",
  "questionnaires",
  "ecovadis",
  "integritynext",
  "vsme",
  "scope-1-2"
];

const germanServiceSizes = [
  "(min-width: 1024px) 58vw, 100vw",
  "(min-width: 1024px) 42vw, 100vw",
  "(min-width: 1024px) 42vw, 100vw",
  "(min-width: 1024px) 58vw, 100vw",
  "(min-width: 1024px) 58vw, 100vw",
  "(min-width: 1024px) 42vw, 100vw"
];

const requestNeeds = [
  "Energieverbrauch",
  "Scope 1 und Scope 2",
  "Umweltinformationen",
  "Richtlinien",
  "Zertifikate",
  "Beschäftigtendaten",
  "Nachweise",
  "ESG-Fragebogen"
];

const sourceLocations = [
  ["Buchhaltung", "Strom- und Brennstoffdaten"],
  ["Qualitätsmanagement", "Zertifikate"],
  ["HR", "Mitarbeiterinformationen"],
  ["Geschäftsführung", "Richtlinien"],
  ["Betrieb", "Produktionsdaten"]
];

const solutionSteps = [
  {
    number: "01",
    title: "Anforderung verstehen",
    body: "Wir prüfen, was Ihr Kunde, die Plattform oder der Berichtsrahmen tatsächlich verlangt."
  },
  {
    number: "02",
    title: "Daten und Nachweise zusammenbringen",
    body: "Vorhandene Unternehmensinformationen werden strukturiert, den richtigen Anforderungen zugeordnet und auf Lücken geprüft."
  },
  {
    number: "03",
    title: "Ergebnis vorbereiten",
    body: "Je nach Aufgabe entsteht daraus eine konkrete Grundlage, die Sie prüfen und verwenden können."
  }
];

const deliverables = [
  "eine vorbereitete Kundenantwort",
  "ein ausgefüllter Fragebogen",
  "eine dokumentierte Emissionsberechnung",
  "ein Nachhaltigkeitsbericht",
  "eine strukturierte Nachweisgrundlage",
  "oder eine Kombination daraus"
];

const services = [
  {
    number: "01",
    title: "ESG-Anforderungen von Kunden",
    body: "Ihr Kunde verlangt Nachhaltigkeitsdaten, Richtlinien, Kennzahlen oder Nachweise? Wir strukturieren die Anfrage, identifizieren die benötigten Informationen und bereiten Ihre Antwort vor.",
    href: "/de/esg-kundenanfragen",
    icon: FileText
  },
  {
    number: "02",
    title: "ESG-Fragebogen für Lieferanten",
    body: "Sie haben einen kundenspezifischen ESG- oder Nachhaltigkeitsfragebogen erhalten? Wir bereiten Antworten, Daten und Nachweise entlang der konkreten Fragen vor.",
    href: "/de/esg-fragebogen-lieferanten",
    icon: ClipboardCheck
  },
  {
    number: "03",
    title: "EcoVadis-Unterstützung",
    body: "Sie müssen eine EcoVadis-Bewertung vorbereiten? Wir strukturieren vorhandene ESG-Informationen, ordnen relevante Nachweise zu und machen offene Punkte vor der Einreichung sichtbar.",
    href: "/de/ecovadis-unterstuetzung",
    icon: FileCheck2
  },
  {
    number: "04",
    title: "IntegrityNext-Unterstützung",
    body: "Ihr Kunde hat Sie zu IntegrityNext eingeladen? Wir unterstützen bei der Koordination angeforderter Assessments, Zertifikate, Unternehmensinformationen und Nachweise.",
    href: "/de/integritynext-unterstuetzung",
    icon: FolderKanban
  },
  {
    number: "05",
    title: "VSME-Nachhaltigkeitsbericht",
    body: "Sie möchten Ihre ESG-Daten einmal strukturiert aufbauen? Wir begleiten den Prozess von der Datenerhebung und Kennzahlenaufbereitung bis zum strukturierten freiwilligen Nachhaltigkeitsbericht.",
    href: "/de/vsme-nachhaltigkeitsbericht",
    icon: FileCheck2
  },
  {
    number: "06",
    title: "Scope 1 und Scope 2 berechnen",
    body: "Sie benötigen belastbare Emissionswerte? Wir strukturieren Verbrauchsdaten, Emissionsquellen und Faktoren und bereiten eine nachvollziehbare Scope-1- und Scope-2-Berechnung auf.",
    href: "/de/scope-1-2-berechnung",
    icon: Calculator
  }
];

const existingInputs = [
  "Rechnungen",
  "Excel-Dateien",
  "Zertifikate",
  "Richtlinien",
  "Unternehmensdaten",
  "bestehende Berechnungen",
  "interne Informationen"
];

const practicalResults = [
  "eine vorbereitete Kundenantwort",
  "ein strukturierter Fragebogen",
  "eine Emissionsberechnung",
  "ein Bericht",
  "eine Nachweisübersicht",
  "oder eine klare Liste offener Punkte"
];

const industrialContext = [
  "Produktion",
  "Qualität",
  "Einkauf",
  "Kundenanforderungen",
  "Personal",
  "Liefertermine",
  "Tagesgeschäft"
];

const industries = [
  "Maschinenbau",
  "Metallverarbeitung",
  "Automotive-Zulieferer",
  "Kunststoffverarbeitung",
  "Elektronik",
  "Komponentenfertigung",
  "industrielle Zulieferer",
  "andere B2B-Produktionsunternehmen"
];

const processSteps = [
  {
    number: "01",
    title: "Anfrage senden",
    body: "Sie senden uns die Kundenanfrage, den Fragebogen, die Plattformanforderung oder beschreiben, welches Ergebnis Sie benötigen.",
    cta: true
  },
  {
    number: "02",
    title: "Vorhandene Unterlagen bereitstellen",
    body: "Je nach Aufgabe können das Excel-Dateien, PDFs, Rechnungen, Zertifikate, Richtlinien, Emissionsdaten, Unternehmensinformationen, Screenshots oder frühere ESG-Unterlagen sein."
  },
  {
    number: "03",
    title: "Wir strukturieren die Arbeit",
    body: "Wir ordnen die Anforderungen, identifizieren relevante Datenquellen und machen sichtbar, was bereits vorhanden ist und was noch fehlt."
  },
  {
    number: "04",
    title: "Kennzahlen und Inhalte vorbereiten",
    body: "Wo Berechnungen oder strukturierte Antworten erforderlich sind, bereiten wir diese auf Basis der vorhandenen Unternehmensdaten vor."
  },
  {
    number: "05",
    title: "Sie prüfen die Unternehmensangaben",
    body: "Aussagen, die eine interne Bestätigung oder Freigabe benötigen, werden von Ihrem Unternehmen geprüft."
  },
  {
    number: "06",
    title: "Ergebnis verwenden",
    body: "Sie erhalten eine strukturierte Grundlage für die konkrete Kundenanfrage, Plattform, Berechnung oder Berichterstattung."
  }
];

const traceabilityItems = [
  "woher eine Kennzahl stammt",
  "welcher Nachweis eine Aussage unterstützt",
  "welche Berechnungsmethode verwendet wurde",
  "welche Annahmen getroffen wurden",
  "welche Informationen noch fehlen",
  "welche Angaben vom Unternehmen bestätigt wurden"
];

const dataFoundationItems = [
  "Energie",
  "Emissionen",
  "Mitarbeitende",
  "Richtlinien",
  "Zertifikate",
  "Prozesse",
  "Nachweise",
  "Berechnungsmethoden",
  "Datenquellen"
];

const departments = [
  "Geschäftsführung",
  "Qualitätsmanagement",
  "Einkauf",
  "Controlling",
  "HR",
  "Operations",
  "Umweltmanagement"
];

const faqItems = [
  {
    question: "Was genau macht evipace?",
    answer:
      "Evipace übernimmt praktische ESG-Arbeit für Unternehmen. Dazu gehören beispielsweise die Vorbereitung von Kundenanfragen und ESG-Fragebögen, Unterstützung bei EcoVadis und IntegrityNext, Scope-1- und Scope-2-Berechnungen sowie freiwillige Nachhaltigkeitsberichte. Wir strukturieren vorhandene Unternehmensdaten, bereiten Kennzahlen und Antworten auf und machen fehlende Informationen sichtbar."
  },
  {
    question: "Für welche Unternehmen ist evipace gedacht?",
    answer:
      "Unser Schwerpunkt liegt auf kleinen und mittleren produzierenden Unternehmen und industriellen Zulieferern. Besonders relevant ist die Unterstützung für Unternehmen, die ESG-Anforderungen größerer Kunden erfüllen müssen, ohne dafür eine große interne Nachhaltigkeitsabteilung zu haben."
  },
  {
    question: "Müssen wir bereits ein ESG-System haben?",
    answer:
      "Nein. Viele benötigte Informationen liegen bereits in bestehenden Unternehmensbereichen. Wir beginnen mit Ihrer konkreten Aufgabe und prüfen, welche Daten, Dokumente und Nachweise bereits vorhanden sind."
  },
  {
    question: "Können wir Ihnen einfach die Kundenanfrage schicken?",
    answer:
      "Ja. Sie müssen die Anfrage nicht zuerst selbst vollständig analysieren. Sie können uns die vorhandene Kundenanforderung und relevante Unterlagen senden. Wir prüfen, was benötigt wird und wie die Aufgabe strukturiert bearbeitet werden kann."
  },
  {
    question: "Unterstützen Sie auch EcoVadis und IntegrityNext?",
    answer:
      "Ja. Wir unterstützen Unternehmen bei der operativen Vorbereitung von Informationen, Antworten, Zertifikaten und Nachweisen für entsprechende Assessments. Evipace ist dabei ein unabhängiger Dienstleister und weder mit EcoVadis noch mit IntegrityNext verbunden."
  },
  {
    question: "Können Sie Scope 1 und Scope 2 berechnen?",
    answer:
      "Ja. Wenn die notwendigen Unternehmens- und Verbrauchsdaten vorhanden sind, können wir Scope-1- und Scope-2-Emissionen strukturiert berechnen und die verwendeten Daten, Faktoren und Berechnungsgrundlagen dokumentieren."
  },
  {
    question: "Erstellen Sie auch Nachhaltigkeitsberichte?",
    answer:
      "Ja. Wir unterstützen bei der Datenerhebung, Kennzahlenaufbereitung, Dokumentation und Erstellung strukturierter freiwilliger Nachhaltigkeitsberichte, unter anderem auf Basis des aktuellen europäischen VSME-/Voluntary-Standard-Rahmens."
  }
];

const trustLimits = [
  "führen keine gesetzliche Abschlussprüfung oder Assurance durch",
  "vergeben keine ESG-Zertifizierung",
  "garantieren keine bestimmte Bewertung auf externen Plattformen",
  "garantieren keine Akzeptanz durch Kunden oder Banken",
  "ersetzen keine Rechtsberatung",
  "erstellen keine fingierten Nachweise"
];

type GermanHomePageProps = {
  imageAvailability: EvipaceImageAvailability;
};

export function GermanHomePage({ imageAvailability }: GermanHomePageProps) {
  return (
    <>
      <main>
        <AnimatedMarkHero headingId="hero-title" locale="de">
          <h1
            className="mark-hero__title mark-hero__title--de font-display"
            id="hero-title"
          >
            ESG, schneller erledigt.
          </h1>

          <div className="mark-hero__body mt-6 space-y-4">
            <p>
              Ihre Kunden verlangen ESG-Daten, Nachweise oder Emissionswerte?
              Sie senden uns die Anfrage und vorhandenen Unterlagen.
            </p>
            <p className="mark-hero__body-secondary">
              Wir strukturieren die Informationen, bereiten Antworten und
              Kennzahlen vor und bringen die Aufgabe bis zu einem prüfbaren
              Ergebnis.
            </p>
          </div>

          <div className="mark-hero__actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              className="inline-flex min-h-12 w-full max-w-full items-center justify-center rounded-lg border border-orange bg-orange px-5 py-3 text-center text-sm font-bold text-white sm:w-auto"
              href={SEND_REQUEST_HREF}
            >
              ESG-Anfrage senden
            </Link>
            <a
              className="inline-flex min-h-12 w-full max-w-full items-center justify-center rounded-lg border border-[rgba(21,21,21,0.2)] bg-transparent px-5 py-3 text-center text-sm font-bold text-ink sm:w-auto"
              href="#leistungen"
            >
              Leistungen ansehen
            </a>
          </div>

          <p className="mark-hero__trust mt-7">
            Kundenanfragen · Fragebögen · Scope 1 &amp; 2 · VSME · Nachweise
          </p>
        </AnimatedMarkHero>

        <section className="section-padding bg-[var(--warm)]" id="problem">
          <div className="site-shell grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <Reveal>
              <p className="eyebrow">Ausgangslage</p>
              <h2 className="font-display mt-6 max-w-3xl text-4xl leading-none sm:text-5xl lg:text-6xl">
                Ihr Kunde fragt nach ESG. Die Daten liegen irgendwo in Ihrem
                Unternehmen.
              </h2>
              <div className="mt-7 max-w-2xl space-y-5 text-lg leading-8 text-muted">
                <p>Eine neue Kundenanfrage landet im Posteingang.</p>
                <p>
                  Benötigt werden plötzlich Energieverbrauch, Scope 1 und Scope
                  2, Umweltinformationen, Richtlinien, Zertifikate,
                  Beschäftigtendaten, Nachweise oder ein kompletter
                  ESG-Fragebogen.
                </p>
                <p>
                  Die Informationen existieren häufig bereits. Nur nicht an
                  einem Ort.
                </p>
              </div>
              <div className="mt-9">
                <RequestStream
                  items={requestNeeds}
                  label="Eingehende ESG-Anfragen"
                />
              </div>
            </Reveal>

            <div>
              <EvidenceAssemblyBoard
                output={{
                  statement: "Evipace bringt diese Informationen zusammen."
                }}
                sources={sourceLocations.map(([department, source]) => ({
                  label: department,
                  description: source
                }))}
                sourcesLabel="Datenquellen"
              />
              <p className="mt-8 border-l-2 border-orange pl-5 text-lg font-semibold leading-8 text-ink">
                Das Problem ist oft nicht, dass die Informationen fehlen. Sie
                sind nur noch nicht als fertige ESG-Antwort organisiert.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white" id="loesung">
          <div className="site-shell">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <Reveal>
                <p className="eyebrow">Kernlösung</p>
                <h2 className="font-display mt-6 max-w-3xl text-4xl leading-none sm:text-5xl lg:text-6xl">
                  Sie schicken die Anforderung. Wir bringen die Antwort
                  zusammen.
                </h2>
                <p className="body-lg mt-7 max-w-2xl">
                  Sie müssen nicht zuerst selbst herausfinden, welche ESG-Daten
                  benötigt werden, wer im Unternehmen zuständig ist oder welche
                  Unterlagen zu welcher Frage gehören.
                </p>
                <ImageSlot
                  {...evipaceImages.customerData}
                  className="mt-10 aspect-[1.24/1] rounded-[1rem]"
                  renderActualImage={imageAvailability.customerData}
                />
              </Reveal>

              <div className="grid gap-5">
                {solutionSteps.map((step, index) => (
                  <Reveal
                    className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-7"
                    delay={index * 0.05}
                    key={step.title}
                  >
                    <p className="font-mono text-sm font-bold text-orange">
                      {step.number}
                    </p>
                    <h3 className="mt-4 text-2xl font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-muted">{step.body}</p>
                  </Reveal>
                ))}

                <DeliveryDossier
                  items={deliverables}
                  label="Daraus entsteht"
                  statement="ESG wird damit von einem unklaren Projekt zu einer konkreten Aufgabe mit einem klaren Ergebnis."
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="section-padding border-t border-[rgba(21,21,21,0.08)] bg-[var(--paper)]"
          id="leistungen"
        >
          <div className="site-shell">
            <Reveal className="mb-14 max-w-4xl">
              <p className="eyebrow">Leistungen</p>
              <h2 className="font-display mt-6 text-4xl leading-none sm:text-5xl lg:text-6xl">
                Wobei wir Sie unterstützen
              </h2>
            </Reveal>

            <div className="grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)] lg:grid-cols-12">
              {services.map((service, index) => (
                <ServiceImageCard
                  body={service.body}
                  className={germanServiceLayouts[index]}
                  href={service.href}
                  imageKey={germanServiceImageKeys[index]}
                  key={service.href}
                  linkLabel="Mehr erfahren"
                  locale="de"
                  number={service.number}
                  sizes={germanServiceSizes[index]}
                  title={service.title}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-dark text-white" id="umsetzung">
          <div className="site-shell">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <Reveal>
                <p className="eyebrow">Praktische Umsetzung</p>
                <h2 className="font-display mt-6 max-w-3xl text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
                  Keine ESG-Strategie für die Schublade. Praktische Umsetzung.
                </h2>
                <div className="mt-7 max-w-2xl space-y-5 text-lg leading-8 text-white/70">
                  <p>
                    Viele ESG-Projekte beginnen mit Workshops, Strategiefolien
                    und langen Maßnahmenlisten.
                  </p>
                  <p>Evipace beginnt an einer anderen Stelle.</p>
                  <p>Ausgangspunkt ist Ihre konkrete Aufgabe.</p>
                </div>
              </Reveal>

              <Reveal className="grid gap-8" delay={0.08}>
                <div>
                  <p className="text-sm font-bold uppercase text-orange">
                    Genau dort starten wir
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      "Ein Kunde braucht Daten.",
                      "Ein Fragebogen muss beantwortet werden.",
                      "Scope 1 und Scope 2 fehlen.",
                      "Ein Nachhaltigkeitsbericht soll entstehen."
                    ].map((item) => (
                      <p
                        className="border-t border-white/14 pt-3 text-lg font-semibold text-white"
                        key={item}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-lg border border-white/12 bg-white/[0.04] p-6">
                    <h3 className="text-2xl font-bold text-white">
                      Wir arbeiten mit dem, was bereits vorhanden ist.
                    </h3>
                    <p className="mt-4 leading-7 text-white/68">
                      Sie brauchen kein perfektes ESG-System, bevor Sie mit uns
                      arbeiten können.
                    </p>
                    <ul className="mt-6 grid gap-3">
                      {existingInputs.map((item) => (
                        <li className="flex gap-3 text-white/72" key={item}>
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 shrink-0 text-orange"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-orange/35 bg-[rgba(254,112,1,0.08)] p-6">
                    <h3 className="text-2xl font-bold text-white">
                      Am Ende steht ein nutzbares Ergebnis.
                    </h3>
                    <p className="mt-4 leading-7 text-white/68">
                      Nicht nur eine Präsentation, sondern beispielsweise:
                    </p>
                    <ul className="mt-6 grid gap-3">
                      {practicalResults.map((item) => (
                        <li className="flex gap-3 text-white/72" key={item}>
                          <FileText
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 shrink-0 text-orange"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="border-l-2 border-orange pl-6 text-2xl font-semibold leading-9 text-white">
                  Evipace ist für Unternehmen gedacht, die ESG nicht
                  diskutieren, sondern erledigen müssen.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          className="relative min-h-[78vh] overflow-hidden bg-dark text-white"
          id="industrie"
        >
          <ImageSlot
            {...evipaceImages.industrialBreak}
            className="!absolute inset-0 z-0 rounded-none border-0"
            renderActualImage={imageAvailability.industrialBreak}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(90deg, rgba(21,21,21,0.82) 0%, rgba(21,21,21,0.58) 54%, rgba(21,21,21,0.22) 100%)"
            }}
          />
          <div className="site-shell relative z-10 flex min-h-[78vh] items-end pb-14 pt-24">
            <Reveal className="max-w-4xl">
              <p className="eyebrow">Industrie-Fokus</p>
              <h2 className="font-display mt-6 text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
                Für Unternehmen, die Dinge herstellen.
              </h2>
              <div className="mt-7 max-w-2xl space-y-5 text-lg leading-8 text-white/76">
                <p>
                  ESG-Arbeit sieht in einem Produktionsunternehmen anders aus
                  als in einem Konzern mit eigener Nachhaltigkeitsabteilung.
                </p>
                <p>
                  Sie muss neben Produktion, Qualität, Einkauf,
                  Kundenanforderungen, Personal, Lieferterminen und
                  Tagesgeschäft funktionieren.
                </p>
                <p>
                  Deshalb richtet sich evipace besonders an produzierende kleine
                  und mittlere Unternehmen.
                </p>
              </div>
              <div className="mt-9 flex max-w-3xl flex-wrap gap-2">
                {[...industrialContext, ...industries].map((item) => (
                  <span
                    className="rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/82 backdrop-blur"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-8 max-w-3xl text-lg font-semibold leading-8 text-white">
                Unser Ansatz ist darauf ausgelegt, ESG-Anforderungen in
                bestehende Unternehmensrealität zu übersetzen – nicht ein
                zweites Unternehmen neben Ihrem Unternehmen aufzubauen.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-padding bg-[var(--warm)]" id="ablauf">
          <div className="site-shell">
            <Reveal className="max-w-4xl">
              <p className="eyebrow">Ablauf</p>
              <h2 className="font-display mt-6 text-4xl leading-none sm:text-5xl lg:text-6xl">
                Vom Kundenwunsch zum fertigen ESG-Ergebnis
              </h2>
            </Reveal>

            {/* Image rail and process spine share one axis. */}
            <div className="works mt-12">
              <div className="works__rail">
                <EditorialPlate
                  asset={evipaceImages.howItWorks}
                  available={imageAvailability.howItWorks}
                  ratio="1.08 / 1"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
              </div>

              <ProcessSpine
                className="works__spine"
                steps={processSteps.map((step) => ({
                  number: step.number,
                  title: step.title,
                  body: step.body,
                  action: step.cta ? (
                    <ButtonLink href={SEND_REQUEST_HREF}>
                      ESG-Anfrage senden
                    </ButtonLink>
                  ) : undefined
                }))}
              />
            </div>
          </div>
        </section>

        <section
          className="section-padding bg-white"
          id="nachvollziehbarkeit"
        >
          <div className="site-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <p className="eyebrow">Nachvollziehbarkeit</p>
              <h2 className="font-display mt-6 max-w-3xl text-4xl leading-none sm:text-5xl lg:text-6xl">
                Nachvollziehbar statt erfunden.
              </h2>
              <div className="mt-7 max-w-2xl space-y-5 text-lg leading-8 text-muted">
                <p>
                  ESG-Antworten sind nur so belastbar wie die Informationen
                  dahinter.
                </p>
                <p>
                  Wenn etwas fehlt, wird es als Lücke sichtbar – nicht durch
                  eine scheinbar perfekte Antwort ersetzt.
                </p>
                <p>
                  Wir erstellen keine fingierten Nachweise und stellen nicht
                  vorhandene Unternehmenspraktiken nicht als bestehend dar.
                </p>
                <p>
                  Das Ergebnis soll Ihre tatsächliche Unternehmenssituation
                  sauber abbilden.
                </p>
                <p>
                  Mehr dazu finden Sie in{" "}
                  <Link className="orange-link" href="/de/methodology">
                    Unsere Methodik
                  </Link>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="text-sm font-bold uppercase text-orange">
                Wichtig bleibt
              </p>
              <ul className="mt-7 grid gap-4">
                {traceabilityItems.map((item) => (
                  <li className="flex gap-3 text-muted" key={item}>
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-orange"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section-padding bg-[var(--paper)]" id="datenbasis">
          <div className="site-shell">
            <div className="grid gap-10 border-b border-[rgba(21,21,21,0.12)] pb-12 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <p className="eyebrow">Wiederverwendbare Grundlage</p>
                <h2 className="font-display mt-6 text-4xl leading-none sm:text-5xl">
                  Einmal strukturierte ESG-Daten sind beim nächsten Mal nicht
                  wieder verschwunden.
                </h2>
                <div className="mt-7 space-y-5 text-lg leading-8 text-muted">
                  <p>Eine einzelne Kundenanfrage ist oft nur der Anfang.</p>
                  <p>
                    Heute möchte ein Kunde Scope 1 und Scope 2. Morgen kommt
                    ein ESG-Fragebogen. Danach vielleicht EcoVadis,
                    IntegrityNext oder eine Anfrage der Bank.
                  </p>
                  <p>
                    Wenn Daten, Quellen und Nachweise dagegen strukturiert
                    aufgebaut sind, entsteht mit jeder bearbeiteten Anfrage eine
                    bessere Grundlage für die nächste.
                  </p>
                  <p>
                    Unser Ziel ist deshalb nicht nur, die aktuelle ESG-Aufgabe
                    zu erledigen – sondern die zugrunde liegenden Informationen
                    zunehmend nutzbar zu machen.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="eyebrow">Anpassungsfähig</p>
                <h2 className="font-display mt-6 text-4xl leading-none sm:text-5xl">
                  ESG-Anforderungen ändern sich. Eine gute Datengrundlage bleibt
                  wertvoll.
                </h2>
                <div className="mt-7 space-y-5 text-lg leading-8 text-muted">
                  <p>
                    Plattformen entwickeln sich weiter. Kunden ändern ihre
                    Fragebögen. Berichtsstandards werden aktualisiert. Neue
                    Nachhaltigkeitsanforderungen entstehen.
                  </p>
                  <p>
                    Deshalb bauen wir nicht auf möglichst viele statische
                    Textbausteine. Wir konzentrieren uns auf die Informationen
                    darunter.
                  </p>
                </div>
              </Reveal>
            </div>

            <ReuseDataPassport
              className="mt-12"
              fields={dataFoundationItems}
              footer={
                <p className="reuse__note">
                  Eine sauber strukturierte Datengrundlage lässt sich leichter
                  an neue Anforderungen anpassen als eine einzelne isolierte
                  Antwort.
                </p>
              }
            />
          </div>
        </section>

        <section className="section-padding bg-white" id="kapazitaet">
          <div className="site-shell grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-start">
            <Reveal>
              <p className="eyebrow">Interne Kapazität</p>
              <h2 className="font-display mt-6 max-w-3xl text-4xl leading-none sm:text-5xl lg:text-6xl">
                Sie brauchen nicht zuerst eine eigene ESG-Abteilung.
              </h2>
              <div className="mt-7 max-w-2xl space-y-5 text-lg leading-8 text-muted">
                <p>
                  Evipace ist besonders für Unternehmen interessant, bei denen
                  ESG heute von Personen mitbetreut wird, die eigentlich andere
                  Hauptaufgaben haben.
                </p>
                <p>
                  Sie müssen nicht zuerst neue interne Strukturen aufbauen,
                  bevor eine konkrete Kundenanforderung bearbeitet werden kann.
                </p>
                <p className="font-semibold text-ink">
                  Wir starten mit der Aufgabe, die heute auf Ihrem Tisch liegt.
                </p>
                <p>
                  Mehr darüber, wer hinter evipace steht, finden Sie auf der{" "}
                  <Link className="orange-link" href="/de/about">
                    Über-uns-Seite
                  </Link>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal
              className="grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)] sm:grid-cols-2"
              delay={0.08}
            >
              {departments.map((department) => (
                <div className="bg-[var(--paper)] p-5" key={department}>
                  <p className="font-semibold text-ink">{department}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section-padding bg-[var(--warm)]" id="faq">
          <div className="site-shell max-w-5xl">
            <Reveal className="mb-12">
              <p className="eyebrow">FAQ</p>
              <h2 className="font-display mt-6 text-4xl leading-none sm:text-5xl lg:text-6xl">
                Häufige Fragen zu evipace
              </h2>
            </Reveal>

            <div className="grid gap-4">
              {faqItems.map((item, index) => (
                <Reveal
                  className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white"
                  delay={index * 0.03}
                  key={item.question}
                >
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 text-left text-xl font-bold text-ink sm:p-7">
                      <span>{item.question}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(21,21,21,0.12)] text-orange transition group-open:rotate-90">
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </summary>
                    <p className="px-6 pb-6 leading-8 text-muted sm:px-7 sm:pb-7">
                      {item.answer}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white" id="grenzen">
          <div className="site-shell">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <p className="eyebrow">Klare Grenzen</p>
                <h2 className="font-display mt-6 text-4xl leading-none sm:text-5xl lg:text-6xl">
                  Praktische Unterstützung. Klare Grenzen.
                </h2>
                <p className="body-lg mt-7 max-w-2xl">
                  Evipace unterstützt bei der strukturierten Vorbereitung und
                  Umsetzung von ESG-Anforderungen.
                </p>
              </Reveal>

              <Reveal
                className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-8"
                delay={0.08}
              >
                <p className="text-sm font-bold uppercase text-orange">
                  Wir
                </p>
                <ul className="mt-7 grid gap-4">
                  {trustLimits.map((item) => (
                    <li className="flex gap-3 text-muted" key={item}>
                      <MinusCircle
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-[rgba(21,21,21,0.42)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-l-2 border-orange pl-5 leading-8 text-[rgba(21,21,21,0.72)]">
                  Berechnungen, Antworten und Berichte basieren auf den
                  verfügbaren Unternehmensinformationen und werden dort, wo
                  erforderlich, durch das Unternehmen geprüft und bestätigt.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden bg-[var(--soft-orange)] py-20 sm:py-28"
          id="kontakt"
        >
          <div className="pointer-events-none absolute right-[6vw] top-8 hidden font-display text-[10rem] leading-none text-[rgba(254,112,1,0.11)] lg:block">
            ESG
          </div>
          <div className="site-shell relative z-10 max-w-5xl">
            <p className="eyebrow">Nächster Schritt</p>
            <h2 className="font-display mt-6 text-5xl leading-none sm:text-6xl lg:text-7xl">
              Ihre nächste ESG-Anfrage muss nicht wieder bei null beginnen.
            </h2>
            <div className="mt-7 max-w-2xl space-y-4 text-xl leading-8 text-[rgba(21,21,21,0.68)]">
              <p>
                Senden Sie uns die Anfrage, den Fragebogen oder Ihre
                vorhandenen Unterlagen.
              </p>
              <p>
                Wir prüfen, was benötigt wird, welche Informationen bereits
                vorhanden sind und wie wir die Aufgabe strukturiert übernehmen
                können.
              </p>
            </div>
            <div className="mt-9">
              <ButtonLink href={SEND_REQUEST_HREF}>
                ESG-Anfrage senden
              </ButtonLink>
            </div>
            <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
              E-Mail · Excel · PDF · Fragebogen · Nachweise
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
