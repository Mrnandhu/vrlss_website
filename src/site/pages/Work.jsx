import { useMemo, useState } from 'react'
import { Section, CtaBand, PageHero } from '../components/Bits'
import { Link } from '../router'
import { demos } from '../demos/demoData'
import { industries } from '../demos/industries'
import { Glyph } from '../demos/Scene'
import { IconArrow, IconSearch } from '../icons'

const legacy = [
  ['Medora Clinic', 'Healthcare', 'Appointment-led site for a medical clinic.', '/demos/medora-clinic', 'hospital'],
  ['Nova Developments', 'Real estate', 'Property developer showcase with project galleries.', '/demos/nova-developments', 'real-estate'],
  ['Atlas Interiors', 'Interior design', 'Portfolio-first site for a design studio.', '/demos/atlas-interiors', 'interior'],
  ['Alpha Contracting', 'Construction', 'Services and projects for a contracting company.', '/demos/alpha-contracting', null, 'construction'],
  ['Lumi Events', 'Events', 'Event and wedding planner with enquiry flow.', '/demos/lumi-events', 'wedding'],
  ['Motion Auto', 'Automotive', 'Car service and sales site with booking.', '/demos/motion-auto', 'car'],
  ['Orbit Beauty Studio', 'Beauty', 'Salon site with services and booking prompts.', '/demos/orbit-beauty-studio', 'salon'],
  ['GulfCore Trading', 'Trading', 'B2B catalogue and enquiry site.', '/demos/gulfcore-trading', null, 'truck'],
  ['Sands Tourism', 'Travel', 'Tour packages and destination pages.', '/demos/sands-tourism', null, 'plane'],
]

const toneGrad = {
  blue: ['#2b50e6', '#6c8cff'], teal: ['#0a7a68', '#1fc2a6'], ink: ['#0f2230', '#35546c'],
  sun: ['#c4811a', '#f5b544'], rose: ['#a3365f', '#e1688f'], violet: ['#5b3fd1', '#a48bff'],
}

const glyphFor = { 'online-store': 'bag', 'booking-system': 'calendar', 'sales-dashboard': 'chart', 'customer-portal': 'user', 'mobile-app': 'phone', 'sales-crm': 'kanban', 'invoice-generator': 'invoice' }

const all = [
  ...demos.map((d) => ({ key: d.slug, group: 'apps', tag: d.category, name: d.name, desc: d.blurb, href: d.path, grad: toneGrad[d.tone], glyph: glyphFor[d.slug], interactive: true })),
  ...industries.map((s) => ({ key: s.slug, group: 'sites', tag: s.cat, name: s.name, desc: s.head, href: s.path, grad: [s.pal[2], s.pal[3]], img: s.img, glyph: s.glyph })),
  ...legacy.map(([name, tag, desc, href, img, glyph]) => ({ key: href, group: 'sites', tag, name, desc, href, grad: ['#1e293b', '#475569'], img, glyph, external: true })),
]

const filters = [
  ['all', 'All demos'],
  ['apps', 'Apps and systems'],
  ['sites', 'Websites by industry'],
]

export default function Work() {
  const [f, setF] = useState('all')
  const [q, setQ] = useState('')
  const list = useMemo(
    () =>
      all.filter(
        (x) =>
          (f === 'all' || x.group === f) &&
          `${x.name} ${x.tag} ${x.desc}`.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [f, q],
  )

  return (
    <>
      <PageHero
        crumb="Work"
        title="Live demos for every kind of business"
        lead={`Try ${demos.length} working apps and ${industries.length + legacy.length} industry websites. Click, tap and explore them on your phone, tablet or computer. They are concept builds with sample data, not client projects.`}
      />
      <Section tone="white">
        <div className="wk-bar">
          <div className="wk-chips" role="group" aria-label="Filter demos">
            {filters.map(([k, l]) => (
              <button type="button" key={k} className={f === k ? 'is-on' : ''} onClick={() => setF(k)} aria-pressed={f === k}>
                {l}
              </button>
            ))}
          </div>
          <label className="wk-search">
            <IconSearch width={18} height={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: restaurant, booking, store…" aria-label="Search demos" />
          </label>
        </div>
        <p className="nx-fine wk-count">
          {list.length} demo{list.length === 1 ? '' : 's'}
        </p>
        {list.length === 0 ? (
          <p className="dm-empty">No demo matches “{q}”. Tell us your industry and we will build one.</p>
        ) : (
          <div className="nx-work">
            {list.map((x) => {
              const inner = (
                <>
                  <span className="nx-work-thumb" aria-hidden="true" style={{ '--c1': x.grad[0], '--c2': x.grad[1] }}>
                    {x.img ? (
                      <img src={`/assets/photos/${x.img}-sm.webp`} alt="" loading="lazy" decoding="async" width="480" height="320" />
                    ) : (
                      <Glyph name={x.glyph} className="wk-glyph" />
                    )}
                    {x.interactive && <i className="wk-badge">Interactive</i>}
                  </span>
                  <span className="nx-work-body">
                    <span className="nx-work-tag">{x.tag}</span>
                    <strong>{x.name}</strong>
                    <span className="wk-desc">{x.desc}</span>
                    <em>
                      Open demo <IconArrow width={16} height={16} />
                    </em>
                  </span>
                </>
              )
              return x.external ? (
                <a key={x.key} href={x.href} className="nx-work-card">{inner}</a>
              ) : (
                <Link key={x.key} to={x.href} className="nx-work-card">{inner}</Link>
              )
            })}
          </div>
        )}
      </Section>
      <CtaBand title="Do not see your industry?" lead="Tell us about your business and we will build a demo of your own idea, free of charge, before you decide." />
    </>
  )
}
