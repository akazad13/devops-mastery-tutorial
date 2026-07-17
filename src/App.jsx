import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { phases } from './curriculum'
import { useProgress, useTheme, key } from './hooks'
import Home from './pages/Home.jsx'
import PhasePage from './pages/PhasePage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import ResourcesPage from './pages/ResourcesPage.jsx'

function phaseProgress(done, phase) {
  if (phase.days.length === 0) return null
  const completed = phase.days.filter((_, i) => done[key(phase.slug, i)]).length
  return { completed, total: phase.days.length }
}

function Sidebar({ open, onClose }) {
  const { done } = useProgress()
  return (
    <>
      <div className={`scrim ${open ? 'scrim--show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">🚢</span>
          <div>
            <div className="sidebar__title">DevOps Mastery</div>
            <div className="sidebar__sub">9-week hands-on plan</div>
          </div>
        </div>

        <nav className="sidebar__nav" onClick={onClose}>
          <NavLink to="/" end className="nav-item">
            <span className="nav-item__icon">🏠</span>
            <span className="nav-item__label">Home</span>
          </NavLink>

          <div className="sidebar__section">Curriculum</div>

          {phases.map((p) => {
            const prog = phaseProgress(done, p)
            return (
              <NavLink key={p.slug} to={`/phase/${p.slug}`} className="nav-item" style={{ '--phase': p.color }}>
                <span className="nav-item__icon">{p.icon}</span>
                <span className="nav-item__label">
                  {p.number !== '0' && <span className="nav-item__num">{p.number}</span>}
                  {p.short}
                </span>
                {prog && (
                  <span className={`nav-item__badge ${prog.completed === prog.total ? 'nav-item__badge--done' : ''}`}>
                    {prog.completed}/{prog.total}
                  </span>
                )}
              </NavLink>
            )
          })}

          <div className="sidebar__section">Track</div>
          <NavLink to="/progress" className="nav-item">
            <span className="nav-item__icon">📊</span>
            <span className="nav-item__label">Progress Tracker</span>
          </NavLink>
          <NavLink to="/resources" className="nav-item">
            <span className="nav-item__icon">🧰</span>
            <span className="nav-item__label">Resources & Glossary</span>
          </NavLink>
        </nav>

        <div className="sidebar__foot">
          2h/day · ~63 sessions
        </div>
      </aside>
    </>
  )
}

function TopBar({ onMenu }) {
  const { theme, toggle } = useTheme()
  return (
    <header className="topbar">
      <button className="topbar__menu" onClick={onMenu} aria-label="Open menu" type="button">
        ☰
      </button>
      <div className="topbar__spacer" />
      <a
        className="topbar__link"
        href="https://learn.microsoft.com/azure/"
        target="_blank"
        rel="noreferrer"
      >
        Azure Docs ↗
      </a>
      <button className="topbar__theme" onClick={toggle} type="button" aria-label="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  useTheme() // ensure theme attribute is applied on mount

  // Scroll to top on route change and close the mobile menu.
  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }, [pathname])

  return (
    <div className="app">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="app__main">
        <TopBar onMenu={() => setMenuOpen(true)} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phase/:slug" element={<PhasePage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
