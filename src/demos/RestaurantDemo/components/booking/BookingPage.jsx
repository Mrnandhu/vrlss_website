import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Users,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react'
import TableBooking from './TableBooking'
import './BookingPage.css'

function BookingPage() {
  const params = new URLSearchParams(window.location.search)
  const type = params.get('type')
  const step = params.get('step')

  const isTable = type === 'table'
  const isParty = type === 'party'
  const isTableLayout = isTable && step === 'layout'

  const goHome = () => {
    window.location.href = '/demos/restaurant'
  }

  const chooseTable = () => {
    window.location.href = '/demos/restaurant/booking?type=table'
  }

  const chooseParty = () => {
    window.location.href = '/demos/restaurant/booking?type=party'
  }

  if (isTableLayout) {
    return <TableBooking />
  }

  return (
    <div className="booking-page">
      <header className="booking-header">
        <a
          href="/demos/restaurant"
          className="booking-brand"
          aria-label="Return to EMBER & LEAF"
        >
          <span className="booking-brand-mark">E</span>

          <span>
            <strong>EMBER &amp; LEAF</strong>
            <small>RESTAURANT CONCEPT</small>
          </span>
        </a>

        <button
          type="button"
          className="booking-back"
          onClick={goHome}
        >
          <ArrowLeft size={15} />
          Back to restaurant
        </button>
      </header>

      <main className="booking-main">
        <section className="booking-intro">
          <div className="booking-eyebrow">
            <span />
            RESERVATIONS
          </div>

          <h1>
            Make space
            <br />
            for the evening.
          </h1>

          <p>
            Choose how you would like to experience EMBER &amp; LEAF.
            Select a table for your dining visit or enquire about our
            private party hall.
          </p>
        </section>

        {!isTable && !isParty && (
          <section className="booking-choice-grid">
            <button
              type="button"
              className="booking-choice booking-choice-table"
              onClick={chooseTable}
            >
              <div className="booking-choice-top">
                <span className="booking-icon">
                  <UtensilsCrossed size={22} />
                </span>

                <ArrowUpRight size={20} />
              </div>

              <div className="booking-choice-number">01</div>

              <h2>Book a Table</h2>

              <p>
                Reserve a normal dining table and choose your preferred
                date, time and seating.
              </p>

              <span className="booking-choice-link">
                Continue to table booking
                <ArrowUpRight size={15} />
              </span>
            </button>

            <button
              type="button"
              className="booking-choice booking-choice-party"
              onClick={chooseParty}
            >
              <div className="booking-choice-top">
                <span className="booking-icon">
                  <Sparkles size={22} />
                </span>

                <ArrowUpRight size={20} />
              </div>

              <div className="booking-choice-number">02</div>

              <h2>Mini Party Hall</h2>

              <p>
                Plan a private celebration, birthday, anniversary or
                intimate gathering for 10–30 guests.
              </p>

              <span className="booking-choice-link">
                Continue to party hall
                <ArrowUpRight size={15} />
              </span>
            </button>
          </section>
        )}

        {isTable && (
          <section className="booking-selected-panel">
            <div className="booking-selected-icon">
              <UtensilsCrossed size={24} />
            </div>

            <div className="booking-selected-content">
              <span className="booking-eyebrow">TABLE RESERVATION</span>

              <h2>Choose your table.</h2>

              <p>
                Your next step will be selecting an available table,
                followed by your date, time and guest details.
              </p>

              <div className="booking-feature-row">
                <span>
                  <CalendarDays size={16} />
                  Choose a date
                </span>

                <span>
                  <Users size={16} />
                  Select guests
                </span>
              </div>

              <button
                type="button"
                className="booking-primary"
                onClick={() => {
                  window.location.href =
                    '/demos/restaurant/booking?type=table&step=layout'
                }}
              >
                Continue
                <ArrowUpRight size={17} />
              </button>
            </div>
          </section>
        )}

        {isParty && (
          <section className="booking-selected-panel booking-party-panel">
            <div className="booking-selected-icon">
              <Sparkles size={24} />
            </div>

            <div className="booking-selected-content">
              <span className="booking-eyebrow">PRIVATE DINING</span>

              <h2>Your celebration, your space.</h2>

              <p>
                Our mini party hall concept is designed for private
                celebrations and gatherings of 10–30 guests.
              </p>

              <div className="booking-feature-row">
                <span>
                  <CalendarDays size={16} />
                  Choose a date
                </span>

                <span>
                  <Users size={16} />
                  10–30 guests
                </span>
              </div>

              <button
                type="button"
                className="booking-primary"
                onClick={() => {
                  window.location.href =
                    '/demos/restaurant/booking?type=party&step=details'
                }}
              >
                Continue
                <ArrowUpRight size={17} />
              </button>
            </div>
          </section>
        )}

        <div className="booking-demo-note">
          <span>VRLS DEMO / CONCEPT</span>
          <p>
            This reservation interface is a demonstration of a restaurant
            booking experience. It does not create a real reservation.
          </p>
        </div>
      </main>

      <footer className="booking-footer">
        <span>EMBER &amp; LEAF</span>
        <span>Restaurant website concept by VRLS Solutions</span>
      </footer>
    </div>
  )
}

export default BookingPage
