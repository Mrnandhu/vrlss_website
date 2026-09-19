import { useEffect } from 'react'
import { X, Leaf } from 'lucide-react'

function DishModal({ dish, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="dish-modal-backdrop" onMouseDown={onClose}>
      <div
        className="dish-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="dish-modal-close"
          aria-label="Close dish details"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <span className="restaurant-eyebrow">{dish.category}</span>

        <span className="dish-modal-number">
          {String(dish.id).padStart(2, '0')}
        </span>

        <h2 id="dish-modal-title">{dish.name}</h2>

        <div className="dish-modal-price">{dish.price}</div>

        <p>{dish.description}</p>

        {dish.dietary.length > 0 && (
          <div className="dish-modal-dietary">
            {dish.dietary.map((item) => (
              <span key={item}>
                <Leaf size={13} />
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="dish-modal-footer">
          EMBER & LEAF · CONCEPT MENU
        </div>
      </div>
    </div>
  )
}

export default DishModal
