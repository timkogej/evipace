export {
  allEvidenceCheckIds as englishAllEvidenceCheckIds,
  conditionalCriticalEvidenceCheckIds as englishConditionalCriticalEvidenceCheckIds,
  criticalEvidenceCheckIds as englishCriticalEvidenceCheckIds,
  getEvidenceCheckById as getEnglishEvidenceCheckById,
  getSectionProgress as getEnglishSectionProgress,
  isCriticalCheck as isEnglishCriticalCheck,
  isEvidenceTypeId as isEnglishEvidenceTypeId,
  isRelevantAnswer as isEnglishRelevantAnswer,
  parseStoredReadinessState as parseEnglishStoredReadinessState,
  serializeReadinessState as serializeEnglishReadinessState,
  type AnswerValue,
  type AnswersState,
  type EvidenceCheck,
  type EvidenceSection,
  type EvidenceTypeId,
  type NextStep,
  type ReadinessState,
  type ReadinessStatus,
  type ReadinessStatusId,
  type RedFlag,
  type SummaryCounts,
  type UnresolvedItem
} from "./esg-evidence-readiness-data";
import {
  evidenceSections,
  getNextSteps as getGermanNextSteps,
  getReadinessStatus as getGermanReadinessStatus,
  getRedFlags as getGermanRedFlags,
  getSummaryCounts,
  getUnresolvedItems,
  type AnswersState,
  type EvidenceTypeId,
  type NextStep,
  type ReadinessStatus,
  type RedFlag,
  type UnresolvedItem
} from "./esg-evidence-readiness-data";

export const EN_EVIDENCE_READINESS_STORAGE_KEY =
  "evipace:en:esg-evidence-readiness:v1";

export const englishEvidenceTypes = [
  { id: "invoice", label: "Invoice or consumption record" },
  { id: "certificate", label: "Certificate" },
  { id: "policy", label: "Policy" },
  { id: "calculation", label: "Calculation or spreadsheet" },
  { id: "hr", label: "HR or training record" },
  { id: "third-party", label: "Supplier or third-party document" },
  { id: "report", label: "Report or meeting record" },
  { id: "other", label: "Other evidence" }
] as const;

const questions: Record<string, { question: string; helper?: string }> = {
  "01": {
    question:
      "Does the evidence directly support the statement or metric you plan to submit?",
    helper:
      "A document on the same topic is not enough if it does not support the specific answer."
  },
  "02": {
    question:
      "Is the relevant content specific enough to make the statement traceable?",
    helper:
      "General sustainability wording does not prove a concrete action, metric or implementation."
  },
  "03": {
    question:
      "Can the planned answer be derived without stretching or over-interpreting the evidence?",
    helper: "The answer should not say more than the document actually supports."
  },
  "04": {
    question: "Is this evidence type appropriate for the statement?",
    helper:
      "A policy can support a formal commitment, but it does not automatically prove implementation."
  },
  "05": {
    question:
      "Is the evidence consistent with other answers, documents and metrics used for the same request?",
    helper:
      "Different periods, definitions or sources can create apparent contradictions."
  },
  "06": {
    question:
      "Does the evidence apply to the same legal entity that is answering the ESG questionnaire or request?",
    helper:
      "Check group, parent-company and subsidiary documents particularly carefully."
  },
  "07": {
    question:
      "If the evidence is group-level, is it clearly documented that your entity is covered?",
    helper:
      "A group policy or certificate should not be assumed to cover every entity automatically."
  },
  "08": {
    question:
      "Does the evidence cover the site or sites your answer refers to?",
    helper:
      "An invoice for one plant does not automatically prove consumption across all sites."
  },
  "09": {
    question:
      "Does the evidence cover the relevant activity, business unit or organisational unit?"
  },
  "10": {
    question:
      "Is it clear which sites, activities, employee groups or data are excluded from the evidence?",
    helper: "A defined exclusion is better than an unclear scope."
  },
  "11": {
    question:
      "Does the evidence relate to the period requested by the customer or questionnaire?"
  },
  "12": {
    question: "Is the relevant period clearly visible in the document?",
    helper:
      "For example through billing period, financial year, issue date or validity period."
  },
  "13": {
    question: "Does the evidence cover the required period completely?",
    helper:
      "Three monthly invoices are not enough for an annual figure unless the gap is handled transparently."
  },
  "14": {
    question: "Have you checked whether a newer version or newer data exists?"
  },
  "15": {
    question:
      "Is it clear whether the evidence describes a historic position or the current state?",
    helper:
      "Old evidence should not be used as proof of a current state if the situation may have changed."
  },
  "16": {
    question:
      "Is the source of the underlying information or metric clearly identifiable?"
  },
  "17": {
    question: "Is a primary source available or accessible?",
    helper:
      "Examples include an original invoice, meter reading, payroll export, official certificate, waste record or approved policy."
  },
  "18": {
    question:
      "If data was manually transferred or combined, has it been checked for errors?"
  },
  "19": {
    question:
      "If the evidence contains a calculated metric, are input data, method and key assumptions documented?",
    helper:
      "This is especially relevant for emissions, energy, intensity and aggregated metrics."
  },
  "20": {
    question:
      "Are the unit, definition and denominator of the metric clear?",
    helper: "For example kWh, MWh, litres, tCO2e, FTE, headcount or percentage."
  },
  "21": {
    question:
      "Is the evidence valid or still substantively current for the relevant point in time?"
  },
  "22": {
    question:
      "For versioned documents, is it clear which version is currently used?"
  },
  "23": {
    question:
      "Have you checked whether the evidence has been replaced by a newer version?"
  },
  "24": {
    question: "Is the document final or internally approved, rather than a draft?",
    helper:
      "A draft policy should not be presented as an already applicable company policy."
  },
  "25": {
    question:
      "Can the responsible internal person or function confirm the evidence content?",
    helper:
      "For example Finance, HR, Quality, Facility Management, EHS, Procurement or Management."
  },
  "26": {
    question:
      "Can you clearly trace which customer question this evidence supports?"
  },
  "27": {
    question:
      "If a metric is used, could another person reproduce how it was produced from the source data?"
  },
  "28": {
    question:
      "Is the evidence named or referenced so it can be found again later?",
    helper:
      "A useful filename or internal reference makes later customer requests easier."
  },
  "29": {
    question:
      "Are important assumptions, limitations or explanations documented where needed?"
  },
  "30": {
    question:
      "Will company data and statements be internally confirmed before external use?",
    helper:
      "The person preparing the response should not confirm company facts or binding statements alone."
  }
};

const sectionTitles: Record<string, { title: string; intro: string }> = {
  claim: {
    title: "Does the evidence actually support the statement?",
    intro:
      "Start with the statement you need to support, not with the document."
  },
  scope: {
    title: "Does it apply to the right organisation and scope?",
    intro:
      "Evidence can be accurate but unusable if it covers a different entity, site or organisational boundary."
  },
  period: {
    title: "Does it match the requested period?",
    intro:
      "ESG data is often requested for a specific financial year, reporting year or point-in-time status."
  },
  source: {
    title: "Is the source reliable and traceable?",
    intro:
      "Useful ESG evidence starts with an identifiable source and a clear path back to the original data."
  },
  validity: {
    title: "Is it current, valid and internally approved?",
    intro:
      "A document can be technically correct but still unsuitable if it is expired, replaced, in draft or unconfirmed."
  },
  chain: {
    title: "Can a third party trace the answer back to the source?",
    intro:
      "The goal is a clear chain from customer question to answer, evidence and underlying source."
  }
};

export const englishEvidenceReadinessSections = evidenceSections.map(
  (section) => ({
    ...section,
    title: sectionTitles[section.id].title,
    intro: sectionTitles[section.id].intro,
    checks: section.checks.map((check) => ({ ...check, ...questions[check.id] }))
  })
);

export const englishAllEvidenceChecks =
  englishEvidenceReadinessSections.flatMap((section) => section.checks);

export function getEnglishEvidenceTypeLabel(evidenceType?: EvidenceTypeId): string {
  return (
    englishEvidenceTypes.find((type) => type.id === evidenceType)?.label ??
    "Not selected yet"
  );
}

const statusTitleCopy: Record<string, Pick<ReadinessStatus, "title" | "copy">> = {
  incomplete: {
    title: "Check not complete",
    copy: "Answer all relevant checks to see open risks and next steps."
  },
  critical_failed: {
    title: "Review before use",
    copy:
      "At least one critical point is not met. Do not use this evidence for an external ESG answer without review."
  },
  critical_unclear: {
    title: "Clarification required",
    copy:
      "At least one critical point is still unclear. Resolve it before treating the evidence as a reliable basis."
  },
  mostly_prepared: {
    title: "Mostly prepared",
    copy:
      "The critical checks are met. Some details should still be reviewed or documented before use."
  },
  ready_for_internal_confirmation: {
    title: "Ready for internal confirmation",
    copy:
      "The evidence meets the checks in this tool. Have the underlying company information confirmed internally before external use."
  }
};

export function getEnglishReadinessStatus(
  answers: AnswersState
): ReadinessStatus {
  const status = getGermanReadinessStatus(answers);
  return { ...status, ...statusTitleCopy[status.id] };
}

const redFlagCopy: Record<string, Pick<RedFlag, "title" | "copy">> = {
  "01": {
    title: "Statement is not directly supported",
    copy: "The evidence does not appear to support the planned ESG statement directly."
  },
  "03": {
    title: "Answer goes beyond the evidence",
    copy: "Do not make the answer broader than the available evidence allows."
  },
  "05": {
    title: "Inconsistent information",
    copy: "Check period, definition, scope and data source for the conflicting information."
  },
  "06": {
    title: "Wrong entity",
    copy: "Check whether the evidence actually applies to the entity that is answering."
  },
  "07": {
    title: "Group coverage unclear",
    copy: "Confirm that the responding entity is explicitly covered by the group document."
  },
  "08": {
    title: "Wrong site or scope",
    copy: "Check whether the evidence covers the sites or organisational units in your answer."
  },
  "11": { title: "Wrong period", copy: "The evidence does not cover the requested reporting period." },
  "13": {
    title: "Period incomplete",
    copy: "The evidence does not cover the required period completely."
  },
  "16": {
    title: "Source not traceable",
    copy: "Document where the underlying information or metric comes from."
  },
  "19": {
    title: "Calculation not documented",
    copy: "Add input data, method and key assumptions for the calculation."
  },
  "21": {
    title: "Evidence may no longer be valid",
    copy: "Check validity, currency and whether a newer version exists."
  },
  "24": {
    title: "Draft instead of approved document",
    copy: "Do not present a draft as an already applicable company policy or final document."
  },
  "26": {
    title: "Evidence chain incomplete",
    copy: "The link between customer question, answer, evidence and source is not clear."
  },
  "27": {
    title: "Metric is not reproducible",
    copy: "Document how the metric was produced from the underlying data."
  },
  "30": {
    title: "Internal confirmation missing",
    copy: "Company data and statements should be confirmed before external use."
  }
};

export function getEnglishRedFlags(
  answers: AnswersState,
  evidenceType?: EvidenceTypeId
): RedFlag[] {
  return getGermanRedFlags(answers, evidenceType).map((flag) => ({
    checkId: flag.checkId,
    ...(redFlagCopy[flag.checkId] ?? flag)
  }));
}

export function getEnglishUnresolvedItems(
  answers: AnswersState
): UnresolvedItem[] {
  return getUnresolvedItems(answers).map((item) => ({
    ...item,
    label: questions[item.checkId]?.question ?? item.label
  }));
}

const nextStepCopy: Record<string, Pick<NextStep, "title" | "copy">> = {
  scope: {
    title: "Confirm scope",
    copy:
      "Clarify whether the evidence applies to the responding entity and relevant site."
  },
  period: {
    title: "Collect newer data",
    copy: "The available evidence does not cover the requested period completely."
  },
  source: {
    title: "Add source detail",
    copy: "Document which original data produced the information or metric."
  },
  policy: {
    title: "Approve the policy internally",
    copy: "Do not use a draft as evidence of an already applicable policy."
  },
  calculation: {
    title: "Document the calculation path",
    copy: "Add source data, method, assumptions and units so the metric is traceable."
  },
  chain: {
    title: "Close the evidence chain",
    copy: "Map customer question, answer, evidence and source clearly."
  },
  confirm: {
    title: "Get internal confirmation",
    copy:
      "Have the underlying company information confirmed by the responsible internal function before external use."
  }
};

export function getEnglishNextSteps(
  answers: AnswersState,
  evidenceType?: EvidenceTypeId
): NextStep[] {
  return getGermanNextSteps(answers, evidenceType).map((step) => ({
    id: step.id,
    ...(nextStepCopy[step.id] ?? step)
  }));
}

export { getSummaryCounts as getEnglishSummaryCounts };
