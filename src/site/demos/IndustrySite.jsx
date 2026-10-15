import { useState } from 'react'
import DemoShell from './DemoShell'
import { IconCheck } from '../icons'
import { Glyph } from './Scene'
import { industries, sectorName } from './industries'

const photo = (k, sm) => `/assets/photos/${k}${sm ? '-sm' : ''}.webp`
const DEVICES = [['Desktop', '100%'], ['Tablet', '768px'], ['Phone', '390px']]
const domain = (n) => `${n.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '')}.com`

function Art({ site }) {
  if (site.img) {
    return (
      <div className="sd-art sd-photo">
        <img src={photo(site.img)} srcSet={`${photo(site.img, true)} 480w, ${photo(site.img)} 1000w`} sizes="(min-width: 900px) 520px, 90vw" width="1000" height="667" alt={`${site.cat}: ${site.name}`} decoding="async" />
        <span className="sd-badge"><b>{site.stats[0][0]}</b> {site.stats[0][1]}</span>
      </div>
    )
  }
  return (
    <div className="sd-art sd-illus" aria-hidden="true">
      <i className="sd-ring r1" /><i className="sd-ring r2" /><i className="sd-ring r3" />
      <Glyph name={site.glyph} className="sd-glyph" />
      <span className="sd-badge"><b>{site.stats[0][0]}</b> {site.stats[0][1]}</span>
    </div>
  )
}

export default function IndustrySite({ site }) {
  const [device, setDevice] = useState(0)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [offerTitle, offers] = site.offer
  const id = (k) => `${site.slug}-${k}`
  const go = (k) => (e) => {
    e.preventDefault()
    document.getElementById(id(k))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const style = { '--ib': site.pal[0], '--ii': site.pal[1], '--ia': site.pal[2], '--ia2': site.pal[3] }
  const related = industries.filter((x) => x.sector === site.sector && x.slug !== site.slug)
  const more = (related.length >= 3 ? related : [...related, ...industries.filter((x) => x.sector !== site.sector)]).slice(0, 4)

  return (
    <DemoShell
      demo={{
        slug: site.slug,
        category: site.cat,
        name: `${site.cat} website`,
        brand: site.name,
        sector: sectorName[site.sector],
        blurb: `A live demo website for a ${site.cat.toLowerCase()}. Try it on desktop, tablet and phone, then get one built for your business.`,
        features: ['Fits every screen', 'Services and prices', 'Enquiries to WhatsApp', 'Ready for Google'],
      }}
      more={more.map((x) => ({ slug: x.slug, path: x.path, category: x.cat, name: x.name }))}
      wide
    >
      <div className="ind-devices" role="group" aria-label="Preview size">
        {DEVICES.map(([l], i) => (
          <button type="button" key={l} className={i === device ? 'is-on' : ''} onClick={() => setDevice(i)} aria-pressed={i === device}>{l}</button>
        ))}
      </div>

      <div className="ind-browser" style={{ maxWidth: DEVICES[device][1] }}>
        <div className="ind-chrome" aria-hidden="true"><i /><i /><i /><span>{domain(site.name)}</span></div>
        <div className="ind-frame">
          <div className={`sd sd-${site.layout} sd-${site.font}${site.dark ? ' is-dark' : ''}`} style={style}>
            <header className="sd-nav">
              <a href={`#${id('top')}`} onClick={go('top')} className="sd-logo">
                <span><Glyph name={site.glyph} /></span>{site.name}
              </a>
              <nav>
                <a href={`#${id('services')}`} onClick={go('services')}>Services</a>
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
                  <a href={`#${id('services')}`} onClick={go('services')} className="sd-btn sd-ghost">Explore</a>
                </div>
              </div>
              <Art site={site} />
            </section>

            <section className="sd-stats" aria-label="Highlights">
              {site.stats.map(([n, l]) => (
                <div key={l}><b>{n}</b><span>{l}</span></div>
              ))}
            </section>

            <section className="sd-sec" id={id('services')}>
              <div className="sd-head"><span>Services</span><h3>What we offer</h3></div>
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
              <h3>Why choose {site.name}</h3>
              <div className="sd-why">
                {site.why.map(([t, d]) => (
                  <div key={t}><IconCheck width={22} height={22} /><strong>{t}</strong><p>{d}</p></div>
                ))}
              </div>
            </section>

            <section className="sd-sec" id={id('offer')}>
              <div className="sd-head"><span>Prices</span><h3>{offerTitle}</h3></div>
              <ul className="sd-offers">
                {offers.map(([n, p, d]) => (
                  <li key={n}><div><strong>{n}</strong><span>{d}</span></div><b>{p}</b></li>
                ))}
              </ul>
              <p className="sd-fine">Sample prices for this demo.</p>
            </section>

            <section className="sd-sec sd-contact" id={id('contact')}>
              <div>
                <div className="sd-head"><span>Contact</span><h3>{site.cta}</h3></div>
                <p>Leave your details and we will call or WhatsApp you back.</p>
                <dl>
                  <div><dt>Hours</dt><dd>{site.hours}</dd></div>
                  <div><dt>Address</dt><dd>{site.addr}</dd></div>
                </dl>
              </div>
              {sent ? (
                <div className="sd-sent"><IconCheck width={28} height={28} /><strong>Thank you!</strong><p>On a real website, this message reaches the owner’s WhatsApp instantly.</p></div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (form.name.trim() && form.phone.trim()) setSent(true) }}>
                  <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label="Your name" />
                  <input placeholder="Phone or WhatsApp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} aria-label="Phone or WhatsApp" inputMode="tel" />
                  <button type="submit" className="sd-btn">Send</button>
                </form>
              )}
            </section>

            <footer className="sd-foot"><span>© {site.name}</span><span>Demo website by VRLS Solutions</span></footer>
          </div>
        </div>
      </div>
    </DemoShell>
  )
}
