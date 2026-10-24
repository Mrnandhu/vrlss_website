import { useEffect, useRef, useState } from 'react'
import { FAQ, Reviews, CaseStudies } from '../components/Bits'
import { Price } from '../currency'
import { websitePlans, monthlyPlans } from '../prices'
import { Link } from '../router'
import { industries, industryByPath, sectors } from '../demos/industries'
import { LANGS } from '../demos/locales'
import { currencies } from '../prices'
import { faqs } from '../routes'
import { brand, waLink } from '../brand'
import {
  IconArrow, IconWhatsApp, IconCheck, IconMail, IconLayout, IconCart, IconLayers, IconSearch, IconMegaphone, IconWrench,
  IconGauge, IconDevices, IconShield, IconLock, IconLanguage, IconChart, IconFood, IconHeart, IconSparkle, IconCap, IconBag,
  IconHome, IconBriefcase, IconBuilding, IconPlane, IconCar, IconFactory, IconLeaf, IconUsers,
} from '../icons'
import './home.css'

// ---------- Content (edit here) ----------
const SHOWCASE = ['restaurant', 'salon-spa', 'dental-clinic', 'real-estate']
  .map((slug) => ({ slug, demo: industryByPath[`/work/websites/${slug}`] }))
  .filter((x) => x.demo)

const PROMISES = ['Free homepage demo first', 'Fixed price, in writing', 'You own the domain and code', `Replies ${brand.reply}`]

const FACTS = [
  [industries.length, 'industry demos to explore'],
  [Object.keys(LANGS).length, 'languages, including Arabic'],
  [currencies.length, 'currencies for pricing'],
  ['3 days', 'to your free demo'],
]

const STEPS = [
  ['Get your free demo', 'Tell us about your business. In 3 working days you get a link to your new homepage, designed for you.'],
  ['Approve it, then pay half', 'Ask for changes until it feels right. Pay 50% only when you are happy, and we build the full site.'],
  ['Launch and own it', 'We test on every screen size and go live. You pay the rest and own the domain, design and code.'],
]

const SERVICES = [
  [IconLayout, 'Websites', 'Business sites and landing pages that load fast and bring enquiries.', '/websites'],
  [IconCart, 'Online stores', 'Catalogues, carts and UPI or card payments, ready to sell.', '/websites'],
  [IconLayers, 'Web apps and portals', 'Bookings, dashboards, CRMs and customer portals built around your work.', '/work'],
  [IconSearch, 'SEO', 'Show up on Google and Google Maps when people search for what you sell.', '/digital-marketing'],
  [IconMegaphone, 'Digital marketing', 'Google Ads, Meta Ads and social media that bring measurable leads.', '/digital-marketing'],
  [IconWrench, 'Care and hosting', 'Updates, backups and uptime checks, so your site keeps working.', '/pricing'],
]

const SECTOR_ICON = {
  food: IconFood, health: IconHeart, beauty: IconSparkle, education: IconCap, retail: IconBag, home: IconHome, pro: IconBriefcase,
  property: IconBuilding, travel: IconPlane, auto: IconCar, industry: IconFactory, agri: IconLeaf, community: IconUsers,
}

const STANDARDS = [
  [IconGauge, 'Fast on mobile data', 'We aim for 90+ on Google PageSpeed.'],
  [IconDevices, 'Every screen size', 'Designed for phones first, then tablets and laptops.'],
  [IconShield, 'Accessible', 'Readable contrast, keyboard friendly, clear labels.'],
  [IconLock, 'Secure', 'HTTPS and security headers on every site.'],
  [IconLanguage, 'Multilingual', 'Telugu, Hindi, Arabic and more, right-to-left included.'],
  [IconChart, 'Measured', 'Google Analytics and Search Console set up for you.'],
]

// ---------- Hero showcase: a real desktop browser and phone, side by side ----------
const SHOW_MS = 7000 // time on each demo before the showcase moves to the next one

function Showcase() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(false) // switched on in the browser (not for reduced motion)
  const [paused, setPaused] = useState(false)
  const box = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setAuto(true)
  }, [])
  // Only rotate while the showcase is on screen.
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const el = box.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const running = auto && !paused && visible
  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setI((n) => (n + 1) % SHOWCASE.length), SHOW_MS)
    return () => clearTimeout(t)
  }, [running, i])
  const choose = (k) => {
    setAuto(false) // the visitor took control
    setI(k)
  }
  use3DTilt(box)
  const cur = SHOWCASE[i]
  if (!cur) return null
  const host = cur.demo.name.toLowerCase().replace(/[^a-z0-9]+/g, '') + '.com'
  return (
    <figure
      ref={box}
      className="hp-show"
      aria-label="Live demo websites on a laptop and a phone"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ '--show-ms': `${SHOW_MS}ms` }}
    >
      <div className="hp-stage">
      <div className="hp-devices">
        <div className="hp-laptop">
        <div className="hp-browser">
          <div className="hp-bar" aria-hidden="true">
            <i /><i /><i />
            <span>{host}</span>
          </div>
          <div className="hp-screen">
            {SHOWCASE.map((s, k) => (
              <img
                key={s.slug}
                src={`/home/${s.slug}-d.webp`}
                alt={k === i ? `${s.demo.name} demo website on a laptop` : ''}
                width="1200"
                height="1250"
                className={k === i ? 'is-on' : ''}
                fetchPriority={k === 0 ? 'high' : 'low'}
                decoding="async"
              />
            ))}
          </div>
        </div>
        <div className="hp-base" aria-hidden="true" />
        </div>
        <div className="hp-phone">
          <div className="hp-phone-screen">
            {SHOWCASE.map((s, k) => (
              <img
                key={s.slug}
                src={`/home/${s.slug}-m.webp`}
                alt={k === i ? `${s.demo.name} demo website on a phone` : ''}
                width="420"
                height="1669"
                className={k === i ? 'is-on' : ''}
                fetchPriority={k === 0 ? 'auto' : 'low'}
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
      </div>
      <figcaption className="hp-tabs">
        <div className="hp-tablist" role="tablist" aria-label="Choose a demo">
          {SHOWCASE.map((s, k) => (
            <button
              key={s.slug}
              type="button"
              role="tab"
              aria-selected={k === i}
              className={k === i ? 'is-on' : ''}
              onClick={() => choose(k)}
            >
              {s.demo.cat}
              {k === i && running && <span className="hp-tab-progress" key={i} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <Link to={cur.demo.path} className="hp-open">
          Open the {cur.demo.cat.toLowerCase()} demo <IconArrow width={16} height={16} />
        </Link>
      </figcaption>
    </figure>
  )
}

// 3D: the devices turn toward the mouse (laptops) and tip back as the hero scrolls away.
// Only CSS variables change here; the browser animates them on the graphics chip.
function use3DTilt(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let raf = 0
    let px = 0
    let py = 0
    let sp = 0
    const apply = () => {
      raf = 0
      el.style.setProperty('--px', px.toFixed(3))
      el.style.setProperty('--py', py.toFixed(3))
      el.style.setProperty('--sp', sp.toFixed(3))
    }
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply) }
    const clamp = (v) => Math.max(-1, Math.min(1, v))
    const onMove = (e) => {
      if (sp >= 1) return
      const r = el.getBoundingClientRect()
      px = clamp(((e.clientX - r.left) / r.width) * 2 - 1)
      py = clamp(((e.clientY - r.top) / r.height) * 2 - 1)
      queue()
    }
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      sp = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height)))
      queue()
    }
    if (fine) window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}

// Pricing cards tilt in 3D under the mouse, with a soft light sheen (mouse only).
function usePlanTilt(root) {
  useEffect(() => {
    const el = root.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = [...el.querySelectorAll('.hp-plan')]
    const move = (e) => {
      const c = e.currentTarget
      const r = c.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 2 - 1
      const y = ((e.clientY - r.top) / r.height) * 2 - 1
      c.style.setProperty('--tx', x.toFixed(3))
      c.style.setProperty('--ty', y.toFixed(3))
      c.style.setProperty('--tm', Math.min(1, Math.hypot(x, y)).toFixed(3))
      c.style.setProperty('--gx', `${((x + 1) * 50).toFixed(1)}%`)
      c.style.setProperty('--gy', `${((y + 1) * 50).toFixed(1)}%`)
    }
    const leave = (e) => {
      const c = e.currentTarget
      c.style.setProperty('--tm', '0')
    }
    cards.forEach((c) => { c.addEventListener('pointermove', move); c.addEventListener('pointerleave', leave) })
    return () => cards.forEach((c) => { c.removeEventListener('pointermove', move); c.removeEventListener('pointerleave', leave) })
  }, [root])
}

// Gentle entrances for content below the first screen, plus counting numbers.
// Content already on screen at load is left alone (no flash), and nothing moves for reduced motion.
function useHomeMotion(root) {
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const items = [...el.querySelectorAll('[data-rv]')].filter((n) => n.getBoundingClientRect().top > window.innerHeight * 0.92)
    items.forEach((n) => n.classList.add('rv-wait'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('is-in')
          io.unobserve(e.target)
          const num = e.target.querySelector('[data-count]')
          if (num) countUp(num)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    items.forEach((n) => io.observe(n))
    // Safety net: after a very fast flick, anything already on or above the screen is shown.
    let raf = 0
    const sweep = () => {
      raf = 0
      el.querySelectorAll('.rv-wait:not(.is-in)').forEach((n) => {
        if (n.getBoundingClientRect().top < window.innerHeight) {
          n.classList.add('is-in')
          io.unobserve(n)
        }
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sweep) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [root])
}

function countUp(node) {
  const end = Number(node.dataset.count)
  if (!end) return
  const start = performance.now()
  const dur = 1100
  const step = (t) => {
    const p = Math.min(1, (t - start) / dur)
    node.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))))
    if (p < 1) requestAnimationFrame(step)
  }
  node.textContent = '0'
  requestAnimationFrame(step)
}

export default function HomePage() {
  const root = useRef(null)
  useHomeMotion(root)
  usePlanTilt(root)
  const project = websitePlans[0]
  const custom = websitePlans.find((p) => p.id === 'custom') || websitePlans[websitePlans.length - 1]

  return (
    <div className="hp" ref={root}>
      {/* ---------- Hero ---------- */}
      <section className="hp-hero" aria-labelledby="hp-h1">
        <div className="nx-wrap hp-hero-grid">
          <div className="hp-hero-copy">
            <p className="hp-kicker">Web design and development studio, working worldwide</p>
            <h1 id="hp-h1" className="hp-h1">We build websites that grow your business.</h1>
            <p className="hp-lead">
              See your new homepage before you pay anything. We design it free in 3 days, then build the full site at a fixed price.
            </p>
            <div className="hp-actions">
              <Link to="/start" className="hp-btn hp-btn-main">
                Get your free demo <IconArrow width={18} height={18} />
              </Link>
              <a className="hp-btn hp-btn-ghost" href={waLink()} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp width={20} height={20} /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <Showcase />
          <ul className="hp-promises">
            {PROMISES.map((p) => (
              <li key={p}><IconCheck width={16} height={16} />{p}</li>
            ))}
          </ul>
        </div>
        <div className="nx-wrap">
          <dl className="hp-facts">
            {FACTS.map(([n, l], k) => (
              <div key={l} data-rv style={{ '--i': k }}>
                <dt>{typeof n === 'number' ? <span data-count={n}>{n}</span> : n}</dt>
                <dd>{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="hp-sec hp-light" aria-labelledby="hp-steps-h">
        <div className="nx-wrap">
          <header className="hp-head" data-rv>
            <h2 id="hp-steps-h" className="hp-h2">See it first. Pay when you like it.</h2>
            <p className="hp-sub">Three steps from first message to a live website.</p>
          </header>
          <ol className="hp-steps">
            {STEPS.map(([t, d], k) => (
              <li key={t} data-rv style={{ '--i': k }}>
                <span className="hp-step-n" aria-hidden="true">{k + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="hp-sec hp-white" aria-labelledby="hp-svc-h">
        <div className="nx-wrap">
          <header className="hp-head" data-rv>
            <h2 id="hp-svc-h" className="hp-h2">Everything your business needs online</h2>
            <p className="hp-sub">One team for design, development and marketing.</p>
          </header>
          <ul className="hp-services">
            {SERVICES.map(([Ico, t, d, to], k) => (
              <li key={t} data-rv style={{ '--i': k }}>
                <Link to={to} className="hp-svc">
                  <span className="hp-svc-ico" aria-hidden="true"><Ico width={22} height={22} /></span>
                  <span className="hp-svc-text">
                    <strong>{t}</strong>
                    <span>{d}</span>
                  </span>
                  <IconArrow className="hp-svc-go" width={18} height={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Industry demos ---------- */}
      <section className="hp-sec hp-light" aria-labelledby="hp-ind-h">
        <div className="nx-wrap">
          <header className="hp-head hp-head-row" data-rv>
            <div>
              <h2 id="hp-ind-h" className="hp-h2">{industries.length} demo websites, {sectors.length} industries</h2>
              <p className="hp-sub">Open the one closest to your business and see what yours could look like.</p>
            </div>
            <Link to="/work" className="hp-link">See all demos <IconArrow width={16} height={16} /></Link>
          </header>
          <ul className="hp-sectors">
            {sectors.map(([k, label], idx) => {
              const Ico = SECTOR_ICON[k] || IconBriefcase
              const n = industries.filter((x) => x.sector === k).length
              return (
                <li key={k} data-rv style={{ '--i': idx }}>
                  <Link to={`/work?sector=${k}`} className="hp-sector">
                    <Ico width={22} height={22} aria-hidden="true" />
                    <strong>{label}</strong>
                    <span>{n} demo{n === 1 ? '' : 's'}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Standards ---------- */}
      <section className="hp-sec hp-navy" aria-labelledby="hp-std-h">
        <div className="nx-wrap">
          <header className="hp-head" data-rv>
            <h2 id="hp-std-h" className="hp-h2">Built properly, on every project</h2>
            <p className="hp-sub">The same standards whether you pick the smallest plan or a custom build.</p>
          </header>
          <ul className="hp-standards">
            {STANDARDS.map(([Ico, t, d], k) => (
              <li key={t} data-rv style={{ '--i': k }}>
                <Ico width={22} height={22} aria-hidden="true" />
                <strong>{t}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="hp-sec hp-dark" aria-labelledby="hp-price-h">
        <div className="nx-wrap">
          <header className="hp-head" data-rv>
            <h2 id="hp-price-h" className="hp-h2">Clear prices, in your currency</h2>
            <p className="hp-sub">Your first homepage demo is free, before you pay anything.</p>
          </header>
          <div className="hp-plans" data-rv>
            <Link to="/pricing" className="hp-plan">
              <strong>Project</strong>
              <span className="hp-price"><small>from</small> <Price usd={project.price} inr={project.inr} /></span>
              <span className="hp-plan-note">One-time, fixed price. Pay 50% to start.</span>
              <span className="hp-plan-go">See website plans <IconArrow width={16} height={16} /></span>
            </Link>
            <Link to="/pricing#monthly" className="hp-plan is-featured">
              <span className="hp-flag">Most flexible</span>
              <strong>Monthly</strong>
              <span className="hp-price"><small>from</small> <Price usd={monthlyPlans[0].price} /><small>/mo</small></span>
              <span className="hp-plan-note">Website, hosting and care in one monthly fee.</span>
              <span className="hp-plan-go">See monthly plans <IconArrow width={16} height={16} /></span>
            </Link>
            <Link to="/contact?plan=custom" className="hp-plan">
              <strong>Custom</strong>
              <span className="hp-price"><small>from</small> <Price usd={custom.price} inr={custom.inr} /></span>
              <span className="hp-plan-note">Online stores, booking systems and portals.</span>
              <span className="hp-plan-go">Get a quote <IconArrow width={16} height={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Proof + FAQ ---------- */}
      <div className="hp-light">
        <CaseStudies />
        <Reviews />
        <section className="hp-sec" aria-labelledby="hp-faq-h">
          <div className="nx-wrap hp-faq">
            <header className="hp-head" data-rv>
              <h2 id="hp-faq-h" className="hp-h2">Questions, answered</h2>
              <p className="hp-sub">
                Something else? <a href={waLink()} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>.
              </p>
            </header>
            <div data-rv>
              <FAQ items={[6, 2, 3, 4, 5, 1].map((k) => faqs.general[k]).filter(Boolean)} />
            </div>
          </div>
        </section>
      </div>

      {/* ---------- Final call to action ---------- */}
      <section className="hp-final" aria-labelledby="hp-go-h">
        <div className="nx-wrap hp-final-inner" data-rv>
          <h2 id="hp-go-h" className="hp-final-h">Let's build what's next.</h2>
          <p className="hp-lead">Your first demo is free. We reply {brand.reply}.</p>
          <div className="hp-actions">
            <Link to="/start" className="hp-btn hp-btn-main">
              Get your free demo <IconArrow width={18} height={18} />
            </Link>
            <a className="hp-btn hp-btn-ghost" href={waLink()} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp width={20} height={20} /> Chat on WhatsApp
            </a>
          </div>
          <a className="hp-mail" href={`mailto:${brand.email}`}><IconMail width={16} height={16} /> {brand.email}</a>
        </div>
      </section>
    </div>
  )
}
