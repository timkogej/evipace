import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

/**
 * Runs the real client analytics modules in the test process.
 *
 * Like tests/helpers/load-server-module.mjs, the TypeScript sources are
 * transpiled on the fly with the compiler already present as a devDependency
 * — no new package, and the code under test is exactly the code that ships.
 * Around it sits a small deterministic browser: a cookie jar, a document that
 * records injected <script> elements, and a stand-in for gtag.js that models
 * the one behaviour this feature lives or dies by — the real tag only ever
 * *executes* data-layer entries that are `arguments` objects and silently
 * ignores everything else.
 */

const HERE = new URL(".", import.meta.url);

const SOURCES = {
  consent: "../../components/evipace/analytics/consent.ts",
  GoogleAnalytics: "../../components/evipace/analytics/GoogleAnalytics.ts",
  "ga-cookies": "../../components/evipace/analytics/ga-cookies.ts"
};

let builtDir = null;
let instanceCounter = 0;

async function buildOnce() {
  if (builtDir) return builtDir;
  const dir = await mkdtemp(join(tmpdir(), "evipace-analytics-"));

  for (const [name, relative] of Object.entries(SOURCES)) {
    const source = await readFile(new URL(relative, HERE), "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        isolatedModules: true
      }
    });
    await writeFile(
      join(dir, `${name}.mjs`),
      outputText.replace(/from\s+"\.\/consent"/g, 'from "./consent.mjs"'),
      "utf8"
    );
  }

  builtDir = dir;
  return dir;
}

/**
 * A fresh copy of the analytics modules, as a browser gets on every document
 * load — module-level state must not leak from one simulated page load to the
 * next.
 */
export async function loadAnalyticsModules() {
  const dir = await buildOnce();
  const version = `?instance=${(instanceCounter += 1)}`;
  return {
    ga: await import(pathToFileURL(join(dir, "GoogleAnalytics.mjs")).href + version),
    cookies: await import(pathToFileURL(join(dir, "ga-cookies.mjs")).href + version)
  };
}

class CookieJar {
  constructor(initial = {}) {
    this.values = new Map(Object.entries(initial));
  }

  get header() {
    return Array.from(this.values, ([name, value]) => `${name}=${value}`).join("; ");
  }

  write(raw) {
    const [pair, ...attributes] = raw.split(";").map((part) => part.trim());
    const separator = pair.indexOf("=");
    const name = pair.slice(0, separator);
    const value = pair.slice(separator + 1);
    const expired = attributes.some(
      (attribute) => /^max-age=0$/i.test(attribute) || /^expires=Thu, 01 Jan 1970/i.test(attribute)
    );

    if (expired) this.values.delete(name);
    else this.values.set(name, value);
  }

  names() {
    return Array.from(this.values.keys());
  }
}

/**
 * A deterministic stand-in for https://www.googletagmanager.com/gtag/js.
 *
 * It drains the queue that was built before it arrived and then watches it,
 * exactly as the real tag does — including the part that matters here: an
 * entry is a command only when it is an `arguments` object. A plain array is
 * accepted by the queue and then ignored, which is precisely how a site can
 * load the tag and still collect nothing.
 */
function bootTagLibrary(environment) {
  const runtime = {
    consent: {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    },
    js: 0,
    configs: [],
    ignored: 0
  };
  environment.tag = runtime;

  const layer = environment.window.dataLayer;

  const execute = (entry) => {
    if (Object.prototype.toString.call(entry) !== "[object Arguments]") {
      runtime.ignored += 1;
      return;
    }

    const [command, ...rest] = Array.prototype.slice.call(entry);

    if (command === "consent") {
      Object.assign(runtime.consent, rest[1] ?? {});
      return;
    }
    if (command === "js") {
      runtime.js += 1;
      return;
    }
    if (command === "config") {
      const [id, parameters = {}] = rest;
      runtime.configs.push({ id, parameters });
      if (parameters.send_page_view !== false) {
        environment.collect(id, "page_view", {});
      }
      return;
    }
    if (command === "event") {
      const [name, parameters = {}] = rest;
      const target = parameters.send_to ?? runtime.configs[0]?.id;
      if (!target || !runtime.configs.some((config) => config.id === target)) return;
      environment.collect(target, name, parameters);
    }
  };

  for (const entry of layer.slice()) execute(entry);

  const push = layer.push.bind(layer);
  layer.push = (...entries) => {
    const length = push(...entries);
    for (const entry of entries) execute(entry);
    return length;
  };
}

/**
 * @param {object} options
 * @param {string} options.path        current pathname
 * @param {object} options.cookies     cookies the visitor arrives with
 * @param {string} options.hostname
 */
export function createEnvironment({
  path = "/en",
  cookies = {},
  hostname = "evipace.com",
  title = "evipace"
} = {}) {
  const jar = new CookieJar(cookies);
  const scripts = [];
  const requests = [];

  const environment = {
    jar,
    scripts,
    requests,
    tag: null,
    get loaderRequests() {
      return requests.filter((url) => url.includes("googletagmanager.com/gtag/js"));
    },
    get collectRequests() {
      return requests.filter((url) => url.includes("/g/collect"));
    },
    get pageViewRequests() {
      return this.collectRequests.filter(
        (url) => new URL(url).searchParams.get("en") === "page_view"
      );
    },
    collect(measurementId, eventName, parameters) {
      // Consent Mode: with analytics_storage denied the tag does not collect.
      if (environment.tag.consent.analytics_storage !== "granted") return;
      const url = new URL("https://region1.google-analytics.com/g/collect");
      url.searchParams.set("v", "2");
      url.searchParams.set("tid", measurementId);
      url.searchParams.set("en", eventName);
      for (const [key, value] of Object.entries(parameters)) {
        url.searchParams.set(key, String(value));
      }
      jar.write(`_ga=GA1.1.${requests.length}.1; Max-Age=63072000`);
      jar.write(`_ga_${measurementId.replace("G-", "")}=GS1.1.${requests.length}; Max-Age=63072000`);
      requests.push(url.toString());
    },
    /** The browser fetching and running whatever the page injected. */
    runInjectedScripts() {
      for (const script of scripts) {
        if (script.loaded) continue;
        script.loaded = true;
        requests.push(script.src);
        if (script.src.includes("googletagmanager.com/gtag/js")) bootTagLibrary(environment);
      }
    },
    navigate(nextPath) {
      environment.window.location.pathname = nextPath;
    },
    install() {
      globalThis.window = environment.window;
      globalThis.document = environment.document;
    },
    uninstall() {
      delete globalThis.window;
      delete globalThis.document;
    }
  };

  environment.window = {
    location: {
      origin: `https://${hostname}`,
      hostname,
      pathname: path,
      protocol: "https:"
    }
  };

  environment.document = {
    title,
    get cookie() {
      return jar.header;
    },
    set cookie(raw) {
      jar.write(raw);
    },
    head: {
      appendChild(script) {
        scripts.push(script);
        return script;
      }
    },
    createElement() {
      return { dataset: {}, src: "", async: false, loaded: false, addEventListener() {} };
    },
    querySelector(selector) {
      const match = selector.match(/data-evipace-ga4="([^"]+)"/);
      if (match) return scripts.find((script) => script.dataset.evipaceGa4 === match[1]) ?? null;
      if (selector.includes("data-evipace-ga4")) return scripts[0] ?? null;
      return null;
    },
    querySelectorAll(selector) {
      if (selector.includes("data-evipace-ga4")) return scripts;
      return [];
    }
  };

  return environment;
}

export function readDataLayer(environment) {
  return (environment.window.dataLayer ?? []).map((entry) =>
    Array.prototype.slice.call(entry)
  );
}

export function commandsOfType(environment, command, sub) {
  return readDataLayer(environment).filter(
    (entry) => entry[0] === command && (sub === undefined || entry[1] === sub)
  );
}
