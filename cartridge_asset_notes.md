# Cartridge Asset Analysis

## Three Separate Assets

1. **Cartridge Spine** (codex_cartridge_spine_transparent): 1920x1072, RGBA (transparent background)
   - This is the HORIZONTAL view of the cartridge edge/spine
   - Black leather-textured case with a cream/aged paper label that reads "PROTOCOL"
   - This is what goes INTO the Load Bay slot
   - The "PROTOCOL" text is part of the image; the actual title is overlaid as HTML text

2. **Cartridge Body** (codex_cartridge_body): 2528x1696, RGB
   - Front-facing view of a black cassette tape (like an audio cassette)
   - Shows the tape reels, scratches, wear marks
   - Used in the CodexGridCard as the background behind the label

3. **Label Strip** (codex_label_strip): 2528x1696, RGB
   - Yellow/gold aged paper label with torn edges
   - Has subtle pixel-art dithering pattern
   - Overlaid on the cartridge body in CodexGridCard
   - Text is overlaid as HTML on top of this

## For the Shelf Design

The cartridge SPINE (asset #1) is what would be visible when standing upright on a shelf.
- It is already oriented horizontally (landscape)
- To show it standing VERTICALLY on a shelf (like a book spine), we need to rotate it 90 degrees via CSS
- The spine is 1920x1072 — roughly 1.8:1 aspect ratio
- When rotated to vertical, each spine would be tall and narrow — perfect for shelf display

The cartridge BODY + LABEL (assets #2 and #3) are what you see when looking at the front face.
- These would be visible for cartridges laid FLAT/horizontal on the lower shelves
