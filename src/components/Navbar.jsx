import { useEffect, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

const navItems = [
  { label: 'Work', href: '#demos' },
  { label: 'Services', href: '#services' },
  { label: 'Studio', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      document.querySelector('.navbar')?.classList.toggle('navbar-scrolled', window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <a href="#home" className="brand" aria-label="VRLSS home" onClick={closeMenu}>
        <div className="brand-text">
          <strong><span className="brand-v">V</span>RLS</strong>
          <small>DIGITAL STUDIO</small>
        </div>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
      </nav>

      <a href="#contact" className="nav-cta">
        Start a project <ArrowUpRight size={16} />
      </a>

      <button
        className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={21} strokeWidth={1.8} /> : <><span /><span /></>}
      </button>

      <div className={menuOpen ? 'mobile-nav-panel mobile-nav-open' : 'mobile-nav-panel'}>
        <div className="mobile-nav-inner">
          <div className="mobile-nav-label"><span /> NAVIGATION</div>
          <nav className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a key={item.label} href={item.href} onClick={closeMenu}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                {item.label}
                <ArrowUpRight size={17} />
              </a>
            ))}
          </nav>
          <a href="#contact" className="mobile-project-button" onClick={closeMenu}>
            Start a project <ArrowUpRight size={18} />
          </a>
          <div className="mobile-contact-details">
            <a href="mailto:sai.v.7079@gmail.com">Email<span>sai.v.7079@gmail.com</span></a>
            <a href="https://wa.me/919515294733" target="_blank" rel="noreferrer">WhatsApp<span>+91 9515294733</span></a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
