# Tactical Briefing Refactor

## Phase 1: Implement Tactical Briefing Structure & Content
- [x] Update `CodexEntry` schema in `client/src/lib/codex-schema.ts` to include new fields: `briefing` (objective, use_when, avoid, outcome), `proof` (research, books, field_notes).
- [x] Update `client/src/lib/codex-data.ts` with mock data for the new fields to support the "Tactical Briefing" UI.
- [x] Refactor `client/src/components/ReaderDrawer.tsx`:
    - [x] Rename default view to `BRIEFING`.
    - [x] Implement new Header design (Big Serif Title, File Stamp, One-line Objective).
    - [x] Build `BRIEFING` tab content: Mission Objective (Typewriter), Use When/Avoid lists, Outcome.
    - [x] Add Primary CTA `[ INITIATE RUN MODE ]` and Secondary `[ VIEW SCRIPT ]`.
    - [x] Update Tabs to: `BRIEFING`, `SCRIPT`, `EXECUTION`, `PROOF`.
    - [x] Implement `PROOF` tab content (Research, Books, Field Notes).
- [x] Verify "Run Mode" transition from Briefing CTA.

## Phase 2: Enhance Machine Illusion & Animations
- [x] Refactor `ReaderDrawer.tsx` animation:
    - [x] Change entrance to slide **DOWN** from deck (top-center origin).
    - [x] Use mechanical easing (`cubic-bezier(0.2, 0.0, 0.2, 1)`) with 300ms duration.
    - [x] Add "rail/hinge" visual at top of drawer.
    - [x] Apply `select-none` to drawer chrome, `select-text` only to content.
    - [x] Implement background dimming (40%) and scroll lock when open.
- [x] Update `Codex.tsx`:
    - [x] Add `STATUS: LOADED` indicator on deck face.
    - [x] Add `MODE: READ/RUN` blinking indicator.
    - [x] Add subtle amber glow to deck when drawer is active.

## Phase 3: Integrate Gravity Check Context & Recommendations
- [x] Update `Codex.tsx`:
    - [x] Read `gravityCheckResults` from localStorage.
    - [x] Identify lowest score (Bottleneck).
    - [x] Filter top 3 protocols matching the bottleneck.
    - [x] Display "Priority Transmission" section at top if results exist.
    - [x] Add "Why" line (e.g., "Reason: Low Identity Score detected").
    - [x] If no results, show "Calibration Required" panel with link to `/gravity-check`.

## Phase 4: Final Review & Delivery
- [ ] Verify no console errors or type mismatches.
- [ ] Create checkpoint.
- [ ] Deliver final result.
