import { useMemo, useState } from 'react'
import { CtaBand, PageHero } from '../components/Bits'
import { Link } from '../router'
import { demos } from '../demos/demoData'
import { industries, sectors } from '../demos/industries'
import { Glyph } from '../demos/Scene'
import { IconArrow, IconSearch } from '../icons'

const glyphFor = { 'online-store': 'bag', 'booking-system': 'calendar', 'sales-dashboard': 'chart', 'customer-portal': 'user', 'mobile-app': 'phone', 'sales-crm': 'kanban', 'invoice-generator': 'invoice' }

const sites = industries.map((s) => ({ key: s.slug, group: s.sector, tag: s.cat, name: s.name, href: s.path, pal: s.pal, img: s.img, glyph: s.glyph }))
const apps = demos.map((d) => ({ key: d.slug, group: 'apps', tag: d.category, name: d.name, href: d.path, pal: ['#0b1414', '#fff', '#0d5c52', '#5e7a4f'], glyph: glyphFor[d.slug], app: true }))
const groups = [...sectors, ['apps', 'Working apps and tools']]

function Card({ x }) {
  return (
    <Link to={x.href} className="wk-card" data-cursor="View">
      <span className="wk-thumb" style={{ '--c1': x.pal[2], '--c2': x.pal[3] }} aria-hidden="true">
        {x.img ? <img src={`/assets/photos/${x.img}-sm.webp`} alt="" loading="lazy" decoding="async" width="480" height="320" /> : <Glyph name={x.glyph} className="wk-glyph" />}
        {x.app && <i className="wk-badge">App</i>}
      </span>
      <span className="wk-body">
        <span className="wk-tag">{x.tag}</span>
        <strong>{x.name}</strong>
      </span>
      <span className="wk-go" aria-hidden="true"><IconArrow width={18} height={18} /></span>
    </Link>
  )
}

export default function Work() {
  const [f, setF] = useState('all')
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const rows = useMemo(() => {
    const all = [...sites, ...apps].filter((x) => !needle || `${x.name} ${x.tag}`.toLowerCase().includes(needle))
    return groups
      .filter(([k]) => f === 'all' || f === k)
      .map(([k, label]) => [k, label, all.filter((x) => x.group === k)])
      .filter(([, , items]) => items.length)
  }, [f, needle])
  const count = rows.reduce((n, [, , items]) => n + items.length, 0)

  return (
    <>
      <PageHero
        crumb="Work"
        title="Demo websites for every industry"
        lead={`${industries.length} live demo websites across ${sectors.length} sectors, plus ${demos.length} working apps. Open any of them on your phone.`}
      />
      <section className="nx-section wk">
        <div className="nx-wrap">
          <div className="wk-bar">
            <label className="wk-search">
              <IconSearch width={18} height={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your industry" aria-label="Search demos" />
            </label>
            <div className="wk-chips" role="group" aria-label="Filter by sector">
              {[['all', 'All'], ...groups].map(([k, l]) => (
                <button type="button" key={k} className={f === k ? 'is-on' : ''} onClick={() => setF(k)} aria-pressed={f === k}>{l}</button>
              ))}
            </div>
          </div>
          <p className="nx-fine wk-count" role="status">{count} demo{count === 1 ? '' : 's'}</p>
          {rows.length === 0 && (
            <p className="dm-empty">No demo matches “{q}”. Message us your industry and we will build one for you, free.</p>
          )}
        </div>
        {rows.map(([k, label, items]) => (
          <div className="wk-row" key={k}>
            <div className="nx-wrap wk-row-head">
              <h2>{label}</h2>
              <span>{items.length}</span>
            </div>
            <div className="wk-track">
              {items.map((x) => <Card key={x.key} x={x} />)}
            </div>
          </div>
        ))}
      </section>
      <CtaBand title="Don’t see your industry?" lead="Tell us about your business and we will build a free demo of your idea before you decide." />
    </>
  )
}
