# Rebel Leaders Plugins: Gravity Check & The Codex

**Version:** 1.1.0 (Coaching Pack & Collector's Assets)
**Project:** Rebel OS Plugin Suite

---

## 1. Overview

This repository contains the source code, assets, and design documentation for the **Rebel Leaders Plugin Suite**, a set of interactive tools for leadership development. The suite currently includes two core modules:

1.  **Gravity Check:** An interactive diagnostic tool that assesses team health across four dimensions: *Identity, Relationship, Vision, and Conflict*. It uses a visual "orbital mechanics" interface to engage users in a tactile assessment.
2.  **The Codex:** A digital archive of leadership protocols, "moves," and coaching scripts. It features a retro-futuristic "Archivist's Cabinet" aesthetic and includes a "Run Mode" for guiding users through real-time execution of these protocols.

The project is built as a **static React application** (Vite + React + Tailwind CSS) designed for easy deployment and fast performance.

---

## 2. Key Features

### Gravity Check (Diagnostic)
*   **Visual Interface:** Interactive orbital map where users drag "planets" (team members) to represent distance and alignment.
*   **Scoring Engine:** Calculates a "Gravity Score" based on user input, identifying the primary bottleneck (e.g., "Low Psychological Safety").
*   **Recommendation Logic:** Automatically suggests specific Codex protocols based on the lowest-scoring dimension.

### The Codex (Knowledge Base)
*   **Archivist's Cabinet UI:** A highly stylized, immersive interface resembling a physical cabinet of data tapes and journals.
*   **Coaching Pack Integration:** Includes 24+ protocols, with a dedicated **"COACHING"** filter for leadership development tools.
*   **Reader Drawer:** A tactical "slide-out" panel for reading protocols, featuring:
    *   **Briefing Mode:** Mission objective, "Use When," and "Avoid" guidance.
    *   **Script Mode:** Verbatim scripts for difficult conversations.
    *   **Coaching Sequence (Run Mode):** An interactive checklist to guide leaders through a protocol step-by-step.
*   **Search & Filter:** Real-time filtering by category (Conflict, Vision, Alignment, Culture, Coaching) and keyword search.

---

## 3. User Journey & Testing Path

To fully experience the application as a user would, follow this path:

### Phase 1: The Diagnostic (Gravity Check)
1.  **Start:** Navigate to the home page (`/`).
2.  **Initiate:** Click **"INITIATE GRAVITY CHECK"**.
3.  **Input:** Drag the orbital nodes to represent your team's current state across the 4 dimensions.
4.  **Result:** View your **Gravity Score** and the identified **Bottleneck** (e.g., "Identity Drift").
5.  **Transition:** Click **"ACCESS PROTOCOLS"** to move to the Codex. *Note: The system will simulate a "signal transmission" and auto-load a recommended protocol.*

### Phase 2: The Archive (The Codex)
1.  **Arrival:** You enter the **Codex**. If coming from Gravity Check, a "SIGNAL RECEIVED" overlay will appear, and the recommended protocol will auto-open.
2.  **Browse:** Close the drawer to see the **Archivist's Cabinet**.
    *   Hover over cartridges to see their labels.
    *   Use the **"COACHING"** tab in the top bar to filter for coaching-specific tools.
3.  **Select:** Click on a protocol (e.g., *"3 Coaching Questions"* or *"Truth Weather"*).
4.  **Read:** The **Reader Drawer** opens. Review the **Briefing** (Objective, Use When).
5.  **Execute:** Click **"INITIATE COACHING SEQUENCE"** (or "RUN MODE").
    *   Follow the interactive checklist.
    *   Click items to mark them as complete.
    *   Finish the sequence to see the completion message.

---

## 4. Project Structure

```
/client
  /public           # Static assets (favicons, robots.txt)
  /src
    /components     # React components
      Codex.tsx     # Main Codex page logic
      CodexGrid.tsx # The "Cabinet" layout grid
      ReaderDrawer.tsx # The slide-out reading panel
      ...
    /lib
      codex-data.ts # The database of all protocols (JSON format)
      codex-schema.ts # TypeScript definitions for data
    /pages          # Route pages (Home, Codex, etc.)
    /assets         # Local images (if any)
    index.css       # Global styles & Tailwind directives
/_source_assets     # High-quality source files (excluded from build)
/server             # (Placeholder for future backend)
/shared             # Shared types/constants
```

---

## 5. Development & Deployment

### Prerequisites
*   Node.js (v18+)
*   pnpm (recommended) or npm

### Installation
```bash
pnpm install
```

### Local Development
```bash
pnpm dev
```
Access the app at `http://localhost:5173`.

### Building for Production
```bash
pnpm build
```
This generates a static `dist/` folder ready for deployment to Vercel, Netlify, or any static host.

---

## 6. Asset Management

### Live Assets (CDN)
To ensure fast load times and successful deployment on static hosts (which often have file size limits), the live application uses **optimized CDN URLs** for large assets like the cabinet frame, journals, and swords.

### Source Assets (Local)
The high-quality, original source files (>1MB) are stored in the `_source_assets/` directory in this repository. These files are **excluded from the build** but are preserved here for your ownership and future use.

**Included Source Assets:**
*   `cabinet_frame.png` (The heavy industrial border)
*   `worn_journals.png` (The stack of research notes)
*   `truth_sword_collector.png` (The "Collector's Edition" prop)
*   `truth_sword_battle_worn.png` (The "Battle-Worn" variant)
*   `truth_sword_desk_relic.png` (The "Desk Relic" variant)
*   `truth_sword_wall_mount.png` (The "Wall Mount" variant)
*   `truth_sword_tech_artifact.png` (The "Tech Artifact" variant)

**How to Use Source Assets:**
If you wish to self-host or modify these assets:
1.  Copy the desired file from `_source_assets/` to `client/public/assets/`.
2.  Update the code references in `client/src/components/` to point to the local path (e.g., `/assets/truth_sword_collector.png`) instead of the CDN URL.

---

**Rebel Leaders Plugin Suite**
*Tools for the Resistance.*
