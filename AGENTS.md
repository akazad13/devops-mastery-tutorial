# AGENTS.md — AI Agent Guidance & Repository Rules

This document provides mandatory guidance for autonomous AI coding agents (Antigravity, Claude Code, GitHub Copilot, Cursor, Windsurf, Devin) operating in `akazad13/devops-mastery-tutorial`.

---

## 1. System Identity & Architecture

**Product**: `DevOps Mastery Tutorial` — Structured 9-week interactive roadmap, hands-on tutorials, and progress-tracking web application for DevOps engineering.
- **Runtime**: React 18, Vite 5, JavaScript (JSX).
- **Styling**: Tailwind CSS with dark theme support.
- **State & Storage**: Client-side `localStorage` tracking module completion and exercise checklists.

### Project Layout (`src/`):
- `src/components/`: Layout navigation, phase progress headers, lesson viewers, and sidebar navigation.
- `src/data/`:
  - `phases.js`: The 7 learning phases, module definitions, day-by-day objectives.
  - `lessons.js`: Full markdown lesson content and hands-on terminal labs.
  - `tools.js`: Tooling index (Docker, K8s, Helm, Terraform, Ansible, Prometheus).

---

## 2. Inviolable Architectural Invariants

1. **Curriculum Data Decoupling**:
   - Lesson text, terminal commands, and roadmap milestones belong in `src/data/`. Do not hardcode curriculum content into UI layout components.
2. **Progress Persistence Resilience**:
   - Reading and writing user progress in `localStorage` must wrap in `try/catch` guards to prevent runtime crashes in private/incognito browsing modes.
3. **Markdown Rendering Security**:
   - Lesson code snippets rendered via markdown parsers must sanitize HTML to prevent XSS vulnerabilities.

---

## 3. Commands Cheat Sheet

```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Build production bundle
npm run build

# Preview build locally
npm run preview
```

---

## 4. Verification Gates for AI Agents

Before submitting code changes or finishing a turn:
1. Run `npm run build` — must build with **0 errors**.
2. Verify that phase navigation and lesson rendering load properly without broken markdown links.
