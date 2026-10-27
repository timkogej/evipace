import { ClosingCta } from "../home/ClosingCta";
import { Head, Prose } from "../service-landing/Blocks";
import {
  CenterAction,
  Flow,
  Motto,
  NoteBox,
  PillLink,
  ResourceBand,
  ResourceCard,
  ResourceCards,
  ResourceHero,
  ResourceMain,
  Terms,
  TextLink,
  ToolCard
} from "./ResourceParts";
import r from "./Resource.module.css";
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

const methodTerms = [
  ["Unternehmensdaten", "Was tatsächlich aus dem Unternehmen stammt."],
  ["Berechnungen", "Wie aus Ausgangsdaten eine Kennzahl entsteht."],
  ["Nachweisen", "Welche Quelle eine Aussage stützt."],
  ["Annahmen", "Wo eine Methode Interpretation oder Schätzung benötigt."],
  ["Gaps", "Was tatsächlich noch fehlt."]
] as const;

export function GermanResourceHub() {
  return (
    <ResourceMain locale="de">
      <ResourceHero
        actions={<PillLink href="/de/send-request">ESG-Anfrage senden</PillLink>}
        eyebrow="RESSOURCEN · LEITFÄDEN · CHECKLISTEN"
        locale="de"
        statement="Keine Theorie-Sammlung."
        title="Praktische ESG-Ressourcen für Lieferanten."
      >
        <p>
          Hier finden Sie Leitfäden, Checklisten und praktische Hilfsmittel für die Aufgaben, die entstehen, wenn Kunden ESG-Daten, Nachweise, Emissionszahlen oder Nachhaltigkeitsinformationen verlangen.
        </p>
        <p>
          Von der ersten Kundenanfrage bis zur strukturierten Datensammlung, Berechnung und finalen Prüfung.
        </p>
        <p className={r.topics}>
          <span>Themen</span>
          Kundenanfragen · Nachweise · Scope 1–3 · VSME · EcoVadis · IntegrityNext
        </p>
      </ResourceHero>

      <ResourceBand labelledBy="start-title" tone="dark">
        <Head dark eyebrow="START HERE" id="start-title" title="Sie haben gerade eine ESG-Anfrage erhalten?">
          <p>Dann müssen Sie nicht zuerst alle ESG-Themen verstehen.</p>
          <p>Beginnen Sie mit der konkreten Anfrage und arbeiten Sie sich von dort aus vor.</p>
        </Head>
        <ResourceCards columns={4}>
          {startSteps.map((step, index) => (
            <ResourceCard
              cta={step.cta}
              description={step.description}
              featured={step.interactive}
              href={step.href}
              key={step.number}
              note={step.interactive ? `${checklistCount} Prüfpunkte · Fortschritt lokal gespeichert · Druckbar` : undefined}
              number={index + 1}
              tag={step.interactive ? "Interaktiv" : undefined}
              title={step.title}
              type={step.label}
            />
          ))}
        </ResourceCards>
      </ResourceBand>

      <ResourceBand labelledBy="customer-title">
        <Head eyebrow="KUNDENANFRAGEN" id="customer-title" title="Wenn ein Kunde ESG-Daten verlangt.">
          <p>Die schwierigste Frage ist häufig nicht: „Was ist ESG?“</p>
        </Head>
        <Motto>„Was genau will unser Kunde – und wie bekommen wir die Antwort aus unserem Unternehmen zusammen?“</Motto>
        <p className={r.centerText}>Diese Ressourcen helfen beim operativen Teil der Kundenanfrage.</p>
        <div className={r.cardsGap}>
          <ResourceCards columns={2}>
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
            <ResourceCard
              cta="Checkliste starten"
              description={`${checklistCount} Prüfpunkte für die systematische Bearbeitung einer ESG-Kundenanfrage – von Scope und Datensammlung bis Evidence Review und Submission.`}
              featured
              href={links.checklist}
              title="ESG-Fragebogen Checkliste für Lieferanten"
              type="INTERAKTIVE CHECKLISTE"
              wide
            />
          </ResourceCards>
        </div>
      </ResourceBand>

      <ResourceBand labelledBy="evidence-title" tone="orange">
        <Head eyebrow="NACHWEISE & PLATTFORMEN" id="evidence-title" title="Eine Antwort ist nur so belastbar wie ihre Grundlage.">
          <p>Kunden und Supplier-Plattformen fragen nicht nur nach Aussagen. Sie wollen häufig auch wissen, worauf diese Aussagen basieren.</p>
        </Head>
        <Motto label="Darum von Anfang an">Aussage → Quelle → Nachweis</Motto>
        <ResourceCards>
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
        </ResourceCards>
      </ResourceBand>

      <ResourceBand labelledBy="carbon-title">
        <Head eyebrow="EMISSIONEN" id="carbon-title" title="Scope verstehen. Daten sammeln. Berechnung vorbereiten.">
          <p>Bei Treibhausgasemissionen hilft eine klare Reihenfolge.</p>
          <p>Zuerst verstehen, was Scope 1, 2 und 3 bedeuten. Dann die richtigen Aktivitätsdaten sammeln. Erst danach rechnen.</p>
        </Head>
        <ResourceCards>
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
        </ResourceCards>
        <NoteBox title="Sie haben die Daten bereits?">
          <p>Aus Verbrauchsdaten wird erst durch Bilanzgrenze, Methode, Emissionsfaktoren und dokumentierte Quellen eine nachvollziehbare Berechnung.</p>
          <TextLink href="/de/scope-1-2-berechnung">Scope 1 &amp; 2 berechnen lassen</TextLink>
        </NoteBox>
      </ResourceBand>

      <ResourceBand labelledBy="reporting-title" tone="tinted">
        <Head eyebrow="REPORTING" id="reporting-title" title="Nachhaltigkeitsdaten strukturiert vorbereiten.">
          <p>Ein Nachhaltigkeitsbericht beginnt nicht beim Layout.</p>
        </Head>
        <Motto>Er beginnt bei den Unternehmensdaten dahinter.</Motto>
        <div className={r.single}>
          <ResourceCards columns={2}>
            <ResourceCard
              cta="VSME-Daten vorbereiten"
              description="Ein praktischer Überblick über die Daten, die für das aktuelle europäische freiwillige Nachhaltigkeitsreporting relevant sein können – von Energie und Emissionen über Wasser, Abfall und Mitarbeitende bis zu Policies und weiteren Unternehmensangaben."
              href={links.vsmeData}
              title="VSME: Welche Daten braucht ein Nachhaltigkeitsbericht?"
              type="LEITFADEN"
              wide
            />
          </ResourceCards>
        </div>
        <NoteBox title="Sie möchten daraus einen Bericht erstellen?">
          <p>Wir strukturieren die zugrunde liegenden Unternehmensdaten und bereiten die Inhalte für einen nachvollziehbaren Nachhaltigkeitsbericht vor.</p>
          <TextLink href="/de/vsme-nachhaltigkeitsbericht">VSME-Unterstützung ansehen</TextLink>
        </NoteBox>
      </ResourceBand>

      <ResourceBand labelledBy="tools-title" tone="dark">
        <Head dark eyebrow="TOOLS & CHECKLISTEN" id="tools-title" title="Ressourcen, mit denen Sie direkt arbeiten können.">
          <p>Nicht jede ESG-Ressource muss ein langer Leitfaden sein.</p>
          <p>Manche Aufgaben lassen sich besser mit einer klaren Arbeitsstruktur erledigen.</p>
        </Head>
        <ul className={`${r.tools} ${r.tools3}`}>
          <ToolCard
            facts={[`${checklistCount} Prüfpunkte`, "Lokal gespeichert", "Druckbar"]}
            flow="Anfrage → Scope → Verantwortliche → Daten → Nachweise → Berechnungen → Review → Submission → Wiederverwendung"
            href={links.checklist}
            intro="Die Checkliste führt durch den vollständigen internen Preparation-Prozess:"
            label="INTERAKTIV"
            lead="Von der ersten Prüfung bis zum finalen Submit."
            linkLabel="Interaktive Checkliste öffnen"
            privacy="Der Fortschritt wird ausschließlich lokal im Browser gespeichert. Die Checkliste kann jederzeit weitergeführt, zurückgesetzt oder gedruckt werden."
            small="Kein Login · lokale Speicherung · druckbar"
            title="ESG-Fragebogen Checkliste für Lieferanten"
          />
          <ToolCard
            facts={[`${evidenceCheckCount} Prüfpunkte`, "Lokal gespeichert", "Druckbar"]}
            flow="Aussage → Gesellschaft → Scope → Zeitraum → Quelle → Gültigkeit → Freigabe"
            href={links.evidenceCheck}
            intro="Der Evidence Readiness Check prüft nicht den ganzen Fragebogen, sondern einen einzelnen Nachweis:"
            label="INTERAKTIV"
            lead="Für ein konkretes Dokument oder eine konkrete Kennzahl."
            linkLabel="Evidence Check öffnen"
            privacy="Die Eingaben bleiben im Browser. Es werden keine Dokumente hochgeladen und keine Daten übertragen."
            small="Kein Login · keine Uploads · lokale Speicherung"
            title="ESG-Nachweise prüfen"
          />
          <ToolCard
            facts={["Lokal gespeichert", "CSV-Export", "Druckbar"]}
            flow="Standorte → Relevanz → Datensätze → Quellen → Datenlücken → CSV"
            href={links.scopeDataTemplate}
            intro="Strom, Brennstoffe, Fahrzeuge, Kältemittel und weitere Aktivitätsdaten strukturiert je Standort erfassen."
            label="INTERAKTIVE VORLAGE"
            lead="Für Aktivitätsdaten vor der CO₂e-Berechnung."
            linkLabel="Vorlage öffnen"
            privacy="Die Vorlage ist kein Emissionsrechner und enthält keine Emissionsfaktoren. Sie bereitet die Datenbasis für die spätere Berechnung vor."
            small="Kein Login · lokale Speicherung · CSV-Export"
            title="Scope 1 & 2 Datenerfassungs-Vorlage"
          />
        </ul>
      </ResourceBand>

      <ResourceBand labelledBy="system-title">
        <Head eyebrow="EIN SYSTEM STATT EINZELNER ANTWORTEN" id="system-title" title="Die nächste ESG-Anfrage sollte leichter werden.">
          <p>Viele Kundenanfragen verwenden andere Formulierungen. Die zugrunde liegenden Unternehmensinformationen bleiben jedoch oft dieselben.</p>
          <p>Ein guter ESG-Prozess verbindet deshalb nicht nur eine Frage mit einer Antwort.</p>
        </Head>
        <Flow items={systemSteps} />
        <p className={r.centerText}>So kann aus einer einmaligen Kundenanfrage schrittweise eine wiederverwendbare ESG-Datenbasis entstehen.</p>
        <CenterAction>
          <TextLink href={links.reusableData}>ESG-Daten für spätere Anfragen wiederverwendbar strukturieren</TextLink>
        </CenterAction>
        <p className={r.closingLine}>Nicht durch blindes Kopieren alter Antworten. Sondern durch strukturierte, überprüfbare Quellen.</p>
      </ResourceBand>

      <ResourceBand labelledBy="method-title" tone="tinted">
        <Head eyebrow="WIE WIR INHALTE AUFBAUEN" id="method-title" title="Praktisch, nachvollziehbar und quellengestützt.">
          <p>Die Ressourcen von Evipace sollen operative ESG-Arbeit verständlicher machen.</p>
          <p>Dabei unterscheiden wir bewusst zwischen:</p>
        </Head>
        <Terms items={methodTerms} />
        <Prose>
          <p>Diese Leitfäden werden von Evipace erstellt. Arbeitsabläufe und Beispiele sind unsere praktischen Hinweise; offizielle Anforderungen werden mit dem Standardgeber oder der Plattform verknüpft. Prüfen Sie die zitierte Version anhand Ihres Berichtszeitraums oder zugewiesenen Assessments.</p>
          <p>Neue Dokumente werden nicht als historische Nachweise dargestellt.</p>
          <p>Unsichere Informationen werden nicht als gesicherte Tatsachen formuliert.</p>
          <p>Und relevante methodische oder regulatorische Änderungen werden nicht als geltende Regeln dargestellt, bevor sie tatsächlich gelten.</p>
        </Prose>
        <CenterAction>
          <TextLink href="/de/methodology">Unsere Methodik ansehen</TextLink>
        </CenterAction>
      </ResourceBand>

      <ResourceBand labelledBy="bridge-title">
        <Head eyebrow="VON DER RESSOURCE ZUR UMSETZUNG" id="bridge-title" title="Sie müssen nicht alles selbst zusammensetzen.">
          <p>Die Ressourcen zeigen, wie einzelne ESG-Aufgaben strukturiert werden können.</p>
          <p>Wenn bereits eine konkrete Kundenanfrage vorliegt, können Sie aber auch direkt damit starten.</p>
          <p>Senden Sie uns den ursprünglichen Fragebogen, die Kunden-E-Mail oder die angeforderten Unterlagen.</p>
          <p>Wir prüfen, welche Daten benötigt werden, welche Quellen bereits vorhanden sind, was berechnet werden muss und wo echte Gaps bestehen.</p>
        </Head>
        <CenterAction>
          <PillLink href="/de/send-request">ESG-Anfrage senden</PillLink>
          <TextLink href="/de/esg-kundenanfragen">ESG-Kundenanfragen ansehen</TextLink>
        </CenterAction>
      </ResourceBand>

      <ResourceBand labelledBy="services-title" tone="tinted">
        <Head
          eyebrow="WENN SIE ES NICHT INTERN ERLEDIGEN MÖCHTEN"
          id="services-title"
          lead="Hinter jedem Leitfaden steht eine Leistung. Gleiche Methodik, gleiche Nachweisdisziplin – nur übernimmt Evipace die Umsetzung."
          title="Dieselbe Arbeit – für Sie vorbereitet."
        />
        <ResourceCards>
          {services.map((service) => (
            <ResourceCard description={service.body} href={service.href} key={service.href} title={service.title} />
          ))}
        </ResourceCards>
      </ResourceBand>

      <ClosingCta
        body={
          <>
            <p>Sie müssen nicht zuerst entscheiden, welcher Leitfaden oder welche Leistung die richtige ist.</p>
            <p>Senden Sie uns einfach das, was Ihr Kunde Ihnen geschickt hat. Wir beginnen mit der tatsächlichen Anfrage.</p>
          </>
        }
        formHref="/de/send-request"
        formLabel="ESG-Anfrage senden"
        forwardLabel="Anfrage weiterleiten"
        note="Fragebogen · Excel · PDF · Portal · Kunden-E-Mail"
        offers={{ label: "Wege der Zusammenarbeit ansehen", href: "/de/angebot" }}
        slogan="STARTEN SIE MIT DER ANFRAGE"
        title="Der Kunde hat bereits gefragt?"
      />
    </ResourceMain>
  );
}
