import './GulfCoreTrading.css'

const products = [
  {
    number: '01',
    title: 'Industrial Materials',
    text: 'Sourced materials for construction, manufacturing and infrastructure requirements.',
  },
  {
    number: '02',
    title: 'Food & Commodities',
    text: 'Reliable sourcing and supply of selected food products and commercial commodities.',
  },
  {
    number: '03',
    title: 'Consumer Products',
    text: 'Market-ready products sourced through dependable international supply channels.',
  },
  {
    number: '04',
    title: 'Specialised Sourcing',
    text: 'Purpose-driven sourcing for products with specific commercial requirements.',
  },
]

const process = [
  ['01', 'Understand', 'We identify the product, specification and destination requirements.'],
  ['02', 'Source', 'We connect requirements with suitable international supply partners.'],
  ['03', 'Verify', 'Products and documentation are reviewed against agreed requirements.'],
  ['04', 'Coordinate', 'Logistics and delivery are coordinated from origin to destination.'],
]

export default function GulfCoreTrading() {
  return (
    <main className="gulfcore-demo">

      {/* NAVIGATION */}
      <header className="gulfcore-nav">
        <a href="/" className="gulfcore-logo">
          GULF<span>CORE</span>
        </a>

        <nav>
          <a href="#about">About</a>
          <a href="#sectors">Sectors</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="gulfcore-nav-cta">
          Start a Conversation <span>↗</span>
        </a>
      </header>

      {/* HERO */}
      <section className="gulfcore-hero">
        <div className="gulfcore-hero-image" />

        <div className="gulfcore-hero-overlay" />

        <div className="gulfcore-hero-content">
          <p className="gulfcore-eyebrow">INTERNATIONAL TRADING / SOURCING / SUPPLY</p>

          <h1>
            Trade
            <br />
            without
            <br />
            <em>borders.</em>
          </h1>

          <div className="gulfcore-hero-bottom">
            <p>
              Connecting businesses with products,
              suppliers and opportunities across
              international markets.
            </p>

            <a href="#about" className="gulfcore-circle-link">
              <span>↓</span>
            </a>
          </div>
        </div>

        <div className="gulfcore-hero-code">
          GC / 001
        </div>
      </section>

      {/* INTRO */}
      <section className="gulfcore-intro" id="about">
        <div className="gulfcore-section-label">
          <span>01</span>
          WHO WE ARE
        </div>

        <div className="gulfcore-intro-grid">
          <h2>
            Built around
            <br />
            <span>movement.</span>
          </h2>

          <div className="gulfcore-intro-copy">
            <p className="gulfcore-large-copy">
              GulfCore connects businesses to international
              supply opportunities through practical sourcing,
              trading and logistics coordination.
            </p>

            <p>
              From identifying suitable products to coordinating
              supply, every requirement is approached with
              clarity, communication and commercial purpose.
            </p>

            <a href="#sectors" className="gulfcore-text-link">
              Explore our sectors <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* IMAGE STATEMENT */}
      <section className="gulfcore-statement">
        <div className="gulfcore-statement-image" />

        <div className="gulfcore-statement-card">
          <span>GLOBAL / LOCAL</span>
          <h3>
            From source
            <br />
            to destination.
          </h3>
          <p>
            International reach with a clear understanding
            of the markets and businesses we serve.
          </p>
        </div>
      </section>

      {/* SECTORS */}
      <section className="gulfcore-sectors" id="sectors">
        <div className="gulfcore-section-label">
          <span>02</span>
          PRODUCTS & SECTORS
        </div>

        <div className="gulfcore-section-heading">
          <h2>
            What moves
            <br />
            <span>business forward.</span>
          </h2>

          <p>
            Flexible sourcing across selected product
            categories and commercial requirements.
          </p>
        </div>

        <div className="gulfcore-products">
          {products.map((product) => (
            <article className="gulfcore-product" key={product.number}>
              <span className="gulfcore-product-number">
                {product.number}
              </span>

              <div>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
              </div>

              <span className="gulfcore-product-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      {/* SOURCING */}
      <section className="gulfcore-sourcing">
        <div className="gulfcore-sourcing-image" />

        <div className="gulfcore-sourcing-content">
          <span className="gulfcore-dark-label">03 / SOURCING</span>

          <h2>
            The right
            <br />
            product.
            <br />
            <em>The right source.</em>
          </h2>

          <p>
            Finding the right supplier is only part of the
            equation. We focus on understanding specifications,
            commercial requirements and delivery expectations
            before moving forward.
          </p>

          <div className="gulfcore-sourcing-list">
            <div>
              <span>01</span>
              <strong>Requirement</strong>
            </div>
            <div>
              <span>02</span>
              <strong>Supplier Network</strong>
            </div>
            <div>
              <span>03</span>
              <strong>Product Review</strong>
            </div>
            <div>
              <span>04</span>
              <strong>Commercial Coordination</strong>
            </div>
          </div>
        </div>
      </section>

      {/* LOGISTICS */}
      <section className="gulfcore-logistics">
        <div className="gulfcore-section-label">
          <span>04</span>
          SUPPLY & LOGISTICS
        </div>

        <div className="gulfcore-logistics-grid">
          <div>
            <h2>
              Moving
              <br />
              <span>with purpose.</span>
            </h2>
          </div>

          <div className="gulfcore-logistics-copy">
            <p>
              A successful trade does not end when a product
              is sourced. Timing, documentation, coordination
              and delivery all matter.
            </p>

            <div className="gulfcore-logistics-points">
              <div>
                <span>01</span>
                <strong>Supplier Coordination</strong>
              </div>
              <div>
                <span>02</span>
                <strong>Documentation</strong>
              </div>
              <div>
                <span>03</span>
                <strong>Freight Coordination</strong>
              </div>
              <div>
                <span>04</span>
                <strong>Delivery Planning</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="gulfcore-process" id="process">
        <div className="gulfcore-section-label">
          <span>05</span>
          OUR PROCESS
        </div>

        <div className="gulfcore-section-heading">
          <h2>
            Simple steps.
            <br />
            <span>Clear movement.</span>
          </h2>
        </div>

        <div className="gulfcore-process-grid">
          {process.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* GLOBAL NETWORK */}
      <section className="gulfcore-network">
        <div className="gulfcore-network-map" />

        <div className="gulfcore-network-content">
          <span>06 / INTERNATIONAL REACH</span>

          <h2>
            One connected
            <br />
            <em>market.</em>
          </h2>

          <p>
            We work across international supply channels,
            helping businesses connect requirements with
            suitable sourcing opportunities.
          </p>
        </div>

        <div className="gulfcore-network-markers">
          <i className="marker-one" />
          <i className="marker-two" />
          <i className="marker-three" />
        </div>
      </section>

      {/* CTA */}
      <section className="gulfcore-contact" id="contact">
        <div className="gulfcore-contact-inner">
          <span>START A CONVERSATION</span>

          <h2>
            Have a product
            <br />
            in mind?
          </h2>

          <p>
            Tell us what you are looking for.
            Let's explore the right way forward.
          </p>

          <div className="gulfcore-contact-actions">
            <a href="mailto:hello@gulfcoretrading.com">
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
      <footer className="gulfcore-footer">
        <div className="gulfcore-footer-main">
          <div>
            <a href="/" className="gulfcore-footer-logo">
              GULF<span>CORE</span>
            </a>

            <p>
              International trading,
              sourcing and supply.
            </p>
          </div>

          <div className="gulfcore-footer-links">
            <a href="#about">About</a>
            <a href="#sectors">Sectors</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>

          <a href="/" className="gulfcore-back-home">
            BACK TO VRLS SOLUTIONS ↑
          </a>
        </div>

        <div className="gulfcore-footer-bottom">
          <span>CONCEPT TRADING WEBSITE</span>
          <span>DESIGNED &amp; DEVELOPED BY VRLS SOLUTIONS</span>
          <span>GULFCORE / 2026</span>
        </div>
      </footer>

    </main>
  )
}
