# The Codex Redesign: Protocol Loader

## Phase 1: Interaction Design: Auto-Load Sequence & Signal Handoff
- [x] Implement Gravity Check -> Codex handoff logic (Results.tsx)
- [x] Create "Signal Received" overlay in Codex.tsx
- [x] Implement Auto-Load animation sequence
- [x] Wire up "READ" button pulse state

## Phase 2: Visual Refinement: Load Bay & Cartridge Rack Polish
- [x] Integrate generated assets for Load Bay slot frame
- [x] Refine cartridge rack grid layout (2 columns)
- [x] Add "Signal Lock" indicator to loaded cartridge
- [x] Implement scanline animation for empty state

## Phase 3: Feature Implementation: Copy Script & Checklist Mode
- [x] Add "COPY SCRIPT" button to Reader Drawer
- [x] Implement interactive checklist in Run Mode
- [x] Refine Reader Drawer UI with tabs and frame asset

## Phase 4: Integration & Polish: Final Animation & Sound Tuning
- [x] Tune animation timing for Auto-Load sequence
- [x] Verify sound effects trigger correctly
- [x] Ensure mobile responsiveness for all new elements

## Phase 5: Final Review & Delivery (Current)
- [x] **Fix Audio:** Implement `CodexAudio` engine (Web Audio API) to replace unreliable MP3s.
- [x] **Fix Animation:** Adjust `LoadBay` animation logic to ensure visibility (remove `overflow-hidden` if necessary, check z-index).
- [x] **Fix Visuals:** Verify `LoadBay` slot frame blend mode and positioning.
- [ ] **Enhance Feedback:** Add "Active" glow to selected cartridge in rack.
- [ ] **Verify Auto-Load:** Ensure recommended protocol loads automatically on arrival.
- [ ] **Final QA:** Test Click -> Load -> Read flow end-to-end.
