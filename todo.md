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
