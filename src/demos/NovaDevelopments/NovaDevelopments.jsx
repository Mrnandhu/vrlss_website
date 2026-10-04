import { useEffect } from 'react'
import './NovaDevelopments.css'

const images = {
  hero:
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90',
  exterior:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90',
  interior:
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90',
  living:
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90',
  architecture:
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=90',
  detail:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90',
  landscape:
    'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=90',
}

const residences = [
  {
    number: '01',
    type: 'ONE BEDROOM',
    title: 'A considered beginning.',
    text: 'An efficient living environment shaped around natural light, quiet proportions and everyday comfort.',
    image: images.living,
  },
  {
    number: '02',
    type: 'TWO BEDROOM',
    title: 'Space to live differently.',
    text: 'Balanced interiors with generous living areas and a stronger connection between private and shared spaces.',
    image: images.interior,
  },
  {
    number: '03',
    type: 'THREE BEDROOM',
    title: 'Room for what matters.',
    text: 'A larger residential composition designed for flexible living, entertaining and long-term comfort.',
    image: images.exterior,
  },
]

const features = [
  ['01', 'Arrival court', 'A composed arrival sequence that establishes the character of the residence from the first step.'],
  ['02', 'Resident lounge', 'A calm shared environment designed for conversation, work and moments between destinations.'],
  ['03', 'Landscape gardens', 'Green spaces introduce softness, shade and a slower rhythm throughout the development.'],
  ['04', 'Private wellness', 'Spaces dedicated to movement, restoration and everyday wellbeing.'],
]

export default function NovaDevelopments() {
  useEffect(() => {
    document.title = 'NOVA Developments | A New Address for Modern Living'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="nova-page">
      <header className="nova-nav">
        <a className="nova-brand" href="/demos/nova-developments" aria-label="Nova Developments">
          <span className="nova-brand-mark">N</span>
          <span>
            <strong>NOVA</strong>
            <small>DEVELOPMENTS</small>
          </span>
        </a>

        <nav className="nova-nav-links">
          <a href="#overview">Overview</a>
          <a href="#residences">Residences</a>
          <a href="#amenities">Amenities</a>
          <a href="#architecture">Architecture</a>
          <a href="#location">Location</a>
        </nav>

        <a className="nova-nav-cta" href="#enquire">
          Enquire <span>↗</span>
        </a>

        <button className="nova-menu" type="button" aria-label="Open menu">
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="nova-hero">
          <img src={images.hero} alt="Contemporary architectural residence" />
          <div className="nova-hero-overlay" />

          <div className="nova-hero-content">
            <span className="nova-kicker">NOVA RESIDENCES</span>

            <h1>
              A new address
              <em> for modern living.</em>
            </h1>

            <p>
              A residential concept shaped around architecture, natural light,
              thoughtful interiors and the rhythm of contemporary life.
            </p>

            <div className="nova-hero-actions">
              <a
              href="#enquire"
              className="nova-button nova-button-light nova-hero-register"
            >
              <span className="nova-hero-register-text">Register Interest</span>
              <span className="nova-hero-register-arrow">↗</span>
            </a>
              <a href="#residences" className="nova-text-link nova-light-link">
                Explore residences <span>↓</span>
              </a>
            </div>
          </div>

          <div className="nova-hero-meta">
            <span>01 — 06</span>
            <span>RESIDENTIAL CONCEPT</span>
          </div>

          <a href="#overview" className="nova-scroll">
            <span>Scroll to explore</span>
            <b>↓</b>
          </a>
        </section>

        <section className="nova-intro nova-section" id="overview">
          <div className="nova-intro-label">
            <span>01</span>
            <p>THE PROJECT</p>
          </div>

          <div className="nova-intro-copy">
            <span className="nova-kicker nova-dark-kicker">
              DESIGNED FOR EVERYDAY LIFE
            </span>

            <h2>
              Architecture with
              <em> a sense of place.</em>
            </h2>

            <p className="nova-lead">
              NOVA is a conceptual residential development where architecture
              and lifestyle are considered as one experience. Every element is
              designed to feel purposeful — from the arrival sequence to the
              proportions of each interior.
            </p>

            <div className="nova-intro-bottom">
              <p>
                Natural materials, warm surfaces and carefully framed views
                create a residential environment that feels contemporary
                without becoming distant.
              </p>

              <span className="nova-line-number">N / 01</span>
            </div>
          </div>
        </section>

        <section className="nova-image-feature">
          <div className="nova-feature-image">
            <img src={images.exterior} alt="Modern residential architecture" />
          </div>

          <div className="nova-feature-panel">
            <span className="nova-kicker nova-dark-kicker">THE ADDRESS</span>
            <h2>Quietly distinctive.</h2>
            <p>
              A strong architectural identity meets a softer landscape
              experience. The result is a place designed to feel considered
              from the street to the front door.
            </p>

            <div className="nova-feature-stat">
              <span>01</span>
              <p>Architecture<br />Landscape<br />Lifestyle</p>
            </div>
          </div>
        </section>

        <section className="nova-residences nova-section" id="residences">
          <div className="nova-section-heading">
            <div>
              <span className="nova-kicker nova-dark-kicker">02 / RESIDENCES</span>
              <h2>Spaces that adapt<br /><em>to the way you live.</em></h2>
            </div>

            <p>
              Three residential concepts, each shaped around generous
              proportions, natural light and flexible everyday living.
            </p>
          </div>

          <div className="nova-residence-grid">
            {residences.map((residence) => (
              <article className="nova-residence-card" key={residence.number}>
                <div className="nova-residence-image">
                  <img src={residence.image} alt={residence.type} />
                  <span>{residence.number}</span>
                </div>

                <div className="nova-residence-info">
                  <span>{residence.type}</span>
                  <h3>{residence.title}</h3>
                  <p>{residence.text}</p>
                  <a href="#enquire">
                    Discover <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="nova-amenities" id="amenities">
          <div className="nova-amenities-image">
            <img src={images.landscape} alt="Landscape and architectural setting" />
          </div>

          <div className="nova-amenities-content">
            <span className="nova-kicker nova-dark-kicker">03 / AMENITIES</span>

            <h2>
              Designed around
              <em> better days.</em>
            </h2>

            <p className="nova-amenities-intro">
              The spaces beyond the residence matter too. NOVA brings together
              places for arrival, connection, movement and retreat.
            </p>

            <div className="nova-feature-list">
              {features.map(([number, title, text]) => (
                <div className="nova-feature-row" key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <b>↗</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="nova-architecture nova-section" id="architecture">
          <div className="nova-architecture-heading">
            <span className="nova-kicker nova-dark-kicker">04 / ARCHITECTURE</span>
            <h2>
              Form follows
              <em> experience.</em>
            </h2>
          </div>

          <div className="nova-architecture-grid">
            <div className="nova-architecture-copy">
              <p className="nova-lead">
                The architecture is intentionally restrained. Strong geometry,
                deep openings and warm materiality create a visual language
                that remains distinctive while allowing the landscape and
                light to become part of the experience.
              </p>

              <div className="nova-architecture-number">04</div>
            </div>

            <div className="nova-architecture-image">
              <img src={images.architecture} alt="Contemporary architectural facade" />
            </div>
          </div>
        </section>

        <section className="nova-material">
          <div className="nova-material-image">
            <img src={images.detail} alt="Warm contemporary interior detail" />
          </div>

          <div className="nova-material-copy">
            <span className="nova-kicker">MATERIAL / LIGHT / SPACE</span>
            <h2>Warmth in every detail.</h2>
            <p>
              A restrained material palette creates continuity between
              architecture and interiors — allowing texture, daylight and
              proportion to define the character of each space.
            </p>
          </div>
        </section>

        <section className="nova-location nova-section" id="location">
          <div className="nova-location-heading">
            <span className="nova-kicker nova-dark-kicker">05 / LOCATION</span>
            <h2>
              Connected to
              <em> what matters.</em>
            </h2>
            <p>
              A conceptual location section designed to communicate
              accessibility, neighbourhood character and the relationship
              between home and city.
            </p>
          </div>

          <div className="nova-map">
            <div className="nova-map-grid" />
            <div className="nova-map-road road-one" />
            <div className="nova-map-road road-two" />
            <div className="nova-map-road road-three" />

            <div className="nova-map-pin">
              <span>N</span>
              <small>NOVA</small>
            </div>

            <div className="nova-map-label label-one">CITY CENTRE</div>
            <div className="nova-map-label label-two">BUSINESS DISTRICT</div>
            <div className="nova-map-label label-three">WATERFRONT</div>
          </div>
        </section>

        <section className="nova-gallery nova-section">
          <div className="nova-gallery-top">
            <div>
              <span className="nova-kicker nova-dark-kicker">06 / GALLERY</span>
              <h2>A visual language<br /><em>of modern living.</em></h2>
            </div>
            <span className="nova-gallery-count">06 — 12</span>
          </div>

          <div className="nova-gallery-grid">
            <div className="gallery-large">
              <img src={images.interior} alt="Contemporary living interior" />
            </div>

            <div className="gallery-small">
              <img src={images.living} alt="Residential living space" />
            </div>

            <div className="gallery-small gallery-offset">
              <img src={images.detail} alt="Interior material detail" />
            </div>
          </div>
        </section>

        <section className="nova-enquire" id="enquire">
          <div className="nova-enquire-background">
            <img src={images.hero} alt="" />
          </div>
          <div className="nova-enquire-overlay" />

          <div className="nova-enquire-content">
            <span className="nova-kicker">NOVA DEVELOPMENTS</span>

            <h2>
              Begin your
              <em> next chapter.</em>
            </h2>

            <p>
              Register your interest to receive more information about the
              NOVA residential concept.
            </p>

            <a href="mailto:hello@vrlss.in" className="nova-button nova-button-light nova-enquire-register">
              Register Interest <span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="nova-footer">
        <div className="nova-footer-top">
          <a className="nova-brand nova-footer-brand" href="/demos/nova-developments">
            <span className="nova-brand-mark">N</span>
            <span>
              <strong>NOVA</strong>
              <small>DEVELOPMENTS</small>
            </span>
          </a>

          <div className="nova-footer-links">
            <a href="#overview">Overview</a>
            <a href="#residences">Residences</a>
            <a href="#amenities">Amenities</a>
            <a href="#architecture">Architecture</a>
            <a href="#location">Location</a>
          </div>

          <a className="nova-footer-enquire" href="#enquire">
            Enquire <span>↗</span>
          </a>
        </div>

        <div className="nova-footer-bottom">
          <span>CONCEPT WEBSITE</span>
          <span>Designed & developed by VRLS Solutions</span>
          <a href="/#showcase">Back to VRLS Showcase ↗</a>
        </div>
      </footer>
    </div>
  )
}
