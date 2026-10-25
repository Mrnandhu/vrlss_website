// Downloads the 3D scene's files in the background after the page has loaded, without running them,
// so the 3D can appear almost instantly on the visitor's first touch or mouse move.
// The file list (window.__cm3d) is written into the home page by scripts/prerender.mjs.
// Low priority, after load, and skipped on data-saver or 2G, so it never slows the page itself.
export function prefetch3D(extra = []) {
  const files = [...(Array.isArray(window.__cm3d) ? window.__cm3d : []), ...extra]
  const c = navigator.connection
  if (!files.length || (c && (c.saveData || /2g$/.test(c.effectiveType || '')))) return () => {}

  let timer = 0
  let idle = 0
  const run = () => {
    for (const href of files) {
      if (document.head.querySelector(`link[rel="prefetch"][href="${href}"]`)) continue
      const l = document.createElement('link')
      l.rel = 'prefetch'
      l.href = href
      if (href.endsWith('.js')) l.as = 'script'
      else if (/\.(webp|jpe?g|png|avif)$/.test(href)) l.as = 'image'
      // Same request mode as the later module import / texture load, so the browser reuses this copy.
      l.crossOrigin = 'anonymous'
      document.head.appendChild(l)
    }
  }
  const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))
  const start = () => {
    timer = setTimeout(() => (idle = ric(run, { timeout: 1500 })), 300)
  }
  if (document.readyState === 'complete') start()
  else window.addEventListener('load', start, { once: true })
  return () => {
    clearTimeout(timer)
    if (window.cancelIdleCallback && idle) window.cancelIdleCallback(idle)
    window.removeEventListener('load', start)
  }
}
