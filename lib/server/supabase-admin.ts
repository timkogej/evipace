import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requestUploadsConfig } from "./config";

let cachedClient: SupabaseClient | null = null;

/**
 * Server-only Supabase client using SUPABASE_SECRET_KEY (the current
 * sb_secret_... key, replacing the legacy service_role JWT). This bypasses
 * RLS entirely — treated as fully privileged, not RLS-protected. Never
 * import this module from a "use client" component; the `server-only`
 * import above makes that a build-time error if attempted.
 */
export function getSupabaseAdminClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  cachedClient = createClient(
    requestUploadsConfig.supabaseUrl(),
    requestUploadsConfig.supabaseSecretKey(),
    {
      auth: { autoRefreshToken: false, persistSession: false }
    }
  );

  return cachedClient;
}
