import "server-only";
import { createHmac } from "node:crypto";
import { requestUploadsConfig } from "./config";

/**
 * Normalizes and HMACs a client IP for rate-limit bucketing. The raw IP is
 * never persisted — only this HMAC, which is not reversible without
 * RATE_LIMIT_HMAC_KEY.
 */
export function hmacIp(rawIp: string): string {
  const normalized = rawIp.trim().toLowerCase();
  return createHmac("sha256", requestUploadsConfig.rateLimitHmacKey())
    .update(normalized)
    .digest("hex");
}

/**
 * Best-effort client IP extraction, trustworthy specifically on Vercel:
 * Vercel's own docs state it overwrites x-forwarded-for at the edge and
 * does not forward externally-supplied values — "This restriction is in
 * place to prevent IP spoofing" — so on an unmodified Vercel deployment a
 * client cannot inject a fake value that survives to this header. We
 * prefer x-vercel-forwarded-for specifically because it remains
 * Vercel-set even if a custom proxy is later added in front of the
 * deployment (which could otherwise overwrite plain x-forwarded-for).
 * This assumption breaks only if Vercel's "Trusted Proxy" (Enterprise)
 * feature is ever enabled without updating this logic — worth
 * re-verifying if that changes.
 */
export function getClientIp(headers: Headers): string {
  const vercelForwardedFor = headers.get("x-vercel-forwarded-for");
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(",")[0].trim();
  }
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headers.get("x-real-ip") ?? "unknown";
}
