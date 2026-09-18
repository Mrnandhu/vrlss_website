import './RestaurantDemo.css'

function RestaurantDemo() {
  return (
    <div className="restaurant-demo">
      <header className="restaurant-demo-nav">
        <div className="restaurant-demo-logo">
          <span>EL</span>
          <div>
            <strong>EMBER & LEAF</strong>
            <small>RESTAURANT CONCEPT</small>
          </div>
        </div>

        <a href="/" className="restaurant-back">
          ← Back to VRLS
        </a>
      </header>

      <main className="restaurant-demo-main">
        <section className="restaurant-demo-hero">
          <span className="restaurant-demo-label">
            VRLS DEMO / CONCEPT
          </span>

          <h1>
            Fire,
            <br />
            <em>flavour</em> & nature.
          </h1>

          <p>
            A premium restaurant website concept demonstrating
            responsive design, navigation and interactive experiences.
          </p>

          <button
            onClick={() =>
              document
                .getElementById('restaurant-demo-menu')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Explore the concept ↓
          </button>
        </section>

        <section
          className="restaurant-demo-menu"
          id="restaurant-demo-menu"
        >
          <span className="restaurant-demo-label">
            THE MENU
          </span>

          <h2>From the <em>kitchen.</em></h2>

          <div className="restaurant-demo-cards">
            <article>
              <span>01</span>
              <h3>Seasonal Starter</h3>
              <p>
                A concept menu item designed to demonstrate
                restaurant content presentation.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Signature Main</h3>
              <p>
                A concept menu item designed to demonstrate
                premium food presentation.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>House Dessert</h3>
              <p>
                A concept menu item designed to demonstrate
                menu browsing and visual hierarchy.
              </p>
            </article>
          </div>
        </section>

        <section className="restaurant-demo-reservation">
          <span className="restaurant-demo-label">
            RESERVATIONS
          </span>

          <h2>
            Save a seat at the <em>table.</em>
          </h2>

          <p>
            Reservation interaction shown as a website concept.
            No real booking is submitted.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              alert('Demo only — no reservation was submitted.')
            }}
          >
            <input
              type="text"
              placeholder="Your name"
              required
            />

            <input
              type="email"
              placeholder="Email"
              required
            />

            <button type="submit">
              Request Reservation →
            </button>
          </form>
        </section>
      </main>

      <footer className="restaurant-demo-footer">
        <strong>EMBER & LEAF</strong>
        <span>VRLS Solutions demo concept</span>
      </footer>
    </div>
  )
}

export default RestaurantDemo
