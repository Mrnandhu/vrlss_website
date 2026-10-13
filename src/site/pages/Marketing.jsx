import { Section, Head, FAQ, CtaBand, PlanCard, PageHero } from '../components/Bits'
import { marketingPlans } from '../prices'
import { faqs } from '../routes'
import { IconPin, IconChat, IconSearch, IconMegaphone, IconChart } from '../icons'

const services = [
  [IconPin, 'Google Business Profile', 'Keep your listing complete, accurate and active so local customers find and trust you.'],
  [IconSearch, 'Search engine optimisation', 'Pages and articles that match what your customers actually search for.'],
  [IconChat, 'Social media', 'Consistent, well-designed posts and replies on the channels your customers use.'],
  [IconMegaphone, 'Paid advertising', 'Google and Meta campaigns with tracking, so every dollar of ad budget is accountable.'],
  [IconChart, 'Reporting', 'A plain-English report each month: what we did, what happened and what comes next.'],
]

export default function Marketing() {
  return (
    <>
      <PageHero
        crumb="Digital marketing"
        title="Digital marketing for small and growing businesses"
        lead="Get found when customers search, stay active where they look and know what your marketing is doing. Monthly plans, no long contracts."
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
          <h2 className="nx-h2">What we promise, and what we do not</h2>
          <div className="nx-promise-cols">
            <div>
              <h3>We promise</h3>
              <ul>
                <li>The agreed work done on time, every month</li>
                <li>Honest reporting, including when something is not working</li>
                <li>You keep ownership of every account</li>
              </ul>
            </div>
            <div>
              <h3>We do not promise</h3>
              <ul>
                <li>Guaranteed rankings or a set number of sales</li>
                <li>Overnight results from organic work</li>
                <li>Anything we cannot control</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <Head title="Marketing questions" align="center" />
        <FAQ items={faqs.marketing} />
      </Section>

      <CtaBand title="Start with a free marketing review" lead="Share your business and goals. We will tell you what we would do first, free of charge." />
    </>
  )
}
