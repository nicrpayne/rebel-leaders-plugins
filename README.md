# Rebel Leaders Plugins

> **A suite of interactive leadership tools built for the Rebel Leaders ecosystem.** Not productivity software. Not a quiz. A diagnostic and protocol system designed to help leaders see clearly and act precisely — wrapped in a visual world that feels like it belongs to them.

---

## Why This Exists

Most leadership content is generic. It tells you what good leadership looks like in the abstract, then leaves you to figure out the gap between that ideal and your actual team, your actual week, your actual conversation on Tuesday afternoon.

The Rebel Leaders Plugins system is built on a different premise: **the most useful thing a leader can receive is a specific, honest read of their current situation, paired with the exact move to make next.**

This is not a course. It is not a framework to memorize. It is a set of precision instruments — a diagnostic that reveals what's actually happening beneath the surface of your team, and a codex of high-leverage protocols that tell you exactly what to say and do about it.

The visual design is intentional. The retro-industrial aesthetic — the instrument panels, the parchment cartridges, the lantern-lit cabinet — is not decoration. It is a signal. This is a tool built for people who take their craft seriously, who want something that feels different from the sea of corporate SaaS, and who understand that the best tools have a soul.

---

## The System at a Glance

The system currently has two active instruments and a workbench that will house more:

| Instrument | Route | Purpose |
|---|---|---|
| **Workbench** | `/` | Home base. Plugin catalog and navigation hub. |
| **Gravitas** | `/gravitas` | Diagnostic. 20 questions reveal the hidden forces shaping your team. |
| **Results** | `/results` | Output of Gravitas. Archetype, dimension scores, Leak, Force, and First Move. |
| **The Codex** | `/codex` | Protocol library. High-leverage leadership scripts and execution guides. |
| **Assets** | `/assets` | Internal asset management (dev use). |

---

## The User Experience Flow

### 1. The Workbench — `/`

The entry point. A dark, atmospheric workbench displays the available plugins as large visual cards. Currently, **Gravitas** is the only active instrument (status: `ACTIVE`). The Codex and future instruments are shown as locked (`LOCKED`) — visible but inaccessible, building anticipation.

The user selects a plugin to enter its world.

---

### 2. Gravitas — `/gravitas`

**The diagnostic instrument.** A dark sci-fi instrument panel (the "Gravitas Shell") that runs a leadership assessment.

**Entry screen — Scan Depth Selection:**
The user first chooses how deep to go:
- **SCAN** — 20 questions, ~4 minutes. Surface-level field reading. Fast. Directional.
- **DEEP SCAN** — 52 questions, ~12 minutes. Full gravitational mapping. Thorough. Revelatory.

**The assessment:**
Questions are answered using a **rotary knob** UI — a physical, tactile interaction that feels nothing like a standard survey. The knob is dragged to dial in a response. A progress bar and section indicators track position through the assessment.

Questions are organized across four **Flywheel Dimensions**:
- **IDENTITY** — How clearly the leader and team know who they are and what they stand for.
- **RELATIONSHIP** — The quality of trust, safety, and honest communication on the team.
- **VISION** — Whether there is a clear, shared direction that people actually believe in.
- **CULTURE** — The unwritten rules, norms, and behavioral patterns that govern daily life.

On the final question, the NEXT button becomes **INITIALIZE** — signaling the shift from input to output.

**Footer navigation:** WORKBENCH link is always present so the user can exit at any point.

---

### 3. Results — `/results`

**The read-out.** The instrument panel reconfigures to display the diagnostic output. All data is stored in `localStorage` as `gravityCheckResults` and persists between sessions.

The results surface five key outputs:

| Output | What It Means |
|---|---|
| **Archetype** | A named gravitational state describing the overall health of the team's orbit. Five archetypes exist: `DEAD ORBIT`, `FRICTION BELT`, `COMPENSATION ORBIT`, `EMERGING GRAVITY`, `FULL ORBIT`. |
| **Dimension Bars** | Visual scores (0–100) for each of the four flywheel dimensions: Identity, Relationship, Vision, Culture. |
| **The Leak** | The lowest-scoring dimension. The primary drag on the system. Where energy is escaping. |
| **The Force** | The highest-scoring dimension. The existing strength to build from. |
| **First Move** | A specific, named protocol recommendation — the single highest-leverage action to take first. |

**The Side-Chain:**
The Results page has a **SIDE-CHAIN TO CODEX** button. When pressed, it passes the diagnostic signal (bottleneck dimension + First Move protocol ID) directly to the Codex, which auto-opens the recommended cartridge. This is the primary handoff between the two instruments.

**Footer navigation:**
- **RE-RUN** — Return to Gravitas to run the assessment again.
- **RETURN TO WORKBENCH** — Navigate back to the home base.

---

### 4. The Codex — `/codex`

**The protocol library.** A warmly lit, lantern-style cabinet filled with cartridges — each one a named leadership move. The visual metaphor is deliberate: these are physical objects you load, read, and run.

**The Cabinet:**
Cartridges are organized on shelves by category. Each cartridge shows:
- A title label (the name of the move)
- A difficulty rating (1–5)
- A time commitment
- A category badge (Conflict, Vision, Alignment, Culture, Identity, Relationship)

**Cartridge States:**
- **Unloaded** — Default state. Cartridge sits on the shelf.
- **Loaded** — Selected. The cartridge is in the deck. SCAN and READ/RUN buttons activate.
- **Scanned** — The cartridge has been scanned. A brief preview is visible in the panel.
- **Read** — The full reader panel is open.

**The Deck:**
The CabinetDeck component is the control surface at the top of the Codex. It contains:
- The loaded cartridge display
- **SCAN** — Triggers a brief animated scan sequence and loads a preview of the cartridge content into the panel window.
- **READ** — Opens the full ReaderPanel overlay.
- **RUN** — Opens the ReaderDrawer (the execution checklist mode).

**The ReaderPanel:**
A fullscreen portal overlay rendered as a lantern-frame panel with a parchment glass content area. Content is organized into four scroll-revealed sections:
1. **WHY THIS FOUND YOU** — The `use_when` triggers and `avoid` conditions. When to use this move and when not to.
2. **WHAT THIS OPENS** — The `objective`, `outcome`, and `why_it_works` explanation.
3. **THE PRACTICE** — The verbatim `script` (exact words to say, with a COPY button) and the `protocol` steps.
4. **WHAT TO NOTICE** — The `watch_for` signals and `proof` (research, books, field notes).

Sections are revealed progressively as the user scrolls, using an intersection-observer-based animation system. The `[X]` button closes the panel.

**Gravitas Signal Integration:**
When the user arrives at the Codex via the Side-Chain from Results, the URL carries `?signal=received&bottleneck=IDENTITY&firstMove=MOVE_NAME_THE_COST`. The Codex reads this signal and auto-loads the recommended cartridge, creating a seamless handoff from diagnosis to action.

**Footer navigation:**
- **WORKBENCH** — Returns to the home base.
- **RUN GRAVITAS** — Navigates to the Gravitas diagnostic.

---

## Navigation Map

```
Workbench (/)
├── → Gravitas (/gravitas)
│       ├── → Results (/results)
│       │       ├── → Codex (/codex) [via Side-Chain with signal]
│       │       ├── → Gravitas (/gravitas) [Re-run]
│       │       └── → Workbench (/)
│       └── → Workbench (/)
└── → Codex (/codex)
        ├── → Workbench (/)
        └── → Gravitas (/gravitas) [Run Gravitas]
```

---

## Technical Architecture

### Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Routing | Wouter (lightweight client-side router) |
| Styling | TailwindCSS + inline styles for dynamic values |
| State | React `useState` / `useEffect` + `localStorage` for persistence |
| Fonts | VT323 (monospace terminal), Cinzel (parchment headings), IM Fell English (body serif) |

### Key Files

| File | Role |
|---|---|
| `client/src/App.tsx` | Route definitions. Four active routes. |
| `client/src/pages/Home.tsx` | Workbench plugin catalog. |
| `client/src/pages/GravityCheck.tsx` | Full Gravitas assessment flow. Scan depth selection + question loop. |
| `client/src/pages/Results.tsx` | Results display and Side-Chain logic. |
| `client/src/pages/Codex.tsx` | Codex page. Reads URL signal, manages loaded cartridge state. |
| `client/src/lib/scoring.ts` | Calculates dimension scores, archetype, leak, force, and first move from raw answers. |
| `client/src/lib/codex-ranking.ts` | Scores all Codex cartridges against a Gravitas signal to find the best recommendation. |
| `client/src/lib/codex-schema.ts` | TypeScript type definitions for all Codex entry fields. |
| `client/src/lib/codex-data.ts` | The actual cartridge content — all entries in the library. |
| `client/src/components/GravitasShell.tsx` | The dark sci-fi instrument panel wrapper used by both Gravitas and Results. |
| `client/src/components/CabinetDeck.tsx` | The Codex control surface — cartridge deck, SCAN/READ/RUN buttons, panel window. |
| `client/src/components/reader/ReaderPanel.tsx` | The fullscreen lantern-frame reader overlay. Portal-rendered to `document.body`. |
| `client/src/components/ReaderDrawer.tsx` | The RUN mode execution checklist. Portal-rendered to `document.body`. |
| `client/src/components/ui/RotaryKnob.tsx` | The tactile drag-to-answer knob used in Gravitas. |

### Data Flow

```
User answers questions (GravityCheck)
        ↓
calculateScore() [scoring.ts]
        ↓
gravityCheckResults → localStorage
        ↓
Results page reads localStorage
        ↓
Displays archetype, dimensions, leak, force, firstMove
        ↓
SIDE-CHAIN TO CODEX → /codex?signal=received&bottleneck=X&firstMove=Y
        ↓
Codex reads URL params → getBestCartridge() [codex-ranking.ts]
        ↓
Auto-loads recommended cartridge → ReaderPanel opens
```

### Scoring System

The `calculateScore()` function in `scoring.ts` processes the raw knob answers and produces:

- **Dimension scores** (0–100 each): Average of all answers in that dimension's questions.
- **Total score**: Average of all four dimensions.
- **Archetype**: Determined by total score thresholds:
  - `< 30` → DEAD ORBIT
  - `30–49` → FRICTION BELT
  - `50–64` → COMPENSATION ORBIT
  - `65–79` → EMERGING GRAVITY
  - `≥ 80` → FULL ORBIT
- **Leak**: The lowest-scoring dimension (where energy is escaping).
- **Force**: The highest-scoring dimension (the existing strength).
- **First Move**: A specific Codex protocol ID matched to the user's situation.

### Codex Ranking System

The `getBestCartridge()` function in `codex-ranking.ts` scores every cartridge in the library against the Gravitas signal using a weighted algorithm:

- **Bottleneck match** (primary): Does the cartridge's `flywheel_node` match the user's Leak dimension?
- **Leak-type semantic overlap**: Does the cartridge's `leak_types` match the specific type of leak detected?
- **Severity-difficulty matching**: Does the cartridge's difficulty level match the severity of the user's scores?
- **Archetype alignment** (tiebreaker): Does the cartridge suit the user's overall gravitational state?

---

## Visual Design System

### Gravitas (Dark Theme)
- Background: Near-black `#0a0a0f` with subtle green terminal glow
- Accent: `rgba(74, 222, 128, 0.x)` — green signal color
- Typography: VT323 for labels and readouts
- Frame: `gravitas-frame.webp` — brushed metal instrument panel

### Codex (Warm Theme)
- Background: Warm office environment photograph
- Panel: `lantern-panel.webp` — aged metal lantern frame
- Content area: Parchment texture with warm amber tones
- Typography: Cinzel for headings, IM Fell English Italic for body text
- Accent: Amber/gold `rgba(138, 109, 59, x)`

### The Cartridge Architecture

The data cartridges on the shelf use a specific 3-layer DOM structure to handle complex hover and tilt states without breaking interactivity:

1. **Layout Shell (`div.group`):** A fixed-size container that handles the grid layout and spacing. Has `pointer-events-none` except for its children.
2. **Hitbox (`button`):** An absolutely positioned button that fills the shell (`inset-0`). The clickable area never moves or shrinks, even when the visual element tilts.
3. **Visual Layer (`div`):** Sits inside the button. Receives all CSS transforms (tilt, offset) and hover effects (lift, inner-lamp glow).

---

## Asset Management

Large image assets are hosted on a CDN and referenced by URL in the code. You do not need to re-upload assets when starting a new conversation — the URLs are permanent and hardcoded in the relevant components (e.g., `SPINE_CDN` in `CodexShelf.tsx`).

---

## Developer Commands

```bash
# Install dependencies
pnpm install

# Start development server (port 3000 or 3004)
pnpm dev

# Production build → dist/public/
pnpm build

# Preview production build locally
pnpm preview
```

---

## Roadmap

**In Progress / Near-Term:**
- **Run Mode** — The interactive execution checklist inside the ReaderDrawer. The drawer exists but the step-by-step checklist UI is not yet built.
- **Codex expansion** — Adding more cartridges to the library across all categories.

**Planned:**
- **Unlockables** — A visual trophy/inventory system. Completing protocols earns artifacts (e.g., the Truth Sword).
- **LaaS Calibrator** — The next instrument. Measures team dependency ratio (Leadership as a Service).
- **Deep Scan questions** — The 52-question version of Gravitas is scaffolded but questions need to be written.

**Design Locked (Do Not Modify Without Explicit Request):**
- The tape deck / cartridge deck design in CabinetDeck
- The cartridge label design
- The lantern panel frame and parchment glass area proportions
- The Gravitas instrument panel frame
