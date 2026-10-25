// Measures where the 3D objects may appear without covering any text, for the current screen.
// Each "frame" is the free rectangle (as fractions of the viewport: x0, x1, y0, y1) next to or
// above the words of a scene. The camera (three/CameraRig.jsx) then places and sizes the 3D
// object to fit inside that rectangle, so it can never sit on top of the text on any device.
// Width:height of each 3D object on screen. Plain numbers so this file never pulls the 3D library into
// the first download. If you move the devices in three/layouts.js, update these (subjects.js has the maths).
const ASPECT = { hero: [1, 1], glance: [2.14, 0.89] } // [wide screens, narrow screens]
const subjectAspect = (name, narrow) => ASPECT[name][narrow ? 1 : 0]

const PAD = 16 // px of breathing space around the text and screen edges

function union(els) {
  let r = null
  for (const e of els) {
    const b = e.getBoundingClientRect()
    if (!b.width || !b.height) continue
    r = r
      ? { l: Math.min(r.l, b.left), t: Math.min(r.t, b.top), r: Math.max(r.r, b.right), b: Math.max(r.b, b.bottom) }
      : { l: b.left, t: b.top, r: b.right, b: b.bottom }
  }
  return r
}

// Picks the better of "beside the text" and "above the text" for an object of the given width:height.
function freeRect(text, vw, vh, top, bottom, aspect) {
  const gap = Math.max(PAD, vw * 0.02)
  const cands = [
    { x0: text.r + gap, x1: vw - PAD, y0: top + PAD, y1: bottom - PAD }, // beside (to the right)
    { x0: PAD, x1: vw - PAD, y0: top + PAD, y1: text.t - gap }, // above
  ]
  let best = null
  let bestScore = -1
  for (const c of cands) {
    const w = c.x1 - c.x0
    const h = c.y1 - c.y0
    if (w < 60 || h < 60) continue
    const score = Math.min(w / aspect, h) // how big the object can be drawn
    if (score > bestScore) {
      bestScore = score
      best = c
    }
  }
  if (!best) return null
  return { x0: best.x0 / vw, x1: best.x1 / vw, y0: best.y0 / vh, y1: best.y1 / vh }
}

let version = 0

/** Returns { v, hero, glance } or null when the page isn't on screen yet. */
export function computeSafe() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (!vw || !vh) return null
  const narrow = vw / vh < 0.85
  const header = document.querySelector('.nx-header')
  const top = header ? header.getBoundingClientRect().height : 0
  const bar = document.querySelector('.nx-mbar')
  const barH = bar && getComputedStyle(bar).display !== 'none' ? bar.getBoundingClientRect().height + 12 : 0
  const bottom = vh - barH

  // Hero words, in their position when the page is scrolled to the top.
  const sy = window.scrollY
  const heroText = union(document.querySelectorAll('.cm-hero-inner > *'))
  const hero = heroText
    ? freeRect({ l: heroText.l, t: heroText.t + sy, r: heroText.r, b: heroText.b + sy }, vw, vh, top, bottom, subjectAspect('hero', narrow))
    : null

  // "From idea to launch" card, in its position while that section is pinned to the screen.
  const card = document.querySelector('.cm-glance-copy')
  const pin = card && card.closest('.cm-sticky')
  let glance = null
  if (card && pin) {
    const c = card.getBoundingClientRect()
    const p = pin.getBoundingClientRect()
    const text = { l: c.left, t: c.top - p.top, r: c.right, b: c.bottom - p.top }
    glance = freeRect(text, vw, vh, top, bottom, subjectAspect('glance', narrow))
  }
  placeFallbackOrb(hero, vw, vh)
  version += 1
  return { v: version, hero, glance }
}

// The flat SVG orb (shown before the 3D loads, or without WebGL) goes in the same free space.
function placeFallbackOrb(r, vw, vh) {
  const root = document.documentElement.style
  const sec = document.querySelector('.cm-hero')
  if (!r || !sec) {
    root.removeProperty('--cm-orb-x')
    return
  }
  const secTop = sec.getBoundingClientRect().top + window.scrollY // where the hero starts when scrolled to the top
  const w = (r.x1 - r.x0) * vw
  const h = (r.y1 - r.y0) * vh
  root.setProperty('--cm-orb-x', `${((r.x0 + r.x1) / 2) * vw}px`)
  root.setProperty('--cm-orb-y', `${((r.y0 + r.y1) / 2) * vh - secTop}px`)
  root.setProperty('--cm-orb-s', `${Math.min(w, h) * 0.95}px`)
}
