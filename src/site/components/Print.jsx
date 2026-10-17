import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Renders its children straight under <body> so that printing ("Save as PDF") shows only this document.
// Screen: hidden. Print: everything else is hidden (see .print-root rules in tools.css).
export default function PrintRoot({ children }) {
  const [el, setEl] = useState(null)
  useEffect(() => {
    const d = document.createElement('div')
    d.className = 'print-root'
    document.body.appendChild(d)
    document.documentElement.classList.add('has-print-root')
    setEl(d)
    return () => {
      d.remove()
      document.documentElement.classList.remove('has-print-root')
    }
  }, [])
  return el ? createPortal(children, el) : null
}

// Base64url helpers that work with any language (Telugu, Arabic...), for share links.
export const pack = (obj) => {
  const bytes = new TextEncoder().encode(JSON.stringify(obj))
  let bin = ''
  bytes.forEach((b) => { bin += String.fromCharCode(b) })
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
export const unpack = (str) => {
  try {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const bin = atob(b64 + '==='.slice((b64.length + 3) % 4))
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))))
  } catch {
    return null
  }
}

export const store = {
  get(k, fallback) {
    try {
      const v = window.localStorage.getItem(k)
      return v ? JSON.parse(v) : fallback
    } catch {
      return fallback
    }
  },
  set(k, v) {
    try {
      window.localStorage.setItem(k, JSON.stringify(v))
    } catch {
      /* storage unavailable */
    }
  },
}
