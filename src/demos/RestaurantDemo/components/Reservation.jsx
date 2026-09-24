import { ArrowUpRight } from 'lucide-react'

function Reservation() {
  return (
    <section className="restaurant-section reservation-section" id="reservations">
      <div className="restaurant-container">
        <div className="reservation-content">
          <span className="restaurant-eyebrow">PLAN YOUR VISIT</span>

          <h2>
            Ready for
            <br />
            the table?
          </h2>

          <p>
            Explore the menu first, then reserve a table when you're
            ready to visit the restaurant.
          </p>

          <a
            href="/demos/restaurant/booking?type=table"
            className="reservation-book-button"
          >
            <span>Book a Table</span>
            <ArrowUpRight size={18} />
          </a>

          <span className="reservation-note">
            VRLS DEMO / CONCEPT
          </span>
        </div>
      </div>
    </section>
  )
}

export default Reservation
