import { useState } from 'react'
import { Wrench } from 'lucide-react'

// ---------- Button ----------
// variant: primary | primary-compact | outline | mint | teal | blush
export function Button({ variant = 'primary', arrow = false, className = '', children, ...rest }) {
  const cls = {
    primary: 'btn btn-primary',
    'primary-compact': 'btn btn-primary btn-primary--compact',
    outline: 'btn btn-outline',
    mint: 'btn btn-pastel--mint',
    teal: 'btn btn-pastel--teal',
    blush: 'btn btn-pastel--blush',
  }[variant]
  return (
    <button className={`${cls} ${className}`} {...rest}>
      {arrow && <span aria-hidden="true">→</span>}
      {children}
    </button>
  )
}

// ---------- TaglineBadge ----------
export function TaglineBadge({ icon = <Wrench size={16} />, children }) {
  return (
    <span className="tagline-badge">
      {icon} {children}
    </span>
  )
}

// ---------- ProgressBar ----------
export function ProgressBar({ value }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

// ---------- StarRating (display + interactive) ----------
export function StarRating({ value = 0, onChange, size = 'md' }) {
  const [hover, setHover] = useState(0)
  const active = hover || value
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className={`star-rating star-rating--${size}`} onMouseLeave={() => setHover(0)}>
      {stars.map((n) => {
        const filled = n <= active
        const star = filled ? '★' : '☆'
        if (!onChange) {
          return (
            <span key={n} className={`star ${filled ? 'star--filled' : 'star--empty'}`}>
              {star}
            </span>
          )
        }
        return (
          <button
            type="button"
            key={n}
            className={`star star--btn ${filled ? 'star--filled' : 'star--empty'}`}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
          >
            {star}
          </button>
        )
      })}
      {onChange && <span className="star-rating__hint mono-label">{active}/5</span>}
      {!onChange && value != null && (
        <span className="star-rating__hint mono-label">{Number(value).toFixed(1)}</span>
      )}
    </div>
  )
}

// ---------- Avatar ----------
export function Avatar({ initials, mint = false }) {
  return <div className={`avatar ${mint ? 'avatar--mint' : ''}`}>{initials}</div>
}
