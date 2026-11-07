import { publicContactEmail, publicPhone } from "@/lib/company-info";
import type { Locale } from "@/lib/evipace-locales";
import { pageRegistry, type PageKey } from "./page-registry";
import { SITE_URL } from "./site-config";

/**
 * Builds /llms.txt from the page registry, so it can never list a page that
 * does not exist or describe one differently from its metadata. Nothing is
 * maintained by hand except the short company summary below.
 *
 * llms.txt is a proposed convention, not a standard that any search engine
 * or AI provider has confirmed it reads. It is cheap to serve and harmless,
 * and is not relied on for ranking or citation.
 */
const SERVICE_KEYS: PageKey[] = [
  "esgKundenanfragen",
  "ecovadisUnterstuetzung",
  "integrityNextUnterstuetzung",
  "scope12Berechnung",
  "vsmeNachhaltigkeitsbericht",
  "recordsDeadlines"
];

const COMPANY_KEYS: PageKey[] = ["about", "methodology", "offers"];

const labels: Record<"en" | "de", { services: string; company: string; guides: string }> = {
  en: { services: "Services", company: "Company", guides: "Guides" },
  de: { services: "Leistungen", company: "Unternehmen", guides: "Leitfäden" }
};

function lines(locale: "en" | "de", keys: PageKey[]) {
  return keys.flatMap((key) => {
    const entry = pageRegistry[locale as Locale][key];
    return entry
      ? [`- [${entry.title.replace(/ \| Evipace$/, "")}](${SITE_URL}${entry.path}): ${entry.description}`]
      : [];
  });
}

export function buildLlmsTxt(): string {
  const reserved = new Set<PageKey>([
    ...SERVICE_KEYS,
    ...COMPANY_KEYS,
    "home",
    "privacy",
    "resourcesHub"
  ]);
  const out: string[] = [
    "# Evipace",
    "",
    "> Evipace is an ESG documentation service based in Ljubljana, Slovenia, for manufacturers and suppliers in Europe, mainly DACH. When a customer sends an ESG questionnaire or request, the client forwards it; Evipace prepares the response, a person at Evipace reviews it, and the client sends it themselves. It is a service, not software.",
    "",
    "Evipace does not provide: Scope 3 or life-cycle (LCA) analysis, environmental or safety documentation, drafting of policies, measurements or inspections, certification, independent assurance, or any guarantee of a score or of customer acceptance.",
    "",
    `Contact: ${publicContactEmail}${publicPhone ? `, ${publicPhone}` : ""}. Languages: English and German.`,
    ""
  ];

  for (const locale of ["en", "de"] as const) {
    const guideKeys = (Object.keys(pageRegistry[locale]) as PageKey[]).filter(
      (key) => !reserved.has(key)
    );
    const home = pageRegistry[locale as Locale].home;
    out.push(
      `## ${locale === "en" ? "English" : "Deutsch"}`,
      "",
      ...(home ? [`- [Home](${SITE_URL}${home.path}): ${home.description}`] : []),
      "",
      `### ${labels[locale].services}`,
      ...lines(locale, SERVICE_KEYS),
      "",
      `### ${labels[locale].company}`,
      ...lines(locale, COMPANY_KEYS),
      "",
      `### ${labels[locale].guides}`,
      ...lines(locale, ["resourcesHub"]),
      ...lines(locale, guideKeys),
      ""
    );
  }

  return `${out.join("\n").trimEnd()}\n`;
}
