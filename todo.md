# Codex Content System v1 Upgrade

## Phase 1: Schema & Data Upgrade
- [ ] Update `CodexEntry` schema in `client/src/lib/codex-schema.ts` with new fields:
    - `checklist`: `{ id: string; label: string; micro_prompt?: string; artifact?: string; time_box?: string }[]`
    - `proof`: `{ research?: { claim: string; source: string; note?: string }[]; books?: { title: string; author?: string; chapter_or_section?: string; why?: string }[]; media?: { title: string; creator?: string; timestamp_or_episode?: string; why?: string }[]; field_notes?: { note: string }[] }`
    - `keys`: `("spiritual"|"emotional"|"leading"|"physical"|"technical")[]`
    - `trigger_point`: `("1:1"|"feedback"|"repair"|"meeting"|"decision"|"performance")`
- [ ] Update `client/src/lib/codex-data.ts` to reflect the new schema (add placeholder/default values where needed to avoid errors).

## Phase 2: Briefing First UI Refinement
- [ ] Update `ReaderDrawer.tsx`:
    - Enforce primary CTA: `[ INITIATE RUN MODE ]` on BRIEFING screen.
    - Secondary CTAs: `[ VIEW SCRIPT ]`, `[ VIEW EXECUTION ]`.
    - Visually de-emphasize `PROOF` tab.

## Phase 3: Enhanced Run Mode & Persistence
- [ ] Update `ReaderDrawer.tsx` for Run Mode:
    - Use `checklist` from schema if present.
    - Fallback: Derive simple checklist from `protocol` if `checklist` is missing.
    - Add step completion state (checkbox).
    - Add progress indicator.
    - Add optional per-step notes (textarea that toggles?).
    - Implement `localStorage` persistence for Run Mode state (keyed by protocol ID).

## Phase 4: Recommendation & Filtering Logic Update
- [ ] Update `Codex.tsx`:
    - **Gravity Check Context Routing:**
        - If bottleneck is `Identity` or `Relationship`: Prioritize entries where `trigger_point === "1:1"` OR `leak_types` contains `dependency`|`low-agency`|`leader-bottleneck`.
        - Else: Fallback to `flywheel_node` matching + `leak_types` matching.
    - **Coaching Filter:**
        - Add top-level filter "COACHING".
        - Logic: `trigger_point === "1:1"` OR `leak_types` includes `dependency`|`low-agency`|`leader-bottleneck` OR `title` contains "Coaching".
    - Ensure Amber Archive aesthetic remains.

## Phase 5: Final Review & Delivery
- [ ] Verify all changes.
- [ ] Create checkpoint.
