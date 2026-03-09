# Session Notes — Visual Review

## Home / Armory Page
- 3 plugin cards: Gravity Check (ACTIVE), The Codex (LOCKED), LaaS Calibrator (LOCKED)
- Left sidebar: Categories (ALL, MIRROR, MAP, MOVE, SIGNAL) + Status (INSTALLED, AVAILABLE, UPDATES)
- Rebel HUD in bottom-right corner (XP, Pages, Secrets, Time)
- Cover images load from CDN (cloudfront URLs)
- Broken image: RebelLogo.png references /home/ubuntu/upload/RebelLogo.png (local path, won't work in prod)

## Gravity Check Plugin
- Skeuomorphic "rack unit" hardware aesthetic — VU meter, LCD screen, rotary knob
- Questions displayed on green CRT-style LCD
- "SIDECHAIN: SEARCHING..." in footer — this is the handoff to Codex
- Nic sprite badge in bottom-left (broken image — references CDN but may not load)
- MODE: STANDARD label present
- NEXT button in bottom-right footer strip

## Codex Page (from screenshots user provided)
- Archivist's Cabinet with military-case cartridge cards
- Yellow label strips on black cartridge bodies
- Filter tabs at top (including COACHING)
- Reader Drawer slides out for protocol details
- "INITIATE COACHING SEQUENCE" CTA

## Key Issues Noted
1. Broken logo image (local path reference)
2. User said they don't like the Archivist's Cabinet implementation
3. Data model still being worked through
4. Side-chain handoff (Gravity Check → Codex) needs work
