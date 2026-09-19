import { useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { restaurantData } from '../data/restaurantData'

function Gallery() {
  const [selected, setSelected] = useState(null)

  const currentIndex = selected
    ? restaurantData.gallery.findIndex((item) => item.id === selected.id)
    : -1

  const previous = () => {
    if (currentIndex < 0) return

    const index =
      (currentIndex - 1 + restaurantData.gallery.length) %
      restaurantData.gallery.length

    setSelected(restaurantData.gallery[index])
  }

  const next = () => {
    if (currentIndex < 0) return

    const index =
      (currentIndex + 1) % restaurantData.gallery.length

    setSelected(restaurantData.gallery[index])
  }

  return (
    <section className="restaurant-section gallery-section" id="gallery">
      <div className="restaurant-container">
        <div className="gallery-heading">
          <div>
            <span className="restaurant-eyebrow">THE SPACE</span>
            <h2>Moments around the table.</h2>
          </div>

          <p>
            A visual direction for the atmosphere, materials and rituals
            behind the EMBER & LEAF concept.
          </p>
        </div>

        <div className="gallery-grid">
          {restaurantData.gallery.map((item, index) => (
            <button
              type="button"
              className={`gallery-item gallery-item-${index + 1}`}
              key={item.id}
              onClick={() => setSelected(item)}
              aria-label={`Open ${item.label}`}
            >
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="gallery-lightbox"
          onMouseDown={() => setSelected(null)}
        >
          <button
            type="button"
            className="gallery-close"
            aria-label="Close gallery"
            onClick={() => setSelected(null)}
          >
            <X size={22} />
          </button>

          <button
            type="button"
            className="gallery-arrow gallery-arrow-left"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation()
              previous()
            }}
          >
            <ArrowLeft size={20} />
          </button>

          <figure onMouseDown={(event) => event.stopPropagation()}>
            <img src={selected.image} alt={selected.label} />
            <figcaption>{selected.label}</figcaption>
          </figure>

          <button
            type="button"
            className="gallery-arrow gallery-arrow-right"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation()
              next()
            }}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery
