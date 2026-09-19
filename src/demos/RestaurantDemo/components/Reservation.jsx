import { ArrowUpRight } from 'lucide-react'

function Reservation() {
  return (
    <section className="restaurant-section reservation-section" id="reservations">
      <div className="restaurant-container">
        <div className="reservation-content">
          <span className="restaurant-eyebrow">RESERVATIONS</span>

          <h2>
            Save your
            <br />
            seat.
          </h2>

          <p>
            Choose your dining experience and continue to our
            reservation concept.
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
