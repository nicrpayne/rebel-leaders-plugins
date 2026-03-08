# Coaching Pack Integration

## Phase 1: Ingest Coaching Pack Data
- [ ] Update `CodexEntry` schema in `client/src/lib/codex-schema.ts` to include optional fields: `pack`, `keys_primary`, `keys_secondary`, `keys_notes`, `why_it_works`.
- [ ] Parse the JSON content from `pasted_content_26.txt` and append it to `client/src/lib/codex-data.ts`.
- [ ] Ensure existing entries remain valid or are updated if they duplicate the new pack (e.g., `MOVE_TRUTH_WEATHER` exists in both; prefer the new pack version or merge).

## Phase 2: Implement Coaching Tab & Filtering
- [ ] Update `Codex.tsx` to add a "COACHING" tab in the category selector.
- [ ] Implement filtering logic for "COACHING":
    - [ ] `category === "Relationship"` OR
    - [ ] `leak_types` includes "dependency", "low-agency", "leader-bottleneck" OR
    - [ ] `title` includes "Coaching" OR
    - [ ] `pack` === "Core Protocols v1" (if we use that field).

## Phase 3: Enhance Reader for Coaching Entries
- [ ] Update `ReaderDrawer.tsx` to detect if an entry is a "Coaching" entry.
- [ ] Implement "Briefing First" UI for Coaching entries:
    - [ ] Show `Objective` (`use_when`), `When to Use` (`leak_types`/`dominant_forces`), `Time`, `Difficulty`.
    - [ ] Add `why_it_works` section if available.
    - [ ] Primary CTA: `[ INITIATE COACHING SEQUENCE ]` (Run Mode).
    - [ ] Secondary CTA: `[ VIEW SCRIPT ]`.

## Phase 4: Refine Run Mode & Recommendations
- [ ] Update `ReaderDrawer.tsx` Run Mode:
    - [ ] Add "Complete Step" interaction (checkbox or button).
    - [ ] Add progress indicator.
- [ ] Update `Codex.tsx` recommendation logic:
    - [ ] If Gravity Check bottleneck is `Identity` or `Relationship`, prioritize Coaching Pack entries in "Priority Transmission".

## Phase 5: Final Review & Delivery
- [ ] Verify all new entries load correctly.
- [ ] Test filtering and search.
- [ ] Test Run Mode flow.
- [ ] Create checkpoint.
