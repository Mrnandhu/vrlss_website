import { Check, ArrowLeft, CalendarDays, Users } from 'lucide-react'

function BookingConfirmation({
  booking,
  onBackToRestaurant,
  onNewBooking,
}) {
  return (
    <div className="booking-confirmation">
      <div className="confirmation-mark">
        <Check size={30} />
      </div>

      <span className="booking-eyebrow">DEMO / CONCEPT</span>

      <h1>Booking experience complete.</h1>

      <p className="confirmation-copy">
        This is a demonstration of how a completed restaurant booking could
        be presented to a customer. No real reservation has been created.
      </p>

      <div className="confirmation-card">
        <div className="confirmation-card-top">
          <span>{booking.type}</span>
          <strong>DEMO</strong>
        </div>

        {booking.table && (
          <div className="confirmation-row">
            <span>Table</span>
            <strong>{booking.table}</strong>
          </div>
        )}

        <div className="confirmation-row">
          <span>
            <CalendarDays size={15} />
            Date
          </span>
          <strong>{booking.date}</strong>
        </div>

        {booking.time && (
          <div className="confirmation-row">
            <span>Time</span>
            <strong>{booking.time}</strong>
          </div>
        )}

        <div className="confirmation-row">
          <span>
            <Users size={15} />
            Guests
          </span>
          <strong>{booking.guests}</strong>
        </div>

        {booking.table && (
          <div className="confirmation-row">
            <span>Table capacity</span>
            <strong>{booking.seats}</strong>
          </div>
        )}

        {booking.type === 'Mini Party Hall' && (
          <div className="confirmation-row">
            <span>Experience</span>
            <strong>Private hall</strong>
          </div>
        )}
      </div>

      <div className="confirmation-actions">
        <button
          type="button"
          className="booking-primary-button"
          onClick={onBackToRestaurant}
        >
          <ArrowLeft size={17} />
          Back to restaurant
        </button>

        <button
          type="button"
          className="booking-secondary-button"
          onClick={onNewBooking}
        >
          Make another demo booking
        </button>
      </div>
    </div>
  )
}

export default BookingConfirmation
