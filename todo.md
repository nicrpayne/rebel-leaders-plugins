# The Codex Refactor: Protocol Loader Instrument

## Phase 1: Component Development (Completed)
- [x] Create `LoadBay.tsx`: A persistent top strip with "Load Slot" and Transport Controls (READ, RUN, EJECT).
- [x] Update `CodexShell.tsx`: Remove the sidebar, integrate `LoadBay` at the top, and simplify the layout.
- [x] Redesign `CodexEntry` (Cartridge): Make them uniform height, physical-looking cartridges with grip texture.
- [x] Implement 2-Column Grid: Replace masonry layout with a strict 2-column rack grid (1 column on mobile).

## Phase 2: Interaction Design (Completed)
- [x] Implement "Load" Logic: Clicking a cartridge updates the `LoadBay` state instead of opening a modal.
- [x] Add Insert Animation: Visual feedback when a cartridge is loaded into the bay.
- [x] Update Empty State: `LoadBay` shows "INSERT PROTOCOL" when empty.

## Phase 3: Feature Implementation (Completed)
- [x] Create `ReaderDrawer.tsx`: A right-side slide-out drawer (not a modal) for reading content.
- [x] Implement Tabs: SCRIPT | PROTOCOL | WHY.
- [x] Implement Run Mode: Convert protocol steps into an interactive checklist.

## Phase 4: Integration & Polish (Completed)
- [x] Mobile Responsiveness: Ensure Load Bay is accessible and Drawer works as a full-screen sheet.
- [x] Sound Design: Add "Tape Load", "Eject", and "Switch Click" sounds.
- [x] Final QA: Verify the "Load -> Read -> Run" flow.

## Phase 5: Final Review & Delivery (Current)
- [ ] Save Final Checkpoint.
- [ ] Deliver Code Blocks.
