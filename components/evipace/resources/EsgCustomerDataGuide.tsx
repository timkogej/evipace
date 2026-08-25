import type { ReactNode } from "react";
import { ArrowRight, GitBranch, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/de/send-request";

const categoryNav = [
  ["01", "Unternehmen & Standorte", "#unternehmen-standorte"],
  ["02", "Energie & Emissionen", "#energie-emissionen"],
  ["03", "Umwelt", "#umwelt"],
  ["04", "Mitarbeitende", "#mitarbeitende"],
  ["05", "Arbeitsschutz", "#arbeitsschutz"],
  ["06", "Menschenrechte", "#menschenrechte"],
  ["07", "Policies & Ziele", "#policies-ziele"],
  ["08", "Ethik & Compliance", "#ethik-compliance"],
  ["09", "Lieferkette", "#lieferkette"],
  ["10", "Nachweise", "#nachweise"]
] as const;

type Category = {
  id: string;
  number: string;
  title: string;
  intro?: string;
  informationLabel: string;
  information: readonly string[];
  owners: string;
  sources: readonly string[];
  watch: string;
  cta?: {
    label: string;
    href: string;
  };
  policyDistinction?: boolean;
  evidenceFlow?: boolean;
};

const categories = [
  {
    id: "unternehmen-standorte",
    number: "01",
    title: "Unternehmens- und Standortdaten",
    intro:
      "Bevor ESG-Kennzahlen sinnvoll eingeordnet werden können, muss klar sein, für welches Unternehmen, welche Gesellschaft und welchen organisatorischen Umfang die Angaben gelten.",
    informationLabel: "Häufig abgefragte Informationen",
    information: [
      "Firmenname und rechtliche Einheit",
      "Unternehmenssitz",
      "relevante Standorte",
      "Länder der Geschäftstätigkeit",
      "Anzahl der Mitarbeitenden",
      "Branche / Geschäftstätigkeit",
      "Produktionsstandorte",
      "Berichtszeitraum",
      "gegebenenfalls Umsatz- oder Größenklasse",
      "Konzern- oder Tochtergesellschaftsbezug",
      "Geltungsbereich der gemeldeten Daten"
    ],
    owners: "Geschäftsführung · Finance · HR · Legal · Stammdaten",
    sources: [
      "Unternehmensstammdaten",
      "Standortlisten",
      "Organigramme",
      "HR-Auswertungen",
      "interne Unternehmensinformationen",
      "Finanzunterlagen"
    ],
    watch:
      "Eine Kennzahl für einen einzelnen Standort sollte nicht als Unternehmensgesamtwert dargestellt werden, wenn weitere relevante Standorte nicht enthalten sind."
  },
  {
    id: "energie-emissionen",
    number: "02",
    title: "Energie und Treibhausgasemissionen",
    intro:
      "Energie- und Emissionsdaten gehören zu den häufigsten quantitativen Umweltinformationen in ESG-Anfragen.",
    informationLabel: "Häufig abgefragte Informationen",
    information: [
      "Stromverbrauch",
      "Erdgasverbrauch",
      "weitere Brennstoffe",
      "Kraftstoffverbrauch",
      "eingekaufte Wärme, Dampf oder Kälte",
      "Scope-1-Emissionen",
      "Scope-2-Emissionen",
      "gegebenenfalls Scope-3-Informationen",
      "Berichtsjahr",
      "verwendete Berechnungsmethode",
      "erneuerbare Energie / Strombezug",
      "Emissionsreduktionsziele",
                "gegebenenfalls produktbezogene CO₂-Daten"
    ],
    owners:
      "Facility Management · Finance · Einkauf · Fuhrpark · EHS · Produktion",
    sources: [
      "Stromrechnungen",
      "Gasrechnungen",
      "Tankkarten",
      "Zählerdaten",
      "Kältemittelunterlagen",
      "Energiemanagement-Auswertungen",
      "Lieferanteninformationen",
      "Emissionsberechnungen"
    ],
    watch:
      "Verbrauchsdaten, verwendete Emissionsfaktoren und daraus berechnete CO₂e-Werte sollten getrennt nachvollziehbar bleiben.",
    cta: {
      label: "Scope-1-&-2-Daten strukturiert sammeln",
      href: "/de/ressourcen/scope-1-2-datenerfassungs-vorlage"
    }
  },
  {
    id: "umwelt",
    number: "03",
    title: "Umwelt, Ressourcen und betriebliche Auswirkungen",
    intro:
      "Neben Treibhausgasemissionen können je nach Tätigkeit weitere Umweltinformationen relevant sein. Für Produktionsunternehmen ist dieser Bereich häufig umfangreicher als für reine Büroorganisationen.",
    informationLabel: "Mögliche Themen",
    information: [
      "Wasserverbrauch",
      "Abwasser",
      "Abfallmengen",
      "gefährliche Abfälle",
      "Recycling / Verwertung",
      "Material- und Rohstoffverbrauch",
      "Chemikalien",
      "Luftemissionen",
      "Umweltvorfälle",
      "Verschmutzung von Boden oder Wasser",
      "Ressourceneffizienz",
      "Kreislaufwirtschaft",
      "Biodiversität, sofern relevant",
      "produktbezogene Umweltaspekte, sofern relevant"
    ],
    owners: "EHS · Umweltmanagement · Produktion · Facility · Einkauf · Quality",
    sources: [
      "Wasserrechnungen",
      "Abfallberichte",
      "Entsorgungsnachweise",
      "Gefahrstoffregister",
      "Umweltmessungen",
      "Genehmigungen",
      "Zertifikatsunterlagen",
      "interne Umweltkennzahlen"
    ],
    watch:
      "Welche Umweltinformationen sinnvoll und notwendig sind, hängt stark von der tatsächlichen Tätigkeit und den relevanten Auswirkungen des Unternehmens ab."
  },
  {
    id: "mitarbeitende",
    number: "04",
    title: "Mitarbeitende und Arbeitsbedingungen",
    informationLabel: "Häufig abgefragte Informationen",
    information: [
      "Anzahl der Mitarbeitenden",
      "Headcount / FTE, sofern angefragt",
      "Beschäftigungsarten",
      "Geschlechterverteilung",
      "Fluktuation, sofern relevant",
      "Weiterbildung und Training",
      "Arbeitsbedingungen",
      "Diversity-Kennzahlen",
      "Vergütungsinformationen, sofern relevant",
      "Tarifbindung / Arbeitnehmervertretung, sofern relevant"
    ],
    owners: "HR · Payroll · Geschäftsführung",
    sources: [
      "HR-Auswertungen",
      "Payroll-Daten",
      "Trainingsregister",
      "Personalstatistiken",
      "interne Richtlinien"
    ],
    watch:
      "„Mitarbeitende“, „Headcount“ und „FTE“ sind nicht automatisch dieselbe Kennzahl. Definition und Zeitraum sollten zur Kundenfrage passen."
  },
  {
    id: "arbeitsschutz",
    number: "05",
    title: "Gesundheit und Sicherheit am Arbeitsplatz",
    informationLabel: "Häufig abgefragte Informationen",
    information: [
      "Arbeitsschutzmanagement",
      "Arbeitsunfälle",
      "Unfallkennzahlen, sofern angefragt",
      "verlorene Arbeitstage",
      "Sicherheitsunterweisungen",
      "Gefährdungsbeurteilungen",
      "Präventionsmaßnahmen",
      "Arbeitsschutz-Verantwortlichkeiten",
      "Arbeitsschutz-Zertifizierungen, sofern vorhanden"
    ],
    owners: "EHS · HSE · HR · Produktion · Quality",
    sources: [
      "Unfallregister",
      "Schulungsnachweise",
      "Gefährdungsbeurteilungen",
      "Sicherheitsprotokolle",
      "Zertifikate",
      "interne Verfahren"
    ],
    watch:
      "Eine Arbeitsschutzrichtlinie dokumentiert nicht automatisch die tatsächliche Umsetzung aller darin beschriebenen Maßnahmen."
  },
  {
    id: "menschenrechte",
    number: "06",
    title: "Menschenrechte und soziale Mindeststandards",
    informationLabel: "Häufige Themen",
    information: [
      "Kinderarbeit",
      "Zwangsarbeit",
      "Diskriminierung",
      "Belästigung",
      "Vereinigungsfreiheit",
      "faire Arbeitsbedingungen",
      "Beschwerdekanäle",
      "Menschenrechtsrichtlinie",
      "schwerwiegende Vorfälle, sofern angefragt",
      "menschenrechtliche Risiken in der Lieferkette, sofern relevant"
    ],
    owners: "HR · Compliance · Legal · Procurement · Management",
    sources: [
      "Human Rights Policy",
      "Code of Conduct",
      "Beschwerdeverfahren",
      "Trainingsnachweise",
      "Risikobewertungen",
      "dokumentierte interne Prozesse"
    ],
    watch:
      "Antworten sollten den tatsächlichen Status im Unternehmen widerspiegeln. Eine neu erstellte Richtlinie sollte nicht rückwirkend als Nachweis einer bereits langjährig bestehenden Praxis dargestellt werden."
  },
  {
    id: "policies-ziele",
    number: "07",
    title: "Richtlinien, Maßnahmen und Ziele",
    intro:
      "Kunden fragen häufig nicht nur nach Kennzahlen, sondern auch danach, wie relevante Nachhaltigkeitsthemen im Unternehmen gesteuert werden.",
    informationLabel: "Häufig abgefragte Inhalte",
    information: [
      "Environmental Policy",
      "Human Rights Policy",
      "Health & Safety Policy",
      "Code of Ethics",
      "Anti-Corruption Policy",
      "Supplier Code of Conduct",
      "Sustainable Procurement Policy",
      "Verantwortlichkeiten",
      "Ziele",
      "Maßnahmenprogramme",
      "interne Reviews",
      "Managementfreigaben"
    ],
    owners: "Fachbereich · Management · Compliance · Legal · HR · EHS",
    sources: [
      "freigegebene Richtlinien",
      "Managementbeschlüsse",
      "Maßnahmenpläne",
      "Review-Unterlagen",
      "Verantwortlichkeitsmatrizen"
    ],
    watch:
      "Eine Richtlinie dokumentiert einen formellen Grundsatz oder eine Erwartung. Sie belegt nicht automatisch, dass jede darin beschriebene Maßnahme vollständig umgesetzt ist.",
    policyDistinction: true
  },
  {
    id: "ethik-compliance",
    number: "08",
    title: "Ethik, Compliance und Unternehmensführung",
    informationLabel: "Häufige Themen",
    information: [
      "Anti-Korruption",
      "Bestechungsprävention",
      "Code of Ethics / Code of Conduct",
      "Compliance-Verantwortlichkeiten",
      "Hinweisgebersystem",
      "Interessenkonflikte",
      "Compliance-Schulungen",
      "Governance-Strukturen",
      "Verstöße, Bußgelder oder Verurteilungen, sofern ausdrücklich angefragt",
      "Datenschutz / Informationssicherheit, sofern für die Anfrage relevant"
    ],
    owners: "Compliance · Legal · Management · HR · IT",
    sources: [
      "Code of Ethics",
      "Anti-Bribery Policy",
      "Whistleblowing procedure",
      "Trainingsunterlagen",
      "Compliance reports",
      "Verantwortlichkeitsmatrizen"
    ],
    watch:
      "Angaben zu Vorfällen, Verfahren oder Sanktionen sollten nur auf Grundlage intern bestätigter Informationen beantwortet werden."
  },
  {
    id: "lieferkette",
    number: "09",
    title: "Lieferkette und nachhaltige Beschaffung",
    informationLabel: "Häufige Themen",
    information: [
      "Supplier Code of Conduct",
      "ESG-Kriterien bei Lieferantenauswahl",
      "Lieferantenbewertungen",
      "Lieferanten-Risikoanalysen",
      "Menschenrechts- und Umweltrisiken",
      "Lieferanten-Audits oder Assessments",
      "Maßnahmen bei identifizierten Risiken",
      "nachhaltige Beschaffungsprozesse",
      "Herkunft bestimmter Materialien, sofern relevant",
      "Konfliktmineralien oder besondere Rohstoffe, sofern relevant"
    ],
    owners: "Procurement · Supply Chain · Compliance · Quality · Sustainability",
    sources: [
      "Supplier Code",
      "supplier questionnaires",
      "Lieferantenbewertungen",
      "Beschaffungsrichtlinien",
      "Risk assessments",
      "Auditunterlagen"
    ],
    watch:
      "Nicht jedes Unternehmen benötigt dieselbe Tiefe an Lieferkettendaten. Umfang und Detailgrad hängen von der konkreten Anfrage, dem Produkt und der Lieferkette ab."
  },
  {
    id: "nachweise",
    number: "10",
    title: "Zertifikate, Dokumente und andere Nachweise",
    intro:
      "Viele ESG-Anfragen verlangen nicht nur eine Antwort, sondern auch Unterlagen, die die Aussage nachvollziehbar unterstützen.",
    informationLabel: "Typische Nachweise",
    information: [
      "Zertifikate",
      "Policies",
      "Rechnungen",
      "Messdaten",
      "KPI-Auswertungen",
      "Protokolle",
      "Trainingsnachweise",
      "Risikoanalysen",
      "Auditunterlagen",
      "Genehmigungen",
      "Berichte",
      "Supplier Codes",
      "Berechnungsdateien"
    ],
    owners: "Fachbereich · Quality · EHS · HR · Finance · Management",
    sources: [
      "Dokumentenregister",
      "zentrale Dateiablagen",
      "Managementsysteme",
      "Rechnungen und Reports",
      "freigegebene Policies"
    ],
    watch: "Ein Dokument ist nicht automatisch ein guter ESG-Nachweis.",
    evidenceFlow: true,
    cta: {
      label: "Ist Ihr Nachweis tatsächlich verwendbar?",
      href: "/de/ressourcen/esg-nachweise-checkliste"
    }
  }
] as const satisfies readonly Category[];

const quantitativeQualitative = [
  {
    title: "Quantitative Daten",
    items: [
      "kWh Strom",
      "Liter Diesel",
      "tCO₂e",
      "m³ Wasser",
      "Tonnen Abfall",
      "Mitarbeitendenzahl",
      "Unfallkennzahlen"
    ]
  },
  {
    title: "Qualitative Angaben",
    items: [
      "Gibt es eine Richtlinie?",
      "Wer ist verantwortlich?",
      "Gibt es ein Beschwerdeverfahren?",
      "Werden Lieferanten bewertet?",
      "Welche Maßnahmen bestehen?",
      "Gibt es Ziele?"
    ]
  },
  {
    title: "Nachweise",
    items: [
      "Rechnung",
      "Zertifikat",
      "Policy",
      "HR-Auswertung",
      "Trainingsnachweis",
      "internes Verfahren"
    ]
  }
] as const;

const dataOwnerRows = [
  ["Unternehmensdaten", "Geschäftsführung / Finance"],
  ["Strom & Energie", "Facility / Finance / Einkauf"],
  ["Kraftstoffe", "Fuhrpark / Finance"],
  ["Kältemittel", "Facility / EHS"],
  ["Umwelt & Abfall", "EHS / Quality / Produktion"],
  ["Mitarbeitende", "HR"],
  ["Arbeitsschutz", "EHS / HR / Produktion"],
  ["Compliance", "Legal / Compliance / Management"],
  ["Lieferkette", "Procurement / Supply Chain"],
  ["Policies", "Fachbereich + Management"]
] as const;

const firstActions = [
  [
    "Anfrage vollständig sichern",
    "Fragebogen, Portal-Anforderung, Begleitmail, Anhänge und Frist gemeinsam betrachten."
  ],
  [
    "Scope verstehen",
    "Klären Sie, welche Gesellschaft, welche Standorte, welcher Zeitraum und gegebenenfalls welche Produkte betroffen sind."
  ],
  [
    "Fragen nach Datenbereichen sortieren",
    "Ordnen Sie Energie, Umwelt, HR, Policies, Compliance, Supply Chain und andere Themen strukturiert zu."
  ],
  [
    "Data Owner und vorhandene Nachweise zuordnen",
    "Prüfen Sie zuerst vorhandene Quellen, bevor unnötig neue Dokumente erstellt werden."
  ],
  [
    "Lücken sichtbar machen",
    "Fehlende Daten nicht erfinden. Offen markieren, intern klären und bestätigen."
  ]
] as const;

const notAutomatic = [
  [
    "Nicht automatisch Scope 3",
    "Eine Anfrage nach CO₂-Daten bedeutet nicht zwangsläufig, dass eine vollständige Scope-3-Bilanz verlangt wird."
  ],
  [
    "Nicht automatisch eine neue Zertifizierung",
    "Die Frage nach vorhandenen Zertifikaten bedeutet nicht automatisch, dass eine neue Zertifizierung erforderlich ist."
  ],
  [
    "Nicht automatisch eine neue Policy",
    "Prüfen Sie zunächst, welche Richtlinien und tatsächlichen Prozesse bereits bestehen."
  ],
  [
    "Nicht automatisch alle ESG-Daten",
    "Sammeln Sie zuerst den Umfang, der für die konkrete Anfrage tatsächlich relevant ist."
  ]
] as const;

const platformCards = [
  [
    "EcoVadis",
    "Bewertung des Nachhaltigkeitsmanagements anhand mehrerer Themenbereiche und unterstützender Dokumente.",
    "EcoVadis-Unterstützung",
    "/de/ecovadis-unterstuetzung"
  ],
  [
    "IntegrityNext",
    "ESG- und Due-Diligence-Abfragen innerhalb eines Supplier-Assessment-Workflows.",
    "IntegrityNext-Unterstützung",
    "/de/integritynext-unterstuetzung"
  ],
  [
    "Individuelle Kundenfragebögen",
    "Eigene Anforderungen eines Kunden in Excel, Portal oder einem individuellen Format.",
    "ESG-Fragebogen für Lieferanten",
    "/de/esg-fragebogen-lieferanten"
  ]
] as const;

const requestMapStages = [
  ["1 · Anforderung", "Was will der Kunde?"],
  ["2 · Data Owner", "Wer kennt die Information?"],
  ["3 · Quelle", "Woher stammt der Wert?"],
  ["4 · Nachweis", "Was unterstützt die Aussage?"],
  ["5 · Bestätigung", "Wer bestätigt die Unternehmensangabe?"]
] as const;

const requestMapExamples = [
  {
    request: "Stromverbrauch 2025",
    owner: "Facility / Finance",
    source: "Stromrechnungen",
    evidence: "Jahresübersicht + Rechnungen",
    confirmation: "interne Bestätigung"
  },
  {
    request: "Environmental Policy vorhanden?",
    owner: "EHS / Management",
    source: "aktuelle intern freigegebene Policy",
    evidence: "Policy-Dokument",
    confirmation: "zuständige interne Stelle"
  }
] as const;

const mistakes = [
  [
    "1. Den gesamten ESG-Bereich statt der konkreten Anfrage bearbeiten",
    "Das erzeugt unnötige Arbeit und verzögert die eigentliche Kundenantwort."
  ],
  [
    "2. Unterschiedliche Gesellschaften oder Standorte vermischen",
    "Daten müssen zum Geltungsbereich der Antwort passen."
  ],
  [
    "3. Kennzahlen ohne Zeitraum verwenden",
    "Eine Zahl ohne Berichtsperiode ist häufig nicht ausreichend interpretierbar."
  ],
  [
    "4. Endwerte ohne Quelle übernehmen",
    "Später ist nicht mehr nachvollziehbar, wie die Angabe entstanden ist."
  ],
  [
    "5. Policies als Nachweis vollständiger Umsetzung behandeln",
    "Eine Richtlinie dokumentiert nicht automatisch jede operative Maßnahme."
  ],
  [
    "6. Fehlende Daten plausibel ergänzen",
    "Fehlende Informationen sollten als Lücke sichtbar bleiben, bis sie nachvollziehbar geklärt wurden."
  ]
] as const;

const toolBridgeCards = [
  [
    "1 · Fragebogen strukturieren",
    "ESG-Fragebogen Checkliste",
    "Vom ersten Screening bis zur internen Prüfung.",
    "Zur Checkliste",
    "/de/ressourcen/esg-fragebogen-checkliste-lieferanten"
  ],
  [
    "2 · Verantwortliche finden",
    "ESG Data Owner Map",
    "Identifizieren Sie, welche interne Funktion typischerweise welche Informationen liefert.",
    "Zur Data Owner Map",
    "/de/ressourcen/esg-daten-verantwortliche-abteilungen"
  ],
  [
    "3 · Nachweise prüfen",
    "Evidence Readiness Check",
    "Prüfen Sie, ob ein vorhandenes Dokument die geplante Aussage tatsächlich unterstützt.",
    "Nachweis prüfen",
    "/de/ressourcen/esg-nachweise-checkliste"
  ]
] as const;

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink underline decoration-[rgba(254,112,1,0.35)] underline-offset-4 transition hover:text-orange"
      href={href}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-orange transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li className="flex gap-3 text-sm leading-6 text-muted" key={item}>
          <span
            aria-hidden="true"
            className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
          />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FlowLine({ items }: { items: readonly string[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((item, index) => (
        <li
          className="relative min-w-0 border-t border-[rgba(21,21,21,0.16)] pt-4"
          key={item}
        >
          {index < items.length - 1 ? (
            <ArrowRight
              aria-hidden="true"
              className="absolute -right-3 top-4 hidden h-4 w-4 text-orange lg:block"
            />
          ) : null}
          <span className="font-mono text-[0.62rem] font-bold text-orange">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-2 break-words text-sm font-bold leading-5 text-ink">
            {item}
          </p>
        </li>
      ))}
    </ol>
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
        <div
          className={`mt-6 space-y-4 text-base leading-8 sm:text-lg ${
            light ? "text-white/66" : "text-muted"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function CustomerDataArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art">
      <svg
        className="resource-hero-art__sheet"
        fill="none"
        viewBox="0 0 520 650"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M104 132H416M104 214H416M104 296H416M104 378H416M104 460H416"
          stroke="currentColor"
          strokeOpacity="0.56"
          strokeWidth="2"
        />
        {[132, 214, 296, 378, 460].map((y, index) => (
          <g key={y}>
            <circle
              cx="126"
              cy={y}
              fill={index === 1 ? "#FE7001" : "currentColor"}
              fillOpacity={index === 1 ? 1 : 0.09}
              r={index === 1 ? 13 : 10}
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d={`M166 ${y}H360`}
              stroke="currentColor"
              strokeOpacity="0.38"
              strokeWidth="8"
            />
          </g>
        ))}
        <path
          d="M260 516L316 548L260 580L204 548L260 516Z"
          stroke="currentColor"
          strokeOpacity="0.72"
          strokeWidth="2"
        />
      </svg>
      <span className="resource-hero-art__code">
        REQUEST · OWNER · SOURCE · ANSWER
      </span>
    </div>
  );
}

function CategorySection({ category }: { category: Category }) {
  return (
    <section
      aria-labelledby={`${category.id}-title`}
      className="scroll-mt-28 border-t border-[rgba(21,21,21,0.12)] py-12 sm:py-14"
      data-esg-data-category={category.number}
      id={category.id}
    >
      <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.16em] text-orange">
            {category.number}
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Datenkategorie
          </p>
        </div>
        <div className="min-w-0">
          <h2
            className="font-display break-words hyphens-auto text-[clamp(2rem,3.8vw,3.45rem)] leading-[1.03] text-ink"
            id={`${category.id}-title`}
          >
            {category.title}
          </h2>
          {category.intro ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
              {category.intro}
            </p>
          ) : null}

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)]">
            <div className="rounded-[1rem] border border-[rgba(21,21,21,0.1)] bg-white p-5 sm:p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.11em] text-ink">
                {category.informationLabel}
              </h3>
              <BulletList items={category.information} />
            </div>
            <div className="grid gap-4">
              <section className="rounded-[1rem] border border-[rgba(21,21,21,0.1)] bg-[var(--warm)] p-5 sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.11em] text-ink">
                  Typische interne Owner
                </h3>
                <p className="mt-4 text-base font-semibold leading-7 text-muted">
                  {category.owners}
                </p>
              </section>
              <section className="rounded-[1rem] border border-[rgba(21,21,21,0.1)] bg-white p-5 sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.11em] text-ink">
                  Mögliche Quellen
                </h3>
                <BulletList items={category.sources} />
              </section>
            </div>
          </div>

          {category.policyDistinction ? (
            <div className="mt-6 rounded-[1rem] border border-orange/25 bg-[var(--soft-orange)] p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-4">
                {["Policy", "Maßnahme", "Nachweis der Umsetzung", "Kennzahl"].map(
                  (item, index) => (
                    <div className="min-w-0" key={item}>
                      <p className="font-mono text-xs font-bold text-orange">
                        {index === 0 ? "" : "≠"}
                      </p>
                      <p className="mt-2 break-words font-display text-2xl leading-tight text-ink">
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
              <div className="mt-5">
                <InlineLink href="/de/ressourcen/environmental-policy-erstellen">
                  Environmental Policy richtig vorbereiten
                </InlineLink>
              </div>
              <div className="mt-3">
                <InlineLink href="/de/ressourcen/supplier-code-of-conduct-erstellen">
                  Erwartungen an Lieferanten sauber dokumentieren
                </InlineLink>
              </div>
            </div>
          ) : null}

          {category.evidenceFlow ? (
            <div className="mt-6 rounded-[1rem] border border-orange/25 bg-[var(--soft-orange)] p-5 sm:p-6">
              <p className="font-display text-2xl leading-tight text-ink">
                Ein Dokument ist nicht automatisch ein guter ESG-Nachweis.
              </p>
              <div className="mt-6">
                <FlowLine
                  items={[
                    "Aussage",
                    "Gesellschaft",
                    "Scope",
                    "Zeitraum",
                    "Quelle",
                    "Gültigkeit"
                  ]}
                />
              </div>
            </div>
          ) : null}

          <div className="mt-6 rounded-[1rem] border-l-4 border-orange bg-white p-5 shadow-lift sm:p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.11em] text-orange">
              Worauf achten?
            </h3>
            <p className="mt-3 text-base leading-7 text-muted">{category.watch}</p>
          </div>

          {category.cta ? (
            <div className="mt-6">
              <InlineLink href={category.cta.href}>{category.cta.label}</InlineLink>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function DataOwnerTable() {
  return (
    <div className="mt-10" data-esg-data-owner-map>
      <div className="hidden overflow-hidden rounded-[1.1rem] border border-[rgba(21,21,21,0.13)] bg-white md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Typische interne Stellen für ESG-Datenbereiche
          </caption>
          <thead className="bg-[var(--paper)] text-[0.68rem] uppercase tracking-[0.09em] text-[rgba(21,21,21,0.58)]">
            <tr>
              <th className="border-b border-[rgba(21,21,21,0.12)] px-5 py-4 font-bold" scope="col">
                Datenbereich
              </th>
              <th className="border-b border-[rgba(21,21,21,0.12)] px-5 py-4 font-bold" scope="col">
                Typische interne Stelle
              </th>
            </tr>
          </thead>
          <tbody>
            {dataOwnerRows.map(([area, owner]) => (
              <tr className="border-b border-[rgba(21,21,21,0.09)] last:border-b-0" key={area}>
                <th className="px-5 py-5 font-bold text-ink" scope="row">
                  {area}
                </th>
                <td className="px-5 py-5 text-muted">{owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:hidden">
        {dataOwnerRows.map(([area, owner]) => (
          <article
            className="rounded-[0.95rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
            key={area}
          >
            <h3 className="font-bold text-ink">{area}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{owner}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function RequestMap() {
  return (
    <div data-esg-request-map>
      <ol className="mt-10 grid gap-3 lg:grid-cols-5">
        {requestMapStages.map(([title, body], index) => (
          <li
            className="relative rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5"
            key={title}
          >
            {index < requestMapStages.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="absolute -right-3 top-8 hidden h-5 w-5 text-orange lg:block"
              />
            ) : null}
            <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {requestMapExamples.map((example, index) => (
          <article
            className="rounded-[1.1rem] border border-orange/25 bg-[var(--soft-orange)] p-5 sm:p-6"
            key={example.request}
          >
            <p className="font-mono text-xs font-bold text-orange">
              Beispiel {index + 1}
            </p>
            <h3 className="font-display mt-3 text-3xl leading-tight text-ink">
              {example.request}
            </h3>
            <dl className="mt-5 grid gap-3 text-sm">
              {[
                ["Owner", example.owner],
                ["Source", example.source],
                ["Evidence", example.evidence],
                ["Confirmation", example.confirmation]
              ].map(([term, description]) => (
                <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3" key={term}>
                  <dt className="font-bold text-[rgba(21,21,21,0.58)]">{term}</dt>
                  <dd className="min-w-0 break-words text-ink">{description}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

export function EsgCustomerDataGuide() {
  return (
    <main id="top">
      <article>
        <header
          aria-labelledby="article-title"
          className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28"
        >
          <CustomerDataArtwork />
          <div className="site-shell relative z-10">
            <nav
              aria-label="Brotkrümelnavigation"
              className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
            >
              <Link className="transition hover:text-orange" href="/de">
                Startseite
              </Link>
              <span aria-hidden="true">/</span>
              <Link className="transition hover:text-orange" href="/de/ressourcen">
                Ressourcen
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">
                Welche ESG-Daten verlangen Kunden von Lieferanten?
              </span>
            </nav>

            <div className="mt-12 max-w-6xl">
              <p className="eyebrow">ESG-DATEN FÜR KUNDENANFRAGEN</p>
              <h1
                className="font-display mt-7 max-w-[17ch] break-words hyphens-auto text-[clamp(3.05rem,6.8vw,6.35rem)] leading-[0.92]"
                id="article-title"
              >
                Welche ESG-Daten verlangen Kunden von Lieferanten?
              </h1>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
              <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                <p>
                  Kunden fragen heute nicht nach „ESG“ als einer einzelnen
                  Kennzahl. Je nach Unternehmen, Branche und Anfrage können
                  Energie- und Emissionsdaten, Umweltkennzahlen, Informationen
                  zu Mitarbeitenden und Arbeitsschutz, Richtlinien,
                  Compliance-Angaben, Lieferkettendaten und konkrete Nachweise
                  verlangt werden.
                </p>
                <p className="mt-6">
                  Dieser Überblick zeigt, welche Datenbereiche typischerweise
                  vorkommen, wo die Informationen intern häufig liegen und
                  welche Unterlagen als Ausgangspunkt dienen können.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink className="w-full sm:w-auto" href="#datenkategorien">
                    Zu den Datenkategorien ↓
                  </ButtonLink>
                  <ButtonLink
                    className="w-full sm:w-auto"
                    href={SEND_REQUEST_HREF}
                    variant="secondary"
                  >
                    ESG-Anfrage bereits erhalten?
                  </ButtonLink>
                </div>
              </div>
              <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                <GitBranch aria-hidden="true" className="h-8 w-8 text-orange" />
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                  Orientierung
                </p>
                <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">
                  Kundenanfrage → Datenkategorie → Owner → Quelle → Antwort
                </p>
                <p className="mt-5 text-sm leading-7 text-muted">
                  Nicht jede Anfrage enthält alle Kategorien. Entscheidend ist
                  immer der konkrete Fragebogen oder die Anforderung Ihres
                  Kunden.
                </p>
              </aside>
            </div>
          </div>
        </header>

        <section
          aria-labelledby="quick-answer-title"
          className="bg-ink py-16 text-white sm:py-20 lg:py-24"
          id="kurz-gesagt"
        >
          <div className="site-shell grid gap-9 lg:grid-cols-[0.52fr_1.48fr] lg:gap-16">
            <div>
              <p className="eyebrow">Quick Answer</p>
              <h2
                className="font-display mt-6 text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]"
                id="quick-answer-title"
              >
                Kurz gesagt
              </h2>
            </div>
            <div className="max-w-4xl text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">
              <p>
                Typische ESG-Anfragen an Lieferanten betreffen Unternehmens-
                und Standortdaten, Energie und Treibhausgasemissionen,
                Umweltkennzahlen, Mitarbeitende und Arbeitsschutz,
                Menschenrechte, Richtlinien und Managementsysteme, Ethik und
                Compliance, Lieferkette sowie unterstützende Nachweise.
              </p>
              <p className="mt-6">
                Welche Informationen tatsächlich benötigt werden, hängt unter
                anderem von der konkreten Kundenanfrage, Ihrer Tätigkeit, dem
                Unternehmensumfang und dem verwendeten Fragebogen oder
                Bewertungsverfahren ab.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="flow-title">
          <div className="site-shell">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
              <SectionHeading
                eyebrow="Vom Signal zur Antwort"
                id="flow-title"
                title="Von der Kundenfrage zur belastbaren Antwort"
              >
                <p>
                  Der eigentliche Aufwand entsteht selten nur durch die Frage
                  selbst. Entscheidend ist, die angeforderte Information dem
                  richtigen internen Datenhalter und einer nachvollziehbaren
                  Quelle zuzuordnen.
                </p>
              </SectionHeading>
              <div className="rounded-[1.2rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift sm:p-8">
                <FlowLine
                  items={[
                    "Anforderung",
                    "Daten",
                    "interner Owner",
                    "Quelle / Nachweis",
                    "Bestätigung",
                    "Antwort"
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="keine-universelle-liste-title"
          className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"
        >
          <div className="site-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <SectionHeading
              eyebrow="Einordnung"
              id="keine-universelle-liste-title"
              title="Es gibt keine universelle ESG-Datenliste für jeden Lieferanten."
            />
            <div className="resource-prose">
              <p>
                Ein häufiger Fehler ist, zunächst eine möglichst große
                allgemeine ESG-Datensammlung aufzubauen und erst danach den
                eigentlichen Kundenfragebogen anzusehen.
              </p>
              <p>
                In der Praxis sollte die Reihenfolge umgekehrt sein: Zuerst
                die konkrete Anfrage verstehen, dann die tatsächlich benötigten
                Daten identifizieren.
              </p>
              <p>
                Welche Themen relevant sind, kann sich je nach Branche,
                Tätigkeit, Unternehmensgröße, Standort, Kunde und verwendetem
                Fragebogen deutlich unterscheiden.
              </p>
              <div className="mt-8 rounded-[1rem] border-l-4 border-orange bg-[var(--soft-orange)] p-6">
                <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">
                  Nicht alles sammeln. Das Richtige sammeln.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="datenkategorien-title"
          className="py-16 sm:py-20 lg:py-24"
          id="datenkategorien"
        >
          <div className="site-shell">
            <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
              <aside>
                <nav
                  aria-label="Datenkategorien"
                  className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[rgba(255,255,255,0.82)] p-5 lg:sticky lg:top-28"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                    Kategorien
                  </p>
                  <ol className="mt-5 flex flex-wrap gap-2 text-sm font-semibold leading-5 text-[rgba(21,21,21,0.66)] lg:grid lg:gap-3">
                    {categoryNav.map(([number, label, href]) => (
                      <li key={href}>
                        <a
                          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[rgba(21,21,21,0.12)] px-3 py-2 transition hover:border-orange hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange lg:w-full lg:rounded-none lg:border-0 lg:px-0"
                          href={href}
                        >
                          <span className="font-mono text-[0.65rem] text-orange">
                            {number}
                          </span>
                          <span>{label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
              <div className="min-w-0">
                <SectionHeading
                  eyebrow="Überblick"
                  id="datenkategorien-title"
                  title="Welche ESG-Datenbereiche können in Kundenanfragen vorkommen?"
                >
                  <p>
                    Die folgenden Kategorien sind eine praktische Orientierung.
                    Sie ersetzen nicht die konkrete Prüfung des Kundenfragebogens.
                  </p>
                </SectionHeading>
                <div className="mt-10">
                  {categories.map((category) => (
                    <CategorySection category={category} key={category.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="datenarten-title"
          className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"
        >
          <div className="site-shell">
            <SectionHeading
              eyebrow="Datenarten"
              id="datenarten-title"
              title="Nicht jede ESG-Frage verlangt eine Zahl."
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {quantitativeQualitative.map((column) => (
                <section
                  className="rounded-[1.1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-6"
                  key={column.title}
                >
                  <h3 className="font-display text-3xl leading-tight text-ink">
                    {column.title}
                  </h3>
                  <BulletList items={column.items} />
                </section>
              ))}
            </div>
            <p className="font-display mt-10 max-w-4xl text-[clamp(1.8rem,3vw,2.7rem)] leading-tight text-ink">
              Eine gute ESG-Antwort verbindet die richtige Art von Information
              mit einer nachvollziehbaren Quelle.
            </p>
          </div>
        </section>

        <section aria-labelledby="daten-nachweise-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-20">
            <SectionHeading
              eyebrow="Traceability"
              id="daten-nachweise-title"
              title="Daten und Nachweise sind nicht dasselbe."
            >
              <p>
                Gerade bei quantitativen Angaben sollte nachvollziehbar bleiben,
                woher ein Wert stammt, für welchen Zeitraum er gilt und wie
                mehrere Quelldaten gegebenenfalls zusammengeführt wurden.
              </p>
              <InlineLink href="/de/ressourcen/esg-nachweise-lieferanten">
                Mehr über ESG-Nachweise
              </InlineLink>
            </SectionHeading>
            <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8">
              <ol className="grid gap-4">
                {[
                  ["Datenpunkt", "8.940 kWh"],
                  ["Quelle", "Stromrechnungen"],
                  ["Aggregation", "Jahresverbrauch Standort A"],
                  ["Antwort", "Stromverbrauch im Berichtszeitraum"]
                ].map(([label, value], index) => (
                  <li
                    className="relative rounded-[0.9rem] bg-white p-5"
                    key={label}
                  >
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className="absolute -top-4 left-8 font-display text-3xl text-orange"
                      >
                        ↓
                      </span>
                    ) : null}
                    <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                      {label}
                    </p>
                    <p className="font-display mt-2 text-3xl leading-tight text-ink">
                      {value}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="data-owner-title"
          className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"
        >
          <div className="site-shell">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <SectionHeading
                eyebrow="Interne Quellen"
                id="data-owner-title"
                title="Wo liegen ESG-Daten im Unternehmen?"
              >
                <p className="font-display text-3xl leading-tight text-ink">
                  Meistens nicht in einer einzelnen „ESG-Abteilung“.
                </p>
                <p>
                  Die tatsächlichen Verantwortlichkeiten unterscheiden sich je
                  nach Unternehmensstruktur.
                </p>
                <InlineLink href="/de/ressourcen/esg-daten-verantwortliche-abteilungen">
                  Zur vollständigen ESG Data Owner Map
                </InlineLink>
              </SectionHeading>
              <DataOwnerTable />
            </div>
          </div>
        </section>

        <section aria-labelledby="workflow-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <SectionHeading
                eyebrow="Erste Aktion"
                id="workflow-title"
                title="Sie haben gerade einen ESG-Fragebogen erhalten – womit beginnen?"
              >
                <div className="flex flex-col gap-3 sm:items-start">
                  <InlineLink href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">
                    ESG-Fragebogen vom Kunden erhalten – was jetzt?
                  </InlineLink>
                  <InlineLink href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten">
                    Zur vollständigen ESG-Fragebogen-Checkliste
                  </InlineLink>
                </div>
              </SectionHeading>
              <ol className="grid gap-px overflow-hidden rounded-[1.1rem] bg-[rgba(21,21,21,0.12)]" data-first-action-workflow>
                {firstActions.map(([title, body], index) => (
                  <li className="grid gap-4 bg-white p-5 sm:grid-cols-[4rem_1fr] sm:p-6" key={title}>
                    <span className="font-mono text-xs font-bold text-orange">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl leading-tight text-ink">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="nicht-automatisch-title"
          className="bg-ink py-16 text-white sm:py-20 lg:py-24"
        >
          <div className="site-shell">
            <SectionHeading
              eyebrow="Begrenzung"
              id="nicht-automatisch-title"
              light
              title="Was Sie nicht automatisch vorbereiten müssen"
            >
              <p>
                Eine ESG-Anfrage bedeutet nicht automatisch, dass Ihr
                Unternehmen sofort ein vollständiges
                Nachhaltigkeitsmanagementsystem aufbauen oder jede denkbare
                ESG-Kennzahl erheben muss.
              </p>
            </SectionHeading>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {notAutomatic.map(([title, body]) => (
                <article
                  className="rounded-[1rem] border border-white/16 bg-white/[0.04] p-6"
                  key={title}
                >
                  <h3 className="font-display text-2xl leading-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/62">{body}</p>
                </article>
              ))}
            </div>
            <p className="font-display mt-10 text-[clamp(2rem,4vw,3.5rem)] leading-tight text-white">
              Erst Anfrage verstehen. Dann Lücken schließen.
            </p>
          </div>
        </section>

        <section aria-labelledby="plattformen-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading
              eyebrow="Assessment-Kontext"
              id="plattformen-title"
              title="Warum sehen ESG-Anfragen unterschiedlich aus?"
            >
              <p>
                Einige Kunden senden eigene Excel-Dateien oder individuelle
                Fragebögen. Andere nutzen Plattformen oder standardisierte
                Assessments. Wieder andere fragen einzelne ESG-Kennzahlen
                direkt im Rahmen von Einkauf, Lieferantenfreigabe oder Due
                Diligence ab.
              </p>
              <p>
                Deshalb unterscheiden sich sowohl der Umfang als auch die Form
                der Antwort: Zahl, Ja/Nein-Angabe, Freitext, Richtlinie,
                Zertifikat oder anderer Nachweis.
              </p>
            </SectionHeading>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {platformCards.map(([title, body, cta, href]) => (
                <article
                  className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6"
                  key={title}
                >
                  <h3 className="font-display text-3xl leading-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
                  <div className="mt-5">
                    <InlineLink href={href}>{cta}</InlineLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="vsme-title"
          className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"
        >
          <div className="site-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <SectionHeading
              eyebrow="VSME"
              id="vsme-title"
              title="Kann VSME helfen, häufig benötigte ESG-Daten zu strukturieren?"
            />
            <div className="resource-prose">
              <p>
                VSME bietet kleinen und mittleren Unternehmen eine strukturierte
                Grundlage für grundlegende und weiterführende
                Nachhaltigkeitsinformationen. Die Themen reichen von Energie und
                Treibhausgasemissionen über Umwelt- und Workforce-Daten bis zu
                Governance-Informationen.
              </p>
              <p>
                Solche strukturierten Daten können dabei helfen, Informationen
                wiederverwendbar vorzuhalten.
              </p>
              <p>
                VSME ersetzt jedoch nicht automatisch den konkreten Fragebogen
                eines Kunden. Eine individuelle Kundenanfrage kann weniger,
                andere oder zusätzliche Informationen verlangen.
              </p>
              <div className="mt-7">
                <InlineLink href="/de/ressourcen/vsme-daten-nachhaltigkeitsbericht">
                  VSME-Daten im Überblick
                </InlineLink>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="request-map-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading
              eyebrow="Mapping"
              id="request-map-title"
              title="Die ESG Data Request Map"
            />
            <RequestMap />
          </div>
        </section>

        <section
          aria-labelledby="fehler-title"
          className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"
        >
          <div className="site-shell">
            <SectionHeading
              eyebrow="Qualität"
              id="fehler-title"
              title="Sechs typische Fehler bei ESG-Datenanfragen"
            />
            <ol className="mt-12 grid gap-5 lg:grid-cols-2" data-common-mistakes>
              {mistakes.map(([title, body]) => (
                <li
                  className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-6"
                  key={title}
                >
                  <h3 className="font-display text-2xl leading-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="tools-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading
              eyebrow="Nächste Ressource"
              id="tools-title"
              title="Sie möchten die Anfrage jetzt strukturiert bearbeiten?"
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3" data-tool-bridge>
              {toolBridgeCards.map(([eyebrow, title, body, cta, href]) => (
                <article
                  className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift"
                  key={title}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                    {eyebrow}
                  </p>
                  <h3 className="font-display mt-4 text-3xl leading-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{body}</p>
                  <div className="mt-5">
                    <InlineLink href={href}>{cta}</InlineLink>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 border-l-2 border-orange pl-5 sm:pl-7">
              <InlineLink href="/de/ressourcen/scope-1-2-datenerfassungs-vorlage">
                Scope-1-&-2-Daten strukturiert sammeln
              </InlineLink>
              <div className="mt-3">
                <InlineLink href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">
                  ESG-Daten für spätere Anfragen wiederverwendbar strukturieren
                </InlineLink>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="commercial-title"
          className="bg-[var(--warm)] py-16 sm:py-20 lg:py-24"
        >
          <div className="site-shell">
            <div className="overflow-hidden rounded-[1.4rem] border border-orange/25 bg-[var(--soft-orange)]">
              <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
                <div className="p-7 sm:p-10 lg:p-12">
                  <Send aria-hidden="true" className="h-10 w-10 text-orange" />
                  <SectionHeading
                    eyebrow="Umsetzung"
                    id="commercial-title"
                    title="Ihr Kunde hat die Liste bereits geschickt?"
                  />
                </div>
                <div className="border-t border-orange/20 bg-white/65 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <p className="text-base leading-8 text-muted">
                    Senden Sie uns den Fragebogen oder die ESG-Anforderung. Wir
                    zerlegen die Anfrage in konkrete Datenpunkte, ordnen
                    vorhandene Unternehmensinformationen und Nachweise zu,
                    identifizieren offene Punkte und bereiten die Antworten für
                    Ihre interne Bestätigung vor.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>
                      ESG-Anfrage senden
                    </ButtonLink>
                    <ButtonLink
                      className="w-full sm:w-auto"
                      href="/de/esg-kundenanfragen"
                      variant="secondary"
                    >
                      Mehr über ESG-Kundenanfragen
                    </ButtonLink>
                  </div>
                  <p className="mt-5 text-sm font-semibold leading-7 text-muted">
                    Unternehmensangaben und finale Aussagen bleiben unter Ihrer
                    Kontrolle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="methodik-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <ShieldCheck aria-hidden="true" className="h-10 w-10 text-orange" />
              <SectionHeading
                eyebrow="Methodik"
                id="methodik-title"
                title="Methodische Einordnung"
              />
            </div>
            <div className="resource-prose">
              <p>
                Die Kategorien auf dieser Seite dienen als praktische
                Orientierung und sind keine universelle Pflichtliste. Welche
                Daten tatsächlich erforderlich sind, ergibt sich aus der
                konkreten Kundenanfrage, dem Unternehmen, dem Anwendungsfall und
                gegebenenfalls dem verwendeten Assessment- oder
                Reporting-Rahmen.
              </p>
              <div className="mt-7">
                <InlineLink href="/de/methodology">
                  Wie evipace ESG-Informationen einordnet
                </InlineLink>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ink py-16 text-white sm:py-20 lg:py-24" aria-labelledby="final-title">
          <div className="site-shell">
            <div className="max-w-4xl">
              <p className="eyebrow">Nächster Schritt</p>
              <h2
                className="font-display mt-6 text-[clamp(2.75rem,6vw,5.8rem)] leading-[0.95]"
                id="final-title"
              >
                Sie müssen nicht zuerst ein ESG-System aufbauen.
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">
                Beginnen Sie mit der konkreten Kundenanfrage. Wir helfen Ihnen,
                herauszufinden, welche Daten tatsächlich benötigt werden und wie
                daraus eine klare, nachvollziehbare Antwort entsteht.
              </p>
              <div className="mt-8">
                <ButtonLink href={SEND_REQUEST_HREF}>Anfrage an evipace senden</ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
