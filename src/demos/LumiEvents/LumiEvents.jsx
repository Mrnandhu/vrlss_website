import './LumiEvents.css'

const projects = [
  {
    title: 'The Grand Evening',
    category: 'Private Celebration',
    image:
      'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1400&q=70',
  },
  {
    title: 'Golden Hour',
    category: 'Corporate Event',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=70',
  },
  {
    title: 'After Dark',
    category: 'Live Experience',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=70',
  },
]

const services = [
  'Event Production',
  'Venue Styling',
  'Corporate Events',
  'Private Celebrations',
]

export default function LumiEvents() {
  return (
    <main className="lumi-demo">
      <header className="lumi-nav">
        <a href="/" className="lumi-brand">
          LUMI<span>.</span>
        </a>

        <nav>
          <a href="#experience">Experience</a>
          <a href="#services">Services</a>
          <a href="#work">Selected Work</a>
        </nav>

        <a href="#contact" className="lumi-nav-cta">
          PLAN AN EVENT <span>↗</span>
        </a>
      </header>

      <section className="lumi-hero">
        <div className="lumi-hero-image">
          <img
            src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1400&q=70"
            alt="Elegant event venue"
          />
        </div>

        <div className="lumi-hero-overlay" />

        <div className="lumi-hero-content">
          <p className="lumi-eyebrow">EVENTS / EXPERIENCES / MOMENTS</p>

          <h1>
            Make it
            <br />
            <span>memorable.</span>
          </h1>

          <p className="lumi-hero-copy">
            Thoughtfully designed events where atmosphere, detail and
            experience come together.
          </p>

          <a href="#contact" className="lumi-button">
            CREATE AN EXPERIENCE <span>↗</span>
          </a>
        </div>

        <div className="lumi-hero-index">01 / 05</div>
      </section>

      <section className="lumi-intro" id="experience">
        <div className="lumi-section-label">THE LUMI EXPERIENCE</div>

        <div className="lumi-intro-grid">
          <h2>
            Events are
            <br />
            <span>more than moments.</span>
          </h2>

          <div>
            <p>
              We create immersive experiences designed around the people,
              atmosphere and story behind every occasion.
            </p>

            <p>
              From intimate celebrations to large-scale corporate gatherings,
              every detail is considered with intention.
            </p>

            <a href="#services" className="lumi-text-link">
              Discover what we do <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className="lumi-feature">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=70"
          alt="Event tables and lighting"
        />

        <div className="lumi-feature-caption">
          <span>02</span>
          <p>Atmosphere is part of the experience.</p>
        </div>
      </section>

      <section className="lumi-services" id="services">
        <div className="lumi-section-label">WHAT WE CREATE</div>

        <div className="lumi-services-heading">
          <h2>
            Designed for
            <br />
            <span>the occasion.</span>
          </h2>

          <p>
            A complete approach to event design, production and execution —
            built around your vision.
          </p>
        </div>

        <div className="lumi-service-list">
          {services.map((service, index) => (
            <div className="lumi-service" key={service}>
              <span>0{index + 1}</span>
              <h3>{service}</h3>
              <span className="lumi-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lumi-statement">
        <p className="lumi-section-label">THE DETAILS MATTER</p>

        <h2>
          Light.
          <br />
          Space.
          <br />
          <span>Energy.</span>
        </h2>

        <p>
          The smallest details can change how a room feels. We bring them
          together to create an experience guests remember.
        </p>
      </section>

      <section className="lumi-work" id="work">
        <div className="lumi-section-label">SELECTED EXPERIENCES</div>

        <div className="lumi-work-heading">
          <h2>
            A few
            <br />
            <span>moments.</span>
          </h2>
        </div>

        <div className="lumi-projects">
          {projects.map((project, index) => (
            <article className="lumi-project" key={project.title}>
              <div className="lumi-project-image">
                <img src={project.image} alt={project.title} />
                <span>0{index + 1}</span>
              </div>

              <div className="lumi-project-info">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lumi-closing">
        <img
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=70"
          alt="People enjoying an event"
        />

        <div className="lumi-closing-overlay" />

        <div className="lumi-closing-content">
          <p className="lumi-section-label">YOUR NEXT EVENT</p>

          <h2>
            Give people
            <br />
            something to
            <br />
            <span>remember.</span>
          </h2>

          <a href="#contact" className="lumi-button">
            START A CONVERSATION <span>↗</span>
          </a>
        </div>
      </section>

      <section className="lumi-contact" id="contact">
        <div className="lumi-section-label">LET'S CREATE SOMETHING</div>

        <h2>
          Have an event
          <br />
          in mind?
        </h2>

        <p>
          Tell us what you're planning and let's build an experience around
          it.
        </p>

        <a href="mailto:hello@vrlss.in" className="lumi-contact-button">
          HELLO@VRLSS.IN <span>↗</span>
        </a>
      </section>

      <footer className="lumi-footer">
        <div className="lumi-footer-top">
          <div className="lumi-footer-brand">
            LUMI<span>.</span>
          </div>

          <div className="lumi-footer-links">
            <a href="#experience">Experience</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="lumi-footer-bottom">
          <span>CONCEPT EVENTS WEBSITE</span>
          <span>DESIGNED &amp; DEVELOPED BY VRLS SOLUTIONS</span>
          <span>LUMI / 2026</span>
        </div>

        <a href="/" className="lumi-back-home">
          BACK TO VRLS SOLUTIONS ↑
        </a>
      </footer>
    </main>
  )
}
