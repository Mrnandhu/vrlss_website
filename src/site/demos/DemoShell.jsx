import { Link } from '../router'
import { Button, Words } from '../components/Bits'
import { IconArrow, IconWhatsApp } from '../icons'
import { waLink } from '../brand'
import { demos } from './demoData'

export default function DemoShell({ demo, children, wide = false, more }) {
  const others = more || demos.filter((d) => d.slug !== demo.slug).slice(0, 4)
  const ask = waLink(`Hi Sai, I saw the ${demo.name.toLowerCase()} demo (${demo.brand}). I'd like a website like this for my business.`)
  return (
    <>
      <section className="nx-pagehero dm-hero">
        <div className="nx-wrap">
          <nav className="nx-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/work">Work</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{demo.category}</span>
          </nav>
          <h1 className="nx-h1 ph-h1"><Words text={`${demo.name} demo`} /></h1>
          <p className="nx-lead">{demo.blurb}</p>
          <div className="dm-actions">
            <a className="nx-btn nx-btn-primary" href={ask} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp width={20} height={20} /><span>Get this website</span>
            </a>
            <ul className="dm-feats">
              {demo.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="dm-stage">
        <div className={`nx-wrap${wide ? ' dm-wide' : ''}`}>
          <p className="dm-note">
            <strong>Live demo.</strong> Everything is clickable. {demo.brand} is a fictional business with sample data.
          </p>
          {children}
        </div>
      </section>

      <section className="nx-section dm-next">
        <div className="nx-wrap dm-cta">
          <div>
            <h2 className="nx-h2"><Words text={`Want a ${demo.name.toLowerCase()} like this?`} /></h2>
            <p className="nx-lead">We build it with your name, photos and prices. See your own version free before you pay.</p>
          </div>
          <div className="dm-cta-actions">
            <Button to="/contact?plan=demo">Get a free demo</Button>
            <Button to="/work" variant="outline">See all demos</Button>
          </div>
        </div>
        <div className="nx-wrap">
          <div className="dm-more">
            {others.map((d) => (
              <Link key={d.slug} to={d.path} className="dm-more-card">
                <span className="nx-work-tag">{d.category}</span>
                <strong>{d.name}</strong>
                <em>Open <IconArrow width={16} height={16} /></em>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
