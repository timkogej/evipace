import type { ReactNode } from "react";
import {
  CheckCircle2,
  Factory,
  FileCheck2,
  Layers3,
  MapPin,
  MinusCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { publicContactEmail } from "@/lib/company-info";
import { evipaceImages } from "@/lib/evipace-images";
import {
  BoundariesBackgroundGraphic,
  DataFoundationBackgroundGraphic,
  EuropeBackgroundGraphic,
  OriginBackgroundGraphic,
  SpeedBackgroundGraphic
} from "./AboutSectionDecorations";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";

const SEND_REQUEST_HREF = "/de/send-request";

const founder = {
  name: "Tim Kogej",
  role: "Founder & Managing Director",
  location: "Slowenien"
};

const requestedInformation = [
  "Energie und Emissionen",
  "Mitarbeitenden",
  "Richtlinien",
  "Zertifikaten",
  "Umweltmanagement",
  "Lieferkette",
  "Unternehmensprozessen",
  "bestehenden Nachweisen"
];

const sourceLocations = [
  ["Rechnung", "eine benötigte Zahl"],
  ["Qualitätsmanagement", "ein Zertifikat"],
  ["HR", "Mitarbeiterdaten"],
  ["Geschäftsführung", "eine Unternehmenspraxis"],
  ["Excel-Datei", "Verbrauchsdaten"]
];

const speedPrinciples = [
  "Anforderungen strukturieren",
  "vorhandene Daten identifizieren",
  "Quellen zuordnen",
  "Berechnungen nachvollziehbar vorbereiten",
  "Nachweise organisieren",
  "offene Punkte sichtbar machen",
  "ESG-Informationen wiederverwendbar machen"
];

const practicalNeeds = [
  "ein Kunde Nachhaltigkeitsdaten verlangt",
  "ein Lieferantenfragebogen beantwortet werden muss",
  "EcoVadis oder IntegrityNext auf dem Tisch liegt",
  "Scope 1 und Scope 2 benötigt werden",
  "ein freiwilliger Nachhaltigkeitsbericht aufgebaut werden soll",
  "ESG-Nachweise und Richtlinien strukturiert werden müssen"
];

const industrialInputs = [
  "Energieverbrauch",
  "Brennstoffe",
  "Produktionsprozesse",
  "Materialeinsatz",
  "Qualitätssysteme",
  "Zertifikate",
  "Mitarbeitende",
  "Lieferanten",
  "Kundenanforderungen",
  "betriebliche Abläufe"
];

const industries = [
  "Maschinenbau",
  "Metallverarbeitung",
  "Automotive-Zulieferer",
  "Kunststoff",
  "Elektronik",
  "Komponentenfertigung",
  "andere industrielle B2B-Unternehmen"
];

const markets = [
  "Slowenien",
  "Deutschland und Österreich",
  "Italien",
  "Südosteuropa"
];

const reusableData = [
  "Energie- und Verbrauchsdaten",
  "Emissionsberechnungen",
  "Unternehmensinformationen",
  "Richtlinien",
  "Zertifikate",
  "Nachweise",
  "verwendete Methoden",
  "Quellen",
  "Verantwortlichkeiten"
];

const methodologyPrinciples = [
  {
    title: "Quelle vor Aussage.",
    body: "Materiale Angaben sollen auf reale Unternehmensinformationen zurückzuführen sein."
  },
  {
    title: "Lücke vor Erfindung.",
    body: "Fehlende Informationen werden sichtbar gemacht, nicht durch plausible Behauptungen ersetzt."
  },
  {
    title: "Entwurf vor Freigabe.",
    body: "Eine von evipace vorbereitete Richtlinie wird erst dann zur Richtlinie des Unternehmens, wenn sie intern geprüft und ausdrücklich angenommen wurde."
  },
  {
    title: "Technologie als Werkzeug.",
    body: "Digitale und AI-gestützte Werkzeuge können die Vorbereitung unterstützen. Verantwortung und menschliche Prüfung werden dadurch nicht ersetzt."
  },
  {
    title: "Nachvollziehbarkeit vor perfekter Darstellung.",
    body: "Das Ergebnis soll nicht nur fertig aussehen. Es soll erklärbar sein."
  }
];

const responsibilityPoints = [
  "was benötigt wird",
  "was bereits vorhanden ist",
  "was evipace vorbereitet",
  "was noch fehlt",
  "was Ihr Unternehmen bestätigen muss"
];

const boundaries = [
  "Wir vergeben keine ESG-Zertifizierungen.",
  "Wir ersetzen keine unabhängige Assurance.",
  "Wir garantieren keine bestimmte Bewertung durch EcoVadis, IntegrityNext, einen Kunden oder eine andere externe Stelle.",
  "Wir stellen fehlende Unternehmenspraktiken nicht als bestehend dar."
];

type SectionTone = "paper" | "warm" | "dark";

type SectionProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  decoration?: ReactNode;
};

function Section({
  id,
  eyebrow,
  heading,
  children,
  tone = "paper",
  className = "",
  decoration
}: SectionProps) {
  const toneClass =
    tone === "dark"
      ? "bg-ink text-white"
      : tone === "warm"
        ? "bg-[var(--warm)] text-ink"
        : "bg-[var(--paper)] text-ink";

  return (
    <section
      className={`section-padding relative isolate overflow-hidden border-t border-[rgba(21,21,21,0.09)] ${toneClass} ${className}`}
      id={id}
    >
      {decoration}
      <div className="site-shell relative z-10">
        <Reveal className="max-w-5xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            className={`heading-md font-display mt-6 max-w-[15ch] ${tone === "dark" ? "text-white" : "text-ink"}`}
          >
            {heading}
          </h2>
        </Reveal>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}

function CheckList({
  items,
  dark = false,
  columns = false
}: {
  items: string[];
  dark?: boolean;
  columns?: boolean;
}) {
  return (
    <ul className={columns ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>
      {items.map((item) => (
        <li
          className={`flex gap-3 leading-7 ${dark ? "text-white/72" : "text-muted"}`}
          key={item}
        >
          <CheckCircle2
            aria-hidden="true"
            className="mt-1 h-4 w-4 shrink-0 text-orange"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function GermanAboutPage() {
  return (
    <>
      <main>
        <section
          aria-labelledby="about-title"
          className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40"
          id="top"
        >
          <div className="pointer-events-none absolute right-[4vw] top-20 hidden font-display text-[12rem] leading-none text-[rgba(21,21,21,0.035)] xl:block">
            EVIPACE
          </div>
          <div className="site-shell grid items-end gap-14 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative z-10 max-w-5xl">
              <p className="eyebrow">Über evipace</p>
              <h1
                className="heading-lg font-display mt-7 max-w-[13ch]"
                id="about-title"
              >
                ESG sollte für kleinere Unternehmen nicht komplizierter sein
                als die Aufgabe selbst.
              </h1>
              <div className="body-lg mt-8 max-w-3xl space-y-5">
                <p>
                  evipace wurde gegründet, um produzierenden Unternehmen eine
                  praktische Alternative zwischen umfangreichen
                  ESG-Beratungsprojekten und reinen Self-Service-Lösungen zu
                  geben.
                </p>
                <p>
                  Wenn ein Kunde ESG-Daten verlangt, ein Fragebogen beantwortet
                  werden muss oder Emissionswerte fehlen, sollte daraus kein
                  neues Vollzeitprojekt entstehen.
                </p>
              </div>
              <p className="mt-8 max-w-2xl border-l-2 border-orange pl-5 text-xl font-semibold leading-8 text-ink">
                Es sollte eine klar definierte Aufgabe geben – und einen
                strukturierten Weg, sie zu erledigen.
              </p>
            </div>

            <Reveal
              className="relative border-y border-[rgba(21,21,21,0.14)] py-7 lg:mb-3"
              delay={0.08}
            >
              <p className="text-xs font-bold uppercase text-orange">
                Vom Eingang zum Ergebnis
              </p>
              <div className="mt-6 grid gap-0">
                {[
                  ["01", "Konkrete Anforderung"],
                  ["02", "Vorhandene Informationen"],
                  ["03", "Nutzbares Ergebnis"]
                ].map(([number, label], index) => (
                  <div
                    className={`grid grid-cols-[2.5rem_1fr] items-center gap-4 py-5 ${index > 0 ? "border-t border-[rgba(21,21,21,0.1)]" : ""}`}
                    key={number}
                  >
                    <span className="font-mono text-xs font-bold text-orange">
                      {number}
                    </span>
                    <span className="font-display text-2xl text-ink">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Section
          decoration={<OriginBackgroundGraphic locale="de" />}
          eyebrow="Entstehung"
          heading="Warum evipace entstanden ist."
          id="warum"
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>Die Idee hinter evipace entstand aus einer einfachen Beobachtung:</p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Die ESG-Anforderungen großer Unternehmen erreichen längst auch
                ihre kleineren Lieferanten – die Ressourcen dafür aber nicht
                automatisch.
              </p>
              <p>
                Ein großer Konzern kann Nachhaltigkeitsverantwortliche,
                Datenplattformen und externe Berater einsetzen. Bei einem
                mittelständischen Produktionsunternehmen sieht die Realität
                häufig anders aus.
              </p>
              <p>
                Die Aufgabe landet nicht in einer eigenen ESG-Abteilung. Sie
                verteilt sich auf Geschäftsführung, Qualitätsmanagement,
                Buchhaltung, HR, Einkauf und Produktion.
              </p>
            </Reveal>

            <Reveal
              className="border-l border-[rgba(21,21,21,0.13)] pl-6 sm:pl-9"
              delay={0.08}
            >
              <p className="text-sm font-bold uppercase text-orange">
                Plötzlich benötigt
              </p>
              <div className="mt-7">
                <CheckList columns items={requestedInformation} />
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16 border-t border-[rgba(21,21,21,0.14)] pt-10 sm:mt-20 sm:pt-12">
            <p className="font-display max-w-5xl text-4xl leading-tight text-ink sm:text-5xl">
              Die Informationen sind häufig vorhanden. Aber sie liegen nicht
              dort, wo der Fragebogen sie erwartet.
            </p>
            <div className="mt-10 grid gap-x-8 border-y border-[rgba(21,21,21,0.1)] sm:grid-cols-2 lg:grid-cols-5">
              {sourceLocations.map(([source, information], index) => (
                <div
                  className={`py-6 ${index > 0 ? "sm:border-l sm:border-[rgba(21,21,21,0.1)] sm:pl-6" : ""}`}
                  key={source}
                >
                  <p className="text-xs font-bold uppercase text-orange">
                    {source}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                    {information}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-muted">
              Aus all diesen einzelnen Informationen muss am Ende eine
              konsistente ESG-Antwort entstehen.
            </p>
          </Reveal>
        </Section>

        <Section
          eyebrow="Positionierung"
          heading="Zwischen Beratung und Software fehlte etwas."
        >
          <Reveal className="max-w-3xl space-y-5 text-lg leading-8 text-muted">
            <p>
              Unternehmen, die eine konkrete ESG-Anforderung erfüllen müssen,
              finden häufig zwei Arten von Lösungen.
            </p>
          </Reveal>

          <div className="mt-10 grid border-y border-[rgba(21,21,21,0.13)] lg:grid-cols-3">
            <Reveal className="py-9 lg:pr-9">
              <p className="text-xs font-bold uppercase text-orange">
                Beratungsprojekte
              </p>
              <p className="mt-5 font-display text-3xl leading-tight text-ink">
                Sinnvoll für Strategie, Transformation und langfristige
                Governance.
              </p>
              <p className="mt-5 leading-7 text-muted">
                Aber nicht jede ESG-Aufgabe braucht ein monatelanges
                Beratungsprogramm.
              </p>
            </Reveal>

            <Reveal
              className="border-y border-[rgba(21,21,21,0.13)] bg-[var(--soft-orange)] px-0 py-9 sm:px-9 lg:border-x lg:border-y-0"
              delay={0.06}
            >
              <p className="text-xs font-bold uppercase text-orange">evipace</p>
              <p className="mt-5 font-display text-3xl leading-tight text-ink">
                Die konkrete ESG-Arbeit strukturiert vorbereiten und mit Ihnen
                bis zu einem nutzbaren Ergebnis bringen.
              </p>
            </Reveal>

            <Reveal className="py-9 lg:pl-9" delay={0.12}>
              <p className="text-xs font-bold uppercase text-orange">
                Softwareplattformen
              </p>
              <p className="mt-5 font-display text-3xl leading-tight text-ink">
                Hilfreich, um Daten und Prozesse zu organisieren.
              </p>
              <p className="mt-5 leading-7 text-muted">
                Die Arbeit – Daten suchen, Fragen interpretieren, Dokumente
                zuordnen, Kennzahlen berechnen und Lücken klären – bleibt jedoch
                häufig beim Unternehmen.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-12 max-w-4xl space-y-4 text-xl leading-8 text-muted">
            <p className="font-display text-4xl text-ink">
              evipace wurde für den Raum dazwischen aufgebaut.
            </p>
            <p>Nicht nur beraten, was getan werden sollte.</p>
            <p>Nicht nur ein Werkzeug bereitstellen, mit dem Sie es selbst tun können.</p>
          </Reveal>
        </Section>

        <Section
          decoration={<SpeedBackgroundGraphic locale="de" />}
          eyebrow="Markenidee"
          heading="ESG, done faster."
          id="arbeitsweise"
          tone="dark"
        >
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-white/72">
              <p>Der Name evipace steht für einen einfachen Anspruch:</p>
              <p className="font-display text-3xl leading-tight text-white sm:text-4xl">
                Komplexe ESG-Anforderungen sollen schneller bearbeitbar werden,
                ohne dabei an Nachvollziehbarkeit zu verlieren.
              </p>
              <p>
                Geschwindigkeit bedeutet für uns nicht, Schritte auszulassen.
                Sie entsteht durch einen besseren Prozess.
              </p>
              <p className="border-l-2 border-orange pl-5 text-xl font-semibold text-white">
                Schneller bedeutet nicht oberflächlicher. Es bedeutet
                strukturierter.
              </p>
            </Reveal>

            <Reveal
              className="grid gap-x-8 gap-y-0 border-y border-white/15 sm:grid-cols-2"
              delay={0.08}
            >
              {speedPrinciples.map((principle, index) => (
                <div
                  className="flex min-h-20 items-center gap-4 border-b border-white/10 py-5"
                  key={principle}
                >
                  <span className="font-mono text-xs font-bold text-orange">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-semibold leading-6 text-white/82">
                    {principle}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Section>

        <Section
          eyebrow="Gründer"
          heading="Gegründet von Tim Kogej."
          id="gruender"
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <Reveal className="self-start border-y border-[rgba(21,21,21,0.14)] py-8 lg:sticky lg:top-28">
              <p className="font-display text-5xl leading-none text-ink sm:text-6xl">
                {founder.name}
              </p>
              <p className="mt-5 text-sm font-bold text-orange">
                {founder.role}
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-[rgba(21,21,21,0.1)] pt-5 text-sm font-semibold text-muted">
                <MapPin aria-hidden="true" className="h-4 w-4 text-orange" />
                <span>{founder.location}</span>
              </div>
            </Reveal>

            <Reveal
              className="max-w-3xl space-y-5 text-lg leading-8 text-muted"
              delay={0.08}
            >
              <p>
                Tim Kogej gründete evipace mit dem Ziel, ESG-Arbeit für
                kleinere und mittlere Unternehmen operativer, klarer und
                zugänglicher zu machen.
              </p>
              <p>
                Im Mittelpunkt steht dabei nicht die Frage, wie Unternehmen
                möglichst viel über ESG sprechen können. Sondern eine
                praktischere:
              </p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Wie wird aus einer konkreten ESG-Anforderung eine lösbare
                Aufgabe?
              </p>
              <p>
                evipace wird an der Schnittstelle von strukturierten Daten,
                Technologie und fachlicher ESG-Arbeit aufgebaut. Der Anspruch
                dahinter ist, komplexe Anforderungen in klare Arbeitsprozesse
                zu übersetzen und Unternehmen genau dort zu unterstützen, wo
                aus ESG-Anforderungen tatsächliche Arbeit entsteht.
              </p>
              <p>
                Für Aufgaben, die zusätzliche spezialisierte Fachkenntnisse
                erfordern, ist das Arbeitsmodell darauf ausgelegt, bei Bedarf
                passende externe Fachleute einzubeziehen.
              </p>
              <p className="border-l-2 border-orange pl-5 font-semibold text-ink">
                Die Qualität eines Ergebnisses soll nicht davon abhängen, dass
                ein einzelner Mensch alles behauptet zu wissen – sondern davon,
                dass die richtige Methodik und die richtige Expertise für die
                jeweilige Aufgabe eingesetzt werden.
              </p>
            </Reveal>
          </div>
        </Section>

        <Section
          eyebrow="Prinzipien"
          heading="Was wir anders machen wollen."
        >
          <div className="grid border-t border-[rgba(21,21,21,0.14)] lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "Mit der konkreten Aufgabe beginnen.",
                body: "Nicht jedes Unternehmen braucht zuerst eine umfassende ESG-Strategie. Manchmal muss zunächst ein Kunde beantwortet, ein Scope-1-Wert berechnet, ein Fragebogen fertiggestellt oder eine belastbare Datengrundlage aufgebaut werden. Dort beginnen wir."
              },
              {
                number: "02",
                title: "Vorhandene Informationen zuerst nutzen.",
                body: "Bevor neue Prozesse, Dokumente oder Systeme aufgebaut werden, schauen wir, was im Unternehmen bereits vorhanden ist. Denn häufig fehlt nicht alles. Es fehlt die Struktur dazwischen."
              },
              {
                number: "03",
                title: "Nachvollziehbar statt perfekt inszeniert.",
                body: "Eine fehlende Information bleibt eine fehlende Information. Ein Entwurf ist noch keine verabschiedete Richtlinie. Eine Schätzung bleibt eine Schätzung. Und ein Nachweis soll nur das belegen, was er tatsächlich belegen kann."
              }
            ].map((principle, index) => (
              <Reveal
                className={`border-b border-[rgba(21,21,21,0.14)] py-9 lg:px-8 ${index === 0 ? "lg:pl-0" : "lg:border-l"}`}
                delay={index * 0.05}
                key={principle.number}
              >
                <p className="font-mono text-xs font-bold text-orange">
                  {principle.number}
                </p>
                <h3 className="font-display mt-5 text-3xl leading-tight text-ink">
                  {principle.title}
                </h3>
                <p className="mt-5 leading-7 text-muted">{principle.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 max-w-3xl text-xl font-semibold leading-8 text-ink">
            ESG-Arbeit wird nicht glaubwürdiger, indem Unsicherheit versteckt
            wird.
          </Reveal>
        </Section>

        <Section
          eyebrow="Leistungsmodell"
          heading="Praktische ESG-Umsetzung für produzierende Unternehmen."
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>
                evipace konzentriert sich auf Aufgaben, die in realen
                Geschäftsbeziehungen entstehen.
              </p>
              <p>
                Wir betrachten diese Aufgaben nicht als voneinander völlig
                getrennte Projekte. Viele davon greifen auf dieselben zugrunde
                liegenden Unternehmensinformationen zurück.
              </p>
              <p className="font-display text-3xl leading-tight text-ink">
                Was heute für einen Kunden strukturiert wird, kann morgen die
                Grundlage für die nächste ESG-Anforderung sein.
              </p>
              <div className="pt-3">
                <Link className="orange-link" href="/de#leistungen">
                  Unsere Leistungen ansehen
                </Link>
              </div>
            </Reveal>

            <Reveal
              className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
              delay={0.08}
            >
              <p className="mb-7 text-sm font-bold uppercase text-orange">
                Zum Beispiel, wenn
              </p>
              <CheckList items={practicalNeeds} />
            </Reveal>
          </div>
        </Section>

        <section
          aria-labelledby="manufacturing-title"
          className="border-t border-[rgba(21,21,21,0.09)] bg-[var(--paper)]"
          id="fokus"
        >
          <div className="relative min-h-[28rem] overflow-hidden sm:min-h-[34rem]">
            <Image
              alt="Moderne europäische Produktionsanlage"
              className="object-cover object-[64%_50%]"
              fill
              quality={86}
              sizes="100vw"
              src={evipaceImages.industrialBreak.src}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.88)_0%,rgba(15,15,15,0.66)_44%,rgba(15,15,15,0.12)_78%)]" />
            <div className="site-shell relative z-10 flex min-h-[28rem] items-end py-14 sm:min-h-[34rem] sm:py-20">
              <Reveal className="max-w-2xl text-white">
                <p className="eyebrow">Industrie</p>
                <h2
                  className="heading-md font-display mt-6 max-w-[12ch] text-white"
                  id="manufacturing-title"
                >
                  Warum produzierende Unternehmen?
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-white/78">
                  Für einen Hersteller oder industriellen Zulieferer ist ESG
                  selten ein isoliertes Kommunikationsthema. Es hängt direkt
                  mit dem operativen Geschäft zusammen.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="site-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <p className="text-sm font-bold uppercase text-orange">
                Verbunden mit
              </p>
              <div className="mt-7">
                <CheckList columns items={industrialInputs} />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Deshalb richtet sich evipace besonders an Unternehmen, die
                Dinge herstellen.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {industries.map((industry) => (
                  <span
                    className="border-b border-[rgba(21,21,21,0.18)] pb-2 text-sm font-semibold text-muted"
                    key={industry}
                  >
                    {industry}
                  </span>
                ))}
              </div>
              <p className="mt-9 text-lg font-semibold leading-8 text-ink">
                ESG muss dort neben Produktion, Qualität, Lieferterminen und
                Tagesgeschäft funktionieren – nicht außerhalb davon.
              </p>
            </Reveal>
          </div>
        </section>

        <Section
          decoration={<EuropeBackgroundGraphic locale="de" />}
          eyebrow="Standort und Märkte"
          heading="In Slowenien gegründet. Für europäische Lieferketten gedacht."
          id="standort-maerkte"
          tone="warm"
        >
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <Reveal>
              <div className="flex items-start gap-5 border-y border-[rgba(21,21,21,0.14)] py-7">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 h-6 w-6 shrink-0 text-orange"
                />
                <div>
                  <p className="font-display text-3xl text-ink">Slowenien</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                    Gründungsstandort von evipace
                  </p>
                </div>
              </div>
              <p className="mt-8 text-sm font-bold uppercase text-orange">
                Anfänglicher Fokus
              </p>
              <div className="mt-5">
                <CheckList items={markets} />
              </div>
            </Reveal>

            <Reveal
              className="max-w-3xl space-y-5 text-lg leading-8 text-muted"
              delay={0.08}
            >
              <p>
                evipace ist in Slowenien gegründet und von Anfang an für
                Unternehmen gedacht, die innerhalb europäischer Lieferketten
                arbeiten.
              </p>
              <p>
                Mit dem weiteren Ausbau der Leistungen soll evipace auch
                Unternehmen in weiteren europäischen Märkten unterstützen.
              </p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Die Lieferkette ist international. ESG-Arbeit muss damit
                umgehen können.
              </p>
              <p>
                Ein produzierendes Unternehmen in Slowenien kann einen deutschen
                Kunden haben. Ein österreichischer Einkäufer kann Daten von
                einem Lieferanten in Italien verlangen. Eine europäische
                Plattform kann Informationen über mehrere Standorte hinweg
                abfragen.
              </p>
            </Reveal>
          </div>
        </Section>

        <Section
          decoration={<DataFoundationBackgroundGraphic locale="de" />}
          eyebrow="Datengrundlage"
          heading="Ein Unternehmen muss nicht bei jeder ESG-Anfrage wieder bei null beginnen."
          id="datengrundlage"
        >
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>Eine einzelne Anfrage zu beantworten ist hilfreich.</p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Eine bessere Struktur für die nächste Anfrage aufzubauen ist
                wertvoller.
              </p>
              <p>
                Deshalb denken wir ESG-Arbeit nicht nur als Abfolge einzelner
                Dokumente. Wir denken an die Datengrundlage dahinter.
              </p>
              <p>
                Je strukturierter diese Informationen werden, desto einfacher
                lassen sie sich später wiederverwenden: für einen anderen
                Kunden, eine andere Plattform, einen Bericht oder die nächste
                interne Entscheidung.
              </p>
            </Reveal>

            <Reveal
              className="grid gap-x-8 gap-y-0 border-y border-[rgba(21,21,21,0.14)] sm:grid-cols-2"
              delay={0.08}
            >
              {reusableData.map((item) => (
                <div
                  className="flex min-h-16 items-center gap-3 border-b border-[rgba(21,21,21,0.09)] py-4"
                  key={item}
                >
                  <Layers3
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-orange"
                  />
                  <span className="text-sm font-semibold text-muted">{item}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </Section>

        <Section
          eyebrow="Vertrauen"
          heading="Wie wir arbeiten."
          id="methodik"
          tone="dark"
        >
          <Reveal className="max-w-3xl space-y-5 text-lg leading-8 text-white/72">
            <p>Bei ESG-Arbeit zählt nicht nur das Ergebnis.</p>
            <p className="font-display text-3xl leading-tight text-white sm:text-4xl">
              Es zählt auch, wie dieses Ergebnis entstanden ist.
            </p>
            <p>
              Deshalb basiert unsere Arbeitsweise auf einigen einfachen
              Prinzipien.
            </p>
          </Reveal>

          <div className="mt-12 grid border-t border-white/15 lg:grid-cols-5">
            {methodologyPrinciples.map((principle, index) => (
              <Reveal
                className={`border-b border-white/15 py-7 lg:px-6 ${index > 0 ? "lg:border-l" : "lg:pl-0"}`}
                delay={index * 0.04}
                key={principle.title}
              >
                <FileCheck2
                  aria-hidden="true"
                  className="h-5 w-5 text-orange"
                />
                <h3 className="mt-5 font-display text-2xl leading-tight text-white">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/64">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link className="orange-link text-white" href="/de/methodology">
              Unsere Methodik
            </Link>
          </Reveal>
        </Section>

        <Section
          eyebrow="Zusammenarbeit"
          heading="Direkter Kontakt. Klarer Arbeitsprozess."
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>
                evipace wird bewusst als fokussierter Spezialanbieter
                aufgebaut.
              </p>
              <p>
                Das bedeutet: keine unnötigen Beratungsebenen, keine
                unübersichtlichen Projektstrukturen und kein Self-Service-Modell,
                bei dem am Ende doch wieder alles bei Ihnen landet.
              </p>
              <p>
                Bei spezialisierten Fragestellungen kann zusätzliche externe
                Expertise einbezogen werden, wenn dies für den jeweiligen
                Auftrag sinnvoll ist.
              </p>
              <p className="font-semibold text-ink">
                Die Struktur bleibt klar – auch wenn die Aufgabe komplex ist.
              </p>
            </Reveal>

            <Reveal
              className="border-y border-[rgba(21,21,21,0.14)] py-7"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Klarheit darüber
              </p>
              <CheckList items={responsibilityPoints} />
            </Reveal>
          </div>
        </Section>

        <Section
          decoration={<BoundariesBackgroundGraphic locale="de" />}
          eyebrow="Grenzen"
          heading="Was evipace nicht sein möchte."
          id="grenzen"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>
                evipace wurde nicht aufgebaut, um jedes Nachhaltigkeitsthema
                für jedes Unternehmen abzudecken. Wir möchten auch nicht der
                größte ESG-Generalist sein.
              </p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Unser Fokus ist konkreter: Unternehmen dabei zu helfen, reale
                ESG-Anforderungen strukturiert zu erledigen.
              </p>
            </Reveal>

            <Reveal
              className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
              delay={0.08}
            >
              <ul className="grid gap-4">
                {boundaries.map((boundary) => (
                  <li className="flex gap-3 leading-7 text-muted" key={boundary}>
                    <MinusCircle
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-orange"
                    />
                    <span>{boundary}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-14 border-t border-[rgba(21,21,21,0.14)] pt-9">
            <p className="text-sm font-bold uppercase text-orange">
              Unser Anspruch
            </p>
            <p className="font-display mt-5 max-w-5xl text-4xl leading-tight text-ink sm:text-5xl">
              Saubere Arbeit, klare Quellen, sichtbare Lücken und ein
              nachvollziehbarer Prozess.
            </p>
          </Reveal>
        </Section>

        <Section
          eyebrow="Weiterentwicklung"
          heading="evipace wird mit den Anforderungen seiner Kunden wachsen."
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <Reveal className="border-y border-[rgba(21,21,21,0.14)] py-8">
              <div className="flex items-center gap-4">
                <Factory aria-hidden="true" className="h-6 w-6 text-orange" />
                <p className="font-display text-3xl text-ink">
                  Relevanz vor Umfang.
                </p>
              </div>
            </Reveal>
            <Reveal
              className="max-w-3xl space-y-5 text-lg leading-8 text-muted"
              delay={0.08}
            >
              <p>
                ESG verändert sich. Standards entwickeln sich weiter. Kunden
                stellen neue Anforderungen. Unternehmen benötigen neue Daten.
              </p>
              <p>
                Deshalb wird auch evipace nicht statisch bleiben. Neue
                Leistungen, Methoden und Märkte sollen dort hinzukommen, wo sie
                für produzierende Unternehmen tatsächlich relevant werden.
              </p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Komplexität reduzieren, ohne Genauigkeit vorzutäuschen. Arbeit
                übernehmen, statt nur über sie zu beraten. Und aus verstreuten
                Informationen eine belastbare Grundlage machen.
              </p>
            </Reveal>
          </div>
        </Section>

        <section className="relative isolate overflow-hidden bg-[var(--soft-orange)] py-20 sm:py-28">
          <div className="site-shell relative z-10 max-w-5xl">
            <Reveal>
              <p className="eyebrow">Kontakt</p>
              <h2 className="font-display mt-6 max-w-[13ch] text-5xl leading-none sm:text-6xl lg:text-7xl">
                Eine ESG-Anforderung liegt bereits auf Ihrem Tisch?
              </h2>
              <div className="mt-7 max-w-2xl space-y-4 text-xl leading-8 text-[rgba(21,21,21,0.68)]">
                <p>
                  Sie müssen nicht zuerst herausfinden, zu welcher Kategorie
                  sie gehört.
                </p>
                <p>
                  Senden Sie uns die Anfrage, den Fragebogen oder eine kurze
                  Beschreibung der Aufgabe. Wir prüfen, was benötigt wird und
                  wie wir Sie dabei unterstützen können.
                </p>
              </div>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <ButtonLink href={SEND_REQUEST_HREF}>
                  ESG-Anfrage senden
                </ButtonLink>
                <a
                  className="orange-link"
                  href={`mailto:${publicContactEmail}`}
                >
                  {publicContactEmail}
                </a>
              </div>
              <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
                Kundenanfrage · Fragebogen · Emissionen · Bericht · Nachweise
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
