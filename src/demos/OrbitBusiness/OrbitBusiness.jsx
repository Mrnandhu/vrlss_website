import './OrbitBusiness.css'

const services = [
  ['01', 'Hair Styling', 'Cuts, blowouts and styling shaped around your look.'],
  ['02', 'Colour', 'Dimensional colour, highlights and transformations.'],
  ['03', 'Hair Treatments', 'Care-focused treatments designed to restore softness and shine.'],
  ['04', 'Bridal & Occasion', 'Refined styling for weddings, celebrations and special moments.'],
]

const experiences = [
  ['01', 'THE CUT', 'Precision, movement and a shape that works for you.'],
  ['02', 'THE COLOUR', 'Thoughtful tones designed to complement your style.'],
  ['03', 'THE FINISH', 'The final details that complete the look.'],
]

export default function OrbitBusiness() {
  return (
    <main className="orbit-demo">

      <header className="orbit-nav">
        <a href="/" className="orbit-brand">
          ORBIT<span>.</span>
        </a>

        <nav>
          <a href="#services">Services</a>
          <a href="#studio">The Studio</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="orbit-nav-button">
          BOOK AN APPOINTMENT <span>↗</span>
        </a>
      </header>

      <section className="orbit-hero">
        <img
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=2200&q=90"
          alt="Beauty portrait"
        />

        <div className="orbit-hero-overlay" />

        <div className="orbit-hero-content">
          <p className="orbit-kicker">HAIR / BEAUTY / STYLING</p>

          <h1>
            Your look.
            <br />
            <span>Your signature.</span>
          </h1>

          <p className="orbit-hero-copy">
            A modern beauty studio creating considered cuts, colour and
            styling for people who want to feel effortlessly themselves.
          </p>

          <a href="#services" className="orbit-button">
            EXPLORE SERVICES <span>↘</span>
          </a>
        </div>

        <div className="orbit-hero-bottom">
          <span>ORBIT BEAUTY STUDIO</span>
          <span>01 / 04</span>
        </div>
      </section>

      <section className="orbit-intro" id="studio">
        <div className="orbit-label">THE ORBIT EXPERIENCE</div>

        <div className="orbit-intro-grid">
          <h2>
            Beauty
            <br />
            should feel
            <br />
            <span>personal.</span>
          </h2>

          <div className="orbit-intro-copy">
            <p>
              We believe great hair starts with understanding you — your
              features, your lifestyle and the way you want to feel.
            </p>

            <p>
              Every appointment is considered from consultation to finish,
              creating a relaxed studio experience and a result that feels
              naturally yours.
            </p>

            <div className="orbit-line" />

            <span className="orbit-small-note">
              CONSIDERED BEAUTY. MODERN CRAFT.
            </span>
          </div>
        </div>
      </section>

      <section className="orbit-feature-image">
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2200&q=90"
          alt="Hair styling"
        />

        <div className="orbit-feature-caption">
          <span>THE STUDIO</span>
          <span>CRAFTED WITH ATTENTION</span>
        </div>
      </section>

      <section className="orbit-services" id="services">
        <div className="orbit-label">OUR SERVICES</div>

        <div className="orbit-services-heading">
          <h2>
            Designed
            <br />
            around
            <br />
            <span>you.</span>
          </h2>

          <p>
            From everyday refinement to complete transformations, our services
            are built around detail, quality and individuality.
          </p>
        </div>

        <div className="orbit-service-list">
          {services.map(([number, title, description]) => (
            <article className="orbit-service" key={number}>
              <span className="orbit-service-number">{number}</span>

              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

              <span className="orbit-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="orbit-dark" id="experience">
        <div className="orbit-dark-top">
          <span>THE ORBIT STANDARD</span>
          <span>ORBIT / 2026</span>
        </div>

        <div className="orbit-dark-content">
          <div className="orbit-circle">
            <span>O</span>
          </div>

          <div>
            <p className="orbit-label">THE EXPERIENCE</p>

            <h2>
              Beautiful
              <br />
              by
              <br />
              <span>design.</span>
            </h2>

            <p className="orbit-dark-copy">
              From the first conversation to the final mirror check, every
              detail is part of the experience.
            </p>
          </div>
        </div>

        <div className="orbit-dark-footer">
          <span>CONSULT</span>
          <span>CREATE</span>
          <span>REFINE</span>
          <span>REVEAL</span>
        </div>
      </section>

      <section className="orbit-experiences">
        <div className="orbit-label">OUR APPROACH</div>

        <h2>
          Every detail
          <br />
          <span>matters.</span>
        </h2>

        <div className="orbit-experience-list">
          {experiences.map(([number, title, description]) => (
            <article className="orbit-experience" key={number}>
              <span>{number}</span>

              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="orbit-gallery">
        <div className="orbit-gallery-large">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=90"
            alt="Modern beauty salon"
          />
        </div>

        <div className="orbit-gallery-small">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=90"
            alt="Beauty salon interior"
          />
        </div>
      </section>

      <section className="orbit-transformations">
        <div className="orbit-transformations-head">
          <div>
            <p className="orbit-label">TRANSFORMATION GALLERY</p>
            <h2>
              Before the
              <br />
              <span>magic.</span>
            </h2>
          </div>

          <p>
            Hair transformations, colour moments and styling details
            captured inside the Orbit studio.
          </p>
        </div>

        <div className="orbit-transformation-grid">

          <article className="orbit-transformation orbit-transform-pink">
            <div className="orbit-transform-images">
              <div>
                <span>STARTING POINT</span>
                <img
                  src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=90"
                  alt="Hair before styling"
                />
              </div>

              <div>
                <span>FINISHED LOOK</span>
                <img
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=90"
                  alt="Styled hair"
                />
              </div>
            </div>

            <div className="orbit-transform-caption">
              <strong>01 / SIGNATURE COLOUR</strong>
              <span>Soft dimension · Gloss finish</span>
            </div>
          </article>

          <article className="orbit-transformation orbit-transform-aqua">
            <div className="orbit-transform-images">
              <div>
                <span>STARTING POINT</span>
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=90"
                  alt="Hair preparation"
                />
              </div>

              <div>
                <span>FINISHED LOOK</span>
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=90"
                  alt="Finished salon style"
                />
              </div>
            </div>

            <div className="orbit-transform-caption">
              <strong>02 / MODERN CUT</strong>
              <span>Shape · Movement · Finish</span>
            </div>
          </article>

          <article className="orbit-transformation orbit-transform-yellow">
            <div className="orbit-transform-images">
              <div>
                <span>STARTING POINT</span>
                <img
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=90"
                  alt="Salon styling preparation"
                />
              </div>

              <div>
                <span>FINISHED LOOK</span>
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90"
                  alt="Finished beauty look"
                />
              </div>
            </div>

            <div className="orbit-transform-caption">
              <strong>03 / OCCASION STYLE</strong>
              <span>Texture · Volume · Detail</span>
            </div>
          </article>

        </div>

        <div className="orbit-colour-strip">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="orbit-quote">
        <p className="orbit-label">A SPACE FOR YOU</p>

        <h2>
          Come in
          <br />
          <span>as yourself.</span>
        </h2>

        <p>
          Leave feeling refreshed, confident and completely yourself.
        </p>
      </section>

      <section className="orbit-contact" id="contact">
        <div className="orbit-label">BOOK YOUR VISIT</div>

        <h2>
          Ready for
          <br />
          your next
          <br />
          <span>look?</span>
        </h2>

        <p>
          Tell us what you have in mind and our team will help you find the
          right service for your visit.
        </p>

        <div className="orbit-contact-actions">
          <a
            href="https://wa.me/000000000000"
            className="orbit-contact-button"
          >
            WHATSAPP US <span>↗</span>
          </a>

          <a
            href="mailto:hello@orbitbeauty.com"
            className="orbit-contact-button orbit-contact-light"
          >
            SEND AN ENQUIRY <span>↗</span>
          </a>
        </div>
      </section>

      <footer className="orbit-footer">
        <div className="orbit-footer-top">
          <div>
            <div className="orbit-footer-brand">
              ORBIT<span>.</span>
            </div>

            <p>BEAUTY STUDIO</p>
          </div>

          <div className="orbit-footer-links">
            <a href="#services">Services</a>
            <a href="#studio">Studio</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="orbit-footer-bottom">
          <span>CONCEPT BEAUTY WEBSITE</span>
          <span>DESIGNED &amp; DEVELOPED BY VRLS SOLUTIONS</span>
          <span>ORBIT / 2026</span>
        </div>

        <a href="/" className="orbit-back-home">
          BACK TO VRLS SOLUTIONS ↑
        </a>
      </footer>

    </main>
  )
}
