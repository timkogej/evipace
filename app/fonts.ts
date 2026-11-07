import { Geist, Geist_Mono, Inter } from "next/font/google";

/**
 * Self-hosted via next/font/google, exposed as CSS custom properties so
 * stylesheets only reference the variable:
 * - `--font-display`: Geist, for headings. A modern grotesk that stays sharp
 *   at large sizes and has real weights (Didot only had one).
 * - `--font-inter`: Inter, for body copy and interface text.
 * - `--font-mono`: Geist Mono, for small labels and codes (eyebrows,
 *   status tags) that give the site an operational, record-like feel.
 */
export const display = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-display"
});

export const mono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono"
});

export const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter"
});
