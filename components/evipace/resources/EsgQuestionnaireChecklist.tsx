"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Printer, RotateCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import {
  allChecklistItemIds,
  allChecklistItems,
  CHECKLIST_STORAGE_KEY,
  checklistSections,
  checklistStatuses,
  finalSubmissionGateItems,
  type ChecklistItem
} from "./esg-questionnaire-checklist-data";
import {
  EN_CHECKLIST_STORAGE_KEY,
  englishAllChecklistItemIds,
  englishAllChecklistItems,
  englishChecklistSections,
  englishChecklistStatuses,
  englishFinalSubmissionGateItems
} from "./esg-questionnaire-checklist-en-data";

type CheckedState = Record<string, boolean>;
type ChecklistLocale = "de" | "en";

const englishSectionResources: Partial<
  Record<string, { href: string; label: string }[]>
> = {
  owners: [{ href: "/en/resources/esg-data-owners", label: "Map ESG data owners" }],
  "environment-emissions": [
    {
      href: "/en/resources/scope-1-2-data-calculation",
      label: "Scope 1 & 2 data you need"
    },
    {
      href: "/en/resources/scope-1-2-3-explained",
      label: "Scope 1, 2 and 3 explained"
    }
  ],
  evidence: [
    {
      href: "/en/resources/esg-evidence-for-suppliers",
      label: "Understand ESG evidence"
    },
    {
      href: "/en/resources/esg-evidence-readiness-check",
      label: "Check one evidence document"
    }
  ],
  reuse: [
    {
      href: "/en/resources/vsme-data-sustainability-report",
      label: "Prepare reusable VSME data"
    }
  ]
};

const sectionResources: Partial<Record<string, { href: string; label: string }[]>> = {
  owners: [
    {
      href: "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
      label: "ESG Data Owner und Verantwortliche vertiefen"
    }
  ],
  "environment-emissions": [
    {
      href: "/de/ressourcen/scope-1-2-daten-berechnung",
      label: "Scope 1 & 2: benötigte Ausgangsdaten"
    },
    {
      href: "/de/ressourcen/scope-1-2-3-einfach-erklaert",
      label: "Scope 1, 2 und 3 einfach erklärt"
    }
  ],
  evidence: [
    {
      href: "/de/ressourcen/esg-nachweise-lieferanten",
      label: "ESG-Nachweise für Lieferanten vertiefen"
    },
    {
      href: "/de/ressourcen/ecovadis-dokumente-nachweise",
      label: "EcoVadis-Dokumente und Nachweise"
    }
  ],
  "platform-rules": [
    {
      href: "/de/ressourcen/integritynext-einladung-lieferanten",
      label: "IntegrityNext für Lieferanten"
    }
  ],
  reuse: [
    {
      href: "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
      label: "VSME-Datenerfassung als wiederverwendbare Grundlage"
    }
  ]
};

function parseStoredState(
  rawValue: string | null,
  validItemIds: ReadonlySet<string>
): CheckedState {
  if (!rawValue) return {};

  try {
    const parsed: unknown = JSON.parse(rawValue);
    const candidateIds =
      typeof parsed === "object" && parsed !== null && "checkedIds" in parsed
        ? (parsed as { checkedIds?: unknown }).checkedIds
        : undefined;

    if (!Array.isArray(candidateIds)) return {};

    return candidateIds.reduce<CheckedState>((state, candidate) => {
      if (typeof candidate === "string" && validItemIds.has(candidate)) {
        state[candidate] = true;
      }
      return state;
    }, {});
  } catch {
    return {};
  }
}

function CheckboxRow({
  checked,
  item,
  onToggle
}: {
  checked: boolean;
  item: ChecklistItem;
  onToggle: (id: string) => void;
}) {
  const inputId = `esg-checklist-${item.id}`;
  const detailId = `${inputId}-detail`;

  return (
    <div
      className={`checklist-item group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 border-t border-[rgba(21,21,21,0.1)] py-4 first:border-t-0 ${
        checked ? "checklist-item--checked" : ""
      }`}
    >
      <div className="relative flex min-h-11 items-start justify-center pt-0.5">
        <input
          aria-describedby={item.detail ? detailId : undefined}
          checked={checked}
          className="checklist-checkbox h-6 w-6 cursor-pointer rounded border-[rgba(21,21,21,0.35)] accent-[var(--orange)]"
          id={inputId}
          onChange={() => onToggle(item.id)}
          type="checkbox"
        />
        <span
          aria-hidden="true"
          className={`checklist-print-box ${checked ? "checklist-print-box--checked" : ""}`}
        >
          {checked ? "✓" : ""}
        </span>
      </div>
      <div className="min-w-0 pt-0.5">
        <label
          className="block cursor-pointer pr-1 font-semibold leading-6 text-ink"
          htmlFor={inputId}
        >
          {item.label}
        </label>
        {item.detail ? (
          <p className="mt-1 text-sm leading-6 text-muted" id={detailId}>
            {item.detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ProgressBar({
  completed,
  locale,
  total
}: {
  completed: number;
  locale: ChecklistLocale;
  total: number;
}) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div
      aria-label={
        locale === "en"
          ? "Overall progress for the ESG questionnaire checklist"
          : "Gesamtfortschritt der ESG-Fragebogen-Checkliste"
      }
      aria-valuemax={total}
      aria-valuemin={0}
      aria-valuenow={completed}
      aria-valuetext={
        locale === "en"
          ? `${completed} of ${total} items complete`
          : `${completed} von ${total} Punkten erledigt`
      }
      className="mt-6"
      role="progressbar"
    >
      <div className="h-3 overflow-hidden rounded-full border border-white/20 bg-white/10">
        <div
          className="h-full rounded-full bg-orange transition-[width] duration-200"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-sm font-semibold text-white/62">
        {locale === "en" ? `${percentage}% complete` : `${percentage}% bearbeitet`}
      </p>
    </div>
  );
}

export function EsgQuestionnaireChecklist({
  locale = "de"
}: {
  locale?: ChecklistLocale;
}) {
  const isEnglish = locale === "en";
  const storageKey = isEnglish ? EN_CHECKLIST_STORAGE_KEY : CHECKLIST_STORAGE_KEY;
  const itemIds = isEnglish ? englishAllChecklistItemIds : allChecklistItemIds;
  const items = isEnglish ? englishAllChecklistItems : allChecklistItems;
  const sections = isEnglish ? englishChecklistSections : checklistSections;
  const statuses = isEnglish ? englishChecklistStatuses : checklistStatuses;
  const finalGateItems = isEnglish
    ? englishFinalSubmissionGateItems
    : finalSubmissionGateItems;
  const resources = isEnglish ? englishSectionResources : sectionResources;
  const validItemIds = useMemo(() => new Set(itemIds), [itemIds]);
  const [checkedItems, setCheckedItems] = useState<CheckedState>({});
  const [storageLoaded, setStorageLoaded] = useState(false);

  useEffect(() => {
    const storedState = parseStoredState(
      window.localStorage.getItem(storageKey),
      validItemIds
    );

    queueMicrotask(() => {
      setCheckedItems(storedState);
      setStorageLoaded(true);
    });
  }, [storageKey, validItemIds]);

  useEffect(() => {
    if (!storageLoaded) return;

    const checkedIds = itemIds.filter((id) => checkedItems[id]);

    try {
      if (checkedIds.length === 0) {
        window.localStorage.removeItem(storageKey);
      } else {
        window.localStorage.setItem(
          storageKey,
          JSON.stringify({ checkedIds })
        );
      }
    } catch {
      // The checklist remains usable if storage is unavailable or full.
    }
  }, [checkedItems, itemIds, storageKey, storageLoaded]);

  const completedCount = useMemo(
    () => itemIds.filter((id) => checkedItems[id]).length,
    [checkedItems, itemIds]
  );
  const totalCount = items.length;
  const isComplete = completedCount === totalCount;

  function toggleItem(itemId: string) {
    setCheckedItems((current) => ({
      ...current,
      [itemId]: !current[itemId]
    }));
  }

  function resetChecklist() {
    const confirmed = window.confirm(
      isEnglish
        ? "Reset this checklist? Your saved progress in this browser will be cleared."
        : "Möchten Sie wirklich alle Häkchen dieser Checkliste zurücksetzen?"
    );

    if (!confirmed) return;

    window.localStorage.removeItem(storageKey);
    setCheckedItems({});
  }

  return (
    <div className="esg-checklist-tool" id="checkliste">
      <section
        aria-labelledby="checklist-progress-title"
        className="checklist-progress-panel scroll-mt-28 overflow-hidden rounded-[1.35rem] bg-ink p-6 text-white shadow-premium sm:p-8 lg:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              {isEnglish ? "Checklist status" : "Checklist Status"}
            </p>
            <h2
              className="font-display mt-4 text-[clamp(2.25rem,5vw,4.4rem)] leading-none"
              id="checklist-progress-title"
            >
              {isEnglish ? "Your progress" : "Ihr Fortschritt"}
            </h2>
            <p
              aria-live="polite"
              className="mt-5 text-lg font-bold text-white sm:text-xl"
            >
              {isEnglish
                ? `${completedCount} of ${totalCount} items complete`
                : `${completedCount} von ${totalCount} Punkten erledigt`}
            </p>
            <ProgressBar completed={completedCount} locale={locale} total={totalCount} />
            {isComplete ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-4 py-2 text-sm font-bold text-white">
                <Check aria-hidden="true" className="h-4 w-4 text-orange" />
                {isEnglish ? "Checklist complete." : "Checkliste vollständig bearbeitet."}
              </p>
            ) : null}
          </div>

          <div className="checklist-screen-controls flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-[#df6100]"
              onClick={() => window.print()}
              type="button"
            >
              <Printer aria-hidden="true" className="h-4 w-4" />
              {isEnglish ? "Print checklist" : "Checkliste drucken"}
            </button>
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-orange hover:text-orange"
              onClick={resetChecklist}
              type="button"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              {isEnglish ? "Reset checklist" : "Checkliste zurücksetzen"}
            </button>
          </div>
        </div>

        <p className="mt-7 flex max-w-3xl items-start gap-2 border-t border-white/15 pt-5 text-xs leading-5 text-white/55">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
          {isEnglish
            ? "Your progress is saved locally in this browser. No account is required."
            : "Ihr Fortschritt wird nur lokal in diesem Browser gespeichert und nicht an evipace übertragen."}
        </p>
      </section>

      <div className="mt-10 grid gap-6 sm:mt-12">
        {sections.map((section) => {
          const sectionItems = section.groups.flatMap((group) => group.items);
          const sectionCompleted = sectionItems.filter(
            (item) => checkedItems[item.id]
          ).length;

          return (
            <section
              aria-labelledby={`${section.id}-title`}
              className="checklist-section scroll-mt-28 rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-9"
              id={section.id}
              key={section.id}
            >
              <div className="flex flex-col gap-4 border-b border-[rgba(21,21,21,0.11)] pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold tracking-[0.14em] text-orange">
                    {section.number}
                  </p>
                  <h2
                    className="font-display mt-3 break-words text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]"
                    id={`${section.id}-title`}
                  >
                    {section.title}
                  </h2>
                  <p className="mt-4 max-w-2xl leading-7 text-muted">
                    {section.intro}
                  </p>
                </div>
                <p className="shrink-0 rounded-full border border-[rgba(254,112,1,0.25)] bg-[var(--soft-orange)] px-3 py-1.5 text-xs font-bold text-[#a84800]">
                  <span className="sr-only">
                    {isEnglish
                      ? `Progress in ${section.title}: `
                      : `Fortschritt in ${section.title}: `}
                  </span>
                  {sectionCompleted}/{sectionItems.length}
                </p>
              </div>

              <div className="mt-2">
                {section.id === "triage" ? (
                  <div
                    className="my-5 flex flex-wrap gap-2"
                    aria-label={isEnglish ? "Question work status" : "Arbeitsstatus für Fragen"}
                  >
                    {statuses.map((status) => (
                      <span
                        className="rounded-full border border-[rgba(21,21,21,0.14)] bg-[var(--paper)] px-3 py-1.5 text-xs font-bold text-ink"
                        key={status}
                      >
                        {status}
                      </span>
                    ))}
                  </div>
                ) : null}

                {section.groups.map((group, groupIndex) => (
                  <div
                    className={groupIndex === 0 ? "" : "mt-7"}
                    key={group.title ?? `${section.id}-${groupIndex}`}
                  >
                    {group.title ? (
                      <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-orange">
                        {group.title}
                      </h3>
                    ) : null}
                    <div>
                      {group.items.map((item) => (
                        <CheckboxRow
                          checked={Boolean(checkedItems[item.id])}
                          item={item}
                          key={item.id}
                          onToggle={toggleItem}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {section.notes?.length ? (
                <div className="mt-6 grid gap-3 rounded-[1rem] bg-[var(--paper)] p-5 text-sm leading-6 text-muted">
                  {section.notes.map((note, noteIndex) => (
                    <p key={`${section.id}-note-${noteIndex}`}>{note}</p>
                  ))}
                </div>
              ) : null}

              {section.gate ? (
                <aside className="checklist-gate mt-6 border-l-4 border-orange bg-ink p-5 text-white sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                    {section.gate.label}
                  </p>
                  <p className="mt-3 font-display text-2xl leading-tight">
                    {section.gate.text}
                  </p>
                </aside>
              ) : null}

              {resources[section.id] ? (
                <div className="checklist-screen-controls mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-ink">
                  {resources[section.id]?.map((resource) => (
                    <Link
                      className="underline decoration-[rgba(254,112,1,0.5)] underline-offset-4 transition hover:text-orange"
                      href={resource.href}
                      key={resource.href}
                    >
                      {resource.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      <section
        aria-labelledby="final-submission-gate-title"
        className="checklist-final-gate mt-10 scroll-mt-28 overflow-hidden rounded-[1.35rem] border border-[rgba(254,112,1,0.32)] bg-ink p-6 text-white shadow-premium sm:mt-12 sm:p-9 lg:p-12"
        id="final-submission-gate"
      >
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
          {isEnglish ? "Final submission gate" : "Final Submission Gate"}
        </p>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="font-display max-w-[18ch] text-[clamp(2.4rem,5vw,4.5rem)] leading-none"
              id="final-submission-gate-title"
            >
              {isEnglish
                ? "Is the ESG questionnaire ready to submit?"
                : "Ist der ESG-Fragebogen bereit zur Einreichung?"}
            </h2>
          </div>
          <p className="w-fit shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold">
            {finalGateItems.filter((item) => checkedItems[item.id]).length}/
            {finalGateItems.length}
          </p>
        </div>
        <div className="mt-8 rounded-[1rem] bg-white p-5 text-ink sm:p-7">
          {finalGateItems.map((item, index) => (
            <div key={item.id}>
              <p className="mb-1 font-mono text-[0.65rem] font-bold tracking-[0.12em] text-orange">
                {String(index + 1).padStart(2, "0")}
              </p>
              <CheckboxRow
                checked={Boolean(checkedItems[item.id])}
                item={item}
                onToggle={toggleItem}
              />
            </div>
          ))}
        </div>
        <div className="mt-7 max-w-3xl text-sm leading-7 text-white/65">
          <p>
            {isEnglish
              ? "When all six points are checked, the request is internally prepared for submission."
              : "Sind alle sechs Punkte geprüft, ist die Anfrage intern zur Einreichung vorbereitet."}
          </p>
          <p className="mt-3">
            {isEnglish
              ? "This does not guarantee customer acceptance, platform acceptance, a score, approval or legal compliance. It only means the internal preparation process has been completed."
              : "Das garantiert weder Kunden- oder Plattformakzeptanz noch Score, Freigabe oder rechtliche Compliance. Es bedeutet ausschließlich, dass der interne Vorbereitungsprozess vollständig bearbeitet wurde."}
          </p>
        </div>
      </section>
    </div>
  );
}
