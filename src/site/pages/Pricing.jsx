import { Section, Head, FAQ, CtaBand, PlanCard, PageHero, LaunchOffer } from '../components/Bits'
import { websitePlans, marketingPlans, addons, currencyNote } from '../prices'
import { faqs } from '../routes'
import { CurrencySelect, Price } from '../currency'

export default function Pricing() {
  return (
    <>
      <PageHero
        crumb="Pricing"
        title="Simple, fixed pricing"
        lead="Know the cost before we start. Website projects have a fixed price, and marketing plans are a flat monthly fee."
      />

      <div className="nx-curbar">
        <div className="nx-wrap nx-curbar-inner">
          <CurrencySelect id="nx-cur-page" label="Show prices in" />
          <p>Converted at approximate rates. Your quote confirms the exact amount.</p>
        </div>
      </div>

      <Section tone="paper">
        <LaunchOffer compact />
      </Section>

      <Section tone="white" id="websites">
        <Head title="Website *packages*" lead="One-time price. 50% to start, 50% before launch." />
        <div className="nx-plans">
          {websitePlans.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>
      </Section>

      <Section tone="paper" id="marketing">
        <Head title="Digital marketing *plans*" lead="Monthly fee. Cancel at the end of any month." />
        <div className="nx-plans">
          {marketingPlans.map((p) => (
            <PlanCard key={p.id} plan={p} unit={p.from ? '/month + ad budget' : '/month'} />
          ))}
        </div>
      </Section>

      <Section tone="white">
        <Head title="Add-ons" />
        <dl className="nx-addons">
          {addons.map((a) => (
            <div key={a.name}>
              <dt>{a.name}</dt>
              <dd><strong><Price usd={a.usd} inr={a.inr} /></strong> {a.unit}</dd>
            </div>
          ))}
        </dl>
        <p className="nx-center-note nx-fine">{currencyNote}</p>
      </Section>

      <Section tone="paper">
        <Head title="Pricing questions" align="center" />
        <FAQ items={faqs.pricing} />
      </Section>

      <CtaBand title="Not sure which plan fits?" lead="Tell us about your business and we will recommend the right starting point, honestly." />
    </>
  )
}
