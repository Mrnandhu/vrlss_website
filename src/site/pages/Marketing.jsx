import { Section, Head, FAQ, CtaBand, PlanCard, PageHero } from '../components/Bits'
import { marketingPlans } from '../prices'
import { faqs } from '../routes'
import { IconPin, IconChat, IconSearch, IconMegaphone, IconChart, IconTarget } from '../icons'

const services = [
  [IconPin, 'Google Business Profile', 'Found and trusted on Maps.'],
  [IconSearch, 'Search engine optimisation', 'Rank for what buyers search.'],
  [IconChat, 'Social media', 'Consistent, on-brand posts.'],
  [IconMegaphone, 'Paid advertising', 'Google & Meta, fully tracked.'],
  [IconChart, 'Reporting', 'Clear monthly numbers.'],
]

export default function Marketing() {
  return (
    <>
      <PageHero
        crumb="Digital marketing"
        title="Digital marketing"
        lead="Be found. Get chosen. Measure everything."
        chips={[[IconSearch, 'SEO'], [IconMegaphone, 'Google & Meta Ads'], [IconChat, 'Social'], [IconTarget, 'No long contracts']]}
      />

      <Section tone="white">
        <Head title="What we *manage* for you" />
        <div className="nx-list">
          {services.map(([Ico, t, d]) => (
            <article key={t} className="nx-list-item">
              <span className="nx-list-ico">
                <Ico width={24} height={24} />
              </span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <Head
          title="Monthly plans"
          lead="Billed monthly. Stop at the end of any month."
        />
        <div className="nx-plans">
          {marketingPlans.map((p) => (
            <PlanCard key={p.id} plan={p} unit={p.from ? '/month + ad budget' : '/month'} />
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="nx-promise">
          <h2 className="nx-h2">Straight talk</h2>
          <div className="nx-promise-cols">
            <div>
              <h3>We promise</h3>
              <ul>
                <li>Work delivered on time</li>
                <li>Honest reporting</li>
                <li>You own every account</li>
              </ul>
            </div>
            <div>
              <h3>We do not promise</h3>
              <ul>
                <li>Guaranteed rankings</li>
                <li>Overnight results</li>
                <li>What we cannot control</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <Head title="Questions" align="center" />
        <FAQ items={faqs.marketing} />
      </Section>

      <CtaBand title="Get a free growth review." lead="Tell us your goals. We'll show you where to start." />
    </>
  )
}
