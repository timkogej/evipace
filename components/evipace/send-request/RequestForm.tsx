"use client";

import { useState } from "react";
import { FileDropzone } from "./FileDropzone";
import { SuccessState } from "./SuccessState";
import { defaultSendRequestCopy, type SendRequestCopy } from "./copy";
import { uploadFile, type UploadTarget } from "@/lib/client/upload-file";
import { privacyPolicyPath } from "@/lib/legal-info";

type Stage = "form" | "uploading" | "success";

type CreateResponse = {
  requestId: string;
  submissionToken: string;
  uploads: UploadTarget[];
};

type RequestFormProps = {
  copy?: SendRequestCopy;
};

export function RequestForm({ copy = defaultSendRequestCopy }: RequestFormProps) {
  const formCopy = copy.form;
  const [stage, setStage] = useState<Stage>("form");
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (files.length === 0) {
      setError(formCopy.errors.noFiles);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? "") || undefined,
      deadline: String(formData.get("deadline") ?? "") || undefined,
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
      className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink">
          {formCopy.labels.name}
          <input
            className="rounded-lg border border-[rgba(21,21,21,0.16)] px-4 py-3 text-base font-normal"
            name="name"
            required
            type="text"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink">
          {formCopy.labels.email}
          <input
            className="rounded-lg border border-[rgba(21,21,21,0.16)] px-4 py-3 text-base font-normal"
            name="email"
            required
            type="email"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink">
          {formCopy.labels.company}
          <input
            className="rounded-lg border border-[rgba(21,21,21,0.16)] px-4 py-3 text-base font-normal"
            name="company"
            required
            type="text"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-ink">
          {formCopy.labels.deadline}{" "}
          <span className="font-normal text-muted">{formCopy.labels.optional}</span>
          <input
            className="rounded-lg border border-[rgba(21,21,21,0.16)] px-4 py-3 text-base font-normal"
            name="deadline"
            type="text"
          />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-ink">
        {formCopy.labels.message}{" "}
        <span className="font-normal text-muted">{formCopy.labels.optional}</span>
        <textarea
          className="rounded-lg border border-[rgba(21,21,21,0.16)] px-4 py-3 text-base font-normal"
          name="message"
          rows={4}
        />
      </label>

      {/* Honeypot — hidden from real visitors via CSS, not the accessibility tree trick of display:none on its own (screen readers can still land here), so also marked aria-hidden and tabIndex=-1. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website
          <input autoComplete="off" name="website" tabIndex={-1} type="text" />
        </label>
      </div>

      <div className="mt-6">
        <FileDropzone
          copy={copy.dropzone}
          disabled={submitting}
          files={files}
          onChange={setFiles}
        />
      </div>

      {stage === "uploading" ? (
        <div className="mt-5">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(21,21,21,0.1)]">
            <div
              className="h-full rounded-full bg-orange transition-all"
              style={{ width: `${Math.round(overallProgress * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-muted">
            {formCopy.uploadingText}
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 text-sm font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <p className="mt-6 text-sm leading-6 text-muted">
        {formCopy.privacy.intro}
        {privacyPolicyPath ? (
          <>
            {" "}
            {formCopy.privacy.linkPrefix}{" "}
            <a className="orange-link" href={privacyPolicyPath}>
              {formCopy.privacy.linkLabel}
            </a>
            .
          </>
        ) : null}
      </p>

      <button
        className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-orange bg-orange px-5 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#e96500] hover:bg-[#e96500] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        disabled={submitting}
        type="submit"
      >
        {submitting ? formCopy.submittingLabel : formCopy.submitLabel}
      </button>
    </form>
  );
}
