import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        accent: "var(--accent)",
        "accent-2": "var(--accent2)",
        "accent-alt": "var(--accent-alt)",
        outline: "var(--outline)",
        dim: "var(--dim)",
        border: "var(--border)",
        "border-dim": "var(--border-dim)",
      },
      fontFamily: {
        brand: ["var(--font-michroma)", "sans-serif"],
        headline: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        body: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
