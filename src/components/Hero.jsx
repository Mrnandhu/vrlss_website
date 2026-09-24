import { ArrowRight, ArrowUpRight, Zap, ShieldCheck, Rocket } from 'lucide-react'

function Hero() {
  return (
    <section id="home" className="hero">

      <div className="hero-background">
        <picture>
          <source media="(max-width: 760px)" srcSet="/assets/hero-mobile.webp" />
          <img
            src="/assets/hero.webp"
            alt=""
            width="1400"
            height="788"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-white-fade" />
        <div className="hero-glow" />
      </div>

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

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

export default Hero
