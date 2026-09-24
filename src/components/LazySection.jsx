import { useEffect, useRef, useState } from 'react'

function LazySection({ children, fallback = null, rootMargin = '900px' }) {
  const hostRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    if (!('IntersectionObserver' in window)) {
      setReady(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setReady(true)
        observer.disconnect()
      },
      { rootMargin, threshold: 0.01 }
    )

    observer.observe(host)

    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={hostRef} className="lazy-section-host">
      {ready ? children : fallback}
    </div>
  )
}

export default LazySection
