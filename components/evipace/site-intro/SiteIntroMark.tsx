import { EvipaceMarkGraphic } from "../hero-mark/EvipaceMarkGraphic";

/**
 * The full-screen intro's copy of the approved mark.
 *
 * Same shared geometry as the hero — only the CSS namespace differs, so the
 * intro can run its own compressed assembly and the FLIP handoff lands on a
 * pixel-identical shape.
 */
export function SiteIntroMark({ className }: { className?: string }) {
  return <EvipaceMarkGraphic className={className} namespace="site-intro" />;
}
