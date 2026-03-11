# Project Context & Vision: Rebel Leaders Plugin Suite

**Last Updated:** March 2026
**Repository:** `nicrpayne/rebel-leaders-plugins`

---

## 1. The Mission: "Hope is an Act of Rebellion"

The **Rebel Leaders Plugin Suite** is not just a set of productivity tools; it is a digital workbench for the resistance. In a corporate world dominated by cynicism, burnout, and "default" leadership, we are building tools that help leaders reclaim their agency, humanity, and vision.

**Core Ethos:**
*   **Tactile & Visceral:** Leadership is messy and physical. Our tools should feel like heavy, industrial machinery (switches, decks, cartridges), not sterile SaaS dashboards.
*   **Ancient Wisdom x Retro-Future:** We blend the timeless insights of mystics and philosophers with a "Hi-Bit" cyberpunk aesthetic. It's *Blade Runner* meets *The Desert Fathers*.
*   **Diagnosis -> Action:** We don't just show data; we prescribe "moves." Every diagnostic result leads to a specific, actionable protocol.

---

## 2. The Architecture of the Suite

The suite currently consists of two interconnected modules:

### A. GRAVITAS (The Diagnostic)
*   **Purpose:** To visualize the invisible forces pulling a team apart.
*   **Mechanic:** An "Orbital Mechanics" interface where users drag nodes (team members) to represent their distance from the leader and each other across 4 dimensions: *Identity, Relationship, Vision, Conflict*.
*   **Output:** A "Gravity Score" and a specific "Bottleneck" (e.g., *Identity Drift*).
*   **The Handoff:** Upon completion, GRAVITAS "transmits" a signal to The Codex, auto-unlocking the recommended protocol.

### B. The Codex (The Solution)
*   **Purpose:** A repository of "dangerous knowledge"—protocols, scripts, and coaching moves to break the bottleneck.
*   **Aesthetic:** **The Archivist's Cabinet**. A dark, moody, industrial archive filled with data tapes and worn journals.
*   **Key Features:**
    *   **The Cabinet:** A mixed-media grid of vertical spines and horizontal stacks of cartridges.
    *   **Coaching Pack:** A specialized filter for 1:1 development tools (Agency, Dependency, etc.).
    *   **Reader Drawer:** A slide-out tactical panel with "Briefing" (Context) and "Run Mode" (Execution).
    *   **Run Mode:** An interactive checklist that guides the leader through the protocol in real-time.

---

## 3. Design Philosophy & Aesthetic

**"Hi-Bit" / "Stained Glass Cyberpunk"**
*   **Visuals:** We use 8-bit pixel art but render it with high-end lighting, depth of field, and atmosphere. It's not "Minecraft"; it's "Octopath Traveler."
*   **Assets:**
    *   **Cartridges:** Physical data tapes (Black body, Yellow label) representing protocols.
    *   **Props:** Worn journals, coffee cups, industrial frames, and the "Truth Sword."
    *   **Lighting:** Warm lamp light amidst cool CRT glow.
*   **Interaction:** Sounds of mechanical clicks, heavy slides, and CRT hums (future state).

---

## 4. Technical Overview

*   **Stack:** Vite + React + Tailwind CSS (Static Site).
*   **Deployment:** Designed for Vercel/Netlify.
*   **Data:**
    *   `codex-data.ts`: JSON-based database of all protocols.
    *   `codex-schema.ts`: TypeScript definitions ensuring data integrity.
*   **Asset Strategy:**
    *   **Live Site:** Uses optimized CDN URLs for large assets (>1MB) to ensure fast loading.
    *   **Source Repo:** Contains a `_source_assets/` folder with the high-quality original PNGs for ownership and future editing.

---

## 5. The Future Roadmap

**Immediate Next Steps:**
1.  **Unlockables:** Implement a "Profile" or "Trophy Case" where users can display the **Truth Sword** (asset already generated) after completing a streak of coaching sessions.
2.  **Shareable Results:** A "Mission Report" card generated at the end of GRAVITAS for social sharing.
3.  **Timer/Notes in Run Mode:** Add a simple countdown timer and a text area for leaders to jot down observations during a protocol.

**Long-Term Vision:**
*   **Multiplayer GRAVITAS:** Real-time collaboration where entire teams drag their own nodes to see the collective view.
*   **The Residency:** A deeper, cohort-based learning module (placeholder exists in nav).
*   **Mobile App:** A companion app for "pocket protocols" (though the web app is mobile-first).

---

**"The resistance starts here."**
