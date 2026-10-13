import { Section, Head, Button, FAQ, CtaBand, LaunchOffer } from '../components/Bits'
import HeroVisual from '../components/HeroVisual'
import { Link } from '../router'
import { Glyph } from '../demos/Scene'
import { demos } from '../demos/demoData'
import { currencies } from '../prices'
import { industries } from '../demos/industries'

const manifesto = 'Your customers decide in seconds. We make sure they find you, trust what they see, and know exactly how to get in touch.'.split(' ')
import { faqs } from '../routes'
import { IconGlobe, IconMegaphone, IconBolt, IconSearch, IconPhone, IconShield, IconArrow } from '../icons'

const steps = [
  ['Discover', 'A short call to understand your business, customers and goals. You get a written scope and a fixed price.'],
  ['Design', 'We design your pages around how your customers decide, and you approve the look before we build.'],
  ['Build and launch', 'We build, test on every device size, set up SEO and analytics, then launch on your domain.'],
  ['Grow', 'Add monthly marketing to bring in visitors, track results and keep improving.'],
]

const glyphFor = { 'online-store': 'bag', 'booking-system': 'calendar', 'sales-dashboard': 'chart', 'customer-portal': 'user', 'mobile-app': 'phone', 'sales-crm': 'kanban', 'invoice-generator': 'invoice' }

export default function Home() {
  return (
    <>
      <section className="nx-hero cin" data-cin>
        <div className="cin-pin">
        <div className="cin-bg" aria-hidden="true"><i className="g1" /><i className="g2" /><i className="g3" /></div>
        <div className="nx-wrap nx-hero-grid">
          <div className="nx-hero-copy">
            <p className="nx-pill">Websites · Apps · Digital marketing</p>
            <h1 className="nx-h1" aria-label="Websites, apps and digital marketing that help your business grow">
              {'Websites, apps and digital marketing that help your business grow'.split(' ').map((w, i) => (
                <span key={i} className={`w-in${w === 'grow' ? ' w-hl' : ''}`} aria-hidden="true" style={{ '--i': i }}>{w}</span>
              ))}
            </h1>
            <p className="nx-lead nx-hero-lead">
              From a simple business website to online stores, booking systems, dashboards and mobile apps. We build it,
              launch it and help the right customers find it.
            </p>
            <div className="nx-hero-actions">
              <Button to="/contact">Get a free quote</Button>
              <Button to="/work" variant="outline" icon={false}>
                Try live demos
              </Button>
            </div>
            <ul className="nx-hero-points">
              <li>Fixed prices, shown in your currency</li>
              <li>Works on every screen</li>
              <li>Clients in any country</li>
            </ul>
          </div>
          <HeroVisual />
        </div>
        <p className="cin-end" aria-hidden="true"><span>See it working</span> before you decide</p>
        <ol className="cin-steps" aria-hidden="true">{['Website', 'Online store', 'Booking', 'Dashboard', 'Client portal'].map((t) => <li key={t}>{t}</li>)}</ol>
        <div className="cin-cue" aria-hidden="true"><i /><span>Scroll</span></div>
        </div>
      </section>

      <section className="hm-stats" aria-label="At a glance">
        <div className="nx-wrap hm-stats-grid">
          <div className="hm-stat"><b data-count={industries.length + 9}>{industries.length + 9}</b><span>industry website demos</span></div>
          <div className="hm-stat"><b data-count={demos.length}>{demos.length}</b><span>working apps and tools</span></div>
          <div className="hm-stat"><b data-count={currencies.length}>{currencies.length}</b><span>currencies for your prices</span></div>
          <div className="hm-stat"><b>Free</b><span>demo before you pay</span></div>
        </div>
      </section>

      <section className="mq" aria-label="Industries we build for">
        <div className="mq-track" aria-hidden="true">
          {[0, 1].map((k) => (
            <ul key={k}>
              {industries.map((x) => (
                <li key={x.slug + k}><Glyph name={x.glyph} className="mq-g" />{x.cat}</li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="mf" aria-label="Our approach">
        <div className="nx-wrap">
          <p className="mf-text" data-fill aria-label={manifesto.join(' ')}>
            {manifesto.map((w, i) => (
              <span key={i} className="mf-w" aria-hidden="true">{w}{' '}</span>
            ))}
          </p>
        </div>
      </section>

      <Section tone="white">
        <Head
          title="Two services that work better together"
          lead="A great website with no visitors does nothing, and ads sent to a weak website waste money. We do both, so each supports the other."
        />
        <div className="nx-duo">
          <article className="nx-panel nx-panel-blue">
            <IconGlobe width={34} height={34} />
            <h3>Website design and development</h3>
            <p>
              Business websites, online stores, web apps and custom software, built mobile-first and tuned for speed
              and search.
            </p>
            <Link to="/websites" className="nx-more">
              Explore websites <IconArrow width={18} height={18} />
            </Link>
          </article>
          <article className="nx-panel nx-panel-ink">
            <IconMegaphone width={34} height={34} />
            <h3>Digital marketing</h3>
            <p>
              Local SEO, Google Business Profile, social media and paid ads, managed monthly with a plain-English
              report.
            </p>
            <Link to="/digital-marketing" className="nx-more">
              Explore marketing <IconArrow width={18} height={18} />
            </Link>
          </article>
        </div>
      </Section>

      <Section tone="paper">
        <Head title="Built to be *found*, fast on any device" />
        <div className="nx-features">
          <div className="nx-feature">
            <IconSearch width={26} height={26} />
            <h3>Search-ready from day one</h3>
            <p>Clean structure, page titles, structured data and a sitemap, so Google understands your business.</p>
          </div>
          <div className="nx-feature">
            <IconPhone width={26} height={26} />
            <h3>Designed for every screen</h3>
            <p>Phones, tablets, laptops and wide desktops all get a layout made for them, not a shrunken copy.</p>
          </div>
          <div className="nx-feature">
            <IconBolt width={26} height={26} />
            <h3>Quick to load</h3>
            <p>Optimised images and lean code, because slow sites lose visitors before they read a word.</p>
          </div>
          <div className="nx-feature">
            <IconShield width={26} height={26} />
            <h3>You own everything</h3>
            <p>Your domain, your code, your accounts. We hand it all over when the project is paid.</p>
          </div>
        </div>
      </Section>

      <section className="nx-section nx-tone-white hs" data-hscroll>
        <div className="hs-sticky">
          <div className="nx-wrap">
            <Head
              title="See it *working* before you decide"
              lead="Every demo is clickable. Try the store, book an appointment, open the dashboard or tap through the app, then imagine it with your brand."
            />
          </div>
          <div className="hs-viewport">
            <div className="hs-track">
              {demos.map((d) => (
                <Link key={d.slug} to={d.path} className={`hm-demo tone-${d.tone}`}>
                  <span className="hm-chip"><Glyph name={glyphFor[d.slug]} className="hm-glyph" /></span>
                  <span className="nx-work-tag">{d.category}</span>
                  <strong>{d.name}</strong>
                  <span>{d.blurb}</span>
                  <em>Try the demo <IconArrow width={16} height={16} /></em>
                </Link>
              ))}
              <Link to="/work" className="hm-demo hm-demo-all">
                <span className="nx-work-tag">And more</span>
                <strong>Industry websites</strong>
                <span>Restaurants, clinics, hotels, gyms, law firms, function halls and dozens more.</span>
                <em>Browse all demos <IconArrow width={16} height={16} /></em>
              </Link>
            </div>
          </div>
          <div className="hs-bar" aria-hidden="true"><i /></div>
        </div>
      </section>

      <section className="sy" data-story data-step="0" aria-label="How a project runs">
        <div className="sy-pin">
          <div className="nx-wrap sy-grid">
            <div className="sy-left">
              <header className="nx-head">
                <h2 className="nx-h2">How a project runs</h2>
                <p className="nx-lead">Four clear steps, with a fixed price agreed before we start.</p>
              </header>
              <ol className="sy-list">
                {steps.map(([t, d], i) => (
                  <li key={t} {...(i === 0 ? { 'data-on': '' } : {})}>
                    <span className="nx-step-n">{i + 1}</span>
                    <div><h3>{t}</h3><p>{d}</p></div>
                  </li>
                ))}
              </ol>
              <div className="sy-rail" aria-hidden="true"><i /></div>
            </div>
            <div className="sy-stage" aria-hidden="true">
              <div className="sy-p p0">
                <div className="bub b1">What does your business need online?</div>
                <div className="bub b2">More customers from Google and WhatsApp.</div>
                <div className="bub b3">Got it. Here is your scope and a fixed price.</div>
                <div className="sy-quote"><b>Project scope</b><span>Pages · features · timeline</span><em>Fixed price</em></div>
              </div>
              <div className="sy-p p1">
                <div className="sy-wire"><u /><u /><u /><u /></div>
                <div className="sy-sw"><i style={{ background: '#2b50e6' }} /><i style={{ background: '#0fa58c' }} /><i style={{ background: '#f5b544' }} /><i style={{ background: '#0f2230' }} /></div>
                <div className="sy-aa">Aa</div>
              </div>
              <div className="sy-p p2">
                <div className="sy-dev"><div className="sy-lap"><i /><i /><i /></div><div className="sy-ph"><i /><i /></div></div>
                <div className="sy-prog"><span>Building and testing</span><div><i /></div></div>
              </div>
              <div className="sy-p p3">
                <div className="sy-bars"><i style={{ '--h': '30%' }} /><i style={{ '--h': '48%' }} /><i style={{ '--h': '42%' }} /><i style={{ '--h': '68%' }} /><i style={{ '--h': '84%' }} /></div>
                <div className="sy-tags"><span>More visitors</span><span>More enquiries</span><em>Sample data</em></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <LaunchOffer />
      </Section>

      <Section tone="white">
        <Head title="Questions we often *hear*" align="center" />
        <FAQ items={faqs.general} />
      </Section>

      <CtaBand title={`Let's build something people can find`} />
    </>
  )
}

