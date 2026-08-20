import { GFS_Didot, Inter } from "next/font/google";

/**
 * Self-hosted via next/font/google — replaces the previous CSS `@import`
 * from fonts.googleapis.com. Same fonts, same weights, same visual output;
 * this only changes how they're loaded:
 * - eliminates the external request chain (globals.css -> Google's CSS ->
 *   the actual font files) that previously had to happen serially before
 *   text could render in the correct font,
 * - Next.js downloads and serves the font files from the app's own origin
 *   at build time,
 * - `display: "swap"` preserves the existing swap behavior from the old
 *   @import's `&display=swap`.
 *
 * Each font exposes a CSS custom property (`variable`) rather than
 * Next.js's auto-injected className, so the existing font-family
 * declarations in globals.css only need to reference the variable instead
 * of a literal font name — nothing about which element uses which font
 * changes.
 */
export const gfsDidot = GFS_Didot({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gfs-didot"
});

export const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});
