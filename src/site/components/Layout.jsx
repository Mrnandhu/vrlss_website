import { useEffect, useState } from 'react'
import { Link } from '../router'
import Logo, { LogoMark } from './Logo'
import { IconMenu, IconClose, IconWhatsApp, IconMail } from '../icons'
import { brand, waLink } from '../brand'
import { CurrencySelect } from '../currency'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/websites', label: 'Websites' },
  { to: '/digital-marketing', label: 'Digital marketing' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
]

export default function Layout({ path, children }) {
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    document.documentElement.classList.toggle('nx-lock', open)
    return () => document.documentElement.classList.remove('nx-lock')
  }, [open])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="nx-app">
      <a className="nx-skip" href="#main">
        Skip to content
      </a>
      <header className="nx-header">
        <div className="nx-wrap nx-header-inner">
          <Link to="/" className="nx-brand" aria-label={`${brand.name} home`}>
            <Logo />
          </Link>
          <nav className="nx-nav" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} aria-current={path === n.to ? 'page' : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="nx-header-actions">
            <CurrencySelect id="nx-cur-head" label="Currency" compact />
            <Link to="/contact" className="nx-btn nx-btn-primary nx-btn-sm">
              <span>Get a free quote</span>
            </Link>
            <button
              type="button"
              className="nx-burger"
              aria-expanded={open}
              aria-controls="nx-sheet"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>
      <div id="nx-sheet" className={`nx-sheet${open ? ' is-open' : ''}`} hidden={!open}>
        <nav className="nx-sheet-nav" aria-label="Mobile">
          {[...nav, { to: '/contact', label: 'Contact' }].map((n) => (
            <Link key={n.to} to={n.to} aria-current={path === n.to ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <a className="nx-btn nx-btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
          <IconWhatsApp width={20} height={20} />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <footer className="nx-footer">
        <div className="nx-wrap nx-footer-grid">
          <div className="nx-footer-brand">
            <Link to="/" className="nx-brand" aria-label={`${brand.name} home`}>
              <LogoMark size={34} />
              <span className="nx-logo-text">{brand.name}</span>
            </Link>
            <p>
              Websites and digital marketing for businesses worldwide. Founder-led, remote-first and priced
              clearly.
            </p>
          </div>
          <nav aria-label="Services">
            <h2 className="nx-foot-h">Services</h2>
            <ul>
              <li><Link to="/websites">Website design</Link></li>
              <li><Link to="/digital-marketing">Digital marketing</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/work">Our work</Link></li>
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="nx-foot-h">Company</h2>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
          <div>
            <h2 className="nx-foot-h">Talk to us</h2>
            <ul>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp width={18} height={18} /> {brand.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`}>
                  <IconMail width={18} height={18} /> {brand.email}
                </a>
              </li>
              <li className="nx-foot-note">{brand.location} · Serving clients worldwide</li>
            </ul>
          </div>
        </div>
        <div className="nx-wrap nx-footer-base">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p>Prices in USD · Replies within one business day</p>
        </div>
      </footer>
    </div>
  )
}
