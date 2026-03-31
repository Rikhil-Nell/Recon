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
        "terminal-green": "var(--accent)",
        "electric-blue": "var(--accent2)",
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
      animation: {
        "lenis-scroll": "none",
        ticker: "ticker 20s linear infinite",
        "marquee-r": "marqueeR 28s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeR: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
