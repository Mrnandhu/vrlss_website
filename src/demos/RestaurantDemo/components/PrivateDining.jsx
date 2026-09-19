import { ArrowUpRight, Check } from 'lucide-react'
import { restaurantData } from '../data/restaurantData'

function PrivateDining() {
  const { privateDining } = restaurantData

  return (
    <section className="private-dining-section" id="private-dining">
      <div className="private-dining-image" />

      <div className="private-dining-overlay" />

      <div className="private-dining-content">
        <span className="restaurant-eyebrow">{privateDining.eyebrow}</span>

        <h2>{privateDining.title}</h2>

        <p>{privateDining.description}</p>

        <div className="private-dining-features">
          {privateDining.features.map((feature) => (
            <span key={feature}>
              <Check size={14} />
              {feature}
            </span>
          ))}
        </div>

        <a href="/demos/restaurant/booking?type=party" className="restaurant-primary-button">
          Enquire about dining
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  )
}

export default PrivateDining
