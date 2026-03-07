# The Codex Redesign: Protocol Loader Instrument

## Phase 1: Asset Generation (Completed)
- [x] Generate `codex_slot_frame.png`: Matte black anodized metal frame for the Load Bay.
- [x] Generate `codex_cartridge_body.png`: Matte black polymer cartridge body with grip texture.
- [x] Generate `codex_label_strip.png`: Amber label strip overlay for cartridges.
- [x] Generate `codex_reader_drawer_frame.png`: Slide-out drawer frame with handle lip.
- [x] Generate `codex_punchcard_header.png`: Optional punch-card header strip.

## Phase 2: Component Development (Completed)
- [x] Update `LoadBay.tsx`: Implement the new visual design using generated assets.
- [x] Update `CodexEntry` (Cartridge): Use the cartridge body and label strip assets.
- [x] Refine Grid Layout: Ensure strict 2-column rack layout.

## Phase 3: Interaction Design (Completed)
- [x] Implement "Insert" Animation: Cartridge slides into the Load Bay slot.
- [x] Implement "Eject" Animation: Cartridge slides out or disappears.
- [x] Add Sound Effects: Ensure load, eject, and click sounds are wired up.

## Phase 4: Feature Implementation (Completed)
- [x] Update `ReaderDrawer.tsx`: Use the drawer frame asset and implement slide-out logic.
- [x] Implement Tabs: SCRIPT | PROTOCOL | WHY.
- [x] Implement Run Mode: Interactive checklist functionality.

## Phase 5: Integration & Polish (Current)
- [ ] Mobile Responsiveness: Ensure all assets scale correctly on small screens.
- [ ] Final QA: Verify the "Load -> Read -> Run" flow and overall aesthetic.
