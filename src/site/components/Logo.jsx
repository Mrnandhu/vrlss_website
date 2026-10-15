import { brand } from '../brand'

export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="16" fill="#0D5C52" />
      <path d="M15 17h8.6L32 38.4 40.4 17H49L36.6 48H27.4z" fill="#fff" />
      <circle cx="49" cy="15" r="5" fill="#9FD3BE" />
    </svg>
  )
}

export default function Logo() {
  return (
    <span className="nx-logo">
      <LogoMark />
      <span className="nx-logo-text">{brand.name}</span>
    </span>
  )
}
