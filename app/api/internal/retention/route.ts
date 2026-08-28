import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { requestUploadsConfig } from "@/lib/server/config";
import { buildRetentionReport } from "@/lib/server/retention";

export const dynamic = "force-dynamic";

function authorized(request: NextRequest, secret: string): boolean {
  const authHeader = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  const provided = Buffer.from(authHeader);
  const wanted = Buffer.from(expected);

  return provided.length === wanted.length && timingSafeEqual(provided, wanted);
}

export async function GET(request: NextRequest) {
  let secret: string;
  try {
    secret = requestUploadsConfig.retentionCronSecret();
  } catch {
    return NextResponse.json(
      { error: "retention_secret_not_configured" },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" }
      }
    );
  }

  if (!authorized(request, secret)) {
    return NextResponse.json(
      { error: "unauthorized" },
      {
        status: 401,
        headers: { "Cache-Control": "no-store" }
      }
    );
  }

  const report = await buildRetentionReport();
  return NextResponse.json(report, {
    headers: { "Cache-Control": "no-store" }
  });
}
