import { Link } from '../router'
import { Button } from '../components/Bits'
import { IconArrow } from '../icons'
import { demos } from './demoData'

export default function DemoShell({ demo, children, wide = false }) {
  const others = demos.filter((d) => d.slug !== demo.slug).slice(0, 6)
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
          <h1 className="nx-h1">{demo.name} demo</h1>
          <p className="nx-lead">{demo.blurb}</p>
          <ul className="dm-feats">
            {demo.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dm-stage">
        <div className={`nx-wrap${wide ? ' dm-wide' : ''}`}>
          <div className="dm-note">
            <strong>Live demo.</strong> Everything below is clickable. {demo.brand} is a fictional brand and all data is
            sample data.
          </div>
          {children}
        </div>
      </section>

      <section className="nx-section nx-tone-white">
        <div className="nx-wrap dm-cta">
          <div>
            <h2 className="nx-h2">Want a {demo.name.toLowerCase()} for your business?</h2>
            <p className="nx-lead">
              This is a starting point. We build it around your brand, your data and the way you work. Projects like
              this are quoted after a short call.
            </p>
          </div>
          <div className="dm-cta-actions">
            <Button to={`/contact?plan=custom`}>Get a quote</Button>
            <Button to="/work" variant="outline" icon={false}>
              See all demos
            </Button>
          </div>
        </div>
      </section>

      <section className="nx-section nx-tone-paper">
        <div className="nx-wrap">
          <h2 className="nx-h2" style={{ marginBottom: 24 }}>More live demos</h2>
          <div className="dm-more">
            {others.map((d) => (
              <Link key={d.slug} to={d.path} className="dm-more-card">
                <span className="nx-work-tag">{d.category}</span>
                <strong>{d.name}</strong>
                <em>
                  Try it <IconArrow width={16} height={16} />
                </em>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
