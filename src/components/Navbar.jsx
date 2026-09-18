import { useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

const navItems = [
  'Home',
  'Services',
  'Work',
  'Process',
  'Technologies',
  'Pricing',
  'About',
  'Contact',
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="navbar">

      {/* =====================================
          VRLS LOGO
      ===================================== */}

      <a
        href="#home"
        className="brand"
        aria-label="VRLS Solutions home"
        onClick={closeMenu}
      >
        <div className="brand-text">
          <strong>
            <span className="brand-v">V</span>RLS
          </strong>

          <small>SOLUTIONS</small>
        </div>
      </a>


      {/* =====================================
          DESKTOP NAVIGATION
      ===================================== */}

      <nav className="nav-links">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
      </nav>


      {/* =====================================
          DESKTOP CTA
      ===================================== */}

      <a
        href="#contact"
        className="nav-cta"
      >
        Start a Project
        <ArrowUpRight size={17} strokeWidth={2} />
      </a>


      {/* =====================================
          MOBILE MENU
      ===================================== */}

      <button
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <X size={22} strokeWidth={1.8} />
        ) : (
          <>
            <span />
            <span />
          </>
        )}
      </button>


      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      <div
        className={`mobile-nav-panel ${
          menuOpen ? 'mobile-nav-open' : ''
        }`}
      >
        <div className="mobile-nav-inner">

          <div className="mobile-nav-label">
            <span />
            NAVIGATION
          </div>

          <nav className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
              >
                <small>
                  {String(index + 1).padStart(2, '0')}
                </small>

                {item}

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.7}
                />
              </a>
            ))}
          </nav>


          <a
            href="#contact"
            className="mobile-project-button"
            onClick={closeMenu}
          >
            Start a Project
            <ArrowUpRight size={18} />
          </a>


          <div className="mobile-contact-details">

            <a
              href="https://wa.me/919515294733"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
              <span>+91 9515294733</span>
            </a>

            <a href="mailto:sai.v.7079@gmail.com">
              Email
              <span>sai.v.7079@gmail.com</span>
            </a>

          </div>

        </div>
      </div>

    </header>
  )
}

export default Navbar
