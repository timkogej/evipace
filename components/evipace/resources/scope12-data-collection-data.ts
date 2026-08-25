export const SCOPE12_COLLECTION_STORAGE_KEY =
  "evipace:de:scope12-data-collection:v1";
export const EN_SCOPE12_COLLECTION_STORAGE_KEY =
  "evipace:en:scope12-data-collection:v1";

export type RelevanceState = "relevant" | "not-relevant" | "unclear";
export type OrganizationalScope = "single" | "multiple" | "unclear" | "";
export type EntryStatus = "complete" | "review" | "missing";
export type SourceCheckAnswer = "yes" | "unclear" | "no";
export type ProcessGate = "yes" | "no" | "unclear" | "";
export type PurchasedEnergyGate = "yes" | "no" | "unclear" | "";

export type ActivityCategory =
  | "stationary-combustion"
  | "mobile-combustion"
  | "refrigerants"
  | "process-emissions"
  | "electricity"
  | "purchased-energy";

export type LocationType =
  | "production"
  | "office"
  | "warehouse"
  | "other";

export type Scope12Location = {
  id: string;
  name: string;
  country: string;
  city: string;
  company: string;
  type: LocationType;
  relevance: Record<ActivityCategory, RelevanceState>;
};

export type Scope12Entry = {
  id: string;
  scope: "1" | "2";
  category: ActivityCategory;
  locationId: string;
  organizationUnit: string;
  activityType: string;
  assetGroup: string;
  fuelType: string;
  refrigerantType: string;
  equipmentLabel: string;
  processName: string;
  substance: string;
  amount: string;
  recoveredAmount: string;
  unit: string;
  periodStart: string;
  periodEnd: string;
  supplier: string;
  electricityMeter: string;
  electricityProduct: string;
  sourceType: string;
  sourceReference: string;
  supplierInfoStatus: SourceCheckAnswer | "";
  methodNote: string;
  status: EntryStatus;
  notes: string;
};

export type ElectricityInfo = {
  contract: boolean;
  product: boolean;
  supplierEmissionInfo: boolean;
  instruments: boolean;
  none: boolean;
  toCheck: boolean;
};

export type Scope12CollectionState = {
  companyLabel: string;
  periodStart: string;
  periodEnd: string;
  organizationalScope: OrganizationalScope;
  locations: Scope12Location[];
  entries: Scope12Entry[];
  processGate: ProcessGate;
  purchasedEnergyGate: PurchasedEnergyGate;
  electricityInfoByLocation: Record<string, ElectricityInfo>;
  sourceChecks: Record<string, SourceCheckAnswer>;
};

export type CollectionStatusId =
  | "not_setup"
  | "started"
  | "data_gaps"
  | "mostly_complete"
  | "ready";

export type CollectionStatus = {
  id: CollectionStatusId;
  title: string;
  copy: string;
};

export type DataGap = {
  id: string;
  targetId: string;
  title: string;
  copy: string;
};

export type ProgressSummary = {
  checked: number;
  relevant: number;
  percentage: number;
  byCategory: Array<{
    category: ActivityCategory | "locations" | "source-checks";
    label: string;
    checked: number;
    relevant: number;
    unresolved: number;
    notRelevant: boolean;
  }>;
};

export const defaultRelevance: Record<ActivityCategory, RelevanceState> = {
  "stationary-combustion": "unclear",
  "mobile-combustion": "unclear",
  refrigerants: "unclear",
  "process-emissions": "unclear",
  electricity: "unclear",
  "purchased-energy": "unclear"
};

export const categoryDefinitions: Array<{
  id: ActivityCategory;
  scope: "1" | "2";
  label: string;
  shortLabel: string;
  requiredFields: Array<keyof Scope12Entry>;
}> = [
  {
    id: "stationary-combustion",
    scope: "1",
    label: "Brennstoffe / stationäre Verbrennung",
    shortLabel: "Brennstoffe",
    requiredFields: [
      "locationId",
      "fuelType",
      "amount",
      "unit",
      "periodStart",
      "periodEnd",
      "sourceType"
    ]
  },
  {
    id: "mobile-combustion",
    scope: "1",
    label: "Fahrzeuge / mobile Verbrennung",
    shortLabel: "Fahrzeuge",
    requiredFields: [
      "organizationUnit",
      "assetGroup",
      "fuelType",
      "amount",
      "unit",
      "periodStart",
      "periodEnd",
      "sourceType"
    ]
  },
  {
    id: "refrigerants",
    scope: "1",
    label: "Kältemittel",
    shortLabel: "Kältemittel",
    requiredFields: [
      "locationId",
      "equipmentLabel",
      "refrigerantType",
      "amount",
      "unit",
      "periodStart",
      "periodEnd",
      "sourceType"
    ]
  },
  {
    id: "process-emissions",
    scope: "1",
    label: "Direkte Prozessemissionen",
    shortLabel: "Prozesse",
    requiredFields: [
      "locationId",
      "processName",
      "substance",
      "amount",
      "unit",
      "periodStart",
      "periodEnd",
      "sourceType"
    ]
  },
  {
    id: "electricity",
    scope: "2",
    label: "Eingekaufter Strom",
    shortLabel: "Strom",
    requiredFields: [
      "locationId",
      "amount",
      "unit",
      "periodStart",
      "periodEnd",
      "sourceType"
    ]
  },
  {
    id: "purchased-energy",
    scope: "2",
    label: "Wärme / Dampf / Kälte",
    shortLabel: "Wärme / Dampf / Kälte",
    requiredFields: [
      "locationId",
      "activityType",
      "amount",
      "unit",
      "periodStart",
      "periodEnd",
      "sourceType"
    ]
  }
];

export const sourceCompletenessChecks = [
  {
    id: "period-complete",
    title: "Berichtszeitraum vollständig",
    statement: "Die vorhandenen Daten decken den gesamten benötigten Zeitraum ab."
  },
  {
    id: "units-clear",
    title: "Einheiten eindeutig",
    statement:
      "Für jeden Verbrauchswert ist klar, welche Einheit verwendet wird."
  },
  {
    id: "locations-assigned",
    title: "Standorte zugeordnet",
    statement:
      "Jeder Wert ist einem Standort oder einer organisatorischen Einheit zugeordnet."
  },
  {
    id: "source-available",
    title: "Originalquelle vorhanden",
    statement:
      "Rechnung, Messung, Systemexport oder eine andere zugrunde liegende Quelle kann identifiziert werden."
  },
  {
    id: "duplicates-checked",
    title: "Doppelerfassungen geprüft",
    statement:
      "Derselbe Verbrauch wurde nicht versehentlich aus mehreren Quellen doppelt übernommen."
  },
  {
    id: "gaps-documented",
    title: "Lücken dokumentiert",
    statement:
      "Fehlende Monate oder unvollständige Daten sind sichtbar gekennzeichnet und nicht stillschweigend ersetzt."
  },
  {
    id: "boundary-confirmed",
    title: "Organisatorischer Umfang bestätigt",
    statement:
      "Es ist intern geklärt, welche Gesellschaften, Standorte und Anlagen in der Berechnung enthalten sein sollen."
  },
  {
    id: "internal-review",
    title: "Interne Prüfung vorgesehen",
    statement:
      "Die zugrunde liegenden Verbrauchsdaten werden vor der finalen Berechnung von den zuständigen internen Stellen bestätigt."
  }
] as const;

export const entryStatuses: Array<{
  value: EntryStatus;
  label: string;
  helper: string;
}> = [
  {
    value: "complete",
    label: "Vollständig",
    helper: "Menge, Einheit, Zeitraum und Quelle sind erfasst."
  },
  {
    value: "review",
    label: "Noch zu prüfen",
    helper: "Mindestens eine Information muss intern bestätigt werden."
  },
  {
    value: "missing",
    label: "Daten fehlen",
    helper:
      "Ein benötigter Verbrauchs- oder Quelldatensatz ist noch nicht vorhanden."
  }
];

export const emptyElectricityInfo: ElectricityInfo = {
  contract: false,
  product: false,
  supplierEmissionInfo: false,
  instruments: false,
  none: false,
  toCheck: true
};

export function createEmptyScope12State(): Scope12CollectionState {
  return {
    companyLabel: "",
    periodStart: "",
    periodEnd: "",
    organizationalScope: "",
    locations: [],
    entries: [],
    processGate: "",
    purchasedEnergyGate: "",
    electricityInfoByLocation: {},
    sourceChecks: {}
  };
}

export function createLocalId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export function createLocation(): Scope12Location {
  return {
    id: createLocalId("location"),
    name: "",
    country: "",
    city: "",
    company: "",
    type: "production",
    relevance: { ...defaultRelevance }
  };
}

export function createEntry(category: ActivityCategory): Scope12Entry {
  const definition = getCategoryDefinition(category);
  return {
    id: createLocalId("entry"),
    scope: definition.scope,
    category,
    locationId: "",
    organizationUnit: "",
    activityType: "",
    assetGroup: "",
    fuelType: "",
    refrigerantType: "",
    equipmentLabel: "",
    processName: "",
    substance: "",
    amount: "",
    recoveredAmount: "",
    unit: category === "refrigerants" ? "kg" : "",
    periodStart: "",
    periodEnd: "",
    supplier: "",
    electricityMeter: "",
    electricityProduct: "",
    sourceType: "",
    sourceReference: "",
    supplierInfoStatus: "",
    methodNote: "",
    status: "review",
    notes: ""
  };
}

export function getCategoryDefinition(category: ActivityCategory) {
  const definition = categoryDefinitions.find((item) => item.id === category);
  if (!definition) {
    throw new Error(`Unknown Scope 1 & 2 category: ${category}`);
  }
  return definition;
}

export function duplicateEntry(entry: Scope12Entry): Scope12Entry {
  return {
    ...entry,
    id: createLocalId("entry"),
    status: entry.status === "complete" ? "review" : entry.status
  };
}

export function removeLocationWithLinkedEntries(
  state: Scope12CollectionState,
  locationId: string
): Scope12CollectionState {
  const nextElectricityInfo = { ...state.electricityInfoByLocation };
  delete nextElectricityInfo[locationId];

  return {
    ...state,
    locations: state.locations.filter((location) => location.id !== locationId),
    entries: state.entries.filter((entry) => entry.locationId !== locationId),
    electricityInfoByLocation: nextElectricityInfo
  };
}

export function getEntriesForCategory(
  state: Scope12CollectionState,
  category: ActivityCategory,
  locationId?: string
): Scope12Entry[] {
  return state.entries.filter((entry) => {
    if (entry.category !== category) return false;
    if (!locationId) return true;
    return entry.locationId === locationId;
  });
}

export function isEntryFieldMissing(
  entry: Scope12Entry,
  field: keyof Scope12Entry
): boolean {
  return String(entry[field] ?? "").trim().length === 0;
}

export function getMissingRequiredFields(entry: Scope12Entry): Array<keyof Scope12Entry> {
  return getCategoryDefinition(entry.category).requiredFields.filter((field) =>
    isEntryFieldMissing(entry, field)
  );
}

export function isEntryComplete(entry: Scope12Entry): boolean {
  return entry.status !== "missing" && getMissingRequiredFields(entry).length === 0;
}

export function hasSetup(state: Scope12CollectionState): boolean {
  return (
    state.periodStart.trim().length > 0 &&
    state.periodEnd.trim().length > 0 &&
    state.locations.length > 0
  );
}

export function getRelevantLocationCategories(
  state: Scope12CollectionState
): Array<{ location: Scope12Location; category: ActivityCategory }> {
  return state.locations.flatMap((location) =>
    categoryDefinitions
      .filter((definition) => location.relevance[definition.id] === "relevant")
      .map((definition) => ({ location, category: definition.id }))
  );
}

export function getUnclearLocationCategories(
  state: Scope12CollectionState
): Array<{ location: Scope12Location; category: ActivityCategory }> {
  return state.locations.flatMap((location) =>
    categoryDefinitions
      .filter((definition) => location.relevance[definition.id] === "unclear")
      .map((definition) => ({ location, category: definition.id }))
  );
}

function hasAnyElectricityInfo(info: ElectricityInfo | undefined): boolean {
  if (!info) return false;
  return (
    info.contract ||
    info.product ||
    info.supplierEmissionInfo ||
    info.instruments ||
    info.none
  );
}

function hasHardDataGap(state: Scope12CollectionState): boolean {
  return getDataGaps(state).some((gap) =>
    [
      "missing-amount",
      "missing-unit",
      "missing-source",
      "missing-period",
      "location-without-data",
      "refrigerants-open"
    ].includes(gap.id)
  );
}

export function getDataGaps(state: Scope12CollectionState): DataGap[] {
  const gaps = new Map<string, DataGap>();
  const addGap = (gap: DataGap) => {
    if (!gaps.has(gap.id)) gaps.set(gap.id, gap);
  };

  if (!state.periodStart || !state.periodEnd) {
    addGap({
      id: "missing-reporting-period",
      targetId: "scope12-setup",
      title: "Berichtszeitraum fehlt",
      copy:
        "Legen Sie fest, für welchen Zeitraum die Verbrauchsdaten gesammelt werden."
    });
  }

  if (state.organizationalScope === "unclear") {
    addGap({
      id: "organizational-scope-unclear",
      targetId: "scope12-setup",
      title: "Organisatorischer Umfang unklar",
      copy:
        "Klären Sie, welche Gesellschaften und Standorte in die Berechnung einbezogen werden sollen."
    });
  }

  for (const { location, category } of getRelevantLocationCategories(state)) {
    if (getEntriesForCategory(state, category, location.id).length === 0) {
      addGap({
        id:
          category === "refrigerants"
            ? "refrigerants-open"
            : "location-without-data",
        targetId: `scope12-module-${category}`,
        title:
          category === "refrigerants"
            ? "Kältemitteldaten offen"
            : "Standort ohne Datengrundlage",
        copy:
          category === "refrigerants"
            ? "Für einen als relevant markierten Kältemittelbereich sind noch keine belastbaren Mengen- oder Servicedaten dokumentiert."
            : "Für einen als relevant markierten Standort wurden noch keine Daten im betreffenden Bereich erfasst."
      });
    }
  }

  for (const entry of state.entries) {
    const missing = getMissingRequiredFields(entry);
    if (missing.includes("amount") || entry.status === "missing") {
      addGap({
        id: "missing-amount",
        targetId: `scope12-entry-${entry.id}`,
        title: "Verbrauchswert fehlt",
        copy: "Für mindestens einen Datensatz fehlt der Aktivitätswert."
      });
    }
    if (missing.includes("unit")) {
      addGap({
        id: "missing-unit",
        targetId: `scope12-entry-${entry.id}`,
        title: "Einheit fehlt",
        copy: "Ein Verbrauchswert ist ohne eindeutige Einheit nicht verwendbar."
      });
    }
    if (missing.includes("sourceType")) {
      addGap({
        id: "missing-source",
        targetId: `scope12-entry-${entry.id}`,
        title: "Quelle fehlt",
        copy:
          "Für einen erfassten Wert ist keine zugrunde liegende Quelle dokumentiert."
      });
    }
    if (missing.includes("periodStart") || missing.includes("periodEnd")) {
      addGap({
        id: "missing-period",
        targetId: `scope12-entry-${entry.id}`,
        title: "Zeitraum unvollständig",
        copy:
          "Die vorhandenen Daten decken den benötigten Berichtszeitraum möglicherweise nicht vollständig ab."
      });
    }
  }

  if (state.processGate === "unclear") {
    addGap({
      id: "process-emissions-unclear",
      targetId: "scope12-module-process-emissions",
      title: "Prozessemissionen noch zu klären",
      copy:
        "Prüfen Sie, ob in den relevanten Produktionsprozessen direkte Treibhausgasemissionen entstehen."
    });
  }

  if (state.purchasedEnergyGate === "unclear") {
    addGap({
      id: "purchased-energy-unclear",
      targetId: "scope12-module-purchased-energy",
      title: "Wärme, Dampf oder Kälte noch zu klären",
      copy:
        "Es ist noch unklar, ob extern bezogene Wärme, Dampf oder Kälte vorhanden ist."
    });
  }

  const electricityRelevantLocations = state.locations.filter(
    (location) => location.relevance.electricity === "relevant"
  );
  if (
    electricityRelevantLocations.some((location) => {
      const info = state.electricityInfoByLocation[location.id];
      return !hasAnyElectricityInfo(info) || Boolean(info?.toCheck);
    })
  ) {
    addGap({
      id: "electricity-info-open",
      targetId: "scope12-electricity-info",
      title: "Scope-2-Vertragsinformationen offen",
      copy:
        "Für eingekauften Strom müssen verfügbare Liefer- und Vertragsinformationen noch geprüft werden."
    });
  }

  if (state.sourceChecks["period-complete"] && state.sourceChecks["period-complete"] !== "yes") {
    addGap({
      id: "missing-period",
      targetId: "scope12-source-checks",
      title: "Zeitraum unvollständig",
      copy:
        "Die vorhandenen Daten decken den benötigten Berichtszeitraum möglicherweise nicht vollständig ab."
    });
  }

  if (state.sourceChecks["duplicates-checked"] !== "yes") {
    addGap({
      id: "duplicates-not-checked",
      targetId: "scope12-source-checks",
      title: "Doppelerfassung noch nicht geprüft",
      copy:
        "Prüfen Sie, ob derselbe Verbrauch aus mehreren Datenquellen mehrfach erfasst wurde."
    });
  }

  if (state.sourceChecks["internal-review"] !== "yes") {
    addGap({
      id: "internal-confirmation-missing",
      targetId: "scope12-source-checks",
      title: "Interne Bestätigung fehlt",
      copy:
        "Die Datengrundlage ist erfasst, wurde aber noch nicht intern bestätigt."
    });
  }

  return Array.from(gaps.values());
}

export function getProgressSummary(state: Scope12CollectionState): ProgressSummary {
  const rows: ProgressSummary["byCategory"] = [];
  const locationChecked = state.locations.filter(
    (location) => location.name.trim() && location.country.trim()
  ).length;

  rows.push({
    category: "locations",
    label: "Standorte",
    checked: locationChecked,
    relevant: Math.max(state.locations.length, 1),
    unresolved: state.locations.length === 0 ? 1 : state.locations.length - locationChecked,
    notRelevant: false
  });

  for (const definition of categoryDefinitions) {
    const relevantPairs = getRelevantLocationCategories(state).filter(
      (pair) => pair.category === definition.id
    );
    const unresolved = getUnclearLocationCategories(state).filter(
      (pair) => pair.category === definition.id
    ).length;
    const checked = relevantPairs.filter(({ location }) =>
      getEntriesForCategory(state, definition.id, location.id).some(isEntryComplete)
    ).length;

    rows.push({
      category: definition.id,
      label: definition.shortLabel,
      checked,
      relevant: relevantPairs.length,
      unresolved,
      notRelevant: relevantPairs.length === 0 && unresolved === 0
    });
  }

  const sourceRelevant = sourceCompletenessChecks.length;
  const sourceChecked = sourceCompletenessChecks.filter(
    (check) => state.sourceChecks[check.id] === "yes"
  ).length;
  const sourceUnresolved = sourceCompletenessChecks.filter(
    (check) => state.sourceChecks[check.id] !== "yes"
  ).length;
  rows.push({
    category: "source-checks",
    label: "Quellenprüfung",
    checked: sourceChecked,
    relevant: sourceRelevant,
    unresolved: sourceUnresolved,
    notRelevant: false
  });

  const relevant = rows.reduce((sum, row) => sum + row.relevant + row.unresolved, 0);
  const checked = rows.reduce((sum, row) => sum + row.checked, 0);

  return {
    checked,
    relevant,
    percentage: relevant === 0 ? 0 : Math.round((checked / relevant) * 100),
    byCategory: rows
  };
}

export function getCollectionStatus(
  state: Scope12CollectionState
): CollectionStatus {
  if (!hasSetup(state)) {
    return {
      id: "not_setup",
      title: "Datensammlung noch nicht eingerichtet",
      copy: "Legen Sie zuerst Berichtszeitraum und relevante Standorte fest."
    };
  }

  const relevantEmptyAreas = getRelevantLocationCategories(state).filter(
    ({ location, category }) =>
      getEntriesForCategory(state, category, location.id).length === 0
  ).length;
  const started = state.entries.length > 0;

  if (started && relevantEmptyAreas >= 2) {
    return {
      id: "started",
      title: "Datensammlung begonnen",
      copy:
        "Erste Aktivitätsdaten sind erfasst. Mehrere relevante Bereiche enthalten jedoch noch keine vollständigen Angaben."
    };
  }

  if (hasHardDataGap(state)) {
    return {
      id: "data_gaps",
      title: "Datenlücken vorhanden",
      copy:
        "Für mindestens einen relevanten Bereich fehlen Verbrauchsdaten, Zeiträume oder zugrunde liegende Quellen."
    };
  }

  const unresolvedExists =
    state.organizationalScope === "unclear" ||
    getUnclearLocationCategories(state).length > 0 ||
    state.processGate === "unclear" ||
    state.purchasedEnergyGate === "unclear" ||
    state.entries.some((entry) => entry.status === "review") ||
    sourceCompletenessChecks.some((check) => state.sourceChecks[check.id] !== "yes") ||
    getDataGaps(state).length > 0;

  if (unresolvedExists) {
    return {
      id: "mostly_complete",
      title: "Weitgehend vollständig",
      copy:
        "Die wesentlichen Aktivitätsdaten sind erfasst. Einige Angaben oder Quellen sollten vor der Berechnung noch geprüft werden."
    };
  }

  return {
    id: "ready",
    title: "Bereit für interne Prüfung und Berechnungsvorbereitung",
    copy:
      "Die ausgewählten Scope-1-&-2-Datenbereiche sind strukturiert erfasst. Prüfen und bestätigen Sie die zugrunde liegenden Unternehmensdaten, bevor Emissionsfaktoren angewendet und CO₂e-Werte berechnet werden."
  };
}

export function parseScope12StoredState(
  rawValue: string | null
): Scope12CollectionState {
  if (!rawValue) return createEmptyScope12State();

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (typeof parsed !== "object" || parsed === null) {
      return createEmptyScope12State();
    }
    const candidate = parsed as Partial<Scope12CollectionState>;
    const base = createEmptyScope12State();

    const locations = Array.isArray(candidate.locations)
      ? candidate.locations
          .filter((location): location is Scope12Location =>
            Boolean(location && typeof location === "object" && "id" in location)
          )
          .map((location) => ({
            ...createLocation(),
            ...location,
            relevance: { ...defaultRelevance, ...(location.relevance ?? {}) }
          }))
      : [];
    const validLocationIds = new Set(locations.map((location) => location.id));
    const entries = Array.isArray(candidate.entries)
      ? candidate.entries
          .filter((entry): entry is Scope12Entry =>
            Boolean(entry && typeof entry === "object" && "id" in entry)
          )
          .filter((entry) =>
            categoryDefinitions.some((definition) => definition.id === entry.category)
          )
          .filter((entry) => !entry.locationId || validLocationIds.has(entry.locationId))
          .map((entry) => ({
            ...createEntry(entry.category),
            ...entry,
            status: ["complete", "review", "missing"].includes(entry.status)
              ? entry.status
              : "review"
          }))
      : [];

    return {
      ...base,
      companyLabel:
        typeof candidate.companyLabel === "string"
          ? candidate.companyLabel.slice(0, 180)
          : "",
      periodStart:
        typeof candidate.periodStart === "string" ? candidate.periodStart : "",
      periodEnd: typeof candidate.periodEnd === "string" ? candidate.periodEnd : "",
      organizationalScope: ["single", "multiple", "unclear", ""].includes(
        candidate.organizationalScope ?? ""
      )
        ? candidate.organizationalScope ?? ""
        : "",
      locations,
      entries,
      processGate: ["yes", "no", "unclear", ""].includes(candidate.processGate ?? "")
        ? candidate.processGate ?? ""
        : "",
      purchasedEnergyGate: ["yes", "no", "unclear", ""].includes(
        candidate.purchasedEnergyGate ?? ""
      )
        ? candidate.purchasedEnergyGate ?? ""
        : "",
      electricityInfoByLocation:
        typeof candidate.electricityInfoByLocation === "object" &&
        candidate.electricityInfoByLocation !== null
          ? Object.fromEntries(
              Object.entries(candidate.electricityInfoByLocation).filter(([id]) =>
                validLocationIds.has(id)
              )
            )
          : {},
      sourceChecks:
        typeof candidate.sourceChecks === "object" && candidate.sourceChecks !== null
          ? Object.fromEntries(
              Object.entries(candidate.sourceChecks).filter(
                ([id, value]) =>
                  sourceCompletenessChecks.some((check) => check.id === id) &&
                  ["yes", "unclear", "no"].includes(String(value))
              )
            )
          : {}
    };
  } catch {
    return createEmptyScope12State();
  }
}

export function serializeScope12State(state: Scope12CollectionState): string {
  return JSON.stringify(state);
}

function sanitizeCsvCell(value: unknown): string {
  const raw = String(value ?? "");
  const formulaSafe = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${formulaSafe.replace(/"/g, '""').replace(/\r?\n/g, "\n")}"`;
}

export function getCsvFilename(
  state: Scope12CollectionState,
  locale: "de" | "en" = "de"
): string {
  const startYear = state.periodStart.match(/^(\d{4})-/)?.[1];
  const endYear = state.periodEnd.match(/^(\d{4})-/)?.[1];

  if (startYear && startYear === endYear) {
    return locale === "en"
      ? `scope-1-2-data-collection-${startYear}.csv`
      : `scope-1-2-datenerfassung-${startYear}.csv`;
  }

  return locale === "en"
    ? "scope-1-2-data-collection.csv"
    : "scope-1-2-datenerfassung.csv";
}

export function buildScope12Csv(
  state: Scope12CollectionState,
  locale: "de" | "en" = "de"
): string {
  const headers =
    locale === "en"
      ? [
          "Scope",
          "Category",
          "Site",
          "Entity",
          "Activity",
          "Amount",
          "Unit",
          "Period from",
          "Period to",
          "Source",
          "Source reference",
          "Status",
          "Note"
        ]
      : [
          "Scope",
          "Kategorie",
          "Standort",
          "Gesellschaft",
          "Aktivität",
          "Menge",
          "Einheit",
          "Zeitraum von",
          "Zeitraum bis",
          "Quelle",
          "Quellenreferenz",
          "Status",
          "Notiz"
        ];
  const locationById = new Map(state.locations.map((location) => [location.id, location]));
  const rows = state.entries.map((entry) => {
    const location = locationById.get(entry.locationId);
    const category = getCategoryDefinition(entry.category);
    const activity =
      entry.activityType ||
      entry.fuelType ||
      entry.assetGroup ||
      entry.refrigerantType ||
      entry.processName ||
      entry.electricityMeter ||
      entry.substance;

    return [
      `Scope ${entry.scope}`,
      locale === "en"
        ? {
            "stationary-combustion": "Stationary combustion",
            "mobile-combustion": "Mobile combustion",
            refrigerants: "Refrigerants",
            "process-emissions": "Process emissions",
            electricity: "Electricity",
            "purchased-energy": "Purchased heat / steam / cooling"
          }[entry.category]
        : category.label,
      location?.name || entry.organizationUnit,
      location?.company || "",
      activity,
      entry.amount,
      entry.unit,
      entry.periodStart,
      entry.periodEnd,
      entry.sourceType,
      entry.sourceReference,
      locale === "en"
        ? {
            complete: "Complete",
            review: "To review",
            missing: "Missing data"
          }[entry.status]
        : entryStatuses.find((status) => status.value === entry.status)?.label ?? entry.status,
      entry.notes || entry.methodNote
    ];
  });

  return `\uFEFF${[headers, ...rows]
    .map((row) => row.map(sanitizeCsvCell).join(";"))
    .join("\r\n")}`;
}
