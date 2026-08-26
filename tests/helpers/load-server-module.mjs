import { mkdtemp, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

/**
 * Loads the real server-side notification modules into the test process.
 *
 * The suite runs under plain `node --test`, so the TypeScript sources are
 * transpiled on the fly with the TypeScript compiler already present as a
 * devDependency — no new package, and no second copy of the logic that
 * could drift from what ships. Only the two genuinely external services
 * are replaced: Supabase Storage and the mail provider. Everything under
 * test — the email builder, the sanitiser, the attach/link policy — is
 * the exact production code.
 */

const HERE = new URL(".", import.meta.url);

/** Production sources, keyed by the module name they get in the temp dir. */
const SOURCES = {
  "sanitize-filename": "../../lib/server/sanitize-filename.ts",
  "request-upload-constants": "../../lib/request-upload-constants.ts",
  "request-notification-email": "../../lib/server/request-notification-email.ts",
  "request-attachments": "../../lib/server/request-attachments.ts"
};

/** Import specifiers rewritten to their transpiled or mocked neighbour. */
const REWRITES = [
  [/^import\s+"server-only";?\s*$/gm, ""],
  [/from\s+"@\/lib\/request-upload-constants"/g, 'from "./request-upload-constants.mjs"'],
  [/from\s+"\.\/sanitize-filename"/g, 'from "./sanitize-filename.mjs"'],
  [/from\s+"\.\/request-notification-email"/g, 'from "./request-notification-email.mjs"'],
  [/from\s+"\.\/supabase-admin"/g, 'from "./supabase-admin.mjs"'],
  [/from\s+"\.\/config"/g, 'from "./config.mjs"']
];

const MOCK_CONFIG = `export const requestUploadsConfig = {
  storageBucket: () => "inbound-requests"
};
`;

// The mock client is read at call time from a global the test sets, so one
// transpiled copy of the modules serves every case.
const MOCK_SUPABASE = `export function getSupabaseAdminClient() {
  if (!globalThis.__eviSupabaseMock) {
    throw new Error("no Supabase mock installed for this test");
  }
  return globalThis.__eviSupabaseMock;
}
`;

let cached = null;

async function buildOnce() {
  const dir = await mkdtemp(join(tmpdir(), "evipace-notify-"));

  for (const [name, relative] of Object.entries(SOURCES)) {
    const source = await readFile(new URL(relative, HERE), "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        isolatedModules: true
      }
    });
    let code = outputText;
    for (const [pattern, replacement] of REWRITES) {
      code = code.replace(pattern, replacement);
    }
    await writeFile(join(dir, `${name}.mjs`), code, "utf8");
  }

  await writeFile(join(dir, "config.mjs"), MOCK_CONFIG, "utf8");
  await writeFile(join(dir, "supabase-admin.mjs"), MOCK_SUPABASE, "utf8");

  return dir;
}

export async function loadNotificationModules() {
  if (!cached) {
    const dir = await buildOnce();
    cached = {
      email: await import(pathToFileURL(join(dir, "request-notification-email.mjs")).href),
      attachments: await import(pathToFileURL(join(dir, "request-attachments.mjs")).href)
    };
  }
  return cached;
}

/**
 * A stand-in for Supabase Storage. `objects` maps a storage path to the
 * bytes stored there; nothing in the fake is ever mutated by a download or
 * a signature, which is what lets a test assert that the storage copy
 * survives being attached to an email.
 */
export function installStorageMock({
  objects = {},
  failDownloadFor = new Set(),
  failSignFor = new Set(),
  throwOnDownload = false
} = {}) {
  const downloads = [];
  const signed = [];
  const snapshot = new Map(
    Object.entries(objects).map(([path, bytes]) => [path, Buffer.from(bytes)])
  );

  globalThis.__eviSupabaseMock = {
    storage: {
      from() {
        return {
          async download(path) {
            downloads.push(path);
            if (throwOnDownload) throw new Error("storage exploded");
            if (failDownloadFor.has(path) || !snapshot.has(path)) {
              return { data: null, error: { message: "object not found" } };
            }
            const bytes = snapshot.get(path);
            return {
              data: {
                arrayBuffer: async () =>
                  bytes.buffer.slice(
                    bytes.byteOffset,
                    bytes.byteOffset + bytes.byteLength
                  )
              },
              error: null
            };
          },
          async createSignedUrl(path, expiresIn, options) {
            signed.push({ path, expiresIn, options });
            if (failSignFor.has(path)) {
              return { data: null, error: { message: "cannot sign" } };
            }
            return {
              data: {
                signedUrl: `https://storage.example.test/object/sign/inbound-requests/${encodeURIComponent(
                  path
                )}?token=signed-token&expiresIn=${expiresIn}`
              },
              error: null
            };
          }
        };
      }
    }
  };

  return {
    downloads,
    signed,
    /** Bytes still present after the run — proves nothing was consumed. */
    remaining: () => new Map(snapshot)
  };
}

export function clearStorageMock() {
  delete globalThis.__eviSupabaseMock;
}
