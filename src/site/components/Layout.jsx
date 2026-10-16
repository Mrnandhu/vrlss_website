import { useEffect, useState } from 'react'
import { Link } from '../router'
import Logo, { LogoMark } from './Logo'
import { IconMenu, IconClose, IconWhatsApp, IconMail } from '../icons'
import { brand, waLink, registration } from '../brand'
import { CurrencySelect } from '../currency'
import { cities, countries, placePath } from '../places'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/websites', label: 'Development' },
  { to: '/digital-marketing', label: 'Marketing' },
  { to: '/work', label: 'Work' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'Studio' },
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
              <span>Start a project</span>
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
          <Link to="/contact?plan=demo" className="nx-mbar-demo">Start a project</Link>
        </nav>
      )}

      <footer className="nx-footer st-foot">
        <div className="nx-wrap st-foot-grid">
          <div className="st-foot-brand">
            <Link to="/" className="nx-brand" aria-label={`${brand.name} home`}>
              <Logo height={44} />
            </Link>
            <p>Design, engineering and growth for brands worldwide.</p>
            <div className="st-foot-contact">
              <a className="nx-foot-btn is-main" href={waLink()} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp width={18} height={18} /> WhatsApp
              </a>
              <a className="nx-foot-btn" href={`mailto:${brand.email}`}>
                <IconMail width={18} height={18} /> {brand.email}
              </a>
            </div>
          </div>
          <nav className="st-foot-col" aria-label="Services">
            <h3>Services</h3>
            <Link to="/websites">Web development</Link>
            <Link to="/websites">E-commerce</Link>
            <Link to="/work">Web apps &amp; portals</Link>
            <Link to="/digital-marketing">SEO &amp; marketing</Link>
            <Link to="/pricing">Care &amp; hosting</Link>
          </nav>
          <nav className="st-foot-col" aria-label="Company">
            <h3>Company</h3>
            <Link to="/about">Studio</Link>
            <Link to="/work">Work</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Contact</Link>
            {Object.entries(brand.social).filter(([, u]) => u).map(([k, u]) => (
              <a key={k} href={u} target="_blank" rel="noopener noreferrer">{k.charAt(0).toUpperCase() + k.slice(1)}</a>
            ))}
          </nav>
          <nav className="st-foot-col" aria-label="Markets">
            <h3>Markets</h3>
            {countries.map((c) => <Link key={c.slug} to={placePath(c)}>{c.short}</Link>)}
            <Link to={placePath(cities[0])}>India</Link>
          </nav>
        </div>
        <nav className="nx-wrap nx-foot-places" aria-label="Cities in India">
          <span>India</span>
          {cities.map((c) => <Link key={c.slug} to={placePath(c)}>{c.name}</Link>)}
          <Link to="/te" lang="te">తెలుగు</Link>
        </nav>
        <div className="nx-wrap nx-footer-base">
          <p>
            © {new Date().getFullYear()} {brand.name}. {brand.location}
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
