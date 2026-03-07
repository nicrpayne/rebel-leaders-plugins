# The Codex Redesign: 8-Track Deck & Spine

## Phase 1: Asset Generation (Completed)
- [x] Generate "Straight-On" 8-Track Deck Face (silver/woodgrain/black metal)
- [x] Generate "Cartridge Spine" asset (label view)
- [x] Generate "Deck Slot" interior asset

## Phase 2: Component Development (In Progress)
- [x] Update `LoadBay.tsx` to use new deck face asset
- [x] Implement "Spine View" for loaded cartridge
- [ ] **DEBUG:** Fix button click zones and z-index issues in `LoadBay.tsx`.
- [ ] **DEBUG:** Ensure cartridge spine is visible and not hidden by the faceplate.
- [ ] **DEBUG:** Verify `onLoad` and `onEject` handlers are firing correctly.

## Phase 3: Interaction Design: Linear Insert/Eject Animation
- [x] Create linear "shove" animation (Z-axis or Y-axis translation)
- [ ] **Refine:** Tune animation timing and easing for maximum "clunk" feel.
- [ ] **Audio:** Ensure sound effects sync perfectly with the visual movement.
- [ ] Ensure "Eject" pops the cartridge out towards the user

## Phase 4: Integration & Polish: Final Review
- [ ] Verify mobile responsiveness of new deck
- [ ] Final QA of the "Plugin Feel"
