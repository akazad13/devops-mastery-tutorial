import { Link, useParams } from 'react-router-dom'
import { getPhase, phases } from '../curriculum'
import { useProgress, key } from '../hooks'
import Markdown from '../components/Markdown.jsx'
import { ProgressRing } from '../components/Graphics.jsx'

export default function PhasePage() {
  const { slug } = useParams()
  const phase = getPhase(slug)
  const { done, toggle } = useProgress()

  if (!phase) {
    return (
      <div className="phase">
        <p>Phase not found.</p>
        <Link to="/">← Back home</Link>
      </div>
    )
  }

  const idx = phases.findIndex((p) => p.slug === slug)
  const prev = idx > 0 ? phases[idx - 1] : null
  const next = idx < phases.length - 1 ? phases[idx + 1] : null

  const total = phase.days.length
  const doneCount = phase.days.filter((_, i) => done[key(phase.slug, i)]).length
  const pct = total ? Math.round((doneCount / total) * 100) : 0

  return (
    <article className="phase" style={{ '--phase': phase.color }}>
      <header className="phase__header phase__header--hero">
        <div className="phase__hero-text">
          <div className="phase__eyebrow">
            <span className="phase__icon">{phase.icon}</span>
            {phase.number !== '0' ? `Phase ${phase.number}` : 'Getting started'}
            <span className="phase__weeks">· {phase.weeks}</span>
          </div>
          <h1 className="phase__title">{phase.title}</h1>
          <p className="phase__summary">{phase.summary}</p>
          {phase.topics?.length > 0 && (
            <div className="phase__topics">
              {phase.topics.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        {total > 0 && (
          <div className="phase__hero-ring">
            <ProgressRing value={pct} size={104} stroke={9} label={`${doneCount}/${total}`} />
          </div>
        )}
      </header>

      {phase.days.length > 0 && (
        <section className="checklist">
          <h3 className="checklist__title">Session checklist</h3>
          <ul className="checklist__list">
            {phase.days.map((day, i) => {
              const k = key(phase.slug, i)
              const checked = !!done[k]
              return (
                <li key={k}>
                  <label className={`check ${checked ? 'check--done' : ''}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggle(k)} />
                    <span className="check__box" aria-hidden="true">
                      {checked ? '✓' : ''}
                    </span>
                    <span className="check__label">{day}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <Markdown text={phase.markdown} />

      <nav className="phase__nav">
        {prev ? (
          <Link to={`/phase/${prev.slug}`} className="phase__nav-link">
            <span className="phase__nav-dir">← Previous</span>
            <span className="phase__nav-name">
              {prev.icon} {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/phase/${next.slug}`} className="phase__nav-link phase__nav-link--next">
            <span className="phase__nav-dir">Next →</span>
            <span className="phase__nav-name">
              {next.icon} {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
