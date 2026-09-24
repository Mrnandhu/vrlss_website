import { useEffect, useRef, useState } from 'react'

function LazySection({ children, fallback = null, rootMargin = '900px', anchorId }) {
  const hostRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const activate = () => setReady(true)

    if (anchorId) {
      host.id = anchorId
      if (window.location.hash === `#${anchorId}`) activate()
      window.addEventListener('hashchange', activate)
    }

    if (!('IntersectionObserver' in window)) {
      activate()
      return () => {
        if (anchorId) window.removeEventListener('hashchange', activate)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        activate()
        observer.disconnect()
      },
      { rootMargin, threshold: 0.01 }
    )

    observer.observe(host)

    return () => {
      observer.disconnect()
      if (anchorId) window.removeEventListener('hashchange', activate)
    }
  }, [rootMargin, anchorId])

  return (
    <div ref={hostRef} className="lazy-section-host">
      {ready ? children : fallback}
    </div>
  )
}

export default LazySection
