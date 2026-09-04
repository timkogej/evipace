"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  CircleHelp,
  FileText,
  Printer,
  RotateCcw
} from "lucide-react";
import {
  EVIDENCE_READINESS_STORAGE_KEY,
  allEvidenceChecks,
  evidenceSections,
  evidenceTypes,
  getEvidenceTypeLabel,
  getNextSteps,
  getReadinessStatus,
  getRedFlags,
  getSectionProgress,
  getSummaryCounts,
  getUnresolvedItems,
  parseStoredReadinessState,
  serializeReadinessState,
  type AnswerValue,
  type AnswersState,
  type EvidenceCheck,
  type EvidenceTypeId,
  type ReadinessState,
  type SummaryCounts
} from "./esg-evidence-readiness-data";
import {
  EN_EVIDENCE_READINESS_STORAGE_KEY,
  englishEvidenceReadinessSections,
  englishEvidenceTypes,
  getEnglishEvidenceTypeLabel,
  getEnglishNextSteps,
  getEnglishReadinessStatus,
  getEnglishRedFlags,
  getEnglishUnresolvedItems
} from "./esg-evidence-readiness-en-data";

type ToolLocale = "de" | "en";

function getAnswerOptions(locale: ToolLocale): Array<{
  value: AnswerValue;
  label: string;
  description: string;
}> {
  if (locale === "en") {
    return [
      {
        value: "yes",
        label: "Yes",
        description: "This point is checked and traceably met."
      },
      {
        value: "unclear",
        label: "Unclear",
        description:
          "You cannot confirm this point with the information currently available."
      },
      {
        value: "no",
        label: "No",
        description: "This point is not met or there is a visible gap."
      },
      {
        value: "na",
        label: "Not applicable",
        description: "This point is not applicable to the evidence being checked."
      }
    ];
  }
  return [
  {
    value: "yes",
    label: "Ja",
    description: "Der Punkt ist geprüft und nachvollziehbar erfüllt."
  },
  {
    value: "unclear",
    label: "Unklar",
    description:
      "Sie können den Punkt mit den aktuell verfügbaren Informationen nicht sicher bestätigen."
  },
  {
    value: "no",
    label: "Nein",
    description:
      "Der Punkt ist nicht erfüllt oder es besteht eine erkennbare Lücke."
  },
  {
    value: "na",
    label: "Nicht relevant",
    description: "Dieser Punkt ist für den geprüften Nachweis nicht relevant."
  }
  ];
}

const emptyState: ReadinessState = {
  evidenceLabel: "",
  answers: {}
};

function answerLabel(answer: AnswerValue | undefined, locale: ToolLocale): string {
  if (locale === "en") {
    if (answer === "yes") return "Yes";
    if (answer === "unclear") return "Unclear";
    if (answer === "no") return "No";
    if (answer === "na") return "Not applicable";
    return "Not answered";
  }
  if (answer === "yes") return "Ja";
  if (answer === "unclear") return "Unklar";
  if (answer === "no") return "Nein";
  if (answer === "na") return "Nicht relevant";
  return "Nicht beantwortet";
}

function ProgressBar({
  counts,
  label,
  locale = "de"
}: {
  counts: SummaryCounts;
  label: string;
  locale?: ToolLocale;
}) {
  const width =
    counts.relevant === 0
      ? 0
      : Math.round((counts.answeredRelevant / counts.relevant) * 100);

  return (
    <div
      aria-label={label}
      aria-valuemax={counts.relevant}
      aria-valuemin={0}
      aria-valuenow={counts.answeredRelevant}
      aria-valuetext={
        locale === "en"
          ? `${counts.answeredRelevant} of ${counts.relevant} checks answered`
          : `${counts.answeredRelevant} von ${counts.relevant} Punkten beantwortet`
      }
      className="mt-4"
      role="progressbar"
    >
      <div className="h-2.5 overflow-hidden rounded-full border border-[rgba(21,21,21,0.14)] bg-white">
        <div
          className="h-full rounded-full bg-orange transition-[width] duration-200 motion-reduce:transition-none"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function SummaryPanel({
  answers,
  counts,
  evidenceLabel,
  evidenceType,
  locale,
  onPrint,
  onRedFlagLink,
  onResetRequest
}: {
  answers: AnswersState;
  counts: SummaryCounts;
  evidenceLabel: string;
  evidenceType?: EvidenceTypeId;
  locale: ToolLocale;
  onPrint: () => void;
  onRedFlagLink: (checkId: string) => void;
  onResetRequest: () => void;
}) {
  const isEnglish = locale === "en";
  const status = isEnglish
    ? getEnglishReadinessStatus(answers)
    : getReadinessStatus(answers);
  const redFlags = isEnglish
    ? getEnglishRedFlags(answers, evidenceType)
    : getRedFlags(answers, evidenceType);
  const unresolvedItems = isEnglish
    ? getEnglishUnresolvedItems(answers)
    : getUnresolvedItems(answers);
  const nextSteps = isEnglish
    ? getEnglishNextSteps(answers, evidenceType)
    : getNextSteps(answers, evidenceType);

  return (
    <aside className="evidence-screen-panel evidence-screen-only lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-[1.15rem] border border-[rgba(21,21,21,0.13)] bg-white p-5 shadow-[0_20px_65px_rgba(21,21,21,0.06)] sm:p-6">
        <div className="flex items-start gap-3">
          <FileText aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-orange">
              {isEnglish ? "Current evidence" : "Aktueller Nachweis"}
            </p>
            <p className="mt-2 break-words text-sm font-bold leading-6 text-ink">
              {evidenceLabel.trim() ||
                (isEnglish
                  ? getEnglishEvidenceTypeLabel(evidenceType)
                  : getEvidenceTypeLabel(evidenceType))}
            </p>
            {evidenceLabel.trim() ? (
              <p className="mt-1 text-xs leading-5 text-muted">
                {isEnglish
                  ? getEnglishEvidenceTypeLabel(evidenceType)
                  : getEvidenceTypeLabel(evidenceType)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6 border-t border-[rgba(21,21,21,0.1)] pt-5">
          <p className="text-sm font-bold text-ink">
            {isEnglish
              ? `${counts.answeredRelevant} of ${counts.relevant} checks answered`
              : `${counts.answeredRelevant} von ${counts.relevant} Punkten beantwortet`}
          </p>
          <ProgressBar
            counts={counts}
            locale={locale}
            label={
              isEnglish
                ? "Overall progress for the ESG evidence readiness check"
                : "Gesamtfortschritt des ESG Evidence Readiness Checks"
            }
          />
        </div>

        <div className="mt-6 rounded-[0.9rem] bg-[var(--paper)] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange">
            Status
          </p>
          <h3 className="mt-2 text-lg font-bold leading-tight text-ink">
            {status.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">{status.copy}</p>
          {status.completed ? (
            <p className="mt-3 text-xs leading-5 text-[rgba(21,21,21,0.56)]">
              {isEnglish
                ? "This check does not assess legal compliance, assurance or acceptance by a customer, platform or auditor."
                : "Diese Checkliste bewertet weder rechtliche Konformität noch die Akzeptanz durch einen bestimmten Kunden, eine Plattform oder einen Prüfer."}
            </p>
          ) : null}
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-2 text-sm">
          {[
            [isEnglish ? "Checks" : "Prüfpunkte", counts.relevant],
            [isEnglish ? "Yes" : "Erfüllt", counts.yes],
            [isEnglish ? "Unclear" : "Unklar", counts.unclear],
            [isEnglish ? "No" : "Nicht erfüllt", counts.no]
          ].map(([label, value]) => (
            <div className="rounded-[0.75rem] border border-[rgba(21,21,21,0.1)] p-3" key={label}>
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
                {label}
              </dt>
              <dd className="font-display mt-1 text-2xl leading-none text-ink">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        {counts.na > 0 ? (
          <p className="mt-2 text-xs font-semibold text-muted">
            {isEnglish
              ? `${counts.na} check${counts.na === 1 ? "" : "s"} not applicable`
              : `${counts.na} Punkt${counts.na === 1 ? "" : "e"} nicht relevant`}
          </p>
        ) : null}

        <div className="mt-6 border-t border-[rgba(21,21,21,0.1)] pt-5">
          <h3 className="text-sm font-bold text-ink">
            {isEnglish ? "Open points" : "Offene Punkte"}
          </h3>
          {redFlags.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {redFlags.slice(0, 5).map((flag) => (
                <li className="rounded-[0.8rem] border border-orange/25 bg-[var(--soft-orange)] p-3" key={`${flag.checkId}-${flag.title}`}>
                  <p className="text-sm font-bold leading-5 text-ink">{flag.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{flag.copy}</p>
                  <a
                    className="mt-2 inline-flex text-xs font-bold text-orange underline underline-offset-4"
                    href={`#evidence-check-${flag.checkId}`}
                    onClick={() => onRedFlagLink(flag.checkId)}
                  >
                    {isEnglish ? `Go to check ${Number(flag.checkId)} ->` : `Zu Punkt ${Number(flag.checkId)} →`}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm leading-6 text-muted">
              {isEnglish
                ? "No red flags from the current answers."
                : "Keine Red Flags aus den bisherigen Antworten."}
            </p>
          )}
          {redFlags.length > 5 ? (
            <p className="mt-2 text-xs font-semibold text-muted">
              {isEnglish
                ? `${redFlags.length - 5} more open points in the overview.`
                : `${redFlags.length - 5} weitere offene Punkte in der Übersicht.`}
            </p>
          ) : null}
        </div>

        <div className="mt-6 border-t border-[rgba(21,21,21,0.1)] pt-5">
          <h3 className="text-sm font-bold text-ink">
            {isEnglish ? "Still to clarify" : "Noch zu klären"}
          </h3>
          {unresolvedItems.length > 0 ? (
            <>
              <p className="mt-2 text-sm leading-6 text-muted">
                {isEnglish
                  ? `You could not clearly confirm ${unresolvedItems.length} check${unresolvedItems.length === 1 ? "" : "s"} yet.`
                  : `Sie konnten ${unresolvedItems.length} Punkt${unresolvedItems.length === 1 ? "" : "e"} noch nicht eindeutig bestätigen.`}
              </p>
              <ul className="mt-3 space-y-2">
                {unresolvedItems.slice(0, 4).map((item) => (
                  <li className="text-xs font-semibold leading-5 text-muted" key={item.checkId}>
                    {isEnglish
                      ? `Check ${Number(item.checkId)}: ${item.critical ? "critical" : "detail to review"}`
                      : `Punkt ${Number(item.checkId)}: ${item.critical ? "wesentlich" : "Detail prüfen"}`}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-2 text-sm leading-6 text-muted">
              {isEnglish
                ? "No checks marked unclear."
                : "Keine als unklar markierten Punkte."}
            </p>
          )}
        </div>

        {status.completed ? (
          <div className="mt-6 border-t border-[rgba(21,21,21,0.1)] pt-5">
            <h3 className="text-sm font-bold text-ink">
              {isEnglish ? "What to do next" : "Was Sie als Nächstes tun sollten"}
            </h3>
            <ul className="mt-3 space-y-3">
              {nextSteps.slice(0, 3).map((step) => (
                <li className="text-sm leading-6 text-muted" key={step.id}>
                  <span className="font-bold text-ink">{step.title}: </span>
                  {step.copy}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6 grid gap-2 border-t border-[rgba(21,21,21,0.1)] pt-5">
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-[#df6100]"
            onClick={onPrint}
            type="button"
          >
            <Printer aria-hidden="true" className="h-4 w-4" />
            {isEnglish ? "Print overview" : "Übersicht drucken"}
          </button>
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(21,21,21,0.2)] px-5 py-3 text-sm font-bold text-ink transition hover:border-orange hover:text-orange"
            onClick={onResetRequest}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            {isEnglish ? "Reset check" : "Prüfung zurücksetzen"}
          </button>
        </div>
      </div>
    </aside>
  );
}

function CheckRow({
  answer,
  check,
  locale,
  onAnswer
}: {
  answer: AnswerValue | undefined;
  check: EvidenceCheck;
  locale: ToolLocale;
  onAnswer: (id: string, value: AnswerValue) => void;
}) {
  const legendId = `evidence-check-${check.id}-legend`;
  const helperId = check.helper ? `evidence-check-${check.id}-helper` : undefined;
  const availableOptions = check.allowNotRelevant
    ? getAnswerOptions(locale)
    : getAnswerOptions(locale).filter((option) => option.value !== "na");

  return (
    <fieldset
      aria-describedby={helperId}
      aria-labelledby={legendId}
      className="evidence-check scroll-mt-28 border-t border-[rgba(21,21,21,0.11)] py-5 first:border-t-0"
      id={`evidence-check-${check.id}`}
      tabIndex={-1}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] xl:items-start">
        <div className="min-w-0">
          <p className="font-mono text-[0.7rem] font-bold tracking-[0.12em] text-orange">
            Punkt {check.id}
          </p>
          <legend
            className="mt-2 block break-words text-base font-bold leading-7 text-ink"
            id={legendId}
          >
            {check.question}
          </legend>
          {check.helper ? (
            <p className="mt-2 text-sm leading-6 text-muted" id={helperId}>
              {check.helper}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
          {availableOptions.map((option) => {
            const inputId = `evidence-check-${check.id}-${option.value}`;
            const isSecondary = option.value === "na";

            return (
              <label
                className={`group relative flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[0.75rem] border px-3 py-3 text-sm font-bold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange ${
                  answer === option.value
                    ? "border-orange bg-[var(--soft-orange)] text-ink"
                    : "border-[rgba(21,21,21,0.14)] bg-white text-ink hover:border-orange/45"
                } ${isSecondary ? "sm:col-span-3 xl:col-span-1" : ""}`}
                htmlFor={inputId}
                key={option.value}
              >
                <input
                  checked={answer === option.value}
                  className="sr-only"
                  id={inputId}
                  name={`evidence-check-${check.id}`}
                  onChange={() => onAnswer(check.id, option.value)}
                  type="radio"
                  value={option.value}
                />
                <span>{option.label}</span>
                {answer === option.value ? (
                  <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-orange" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 rounded-full border border-[rgba(21,21,21,0.25)]"
                  />
                )}
                <span className="sr-only">{option.description}</span>
              </label>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}

function PrintSummary({
  answers,
  counts,
  evidenceLabel,
  evidenceType,
  locale
}: {
  answers: AnswersState;
  counts: SummaryCounts;
  evidenceLabel: string;
  evidenceType?: EvidenceTypeId;
  locale: ToolLocale;
}) {
  const isEnglish = locale === "en";
  const status = isEnglish
    ? getEnglishReadinessStatus(answers)
    : getReadinessStatus(answers);
  const redFlags = isEnglish
    ? getEnglishRedFlags(answers, evidenceType)
    : getRedFlags(answers, evidenceType);
  const unresolvedItems = isEnglish
    ? getEnglishUnresolvedItems(answers)
    : getUnresolvedItems(answers);
  const nextSteps = isEnglish
    ? getEnglishNextSteps(answers, evidenceType)
    : getNextSteps(answers, evidenceType);
  const printDate = new Intl.DateTimeFormat(isEnglish ? "en-US" : "de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date());

  return (
    <section
      className="evidence-print-summary"
      aria-label={isEnglish ? "Print summary" : "Druckübersicht"}
    >
      <h1>ESG Evidence Readiness Check</h1>
      <p>
        {isEnglish
          ? "Created with the Evipace ESG Evidence Readiness Check"
          : "Erstellt mit der Evipace ESG-Nachweise-Checkliste"}
      </p>
      <dl>
        <div>
          <dt>{isEnglish ? "Evidence" : "Nachweis"}</dt>
          <dd>
            {evidenceLabel.trim() ||
              (isEnglish ? "No internal label" : "Ohne interne Bezeichnung")}
          </dd>
        </div>
        <div>
          <dt>{isEnglish ? "Evidence type" : "Art des Nachweises"}</dt>
          <dd>
            {isEnglish
              ? getEnglishEvidenceTypeLabel(evidenceType)
              : getEvidenceTypeLabel(evidenceType)}
          </dd>
        </div>
        <div>
          <dt>{isEnglish ? "Print date" : "Druckdatum"}</dt>
          <dd>{printDate}</dd>
        </div>
        <div>
          <dt>{isEnglish ? "Result" : "Resultat"}</dt>
          <dd>{status.title}</dd>
        </div>
      </dl>
      <p>{status.copy}</p>
      <dl>
        <div>
          <dt>{isEnglish ? "Checks" : "Prüfpunkte"}</dt>
          <dd>{counts.relevant}</dd>
        </div>
        <div>
          <dt>{isEnglish ? "Yes" : "Erfüllt"}</dt>
          <dd>{counts.yes}</dd>
        </div>
        <div>
          <dt>{isEnglish ? "Unclear" : "Unklar"}</dt>
          <dd>{counts.unclear}</dd>
        </div>
        <div>
          <dt>{isEnglish ? "No" : "Nicht erfüllt"}</dt>
          <dd>{counts.no}</dd>
        </div>
      </dl>
      {counts.na > 0 ? (
        <p>
          {isEnglish
            ? `${counts.na} checks not applicable.`
            : `${counts.na} Punkte nicht relevant.`}
        </p>
      ) : null}

      {(isEnglish ? englishEvidenceReadinessSections : evidenceSections).map((section) => (
        <section key={section.id}>
          <h2>{section.number}. {section.title}</h2>
          <table>
            <thead>
              <tr>
                <th>{isEnglish ? "Check" : "Punkt"}</th>
                <th>{isEnglish ? "Question" : "Prüffrage"}</th>
                <th>{isEnglish ? "Answer" : "Antwort"}</th>
              </tr>
            </thead>
            <tbody>
              {section.checks
                .filter((check) => answers[check.id] !== "na")
                .map((check) => (
                  <tr key={check.id}>
                    <td>{check.id}</td>
                    <td>{check.question}</td>
                    <td>{answerLabel(answers[check.id], locale)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      ))}

      <section>
        <h2>{isEnglish ? "Open points" : "Offene Punkte"}</h2>
        {redFlags.length > 0 ? (
          <ul>
            {redFlags.map((flag) => (
              <li key={`${flag.checkId}-${flag.title}`}>
                <strong>{flag.title}:</strong> {flag.copy}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {isEnglish
              ? "No red flags from the current answers."
              : "Keine Red Flags aus den bisherigen Antworten."}
          </p>
        )}
      </section>

      <section>
        <h2>{isEnglish ? "Still to clarify" : "Noch zu klären"}</h2>
        {unresolvedItems.length > 0 ? (
          <ul>
            {unresolvedItems.map((item) => (
              <li key={item.checkId}>
                {isEnglish ? "Check" : "Punkt"} {item.checkId}: {item.label}
              </li>
            ))}
          </ul>
        ) : (
          <p>{isEnglish ? "No checks marked unclear." : "Keine als unklar markierten Punkte."}</p>
        )}
      </section>

      <section>
        <h2>{isEnglish ? "What to do next" : "Was Sie als Nächstes tun sollten"}</h2>
        <ul>
          {nextSteps.map((step) => (
            <li key={step.id}>
              <strong>{step.title}:</strong> {step.copy}
            </li>
          ))}
        </ul>
      </section>

      <p>
        {isEnglish
          ? "This check does not assess legal compliance, assurance or acceptance by a customer, platform or auditor."
          : "Diese Checkliste bewertet weder rechtliche Konformität noch die Akzeptanz durch einen bestimmten Kunden, eine Plattform oder einen Prüfer."}
      </p>
    </section>
  );
}

export function EsgEvidenceReadinessTool({
  locale = "de"
}: {
  locale?: ToolLocale;
}) {
  const isEnglish = locale === "en";
  const storageKey = isEnglish
    ? EN_EVIDENCE_READINESS_STORAGE_KEY
    : EVIDENCE_READINESS_STORAGE_KEY;
  const sections = isEnglish ? englishEvidenceReadinessSections : evidenceSections;
  const types = isEnglish ? englishEvidenceTypes : evidenceTypes;
  const [state, setState] = useState<ReadinessState>(emptyState);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const resetDialogRef = useRef<HTMLDialogElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const storedState = parseStoredReadinessState(
      window.localStorage.getItem(storageKey)
    );

    queueMicrotask(() => {
      setState(storedState);
      setStorageLoaded(true);
    });
  }, [storageKey]);

  useEffect(() => {
    if (!storageLoaded) return;

    try {
      const hasState =
        Boolean(state.evidenceType) ||
        state.evidenceLabel.trim().length > 0 ||
        Object.keys(state.answers).length > 0;

      if (!hasState) {
        window.localStorage.removeItem(storageKey);
        return;
      }

      window.localStorage.setItem(
        storageKey,
        serializeReadinessState(state)
      );
    } catch {
      // The tool remains usable if localStorage is blocked or full.
    }
  }, [state, storageKey, storageLoaded]);

  const counts = useMemo(() => getSummaryCounts(state.answers), [state.answers]);
  const status = useMemo(
    () =>
      isEnglish
        ? getEnglishReadinessStatus(state.answers)
        : getReadinessStatus(state.answers),
    [isEnglish, state.answers]
  );
  const redFlags = useMemo(
    () =>
      isEnglish
        ? getEnglishRedFlags(state.answers, state.evidenceType)
        : getRedFlags(state.answers, state.evidenceType),
    [isEnglish, state.answers, state.evidenceType]
  );
  const unresolvedItems = useMemo(
    () =>
      isEnglish
        ? getEnglishUnresolvedItems(state.answers)
        : getUnresolvedItems(state.answers),
    [isEnglish, state.answers]
  );
  const nextSteps = useMemo(
    () =>
      isEnglish
        ? getEnglishNextSteps(state.answers, state.evidenceType)
        : getNextSteps(state.answers, state.evidenceType),
    [isEnglish, state.answers, state.evidenceType]
  );

  function setEvidenceType(evidenceType: EvidenceTypeId) {
    setState((current) => ({ ...current, evidenceType }));
  }

  function setEvidenceLabel(evidenceLabel: string) {
    setState((current) => ({ ...current, evidenceLabel }));
  }

  function setAnswer(checkId: string, value: AnswerValue) {
    setState((current) => ({
      ...current,
      answers: {
        ...current.answers,
        [checkId]: value
      }
    }));
  }

  function focusCheck(checkId: string) {
    requestAnimationFrame(() => {
      const check = document.getElementById(`evidence-check-${checkId}`);
      check?.focus({ preventScroll: true });
    });
  }

  function openResetDialog() {
    resetButtonRef.current = document.activeElement as HTMLButtonElement;
    resetDialogRef.current?.showModal();
  }

  function closeResetDialog() {
    resetDialogRef.current?.close();
    resetButtonRef.current?.focus();
  }

  function confirmReset() {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Reset still clears in-memory state if localStorage is unavailable.
    }
    setState(emptyState);
    closeResetDialog();
  }

  return (
    <section
      aria-labelledby="evidence-tool-title"
      className="evidence-readiness-tool scroll-mt-28"
      id="nachweis-pruefen"
    >
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">{isEnglish ? "Interactive check" : "Interaktiver Check"}</p>
        <h2
          className="font-display mt-5 text-[clamp(2.5rem,5.2vw,4.7rem)] leading-none text-ink"
          id="evidence-tool-title"
        >
          {isEnglish
            ? "Take one specific evidence document."
            : "Nehmen Sie einen konkreten Nachweis zur Hand."}
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
          <p>
            {isEnglish
              ? "Choose an invoice, report, policy, certificate, calculation or internal data table. Then answer the 30 checks with Yes, Unclear or No."
              : "Wählen Sie beispielsweise eine Rechnung, einen Bericht, eine Richtlinie, einen Zertifikatsnachweis, eine Berechnung oder eine interne Datentabelle. Beantworten Sie anschließend die 30 Prüffragen mit Ja, Unklar oder Nein."}
          </p>
          <p>
            {isEnglish
              ? "The goal is not to label evidence as accepted or compliant. The check helps you find visible gaps before using the document in a customer questionnaire, ESG request or internal ESG file."
              : "Ziel ist nicht, einen Nachweis automatisch als „akzeptiert“ oder „konform“ einzustufen. Die Checkliste hilft Ihnen dabei, erkennbare Lücken zu finden, bevor Sie den Nachweis in einem Kundenfragebogen, einer ESG-Anfrage oder einer internen ESG-Dokumentation verwenden."}
          </p>
        </div>
      </div>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.3fr)] lg:items-start lg:gap-8">
        <section
          aria-labelledby="evidence-type-title"
          className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:col-start-1"
        >
          <fieldset>
            <legend
              className="font-display text-[clamp(2rem,4vw,3.3rem)] leading-none text-ink"
              id="evidence-type-title"
            >
              {isEnglish
                ? "What type of evidence are you checking?"
                : "Welche Art von Nachweis prüfen Sie?"}
            </legend>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {types.map((type) => {
                const inputId = `evidence-type-${type.id}`;
                return (
                  <label
                    className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[0.8rem] border px-4 py-3 text-sm font-bold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange ${
                      state.evidenceType === type.id
                        ? "border-orange bg-[var(--soft-orange)] text-ink"
                        : "border-[rgba(21,21,21,0.14)] bg-[var(--warm)] text-ink hover:border-orange/45"
                    }`}
                    htmlFor={inputId}
                    key={type.id}
                  >
                    <input
                      checked={state.evidenceType === type.id}
                      className="sr-only"
                      id={inputId}
                      name="evidence-type"
                      onChange={() => setEvidenceType(type.id)}
                      type="radio"
                      value={type.id}
                    />
                    <span>{type.label}</span>
                    {state.evidenceType === type.id ? (
                      <Check aria-hidden="true" className="h-4 w-4 text-orange" />
                    ) : null}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-7">
            <label className="block text-sm font-bold text-ink" htmlFor="evidence-label">
              {isEnglish ? "Internal evidence label - optional" : "Interne Bezeichnung des Nachweises – optional"}
            </label>
            <input
              className="mt-2 min-h-12 w-full rounded-[0.8rem] border border-[rgba(21,21,21,0.16)] bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-[rgba(21,21,21,0.35)] focus:border-orange focus:ring-2 focus:ring-orange/20"
              id="evidence-label"
              maxLength={160}
              onChange={(event) => setEvidenceLabel(event.target.value)}
              placeholder={
                isEnglish
                  ? "e.g. Ljubljana plant electricity invoice, May 2026"
                  : "z. B. Stromrechnung Werk Ljubljana, Mai 2026"
              }
              type="text"
              value={state.evidenceLabel}
            />
            <p className="mt-2 text-xs font-semibold leading-5 text-muted">
              {isEnglish
                ? "Used only for your current local check."
                : "Wird nur lokal für Ihre aktuelle Prüfung verwendet."}
            </p>
          </div>
        </section>

        <div className="lg:col-start-2 lg:row-span-2">
          <SummaryPanel
            answers={state.answers}
            counts={counts}
            evidenceLabel={state.evidenceLabel}
            evidenceType={state.evidenceType}
            locale={locale}
            onPrint={() => window.print()}
            onRedFlagLink={focusCheck}
            onResetRequest={openResetDialog}
          />
        </div>

        <div className="grid gap-6 lg:col-start-1">
          {sections.map((section) => {
            const sectionProgress = getSectionProgress(section, state.answers);

            return (
              <section
                aria-labelledby={`evidence-section-${section.id}-title`}
                className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 shadow-[0_18px_55px_rgba(21,21,21,0.045)] sm:p-7 lg:p-8"
                id={`evidence-section-${section.id}`}
                key={section.id}
              >
                <div className="flex flex-col gap-4 border-b border-[rgba(21,21,21,0.11)] pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-bold tracking-[0.14em] text-orange">
                      {isEnglish ? `Section ${section.number}` : `Abschnitt ${section.number}`}
                    </p>
                    <h3
                      className="font-display mt-3 break-words text-[clamp(2rem,4vw,3.35rem)] leading-[1.02] text-ink"
                      id={`evidence-section-${section.id}-title`}
                    >
                      {section.title}
                    </h3>
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
                    {isEnglish
                      ? `${sectionProgress.answeredRelevant} of ${sectionProgress.relevant} checked`
                      : `${sectionProgress.answeredRelevant} von ${sectionProgress.relevant} geprüft`}
                    {sectionProgress.unresolved > 0 ? (
                      <span>
                        {isEnglish
                          ? ` · ${sectionProgress.unresolved} open`
                          : ` · ${sectionProgress.unresolved} Punkt${sectionProgress.unresolved === 1 ? "" : "e"} offen`}
                      </span>
                    ) : null}
                  </p>
                </div>

                <div className="mt-2">
                  {section.checks.map((check) => (
                    <CheckRow
                      answer={state.answers[check.id]}
                      check={check}
                      locale={locale}
                      key={check.id}
                      onAnswer={setAnswer}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          <section
            aria-labelledby="evidence-result-title"
            className="rounded-[1.2rem] border border-orange/30 bg-[var(--soft-orange)] p-5 sm:p-7 lg:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a84800]">
              {isEnglish ? "Your evidence overview" : "Ihre Evidence-Übersicht"}
            </p>
            <h3
              className="font-display mt-4 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-none text-ink"
              id="evidence-result-title"
            >
              {status.title}
            </h3>
            <p className="mt-4 max-w-3xl leading-7 text-muted">{status.copy}</p>
            {status.completed ? (
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
                {isEnglish
                  ? "This check does not assess legal compliance, assurance or acceptance by a customer, platform or auditor."
                  : "Diese Checkliste bewertet weder rechtliche Konformität noch die Akzeptanz durch einen bestimmten Kunden, eine Plattform oder einen Prüfer."}
              </p>
            ) : null}

            <dl className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [isEnglish ? "Checks" : "Prüfpunkte", counts.relevant],
                [isEnglish ? "Yes" : "Erfüllt", counts.yes],
                [isEnglish ? "Unclear" : "Unklar", counts.unclear],
                [isEnglish ? "No" : "Nicht erfüllt", counts.no]
              ].map(([label, value]) => (
                <div className="rounded-[0.9rem] bg-white p-4" key={label}>
                  <dt className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
                    {label}
                  </dt>
                  <dd className="font-display mt-2 text-3xl leading-none text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            {counts.na > 0 ? (
              <p className="mt-3 text-sm font-semibold text-muted">
                {isEnglish
                  ? `${counts.na} check${counts.na === 1 ? "" : "s"} not applicable`
                  : `${counts.na} Punkt${counts.na === 1 ? "" : "e"} nicht relevant`}
              </p>
            ) : null}

            <div className="mt-8 grid gap-7 lg:grid-cols-2">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-ink">
                  <AlertTriangle aria-hidden="true" className="h-4 w-4 text-orange" />
                  {isEnglish ? "Open points" : "Offene Punkte"}
                </h4>
                {redFlags.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {redFlags.map((flag) => (
                      <li className="rounded-[0.85rem] bg-white p-4" key={`${flag.checkId}-${flag.title}`}>
                        <p className="font-bold leading-6 text-ink">{flag.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">{flag.copy}</p>
                        <a
                          className="mt-2 inline-flex text-sm font-bold text-orange underline underline-offset-4"
                          href={`#evidence-check-${flag.checkId}`}
                          onClick={() => focusCheck(flag.checkId)}
                        >
                          {isEnglish
                            ? `Go to check ${Number(flag.checkId)} ->`
                            : `Zu Punkt ${Number(flag.checkId)} →`}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {isEnglish
                      ? "No red flags from the current answers."
                      : "Keine Red Flags aus den bisherigen Antworten."}
                  </p>
                )}
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-ink">
                  <CircleHelp aria-hidden="true" className="h-4 w-4 text-orange" />
                  {isEnglish ? "Still to clarify" : "Noch zu klären"}
                </h4>
                {unresolvedItems.length > 0 ? (
                  <>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {isEnglish
                        ? `You could not clearly confirm ${unresolvedItems.length} check${unresolvedItems.length === 1 ? "" : "s"} yet.`
                        : `Sie konnten ${unresolvedItems.length} Punkt${unresolvedItems.length === 1 ? "" : "e"} noch nicht eindeutig bestätigen.`}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {unresolvedItems.map((item) => (
                        <li className="rounded-[0.85rem] bg-white p-4 text-sm leading-6 text-muted" key={item.checkId}>
                          <span className="font-bold text-ink">
                            {isEnglish ? "Check" : "Punkt"} {Number(item.checkId)}:
                          </span>{" "}
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {isEnglish
                      ? "No checks marked unclear."
                      : "Keine als unklar markierten Punkte."}
                  </p>
                )}
              </div>
            </div>

            {status.completed ? (
              <div className="mt-8 border-t border-orange/20 pt-7">
                <h4 className="text-sm font-bold text-ink">
                  {isEnglish ? "What to do next" : "Was Sie als Nächstes tun sollten"}
                </h4>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {nextSteps.map((step) => (
                    <article className="rounded-[0.85rem] bg-white p-4" key={step.id}>
                      <h5 className="font-bold leading-6 text-ink">{step.title}</h5>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {step.copy}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>

      <PrintSummary
        answers={state.answers}
        counts={counts}
        evidenceLabel={state.evidenceLabel}
        evidenceType={state.evidenceType}
        locale={locale}
      />

      <dialog
        aria-labelledby="reset-evidence-dialog-title"
        className="evidence-reset-dialog rounded-[1rem] border border-[rgba(21,21,21,0.16)] bg-white p-0 text-ink shadow-premium backdrop:bg-[rgba(21,21,21,0.38)]"
        ref={resetDialogRef}
      >
        <div className="max-w-md p-6 sm:p-7">
          <h2
            className="font-display text-3xl leading-tight text-ink"
            id="reset-evidence-dialog-title"
          >
            {isEnglish ? "Reset this check?" : "Prüfung wirklich zurücksetzen?"}
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            {isEnglish
              ? "All answers and the optional internal label for this evidence document will be cleared on this device."
              : "Alle Antworten und die optionale interne Bezeichnung dieses Nachweises werden auf diesem Gerät gelöscht."}
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(21,21,21,0.18)] px-5 py-2.5 text-sm font-bold text-ink transition hover:border-orange hover:text-orange"
              onClick={closeResetDialog}
              type="button"
            >
              {isEnglish ? "Cancel" : "Abbrechen"}
            </button>
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#df6100]"
              onClick={confirmReset}
              type="button"
            >
              {isEnglish ? "Reset" : "Zurücksetzen"}
            </button>
          </div>
        </div>
      </dialog>

      <section
        aria-labelledby="privacy-tool-title"
        className="mt-10 rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-white p-5 sm:p-7"
      >
        <h2
          className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-none text-ink"
          id="privacy-tool-title"
        >
          {isEnglish ? "Your inputs stay in this browser." : "Ihre Daten bleiben bei Ihnen."}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          {isEnglish
            ? "This checklist does not require an account or document upload. Your entries are not sent to Evipace. Progress can be saved only in this browser."
            : "Diese Checkliste benötigt kein Konto und keinen Dokumenten-Upload. Ihre Eingaben werden nicht an Evipace übertragen. Der lokale Fortschritt kann ausschließlich in Ihrem Browser gespeichert werden."}
        </p>
      </section>

      <div className="sr-only">
        {allEvidenceChecks.length}{" "}
        {isEnglish
          ? "checks in the ESG Evidence Readiness Check."
          : "Prüfpunkte im ESG Evidence Readiness Check."}
      </div>
    </section>
  );
}
