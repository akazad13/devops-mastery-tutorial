# AGENTS.md — AI Agent Guidance & Repository Rules

This document provides mandatory guidance for autonomous AI coding agents (Antigravity, Claude Code, GitHub Copilot, Cursor, Windsurf, Devin) operating in `akazad13/devops-mastery-tutorial`.

---

## 1. System Identity & Architecture

**Product**: `DevOps Mastery Tutorial` — Structured 9-week interactive roadmap, hands-on tutorials, and progress-tracking web application for DevOps engineering.
- **Runtime**: React 19 (`react@^19.3.1`, `react-dom@^19.3.1`), Vite 8 (`vite@^8.3.6`), JavaScript (ES modules, JSX).
- **Routing**: React Router v7 (`react-router-dom@^7.18.5`).
- **Styling**: Responsive custom design with dark and light theme support (`src/styles.css`).
- **Markdown & Highlighting**: `react-markdown@^10.1.0`, `remark-gfm@^4.0.1`, `react-syntax-highlighter@^16.1.2`.
- **State & Storage**: Client-side browser `localStorage` tracking module completion and theme preference.

### Project Layout (`src/`):
- `src/main.jsx`: Application bootstrap and React root mount.
- `src/App.jsx`: Application shell, client router configuration, and layout navigation.
- `src/curriculum.js`: The 7 learning phases, metadata, topics, and day checklists.
- `src/content.js`: Full markdown lesson content map and practical lab instructions.
- `src/hooks.js`: Theme toggle and progress persistence hooks (`useTheme`, `useProgress`).
- `src/components/`: Reusable UI elements, markdown renderer, and visual diagrams.
- `src/pages/`: Top-level page views (`Home`, `PhasePage`, `ProgressPage`, `ResourcesPage`).
- `src/styles.css`: Responsive design and CSS variables.

---

## 2. Inviolable Architectural Invariants

1. **Curriculum Data Decoupling**:
   - Lesson text, terminal commands, and roadmap milestones belong in `src/content.js` and `src/curriculum.js`. Do not hardcode curriculum content into UI layout components.
2. **Progress Persistence Resilience**:
   - Reading and writing user progress and theme settings in `localStorage` must wrap in `try/catch` guards (as implemented in `src/hooks.js`) to prevent runtime crashes in restricted/incognito browsing environments.
3. **Markdown Rendering Security**:
   - Markdown lesson rendering must use sanitized AST components via `react-markdown` to prevent XSS vulnerabilities from untrusted content.
4. **Zero-Backend Static Compilation**:
   - The platform is designed as an offline-first, client-side SPA that compiles to static assets (`dist/`). Do not introduce mandatory server runtimes or backend database services that would break static hosting (GitHub Pages, Cloudflare Pages, Vercel).
5. **Architectural Decision Compliance**:
   - Significant architectural decisions, dependency shifts, and structure changes must be documented via Architecture Decision Records in `docs/adr/` per [ADR-001](docs/adr/0001-record-architecture-decisions.md).

---

## 3. Architecture Decision Records (ADRs)

All major architectural and toolchain choices are documented under [`docs/adr/`](docs/adr/README.md):
- [ADR-001: Record Architecture Decisions](docs/adr/0001-record-architecture-decisions.md) — Establishes ADR process and conventions.
- [ADR-002: Vite Frontend and Dependency Modernization](docs/adr/0002-vite-frontend-and-dependency-modernization.md) — Adopts Vite 8, React 19, and modernized parsing/routing dependencies.

Before introducing new frameworks, state managers, or build plugins, consult existing ADRs and document new proposals in `docs/adr/`.

---

## 4. Commands Cheat Sheet

```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Verification Gates for AI Agents

Before submitting code changes or finishing a turn:
1. Run `npm run build` — must build with **0 errors**.
2. Verify that phase navigation, markdown rendering, and local progress updates function correctly.
3. Ensure all documentation and ADR references remain accurate and consistent.
