import { useEffect, useState } from 'react'
import { FAQ, Reviews, CaseStudies } from '../components/Bits'
import { Price } from '../currency'
import { websitePlans, monthlyPlans, currencies } from '../prices'
import HeroVisual from '../components/HeroVisual'
import { Link } from '../router'
import { industries, industryByPath, sectors } from '../demos/industries'
import { LANGS } from '../demos/locales'
import { faqs } from '../routes'
import { brand, waLink } from '../brand'
import {
  IconArrow, IconWhatsApp, IconLayout, IconCart, IconLayers, IconSearch, IconMegaphone, IconWrench, IconGift, IconCoins, IconKey,
  IconClock, IconCompass, IconPalette, IconCode, IconRocket, IconGauge, IconShield, IconLock, IconLanguage, IconDevices, IconChart,
  IconFood, IconHeart, IconSparkle, IconCap, IconBag, IconHome, IconBriefcase, IconBuilding, IconPlane, IconCar, IconFactory, IconLeaf, IconUsers, IconGlobe,
} from '../icons'

// Rotates in step with the live device mockup on the right (HeroVisual tabs).
const words = ['websites', 'online stores', 'booking apps', 'dashboards', 'client portals']

const markets = [
  ['IN', 'India'], ['AE', 'UAE'], ['SA', 'Saudi Arabia'], ['GB', 'United Kingdom'], ['US', 'United States'],
  ['AU', 'Australia'], ['SG', 'Singapore'], ['CA', 'Canada'], ['DE', 'Germany'], ['FR', 'France'], ['MY', 'Malaysia'], ['QA', 'Qatar'],
]

const services = [
  [IconLayout, 'Web design & development', ['Corporate', 'Landing pages', 'Multilingual'], '/websites'],
  [IconCart, 'E-commerce', ['Stores', 'Payments', 'Catalogues'], '/websites'],
  [IconLayers, 'Web apps & portals', ['Bookings', 'Dashboards', 'CRM'], '/work'],
  [IconSearch, 'SEO & performance', ['Technical SEO', 'Core Web Vitals', 'Local'], '/digital-marketing'],
  [IconMegaphone, 'Digital marketing', ['Google Ads', 'Meta Ads', 'Social'], '/digital-marketing'],
  [IconWrench, 'Care & hosting', ['Updates', 'Backups', 'Uptime'], '/pricing'],
]

const promises = [
  [IconGift, 'Free demo first'],
  [IconCoins, 'Fixed price'],
  [IconKey, 'You own the code'],
  [IconClock, `Replies ${brand.reply}`],
]

const process = [
  [IconCompass, 'Discover', 'Goals, audience, scope'],
  [IconPalette, 'Design', 'A free homepage demo'],
  [IconCode, 'Build', 'Fast, secure, tested'],
  [IconRocket, 'Launch & grow', 'SEO, ads, care'],
]

const standards = [
  [IconGauge, '90+', 'PageSpeed target'],
  [IconDevices, 'Mobile-first', 'Every screen size'],
  [IconShield, 'WCAG', 'Accessible by design'],
  [IconLock, 'HTTPS', 'Security headers'],
  [IconLanguage, 'RTL ready', 'Arabic & multilingual'],
  [IconChart, 'Analytics', 'GA4 & Search Console'],
]

const sectorIcon = {
  food: IconFood, health: IconHeart, beauty: IconSparkle, education: IconCap, retail: IconBag, home: IconHome, pro: IconBriefcase,
  property: IconBuilding, travel: IconPlane, auto: IconCar, industry: IconFactory, agri: IconLeaf, community: IconUsers,
}

const showcase = ['/work/websites/restaurant', '/work/websites/real-estate', '/work/websites/salon-spa', '/work/websites/interior-design']
  .map((p) => industryByPath[p])
  .filter((x) => x && x.img)
  .slice(0, 4)

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const on = (e) => setI(e.detail % words.length)
    window.addEventListener('vrlss:shown', on)
    return () => window.removeEventListener('vrlss:shown', on)
  }, [])
  return (
    <span className="st-rot" aria-hidden="true">
      {words.map((w, k) => <span key={w} className={k === i ? 'on' : ''}>{w}</span>)}
      <span className="st-rot-size">{words[i]}</span>
    </span>
  )
}

function Eyebrow({ children }) {
  return <p className="st-eyebrow"><i aria-hidden="true" />{children}</p>
}

export default function Home() {
  const nLangs = Object.keys(LANGS).length
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="st-hero hm-hero">
        <div className="nx-wrap st-hero-grid">
          <div className="st-hero-copy">
            <p className="st-badge"><span className="st-dot" aria-hidden="true" />Design &amp; engineering studio <b>·</b> Worldwide</p>
            <h1 className="st-h1" aria-label="We build websites, online stores and web apps that grow.">
              <span className="st-l1">We build</span>
              <RotatingWord />
              <span className="st-l3">that grow.</span>
            </h1>
            <p className="st-lead">Design, engineering and marketing for ambitious brands worldwide.</p>
            <div className="st-actions">
              <Link to="/contact?plan=demo" className="nx-btn nx-btn-primary st-btn-xl"><span>Start a project</span><IconArrow width={18} height={18} /></Link>
              <Link to="/work" className="nx-btn nx-btn-outline st-btn-xl"><span>View our work</span></Link>
            </div>
            <ul className="st-promise">
              {promises.map(([Ico, t]) => <li key={t}><Ico width={18} height={18} /><span>{t}</span></li>)}
            </ul>
          </div>
          <div className="st-hero-visual"><HeroVisual /></div>
        </div>
        <div className="st-markets" aria-label="Where we work">
          <span className="st-markets-label"><IconGlobe width={16} height={16} /> Available in</span>
          <div className="st-mq">
            <div className="st-mq-track" data-marquee="-1" data-speed="0.4">
              {[0, 1].map((k) => (
                <span key={k} className="st-mq-set" {...(k ? { 'aria-hidden': 'true' } : {})}>
                  {markets.map(([cc, n]) => <span key={cc} className="st-mk"><span className="st-cc" aria-hidden="true">{cc}</span>{n}</span>)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Numbers ---------- */}
      <section className="st-stats" aria-label="At a glance">
        <div className="nx-wrap st-stats-grid">
          <div><b><span data-count={industries.length}>{industries.length}</span></b><span>Industry demos</span></div>
          <div><b><span data-count={nLangs}>{nLangs}</span></b><span>Languages, incl. Arabic</span></div>
          <div><b><span data-count={currencies.length}>{currencies.length}</span></b><span>Currencies</span></div>
          <div><b><span data-count="3">3</span><small>days</small></b><span>To your first demo</span></div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="st-sec" aria-labelledby="svc-h">
        <div className="nx-wrap">
          <header className="st-head">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="st-h2" id="svc-h">One team, end to end.</h2>
          </header>
          <div className="st-svc">
            {services.map(([Ico, t, tags, to], i) => (
              <Link key={t} to={to} className="st-card st-svc-card" style={{ '--k': i }}>
                <span className="st-ico"><Ico width={26} height={26} /></span>
                <strong>{t}</strong>
                <span className="st-tags">{tags.map((g) => <i key={g}>{g}</i>)}</span>
                <span className="st-go" aria-hidden="true"><IconArrow width={18} height={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Work ---------- */}
      <section className="st-sec st-dark" aria-labelledby="work-h">
        <div className="nx-wrap">
          <header className="st-head st-head-row">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="st-h2" id="work-h">See it live. Not in slides.</h2>
            </div>
            <Link to="/work" className="nx-btn nx-btn-outline"><span>All {industries.length} demos</span><IconArrow width={18} height={18} /></Link>
          </header>
          <div className="st-work">
            {showcase.map((s, i) => (
              <Link key={s.slug} to={s.path} className={`st-shot st-shot-${i}`}>
                <img src={`/assets/photos/${s.img}.webp`} alt="" loading="lazy" decoding="async" width="1000" height="667" />
                <span className="st-shot-meta">
                  <i>{s.cat}</i>
                  <strong>{s.name}</strong>
                </span>
                <span className="st-shot-go" aria-hidden="true"><IconArrow width={20} height={20} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Industries ---------- */}
      <section className="st-sec" aria-labelledby="ind-h">
        <div className="nx-wrap">
          <header className="st-head st-head-center">
            <Eyebrow>Industries</Eyebrow>
            <h2 className="st-h2" id="ind-h">Built for {sectors.length} sectors.</h2>
          </header>
          <div className="st-ind">
            {sectors.map(([k, label]) => {
              const Ico = sectorIcon[k] || IconBriefcase
              const n = industries.filter((x) => x.sector === k).length
              return (
                <Link key={k} to={`/work?sector=${k}`} className="st-ind-tile">
                  <Ico width={24} height={24} />
                  <strong>{label}</strong>
                  <span>{n} demo{n === 1 ? '' : 's'}</span>
                </Link>
              )
            })}
            <Link to="/work" className="st-ind-tile st-ind-all">
              <IconArrow width={24} height={24} />
              <strong>All {industries.length} demos</strong>
              <span>Open the gallery</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="st-sec st-soft" aria-labelledby="flow-h">
        <div className="nx-wrap">
          <header className="st-head st-head-center">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="st-h2" id="flow-h">Four steps to launch.</h2>
          </header>
          <ol className="st-flow">
            {process.map(([Ico, t, d], i) => (
              <li key={t}>
                <span className="st-flow-ico"><Ico width={26} height={26} /><b>{String(i + 1).padStart(2, '0')}</b></span>
                <strong>{t}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Standards ---------- */}
      <section className="st-sec st-dark st-std" aria-labelledby="std-h">
        <div className="nx-wrap st-std-grid">
          <header className="st-head">
            <Eyebrow>Engineering standards</Eyebrow>
            <h2 className="st-h2" id="std-h">Built to global standards.</h2>
            <p className="st-sub">Every project, every budget.</p>
          </header>
          <ul className="st-std-list">
            {standards.map(([Ico, b, s]) => (
              <li key={b}><Ico width={24} height={24} /><b>{b}</b><span>{s}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Engagement ---------- */}
      <section className="st-sec" aria-labelledby="eng-h">
        <div className="nx-wrap">
          <header className="st-head st-head-center">
            <Eyebrow>Engagement</Eyebrow>
            <h2 className="st-h2" id="eng-h">Transparent pricing.</h2>
          </header>
          <div className="st-eng">
            <Link to="/pricing" className="st-card st-eng-card">
              <span className="st-ico"><IconRocket width={24} height={24} /></span>
              <strong>Project</strong>
              <span className="st-eng-price"><small>from</small> <Price usd={websitePlans[0].price} inr={websitePlans[0].inr} /></span>
              <span className="st-eng-note">One-time, fixed price</span>
            </Link>
            <Link to="/pricing#monthly" className="st-card st-eng-card is-hot">
              <span className="st-ico"><IconClock width={24} height={24} /></span>
              <strong>Monthly</strong>
              <span className="st-eng-price"><small>from</small> <Price usd={monthlyPlans[0].price} /><small>/mo</small></span>
              <span className="st-eng-note">Build, hosting and care</span>
            </Link>
            <Link to="/contact?plan=custom" className="st-card st-eng-card">
              <span className="st-ico"><IconLayers width={24} height={24} /></span>
              <strong>Custom</strong>
              <span className="st-eng-price"><small>from</small> <Price usd={websitePlans[2].price} inr={websitePlans[2].inr} /></span>
              <span className="st-eng-note">Stores, apps and portals</span>
            </Link>
          </div>
        </div>
      </section>

      <CaseStudies />
      <Reviews />

      {/* ---------- FAQ ---------- */}
      <section className="st-sec st-soft" aria-labelledby="faq-h">
        <div className="nx-wrap st-faq">
          <header className="st-head">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="st-h2" id="faq-h">Questions, answered.</h2>
          </header>
          <FAQ items={[6, 2, 3, 4, 5, 1].map((i) => faqs.general[i]).filter(Boolean)} />
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="st-final" aria-labelledby="go-h">
        <div className="nx-wrap st-final-inner">
          <h2 className="st-final-h" id="go-h">Let's build what's next.</h2>
          <p className="st-lead">Your first demo is free.</p>
          <div className="st-actions">
            <Link to="/contact?plan=demo" className="nx-btn nx-btn-primary st-btn-xl"><span>Start a project</span><IconArrow width={18} height={18} /></Link>
            <a className="nx-btn nx-btn-outline st-btn-xl" href={waLink()} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={20} height={20} /><span>WhatsApp</span></a>
          </div>
        </div>
      </section>
    </>
  )
}
