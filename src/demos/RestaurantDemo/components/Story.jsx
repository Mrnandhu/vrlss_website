import { ArrowUpRight } from 'lucide-react'
import { restaurantData } from '../data/restaurantData'

function Story() {
  const { story } = restaurantData

  return (
    <section className="restaurant-section story-section" id="story">
      <div className="story-visual">
        <div className="story-image" />

        <div className="story-stamp">
          <span>EST.</span>
          <strong>E</strong>
          <span>CONCEPT</span>
        </div>
      </div>

      <div className="story-copy">
        <span className="restaurant-eyebrow">{story.eyebrow}</span>

        <h2>{story.title}</h2>

        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <a href="#private-dining" className="restaurant-inline-link">
          Explore private dining
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  )
}

export default Story
