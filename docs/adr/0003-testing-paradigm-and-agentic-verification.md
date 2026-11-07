# ADR-003: Testing Paradigm and Agentic Verification

## Status
Accepted

## Date
2026-11-07

## Context
`devops-mastery-tutorial` is an interactive, offline-first educational web application guiding developers through a 9-week DevOps curriculum. As the platform evolves through both human contributions and autonomous AI coding agents (Antigravity, Claude Code, Cursor, Windsurf, GitHub Copilot), ensuring educational content integrity, rendering security, and runtime stability is vital.

Without a codified testing paradigm, agentic workflows face specific risks:
1. **Curriculum Schema Drift & Broken References**: Modifications to `src/curriculum.js` or `src/content.js` can introduce dangling content keys (displaying `# Content not found`), duplicate or malformed phase slugs, mismatched day checklists, or corrupted route paths.
2. **Markdown AST & Sanitization Regressions**: Markdown prose incorporates shell commands, YAML configurations, ASCII architecture diagrams, and embedded interactive components (`Viz.jsx`). Unchecked changes can break AST component parsing, fail syntax highlighting registrations, or introduce unsafe link injection patterns.
3. **Build & Transpilation Failures**: Upgrades to dependencies or JSX refactoring can introduce subtle bundling errors that break static compilation.
4. **Agent Verification Latency**: Traditional heavyweight browser E2E suites (e.g., Cypress/Playwright) introduce multi-minute runtimes, high resource overhead, and non-deterministic timing, slowing down agentic iteration loops.

To maintain continuous quality and agility, the repository requires a clear, lightweight, and deterministic testing paradigm optimized for agentic development per the `test-driven-development` and `documentation-and-adrs` engineering standards.

## Decision
We establish a layered Testing and Verification Paradigm specifically tailored for the tutorial platform and autonomous agent workflows:

### 1. Verification Layers

#### Layer 1: Curriculum Schema & Data Integrity Validation
Curriculum metadata and lesson content must satisfy structural invariants:
- **Phase Schema Completeness**: Every entry in `src/curriculum.js` must contain non-empty strings for `slug`, `number`, `title`, `short`, `icon`, `color`, `weeks`, `summary`, a non-empty `topics` array, and a `days` array.
- **Content Map Resolution**: Every phase's `markdown` field must bind to an existing key in `src/content.js`. Any reference that falls back to `# Content not found` is considered a test failure.
- **Unique Slugs & Routing**: Slugs must be lowercase, alphanumeric, hyphen-delimited, and unique across all phases to guarantee correct client-side routing.
- **Trackable Milestones**: `totalDays` must accurately calculate the sum of all phase day checklists for reliable progress percentage tracking.

#### Layer 2: Fast Agentic Build Verification (`npm run build`)
The production build serves as the primary compile-time static analysis and bundling gate:
- **Zero-Error Bundling**: Running `npm run build` with Vite 8 must complete with exit code `0` and zero warnings or bundling errors.
- **Asset Emission & Chunk Integrity**: Build output in `dist/` must generate valid HTML, CSS, and split chunks (`vendor`, `highlighter`, `content`, `index`).
- **Sub-Second Feedback Loop**: Build validation finishes in under ~250ms, allowing autonomous agents to execute verification after every modification without context degradation or latency spikes.

#### Layer 3: Markdown AST Pipeline & Sanitization Checks
The markdown rendering engine (`src/components/Markdown.jsx`) processes all lesson content:
- **AST Component Mapping**: All code blocks must parse safely through `react-markdown` and `remark-gfm`. Registered languages (`bash`, `docker`, `yaml`, `python`, `powershell`, `sql`, `json`, etc.) must highlight without syntax engine exceptions.
- **Diagram Detection**: Code blocks utilizing box-drawing and directional characters (`─│┌┐└┘▼▲`) must deterministically route to `<Diagram>` monospace elements rather than code blocks.
- **Interactive Visualizer Embedding**: The `viz` language block must resolve directly to interactive visualizers via `src/components/Viz.jsx`.
- **Sanitization & Link Safety**: Raw unescaped HTML execution is disallowed; external links (`http...`) must automatically enforce `target="_blank"` and `rel="noreferrer"` attributes to prevent tab-nabbing vulnerabilities.

### 2. Core Architectural Invariants

| Invariant | Requirement | Verification Method |
| :--- | :--- | :--- |
| **Zero Runtime Console Errors** | No warnings or errors thrown during app bootstrap, route navigation, or user interactions. | DevTools console check, clean React 19 render cycle. |
| **Deterministic Offline Rendering** | 100% of curriculum content and code highlighters work completely offline without third-party API dependencies. | Static build output inspection, local storage persistence with defensive `try/catch`. |
| **Fast Agentic Validation Loop** | Verification must execute in sub-second time to support rapid red-green-refactor agentic cycles. | `npm run build` execution (~200ms turnaround). |

### 3. Agentic Workflow Integration (TDD & Prove-It Pattern)

Autonomous AI coding agents operating in this repository must apply Test-Driven Development principles:
1. **Red**: When fixing a bug or adding a feature (e.g., adding a new curriculum phase or syntax highlighter), identify or define the failing condition (missing schema field, unhandled language tag, or broken route).
2. **Green**: Write the minimal code in `src/curriculum.js`, `src/content.js`, or component trees to satisfy the condition.
3. **Refactor**: Clean up and optimize while continuously running `npm run build`.
4. **Verify**: Before finishing a turn or submitting a commit, execute `npm run build` and verify that schema and content invariants remain intact.

## Alternatives Considered

### Heavyweight Browser E2E Suites (Cypress / Playwright)
- *Pros*: Tests full browser interaction, DOM rendering, and visual regression.
- *Cons*: Heavy dependencies, multi-minute execution times, resource-intensive for lightweight SPA, and causes significant latency for autonomous agent loops.
- *Rejected*: Sub-second Vite build validation combined with schema integrity and AST component isolation provides superior feedback speed and developer/agent ergonomic balance.

### Manual Visual Inspection Only
- *Pros*: No formal testing specification required.
- *Cons*: Prone to agent oversights, accidental omission of content keys, and silent regressions across deep curriculum phases.
- *Rejected*: Invariants must be codified and verifiable via deterministic build and data integrity checks.

## Consequences
- **High Agility**: Sub-second verification cycles enable rapid, error-free iterations by AI agents and contributors.
- **Content Reliability**: Prevents broken links, missing lesson content, and corrupted progress tracking across the 9-week roadmap.
- **Security Hardening**: Codifies markdown AST sanitization, preventing XSS and injection vectors.
- **Clear Guidance**: AI agents operating in the repository have explicit, enforceable verification gates documented in `AGENTS.md` and indexed in `docs/adr/`.
