# VU Meter Refinement Todo

## 1. Layering & Structure (The "Instrument Stack")
- [ ] Create clear z-index hierarchy: Chassis > Dial Face > Needle > Glass > Brand Plate
- [ ] Remove confusing "gold rays" (convert to proper tick marks)
- [ ] Add inner bevel to meter frame for depth

## 2. Needle Physics
- [ ] Implement single red needle (remove duplicates)
- [ ] Add `easeOutQuad` smoothing to movement
- [ ] Add subtle overshoot/settle physics
- [ ] Clamp rotation range (-50° to +50°)
- [ ] Add drop shadow to needle (lift it off the dial)

## 3. Dial Face Cleanup
- [ ] Redraw tick marks as short radial lines (not needles)
- [ ] Move "SIGNAL STRENGTH" label to bottom-left (dimmer, smaller)
- [ ] Ensure text doesn't intersect with needle path

## 4. Branding
- [ ] Add embossed "REBEL LEADERS" plate at bottom center
- [ ] Add "RL-OS" serial number in corner (tiny)
- [ ] Remove sprite from inside the meter (move to chassis if needed)

## 5. Glass & Lighting
- [ ] Add diagonal glass reflection (top third)
- [ ] Add subtle vignette to corners
