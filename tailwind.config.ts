import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        orange: "var(--orange)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        paper: "var(--paper)",
        surface: "var(--surface)",
        border: "var(--border)",
        dark: "var(--dark)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["GFS Didot", "Georgia", "serif"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(21, 21, 21, 0.10)",
        lift: "0 18px 50px rgba(21, 21, 21, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
