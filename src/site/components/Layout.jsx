import { useEffect, useState } from 'react'
import { Link } from '../router'
import Logo, { LogoMark } from './Logo'
import { IconMenu, IconClose, IconWhatsApp, IconMail, IconGlobe, IconLanguage } from '../icons'
import { LANGS } from '../demos/locales'
import { brand, waLink, registration } from '../brand'
import { CurrencySelect } from '../currency'
import { markets } from '../places'

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
            <Link to="/start" className="nx-btn nx-btn-primary nx-btn-sm">
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

      {!['/contact', '/start', '/studio/docs'].includes(path) && (
        <nav className="nx-mbar" aria-label="Quick contact">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="nx-mbar-wa">
            <IconWhatsApp width={20} height={20} />
            <span>WhatsApp</span>
          </a>
          <Link to="/start" className="nx-mbar-demo">Start a project</Link>
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
        </div>
        <div className="nx-wrap st-foot-reach">
          <div>
            <h3><IconGlobe width={16} height={16} /> Countries we serve</h3>
            <ul className="st-foot-tags">
              {markets.map(([cc, n, to]) => (
                <li key={cc}>{to ? <Link to={to}><b>{cc}</b>{n}</Link> : <span><b>{cc}</b>{n}</span>}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3><IconLanguage width={16} height={16} /> Languages we build in</h3>
            <ul className="st-foot-tags">
              {Object.entries(LANGS).map(([code, l]) => (
                <li key={code}><Link to={code === 'en' ? '/work' : `/work?lang=${code}`}>{l.name}{l.dir === 'rtl' && <small>RTL</small>}</Link></li>
              ))}
            </ul>
          </div>
        </div>
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
