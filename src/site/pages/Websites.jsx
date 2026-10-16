import { Section, Head, FAQ, CtaBand, PlanCard, PageHero } from '../components/Bits'
import { websitePlans } from '../prices'
import { faqs } from '../routes'
import { IconCode, IconPhone, IconGlobe, IconDevices, IconGauge, IconSearch, IconChart, IconWhatsApp, IconLock, IconShield, IconWrench, IconLayout, IconCart, IconLayers, IconLanguage } from '../icons'
import { Link } from '../router'

const included = [
  [IconDevices, 'Mobile-first design'],
  [IconGauge, 'Fast loading'],
  [IconSearch, 'SEO & schema'],
  [IconChart, 'GA4 & Search Console'],
  [IconWhatsApp, 'Forms & WhatsApp'],
  [IconLock, 'HTTPS & clean URLs'],
  [IconShield, 'Accessible'],
  [IconWrench, '30 days of fixes'],
]

export default function Websites() {
  return (
    <>
      <PageHero
        crumb="Websites"
        title="Web development"
        lead="Fast, secure websites and web apps, built to convert."
        chips={[[IconLayout, 'Websites'], [IconCart, 'E-commerce'], [IconLayers, 'Web apps'], [IconLanguage, 'Multilingual & RTL']]}
      />

      <Section tone="white">
        <Head title="In every build" />
        <ul className="ic-grid">
          {included.map(([Ico, t]) => (
            <li key={t}>
              <Ico width={26} height={26} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <Head title="Packages" lead="Fixed price. Final payment only when you are happy." />
        <div className="nx-plans">
          {websitePlans.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>
      </Section>

      <Section tone="white">
        <Head
          title="Beyond websites"
          lead="Custom software, quoted after a short call."
        />
        <div className="nx-features nx-features-3">
          <div className="nx-feature">
            <IconGlobe width={26} height={26} />
            <h3>Web applications</h3>
            <p>Bookings, portals, dashboards.</p>
          </div>
          <div className="nx-feature">
            <IconPhone width={26} height={26} />
            <h3>Mobile apps</h3>
            <p>iPhone and Android.</p>
          </div>
          <div className="nx-feature">
            <IconCode width={26} height={26} />
            <h3>Custom software</h3>
            <p>Internal tools and integrations.</p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Head title="Questions" align="center" />
        <FAQ items={faqs.websites} />
        <p className="nx-center-note">
          Want traffic as well? Add <Link to="/digital-marketing">digital marketing</Link>.
        </p>
      </Section>

      <CtaBand />
    </>
  )
}
