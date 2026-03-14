# Rebel OS Plugins: Strategic Context & Handoff Document

This document is designed to give any developer, AI agent, or collaborator an exhaustive understanding of the "Rebel OS Plugins" project. It goes beyond technical implementation (which is covered in `README.md`) to explain the *why*, the aesthetic philosophy, the overarching goals, and the specific quirks of the codebase.

## 1. The Big Picture: What Are We Building?

This project is a suite of interactive, web-based tools designed for **leadership development and team coaching**. It is not a standard B2B SaaS product. It is designed to feel like an "underground," slightly subversive operating system for leaders who want to cut through corporate bullshit and build real culture.

The core message is: **"Hope is an act of rebellion."** The tools are designed to help leaders diagnose team dysfunction (Gravity Check) and prescribe specific, actionable interventions (The Codex).

### The "Rebel OS" Concept
These plugins will eventually live inside a larger "Rebel OS" ecosystem (likely embedded in Webflow or a custom portal). They need to feel cohesive, tactile, and slightly mysterious.

## 2. Aesthetic Philosophy: "Hi-Bit / Stained Glass Cyberpunk"

The visual identity is paramount. We are actively avoiding the clean, flat, rounded-corner aesthetic of modern corporate software.

*   **Skeuomorphism with Modern Lighting:** We use physical metaphors (VU meters, LCD screens, heavy metal chassis, worn journals, data cartridges). However, we render them using modern CSS capabilities—deep shadows, complex radial gradients, blurs, and glows.
*   **"Stained Glass Cyberpunk":** This means dark, moody environments illuminated by warm, localized light sources. Think of the warm amber glow emanating from *inside* a data cartridge, or the harsh green glow of a CRT monitor against dark metal.
*   **The 8-Bit / Pixel Art Influence:** There is a strong preference for pixel art elements (e.g., the "Truth Sword," the Nic sprite) mixed with high-resolution textures. This creates a unique "hi-bit" feel, similar to modern indie games like *Octopath Traveler*.
*   **Tactility:** Interactions should feel heavy and deliberate. Buttons shouldn't just change color; they should feel like they are being pressed into a chassis.

## 3. The Core Modules

### Module A: GRAVITAS (The Diagnostic)
*   **Concept:** A heavy, retro-industrial piece of hardware used to "calibrate" a team's current state.
*   **Mechanics:** Users answer 12 questions across four dimensions: Identity, Relationship, Vision, Culture.
*   **Visuals:** Features a CRT-style LCD screen, a rotary knob, and a VU meter.
*   **Output:** Generates a "Gravity Score," identifies the primary "Leak" (bottleneck), and suggests a "First Move" (protocol).

### Module B: The Codex (The Archive)
*   **Concept:** An "Archivist's Cabinet" where the actual leadership protocols (the "dangerous knowledge") are stored.
*   **Mechanics:** A visual grid of data cartridges. Clicking a cartridge loads it into a "Reader Drawer" for execution.
*   **Visuals:** Highly complex CSS layout. The cartridges are designed to look like physical tapes sitting on wooden shelves.
*   **The Data:** Driven by `codex-data.ts`, containing scripts, "Use When" scenarios, and step-by-step execution plans.

## 4. Technical Quirks & Hard Rules

### The Cartridge Architecture (`CodexShelf.tsx`)
This is the most complex UI element and has strict rules.
*   **The Problem:** We needed cartridges to tilt and lift on hover, but CSS `transform: rotate()` changes the element's bounding box, causing the hover state to flicker rapidly if the mouse was near the edge.
*   **The Solution (The 3-Layer Architecture):**
    1.  **Layout Shell (`div.group`):** A fixed, non-moving container that handles spacing.
    2.  **Hitbox (`button`):** `absolute inset-0 z-10`. This is the clickable area. It *never* moves or rotates.
    3.  **Visual Layer (`div`):** Sits *behind* the hitbox (`z-0` or lower). This receives all the visual transforms (tilt, lift, glow).
*   **HARD RULE:** **Do not touch the `CartridgeSpine` or `CartridgeFlat` layout architecture without explicit permission.** Spacing adjustments should only be made via the `TOP_SHELF_ARRANGEMENT` constants.

### Asset Management (The CDN Strategy)
*   **The Problem:** High-quality PNGs (like the cabinet frame or the swords) are large. Storing them in the repo slows down Git and breaks static deployment limits.
*   **The Solution:** All large assets are hosted on a CDN (`files.manuscdn.com`).
*   **How it works for AI Contexts:** When spinning up a new conversation, you **do not need to re-upload the assets**. The code references the permanent web URLs. The local Vite server will fetch them directly from the CDN.
*   **Source Assets:** A zip file of the original, uncompressed assets exists for the user's safekeeping, but they are not needed for development.

### Development Preferences
*   **Modular Design:** Components must be isolated. Changes to the Reader Drawer should not break the Shelf.
*   **Mobile-First:** The user expects most traffic to be mobile. Always ensure the layout degrades gracefully (e.g., the complex cabinet becomes a simpler list or grid on small screens).
*   **Preservation:** Never overwrite complex, working code (like the 3-layer cartridge) just to try a new idea. Branch it, comment it out, or ask first.

## 5. Current State & Immediate Roadmap

As of this handoff, the core visual architecture for both GRAVITAS and The Codex is in place. The data model is wired up. The complex hover states on the cartridges are fixed.

**What needs to be done next:**

1.  **The Handoff Mechanism:** Currently, GRAVITAS gives a result, but it doesn't *actually* auto-open the corresponding protocol in The Codex. We need to build the state management (likely via URL parameters or a shared context) to make that "Signal Received" transition seamless.
2.  **Run Mode (The Checklist):** The Reader Drawer currently shows the "Briefing." We need to build out the "Run Mode"—an interactive, step-by-step checklist that the leader uses *during* the conversation.
3.  **Unlockables / Gamification:** The user wants to integrate the "Truth Sword" pixel art. This needs a home—perhaps a "Trophy Case" or an "Inventory" screen that unlocks after completing a protocol.
4.  **Final Polish:** Refer to `polish_todo.md` and `final_polish_todo.md` for micro-interactions (VU meter physics, button press states, typography tweaks).

## 6. Tone & Voice Guidelines for Future Content

When writing new protocols or UI copy:
*   **Avoid LLM Tropes:** No excessive em-dashes, no predictable triplet cadences ("innovate, iterate, elevate").
*   **Tone:** Direct, slightly gritty, hopeful but grounded in reality. Use terms like "Leak," "Friction," "Protocol," "Signal."
*   **Influences:** Blend practical leadership advice with ancient wisdom (e.g., referencing mystics or philosophy) to create a unique, non-corporate voice.
