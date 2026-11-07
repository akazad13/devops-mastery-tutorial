# Architecture Decision Records (ADRs)

This directory documents the architectural and technical decisions made in the `devops-mastery-tutorial` project. Each record captures the context, decision, alternatives evaluated, and consequences of a significant architectural choice.

For more details on the ADR process, see [ADR-001](0001-record-architecture-decisions.md).

## Index of Decisions

| ADR | Title | Status | Date | Summary |
| :--- | :--- | :--- | :--- | :--- |
| [ADR-001](0001-record-architecture-decisions.md) | Record Architecture Decisions | **Accepted** | 2026-11-07 | Adopt Architecture Decision Records (ADRs) to document key technical decisions in `docs/adr/`. |
| [ADR-002](0002-vite-frontend-and-dependency-modernization.md) | Vite Frontend and Dependency Modernization | **Accepted** | 2026-11-07 | Modernize build toolchain and runtime to Vite 8, React 19, React Router v7, and React Markdown 10. |
| [ADR-003](0003-testing-paradigm-and-agentic-verification.md) | Testing Paradigm and Agentic Verification | **Accepted** | 2026-11-07 | Codify curriculum schema integrity, fast build validation, AST sanitization, and offline determinism for agentic workflows. |

## Lifecycle of an ADR

```
Proposed ───► Accepted ───► Superseded (by ADR-XXXX)
                 │
                 └───► Deprecated
```

- **Proposed**: Under review and actively discussed.
- **Accepted**: Approved and implemented in the codebase.
- **Superseded**: Replaced by a subsequent ADR that defines a new direction.
- **Deprecated**: Retired without direct replacement.

## How to Author a New ADR

1. Copy the structure from an existing ADR or create `docs/adr/NNNN-kebab-case-title.md` with sequential numbering.
2. Include the following sections:
   - `## Status`
   - `## Date`
   - `## Context`
   - `## Decision`
   - `## Alternatives Considered`
   - `## Consequences`
3. Add the new record to the table in this `README.md`.
4. Update `AGENTS.md` and `README.md` if the decision introduces new invariants or modifies application architecture.
