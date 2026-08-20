"use client";

import { useRef, useState } from "react";
import { X, Upload as UploadIcon } from "lucide-react";
import { ALLOWED_FILE_TYPES, MAX_FILES } from "@/lib/request-upload-constants";

type FileDropzoneProps = {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
};

const acceptAttr = Object.keys(ALLOWED_FILE_TYPES).join(",");

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileDropzone({ files, onChange, disabled }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(newFiles: FileList | File[]) {
    const combined = [...files, ...Array.from(newFiles)].slice(0, MAX_FILES);
    onChange(combined);
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div>
      <button
        aria-label="Add files"
        className={`flex w-full flex-col items-center justify-center gap-2 rounded-[1rem] border-2 border-dashed p-8 text-center transition ${
          isDragging
            ? "border-orange bg-[var(--soft-orange)]"
            : "border-[rgba(21,21,21,0.18)] bg-[var(--paper)]"
        }`}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files);
        }}
        type="button"
      >
        <UploadIcon aria-hidden="true" className="h-6 w-6 text-orange" />
        <span className="font-semibold text-ink">
          Drop files here, or click to choose
        </span>
        <span className="text-sm text-muted">
          .xlsx, .docx, .pdf, .csv, .jpg, .png — up to {MAX_FILES} files, 25MB each
        </span>
      </button>

      <input
        accept={acceptAttr}
        className="sr-only"
        multiple
        onChange={(event) => {
          if (event.target.files?.length) addFiles(event.target.files);
          event.target.value = "";
        }}
        ref={inputRef}
        type="file"
      />

      {files.length > 0 ? (
        <ul className="mt-4 grid gap-2">
          {files.map((file, index) => (
            <li
              className="flex items-center justify-between gap-3 rounded-lg border border-[rgba(21,21,21,0.11)] bg-white px-4 py-2.5"
              key={`${file.name}-${index}`}
            >
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
                {file.name}
              </span>
              <span className="shrink-0 text-xs font-semibold text-muted">
                {formatSize(file.size)}
              </span>
              <button
                aria-label={`Remove ${file.name}`}
                className="shrink-0 text-muted transition hover:text-ink"
                disabled={disabled}
                onClick={() => removeFile(index)}
                type="button"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
