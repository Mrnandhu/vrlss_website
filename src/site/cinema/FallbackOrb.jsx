import { colors } from './palette'

// Shown only when WebGL is unavailable: a layered SVG version of the hero object.
export default function FallbackOrb() {
  return (
    <div className="cm-fallback-orb" aria-hidden="true">
      <div className="cm-fallback-glow" />
      <svg viewBox="0 0 400 400">
        <defs>
          <radialGradient id="cm-fo-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.lightCoral} />
            <stop offset="55%" stopColor={colors.coral} />
            <stop offset="100%" stopColor={colors.coral} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cm-fo-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.slate} />
            <stop offset="100%" stopColor={colors.navy} />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="70" fill="url(#cm-fo-core)" opacity="0.85" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2
          const x = 200 + Math.cos(a) * 110
          const y = 200 + Math.sin(a) * 110
          return (
            <rect
              key={i}
              x={(x - 34).toFixed(2)}
              y={(y - 34).toFixed(2)}
              width="68"
              height="68"
              rx="10"
              fill="url(#cm-fo-panel)"
              stroke={colors.coral}
              strokeOpacity="0.7"
              strokeWidth="1.5"
              transform={`rotate(${((a * 180) / Math.PI + 45).toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)})`}
            />
          )
        })}
        <ellipse cx="200" cy="200" rx="175" ry="52" fill="none" stroke={colors.coral} strokeOpacity="0.6" transform="rotate(-18 200 200)" />
      </svg>
    </div>
  )
}
