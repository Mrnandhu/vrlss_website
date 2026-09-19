import { ArrowRight, CalendarDays, Users } from 'lucide-react'

function BookingType({ onSelect }) {
  return (
    <section className="booking-type">
      <div className="booking-intro">
        <span className="booking-eyebrow">
          RESERVATIONS
        </span>

        <h1>
          Make space
          <br />
          for the moment.
        </h1>

        <p>
          Choose the experience you'd like to arrange.
        </p>
      </div>

      <div className="booking-options">
        <button
          type="button"
          className="booking-option booking-option-party"
          onClick={() => onSelect('party')}
        >
          <div className="booking-option-icon">
            <Users size={26} />
          </div>

          <div className="booking-option-content">
            <span>01 / PRIVATE EXPERIENCE</span>

            <h2>Mini Party Hall</h2>

            <p>
              A private space concept for birthdays,
              anniversaries, celebrations and intimate gatherings.
            </p>

            <strong>10–30 guests</strong>
          </div>

          <ArrowRight size={22} />
        </button>

        <button
          type="button"
          className="booking-option booking-option-table"
          onClick={() => onSelect('table')}
        >
          <div className="booking-option-icon">
            <CalendarDays size={26} />
          </div>

          <div className="booking-option-content">
            <span>02 / TABLE RESERVATION</span>

            <h2>Seat / Table Booking</h2>

            <p>
              Explore the restaurant layout, choose your
              table and select a preferred date and time.
            </p>

            <strong>Choose your table</strong>
          </div>

          <ArrowRight size={22} />
        </button>
      </div>
    </section>
  )
}

export default BookingType
