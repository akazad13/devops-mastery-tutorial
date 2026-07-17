import { Link } from 'react-router-dom'
import { phases, totalDays } from '../curriculum'
import { useProgress, key } from '../hooks'
import { HeroArt, ProgressRing } from '../components/Graphics.jsx'

export default function Home() {
  const { done } = useProgress()
  const completed = Object.keys(done).length
  const pct = Math.round((completed / totalDays) * 100)

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__text">
          <div className="hero__badge">9-week roadmap · 2 hours/day · 63 sessions</div>
          <h1 className="hero__title">
            Become a <span className="hero__accent">DevOps</span> Engineer
          </h1>
          <p className="hero__lead">
            A hands-on path from Docker fundamentals to a fully automated, production-grade
            Azure deployment. Build, containerize, secure, and ship real applications with
            CI/CD, monitoring, and cloud-native services.
          </p>
          <div className="hero__actions">
            <Link to="/phase/overview" className="btn btn--primary">
              Start with the plan →
            </Link>
            <Link to="/phase/docker" className="btn btn--ghost">
              Jump into Docker 🐳
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <HeroArt />
        </div>
      </section>

      <section className="stats">
        <div className="stats__ring">
          <ProgressRing value={pct} label="complete" />
        </div>
        <div className="stats__grid">
          <div className="stat-tile">
            <span className="stat-tile__num">{completed}</span>
            <span className="stat-tile__label">sessions done</span>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__num">{totalDays - completed}</span>
            <span className="stat-tile__label">sessions left</span>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__num">{phases.length - 1}</span>
            <span className="stat-tile__label">phases</span>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__num">9</span>
            <span className="stat-tile__label">weeks</span>
          </div>
        </div>
      </section>

      <section className="cards">
        <h2 className="section-title">The curriculum</h2>
        <div className="cards__grid">
          {phases
            .filter((p) => p.slug !== 'overview')
            .map((p) => {
              const total = p.days.length
              const doneCount = p.days.filter((_, i) => done[key(p.slug, i)]).length
              const cardPct = total ? Math.round((doneCount / total) * 100) : 0
              return (
                <Link
                  key={p.slug}
                  to={`/phase/${p.slug}`}
                  className="card"
                  style={{ '--phase': p.color }}
                >
                  <div className="card__top">
                    <span className="card__icon">{p.icon}</span>
                    <span className="card__phase">Phase {p.number}</span>
                  </div>
                  <h3 className="card__title">{p.title}</h3>
                  <p className="card__weeks">{p.weeks}</p>
                  <p className="card__summary">{p.summary}</p>
                  <div className="card__topics">
                    {p.topics.slice(0, 4).map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                    {p.topics.length > 4 && <span className="chip chip--more">+{p.topics.length - 4}</span>}
                  </div>
                  {total > 0 && (
                    <div className="card__foot">
                      <div className="bar bar--sm">
                        <div className="bar__fill" style={{ width: `${cardPct}%` }} />
                      </div>
                      <span className="card__count">
                        {doneCount}/{total}
                      </span>
                    </div>
                  )}
                </Link>
              )
            })}
        </div>
      </section>

      <section className="pillars">
        <h2 className="section-title">What you'll master</h2>
        <div className="pillars__grid">
          <div className="pillar">
            <span className="pillar__icon">🐳</span>
            <h4>Containers</h4>
            <p>Dockerfiles, layer caching, Compose, and lean multi-stage builds.</p>
          </div>
          <div className="pillar">
            <span className="pillar__icon">☁️</span>
            <h4>Azure Cloud</h4>
            <p>App Service, Container Apps, Key Vault, networking, and storage.</p>
          </div>
          <div className="pillar">
            <span className="pillar__icon">🔐</span>
            <h4>Identity & Data</h4>
            <p>Entra ID auth, RBAC, managed identities, and database migrations.</p>
          </div>
          <div className="pillar">
            <span className="pillar__icon">🔁</span>
            <h4>CI/CD</h4>
            <p>Azure Pipelines, quality gates, deployment strategies, and monitoring.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta__inner">
          <h2>Ready to ship?</h2>
          <p>Work through each phase, check off sessions, and bring your notes to your weekly review.</p>
          <Link to="/progress" className="btn btn--primary">
            Open the progress tracker 📊
          </Link>
        </div>
      </section>
    </div>
  )
}
