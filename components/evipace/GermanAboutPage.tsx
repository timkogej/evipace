import Image from "next/image";
import Link from "next/link";
import { publicContactEmail } from "@/lib/company-info";
import { evipaceImages } from "@/lib/evipace-images";
import {
  aboutToneBorder,
  aboutToneClass,
  AboutSection,
  HairlineList,
  NumberedRows,
  Rise
} from "./about/AboutComposition";
import { ButtonLink } from "./ButtonLink";

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
    body: "Eine von Evipace vorbereitete Richtlinie wird erst dann zur Richtlinie des Unternehmens, wenn sie intern geprüft und ausdrücklich angenommen wurde."
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
  "was Evipace vorbereitet",
  "was noch fehlt",
  "was Ihr Unternehmen bestätigen muss"
];

const boundaries = [
  "Wir vergeben keine ESG-Zertifizierungen.",
  "Wir ersetzen keine unabhängige Assurance.",
  "Wir garantieren keine bestimmte Bewertung durch EcoVadis, IntegrityNext, einen Kunden oder eine andere externe Stelle.",
  "Wir stellen fehlende Unternehmenspraktiken nicht als bestehend dar."
];

const workingPrinciples = [
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
];

export function GermanAboutPage() {
  return (
    <main className="about-page about--de">
      <section
        aria-labelledby="about-title"
        className="about-hero relative isolate overflow-hidden"
        id="top"
      >
        <span aria-hidden="true" className="about-ghost">
          EVIPACE
        </span>
        <div className="site-shell relative z-10">
          <Rise>
            <p className="eyebrow">Über Evipace</p>
            <h1 className="about-h1 font-display mt-6" id="about-title">
              ESG sollte für kleinere Unternehmen nicht komplizierter sein
              als die Aufgabe selbst.
            </h1>
          </Rise>

          <div className="mt-12 grid gap-x-16 gap-y-10 sm:mt-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
            <Rise step={1}>
              <div className="about-body text-muted">
                <p>
                  Evipace wurde gegründet, um produzierenden Unternehmen eine
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
              <p className="about-quote mt-7 border-l-2 border-orange pl-5 text-ink">
                Es sollte eine klar definierte Aufgabe geben – und einen
                strukturierten Weg, sie zu erledigen.
              </p>
            </Rise>

            <Rise step={2}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                Vom Eingang zum Ergebnis
              </p>
              <div className="mt-5 border-t border-[rgba(21,21,21,0.14)]">
                {[
                  ["01", "Konkrete Anforderung"],
                  ["02", "Vorhandene Informationen"],
                  ["03", "Nutzbares Ergebnis"]
                ].map(([number, label]) => (
                  <div
                    className="grid grid-cols-[2.25rem_1fr] items-baseline gap-4 border-b border-[rgba(21,21,21,0.1)] py-4"
                    key={number}
                  >
                    <span className="font-mono text-[0.68rem] font-bold text-orange">
                      {number}
                    </span>
                    <span className="font-display text-xl text-ink sm:text-2xl">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Rise>
          </div>
        </div>
      </section>

      <AboutSection
        eyebrow="Entstehung"
        heading="Warum Evipace entstanden ist."
        id="warum"
        tone="paper"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Rise>
            <p className="about-body text-muted">
              Die Idee hinter Evipace entstand aus einer einfachen Beobachtung:
            </p>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              Die ESG-Anforderungen großer Unternehmen erreichen längst auch
              ihre kleineren Lieferanten – die Ressourcen dafür aber nicht
              automatisch.
            </p>
            <div className="about-body mt-6 text-muted">
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
            </div>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.13)] pl-6 sm:pl-9"
            step={1}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              Plötzlich benötigt
            </p>
            <div className="mt-5">
              <HairlineList items={requestedInformation} split />
            </div>
          </Rise>
        </div>

        <Rise
          className="mt-12 border-t border-[rgba(21,21,21,0.14)] pt-9 sm:mt-14"
          step={2}
        >
          <p className="about-statement about-statement--wide font-display text-ink">
            Die Informationen sind häufig vorhanden. Aber sie liegen nicht
            dort, wo der Fragebogen sie erwartet.
          </p>
          <div className="mt-8 grid gap-x-8 border-y border-[rgba(21,21,21,0.1)] sm:grid-cols-2 lg:grid-cols-5">
            {sourceLocations.map(([source, information], index) => (
              <div
                className={`py-5 ${index > 0 ? "sm:border-l sm:border-[rgba(21,21,21,0.1)] sm:pl-6" : ""}`}
                key={source}
              >
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-orange">
                  {source}
                </p>
                <p className="mt-2.5 text-sm font-semibold leading-6 text-muted">
                  {information}
                </p>
              </div>
            ))}
          </div>
          <p className="about-body mt-7 text-muted">
            Aus all diesen einzelnen Informationen muss am Ende eine
            konsistente ESG-Antwort entstehen.
          </p>
        </Rise>
      </AboutSection>

      <AboutSection
        eyebrow="Positionierung"
        heading="Zwischen Beratung und Software fehlte etwas."
        tone="surface"
      >
        <Rise className="max-w-3xl space-y-5 text-lg leading-8 text-muted">
          <p>
            Unternehmen, die eine konkrete ESG-Anforderung erfüllen müssen,
            finden häufig zwei Arten von Lösungen.
          </p>
        </Rise>

        <div className="mt-10 grid border-y border-[rgba(21,21,21,0.13)] lg:grid-cols-3">
          <Rise className="py-9 lg:pr-9">
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
          </Rise>

          <Rise
            className="border-y border-[rgba(21,21,21,0.13)] bg-[var(--soft-orange)] px-0 py-9 sm:px-9 lg:border-x lg:border-y-0"
            step={1}
          >
            <p className="text-xs font-bold uppercase text-orange">Evipace</p>
            <p className="mt-5 font-display text-3xl leading-tight text-ink">
              Die konkrete ESG-Arbeit strukturiert vorbereiten und mit Ihnen
              bis zu einem nutzbaren Ergebnis bringen.
            </p>
          </Rise>

          <Rise className="py-9 lg:pl-9" step={2}>
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
          </Rise>
        </div>

        <Rise className="mt-12 max-w-4xl space-y-4 text-xl leading-8 text-muted">
          <p className="font-display text-4xl text-ink">
            Evipace wurde für den Raum dazwischen aufgebaut.
          </p>
          <p>Nicht nur beraten, was getan werden sollte.</p>
          <p>
            Nicht nur ein Werkzeug bereitstellen, mit dem Sie es selbst tun
            können.
          </p>
        </Rise>
      </AboutSection>

      <AboutSection
        eyebrow="Markenidee"
        heading="ESG, done faster."
        id="arbeitsweise"
        tone="dark"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <Rise>
            <p className="about-body text-white/70">
              Der Name Evipace steht für einen einfachen Anspruch:
            </p>
            <p className="about-statement about-statement--wide font-display mt-4 text-white">
              Komplexe ESG-Anforderungen sollen schneller bearbeitbar werden,
              ohne dabei an Nachvollziehbarkeit zu verlieren.
            </p>
            <p className="about-body mt-6 text-white/70">
              Geschwindigkeit bedeutet für uns nicht, Schritte auszulassen.
              Sie entsteht durch einen besseren Prozess.
            </p>
            <p className="about-quote mt-6 border-l-2 border-orange pl-5 text-white">
              Schneller bedeutet nicht oberflächlicher. Es bedeutet
              strukturierter.
            </p>
          </Rise>

          <Rise className="border-t border-white/15" step={1}>
            <NumberedRows dark items={speedPrinciples} />
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Gründer"
        heading="Aus der Praxis entstanden."
        id="gruender"
        tone="soft"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1.34fr)]">
          <Rise className="self-start">
            <p className="about-signature__name font-display text-ink">
              {founder.name}
            </p>
            <p className="about-signature__role mt-4">{founder.role}</p>
            <p className="mt-2 text-sm font-semibold text-muted">
              {founder.location}
            </p>
          </Rise>

          <Rise step={1}>
            <div className="about-body text-muted">
              <p>
                Tim Kogej gründete Evipace mit dem Ziel, ESG-Arbeit für
                kleinere und mittlere Unternehmen operativer, klarer und
                zugänglicher zu machen.
              </p>
              <p>
                Im Mittelpunkt steht dabei nicht die Frage, wie Unternehmen
                möglichst viel über ESG sprechen können. Sondern eine
                praktischere:
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-5 text-ink">
              Wie wird aus einer konkreten ESG-Anforderung eine lösbare
              Aufgabe?
            </p>
            <div className="about-body mt-5 text-muted">
              <p>
                Evipace wird an der Schnittstelle von strukturierten Daten,
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
            </div>
            <p className="about-quote mt-6 border-l-2 border-orange pl-5 text-ink">
              Die Qualität eines Ergebnisses soll nicht davon abhängen, dass
              ein einzelner Mensch alles behauptet zu wissen – sondern davon,
              dass die richtige Methodik und die richtige Expertise für die
              jeweilige Aufgabe eingesetzt werden.
            </p>
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Prinzipien"
        heading="Was wir anders machen wollen."
        tone="surface"
      >
        <div className="grid border-t border-[rgba(21,21,21,0.14)] lg:grid-cols-3">
          {workingPrinciples.map((principle, index) => (
            <Rise
              className={`border-b border-[rgba(21,21,21,0.14)] py-8 lg:px-8 ${index === 0 ? "lg:pl-0" : "lg:border-l"}`}
              key={principle.number}
              step={index as 0 | 1 | 2}
            >
              <p className="font-mono text-[0.68rem] font-bold text-orange">
                {principle.number}
              </p>
              <h3 className="about-h3 font-display mt-4 text-ink">
                {principle.title}
              </h3>
              <p className="about-body mt-4 text-muted">{principle.body}</p>
            </Rise>
          ))}
        </div>
        <Rise className="mt-8" step={1}>
          <p className="about-quote text-ink">
            ESG-Arbeit wird nicht glaubwürdiger, indem Unsicherheit versteckt
            wird.
          </p>
        </Rise>
      </AboutSection>

      <AboutSection
        eyebrow="Leistungsmodell"
        heading="Praktische ESG-Umsetzung für produzierende Unternehmen."
        tone="paper"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <Rise>
            <div className="about-body text-muted">
              <p>
                Evipace konzentriert sich auf Aufgaben, die in realen
                Geschäftsbeziehungen entstehen.
              </p>
              <p>
                Wir betrachten diese Aufgaben nicht als voneinander völlig
                getrennte Projekte. Viele davon greifen auf dieselben zugrunde
                liegenden Unternehmensinformationen zurück.
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              Was heute für einen Kunden strukturiert wird, kann morgen die
              Grundlage für die nächste ESG-Anforderung sein.
            </p>
            <div className="mt-6">
              <Link className="orange-link" href="/de#leistungen">
                Unsere Leistungen ansehen
              </Link>
            </div>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
            step={1}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              Zum Beispiel, wenn
            </p>
            <div className="mt-5">
              <HairlineList items={practicalNeeds} />
            </div>
          </Rise>
        </div>
      </AboutSection>

      <section
        aria-labelledby="manufacturing-title"
        className={`border-t ${aboutToneBorder.surface} ${aboutToneClass.surface}`}
        id="fokus"
      >
        <div className="relative min-h-[20rem] overflow-hidden sm:min-h-[25rem]">
          <Image
            alt="Moderne europäische Produktionsanlage"
            className="object-cover object-[64%_50%]"
            fill
            quality={86}
            sizes="100vw"
            src={evipaceImages.industrialBreak.src}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.88)_0%,rgba(15,15,15,0.66)_44%,rgba(15,15,15,0.12)_78%)]" />
          <div className="site-shell relative z-10 flex min-h-[20rem] items-end py-12 sm:min-h-[25rem] sm:py-14">
            <Rise className="max-w-2xl text-white">
              <p className="eyebrow">Industrie</p>
              <h2
                className="about-h2 font-display mt-5 text-white"
                id="manufacturing-title"
              >
                Warum produzierende Unternehmen?
              </h2>
              <p className="about-lead mt-5 text-white/78">
                Für einen Hersteller oder industriellen Zulieferer ist ESG
                selten ein isoliertes Kommunikationsthema. Es hängt direkt
                mit dem operativen Geschäft zusammen.
              </p>
            </Rise>
          </div>
        </div>

        <div className="about-section site-shell">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <Rise>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                Verbunden mit
              </p>
              <div className="mt-5">
                <HairlineList items={industrialInputs} split />
              </div>
            </Rise>
            <Rise step={1}>
              <p className="about-statement about-statement--wide font-display text-ink">
                Deshalb richtet sich Evipace besonders an Unternehmen, die
                Dinge herstellen.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {industries.map((industry) => (
                  <span
                    className="border-b border-[rgba(21,21,21,0.18)] pb-2 text-sm font-semibold text-muted"
                    key={industry}
                  >
                    {industry}
                  </span>
                ))}
              </div>
              <p className="about-quote mt-7 text-ink">
                ESG muss dort neben Produktion, Qualität, Lieferterminen und
                Tagesgeschäft funktionieren – nicht außerhalb davon.
              </p>
            </Rise>
          </div>
        </div>
      </section>

      <AboutSection
        eyebrow="Standort und Märkte"
        heading="In Slowenien gegründet. Für europäische Lieferketten gedacht."
        id="standort-maerkte"
        tone="paper"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <Rise>
            <div className="border-t border-[rgba(21,21,21,0.14)] pt-6">
              <p className="font-display text-3xl text-ink">Slowenien</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                Gründungsstandort von Evipace
              </p>
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-orange">
              Anfänglicher Fokus
            </p>
            <div className="mt-4">
              <HairlineList items={markets} />
            </div>
          </Rise>

          <Rise step={1}>
            <div className="about-body text-muted">
              <p>
                Evipace ist in Slowenien gegründet und von Anfang an für
                Unternehmen gedacht, die innerhalb europäischer Lieferketten
                arbeiten.
              </p>
              <p>
                Mit dem weiteren Ausbau der Leistungen soll Evipace auch
                Unternehmen in weiteren europäischen Märkten unterstützen.
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              Die Lieferkette ist international. ESG-Arbeit muss damit
              umgehen können.
            </p>
            <div className="about-body mt-5 text-muted">
              <p>
                Ein produzierendes Unternehmen in Slowenien kann einen deutschen
                Kunden haben. Ein österreichischer Einkäufer kann Daten von
                einem Lieferanten in Italien verlangen. Eine europäische
                Plattform kann Informationen über mehrere Standorte hinweg
                abfragen.
              </p>
            </div>
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Datengrundlage"
        heading="Ein Unternehmen muss nicht bei jeder ESG-Anfrage wieder bei null beginnen."
        id="datengrundlage"
        tone="surface"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <Rise>
            <p className="about-body text-muted">
              Eine einzelne Anfrage zu beantworten ist hilfreich.
            </p>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              Eine bessere Struktur für die nächste Anfrage aufzubauen ist
              wertvoller.
            </p>
            <div className="about-body mt-6 text-muted">
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
            </div>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.13)] pl-6 sm:pl-9"
            step={1}
          >
            <HairlineList items={reusableData} split />
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Vertrauen"
        heading="Wie wir arbeiten."
        id="methodik"
        tone="dark"
      >
        <Rise>
          <p className="about-body text-white/70">
            Bei ESG-Arbeit zählt nicht nur das Ergebnis.
          </p>
          <p className="about-statement about-statement--wide font-display mt-4 text-white">
            Es zählt auch, wie dieses Ergebnis entstanden ist.
          </p>
          <p className="about-body mt-5 text-white/70">
            Deshalb basiert unsere Arbeitsweise auf einigen einfachen
            Prinzipien.
          </p>
        </Rise>

        <div className="mt-10 grid border-t border-white/15 lg:grid-cols-5">
          {methodologyPrinciples.map((principle, index) => (
            <Rise
              className={`border-b border-white/15 py-6 lg:px-6 ${index > 0 ? "lg:border-l" : "lg:pl-0"}`}
              key={principle.title}
              step={(index % 3) as 0 | 1 | 2}
            >
              <h3 className="font-display text-xl leading-tight text-white">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/64">
                {principle.body}
              </p>
            </Rise>
          ))}
        </div>

        <Rise className="mt-8" step={1}>
          <Link className="orange-link text-white" href="/de/methodology">
            Unsere Methodik
          </Link>
        </Rise>
      </AboutSection>

      <AboutSection
        eyebrow="Zusammenarbeit"
        heading="Direkter Kontakt. Klarer Arbeitsprozess."
        tone="paper"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
          <Rise>
            <div className="about-body text-muted">
              <p>
                Evipace wird bewusst als fokussierter Spezialanbieter
                aufgebaut.
              </p>
              <p>
                Das bedeutet: keine unnötigen Beratungsebenen, keine
                unübersichtlichen Projektstrukturen und kein
                Self-Service-Modell, bei dem am Ende doch wieder alles bei
                Ihnen landet.
              </p>
              <p>
                Bei spezialisierten Fragestellungen kann zusätzliche externe
                Expertise einbezogen werden, wenn dies für den jeweiligen
                Auftrag sinnvoll ist.
              </p>
            </div>
            <p className="about-quote mt-6 text-ink">
              Die Struktur bleibt klar – auch wenn die Aufgabe komplex ist.
            </p>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
            step={1}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              Klarheit darüber
            </p>
            <div className="mt-5">
              <HairlineList items={responsibilityPoints} />
            </div>
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Grenzen"
        heading="Was Evipace nicht sein möchte."
        id="grenzen"
        tone="surface"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)]">
          <Rise>
            <div className="about-body text-muted">
              <p>
                Evipace wurde nicht aufgebaut, um jedes Nachhaltigkeitsthema
                für jedes Unternehmen abzudecken. Wir möchten auch nicht der
                größte ESG-Generalist sein.
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              Unser Fokus ist konkreter: Unternehmen dabei zu helfen, reale
              ESG-Anforderungen strukturiert zu erledigen.
            </p>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
            step={1}
          >
            <HairlineList items={boundaries} muted />
          </Rise>
        </div>

        <Rise
          className="mt-12 border-t border-[rgba(21,21,21,0.14)] pt-8"
          step={2}
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
            Unser Anspruch
          </p>
          <p className="about-statement about-statement--wide font-display mt-4 text-ink">
            Saubere Arbeit, klare Quellen, sichtbare Lücken und ein
            nachvollziehbarer Prozess.
          </p>
        </Rise>
      </AboutSection>

      <section
        className={`about-section border-t ${aboutToneBorder.paper} ${aboutToneClass.paper}`}
      >
        <div className="site-shell grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)]">
          <Rise>
            <p className="eyebrow">Weiterentwicklung</p>
            <h2 className="about-h2 font-display mt-5 text-ink">
              Evipace wird mit den Anforderungen seiner Kunden wachsen.
            </h2>
            <p className="about-plate mt-9 font-display text-3xl leading-tight text-ink">
              Relevanz vor Umfang.
            </p>
          </Rise>
          <Rise step={1}>
            <div className="about-body text-muted">
              <p>
                ESG verändert sich. Standards entwickeln sich weiter. Kunden
                stellen neue Anforderungen. Unternehmen benötigen neue Daten.
              </p>
              <p>
                Deshalb wird auch Evipace nicht statisch bleiben. Neue
                Leistungen, Methoden und Märkte sollen dort hinzukommen, wo sie
                für produzierende Unternehmen tatsächlich relevant werden.
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-5 text-ink">
              Komplexität reduzieren, ohne Genauigkeit vorzutäuschen. Arbeit
              übernehmen, statt nur über sie zu beraten. Und aus verstreuten
              Informationen eine belastbare Grundlage machen.
            </p>
          </Rise>
        </div>
      </section>

      <section className="bg-[var(--soft-orange)] py-20 sm:py-28">
        <div className="site-shell max-w-5xl">
          <Rise>
            <p className="eyebrow">Kontakt</p>
            <h2 className="about-cta-heading font-display mt-5">
              Eine ESG-Anforderung liegt bereits auf Ihrem Tisch?
            </h2>
            <div className="about-lead mt-6 space-y-4 text-[rgba(21,21,21,0.7)]">
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
              <ButtonLink href={SEND_REQUEST_HREF}>ESG-Anfrage senden</ButtonLink>
              <a className="orange-link" href={`mailto:${publicContactEmail}`}>
                {publicContactEmail}
              </a>
            </div>
            <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
              Kundenanfrage · Fragebogen · Emissionen · Bericht · Nachweise
            </p>
          </Rise>
        </div>
      </section>
    </main>
  );
}
