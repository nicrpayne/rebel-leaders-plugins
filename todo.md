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

# Integrate Coaching Pack Content

- [ ] Update `src/lib/codex-schema.ts` to include new fields: `pack`, `flywheel_node`, `leak_types`, `dominant_forces`, `use_when`, `difficulty`, `keys_primary`, `keys_secondary`, `keys_notes`, `why_it_works`.
- [ ] Update `src/lib/codex-data.ts` with the 24 entries provided in `pasted_content_29.txt`.
- [ ] Ensure existing entries are compatible with the updated schema (add default values if needed).

# Implement Coaching Filter

- [ ] Update `CodexTopBar.tsx` to add a "COACHING" filter tab.
- [ ] Implement filtering logic in `Codex.tsx`:
    - Show entries where `category === "Relationship"` OR `leak_types` includes "dependency", "low-agency", "leader-bottleneck" OR `title` includes "Coaching".
- [ ] Ensure the filter works alongside the existing search functionality.

# Update Recommendation Logic

- [ ] Modify `Codex.tsx` recommendation logic:
    - If Gravity Check bottleneck is "Identity" or "Relationship", prioritize "Coaching Pack" entries.
    - Fallback to existing logic for other bottlenecks.

# Enhance Reader & Run Mode

- [ ] Update `ReaderDrawer.tsx` to support "Briefing First" layout for Coaching entries:
    - Show `use_when`, `leak_types`, `dominant_forces`, `time`, `difficulty`.
    - Add "INITIATE COACHING SEQUENCE" (Primary CTA) and "VIEW SCRIPT" (Secondary CTA).
- [ ] Update `RunMode.tsx` to feel like guided coaching:
    - Step-by-step protocol with progress indicator.
    - Clear "Complete Step" interaction.
- [ ] Ensure styling remains "Amber/Archive/Data-bank" (no design changes).

# Localize Assets & Update References
- [ ] Create client/public/assets directory
- [ ] Copy generated assets from /home/ubuntu/webdev-static-assets/ to client/public/assets/
- [ ] Update CodexGrid.tsx to use local asset paths
- [ ] Update CodexGridCard.tsx to use local asset paths
- [ ] Update ReaderDrawer.tsx to use local asset paths
- [ ] Push changes to GitHub

# Generate Collector's Sword Asset
- [ ] Generate "Collector's Edition Truth Sword" (8-bit, glowing, on stand)
- [ ] Localize asset to project
- [ ] Push to GitHub
