"use client";

import * as tus from "tus-js-client";

export type UploadTarget = {
  filename: string;
  path: string;
  token: string;
  endpoint: string;
  /** Server-chosen canonical MIME type — see lib/request-upload-constants.ts. */
  contentType: string;
  /** The private bucket name — server-supplied, never hardcoded client-side. */
  bucketName: string;
};

export type UploadCallbacks = {
  onProgress?: (bytesSent: number, bytesTotal: number) => void;
};

/**
 * Uploads one file directly to Supabase Storage via the TUS resumable
 * protocol, authorized only by the per-file signed token issued by
 * POST /api/requests (x-signature header) — no Supabase credential of any
 * kind is ever present in browser code. Chunk size is fixed at exactly
 * 6 MB, a hard Supabase Storage requirement for resumable uploads.
 * `retryDelays` gives automatic retry on transient network drops within
 * the same page session.
 */
export function uploadFile(
  file: File,
  target: UploadTarget,
  { onProgress }: UploadCallbacks = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: target.endpoint,
      chunkSize: 6 * 1024 * 1024,
      retryDelays: [0, 1000, 3000, 5000, 10000],
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      headers: {
        "x-signature": target.token
      },
      metadata: {
        bucketName: target.bucketName,
        objectName: target.path,
        // Server-chosen canonical MIME, never file.type — a browser can
        // report an empty or inconsistent value, which would otherwise
        // risk a legitimate upload being rejected by the bucket-level
        // allowed_mime_types restriction.
        contentType: target.contentType
      },
      onProgress: (bytesSent, bytesTotal) => {
        onProgress?.(bytesSent, bytesTotal);
      },
      onError: (error) => {
        reject(error);
      },
      onSuccess: () => {
        resolve();
      }
    });

    // Cross-session resume: if a matching previous (interrupted) upload
    // is found for this exact file, continue it instead of starting over.
    upload.findPreviousUploads().then((previousUploads) => {
      if (previousUploads.length > 0) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }
      upload.start();
    });
  });
}
