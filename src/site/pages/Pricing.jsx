import { Section, Head, FAQ, CtaBand, PlanCard, PageHero, LaunchOffer, Included } from '../components/Bits'
import { websitePlans, marketingPlans, addons, currencyNote, monthlyPlans, monthlyNote, marketPrices } from '../prices'
import { faqs } from '../routes'
import { CurrencySelect, Price } from '../currency'
import { IconCoins, IconClock, IconKey, IconGlobe } from '../icons'

export default function Pricing() {
  return (
    <>
      <PageHero
        crumb="Pricing"
        title="Transparent pricing"
        lead="Fixed project prices. Flat monthly plans."
        chips={[[IconCoins, 'Fixed in writing'], [IconClock, 'Pay monthly option'], [IconKey, 'You own everything'], [IconGlobe, '14 currencies']]}
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

      <Section tone="paper" id="monthly">
        <Head title="Pay monthly (outside India)" lead="Nothing big to pay upfront. Hosting, backups and monthly changes included." />
        <div className="nx-plans nx-plans-2">
          {monthlyPlans.map((p) => (
            <PlanCard key={p.id} plan={p} unit="/month" cta="Ask about this plan" />
          ))}
        </div>
        <p className="nx-center-note nx-fine">{monthlyNote}</p>
      </Section>

      <Section tone="white" className="pr-own">
        <div className="pr-own-grid">
          <div className="pr-own-card">
            <h2 className="nx-h3">You own everything</h2>
            <p>Your domain is registered in your name. When the project is paid, the design, code, content and every login are yours. Pay-monthly sites become yours after 12 months, even if you leave.</p>
            <p className="nx-fine">Payment: 50% to start, 50% before launch. UPI, bank transfer or an international payment link.</p>
          </div>
          <div className="pr-cmp">
            <h2 className="nx-h3">What a small business website costs elsewhere</h2>
            <dl>
              {marketPrices.map(([m, v]) => (
                <div key={m}><dt>{m}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <p className="nx-fine">Typical ranges from 2026 market price guides. VRLS prices are fixed and shown above.</p>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <Included />
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
