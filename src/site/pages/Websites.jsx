import { Section, Head, FAQ, CtaBand, PlanCard, PageHero } from '../components/Bits'
import { websitePlans } from '../prices'
import { faqs } from '../routes'
import { IconCheck, IconCode, IconPhone, IconGlobe } from '../icons'
import { Link } from '../router'

const included = [
  'Mobile-first, responsive design',
  'Fast loading, optimised images',
  'SEO foundations and structured data',
  'Google Analytics and Search Console',
  'Contact form and WhatsApp button',
  'Secure HTTPS and clean URLs',
  'Accessible, readable typography',
  '30 days of free fixes after launch',
]

export default function Websites() {
  return (
    <>
      <PageHero
        crumb="Websites"
        title="Website design and development"
        lead="A website is your busiest salesperson. We build ones that load quickly, look right on every screen and are set up so search engines can understand them."
      />

      <Section tone="white">
        <Head title="Included in *every* website" />
        <ul className="nx-ticks nx-ticks-grid">
          {included.map((f) => (
            <li key={f}>
              <IconCheck width={20} height={20} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <Head title="Choose a *package*" lead="Fixed prices in US dollars. Final payment is due only when you are happy with the site." />
        <div className="nx-plans">
          {websitePlans.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>
      </Section>

      <Section tone="white">
        <Head
          title="Beyond websites"
          lead="Some businesses need more than pages. We also build the software behind them, quoted after a short call."
        />
        <div className="nx-features nx-features-3">
          <div className="nx-feature">
            <IconGlobe width={26} height={26} />
            <h3>Web applications</h3>
            <p>Booking systems, customer portals, dashboards and online stores built to your workflow.</p>
          </div>
          <div className="nx-feature">
            <IconPhone width={26} height={26} />
            <h3>Mobile apps</h3>
            <p>Apps for iPhone and Android that connect to your business systems.</p>
          </div>
          <div className="nx-feature">
            <IconCode width={26} height={26} />
            <h3>Custom software</h3>
            <p>Internal tools, automation and integrations that save your team time.</p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Head title="Website questions" align="center" />
        <FAQ items={faqs.websites} />
        <p className="nx-center-note">
          Want traffic as well? Add <Link to="/digital-marketing">digital marketing</Link>.
        </p>
      </Section>

      <CtaBand title="Get a quote for your website" />
    </>
  )
}
