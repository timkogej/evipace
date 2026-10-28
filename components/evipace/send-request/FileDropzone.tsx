"use client";

import { useRef, useState } from "react";
import { FileCheck2, X, Upload as UploadIcon } from "lucide-react";
import { ALLOWED_FILE_TYPES, MAX_FILES } from "@/lib/request-upload-constants";
import { defaultSendRequestCopy, type FileDropzoneCopy } from "./copy";
import styles from "./SendRequest.module.css";

type FileDropzoneProps = {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
  copy?: FileDropzoneCopy;
};

const acceptAttr = Object.keys(ALLOWED_FILE_TYPES).join(",");

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileDropzone({
  files,
  onChange,
  disabled,
  copy = defaultSendRequestCopy.dropzone
}: FileDropzoneProps) {
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
        aria-label={copy.addFilesAriaLabel}
        className={`${styles.dropzone}${isDragging ? ` ${styles.dropzoneActive}` : ""}`}
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
        <span aria-hidden="true" className={styles.dropIcon}>
          <UploadIcon />
        </span>
        <span className={`${styles.dropText} ${styles.dropPointer}`}>{copy.dropText}</span>
        <span className={`${styles.dropText} ${styles.dropTouch}`}>{copy.tapText}</span>
        <span className={styles.dropHint}>{copy.hintText}</span>
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
        <ul className={styles.files}>
          {files.map((file, index) => (
            <li className={styles.file} key={`${file.name}-${index}`}>
              <FileCheck2 aria-hidden="true" className={styles.fileIcon} />
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{formatSize(file.size)}</span>
              <button
                aria-label={copy.removeAriaLabelTemplate.replace("{file}", file.name)}
                className={styles.remove}
                disabled={disabled}
                onClick={() => removeFile(index)}
                type="button"
              >
                <X aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
