import { useEffect, useState } from 'react'
import { Section, PageHero } from '../components/Bits'
import { IconWhatsApp, IconMail, IconPin } from '../icons'
import { brand, waLink, mailLink } from '../brand'

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

export default function Contact() {
  const [f, setF] = useState({ name: '', contact: '', service: 'demo', message: '', plan: '' })
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
        title="Tell us about your business"
        lead="Ask for a free demo homepage, a free check of your current site, or a fixed-price quote. You get a reply within one business day."
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
              <li>{brand.founderShort} replies within one business day with a few questions.</li>
              <li>For a demo, you get a link to your homepage within 3 working days. No payment, no obligation.</li>
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
            <p className="nx-fine">
              We work in Indian Standard Time (UTC+5:30) and schedule calls at times that suit your region.
            </p>
          </aside>
        </div>
      </Section>
    </>
  )
}
