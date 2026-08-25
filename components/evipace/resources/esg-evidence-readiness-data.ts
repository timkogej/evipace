export const EVIDENCE_READINESS_STORAGE_KEY =
  "evipace:de:esg-evidence-readiness:v1";

export const evidenceTypes = [
  { id: "invoice", label: "Rechnung / Verbrauchsnachweis" },
  { id: "certificate", label: "Zertifikat" },
  { id: "policy", label: "Richtlinie / Policy" },
  { id: "calculation", label: "Berechnung / Spreadsheet" },
  { id: "hr", label: "HR- oder Schulungsnachweis" },
  { id: "third-party", label: "Lieferanten- / Drittdokument" },
  { id: "report", label: "Bericht / Protokoll" },
  { id: "other", label: "Sonstiger Nachweis" }
] as const;

export type EvidenceTypeId = (typeof evidenceTypes)[number]["id"];

export type AnswerValue = "yes" | "unclear" | "no" | "na";
export type AnswersState = Partial<Record<string, AnswerValue>>;

export type EvidenceCheck = {
  id: string;
  question: string;
  helper?: string;
  critical: boolean | "conditional";
  allowNotRelevant?: boolean;
};

export type EvidenceSection = {
  id: string;
  number: string;
  title: string;
  intro: string;
  checks: EvidenceCheck[];
};

export type ReadinessState = {
  evidenceType?: EvidenceTypeId;
  evidenceLabel: string;
  answers: AnswersState;
};

export type ReadinessStatusId =
  | "incomplete"
  | "critical_failed"
  | "critical_unclear"
  | "mostly_prepared"
  | "ready_for_internal_confirmation";

export type ReadinessStatus = {
  id: ReadinessStatusId;
  title: string;
  copy: string;
  completed: boolean;
};

export type RedFlag = {
  checkId: string;
  title: string;
  copy: string;
};

export type UnresolvedItem = {
  checkId: string;
  label: string;
  critical: boolean;
};

export type SummaryCounts = {
  relevant: number;
  answeredRelevant: number;
  yes: number;
  unclear: number;
  no: number;
  na: number;
};

export type NextStep = {
  id: string;
  title: string;
  copy: string;
};

export const evidenceSections: EvidenceSection[] = [
  {
    id: "claim",
    number: "1",
    title: "Belegt der Nachweis wirklich die Aussage?",
    intro:
      "Beginnen Sie nicht mit dem Dokument, sondern mit der Aussage, die Sie damit unterstützen möchten.",
    checks: [
      {
        id: "01",
        critical: true,
        question:
          "Belegt der Nachweis direkt die Aussage oder Kennzahl, die Sie angeben möchten?",
        helper:
          "Ein thematisch passendes Dokument reicht nicht aus, wenn daraus die konkrete Aussage nicht hervorgeht."
      },
      {
        id: "02",
        critical: false,
        question:
          "Ist der relevante Inhalt konkret genug, um die Aussage nachvollziehen zu können?",
        helper:
          "Allgemeine Formulierungen wie „Wir achten auf Nachhaltigkeit“ belegen keine konkrete Maßnahme, Kennzahl oder Umsetzung."
      },
      {
        id: "03",
        critical: false,
        question:
          "Kann die geplante Antwort aus dem Nachweis abgeleitet werden, ohne den Inhalt zu erweitern oder zu überinterpretieren?",
        helper:
          "Der Nachweis sollte nicht mehr aussagen müssen, als tatsächlich dokumentiert ist."
      },
      {
        id: "04",
        critical: false,
        question:
          "Ist diese Art von Nachweis für die betreffende Aussage sinnvoll?",
        helper:
          "Eine Richtlinie kann beispielsweise eine formelle Verpflichtung belegen, aber nicht automatisch deren tatsächliche Umsetzung."
      },
      {
        id: "05",
        critical: false,
        question:
          "Widerspricht der Nachweis keinen anderen Angaben, Dokumenten oder Kennzahlen, die Sie für dieselbe Anfrage verwenden?",
        helper:
          "Unterschiedliche Zeiträume, Definitionen oder Datenquellen können scheinbar widersprüchliche Antworten erzeugen."
      }
    ]
  },
  {
    id: "scope",
    number: "2",
    title:
      "Gilt der Nachweis für die richtige Organisation und den richtigen Scope?",
    intro:
      "Ein Nachweis kann korrekt sein und trotzdem für die konkrete Antwort ungeeignet sein, wenn er eine andere Gesellschaft, einen anderen Standort oder einen anderen organisatorischen Umfang betrifft.",
    checks: [
      {
        id: "06",
        critical: true,
        question:
          "Gilt der Nachweis für dieselbe rechtliche Einheit, für die Sie den ESG-Fragebogen oder die Anfrage beantworten?",
        helper:
          "Prüfen Sie besonders Gruppen-, Muttergesellschafts- und Tochtergesellschaftsdokumente."
      },
      {
        id: "07",
        critical: "conditional",
        allowNotRelevant: true,
        question:
          "Falls der Nachweis auf Konzernebene gilt: Ist eindeutig dokumentiert, dass Ihre Gesellschaft vom Geltungsbereich erfasst ist?",
        helper:
          "Eine Konzernrichtlinie oder ein Gruppenzertifikat sollte nicht automatisch auf jede Gesellschaft übertragen werden."
      },
      {
        id: "08",
        critical: true,
        question:
          "Deckt der Nachweis den Standort oder die Standorte ab, auf die sich Ihre Antwort bezieht?",
        helper:
          "Eine Rechnung eines einzelnen Werks belegt beispielsweise nicht automatisch den Verbrauch aller Standorte."
      },
      {
        id: "09",
        critical: false,
        question:
          "Erfasst der Nachweis die relevante Tätigkeit, Geschäftseinheit oder organisatorische Einheit?"
      },
      {
        id: "10",
        critical: false,
        question:
          "Ist klar, welche Standorte, Aktivitäten, Personengruppen oder Daten gegebenenfalls nicht im Nachweis enthalten sind?",
        helper:
          "Ein definierter Ausschluss ist besser als ein unklarer Geltungsbereich."
      }
    ]
  },
  {
    id: "period",
    number: "3",
    title: "Passt der Nachweis zum angefragten Zeitraum?",
    intro:
      "ESG-Daten werden häufig für ein konkretes Geschäftsjahr, Berichtsjahr oder einen aktuellen Status angefragt.",
    checks: [
      {
        id: "11",
        critical: true,
        question:
          "Bezieht sich der Nachweis auf den Zeitraum, der in der Kundenanfrage oder im Fragebogen verlangt wird?"
      },
      {
        id: "12",
        critical: false,
        question: "Ist der relevante Zeitraum im Dokument eindeutig erkennbar?",
        helper:
          "Beispielsweise über Rechnungsperiode, Geschäftsjahr, Ausstellungsdatum oder dokumentierten Gültigkeitszeitraum."
      },
      {
        id: "13",
        critical: false,
        question: "Deckt der Nachweis den erforderlichen Zeitraum vollständig ab?",
        helper:
          "Drei Monatsrechnungen reichen nicht aus, wenn eine Jahreskennzahl dargestellt werden soll und keine nachvollziehbare Ergänzung vorliegt."
      },
      {
        id: "14",
        critical: false,
        question:
          "Haben Sie geprüft, ob eine neuere Version oder aktuellere Daten existieren?"
      },
      {
        id: "15",
        critical: false,
        question:
          "Ist eindeutig, ob der Nachweis einen historischen Zustand oder den aktuellen Stand beschreibt?",
        helper:
          "Frühere Nachweise sollten nicht als Beleg für einen aktuellen Zustand dargestellt werden, wenn sich die Situation geändert haben könnte."
      }
    ]
  },
  {
    id: "source",
    number: "4",
    title: "Ist die Quelle belastbar und nachvollziehbar?",
    intro:
      "Gute ESG-Evidence beginnt bei einer identifizierbaren Quelle. Interne Tabellen können nützlich sein – entscheidend ist, ob ihre Herkunft nachvollzogen werden kann.",
    checks: [
      {
        id: "16",
        critical: true,
        question:
          "Ist eindeutig, woher die zugrunde liegende Information oder Kennzahl stammt?"
      },
      {
        id: "17",
        critical: false,
        question:
          "Ist eine Primärquelle vorhanden oder kann auf sie zurückgegriffen werden?",
        helper:
          "Beispiele: Originalrechnung, Messwert, Payroll-Export, offizielles Zertifikat, Entsorgungsnachweis oder freigegebene Richtlinie."
      },
      {
        id: "18",
        critical: false,
        question:
          "Falls Daten manuell übertragen oder zusammengeführt wurden: Wurde geprüft, ob dabei Fehler entstanden sind?"
      },
      {
        id: "19",
        critical: false,
        question:
          "Falls der Nachweis eine berechnete Kennzahl enthält: Sind Ausgangsdaten, Methode und wesentliche Annahmen dokumentiert?",
        helper:
          "Besonders relevant für Emissions-, Energie-, Intensitäts- und aggregierte Kennzahlen."
      },
      {
        id: "20",
        critical: false,
        question:
          "Sind Einheit, Definition und Bezugsgröße der verwendeten Kennzahl eindeutig?",
        helper:
          "Beispielsweise kWh, MWh, Liter, tCO₂e, FTE, Headcount oder Prozentanteil."
      }
    ]
  },
  {
    id: "validity",
    number: "5",
    title: "Ist der Nachweis aktuell, gültig und intern freigegeben?",
    intro:
      "Dokumente können fachlich richtig sein und trotzdem ungeeignet werden, wenn sie abgelaufen, ersetzt, nur als Entwurf vorhanden oder intern nicht bestätigt sind.",
    checks: [
      {
        id: "21",
        critical: true,
        question:
          "Ist der Nachweis zum relevanten Zeitpunkt gültig oder fachlich noch aktuell?"
      },
      {
        id: "22",
        critical: false,
        question:
          "Ist bei versionierten Dokumenten erkennbar, welche Version aktuell verwendet wird?"
      },
      {
        id: "23",
        critical: false,
        question:
          "Haben Sie geprüft, ob der Nachweis nicht durch eine neuere Version ersetzt wurde?"
      },
      {
        id: "24",
        critical: true,
        question:
          "Ist das Dokument final bzw. intern verabschiedet und nicht nur ein Entwurf?",
        helper:
          "Ein Policy-Entwurf sollte nicht als bereits geltende Unternehmensrichtlinie dargestellt werden."
      },
      {
        id: "25",
        critical: false,
        question:
          "Kann die zuständige interne Person oder Funktion den Inhalt des Nachweises bestätigen?",
        helper:
          "Beispielsweise Finance, HR, Quality, Facility Management, EHS, Procurement oder Geschäftsführung."
      }
    ]
  },
  {
    id: "chain",
    number: "6",
    title: "Kann ein Dritter die Antwort bis zur Quelle zurückverfolgen?",
    intro:
      "Ziel ist eine klare Kette von der Kundenfrage über die Antwort bis zum zugrunde liegenden Nachweis.",
    checks: [
      {
        id: "26",
        critical: true,
        question:
          "Lässt sich eindeutig nachvollziehen, welche Kundenfrage durch diesen Nachweis unterstützt wird?"
      },
      {
        id: "27",
        critical: "conditional",
        allowNotRelevant: true,
        question:
          "Falls eine Kennzahl verwendet wird: Könnte eine andere Person nachvollziehen, wie sie aus den Quelldaten entstanden ist?"
      },
      {
        id: "28",
        critical: false,
        question:
          "Ist der Nachweis so bezeichnet, dass er später eindeutig wiedergefunden werden kann?",
        helper:
          "Ein sinnvoller Dateiname oder eine interne Referenz erleichtert spätere Kundenanfragen und Wiederverwendung."
      },
      {
        id: "29",
        critical: false,
        question:
          "Sind wesentliche Annahmen, Einschränkungen oder Erklärungen dokumentiert, die zum Verständnis des Nachweises notwendig sind?"
      },
      {
        id: "30",
        critical: true,
        question:
          "Ist vorgesehen, dass Unternehmensdaten und Aussagen vor der externen Verwendung intern bestätigt werden?",
        helper:
          "Die Person, die den Fragebogen vorbereitet, sollte nicht ungeprüft Unternehmensfakten oder verbindliche Aussagen festlegen."
      }
    ]
  }
];

export const allEvidenceChecks = evidenceSections.flatMap(
  (section) => section.checks
);

export const allEvidenceCheckIds = allEvidenceChecks.map((check) => check.id);
export const criticalEvidenceCheckIds = allEvidenceChecks
  .filter((check) => check.critical === true)
  .map((check) => check.id);
export const conditionalCriticalEvidenceCheckIds = allEvidenceChecks
  .filter((check) => check.critical === "conditional")
  .map((check) => check.id);

const checksById = new Map(allEvidenceChecks.map((check) => [check.id, check]));
const validEvidenceTypeIds = new Set(evidenceTypes.map((type) => type.id));
const validAnswers = new Set<AnswerValue>(["yes", "unclear", "no", "na"]);

const statusCopy: Record<ReadinessStatusId, ReadinessStatus> = {
  incomplete: {
    id: "incomplete",
    title: "Prüfung noch nicht abgeschlossen",
    copy:
      "Beantworten Sie alle relevanten Punkte, um offene Risiken und nächste Schritte zu sehen.",
    completed: false
  },
  critical_failed: {
    id: "critical_failed",
    title: "Vor Verwendung prüfen",
    copy:
      "Mindestens ein wesentlicher Punkt ist nicht erfüllt. Der Nachweis sollte in dieser Form nicht ungeprüft für eine externe ESG-Antwort verwendet werden.",
    completed: true
  },
  critical_unclear: {
    id: "critical_unclear",
    title: "Klärung erforderlich",
    copy:
      "Bei mindestens einem wesentlichen Punkt fehlen noch Informationen. Klären Sie diese Fragen, bevor Sie den Nachweis als belastbare Grundlage verwenden.",
    completed: true
  },
  mostly_prepared: {
    id: "mostly_prepared",
    title: "Weitgehend vorbereitet",
    copy:
      "Die wesentlichen Prüfpunkte sind erfüllt. Einige Details sollten vor der Verwendung noch geprüft oder dokumentiert werden.",
    completed: true
  },
  ready_for_internal_confirmation: {
    id: "ready_for_internal_confirmation",
    title: "Bereit für interne Bestätigung",
    copy:
      "Der Nachweis erfüllt die Prüfpunkte dieser Checkliste. Lassen Sie die zugrunde liegenden Unternehmensangaben vor der externen Verwendung durch die zuständige interne Stelle bestätigen.",
    completed: true
  }
};

const redFlagDefinitions: Array<
  RedFlag & {
    trigger: (answers: AnswersState, evidenceType?: EvidenceTypeId) => boolean;
  }
> = [
  {
    checkId: "01",
    title: "Aussage nicht direkt belegt",
    copy:
      "Der Nachweis scheint die geplante ESG-Aussage nicht unmittelbar zu unterstützen.",
    trigger: (answers) => answers["01"] === "no"
  },
  {
    checkId: "03",
    title: "Aussage geht über den Nachweis hinaus",
    copy:
      "Formulieren Sie die Antwort nicht weitergehend, als es die vorhandene Evidence zulässt.",
    trigger: (answers) => answers["03"] === "no"
  },
  {
    checkId: "05",
    title: "Widersprüchliche Angaben",
    copy:
      "Prüfen Sie Zeitraum, Definition, Scope und Datenquelle der widersprüchlichen Angaben.",
    trigger: (answers) => answers["05"] === "no"
  },
  {
    checkId: "06",
    title: "Falsche Gesellschaft",
    copy:
      "Prüfen Sie, ob der Nachweis tatsächlich für die Gesellschaft gilt, für die Sie antworten.",
    trigger: (answers) => answers["06"] === "no"
  },
  {
    checkId: "07",
    title: "Konzernbezug unklar",
    copy:
      "Prüfen Sie, ob eindeutig dokumentiert ist, dass die antwortende Gesellschaft vom Geltungsbereich des Gruppendokuments erfasst ist.",
    trigger: (answers) => answers["07"] === "no" || answers["07"] === "unclear"
  },
  {
    checkId: "08",
    title: "Falscher Standort oder Scope",
    copy:
      "Prüfen Sie, ob der Nachweis tatsächlich die Standorte oder organisatorischen Einheiten Ihrer Antwort abdeckt.",
    trigger: (answers) => answers["08"] === "no"
  },
  {
    checkId: "11",
    title: "Falscher Zeitraum",
    copy: "Der Nachweis betrifft nicht den angefragten Berichtszeitraum.",
    trigger: (answers) => answers["11"] === "no"
  },
  {
    checkId: "13",
    title: "Zeitraum unvollständig",
    copy:
      "Der vorhandene Nachweis deckt den erforderlichen Zeitraum nicht vollständig ab.",
    trigger: (answers) => answers["13"] === "no"
  },
  {
    checkId: "16",
    title: "Quelle nicht nachvollziehbar",
    copy:
      "Dokumentieren Sie, woher die zugrunde liegende Information oder Kennzahl stammt.",
    trigger: (answers) => answers["16"] === "no"
  },
  {
    checkId: "19",
    title: "Berechnung nicht ausreichend dokumentiert",
    copy:
      "Ergänzen Sie Ausgangsdaten, Methode und wesentliche Annahmen der Berechnung.",
    trigger: (answers, evidenceType) =>
      evidenceType === "calculation" && answers["19"] === "no"
  },
  {
    checkId: "21",
    title: "Nachweis möglicherweise nicht mehr gültig",
    copy:
      "Prüfen Sie Gültigkeit, Aktualität und gegebenenfalls vorhandene neuere Versionen.",
    trigger: (answers) => answers["21"] === "no"
  },
  {
    checkId: "24",
    title: "Entwurf statt verabschiedetem Dokument",
    copy:
      "Ein Entwurf sollte nicht als bereits geltende Unternehmensrichtlinie oder finaler Nachweis dargestellt werden.",
    trigger: (answers) => answers["24"] === "no"
  },
  {
    checkId: "26",
    title: "Evidence Chain unvollständig",
    copy:
      "Die Verbindung zwischen Kundenfrage, Antwort, Nachweis und zugrunde liegender Quelle ist nicht eindeutig.",
    trigger: (answers) => answers["26"] === "no"
  },
  {
    checkId: "27",
    title: "Kennzahl nicht reproduzierbar",
    copy:
      "Dokumentieren Sie, wie die Kennzahl aus den zugrunde liegenden Daten entstanden ist.",
    trigger: (answers) => answers["27"] === "no"
  },
  {
    checkId: "30",
    title: "Interne Bestätigung fehlt",
    copy:
      "Unternehmensdaten und Aussagen sollten vor der externen Verwendung durch die zuständige interne Stelle bestätigt werden.",
    trigger: (answers) => answers["30"] === "no"
  }
];

export function isEvidenceTypeId(value: unknown): value is EvidenceTypeId {
  return typeof value === "string" && validEvidenceTypeIds.has(value as EvidenceTypeId);
}

export function getEvidenceTypeLabel(evidenceType?: EvidenceTypeId): string {
  return evidenceTypes.find((type) => type.id === evidenceType)?.label ?? "Noch nicht ausgewählt";
}

export function getEvidenceCheckById(id: string): EvidenceCheck | undefined {
  return checksById.get(id);
}

export function isCriticalCheck(check: EvidenceCheck): boolean {
  return check.critical === true || check.critical === "conditional";
}

export function isRelevantAnswer(answer: AnswerValue | undefined): boolean {
  return answer !== "na";
}

export function getSummaryCounts(answers: AnswersState): SummaryCounts {
  return allEvidenceChecks.reduce<SummaryCounts>(
    (counts, check) => {
      const answer = answers[check.id];

      if (answer === "na" && check.allowNotRelevant) {
        counts.na += 1;
        return counts;
      }

      counts.relevant += 1;

      if (answer === "yes" || answer === "unclear" || answer === "no") {
        counts.answeredRelevant += 1;
      }

      if (answer === "yes") counts.yes += 1;
      if (answer === "unclear") counts.unclear += 1;
      if (answer === "no") counts.no += 1;

      return counts;
    },
    { relevant: 0, answeredRelevant: 0, yes: 0, unclear: 0, no: 0, na: 0 }
  );
}

export function getSectionProgress(
  section: EvidenceSection,
  answers: AnswersState
): { relevant: number; answeredRelevant: number; unresolved: number } {
  return section.checks.reduce(
    (counts, check) => {
      const answer = answers[check.id];

      if (answer === "na" && check.allowNotRelevant) {
        return counts;
      }

      counts.relevant += 1;

      if (answer === "yes" || answer === "unclear" || answer === "no") {
        counts.answeredRelevant += 1;
      }

      if (!answer || answer === "unclear") {
        counts.unresolved += 1;
      }

      return counts;
    },
    { relevant: 0, answeredRelevant: 0, unresolved: 0 }
  );
}

export function getReadinessStatus(answers: AnswersState): ReadinessStatus {
  const counts = getSummaryCounts(answers);

  if (counts.answeredRelevant < counts.relevant) {
    return statusCopy.incomplete;
  }

  const criticalRelevantChecks = allEvidenceChecks.filter(
    (check) => isCriticalCheck(check) && answers[check.id] !== "na"
  );

  if (criticalRelevantChecks.some((check) => answers[check.id] === "no")) {
    return statusCopy.critical_failed;
  }

  if (criticalRelevantChecks.some((check) => answers[check.id] === "unclear")) {
    return statusCopy.critical_unclear;
  }

  if (
    allEvidenceChecks.some((check) => {
      if (isCriticalCheck(check) || answers[check.id] === "na") return false;
      return answers[check.id] === "no" || answers[check.id] === "unclear";
    })
  ) {
    return statusCopy.mostly_prepared;
  }

  return statusCopy.ready_for_internal_confirmation;
}

export function getRedFlags(
  answers: AnswersState,
  evidenceType?: EvidenceTypeId
): RedFlag[] {
  return redFlagDefinitions
    .filter((definition) => definition.trigger(answers, evidenceType))
    .map(({ checkId, title, copy }) => ({ checkId, title, copy }));
}

export function getUnresolvedItems(answers: AnswersState): UnresolvedItem[] {
  return allEvidenceChecks
    .filter((check) => answers[check.id] === "unclear")
    .map((check) => ({
      checkId: check.id,
      label: check.question,
      critical: isCriticalCheck(check)
    }));
}

export function getNextSteps(
  answers: AnswersState,
  evidenceType?: EvidenceTypeId
): NextStep[] {
  const flags = getRedFlags(answers, evidenceType);
  const hasFlag = (ids: string[]) => flags.some((flag) => ids.includes(flag.checkId));
  const steps: NextStep[] = [];

  if (hasFlag(["06", "07", "08"])) {
    steps.push({
      id: "scope",
      title: "Geltungsbereich bestätigen",
      copy:
        "Klären Sie, ob der Nachweis tatsächlich für die antwortende Gesellschaft und den relevanten Standort gilt."
    });
  }

  if (hasFlag(["11", "13"])) {
    steps.push({
      id: "period",
      title: "Aktuellere Daten beschaffen",
      copy:
        "Der vorhandene Nachweis deckt den geforderten Zeitraum nicht vollständig ab."
    });
  }

  if (hasFlag(["16"])) {
    steps.push({
      id: "source",
      title: "Datenquelle ergänzen",
      copy:
        "Dokumentieren Sie, aus welchen Originaldaten die verwendete Information oder Kennzahl entstanden ist."
    });
  }

  if (hasFlag(["24"])) {
    steps.push({
      id: "policy",
      title: "Policy intern verabschieden",
      copy:
        "Verwenden Sie einen Entwurf nicht als Beleg für eine bereits geltende Unternehmensrichtlinie."
    });
  }

  if (hasFlag(["19", "27"]) || evidenceType === "calculation" && answers["19"] !== "yes") {
    steps.push({
      id: "calculation",
      title: "Berechnungsweg dokumentieren",
      copy:
        "Ergänzen Sie Quelldaten, Methode, Annahmen und Einheiten, damit die Kennzahl nachvollziehbar bleibt."
    });
  }

  if (hasFlag(["26"])) {
    steps.push({
      id: "chain",
      title: "Evidence Chain schließen",
      copy:
        "Ordnen Sie Kundenfrage, Antwort, Nachweis und zugrunde liegende Quelle eindeutig einander zu."
    });
  }

  if (steps.length === 0) {
    steps.push({
      id: "confirm",
      title: "Interne Bestätigung einholen",
      copy:
        "Lassen Sie die zugrunde liegenden Unternehmensangaben durch die zuständige interne Stelle bestätigen, bevor Sie sie extern verwenden."
    });
  }

  return steps;
}

export function parseStoredReadinessState(rawValue: string | null): ReadinessState {
  if (!rawValue) {
    return { evidenceLabel: "", answers: {} };
  }

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (typeof parsed !== "object" || parsed === null) {
      return { evidenceLabel: "", answers: {} };
    }

    const candidate = parsed as {
      evidenceType?: unknown;
      evidenceLabel?: unknown;
      answers?: unknown;
    };
    const answers: AnswersState = {};

    if (typeof candidate.answers === "object" && candidate.answers !== null) {
      for (const [id, answer] of Object.entries(candidate.answers)) {
        const check = checksById.get(id);
        if (!check || !validAnswers.has(answer as AnswerValue)) continue;
        if (answer === "na" && !check.allowNotRelevant) continue;
        answers[id] = answer as AnswerValue;
      }
    }

    return {
      evidenceType: isEvidenceTypeId(candidate.evidenceType)
        ? candidate.evidenceType
        : undefined,
      evidenceLabel:
        typeof candidate.evidenceLabel === "string"
          ? candidate.evidenceLabel.slice(0, 160)
          : "",
      answers
    };
  } catch {
    return { evidenceLabel: "", answers: {} };
  }
}

export function serializeReadinessState(state: ReadinessState): string {
  return JSON.stringify({
    evidenceType: state.evidenceType,
    evidenceLabel: state.evidenceLabel,
    answers: Object.fromEntries(
      Object.entries(state.answers).filter(([id, answer]) => {
        const check = checksById.get(id);
        if (!check || !validAnswers.has(answer as AnswerValue)) return false;
        return answer !== "na" || Boolean(check.allowNotRelevant);
      })
    )
  });
}
