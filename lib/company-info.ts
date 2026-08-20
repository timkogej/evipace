export type FounderInfo = {
  name: string;
  title: string;
  bio?: string;
  photo?: {
    src: string;
    alt: string;
  };
};

/**
 * Real, verified founder information only. Until it's explicitly provided
 * and approved, this stays null and the About page renders without a
 * founder section rather than showing placeholder or invented content.
 */
export const founderInfo: FounderInfo | null = null;

/**
 * General location context only, per explicit instruction — no legal
 * entity name or registered address until that's provided and approved
 * separately.
 */
export const companyLocationStatement = "Slovenia-based";

/**
 * Reuses the same public contact address already published on the
 * homepage (see components/evipace/FinalCTA.tsx) — not a newly invented
 * channel.
 */
export const publicContactEmail = "hello@evipace.com";
