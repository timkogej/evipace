import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(
  new URL("../app/api/requests/route.ts", import.meta.url),
  "utf8"
);

test("signed resumable uploads use Supabase's /sign TUS route", () => {
  const signedEndpoint =
    "endpoint: `${requestUploadsConfig.supabaseStorageUrl()}/storage/v1/upload/resumable/sign`";
  const unsignedEndpoint =
    "endpoint: `${requestUploadsConfig.supabaseStorageUrl()}/storage/v1/upload/resumable`";

  assert.ok(routeSource.includes(signedEndpoint));
  assert.ok(!routeSource.includes(unsignedEndpoint));
});
