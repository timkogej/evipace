import "server-only";
import { getSupabaseAdminClient } from "./supabase-admin";
import { requestUploadsConfig } from "./config";

export type SignedUpload = {
  path: string;
  token: string;
  signedUrl: string;
};

/**
 * Issues one signed resumable-upload token per storage path. The browser
 * receives only these tokens — never SUPABASE_SECRET_KEY, never the
 * publishable key. Each token is scoped to exactly one path.
 */
export async function createSignedUploads(
  paths: string[]
): Promise<SignedUpload[]> {
  const supabase = getSupabaseAdminClient();
  const bucket = requestUploadsConfig.storageBucket();

  const results: SignedUpload[] = [];
  for (const path of paths) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(path);

    if (error || !data) {
      throw new Error(
        `Failed to create signed upload URL for "${path}": ${error?.message ?? "unknown error"}`
      );
    }

    results.push({ path, token: data.token, signedUrl: data.signedUrl });
  }

  return results;
}

export type ExpectedFile = {
  path: string;
  declaredSize: number;
};

export type VerificationResult = {
  allPresent: boolean;
  missing: string[];
  sizeMismatches: Array<{ path: string; expected: number; actual: number }>;
};

/**
 * Exact-match verification at finalize time: every expected object must
 * exist, and its stored size must exactly equal the declared browser
 * File.size — not "roughly match". Extension/MIME checks at submission
 * time are an allowlist/UX control only; this is the real gate before any
 * state transition happens.
 */
export async function verifyUploadedFiles(
  expected: ExpectedFile[]
): Promise<VerificationResult> {
  const supabase = getSupabaseAdminClient();
  const bucket = requestUploadsConfig.storageBucket();

  const missing: string[] = [];
  const sizeMismatches: Array<{
    path: string;
    expected: number;
    actual: number;
  }> = [];

  for (const file of expected) {
    const lastSlash = file.path.lastIndexOf("/");
    const folder = file.path.slice(0, lastSlash);
    const name = file.path.slice(lastSlash + 1);

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, { search: name, limit: 1 });

    const found = !error && data?.find((entry) => entry.name === name);

    if (!found) {
      missing.push(file.path);
      continue;
    }

    const actualSize = Number(found.metadata?.size ?? -1);
    if (actualSize !== file.declaredSize) {
      sizeMismatches.push({
        path: file.path,
        expected: file.declaredSize,
        actual: actualSize
      });
    }
  }

  return {
    allPresent: missing.length === 0 && sizeMismatches.length === 0,
    missing,
    sizeMismatches
  };
}
