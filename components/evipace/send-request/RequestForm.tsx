"use client";

import { useEffect, useRef, useState } from "react";
import { sendLeadAnalyticsEvent } from "@/components/evipace/analytics/GoogleAnalytics";
import { FileDropzone } from "./FileDropzone";
import { SuccessState } from "./SuccessState";
import { defaultSendRequestCopy, type SendRequestCopy } from "./copy";
import { uploadFile, type UploadTarget } from "@/lib/client/upload-file";
import { getPrivacyPolicyPath } from "@/lib/legal-info";
import styles from "./SendRequest.module.css";

type Stage = "form" | "uploading" | "success";

type CreateResponse = {
  requestId: string;
  submissionToken: string;
  uploads: UploadTarget[];
};

type RequestFormProps = {
  copy?: SendRequestCopy;
  /**
   * Which language version of the page is rendering this form. Reported
   * to the server so the internal notification can name it; it changes
   * nothing the visitor sees, and no server behaviour branches on it.
   */
  locale?: "en" | "de";
};

export function RequestForm({
  copy = defaultSendRequestCopy,
  locale = "en"
}: RequestFormProps) {
  const formCopy = copy.form;
  const [stage, setStage] = useState<Stage>("form");
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const formStartTrackedRef = useRef(false);
  const submitInFlightRef = useRef(false);
  const workflowSucceededRef = useRef(false);
  const leadTrackedRef = useRef(false);

  function markFormStarted(target: EventTarget | null) {
    if (formStartTrackedRef.current) return;
    if (target instanceof HTMLInputElement && target.name === "website") return;

    formStartTrackedRef.current = sendLeadAnalyticsEvent(
      "request_form_start",
      locale
    );
  }

  useEffect(() => {
    if (stage !== "success") return;
    if (!workflowSucceededRef.current || leadTrackedRef.current) return;

    leadTrackedRef.current = sendLeadAnalyticsEvent("generate_lead", locale);
  }, [locale, stage]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markFormStarted(event.target);
    if (submitInFlightRef.current) return;

    setError(null);

    if (files.length === 0) {
      setError(formCopy.errors.noFiles);
      return;
    }

    submitInFlightRef.current = true;
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? "") || undefined,
      deadline: String(formData.get("deadline") ?? "") || undefined,
      locale,
      website: String(formData.get("website") ?? ""), // honeypot
      files: files.map((file) => ({
        filename: file.name,
        size: file.size,
        mimeType: file.type || "application/octet-stream"
      }))
    };

    setSubmitting(true);
    try {
      const createRes = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (createRes.status === 503) {
        setError(formCopy.errors.disabled);
        return;
      }
      if (!createRes.ok) {
        setError(formCopy.errors.submitFailed);
        return;
      }

      const created = (await createRes.json()) as CreateResponse;
      setStage("uploading");

      await Promise.all(
        created.uploads.map((upload, index) =>
          uploadFile(files[index], upload, {
            onProgress: (sent, total) => {
              setProgress((prev) => ({ ...prev, [upload.path]: total ? sent / total : 0 }));
            }
          })
        )
      );

      const finalizeRes = await fetch(`/api/requests/${created.requestId}/finalize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionToken: created.submissionToken })
      });

      if (!finalizeRes.ok) {
        setError(formCopy.errors.finalizeFailed);
        setStage("form");
        return;
      }

      workflowSucceededRef.current = true;
      setStage("success");
    } catch (caughtError) {
      // Surfacing the real error message on-page deliberately — during
      // integration testing this is the diagnostic signal (e.g. the
      // actual TUS failure reason from onError in upload-file.ts)
      // without needing DevTools open to see it. That underlying message
      // comes from client/server code shared across locales, so it is not
      // itself localized — only the generic fallback below is.
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : formCopy.errors.generic;
      setError(message);
      setStage("form");
    } finally {
      submitInFlightRef.current = false;
      setSubmitting(false);
    }
  }

  if (stage === "success") {
    return <SuccessState copy={copy.success} />;
  }

  const overallProgress =
    files.length > 0
      ? Object.values(progress).reduce((a, b) => a + b, 0) / files.length
      : 0;

  return (
    <form
      className={styles.form}
      onChange={(event) => markFormStarted(event.target)}
      onFocus={(event) => markFormStarted(event.target)}
      onPointerDown={(event) => markFormStarted(event.target)}
      onSubmit={handleSubmit}
    >
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span aria-hidden="true" className={styles.legendNumber}>1</span>
          {formCopy.sections.request}
        </legend>
        <p className={styles.hint}>{formCopy.sections.requestHint}</p>
        <FileDropzone
          copy={copy.dropzone}
          disabled={submitting}
          files={files}
          onChange={(nextFiles) => {
            markFormStarted(null);
            setFiles(nextFiles);
          }}
        />
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span aria-hidden="true" className={styles.legendNumber}>2</span>
          {formCopy.sections.details}
        </legend>
        <div className={styles.grid}>
          <label className={styles.field}>
            {formCopy.labels.name}
            <input autoComplete="name" className={styles.input} name="name" required type="text" />
          </label>
          <label className={styles.field}>
            {formCopy.labels.email}
            <input autoComplete="email" className={styles.input} name="email" required type="email" />
          </label>
          <label className={`${styles.field} ${styles.wideField}`}>
            {formCopy.labels.company}
            <input autoComplete="organization" className={styles.input} name="company" required type="text" />
          </label>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span aria-hidden="true" className={styles.legendNumber}>3</span>
          {formCopy.sections.context}
          <span className={styles.optional}>{formCopy.labels.optional}</span>
        </legend>
        <div className={styles.contextGrid}>
          <label className={styles.field}>
            <span>
              {formCopy.labels.deadline}
              <span className={styles.optional}>{formCopy.labels.optional}</span>
            </span>
            <input className={styles.input} name="deadline" type="text" />
          </label>
          <label className={styles.field}>
            <span>
              {formCopy.labels.message}
              <span className={styles.optional}>{formCopy.labels.optional}</span>
            </span>
            <textarea className={styles.input} name="message" rows={4} />
          </label>
        </div>
      </fieldset>

      {/* Honeypot — hidden from real visitors via CSS, not the accessibility tree trick of display:none on its own (screen readers can still land here), so also marked aria-hidden and tabIndex=-1. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website
          <input autoComplete="off" name="website" tabIndex={-1} type="text" />
        </label>
      </div>

      {stage === "uploading" ? (
        <div className={styles.progress}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${Math.round(overallProgress * 100)}%` }}
            />
          </div>
          <p className={styles.progressText}>
            {formCopy.uploadingText}
          </p>
        </div>
      ) : null}

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      <div className={styles.submitRow}>
        <button
          className={styles.submit}
          disabled={submitting}
          type="submit"
        >
          {submitting ? formCopy.submittingLabel : formCopy.submitLabel}
          <span aria-hidden="true" className={styles.submitArrow}>→</span>
        </button>
        <p className={styles.privacy}>
          {formCopy.privacy.intro}{" "}
          {formCopy.privacy.linkPrefix}{" "}
          <a href={getPrivacyPolicyPath(locale)}>
            {formCopy.privacy.linkLabel}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
