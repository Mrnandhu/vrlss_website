import { lazy, Suspense, useContext, useEffect, useRef, useState, Component } from 'react'
import { createPortal } from 'react-dom'
import { FAQ, Reviews, CaseStudies } from '../components/Bits'
import { Price } from '../currency'
import { websitePlans, monthlyPlans } from '../prices'
import { Link, NavContext } from '../router'
import { industries, sectors } from '../demos/industries'
import { markets } from '../places'
import { faqs } from '../routes'
import { brand, waLink } from '../brand'
import {
  IconArrow, IconWhatsApp, IconLayout, IconCart, IconLayers, IconSearch, IconMegaphone, IconWrench, IconGift, IconCoins, IconKey,
  IconClock, IconCompass, IconPalette, IconCode, IconRocket, IconGauge, IconShield, IconLock, IconLanguage, IconDevices, IconChart,
  IconFood, IconHeart, IconSparkle, IconCap, IconBag, IconHome, IconBriefcase, IconBuilding, IconPlane, IconCar, IconFactory, IconLeaf,
  IconUsers, IconGlobe, IconMail,
} from '../icons'
import { getCaps, isCinematic } from './lib/caps'
import { store, measure, update } from './lib/store'
import { startSmoothScroll, gsap, ScrollTrigger } from './lib/smooth'
import SplitReveal from './SplitReveal'
import FallbackOrb from './FallbackOrb'
import { hero, rotatingWords, glance, capabilities, process, work, industriesBlock, standards, engagement, faqBlock, finalCta } from './content'
import './cinema.css'
import { onFirstInteraction } from '../wake'
import { prefetch3D } from './lib/prefetch'

// The 3D layer is its own chunk, loaded in the browser once the page is idle.
const Experience = lazy(() => import('./three/Experience'))

const icons = {
  layout: IconLayout, cart: IconCart, layers: IconLayers, search: IconSearch, megaphone: IconMegaphone, wrench: IconWrench,
  compass: IconCompass, palette: IconPalette, code: IconCode, rocket: IconRocket, gauge: IconGauge, devices: IconDevices,
  shield: IconShield, lock: IconLock, language: IconLanguage, chart: IconChart,
}
const promiseIcons = [IconGift, IconCoins, IconKey, IconClock]
const sectorIcon = {
  food: IconFood, health: IconHeart, beauty: IconSparkle, education: IconCap, retail: IconBag, home: IconHome, pro: IconBriefcase,
  property: IconBuilding, travel: IconPlane, auto: IconCar, industry: IconFactory, agri: IconLeaf, community: IconUsers,
}
const STEP = 21 // degrees between capability cards on the curved row

class WebGLBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error) {
    console.warn('3D disabled:', error?.message)
    this.props.onFail()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (document.documentElement.dataset.cmMotion !== 'on') return
    // Start rotating on the visitor's first interaction: a word that keeps changing during
    // page load makes Google measure a very late "Largest Contentful Paint".
    let id
    const cancel = onFirstInteraction(() => {
      setI(1)
      id = setInterval(() => setI((n) => (n + 1) % rotatingWords.length), 2600)
    })
    return () => (cancel(), clearInterval(id))
  }, [])
  return (
    <span className="st-rot cm-rot" aria-hidden="true">
      {rotatingWords.map((w, k) => (
        <span key={w} className={k === i ? 'on' : ''}>{w}</span>
      ))}
      <span className="st-rot-size">{rotatingWords[i]}</span>
    </span>
  )
}

function Eyebrow({ children }) {
  return <p className="st-eyebrow cm-eyebrow"><i aria-hidden="true" />{children}</p>
}

// Liquid-glass surfaces (styles at the end of cinema.css).
const GLASS = '.cm-glance-copy, .cm-cap-inner, .cm-std-list li, .cm-eng-card'
function resetGlass(el) {
  el.style.removeProperty('--mx')
  el.style.removeProperty('--my')
  el.style.removeProperty('--lg-a')
}

/** SVG filter used by the glass in Chromium: a soft noise field bends the backdrop like thick liquid glass. */
function LiquidGlassFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <filter id="cm-liquid" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="11" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="38" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

/** Tilt a card toward the cursor (mouse only). */
function onTilt(e) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.setProperty('--tilt-y', `${x * 16}deg`)
  el.style.setProperty('--tilt-x', `${-y * 16}deg`)
  el.style.setProperty('--glare-x', `${(x + 0.5) * 100}%`)
  el.style.setProperty('--glare-y', `${(y + 0.5) * 100}%`)
}
function resetTilt(e) {
  e.currentTarget.style.setProperty('--tilt-x', '0deg')
  e.currentTarget.style.setProperty('--tilt-y', '0deg')
}

export default function CinemaHome() {
  const navigate = useContext(NavContext)
  const page = useRef(null)
  const ring = useRef(null)
  const capsSection = useRef(null)
  const processSection = useRef(null)
  const processFill = useRef(null)
  // null until the browser decides (keeps the server render and hydration identical)
  const [caps, setCaps] = useState(null)
  const [mount3D, setMount3D] = useState(false)
  const [active, setActive] = useState(0)
  const three = caps?.three
  const cinematic = isCinematic(three)

  // Decide the experience tier in the browser.
  useEffect(() => {
    const c = getCaps()
    store.snap = new URLSearchParams(window.location.search).has('snap')
    store.navigate = navigate
    // Capabilities are only knowable in the browser; deciding after hydration keeps server and client markup identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCaps(c)
  }, [navigate])

  // Mirror the tier on <html> (an inline script in index.html sets a first guess before paint).
  useEffect(() => {
    if (!caps) return
    const d = document.documentElement.dataset
    d.cm = caps.three
    d.cmCine = cinematic ? 'on' : 'off'
    d.cmMotion = caps.motion ? 'on' : 'off'
    const chromium = !!navigator.userAgentData?.brands?.some((b) => b.brand === 'Chromium')
    const touch = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)').matches
    if (chromium && !touch && caps.three !== 'none' && !window.matchMedia('(prefers-reduced-transparency: reduce)').matches) d.cmLg = 'refract'
    else delete d.cmLg
  }, [caps, cinematic])

  // Smooth scrolling (skipped for reduced motion).
  useEffect(() => (caps?.motion ? startSmoothScroll() : undefined), [caps?.motion])

  // Scroll position → scene position for the 3D layer.
  useEffect(() => {
    if (!caps) return
    const onScroll = () => update(window.scrollY)
    let glassEl = null
    const onMove = (e) => {
      store.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      store.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
      // Liquid glass: move the specular highlight and rim light with the cursor.
      if (e.pointerType !== 'mouse') return
      const el = e.target.closest?.(GLASS)
      if (glassEl && glassEl !== el) resetGlass(glassEl)
      glassEl = el
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      el.style.setProperty('--mx', `${x.toFixed(1)}%`)
      el.style.setProperty('--my', `${y.toFixed(1)}%`)
      el.style.setProperty('--lg-a', `${(Math.atan2(y - 50, x - 50) * 180) / Math.PI + 90}deg`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    ScrollTrigger.addEventListener('refresh', measure)
    let t
    const ro = new ResizeObserver(() => {
      clearTimeout(t)
      t = setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    ro.observe(page.current)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    measure()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      ScrollTrigger.removeEventListener('refresh', measure)
      ro.disconnect()
      clearTimeout(t)
    }
  }, [caps])

  // Fade-up for anything marked data-reveal; scroll-rotated capability row; process steps.
  useEffect(() => {
    if (!caps) return
    const ctx = gsap.context(() => {
      if (caps.motion) {
        ScrollTrigger.batch('.cm [data-reveal]', {
          start: 'top 90%',
          once: true,
          onEnter: (els) =>
            gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out', stagger: 0.08, overwrite: true }),
        })
      }
      if (!cinematic) return
      const fillEl = processFill.current
      ScrollTrigger.create({
        trigger: processSection.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setActive(Math.min(process.steps.length - 1, Math.floor(self.progress * process.steps.length)))
          if (fillEl) fillEl.style.transform = `scaleY(${self.progress})`
        },
      })
      if (!caps.motion) return
      const mm = gsap.matchMedia()
      // Capture the element now: React clears refs before effect cleanups run.
      const ringEl = ring.current
      mm.add('(min-width: 761px)', () => {
        const cards = ringEl.querySelectorAll('.cm-cap')
        const n = cards.length
        const half = ((n - 1) / 2) * STEP
        const state = { rot: half }
        const apply = () => {
          ringEl.style.setProperty('--rot', `${state.rot}deg`)
          cards.forEach((card, i) => {
            const angle = Math.abs((i - (n - 1) / 2) * STEP + state.rot)
            card.style.opacity = Math.max(0.2, 1 - angle / 120).toFixed(3)
            card.classList.toggle('is-front', angle < STEP / 2)
          })
        }
        apply()
        gsap.to(state, {
          rot: -half,
          ease: 'none',
          onUpdate: apply,
          scrollTrigger: { trigger: capsSection.current, start: 'top top', end: 'bottom bottom', scrub: 1.2 },
        })
        return () => {
          ringEl.style.removeProperty('--rot')
          cards.forEach((c) => {
            c.style.opacity = ''
            c.classList.remove('is-front')
          })
        }
      })
    }, page)
    return () => ctx.revert()
  }, [caps, cinematic])

  // The 3D scene starts by itself as soon as the page has loaded (the words and the SVG orb paint first),
  // or earlier if the visitor touches / moves the mouse. On data-saver or 2G it waits for a touch instead.
  // The gallery photos and screens download in the background so later scenes are ready too.
  useEffect(() => {
    if (!three || three === 'none') return
    const images = ['/cinema/screen-desktop.webp', '/cinema/screen-phone.webp', ...work.items.map((w) => w.image)]
    const stopPrefetch = prefetch3D(images)
    const start = () => setMount3D(true)
    const stopTouch = onFirstInteraction(start)
    const c = navigator.connection
    const slowNet = !!(c && (c.saveData || /2g$/.test(c.effectiveType || '')))
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))
    const cic = window.cancelIdleCallback || clearTimeout
    let idle = 0
    const onLoad = () => { idle = ric(start, { timeout: 600 }) }
    if (!slowNet) {
      if (document.readyState === 'complete') onLoad()
      else window.addEventListener('load', onLoad, { once: true })
    }
    return () => {
      stopTouch()
      stopPrefetch()
      window.removeEventListener('load', onLoad)
      if (idle) cic(idle)
    }
  }, [three])

  const disable3D = () => setCaps((c) => ({ ...c, three: 'none' }))
  const highlight = (i) => () => (store.workHover = i)
  const clear = () => (store.workHover = -1)
  const project = websitePlans[0]
  const custom = websitePlans.find((p) => p.id === 'custom') || websitePlans[websitePlans.length - 1]

  return (
    <div className="cm" ref={page} data-own-scroll>
      <LiquidGlassFilter />
      {/* The canvas lives in <body>: page transitions transform <main>, which would break position: fixed. */}
      {mount3D &&
        three !== 'none' &&
        createPortal(
          <WebGLBoundary onFail={disable3D}>
            <Suspense fallback={null}>
              <Experience tier={three} onFail={disable3D} />
            </Suspense>
          </WebGLBoundary>,
          document.body,
        )}

      {/* ---------- 0 · Hero ---------- */}
      <section className="cm-scene cm-hero" data-scene aria-labelledby="cm-h1">
        <FallbackOrb />
        <div className="nx-wrap cm-hero-inner">
          <p className="st-badge cm-in" style={{ '--d': 0 }}>
            <span className="st-dot" aria-hidden="true" />
            {hero.badge} <b>·</b> {hero.badgeTail}
          </p>
          <h1 className="cm-h1" id="cm-h1" aria-label="We build websites, online stores and web apps that grow.">
            <span className="cm-line cm-in" style={{ '--d': 1 }}>We build</span>
            <span className="cm-line cm-in" style={{ '--d': 2 }}><RotatingWord /></span>
            <span className="cm-line cm-in" style={{ '--d': 3 }}>that grow.</span>
          </h1>
          <p className="cm-lead cm-in" style={{ '--d': 5 }}>{hero.lead}</p>
          <div className="cm-actions cm-in" style={{ '--d': 6 }}>
            <Link to="/start" className="cm-btn cm-btn-primary">
              <span>Start a project</span>
              <IconArrow width={18} height={18} />
            </Link>
            <Link to="/work" className="cm-btn cm-btn-ghost">
              <span>View our work</span>
            </Link>
          </div>
          <ul className="st-promise cm-promise cm-in" style={{ '--d': 7 }}>
            {hero.promises.map((t, i) => {
              const Ico = promiseIcons[i]
              return (
                <li key={t}>
                  <Ico width={18} height={18} />
                  <span>{t}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="st-markets cm-markets" aria-label="Where we work">
          <span className="st-markets-label">
            <IconGlobe width={16} height={16} /> Available in
          </span>
          <div className="st-mq">
            <div className="st-mq-track" data-marquee="-1" data-speed="0.4">
              {[0, 1].map((k) => (
                <span key={k} className="st-mq-set" {...(k ? { 'aria-hidden': 'true' } : {})}>
                  {markets.map(([cc, n]) => (
                    <span key={cc} className="st-mk">
                      <span className="st-cc" aria-hidden="true">{cc}</span>
                      {n}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 1 · At a glance (the object becomes a browser + phone) ---------- */}
      <section className="cm-scene cm-glance" data-scene aria-labelledby="cm-glance-h">
        <div className="cm-sticky">
          <div className="nx-wrap cm-glance-inner">
            <div className="cm-panel cm-glance-copy" data-reveal>
              <Eyebrow>{glance.eyebrow}</Eyebrow>
              <SplitReveal id="cm-glance-h" className="cm-h2" text={glance.heading} />
              <p className="cm-lead">{glance.lead}</p>
              <dl className="cm-stats">
                {glance.stats.map(([n, unit, label]) => (
                  <div key={label}>
                    <dt>
                      <span data-count={n}>{n}</span>
                      {unit && <small>{unit}</small>}
                    </dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2 · Capabilities ---------- */}
      <section className="cm-scene cm-caps" data-scene ref={capsSection} aria-labelledby="cm-caps-h">
        <div className="cm-sticky cm-caps-sticky">
          <header className="nx-wrap cm-head">
            <Eyebrow>{capabilities.eyebrow}</Eyebrow>
            <SplitReveal id="cm-caps-h" className="cm-h2" text={capabilities.heading} />
          </header>
          <div className="cm-caps-stage">
            <ul className="cm-caps-ring" ref={ring} style={{ '--step': `${STEP}deg` }}>
              {capabilities.items.map(([icon, title, tags, to], i) => {
                const Ico = icons[icon]
                return (
                  <li key={title} className="cm-cap" style={{ '--i': i - (capabilities.items.length - 1) / 2 }} onPointerMove={onTilt} onPointerLeave={resetTilt}>
                    <Link to={to} className="cm-cap-inner">
                      <span className="cm-cap-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="cm-ico"><Ico width={26} height={26} /></span>
                      <strong>{title}</strong>
                      <span className="cm-tags">{tags.map((g) => <i key={g}>{g}</i>)}</span>
                      <span className="cm-go">Explore <IconArrow width={16} height={16} /></span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- 3 · Process (the camera follows a glowing path) ---------- */}
      <section className="cm-scene cm-process" data-scene ref={processSection} aria-labelledby="cm-process-h">
        <div className="cm-sticky">
          <div className="nx-wrap cm-process-inner">
            <div className="cm-process-copy">
              <Eyebrow>{process.eyebrow}</Eyebrow>
              <SplitReveal id="cm-process-h" className="cm-h2" text={process.heading} />
              <ol className="cm-steps">
                <span className="cm-track" aria-hidden="true"><span className="cm-fill" ref={processFill} /></span>
                {process.steps.map(([icon, title, text], i) => {
                  const Ico = icons[icon]
                  const on = !cinematic || i === active
                  return (
                    <li key={title} className={`cm-step${on ? ' is-active' : ''}${cinematic && i < active ? ' is-done' : ''}`} aria-current={cinematic && i === active ? 'step' : undefined}>
                      <span className="cm-step-dot" aria-hidden="true"><Ico width={18} height={18} /></span>
                      <div>
                        <h3><span className="cm-step-n">{String(i + 1).padStart(2, '0')}</span> {title}</h3>
                        <p>{text}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 4 · Selected work (3D gallery wall) ---------- */}
      <section className="cm-scene cm-work" data-scene aria-labelledby="cm-work-h">
        <div className="cm-sticky cm-work-sticky">
          <header className="nx-wrap cm-head cm-head-row">
            <div>
              <Eyebrow>{work.eyebrow}</Eyebrow>
              <SplitReveal id="cm-work-h" className="cm-h2" text={work.heading} />
            </div>
            <Link to="/work" className="cm-btn cm-btn-ghost">
              <span>{work.allLabel}</span>
              <IconArrow width={18} height={18} />
            </Link>
          </header>
          <div className="nx-wrap">
            <ul className="cm-work-list">
              {work.items.map((item, i) => (
                <li key={item.path} onPointerEnter={highlight(i)} onPointerLeave={clear} onFocus={highlight(i)} onBlur={clear}>
                  <Link to={item.path} className="cm-work-item">
                    <img src={item.image} alt="" loading="lazy" decoding="async" width="640" height="427" />
                    <span className="cm-work-meta">
                      <i>{item.category}</i>
                      <strong>{item.title}</strong>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- 5 · Reading band: industries + standards ---------- */}
      <div className="cm-band" data-scene data-cover>
        <section className="cm-band-light" aria-labelledby="cm-ind-h">
          <div className="nx-wrap">
            <header className="cm-head cm-head-center">
              <Eyebrow>{industriesBlock.eyebrow}</Eyebrow>
              <SplitReveal id="cm-ind-h" className="cm-h2" text={industriesBlock.heading} />
            </header>
            <div className="cm-ind">
              {sectors.map(([k, label]) => {
                const Ico = sectorIcon[k] || IconBriefcase
                const n = industries.filter((x) => x.sector === k).length
                return (
                  <Link key={k} to={`/work?sector=${k}`} className="cm-ind-tile" data-reveal>
                    <Ico width={24} height={24} />
                    <strong>{label}</strong>
                    <span>{n} demo{n === 1 ? '' : 's'}</span>
                  </Link>
                )
              })}
              <Link to="/work" className="cm-ind-tile cm-ind-all" data-reveal>
                <IconArrow width={24} height={24} />
                <strong>All {industries.length} demos</strong>
                <span>Open the gallery</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="cm-band-dark" aria-labelledby="cm-std-h">
          <div className="nx-wrap cm-std-grid">
            <header className="cm-head">
              <Eyebrow>{standards.eyebrow}</Eyebrow>
              <SplitReveal id="cm-std-h" className="cm-h2" text={standards.heading} />
              <p className="cm-lead">{standards.sub}</p>
            </header>
            <ul className="cm-std-list">
              {standards.items.map(([icon, b, s]) => {
                const Ico = icons[icon]
                return (
                  <li key={b} data-reveal>
                    <Ico width={24} height={24} />
                    <b>{b}</b>
                    <span>{s}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>

      {/* ---------- 6 · Engagement / pricing ---------- */}
      <section className="cm-scene cm-pricing" data-scene aria-labelledby="cm-price-h">
        <div className="nx-wrap">
          <header className="cm-head cm-head-center">
            <Eyebrow>{engagement.eyebrow}</Eyebrow>
            <SplitReveal id="cm-price-h" className="cm-h2" text={engagement.heading} />
          </header>
          <p className="cm-free" data-reveal>
            <span className="cm-free-badge">Free</span>
            {engagement.note}
          </p>
          <div className="cm-eng">
            <Link to="/pricing" className="cm-eng-card" data-reveal>
              <span className="cm-ico"><IconRocket width={24} height={24} /></span>
              <strong>Project</strong>
              <span className="cm-eng-price"><small>from</small> <Price usd={project.price} inr={project.inr} /></span>
              <span className="cm-eng-note">One-time, fixed price</span>
              <span className="cm-go">See plans <IconArrow width={16} height={16} /></span>
            </Link>
            <Link to="/pricing#monthly" className="cm-eng-card is-hot" data-reveal>
              <span className="cm-flag">Most flexible</span>
              <span className="cm-ico"><IconClock width={24} height={24} /></span>
              <strong>Monthly</strong>
              <span className="cm-eng-price"><small>from</small> <Price usd={monthlyPlans[0].price} /><small>/mo</small></span>
              <span className="cm-eng-note">Build, hosting and care</span>
              <span className="cm-go">See monthly plans <IconArrow width={16} height={16} /></span>
            </Link>
            <Link to="/contact?plan=custom" className="cm-eng-card" data-reveal>
              <span className="cm-ico"><IconLayers width={24} height={24} /></span>
              <strong>Custom</strong>
              <span className="cm-eng-price"><small>from</small> <Price usd={custom.price} inr={custom.inr} /></span>
              <span className="cm-eng-note">Stores, apps and portals</span>
              <span className="cm-go">Get a quote <IconArrow width={16} height={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- 7 · Reading band: results, reviews, FAQ ---------- */}
      <div className="cm-band cm-band-light" data-scene data-cover>
        <CaseStudies />
        <Reviews />
        <section aria-labelledby="cm-faq-h">
          <div className="nx-wrap cm-faq">
            <header className="cm-head">
              <Eyebrow>{faqBlock.eyebrow}</Eyebrow>
              <SplitReveal id="cm-faq-h" className="cm-h2" text={faqBlock.heading} />
            </header>
            <FAQ items={[6, 2, 3, 4, 5, 1].map((i) => faqs.general[i]).filter(Boolean)} />
          </div>
        </section>
      </div>

      {/* ---------- 8 · Final CTA (the object reassembles) ---------- */}
      <section className="cm-scene cm-final" data-scene aria-labelledby="cm-go-h">
        <div className="cm-sticky">
          <div className="nx-wrap cm-final-inner">
            <SplitReveal id="cm-go-h" className="cm-final-h" text={finalCta.heading} />
            <p className="cm-lead" data-reveal>{finalCta.lead}</p>
            <div className="cm-actions" data-reveal>
              <Link to="/start" className="cm-btn cm-btn-primary">
                <span>Start a project</span>
                <IconArrow width={18} height={18} />
              </Link>
              <a className="cm-btn cm-btn-ghost" href={waLink()} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp width={20} height={20} />
                <span>WhatsApp</span>
              </a>
            </div>
            <p className="cm-contact" data-reveal>
              <a href={`mailto:${brand.email}`}><IconMail width={16} height={16} /> {brand.email}</a>
              <span aria-hidden="true">·</span>
              <span>Replies {brand.reply}</span>
            </p>
          </div>
        </div>
      </section>
      <div className="cm-grain" aria-hidden="true" />
    </div>
  )
}
