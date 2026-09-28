import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'

function Hero() {
  const heroRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const intro = gsap.timeline({
        defaults: { ease: 'power4.out' },
      })

      intro
        .from('.hero-clouds', { opacity: 0, scale: 1.08, duration: 1.4, y: 18 }, 0)
        .from('.hero-character', { opacity: 0, y: 90, scale: .94, duration: 1.25 }, .18)
        .from('.hero-robot', { opacity: 0, x: 90, y: 55, scale: .72, rotation: 8, duration: 1.05 }, .52)
        .from('.hero-eyebrow', { y: 22, opacity: 0, duration: .65 }, .35)
        .from('.hero-title-line', { yPercent: 115, opacity: 0, duration: .9, stagger: .08 }, .48)
        .from('.hero-description', { y: 20, opacity: 0, duration: .65 }, .95)
        .from('.hero-actions', { y: 18, opacity: 0, duration: .55 }, 1.08)
        .from('.hero-meta', { y: 14, opacity: 0, duration: .5 }, 1.2)
        .from('.hero-scroll', { opacity: 0, duration: .45 }, 1.35)

      if (!reduceMotion) {
        gsap.to('.hero-character', {
          y: -10,
          rotation: -1.2,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.to('.hero-robot', {
          y: -15,
          rotation: -3,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.to('.hero-clouds', {
          x: 22,
          y: -7,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.to('.hero-ambient-glow', {
          scale: 1.12,
          opacity: .72,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        const onMove = (event) => {
          const rect = hero.getBoundingClientRect()
          const x = (event.clientX - rect.left) / rect.width - .5
          const y = (event.clientY - rect.top) / rect.height - .5

          gsap.to('.hero-clouds', { x: x * 24, y: y * 14, duration: 1.1, ease: 'power3.out', overwrite: false })
          gsap.to('.hero-character', { x: x * 28, y: y * 18, rotationY: x * 2, duration: 1.15, ease: 'power3.out', overwrite: false })
          gsap.to('.hero-robot', { x: x * 55, y: y * 32, rotation: x * 7, duration: .8, ease: 'power3.out', overwrite: false })
          gsap.to('.hero-particle', { x: x * 70, y: y * 45, duration: 1.4, ease: 'power2.out', overwrite: false })
        }

        hero.addEventListener('pointermove', onMove)

        return () => hero.removeEventListener('pointermove', onMove)
      }
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="hero hero-layered" ref={heroRef}>
      <div className="hero-layered-scene" ref={sceneRef} aria-hidden="true">
        <div className="hero-ambient-glow" />
        <div className="hero-grid" />

        <img className="hero-clouds hero-layer" src="/assets/clouds.png" alt="" width="2048" height="1024" />
        <img className="hero-character hero-layer" src="/assets/hero-character.png" alt="" width="1536" height="1536" fetchPriority="high" decoding="async" />
        <img className="hero-robot hero-layer" src="/assets/robo.png" alt="" width="1536" height="1536" />

        <span className="hero-particle particle-one" />
        <span className="hero-particle particle-two" />
        <span className="hero-particle particle-three" />
      </div>

      <div className="hero-content hero-layered-content">
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

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span><div className="scroll-line" />
      </div>
    </section>
  )
}

export default Hero
