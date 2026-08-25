import {
  checklistSections as germanChecklistSections,
  finalSubmissionGateItems as germanFinalSubmissionGateItems,
  type ChecklistGroup,
  type ChecklistItem,
  type ChecklistSection
} from "./esg-questionnaire-checklist-data";

export const EN_CHECKLIST_STORAGE_KEY =
  "evipace:en:esg-questionnaire-checklist:v1";

export const englishChecklistStatuses = [
  "ready",
  "to collect",
  "to calculate",
  "to confirm",
  "to review",
  "gap",
  "not applicable"
] as const;

const sectionCopy: Record<
  string,
  Pick<ChecklistSection, "title" | "intro"> & {
    gate?: { label: string; text: string };
  }
> = {
  request: {
    title: "Understand the request",
    intro: "Before answering anything, make the request operational.",
    gate: {
      label: "Gate 1",
      text: "You know what the customer needs, by when and in which format."
    }
  },
  scope: {
    title: "Set the reporting scope",
    intro: "Answer the first question: who and what are you answering for?",
    gate: {
      label: "Gate 2",
      text:
        "Each data point uses the same entity and reporting period unless the customer asks for something different."
    }
  },
  triage: {
    title: "Triage the questionnaire",
    intro: "Do not answer yet. Sort every question by topic and work status."
  },
  owners: {
    title: "Assign data owners",
    intro: "Identify the internal function that owns the most reliable source."
  },
  company: {
    title: "Check company data",
    intro: "Confirm the company basics before copying old answers."
  },
  "environment-emissions": {
    title: "Collect environmental and emissions data",
    intro: "Bring activity data and reliable source records together."
  },
  "other-environment": {
    title: "Check other environmental data",
    intro: "Use only the topics that are actually requested or applicable."
  },
  workforce: {
    title: "Workforce and social data",
    intro: "Check definition, scope and internal confirmation together."
  },
  "health-safety": {
    title: "Health and safety",
    intro: "Keep incident data, training records and responsibility clear."
  },
  "human-rights": {
    title: "Human rights and labour practices",
    intro: "Separate actual company practice from commitments still being drafted."
  },
  compliance: {
    title: "Ethics and compliance",
    intro: "Use confirmed facts and approved company positions."
  },
  policies: {
    title: "Policies and formal statements",
    intro: "A policy should be approved, applicable and correctly scoped."
  },
  certifications: {
    title: "Certifications and management systems",
    intro: "Check entity, site, validity and certificate scope before using them."
  },
  procurement: {
    title: "Procurement and supply chain",
    intro: "Make supplier statements traceable to real procurement practice."
  },
  product: {
    title: "Product and customer-specific information",
    intro: "Answer only within the product, site or order scope requested."
  },
  evidence: {
    title: "Map evidence",
    intro: "A document is useful only if it supports the specific answer."
  },
  calculations: {
    title: "Review calculations",
    intro: "Keep input data, method, assumptions and factor sources visible."
  },
  "gap-management": {
    title: "Handle gaps correctly",
    intro: "A real gap should be visible. It should not be disguised as evidence."
  },
  consistency: {
    title: "Check consistency",
    intro: "The final answer should read as one coherent company response."
  },
  approval: {
    title: "Confirm internal approval",
    intro: "Make sure accountable people have reviewed the statements they own."
  },
  submission: {
    title: "Prepare submission",
    intro: "Keep the final version, sources and unresolved gaps together."
  },
  "red-flags": {
    title: "Red flags",
    intro: "Warnings to resolve before submitting externally."
  },
  reuse: {
    title: "Keep reusable ESG records",
    intro: "Save the source map so the next request starts from reviewed data."
  }
};

const groupTitleMap: Record<string, string> = {
  Themenbereiche: "Topic areas",
  Energie: "Energy",
  Fuhrpark: "Fleet",
  Kältemittel: "Refrigerants",
  Zeitraum: "Period",
  "Scope 1 & 2": "Scope 1 & 2",
  "Red Flags": "Red flags",
  "Für jeden häufig verwendeten ESG-Datenpunkt speichern":
    "Store each frequently reused ESG data point"
};

const phraseMap: Record<string, string> = {
  "customer-identified": "Requesting customer is identified",
  "original-saved": "Original request is saved",
  "deadline-recorded": "Customer deadline is recorded",
  "format-clarified": "Response format is clear",
  "required-fields": "Required fields are identified",
  "optional-fields": "Optional fields are identified",
  "instructions-read": "Instructions and help text have been read",
  "language-clarified": "Submission language is clear",
  "coordinator-assigned": "Internal coordinator is assigned",
  "legal-entity": "Legal entity is defined",
  sites: "Sites are defined",
  "group-vs-entity": "Group and entity data are kept separate",
  "reporting-period": "Reporting period is defined",
  "point-in-time": "Point-in-time data is identified",
  "average-vs-date": "Average and date-specific values are distinguished",
  "emissions-boundary": "Organisational emissions boundary is clear",
  consistent: "Scope is consistent across answers",
  company: "Company data",
  environment: "Environment",
  energy: "Energy",
  ghg: "Scope 1 / 2 / 3",
  water: "Water",
  waste: "Waste and circular economy",
  materials: "Materials and raw materials",
  workforce: "Workforce and HR",
  safety: "Occupational health and safety",
  "human-rights": "Human rights",
  compliance: "Ethics and compliance",
  policies: "Policies",
  certifications: "Certifications",
  procurement: "Procurement and supply chain",
  product: "Product information",
  "customer-specific": "Other customer-specific requirements",
  "source-owner": "Source owner is assigned",
  finance: "Finance questions are assigned to Finance or Controlling",
  hr: "Workforce questions are assigned to HR",
  quality: "Environmental and management-system questions are assigned",
  operations: "Technical consumption data is assigned to Facility or Operations",
  "statement-owner": "Statement owner is assigned",
  "calculation-owner": "Calculation owner is assigned",
  approver: "Approver is assigned",
  name: "Correct company name",
  "legal-form": "Legal form",
  address: "Address",
  "countries-sites": "Countries and relevant sites",
  nace: "NACE or requested industry classification",
  employees: "Employee count",
  "headcount-fte": "Headcount and FTE are distinguished",
  revenue: "Revenue",
  "balance-sheet": "Balance-sheet data, if requested",
  "reporting-year": "Reporting year",
  group: "Group relationship, if relevant",
  contact: "Contact person",
  "certified-sites": "Certified sites are correctly assigned",
  "electricity-sites": "Electricity consumption per relevant site",
  "electricity-unit": "Electricity unit is documented",
  gas: "Natural gas consumption",
  "heating-oil": "Heating oil",
  "other-fuels": "Other fuels",
  "district-heating": "Purchased heat",
  "cooling-steam": "Purchased cooling or steam, if relevant",
  "primary-sources": "Primary source records are available",
  "fleet-fuel-types": "Fleet fuel types are recorded",
  "fleet-amounts": "Fleet consumption quantities are recorded",
  "fleet-boundary": "Own or controlled vehicles are separated from other transport",
  "refrigerant-assets": "Relevant refrigerant equipment is identified",
  "refrigerant-type": "Refrigerant type is available",
  "refrigerant-amount": "Refilled or lost refrigerant quantity is available",
  "refrigerant-source": "Maintenance or service source is available",
  boundary: "Inventory boundary is documented",
  "activity-data": "Activity data is complete",
  factors: "Emission factors are documented",
  units: "Units have been checked",
  "scope-one": "Scope 1 is shown separately",
  "scope-two": "Scope 2 is shown separately",
  "scope-two-method": "Location-based and market-based Scope 2 are distinguished where relevant",
  "renewable-method": "Renewable electricity is not treated as zero without method review",
  "waste-total": "Total waste quantity",
  "hazardous-waste": "Hazardous waste",
  "non-hazardous-waste": "Non-hazardous waste",
  recycling: "Recycling or reuse",
  "raw-materials": "Raw materials",
  "recycled-content": "Recycled content",
  pollution: "Pollution data, if relevant",
  biodiversity: "Biodiversity or site information, if requested",
  targets: "Environmental targets",
  "target-year": "Target year",
  baseline: "Baseline or base year",
  progress: "Progress against target",
  definition: "Definition is clear",
  "contract-types": "Permanent and temporary contracts are distinguished",
  gender: "Gender data, if requested",
  "training-hours": "Training hours",
  "safety-training": "Safety training",
  accidents: "Work accidents",
  "accident-rate": "Accident rate",
  fatalities: "Relevant fatalities, if requested and applicable",
  "collective-bargaining": "Collective bargaining coverage",
  turnover: "Employee turnover, if requested",
  absenteeism: "Absenteeism, if requested",
  "minimum-wage": "Minimum-wage statement is confirmed",
  "working-hours": "Working-time statement is confirmed",
  "complaints-channel": "Complaints channel is documented",
  "training-records": "Training records are available",
  "near-misses": "Near misses, if tracked",
  "lost-time": "Lost-time injury data",
  "risk-assessment": "Risk assessment is available",
  "ppe": "PPE requirements are documented",
  "management-system": "Management system information is available",
  "responsible-person": "Responsible person or function is identified",
  incidents: "Incidents are confirmed",
  "corrective-actions": "Corrective actions are documented",
  "child-labor": "Child-labour statement is confirmed",
  "forced-labor": "Forced-labour statement is confirmed",
  discrimination: "Non-discrimination statement is confirmed",
  "freedom-association": "Freedom of association statement is confirmed",
  "grievance-channel": "Grievance channel is documented",
  "policy-exists": "Relevant policy exists",
  "policy-approved": "Policy is approved",
  "policy-scope": "Policy scope matches the answer",
  "policy-date": "Policy date or version is clear",
  "policy-owner": "Policy owner is identified",
  "implementation-evidence": "Implementation evidence is available where claimed",
  "supplier-expectations": "Supplier expectations are documented",
  "training-evidence": "Training evidence is available where claimed",
  "code-of-conduct": "Code of Conduct is available",
  sanctions: "Sanctions-screening statement is confirmed",
  corruption: "Anti-corruption statement is confirmed",
  privacy: "Data-protection statement is confirmed",
  whistleblowing: "Whistleblowing channel is documented",
  "conflicts-interest": "Conflicts-of-interest handling is documented",
  "tax-compliance": "Tax compliance statement is confirmed, if requested",
  "certificate-name": "Certificate name is recorded",
  "certificate-owner": "Certificate owner is recorded",
  "certificate-scope": "Certificate scope is checked",
  "certificate-sites": "Certificate sites match the answer",
  "certificate-validity": "Certificate validity is checked",
  "certificate-body": "Certification body is recorded",
  "audit-date": "Audit date is recorded, if relevant",
  suppliers: "Supplier population is defined",
  "supplier-risk": "Supplier-risk approach is documented",
  "supplier-code": "Supplier Code of Conduct is available, if claimed",
  "supplier-assessment": "Supplier assessment process is documented, if claimed",
  "supplier-evidence": "Supplier evidence supports the answer",
  "material-origin": "Material origin is documented, if requested",
  "conflict-minerals": "Conflict-minerals information is checked, if requested",
  "product-scope": "Product scope is clear",
  "bom": "Bill of materials is available, if requested",
  "product-carbon": "Product carbon data is treated separately from company emissions",
  "recycled-material": "Recycled material content is documented, if claimed",
  "customer-contract": "Customer-specific contractual requirement is checked",
  "evidence-map": "Evidence map is prepared",
  "claim-source": "Each material claim has a source",
  "document-current": "Document is current",
  "document-final": "Document is final, not a draft",
  "document-scope": "Document scope matches the answer",
  "document-period": "Document period matches the request",
  "document-owner": "Document owner can confirm the content",
  "no-backdating": "New documents are not backdated",
  "no-overclaiming": "Answers do not overstate the evidence",
  input: "Input data is recorded",
  method: "Method is documented",
  assumptions: "Assumptions are documented",
  "factor-source": "Factor source is documented",
  "factor-version": "Factor version is documented",
  "reconciliation": "Reconciliation is documented where needed",
  "review-person": "Reviewer is assigned",
  "known-gap": "Known gap is documented",
  "gap-reason": "Gap reason is documented",
  "gap-owner": "Gap owner is assigned",
  "gap-action": "Next action for the gap is defined",
  "gap-not-hidden": "Gap is not hidden in wording",
  "answer-consistency": "Answers are consistent across sections",
  "number-consistency": "Numbers are consistent across tables and documents",
  "scope-consistency": "Scope is consistent",
  "period-consistency": "Period is consistent",
  "policy-consistency": "Policy statements match uploaded documents",
  "entity-confirmed": "Responding entity is confirmed",
  "owner-confirmed": "Relevant owners have confirmed their inputs",
  "management-confirmed": "Management statement is confirmed where needed",
  "legal-review": "Legal or compliance review is included where needed",
  "final-version": "Final version is saved",
  "attachments": "Attachments are complete",
  "file-names": "File names are clear",
  "portal-fields": "Portal fields are reviewed",
  "submitter-authorized": "Submitter is authorised",
  "submission-copy": "Submitted copy will be retained",
  datapoint: "Data point",
  value: "Value",
  unit: "Unit",
  period: "Period",
  entity: "Entity",
  site: "Site",
  source: "Source",
  "original-source": "Original source",
  evidence: "Evidence",
  calculation: "Calculation method",
  factor: "Factor or factor version, if relevant",
  "last-review": "Last internal review",
  "next-update": "Next update",
  "previous-uses": "Previous customer requests or platforms"
};

function titleCaseFromId(id: string): string {
  const key = id.split(".").pop() ?? id;
  if (phraseMap[key]) return phraseMap[key];

  return key
    .split("-")
    .map((part) => (part.length <= 3 ? part.toUpperCase() : part[0].toUpperCase() + part.slice(1)))
    .join(" ");
}

function englishItem(item: ChecklistItem): ChecklistItem {
  return {
    id: item.id,
    label: phraseMap[item.id.split(".").pop() ?? item.id] ?? titleCaseFromId(item.id)
  };
}

function englishGroup(group: ChecklistGroup): ChecklistGroup {
  return {
    title: group.title ? groupTitleMap[group.title] ?? group.title : undefined,
    items: group.items.map(englishItem)
  };
}

export const englishChecklistSections: readonly ChecklistSection[] =
  germanChecklistSections.map((section) => {
    const copy = sectionCopy[section.id];

    return {
      id: section.id,
      number: section.number,
      title: copy?.title ?? titleCaseFromId(section.id),
      intro: copy?.intro ?? "Review the requested information before submitting.",
      groups: section.groups.map(englishGroup),
      notes: section.notes?.map(() =>
        "Use this section to make scope, source, evidence and open gaps explicit before the answer is submitted."
      ),
      gate: copy?.gate
    };
  });

export const englishFinalSubmissionGateItems: readonly ChecklistItem[] = [
  {
    id: "final-gate.scope",
    label: "Scope",
    detail: "The responding entity, sites and reporting period are clear."
  },
  {
    id: "final-gate.source",
    label: "Source",
    detail: "Material numbers and statements come from traceable internal sources."
  },
  {
    id: "final-gate.evidence",
    label: "Evidence",
    detail: "Material claims are supported, or missing evidence is treated as a visible gap."
  },
  {
    id: "final-gate.consistency",
    label: "Consistency",
    detail: "Answers, figures, policies and documents do not contradict each other."
  },
  {
    id: "final-gate.approval",
    label: "Approval",
    detail: "Company-specific statements have been confirmed by the right internal people."
  },
  {
    id: "final-gate.submission",
    label: "Submission",
    detail: "An authorised person has reviewed the final version before submission."
  }
] as const satisfies readonly ChecklistItem[];

if (englishFinalSubmissionGateItems.length !== germanFinalSubmissionGateItems.length) {
  throw new Error("English final submission gates must match the German source count.");
}

export const englishAllChecklistItems = [
  ...englishChecklistSections.flatMap((section) =>
    section.groups.flatMap((group) => group.items)
  ),
  ...englishFinalSubmissionGateItems
] as const;

export const englishAllChecklistItemIds = englishAllChecklistItems.map(
  (item) => item.id
);
