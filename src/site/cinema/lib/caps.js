// Decides how rich the homepage can be. Only ever called in the browser (after hydration).
//   full   desktop WebGL + post-processing · lite  phones: lighter scene
//   static prefers-reduced-motion: one still render · none  no WebGL: CSS fallback
// Override for testing with ?cinema=full|lite|static|none
export function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

export function getCaps() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
  let three = !hasWebGL() ? 'none' : reduced ? 'static' : mobile ? 'lite' : 'full'
  const forced = new URLSearchParams(window.location.search).get('cinema')
  if (['full', 'lite', 'static', 'none'].includes(forced)) three = forced
  return { three, motion: !reduced && forced !== 'static', mobile }
}

export const isCinematic = (three) => three === 'full' || three === 'lite'
