import { useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Users } from 'lucide-react'

function PartyHallBooking({ onBack, onComplete }) {
  const [guests, setGuests] = useState(10)
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!date || !name.trim() || !email.trim()) return

    onComplete({
      type: 'Mini Party Hall',
      guests,
      date,
      name: name.trim(),
      email: email.trim(),
    })
  }

  return (
    <section className="booking-form-section">
      <button type="button" className="booking-step-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="booking-form-heading">
        <span className="booking-eyebrow">01 / PRIVATE EXPERIENCE</span>
        <h1>Mini Party Hall</h1>
        <p>
          Arrange a private celebration for 10–30 guests.
        </p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-form-card">
          <div className="booking-field">
            <label htmlFor="party-guests">
              <Users size={16} />
              Guests
            </label>

            <select
              id="party-guests"
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
            >
              {Array.from({ length: 21 }, (_, index) => index + 10).map(
                (value) => (
                  <option value={value} key={value}>
                    {value} guests
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="booking-field">
            <label htmlFor="party-date">
              <CalendarDays size={16} />
              Preferred date
            </label>

            <input
              id="party-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          <div className="booking-field">
            <label htmlFor="party-name">Your name</label>

            <input
              id="party-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="booking-field">
            <label htmlFor="party-email">Email</label>

            <input
              id="party-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="booking-demo-note">
          <span>DEMO / CONCEPT</span>
          <p>
            This form demonstrates the booking experience. It does not create
            a real restaurant reservation.
          </p>
        </div>

        <button type="submit" className="booking-primary-button">
          Continue
          <ArrowRight size={17} />
        </button>
      </form>
    </section>
  )
}

export default PartyHallBooking
