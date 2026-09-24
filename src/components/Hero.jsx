import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight, Zap, ShieldCheck, Rocket } from 'lucide-react'
import gsap from 'gsap'

function Hero() {
  const heroRef = useRef(null)
  const visualRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      tl.from('.hero-eyebrow', {
        opacity: 0,
        y: 25,
        duration: 0.7,
      })
        .from(
          '.hero-title-line',
          {
            opacity: 0,
            y: 70,
            duration: 0.9,
            stagger: 0.12,
          },
          '-=0.35'
        )
        .from(
          '.hero-description',
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          '.hero-actions',
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.hero-proof',
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          '-=0.3'
        )

      gsap.to('.hero-glow', {
        opacity: 0.65,
        scale: 1.08,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      const hero = heroRef.current

      const moveVisual = (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2
        const y = (event.clientY / window.innerHeight - 0.5) * 2

        gsap.to(visualRef.current, {
          x: x * 8,
          y: y * 5,
          duration: 1.2,
          ease: 'power3.out',
        })
      }

      hero?.addEventListener('pointermove', moveVisual)

      return () => {
        hero?.removeEventListener('pointermove', moveVisual)
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} id="home" className="hero">

      {/* Hero Background */}
      <div className="hero-background">
        <img src="/assets/hero.png" alt="" />
        <div className="hero-white-fade" />
        <div className="hero-glow" />
      </div>

      {/* Hero Content */}
      <div className="hero-content">

        <div className="hero-eyebrow">
          <span className="eyebrow-line" />
          DIGITAL PRODUCT STUDIO
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line">
            Websites &
          </span>

          <span className="hero-title-line">
            Digital <em>Solutions.</em>
          </span>
        </h1>

        <p className="hero-description">
          Modern websites, web applications and custom business software designed
          around the needs of businesses, startups and growing teams.
        </p>

        <div className="hero-actions">

          <a href="#demos" className="primary-button">
            Explore Demo Solutions
            <ArrowRight size={18} />
          </a>

          <a href="#contact" className="secondary-button">
            Start a Project
            <ArrowUpRight size={17} />
          </a>

        </div>

        {/* Trust / Proof */}
        <div className="hero-proof">

          <div className="proof-item">
            <span className="proof-icon">
              <Zap size={18} />
            </span>

            <div>
              <strong>Modern</strong>
              <small>Latest technology</small>
            </div>
          </div>

          <div className="proof-divider" />

          <div className="proof-item">
            <span className="proof-icon">
              <ShieldCheck size={18} />
            </span>

            <div>
              <strong>Reliable</strong>
              <small>Built for real needs</small>
            </div>
          </div>

          <div className="proof-divider" />

          <div className="proof-item">
            <span className="proof-icon">
              <Rocket size={18} />
            </span>

            <div>
              <strong>Custom</strong>
              <small>Built to your needs</small>
            </div>
          </div>

        </div>

      </div>

      {/* Invisible visual layer for parallax */}
      <div
        ref={visualRef}
        className="hero-visual"
        aria-hidden="true"
      />

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </div>

    </section>
  )
}

export default Hero
