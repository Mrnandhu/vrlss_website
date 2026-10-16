import { brand } from '../brand'

// The "V" icon cut from the wordmark (also used for the favicon and app icons).
const V = 'M22 25H186L265 198L480 25H610L275 290H160L60 65Z'
export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="15" fill="#1B2A4E" />
      <g transform="translate(10 16) scale(0.0748) translate(-22 -25)"><path d={V} fill="#fff" /></g>
      <path d="M13.5 48L15.2 42H50.5L48.8 48Z" fill="#E07A6E" />
    </svg>
  )
}

// The italic VRLS / Solutions wordmark. tone="light" for dark backgrounds, "dark" for light ones.
export default function Logo({ tone = 'light', height = 40 }) {
  return (
    <span className="nx-logo">
      <img
        className="nx-logo-img"
        src={`/brand/logo-${tone}.webp`}
        alt={brand.name}
        width={Math.round((height * 360) / 98)}
        height={height}
        decoding="async"
      />
    </span>
  )
}

export function Wordmark({ tone = 'light', height = 40 }) {
  return <Logo tone={tone} height={height} />
}
