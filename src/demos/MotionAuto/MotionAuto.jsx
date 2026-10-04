import './MotionAuto.css'

const services = [
  ['01', 'Performance Tuning', 'Precision upgrades for power, response and driving dynamics.'],
  ['02', 'Detailing & Protection', 'Exterior correction, ceramic protection and interior care.'],
  ['03', 'Diagnostics', 'Advanced diagnostics to identify issues before they become problems.'],
  ['04', 'Custom Builds', 'Purpose-built automotive work tailored to the vehicle and driver.'],
]

const specs = [
  ['PRECISION', '01'],
  ['PERFORMANCE', '02'],
  ['CRAFT', '03'],
  ['CONTROL', '04'],
]

export default function MotionAuto() {
  return (
    <main className="motion-demo">
      <header className="motion-nav">
        <a href="/" className="motion-brand">
          MOTION<span>/</span>AUTO
        </a>

        <nav>
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a href="#work">Workshop</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="motion-nav-button">
          BOOK A SERVICE <span>↗</span>
        </a>
      </header>

      <section className="motion-hero">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=90"
          alt="Performance sports car"
        />

        <div className="motion-hero-overlay" />

        <div className="motion-hero-grid" />

        <div className="motion-hero-content">
          <p className="motion-kicker">AUTOMOTIVE / PERFORMANCE / CRAFT</p>

          <h1>
            Driven
            <br />
            by <span>precision.</span>
          </h1>

          <p className="motion-hero-copy">
            Performance, detailing and automotive care for people who expect
            more from every drive.
          </p>

          <a href="#services" className="motion-button">
            EXPLORE SERVICES <span>↘</span>
          </a>
        </div>

        <div className="motion-hero-meta">
          <span>EST. 2026</span>
          <span>01 / 04</span>
        </div>
      </section>

      <section className="motion-intro" id="approach">
        <div className="motion-label">THE MOTION STANDARD</div>

        <div className="motion-intro-grid">
          <h2>
            Your car
            <br />
            deserves
            <br />
            <span>attention.</span>
          </h2>

          <div className="motion-intro-copy">
            <p>
              Automotive care is not simply about making a vehicle look good.
              It is about understanding the machine, respecting its character
              and getting every detail right.
            </p>

            <p>
              Motion combines technical knowledge with meticulous
              craftsmanship to deliver work that can be seen, felt and trusted.
            </p>

            <div className="motion-stat-row">
              <div>
                <strong>04</strong>
                <span>Core services</span>
              </div>

              <div>
                <strong>01</strong>
                <span>Clear standard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="motion-image-break">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=90"
          alt="Automotive detail"
        />

        <div className="motion-image-caption">
          <span>02</span>
          <p>Every detail has a purpose.</p>
        </div>
      </section>

      <section className="motion-services" id="services">
        <div className="motion-label">SERVICES</div>

        <div className="motion-services-heading">
          <h2>
            Built around
            <br />
            <span>your drive.</span>
          </h2>

          <p>
            From preventative care to performance-focused work, every service
            is approached with the same attention to detail.
          </p>
        </div>

        <div className="motion-service-list">
          {services.map(([number, title, description]) => (
            <article className="motion-service" key={number}>
              <span className="motion-service-number">{number}</span>

              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

              <span className="motion-service-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="motion-specs">
        <div className="motion-label">THE APPROACH</div>

        <h2>
          No shortcuts.
          <br />
          <span>Just precision.</span>
        </h2>

        <div className="motion-spec-grid">
          {specs.map(([title, number]) => (
            <div className="motion-spec" key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <i>+</i>
            </div>
          ))}
        </div>
      </section>

      <section className="motion-work" id="work">
        <div className="motion-label">IN THE WORKSHOP</div>

        <div className="motion-work-grid">
          <div className="motion-work-large">
            <img
              src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1800&q=90"
              alt="Automotive workshop"
            />
            <span>03 / DETAIL</span>
          </div>

          <div className="motion-work-small">
            <img
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=90"
              alt="Performance vehicle"
            />
            <span>04 / PERFORMANCE</span>
          </div>
        </div>
      </section>

      <section className="motion-quote">
        <div className="motion-quote-mark">“</div>

        <h2>
          Built for the
          <br />
          road ahead.
        </h2>

        <p>
          Because the difference is always in the details.
        </p>
      </section>

      <section className="motion-contact" id="contact">
        <div className="motion-contact-image">
          <img
            src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=2200&q=90"
            alt="Luxury automotive interior"
          />
        </div>

        <div className="motion-contact-content">
          <div className="motion-label">START WITH YOUR VEHICLE</div>

          <h2>
            Ready for
            <br />
            <span>the next drive?</span>
          </h2>

          <p>
            Tell us what you are looking for and we will help you find the
            right service.
          </p>

          <a href="mailto:hello@vrlss.in" className="motion-button">
            HELLO@VRLSS.IN <span>↗</span>
          </a>
        </div>
      </section>

      <footer className="motion-footer">
        <div className="motion-footer-top">
          <div className="motion-footer-brand">
            MOTION<span>/</span>AUTO
          </div>

          <div className="motion-footer-links">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#work">Workshop</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="motion-footer-bottom">
          <span>CONCEPT AUTOMOTIVE WEBSITE</span>
          <span>DESIGNED &amp; DEVELOPED BY VRLS SOLUTIONS</span>
          <span>MOTION / 2026</span>
        </div>

        <a href="/" className="motion-back-home">
          BACK TO VRLS SOLUTIONS ↑
        </a>
      </footer>
    </main>
  )
}

