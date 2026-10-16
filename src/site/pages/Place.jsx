import { Section, Head, FAQ, CtaBand, PageHero, Included, Reviews, ProofLine } from '../components/Bits'
import { Link } from '../router'
import { industries, monogram } from '../demos/industries'
import { websitePlans, monthlyPlans, formatPrice } from '../prices'
import { brand, waLink } from '../brand'
import { IconArrow, IconWhatsApp, IconPin, IconCheck } from '../icons'
import { placeFaqs } from '../routes'

const bySlug = Object.fromEntries(industries.map((x) => [x.slug, x]))

function DemoGrid({ slugs, where }) {
  return (
    <div className="pl-demos">
      {slugs.map((k) => bySlug[k]).filter(Boolean).map((x) => (
        <Link key={x.slug} to={x.path} className="pl-demo">
          <span className="pl-demo-media" style={{ '--c1': x.pal[2], '--c2': x.pal[3] }}>
            {x.img ? <img src={`/assets/photos/${x.img}-sm.webp`} alt="" loading="lazy" width="480" height="320" /> : <span className={`mono${x.dark ? ' is-dark' : ''}`} style={{ '--mb': x.pal[0], '--mi': x.pal[1], '--ma': x.pal[2] }}><b>{monogram(x.name)}</b><small>{x.cat}</small></span>}
          </span>
          <span className="pl-demo-body">
            <span>{x.cat}</span>
            <strong>{x.name}</strong>
          </span>
          <IconArrow width={16} height={16} />
        </Link>
      ))}
      <p className="nx-fine pl-demo-note">Live demo websites you can open on your phone. Yours is designed for your business{where ? ` in ${where}` : ''}.</p>
    </div>
  )
}

const steps = (where) => [
  ['Message us', `Send your business name${where ? ` and area in ${where}` : ''} on WhatsApp.`],
  ['See your free demo', 'A working homepage for your business in about 3 working days. Free, no obligation.'],
  ['Approve and launch', 'Like it? Pay 50% and we build and launch the full site.'],
]

function Steps({ where }) {
  return (
    <ol className="pl-steps">
      {steps(where).map(([t, d], i) => (
        <li key={t}><span>{i + 1}</span><div><strong>{t}</strong><p>{d}</p></div></li>
      ))}
    </ol>
  )
}

export function CityPage({ place }) {
  const msg = `Hi Sai, I have a business in ${place.name} and I'd like a free website demo.`
  return (
    <>
      <PageHero crumb={`Web design in ${place.name}`} title={`Website design in ${place.name}`} lead={place.intro} />
      <section className="nx-section pl-top">
        <div className="nx-wrap pl-top-grid">
          <div className="pl-offer">
            <p className="pl-kicker"><IconPin width={16} height={16} /> {place.name}, {place.state}</p>
            <h2 className="nx-h2">A free demo of your new homepage, before you pay anything</h2>
            <div className="nx-hero-actions">
              <a className="nx-btn nx-btn-primary" href={waLink(msg)} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={20} height={20} /><span>Get my free demo</span></a>
              <Link to="/work" className="nx-btn nx-btn-outline"><span>See all demos</span></Link>
            </div>
            <ProofLine demos={industries.length} />
          </div>
          <div className="pl-prices">
            <h2 className="nx-h3">Prices for {place.name} businesses</h2>
            <ul>
              {websitePlans.map((p) => (
                <li key={p.id}>
                  <div><strong>{p.name}</strong><span>{p.features[0]}</span></div>
                  <b>{p.from ? 'from ' : ''}{formatPrice(p.price, 'INR', p.inr)}</b>
                </li>
              ))}
            </ul>
            <p className="nx-fine">Fixed price in writing. 50% to start, 50% before launch. No GST added.</p>
          </div>
        </div>
      </section>

      <Section tone="white">
        <Head title={`Demo websites for ${place.name} businesses`} />
        <DemoGrid slugs={place.demos} where={place.name} />
      </Section>

      <Section tone="paper">
        <Head title={`Serving all of ${place.name}`} lead="Most projects run on WhatsApp and phone calls, in Telugu or English." />
        <ul className="pl-areas">{place.areas.map((a) => <li key={a}>{a}</li>)}</ul>
        <Steps where={place.name} />
      </Section>

      <Section tone="white"><Included /></Section>
      <Reviews />

      <Section tone="paper">
        <Head title={`Questions from ${place.name} businesses`} align="center" />
        <FAQ items={placeFaqs(place)} />
      </Section>

      <CtaBand />
    </>
  )
}

export function CountryPage({ place }) {
  const cur = place.currency
  const msg = `Hi Sai, I have a business in ${place.short} and I'd like a free website demo.`
  return (
    <>
      <PageHero
        crumb={`Web design in ${place.short}`}
        title={`Website design for small businesses in ${place.name}`}
        lead={`Websites from ${formatPrice(websitePlans[0].price, cur)}, or ${formatPrice(monthlyPlans[0].price, cur)} a month. Free demo first.`}
      />
      <section className="nx-section pl-top">
        <div className="nx-wrap pl-top-grid">
          <div className="pl-offer">
            <p className="pl-kicker"><IconPin width={16} height={16} /> {place.cities.join(' · ')}</p>
            <h2 className="nx-h2">Agency-quality websites at a fraction of local prices</h2>
            <p className="nx-lead">{place.local} Our prices are fixed and shown below.</p>
            <div className="nx-hero-actions">
              <a className="nx-btn nx-btn-primary" href={waLink(msg)} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={20} height={20} /><span>Get my free demo</span></a>
              <Link to="/pricing#monthly" className="nx-btn nx-btn-outline"><span>See pay monthly</span></Link>
              {place.lang && <Link to={`/work?lang=${place.lang}`} className="nx-btn nx-btn-outline"><span>See Arabic demos</span></Link>}
            </div>
            <ProofLine demos={industries.length} />
          </div>
          <div className="pl-prices">
            <h2 className="nx-h3">Prices in {cur}</h2>
            <ul>
              {websitePlans.map((p) => (
                <li key={p.id}>
                  <div><strong>{p.name}</strong><span>One-time · {p.features[0]}</span></div>
                  <b>{p.from ? 'from ' : ''}{formatPrice(p.price, cur)}</b>
                </li>
              ))}
              {monthlyPlans.map((p) => (
                <li key={p.id}>
                  <div><strong>{p.name}</strong><span>{p.features[0]}, hosting included</span></div>
                  <b>{formatPrice(p.price, cur)}<small>/month</small></b>
                </li>
              ))}
            </ul>
            <p className="nx-fine">Approximate conversion from USD. Your quote confirms the exact amount.</p>
          </div>
        </div>
      </section>

      <Section tone="white">
        <Head title={`Built for businesses in ${place.name}`} lead={place.zone} />
        <ul className="pl-extras">
          {place.extras.map((e) => <li key={e}><IconCheck width={18} height={18} /><span>{e}</span></li>)}
        </ul>
        <DemoGrid slugs={place.demos} />
      </Section>

      <Section tone="paper"><Steps /></Section>
      <Section tone="white"><Included /></Section>
      <Reviews />

      <Section tone="paper">
        <Head title={`Questions from ${place.short} businesses`} align="center" />
        <FAQ items={placeFaqs(place)} />
      </Section>

      <CtaBand />
    </>
  )
}

// Telugu landing page
const te = {
  points: [
    ['ఉచిత డెమో', 'మీ వ్యాపారానికి హోమ్‌పేజీని సుమారు 3 రోజుల్లో ఉచితంగా తయారు చేస్తాం. నచ్చితేనే ముందుకు వెళ్దాం.'],
    ['స్థిరమైన ధరలు', 'ధరను ముందే రాతపూర్వకంగా చెబుతాం. దాచిన ఖర్చులు ఉండవు.'],
    ['ఫోన్‌లో వేగంగా', 'మొబైల్‌లో వేగంగా తెరుచుకునే, Google లో కనిపించేలా తయారు చేసిన వెబ్‌సైట్.'],
    ['అంతా మీదే', 'డొమైన్, వెబ్‌సైట్, లాగిన్‌లు అన్నీ మీ పేరు మీదే ఉంటాయి.'],
  ],
  steps: [
    ['WhatsApp చేయండి', 'మీ వ్యాపారం పేరు, ఊరు పంపండి.'],
    ['ఉచిత డెమో చూడండి', 'సుమారు 3 రోజుల్లో మీ హోమ్‌పేజీ డెమో లింక్ పంపుతాం.'],
    ['నచ్చితే లాంచ్', '50% చెల్లించండి, పూర్తి వెబ్‌సైట్ తయారు చేసి లాంచ్ చేస్తాం.'],
  ],
  plans: [
    ['స్టార్టర్', '3 పేజీల వరకు'],
    ['బిజినెస్', '8 పేజీల వరకు, Google బిజినెస్ ప్రొఫైల్‌తో'],
    ['కస్టమ్', 'ఆన్‌లైన్ స్టోర్, బుకింగ్‌లు, ప్రత్యేక అవసరాలు'],
  ],
  cities: 'విజయవాడ, గుంటూరు, విశాఖపట్నం, రాజమండ్రి, కాకినాడ, నెల్లూరు, తిరుపతి, హైదరాబాద్',
}

export function TeluguPage() {
  const msg = 'నమస్తే సాయి గారు, నా వ్యాపారానికి ఉచిత వెబ్‌సైట్ డెమో కావాలి.'
  return (
    <div lang="te" className="te-page">
      <PageHero crumb="తెలుగు" title="మీ వ్యాపారానికి కస్టమర్లను తెచ్చే వెబ్‌సైట్లు" lead="డబ్బు చెల్లించే ముందే మీ కొత్త వెబ్‌సైట్ డెమోను ఉచితంగా చూడండి." />
      <section className="nx-section pl-top">
        <div className="nx-wrap pl-top-grid">
          <div className="pl-offer">
            <p className="pl-kicker"><IconPin width={16} height={16} /> {te.cities}</p>
            <h2 className="nx-h2">ఆంధ్రప్రదేశ్ మరియు తెలంగాణ వ్యాపారాల కోసం</h2>
            <div className="nx-hero-actions">
              <a className="nx-btn nx-btn-primary" href={waLink(msg)} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={20} height={20} /><span>ఉచిత డెమో కోసం WhatsApp చేయండి</span></a>
              <Link to="/work" className="nx-btn nx-btn-outline"><span>{industries.length} డెమోలు చూడండి</span></Link>
            </div>
          </div>
          <div className="pl-prices">
            <h2 className="nx-h3">ధరలు</h2>
            <ul>
              {websitePlans.map((p, i) => (
                <li key={p.id}>
                  <div><strong>{te.plans[i][0]}</strong><span>{te.plans[i][1]}</span></div>
                  <b>{formatPrice(p.price, 'INR', p.inr)}{p.from ? ' నుండి' : ''}</b>
                </li>
              ))}
            </ul>
            <p className="nx-fine">50% ముందు, 50% లాంచ్‌కు ముందు. GST లేదు.</p>
          </div>
        </div>
      </section>
      <Section tone="white">
        <ul className="te-points">
          {te.points.map(([t, d]) => <li key={t}><IconCheck width={20} height={20} /><div><strong>{t}</strong><p>{d}</p></div></li>)}
        </ul>
      </Section>
      <Section tone="paper">
        <ol className="pl-steps">
          {te.steps.map(([t, d], i) => <li key={t}><span>{i + 1}</span><div><strong>{t}</strong><p>{d}</p></div></li>)}
        </ol>
      </Section>
      <CtaBand title="మీ వ్యాపారాన్ని ఆన్‌లైన్‌లో చూడండి" lead={`WhatsApp లో మీ వ్యాపారం పేరు పంపండి. మొదటి డెమో ఉచితం.`} />
    </div>
  )
}
