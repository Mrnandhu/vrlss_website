import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { CtaBand } from '../components/Bits'
import { Link } from '../router'
import { demos } from '../demos/demoData'
import { industries, sectors, sectorName, monogram } from '../demos/industries'
import { Glyph } from '../demos/Scene'
import { Art, convertSite } from '../demos/IndustrySite'
import { languageGroups, LANGS, UI } from '../demos/locales'
import { useCurrency } from '../currency'
import { IconArrow, IconWhatsApp, IconCheck } from '../icons'
import { waLink } from '../brand'

const glyphFor = { 'online-store': 'bag', 'booking-system': 'calendar', 'sales-dashboard': 'chart', 'customer-portal': 'user', 'mobile-app': 'phone', 'sales-crm': 'kanban', 'invoice-generator': 'invoice' }

// Two ways to browse: by industry, or by language / market. There is no "all" view.
const industryGroups = [
  ...sectors.map(([k, label]) => ({ key: k, label, items: industries.filter((x) => x.sector === k) })),
  {
    key: 'apps',
    label: 'Apps and tools',
    items: demos.map((d) => ({ slug: d.slug, path: d.path, name: d.brand ? `${d.brand}` : d.name, cat: d.category, sub: d.blurb, feats: d.features, glyph: glyphFor[d.slug], app: true, pal: ['#202e53', '#fff', '#2e6e79', '#49919d'] })),
  },
].filter((g) => g.items.length)
const langGroups = languageGroups.map((l) => ({ key: `lang-${l.lang}`, label: `${l.native}`, sub: l.name, regions: l.regions, lang: l.lang, items: l.items }))
const groups = [...industryGroups, ...langGroups]

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

// A live, scaled-down render of the demo homepage. Hover (or focus) scrolls through it.
function Preview({ site: raw }) {
  const { code } = useCurrency()
  const site = useMemo(() => convertSite(raw, code), [raw, code])
  const lang = raw.lang || 'en'
  const ui = UI[lang]
  const box = useRef(null)
  const inner = useRef(null)
  const [m, setM] = useState({ s: 0.55, base: 1280, travel: 0 })
  useIso(() => {
    const el = box.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const base = w < 560 ? 420 : 1280
      const s = w / base
      const h = inner.current ? inner.current.scrollHeight * s : 0
      setM({ s, base, travel: Math.max(0, h - el.clientHeight) })
    }
    measure()
    const ro = 'ResizeObserver' in window ? new ResizeObserver(measure) : null
    ro?.observe(el)
    const t = setTimeout(measure, 600)
    return () => { ro?.disconnect(); clearTimeout(t) }
  }, [site.slug])
  const style = { '--ib': site.pal[0], '--ii': site.pal[1], '--ia': site.pal[2], '--ia2': site.pal[3] }
  return (
    <div className="wx-preview" ref={box} style={{ '--travel': `${m.travel}px`, '--dur': `${Math.max(4, m.travel / 90)}s` }} aria-hidden="true">
      <div className="wx-scale" ref={inner} style={{ width: m.base, transform: `scale(${m.s})` }}>
        <div className={`sd sd-${site.layout} sd-${site.font}${site.dark ? ' is-dark' : ''}`} style={style} lang={lang} dir={LANGS[lang].dir}>
          <header className="sd-nav">
            <span className="sd-logo"><span><Glyph name={site.glyph} /></span>{site.name}</span>
            <nav><a>{ui.services}</a><a>{ui.prices}</a><a>{ui.contact}</a><a className="sd-navcta">{site.cta}</a></nav>
          </header>
          <section className="sd-hero">
            <div className="sd-copy">
              <span className="sd-tag">{site.tagline}</span>
              <h2>{site.head}</h2>
              <p>{site.sub}</p>
              <div className="sd-actions"><a className="sd-btn">{site.cta}</a><a className="sd-btn sd-ghost">{ui.explore}</a></div>
            </div>
            <Art site={site} />
          </section>
          <section className="sd-stats">{site.stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</section>
          <section className="sd-sec">
            <div className="sd-head"><span>{ui.services}</span><h3>{ui.offerHead}</h3></div>
            <div className="sd-grid">
              {site.services.map(([t, d], i) => <article key={t}><em>{String(i + 1).padStart(2, '0')}</em><strong>{t}</strong><p>{d}</p></article>)}
            </div>
          </section>
          <section className="sd-sec">
            <div className="sd-head"><span>{ui.prices}</span><h3>{site.offer[0]}</h3></div>
            <ul className="sd-offers">{site.offer[1].map(([n, p, d]) => <li key={n}><div><strong>{n}</strong><span>{d}</span></div><b>{p}</b></li>)}</ul>
          </section>
        </div>
      </div>
    </div>
  )
}

function AppScreen({ app }) {
  return (
    <div className="wx-appscreen" aria-hidden="true">
      <i className="wx-orb o1" /><i className="wx-orb o2" />
      <Glyph name={app.glyph} className="wx-appglyph" />
      <strong>{app.cat}</strong>
    </div>
  )
}

function Thumb({ x }) {
  if (x.img) return <img src={`/assets/photos/${x.img}-sm.webp`} alt="" loading="lazy" decoding="async" width="480" height="320" />
  if (x.app) return <span className="wx-thumb-g" style={{ '--c1': x.pal[2], '--c2': x.pal[0] }}><Glyph name={x.glyph} /></span>
  return <span className={`mono${x.dark ? ' is-dark' : ''}`} style={{ '--mb': x.pal[0], '--mi': x.pal[1], '--ma': x.pal[2] }}><b>{monogram(x.name)}</b></span>
}

export default function Work() {
  const [g, setG] = useState(groups[0].key)
  const mode = g.startsWith('lang-') ? 'lang' : 'ind'
  const shown = mode === 'lang' ? langGroups : industryGroups
  const [i, setI] = useState(0)
  const group = useMemo(() => groups.find((x) => x.key === g) || groups[0], [g])
  const cur = group.items[Math.min(i, group.items.length - 1)]
  const rail = useRef(null)

  // deep links: /work#restaurant or /work?sector=health
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1))
    const sector = new URLSearchParams(window.location.search).get('sector')
    if (hash) {
      for (const gr of groups) {
        const k = gr.items.findIndex((x) => x.slug === hash)
        if (k >= 0) { setG(gr.key); setI(k); return }
      }
    }
    if (sector && groups.some((x) => x.key === sector)) setG(sector)
    const lg = new URLSearchParams(window.location.search).get('lang')
    if (lg && groups.some((x) => x.key === `lang-${lg}`)) setG(`lang-${lg}`)
  }, [])

  const pick = (k) => {
    setI(k)
    try { window.history.replaceState(null, '', `#${group.items[k].slug}`) } catch { /* ignore */ }
  }
  const pickGroup = (key) => {
    setG(key)
    setI(0)
    const first = groups.find((x) => x.key === key)?.items[0]
    try { window.history.replaceState(null, '', `${window.location.pathname}${first ? `#${first.slug}` : ''}`) } catch { /* ignore */ }
  }
  const step = (d) => pick((i + d + group.items.length) % group.items.length)

  useEffect(() => {
    rail.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }, [i, g])

  const n = group.items.length
  const pad = (v) => String(v).padStart(2, '0')
  const feats = cur.app ? cur.feats : cur.services.map(([t]) => t)
  const wa = waLink(`Hi Sai, I saw the ${(cur.baseCat || cur.cat).toLowerCase()} demo (${cur.name}${cur.lang ? `, ${LANGS[cur.lang].name}` : ''}) on your website. I'd like one for my business.`)

  return (
    <>
      <section className="wx">
        <div className="nx-wrap">
          <nav className="wx-crumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">Work</span></nav>
          <div className="wx-top">
            <span className="wx-pill">Live demos</span>
            <Link to="/contact?plan=demo" className="wx-start">Start a project <IconArrow width={16} height={16} /></Link>
          </div>
          <h1 className="wx-h1">Demos built for <em>your</em> industry.</h1>
          <p className="wx-lead">{industries.length} live websites · {sectors.length} sectors · {langGroups.length + 1} languages · {demos.length} apps</p>

          <div className="wx-mode" role="group" aria-label="Browse demos">
            <button type="button" className={mode === 'ind' ? 'is-on' : ''} aria-pressed={mode === 'ind'} onClick={() => mode !== 'ind' && pickGroup(industryGroups[0].key)}>By industry</button>
            <button type="button" className={mode === 'lang' ? 'is-on' : ''} aria-pressed={mode === 'lang'} onClick={() => mode !== 'lang' && pickGroup(langGroups[0].key)}>By language and country</button>
          </div>
          <div className={`wx-tabs${mode === 'lang' ? ' is-lang' : ''}`} role="tablist" aria-label={mode === 'lang' ? 'Languages' : 'Industries'}>
            {shown.map((x) => (
              <button key={x.key} type="button" role="tab" aria-selected={x.key === g} className={x.key === g ? 'is-on' : ''} onClick={() => pickGroup(x.key)} lang={x.lang}>
                {x.label}{x.sub && <small>{x.sub}</small>}<i>{x.items.length}</i>
              </button>
            ))}
          </div>
          {mode === 'lang' && <p className="wx-regions">For businesses in <b>{group.regions}</b>. Prices follow the currency you pick at the top.</p>}

          <div className="wx-main">
            <div className="wx-rail" ref={rail} role="listbox" aria-label={`${group.label} demos`}>
              {group.items.map((x, k) => (
                <button key={x.slug} type="button" role="option" aria-selected={k === i} aria-current={k === i ? 'true' : undefined} className={`wx-item${k === i ? ' is-on' : ''}`} onClick={() => pick(k)}>
                  <span className="wx-thumb"><Thumb x={x} /></span>
                  <span className="wx-item-name">{x.name}</span>
                </button>
              ))}
            </div>

            <div className="wx-stage">
              <Link to={cur.path} className="wx-screen" key={cur.slug}>
                <span className="wx-chrome" aria-hidden="true">
                  <i /><i /><i />
                  <span className="wx-tag" lang={cur.lang}>{cur.lang ? `${LANGS[cur.lang].native} · ${cur.baseCat}` : cur.cat}</span>
                  <span className="wx-live">Live demo <span aria-hidden="true">↗</span></span>
                </span>
                {cur.app ? <AppScreen app={cur} /> : <Preview site={cur} />}
              </Link>

              <div className="wx-info" key={`i-${cur.slug}`}>
                <p className="wx-meta"><span>{pad(i + 1)} / {pad(n)}</span><i /> <b>{cur.name}</b><i /> <span>{cur.app ? 'App' : cur.lang ? `${cur.baseCat} · ${LANGS[cur.lang].name}` : sectorName[cur.sector]}</span></p>
                <div className="wx-info-grid">
                  <div>
                    <h2 className="wx-name">{cur.name}</h2>
                    <p className="wx-desc" lang={cur.lang} dir={cur.lang ? LANGS[cur.lang].dir : undefined}>{cur.app ? cur.sub : `${cur.head}. ${cur.sub}`}</p>
                    <ul className="wx-feats" lang={cur.lang} dir={cur.lang ? LANGS[cur.lang].dir : undefined}>{feats.slice(0, 4).map((f) => <li key={f}><IconCheck width={15} height={15} />{f}</li>)}</ul>
                  </div>
                  <div className="wx-actions">
                    <Link to={cur.path} className="nx-btn nx-btn-primary"><span>Open live demo</span><IconArrow width={18} height={18} /></Link>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="nx-btn nx-btn-outline"><IconWhatsApp width={18} height={18} /><span>Get this website</span></a>
                    <div className="wx-step">
                      <button type="button" onClick={() => step(-1)} aria-label="Previous demo"><IconArrow width={18} height={18} /></button>
                      <button type="button" onClick={() => step(1)} aria-label="Next demo"><IconArrow width={18} height={18} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand title="Don’t see your industry?" lead="We will build a free demo for yours." />
    </>
  )
}
