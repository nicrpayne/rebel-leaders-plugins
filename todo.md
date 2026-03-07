# The Codex Redesign: Protocol Loader Instrument

## Phase 1: Interaction Design: Auto-Load Sequence & Signal Handoff (Current)
- [ ] Update `Results.tsx`: Pass the bottleneck type (Identity, Relationship, Vision, Culture) to the Codex route via state or query param.
- [ ] Update `Codex.tsx`:
    - [ ] Implement `useEffect` to check for incoming signal.
    - [ ] Create "Signal Acquisition" overlay/state: `SIGNAL RECEIVED: [BOTTLENECK]`.
    - [ ] Implement auto-selection logic: Map bottleneck to specific protocol ID.
    - [ ] Trigger `LoadBay` insert animation automatically.
    - [ ] Set `LoadBay` state to `READY` (pulse READ button).
- [ ] Refine `LoadBay.tsx`: Add `pulse` prop to READ button for the "Ready" state.

## Phase 2: Visual Refinement: Load Bay & Cartridge Rack Polish
- [ ] Update `LoadBay.tsx`:
    - [ ] Implement "EMPTY" state: `INSERT PROTOCOL` + `Select a cartridge below` + scanline animation.
    - [ ] Implement "LOADED" state: Cartridge partially inserted, `SIGNAL LOCKED` light, dynamic label.
- [ ] Update `CodexEntry` (Cartridge Rack):
    - [ ] Add slot outlines/rails background.
    - [ ] Add bay labels (A1, A2, B1, B2...).
    - [ ] Reduce gap between cartridges to feel like a dense rack.
- [ ] Visual Polish: Desaturate and soften cartridge assets to match the retro aesthetic (CSS filters).

## Phase 3: Feature Implementation: Copy Script & Checklist Mode
- [ ] Update `ReaderDrawer.tsx`:
    - [ ] **SCRIPT Tab (Default):**
        - [ ] Add large `COPY SCRIPT` button (Primary Action).
        - [ ] Display script content with clear typography.
    - [ ] **RUN Mode (Secondary):**
        - [ ] Convert script steps into interactive checklist.
        - [ ] Add progress tracking (e.g., "0/6 COMPLETE").

## Phase 4: Integration & Polish: Final Animation & Sound Tuning
- [ ] Tune Auto-Load Timing: Ensure the sequence (Signal -> Load -> Pulse) feels rhythmic and not rushed.
- [ ] Sound Design: Add specific sounds for "Signal Received" and "Auto-Load".
- [ ] Mobile Polish: Ensure the auto-load sequence works smoothly on mobile.

## Phase 5: Final Review & Delivery
- [ ] Verify the "Aha" moment: User lands -> Signal -> Auto-Load -> Read -> Copy.
