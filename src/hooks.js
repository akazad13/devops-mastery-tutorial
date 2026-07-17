import { useCallback, useEffect, useState } from 'react'

// Persisted theme ('dark' | 'light'), applied to <html data-theme>.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}

const PROGRESS_KEY = 'devops-progress'

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}
  } catch {
    return {}
  }
}

// Progress is a map of `${phaseSlug}:${dayIndex}` -> true. Shared across the app
// via a simple storage-event subscription so the sidebar and tracker stay in sync.
export function useProgress() {
  const [done, setDone] = useState(readProgress)

  useEffect(() => {
    const sync = () => setDone(readProgress())
    window.addEventListener('progress-changed', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('progress-changed', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const toggle = useCallback((key) => {
    const next = { ...readProgress() }
    if (next[key]) delete next[key]
    else next[key] = true
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event('progress-changed'))
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(PROGRESS_KEY)
    window.dispatchEvent(new Event('progress-changed'))
  }, [])

  return { done, toggle, reset }
}

export function key(slug, i) {
  return `${slug}:${i}`
}
