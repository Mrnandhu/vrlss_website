import { useEffect, useState } from 'react'
import { Section, PageHero } from '../components/Bits'
import { IconWhatsApp, IconMail, IconPin, IconGift, IconClock, IconGlobe } from '../icons'
import { brand, waLink, mailLink } from '../brand'
import { industries } from '../demos/industries'
import { useCurrency, Price } from '../currency'
import { formatPrice, websitePlans } from '../prices'

const services = [
  ['demo', 'A free demo homepage for my business'],
  ['audit', 'A free check of my website and Google listing'],
  ['website', 'A new website'],
  ['redesign', 'Redesign of my current website'],
  ['marketing', 'Digital marketing'],
  ['both', 'Website and digital marketing'],
  ['app', 'Web app, mobile app or custom software'],
  ['other', 'Something else'],
]

const planToService = {
  demo: 'demo',
  audit: 'audit',
  starter: 'website',
  business: 'website',
  custom: 'website',
  presence: 'marketing',
  growth: 'marketing',
  ads: 'marketing',
}

const budgets = [[0, 99], [99, 249], [249, 549], [549, 1500], [1500, null]]
const timelines = ['As soon as possible', 'Within a month', 'In 1–3 months', 'Just exploring']
const cats = [...new Set(industries.map((x) => x.cat))].sort()

export default function Contact() {
  const { code } = useCurrency()
  const fp = (v) => formatPrice(v, code)
  const budgetLabel = ([lo, hi]) => (hi == null ? `${fp(lo)}+` : lo === 0 ? `Under ${fp(hi)}` : `${fp(lo)} – ${fp(hi)}`)
  const [f, setF] = useState({ name: '', contact: '', service: 'demo', message: '', plan: '', industry: '', budget: '', timeline: timelines[0] })
  const [sent, setSent] = useState('')

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get('plan')
    if (plan && planToService[plan]) {
      setF((s) => ({ ...s, plan, service: planToService[plan] }))
    }
  }, [])

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))
  const label = services.find((s) => s[0] === f.service)?.[1]
  const text = () =>
    [
      `Hi ${brand.founderShort}, I found ${brand.name} on your website.`,
      `Name: ${f.name || '-'}`,
      `Email / phone: ${f.contact || '-'}`,
      `Interested in: ${label}${f.plan && !['demo', 'audit'].includes(f.plan) ? ` (${f.plan} plan)` : ''}`,
      `Business type: ${f.industry || '-'}`,
      `Budget: ${f.budget || 'Not sure yet'}`,
      `Timeline: ${f.timeline}`,
      `About my project: ${f.message || '-'}`,
    ].join('\n')

  const valid = f.name.trim() && f.contact.trim()

  const go = (kind) => (e) => {
    e.preventDefault()
    if (!valid) {
      setSent('Please add your name and an email or phone number.')
      return
    }
    setSent('')
    if (kind === 'wa') window.open(waLink(text()), '_blank', 'noopener')
    else window.location.href = mailLink(`Project enquiry from ${f.name}`, text())
  }

  return (
    <>
      <PageHero
        crumb="Contact"
        title="Start a project"
        lead={`Free demo, site audit or fixed quote. We reply ${brand.reply}.`}
        chips={[[IconGift, 'Free first demo'], [IconClock, brand.hoursShort], [IconGlobe, 'Worldwide, remote']]}
      />
      <Section tone="white">
        <div className="nx-contact">
          <form className="nx-form" onSubmit={go('wa')} noValidate>
            <label>
              <span>Your name</span>
              <input name="name" autoComplete="name" value={f.name} onChange={set('name')} required />
            </label>
            <label>
              <span>Email or phone number</span>
              <input name="contact" autoComplete="email" value={f.contact} onChange={set('contact')} required />
            </label>
            <label>
              <span>What do you need?</span>
              <select name="service" value={f.service} onChange={set('service')}>
                {services.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
            <div className="nx-form-row">
              <label>
                <span>Type of business</span>
                <select name="industry" value={f.industry} onChange={set('industry')}>
                  <option value="">Choose your industry</option>
                  {cats.map((c) => <option key={c} value={c}>{c}</option>)}
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                <span>When do you need it?</span>
                <select name="timeline" value={f.timeline} onChange={set('timeline')}>
                  {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
            </div>
            <fieldset className="nx-budget">
              <legend>Budget (optional)</legend>
              <div className="nx-chips" role="radiogroup">
                {budgets.map((b) => {
                  const l = budgetLabel(b)
                  return (
                    <button type="button" key={l} role="radio" aria-checked={f.budget === l} className={f.budget === l ? 'is-on' : ''} onClick={() => setF((s2) => ({ ...s2, budget: s2.budget === l ? '' : l }))}>
                      {l}
                    </button>
                  )
                })}
              </div>
            </fieldset>
            <label>
              <span>Business name, city and what you want more of</span>
              <textarea name="message" rows="5" value={f.message} onChange={set('message')} />
            </label>
            <div className="nx-form-actions">
              <button type="submit" className="nx-btn nx-btn-primary">
                <IconWhatsApp width={20} height={20} />
                <span>Send on WhatsApp</span>
              </button>
              <button type="button" className="nx-btn nx-btn-outline" onClick={go('mail')}>
                <IconMail width={20} height={20} />
                <span>Send by email</span>
              </button>
            </div>
            <p className="nx-form-msg" role="status">
              {sent || 'This opens WhatsApp or your email app with your message ready to send.'}
            </p>
          </form>

          <aside className="nx-contact-side">
            <h2 className="nx-h3">What happens next</h2>
            <ol className="nx-next">
              <li>You send this message on WhatsApp or email.</li>
              <li>We reply {brand.reply} ({brand.hoursShort}) with a few questions.</li>
              <li>Within 3 working days you get a link to your demo homepage, a design normally priced from <Price usd={websitePlans[0].price} inr={websitePlans[0].inr} />. Free, no obligation.</li>
              <li>Like it? Pay 50% and we build the full site. Not for you? Walk away, nothing to pay.</li>
            </ol>
            <h2 className="nx-h3">Prefer to talk?</h2>
            <ul>
              <li>
                <IconWhatsApp width={22} height={22} />
                <div>
                  <strong>WhatsApp</strong>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer">{brand.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <IconMail width={22} height={22} />
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </div>
              </li>
              <li>
                <IconPin width={22} height={22} />
                <div>
                  <strong>Based in</strong>
                  <span>{brand.location}, serving clients worldwide</span>
                </div>
              </li>
            </ul>
            <h2 className="nx-h3">Our hours in your time zone</h2>
            <dl className="nx-hours">
              <div><dt>India</dt><dd>9 am – 9 pm</dd></div>
              <div><dt>UAE, Oman</dt><dd>7:30 am – 7:30 pm</dd></div>
              <div><dt>Saudi, Qatar, Kuwait</dt><dd>6:30 am – 6:30 pm</dd></div>
              <div><dt>Singapore, Malaysia</dt><dd>11:30 am – 11:30 pm</dd></div>
            </dl>
            <p className="nx-fine">Monday to Saturday. Calls with the UK, US and Australia are scheduled at a time that suits you.</p>
          </aside>
        </div>
      </Section>
    </>
  )
}
