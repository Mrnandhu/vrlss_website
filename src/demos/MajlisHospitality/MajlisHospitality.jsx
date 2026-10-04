import './MajlisHospitality.css'

const experiences = [
  {
    number: '01',
    title: 'Dining',
    text: 'A considered dining experience where flavour, presentation and atmosphere come together.',
  },
  {
    number: '02',
    title: 'Private Gatherings',
    text: 'Intimate spaces created for celebrations, conversations and meaningful occasions.',
  },
  {
    number: '03',
    title: 'Hospitality',
    text: 'Attentive service shaped around comfort, detail and genuine Arabian hospitality.',
  },
  {
    number: '04',
    title: 'Events',
    text: 'Flexible hospitality experiences designed for gatherings that deserve a distinct setting.',
  },
]

const journey = [
  ['01', 'Arrival', 'A considered first impression sets the tone from the moment guests arrive.'],
  ['02', 'Discover', 'Spaces, flavours and details reveal themselves naturally throughout the experience.'],
  ['03', 'Gather', 'Food and hospitality create the space for conversations that stay with you.'],
  ['04', 'Remember', 'The experience continues long after the final course and farewell.'],
]

export default function MajlisHospitality() {
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="majlis-demo" id="top">
      <header className="majlis-nav">
        <a href="#top" className="majlis-brand" aria-label="Majlis Hospitality">
          <span className="majlis-mark">M</span>
          <span className="majlis-brand-copy">
            <strong>MAJLIS</strong>
            <small>HOSPITALITY</small>
          </span>
        </a>

        <nav className="majlis-nav-links">
          <a href="#story">Our Story</a>
          <a href="#experience">Experience</a>
          <a href="#spaces">Spaces</a>
          <a href="#journey">Journey</a>
        </nav>

        <a href="#reservation" className="majlis-nav-cta">
          Reserve a Table <span>↗</span>
        </a>
      </header>

      <main>
        <section className="majlis-hero">
          <div className="majlis-hero-image" />
          <div className="majlis-hero-overlay" />

          <div className="majlis-hero-content">
            <div className="majlis-eyebrow">
              <span />
              HOSPITALITY / DINING / EXPERIENCE
            </div>

            <h1>
              Where every
              <br />
              moment <em>matters.</em>
            </h1>

            <p>
              A contemporary hospitality experience shaped by food,
              atmosphere, gathering and the timeless art of welcoming people.
            </p>

            <div className="majlis-actions">
              <a href="#reservation" className="majlis-button majlis-button-blue">
                Reserve a Table <span>↗</span>
              </a>
              <a href="#experience" className="majlis-light-link">
                Explore the experience <span>↓</span>
              </a>
            </div>
          </div>

          <div className="majlis-hero-meta">
            <span>MAJLIS / HOSPITALITY</span>
            <span>DINING • GATHERING • CULTURE</span>
          </div>
        </section>

        <section className="majlis-story" id="story">
          <div className="majlis-section-label">
            <span>01</span>
            OUR STORY
          </div>

          <div className="majlis-story-grid">
            <h2>
              Hospitality is
              <br />
              about <em>how it feels.</em>
            </h2>

            <div className="majlis-story-copy">
              <p>
                Majlis is a contemporary interpretation of the gathering place:
                somewhere to share food, conversation and time together.
              </p>

              <p>
                Inspired by the generosity of Arabian hospitality, every detail
                is considered to make guests feel welcomed, comfortable and
                connected.
              </p>

              <a href="#spaces" className="majlis-inline-link">
                Discover our spaces <span>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="majlis-experience" id="experience">
          <div className="majlis-experience-image">
            <span>02 / THE EXPERIENCE</span>
          </div>

          <div className="majlis-experience-content">
            <div className="majlis-section-label majlis-label-light">
              <span>02</span>
              THE EXPERIENCE
            </div>

            <h2>
              More than
              <br />
              <em>a meal.</em>
            </h2>

            <p className="majlis-lead">
              From the first welcome to the final conversation, hospitality is
              expressed through food, service and the atmosphere around you.
            </p>

            <div className="majlis-experience-list">
              {experiences.map((item) => (
                <article className="majlis-experience-row" key={item.number}>
                  <span className="majlis-number">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <span className="majlis-arrow">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="majlis-statement">
          <div className="majlis-statement-image" />
          <div className="majlis-statement-overlay" />

          <div className="majlis-statement-content">
            <div className="majlis-eyebrow">
              <span />
              THE ART OF GATHERING
            </div>

            <h2>
              Good food.
              <br />
              Good company.
              <br />
              <em>Good memories.</em>
            </h2>
          </div>
        </section>

        <section className="majlis-spaces" id="spaces">
          <div className="majlis-spaces-head">
            <div className="majlis-section-label">
              <span>03</span>
              OUR SPACES
            </div>

            <h2>
              Designed for
              <br />
              <em>connection.</em>
            </h2>
          </div>

          <div className="majlis-space-grid">
            <article className="majlis-space-card majlis-space-large">
              <div className="majlis-space-image space-one" />
              <span>THE DINING ROOM</span>
              <h3>A table worth gathering around.</h3>
            </article>

            <article className="majlis-space-card">
              <div className="majlis-space-image space-two" />
              <span>THE MAJLIS</span>
              <h3>Conversations in comfort.</h3>
            </article>

            <article className="majlis-space-card">
              <div className="majlis-space-image space-three" />
              <span>THE TERRACE</span>
              <h3>Open air. Slow moments.</h3>
            </article>
          </div>
        </section>

        <section className="majlis-menu">
          <div className="majlis-menu-visual">
            <div className="majlis-menu-circle">
              <span>MAJLIS</span>
              <strong>+</strong>
              <span>TABLE</span>
            </div>
          </div>

          <div className="majlis-menu-copy">
            <div className="majlis-section-label">
              <span>04</span>
              THE TABLE
            </div>

            <h2>
              Flavours with
              <br />
              <em>a sense of place.</em>
            </h2>

            <p>
              A menu shaped around generous portions, considered ingredients
              and familiar flavours presented through a contemporary lens.
            </p>

            <div className="majlis-menu-items">
              <div>
                <span>01</span>
                <strong>Signature plates</strong>
                <p>Distinctive dishes designed to define the table.</p>
              </div>

              <div>
                <span>02</span>
                <strong>Shared experiences</strong>
                <p>Food designed to be placed at the centre and enjoyed together.</p>
              </div>

              <div>
                <span>03</span>
                <strong>Seasonal selection</strong>
                <p>A changing expression of ingredients and inspiration.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="majlis-journey" id="journey">
          <div className="majlis-journey-head">
            <div className="majlis-section-label majlis-label-light">
              <span>05</span>
              THE JOURNEY
            </div>

            <h2>
              From arrival
              <br />
              to <em>farewell.</em>
            </h2>
          </div>

          <div className="majlis-journey-list">
            {journey.map(([number, title, text]) => (
              <div className="majlis-journey-row" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="majlis-row-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>

        <section className="majlis-atmosphere">
          <div className="majlis-atmosphere-copy">
            <div className="majlis-section-label">
              <span>06</span>
              ATMOSPHERE
            </div>

            <h2>
              The details
              <br />
              create <em>the feeling.</em>
            </h2>

            <p>
              Light, texture, sound and space come together to create an
              atmosphere that feels effortless, intimate and distinctly Majlis.
            </p>
          </div>

          <div className="majlis-atmosphere-image" />
        </section>

        <section className="majlis-reservation" id="reservation">
          <div className="majlis-reservation-image" />
          <div className="majlis-reservation-overlay" />

          <div className="majlis-reservation-content">
            <div className="majlis-eyebrow">
              <span />
              YOUR TABLE AWAITS
            </div>

            <h2>
              Make time
              <br />
              for <em>something memorable.</em>
            </h2>

            <p>
              Join us for an evening of thoughtful food, warm hospitality and
              time well spent.
            </p>

            <a
              href="mailto:reservations@majlisshospitality.com"
              className="majlis-button majlis-button-white"
            >
              Make a Reservation <span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="majlis-footer">
        <div className="majlis-footer-top">
          <button type="button" onClick={goTop} className="majlis-brand majlis-footer-brand">
            <span className="majlis-mark">M</span>
            <span className="majlis-brand-copy">
              <strong>MAJLIS</strong>
              <small>HOSPITALITY</small>
            </span>
          </button>

          <div className="majlis-footer-links">
            <a href="#story">Our Story</a>
            <a href="#experience">Experience</a>
            <a href="#spaces">Spaces</a>
            <a href="#journey">Journey</a>
          </div>

          <a href="#reservation" className="majlis-footer-cta">
            Reserve a Table ↗
          </a>
        </div>

        <div className="majlis-footer-bottom">
          <span>CONCEPT HOSPITALITY WEBSITE</span>
          <span>DESIGNED &amp; DEVELOPED BY VRLS SOLUTIONS</span>
          <span>MAJLIS / 2026</span>
        </div>

        <a href="/" className="majlis-back-home">
          BACK TO VRLS SOLUTIONS ↑
        </a>
      </footer>
    </div>
  )
}
