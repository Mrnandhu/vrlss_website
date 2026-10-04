import './AtlasInteriors.css'

const projects = [
  {
    number: '01',
    type: 'RESIDENTIAL',
    title: 'Quiet Geometry',
    text: 'A considered interior language built around natural materials, restrained tones and generous light.',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=70',
  },
  {
    number: '02',
    type: 'HOSPITALITY',
    title: 'Warm Minimalism',
    text: 'Layered textures and sculptural details create an atmosphere designed to feel calm, refined and welcoming.',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=70',
  },
  {
    number: '03',
    type: 'PRIVATE RESIDENCE',
    title: 'Material & Light',
    text: 'A tactile composition where stone, timber and soft furnishings shape the experience of everyday living.',
    image:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=70',
  },
]

const services = [
  'Interior Design',
  'Architecture',
  'Fit-out',
  'Space Planning',
  'Furniture & Styling',
  'Project Coordination',
]

export default function AtlasInteriors() {
  return (
    <div className="atlas-demo">
      <header className="atlas-nav">
        <a href="#top" className="atlas-logo">
          <span className="atlas-logo-mark">A</span>
          <span>
            ATLAS
            <small>INTERIORS</small>
          </span>
        </a>

        <nav>
          <a href="#studio">Studio</a>
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="atlas-nav-button">
          Start a conversation <span>↗</span>
        </a>
      </header>

      <main id="top">
        <section className="atlas-hero">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=70"
            alt="Contemporary interior"
          />

          <div className="atlas-hero-overlay" />

          <div className="atlas-hero-content">
            <span className="atlas-kicker">INTERIORS / ARCHITECTURE / FIT-OUT</span>

            <h1>
              Spaces with
              <em> character.</em>
            </h1>

            <p>
              Interior environments shaped through architecture, material,
              light and a clear sense of purpose.
            </p>

            <a href="#projects" className="atlas-button atlas-button-light">
              Explore our work <span>↓</span>
            </a>
          </div>

          <div className="atlas-hero-meta">
            <span>01 — 03</span>
            <span>ATLAS INTERIORS</span>
          </div>
        </section>

        <section className="atlas-intro" id="studio">
          <div className="atlas-section-label">
            <span>01</span>
            THE STUDIO
          </div>

          <div className="atlas-intro-grid">
            <h2>
              Interior spaces
              <em> made meaningful.</em>
            </h2>

            <div>
              <p className="atlas-large-copy">
                We create considered environments where architecture,
                interiors and everyday experience come together.
              </p>

              <p>
                From private residences to hospitality and commercial
                environments, our approach begins with understanding how a
                space should feel, function and evolve.
              </p>

              <a href="#services" className="atlas-text-link">
                Discover our approach <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="atlas-feature">
          <div className="atlas-feature-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=70"
              alt="Minimal residential interior"
            />
          </div>

          <div className="atlas-feature-content">
            <span className="atlas-kicker">OUR APPROACH</span>

            <h2>
              Less noise.
              <br />
              More <em>intention.</em>
            </h2>

            <p>
              We believe strong interiors do not need to compete for
              attention. Proportion, material, light and detail work together
              to create spaces that remain relevant beyond a single trend.
            </p>

            <div className="atlas-feature-list">
              <div>
                <span>01</span>
                <strong>Understand</strong>
                <p>We begin with the people, purpose and character of the space.</p>
              </div>

              <div>
                <span>02</span>
                <strong>Define</strong>
                <p>We establish a visual and spatial direction before detail.</p>
              </div>

              <div>
                <span>03</span>
                <strong>Refine</strong>
                <p>Every material, surface and element is considered as part of the whole.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="atlas-projects" id="projects">
          <div className="atlas-projects-heading">
            <div className="atlas-section-label">
              <span>02</span>
              SELECTED WORK
            </div>

            <h2>
              Designed around
              <em> the experience.</em>
            </h2>
          </div>

          <div className="atlas-project-list">
            {projects.map((project) => (
              <article className="atlas-project" key={project.number}>
                <div className="atlas-project-image">
                  <img src={project.image} alt={project.title} />
                  <span>{project.number}</span>
                </div>

                <div className="atlas-project-info">
                  <span className="atlas-project-type">{project.type}</span>

                  <h3>{project.title}</h3>

                  <p>{project.text}</p>

                  <span className="atlas-project-link">
                    View project <b>↗</b>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="atlas-materials">
          <div className="atlas-materials-image">
            <img
              src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=70"
              alt="Architectural interior detail"
            />
          </div>

          <div className="atlas-materials-content">
            <span className="atlas-kicker">MATERIAL / FORM / DETAIL</span>

            <h2>
              The beauty is
              <em> in the details.</em>
            </h2>

            <p>
              Stone with timber. Soft textiles with hard surfaces. Natural
              light against considered geometry. We build contrast through
              material rather than excess.
            </p>

            <div className="atlas-material-swatches">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>

        <section className="atlas-services" id="services">
          <div className="atlas-section-label">
            <span>03</span>
            WHAT WE DO
          </div>

          <div className="atlas-services-grid">
            <h2>
              From first idea
              <em> to finished space.</em>
            </h2>

            <div className="atlas-service-list">
              {services.map((service, index) => (
                <div className="atlas-service" key={service}>
                  <span>0{index + 1}</span>
                  <strong>{service}</strong>
                  <b>↗</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="atlas-lifestyle">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=70"
            alt="Contemporary architecture"
          />

          <div className="atlas-lifestyle-overlay" />

          <div className="atlas-lifestyle-content">
            <span className="atlas-kicker">ARCHITECTURE & INTERIORS</span>

            <h2>
              Spaces that
              <br />
              <em>stay with you.</em>
            </h2>

            <p>
              Thoughtful environments for living, working, gathering and
              experiencing.
            </p>
          </div>
        </section>

        <section className="atlas-contact" id="contact">
          <span className="atlas-kicker">START A PROJECT</span>

          <h2>
            Let's create a space
            <em> worth experiencing.</em>
          </h2>

          <p>
            Tell us about your project, your space and what you want it to
            become.
          </p>

          <a
            href="mailto:hello@vrlss.in?subject=Atlas Interiors Project Enquiry"
            className="atlas-button"
          >
            Discuss a project <span>↗</span>
          </a>
        </section>
      </main>

      <footer className="atlas-footer">
        <div className="atlas-footer-top">
          <a href="#top" className="atlas-logo">
            <span className="atlas-logo-mark">A</span>
            <span>
              ATLAS
              <small>INTERIORS</small>
            </span>
          </a>

          <div className="atlas-footer-links">
            <a href="#studio">Studio</a>
            <a href="#projects">Projects</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>

          <a href="#top" className="atlas-back-top">
            Back to top ↑
          </a>
        </div>

        <div className="atlas-footer-bottom">
          <span>CONCEPT WEBSITE</span>
          <span>DESIGNED & DEVELOPED BY VRLS SOLUTIONS</span>
          <span>ATLAS INTERIORS</span>
        </div>
      </footer>
    </div>
  )
}
