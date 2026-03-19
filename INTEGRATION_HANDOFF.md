# Rebel OS Plugins — Integration Handoff Context

Copy and paste this entire document as your opening message when starting the new conversation in the main site repository.

---

## Who You Are and What We're Building

You are integrating the **Rebel OS Plugins** (from `nicrpayne/rebel-leaders-plugins`) into the main **Rebel Leaders** website. 

The main website (rebel-leader.com) establishes a specific world: a pixel-art study room with a warm lamp, bookshelves, a retro quest-giver, and a Rebel HUD. The plugins are the "high-fidelity instruments" that live *inside* this world. They share the same "Hi-Bit / Stained Glass Cyberpunk" aesthetic but are rendered as photorealistic, skeuomorphic hardware (VU meters, CRT screens, data cartridges, rotary knobs) rather than pixel art.

The core message of the entire platform is: **"Hope is an act of rebellion."**

---

## The Integration Target: The Workbench

The main site has a "Workbench" section. This is where the plugins live. 
Currently, the plugin repo has a standalone `Home.tsx` that mocks up this Workbench with a grid of 14 plugin cards.

**Your first major task is to rebuild this Workbench UI in the main site.**

### The 14 Plugins (The Ecosystem)

The Workbench should display these 14 cards. Only the first two are ACTIVE; the rest are LOCKED placeholders that build anticipation.

| Plugin | Status | Type | Core Concept |
|---|---|---|---|
| **Gravitas** | ACTIVE | MIRROR | Diagnostic tool. 20 questions reveal the hidden forces shaping a team's orbit. |
| **The Codex** | ACTIVE | MOVE | Protocol library. High-leverage leadership scripts and execution guides. |
| **LaaS Calibrator** | LOCKED | MAP | Leadership As A Service. Measures a team's dependency ratio. |
| **HID Scan** | LOCKED | MIRROR | Depth analysis. Measures if work is touching roots or just symptoms. |
| **The Terrain** | LOCKED | MAP | Mythic cartography. Organizations are landscapes, not flat charts. |
| **Leak Finder** | LOCKED | SIGNAL | Fault detection. Where the system is bleeding trust, clarity, or energy. |
| **Signal Decoder** | LOCKED | SIGNAL | Signal analysis. Translating recurring tensions into truth. |
| **Soil Test** | LOCKED | MIRROR | Ecological analyzer. Does the culture actually sustain life? |
| **Identity Weather** | LOCKED | MIRROR | Soul radar. The atmosphere a person lives under before they speak. |
| **Org Orbit** | LOCKED | MAP | Cosmic systems map. What your people are becoming by what is central. |
| **Move Matcher** | LOCKED | MOVE | Tactical routing. Fitting the right move to the actual rupture. |
| **Conflict Reframe** | LOCKED | SIGNAL | Optical prism. What kind of truth is hiding inside the conflict. |
| **Field Notes** | LOCKED | SIGNAL | Expedition log. Reflection as formation. |
| **Praxis Builder** | LOCKED | MOVE | Action sequencer. Transformation through repeated embodied practice. |

*Note: The cover art for Gravitas, Codex, LaaS, and HID Scan exist in the assets. The remaining 10 covers still need to be generated in the digital/HUD/sacred-console style.*

---

## The Two Active Plugins to Port

You need to port the code for **Gravitas** and **The Codex** from the plugins repo into the main site repo.

### 1. GRAVITAS (`/gravitas`)
A diagnostic tool disguised as a retro rack-unit hardware device. It measures team health across Identity, Relationship, Vision, and Culture.

**Key files to port:**
- `client/src/pages/GravityCheck.tsx` (The assessment flow)
- `client/src/pages/Results.tsx` (The read-out)
- `client/src/components/GravitasShell.tsx` (The UI wrapper)
- `client/src/components/ui/RotaryKnob.tsx` (The tactile input)
- `client/src/lib/scoring.ts` (The logic engine)
- `client/src/lib/questions.ts` (The assessment data)

### 2. The Codex (`/codex`)
An "Archivist's Cabinet" of leadership protocols rendered as physical data cartridges on wooden shelves. 

**Key files to port:**
- `client/src/pages/Codex.tsx` (The main page)
- `client/src/components/codex/CodexShelf.tsx` (The complex 3-layer cartridge shelf)
- `client/src/components/codex/CabinetDeck.tsx` (The tape deck control surface)
- `client/src/components/reader/ReaderPanel.tsx` (The fullscreen protocol reader)
- `client/src/lib/codex-data.ts` (The 27 protocols)
- `client/src/lib/CodexAudio.ts` (The audio engine)

---

## Critical Technical Rules (Do Not Violate)

1. **The Cartridge Architecture (`CodexShelf.tsx`) MUST NOT BE CHANGED.**
   The shelf uses a specific 3-layer DOM architecture (Layout Shell > Hitbox > Visual Layer) to handle 3D tilt and hover glows without layout jitter. This is the result of significant debugging. Do not attempt to restructure or "simplify" it during the port.

2. **Asset Management.**
   Large image assets (textures, frames) are hosted on a CDN. Do not download them and put them in the main site repo. Keep the hardcoded CDN URLs (e.g., `https://d2xsxph8kpxj0f.cloudfront.net/...`).

3. **The Gravitas → Codex Handoff.**
   The Results page has a "SIDE-CHAIN TO CODEX" button. It passes a signal via URL params (`?signal=received&bottleneck=IDENTITY&firstMove=MOVE_NAME_THE_COST`). The Codex reads this, plays a load sequence, and auto-opens the recommended cartridge. Ensure this routing logic survives the port to the main site's router (whether that's Next.js, React Router, etc.).

4. **Audio Context.**
   The Codex has a newly redesigned audio system (R2-D2 style chirps, warm hums, satisfying clicks). Ensure `CodexAudio.ts` is ported correctly and the static imports in `Codex.tsx` are maintained to prevent audio delay.

---

## Your First Steps in the New Repo

1. Review the main site's routing and layout structure.
2. Rebuild the Workbench UI (the grid of 14 plugins) as a page or section in the main site.
3. Port the Gravitas components and ensure the assessment runs and scores correctly.
4. Port the Codex components and ensure the complex shelf CSS and hover states survive the transition.
5. Test the Side-Chain handoff between Gravitas Results and The Codex.
