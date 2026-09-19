import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { restaurantData } from '../data/restaurantData'

function RestaurantHero() {
  const { brand } = restaurantData

  return (
    <section className="restaurant-hero" id="top">
      <div className="restaurant-hero-image" />

      <div className="restaurant-hero-overlay" />

      <div className="restaurant-hero-content">
        <div className="restaurant-demo-label">
          <span />
          {brand.eyebrow}
        </div>

        <p className="restaurant-hero-kicker">
          CONTEMPORARY OPEN-FIRE DINING
        </p>

        <h1>
          Fire,
          <br />
          <em>flavour</em>
          <br />
          & nature.
        </h1>

        <p className="restaurant-hero-description">
          {brand.description}
        </p>

        <div className="restaurant-hero-actions">
          <a href="#menu" className="restaurant-primary-button">
            Explore the menu
            <ArrowUpRight size={17} />
          </a>

          <a href="#experience" className="restaurant-text-button">
            Discover the experience
            <ArrowDown size={16} />
          </a>
        </div>
      </div>

      <div className="restaurant-hero-bottom">
        <span>VRLS SOLUTIONS · DIGITAL EXPERIENCE CONCEPT</span>
        <span>SCROLL TO EXPLORE</span>
      </div>

      <div className="restaurant-hero-orbit">
        <span>EMBER</span>
        <span>LEAF</span>
      </div>
    </section>
  )
}

export default RestaurantHero
