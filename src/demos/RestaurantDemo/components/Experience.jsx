import { ArrowUpRight } from 'lucide-react'
import { restaurantData } from '../data/restaurantData'

function Experience() {
  const { experience } = restaurantData

  return (
    <section className="restaurant-section restaurant-experience" id="experience">
      <div className="restaurant-container">
        <div className="restaurant-section-intro">
          <span className="restaurant-eyebrow">{experience.eyebrow}</span>

          <div>
            <h2>{experience.title}</h2>
            <p>{experience.description}</p>

            <a href="#story" className="restaurant-inline-link">
              Our philosophy
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="experience-grid">
          {experience.highlights.map((item) => (
            <article className="experience-card" key={item.number}>
              <span className="experience-number">{item.number}</span>

              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>

              <span className="experience-line" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
