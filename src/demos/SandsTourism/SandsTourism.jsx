import './SandsTourism.css'

const experiences = [
  {
    number: '01',
    title: 'Desert Escapes',
    text: 'Quiet landscapes, open horizons and experiences shaped by the desert.',
  },
  {
    number: '02',
    title: 'Coastal Journeys',
    text: 'Slow days by the water, hidden shores and unforgettable views.',
  },
  {
    number: '03',
    title: 'Cultural Discoveries',
    text: 'Places, traditions and stories that give every journey a deeper sense of place.',
  },
  {
    number: '04',
    title: 'City Experiences',
    text: 'Discover architecture, food, design and energy in remarkable destinations.',
  },
]

const planning = [
  ['01', 'Choose a destination'],
  ['02', 'Shape your experience'],
  ['03', 'Plan your journey'],
  ['04', 'Make the memories'],
]

export default function SandsTourism() {
  return (
    <main className="sands-demo">

      {/* NAVIGATION */}
      <header className="sands-nav">
        <a href="/" className="sands-logo">
          SANDS<span>.</span>
        </a>

        <nav>
          <a href="#discover">Discover</a>
          <a href="#experiences">Experiences</a>
          <a href="#journey">Journey</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="sands-nav-cta">
          Plan Your Journey <span>↗</span>
        </a>
      </header>

      {/* HERO */}
      <section className="sands-hero">
        <div className="sands-hero-image" />
        <div className="sands-hero-overlay" />

        <div className="sands-hero-content">
          <p className="sands-eyebrow">
            TRAVEL / EXPERIENCE / DISCOVER
          </p>

          <h1>
            Go somewhere
            <br />
            <em>unforgettable.</em>
          </h1>

          <div className="sands-hero-bottom">
            <p>
              Discover destinations, experiences and journeys
              designed to stay with you long after you return.
            </p>

            <a href="#discover" className="sands-scroll">
              <span>↓</span>
              EXPLORE
            </a>
          </div>
        </div>

        <span className="sands-hero-index">S / 001</span>
      </section>

      {/* INTRO */}
      <section className="sands-intro" id="discover">
        <div className="sands-label">
          <span>01</span>
          THE JOURNEY
        </div>

        <div className="sands-intro-grid">
          <h2>
            Travel is
            <br />
            more than
            <br />
            <em>a place.</em>
          </h2>

          <div className="sands-intro-copy">
            <p className="sands-large-copy">
              The best journeys are measured in moments,
              not miles.
            </p>

            <p>
              From the first view to the final evening,
              we believe travel should feel considered,
              personal and genuinely memorable.
            </p>

            <a href="#experiences" className="sands-link">
              Discover the possibilities <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* DESTINATION IMAGE */}
      <section className="sands-destination">
        <div className="sands-destination-image" />

        <div className="sands-destination-card">
          <span>DESTINATION / 01</span>

          <h3>
            Find your
            <br />
            <em>horizon.</em>
          </h3>

          <p>
            Some places ask you to slow down.
            Others make you want to explore every corner.
          </p>

          <a href="#experiences">
            Explore destinations <span>↗</span>
          </a>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="sands-experiences" id="experiences">
        <div className="sands-label">
          <span>02</span>
          EXPERIENCES
        </div>

        <div className="sands-heading-row">
          <h2>
            Travel your
            <br />
            <em>way.</em>
          </h2>

          <p>
            Every traveller sees a destination differently.
            Choose the kind of experience that feels right
            for you.
          </p>
        </div>

        <div className="sands-experience-list">
          {experiences.map((experience) => (
            <article
              className="sands-experience"
              key={experience.number}
            >
              <span>{experience.number}</span>

              <div>
                <h3>{experience.title}</h3>
                <p>{experience.text}</p>
              </div>

              <span className="sands-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      {/* FULL IMAGE */}
      <section className="sands-visual">
        <div className="sands-visual-image" />

        <div className="sands-visual-copy">
          <span>TAKE THE SCENIC ROUTE</span>

          <h2>
            Leave room
            <br />
            for <em>wonder.</em>
          </h2>

          <p>
            The most memorable parts of a journey
            are sometimes the ones you never planned.
          </p>
        </div>
      </section>

      {/* JOURNEY PLANNING */}
      <section className="sands-journey" id="journey">
        <div className="sands-label">
          <span>03</span>
          YOUR JOURNEY
        </div>

        <div className="sands-journey-grid">
          <div>
            <h2>
              From idea
              <br />
              to <em>adventure.</em>
            </h2>
          </div>

          <div className="sands-journey-copy">
            <p>
              Planning a journey should feel as exciting
              as taking one. Start with an idea and shape
              it into an experience that belongs to you.
            </p>

            <div className="sands-planning">
              {planning.map(([number, title]) => (
                <div key={number}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="sands-gallery">
        <div className="sands-gallery-main" />
        <div className="sands-gallery-small sands-gallery-small-one" />
        <div className="sands-gallery-small sands-gallery-small-two" />

        <div className="sands-gallery-title">
          <span>04 / MOMENTS</span>
          <h2>
            Remember
            <br />
            <em>the feeling.</em>
          </h2>
        </div>
      </section>

      {/* CTA */}
      <section className="sands-contact" id="contact">
        <div className="sands-contact-inner">
          <span>START YOUR JOURNEY</span>

          <h2>
            Somewhere
            <br />
            is waiting.
          </h2>

          <p>
            Tell us what kind of experience you're looking for.
            Let's start planning something memorable.
          </p>

          <div className="sands-contact-actions">
            <a href="mailto:hello@sandstourism.com">
              Email Us <span>↗</span>
            </a>

            <a
              href="https://wa.me/000000000000"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sands-footer">
        <div className="sands-footer-main">
          <div>
            <a href="/" className="sands-footer-logo">
              SANDS<span>.</span>
            </a>

            <p>
              Travel experiences
              designed around you.
            </p>
          </div>

          <div className="sands-footer-links">
            <a href="#discover">Discover</a>
            <a href="#experiences">Experiences</a>
            <a href="#journey">Journey</a>
            <a href="#contact">Contact</a>
          </div>

          <a href="/" className="sands-back-home">
            BACK TO VRLS SOLUTIONS ↑
          </a>
        </div>

        <div className="sands-footer-bottom">
          <span>CONCEPT TOURISM WEBSITE</span>
          <span>DESIGNED &amp; DEVELOPED BY VRLS SOLUTIONS</span>
          <span>SANDS / 2026</span>
        </div>
      </footer>

    </main>
  )
}
