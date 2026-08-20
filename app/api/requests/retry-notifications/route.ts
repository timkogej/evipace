import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { requestUploadsConfig } from "@/lib/server/config";
import { retryUnsentNotifications } from "@/lib/server/notify";

/**
 * This is the real crash-recovery mechanism described in the notify.ts
 * doc comment: a browser that already received a success response has no
 * reason to call finalize again, so recovering a notification that was
 * still 'pending' when the process died requires something else to
 * proactively sweep for it. This endpoint is that something else — meant
 * to be invoked on a schedule (e.g. an n8n cron workflow, matching your
 * existing scheduled-workflow pattern) rather than by any user-facing
 * code path.
 *
 * Guarded by a bearer secret (INTERNAL_RETRY_SECRET) — never enabled
 * without it, never callable by a browser.
 */
export async function POST(request: NextRequest) {
  let expected: string;
  try {
    expected = `Bearer ${requestUploadsConfig.internalRetrySecret()}`;
  } catch {
    // Fails closed deliberately: no secret configured means no access,
    // not a server error.
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const provided = Buffer.from(authHeader);
  const wanted = Buffer.from(expected);
  const authorized =
    provided.length === wanted.length && timingSafeEqual(provided, wanted);

  if (!authorized) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result = await retryUnsentNotifications();
  return NextResponse.json(result);
}
