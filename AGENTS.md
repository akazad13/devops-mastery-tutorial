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

All major architectural, toolchain, and testing choices are documented under [`docs/adr/`](docs/adr/README.md):
- [ADR-001: Record Architecture Decisions](docs/adr/0001-record-architecture-decisions.md) — Establishes ADR process and conventions.
- [ADR-002: Vite Frontend and Dependency Modernization](docs/adr/0002-vite-frontend-and-dependency-modernization.md) — Adopts Vite 8, React 19, and modernized parsing/routing dependencies.
- [ADR-003: Testing Paradigm and Agentic Verification](docs/adr/0003-testing-paradigm-and-agentic-verification.md) — Codifies curriculum schema validation, fast build verification, markdown AST sanitization, and offline determinism.

Before introducing new frameworks, state managers, build plugins, or changing verification pipelines, consult existing ADRs and document new proposals in `docs/adr/`.

---

## 4. Commands Cheat Sheet

```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Build production bundle (Verification Gate)
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Testing Paradigm & Agentic Verification

All autonomous agents must adhere to the testing paradigm codified in [ADR-003](docs/adr/0003-testing-paradigm-and-agentic-verification.md):

### 1. Verification Layers
- **Curriculum Schema & Data Integrity**:
  - Every phase in `src/curriculum.js` must have valid metadata (`slug`, `number`, `title`, `summary`, `topics`, `days`).
  - Content keys must resolve in `src/content.js`. Fallbacks to `# Content not found` are strictly invalid.
  - Phase slugs must be unique, lowercase, hyphen-separated, and match routing expectations.
- **Production Build Gate (`npm run build`)**:
  - Vite 8 production build must succeed with **0 errors and 0 warnings**.
  - All chunks (`vendor`, `highlighter`, `content`, `index`) must compile cleanly within ~200ms.
- **Markdown AST Pipeline & Sanitization**:
  - Markdown content must parse safely via `react-markdown` and `remark-gfm`.
  - Registered Prism grammars in `src/components/Markdown.jsx` must support all code fence languages.
  - Diagram ASCII blocks and `<Viz>` components must render deterministically.
  - External links must enforce `target="_blank"` and `rel="noreferrer"`.

### 2. Core Architectural Invariants
- **Zero Runtime Console Errors**: No console warnings or uncaught exceptions during app mount, route changes, or theme/progress toggling.
- **Deterministic Offline Rendering**: All assets, markdown text, and code styles must render with 100% functionality without internet access.
- **Fast Feedback Loop**: Agentic verification gates must execute in sub-second time.

### 3. Agent Verification Protocol (TDD Cycle)
Before completing any task, modifying content, or committing code:
1. **Red**: Identify the target behavior, failing state, or missing data contract.
2. **Green**: Implement minimal, compliant changes adhering to decoupled data architectures.
3. **Verify**: Execute `npm run build` and ensure zero errors across the bundle.
4. **Docs Sync**: Ensure ADRs, `AGENTS.md`, and `README.md` remain accurate and synchronized.
