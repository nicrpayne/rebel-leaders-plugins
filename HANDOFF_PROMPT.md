# Rebel OS Plugins — New Context Handoff Prompt

Copy and paste this entire document as your opening message to start the new conversation.

---

## Who You Are and What We're Building

You are continuing development on the **Rebel OS Plugins** suite — a set of interactive, web-based leadership tools. The repo is at `github.com/nicrpayne/rebel-leaders-plugins`. Clone it, run `pnpm install && pnpm dev`, and you're live. The dev server starts on port 3000 but will silently move to the next available port (check terminal output for the actual URL).

This is not a standard SaaS product. The aesthetic is **"Hi-Bit / Stained Glass Cyberpunk"** — skeuomorphic hardware interfaces (VU meters, CRT screens, data cartridges, rotary knobs) rendered with modern CSS lighting, deep shadows, and warm amber/green glows. Think *Blade Runner* meets a field medic's kit. The core message is: **"Hope is an act of rebellion."**

---

## The Two Plugins

### 1. GRAVITAS (`/gravity-check`)

A diagnostic tool disguised as a retro rack-unit hardware device. It measures team health across four dimensions: **Identity, Relationship, Vision, Culture**.

The user picks a scan depth on entry:
- **SCAN mode:** 20 questions (5 per dimension)
- **DEEP SCAN mode:** 40 questions (10 per dimension) — the additional questions are tagged `depth: "DEEP"` in `client/src/lib/questions.ts`

The scoring engine (`client/src/lib/scoring.ts`) produces:
- A **Gravity Score** (1.0–5.0)
- An **Archetype** (e.g., "EMERGING GRAVITY", "FULL ORBIT", "DEAD ORBIT")
- A **Leak** — the lowest-scoring dimension (e.g., `"IDENTITY"`)
- A **Leak Description** — a poetic, named diagnosis (e.g., "ROLE FOG", "THE SILENCE TAX", "DRIFT", "THEATER")
- A **Force** — the highest-scoring dimension
- A **First Move** — a named protocol recommendation (e.g., "THE HORIZON CAST")
- A **First Move Description** — a paragraph explaining the prescription

Results are saved to `localStorage` under the key `gravityCheckResults`.

### 2. The Codex (`/codex`)

An "Archivist's Cabinet" of leadership protocols rendered as physical data cartridges on wooden shelves. There are **27 entries** in `client/src/lib/codex-data.ts`.

The cartridge shelf uses a **3-layer DOM architecture** in `client/src/components/CodexShelf.tsx`. This architecture is the result of significant debugging work and must not be restructured:

1. **Layout Shell (`div.group`):** Fixed-size container. Handles spacing. Never moves.
2. **Hitbox (`button`, `absolute inset-0`):** The clickable area. Never rotates or transforms.
3. **Visual Layer (`div`):** Inside the button. Receives all CSS transforms (tilt, lift) and the inner-lamp hover glow.

The hover glow is a `blur(8px)` radial gradient div at `zIndex: 0` (behind the cartridge image). It activates via `[button:hover_&]:opacity-100` Tailwind arbitrary variant. **Do not change this mechanism.**

Spacing adjustments to the top shelf are only permitted via the `TOP_SHELF_ARRANGEMENT` constants at the top of `CodexShelf.tsx` — specifically `gapBefore` values. Nothing else in that file should be touched without explicit discussion.

Clicking a cartridge opens the **Reader Drawer** (`client/src/components/ReaderDrawer.tsx`), which has two modes:
- **READ mode:** Four tabs — Briefing, Script, Execution, Proof
- **RUN mode:** An interactive step-by-step checklist with progress bar and completion state

---

## The GRAVITAS → Codex Handoff (Already Wired)

When the user clicks "TRANSMIT SIGNAL" on the Results page, the app navigates to:
```
/codex?signal=received&bottleneck=IDENTITY
```
(where `IDENTITY` is whichever dimension scored lowest)

The Codex page reads this URL param, plays a load sound, shows a "SIGNAL RECEIVED" state for 3 seconds, then auto-opens a hardcoded protocol based on the dimension:

| Bottleneck | Auto-loaded Protocol |
|---|---|
| IDENTITY | `MOVE_NAME_THE_COST` |
| RELATIONSHIP | `MOVE_REPAIR_48H` |
| VISION | `MOVE_STOP_LIST` |
| CULTURE | `MOVE_MEETING_REWRITE` |

**This mapping is too blunt.** Every Codex entry has rich `leak_types` and `dominant_forces` fields that could enable a much smarter recommendation. The scoring engine also produces a specific `leak` string (e.g., `"ROLE FOG"`) and a `firstMove` name (e.g., `"THE HORIZON CAST"`) that are currently displayed on the Results page but never used to select a specific Codex entry. Improving this mapping is a high-priority task.

---

## Known Issues to Fix First

**1. Broken logo on the Home page.**
`client/src/pages/Home.tsx` line 44 has:
```tsx
src="/home/ubuntu/upload/RebelLogo.png"
```
This is a local sandbox path that doesn't exist anywhere else. Fix it by replacing with the logo that's already in the repo:
```tsx
src="/assets/gravitas/rebel-horizon-logo.png"
```
or the light variant: `/assets/gravitas/rebel-horizon-logo-light.png`

**2. `why_it_works` field is populated but never rendered.**
Every Codex entry in `codex-data.ts` has a `why_it_works` string containing the neuroscience/psychology rationale for the protocol. It is not displayed anywhere in the Reader Drawer. This is a quick win — add it as a section in the Briefing tab or as a fifth tab.

---

## The Full Codex Entry List (27 entries)

| ID | Title |
|---|---|
| `MOVE_TRUTH_WEATHER` | Truth Weather |
| `MOVE_REPAIR_48H` | Repair in 48 Hours |
| `MOVE_NAME_THE_COST` | Name the Cost of Truth |
| `MOVE_DECISION_RIGHTS_MAP` | Decision Rights Map |
| `MOVE_MEETING_REWRITE` | Meeting Rewrite |
| `MOVE_STOP_LIST` | Stop List |
| `MOVE_MINORITY_REPORT` | Minority Report |
| `MOVE_FRIDGE_RIGHTS_AUDIT` | Fridge Rights Audit |
| `MOVE_DISAGREE_AND_COMMIT` | Disagree and Commit |
| `MOVE_THE_ONE_THING` | The One Thing |
| `MOVE_THE_MIRROR` | The Mirror Move |
| `MOVE_TRUST_MICRO_DEPOSIT` | Trust Micro-Deposit |
| `MOVE_CLARITY_CONTRACT` | Clarity Contract |
| `MOVE_COACHING_3_QUESTIONS` | 3 Coaching Questions |
| `MOVE_FEEDBACK_SBI` | SBI Feedback (No Shame) |
| `MOVE_FEEDFORWARD` | Feedforward Future Swap |
| `MOVE_ACCOUNTABILITY_WITH_CARE` | Accountability With Care |
| `MOVE_BOUNDARY_NO_WITH_YES` | No With a Clean Yes |
| `MOVE_RECOVER_AFTER_MISS` | Recover After You Missed It |
| `MOVE_NORTH_STAR_SENTENCE` | North Star Sentence |
| `MOVE_KILL_THE_GHOST_GOAL` | Kill the Ghost Goal |
| `MOVE_WIN_CONDITION` | Win Condition |
| `MOVE_TRADEOFF_TALK` | Tradeoff Talk |
| `MOVE_PERMISSION_SLIP` | Permission Slip |
| `MOVE_SHADOW_NORMS` | Shadow Norms |
| `MOVE_ENERGY_LEAK_CHECK` | Energy Leak Check |
| `MOVE_SAFE_TO_SAY` | Safe to Say |

---

## Asset Strategy (Important)

All large image assets are hosted on a CDN. **You do not need to re-upload anything.** The code references permanent URLs. When you run `pnpm dev`, the browser fetches them directly from the web.

Key CDN base: `https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/`

Local assets that ARE in the repo (under `client/public/assets/`):
- `gravitas/gravitas-frame.webp` — the GRAVITAS hardware chassis
- `gravitas/nic-sticker.webp` — the Nic sprite badge
- `gravitas/rebel-horizon-logo.png` and `rebel-horizon-logo-light.png`
- `gravitas/rebel-sticky-note.png`
- `codex/pager-device.png` — the load bay deck
- `codex_shelf_bg.png`, `trim_bar_texture.png`, `shelf_guard_rail.png` — shelf textures
- `codex_cabinet_hero.png` / `.webp` — the cabinet hero image

The **Truth Sword** pixel art and **Nic sprite** collectible assets exist in the user's Google Drive and were generated in prior sessions. They have no UI home yet — that's a future task.

---

## Immediate Priority Stack

Work in this order unless the user directs otherwise:

1. **Fix the broken logo** (`Home.tsx` line 44) — 2-minute job, do it first
2. **Smarter GRAVITAS → Codex protocol matching** — use `leak_types` / `dominant_forces` fields on Codex entries to match the right protocol, not just the broad dimension
3. **Surface `why_it_works` in the Reader Drawer** — add it to the Briefing tab or as a new tab
4. **Results page visual polish** — this is the emotional climax of the experience; it currently renders inside `GravitasShell` but the output (Archetype, Leak, Force, First Move) deserves more visual weight
5. **SCAN vs. DEEP SCAN scoring differentiation** — DEEP SCAN questions should carry more diagnostic weight, or the results page should at minimum acknowledge which mode was used
6. **Basic persistence / history** — show "your last score was X" to create a reason to return
7. **VU meter polish** — detailed spec is in `vu_meter_todo.md` in the repo root

---

## Hard Rules (Do Not Violate Without Discussion)

- **Do not restructure `CartridgeSpine` or `CartridgeFlat`** in `CodexShelf.tsx`. The 3-layer architecture is the result of significant debugging. Spacing only via `TOP_SHELF_ARRANGEMENT` constants.
- **Do not touch the top shelf arrangement** unless the user explicitly asks.
- **Do not rewrite working components** to try a new approach. Preserve, then extend.
- **Mobile-first always.** The majority of users will be on mobile.
- **No LLM tropes in copy.** No excessive em-dashes, no triplet cadences. Tone is direct, gritty, hopeful.

---

## Tone & Voice

The copy throughout uses a specific voice: direct, slightly gritty, grounded in real leadership experience, with occasional ancient wisdom references (Stoics, Christian mystics, Rumi). Terms of art used throughout: "Leak," "Force," "Friction," "Protocol," "Signal," "Gravity," "Orbit." Do not genericize these into corporate language.

---

## The Bigger Picture

These plugins will eventually be embedded in a larger **Rebel OS** platform (likely Webflow). The Home page (`/`) is the "Workbench" — it currently shows three plugin cards: GRAVITAS (ACTIVE), The Codex (LOCKED until GRAVITAS is completed), and LaaS Calibrator (LOCKED, future module — do not build this yet).

The long-term vision includes multiplayer GRAVITAS, a "Residency" cohort module, shareable results cards, and a gamification layer (XP, unlockables, Trophy Case). None of this is in scope yet — but keep the architecture clean enough that it can be added without a rewrite.
