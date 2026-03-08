# Unify Card Design

- [ ] Update `Codex.tsx` to replace the "Priority Transmission" text-only cards with `CodexGridCard` components.
- [ ] Ensure the "Main Grid" also uses `CodexGridCard` components.
- [ ] Verify that all cards display the Black Cassette Tape visual.

# Retrieve Asset Library

- [ ] Read `src/components/Assets.tsx` to retrieve the asset library definitions.
- [ ] Present the asset library to the user.

# Aggregate & Display All Assets

- [ ] Check `App.tsx` to confirm the route for the Assets page.
- [ ] Scan the entire project for image URLs (using `grep`).
- [ ] Update `src/pages/Assets.tsx` to include all discovered assets in a gallery format.
- [ ] Provide the user with the link to the Asset Canvas.

# Generate Suitcase Asset

- [ ] Use `generate` tool to create a retro, beat-up suitcase image.
- [ ] Present the generated image to the user.

# Restore Layered Card Design

- [ ] Upload `codex_cartridge_body.png` and `codex_label_strip.png` to the project.
- [ ] Update `CodexGridCard.tsx` to composite the two images:
    - Layer 1: Black Cartridge Body (Base).
    - Layer 2: Yellow Label Strip (Overlay), positioned in the recessed slot.
    - Layer 3: Protocol Title and ID, printed on the Yellow Label area.
- [ ] Verify the visual alignment and text placement.

# Safe Refactor & Component Isolation

- [ ] Analyze `Codex.tsx` to identify clean break points for component extraction.
- [ ] Create `CodexControls.tsx` to isolate the search and filter bar.
- [ ] Create `CodexGrid.tsx` to isolate the card rendering logic.
- [ ] Update `Codex.tsx` to use these new components, removing the inline rendering logic.
- [ ] Verify that the refactor has not introduced any regressions.

# Add Dismissal to Gravity Check Banner

- [ ] Add a state variable `isBannerDismissed` to `Codex.tsx`.
- [ ] Add a close button (X icon) to the "Calibration Required" banner.
- [ ] Implement the dismissal logic to hide the banner when the button is clicked.

# Tighten Visual Spacing

- [ ] Analyze `CodexShell.tsx` to identify the padding/margin causing the gap.
- [ ] Reduce the vertical spacing between the header (Deck) and the content area (Grid).
- [ ] Ensure the layout remains responsive and doesn't feel cramped.

# Aggressively Reduce Spacing

- [ ] Inspect `LoadBay.tsx` and remove any excess bottom padding/margin.
- [ ] Update `CodexShell.tsx` to pull the content area upwards (negative margin if needed).
- [ ] Check `CodexTopBar.tsx` for unnecessary top spacing.
- [ ] Ensure the grid is immediately visible below the deck without scrolling.

# Build Modular Tape Rack

- [ ] Create `CodexSpine.tsx` component using the high-res spine asset.
- [ ] Refactor `CodexGrid.tsx` to use a vertical rack/stack layout.
- [ ] Implement hover (slide-out) and click (chunk) interactions.
- [ ] Ensure the new components are modular and type-safe.
