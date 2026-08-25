"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Copy,
  Download,
  FileText,
  Plus,
  Printer,
  RotateCcw,
  Trash2
} from "lucide-react";
import {
  SCOPE12_COLLECTION_STORAGE_KEY,
  EN_SCOPE12_COLLECTION_STORAGE_KEY,
  buildScope12Csv,
  categoryDefinitions,
  createEmptyScope12State,
  createEntry,
  createLocation,
  duplicateEntry,
  emptyElectricityInfo,
  entryStatuses,
  getCategoryDefinition,
  getCollectionStatus,
  getCsvFilename,
  getDataGaps,
  getEntriesForCategory,
  getMissingRequiredFields,
  getProgressSummary,
  parseScope12StoredState,
  removeLocationWithLinkedEntries,
  serializeScope12State,
  sourceCompletenessChecks,
  type ActivityCategory,
  type ElectricityInfo,
  type EntryStatus,
  type OrganizationalScope,
  type ProcessGate,
  type PurchasedEnergyGate,
  type RelevanceState,
  type Scope12CollectionState,
  type Scope12Entry,
  type Scope12Location,
  type SourceCheckAnswer
} from "./scope12-data-collection-data";

type Scope12Locale = "de" | "en";

const relevanceOptions: Array<{ value: RelevanceState; label: string }> = [
  { value: "relevant", label: "Relevant" },
  { value: "not-relevant", label: "Nicht relevant" },
  { value: "unclear", label: "Unklar" }
];

const answerOptions: Array<{ value: SourceCheckAnswer; label: string }> = [
  { value: "yes", label: "Ja" },
  { value: "unclear", label: "Unklar" },
  { value: "no", label: "Nein" }
];

const orgScopeOptions: Array<{ value: OrganizationalScope; label: string }> = [
  { value: "single", label: "Ein Unternehmen / eine Gesellschaft" },
  { value: "multiple", label: "Mehrere Gesellschaften" },
  { value: "unclear", label: "Noch zu klären" }
];

const locationTypes = [
  ["production", "Produktionsstandort"],
  ["office", "Büro / Verwaltung"],
  ["warehouse", "Lager / Logistik"],
  ["other", "Sonstiger Standort"]
] as const;

const fuelTypes = [
  "Erdgas",
  "Heizöl",
  "Flüssiggas / LPG",
  "Diesel für stationäre Anlagen",
  "Benzin",
  "Kohle",
  "Biomasse / biogene Brennstoffe",
  "Sonstiger Brennstoff"
];

const stationaryUnits = ["kWh", "MWh", "m³", "Liter", "kg", "t", "andere"];
const stationarySources = [
  "Rechnung",
  "Zähler / Messung",
  "Lieferantenabrechnung",
  "internes System",
  "manuelle Auswertung",
  "andere Quelle"
];

const assetGroups = [
  "Pkw",
  "Transporter",
  "Lkw",
  "Gabelstapler",
  "Baumaschinen",
  "mobile Produktions- / Arbeitsgeräte",
  "sonstige Fahrzeuge oder Anlagen"
];

const mobileFuels = ["Diesel", "Benzin", "LPG", "CNG", "anderer Brennstoff"];
const mobileUnits = ["Liter", "kg", "m³", "andere"];
const mobileSources = [
  "Tankkarte",
  "Kraftstoffrechnung",
  "internes Fuhrpark-System",
  "Einkaufsdaten",
  "andere Quelle"
];

const refrigerantSources = [
  "Wartungsbericht",
  "Serviceprotokoll",
  "Kältemittelbuch",
  "Rechnung",
  "internes Anlagenregister",
  "andere Quelle"
];

const electricityUnits = ["kWh", "MWh"];
const electricitySources = [
  "Stromrechnung",
  "Zählerdaten",
  "Lieferantenportal",
  "internes Energiemanagement",
  "andere Quelle"
];

const purchasedEnergyTypes = [
  "Fernwärme",
  "Dampf",
  "Fernkälte",
  "andere eingekaufte Energie"
];

function labelForStatus(status: EntryStatus): string {
  return entryStatuses.find((item) => item.value === status)?.label ?? status;
}

function labelForAnswer(answer?: SourceCheckAnswer): string {
  if (answer === "yes") return "Ja";
  if (answer === "unclear") return "Unklar";
  if (answer === "no") return "Nein";
  return "Nicht beantwortet";
}

function Field({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`min-w-0 ${className}`}>{children}</div>;
}

function FieldLabel({
  children,
  htmlFor
}: {
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <label className="block text-sm font-bold leading-5 text-ink" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

function TextInput({
  id,
  onChange,
  placeholder,
  type = "text",
  value
}: {
  id: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
}) {
  return (
    <input
      className="mt-2 min-h-11 w-full rounded-[0.72rem] border border-[rgba(21,21,21,0.16)] bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-[rgba(21,21,21,0.36)] focus:border-orange focus:ring-2 focus:ring-orange/20"
      id={id}
      inputMode={type === "number" ? "decimal" : undefined}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type={type === "number" ? "text" : type}
      value={value}
    />
  );
}

function SelectInput({
  id,
  onChange,
  options,
  value
}: {
  id: string;
  onChange: (value: string) => void;
  options: string[] | readonly (readonly [string, string])[];
  value: string;
}) {
  return (
    <select
      className="mt-2 min-h-11 w-full rounded-[0.72rem] border border-[rgba(21,21,21,0.16)] bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
      id={id}
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      <option value="">Auswählen</option>
      {options.map((option) => {
        const value = Array.isArray(option) ? option[0] : option;
        const label = Array.isArray(option) ? option[1] : option;
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

function Segmented<T extends string>({
  id,
  legend,
  onChange,
  options,
  value
}: {
  id: string;
  legend: string;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
  value: T | "";
}) {
  return (
    <fieldset aria-labelledby={`${id}-legend`}>
      <legend className="mb-2 text-sm font-bold text-ink" id={`${id}-legend`}>
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const inputId = `${id}-${option.value}`;
          return (
            <label
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange ${
                value === option.value
                  ? "border-orange bg-[var(--soft-orange)] text-ink"
                  : "border-[rgba(21,21,21,0.14)] bg-white text-ink hover:border-orange/45"
              }`}
              htmlFor={inputId}
              key={option.value}
            >
              <input
                checked={value === option.value}
                className="sr-only"
                id={inputId}
                name={id}
                onChange={() => onChange(option.value)}
                type="radio"
                value={option.value}
              />
              {option.label}
              {value === option.value ? (
                <Check aria-hidden="true" className="h-4 w-4 text-orange" />
              ) : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function ProgressBar({
  checked,
  relevant
}: {
  checked: number;
  relevant: number;
}) {
  const percentage = relevant === 0 ? 0 : Math.round((checked / relevant) * 100);
  return (
    <div
      aria-label="Fortschritt der Scope-1-&-2-Datensammlung"
      aria-valuemax={relevant}
      aria-valuemin={0}
      aria-valuenow={checked}
      aria-valuetext={`${checked} von ${relevant} relevanten Datenpunkten geprüft`}
      className="mt-4"
      role="progressbar"
    >
      <div className="h-2.5 overflow-hidden rounded-full border border-[rgba(21,21,21,0.14)] bg-white">
        <div
          className="h-full rounded-full bg-orange transition-[width] duration-200 motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function SummaryPanel({
  onGapLink,
  onPrint,
  onReset,
  onCsv,
  state
}: {
  onGapLink: (targetId: string) => void;
  onPrint: () => void;
  onReset: () => void;
  onCsv: () => void;
  state: Scope12CollectionState;
}) {
  const progress = getProgressSummary(state);
  const status = getCollectionStatus(state);
  const gaps = getDataGaps(state);
  const relevantModules = categoryDefinitions.filter((definition) =>
    state.locations.some(
      (location) => location.relevance[definition.id] === "relevant"
    )
  );

  return (
    <aside className="scope12-screen-only lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-[1.15rem] border border-[rgba(21,21,21,0.13)] bg-white p-5 shadow-[0_20px_65px_rgba(21,21,21,0.06)] sm:p-6">
        <div className="flex items-start gap-3">
          <FileText aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-orange">
              Datensammlung
            </p>
            <h3 className="mt-2 text-lg font-bold leading-tight text-ink">
              {progress.checked} von {progress.relevant} relevanten Datenpunkten geprüft
            </h3>
            <p className="mt-1 text-sm font-semibold text-muted">
              {progress.percentage} % erfasst
            </p>
          </div>
        </div>
        <ProgressBar checked={progress.checked} relevant={progress.relevant} />

        <dl className="mt-5 grid gap-2 text-sm">
          <div className="rounded-[0.8rem] bg-[var(--paper)] p-3">
            <dt className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
              Zeitraum
            </dt>
            <dd className="mt-1 font-bold text-ink">
              {state.periodStart && state.periodEnd
                ? `${state.periodStart} – ${state.periodEnd}`
                : "Noch nicht festgelegt"}
            </dd>
          </div>
          <div className="rounded-[0.8rem] bg-[var(--paper)] p-3">
            <dt className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
              Standorte
            </dt>
            <dd className="mt-1 font-bold text-ink">{state.locations.length}</dd>
          </div>
          <div className="rounded-[0.8rem] bg-[var(--paper)] p-3">
            <dt className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
              Relevante Module
            </dt>
            <dd className="mt-1 font-bold text-ink">
              {relevantModules.length > 0
                ? relevantModules.map((module) => module.shortLabel).join(", ")
                : "Noch nicht festgelegt"}
            </dd>
          </div>
        </dl>

        <div className="mt-5 rounded-[0.9rem] bg-[var(--paper)] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
            Status
          </p>
          <h3 className="mt-2 text-lg font-bold leading-tight text-ink">
            {status.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">{status.copy}</p>
          <p className="mt-3 text-xs leading-5 text-[rgba(21,21,21,0.56)]">
            Diese Vorlage führt keine Treibhausgasberechnung durch und bestätigt
            weder die Vollständigkeit einer bestimmten Bilanzierungsgrenze noch
            die Konformität mit einem bestimmten Standard.
          </p>
        </div>

        <div className="mt-5 border-t border-[rgba(21,21,21,0.1)] pt-5">
          <h3 className="text-sm font-bold text-ink">Offene Datenpunkte</h3>
          {gaps.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {gaps.slice(0, 6).map((gap) => (
                <li
                  className="rounded-[0.8rem] border border-orange/25 bg-[var(--soft-orange)] p-3"
                  key={gap.id}
                >
                  <p className="text-sm font-bold leading-5 text-ink">{gap.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{gap.copy}</p>
                  <a
                    className="mt-2 inline-flex text-xs font-bold text-orange underline underline-offset-4"
                    href={`#${gap.targetId}`}
                    onClick={() => onGapLink(gap.targetId)}
                  >
                    Zum Datenpunkt →
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm leading-6 text-muted">
              Keine offenen Datenpunkte aus dem aktuellen Stand.
            </p>
          )}
        </div>

        <div className="mt-5 grid gap-2 border-t border-[rgba(21,21,21,0.1)] pt-5">
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-[#df6100]"
            onClick={onCsv}
            type="button"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            CSV exportieren
          </button>
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(21,21,21,0.2)] px-5 py-3 text-sm font-bold text-ink transition hover:border-orange hover:text-orange"
            onClick={onPrint}
            type="button"
          >
            <Printer aria-hidden="true" className="h-4 w-4" />
            Übersicht drucken
          </button>
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(21,21,21,0.2)] px-5 py-3 text-sm font-bold text-ink transition hover:border-orange hover:text-orange"
            onClick={onReset}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Datensammlung zurücksetzen
          </button>
        </div>
      </div>
    </aside>
  );
}

function LocationCard({
  location,
  onRemove,
  onUpdate
}: {
  location: Scope12Location;
  onRemove: () => void;
  onUpdate: (patch: Partial<Scope12Location>) => void;
}) {
  return (
    <article
      className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5"
      id={`scope12-location-${location.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-display text-2xl leading-tight text-ink">
          {location.name || "Neuer Standort"}
        </h4>
        <button
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[rgba(21,21,21,0.16)] px-3 py-2 text-xs font-bold text-ink transition hover:border-orange hover:text-orange"
          onClick={onRemove}
          type="button"
        >
          <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
          Entfernen
        </button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`location-${location.id}-name`}>
            Standortname
          </FieldLabel>
          <TextInput
            id={`location-${location.id}-name`}
            onChange={(name) => onUpdate({ name })}
            value={location.name}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`location-${location.id}-country`}>Land</FieldLabel>
          <TextInput
            id={`location-${location.id}-country`}
            onChange={(country) => onUpdate({ country })}
            value={location.country}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`location-${location.id}-city`}>Stadt</FieldLabel>
          <TextInput
            id={`location-${location.id}-city`}
            onChange={(city) => onUpdate({ city })}
            value={location.city}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`location-${location.id}-company`}>
            Gesellschaft
          </FieldLabel>
          <TextInput
            id={`location-${location.id}-company`}
            onChange={(company) => onUpdate({ company })}
            value={location.company}
          />
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor={`location-${location.id}-type`}>
            Standorttyp
          </FieldLabel>
          <SelectInput
            id={`location-${location.id}-type`}
            onChange={(type) => onUpdate({ type: type as Scope12Location["type"] })}
            options={locationTypes}
            value={location.type}
          />
        </Field>
      </div>

      <fieldset className="mt-6" aria-labelledby={`location-${location.id}-relevance`}>
        <legend
          className="text-sm font-bold leading-6 text-ink"
          id={`location-${location.id}-relevance`}
        >
          Welche Datenbereiche sind an diesem Standort relevant?
        </legend>
        <div className="mt-4 grid gap-4">
          {categoryDefinitions.map((category) => (
            <div
              className="grid gap-2 border-t border-[rgba(21,21,21,0.1)] pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
              key={category.id}
            >
              <p className="text-sm font-semibold leading-6 text-ink">
                {category.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {relevanceOptions.map((option) => {
                  const inputId = `location-${location.id}-${category.id}-${option.value}`;
                  return (
                    <label
                      className={`inline-flex min-h-10 cursor-pointer items-center rounded-full border px-3 py-2 text-xs font-bold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange ${
                        location.relevance[category.id] === option.value
                          ? "border-orange bg-[var(--soft-orange)] text-ink"
                          : "border-[rgba(21,21,21,0.14)] bg-white text-ink hover:border-orange/45"
                      }`}
                      htmlFor={inputId}
                      key={option.value}
                    >
                      <input
                        checked={location.relevance[category.id] === option.value}
                        className="sr-only"
                        id={inputId}
                        name={`location-${location.id}-${category.id}`}
                        onChange={() =>
                          onUpdate({
                            relevance: {
                              ...location.relevance,
                              [category.id]: option.value
                            }
                          })
                        }
                        type="radio"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </article>
  );
}

function EntryCard({
  entry,
  locations,
  onDuplicate,
  onRemove,
  onUpdate
}: {
  entry: Scope12Entry;
  locations: Scope12Location[];
  onDuplicate: () => void;
  onRemove: () => void;
  onUpdate: (patch: Partial<Scope12Entry>) => void;
}) {
  const category = getCategoryDefinition(entry.category);
  const missingFields = getMissingRequiredFields(entry);
  const hasMissing = missingFields.length > 0 || entry.status === "missing";
  const baseId = `scope12-entry-${entry.id}`;
  const locationOptions = locations.map((location) => [
    location.id,
    location.name || "Unbenannter Standort"
  ]) as Array<readonly [string, string]>;
  const statusValue = hasMissing && entry.status === "complete" ? "review" : entry.status;

  function updateField(field: keyof Scope12Entry, value: string) {
    onUpdate({ [field]: value } as Partial<Scope12Entry>);
  }

  return (
    <article
      className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_14px_40px_rgba(21,21,21,0.035)]"
      id={baseId}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-orange">
            Scope {entry.scope} · {category.shortLabel}
          </p>
          <h4 className="font-display mt-2 text-2xl leading-tight text-ink">
            {entry.activityType ||
              entry.fuelType ||
              entry.assetGroup ||
              entry.refrigerantType ||
              entry.processName ||
              "Datensatz"}
          </h4>
          <p className="mt-2 text-xs leading-5 text-muted">
            „Vollständig“ bezieht sich ausschließlich auf die Felder dieser
            Datenerfassung.
          </p>
        </div>
        <div className="scope12-entry-actions flex flex-wrap gap-2">
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[rgba(21,21,21,0.16)] px-3 py-2 text-xs font-bold text-ink transition hover:border-orange hover:text-orange"
            onClick={onDuplicate}
            type="button"
          >
            <Copy aria-hidden="true" className="h-3.5 w-3.5" />
            Duplizieren
          </button>
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[rgba(21,21,21,0.16)] px-3 py-2 text-xs font-bold text-ink transition hover:border-orange hover:text-orange"
            onClick={onRemove}
            type="button"
          >
            <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
            Entfernen
          </button>
        </div>
      </div>

      {hasMissing ? (
        <p className="mt-4 rounded-[0.8rem] border border-orange/25 bg-[var(--soft-orange)] p-3 text-xs font-semibold leading-5 text-muted">
          Dieser Datensatz enthält noch fehlende Pflichtfelder und kann deshalb
          nicht logisch als vollständig gelten.
        </p>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {entry.category !== "mobile-combustion" ? (
          <Field>
            <FieldLabel htmlFor={`${baseId}-location`}>Standort</FieldLabel>
            <SelectInput
              id={`${baseId}-location`}
              onChange={(value) => updateField("locationId", value)}
              options={locationOptions}
              value={entry.locationId}
            />
          </Field>
        ) : (
          <Field>
            <FieldLabel htmlFor={`${baseId}-organization`}>
              Standort / Organisationseinheit
            </FieldLabel>
            <TextInput
              id={`${baseId}-organization`}
              onChange={(value) => updateField("organizationUnit", value)}
              value={entry.organizationUnit}
            />
          </Field>
        )}

        {entry.category === "stationary-combustion" ? (
          <Field>
            <FieldLabel htmlFor={`${baseId}-fuel`}>Brennstoffart</FieldLabel>
            <SelectInput
              id={`${baseId}-fuel`}
              onChange={(value) => updateField("fuelType", value)}
              options={fuelTypes}
              value={entry.fuelType}
            />
          </Field>
        ) : null}

        {entry.category === "mobile-combustion" ? (
          <>
            <Field>
              <FieldLabel htmlFor={`${baseId}-asset`}>Fahrzeug- oder Anlagengruppe</FieldLabel>
              <SelectInput
                id={`${baseId}-asset`}
                onChange={(value) => updateField("assetGroup", value)}
                options={assetGroups}
                value={entry.assetGroup}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${baseId}-mobile-fuel`}>Brennstoff</FieldLabel>
              <SelectInput
                id={`${baseId}-mobile-fuel`}
                onChange={(value) => updateField("fuelType", value)}
                options={mobileFuels}
                value={entry.fuelType}
              />
            </Field>
          </>
        ) : null}

        {entry.category === "refrigerants" ? (
          <>
            <Field>
              <FieldLabel htmlFor={`${baseId}-equipment`}>Anlage / interne Bezeichnung</FieldLabel>
              <TextInput
                id={`${baseId}-equipment`}
                onChange={(value) => updateField("equipmentLabel", value)}
                placeholder="z. B. Klimaanlage Produktionshalle 2"
                value={entry.equipmentLabel}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${baseId}-refrigerant`}>Kältemitteltyp</FieldLabel>
              <TextInput
                id={`${baseId}-refrigerant`}
                onChange={(value) => updateField("refrigerantType", value)}
                value={entry.refrigerantType}
              />
            </Field>
          </>
        ) : null}

        {entry.category === "process-emissions" ? (
          <>
            <Field>
              <FieldLabel htmlFor={`${baseId}-process`}>Prozess</FieldLabel>
              <TextInput
                id={`${baseId}-process`}
                onChange={(value) => updateField("processName", value)}
                value={entry.processName}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${baseId}-substance`}>Stoff / Aktivitätsdatum</FieldLabel>
              <TextInput
                id={`${baseId}-substance`}
                onChange={(value) => updateField("substance", value)}
                value={entry.substance}
              />
            </Field>
          </>
        ) : null}

        {entry.category === "electricity" ? (
          <>
            <Field>
              <FieldLabel htmlFor={`${baseId}-meter`}>Zähler / Verbrauchsstelle</FieldLabel>
              <TextInput
                id={`${baseId}-meter`}
                onChange={(value) => updateField("electricityMeter", value)}
                value={entry.electricityMeter}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${baseId}-supplier`}>Stromlieferant</FieldLabel>
              <TextInput
                id={`${baseId}-supplier`}
                onChange={(value) => updateField("supplier", value)}
                value={entry.supplier}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${baseId}-product`}>Stromprodukt / Tarif</FieldLabel>
              <TextInput
                id={`${baseId}-product`}
                onChange={(value) => updateField("electricityProduct", value)}
                value={entry.electricityProduct}
              />
            </Field>
          </>
        ) : null}

        {entry.category === "purchased-energy" ? (
          <>
            <Field>
              <FieldLabel htmlFor={`${baseId}-energy-type`}>Energieart</FieldLabel>
              <SelectInput
                id={`${baseId}-energy-type`}
                onChange={(value) => updateField("activityType", value)}
                options={purchasedEnergyTypes}
                value={entry.activityType}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${baseId}-supplier`}>Lieferant</FieldLabel>
              <TextInput
                id={`${baseId}-supplier`}
                onChange={(value) => updateField("supplier", value)}
                value={entry.supplier}
              />
            </Field>
          </>
        ) : null}

        <Field>
          <FieldLabel htmlFor={`${baseId}-amount`}>
            {entry.category === "refrigerants" ? "Nachgefüllte Menge" : "Verbrauch"}
          </FieldLabel>
          <TextInput
            id={`${baseId}-amount`}
            onChange={(value) => updateField("amount", value)}
            placeholder="z. B. 1234,5"
            type="number"
            value={entry.amount}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${baseId}-unit`}>Einheit</FieldLabel>
          <SelectInput
            id={`${baseId}-unit`}
            onChange={(value) => updateField("unit", value)}
            options={
              entry.category === "electricity"
                ? electricityUnits
                : entry.category === "mobile-combustion"
                  ? mobileUnits
                  : stationaryUnits
            }
            value={entry.unit}
          />
        </Field>

        {entry.category === "refrigerants" ? (
          <Field>
            <FieldLabel htmlFor={`${baseId}-recovered`}>
              Entnommene / zurückgewonnene Menge
            </FieldLabel>
            <TextInput
              id={`${baseId}-recovered`}
              onChange={(value) => updateField("recoveredAmount", value)}
              type="number"
              value={entry.recoveredAmount}
            />
          </Field>
        ) : null}

        <Field>
          <FieldLabel htmlFor={`${baseId}-period-start`}>Zeitraum von</FieldLabel>
          <TextInput
            id={`${baseId}-period-start`}
            onChange={(value) => updateField("periodStart", value)}
            type="date"
            value={entry.periodStart}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${baseId}-period-end`}>Zeitraum bis</FieldLabel>
          <TextInput
            id={`${baseId}-period-end`}
            onChange={(value) => updateField("periodEnd", value)}
            type="date"
            value={entry.periodEnd}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${baseId}-source`}>Quelle</FieldLabel>
          <SelectInput
            id={`${baseId}-source`}
            onChange={(value) => updateField("sourceType", value)}
            options={
              entry.category === "electricity"
                ? electricitySources
                : entry.category === "mobile-combustion"
                  ? mobileSources
                  : entry.category === "refrigerants"
                    ? refrigerantSources
                    : stationarySources
            }
            value={entry.sourceType}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${baseId}-reference`}>Quellenreferenz</FieldLabel>
          <TextInput
            id={`${baseId}-reference`}
            onChange={(value) => updateField("sourceReference", value)}
            placeholder="z. B. Gasrechnung 01–12/2025"
            value={entry.sourceReference}
          />
        </Field>

        {entry.category === "purchased-energy" ? (
          <Field className="sm:col-span-2">
            <Segmented<SourceCheckAnswer>
              id={`${baseId}-supplier-info`}
              legend="Lieferantenspezifische Information vorhanden"
              onChange={(value) => updateField("supplierInfoStatus", value)}
              options={answerOptions}
              value={entry.supplierInfoStatus}
            />
          </Field>
        ) : null}

        {entry.category === "process-emissions" ? (
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor={`${baseId}-method`}>Methodennotiz</FieldLabel>
            <TextInput
              id={`${baseId}-method`}
              onChange={(value) => updateField("methodNote", value)}
              value={entry.methodNote}
            />
          </Field>
        ) : null}

        <Field>
          <FieldLabel htmlFor={`${baseId}-status`}>Status</FieldLabel>
          <SelectInput
            id={`${baseId}-status`}
            onChange={(value) => updateField("status", value)}
            options={entryStatuses.map((status) => [status.value, status.label] as const)}
            value={statusValue}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${baseId}-notes`}>Notiz</FieldLabel>
          <TextInput
            id={`${baseId}-notes`}
            onChange={(value) => updateField("notes", value)}
            value={entry.notes}
          />
        </Field>
      </div>
    </article>
  );
}

function ModuleSection({
  category,
  children,
  copy,
  entries,
  label,
  locations,
  onAdd,
  onDuplicate,
  onRemove,
  onUpdate,
  title
}: {
  category: ActivityCategory;
  children?: React.ReactNode;
  copy: string;
  entries: Scope12Entry[];
  label: string;
  locations: Scope12Location[];
  onAdd: () => void;
  onDuplicate: (entry: Scope12Entry) => void;
  onRemove: (entry: Scope12Entry) => void;
  onUpdate: (entry: Scope12Entry, patch: Partial<Scope12Entry>) => void;
  title: string;
}) {
  return (
    <section
      aria-labelledby={`scope12-module-${category}-title`}
      className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8"
      id={`scope12-module-${category}`}
    >
      <div className="flex flex-col gap-4 border-b border-[rgba(21,21,21,0.11)] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
            {label}
          </p>
          <h3
            className="font-display mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink"
            id={`scope12-module-${category}-title`}
          >
            {title}
          </h3>
          <p className="mt-4 max-w-3xl leading-7 text-muted">{copy}</p>
        </div>
        <button
          className="scope12-add-button inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#df6100]"
          onClick={onAdd}
          type="button"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          Datensatz hinzufügen
        </button>
      </div>
      {children}
      <div className="mt-6 grid gap-4">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <EntryCard
              entry={entry}
              key={entry.id}
              locations={locations}
              onDuplicate={() => onDuplicate(entry)}
              onRemove={() => onRemove(entry)}
              onUpdate={(patch) => onUpdate(entry, patch)}
            />
          ))
        ) : (
          <p className="rounded-[0.9rem] bg-[var(--paper)] p-4 text-sm leading-6 text-muted">
            Noch kein Datensatz in diesem Modul.
          </p>
        )}
      </div>
    </section>
  );
}

function ElectricityInfoPanel({
  infoByLocation,
  locations,
  onChange
}: {
  infoByLocation: Record<string, ElectricityInfo>;
  locations: Scope12Location[];
  onChange: (locationId: string, info: ElectricityInfo) => void;
}) {
  const relevantLocations = locations.filter(
    (location) => location.relevance.electricity === "relevant"
  );
  const options: Array<[keyof ElectricityInfo, string]> = [
    ["contract", "Liefervertrag vorhanden"],
    ["product", "Stromprodukt dokumentiert"],
    ["supplierEmissionInfo", "Lieferantenspezifische Emissionsinformation vorhanden"],
    ["instruments", "Herkunftsnachweise / vertragliche Instrumente vorhanden"],
    ["none", "Keine zusätzlichen Informationen vorhanden"],
    ["toCheck", "Noch zu prüfen"]
  ];

  return (
    <section
      aria-labelledby="scope12-electricity-info-title"
      className="rounded-[1rem] border border-orange/25 bg-[var(--soft-orange)] p-5 sm:p-6"
      id="scope12-electricity-info"
    >
      <h3 className="font-display text-3xl leading-tight text-ink" id="scope12-electricity-info-title">
        Welche Zusatzinformationen liegen zum eingekauften Strom vor?
      </h3>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
        Für Scope 2 können je nach angewandter Methodik unterschiedliche
        Emissionsfaktoren und vertragliche Informationen relevant sein. Sammeln
        Sie deshalb zunächst die verfügbaren Unterlagen, ohne daraus automatisch
        einen Emissionswert abzuleiten.
      </p>
      <div className="mt-5 grid gap-4">
        {relevantLocations.length > 0 ? (
          relevantLocations.map((location) => {
            const info = infoByLocation[location.id] ?? emptyElectricityInfo;
            return (
              <fieldset
                className="rounded-[0.9rem] bg-white p-4"
                key={location.id}
              >
                <legend className="font-bold text-ink">
                  {location.name || "Unbenannter Standort"}
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {options.map(([key, label]) => {
                    const inputId = `electricity-info-${location.id}-${key}`;
                    return (
                      <label
                        className="flex min-h-10 items-center gap-2 text-sm font-semibold text-ink"
                        htmlFor={inputId}
                        key={key}
                      >
                        <input
                          checked={Boolean(info[key])}
                          className="h-4 w-4 accent-[var(--orange)]"
                          id={inputId}
                          onChange={(event) =>
                            onChange(location.id, {
                              ...info,
                              [key]: event.target.checked
                            })
                          }
                          type="checkbox"
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })
        ) : (
          <p className="text-sm leading-6 text-muted">
            Markieren Sie zunächst Strom an mindestens einem Standort als
            relevant.
          </p>
        )}
      </div>
      <p className="mt-5 rounded-[0.85rem] bg-white p-4 text-sm font-semibold leading-6 text-muted">
        Ein als „erneuerbar“ bezeichnetes Stromprodukt bedeutet nicht
        automatisch, dass für die spätere Scope-2-Berechnung ein Emissionswert
        von null verwendet werden kann. Die anwendbare Methode und die Qualität
        der zugrunde liegenden vertraglichen Instrumente müssen separat geprüft
        werden.
      </p>
    </section>
  );
}

function PrintSummary({ state }: { state: Scope12CollectionState }) {
  const status = getCollectionStatus(state);
  const gaps = getDataGaps(state);
  const printDate = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date());
  const locationById = new Map(state.locations.map((location) => [location.id, location]));

  return (
    <section className="scope12-print-summary" aria-label="Druckübersicht">
      <h1>Scope 1 &amp; 2 Datenerfassungsübersicht</h1>
      <p>Erstellt mit der evipace Datenerfassungs-Vorlage</p>
      <dl>
        <div><dt>Unternehmen</dt><dd>{state.companyLabel || "Nicht angegeben"}</dd></div>
        <div><dt>Berichtszeitraum</dt><dd>{state.periodStart || "?"} – {state.periodEnd || "?"}</dd></div>
        <div><dt>Organisatorischer Umfang</dt><dd>{state.organizationalScope || "Nicht festgelegt"}</dd></div>
        <div><dt>Druckdatum</dt><dd>{printDate}</dd></div>
        <div><dt>Status</dt><dd>{status.title}</dd></div>
      </dl>
      <p>{status.copy}</p>
      <section>
        <h2>Standorte und Relevanz</h2>
        {state.locations.map((location) => (
          <article key={location.id}>
            <h3>{location.name || "Unbenannter Standort"}</h3>
            <p>{location.country} {location.city} {location.company}</p>
            <ul>
              {categoryDefinitions.map((category) => (
                <li key={category.id}>{category.label}: {location.relevance[category.id]}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <section>
        <h2>Aktivitätsdaten</h2>
        <table>
          <thead>
            <tr>
              <th>Scope</th><th>Kategorie</th><th>Standort</th><th>Aktivität</th><th>Menge</th><th>Einheit</th><th>Zeitraum</th><th>Quelle</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {state.entries.map((entry) => (
              <tr key={entry.id}>
                <td>Scope {entry.scope}</td>
                <td>{getCategoryDefinition(entry.category).label}</td>
                <td>{locationById.get(entry.locationId)?.name || entry.organizationUnit}</td>
                <td>{entry.activityType || entry.fuelType || entry.assetGroup || entry.refrigerantType || entry.processName || entry.electricityMeter}</td>
                <td>{entry.amount}</td>
                <td>{entry.unit}</td>
                <td>{entry.periodStart} – {entry.periodEnd}</td>
                <td>{entry.sourceType} {entry.sourceReference}</td>
                <td>{labelForStatus(entry.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Strom-Zusatzinformationen</h2>
        {Object.entries(state.electricityInfoByLocation).map(([locationId, info]) => (
          <p key={locationId}>{locationById.get(locationId)?.name}: {Object.entries(info).filter(([, value]) => value).map(([key]) => key).join(", ") || "Keine Angaben"}</p>
        ))}
      </section>
      <section>
        <h2>Quellenprüfung</h2>
        <ul>{sourceCompletenessChecks.map((check) => <li key={check.id}>{check.title}: {labelForAnswer(state.sourceChecks[check.id])}</li>)}</ul>
      </section>
      <section>
        <h2>Offene Datenpunkte</h2>
        {gaps.length > 0 ? <ul>{gaps.map((gap) => <li key={gap.id}><strong>{gap.title}:</strong> {gap.copy}</li>)}</ul> : <p>Keine offenen Datenpunkte.</p>}
      </section>
      <p>Diese Vorlage führt keine Treibhausgasberechnung durch und bestätigt weder die Vollständigkeit einer bestimmten Bilanzierungsgrenze noch die Konformität mit einem bestimmten Standard.</p>
    </section>
  );
}

export function Scope12DataCollectionTool({
  locale = "de"
}: {
  locale?: Scope12Locale;
}) {
  const storageKey =
    locale === "en"
      ? EN_SCOPE12_COLLECTION_STORAGE_KEY
      : SCOPE12_COLLECTION_STORAGE_KEY;
  const [state, setState] = useState<Scope12CollectionState>(
    createEmptyScope12State
  );
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [pendingEntryDelete, setPendingEntryDelete] = useState<string | null>(null);
  const [pendingLocationDelete, setPendingLocationDelete] = useState<string | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const entryDialogRef = useRef<HTMLDialogElement>(null);
  const locationDialogRef = useRef<HTMLDialogElement>(null);
  const resetDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const parsed = parseScope12StoredState(
      window.localStorage.getItem(storageKey)
    );
    queueMicrotask(() => {
      setState(parsed);
      setStorageLoaded(true);
    });
  }, [storageKey]);

  useEffect(() => {
    if (!storageLoaded) return;
    try {
      const hasState =
        state.companyLabel ||
        state.periodStart ||
        state.periodEnd ||
        state.organizationalScope ||
        state.locations.length > 0 ||
        state.entries.length > 0 ||
        Object.keys(state.sourceChecks).length > 0;
      if (!hasState) {
        window.localStorage.removeItem(storageKey);
      } else {
        window.localStorage.setItem(
          storageKey,
          serializeScope12State(state)
        );
      }
    } catch {
      // The workspace remains usable if localStorage is unavailable.
    }
  }, [state, storageKey, storageLoaded]);

  useEffect(() => {
    if (pendingEntryDelete) entryDialogRef.current?.showModal();
  }, [pendingEntryDelete]);

  useEffect(() => {
    if (pendingLocationDelete) locationDialogRef.current?.showModal();
  }, [pendingLocationDelete]);

  useEffect(() => {
    if (resetOpen) resetDialogRef.current?.showModal();
  }, [resetOpen]);

  const stationaryEntries = useMemo(
    () => getEntriesForCategory(state, "stationary-combustion"),
    [state]
  );
  const mobileEntries = useMemo(
    () => getEntriesForCategory(state, "mobile-combustion"),
    [state]
  );
  const refrigerantEntries = useMemo(
    () => getEntriesForCategory(state, "refrigerants"),
    [state]
  );
  const processEntries = useMemo(
    () => getEntriesForCategory(state, "process-emissions"),
    [state]
  );
  const electricityEntries = useMemo(
    () => getEntriesForCategory(state, "electricity"),
    [state]
  );
  const purchasedEnergyEntries = useMemo(
    () => getEntriesForCategory(state, "purchased-energy"),
    [state]
  );

  function updateState(patch: Partial<Scope12CollectionState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function addLocation() {
    setState((current) => ({ ...current, locations: [...current.locations, createLocation()] }));
  }

  function updateLocation(locationId: string, patch: Partial<Scope12Location>) {
    setState((current) => ({
      ...current,
      locations: current.locations.map((location) =>
        location.id === locationId ? { ...location, ...patch } : location
      )
    }));
  }

  function requestRemoveLocation(locationId: string) {
    const hasLinkedEntries = state.entries.some((entry) => entry.locationId === locationId);
    if (!hasLinkedEntries) {
      setState((current) => removeLocationWithLinkedEntries(current, locationId));
      return;
    }
    setPendingLocationDelete(locationId);
  }

  function confirmRemoveLocation() {
    if (!pendingLocationDelete) return;
    setState((current) => removeLocationWithLinkedEntries(current, pendingLocationDelete));
    setPendingLocationDelete(null);
    locationDialogRef.current?.close();
  }

  function addEntry(category: ActivityCategory) {
    setState((current) => ({
      ...current,
      entries: [...current.entries, createEntry(category)]
    }));
  }

  function updateEntry(entryId: string, patch: Partial<Scope12Entry>) {
    setState((current) => ({
      ...current,
      entries: current.entries.map((entry) =>
        entry.id === entryId ? { ...entry, ...patch } : entry
      )
    }));
  }

  function duplicateExistingEntry(entry: Scope12Entry) {
    setState((current) => ({
      ...current,
      entries: [...current.entries, duplicateEntry(entry)]
    }));
  }

  function confirmRemoveEntry() {
    if (!pendingEntryDelete) return;
    setState((current) => ({
      ...current,
      entries: current.entries.filter((entry) => entry.id !== pendingEntryDelete)
    }));
    setPendingEntryDelete(null);
    entryDialogRef.current?.close();
  }

  function updateElectricityInfo(locationId: string, info: ElectricityInfo) {
    setState((current) => ({
      ...current,
      electricityInfoByLocation: {
        ...current.electricityInfoByLocation,
        [locationId]: info
      }
    }));
  }

  function exportCsv() {
    const csv = buildScope12Csv(state, locale);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = getCsvFilename(state, locale);
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(href);
  }

  function resetCollection() {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Reset still clears in-memory state.
    }
    setState(createEmptyScope12State());
    setResetOpen(false);
    resetDialogRef.current?.close();
  }

  function focusTarget(targetId: string) {
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.focus({ preventScroll: true });
    });
  }

  return (
    <section
      aria-labelledby="scope12-tool-title"
      className="scope12-data-tool scroll-mt-28"
      id="datensammlung-starten"
    >
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">Interaktive Vorlage</p>
        <h2
          className="font-display mt-5 text-[clamp(2.5rem,5.2vw,4.7rem)] leading-none text-ink"
          id="scope12-tool-title"
        >
          Ihre Datensammlung
        </h2>
      </div>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.3fr)] lg:items-start lg:gap-8">
        <div className="grid gap-6">
          <section
            aria-labelledby="scope12-setup-title"
            className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8"
            id="scope12-setup"
            tabIndex={-1}
          >
            <h3
              className="font-display text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink"
              id="scope12-setup-title"
            >
              Basis festlegen
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="scope12-company-label">
                  Unternehmen / interne Bezeichnung – optional
                </FieldLabel>
                <TextInput
                  id="scope12-company-label"
                  onChange={(companyLabel) => updateState({ companyLabel })}
                  placeholder="z. B. Muster Metall GmbH"
                  value={state.companyLabel}
                />
                <p className="mt-2 text-xs font-semibold text-muted">
                  Wird nur für Ihre lokale Datensammlung verwendet.
                </p>
              </Field>
              <Field>
                <FieldLabel htmlFor="scope12-period-start">Von</FieldLabel>
                <TextInput
                  id="scope12-period-start"
                  onChange={(periodStart) => updateState({ periodStart })}
                  type="date"
                  value={state.periodStart}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="scope12-period-end">Bis</FieldLabel>
                <TextInput
                  id="scope12-period-end"
                  onChange={(periodEnd) => updateState({ periodEnd })}
                  type="date"
                  value={state.periodEnd}
                />
              </Field>
              <Field className="sm:col-span-2">
                <Segmented<OrganizationalScope>
                  id="scope12-organizational-scope"
                  legend="Organisatorischer Umfang"
                  onChange={(organizationalScope) =>
                    updateState({ organizationalScope })
                  }
                  options={orgScopeOptions}
                  value={state.organizationalScope}
                />
              </Field>
            </div>
            {state.organizationalScope === "unclear" ? (
              <div className="mt-5 rounded-[0.9rem] border border-orange/25 bg-[var(--soft-orange)] p-4">
                <h4 className="font-bold text-ink">
                  Organisatorischer Umfang noch offen
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Klären Sie vor der finalen Berechnung, welche Gesellschaften,
                  Standorte und Anlagen innerhalb der gewählten Bilanzierungsgrenze
                  liegen.
                </p>
              </div>
            ) : null}
          </section>

          <section
            aria-labelledby="scope12-locations-title"
            className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8"
            id="scope12-locations"
          >
            <div className="flex flex-col gap-4 border-b border-[rgba(21,21,21,0.11)] pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3
                  className="font-display text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink"
                  id="scope12-locations-title"
                >
                  1. Welche Standorte gehören zur Datensammlung?
                </h3>
                <p className="mt-4 max-w-3xl leading-7 text-muted">
                  Legen Sie zuerst fest, für welche Standorte Sie Daten erfassen.
                  So vermeiden Sie, dass Verbräuche aus einzelnen Werken später
                  versehentlich als Unternehmensgesamtwert verwendet werden.
                </p>
              </div>
              <button
                className="scope12-add-button inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#df6100]"
                onClick={addLocation}
                type="button"
              >
                <Plus aria-hidden="true" className="h-4 w-4" />
                Standort hinzufügen
              </button>
            </div>
            <div className="mt-6 grid gap-4">
              {state.locations.length > 0 ? (
                state.locations.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    onRemove={() => requestRemoveLocation(location.id)}
                    onUpdate={(patch) => updateLocation(location.id, patch)}
                  />
                ))
              ) : (
                <p className="rounded-[0.9rem] bg-[var(--paper)] p-4 text-sm leading-6 text-muted">
                  Noch kein Standort angelegt.
                </p>
              )}
            </div>
          </section>

          <ModuleSection
            category="stationary-combustion"
            copy="Erfassen Sie Brennstoffe, die in Anlagen verbraucht werden, die zum gewählten organisatorischen Umfang gehören – beispielsweise für Heizung, Produktionsprozesse oder eigene Generatoren."
            entries={stationaryEntries}
            label="SCOPE 1 · STATIONÄRE VERBRENNUNG"
            locations={state.locations}
            onAdd={() => addEntry("stationary-combustion")}
            onDuplicate={duplicateExistingEntry}
            onRemove={(entry) => setPendingEntryDelete(entry.id)}
            onUpdate={(entry, patch) => updateEntry(entry.id, patch)}
            title="2. Brennstoffe an Standorten"
          />

          <ModuleSection
            category="mobile-combustion"
            copy="Erfassen Sie Brennstoffe für Fahrzeuge oder mobile Anlagen, die innerhalb des gewählten organisatorischen Umfangs liegen. Entscheidend ist nicht nur, wer das Fahrzeug nutzt, sondern wie die organisatorische Grenze der Berechnung festgelegt wurde."
            entries={mobileEntries}
            label="SCOPE 1 · MOBILE VERBRENNUNG"
            locations={state.locations}
            onAdd={() => addEntry("mobile-combustion")}
            onDuplicate={duplicateExistingEntry}
            onRemove={(entry) => setPendingEntryDelete(entry.id)}
            onUpdate={(entry, patch) => updateEntry(entry.id, patch)}
            title="3. Fahrzeuge und mobile Anlagen"
          >
            <p className="mt-6 rounded-[0.9rem] bg-[var(--paper)] p-4 text-sm font-semibold leading-6 text-muted">
              Strom für Elektrofahrzeuge wird nicht als direkte
              Brennstoffverbrennung in diesem Abschnitt erfasst. Zugekaufter
              Strom wird im Scope-2-Strommodul berücksichtigt, soweit er innerhalb
              des gewählten organisatorischen Umfangs liegt.
            </p>
          </ModuleSection>

          <ModuleSection
            category="refrigerants"
            copy="Kühl-, Klima- und Kälteanlagen können direkte Emissionen verursachen, wenn Kältemittel freigesetzt werden. Prüfen Sie deshalb nicht nur Produktionsanlagen, sondern auch Gebäudekühlung, Klimaanlagen und weitere relevante Systeme."
            entries={refrigerantEntries}
            label="SCOPE 1 · FLÜCHTIGE EMISSIONEN"
            locations={state.locations}
            onAdd={() => addEntry("refrigerants")}
            onDuplicate={duplicateExistingEntry}
            onRemove={(entry) => setPendingEntryDelete(entry.id)}
            onUpdate={(entry, patch) => updateEntry(entry.id, patch)}
            title="4. Kältemittel und andere flüchtige Emissionen"
          >
            <p className="mt-6 rounded-[0.9rem] border border-orange/25 bg-[var(--soft-orange)] p-4 text-sm font-semibold leading-6 text-muted">
              Wenn Sie nur wissen, dass Kälte- oder Klimaanlagen vorhanden sind,
              aber keine Mengen vorliegen, markieren Sie den Punkt als offen.
              Erfinden oder schätzen Sie keine Leckagemenge ohne dokumentierte
              Methode.
            </p>
          </ModuleSection>

          <section
            aria-labelledby="scope12-module-process-emissions-title"
            className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8"
            id="scope12-module-process-emissions"
            tabIndex={-1}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              SCOPE 1 · PROZESSE
            </p>
            <h3
              className="font-display mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink"
              id="scope12-module-process-emissions-title"
            >
              5. Direkte Prozessemissionen
            </h3>
            <p className="mt-4 max-w-3xl leading-7 text-muted">
              Manche Produktionsprozesse verursachen direkte
              Treibhausgasemissionen unabhängig von der Verbrennung von
              Brennstoffen. Für viele kleinere Produktionsunternehmen ist dieser
              Abschnitt nicht relevant.
            </p>
            <div className="mt-6">
              <Segmented<ProcessGate>
                id="scope12-process-gate"
                legend="Gibt es in Ihrem Betrieb relevante direkte Prozessemissionen?"
                onChange={(processGate) => updateState({ processGate })}
                options={[
                  { value: "yes", label: "Ja" },
                  { value: "no", label: "Nein" },
                  { value: "unclear", label: "Unklar" }
                ]}
                value={state.processGate}
              />
            </div>
            {state.processGate === "yes" ? (
              <>
                <div className="mt-6">
                  <button
                    className="scope12-add-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-orange px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#df6100]"
                    onClick={() => addEntry("process-emissions")}
                    type="button"
                  >
                    <Plus aria-hidden="true" className="h-4 w-4" />
                    Datensatz hinzufügen
                  </button>
                </div>
                <div className="mt-6 grid gap-4">
                  {processEntries.map((entry) => (
                    <EntryCard
                      entry={entry}
                      key={entry.id}
                      locations={state.locations}
                      onDuplicate={() => duplicateExistingEntry(entry)}
                      onRemove={() => setPendingEntryDelete(entry.id)}
                      onUpdate={(patch) => updateEntry(entry.id, patch)}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </section>

          <ModuleSection
            category="electricity"
            copy="Erfassen Sie eingekauften Strom je Standort und Berichtszeitraum. Halten Sie Verbrauchsdaten und die zugehörigen Rechnungen oder Messwerte getrennt von später verwendeten Emissionsfaktoren fest."
            entries={electricityEntries}
            label="SCOPE 2 · STROM"
            locations={state.locations}
            onAdd={() => addEntry("electricity")}
            onDuplicate={duplicateExistingEntry}
            onRemove={(entry) => setPendingEntryDelete(entry.id)}
            onUpdate={(entry, patch) => updateEntry(entry.id, patch)}
            title="6. Eingekaufter Strom"
          />

          <ElectricityInfoPanel
            infoByLocation={state.electricityInfoByLocation}
            locations={state.locations}
            onChange={updateElectricityInfo}
          />

          <section
            aria-labelledby="scope12-module-purchased-energy-title"
            className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8"
            id="scope12-module-purchased-energy"
            tabIndex={-1}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              SCOPE 2 · WEITERE EINGEKAUFTE ENERGIE
            </p>
            <h3
              className="font-display mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink"
              id="scope12-module-purchased-energy-title"
            >
              7. Eingekaufte Wärme, Dampf oder Kälte
            </h3>
            <div className="mt-6">
              <Segmented<PurchasedEnergyGate>
                id="scope12-purchased-energy-gate"
                legend="Bezieht Ihr Unternehmen Wärme, Dampf oder Kälte von einem externen Anbieter?"
                onChange={(purchasedEnergyGate) =>
                  updateState({ purchasedEnergyGate })
                }
                options={[
                  { value: "yes", label: "Ja" },
                  { value: "no", label: "Nein" },
                  { value: "unclear", label: "Unklar" }
                ]}
                value={state.purchasedEnergyGate}
              />
            </div>
            {state.purchasedEnergyGate === "yes" ? (
              <>
                <div className="mt-6">
                  <button
                    className="scope12-add-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-orange px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#df6100]"
                    onClick={() => addEntry("purchased-energy")}
                    type="button"
                  >
                    <Plus aria-hidden="true" className="h-4 w-4" />
                    Datensatz hinzufügen
                  </button>
                </div>
                <div className="mt-6 grid gap-4">
                  {purchasedEnergyEntries.map((entry) => (
                    <EntryCard
                      entry={entry}
                      key={entry.id}
                      locations={state.locations}
                      onDuplicate={() => duplicateExistingEntry(entry)}
                      onRemove={() => setPendingEntryDelete(entry.id)}
                      onUpdate={(patch) => updateEntry(entry.id, patch)}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </section>

          <section
            aria-labelledby="scope12-source-checks-title"
            className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8"
            id="scope12-source-checks"
            tabIndex={-1}
          >
            <h3
              className="font-display text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink"
              id="scope12-source-checks-title"
            >
              8. Sind die Quelldaten nachvollziehbar?
            </h3>
            <p className="mt-4 max-w-3xl leading-7 text-muted">
              Prüfen Sie abschließend nicht nur, ob Verbrauchswerte vorhanden
              sind, sondern auch, ob sich ihre Herkunft und ihr Geltungsbereich
              später nachvollziehen lassen.
            </p>
            <div className="mt-6 grid gap-4">
              {sourceCompletenessChecks.map((check, index) => (
                <fieldset
                  aria-labelledby={`scope12-source-check-${check.id}-legend`}
                  className="border-t border-[rgba(21,21,21,0.1)] pt-4"
                  key={check.id}
                >
                  <legend
                    className="font-bold leading-6 text-ink"
                    id={`scope12-source-check-${check.id}-legend`}
                  >
                    {String(index + 1).padStart(2, "0")} · {check.title}
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-muted">{check.statement}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {answerOptions.map((option) => {
                      const inputId = `scope12-source-check-${check.id}-${option.value}`;
                      return (
                        <label
                          className={`inline-flex min-h-10 cursor-pointer items-center rounded-full border px-3 py-2 text-xs font-bold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange ${
                            state.sourceChecks[check.id] === option.value
                              ? "border-orange bg-[var(--soft-orange)] text-ink"
                              : "border-[rgba(21,21,21,0.14)] bg-white text-ink hover:border-orange/45"
                          }`}
                          htmlFor={inputId}
                          key={option.value}
                        >
                          <input
                            checked={state.sourceChecks[check.id] === option.value}
                            className="sr-only"
                            id={inputId}
                            name={`scope12-source-check-${check.id}`}
                            onChange={() =>
                              updateState({
                                sourceChecks: {
                                  ...state.sourceChecks,
                                  [check.id]: option.value
                                }
                              })
                            }
                            type="radio"
                          />
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="scope12-privacy-title"
            className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 sm:p-7"
          >
            <h2
              className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-none text-ink"
              id="scope12-privacy-title"
            >
              Ihre Unternehmensdaten bleiben in Ihrem Browser.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              Für diese Vorlage benötigen Sie kein Konto und keinen Datei-Upload.
              Die eingegebenen Werte werden nicht an evipace übertragen. Wenn Sie
              den lokalen Speicher nutzen, bleibt der Arbeitsstand ausschließlich
              in Ihrem Browser gespeichert.
            </p>
          </section>
        </div>

        <SummaryPanel
          onCsv={exportCsv}
          onGapLink={focusTarget}
          onPrint={() => window.print()}
          onReset={() => setResetOpen(true)}
          state={state}
        />
      </div>

      <PrintSummary state={state} />

      <dialog
        aria-labelledby="scope12-entry-delete-title"
        className="scope12-dialog rounded-[1rem] border border-[rgba(21,21,21,0.16)] bg-white p-0 text-ink shadow-premium backdrop:bg-[rgba(21,21,21,0.38)]"
        ref={entryDialogRef}
      >
        <div className="max-w-md p-6 sm:p-7">
          <h2 className="font-display text-3xl leading-tight" id="scope12-entry-delete-title">
            Datensatz wirklich entfernen?
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            Die eingegebenen Werte dieses Datensatzes werden aus Ihrer lokalen
            Datensammlung gelöscht.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(21,21,21,0.18)] px-5 py-2.5 text-sm font-bold" onClick={() => { setPendingEntryDelete(null); entryDialogRef.current?.close(); }} type="button">Abbrechen</button>
            <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white" onClick={confirmRemoveEntry} type="button">Entfernen</button>
          </div>
        </div>
      </dialog>

      <dialog
        aria-labelledby="scope12-location-delete-title"
        className="scope12-dialog rounded-[1rem] border border-[rgba(21,21,21,0.16)] bg-white p-0 text-ink shadow-premium backdrop:bg-[rgba(21,21,21,0.38)]"
        ref={locationDialogRef}
      >
        <div className="max-w-md p-6 sm:p-7">
          <h2 className="font-display text-3xl leading-tight" id="scope12-location-delete-title">
            Standort wirklich entfernen?
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            Für diesen Standort sind bereits Datensätze vorhanden. Wenn Sie den
            Standort entfernen, werden auch die zugehörigen lokalen Datensätze
            aus dieser Vorlage gelöscht.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(21,21,21,0.18)] px-5 py-2.5 text-sm font-bold" onClick={() => { setPendingLocationDelete(null); locationDialogRef.current?.close(); }} type="button">Abbrechen</button>
            <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white" onClick={confirmRemoveLocation} type="button">Standort entfernen</button>
          </div>
        </div>
      </dialog>

      <dialog
        aria-labelledby="scope12-reset-title"
        className="scope12-dialog rounded-[1rem] border border-[rgba(21,21,21,0.16)] bg-white p-0 text-ink shadow-premium backdrop:bg-[rgba(21,21,21,0.38)]"
        ref={resetDialogRef}
      >
        <div className="max-w-md p-6 sm:p-7">
          <h2 className="font-display text-3xl leading-tight" id="scope12-reset-title">
            Datensammlung wirklich zurücksetzen?
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            Alle lokal gespeicherten Standorte, Datensätze und Prüfangaben dieser
            Vorlage werden auf diesem Gerät gelöscht.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(21,21,21,0.18)] px-5 py-2.5 text-sm font-bold" onClick={() => { setResetOpen(false); resetDialogRef.current?.close(); }} type="button">Abbrechen</button>
            <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white" onClick={resetCollection} type="button">Zurücksetzen</button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
