# Gravity Check — Rebel OS Plugin

An interactive culture diagnostic tool for the Rebel Leaders platform. This plugin allows leaders to assess their team's "gravity" across four dimensions: Identity, Relationship, Vision, and Culture.

## Features

- **15-Question Diagnostic:** A mix of slider-based "signal checks" and scenario-based "mechanism checks."
- **Scoring Engine:** Calculates a 4-axis flywheel score and determines one of 5 orbit archetypes (e.g., Shattered Moon, Friction Belt).
- **Leak Detection:** Identifies the primary energy leak (e.g., Silence Tax, Role Fog) based on the lowest scoring dimension.
- **Visual Results:** A dynamic radar chart visualizing the team's gravity shape.
- **PDF Debrief:** Generates a beautiful, on-brand PDF report on the fly.
- **Local Storage:** Saves results to the browser for future "side-chaining" with other plugins.

## Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Charts:** Recharts
- **PDF Generation:** jsPDF
- **Routing:** Wouter

## Project Structure

```
client/src/
├── components/
│   ├── PluginShell.tsx       # The reusable frame for all plugins
│   └── ui/                   # shadcn/ui primitives
├── lib/
│   ├── scoring.ts            # The core logic for archetypes and leaks
│   └── pdf.ts                # PDF generation engine
├── pages/
│   ├── Home.tsx              # The "Armory" (Plugin Library)
│   ├── GravityCheck.tsx      # The diagnostic flow
│   └── Results.tsx           # The analysis and visualization
└── index.css                 # Global styles and 8-bit theme variables
```

## Design System

The project uses a unique "Rebel OS" aesthetic:
- **Colors:** Forest Deep (#0a120a), Gold (#c5a059), Wood (#5d4037)
- **Fonts:** Press Start 2P (Headers), Cormorant Garamond (Body), Outfit (UI)
- **Motifs:** Scanlines, 8-bit borders, stained glass metaphors

## Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the dev server:
   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```
