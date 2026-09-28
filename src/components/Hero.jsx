import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'

function Hero() {
  const heroRef = useRef(null)
  const visualRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
      intro
        .from('.hero-eyebrow', { y: 22, opacity: 0, duration: 0.7 })
        .from('.hero-title-line', { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.08 }, '-=0.35')
        .from('.hero-description', { y: 20, opacity: 0, duration: 0.65 }, '-=0.45')
        .from('.hero-actions', { y: 18, opacity: 0, duration: 0.55 }, '-=0.35')
        .from('.hero-meta', { y: 14, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-scroll', { opacity: 0, duration: 0.45 }, '-=0.2')

      gsap.to('.hero-orbit', {
        y: -18, x: 10, rotation: 8, duration: 5,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
      })

      const onMove = (event) => {
        if (!visualRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const rect = hero.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        gsap.to(visualRef.current, { x: x * 18, y: y * 12, duration: 0.8, ease: 'power3.out', overwrite: true })
      }

      hero.addEventListener('pointermove', onMove)
      return () => hero.removeEventListener('pointermove', onMove)
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="hero hero-modern" ref={heroRef}>
      <div className="hero-background" ref={visualRef}>
        <picture>
          <source type="image/webp" media="(max-width: 760px)" srcSet="/assets/hero-mobile.webp" />
          <source type="image/webp" srcSet="/assets/hero.webp" />
          <img src="/assets/hero.webp" alt="" width="1400" height="788" fetchPriority="high" decoding="async" />
        </picture>
        <div className="hero-image-wash" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content hero-modern-content">
        <div className="hero-eyebrow"><span className="eyebrow-line" /> DIGITAL PRODUCT STUDIO</div>

        <h1 className="hero-title hero-modern-title">
          <span className="hero-title-mask"><span className="hero-title-line">We build</span></span>
          <span className="hero-title-mask"><span className="hero-title-line">digital <em>experiences.</em></span></span>
        </h1>

        <p className="hero-description">
          Websites, applications and digital systems designed to make ambitious ideas useful, clear and real.
        </p>

        <div className="hero-actions">
          <a href="#demos" className="primary-button">Explore our work <ArrowDownRight size={17} /></a>
          <a href="#contact" className="secondary-button">Start a project <ArrowUpRight size={16} /></a>
        </div>

        <div className="hero-meta">
          <span>WEB</span><i /> <span>PRODUCT</span><i /> <span>SOFTWARE</span><i /> <span>AI</span>
        </div>
      </div>

      <div className="hero-orbit" aria-hidden="true">
        <div className="hero-orbit-ring" />
        <div className="hero-orbit-core">VRLSS<span>01</span></div>
      </div>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span><div className="scroll-line" />
      </div>
    </section>
  )
}

export default Hero
