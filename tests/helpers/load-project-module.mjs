import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const root = new URL("../../", import.meta.url).pathname;
const nativeRequire = createRequire(new URL("../../package.json", import.meta.url));
const cache = new Map();
/** Evaluate production TypeScript, resolving local imports without duplicating logic. */
export function loadProjectModule(path) {
  const absolute = resolve(root, path);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const loadedModule = { exports: {} };
  cache.set(absolute, loadedModule);
  const code = ts.transpileModule(readFileSync(absolute, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }
  }).outputText;
  const localRequire = (specifier) => {
    if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return nativeRequire(specifier);
    const base = specifier.startsWith("@/") ? resolve(root, specifier.slice(2)) : resolve(dirname(absolute), specifier);
    const file = [base, `${base}.ts`, `${base}.tsx`].find(existsSync);
    if (!file) throw new Error(`Cannot resolve ${specifier} from ${path}`);
    return loadProjectModule(file);
  };
  vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: absolute })(localRequire,loadedModule,loadedModule.exports);
  return loadedModule.exports;
}
