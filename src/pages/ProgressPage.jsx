import { Link } from 'react-router-dom'
import { phases, totalDays } from '../curriculum'
import { useProgress, key } from '../hooks'
import { ProgressRing } from '../components/Graphics.jsx'

export default function ProgressPage() {
  const { done, toggle, reset } = useProgress()
  const completed = Object.keys(done).length
  const pct = Math.round((completed / totalDays) * 100)
  const tracked = phases.filter((p) => p.days.length > 0)

  return (
    <div className="tracker">
      <header className="tracker__header">
        <div className="tracker__header-top">
          <div>
            <h1>Progress Tracker</h1>
            <p className="tracker__lead">
              Check off each session as you complete it. Your progress is saved in this browser.
            </p>
            <div className="tracker__summary">
              <div className="tracker__stat">
                <span className="tracker__stat-num">{completed}</span>
                <span className="tracker__stat-label">completed</span>
              </div>
              <div className="tracker__stat">
                <span className="tracker__stat-num">{totalDays - completed}</span>
                <span className="tracker__stat-label">remaining</span>
              </div>
              <div className="tracker__stat">
                <span className="tracker__stat-num">{totalDays}</span>
                <span className="tracker__stat-label">total sessions</span>
              </div>
            </div>
            {completed > 0 && (
              <button className="btn btn--danger" onClick={reset} type="button">
                Reset all progress
              </button>
            )}
          </div>
          <ProgressRing value={pct} label="complete" />
        </div>
      </header>

      <div className="tracker__phases">
        {tracked.map((p) => {
          const doneCount = p.days.filter((_, i) => done[key(p.slug, i)]).length
          return (
            <section key={p.slug} className="tracker__phase" style={{ '--phase': p.color }}>
              <div className="tracker__phase-head">
                <h2>
                  <span className="tracker__phase-icon">{p.icon}</span>
                  Phase {p.number} · {p.title}
                </h2>
                <span className={`tracker__phase-count ${doneCount === p.days.length ? 'is-done' : ''}`}>
                  {doneCount}/{p.days.length}
                </span>
              </div>
              <ul className="checklist__list">
                {p.days.map((day, i) => {
                  const k = key(p.slug, i)
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
              <Link to={`/phase/${p.slug}`} className="tracker__phase-link">
                Open phase →
              </Link>
            </section>
          )
        })}
      </div>
    </div>
  )
}
