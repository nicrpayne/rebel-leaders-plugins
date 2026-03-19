# Spine Rendering Comparison

## LoadBay (Deck) — WORKS PERFECTLY
- The spine image is placed inside a container with `absolute inset-0 w-full h-full object-fill`
- The image is NOT rotated — it renders in its natural horizontal orientation
- The container is landscape aspect ratio (49% width, 29% height of the deck)
- Text overlay is placed on top, NOT rotated
- Result: Full-width horizontal cartridge spine with readable text

## CartridgeSpine (Shelf) — BROKEN
- The button container is PORTRAIT: w-[48px] h-[150px] (narrow and tall)
- The spine image is rotated 90 degrees via `rotate-90` to try to stand it vertical
- But the image is inside a tiny overflow-hidden container, so most of it gets clipped
- The rotation + absolute positioning + overflow-hidden = the image barely shows
- Result: A tiny square with clipped label text

## The Fix
The spine image is naturally HORIZONTAL (1920x1072). In the deck, it works because the container is also horizontal.

For the shelf, we need the cartridge to stand VERTICAL (like a book spine). Two approaches:
1. Keep the container portrait but use the image at its natural orientation and just show a vertical slice (the "edge" view). But this won't look like the deck cartridge.
2. Better: Make the shelf cartridge container HORIZONTAL (same as the deck) but smaller, and DON'T rotate. Stack them side by side. The shelf row would be horizontal cartridges next to each other.

But wait — the reference images show vertical spines standing up. The deck cartridge IS the spine. So on the shelf, we want the same horizontal image but rotated 90° to stand upright. The problem is the container is too small and clips it.

## Real Fix
Make the portrait container WIDER and TALLER so the rotated image actually fits. The image is 1920x1072 (roughly 1.79:1 aspect ratio). When rotated 90°, it becomes 1072x1920 (roughly 0.56:1). So a portrait container should be about 56% as wide as it is tall.

For a 200px tall container: width should be ~112px.
Current: w-[48px] h-[150px] = way too narrow for the rotated image.
