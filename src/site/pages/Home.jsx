import { Section, Head, Button, FAQ, CtaBand, LaunchOffer, Words, ProofLine, Included, Reviews, CaseStudies } from '../components/Bits'
import { Price } from '../currency'
import { websitePlans } from '../prices'
import HeroVisual from '../components/HeroVisual'
import { Link } from '../router'
import { Glyph } from '../demos/Scene'
import { industries, industryByPath, sectors } from '../demos/industries'
import { faqs } from '../routes'
import { IconArrow } from '../icons'

const headline = 'Websites that bring you customers'
const statement = 'Your customers decide in seconds. We make sure they choose you.'.split(' ')

const showcase = ['/work/websites/restaurant', '/work/websites/salon-spa', '/work/websites/real-estate', '/work/websites/school-coaching']
  .map((p) => industryByPath[p])
  .filter(Boolean)

const services = [
  ['Websites', 'Fast, mobile-first sites that turn visitors into enquiries.', '/websites'],
  ['Online stores and bookings', 'Sell and take bookings online, without paying commission.', '/websites'],
  ['Google and local SEO', 'Be the business people find when they search nearby.', '/digital-marketing'],
  ['Social media and ads', 'Posts and ads that bring the right people to your door.', '/digital-marketing'],
  ['Care and growth', 'Monthly updates, so your site keeps working for you.', '/pricing'],
]

const steps = [
  ['Message us', 'Send your business name and city on WhatsApp.'],
  ['See your free demo', 'Get a working homepage for your business in 3 days. Free, no obligation.'],
  ['Approve and launch', 'Like it? Pay 50% and we launch the full site.'],
]

const pad = (n) => String(n).padStart(2, '0')
const half = Math.ceil(industries.length / 2)
const streams = [industries.slice(0, half), industries.slice(half)]

function Capsule({ x, hidden }) {
  return (
    <Link to={x.path} className="is-cap" {...(hidden ? { tabIndex: -1, 'aria-hidden': 'true' } : {})}>
      <span className="is-ico"><Glyph name={x.glyph} /></span>
      <span className="is-txt"><b>{x.cat}</b><small>Live demo</small></span>
      <span className="is-go" aria-hidden="true"><IconArrow width={16} height={16} /></span>
    </Link>
  )
}

export default function Home() {
  return (
    <>
      <section className="nx-hero hm-hero">
        <div className="nx-wrap nx-hero-grid">
          <div className="nx-hero-copy">
            <p className="nx-pill">Web design studio, Andhra Pradesh</p>
            <h1 className="nx-h1 hm-h1" aria-label={headline}>
              <span aria-hidden="true"><Words text={headline} /></span>
            </h1>
            <p className="nx-lead nx-hero-lead">
              See a free demo of your new homepage before you pay anything. Websites from <strong className="hm-from"><Price usd={websitePlans[0].price} inr={websitePlans[0].inr} /></strong>.
            </p>
            <div className="nx-hero-actions">
              <Button to="/contact?plan=demo">Get a free demo</Button>
              <Button to="/work" variant="outline">See our work</Button>
            </div>
            <ProofLine demos={industries.length} />
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="hm-ring hm-stream" aria-labelledby="ring-h">
        <div className="nx-wrap hm-ring-head">
          <h2 className="nx-h2" id="ring-h"><Words text={`Built for ${industries.length} industries`} /></h2>
          <Button to="/work" variant="outline">Find yours</Button>
        </div>
        <div className="is-stream">
          {streams.map((row, r) => (
            <div className="is-row" key={r}>
              <div className="is-track" data-marquee={r ? '1' : '-1'} data-speed="0.35">
                {[0, 1].map((copy) => (
                  <span className="is-set" key={copy}>
                    {row.map((x) => <Capsule key={x.slug} x={x} hidden={copy === 1} />)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="nx-wrap is-note"><span>{industries.length} industries</span><i /><span>{sectors.length} sectors</span><i /><span>A live demo for each</span></p>
        <div className="nx-wrap sx-grid">
          {sectors.map(([k, label]) => {
            const n = industries.filter((x) => x.sector === k).length
            return (
              <Link key={k} to={`/work?sector=${k}`} className="sx-tile">
                <strong>{label}</strong>
                <span>{n} demo{n === 1 ? '' : 's'}</span>
                <IconArrow width={16} height={16} />
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mf" aria-label="Our approach">
        <div className="nx-wrap">
          <p className="mf-text" data-fill aria-label={statement.join(' ')}>
            {statement.map((w, i) => (
              <span key={i} className="mf-w" aria-hidden="true">{w}{' '}</span>
            ))}
          </p>
        </div>
      </section>

      <section className="nx-section hm-cases" aria-labelledby="cases-h">
        <div className="nx-wrap">
          <header className="nx-head hm-cases-head">
            <h2 className="nx-h2" id="cases-h"><Words text="Demo sites to explore" /></h2>
          </header>
          <div className="hm-case-grid">
            {showcase.map((s, i) => (
              <Link key={s.slug} to={s.path} className={`hm-case hm-case-${i}`} data-sp>
                <span className="hm-case-media">
                  <img src={`/assets/photos/${s.img}.webp`} alt="" loading="lazy" decoding="async" width="1000" height="667" />
                </span>
                <span className="hm-case-meta">
                  <strong>{s.name}</strong>
                  <span className="hm-case-cat">{s.cat}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="hm-cases-more">
            <Button to="/work" variant="outline">See all {industries.length} demos</Button>
          </div>
        </div>
      </section>

      <section className="nx-section hm-svc" aria-label="Services">
        <div className="nx-wrap">
          <Head title="What we do" />
          <div className="hm-svc-stack" data-stack>
            {services.map(([name, text, to], i) => (
              <Link key={name} to={to} className={`hm-svc-card c${i}`} style={{ '--i': i }}>
                <span className="hm-svc-n">{pad(i + 1)}</span>
                <span className="hm-svc-body">
                  <strong>{name}</strong>
                  <span>{text}</span>
                </span>
                <span className="hm-svc-go" aria-hidden="true"><IconArrow width={22} height={22} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Section tone="white" className="hm-inc">
        <Included />
      </Section>

      <CaseStudies />
      <Reviews />

      <section className="nx-section hm-flow" aria-labelledby="flow-h">
        <div className="nx-wrap hm-flow-grid">
          <header className="nx-head hm-flow-head">
            <h2 className="nx-h2" id="flow-h"><Words text="How it works" /></h2>
          </header>
          <div className="hm-steps-wrap" data-sp data-steps>
            <span className="hm-rail" aria-hidden="true"><i /></span>
            <ol className="hm-steps">
              {steps.map(([t, d], i) => (
                <li key={t}>
                  <span className="hm-step-n" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="hm-offer" data-sp aria-label="Founding client offer">
        <div className="hm-offer-card">
          <div className="nx-wrap">
            <LaunchOffer />
          </div>
        </div>
      </section>

      <Section tone="white">
        <Head title="Questions" align="center" />
        <FAQ items={faqs.general.slice(0, 8)} />
      </Section>

      <CtaBand title="Ready to see your new website?" lead="Send your business name on WhatsApp. The first demo is free." />
    </>
  )
}
