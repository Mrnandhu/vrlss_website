import './AlphaContracting.css'

const goHome = () => {
  window.location.href = '/'
}

const goTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const projects = [
  {
    number: '01',
    type: 'COMMERCIAL',
    title: 'Civic Frame',
    text: 'A contemporary commercial structure shaped around efficient planning, durable materials and precise detailing.',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=90',
  },
  {
    number: '02',
    type: 'RESIDENTIAL',
    title: 'Terrace House',
    text: 'A residential project balancing structural clarity, natural light and carefully considered outdoor spaces.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90',
  },
  {
    number: '03',
    type: 'ARCHITECTURAL',
    title: 'Concrete & Light',
    text: 'A material-led architectural concept where concrete, glass and daylight define the character of the space.',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=90',
  },
]

const capabilities = [
  {
    number: '01',
    title: 'General Contracting',
    text: 'Structured delivery for commercial, residential and mixed-use construction requirements.',
  },
  {
    number: '02',
    title: 'Civil Engineering',
    text: 'Planning and execution built around technical requirements, site conditions and project coordination.',
  },
  {
    number: '03',
    title: 'Fit-out & Interiors',
    text: 'Interior construction and finishing with attention to materials, detailing and handover quality.',
  },
  {
    number: '04',
    title: 'Project Coordination',
    text: 'Clear coordination across design, construction, suppliers and project stakeholders.',
  },
]

export default function AlphaContracting() {
  return (
    <div className="alpha-demo" id="top">
      <header className="alpha-nav">
        <button type="button" onClick={goHome} className="alpha-brand" aria-label="VRLS Solutions">
          <span className="alpha-brand-mark">A</span>
          <span>
            <strong>ALPHA</strong>
            <small>CONTRACTING</small>
          </span>
        </button>

        <nav className="alpha-nav-links">
          <button type="button" onClick={() => goTo("about")}>About</button>
          <button type="button" onClick={() => goTo("capabilities")}>Capabilities</button>
          <button type="button" onClick={() => goTo("projects")}>Projects</button>
          <button type="button" onClick={() => goTo("process")}>Process</button>
        </nav>

        <button type="button" onClick={() => goTo("contact")} className="alpha-nav-cta">
          Project Enquiry <span>↗</span>
          </button>
      </header>

      <main>
        <section className="alpha-hero">
          <div className="alpha-hero-image" />

          <div className="alpha-hero-overlay" />

          <div className="alpha-hero-content">
            <span className="alpha-kicker">CONSTRUCTION & ENGINEERING</span>

            <h1>
              Built with
              <em> precision.</em>
            </h1>

            <p>
              Construction and engineering solutions shaped around complex
              requirements, considered execution and lasting quality.
            </p>

            <div className="alpha-hero-actions">
              <button type="button" onClick={() => goTo("projects")} className="alpha-button alpha-button-green">
                Explore projects <span>↘</span>
            </button>

              <button type="button" onClick={() => goTo("contact")} className="alpha-text-link">
                Start a conversation <span>→</span>
            </button>
            </div>
          </div>

          <div className="alpha-hero-meta">
            <span>ALPHA / 01</span>
            <span>CONSTRUCTION · ENGINEERING</span>
          </div>
        </section>

        <section className="alpha-intro" id="about">
          <div className="alpha-section-label">
            <span>01</span>
            ABOUT ALPHA
          </div>

          <div className="alpha-intro-grid">
            <h2>
              Engineering
              <em> with purpose.</em>
            </h2>

            <div>
              <p className="alpha-large-copy">
                From early planning through construction and completion, every
                stage is approached with clarity, coordination and attention to
                detail.
              </p>

              <p>
                This concept demonstrates how a modern contracting business can
                communicate its capabilities, projects and approach through a
                structured digital experience.
              </p>
            </div>
          </div>
        </section>

        <section className="alpha-capabilities" id="capabilities">
          <div className="alpha-section-label alpha-section-label-light">
            <span>02</span>
            CAPABILITIES
          </div>

          <div className="alpha-capabilities-heading">
            <h2>
              One team.
              <br />
              <em>Multiple disciplines.</em>
            </h2>

            <p>
              A clear service structure helps clients understand where
              expertise fits into their project journey.
            </p>
          </div>

          <div className="alpha-capability-grid">
            {capabilities.map((item) => (
              <article className="alpha-capability" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <b>↗</b>
              </article>
            ))}
          </div>
        </section>

        <section className="alpha-projects" id="projects">
          <div className="alpha-projects-heading">
            <div className="alpha-section-label">
              <span>03</span>
              SELECTED PROJECTS
            </div>

            <h2>
              Spaces made
              <em> to last.</em>
            </h2>
          </div>

          <div className="alpha-project-list">
            {projects.map((project) => (
              <article className="alpha-project" key={project.number}>
                <div className="alpha-project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span>{project.number}</span>
                </div>

                <div className="alpha-project-info">
                  <span className="alpha-project-type">{project.type}</span>

                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                  </div>

                  <span className="alpha-project-arrow">↗</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="alpha-process" id="process">
          <div className="alpha-process-top">
            <div className="alpha-section-label">
              <span>04</span>
              OUR APPROACH
            </div>

            <h2>
              From first brief
              <br />
              to <em>final detail.</em>
            </h2>
          </div>

          <div className="alpha-process-list">
            <div>
              <span>01</span>
              <strong>Understand</strong>
              <p>Requirements, objectives, site and project priorities.</p>
            </div>

            <div>
              <span>02</span>
              <strong>Plan</strong>
              <p>Scope, sequencing, coordination and delivery structure.</p>
            </div>

            <div>
              <span>03</span>
              <strong>Build</strong>
              <p>Execution managed around quality, safety and precision.</p>
            </div>

            <div>
              <span>04</span>
              <strong>Complete</strong>
              <p>Final detailing, review and project handover.</p>
            </div>
          </div>
        </section>

        <section className="alpha-statement">
          <div className="alpha-statement-image" />

          <div className="alpha-statement-overlay" />

          <div className="alpha-statement-content">
            <span className="alpha-kicker">THE ALPHA APPROACH</span>

            <h2>
              Structure.
              <br />
              <em>Clarity.</em>
              <br />
              Craft.
            </h2>
          </div>
        </section>

        <section className="alpha-contact" id="contact">
          <div className="alpha-section-label">
            <span>05</span>
            PROJECT ENQUIRY
          </div>

          <div className="alpha-contact-grid">
            <h2>
              Have a project
              <em> in mind?</em>
            </h2>

            <div>
              <p>
                Tell us what you are building, where you are in the process and
                what you need from your digital partner.
              </p>

              <a
                href="mailto:hello@vrlss.in"
                className="alpha-button alpha-button-green"
              >
                Discuss your project <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="alpha-footer">
        <div className="alpha-footer-top">
          <button type="button" onClick={goHome} className="alpha-brand" aria-label="VRLS Solutions">
            <span className="alpha-brand-mark">A</span>
            <span>
              <strong>ALPHA</strong>
              <small>CONTRACTING</small>
            </span>
          </button>

          <div className="alpha-footer-links">
            <button type="button" onClick={() => goTo("about")}>About</button>
            <button type="button" onClick={() => goTo("capabilities")}>Capabilities</button>
            <button type="button" onClick={() => goTo("projects")}>Projects</button>
            <button type="button" onClick={() => goTo("contact")}>Contact</button>
          </div>

          <button type="button" onClick={() => goTo("contact")} className="alpha-footer-cta">
            Project Enquiry ↗
        </button>
        </div>

        <div className="alpha-footer-bottom">
          <span>CONCEPT WEBSITE</span>
          <span>DESIGNED & DEVELOPED BY VRLS SOLUTIONS</span>
          <button type="button" onClick={goHome}>BACK TO VRLS SHOWCASE ↑</button>
        </div>
      </footer>
    </div>
  )
}
