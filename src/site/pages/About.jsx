import { Section, Head, CtaBand, PageHero, LaunchOffer } from '../components/Bits'
import { LogoMark } from '../components/Logo'
import { brand } from '../brand'

const promises = [
  ['Clear prices', 'You agree the cost in writing before any work starts. No surprises later.'],
  ['Plain language', 'We explain what we are doing and why, without jargon.'],
  ['Honest results', 'We never promise rankings or sales we cannot control.'],
  ['Your ownership', 'Your domain, accounts, code and content are in your name from day one.'],
]

const oneVsAgency = [
  ['Who you talk to', 'The person building your site', 'An account manager who passes messages on'],
  ['What it costs', 'Fixed price, no office overheads', 'Higher fees that cover a larger team'],
  ['How fast changes happen', 'Usually the same or next day', 'Queued behind other clients'],
  ['What you should check', 'Our demos and the free demo of your own site', 'Their portfolio and reviews'],
]

export default function About() {
  return (
    <>
      <PageHero
        crumb="About"
        title={`About ${brand.name}`}
        lead={`A one-person web studio in ${brand.location}. One person designs your site, builds it and helps customers find it.`}
      />
      <Section tone="white">
        <div className="nx-about">
          <div>
            <h2 className="nx-h2">Why this studio exists</h2>
            <p>
              Most small businesses are sold packages they do not understand, by agencies they never hear from again.{' '}
              {brand.name} offers the opposite: one person who builds your website and markets it, with a fixed price
              and a direct WhatsApp line.
            </p>
            <p>
              {brand.name} is run by {brand.founder}, a developer based in {brand.location}. He started the studio in
              2026 after building {`dozens of`} working demo sites for restaurants, clinics, coaching centres, shops and
              more. You can try every one of them on the Work page.
            </p>
            <p>
              We are new and do not have a long client list yet. That is why every project starts with a free demo of
              your own homepage. You judge the work itself, not a promise.
            </p>
          </div>
          <aside className="nx-card-founder">
            <LogoMark size={56} />
            <strong>{brand.founder}</strong>
            <span>{brand.founderRole}</span>
            <span className="nx-card-meta">{brand.location}</span>
            <span className="nx-card-meta">Replies within one business day</span>
          </aside>
        </div>
      </Section>
      <Section tone="paper">
        <Head
          title="A one-person studio, compared with an agency"
          lead="Neither is right for everyone. Here is the honest difference."
        />
        <div className="nx-compare" role="table" aria-label="One-person studio compared with an agency">
          <div className="nx-compare-row nx-compare-head" role="row">
            <span role="columnheader"><span className="nx-sr">Question</span></span>
            <span role="columnheader">{brand.name}</span>
            <span role="columnheader">A typical agency</span>
          </div>
          {oneVsAgency.map(([q, us, them]) => (
            <div className="nx-compare-row" role="row" key={q}>
              <span role="rowheader">{q}</span>
              <span role="cell">{us}</span>
              <span role="cell">{them}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="white">
        <Head title="What we promise every client" />
        <div className="nx-features">
          {promises.map(([t, d]) => (
            <div className="nx-feature" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="ink">
        <LaunchOffer />
      </Section>
      <CtaBand title="Work with us" />
    </>
  )
}
