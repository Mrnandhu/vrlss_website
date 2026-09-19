import { ArrowUpRight } from 'lucide-react'
import { restaurantData } from '../data/restaurantData'

function Events() {
  const { events } = restaurantData

  return (
    <section className="restaurant-section events-section" id="events">
      <div className="restaurant-container">
        <div className="events-heading">
          <div>
            <span className="restaurant-eyebrow">{events.eyebrow}</span>
            <h2>{events.title}</h2>
          </div>

          <p>{events.description}</p>
        </div>

        <div className="events-list">
          {events.items.map((event) => (
            <article className="event-row" key={event.date}>
              <div className="event-date">
                <strong>{event.date}</strong>
                <span>{event.month}</span>
              </div>

              <div className="event-copy">
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </div>

              <a href="#reservations" aria-label={`Enquire about ${event.title}`}>
                <ArrowUpRight size={18} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
