// Mutable store shared by the HTML and the 3D scene (read every frame, so no React state).
export const store = {
  /** Scene position: integer i = scene i's top at the viewport top. */
  s: 0,
  pointer: { x: 0, y: 0 },
  /** Hovered/focused work item, or -1 */
  workHover: -1,
  /** World point the depth of field focuses on (set by the gallery) */
  focus: { x: 0, y: 0, z: -88 },
  /** True while an opaque reading section covers the whole viewport (3D can pause). */
  covered: false,
  /** ?snap: camera follows scroll with no easing (screenshots) */
  snap: false,
  /** Client-side navigation, provided by the page */
  navigate: (to) => (window.location.href = to),
  tops: [],
  maxScroll: 1,
}

export function measure() {
  const y = window.scrollY
  store.tops = Array.from(document.querySelectorAll('[data-scene]'), (el) => el.getBoundingClientRect().top + y)
  store.maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  update(y)
}

export function update(y) {
  const { tops, maxScroll } = store
  const n = tops.length
  if (!n) return
  let s = 0
  for (let i = 0; i < n; i++) {
    const a = tops[i]
    const b = i + 1 < n ? tops[i + 1] : Math.max(maxScroll, a + 1)
    if (y < b || i === n - 1) {
      s = i + Math.min(1, Math.max(0, (y - a) / (b - a)))
      break
    }
  }
  store.s = s
  const vh = window.innerHeight
  store.covered = Array.from(document.querySelectorAll('[data-cover]')).some((el) => {
    const r = el.getBoundingClientRect()
    return r.top <= 0 && r.bottom >= vh
  })
}
