import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Leaf } from 'lucide-react'
import { restaurantData } from '../data/restaurantData'

const dishImageName = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const getDishImage = (dish) =>
  `/restaurant-menu/${dishImageName(dish.name)}.jpg`


function RestaurantMenu({ onSelectDish }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const filteredMenu = useMemo(() => {
    if (activeCategory === 'All') {
      return restaurantData.menu
    }

    return restaurantData.menu.filter(
      (dish) => dish.category === activeCategory,
    )
  }, [activeCategory])

  const visibleMenu = showAll
    ? filteredMenu
    : filteredMenu.slice(0, 12)

  const canExpand = filteredMenu.length > 12

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setShowAll(false)
  }

  return (
    <section className="restaurant-section restaurant-menu-section" id="menu">
      <div className="restaurant-container">
        <div className="menu-heading">
          <div>
            <span className="restaurant-eyebrow">THE MENU</span>
            <h2>The taste of Andhra.</h2>
          </div>

          <p>
            Bold regional flavours, traditional recipes and fiery Andhra
            favourites, prepared for the modern table.
          </p>
        </div>

        <div className="menu-filter-wrap">
          <div
            className="menu-filters"
            role="tablist"
            aria-label="Menu categories"
          >
            {restaurantData.menuCategories.map((category) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {visibleMenu.map((dish) => (
            <article
              className={`dish-card ${
                dish.featured ? 'dish-card-featured' : ''
              }`}
              key={dish.id}
            >
              <button
                type="button"
                className="dish-image-wrap"
                onClick={() => onSelectDish(dish)}
                aria-label={`View ${dish.name}`}
              >
                <img
                  src={getDishImage(dish)}
                  alt={dish.name}
                  loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
                />

                <div className="dish-image-overlay">
                  <span>VIEW DISH</span>
                  <ArrowUpRight size={17} />
                </div>

                {dish.featured && (
                  <span className="dish-featured-badge">
                    SIGNATURE
                  </span>
                )}
              </button>

              <div className="dish-card-content">
                <div className="dish-card-top">
                  <span className="dish-category">
                    {dish.category}
                  </span>

                  {dish.dietary.includes('Vegetarian') && (
                    <span className="dish-veg">
                      <Leaf size={13} />
                      Vegetarian
                    </span>
                  )}
                </div>

                <div className="dish-card-body">
                  <div className="dish-copy">
                    <span className="dish-number">
                      {String(dish.id).padStart(2, '0')}
                    </span>

                    <h3>{dish.name}</h3>

                    <p>{dish.description}</p>
                  </div>

                  <strong className="dish-price">
                    {dish.price}
                  </strong>
                </div>

                <button
                  type="button"
                  className="dish-details-button"
                  onClick={() => onSelectDish(dish)}
                >
                  View dish
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {canExpand && (
          <div className="menu-expand-wrap">
            <button
              type="button"
              className="menu-expand-button"
              onClick={() => setShowAll((value) => !value)}
            >
              {showAll ? 'Show featured selection' : 'View full menu'}
              <ArrowDown
                size={15}
                className={showAll ? 'is-open' : ''}
              />
            </button>
          </div>
        )}

        <div className="menu-note">
          <span>CONCEPT MENU</span>
          <p>
            Menu items and prices shown for demonstration purposes.
          </p>
        </div>
      </div>
    </section>
  )
}

export default RestaurantMenu
