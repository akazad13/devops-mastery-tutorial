# DevOps Mastery Tutorial

A Vite + React learning app for a structured 9-week DevOps roadmap.

The app includes:
- 7 curriculum phases (plus overview)
- Markdown-based lesson content rendered in-app
- Per-session progress tracking saved in browser storage
- Pages for curriculum, progress tracking, and setup/resources

## Tech Stack

- React 18
- React Router
- Vite 5
- react-markdown + remark-gfm
- react-syntax-highlighter

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open the local URL shown in the terminal (typically `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Create production build in `dist`
- `npm run preview`: Serve the production build locally

## Project Structure

```text
src/
  App.jsx                  # App shell, routes, sidebar, top bar
  content.js               # Generated markdown content map
  curriculum.js            # Phase metadata and day/session definitions
  hooks.js                 # Theme + progress hooks (localStorage)
  pages/
    Home.jsx               # Landing page and curriculum cards
    PhasePage.jsx          # Individual phase content and checklist
    ProgressPage.jsx       # Full progress tracker
    ResourcesPage.jsx      # Tools, links, glossary
  components/
    Graphics.jsx           # Hero/progress visuals
    Markdown.jsx           # Markdown rendering wrapper
    Viz.jsx                # Diagram rendering helpers
  styles.css               # App styling
```

## Content Model

Curriculum markdown is bundled directly into `src/content.js`.

Phase metadata (title, slug, topics, day checklist) lives in `src/curriculum.js` and maps each phase to markdown entries in `content.js`.

## Notes

- Progress is stored in browser `localStorage` and is device/browser specific.
- The reset action in the progress page clears all tracked session completion states.

## License

No license file is currently included. Add one if you plan to distribute this project publicly.
