export type ChecklistItem = {
  id: string;
  label: string;
  detail?: string;
};

export type ChecklistGroup = {
  title?: string;
  items: readonly ChecklistItem[];
};

export type ChecklistSection = {
  id: string;
  number: string;
  title: string;
  intro: string;
  groups: readonly ChecklistGroup[];
  notes?: readonly string[];
  gate?: {
    label: string;
    text: string;
  };
};

export const checklistStatuses = [
  "bereit",
  "beschaffen",
  "berechnen",
  "bestätigen",
  "prüfen",
  "Gap",
  "nicht anwendbar"
] as const;

export const checklistSections: readonly ChecklistSection[] = [
  {
    id: "request",
    number: "01",
    title: "Anfrage verstehen",
    intro: "Bevor Sie irgendetwas beantworten",
    groups: [
      {
        items: [
          { id: "request.customer-identified", label: "Anfragenden Kunden identifiziert", detail: "Welcher Kunde beziehungsweise welche Geschäftseinheit fordert die Informationen an?" },
          { id: "request.original-saved", label: "Originalanfrage gespeichert", detail: "E-Mail, Excel, PDF, Portal-Einladung oder anderes Original aufbewahren." },
          { id: "request.deadline-recorded", label: "Deadline notiert", detail: "Nicht nur intern – die tatsächliche Kundenfrist." },
          { id: "request.format-clarified", label: "Format geklärt", detail: "Excel, Portal, PDF, Supplier Platform oder anderes Format." },
          { id: "request.required-fields", label: "Pflichtfelder identifiziert", detail: "Welche Fragen müssen beantwortet werden?" },
          { id: "request.optional-fields", label: "Optionale Felder erkannt", detail: "Nicht jedes freie Textfeld muss mit möglichst viel Inhalt gefüllt werden." },
          { id: "request.instructions-read", label: "Begleitende Anweisungen gelesen", detail: "Definitionen, Hilfetexte, Dokumentanforderungen und kundenspezifische Hinweise nicht überspringen." },
          { id: "request.language-clarified", label: "Sprache geklärt", detail: "In welcher Sprache soll die finale Antwort erfolgen?" },
          { id: "request.coordinator-assigned", label: "Interne koordinierende Person festgelegt", detail: "Eine Person sollte die Gesamtversion kontrollieren." }
        ]
      }
    ],
    gate: { label: "Gate 1", text: "Ich weiß, was der Kunde verlangt, bis wann und in welchem Format." }
  },
  {
    id: "scope",
    number: "02",
    title: "Reporting Scope festlegen",
    intro: "Beantworten Sie zuerst: Für wen gelten die Antworten?",
    groups: [
      {
        items: [
          { id: "scope.legal-entity", label: "Rechtliche Gesellschaft definiert", detail: "Zum Beispiel Beispiel GmbH – nicht pauschal „unsere Gruppe“." },
          { id: "scope.sites", label: "Standorte definiert", detail: "Welche Werke, Büros oder sonstigen Standorte sind enthalten?" },
          { id: "scope.group-vs-entity", label: "Konzern vs. Einzelgesellschaft geklärt", detail: "Group Data und Entity Data nicht vermischen." },
          { id: "scope.reporting-period", label: "Berichtszeitraum definiert", detail: "Zum Beispiel 01.01.2025–31.12.2025." },
          { id: "scope.point-in-time", label: "Stichtagsdaten identifiziert", detail: "Zum Beispiel Mitarbeiterzahl am 31.12.2025." },
          { id: "scope.average-vs-date", label: "Jahresdurchschnitt vs. Stichtag unterschieden", detail: "Falls der Kunde eine konkrete Definition verlangt." },
          { id: "scope.product", label: "Produkt-Scope geklärt", detail: "Unternehmen, Standort, Produkt, Produktgruppe oder Kundenauftrag?" },
          { id: "scope.emissions-boundary", label: "Organisatorische Emissionsgrenze geklärt", detail: "Wenn Scope 1, 2 oder 3 gefragt werden." },
          { id: "scope.consistent", label: "Scope in allen Antworten konsistent", detail: "Umsatz, Mitarbeitende, Energie und Emissionen sollten sich nicht unbeabsichtigt auf unterschiedliche Unternehmensgrenzen beziehen." }
        ]
      }
    ],
    gate: { label: "Gate 2", text: "Jeder Datenpunkt bezieht sich auf dieselbe klar definierte organisatorische und zeitliche Grundlage – außer die Frage verlangt ausdrücklich etwas anderes." }
  },
  {
    id: "triage",
    number: "03",
    title: "Fragebogen triagieren",
    intro: "Noch nicht beantworten – zuerst jede Frage nach Themenbereich sortieren.",
    groups: [
      {
        title: "Themenbereiche markieren",
        items: [
          { id: "triage.company", label: "Unternehmensdaten" },
          { id: "triage.environment", label: "Umwelt" },
          { id: "triage.energy", label: "Energie" },
          { id: "triage.ghg", label: "Scope 1 / 2 / 3" },
          { id: "triage.water", label: "Wasser" },
          { id: "triage.waste", label: "Abfall / Circular Economy" },
          { id: "triage.materials", label: "Materialien / Rohstoffe" },
          { id: "triage.workforce", label: "Workforce / HR" },
          { id: "triage.safety", label: "Arbeitssicherheit" },
          { id: "triage.human-rights", label: "Menschenrechte" },
          { id: "triage.compliance", label: "Ethics / Compliance" },
          { id: "triage.policies", label: "Policies" },
          { id: "triage.certifications", label: "Zertifizierungen" },
          { id: "triage.procurement", label: "Einkauf / Supply Chain" },
          { id: "triage.product", label: "Produktinformationen" },
          { id: "triage.customer-specific", label: "Sonstige kundenspezifische Anforderungen" }
        ]
      }
    ],
    notes: ["Danach erhält jede Frage einen präzisen Arbeitsstatus. Verwenden Sie nicht nur „fehlt“ – das erklärt nicht, warum ein Datenpunkt fehlt."]
  },
  {
    id: "owners",
    number: "04",
    title: "Data Owner zuweisen",
    intro: "Wer besitzt die verlässlichste interne Quelle?",
    groups: [
      {
        items: [
          { id: "owners.source-owner", label: "Für jede relevante Frage einen Source Owner bestimmt" },
          { id: "owners.finance", label: "Finance-Fragen an Finance / Controlling zugeordnet" },
          { id: "owners.hr", label: "Workforce-Fragen an HR zugeordnet" },
          { id: "owners.quality", label: "Umwelt- und Managementsystem-Fragen an Quality / HSE / Environment zugeordnet" },
          { id: "owners.operations", label: "Technische Verbrauchsdaten an Facility / Operations zugeordnet" },
          { id: "owners.procurement", label: "Material- und Supplier-Fragen an Procurement zugeordnet" },
          { id: "owners.product", label: "Produktfragen an Engineering / Produkt / Produktion zugeordnet" },
          { id: "owners.compliance", label: "Compliance-Aussagen an Compliance / Legal / Geschäftsführung zugeordnet" },
          { id: "owners.statement-owner", label: "Managementaussagen einer autorisierten Person zugeordnet" },
          { id: "owners.calculation-owner", label: "Calculation Owner bestimmt", detail: "Falls eine Kennzahl berechnet werden muss." },
          { id: "owners.approver", label: "Approver bestimmt", detail: "Falls eine formelle Aussage oder Policy freigegeben werden muss." }
        ]
      }
    ],
    notes: ["Source Owner besitzt die Originalinformation. Calculation Owner berechnet die Kennzahl. Statement Owner bestätigt die fachliche Aussage. Approver darf eine Policy oder formelle Unternehmensposition freigeben."]
  },
  {
    id: "company",
    number: "05",
    title: "Unternehmensdaten prüfen",
    intro: "Company basics",
    groups: [
      {
        items: [
          { id: "company.name", label: "Korrekte Firmenbezeichnung" },
          { id: "company.legal-form", label: "Rechtsform" },
          { id: "company.address", label: "Anschrift" },
          { id: "company.countries-sites", label: "Länder und relevante Standorte" },
          { id: "company.nace", label: "NACE beziehungsweise angefragte Branchenklassifikation" },
          { id: "company.employees", label: "Mitarbeiterzahl" },
          { id: "company.headcount-fte", label: "Headcount oder FTE korrekt unterschieden" },
          { id: "company.revenue", label: "Umsatz" },
          { id: "company.balance-sheet", label: "Bilanzdaten, falls verlangt" },
          { id: "company.reporting-year", label: "Berichtsjahr" },
          { id: "company.group", label: "Konzernzugehörigkeit, falls relevant" },
          { id: "company.contact", label: "Ansprechpartner" },
          { id: "company.certified-sites", label: "Zertifizierte Standorte korrekt zugeordnet" }
        ]
      }
    ],
    notes: ["Daten aus alten Fragebögen nicht automatisch kopieren. Immer prüfen, ob Zeitraum und Unternehmens-Scope noch stimmen."]
  },
  {
    id: "environment-emissions",
    number: "06",
    title: "Umwelt- und Emissionsdaten sammeln",
    intro: "Aktivitätsdaten und belastbare Ausgangsquellen zusammenführen.",
    groups: [
      {
        title: "Energie",
        items: [
          { id: "environment.electricity-sites", label: "Stromverbrauch pro relevantem Standort" },
          { id: "environment.electricity-unit", label: "Stromverbrauch mit Einheit dokumentiert" },
          { id: "environment.gas", label: "Gasverbrauch" },
          { id: "environment.heating-oil", label: "Heizöl" },
          { id: "environment.other-fuels", label: "Weitere Brennstoffe" },
          { id: "environment.district-heating", label: "Fernwärme" },
          { id: "environment.cooling-steam", label: "Fernkälte / Dampf, falls relevant" },
          { id: "environment.primary-sources", label: "Originalrechnungen beziehungsweise belastbare Ausgangsquellen vorhanden" }
        ]
      },
      {
        title: "Fuhrpark",
        items: [
          { id: "environment.fleet-fuel-types", label: "Kraftstoffarten erfasst" },
          { id: "environment.fleet-amounts", label: "Verbrauchsmengen erfasst" },
          { id: "environment.fleet-boundary", label: "Eigene oder kontrollierte Fahrzeuge vom restlichen Transport getrennt" }
        ]
      },
      {
        title: "Kältemittel",
        items: [
          { id: "environment.refrigerant-assets", label: "Relevante Anlagen identifiziert" },
          { id: "environment.refrigerant-type", label: "Kältemitteltyp vorhanden" },
          { id: "environment.refrigerant-amount", label: "Nachgefüllte oder verlorene Menge vorhanden" },
          { id: "environment.refrigerant-source", label: "Wartungs- oder Servicequelle vorhanden" }
        ]
      },
      {
        title: "Scope 1 & 2",
        items: [
          { id: "environment.boundary", label: "Bilanzgrenze dokumentiert" },
          { id: "environment.activity-data", label: "Aktivitätsdaten vollständig" },
          { id: "environment.factors", label: "Emissionsfaktoren dokumentiert" },
          { id: "environment.factor-source", label: "Faktorquelle dokumentiert" },
          { id: "environment.factor-version", label: "Faktorjahr oder Version dokumentiert" },
          { id: "environment.units", label: "Einheiten geprüft" },
          { id: "environment.scope-one", label: "Scope 1 separat ausgewiesen" },
          { id: "environment.scope-two", label: "Scope 2 separat ausgewiesen" },
          { id: "environment.scope-two-method", label: "Location-based und market-based korrekt unterschieden, wenn relevant" },
          { id: "environment.renewable-method", label: "Ökostrom nicht ohne methodische Prüfung automatisch mit null Emissionen angesetzt" }
        ]
      }
    ],
    notes: ["Wenn die Zahlen noch nicht existieren: nicht raten."]
  },
  {
    id: "other-environment",
    number: "07",
    title: "Weitere Umweltdaten prüfen",
    intro: "Je nach Fragebogen",
    groups: [
      {
        items: [
          { id: "other-environment.water", label: "Wasserverbrauch beziehungsweise Water Withdrawal" },
          { id: "other-environment.waste-total", label: "Abfallgesamtmenge" },
          { id: "other-environment.hazardous-waste", label: "Gefährlicher Abfall" },
          { id: "other-environment.non-hazardous-waste", label: "Nicht gefährlicher Abfall" },
          { id: "other-environment.recycling", label: "Recycling / Wiederverwendung" },
          { id: "other-environment.materials", label: "Relevante Materialmengen" },
          { id: "other-environment.raw-materials", label: "Rohstoffe" },
          { id: "other-environment.recycled-content", label: "Recyclinganteile" },
          { id: "other-environment.pollution", label: "Pollution-Daten, falls tatsächlich relevant" },
          { id: "other-environment.biodiversity", label: "Biodiversitäts- oder Standortinformation, falls verlangt" },
          { id: "other-environment.targets", label: "Umweltziele" },
          { id: "other-environment.target-year", label: "Zieljahr" },
          { id: "other-environment.baseline", label: "Baseline / Basisjahr" },
          { id: "other-environment.progress", label: "Fortschritt zum Ziel" }
        ]
      }
    ],
    notes: ["Wenn eine Frage für das Unternehmen nicht gilt, muss „nicht anwendbar“ sachlich begründet sein. Es ist kein automatischer Weg, eine schwierige Frage zu überspringen."]
  },
  {
    id: "workforce",
    number: "08",
    title: "Workforce und Social Data",
    intro: "Definition, Scope und interne Bestätigung zusammen prüfen.",
    groups: [
      {
        items: [
          { id: "workforce.employees", label: "Mitarbeiterzahl" },
          { id: "workforce.definition", label: "Headcount- oder FTE-Definition" },
          { id: "workforce.contract-types", label: "Permanent / temporary" },
          { id: "workforce.gender", label: "Gender-Daten, falls verlangt" },
          { id: "workforce.countries-sites", label: "Länder oder Standorte, falls relevant" },
          { id: "workforce.training-hours", label: "Trainingsstunden" },
          { id: "workforce.safety-training", label: "Arbeitssicherheitsschulungen" },
          { id: "workforce.accidents", label: "Arbeitsunfälle" },
          { id: "workforce.accident-rate", label: "Unfallrate" },
          { id: "workforce.fatalities", label: "Relevante Todesfälle, falls verlangt und anwendbar" },
          { id: "workforce.collective-bargaining", label: "Tarifbindung" },
          { id: "workforce.turnover", label: "Fluktuation, falls verlangt" },
          { id: "workforce.compensation", label: "Mindestlohn- oder Vergütungsinformationen, falls verlangt" },
          { id: "workforce.human-rights-policy", label: "Human Rights Policy vorhanden und tatsächlich verabschiedet" },
          { id: "workforce.grievance", label: "Beschwerde- oder Whistleblowing-Prozess geprüft" },
          { id: "workforce.incidents", label: "Relevante bestätigte Vorfälle intern bestätigt" },
          { id: "workforce.certificates", label: "Social- oder H&S-Zertifikate geprüft" }
        ]
      }
    ],
    notes: ["Absolute Zahl ist nicht dasselbe wie Rate. Headcount ist nicht dasselbe wie FTE. Keine bekannte Information ist kein bestätigter Nullwert."]
  },
  {
    id: "governance",
    number: "09",
    title: "Governance und Compliance",
    intro: "Aussagen und Nullwerte durch die zuständige Stelle bestätigen lassen.",
    groups: [
      {
        items: [
          { id: "governance.code", label: "Code of Conduct vorhanden" },
          { id: "governance.anti-corruption", label: "Anti-Corruption Policy vorhanden, falls tatsächlich verabschiedet" },
          { id: "governance.whistleblowing", label: "Whistleblowing- oder Hinweisgeberprozess geprüft" },
          { id: "governance.responsibilities", label: "Verantwortlichkeiten geklärt" },
          { id: "governance.training", label: "Relevante Compliance-Schulungen dokumentiert" },
          { id: "governance.corruption-cases", label: "Korruptions- oder Bestechungsfälle intern bestätigt" },
          { id: "governance.fines", label: "Geldbußen oder Verurteilungen, falls gefragt, bestätigt" },
          { id: "governance.review", label: "Governance-Aussagen von zuständiger Person geprüft" },
          { id: "governance.sensitive-data", label: "Keine sensiblen Angaben ohne erforderliche interne Freigabe weitergegeben" }
        ]
      }
    ],
    notes: ["Tragen Sie nicht einfach 0 ein, nur weil Ihnen selbst kein Fall bekannt ist."]
  },
  {
    id: "supply-chain",
    number: "10",
    title: "Supply Chain und Beschaffung",
    intro: "Unternehmens-, Produkt- und Lieferantendaten sauber trennen.",
    groups: [
      {
        items: [
          { id: "supply-chain.code", label: "Supplier Code of Conduct vorhanden" },
          { id: "supply-chain.code-adopted", label: "Dokument tatsächlich verabschiedet" },
          { id: "supply-chain.code-scope", label: "Scope des Supplier Code geprüft" },
          { id: "supply-chain.evaluation", label: "Lieferantenbewertungsprozess dokumentiert" },
          { id: "supply-chain.esg-criteria", label: "ESG-Kriterien im Einkauf geprüft" },
          { id: "supply-chain.assessments", label: "Supplier Assessments dokumentiert" },
          { id: "supply-chain.certificates", label: "Relevante Lieferantenzertifikate vorhanden" },
          { id: "supply-chain.origin", label: "Rohstoff- oder Herkunftsdaten geprüft, falls verlangt" },
          { id: "supply-chain.materials", label: "Materialinformationen mit Procurement oder Engineering abgeglichen" },
          { id: "supply-chain.product-corporate", label: "Produkt- und Corporate-Daten nicht verwechselt" },
          { id: "supply-chain.customer-specific", label: "Kundenspezifische Supply-Chain-Anforderungen separat markiert" }
        ]
      }
    ]
  },
  {
    id: "policies",
    number: "11",
    title: "Policies prüfen",
    intro: "Für jede angegebene Policy",
    groups: [
      {
        items: [
          { id: "policies.exists", label: "Dokument existiert tatsächlich" },
          { id: "policies.entity", label: "Richtige Gesellschaft genannt" },
          { id: "policies.scope", label: "Scope korrekt" },
          { id: "policies.version", label: "Version identifizierbar" },
          { id: "policies.date", label: "Datum plausibel" },
          { id: "policies.approval", label: "Freigabe nachvollziehbar" },
          { id: "policies.practice", label: "Inhalt entspricht realer Praxis" },
          { id: "policies.adopted", label: "Policy ist verabschiedet und nicht nur Draft" },
          { id: "policies.no-backdating", label: "Keine Rückdatierung" },
          { id: "policies.not-historical", label: "Neu erstellte Policy wird nicht als historischer Nachweis dargestellt" },
          { id: "policies.no-template-claim", label: "Keine fremde Internetvorlage unverändert als eigene Unternehmenspraxis ausgegeben" }
        ]
      }
    ],
    notes: ["Wenn die Praxis existiert, aber das Dokument fehlt: Praxis → Draft → Review → Korrektur → autorisierte Verabschiedung.", "Wenn die Praxis nicht existiert, ist das ein realer Gap. Dokumentieren Sie nicht das Gegenteil."]
  },
  {
    id: "certificates",
    number: "12",
    title: "Zertifikate prüfen",
    intro: "Für jedes Zertifikat",
    groups: [
      {
        items: [
          { id: "certificates.readable", label: "Zertifikat lesbar" },
          { id: "certificates.company", label: "Unternehmensname stimmt" },
          { id: "certificates.scope", label: "Standort und Scope stimmen" },
          { id: "certificates.topic", label: "Thema passt zur Kundenfrage" },
          { id: "certificates.issuer", label: "Aussteller klar" },
          { id: "certificates.validity", label: "Gültigkeitsdatum geprüft" },
          { id: "certificates.context", label: "Zertifikat im relevanten Berichts- oder Submission-Kontext noch verwendbar" },
          { id: "certificates.correct-entity", label: "Keine Zertifizierung für eine andere Gesellschaft als eigenen Nachweis dargestellt" },
          { id: "certificates.correct-topic", label: "Keine Zertifizierung für Thema A als Nachweis für Thema B verwendet" }
        ]
      }
    ],
    notes: ["ISO 50001 ist nicht automatisch ISO 14001. Ein Gruppenzertifikat ist nicht automatisch ein Standortzertifikat."]
  },
  {
    id: "evidence",
    number: "13",
    title: "Evidence Check",
    intro: "Für jede wesentliche Aussage: Aussage → Quelle → Nachweis",
    groups: [
      {
        items: [
          { id: "evidence.yes-answer", label: "Jede wichtige Ja-Antwort auf Evidence-Bedarf geprüft" },
          { id: "evidence.statement-fit", label: "Nachweis passt zur konkreten Aussage" },
          { id: "evidence.entity-fit", label: "Nachweis passt zur Gesellschaft" },
          { id: "evidence.site-fit", label: "Nachweis passt zum Standort" },
          { id: "evidence.freshness", label: "Nachweis ist ausreichend aktuell" },
          { id: "evidence.complete", label: "Dokument ist vollständig" },
          { id: "evidence.page-noted", label: "Relevante Seite oder relevanter Abschnitt intern notiert" },
          { id: "evidence.filename", label: "Dateiname verständlich" },
          { id: "evidence.opens", label: "Dokument lässt sich öffnen" },
          { id: "evidence.password", label: "Dokument ist nicht passwortgeschützt, falls die Plattform das nicht unterstützt" },
          { id: "evidence.sensitive", label: "Sensible Informationen vor Upload bewusst geprüft" },
          { id: "evidence.no-invention", label: "Keine Dokumente erfunden" },
          { id: "evidence.no-backdating", label: "Keine Dokumente rückdatiert" },
          { id: "evidence.no-artificial-bundle", label: "Keine künstliche Dokumentensammlung nur zur Umgehung einer Plattformregel gebaut" }
        ]
      }
    ],
    notes: ["EcoVadis behandelt Supporting Documents als wesentlichen Teil der Assessment-Evidenz. Dokumente müssen Antworten stützen und zum Assessment-Scope passen. Für das Sustainability Rating gilt aktuell ein Limit von 55 Dokumenten pro Assessment; absichtlich zusammengeführte, unabhängige Unterdokumente sind kein legitimer Umgehungsweg."]
  },
  {
    id: "platform-rules",
    number: "14",
    title: "Plattform-spezifische Regeln prüfen",
    intro: "Wenn EcoVadis, IntegrityNext oder eine andere Plattform verwendet wird",
    groups: [
      {
        items: [
          { id: "platform.instructions", label: "Aktuelle Plattformanweisungen gelesen" },
          { id: "platform.requested-assessments", label: "Nur tatsächlich angefragte Assessments bearbeitet" },
          { id: "platform.upload-rules", label: "Upload-Regeln geprüft" },
          { id: "platform.document-limits", label: "Document Limits geprüft" },
          { id: "platform.file-formats", label: "Erlaubte Dateiformate geprüft" },
          { id: "platform.certificate-logic", label: "Zertifikatslogik geprüft" },
          { id: "platform.validation", label: "Validierungsregeln geprüft" },
          { id: "platform.status-vs-acceptance", label: "Plattformstatus nicht mit Kundenzusage verwechselt" },
          { id: "platform.current-rules", label: "Keine alten Plattformregeln aus früheren Assessments ungeprüft übernommen" }
        ]
      }
    ],
    notes: ["Bei IntegrityNext kann je nach Assessment ein passendes Zertifikat hochgeladen oder alternativ der entsprechende Fragebogen beantwortet werden. Ein fehlendes Zertifikat verhindert den Abschluss daher nicht automatisch.", "Plattformregeln können sich ändern. Prüfen Sie immer die aktuellen Anweisungen der konkreten Plattform."]
  },
  {
    id: "calculations",
    number: "15",
    title: "Zahlen und Berechnungen prüfen",
    intro: "Vor Übernahme einer Kennzahl",
    groups: [
      {
        items: [
          { id: "calculations.original-value", label: "Originalwert vorhanden" },
          { id: "calculations.original-unit", label: "Originaleinheit vorhanden" },
          { id: "calculations.period", label: "Berichtsperiode klar" },
          { id: "calculations.entity-site", label: "Standort oder Entity klar" },
          { id: "calculations.conversion", label: "Umrechnung dokumentiert" },
          { id: "calculations.formula", label: "Formel geprüft" },
          { id: "calculations.factor", label: "Emissionsfaktor korrekt zugeordnet" },
          { id: "calculations.factor-source", label: "Faktorquelle vorhanden" },
          { id: "calculations.factor-version", label: "Faktorversion oder Jahr vorhanden" },
          { id: "calculations.kg-tonnes", label: "kg und t korrekt" },
          { id: "calculations.kwh-mwh", label: "kWh und MWh korrekt" },
          { id: "calculations.litre-kg", label: "Liter und kg nicht verwechselt" },
          { id: "calculations.co2-co2e", label: "CO₂ und CO₂e korrekt bezeichnet" },
          { id: "calculations.double-counting", label: "Keine unbeabsichtigte Doppelzählung" },
          { id: "calculations.rounding", label: "Rundung erst am Ende vorgenommen" },
          { id: "calculations.second-review", label: "Berechnung von zweiter Person plausibilisiert, wenn wesentlich" }
        ]
      }
    ],
    notes: ["Für GHG-Daten ist die Trennung von Scope 1 und Scope 2 Teil der Corporate-GHG-Inventarstruktur."]
  },
  {
    id: "consistency",
    number: "16",
    title: "Widersprüche suchen",
    intro: "Der Fragebogen muss als Ganzes stimmen.",
    groups: [
      {
        items: [
          { id: "consistency.employees", label: "Mitarbeiterzahl überall identisch beziehungsweise Abweichung erklärt" },
          { id: "consistency.revenue", label: "Umsatz überall auf demselben Scope" },
          { id: "consistency.sites", label: "Standortzahl konsistent" },
          { id: "consistency.energy-period", label: "Energie und Scope-Berechnung verwenden denselben Zeitraum" },
          { id: "consistency.policies", label: "Policies stimmen mit anderen Antworten überein" },
          { id: "consistency.certificates", label: "Zertifikate stimmen mit angegebenen Standorten überein" },
          { id: "consistency.targets", label: "Umweltziele widersprechen nicht anderen Angaben" },
          { id: "consistency.tabs", label: "Antworten in verschiedenen Tabs widersprechen sich nicht" },
          { id: "consistency.previous-answers", label: "Aktuelle Antwort mit früheren Kundenaussagen abgeglichen, falls sinnvoll" },
          { id: "consistency.differences", label: "Abweichende Werte bewusst erklärt" }
        ]
      }
    ],
    notes: ["Wenn Finance 810.000 kWh und Facility 846.000 kWh nennt, keinen Mittelwert bilden. Scope → Zeitraum → Quelle → Einheit → Boundary prüfen."]
  },
  {
    id: "gaps",
    number: "17",
    title: "Gaps richtig behandeln",
    intro: "Wenn etwas fehlt, zuerst klassifizieren.",
    groups: [
      {
        items: [
          { id: "gaps.collect", label: "Quelle existiert, wurde aber noch nicht beschafft", detail: "Status: beschaffen" },
          { id: "gaps.calculate", label: "Ausgangsdaten existieren, Kennzahl fehlt", detail: "Status: berechnen" },
          { id: "gaps.confirm", label: "Aussage muss intern bestätigt werden", detail: "Status: bestätigen" },
          { id: "gaps.documentation", label: "Dokumentation fehlt, reale Praxis existiert", detail: "Dokumentations-Gap" },
          { id: "gaps.practice", label: "Reale Praxis fehlt", detail: "Realer Gap" },
          { id: "gaps.not-applicable", label: "Frage trifft tatsächlich nicht zu", detail: "Nicht anwendbar" },
          { id: "gaps.unknown", label: "Information lässt sich momentan nicht belastbar bestimmen", detail: "Transparent dokumentieren" }
        ]
      }
    ],
    notes: ["Nicht: Gap → schnell eine schön klingende Antwort erfinden. Besser: Gap → transparent kennzeichnen → realen nächsten Schritt definieren."]
  },
  {
    id: "answers",
    number: "18",
    title: "Antworten formulieren",
    intro: "Jetzt erst den Fragebogen final beantworten.",
    groups: [
      {
        items: [
          { id: "answers.exact", label: "Genau die gestellte Frage beantworten" },
          { id: "answers.no-marketing", label: "Keine unnötigen Marketingtexte" },
          { id: "answers.claim-strength", label: "Keine stärkere Behauptung als der Nachweis erlaubt" },
          { id: "answers.yes", label: "Ja nur verwenden, wenn die Aussage tatsächlich stimmt" },
          { id: "answers.no", label: "Nein nicht automatisch vermeiden" },
          { id: "answers.not-applicable", label: "Nicht anwendbar nur mit sachlichem Grund" },
          { id: "answers.units", label: "Zahlen mit korrekter Einheit" },
          { id: "answers.year", label: "Berichtsjahr nennen, wenn sonst unklar" },
          { id: "answers.scope", label: "Scope nennen, wenn sonst unklar" },
          { id: "answers.estimate", label: "Schätzung als Schätzung kennzeichnen" },
          { id: "answers.draft", label: "Draft nicht als verabschiedete Policy bezeichnen" },
          { id: "answers.certification", label: "Externe Zertifizierung nicht implizieren, wenn keine existiert" },
          { id: "answers.guarantee", label: "Keine Garantie formulieren, die das Unternehmen nicht geben kann" }
        ]
      }
    ]
  },
  {
    id: "final-evidence",
    number: "19",
    title: "Final Evidence Review",
    intro: "Ein letzter Evidence Pass: Aussage → Quelle → Nachweis",
    groups: [
      {
        items: [
          { id: "final-evidence.statement", label: "Aussage vorhanden" },
          { id: "final-evidence.source", label: "Quelle vorhanden" },
          { id: "final-evidence.evidence-or-gap", label: "Nachweis vorhanden oder Gap transparent" },
          { id: "final-evidence.entity", label: "Richtige Gesellschaft" },
          { id: "final-evidence.site", label: "Richtiger Standort" },
          { id: "final-evidence.period", label: "Richtiger Zeitraum" },
          { id: "final-evidence.version", label: "Richtige Version" },
          { id: "final-evidence.readable", label: "Dokument lesbar" },
          { id: "final-evidence.filename", label: "Dokumentname verständlich" },
          { id: "final-evidence.mapping", label: "Upload tatsächlich der richtigen Frage zugeordnet" },
          { id: "final-evidence.sensitive", label: "Keine sensiblen Informationen versehentlich beigefügt" }
        ]
      }
    ]
  },
  {
    id: "management-review",
    number: "20",
    title: "Finaler Management / Quality Review",
    intro: "Vor der Einreichung",
    groups: [
      { title: "Scope", items: [
        { id: "management-review.entity", label: "Richtige Gesellschaft" },
        { id: "management-review.sites", label: "Richtige Standorte" }
      ] },
      { title: "Zeitraum", items: [
        { id: "management-review.period", label: "Alle Kennzahlen im richtigen Zeitraum" }
      ] },
      { title: "Definitionen", items: [
        { id: "management-review.headcount-fte", label: "Headcount und FTE korrekt verwendet" },
        { id: "management-review.scopes", label: "Scope 1, 2 und 3 korrekt unterschieden" },
        { id: "management-review.scope-two-method", label: "Location-based und market-based unterschieden, falls relevant" }
      ] },
      { title: "Quality Review", items: [
        { id: "management-review.consistency", label: "Antworten widerspruchsfrei" },
        { id: "management-review.evidence", label: "Nachweise passen wirklich" },
        { id: "management-review.policies", label: "Policies tatsächlich gültig" },
        { id: "management-review.governance", label: "Sensible Aussagen bestätigt" },
        { id: "management-review.gaps", label: "Gaps transparent behandelt" },
        { id: "management-review.customer-specific", label: "Besondere Kundenanforderungen erfüllt" }
      ] }
    ]
  },
  {
    id: "submission",
    number: "21",
    title: "Submission Check",
    intro: "Direkt vor „Submit“",
    groups: [
      {
        items: [
          { id: "submission.required-fields", label: "Alle Pflichtfelder abgeschlossen" },
          { id: "submission.no-empty-required", label: "Keine versehentlichen leeren Pflichtfelder" },
          { id: "submission.attachments-open", label: "Anhänge öffnen sich" },
          { id: "submission.attachments-mapped", label: "Richtige Anhänge zugeordnet" },
          { id: "submission.file-versions", label: "Dateiversionen final" },
          { id: "submission.numbers", label: "Finale Zahlen noch einmal geprüft" },
          { id: "submission.comments", label: "Kommentare verständlich" },
          { id: "submission.company-name", label: "Unternehmensname korrekt" },
          { id: "submission.contact", label: "Ansprechpartner korrekt" },
          { id: "submission.no-internal-comments", label: "Keine internen Kommentare im Kundendokument" },
          { id: "submission.no-todos", label: "Keine TODO-Markierungen" },
          { id: "submission.no-track-changes", label: "Keine Track Changes oder Kommentare, falls nicht gewünscht" },
          { id: "submission.approval", label: "Finaler interner Approval erfolgt" },
          { id: "submission.authorized-person", label: "Einreichung durch die autorisierte Unternehmensperson" }
        ]
      }
    ],
    notes: ["Bei Plattformen wie IntegrityNext sollte die Unternehmensseite die Kontrolle über das eigene Supplier Profile und die final eingereichten Unternehmensangaben behalten."]
  },
  {
    id: "post-submission",
    number: "22",
    title: "Nach der Einreichung",
    intro: "Nicht einfach den Ordner schließen.",
    groups: [
      {
        items: [
          { id: "post-submission.final-version", label: "Finale eingereichte Version gespeichert" },
          { id: "post-submission.date", label: "Datum der Einreichung gespeichert" },
          { id: "post-submission.recipient", label: "Empfänger oder Kunde gespeichert" },
          { id: "post-submission.attachments", label: "Finale Anhänge gespeichert beziehungsweise referenziert" },
          { id: "post-submission.metrics", label: "Verwendete Kennzahlen in ESG-Datenbasis übernommen" },
          { id: "post-submission.data-owner", label: "Data Owner gespeichert" },
          { id: "post-submission.evidence-owner", label: "Evidence Owner gespeichert" },
          { id: "post-submission.certificate-expiry", label: "Zertifikatsablauf dokumentiert" },
          { id: "post-submission.policy-versions", label: "Policy-Versionen dokumentiert" },
          { id: "post-submission.gaps", label: "Offene Gaps dokumentiert" },
          { id: "post-submission.follow-up", label: "Follow-up des Kunden erfasst" },
          { id: "post-submission.validation", label: "Plattform-Validation oder Nachbesserungsbedarf beobachtet" },
          { id: "post-submission.reusable", label: "Wiederverwendbare Antworten markiert" }
        ]
      }
    ]
  },
  {
    id: "reuse",
    number: "23",
    title: "Reuse Check",
    intro: "Damit Sie beim nächsten Kunden nicht wieder bei null anfangen",
    groups: [
      {
        title: "Für jeden häufig verwendeten ESG-Datenpunkt speichern",
        items: [
          { id: "reuse.datapoint", label: "Datenpunkt" },
          { id: "reuse.value", label: "Wert" },
          { id: "reuse.unit", label: "Einheit" },
          { id: "reuse.period", label: "Zeitraum" },
          { id: "reuse.entity", label: "Gesellschaft" },
          { id: "reuse.site", label: "Standort" },
          { id: "reuse.source-owner", label: "Source Owner" },
          { id: "reuse.original-source", label: "Originalquelle" },
          { id: "reuse.evidence", label: "Nachweis" },
          { id: "reuse.calculation", label: "Berechnungsmethode" },
          { id: "reuse.factor", label: "Faktor oder Faktorversion, falls relevant" },
          { id: "reuse.last-review", label: "Letzte interne Prüfung" },
          { id: "reuse.next-update", label: "Nächstes Update" },
          { id: "reuse.previous-uses", label: "Verwendete Kundenanfragen oder Plattformen" }
        ]
      }
    ],
    notes: ["ESG-Datenpunkt → Owner → Quelle → Zeitraum → Nachweis → letzte Prüfung → verwendbare Outputs", "Das ist der eigentliche langfristige Wert – nicht der einzelne ausgefüllte Fragebogen."]
  }
] as const;

export const finalSubmissionGateItems: readonly ChecklistItem[] = [
  { id: "final-gate.scope", label: "Scope", detail: "Wir wissen genau, für welche Gesellschaft, Standorte und Periode wir antworten." },
  { id: "final-gate.source", label: "Source", detail: "Wesentliche Zahlen und Aussagen stammen aus nachvollziehbaren internen Quellen." },
  { id: "final-gate.evidence", label: "Evidence", detail: "Wesentliche Claims sind belegt oder fehlende Nachweise sind transparent als Gap behandelt." },
  { id: "final-gate.consistency", label: "Consistency", detail: "Antworten, Zahlen, Policies und Dokumente widersprechen sich nicht." },
  { id: "final-gate.approval", label: "Approval", detail: "Unternehmensspezifische Aussagen wurden von den richtigen internen Personen bestätigt." },
  { id: "final-gate.submission", label: "Submission", detail: "Eine autorisierte Person hat die finale Version geprüft und reicht sie ein." }
] as const;

export const allChecklistItems = [
  ...checklistSections.flatMap((section) =>
    section.groups.flatMap((group) => group.items)
  ),
  ...finalSubmissionGateItems
] as const;

export const allChecklistItemIds = allChecklistItems.map((item) => item.id);

export const CHECKLIST_STORAGE_KEY =
  "evipace:de:esg-questionnaire-checklist:v1";
