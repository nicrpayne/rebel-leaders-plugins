# Gravity Check Redesign Todo

## Phase 5: Skeuomorphic UI Components
- [ ] Build `RotaryKnob` component (SVG-based, drag interaction, glowing indicator)
- [ ] Build `VUMeter` component (Reacts to knob value, needle physics)
- [ ] Build `ToggleSwitch` component (Satisfying click, metal texture)
- [ ] Build `LCDScreen` component (Glowing text, scanlines, glass reflection)
- [ ] Update `PluginShell` to look like a rack unit (screws, brushed metal texture, rack ears)

## Phase 6: Refactor Gravity Check Page
- [ ] Replace slider questions with `RotaryKnob` + `VUMeter` layout
- [ ] Replace scenario questions with `ToggleSwitch` A/B layout
- [ ] Implement "Center Screen" layout (Question in middle, controls on sides)
- [ ] Add sound effects? (Optional, maybe later)

## Phase 7: Content & PDF
- [ ] Rewrite "Fridge Rights" question with full context
- [ ] Add "First Move" prescription logic to `scoring.ts`
- [ ] Update PDF generator to include "First Move" section
