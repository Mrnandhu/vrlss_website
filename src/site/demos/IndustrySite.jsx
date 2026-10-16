import { useEffect, useMemo, useRef, useState } from 'react'
import DemoShell from './DemoShell'
import { IconCheck } from '../icons'
import { Glyph } from './Scene'
import { industries, sectorName } from './industries'
import { UI, LANGS, versionsOf } from './locales'
import { useCurrency } from '../currency'
import { convertInrText } from '../prices'
import { Link } from '../router'

// Same site with every ₹ amount shown in the chosen currency
export function convertSite(site, code) {
  if (code === 'INR') return site
  const c = (t) => convertInrText(t, code)
  return {
    ...site,
    sub: c(site.sub),
    stats: site.stats.map(([n, l]) => [c(n), c(l)]),
    services: site.services.map(([t, d]) => [c(t), c(d)]),
    offer: [site.offer[0], site.offer[1].map(([n, p, d]) => [c(n), c(p), c(d)])],
  }
}

const photo = (k, sm) => `/assets/photos/${k}${sm ? '-sm' : ''}.webp`
const DEVICES = [['Desktop', 1280], ['Tablet', 820], ['Phone', 390]]
const domain = (n) => `${n.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '')}.com`

export function Art({ site }) {
  if (site.img) {
    return (
      <div className="sd-art sd-photo">
        <img src={photo(site.img)} srcSet={`${photo(site.img, true)} 480w, ${photo(site.img)} 1000w`} sizes="(min-width: 900px) 520px, 90vw" width="1000" height="667" alt={`${site.cat}: ${site.name}`} decoding="async" />
        <span className="sd-badge"><b>{site.stats[0][0]}</b> {site.stats[0][1]}</span>
      </div>
    )
  }
  const [title, rows] = site.offer
  return (
    <div className="sd-art sd-ui" aria-hidden="true">
      <div className="sd-ui-card">
        <div className="sd-ui-head">
          <span className="sd-ui-ico"><Glyph name={site.glyph} /></span>
          <div><b>{site.name}</b><small>{site.tagline}</small></div>
        </div>
        <p className="sd-ui-title">{title}</p>
        <ul>
          {rows.slice(0, 3).map(([n, p, d]) => (
            <li key={n}><span><b>{n}</b><small>{d}</small></span><em>{p}</em></li>
          ))}
        </ul>
        <span className="sd-ui-btn">{site.cta}</span>
      </div>
      <span className="sd-ui-chip c1"><b>{site.stats[0][0]}</b> {site.stats[0][1]}</span>
      <span className="sd-ui-chip c2"><b>{site.stats[1][0]}</b> {site.stats[1][1]}</span>
    </div>
  )
}

export default function IndustrySite({ site: raw }) {
  const { code } = useCurrency()
  const site = useMemo(() => convertSite(raw, code), [raw, code])
  const lang = raw.lang || 'en'
  const ui = UI[lang]
  const versions = versionsOf(raw.baseSlug || raw.slug)
  const [device, setDevice] = useState(0)
  const [full, setFull] = useState(false)
  const stage = useRef(null)
  const toggleFull = () => {
    const el = stage.current
    if (!full) {
      setFull(true)
      try { el?.requestFullscreen?.().catch(() => {}) } catch { /* CSS full-window fallback */ }
    } else {
      setFull(false)
      try { if (document.fullscreenElement) document.exitFullscreen?.() } catch { /* ignore */ }
    }
  }
  useEffect(() => {
    const onFs = () => { if (!document.fullscreenElement) setFull(false) }
    const onKey = (e) => { if (e.key === 'Escape') setFull(false) }
    document.addEventListener('fullscreenchange', onFs)
    window.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('fullscreenchange', onFs); window.removeEventListener('keydown', onKey) }
  }, [])
  // Render the demo at the real device width, then scale it to fit the screen.
  const frame = useRef(null)
  const canvas = useRef(null)
  const W = DEVICES[device][1]
  const [fit, setFit] = useState({ s: 1, h: 0 })
  useEffect(() => {
    const f = frame.current
    const c = canvas.current
    if (!f || !c) return
    const measure = () => {
      const w = device === 0 ? Math.max(W, f.clientWidth) : W
      const sc = Math.min(1, f.clientWidth / w)
      setFit({ s: sc, h: c.scrollHeight * sc, w })
    }
    measure()
    const ro = 'ResizeObserver' in window ? new ResizeObserver(measure) : null
    ro?.observe(f)
    ro?.observe(c)
    return () => ro?.disconnect()
  }, [W, full, device])
  useEffect(() => {
    document.documentElement.classList.toggle('ind-full-on', full)
    return () => document.documentElement.classList.remove('ind-full-on')
  }, [full])
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [offerTitle, offers] = site.offer
  const id = (k) => `${site.slug}-${k}`
  const go = (k) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id(k))
    const f = el?.closest('.ind-frame')
    if (!el || !f) return
    const top = el.getBoundingClientRect().top - f.getBoundingClientRect().top + f.scrollTop
    f.scrollTo({ top, behavior: 'smooth' })
  }
  const style = { '--ib': site.pal[0], '--ii': site.pal[1], '--ia': site.pal[2], '--ia2': site.pal[3] }
  const related = industries.filter((x) => x.sector === site.sector && x.slug !== (raw.baseSlug || site.slug))
  const more = (related.length >= 3 ? related : [...related, ...industries.filter((x) => x.sector !== site.sector)]).slice(0, 4)

  return (
    <DemoShell
      demo={{
        slug: site.slug,
        category: raw.baseCat || site.cat,
        name: `${raw.baseCat || site.cat} website${lang !== 'en' ? ` in ${LANGS[lang].name}` : ''}`,
        brand: site.name,
        sector: sectorName[site.sector],
        blurb: lang !== 'en'
          ? `A live ${LANGS[lang].name} demo website for a ${(raw.baseCat || site.cat).toLowerCase()}, for customers in ${LANGS[lang].regions}. Prices follow the currency you choose.`
          : `A live demo website for a ${site.cat.toLowerCase()}. Try it on desktop, tablet and phone, then get one built for your business.`,
        features: ['Fits every screen', 'Services and prices', 'Enquiries to WhatsApp', 'Ready for Google'],
      }}
      more={more.map((x) => ({ slug: x.slug, path: x.path, category: x.cat, name: x.name }))}
      wide
    >
      {versions.length > 1 && (
        <nav className="ind-langs" aria-label="Language versions">
          <span>Language</span>
          {versions.map((v) => (
            <Link key={v.lang} to={v.path} lang={v.lang} aria-current={v.lang === lang ? 'page' : undefined} className={v.lang === lang ? 'is-on' : ''}>
              {LANGS[v.lang].native}{v.lang !== 'en' && <small>{LANGS[v.lang].name}</small>}
            </Link>
          ))}
        </nav>
      )}
      <div className={`ind-stage${full ? ' is-full' : ''}`} ref={stage}>
      <div className="ind-bar">
        <div className="ind-devices" role="group" aria-label="Preview size">
          {DEVICES.map(([l], i) => (
            <button type="button" key={l} className={i === device ? 'is-on' : ''} onClick={() => setDevice(i)} aria-pressed={i === device}>{l}</button>
          ))}
        </div>
        <button type="button" className="ind-full" onClick={toggleFull} aria-pressed={full}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {full ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /> : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}
          </svg>
          <span>{full ? 'Exit full screen' : 'Full screen'}</span>
        </button>
      </div>

      <div className={`ind-browser is-${DEVICES[device][0].toLowerCase()}`} style={{ maxWidth: device === 0 ? '100%' : `${W + 2}px` }}>
        <div className="ind-chrome" aria-hidden="true"><i /><i /><i /><span>{domain(site.name)}</span><em>{W}px{fit.s < 1 ? ` · ${Math.round(fit.s * 100)}%` : ''}</em></div>
        <div className="ind-frame" ref={frame}>
          <div className="ind-sizer" style={{ height: fit.h || undefined }}>
          <div className="ind-canvas" ref={canvas} style={{ width: fit.w || W, transform: fit.s < 1 ? `scale(${fit.s})` : undefined }}>
          <div className={`sd sd-${site.layout} sd-${site.font}${site.dark ? ' is-dark' : ''}`} style={style} lang={lang} dir={LANGS[lang].dir}>
            <header className="sd-nav">
              <a href={`#${id('top')}`} onClick={go('top')} className="sd-logo">
                <span><Glyph name={site.glyph} /></span>{site.name}
              </a>
              <nav>
                <a href={`#${id('services')}`} onClick={go('services')}>{ui.services}</a>
                <a href={`#${id('offer')}`} onClick={go('offer')}>{offerTitle}</a>
                <a href={`#${id('contact')}`} onClick={go('contact')} className="sd-navcta">{site.cta}</a>
              </nav>
            </header>

            <section className="sd-hero" id={id('top')}>
              <div className="sd-copy">
                <span className="sd-tag">{site.tagline}</span>
                <h2>{site.head}</h2>
                <p>{site.sub}</p>
                <div className="sd-actions">
                  <a href={`#${id('contact')}`} onClick={go('contact')} className="sd-btn">{site.cta}</a>
                  <a href={`#${id('services')}`} onClick={go('services')} className="sd-btn sd-ghost">{ui.explore}</a>
                </div>
              </div>
              <Art site={site} />
            </section>

            <section className="sd-stats" aria-label={ui.highlights}>
              {site.stats.map(([n, l]) => (
                <div key={l}><b>{n}</b><span>{l}</span></div>
              ))}
            </section>

            <section className="sd-sec" id={id('services')}>
              <div className="sd-head"><span>{ui.services}</span><h3>{ui.offerHead}</h3></div>
              <div className="sd-grid">
                {site.services.map(([t, d], i) => (
                  <article key={t}>
                    <em>{String(i + 1).padStart(2, '0')}</em>
                    <strong>{t}</strong>
                    <p>{d}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="sd-band">
              <h3>{ui.why(site.name)}</h3>
              <div className="sd-why">
                {site.why.map(([t, d]) => (
                  <div key={t}><IconCheck width={22} height={22} /><strong>{t}</strong><p>{d}</p></div>
                ))}
              </div>
            </section>

            <section className="sd-sec" id={id('offer')}>
              <div className="sd-head"><span>{ui.prices}</span><h3>{offerTitle}</h3></div>
              <ul className="sd-offers">
                {offers.map(([n, p, d]) => (
                  <li key={n}><div><strong>{n}</strong><span>{d}</span></div><b>{p}</b></li>
                ))}
              </ul>
              <p className="sd-fine">{ui.sample}</p>
            </section>

            <section className="sd-sec sd-contact" id={id('contact')}>
              <div>
                <div className="sd-head"><span>{ui.contact}</span><h3>{site.cta}</h3></div>
                <p>{ui.leave}</p>
                <dl>
                  <div><dt>{ui.hours}</dt><dd>{site.hours}</dd></div>
                  <div><dt>{ui.address}</dt><dd>{site.addr}</dd></div>
                </dl>
              </div>
              {sent ? (
                <div className="sd-sent"><IconCheck width={28} height={28} /><strong>{ui.thanks}</strong><p>{ui.thanksNote}</p></div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (form.name.trim() && form.phone.trim()) setSent(true) }}>
                  <input placeholder={ui.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label={ui.name} />
                  <input placeholder={ui.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} aria-label={ui.phone} inputMode="tel" />
                  <button type="submit" className="sd-btn">{ui.send}</button>
                </form>
              )}
            </section>

            <footer className="sd-foot"><span>© {site.name}</span><span>{ui.by}</span></footer>
          </div>
          </div>
          </div>
        </div>
      </div>
      </div>
    </DemoShell>
  )
}
