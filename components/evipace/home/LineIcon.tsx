import type { ForwardIcon } from "./content";

/** Own line icons (24 px grid, 1.6 px stroke), drawn for the request cards. */
const paths: Record<ForwardIcon, React.ReactNode> = {
  questionnaire: (
    <>
      <rect height="17" rx="2" width="14" x="5" y="4" />
      <path d="M9 4V3h6v1M8.5 10h1M12 10h3.5M8.5 13.5h1M12 13.5h3.5M8.5 17h1M12 17h3.5" />
    </>
  ),
  assessment: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9.5 14.5l2 2 3.5-4" />
    </>
  ),
  carbon: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-5M12 20V9M17 20v-8" />
      <path d="M6 9l4-4 3 2 5-4" />
    </>
  ),
  conduct: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2.2 2.2L15 10.5" />
    </>
  ),
  selfAssessment: (
    <>
      <rect height="16" rx="2" width="16" x="4" y="4" />
      <path d="M7.5 9.5l1.2 1.2 2-2.2M13 9.5h4M7.5 14.5l1.2 1.2 2-2.2M13 14.5h4" />
    </>
  ),
  evidence: (
    <>
      <path d="M3 7.5V18a2 2 0 002 2h14a2 2 0 002-2V9.5a2 2 0 00-2-2h-7l-2-2.5H5a2 2 0 00-2 2.5z" />
      <path d="M8 13h8M8 16h5" />
    </>
  )
};

export function LineIcon({ name, className }: { name: ForwardIcon; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}
