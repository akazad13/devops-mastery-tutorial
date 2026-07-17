// Hand-built, self-contained SVG graphics — no external assets.

// Circular progress ring used on the home hero and the tracker.
export function ProgressRing({ value = 0, size = 132, stroke = 11, label }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-elev-2)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="ring__label">
        <span className="ring__pct">{value}%</span>
        {label && <span className="ring__sub">{label}</span>}
      </div>
    </div>
  )
}

// Decorative hero illustration: source → container → registry → cloud → users,
// echoing the DevOps flow the course teaches. Purely presentational.
export function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 420 320" role="img" aria-label="DevOps delivery pipeline illustration">
      <defs>
        <linearGradient id="haBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
        <linearGradient id="haSoft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.04" />
        </linearGradient>
        <filter id="haShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* backdrop panel */}
      <rect x="8" y="10" width="404" height="300" rx="20" fill="url(#haSoft)" stroke="var(--border)" />

      {/* connecting flow line */}
      <path
        d="M70 90 H350 M70 90 V210 H350"
        fill="none"
        stroke="var(--border)"
        strokeWidth="2"
        strokeDasharray="5 6"
      />

      {/* source code node */}
      <g filter="url(#haShadow)">
        <rect x="34" y="60" width="72" height="60" rx="12" fill="var(--bg-elev)" stroke="var(--border)" />
      </g>
      <text x="70" y="86" textAnchor="middle" fontSize="20">💻</text>
      <text x="70" y="108" textAnchor="middle" fontSize="9" fill="var(--text-dim)">Code</text>

      {/* container stack */}
      <g filter="url(#haShadow)">
        <rect x="168" y="52" width="84" height="76" rx="12" fill="var(--bg-elev)" stroke="var(--border)" />
      </g>
      <rect x="180" y="64" width="60" height="12" rx="3" fill="url(#haBlue)" opacity="0.9" />
      <rect x="180" y="80" width="60" height="12" rx="3" fill="url(#haBlue)" opacity="0.6" />
      <rect x="180" y="96" width="60" height="12" rx="3" fill="url(#haBlue)" opacity="0.35" />
      <text x="210" y="122" textAnchor="middle" fontSize="9" fill="var(--text-dim)">Image layers</text>

      {/* registry */}
      <g filter="url(#haShadow)">
        <rect x="314" y="60" width="72" height="60" rx="12" fill="var(--bg-elev)" stroke="var(--border)" />
      </g>
      <text x="350" y="86" textAnchor="middle" fontSize="20">📦</text>
      <text x="350" y="108" textAnchor="middle" fontSize="9" fill="var(--text-dim)">Registry</text>

      {/* cloud */}
      <g filter="url(#haShadow)">
        <path
          d="M150 240 a26 26 0 0 1 4 -51 a34 34 0 0 1 66 -6 a24 24 0 0 1 6 57 z"
          fill="url(#haBlue)"
        />
      </g>
      <text x="188" y="222" textAnchor="middle" fontSize="24">☁️</text>
      <text x="188" y="262" textAnchor="middle" fontSize="9" fill="var(--text-dim)">Azure</text>

      {/* pipeline gear */}
      <g filter="url(#haShadow)">
        <circle cx="70" cy="210" r="26" fill="var(--bg-elev)" stroke="var(--border)" />
      </g>
      <text x="70" y="218" textAnchor="middle" fontSize="20">⚙️</text>

      {/* users */}
      <g filter="url(#haShadow)">
        <rect x="314" y="182" width="72" height="56" rx="12" fill="var(--bg-elev)" stroke="var(--border)" />
      </g>
      <text x="350" y="216" textAnchor="middle" fontSize="20">🌍</text>

      {/* animated pulse dot travelling the pipe */}
      <circle r="5" fill="var(--accent)">
        <animateMotion dur="4s" repeatCount="indefinite" path="M70 90 H350 M70 90 V210 H350" />
      </circle>
    </svg>
  )
}
