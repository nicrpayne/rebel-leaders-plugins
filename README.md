# Rebel OS Plugins: GRAVITAS & The Codex

Welcome to the Rebel OS Plugins repository. This project contains the front-end code and logic for two core interactive experiences designed for Rebel Leaders: **GRAVITAS** (a diagnostic tool) and **The Codex** (a repository of leadership protocols).

This repository is built using a modern, static web stack designed to be embedded within a larger platform (like Webflow or a custom portal).

## 🚀 The Experience Flow

The user journey is designed as a continuous loop of diagnosis and prescription:

1.  **The Hub (Home):** The user starts at the "Workbench" (`/`), where they see available plugins. GRAVITAS is the entry point.
2.  **GRAVITAS (`/gravity-check`):** A 12-question diagnostic tool disguised as a piece of retro-industrial hardware.
    *   It measures four key forces: **Identity, Relationship, Vision, Culture**.
    *   It calculates a "Gravity Score" and identifies the leader's primary "Leak" (bottleneck) and "Force" (strength).
3.  **The Results (`/results`):** A diagnostic readout that categorizes the leader into an archetype (e.g., "Atmospheric Entry", "Low Earth Orbit") and recommends a specific "First Move".
4.  **The Handoff:** The results page directs the user to **The Codex**, specifically unlocking the protocol recommended by GRAVITAS.
5.  **The Codex (`/codex`):** An "Archivist's Cabinet" containing physical-looking data cartridges.
    *   Users browse protocols by category (Identity, Relationship, Vision, Culture).
    *   Clicking a cartridge loads it into the "Reader Drawer".
    *   The Reader Drawer provides the tactical briefing, the exact script to use, and a step-by-step protocol.

## 🛠 Technical Architecture

*   **Framework:** React 18 with TypeScript.
*   **Build Tool:** Vite (fast HMR, optimized static builds).
*   **Styling:** Tailwind CSS (utility-first, highly customized for the "Hi-Bit / Stained Glass Cyberpunk" aesthetic).
*   **Routing:** `wouter` (lightweight, hook-based routing).
*   **UI Components:** Radix UI primitives (headless, accessible) wrapped with custom Tailwind styling (shadcn/ui inspired).
*   **Data Model:** Static JSON-like objects defined in `client/src/lib/codex-data.ts` and strongly typed via `client/src/lib/codex-schema.ts`.

### Key Directories

*   `/client/src/pages/`: Top-level route components (`Home.tsx`, `GravityCheck.tsx`, `Results.tsx`, `Codex.tsx`).
*   `/client/src/components/`: The core UI building blocks.
    *   `CodexShelf.tsx`: The complex 3-layer architecture for the interactive cartridges.
    *   `GravitasShell.tsx` & `CodexShell.tsx`: The main visual wrappers providing the hardware/cabinet aesthetic.
    *   `ReaderDrawer.tsx`: The slide-out panel for reading protocols.
*   `/client/src/lib/`: Business logic, data, and schemas.
    *   `questions.ts`: The GRAVITAS question bank.
    *   `scoring.ts`: The algorithm that calculates the Gravity Score and archetypes.
    *   `codex-data.ts`: The actual content of the protocols.

## 🎨 Design Philosophy: "Hi-Bit / Stained Glass Cyberpunk"

The visual language is crucial to the experience. It is not standard corporate SaaS.

*   **Skeuomorphism with a Twist:** We use physical metaphors (VU meters, LCD screens, data cartridges, worn journals) but render them with modern lighting, glows, and depth.
*   **Lighting:** Heavy use of radial gradients, box shadows, and blurs to simulate internal light sources (e.g., the warm amber glow emanating from inside a hovered cartridge, the green CRT scanlines on the GRAVITAS screen).
*   **Typography:** A mix of clean sans-serifs for UI, monospace for data/terminals, and serif for physical labels.

### The Cartridge Architecture (`CodexShelf.tsx`)

The data cartridges on the shelf use a specific 3-layer DOM structure to handle complex hover and tilt states without breaking interactivity:

1.  **Layout Shell (`div.group`):** A fixed-size container that handles the grid layout and spacing. It has `pointer-events-none` (except for its children).
2.  **Hitbox (`button`):** An absolutely positioned button that fills the shell (`inset-0`). This ensures the clickable area never moves or shrinks, even when the visual element tilts.
3.  **Visual Layer (`div`):** Sits inside the button. It receives all CSS transforms (tilt, offset) and hover effects (lift, inner-lamp glow).

## 🖼 Asset Management & CDNs

To keep the repository lightweight and load times fast, large image assets are hosted on a CDN.

**How Assets Work for Future Contexts:**

You **do not** need to re-upload the image assets when starting a new conversation. The code references them via direct, permanent URLs (e.g., `https://files.manuscdn.com/...`).

*   **Live Assets:** The URLs are hardcoded in the relevant components (e.g., `SPINE_CDN` in `CodexShelf.tsx`). As long as the code remains, the new context will fetch the images directly from the web when it runs the dev server.
*   **Source Assets:** For your own editing and safekeeping, you should download the original, uncompressed PNGs. (A zip file of these will be provided to your Google Drive).

## 💻 Developer Commands

*   `npm run dev` or `pnpm dev`: Start the Vite development server (usually on port 3000 or 3004).
*   `npm run build` or `pnpm build`: Create a production-ready static build in the `dist/public` folder.
*   `npm run preview` or `pnpm preview`: Serve the production build locally to test it.

## 📝 Current Status & Next Steps

The core architecture, visual language, and data flow are established.

**Recently Completed:**
*   Full data model implementation for Codex entries.
*   Complex 3-layer cartridge hover architecture (fixing hitbox issues).
*   "Inner-lamp" amber glow effect on cartridges.

**Pending / Roadmap (see `todo.md` and `polish_todo.md`):**
*   **GRAVITAS to Codex Handoff:** The mechanism that takes the specific "Leak" identified in GRAVITAS and auto-opens the corresponding protocol in the Codex.
*   **Unlockables:** Implementing a visual "Trophy Case" or inventory system (e.g., earning the Truth Sword).
*   **Run Mode:** Building out the interactive checklist UI inside the Reader Drawer.
*   **Final Visual Polish:** Adjusting VU meter physics, refining CRT text glow, adding press states to buttons.
