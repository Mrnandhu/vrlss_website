import { IconCheck, IconArrow } from '../icons'
import { Link } from '../router'
import { brand, waLink, launch } from '../brand'
import { Price } from '../currency'
import { IconWhatsApp } from '../icons'

// "plain *highlighted* text" -> animated hand-drawn underline on the starred words
export function Rich({ text }) {
  return String(text).split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith('*') ? <mark key={i} className="hl">{part.slice(1, -1)}</mark> : part,
  )
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
      <Tag className="nx-h2"><Rich text={title} /></Tag>
      {lead && <p className="nx-lead">{lead}</p>}
    </header>
  )
}

export function Button({ to, href, variant = 'primary', children, icon = true, ...rest }) {
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

export function CtaBand({ title = 'Ready to get started?', lead = 'Tell us about your business. You will get a clear quote within one business day, with no obligation.' }) {
  return (
    <section className="nx-cta">
      <div className="nx-wrap nx-cta-inner">
        <div>
          <h2 className="nx-h2">{title}</h2>
          <p className="nx-lead">{lead}</p>
        </div>
        <div className="nx-cta-actions">
          <Button to="/contact" variant="light">
            Get a free quote
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

const lastWordMark = (t) => { const w = String(t).split(' '); return w.length < 2 ? t : `${w.slice(0, -1).join(' ')} *${w[w.length - 1]}*` }

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
        <h1 className="nx-h1"><Rich text={lastWordMark(title)} /></h1>
        {lead && <p className="nx-lead">{lead}</p>}
      </div>
    </section>
  )
}

export function LaunchOffer({ compact = false }) {
  const left = Math.max(0, launch.total - launch.taken)
  const full = left === 0
  const C = 2 * Math.PI * 52
  return (
    <div className={`lo${compact ? ' lo-compact' : ''}`}>
      <div className="lo-copy">
        <span className="lo-tag">Launch offer</span>
        <h3>{full ? 'Launch offer is full' : `${launch.discount}% off for our first ${launch.total} clients`}</h3>
        <p>
          {full
            ? 'Thank you to our first clients. Ask us about current rates.'
            : `We are just starting, so our first ${launch.total} clients get ${launch.discount}% off their project, on top of our launch prices. They also keep the price they sign at when we raise rates.`}
        </p>
        {!compact && (
          <div className="lo-actions">
            <Button to="/contact">{full ? 'Get a quote' : 'Claim a spot'}</Button>
            <Button to="/pricing" variant="outline" icon={false}>See pricing</Button>
          </div>
        )}
      </div>
      <div className="lo-meter" role="img" aria-label={`${launch.taken} of ${launch.total} launch spots taken`}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" className="lo-track" />
          <circle cx="60" cy="60" r="52" className="lo-fill" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - launch.taken / launch.total) }} />
        </svg>
        <div className="lo-num"><b>{launch.taken}<small>/{launch.total}</small></b><span>spots taken</span></div>
        <ul className="lo-dots" aria-hidden="true">
          {Array.from({ length: launch.total }).map((_, i) => <li key={i} className={i < launch.taken ? 'on' : ''} />)}
        </ul>
      </div>
    </div>
  )
}
