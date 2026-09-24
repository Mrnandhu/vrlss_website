import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { restaurantData } from '../data/restaurantData'

function RestaurantNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMobileOpen(false)

  return (
    <header className={`restaurant-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="restaurant-nav-inner">
        <a className="restaurant-logo" href="/demos/restaurant">
          <span className="restaurant-logo-mark">E</span>
          <span>
            <strong>{restaurantData.brand.name}</strong>
            <small>RESTAURANT CONCEPT</small>
          </span>
        </a>

        <nav className="restaurant-desktop-nav" aria-label="Restaurant navigation">
          {restaurantData.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}

          <a
            className="restaurant-nav-cta"
            href="#menu"
          >
            Explore menu
            <ArrowUpRight size={15} />
          </a>
        </nav>

        <button
          type="button"
          className="restaurant-menu-toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <div className={`restaurant-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {restaurantData.navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}

        <a
          href="#menu"
          className="restaurant-mobile-reserve"
          onClick={(event) => {
            event.preventDefault()
            closeMenu()
            document.getElementById('menu')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }}
        >
          View the menu
          <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  )
}

export default RestaurantNav
