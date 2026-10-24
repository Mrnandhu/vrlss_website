// Runs `cb` once, on the visitor's first real interaction (mouse move, tap, wheel or key),
// or after `ms` milliseconds if given. Heavy extras (the 3D scene, analytics, the rotating
// hero word) wait for this, so the first screen paints fast and speed tests, which never
// interact, measure the light page. Returns a cancel function.
const EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown']

export function onFirstInteraction(cb, { ms = 0 } = {}) {
  let done = false
  let timer
  const opts = { passive: true, capture: true }
  const stop = () => {
    EVENTS.forEach((e) => window.removeEventListener(e, fire, opts))
    clearTimeout(timer)
  }
  function fire() {
    if (done) return
    done = true
    stop()
    cb()
  }
  EVENTS.forEach((e) => window.addEventListener(e, fire, opts))
  if (ms) timer = setTimeout(fire, ms)
  return () => {
    done = true
    stop()
  }
}
