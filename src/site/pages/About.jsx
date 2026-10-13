import { Section, Head, CtaBand, PageHero } from '../components/Bits'
import { brand } from '../brand'

const values = [
  ['Clear prices', 'You agree the cost before we start. No surprises later.'],
  ['Plain language', 'We explain what we are doing and why, without jargon.'],
  ['Honest results', 'We never promise rankings or sales we cannot control.'],
  ['Your ownership', 'Your domain, accounts, code and content stay yours.'],
]

export default function About() {
  return (
    <>
      <PageHero
        crumb="About"
        title={`About ${brand.name}`}
        lead="A small, founder-led studio that builds websites and runs digital marketing for businesses around the world."
      />
      <Section tone="white">
        <div className="nx-about">
          <div>
            <h2 className="nx-h2">Why we work this way</h2>
            <p>
              Many small businesses are sold complicated packages they do not understand. We wanted to offer the
              opposite: one team that builds your website and markets it, with fixed prices and direct communication.
            </p>
            <p>
              {brand.name} is led by {brand.founder}, a developer based in {brand.location}. Working directly with
              the person who builds your project means faster answers and fewer misunderstandings. As we grow, we
              bring in trusted designers and marketers, but you will always have one clear point of contact.
            </p>
            <p>
              We work remotely with clients across the Gulf, Europe, the UK, the US and Asia, and we plan calls around
              your time zone.
            </p>
          </div>
          <aside className="nx-card-founder">
            <span className="nx-avatar" aria-hidden="true">
              {brand.founder.charAt(0)}
            </span>
            <strong>{brand.founder}</strong>
            <span>{brand.founderRole}</span>
          </aside>
        </div>
      </Section>
      <Section tone="paper">
        <Head title="How we *operate*" />
        <div className="nx-features">
          {values.map(([t, d]) => (
            <div className="nx-feature" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title="Work with us" />
    </>
  )
}
