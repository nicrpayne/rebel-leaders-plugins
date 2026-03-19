# Rebel OS Plugins — Integration Handoff Context

Copy and paste this entire document as your opening message when starting the new conversation in the main site repository.

---

## 1. The Source Repository
**Repo URL:** `https://github.com/nicrpayne/rebel-leaders-plugins`

You need to clone this repo, study its components, and merge the relevant code into the main Rebel Leaders website.

---

## 2. Who You Are and What We're Building

You are integrating the **Rebel OS Plugins** into the main **Rebel Leaders** website. 

The main website (rebel-leader.com) establishes a specific world: a pixel-art study room with a warm lamp, bookshelves, a retro quest-giver, and a Rebel HUD. The plugins are the "high-fidelity instruments" that live *inside* this world. They share the same "Hi-Bit / Stained Glass Cyberpunk" aesthetic but are rendered as photorealistic, skeuomorphic hardware (VU meters, CRT screens, data cartridges, rotary knobs) rather than pixel art.

The core message of the entire platform is: **"Hope is an act of rebellion."**

---

## 3. The Two Active Plugins (User-Facing Intent)

You are porting two fully functional tools into the main site:

**1. GRAVITAS (`/gravitas`)**
*What it feels like:* A diagnostic tool disguised as a heavy, retro rack-unit hardware device. You turn a physical knob to answer 20 questions.
*What it does:* It measures team health across four dimensions (Identity, Relationship, Vision, Culture), calculates a "Gravity Score," identifies the primary "Leak" (bottleneck), and suggests a specific "First Move" protocol to fix it.

**2. THE CODEX (`/codex`)**
*What it feels like:* An "Archivist's Cabinet" — a physical wooden shelf full of data cartridges that you load into a tape deck. It plays satisfying mechanical sounds when scanning and reading.
*What it does:* It is a library of high-leverage leadership scripts and protocols. When Gravitas identifies a problem, it sends the user to The Codex to read the specific protocol that solves it.

---

## 4. The 14-Plugin Ecosystem (The Workbench)

Your first major task is to replace the main site's current "Armory" page with a new **Workbench** at `/workbench`. 
The Workbench should display a grid of 14 plugin cards. Only Gravitas and Codex are ACTIVE; the rest are LOCKED placeholders that build anticipation.

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

*Note: The cover art for Gravitas, Codex, LaaS, and HID Scan exist in the plugins repo `public/assets`. The remaining 10 covers still need to be generated later.*

---

## 5. Design Decisions to PRESERVE

- **The Cartridge Architecture (`CodexShelf.tsx`):** The shelf uses a specific 3-layer DOM architecture (Layout Shell > Hitbox > Visual Layer) to handle 3D tilt and hover glows without layout jitter. **DO NOT attempt to restructure or "simplify" it.**
- **The Gravitas → Codex Handoff:** The Gravitas Results page has a "SIDE-CHAIN TO CODEX" button. It passes a signal via URL params (`?signal=received&bottleneck=IDENTITY&firstMove=MOVE_NAME_THE_COST`). The Codex reads this, plays a load sequence, and auto-opens the recommended cartridge. This routing logic MUST survive the port.
- **Audio Context (`CodexAudio.ts`):** The Codex has a newly redesigned audio system (R2-D2 style chirps, warm hums, satisfying clicks). Ensure static imports are maintained in `Codex.tsx` to prevent audio delay.
- **Asset Management:** Large image assets (textures, frames) are hosted on a CDN. Keep the hardcoded CDN URLs (e.g., `https://d2xsxph8kpxj0f.cloudfront.net/...`). Do not download them.

---

## 6. Design Decisions to OVERRIDE

- **Theming & Shell:** The plugins repo uses a generic `PluginShell.tsx` and generic Tailwind styling for the surrounding page. **OVERRIDE THIS.** When porting, apply the main site's forest-green/gold/pixel RPG aesthetic to the surrounding wrappers so the tools feel native to the site, not bolted on.
- **Routing:** The plugins repo uses `wouter`. The main site likely uses something else (React Router, Next.js). Rewrite the routing logic to fit the main site.

---

## 7. High-Level Process for the Main Site Conversation

1. **Pull and study:** Clone the plugins repo, read every file, understand the components, data flow, and map out dependencies.
2. **Plan the merge:** Write out exactly which files go where in the main site structure, what gets renamed, what needs new routes, and post it for user approval before touching code.
3. **Migrate the code:** Move components into the main site (e.g., `client/src/pages/Workbench/`), merge any logic, pull in dependencies.
4. **Theme pass:** Apply the main site's RPG aesthetic to the wrappers.
5. **Navigation and routing:** Replace the Armory page with the Workbench at `/workbench`, update the nav header, add sub-routes for each tool (`/workbench/gravitas`, `/workbench/codex`).
6. **XP and achievements (CRITICAL):** Wire the tools into the main site's game system. Users should earn XP/achievements for first use, completing Gravitas assessments, reading Codex protocols, etc.
7. **Test everything:** Full pass on desktop and mobile, ensuring Side-Chain handoff and audio work perfectly.
8. **Checkpoint and ship.**
