import "server-only";
import { randomBytes, createHmac, timingSafeEqual } from "node:crypto";
import { requestUploadsConfig } from "./config";

/** Generates a fresh plaintext token — returned to the browser once, never persisted. */
export function generateSubmissionToken(): string {
  return randomBytes(32).toString("base64url");
}

/** HMAC of the plaintext token — this is what actually gets stored in the DB. */
export function hashSubmissionToken(plaintextToken: string): string {
  return createHmac("sha256", requestUploadsConfig.submissionTokenHmacKey())
    .update(plaintextToken)
    .digest("hex");
}

/** Constant-time comparison — never a plain `===` on secret-derived values. */
export function verifySubmissionToken(
  plaintextToken: string,
  storedHash: string
): boolean {
  const candidate = Buffer.from(hashSubmissionToken(plaintextToken), "hex");
  const stored = Buffer.from(storedHash, "hex");
  if (candidate.length !== stored.length) return false;
  return timingSafeEqual(candidate, stored);
}
