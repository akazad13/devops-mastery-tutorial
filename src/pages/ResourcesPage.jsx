const tools = [
  { name: 'Docker Desktop', cmd: 'Download from docker.com', href: 'https://www.docker.com/products/docker-desktop/' },
  { name: 'Azure CLI', cmd: 'winget install Microsoft.AzureCLI', href: 'https://learn.microsoft.com/cli/azure/' },
  { name: 'Azure DevOps CLI', cmd: 'az extension add --name azure-devops', href: 'https://learn.microsoft.com/azure/devops/cli/' },
  { name: 'Git', cmd: 'winget install Git.Git', href: 'https://git-scm.com/' },
  { name: 'VS Code + Azure Tools', cmd: 'Install Docker, Azure Tools, Azure Pipelines extensions', href: 'https://code.visualstudio.com/' },
]

const accounts = [
  { name: 'Azure Free Account', note: '$200 credit for 30 days', href: 'https://azure.microsoft.com/free/' },
  { name: 'Azure DevOps', note: 'Free for up to 5 users', href: 'https://dev.azure.com/' },
  { name: 'Docker Hub', note: 'Free tier', href: 'https://hub.docker.com/' },
]

const links = [
  { name: 'Azure Documentation', href: 'https://learn.microsoft.com/azure/' },
  { name: 'Decode JWT tokens (jwt.ms)', href: 'https://jwt.ms' },
  { name: 'Microsoft Graph Explorer', href: 'https://developer.microsoft.com/graph/graph-explorer' },
  { name: 'MSAL / Identity docs', href: 'https://learn.microsoft.com/entra/identity-platform/' },
  { name: 'Microsoft-hosted agent software', href: 'https://learn.microsoft.com/azure/devops/pipelines/agents/hosted' },
  { name: 'Docker docs', href: 'https://docs.docker.com/' },
]

const glossary = [
  ['Image', 'A layered, read-only template that packages an app and its dependencies. Like a class in OOP.'],
  ['Container', 'A running instance of an image. Like an object created from a class.'],
  ['Layer', 'A cached filesystem change created by each Dockerfile instruction. Put frequently-changing steps last.'],
  ['Volume', 'Persistent storage that lives outside a container so data survives container removal.'],
  ['Multi-stage build', 'Using one build stage and a lean runtime stage to keep the final image small.'],
  ['Resource Group', 'A logical container for related Azure resources — like a project folder.'],
  ['App Service Plan', 'The VM you pay for; App Services (apps) run on top of it.'],
  ['Container Apps', 'Serverless container hosting that scales to zero and handles HTTPS/ingress.'],
  ['Key Vault', 'A secure store for secrets, keys, and certificates — referenced by apps, never hardcoded.'],
  ['Managed Identity', 'An Azure-managed identity that lets an app authenticate without storing passwords.'],
  ['VNet / NSG', 'A private Azure network and its firewall rules for controlling traffic.'],
  ['Entra ID', 'Microsoft’s cloud identity platform (formerly Azure AD) that issues tokens.'],
  ['App Registration', 'The definition of your app’s identity in Entra ID; a Service Principal is its instance.'],
  ['Access / ID / Refresh token', 'Short-lived API token, user-info token, and long-lived token to renew access.'],
  ['RBAC / App Role', 'Role-based access control; app roles appear as claims in the token and gate endpoints.'],
  ['Migration', 'A version-controlled, repeatable schema change (EF Core or Flyway). Run before deploying code.'],
  ['Pipeline', 'Automated stages (build → test → migrate → deploy) defined in azure-pipelines.yml.'],
  ['Artifact', 'A build output passed between pipeline stages or stored for deployment.'],
  ['Blue/Green & Canary', 'Deployment strategies: swap two slots, or shift a small % of traffic to a new version.'],
  ['Application Insights', 'Azure’s app telemetry — requests, exceptions, and traces, queried with KQL.'],
]

export default function ResourcesPage() {
  return (
    <div className="resources">
      <header className="phase__header">
        <div className="phase__eyebrow">
          <span className="phase__icon">🧰</span> Quick reference
        </div>
        <h1 className="phase__title">Resources & Glossary</h1>
        <p className="phase__summary">
          Everything you need to set up your environment, plus a glossary of the key terms used
          across the curriculum.
        </p>
      </header>

      <h2 className="section-title">Tools to install</h2>
      <div className="res-grid">
        {tools.map((t) => (
          <a key={t.name} href={t.href} target="_blank" rel="noreferrer" className="res-card">
            <div className="res-card__name">{t.name}</div>
            <code className="res-card__cmd">{t.cmd}</code>
          </a>
        ))}
      </div>

      <h2 className="section-title">Accounts to create</h2>
      <div className="res-grid">
        {accounts.map((a) => (
          <a key={a.name} href={a.href} target="_blank" rel="noreferrer" className="res-card">
            <div className="res-card__name">{a.name}</div>
            <span className="res-card__note">{a.note}</span>
          </a>
        ))}
      </div>

      <h2 className="section-title">Handy links</h2>
      <div className="res-links">
        {links.map((l) => (
          <a key={l.name} href={l.href} target="_blank" rel="noreferrer" className="res-link">
            {l.name} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <h2 className="section-title">Glossary</h2>
      <dl className="glossary">
        {glossary.map(([term, def]) => (
          <div key={term} className="glossary__item">
            <dt>{term}</dt>
            <dd>{def}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
