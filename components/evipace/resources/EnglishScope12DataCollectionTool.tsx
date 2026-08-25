"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Plus, Printer, RotateCcw, Trash2 } from "lucide-react";
import {
  EN_SCOPE12_COLLECTION_STORAGE_KEY,
  buildScope12Csv,
  categoryDefinitions,
  createEmptyScope12State,
  createEntry,
  createLocation,
  getCsvFilename,
  parseScope12StoredState,
  serializeScope12State,
  sourceCompletenessChecks,
  type ActivityCategory,
  type RelevanceState,
  type Scope12CollectionState,
  type Scope12Entry,
  type Scope12Location,
  type SourceCheckAnswer
} from "./scope12-data-collection-data";

const categoryLabels: Record<ActivityCategory, string> = {
  "stationary-combustion": "Stationary combustion",
  "mobile-combustion": "Mobile combustion",
  refrigerants: "Refrigerants",
  "process-emissions": "Process emissions",
  electricity: "Purchased electricity",
  "purchased-energy": "Purchased heat, steam or cooling"
};

const relevanceOptions: Array<{ value: RelevanceState; label: string }> = [
  { value: "relevant", label: "Relevant" },
  { value: "not-relevant", label: "Not applicable" },
  { value: "unclear", label: "Unclear" }
];

const answerOptions: Array<{ value: SourceCheckAnswer; label: string }> = [
  { value: "yes", label: "Yes" },
  { value: "unclear", label: "Unclear" },
  { value: "no", label: "No" }
];

const sourceCheckCopy = {
  "period-complete": {
    title: "Reporting period complete",
    statement: "The available activity data covers the full reporting period."
  },
  "units-clear": {
    title: "Units are clear",
    statement: "Every activity amount has a clear unit such as kWh, MWh, litres or kg."
  },
  "locations-assigned": {
    title: "Sites assigned",
    statement: "Every value is assigned to a site or an internal organisational unit."
  },
  "source-available": {
    title: "Original source available",
    statement: "An invoice, meter reading, system export or other underlying source can be identified."
  },
  "duplicates-checked": {
    title: "Duplicates checked",
    statement: "The same consumption has not been copied in twice from multiple sources."
  },
  "gaps-documented": {
    title: "Data gaps documented",
    statement: "Missing months or incomplete data points are visible instead of silently replaced."
  },
  "boundary-confirmed": {
    title: "Organisational boundary confirmed",
    statement: "The companies, sites and assets included in the future calculation have been clarified internally."
  },
  "internal-review": {
    title: "Internal review planned",
    statement: "The underlying activity data will be confirmed by the responsible internal owners before calculation."
  }
} satisfies Record<
  (typeof sourceCompletenessChecks)[number]["id"],
  { title: string; statement: string }
>;

function labelForAnswer(answer: SourceCheckAnswer | undefined) {
  if (answer === "yes") return "Yes";
  if (answer === "no") return "No";
  if (answer === "unclear") return "Unclear";
  return "Not answered";
}

function TextField({
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value
}: {
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
}) {
  return (
    <label className="block min-w-0 text-sm font-bold leading-5 text-ink" htmlFor={id}>
      {label}
      <input
        className="mt-2 min-h-11 w-full rounded-[0.72rem] border border-[rgba(21,21,21,0.16)] bg-white px-3 py-2.5 text-sm font-normal text-ink outline-none transition placeholder:text-[rgba(21,21,21,0.36)] focus:border-orange focus:ring-2 focus:ring-orange/20"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
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
    <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h4 className="font-display text-2xl leading-tight text-ink">
          {location.name || "New site"}
        </h4>
        <button
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[rgba(21,21,21,0.16)] px-3 py-2 text-xs font-bold text-ink transition hover:border-orange hover:text-orange"
          onClick={onRemove}
          type="button"
        >
          <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <TextField
          id={`location-${location.id}-name`}
          label="Site name"
          onChange={(name) => onUpdate({ name })}
          value={location.name}
        />
        <TextField
          id={`location-${location.id}-country`}
          label="Country"
          onChange={(country) => onUpdate({ country })}
          value={location.country}
        />
        <TextField
          id={`location-${location.id}-city`}
          label="City"
          onChange={(city) => onUpdate({ city })}
          value={location.city}
        />
        <TextField
          id={`location-${location.id}-company`}
          label="Entity"
          onChange={(company) => onUpdate({ company })}
          value={location.company}
        />
      </div>
      <fieldset className="mt-6">
        <legend className="text-sm font-bold leading-6 text-ink">
          Which activity-data modules are relevant for this site?
        </legend>
        <div className="mt-4 grid gap-4">
          {categoryDefinitions.map((category) => (
            <div className="grid gap-2 border-t border-[rgba(21,21,21,0.1)] pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center" key={category.id}>
              <p className="text-sm font-semibold leading-6 text-ink">
                Scope {category.scope}: {categoryLabels[category.id]}
              </p>
              <div className="flex flex-wrap gap-2">
                {relevanceOptions.map((option) => (
                  <label className="inline-flex min-h-10 cursor-pointer items-center rounded-full border border-[rgba(21,21,21,0.14)] px-3 py-2 text-xs font-bold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange" key={option.value}>
                    <input
                      checked={location.relevance[category.id] === option.value}
                      className="mr-2 h-4 w-4 accent-[var(--orange)]"
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
                ))}
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
  onRemove,
  onUpdate
}: {
  entry: Scope12Entry;
  locations: Scope12Location[];
  onRemove: () => void;
  onUpdate: (patch: Partial<Scope12Entry>) => void;
}) {
  const locationOptions = locations.map((location) => ({
    value: location.id,
    label: location.name || "Unnamed site"
  }));

  return (
    <article className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-orange">
            Scope {entry.scope} - {categoryLabels[entry.category]}
          </p>
          <h4 className="font-display mt-2 text-2xl leading-tight text-ink">
            {entry.activityType || entry.fuelType || entry.assetGroup || entry.refrigerantType || entry.processName || "Activity data row"}
          </h4>
        </div>
        <button
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[rgba(21,21,21,0.16)] px-3 py-2 text-xs font-bold text-ink transition hover:border-orange hover:text-orange"
          onClick={onRemove}
          type="button"
        >
          <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold text-ink">
          Site
          <select
            className="mt-2 min-h-11 w-full rounded-[0.72rem] border border-[rgba(21,21,21,0.16)] bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
            onChange={(event) => onUpdate({ locationId: event.target.value })}
            value={entry.locationId}
          >
            <option value="">Select</option>
            {locationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <TextField
          id={`entry-${entry.id}-activity`}
          label="Activity or fuel type"
          onChange={(value) =>
            onUpdate(
              entry.category === "mobile-combustion"
                ? { assetGroup: value }
                : { activityType: value, fuelType: value }
            )
          }
          placeholder="e.g. natural gas, diesel, electricity"
          value={entry.activityType || entry.fuelType || entry.assetGroup}
        />
        <TextField
          id={`entry-${entry.id}-amount`}
          label="Activity amount"
          onChange={(amount) => onUpdate({ amount })}
          placeholder="e.g. 1234.5"
          value={entry.amount}
        />
        <TextField
          id={`entry-${entry.id}-unit`}
          label="Unit"
          onChange={(unit) => onUpdate({ unit })}
          placeholder="kWh, MWh, litres, kg"
          value={entry.unit}
        />
        <TextField
          id={`entry-${entry.id}-period-start`}
          label="Period from"
          onChange={(periodStart) => onUpdate({ periodStart })}
          type="date"
          value={entry.periodStart}
        />
        <TextField
          id={`entry-${entry.id}-period-end`}
          label="Period to"
          onChange={(periodEnd) => onUpdate({ periodEnd })}
          type="date"
          value={entry.periodEnd}
        />
        <TextField
          id={`entry-${entry.id}-source`}
          label="Source"
          onChange={(sourceType) => onUpdate({ sourceType })}
          placeholder="Invoice, meter reading, service report"
          value={entry.sourceType}
        />
        <TextField
          id={`entry-${entry.id}-reference`}
          label="Source reference"
          onChange={(sourceReference) => onUpdate({ sourceReference })}
          placeholder="Invoice number or file reference"
          value={entry.sourceReference}
        />
        <TextField
          id={`entry-${entry.id}-notes`}
          label="Notes or gaps"
          onChange={(notes) => onUpdate({ notes })}
          value={entry.notes}
        />
      </div>
    </article>
  );
}

function PrintSummary({ state }: { state: Scope12CollectionState }) {
  const printDate = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date());
  const locationById = new Map(
    state.locations.map((location) => [location.id, location])
  );

  return (
    <section className="scope12-print-summary" aria-label="Print summary">
      <h1>Scope 1 and Scope 2 data collection summary</h1>
      <p>Created with the evipace Scope 1 and Scope 2 data collection template.</p>
      <dl>
        <div><dt>Company</dt><dd>{state.companyLabel || "Not provided"}</dd></div>
        <div><dt>Reporting period</dt><dd>{state.periodStart || "?"} - {state.periodEnd || "?"}</dd></div>
        <div><dt>Sites</dt><dd>{state.locations.length}</dd></div>
        <div><dt>Activity rows</dt><dd>{state.entries.length}</dd></div>
        <div><dt>Print date</dt><dd>{printDate}</dd></div>
      </dl>

      <section>
        <h2>Sites and relevance</h2>
        {state.locations.length > 0 ? (
          state.locations.map((location) => (
            <article key={location.id}>
              <h3>{location.name || "Unnamed site"}</h3>
              <p>{[location.country, location.city, location.company].filter(Boolean).join(", ") || "No site details provided"}</p>
              <ul>
                {categoryDefinitions.map((category) => (
                  <li key={category.id}>
                    Scope {category.scope} - {categoryLabels[category.id]}: {location.relevance[category.id]}
                  </li>
                ))}
              </ul>
            </article>
          ))
        ) : (
          <p>No sites have been added.</p>
        )}
      </section>

      <section>
        <h2>Activity data</h2>
        {state.entries.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Scope</th>
                <th>Category</th>
                <th>Site</th>
                <th>Activity</th>
                <th>Amount</th>
                <th>Unit</th>
                <th>Period</th>
                <th>Source</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {state.entries.map((entry) => (
                <tr key={entry.id}>
                  <td>Scope {entry.scope}</td>
                  <td>{categoryLabels[entry.category]}</td>
                  <td>{locationById.get(entry.locationId)?.name || entry.organizationUnit || "Not assigned"}</td>
                  <td>{entry.activityType || entry.fuelType || entry.assetGroup || entry.refrigerantType || entry.processName || entry.electricityMeter || "Not provided"}</td>
                  <td>{entry.amount || "-"}</td>
                  <td>{entry.unit || "-"}</td>
                  <td>{entry.periodStart || "?"} - {entry.periodEnd || "?"}</td>
                  <td>{[entry.sourceType, entry.sourceReference].filter(Boolean).join(" ") || "Not provided"}</td>
                  <td>{entry.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No activity data rows have been added.</p>
        )}
      </section>

      <section>
        <h2>Source completeness checks</h2>
        <ul>
          {sourceCompletenessChecks.map((check) => (
            <li key={check.id}>
              {sourceCheckCopy[check.id].title}: {labelForAnswer(state.sourceChecks[check.id])}
            </li>
          ))}
        </ul>
      </section>

      <p>This template collects activity data only. It does not apply emission factors, calculate CO2e, confirm boundary completeness or provide assurance under a reporting standard.</p>
    </section>
  );
}

export function EnglishScope12DataCollectionTool() {
  const [state, setState] = useState<Scope12CollectionState>(
    createEmptyScope12State
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedState = parseScope12StoredState(
      window.localStorage.getItem(EN_SCOPE12_COLLECTION_STORAGE_KEY)
    );

    queueMicrotask(() => {
      setState(storedState);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const hasState =
      state.companyLabel ||
      state.periodStart ||
      state.periodEnd ||
      state.locations.length > 0 ||
      state.entries.length > 0 ||
      Object.keys(state.sourceChecks).length > 0;
    if (!hasState) {
      window.localStorage.removeItem(EN_SCOPE12_COLLECTION_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(
      EN_SCOPE12_COLLECTION_STORAGE_KEY,
      serializeScope12State(state)
    );
  }, [loaded, state]);

  const completedSourceChecks = sourceCompletenessChecks.filter(
    (check) => state.sourceChecks[check.id] === "yes"
  ).length;
  const progressText = `${state.entries.length} activity rows, ${state.locations.length} sites, ${completedSourceChecks} of ${sourceCompletenessChecks.length} source checks complete`;

  const entriesByCategory = useMemo(
    () =>
      Object.fromEntries(
        categoryDefinitions.map((category) => [
          category.id,
          state.entries.filter((entry) => entry.category === category.id)
        ])
      ) as Record<ActivityCategory, Scope12Entry[]>,
    [state.entries]
  );

  function updateState(patch: Partial<Scope12CollectionState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function updateLocation(id: string, patch: Partial<Scope12Location>) {
    setState((current) => ({
      ...current,
      locations: current.locations.map((location) =>
        location.id === id ? { ...location, ...patch } : location
      )
    }));
  }

  function updateEntry(id: string, patch: Partial<Scope12Entry>) {
    setState((current) => ({
      ...current,
      entries: current.entries.map((entry) =>
        entry.id === id ? { ...entry, ...patch } : entry
      )
    }));
  }

  function addLocation() {
    setState((current) => ({
      ...current,
      locations: [...current.locations, createLocation()]
    }));
  }

  function removeLocation(id: string) {
    setState((current) => ({
      ...current,
      locations: current.locations.filter((item) => item.id !== id),
      entries: current.entries.filter((entry) => entry.locationId !== id)
    }));
  }

  function addEntry(category: ActivityCategory) {
    setState((current) => ({
      ...current,
      entries: [...current.entries, createEntry(category)]
    }));
  }

  function removeEntry(id: string) {
    setState((current) => ({
      ...current,
      entries: current.entries.filter((item) => item.id !== id)
    }));
  }

  function exportCsv() {
    const csv = buildScope12Csv(state, "en");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = getCsvFilename(state, "en");
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(href);
  }

  function reset() {
    const confirmed = window.confirm(
      "Reset this workspace? Your saved Scope 1 and Scope 2 data in this browser will be cleared."
    );
    if (!confirmed) return;
    window.localStorage.removeItem(EN_SCOPE12_COLLECTION_STORAGE_KEY);
    setState(createEmptyScope12State());
  }

  return (
    <section className="scope12-data-tool scroll-mt-28" id="scope12-workspace">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">Interactive workspace</p>
        <h2 className="font-display mt-5 text-[clamp(2.5rem,5.2vw,4.7rem)] leading-none text-ink">
          Scope 1 and Scope 2 data workspace
        </h2>
        <p className="mt-5 text-lg leading-8 text-muted">
          {progressText}. Progress is saved locally in this browser.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-[#df6100]" onClick={exportCsv} type="button">
            <Download aria-hidden="true" className="h-4 w-4" />
            Export CSV
          </button>
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(21,21,21,0.2)] px-5 py-3 text-sm font-bold text-ink transition hover:border-orange hover:text-orange" onClick={() => window.print()} type="button">
            <Printer aria-hidden="true" className="h-4 w-4" />
            Print
          </button>
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(21,21,21,0.2)] px-5 py-3 text-sm font-bold text-ink transition hover:border-orange hover:text-orange" onClick={reset} type="button">
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        <section className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8">
          <h3 className="font-display text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink">
            Boundary and reporting period
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <TextField id="scope12-company" label="Company or internal label" onChange={(companyLabel) => updateState({ companyLabel })} value={state.companyLabel} />
            <TextField id="scope12-period-start" label="Period from" onChange={(periodStart) => updateState({ periodStart })} type="date" value={state.periodStart} />
            <TextField id="scope12-period-end" label="Period to" onChange={(periodEnd) => updateState({ periodEnd })} type="date" value={state.periodEnd} />
          </div>
        </section>

        <section className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-display text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink">
                Sites
              </h3>
              <p className="mt-4 max-w-3xl leading-7 text-muted">
                Define which sites belong to the data collection and mark which activity-data modules apply.
              </p>
            </div>
            <button className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#df6100]" onClick={addLocation} type="button">
              <Plus aria-hidden="true" className="h-4 w-4" />
              Add site
            </button>
          </div>
          <div className="mt-6 grid gap-4">
            {state.locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onRemove={() => removeLocation(location.id)}
                onUpdate={(patch) => updateLocation(location.id, patch)}
              />
            ))}
          </div>
        </section>

        {categoryDefinitions.map((category) => (
          <section className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8" key={category.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                  Scope {category.scope}
                </p>
                <h3 className="font-display mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink">
                  {categoryLabels[category.id]}
                </h3>
              </div>
              <button className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#df6100]" onClick={() => addEntry(category.id)} type="button">
                <Plus aria-hidden="true" className="h-4 w-4" />
                Add entry
              </button>
            </div>
            <div className="mt-6 grid gap-4">
              {entriesByCategory[category.id].map((entry) => (
                <EntryCard
                  entry={entry}
                  key={entry.id}
                  locations={state.locations}
                  onRemove={() => removeEntry(entry.id)}
                  onUpdate={(patch) => updateEntry(entry.id, patch)}
                />
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8">
          <h3 className="font-display text-[clamp(2rem,4vw,3.35rem)] leading-none text-ink">
            Source completeness checks
          </h3>
          <div className="mt-6 grid gap-4">
            {sourceCompletenessChecks.map((check, index) => (
              <fieldset className="border-t border-[rgba(21,21,21,0.1)] pt-4" key={check.id}>
                <legend className="font-bold leading-6 text-ink">
                  {String(index + 1).padStart(2, "0")} - {sourceCheckCopy[check.id].title}
                </legend>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {sourceCheckCopy[check.id].statement}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {answerOptions.map((option) => (
                    <label className="inline-flex min-h-10 cursor-pointer items-center rounded-full border border-[rgba(21,21,21,0.14)] px-3 py-2 text-xs font-bold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange" key={option.value}>
                      <input
                        checked={state.sourceChecks[check.id] === option.value}
                        className="mr-2 h-4 w-4 accent-[var(--orange)]"
                        name={`source-check-${check.id}`}
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
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </section>
      </div>
      <PrintSummary state={state} />
    </section>
  );
}
