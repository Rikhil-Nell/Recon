# Recon 2026 Design System & Agent Prompt

If you want another AI agent or developer to replicate the exact premium, raw, "DEFCON-style" aesthetic used in the Recon 2026 project, share this entire document with them.

---

## Agent Setup Prompt
**Copy and paste the following block to your new agent when starting a related project:**

> **System Prompt / Persona Instruction:**
> You are building a web application that must strictly adhere to the "Recon 2026" Design System.
> The aesthetic is premium, raw, dark-mode-only, with a heavy emphasis on typography and subtle cyberpunk/hacker undertones (without looking like a cliché green-on-black terminal).
> 
> **1. Core Palette (CSS Variables):**
> - `--purple: #8B5CF6;` (Primary brand color)
> - `--purple-light: #A78BFA;` (Secondary text accents)
> - `--purple-dark: #6D28D9;` (Gradients and background glows)
> - `--purple-glow: rgba(139, 92, 246, 0.4);` (Drop shadows and text glows)
> - `--black: #09090B;` (Main background)
> - `--gray-950: #0C0C0F;` (Card backgrounds)
> - `--gray-900: #18181B;` (Lighter cards and panels)
> - `--gray-800: #27272A;` (Borders and dividers)
> - `--gray-400: #A1A1AA;` (Primary body text)
> - `--white: #FAFAFA;` (Headings and high-contrast text)
> 
> **2. Typography System:**
> Embed Google Fonts: `Archivo Black`, `Space Grotesk` (weights 400, 500, 600, 700), and `JetBrains Mono` (weights 400, 500).
> - **H1/H2 Headers & Large Numbers:** `Archivo Black`, uppercase, tight letter spacing (`letter-spacing: -0.03em`), extremely tight line-height (`line-height: ~0.95`). Color: `--white`.
> - **Body & Subtitles:** `Space Grotesk`, highly readable, relaxed line-height (`line-height: 1.65`). Body color: `--gray-400`. Subtitles: `--purple-light`.
> - **Eyebrows & Technical Data:** `JetBrains Mono`, uppercase, tracked out (`letter-spacing: 0.15em`), small font size. Color: `--purple`.
> - **Fluid Sizing:** ALWAYS use `clamp()` for font sizes so text scales perfectly from mobile to ultra-wide desktop. (e.g., `font-size: clamp(3rem, 9vw, 7.5rem)`).
> 
> **3. Signature Visual Effects (MANDATORY):**
> - **The Grain:** Apply a fixed `.noise` overlay div spanning the whole screen with an SVG `<feTurbulence>` fractal noise filter at `opacity: 0.03` with `pointer-events: none; z-index: 999;`.
> - **Ambient Glows:** Use large, absolute-positioned circular divs (`border-radius: 50%`) colored with `--purple` or `--purple-dark` and extremely blurred (`filter: blur(120px); opacity: 0.12;`) behind the content.
> - **Raw Drop Shadows:** Instead of soft, fuzzy shadows on cards, use hard offset box-shadows: `box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5)`. Hover states on interactive cards should enhance this: `box-shadow: 6px 6px 0px rgba(139, 92, 246, 0.2)` with a slight `transform: translate(-2px, -2px)`.
> - **Card Interactions:** Cards (`background: var(--gray-900), border: 1px solid var(--gray-800)`) should feature a subtle left-border or `::before` pseudo-element spanning the left height (`width: 3px; background: var(--purple); opacity: 0.5`). On hover, smoothly scale the opacity/width of that accent.
> - **The "Eyebrow" Pill:** Use small `<div class="eyebrow">` elements above major headings. They must have a subtle background (`var(--purple-subtle)`), a 1px border (`rgba(139, 92, 246, 0.2)`), and contain a small glowing dot (`::before { width: 6px; height: 6px; background: var(--purple); border-radius: 50%; box-shadow: 0 0 8px var(--purple-glow); }`).
> 
> **4. Layout & Grid Rules:**
> - Ensure all major visual blocks use CSS Grid or Flexbox with `clamp()` values for gaps to maintain proportional spacing across viewports (e.g., `gap: clamp(1.5rem, 3vw, 2.5rem)`).
> - Keep UI constraints clean: a centered max-width container (e.g., `max-width: 1300px`) inside standard padding.
> - **DO NOT rely entirely on Tailwind utility classes if they constrain these specific granular values**—write raw CSS for components that need exact tuning (like the noise overlay, raw box shadows, and clamp typography).

---

### How to Use This

If you are trying to build another dashboard, registration portal, or event website that matches the Recon deck:
1. Copy the block above into your prompt when talking to an AI.
2. Ask them to scaffold their React/Vite/HTML boilerplate and immediately apply those exact tokens into their core CSS file.
3. If they generate a UI that feels "too clean" or "corporate," specifically remind them to enforce the **Raw Drop Shadows** and **Archivo Black uppercase headers**. That's what gives Recon its edge.
