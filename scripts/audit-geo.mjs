/** Run against a built site: GEO_BASE_URL=http://127.0.0.1:3417 node scripts/audit-geo.mjs
 * PLAYWRIGHT_MODULE may point to the installed browser automation runtime.
 */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { loadProjectModule } from "../tests/helpers/load-project-module.mjs";
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.GEO_BASE_URL || "http://127.0.0.1:3417";
const output = process.env.GEO_AUDIT_OUTPUT || "/tmp/evipace-geo-audit";
const {getAllPageKeys,getActivePageGroup} = loadProjectModule("lib/seo/page-registry.ts");
const rows = getAllPageKeys().flatMap(key=>getActivePageGroup(key).map(item=>({key,...item})));
await mkdir(output,{recursive:true});
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:1000}});
const page = await context.newPage();
const results=[];
const failures=[];
for (const {key,locale,entry} of rows) {
  const response=await page.goto(base+entry.path,{waitUntil:"load"});
  const data=await page.evaluate(()=>{
    const graphs=[...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el=>JSON.parse(el.textContent)["@graph"]||[]);
    const h1=document.querySelector("h1");
    let visible=true;
    for(let el=h1;el;el=el.parentElement) {
      const s=getComputedStyle(el);
      if(s.display==="none"||s.visibility==="hidden"||Number(s.opacity)===0)visible=false;
    }
    return {
      lang:document.documentElement.lang,
      title:document.title,
      description:document.querySelector('meta[name="description"]')?.content,
      canonical:document.querySelector('link[rel="canonical"]')?.href,
      robots:document.querySelector('meta[name="robots"]')?.content,
      h1:[...document.querySelectorAll("h1")].filter(x=>x.getClientRects().length).map(x=>x.textContent.trim()),
      main:document.querySelectorAll("main").length,
      visibleWithoutJs:visible,
      alternates:[...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(x=>({locale:x.hreflang,href:x.href})),
      ids:[...document.querySelectorAll("[id]")].map(x=>x.id),
      links:[...document.querySelectorAll("a[href]")].map(x=>x.getAttribute("href")),
      graphs,
      horizontalOverflow:document.documentElement.scrollWidth>innerWidth+2
    };
  });
  const row={path:entry.path,key,locale,status:response.status(),...data};results.push(row);
  const fail=reason=>failures.push({path:entry.path,reason});
  if(row.status!==200)fail(`HTTP ${row.status}`);
  if(data.lang!==locale)fail("wrong HTML language");
  if(data.h1.length!==1||data.main!==1)fail("expected one H1 and main");
  if(!data.visibleWithoutJs)fail("H1 hidden without JavaScript");
  if(data.canonical!==`https://evipace.com${entry.path}`)fail("canonical mismatch");
  if(!data.description||data.robots?.includes("noindex"))fail("metadata/indexability");
  if(data.horizontalOverflow)fail("desktop horizontal overflow");
  for(const other of getActivePageGroup(key)) {
    if(!data.alternates.some(x=>x.locale===other.locale&&x.href===`https://evipace.com${other.entry.path}`))fail("hreflang mismatch");
  }
  for (const article of data.graphs.filter(x=>x["@type"]==="Article")) {
    const normalize=value=>value.replace(/[^\p{L}\p{N}]/gu,"").toLowerCase();
    if(normalize(article.headline)!==normalize(data.h1[0]))fail("article headline differs from visible H1");
  }
  const duplicates=data.ids.filter((id,i)=>data.ids.indexOf(id)!==i);
  if(duplicates.length)fail(`duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);
}
// Check every link between registered pages, including fragment destinations.
const byPath=new Map(results.map(x=>[x.path,x]));
for(const row of results) for(const href of row.links) {
  const url=new URL(href,base+row.path);
  if(![new URL(base).origin,"https://evipace.com"].includes(url.origin))continue;
  const target=byPath.get(url.pathname);
  if(target&&url.hash&&!target.ids.includes(decodeURIComponent(url.hash.slice(1))))failures.push({path:row.path,reason:`missing anchor ${href}`});
  if(!target&&!/\/(send-request)$/.test(url.pathname)&&!url.pathname.startsWith("/api/")&&url.pathname!=="/"&&!/\.[a-z0-9]+$/.test(url.pathname))failures.push({path:row.path,reason:`unregistered internal URL ${href}`});
}
const invalidPaths=["/sl","/de/resources","/en/ressourcen","/de/resources/ecovadis-documents-evidence","/en/ressourcen/vsme-daten-nachhaltigkeitsbericht","/en/ecovadis-unterstuetzung"];
for(const path of invalidPaths){const res=await page.goto(base+path);if(res.status()!==404)failures.push({path,reason:`expected 404, got ${res.status()}`});}
for(const locale of ["en","de"]){await page.goto(`${base}/${locale}/send-request`);if(!(await page.locator('meta[name="robots"]').getAttribute("content"))?.includes("noindex"))failures.push({path:`/${locale}/send-request`,reason:"request form must be noindex"});}
await context.close();
const interactive=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:"reduce"});
const visual=await interactive.newPage();
const errors=[];visual.on("pageerror",e=>errors.push(e.message));
const samples=["/en","/de/about","/en/methodology","/de/ecovadis-unterstuetzung","/en/scope-1-2-calculation","/de/ressourcen/vsme-daten-nachhaltigkeitsbericht","/en/resources"];
for(const path of samples){
 await visual.goto(base+path,{waitUntil:"networkidle"});
 await visual.screenshot({path:`${output}/${path.slice(1).replaceAll("/","-")}-desktop.png`});
 await visual.setViewportSize({width:390,height:844});
 await visual.screenshot({path:`${output}/${path.slice(1).replaceAll("/","-")}-mobile.png`});
 if(await visual.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))failures.push({path,reason:"mobile horizontal overflow"});
 await visual.setViewportSize({width:1440,height:1000});
}
await visual.goto(base+"/de/ecovadis-unterstuetzung");
const faq=visual.locator(".faq-item").first();await faq.locator("summary").click();await faq.scrollIntoViewIfNeeded();
if(!(await faq.getAttribute("open")!==null))failures.push({path:"/de/ecovadis-unterstuetzung",reason:"FAQ did not open"});
await visual.screenshot({path:`${output}/service-faq.png`});
await browser.close();
const report={checkedAt:new Date().toISOString(),pages:results.length,failures,clientErrors:errors,results};
await writeFile(`${output}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:results.length,failures,clientErrors:errors,output},null,2));
process.exitCode=failures.length||errors.length?1:0;
