import { useState } from 'react'
import DemoShell from './DemoShell'
import { IconCheck } from '../icons'
import Scene from './Scene'

const photo = (k, sm) => `/assets/photos/${k}${sm ? '-sm' : ''}.webp`

const DEVICES = [
  ['Desktop', '100%'],
  ['Tablet', '768px'],
  ['Phone', '390px'],
]

const slugWord = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '')

export default function IndustrySite({ site }) {
  const [device, setDevice] = useState(0)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [offerTitle, offers] = site.offer
  const demo = {
    slug: site.slug,
    category: site.cat,
    name: `${site.cat} website`,
    brand: site.name,
    blurb: `A complete, mobile-friendly website for a ${site.cat.toLowerCase()}: services, prices, enquiries and everything customers look for. Switch between desktop, tablet and phone to see it adapt.`,
    features: ['Fits every screen', 'Clear services and prices', 'Enquiry form to WhatsApp or email', 'Ready for local search'],
  }
  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(`${site.slug}-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const style = {
    '--ib': site.pal[0],
    '--ii': site.pal[1],
    '--ia': site.pal[2],
    '--ib2': site.pal[3],
  }

  return (
    <DemoShell demo={demo} wide>
      <div className="ind-devices" role="group" aria-label="Preview size">
        <span>Preview on</span>
        {DEVICES.map(([l], i) => (
          <button type="button" key={l} className={i === device ? 'is-on' : ''} onClick={() => setDevice(i)} aria-pressed={i === device}>
            {l}
          </button>
        ))}
      </div>

      <div className="ind-browser" style={{ maxWidth: DEVICES[device][1] }}>
        <div className="ind-chrome" aria-hidden="true">
          <i /><i /><i />
          <span>{slugWord(site.name)}.com</span>
        </div>
        <div className="ind-frame">
          <div className={`ind ind-${site.layout} ind-font-${site.font}${site.dark ? ' is-dark' : ''}`} style={style}>
            <header className="ind-nav">
              <strong>{site.name}</strong>
              <nav>
                <a href={`#${site.slug}-services`} onClick={go('services')}>Services</a>
                <a href={`#${site.slug}-offer`} onClick={go('offer')}>{offerTitle}</a>
                <a href={`#${site.slug}-contact`} onClick={go('contact')} className="ind-navcta">{site.cta}</a>
              </nav>
            </header>

            <section className="ind-hero">
              <div className="ind-hero-copy">
                <span className="ind-tag">{site.tagline}</span>
                <h2>{site.head}</h2>
                <p>{site.sub}</p>
                <a href={`#${site.slug}-contact`} onClick={go('contact')} className="ind-btn">{site.cta}</a>
              </div>
              {site.img ? (
                <div className="ind-art ind-photo">
                  <img src={photo(site.img)} srcSet={`${photo(site.img, true)} 480w, ${photo(site.img)} 1000w`} sizes="(min-width: 800px) 480px, 90vw" width="1000" height="667" alt={`${site.cat} – ${site.name}`} fetchPriority="low" decoding="async" />
                </div>
              ) : (
                <Scene glyph={site.glyph} pattern={site.pattern} className="ind-art" />
              )}
            </section>

            <section className="ind-sec" id={`${site.slug}-services`}>
              <h3>What we offer</h3>
              <div className="ind-grid">
                {site.services.map(([t, d]) => (
                  <article key={t}><b />{/* accent mark */}<strong>{t}</strong><p>{d}</p></article>
                ))}
              </div>
            </section>

            <section className="ind-sec ind-alt">
              <h3>Why choose {site.name}</h3>
              <div className="ind-why">
                {site.why.map(([t, d]) => (
                  <div key={t}><IconCheck width={22} height={22} /><strong>{t}</strong><p>{d}</p></div>
                ))}
              </div>
            </section>

            <section className="ind-sec" id={`${site.slug}-offer`}>
              <h3>{offerTitle}</h3>
              <ul className="ind-offers">
                {offers.map(([n, p, d]) => (
                  <li key={n}><div><strong>{n}</strong><span>{d}</span></div><b>{p}</b></li>
                ))}
              </ul>
              <p className="ind-fine">Sample prices for this demo.</p>
            </section>

            <section className="ind-sec ind-contact" id={`${site.slug}-contact`}>
              <div>
                <h3>{site.cta}</h3>
                <p>Leave your details and we will get back to you on WhatsApp or by phone.</p>
                <p className="ind-meta"><strong>Hours</strong> {site.hours}<br /><strong>Find us</strong> {site.addr}</p>
              </div>
              {sent ? (
                <div className="ind-sent"><IconCheck width={26} height={26} /><strong>Thank you!</strong><p>In a real website, this message arrives in your WhatsApp or inbox instantly.</p></div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (form.name.trim() && form.phone.trim()) setSent(true) }}>
                  <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label="Your name" />
                  <input placeholder="Phone or WhatsApp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} aria-label="Phone or WhatsApp" inputMode="tel" />
                  <button type="submit" className="ind-btn">Send</button>
                </form>
              )}
            </section>

            <footer className="ind-foot">© {site.name} · Sample website by Vrlss</footer>
          </div>
        </div>
      </div>
    </DemoShell>
  )
}
