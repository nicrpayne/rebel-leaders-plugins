# Rebel Leaders Plugins — Full Code Audit

**Date:** March 17, 2026
**Scope:** Every source file, component, page, utility, configuration, and asset in the repository.
**Objective:** Identify performance bottlenecks, dead code, duplication, structural issues, and anything that could impact the user experience. No code changes were made.

---

## 1. Codebase Overview

The application is a single-page React app built with Vite, TypeScript, and TailwindCSS. It has five routes, four active pages, and a rich visual design that relies heavily on layered CSS effects, inline styles, and Web Audio API synthesis.

| Metric | Value |
|---|---|
| Total source files (`.tsx`, `.ts`, `.css`) | ~75 |
| Total lines of application code | ~7,200 |
| UI component files in `components/ui/` | 57 |
| UI components actually imported | 14 |
| Dead UI components | **43 (75%)** |
| Pages | 6 (Home, GravityCheck, Results, Codex, Assets, NotFound) |
| Public assets (images) | 38 files |
| Public assets total size | **112 MB** |
| Production JS bundle | 502 KB |
| Production CSS bundle | 185 KB |
| Production build total | **113 MB** |

---

## 2. Performance Issues — Ranked by Impact

### 2.1 CRITICAL: Ticker Animation Drives 60fps Re-renders of Entire Component Tree

**File:** `CabinetDeck.tsx` (1,014 lines)
**Lines:** ~820-870 (TickerTapeWindow)

The ticker tape animation uses `requestAnimationFrame` with `setTickerProgress(...)` — a React state update — on every frame. This triggers a full re-render of the entire CabinetDeck component at 60fps. CabinetDeck contains four PagerScreen sub-components, four ScreenLCDBackground sub-components (each rendering 4 gradient overlay divs = 16 total), and multiple IndicatorLight sub-components. None of these are memoized with `React.memo()`, so every animation frame causes React to diff the entire tree.

**Impact:** This is the single largest performance drain in the app. During ticker animation, React is doing ~60 virtual DOM diffs per second across hundreds of DOM elements, most of which haven't changed.

**What it affects:** The Codex page feels sluggish because the deck is constantly re-rendering even when the user is just looking at the shelf.

### 2.2 HIGH: GPU-Expensive Blur Filters on the Statue

**File:** `CodexShelf.tsx` (727 lines)
**Lines:** ~470-520

The sword-bearer statue has six layered glow divs with CSS `filter: blur()` values of 8px, 10px, 14px, 18px, 25px, and 30px. These are always mounted and always animating (pulsing opacity). CSS blur is composited on the GPU, and six simultaneous blur layers with values up to 30px is expensive, especially on lower-end hardware or integrated GPUs.

**Impact:** Contributes to the general sluggishness on the Codex page. The GPU is constantly recompositing six blur layers even when the user isn't looking at the statue.

### 2.3 HIGH: 27 Cartridges Always Mounted (~270 DOM Elements)

**File:** `CodexShelf.tsx`
**Lines:** ~230-430

Every cartridge renders approximately 10 DOM elements (layout div, button hitbox, visual div, hover wrapper, inner-lamp glow div with blur filter, image container, `<img>`, text overlay, two text spans). With 27 cartridges, that's ~270 DOM elements always in the tree, even when filtered to a single Base Element category. Filtered-out cartridges just get reduced opacity — they're still fully rendered.

Additionally, each cartridge spine has an inner-lamp glow div with its own blur filter, adding 27 more GPU blur operations to the six statue blurs.

**Impact:** The cartridge hover sluggishness you described is directly caused by this. When you hover a cartridge, the browser has to recomposite the `transition-all` across ~270 sibling elements while also maintaining 33 blur filters (27 cartridge glows + 6 statue glows).

### 2.4 HIGH: `transition-all` on Cartridge Visuals

**File:** `CodexShelf.tsx`
**Lines:** ~260-270

The cartridge visual layer uses `transition-all duration-300`, which tells the browser to check and potentially animate every CSS property on every frame during a transition. Only `transform` and `opacity` actually change on hover. Using `transition-all` forces the browser to set up transition tracking for dozens of properties that never change.

**Impact:** Directly contributes to the hover sluggishness. Combined with 270 DOM elements and 33 blur filters, this makes hover interactions noticeably janky.

### 2.5 MEDIUM: Scroll Handler Without Throttle in ReaderPanel

**File:** `ReaderPanel.tsx` (962 lines)
**Lines:** ~100-130

The `handleScroll` callback iterates all four section refs on every scroll event, calling `getBoundingClientRect()` on each. `getBoundingClientRect()` forces a synchronous layout recalculation (reflow). On fast scrolling, this fires dozens of times per second, each time forcing the browser to recalculate layout before it can continue painting.

**Impact:** The reader tablet scroll may feel slightly laggy on content-heavy cartridges, especially on mobile or lower-end devices.

### 2.6 MEDIUM: 18 Dust Particles with Individual CSS Animations

**File:** `CodexShelf.tsx`
**Lines:** ~540-580

Eighteen dust particle divs are rendered with individual inline styles for `animationDelay`, `animationDuration`, and position. Each has its own CSS animation running continuously. While individually cheap, combined with the blur filters and cartridge elements, they add to the total compositor workload.

### 2.7 LOW: Inline Style Objects Recreated on Every Render

**Files:** `CabinetDeck.tsx`, `CodexShelf.tsx`, `ReaderPanel.tsx`, `GravityCheck.tsx`, `Results.tsx`

Throughout the codebase, inline style objects (e.g., `style={{ background: "radial-gradient(...)" }}`) are created as new JavaScript objects on every render. This prevents React's shallow comparison from short-circuiting re-renders, since `{} !== {}` even if the contents are identical. In isolation this is minor, but combined with the 60fps ticker re-renders, it means React can never skip diffing these elements.

---

## 3. Dead Code and Unused Files

### 3.1 43 Unused UI Components

The `client/src/components/ui/` directory contains 57 component files. Only 14 are imported anywhere in the application. The remaining 43 are scaffolding leftovers that are never used. While Vite's tree-shaking removes them from the production bundle, they add noise to the IDE, slow down linting, and make the codebase appear larger than it is.

| Status | Count | Examples |
|---|---|---|
| Used | 14 | RotaryKnob, VUMeter, button, card, dialog, tooltip, etc. |
| Unused | 43 | sidebar (734 lines!), accordion, avatar, breadcrumb, calendar, carousel, chart, collapsible, command, context-menu, dropdown-menu, form, hover-card, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, slider, switch, table, tabs, etc. |

The `sidebar.tsx` file alone is 734 lines of dead code — larger than some active components.

### 3.2 ReaderDrawer.tsx — Imported but Never Used

**File:** `ReaderDrawer.tsx` (462 lines)

This file is imported in `Codex.tsx` (line 7: `import ReaderDrawer from "@/components/ReaderDrawer"`) but the component is never rendered anywhere in the JSX. It's 462 lines of dead code that's imported into the bundle.

### 3.3 WordReveal.tsx — Exported but Never Imported

**File:** `client/src/components/reader/WordReveal.tsx` (96 lines)

Exported from the reader barrel file (`index.ts`) but never imported by any component.

### 3.4 Dead Public Assets

Of the 38 image files in `client/public/`, at least 25 are not referenced by any source file. These are shipped in the production build, inflating it from ~2 MB (code + used assets) to 113 MB. The largest dead assets are:

| File | Size | Status |
|---|---|---|
| `trim_bar_texture_v2.png` | 7.2 MB | Not referenced |
| `cartridge_v1.png` | 7.2 MB | Not referenced |
| `cartridge_v3.png` | 6.8 MB | Not referenced |
| `pager-device.png` | 7.6 MB | Not referenced |
| `pager-device_original.png` | 6.6 MB | Not referenced |
| `rebel-sticky-note.png` | 6.4 MB | Not referenced |
| `cartridge_v1_original.png` | 6.2 MB | Not referenced |
| `cartridge_v3_original.png` | 5.9 MB | Not referenced |
| `rebel-sticky-note_original.png` | 5.7 MB | Not referenced |
| `cartridge_v2.png` | 5.6 MB | Not referenced |
| `shelf_rail_texture.png` | 5.3 MB | Not referenced |
| `shelf_guard_rail.png` | 5.2 MB | Not referenced |
| `codex_cabinet_hero.png` | 5.1 MB | Not referenced |
| `shelf_guard_rail_original.png` | 4.6 MB | Not referenced |
| `cartridge_v2_original.png` | 4.8 MB | Not referenced |
| `statue-sword-bearer.png` | 2.5 MB | Not referenced |
| `journal_1.png` | 2.1 MB | Not referenced |
| `journal_2.png` | 1.9 MB | Not referenced |
| `cartridge_new.png` | Unknown | Not referenced |

Many of these appear to be design iterations or original-resolution versions that were replaced by CDN-hosted or WebP versions. The `_original` suffix files are clearly superseded.

**Impact:** The production build is ~55x larger than it needs to be. This affects deployment time, CDN storage costs, and initial page load if the hosting provider doesn't handle selective serving.

---

## 4. Duplication

### 4.1 Three Separate AudioContext Instances

**Files:** `GravityCheck.tsx` (line 15), `Results.tsx` (line 10), `CodexAudio.ts` (line 17)

Three separate `AudioContext` instances are created across the app. The Web Audio API spec recommends a single AudioContext per page. While browsers handle multiple contexts, it's wasteful and can cause issues on mobile Safari, which limits the number of active audio contexts.

`CodexAudio.ts` already implements a proper singleton pattern with lazy initialization. `GravityCheck.tsx` and `Results.tsx` should use it instead of creating their own contexts.

### 4.2 Duplicate `localStorage.getItem` Calls

**File:** `Codex.tsx`

The `useEffect` that processes the Gravitas signal reads `localStorage.getItem("gravityCheckResults")` at two separate points (the hash restore logic and the signal processing logic). This should be read once and stored in a variable.

### 4.3 Inline `<style>` Tags Duplicated Across Components

**Files:** `GravityCheck.tsx` (lines 154, 386), `Results.tsx` (line 402), `CodexShelf.tsx` (line 601), `CabinetDeck.tsx` (line 1006)

Five inline `<style>` tags inject CSS keyframe animations into the DOM. Some animations are duplicated — `gravitas-crt-flicker` appears in both the ModeSelect sub-component (line 154) and the main GravityCheck render (line 386). These inline styles are re-injected on every render, and duplicate keyframe names can cause browser confusion about which definition to use.

All of these should live in `index.css` or a dedicated animations CSS file.

---

## 5. Structural Issues

### 5.1 Monolithic Components

Three components exceed 700 lines, with two exceeding 1,000:

| Component | Lines | Concern |
|---|---|---|
| `CabinetDeck.tsx` | 1,014 | Contains 5 sub-components defined inline (PagerScreen, TickerTapeWindow, ScreenLCDBackground, IndicatorLight, plus the main component). These should be separate files. |
| `ReaderPanel.tsx` | 962 | Single component with all four reader sections, scroll handling, animation logic, and the full portal render. |
| `CodexShelf.tsx` | 727 | Contains CartridgeSpine inline, dust particles, statue rendering, and shelf layout. |

The inline sub-components in `CabinetDeck.tsx` are the most problematic because they can't be wrapped in `React.memo()` when defined inside the parent component — they're recreated on every render, which is why memoization is impossible and the 60fps ticker re-renders the entire tree.

### 5.2 IIFE in Render Path

**File:** `CodexShelf.tsx` (line 278)

An immediately-invoked function expression `(() => { ... })()` is used inside the CartridgeSpine render to calculate dynamic font sizing. This creates a new function on every render for every cartridge (27 times per render). The logic should be extracted to a `useMemo` or a utility function.

### 5.3 Global Scanlines Overlay at z-index 9999

**File:** `App.tsx` (line 33) + `index.css` (line 199)

A `<div className="scanlines" />` is rendered at the root of the app with `position: fixed`, `z-index: 9999`, covering the entire viewport. This creates a compositing layer that sits above everything, including the ReaderPanel portal. While it has `pointer-events: none`, it still forces the GPU to composite an additional full-viewport layer on every frame.

### 5.4 No Code Splitting

All five pages are eagerly imported in `App.tsx`. There's no `React.lazy()` or dynamic imports for route-level code splitting. The Codex page (with its 1,014-line CabinetDeck, 727-line CodexShelf, and 962-line ReaderPanel) is loaded even when the user is on the Gravitas page. The `CodexAudio.ts` module is dynamically imported in `Codex.tsx`, which is good, but the heavy components are not.

### 5.5 External Texture Dependencies

**File:** `index.css`

Three CSS background textures are loaded from external domains:
- `https://grainy-gradients.vercel.app/noise.svg`
- `https://www.transparenttextures.com/patterns/carbon-fibre.png`
- `https://www.transparenttextures.com/patterns/dark-leather.png`
- `https://www.transparenttextures.com/patterns/stardust.png`

If any of these external services go down or change their URLs, the app's visual design breaks. These should be self-hosted.

### 5.6 Broken Image Reference

**File:** `Home.tsx` or related component

The source code references `src="/home/ubuntu/upload/RebelLogo.png"` — an absolute filesystem path that only works in the development sandbox. This will 404 in production.

---

## 6. The Cartridge Hover Problem — Root Cause Analysis

You specifically mentioned that the cartridge hover feels sluggish/buggy. Here's the full chain of causes:

1. **27 cartridges × ~10 DOM elements = ~270 elements** always in the tree, never virtualized
2. **27 inner-lamp glow divs** with CSS `filter: blur()` — one per cartridge, always compositing
3. **6 statue glow divs** with blur filters up to 30px — always animating
4. **18 dust particles** with continuous CSS animations
5. **`transition-all duration-300`** on each cartridge visual — browser tracks all CSS properties for transition, not just the two that change
6. **Ticker rAF loop** driving 60fps state updates → full CabinetDeck re-render, which shares the page with CodexShelf
7. **No `React.memo()`** on any sub-component — every re-render cascades through the entire tree
8. **Inline style objects** prevent React from short-circuiting diffs

When you hover a cartridge, the browser has to: recomposite 33 blur filters, transition-check all CSS properties on the hovered element, re-render the CabinetDeck tree (if the ticker is running), and paint the dust particles — all in the same frame budget of 16.6ms.

---

## 7. The Text Ribbon / Pager Sluggishness — Root Cause Analysis

The ticker tape text ribbon across the pager screens is sluggish because:

1. `setTickerProgress()` is called via `requestAnimationFrame`, triggering a React state update on every frame
2. This re-renders `CabinetDeck` (1,014 lines) including all four `PagerScreen` components and their `ScreenLCDBackground` sub-components (4 gradient overlay divs each = 16 divs)
3. None of these sub-components are memoized
4. The ticker progress value is used to calculate a CSS `translateX` transform, but instead of using a ref + direct DOM manipulation (which would bypass React entirely), it goes through React's state → render → diff → commit cycle 60 times per second

---

## 8. Quick Wins (High Impact, Low Risk)

These are changes that would produce noticeable improvement with minimal risk of breaking anything:

| Priority | Change | Impact | Risk |
|---|---|---|---|
| 1 | Move ticker animation to `useRef` + direct DOM manipulation instead of `setState` | Eliminates 60fps re-renders of entire CabinetDeck tree | Low — isolated to TickerTapeWindow |
| 2 | Replace `transition-all` with `transition-[transform,opacity]` on cartridge visuals | Browser only tracks 2 properties instead of all | Very low — CSS-only change |
| 3 | Extract inline sub-components from CabinetDeck into separate files + wrap in `React.memo()` | Prevents cascade re-renders | Low — no behavior change |
| 4 | Reduce statue blur layers from 6 to 2-3, or use a single pre-rendered glow image | Halves GPU blur workload | Low — visual-only |
| 5 | Add `throttle` (16ms) to ReaderPanel scroll handler | Reduces forced reflows during scrolling | Very low |
| 6 | Remove dead assets from `client/public/` | Build drops from 113 MB to ~2 MB | None — they're not referenced |
| 7 | Remove unused UI components from `components/ui/` | Cleaner codebase, faster IDE | None — they're not imported |
| 8 | Self-host external textures | Eliminates external dependency risk | None |
| 9 | Move inline `<style>` keyframes to `index.css` | Stops re-injecting CSS on every render | Very low |
| 10 | Consolidate AudioContext into single CodexAudio singleton | Cleaner audio, better mobile compat | Low |

---

## 9. File-by-File Summary

### Pages

| File | Lines | Issues Found |
|---|---|---|
| `Home.tsx` | 210 | Broken image path (`/home/ubuntu/upload/RebelLogo.png`); otherwise clean |
| `GravityCheck.tsx` | 406 | Own AudioContext (should use CodexAudio); duplicate `gravitas-crt-flicker` keyframe; inline `<style>` tags; otherwise well-structured |
| `Results.tsx` | 445 | Own AudioContext; inline `<style>` tag; `getArchetypeColor()` recreated on every render (minor) |
| `Codex.tsx` | 281 | Imports unused `ReaderDrawer`; duplicate `localStorage` reads; clean otherwise |
| `Assets.tsx` | 63 | Clean utility page |
| `NotFound.tsx` | 49 | Clean |

### Components

| File | Lines | Issues Found |
|---|---|---|
| `CabinetDeck.tsx` | 1,014 | **Critical:** ticker rAF → setState at 60fps; 5 inline sub-components (not memoizable); inline `<style>` tag; inline style objects; 16 gradient overlay divs |
| `CodexShelf.tsx` | 727 | **High:** 33 blur filters (27 cartridge + 6 statue); `transition-all`; 18 dust particles; IIFE in render; inline `<style>` tag; `groupByFlywheel` not memoized |
| `ReaderPanel.tsx` | 962 | **Medium:** unthrottled scroll handler with `getBoundingClientRect()`; `steps` split/filter on every render; inline styles |
| `GravitasShell.tsx` | 352 | Direct DOM manipulation for dust particles (fine); clean otherwise |
| `ReaderDrawer.tsx` | 462 | **Dead code** — imported but never rendered |
| `ReaderSection.tsx` | 70 | Clean |
| `SectionIndicator.tsx` | 157 | Clean |
| `TypewriterHeading.tsx` | 88 | Clean |
| `WordReveal.tsx` | 96 | **Dead code** — exported but never imported |
| `ErrorBoundary.tsx` | ~30 | Clean |

### Utilities

| File | Lines | Issues Found |
|---|---|---|
| `codex-data.ts` | 1,114 | Data file — expected size; 16 of 27 cartridges missing proof sections |
| `codex-ranking.ts` | 336 | Clean, well-documented algorithm |
| `codex-schema.ts` | 147 | Clean type definitions |
| `questions.ts` | 384 | Clean |
| `scoring.ts` | 167 | Clean |
| `CodexAudio.ts` | 121 | Good singleton pattern; should be the only AudioContext |
| `utils.ts` | 6 | Just the `cn()` utility — clean |

### Configuration

| File | Issues Found |
|---|---|
| `vite.config.ts` | Contains debug collector plugin (fine for dev, should be stripped in prod); no code splitting configured |
| `tailwind.config.ts` | Not audited in detail — standard setup |
| `index.css` | External texture dependencies; scanlines overlay; otherwise clean |
| `index.html` | Image preload links (good, recently added) |

---

## 10. Summary

The app's visual design is exceptional and the architectural decisions (scoring algorithm, ranking system, cartridge schema) are solid. The performance issues are concentrated in two areas:

**The Codex page** carries the heaviest load. Between the ticker animation driving 60fps React re-renders, 33 concurrent blur filters, 270 always-mounted cartridge DOM elements, and `transition-all` on hover interactions, the GPU and React reconciler are both working much harder than necessary. This is why the cartridge hover and text ribbon feel sluggish.

**The build size** is 55x larger than it needs to be due to dead assets. The actual application code and used assets total roughly 2 MB. The remaining 111 MB is unreferenced images from earlier design iterations.

The codebase has no major bugs, no security issues, and no architectural problems. The issues are all optimization opportunities — the kind that accumulate naturally during rapid prototyping and can be addressed incrementally without restructuring anything.
