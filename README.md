# Rebel OS Plugins

This repository contains the interactive leadership tools (plugins) that will be integrated into the main Rebel Leaders platform (Rebel OS). These are not standard B2B SaaS tools; they are designed as high-fidelity, skeuomorphic "sacred instruments" that diagnose organizational dysfunction and prescribe specific, actionable interventions.

## The Architecture

This is a Vite + React + TypeScript application using TailwindCSS. It currently operates as a standalone preview environment (The Workbench) but is architected to be integrated into a larger Webflow or Next.js platform.

### Core Modules

1. **The Workbench (`/`)**
   The launchpad. Displays the grid of available and locked plugins. This is a temporary container for development; the main site will handle the actual Workbench UI.

2. **GRAVITAS (`/gravitas`)**
   A diagnostic tool disguised as a retro rack-unit hardware device. It measures team health across four dimensions: Identity, Relationship, Vision, and Culture.
   - Uses a custom `RotaryKnob` component for tactile input.
   - Calculates a "Gravity Score," identifies the primary "Leak" (bottleneck), and suggests a "First Move" protocol.
   - **Key files:** `GravityCheck.tsx`, `scoring.ts`, `GravitasShell.tsx`

3. **The Codex (`/codex`)**
   An "Archivist's Cabinet" of leadership protocols rendered as physical data cartridges on wooden shelves.
   - Contains 27 unique protocols defined in `codex-data.ts`.
   - Uses a highly complex 3-layer DOM architecture (`CodexShelf.tsx`) to handle 3D tilt and hover glows without layout jitter.
   - Clicking a cartridge loads it into the `CabinetDeck.tsx` (the tape deck), triggering an audio/visual scan sequence.
   - Reading a cartridge opens the `ReaderDrawer.tsx` overlay.

## Visual Design System: "Hi-Bit / Stained Glass Cyberpunk"

The aesthetic is physical, heavy, and slightly mysterious. We actively avoid clean, flat, rounded-corner corporate UI.

- **Skeuomorphism with Modern Lighting:** We use physical metaphors (VU meters, LCD screens, heavy metal chassis, worn journals, data cartridges) rendered with modern CSS capabilities—deep shadows, complex radial gradients, blurs, and glows.
- **Stained Glass Cyberpunk:** Dark, moody environments illuminated by warm, localized light sources (amber/gold) and harsh diagnostic glows (cyan/green).
- **Tactility:** Interactions feel heavy and deliberate. Buttons depress, audio clicks and hums accompany actions.

## Asset Management Strategy

**Do not store large image assets in the Git repository.**

To bypass Git size limits and ensure fast loading, all large textures, hero images, and background plates are hosted on a CDN. The code references these permanent URLs directly.

*CDN Base URL:* `https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/`

A few essential local assets (like audio files and UI icons) are kept in `client/public/assets/`.

## The Cartridge Architecture (DO NOT MODIFY)

The `CodexShelf.tsx` component uses a specific 3-layer architecture to handle the data cartridges. **Do not attempt to restructure this or "simplify" it.** It is the result of significant debugging to prevent hover-state flickering when CSS transforms change the element's bounding box.

1. **Layout Shell (`div.group`):** A fixed, non-moving container that handles grid spacing.
2. **Hitbox (`button`):** `absolute inset-0 z-10`. This is the clickable area. It never moves or rotates.
3. **Visual Layer (`div`):** Sits behind the hitbox. This receives all the visual transforms (tilt, lift) and the inner-lamp hover glow.

Spacing adjustments to the top shelf are only permitted via `TOP_SHELF_ARRANGEMENT` constants.

## Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Production build
pnpm build
```

## Current State & Next Steps for Integration

This repository is currently in a "handoff" state, ready to be integrated into the main Rebel Leaders website.

**Recent Additions:**
- Fully redesigned audio system for the Codex tape deck (cartridge load, scan sequence, eject).
- Contextual indicator lights on the Codex deck.
- Generated the first locked plugin cover art (`hid_scan_cover.webp`) to establish the visual language for future plugins.

**Integration Strategy:**
The components in this repository (specifically `GravityCheck.tsx` and `Codex.tsx`) need to be ported into the main site's routing structure. The `codex-data.ts` and `scoring.ts` logic modules are pure TypeScript and can be dropped in directly.

See `INTEGRATION_HANDOFF.md` for the complete context required by the main site development team.
