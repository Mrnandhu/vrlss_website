import { Fragment } from 'react'
import { IconCheck, IconArrow } from '../icons'
import { Link } from '../router'
import { brand, waLink, launch, reviews, reviewLink, caseStudies, team, included } from '../brand'
import { Price } from '../currency'
import { IconWhatsApp } from '../icons'

// Older copy marks words with *stars*; the redesign keeps headlines plain, so the stars are dropped.
export function Rich({ text }) {
  return String(text).replace(/\*([^*]+)\*/g, '$1')
}

// Splits a heading into words that rise from behind a mask when the heading scrolls in.
export function Words({ text, start = 0 }) {
  return String(text)
    .replace(/\*([^*]+)\*/g, '$1')
    .split(' ')
    .map((w, i) => (
      <Fragment key={i}>
        <span className="sw"><span style={{ '--wi': i + start }}>{w}</span></span>{' '}
      </Fragment>
    ))
}

export function Section({ tone = 'white', id, children, className = '' }) {
  return (
    <section id={id} className={`nx-section nx-tone-${tone} ${className}`}>
      <div className="nx-wrap">{children}</div>
    </section>
  )
}

export function Head({ title, lead, align = 'left', as: Tag = 'h2' }) {
  return (
    <header className={`nx-head nx-head-${align}`}>
      <Tag className="nx-h2"><Words text={title} /></Tag>
      {lead && <p className="nx-lead">{lead}</p>}
    </header>
  )
}

export function Button({ to, href, variant = 'primary', children, icon = false, ...rest }) {
  const cls = `nx-btn nx-btn-${variant}`
  const inner = (
    <>
      <span>{children}</span>
      {icon && <IconArrow width={18} height={18} />}
    </>
  )
  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  )
}

export function FAQ({ items }) {
  return (
    <div className="nx-faq">
      {items.map((f) => (
        <details key={f.q} className="nx-faq-item">
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function PlanCard({ plan, cta = 'Get started', unit }) {
  return (
    <article className={`nx-plan${plan.featured ? ' is-featured' : ''}`}>
      {plan.featured && <span className="nx-plan-flag">Most chosen</span>}
      <h3 className="nx-plan-name">{plan.name}</h3>
      <p className="nx-plan-blurb">{plan.blurb}</p>
      <p className="nx-plan-price">
        {plan.from && <span className="nx-plan-from">from</span>}
        <strong><Price usd={plan.price} inr={plan.inr} /></strong>
        {unit && <span className="nx-plan-unit">{unit}</span>}
      </p>
      {plan.delivery && <p className="nx-plan-meta">Typical delivery: {plan.delivery}</p>}
      <ul className="nx-ticks">
        {plan.features.map((f) => (
          <li key={f}>
            <IconCheck width={18} height={18} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        to={`/contact?plan=${plan.id}`}
        className={`nx-btn ${plan.featured ? 'nx-btn-primary' : 'nx-btn-outline'}`}
        data-plan={plan.id}
      >
        <span>{cta}</span>
        <IconArrow width={18} height={18} />
      </Link>
    </article>
  )
}

export function CtaBand({ title = "Let's build what's next.", lead = 'Your first demo is free. We reply ' + brand.reply + '.' }) {
  return (
    <section className="nx-cta">
      <div className="nx-wrap nx-cta-inner">
        <div>
          <h2 className="nx-h2"><Words text={title} /></h2>
          <p className="nx-lead">{lead}</p>
        </div>
        <div className="nx-cta-actions">
          <Button to="/start" icon>
            Start a project
          </Button>
          <a className="nx-btn nx-btn-outline" href={waLink()} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp width={20} height={20} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export const contactName = brand.name


export function PageHero({ crumb, title, lead, chips }) {
  return (
    <section className="nx-pagehero">
      <div className="nx-wrap">
        {crumb && (
          <nav className="nx-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{crumb}</span>
          </nav>
        )}
        <h1 className="nx-h1 ph-h1"><Words text={title} /></h1>
        {lead && <p className="nx-lead">{lead}</p>}
        {chips && (
          <ul className="ph-chips">
            {chips.map(([Ico, t]) => <li key={t}><Ico width={18} height={18} /><span>{t}</span></li>)}
          </ul>
        )}
      </div>
    </section>
  )
}

export function LaunchOffer({ compact = false }) {
  const left = Math.max(0, launch.total - launch.taken)
  const full = left === 0
  const showCount = launch.taken >= launch.showCountFrom
  const promises = [
    'Free demo before you pay',
    `${launch.discount}% off for our first ${launch.total} clients`,
    'Direct line to the people building it',
  ]
  return (
    <div className={`lo${compact ? ' lo-compact' : ''}`}>
      <div className="lo-copy">
        <h2 className="lo-h"><Words text={full ? 'Our founding spots are taken' : 'Founding client offer'} /></h2>
        {full && <p>Thank you to our founding clients. Ask us about current rates.</p>}
        {showCount && !full && <p className="lo-count">{left} of {launch.total} founding spots left</p>}
        {!full && (
          <ul className="lo-list">
            {promises.map((t) => <li key={t}>{t}</li>)}
          </ul>
        )}
        {!compact && (
          <div className="lo-actions">
            <Button to="/start" icon>Start a project</Button>
          </div>
        )}
      </div>
    </div>
  )
}


// ---------- Research-driven building blocks ----------

const Star = ({ on = true }) => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className={on ? 'st-on' : 'st-off'}>
    <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" fill="currentColor" />
  </svg>
)

export const reviewStats = () => {
  const n = reviews.length
  const avg = n ? reviews.reduce((s, r) => s + (r.rating || 5), 0) / n : 0
  return { n, avg: Math.round(avg * 10) / 10 }
}

// Proof chips under the hero buttons. Ratings appear only once 3+ real reviews exist.
export function ProofLine({ demos }) {
  const { n, avg } = reviewStats()
  return (
    <ul className="pf-line" aria-label="Why clients choose us">
      {n >= 3 && (
        <li className="pf-rate">
          <span className="pf-stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Star key={i} on={i < Math.round(avg)} />)}</span>
          <span>{avg.toFixed(1)} from {n} reviews</span>
        </li>
      )}
      <li><b>{demos}</b> live demos</li>
      <li>Fixed prices</li>
      <li>Replies {brand.reply}</li>
    </ul>
  )
}

export function Included({ title = 'Everything included', lead = 'No surprises. Every website project comes with all of this.' }) {
  return (
    <div className="inc">
      <Head title={title} lead={lead} />
      <ul className="inc-grid">
        {included.map(([t, d], i) => (
          <li key={t} className="inc-item" style={{ '--k': i }}>
            <span className="inc-ico" aria-hidden="true"><IconCheck width={18} height={18} /></span>
            <strong>{t}</strong>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Real reviews only (from brand.js). Renders nothing until the first review is added.
export function Reviews({ title = 'What clients say', limit = 6 }) {
  if (!reviews.length) return null
  const { n, avg } = reviewStats()
  return (
    <section className="nx-section rv-sec" aria-labelledby="rv-h">
      <div className="nx-wrap">
        <header className="nx-head rv-head">
          <h2 className="nx-h2" id="rv-h"><Words text={title} /></h2>
          <p className="rv-sum"><span className="pf-stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Star key={i} on={i < Math.round(avg)} />)}</span> {avg.toFixed(1)} average from {n} review{n === 1 ? '' : 's'}</p>
        </header>
        <div className="rv-grid">
          {reviews.slice(0, limit).map((r) => (
            <figure className="rv-card" key={`${r.name}-${r.date}`}>
              <span className="pf-stars" aria-label={`${r.rating || 5} out of 5`}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} on={i < (r.rating || 5)} />)}</span>
              <blockquote>{r.text}</blockquote>
              <figcaption>
                <strong>{r.name}</strong>
                <span>{[r.business, r.city].filter(Boolean).join(', ')}</span>
                {r.source && <em>via {r.source}</em>}
              </figcaption>
            </figure>
          ))}
        </div>
        {reviewLink && (
          <p className="rv-more"><a className="nx-btn nx-btn-outline" href={reviewLink} target="_blank" rel="noopener noreferrer"><span>Read all reviews on Google</span></a></p>
        )}
      </div>
    </section>
  )
}

// Real case studies only (from brand.js). Renders nothing until the first one is added.
export function CaseStudies({ title = 'Recent results' }) {
  if (!caseStudies.length) return null
  return (
    <section className="nx-section cs-sec" aria-labelledby="cs-h">
      <div className="nx-wrap">
        <Head title={title} />
        <div className="cs-grid">
          {caseStudies.map((c) => (
            <article className="cs-card" key={c.business}>
              {c.img && <img src={`/assets/photos/${c.img}-sm.webp`} alt="" loading="lazy" width="480" height="320" />}
              <div className="cs-body">
                <span className="cs-tag">{c.industry} · {c.city}</span>
                <h3>{c.business}</h3>
                <p className="cs-result">{c.result}</p>
                <ul>{(c.did || []).map((d) => <li key={d}>{d}</li>)}</ul>
                {c.quote && <blockquote>{c.quote}</blockquote>}
                {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer">Visit the site</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Team() {
  return (
    <div className="tm-grid">
      {team.map((m) => (
        <article className="tm-card" key={m.role}>
          <span className="tm-av" aria-hidden="true">{(m.short || m.role).charAt(0)}</span>
          <div>
            <strong>{m.name || m.role.split(' · ')[0]}</strong>
            <span className="tm-role">{m.name ? m.role : m.role.split(' · ')[1]}</span>
            <p>{m.note}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
