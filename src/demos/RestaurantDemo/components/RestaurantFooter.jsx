import { ArrowUpRight } from 'lucide-react'
import { restaurantData } from '../data/restaurantData'

function RestaurantFooter() {
  const { brand, footer } = restaurantData

  return (
    <footer className="restaurant-footer">
      <div className="restaurant-container">
        <div className="restaurant-footer-top">
          <div className="restaurant-footer-brand">
            <span className="restaurant-footer-mark">E</span>

            <div>
              <h2>{brand.name}</h2>
              <p>{footer.description}</p>
            </div>
          </div>

          <a href="#top" className="restaurant-back-top">
            Back to top
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="restaurant-footer-grid">
          <div>
            <span className="footer-label">EXPLORE</span>

            <nav>
              {footer.links.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <span className="footer-label">CONCEPT</span>

            <p>
              EMBER & LEAF is a fictional restaurant concept created to
              demonstrate the web design and development capabilities of
              VRLS Solutions.
            </p>
          </div>

          <div>
            <span className="footer-label">SOCIAL</span>

            <a href="#top" className="footer-social">
              <span className="restaurant-instagram-icon">◎</span>
              Instagram concept
            </a>
          </div>
        </div>

        <div className="restaurant-footer-bottom">
          <span>© {new Date().getFullYear()} VRLS SOLUTIONS</span>
          <span>DEMO / CONCEPT WEBSITE</span>
        </div>
      </div>
    </footer>
  )
}

export default RestaurantFooter
