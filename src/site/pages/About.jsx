import { Section, Head, CtaBand, PageHero, Team, Reviews } from '../components/Bits'
import { brand, registration } from '../brand'
import { industries } from '../demos/industries'
import { IconCoins, IconChat, IconTarget, IconKey, IconPin, IconGlobe, IconClock, IconLayers, IconUsers, IconEye } from '../icons'

const values = [
  [IconCoins, 'Clear prices', 'Agreed in writing first.'],
  [IconChat, 'Plain language', 'No jargon, ever.'],
  [IconTarget, 'Honest results', 'No promises we cannot keep.'],
  [IconKey, 'Your ownership', 'Domain, code and accounts.'],
]

const facts = [
  [IconPin, 'Based in', brand.location],
  [IconGlobe, 'Working', 'Remote, worldwide'],
  [IconClock, 'Replies', brand.reply.charAt(0).toUpperCase() + brand.reply.slice(1)],
  [IconLayers, 'Live demos', `${industries.length} industries`],
]

const oneVsAgency = [
  ['Who you talk to', 'The people doing the work', 'An account manager'],
  ['What it costs', 'Fixed, no overheads', 'Higher, covers a large team'],
  ['Change requests', 'Same or next day', 'Queued'],
  ['How to judge us', 'A free demo of your site', 'Portfolio and reviews'],
]

export default function About() {
  return (
    <>
      <PageHero
        crumb="Studio"
        title="A focused studio for the web."
        lead="Design, engineering and marketing under one roof."
        chips={[[IconUsers, 'Specialist team'], [IconEye, 'See work before you pay'], [IconGlobe, 'Clients worldwide welcome']]}
      />

      <section className="ab-facts" aria-label="Studio facts">
        <div className="nx-wrap ab-facts-grid">
          {facts.map(([Ico, k, v]) => (
            <div key={k}><Ico width={22} height={22} /><span>{k}</span><b>{v}</b></div>
          ))}
        </div>
      </section>

      <Section tone="white">
        <Head title="What we stand for" />
        <ul className="ab-values">
          {values.map(([Ico, t, d]) => (
            <li key={t}>
              <span className="st-ico"><Ico width={24} height={24} /></span>
              <strong>{t}</strong>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <Head title="The team" lead="No hand-offs. You talk to the people doing the work." />
        <Team />
      </Section>

      <Section tone="white">
        <Head title="Studio vs. agency" />
        <div className="nx-compare" role="table" aria-label="Our studio compared with a typical agency">
          <div className="nx-compare-row nx-compare-head" role="row">
            <span role="columnheader"><span className="nx-sr">Question</span></span>
            <span role="columnheader">{brand.name}</span>
            <span role="columnheader">Typical agency</span>
          </div>
          {oneVsAgency.map(([q, us, them]) => (
            <div className="nx-compare-row" role="row" key={q}>
              <span role="rowheader">{q}</span>
              <span role="cell">{us}</span>
              <span role="cell">{them}</span>
            </div>
          ))}
        </div>
        {registration.udyam && <p className="nx-fine">Udyam {registration.udyam}</p>}
      </Section>

      <Reviews />
      <CtaBand />
    </>
  )
}
