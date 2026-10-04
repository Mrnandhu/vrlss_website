import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${menuOpen ? 'mobile-menu-open' : ''}`}>
      <a
        href="#top"
        className="navbar-logo"
        aria-label="VRLS Solutions"
        onClick={closeMenu}
      >
        <img
          src="/vrls-logo.webp"
          alt="VRLS Solutions"
          className="navbar-logo-image"
          width="150"
          height="60"
          decoding="async"
        />
      </a>

      <nav className="navbar-links">
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#showcase" onClick={closeMenu}>Showcase</a>
        <a href="#process" onClick={closeMenu}>Our Process</a>
        <a href="#technology" onClick={closeMenu}>Technology</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>

      <a
        href="#contact"
        className="navbar-cta"
        onClick={closeMenu}
      >
        Start a Project
        <span>↗</span>
      </a>

      <button
        className="navbar-mobile-toggle"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="navbar-mobile-menu">
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#showcase" onClick={closeMenu}>Showcase</a>
        <a href="#process" onClick={closeMenu}>Our Process</a>
        <a href="#technology" onClick={closeMenu}>Technology</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>

        <a
          href="#contact"
          className="navbar-mobile-cta"
          onClick={closeMenu}
        >
          Start a Project
          <span>↗</span>
        </a>
      </div>
    </header>
  )
}
