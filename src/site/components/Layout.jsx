import { useEffect, useState } from 'react'
import { Link } from '../router'
import Logo, { LogoMark } from './Logo'
import { IconMenu, IconClose, IconWhatsApp, IconMail } from '../icons'
import { brand, waLink, registration } from '../brand'
import { CurrencySelect } from '../currency'
import { cities, countries, placePath } from '../places'

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
    const foot = document.querySelector('.nx-footer')
    if (!foot || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => document.documentElement.classList.toggle('at-foot', e.isIntersecting), { threshold: 0.05 })
    io.observe(foot)
    return () => { io.disconnect(); document.documentElement.classList.remove('at-foot') }
  }, [path])
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
      <div className="pt" aria-hidden="true"><LogoMark size={56} /></div>
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
            <span className="nx-head-cur"><CurrencySelect id="nx-cur-head" label="Currency" compact /></span>
            <Link to="/contact?plan=demo" className="nx-btn nx-btn-primary nx-btn-sm">
              <span>Get a free demo</span>
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
        <div className="nx-sheet-row">
          <CurrencySelect id="nx-cur-sheet" label="Show prices in" />
        </div>
        <a className="nx-btn nx-btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
          <IconWhatsApp width={20} height={20} />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      {path !== '/contact' && (
        <nav className="nx-mbar" aria-label="Quick contact">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="nx-mbar-wa">
            <IconWhatsApp width={20} height={20} />
            <span>WhatsApp</span>
          </a>
          <Link to="/contact?plan=demo" className="nx-mbar-demo">Get a free demo</Link>
        </nav>
      )}

      <footer className="nx-footer">
        <div className="nx-wrap nx-foot-top">
          <div className="nx-foot-brand">
            <Link to="/" className="nx-brand" aria-label={`${brand.name} home`}>
              <LogoMark size={32} />
              <span className="nx-logo-text">{brand.name}</span>
            </Link>
            <p>Websites and marketing for small businesses.</p>
          </div>
          <div className="nx-foot-contact">
            <a className="nx-foot-btn is-main" href={waLink()} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp width={18} height={18} /> WhatsApp
            </a>
            <a className="nx-foot-btn" href={`mailto:${brand.email}`}>
              <IconMail width={18} height={18} /> Email
            </a>
          </div>
        </div>
        <nav className="nx-wrap nx-foot-links" aria-label="Footer">
          {[...nav.slice(1), { to: '/contact', label: 'Contact' }].map((n) => (
            <Link key={n.to} to={n.to}>{n.label}</Link>
          ))}
          {Object.entries(brand.social).filter(([, u]) => u).map(([k, u]) => (
            <a key={k} href={u} target="_blank" rel="noopener noreferrer">{k.charAt(0).toUpperCase() + k.slice(1)}</a>
          ))}
        </nav>
        <nav className="nx-wrap nx-foot-places" aria-label="Areas we serve">
          <span>Web design in</span>
          {cities.map((c) => <Link key={c.slug} to={placePath(c)}>{c.name}</Link>)}
          {countries.map((c) => <Link key={c.slug} to={placePath(c)}>{c.short}</Link>)}
          <Link to="/te" lang="te">తెలుగు</Link>
        </nav>
        <div className="nx-wordmark" aria-hidden="true">
          <div className="nx-wm-track" data-marquee="-1" data-speed="0.6">
            {[0, 1].map((k) => (
              <span key={k}>
                <b>VRLS Solutions</b><i /><b>Websites</b><i /><b>Marketing</b><i />
              </span>
            ))}
          </div>
        </div>
        <div className="nx-wrap nx-footer-base">
          <p>
            © {new Date().getFullYear()} {brand.name}, {brand.location}
            {registration.udyam && <>. Udyam {registration.udyam}</>}
            {registration.gstin && <>. GSTIN {registration.gstin}</>}
          </p>
          <p className="nx-foot-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/refunds">Refunds</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
