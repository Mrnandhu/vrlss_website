import './MedoraClinic.css'

const services = [
  {
    number: '01',
    title: 'Primary Care',
    text: 'Thoughtful consultations, preventive care and ongoing health management built around the individual.',
  },
  {
    number: '02',
    title: 'Diagnostics',
    text: 'Modern diagnostic pathways designed to make clinical decisions clearer and more informed.',
  },
  {
    number: '03',
    title: 'Specialist Care',
    text: 'Focused clinical expertise across a coordinated and connected patient journey.',
  },
  {
    number: '04',
    title: 'Preventive Health',
    text: 'Proactive health planning that helps patients understand and manage their wellbeing.',
  },
]

const journey = [
  ['01', 'Understand', 'We begin by listening carefully to your needs, concerns and health goals.'],
  ['02', 'Assess', 'Clinical evaluation and diagnostics help create a clearer picture of your health.'],
  ['03', 'Plan', 'Your care pathway is shaped around the information, priorities and outcomes that matter.'],
  ['04', 'Support', 'Ongoing communication keeps your care connected beyond the consultation.'],
]

export default function MedoraClinic() {
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="medora-demo" id="top">
      <header className="medora-nav">
        <a href="#top" className="medora-brand" aria-label="Medora Clinic">
          <span className="medora-mark">M</span>
          <span className="medora-brand-copy">
            <strong>MEDORA</strong>
            <small>CLINIC</small>
          </span>
        </a>

        <nav className="medora-nav-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#technology">Technology</a>
          <a href="#journey">Patient Journey</a>
        </nav>

        <a href="#appointment" className="medora-nav-cta">
          Book a Consultation <span>↗</span>
        </a>
      </header>

      <main>
        <section className="medora-hero">
          <div className="medora-hero-image" />
          <div className="medora-hero-overlay" />

          <div className="medora-hero-content">
            <div className="medora-eyebrow medora-eyebrow-light">
              <span />
              MODERN HEALTHCARE
            </div>

            <h1>
              Healthcare
              <br />
              <em>with clarity.</em>
            </h1>

            <p>
              A contemporary clinical experience combining thoughtful care,
              advanced technology and a human approach to every patient.
            </p>

            <div className="medora-actions">
              <a href="#appointment" className="medora-button medora-button-blue">
                Book a Consultation <span>↗</span>
              </a>
              <a href="#services" className="medora-light-link">
                Explore our care <span>↓</span>
              </a>
            </div>
          </div>

          <div className="medora-hero-bottom">
            <span>MEDORA / HEALTHCARE</span>
            <span>CARE • TECHNOLOGY • EXPERIENCE</span>
          </div>
        </section>

        <section className="medora-intro" id="about">
          <div className="medora-section-label">
            <span>01</span>
            ABOUT MEDORA
          </div>

          <div className="medora-intro-grid">
            <h2>
              Better care begins
              <br />
              with <em>better understanding.</em>
            </h2>

            <div className="medora-intro-copy">
              <p>
                Medora Clinic is a concept for a modern healthcare environment
                where clinical expertise, technology and patient experience
                work together.
              </p>
              <p>
                Every touchpoint is designed to feel considered — from the
                first conversation to diagnostics, treatment and continued
                support.
              </p>

              <a href="#technology" className="medora-inline-link">
                Discover our approach <span>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="medora-care" id="services">
          <div className="medora-care-image">
            <div className="medora-image-tag">01 / CARE ENVIRONMENT</div>
          </div>

          <div className="medora-care-content">
            <div className="medora-section-label medora-label-blue">
              <span>02</span>
              OUR CARE
            </div>

            <h2>
              Clinical expertise.
              <br />
              <em>Human attention.</em>
            </h2>

            <p className="medora-lead">
              A connected approach to healthcare, designed around what patients
              need at every stage of their journey.
            </p>

            <div className="medora-service-list">
              {services.map((service) => (
                <article className="medora-service" key={service.number}>
                  <span className="medora-service-number">{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <span className="medora-service-arrow">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="medora-statement">
          <div className="medora-statement-inner">
            <div className="medora-section-label medora-label-blue">
              <span>03</span>
              THE MEDORA APPROACH
            </div>

            <h2>
              Technology should make
              <br />
              healthcare feel <em>more human.</em>
            </h2>

            <p>
              The right technology does not replace the human side of medicine.
              It creates more clarity, better communication and a more connected
              experience for patients and clinical teams.
            </p>
          </div>
        </section>

        <section className="medora-tech" id="technology">
          <div className="medora-tech-visual">
            <div className="medora-tech-orbit orbit-one" />
            <div className="medora-tech-orbit orbit-two" />
            <div className="medora-tech-core">
              <span>MEDORA</span>
              <strong>+</strong>
              <span>TECH</span>
            </div>
          </div>

          <div className="medora-tech-copy">
            <div className="medora-section-label medora-label-blue">
              <span>04</span>
              TECHNOLOGY
            </div>

            <h2>
              Precision
              <br />
              <em>behind the care.</em>
            </h2>

            <p>
              From digital patient journeys to connected diagnostics,
              technology can simplify complexity while keeping clinical
              decisions at the centre.
            </p>

            <div className="medora-tech-points">
              <div>
                <span>01</span>
                <strong>Connected information</strong>
                <p>Clearer access to the information needed throughout care.</p>
              </div>

              <div>
                <span>02</span>
                <strong>Modern diagnostics</strong>
                <p>Technology-supported pathways for informed clinical decisions.</p>
              </div>

              <div>
                <span>03</span>
                <strong>Digital experience</strong>
                <p>Simple, considered interactions before, during and after care.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="medora-image-break">
          <div className="medora-image-break-overlay" />
          <div className="medora-image-break-copy">
            <span>DESIGNED AROUND PEOPLE</span>
            <h2>
              A calmer
              <br />
              healthcare experience.
            </h2>
          </div>
        </section>

        <section className="medora-journey" id="journey">
          <div className="medora-journey-head">
            <div className="medora-section-label medora-label-blue">
              <span>05</span>
              PATIENT JOURNEY
            </div>

            <h2>
              From first conversation
              <br />
              to <em>ongoing care.</em>
            </h2>
          </div>

          <div className="medora-journey-list">
            {journey.map(([number, title, text]) => (
              <div className="medora-journey-row" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="medora-row-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>

        <section className="medora-environment">
          <div className="medora-environment-copy">
            <div className="medora-section-label">
              <span>06</span>
              THE ENVIRONMENT
            </div>

            <h2>
              Spaces designed
              <br />
              for <em>reassurance.</em>
            </h2>

            <p>
              From natural light to considered materials, every part of the
              environment is intended to create a sense of calm, privacy and
              confidence.
            </p>
          </div>

          <div className="medora-environment-image" />
        </section>

        <section className="medora-appointment" id="appointment">
          <div className="medora-appointment-image" />
          <div className="medora-appointment-overlay" />

          <div className="medora-appointment-content">
            <div className="medora-eyebrow medora-eyebrow-light">
              <span />
              START YOUR JOURNEY
            </div>

            <h2>
              Your health.
              <br />
              <em>Handled with care.</em>
            </h2>

            <p>
              Have a question or would like to discuss your care?
              Start a conversation with Medora Clinic.
            </p>

            <a href="mailto:care@medoraclinic.com" className="medora-button medora-button-white">
              Request an Appointment <span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="medora-footer">
        <div className="medora-footer-top">
          <button type="button" onClick={goTop} className="medora-brand medora-footer-brand">
            <span className="medora-mark">M</span>
            <span className="medora-brand-copy">
              <strong>MEDORA</strong>
              <small>CLINIC</small>
            </span>
          </button>

          <div className="medora-footer-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#technology">Technology</a>
            <a href="#journey">Patient Journey</a>
          </div>

          <a href="#appointment" className="medora-footer-cta">
            Book a Consultation ↗
          </a>
        </div>

        <div className="medora-footer-bottom">
          <span>CONCEPT HEALTHCARE WEBSITE</span>
          <span>DESIGNED &amp; DEVELOPED BY VRLS SOLUTIONS</span>
          <span>MEDORA / 2026</span>
        </div>

        <a href="/" className="medora-back-home">
          BACK TO VRLS SOLUTIONS ↑
        </a>
      </footer>
    </div>
  )
}
