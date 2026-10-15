import { Fragment } from 'react'
import { IconCheck, IconArrow } from '../icons'
import { Link } from '../router'
import { brand, waLink, launch } from '../brand'
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

export function CtaBand({ title = 'See your business online before you decide', lead = 'Send your business name and city. We reply within one business day, and the first demo is free.' }) {
  return (
    <section className="nx-cta">
      <div className="nx-wrap nx-cta-inner">
        <div>
          <h2 className="nx-h2"><Words text={title} /></h2>
          <p className="nx-lead">{lead}</p>
        </div>
        <div className="nx-cta-actions">
          <Button to="/contact?plan=demo" variant="light">
            Get a free demo
          </Button>
          <a className="nx-btn nx-btn-ghost" href={waLink()} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp width={20} height={20} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export const contactName = brand.name


export function PageHero({ crumb, title, lead }) {
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
    `Talk directly to ${brand.founderShort}, who builds your site`,
  ]
  return (
    <div className={`lo${compact ? ' lo-compact' : ''}`}>
      <div className="lo-copy">
        <h2 className="lo-h"><Words text={full ? 'Our founding spots are taken' : 'We are new, so we take the risk'} /></h2>
        {full && <p>Thank you to our founding clients. Ask us about current rates.</p>}
        {showCount && !full && <p className="lo-count">{left} of {launch.total} founding spots left</p>}
        {!full && (
          <ul className="lo-list">
            {promises.map((t) => <li key={t}>{t}</li>)}
          </ul>
        )}
        {!compact && (
          <div className="lo-actions">
            <Button to="/contact?plan=demo">Get a free demo</Button>
          </div>
        )}
      </div>
    </div>
  )
}
