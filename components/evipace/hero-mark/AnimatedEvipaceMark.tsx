import { EvipaceMarkGraphic } from "./EvipaceMarkGraphic";

/**
 * The homepage hero's copy of the approved mark.
 *
 * Geometry comes from the shared EvipaceMarkGraphic; this file only picks the
 * `mark-hero` CSS namespace, whose one-time entrance lives in globals.css.
 * Every base state there is already the finished mark, so with animation
 * unavailable, disabled by `prefers-reduced-motion`, or JavaScript off, the
 * complete approved shape is what renders.
 */
export function AnimatedEvipaceMark({ className }: { className?: string }) {
  return <EvipaceMarkGraphic className={className} namespace="mark-hero" />;
}
