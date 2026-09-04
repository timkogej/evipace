import { ExternalLink } from "lucide-react";
import type { PrimarySource } from "@/lib/seo/primary-sources";

const copy = {
  en: { label: "Source", labelPlural: "Sources" },
  de: { label: "Quelle", labelPlural: "Quellen" }
} as const;

/**
 * A compact attribution line placed directly under the claim it supports,
 * rather than collected into a bibliography at the foot of the page. Used
 * where a service or methodology section states something regulatory or
 * methodological — the reader should be able to check that specific claim
 * without hunting.
 *
 * Sources come from lib/seo/primary-sources.ts so the same official URL is
 * used everywhere it is cited.
 */
export function SourceNote({
  locale = "en",
  sources
}: {
  locale?: "en" | "de";
  sources: readonly PrimarySource[];
}) {
  const labels = copy[locale];

  return (
    <p className="mt-6 text-sm leading-7 text-[rgba(21,21,21,0.55)]">
      <span className="font-bold uppercase tracking-[0.12em] text-orange">
        {sources.length > 1 ? labels.labelPlural : labels.label}
      </span>
      {": "}
      {sources.map((source, index) => (
        <span key={source.href}>
          {index > 0 ? " · " : null}
          <a
            className="inline-flex items-center gap-1 font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange"
            href={source.href}
            rel="noreferrer"
            target="_blank"
          >
            {source.label}
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          </a>
        </span>
      ))}
    </p>
  );
}
