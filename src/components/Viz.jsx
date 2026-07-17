import { Fragment } from 'react'

/* ---------- shared primitives ---------- */
function Node({ icon, label, sub, tone }) {
  return (
    <div className={`viz-node ${tone ? `viz-node--${tone}` : ''}`}>
      {icon && <span className="viz-node__icon">{icon}</span>}
      <span className="viz-node__label">{label}</span>
      {sub && <span className="viz-node__sub">{sub}</span>}
    </div>
  )
}

function Arrow({ label, down }) {
  return (
    <div className={`viz-arrow ${down ? 'viz-arrow--down' : ''}`}>
      {label && <span className="viz-arrow__label">{label}</span>}
      <span className="viz-arrow__line" aria-hidden="true">
        {down ? '↓' : '→'}
      </span>
    </div>
  )
}

// A row/column of nodes connected by arrows. Each item may carry `via` (the
// label of the arrow leading into it).
function Flow({ items, down }) {
  return (
    <div className={`viz-flow ${down ? 'viz-flow--down' : ''}`}>
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && <Arrow label={it.via} down={down} />}
          <Node {...it} />
        </Fragment>
      ))}
    </div>
  )
}

function Frame({ title, note, children }) {
  return (
    <figure className="viz">
      {title && <figcaption className="viz__title">{title}</figcaption>}
      <div className="viz__body">{children}</div>
      {note && <p className="viz__note">{note}</p>}
    </figure>
  )
}

/* ---------- diagrams ---------- */

function ContainerLifecycle() {
  return (
    <Frame title="Container lifecycle" note="A container moves through these states as you run Docker commands.">
      <Flow
        items={[
          { icon: '📄', label: 'Image', sub: 'read-only template' },
          { icon: '📦', label: 'Created', sub: 'docker create', via: 'docker run' },
          { icon: '▶️', label: 'Running', sub: 'your process', via: 'starts' },
          { icon: '⏸️', label: 'Stopped', sub: 'exited', via: 'docker stop' },
          { icon: '🗑️', label: 'Removed', sub: 'gone', via: 'docker rm', tone: 'bad' },
        ]}
      />
    </Frame>
  )
}

function LayerCache() {
  const layers = [
    { label: 'COPY . /app', note: 'your code — changes often', tone: 'rebuild' },
    { label: 'RUN npm install', note: 'dependencies — change sometimes', tone: 'rebuild' },
    { label: 'WORKDIR /app', note: 'cached', tone: 'cached' },
    { label: 'RUN apt-get update', note: 'cached', tone: 'cached' },
    { label: 'FROM node:18', note: 'base image — rarely changes', tone: 'cached' },
  ]
  return (
    <Frame
      title="Image layers & build cache"
      note="Each instruction is a cached layer. Changing one line busts the cache for that layer and everything above it — so put frequently-changing steps last."
    >
      <div className="viz-stack">
        {layers.map((l) => (
          <div key={l.label} className={`viz-layer viz-layer--${l.tone}`}>
            <code>{l.label}</code>
            <span className="viz-layer__note">
              {l.tone === 'cached' ? '✓ ' : '↻ '}
              {l.note}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function ComposeStack() {
  return (
    <Frame title="Docker Compose: a multi-container app" note="One network; services reach each other by name. Data lives in a named volume so it survives restarts.">
      <Flow
        items={[
          { icon: '🌐', label: 'nginx', sub: 'reverse proxy · :80' },
          { icon: '⚙️', label: 'api', sub: ':3000', via: 'proxies' },
          { icon: '🗄️', label: 'postgres', sub: ':5432', via: 'queries' },
        ]}
      />
      <div className="viz-attach">
        <span className="viz-attach__line" aria-hidden="true">↳</span>
        <Node icon="💾" label="postgres_data" sub="named volume" tone="muted" />
      </div>
    </Frame>
  )
}

function Multistage() {
  const bars = [
    { label: 'Single stage', size: '~1.2 GB', pct: 100, tone: 'bad' },
    { label: 'Multi-stage', size: '~120 MB', pct: 10, tone: 'good' },
  ]
  return (
    <Frame title="Multi-stage build: image size" note="Build in a fat SDK image, copy only the compiled output into a lean runtime image — ~10× smaller.">
      <div className="viz-bars">
        {bars.map((b) => (
          <div key={b.label} className="viz-bar-row">
            <span className="viz-bar-row__label">{b.label}</span>
            <div className="viz-bar-track">
              <div className={`viz-bar-fill viz-bar-fill--${b.tone}`} style={{ width: `${b.pct}%` }} />
            </div>
            <span className="viz-bar-row__size">{b.size}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function AzureHierarchy() {
  return (
    <Frame title="Azure resource hierarchy" note="Everything you create lives inside a resource group, which lives inside a subscription (the billing boundary).">
      <div className="viz-tree">
        <div className="viz-tree__box viz-tree__l0">
          <span className="viz-tree__cap">Account</span>
          <div className="viz-tree__box viz-tree__l1">
            <span className="viz-tree__cap">Subscription · billing</span>
            <div className="viz-tree__box viz-tree__l2">
              <span className="viz-tree__cap">Resource Group</span>
              <div className="viz-tree__leaves">
                <span className="viz-leaf">🖥️ App Service</span>
                <span className="viz-leaf">🗄️ SQL Database</span>
                <span className="viz-leaf">🔐 Key Vault</span>
                <span className="viz-leaf">📦 Storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

function AppServicePlan() {
  return (
    <Frame title="App Service Plan vs App Service" note="The plan is the VM you pay for; multiple apps can run on one plan.">
      <div className="viz-plan">
        <span className="viz-plan__cap">🖥️ App Service Plan (the VM — you pay for this)</span>
        <div className="viz-plan__apps">
          <Node icon="🌐" label="app-web" sub="App Service" />
          <Node icon="🔌" label="app-api" sub="App Service" />
        </div>
      </div>
    </Frame>
  )
}

function KeyVaultFlow() {
  return (
    <Frame title="Key Vault reference (no secrets in code)" note="The app authenticates with its managed identity and reads the secret by name — rotate it in Key Vault and the app picks up the new value.">
      <Flow
        items={[
          { icon: '🖥️', label: 'App Service', sub: 'needs a secret' },
          { icon: '🪪', label: 'Managed Identity', sub: 'proves who it is', via: 'authenticates' },
          { icon: '🔐', label: 'Key Vault', sub: 'stores the secret', via: 'requests' },
          { icon: '🔑', label: 'Secret value', sub: 'returned to app', via: 'grants', tone: 'good' },
        ]}
      />
    </Frame>
  )
}

function EmailStatus() {
  return (
    <Frame title="ACS email delivery status" note="Send returns immediately; poll the operation until it reaches a terminal state.">
      <div className="viz-flow">
        <Node icon="📨" label="Queued" />
        <Arrow />
        <Node icon="🚚" label="OutForDelivery" />
        <Arrow label="then" />
        <div className="viz-branch">
          <Node icon="✅" label="Succeeded" tone="good" />
          <Node icon="⚠️" label="Failed" sub="bounce / spam" tone="bad" />
        </div>
      </div>
    </Frame>
  )
}

function OAuthFlow() {
  const steps = [
    ['User clicks “Sign in”', 'Your app redirects the browser to Microsoft’s authorize endpoint.'],
    ['Microsoft login', 'The user authenticates at login.microsoftonline.com (you never see the password).'],
    ['Redirect back with a code', 'Microsoft sends the browser to your /auth/callback with a short-lived authorization code.'],
    ['App exchanges the code', 'Server-side, your app POSTs the code + client secret to the token endpoint.'],
    ['Tokens returned', 'Microsoft returns an access token, ID token, and refresh token.'],
    ['User is signed in', 'Your app stores the tokens and establishes a session.'],
  ]
  return (
    <Frame title="OAuth 2.0 authorization code flow" note="The correct flow for web apps: the secret code-for-token exchange happens server-side, never in the browser.">
      <ol className="viz-steps">
        {steps.map(([t, d], i) => (
          <li key={i} className="viz-step">
            <span className="viz-step__num">{i + 1}</span>
            <div>
              <div className="viz-step__title">{t}</div>
              <div className="viz-step__desc">{d}</div>
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  )
}

function TokenTypes() {
  const cards = [
    { icon: '🎫', name: 'Access token', life: '15 min – 1 hour', use: 'Call protected APIs' },
    { icon: '🪪', name: 'ID token', life: 'Session', use: 'User info: name, email, roles' },
    { icon: '🔄', name: 'Refresh token', life: 'Long-lived', use: 'Get new access tokens silently' },
  ]
  return (
    <Frame title="Three kinds of token" note="Each JWT is signed by Entra ID; decode any of them at jwt.ms.">
      <div className="viz-cards">
        {cards.map((c) => (
          <div key={c.name} className="viz-card">
            <span className="viz-card__icon">{c.icon}</span>
            <span className="viz-card__name">{c.name}</span>
            <span className="viz-card__tag">{c.life}</span>
            <span className="viz-card__use">{c.use}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function ManagedIdentity() {
  return (
    <Frame title="Managed Identity database auth (no password)" note="Azure issues a short-lived token instead of a stored password — nothing secret in your connection string.">
      <Flow
        items={[
          { icon: '🖥️', label: 'Your app', sub: 'App / Container App' },
          { icon: '🛰️', label: 'IMDS', sub: 'local token endpoint', via: 'ask for token' },
          { icon: '🎫', label: 'Access token', sub: 'short-lived', via: 'returns' },
          { icon: '🗄️', label: 'Database', sub: 'connect with token', via: 'authenticate', tone: 'good' },
        ]}
      />
    </Frame>
  )
}

function PipelineStages() {
  return (
    <Frame title="A full CD pipeline" note="Migrations run before deploy; production waits for a manual approval gate.">
      <Flow
        items={[
          { icon: '🔨', label: 'Build', sub: 'compile + image' },
          { icon: '🧪', label: 'Test', sub: 'unit tests', via: '' },
          { icon: '🗃️', label: 'Migrate', sub: 'DB schema', via: '' },
          { icon: '🚀', label: 'Staging', sub: 'auto deploy', via: '' },
          { icon: '🔒', label: 'Approval', sub: 'manual gate', via: '', tone: 'gate' },
          { icon: '🌍', label: 'Production', sub: 'deploy + smoke test', via: '', tone: 'good' },
        ]}
      />
    </Frame>
  )
}

function StageJobStep() {
  return (
    <Frame title="Stage → Job → Step" note="Stages run in sequence; jobs within a stage can run in parallel on separate agents; steps run in order.">
      <div className="viz-sjs">
        <span className="viz-sjs__cap">Stage: Build</span>
        <div className="viz-sjs__jobs">
          <div className="viz-sjs__job">
            <span className="viz-sjs__jcap">Job: API (agent 1)</span>
            <div className="viz-sjs__steps">
              <span>restore</span>
              <span>build</span>
              <span>test</span>
            </div>
          </div>
          <div className="viz-sjs__job">
            <span className="viz-sjs__jcap">Job: Web (agent 2)</span>
            <div className="viz-sjs__steps">
              <span>npm ci</span>
              <span>lint</span>
              <span>build</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

function BlueGreen() {
  return (
    <Frame title="Blue/Green deployment (slot swap)" note="Deploy the new version to the idle slot, test it, then swap — instant cutover with instant rollback.">
      <div className="viz-slots">
        <Node icon="🟦" label="Production slot" sub="v1 · live traffic" tone="good" />
        <div className="viz-swap" aria-hidden="true">⇄ swap</div>
        <Node icon="🟩" label="Staging slot" sub="v2 · tested, idle" />
      </div>
    </Frame>
  )
}

function Canary() {
  return (
    <Frame title="Canary release (traffic split)" note="Shift a small slice of traffic to the new revision, watch it, then ramp to 100%.">
      <div className="viz-canary">
        <div className="viz-canary__seg viz-canary__seg--v1" style={{ flex: 90 }}>
          90% → v1
        </div>
        <div className="viz-canary__seg viz-canary__seg--v2" style={{ flex: 10 }}>
          10% → v2
        </div>
      </div>
    </Frame>
  )
}

const registry = {
  'container-lifecycle': ContainerLifecycle,
  'layer-cache': LayerCache,
  'compose-stack': ComposeStack,
  multistage: Multistage,
  'azure-hierarchy': AzureHierarchy,
  'appservice-plan': AppServicePlan,
  'keyvault-flow': KeyVaultFlow,
  'email-status': EmailStatus,
  'oauth-flow': OAuthFlow,
  'token-types': TokenTypes,
  'managed-identity': ManagedIdentity,
  'pipeline-stages': PipelineStages,
  'stage-job-step': StageJobStep,
  'blue-green': BlueGreen,
  canary: Canary,
}

export default function Viz({ name }) {
  const Component = registry[name?.trim()]
  if (!Component) return null
  return <Component />
}
