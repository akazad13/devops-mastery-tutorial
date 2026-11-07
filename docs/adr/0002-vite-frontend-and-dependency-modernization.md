# ADR-002: Vite Frontend and Dependency Modernization

## Status
Accepted

## Date
2026-11-07

## Context
The DevOps Mastery Tutorial application serves engineers learning DevOps tools (Linux, Docker, Kubernetes, Terraform, CI/CD, Observability). The application was previously running on React 18 and Vite 5.

Key project requirements:
1. **Zero-Friction Offline Access**: Learners must be able to clone and run the project locally with `npm run dev` or view it hosted statically without configuring databases, authentication services, or backend containers.
2. **Interactive Curriculum & Progress Tracking**: Real-time progress checkboxes, dark mode preferences, and interactive labs that persist seamlessly across sessions.
3. **Rich Markdown & Code Rendering**: Fast, secure parsing of detailed terminal commands, configuration files, and architecture diagrams with syntax highlighting.
4. **Fast Build & Hot Module Replacement**: Instant feedback during content authoring and minimal CI/CD build duration.

As the JavaScript and React ecosystems advanced, maintaining compatibility with the latest tooling standards, addressing security patches, and unlocking Vite 8's faster bundler and React 19's runtime improvements became necessary.

## Decision
Modernize the frontend stack to Vite 8 and React 19, standardizing on modern ecosystem dependencies:

1. **Build Tool & Bundler**: Vite 8 (`vite@^8.3.6`) with `@vitejs/plugin-react@^6.2.1`. Vite 8 delivers ultra-fast development server startup, optimized Rollup/Rolldown production builds (~200ms build times), and standard ES module resolution.
2. **UI Framework**: React 19 (`react@^19.3.1`, `react-dom@^19.3.1`), providing standard concurrent rendering primitives and enhanced hook stability.
3. **Routing**: React Router v7 (`react-router-dom@^7.18.5`) for declarative client-side SPA routing across curriculum phases, resource catalogs, and progress dashboards.
4. **Markdown & Code Highlighting**: `react-markdown@^10.1.0` combined with `remark-gfm@^4.0.1` and `react-syntax-highlighter@^16.1.2`, providing GitHub Flavored Markdown support and syntax-highlighted code blocks with zero HTML injection vulnerabilities.
5. **State & Storage**: Maintain client-side persistence in browser `localStorage` wrapped with defensive `try/catch` error handling to support private/incognito browsing environments.
6. **Zero-Backend Architecture**: Retain pure static asset compilation (`dist/`), ensuring the application can be hosted effortlessly on any static CDN (GitHub Pages, Cloudflare Pages, Netlify, or Vercel) without server operational overhead.

## Alternatives Considered

### Full-Stack Server-Side Framework (Next.js / Remix / Astro)
- *Pros*: Built-in SSR, file-based routing, and hybrid static generation.
- *Cons*: Introduces complex server runtime requirements (Node.js runtime or Edge functions), higher deployment complexity, and unnecessary overhead for an interactive client-side tutorial.
- *Rejected*: A client-side SPA with static output best fits the zero-friction philosophy of a DevOps tutorial repository.

### Retaining React 18 and Vite 5
- *Pros*: No need to update package boundaries or verify breaking changes across ecosystem packages.
- *Cons*: Leaves the repository on older major versions that lag behind upstream security updates, performance optimizations, and React 19 compiler/runtime enhancements.
- *Rejected*: Upgrading now ensures long-term maintainability and prevents technical debt accumulation.

### Backend-as-a-Service (Supabase / Firebase) for Progress Tracking
- *Pros*: Cross-device progress sync and user account profiles.
- *Cons*: Requires learners to create accounts, supply API keys, and manage network dependencies; breaks offline learning capability.
- *Rejected*: Browser `localStorage` is completely private, requires no credentials, works offline, and guarantees immediate responsiveness.

## Consequences
- **Build Performance**: Production bundle builds finish in ~200ms with optimized chunking (`highlighter`, `content`, `vendor` chunks).
- **Deployment Simplicity**: Output in `dist/` can be deployed anywhere as static files.
- **Maintainability**: Dependencies are up-to-date with current major releases, minimizing future migration friction.
- **Agent Guidelines**: AI agents operating in the repository must use modern React 19 functional patterns, verify changes with `npm run build`, and adhere to client-side persistence safeguards.
