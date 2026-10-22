import { useEffect, useMemo, useState } from 'react'
import { Link } from '../router'
import { brand, waLink, mailLink } from '../brand'
import { useCurrency, CurrencySelect } from '../currency'
import { formatPrice } from '../prices'
import { industries } from '../demos/industries'
import { LANGS } from '../demos/locales'
import { markets } from '../places'
import PrintRoot, { pack, unpack, store } from '../components/Print'
import {
  projectTypes, goals as goalList, pageOptions, storeSizes, appKinds, appSizes, mobilePlatforms, features as featureList,
  styles as styleList, contentReady, timelines, emptyBrief, estimate,
} from '../estimates'
import {
  IconArrow, IconCheck, IconWhatsApp, IconMail, IconPrint, IconLink, IconEdit, IconGift, IconClock, IconCoins,
  IconLayout, IconTarget, IconPalette, IconCart, IconLayers, IconPhone, IconSparkle, IconMegaphone, IconWrench,
} from '../icons'

const ICONS = { layout: IconLayout, target: IconTarget, palette: IconPalette, cart: IconCart, layers: IconLayers, phone: IconPhone, sparkle: IconSparkle, megaphone: IconMegaphone, wrench: IconWrench }
const STEPS = ['Project', 'Business', 'Goals', 'Scope', 'Features', 'Design', 'Timeline', 'Contact', 'Your brief']
const KEY = 'vrlss-brief'
const cats = [...new Set(industries.map((x) => x.cat))].sort()
const budgets = [[0, 99], [99, 249], [249, 549], [549, 1500], [1500, 5000], [5000, null]]
const mOptions = [['presence', 'Presence: Google profile + social posts'], ['growth', 'Growth: SEO + content + social'], ['ads', 'Ads: Google and Meta campaigns']]

const newRef = () => {
  const d = new Date()
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  return `VB-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

function Chips({ options, value, onChange, multi = false, name }) {
  const on = (v) => (multi ? value.includes(v) : value === v)
  const toggle = (v) => onChange(multi ? (value.includes(v) ? value.filter((x) => x !== v) : [...value, v]) : value === v ? '' : v)
  return (
    <div className="pl-chips" role={multi ? 'group' : 'radiogroup'} aria-label={name}>
      {options.map((o) => {
        const [v, l] = Array.isArray(o) ? o : [o, o]
        return (
          <button key={v} type="button" role={multi ? 'checkbox' : 'radio'} aria-checked={on(v)} className={on(v) ? 'is-on' : ''} onClick={() => toggle(v)}>
            {on(v) && <IconCheck width={15} height={15} />}
            <span>{l}</span>
          </button>
        )
      })}
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <label className="pl-field">
      <span className="pl-label">{label}{hint && <small>{hint}</small>}</span>
      {children}
    </label>
  )
}

function Group({ title, hint, children }) {
  return (
    <fieldset className="pl-group">
      <legend className="pl-label">{title}{hint && <small>{hint}</small>}</legend>
      {children}
    </fieldset>
  )
}

export function money(x, code) {
  return formatPrice(x.usd, code, code === 'INR' ? x.inr : undefined)
}

function EstimatePanel({ est, code, compact = false }) {
  const range = est.low.usd ? `${money(est.low, code)} – ${money(est.high, code)}` : null
  return (
    <div className={`pl-est${compact ? ' is-compact' : ''}`}>
      <div className="pl-est-head">
        <span>Estimated price</span>
        <CurrencySelect id={compact ? 'pl-cur-m' : 'pl-cur'} label="Currency" compact />
      </div>
      <p className="pl-est-total">{range || (est.month.usd ? '—' : 'Pick a project type')}</p>
      {est.month.usd > 0 && <p className="pl-est-month">+ {money(est.month, code)} <small>/ month</small></p>}
      {!compact && (
        <>
          {est.one.length + est.monthly.length > 0 && (
            <ul className="pl-est-lines">
              {est.one.map((l) => <li key={l.label}><span>{l.label}</span><b>{l.usd ? money(l, code) : 'Included'}</b></li>)}
              {est.monthly.map((l) => <li key={l.label}><span>{l.label}</span><b>{money(l, code)}/mo</b></li>)}
            </ul>
          )}
          {est.days && <p className="pl-est-days"><IconClock width={16} height={16} /> Typical delivery: {est.days}</p>}
          {est.offers.length > 0 && (
            <ul className="pl-offers">
              {est.offers.map((o) => (
                <li key={o.id}>
                  <IconGift width={16} height={16} />
                  <div>
                    <b>{o.title}</b>
                    <span>{o.text}{o.save ? ` You save about ${money(o.save, code)}.` : ''}{o.monthly ? ` From ${formatPrice(o.monthly.usd, code)}/month.` : ''}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="pl-fine">An estimate, not a quote. We confirm the exact price in writing after a short call. No GST is charged.</p>
        </>
      )}
    </div>
  )
}

// The printable / shareable project brief.
export function BriefDoc({ b, est, code, refNo, date }) {
  const typeNames = b.types.map((t) => projectTypes.find((x) => x.id === t)?.name).filter(Boolean)
  const featNames = (b.features || []).map((f) => featureList.find((x) => x.id === f)?.name).filter(Boolean)
  const langNames = (b.languages || []).map((l) => LANGS[l]?.name).filter(Boolean)
  const row = (k, v) => (v && (!Array.isArray(v) || v.length) ? <tr key={k}><th>{k}</th><td>{Array.isArray(v) ? v.join(', ') : v}</td></tr> : null)
  const has = (t) => b.types.includes(t)
  return (
    <article className="doc-sheet bf-doc">
      <header className="doc-top">
        <img src="/brand/logo-dark.webp" alt={brand.name} width="150" height="41" />
        <div className="doc-meta">
          <b>Project brief</b>
          <span>{refNo}</span>
          <span>{date}</span>
        </div>
      </header>
      <h1 className="doc-title">{b.business || 'New project'}</h1>
      <p className="doc-sub">{typeNames.join(' · ')}</p>

      <h2>Client</h2>
      <table className="doc-kv"><tbody>
        {row('Name', b.name)}{row('Email', b.email)}{row('Phone / WhatsApp', b.phone)}{row('Preferred contact', b.contactBy)}
        {row('Business', b.business)}{row('Industry', b.industry)}{row('Location', [b.city, b.country].filter(Boolean).join(', '))}
        {row('Current website', b.currentSite)}{row('Social / Google link', b.social)}
      </tbody></table>

      <h2>Goals</h2>
      <table className="doc-kv"><tbody>
        {row('Main goals', b.goals)}{row('Target customers', b.audience)}{row('Websites they like', b.references)}
      </tbody></table>

      <h2>Scope</h2>
      <table className="doc-kv"><tbody>
        {row('Project types', typeNames)}
        {(has('website') || has('redesign')) && row('Pages', `${[...b.pages, ...(b.extraPages ? [`+${b.extraPages} more`] : [])].join(', ')} (${est.pages} total)`)}
        {has('store') && row('Store size', storeSizes.find((s) => s.id === b.storeSize)?.name)}
        {has('webapp') && row('Web app', [b.appKind, appSizes.find((s) => s.id === b.appSize)?.name].filter(Boolean).join(' · '))}
        {has('webapp') && row('Users and roles', b.appUsers)}
        {has('mobile') && row('Mobile platforms', b.mobile)}
        {has('marketing') && row('Marketing', (b.marketing || []).map((m) => mOptions.find((x) => x[0] === m)?.[1]))}
        {row('Features', featNames)}{row('Languages', langNames)}
      </tbody></table>

      <h2>Design and content</h2>
      <table className="doc-kv"><tbody>
        {row('Style', b.style)}{row('Colours', b.colours)}{row('Logo', b.hasLogo === 'yes' ? 'Has a logo' : 'Needs a logo')}
        {row('Text and photos', contentReady.find((c) => c.id === b.content)?.name)}{row('Domain', b.domain === 'yes' ? 'Already has a domain' : 'Needs a domain')}
      </tbody></table>

      <h2>Timeline and budget</h2>
      <table className="doc-kv"><tbody>
        {row('Timeline', b.timeline)}{row('Budget', b.budget)}{row('Care plan', b.care ? 'Yes, monthly care' : '')}{row('Notes', b.notes)}
      </tbody></table>

      <h2>Estimate</h2>
      <table className="doc-lines">
        <tbody>
          {est.one.map((l) => <tr key={l.label}><td>{l.label}</td><td>{l.usd ? money(l, code) : 'Included'}</td></tr>)}
          {est.monthly.map((l) => <tr key={l.label}><td>{l.label}</td><td>{money(l, code)} / month</td></tr>)}
        </tbody>
        <tfoot>
          {est.low.usd > 0 && <tr><th>Estimated one-time cost</th><th>{money(est.low, code)} – {money(est.high, code)}</th></tr>}
          {est.month.usd > 0 && <tr><th>Monthly</th><th>{money(est.month, code)} / month</th></tr>}
        </tfoot>
      </table>
      {est.days && <p className="doc-note">Typical delivery: {est.days}.</p>}
      {est.offers.length > 0 && (
        <>
          <h2>Offers</h2>
          <ul className="doc-list">{est.offers.map((o) => <li key={o.id}><b>{o.title}.</b> {o.text}</li>)}</ul>
        </>
      )}
      <h2>Next steps</h2>
      <ol className="doc-list">
        <li>We review this brief and reply {brand.reply} ({brand.hoursShort}).</li>
        <li>A short call to confirm the details, then a fixed quote in writing.</li>
        <li>Your free homepage demo, then 50% to start and 50% before launch.</li>
      </ol>
      <footer className="doc-foot">
        <span>{brand.name} · {brand.url.replace('https://', '')} · {brand.email} · Call {brand.phoneDisplay} · WhatsApp {brand.whatsappDisplay}</span>
        <span>This estimate is indicative. Final price confirmed in a written quote.</span>
      </footer>
    </article>
  )
}

export default function Start() {
  const { code } = useCurrency()
  const [b, setB] = useState(emptyBrief)
  const [step, setStep] = useState(0)
  const [refNo, setRefNo] = useState('')
  const [msg, setMsg] = useState('')
  const [loaded, setLoaded] = useState(false)

  // restore: a shared link (#b=...) wins, then a saved draft
  useEffect(() => {
    const m = window.location.hash.match(/b=([^&]+)/)
    const shared = m ? unpack(m[1]) : null
    if (shared && shared.b) {
      setB({ ...emptyBrief, ...shared.b })
      setRefNo(shared.r || newRef())
      setStep(STEPS.length - 1)
    } else {
      const saved = store.get(KEY, null)
      if (saved && saved.b) {
        setB({ ...emptyBrief, ...saved.b })
        setStep(Math.min(saved.step || 0, STEPS.length - 1))
        setRefNo(saved.r || newRef())
      } else setRefNo(newRef())
      const type = new URLSearchParams(window.location.search).get('type')
      if (type && projectTypes.some((t) => t.id === type) && !(saved && saved.b)) setB((s) => ({ ...s, types: [type] }))
    }
    setLoaded(true)
  }, [])
  useEffect(() => { if (loaded) store.set(KEY, { b, step, r: refNo }) }, [b, step, refNo, loaded])

  const set = (k) => (v) => setB((s) => ({ ...s, [k]: v && v.target ? (v.target.type === 'checkbox' ? v.target.checked : v.target.value) : v }))
  const est = useMemo(() => estimate(b, { abroad: code !== 'INR' }), [b, code])
  const has = (t) => b.types.includes(t)
  const needsSite = has('website') || has('redesign')
  const buildsSomething = needsSite || has('landing') || has('store') || has('webapp')
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const fp = (v) => formatPrice(v, code)
  const budgetLabel = ([lo, hi]) => (hi == null ? `${fp(lo)}+` : lo === 0 ? `Under ${fp(hi)}` : `${fp(lo)} – ${fp(hi)}`)

  const errors = {
    0: !b.types.length && 'Pick at least one thing you need.',
    1: !b.business.trim() && 'Add your business name.',
    7: (!b.name.trim() && 'Add your name.') || (!b.email.trim() && !b.phone.trim() && 'Add an email or phone number.'),
  }
  const next = () => {
    if (errors[step]) { setMsg(errors[step]); return }
    setMsg('')
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const back = () => { setMsg(''); setStep((s) => Math.max(0, s - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const shareUrl = () => `${brand.url}/start#b=${pack({ r: refNo, b })}`
  const summary = () => {
    const typeNames = b.types.map((t) => projectTypes.find((x) => x.id === t)?.name).join(', ')
    return [
      `Hi ${brand.founderShort}, here is my project brief (${refNo}).`,
      `Name: ${b.name}`,
      `Business: ${b.business}${b.city || b.country ? ` (${[b.city, b.country].filter(Boolean).join(', ')})` : ''}`,
      `I need: ${typeNames}`,
      est.low.usd ? `Estimate shown: ${money(est.low, code)} – ${money(est.high, code)}${est.month.usd ? ` + ${money(est.month, code)}/month` : ''}` : est.month.usd ? `Estimate shown: ${money(est.month, code)}/month` : '',
      `Timeline: ${b.timeline}`,
      `Full brief: ${shareUrl()}`,
    ].filter(Boolean).join('\n')
  }
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl()); setMsg('Link copied. Anyone with it can open this brief.') } catch { setMsg(shareUrl()) }
  }
  const restart = () => { setB(emptyBrief); setStep(0); setRefNo(newRef()); setMsg(''); window.history.replaceState({}, '', '/start') }

  const S = (
    <>
      {step === 0 && (
        <div className="pl-step">
          <h2>What do you need?</h2>
          <p className="pl-help">Pick everything that applies.</p>
          <div className="pl-types">
            {projectTypes.map((t) => {
              const Ico = ICONS[t.icon] || IconLayout
              const on = has(t.id)
              return (
                <button key={t.id} type="button" role="checkbox" aria-checked={on} className={`pl-type${on ? ' is-on' : ''}`} onClick={() => set('types')(on ? b.types.filter((x) => x !== t.id) : [...b.types, t.id])}>
                  <span className="pl-type-ico"><Ico width={22} height={22} /></span>
                  <b>{t.name}</b>
                  <small>{t.note}</small>
                  <i className="pl-tick" aria-hidden="true"><IconCheck width={14} height={14} /></i>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="pl-step">
          <h2>About your business</h2>
          <div className="pl-grid2">
            <Field label="Business name"><input value={b.business} onChange={set('business')} autoComplete="organization" /></Field>
            <Field label="Industry">
              <select value={b.industry} onChange={set('industry')}>
                <option value="">Choose</option>
                {cats.map((c) => <option key={c}>{c}</option>)}
                <option>Other</option>
              </select>
            </Field>
            <Field label="Country">
              <select value={b.country} onChange={set('country')}>
                <option value="">Choose</option>
                {markets.map(([cc, n]) => <option key={cc}>{n}</option>)}
                <option>Other</option>
              </select>
            </Field>
            <Field label="City"><input value={b.city} onChange={set('city')} autoComplete="address-level2" /></Field>
            <Field label="Current website" hint="optional"><input value={b.currentSite} onChange={set('currentSite')} placeholder="www.example.com" inputMode="url" /></Field>
            <Field label="Instagram or Google Maps link" hint="optional"><input value={b.social} onChange={set('social')} inputMode="url" /></Field>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="pl-step">
          <h2>Your goals</h2>
          <Group title="What should this project do for you?"><Chips multi options={goalList} value={b.goals} onChange={set('goals')} name="Goals" /></Group>
          <Field label="Who are your customers?" hint="optional"><input value={b.audience} onChange={set('audience')} placeholder="e.g. families in Vijayawada, tourists, companies in Dubai" /></Field>
          <Field label="Websites you like" hint="optional"><textarea rows="2" value={b.references} onChange={set('references')} placeholder="Links to sites or competitors you like, and why" /></Field>
        </div>
      )}

      {step === 3 && (
        <div className="pl-step">
          <h2>Scope</h2>
          {needsSite && (
            <>
              <Group title="Which pages do you need?" hint={`${est.pages} pages`}><Chips multi options={pageOptions} value={b.pages} onChange={set('pages')} name="Pages" /></Group>
              <Field label="Any other pages?" hint="number">
                <input type="number" min="0" max="100" value={b.extraPages} onChange={(e) => set('extraPages')(Math.max(0, Math.min(100, Number(e.target.value) || 0)))} />
              </Field>
            </>
          )}
          {has('store') && <Group title="How many products?"><Chips options={storeSizes.map((s) => [s.id, s.name])} value={b.storeSize} onChange={(v) => set('storeSize')(v || 's')} name="Products" /></Group>}
          {has('webapp') && (
            <>
              <Group title="What kind of web app?"><Chips options={appKinds} value={b.appKind} onChange={set('appKind')} name="App kind" /></Group>
              <Group title="How big is it?">
                <div className="pl-sizes">
                  {appSizes.map((s) => (
                    <button key={s.id} type="button" role="radio" aria-checked={b.appSize === s.id} className={b.appSize === s.id ? 'is-on' : ''} onClick={() => set('appSize')(s.id)}>
                      <b>{s.name}</b><small>{s.note}</small>
                    </button>
                  ))}
                </div>
              </Group>
              <Field label="Who will use it?" hint="optional"><input value={b.appUsers} onChange={set('appUsers')} placeholder="e.g. customers book, staff manage, owner sees reports" /></Field>
            </>
          )}
          {has('mobile') && <Group title="Which phones?"><Chips options={mobilePlatforms} value={b.mobile} onChange={(v) => set('mobile')(v || 'Android')} name="Platforms" /></Group>}
          {has('marketing') && <Group title="Which marketing?" hint="monthly"><Chips multi options={mOptions} value={b.marketing} onChange={set('marketing')} name="Marketing" /></Group>}
          <Group title="Do you have a logo?"><Chips options={[['yes', 'Yes'], ['no', 'No, I need one']]} value={b.hasLogo} onChange={(v) => set('hasLogo')(v || 'yes')} name="Logo" /></Group>
          {!needsSite && !has('store') && !has('webapp') && !has('mobile') && !has('marketing') && <p className="pl-help">Nothing else to choose here for your project. Continue.</p>}
        </div>
      )}

      {step === 4 && (
        <div className="pl-step">
          <h2>Features and languages</h2>
          {buildsSomething ? (
            <Group title="Features">
              <div className="pl-checks">
                {featureList.map((f) => {
                  const on = b.features.includes(f.id)
                  return (
                    <button key={f.id} type="button" role="checkbox" aria-checked={on} className={on ? 'is-on' : ''} onClick={() => set('features')(on ? b.features.filter((x) => x !== f.id) : [...b.features, f.id])}>
                      <i aria-hidden="true">{on && <IconCheck width={14} height={14} />}</i>
                      <span>{f.name}</span>
                      <small>{!f.usd || (f.freeWith && est.tierId === f.freeWith) ? 'Included' : `+${money(f, code)}`}</small>
                    </button>
                  )
                })}
              </div>
            </Group>
          ) : <p className="pl-help">Features apply to websites, stores and web apps.</p>}
          <Group title="Languages" hint="first one included">
            <Chips multi options={Object.entries(LANGS).map(([k, l]) => [k, l.name])} value={b.languages} onChange={(v) => set('languages')(v.length ? v : ['en'])} name="Languages" />
          </Group>
        </div>
      )}

      {step === 5 && (
        <div className="pl-step">
          <h2>Design and content</h2>
          <Group title="Style"><Chips options={styleList} value={b.style} onChange={set('style')} name="Style" /></Group>
          <Field label="Brand colours" hint="optional"><input value={b.colours} onChange={set('colours')} placeholder="e.g. navy and gold, or 'use my logo colours'" /></Field>
          <Group title="Text and photos"><Chips options={contentReady.map((c) => [c.id, c.name])} value={b.content} onChange={(v) => set('content')(v || 'partly')} name="Content" /></Group>
          <Group title="Do you have a domain name?"><Chips options={[['yes', 'Yes'], ['no', 'No, set it up for me']]} value={b.domain} onChange={(v) => set('domain')(v || 'no')} name="Domain" /></Group>
        </div>
      )}

      {step === 6 && (
        <div className="pl-step">
          <h2>Timeline and budget</h2>
          <Group title="When do you need it?"><Chips options={timelines} value={b.timeline} onChange={(v) => set('timeline')(v || timelines[2])} name="Timeline" /></Group>
          <Group title="Budget" hint="optional"><Chips options={budgets.map(budgetLabel)} value={b.budget} onChange={set('budget')} name="Budget" /></Group>
          <label className="pl-switch">
            <input type="checkbox" checked={b.care} onChange={set('care')} />
            <span>Add monthly care (updates, backups, uptime checks)</span>
          </label>
          <Field label="Anything else?" hint="optional"><textarea rows="3" value={b.notes} onChange={set('notes')} /></Field>
        </div>
      )}

      {step === 7 && (
        <div className="pl-step">
          <h2>Your details</h2>
          <div className="pl-grid2">
            <Field label="Your name"><input value={b.name} onChange={set('name')} autoComplete="name" /></Field>
            <Field label="Email"><input type="email" value={b.email} onChange={set('email')} autoComplete="email" /></Field>
            <Field label="Phone / WhatsApp"><input type="tel" value={b.phone} onChange={set('phone')} autoComplete="tel" /></Field>
            <Field label="Best way to reach you">
              <select value={b.contactBy} onChange={set('contactBy')}>
                {['WhatsApp', 'Phone call', 'Email'].map((x) => <option key={x}>{x}</option>)}
              </select>
            </Field>
          </div>
          <p className="pl-help">We use these only to reply about your project. See our <Link to="/privacy">privacy policy</Link>.</p>
        </div>
      )}
    </>
  )

  const review = step === STEPS.length - 1
  return (
    <>
      <section className="pl-hero">
        <div className="nx-wrap">
          <nav className="nx-crumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Start a project</span></nav>
          <h1 className="pl-h1">Plan your project.</h1>
          <p className="pl-lead">Answer a few questions, see your estimate instantly, and get a ready project brief.</p>
          <ul className="ph-chips">
            <li><IconClock width={18} height={18} /><span>About 3 minutes</span></li>
            <li><IconCoins width={18} height={18} /><span>Instant estimate</span></li>
            <li><IconGift width={18} height={18} /><span>Free homepage demo</span></li>
          </ul>
        </div>
      </section>

      <section className="pl-wrap">
        <div className="nx-wrap pl-grid">
          <div className="pl-main">
            <ol className="pl-steps" aria-label="Steps">
              {STEPS.map((s, i) => (
                <li key={s} className={i === step ? 'is-now' : i < step ? 'is-done' : ''}>
                  <button type="button" onClick={() => i < step && setStep(i)} disabled={i > step} aria-current={i === step ? 'step' : undefined}>
                    <span>{i < step ? <IconCheck width={12} height={12} /> : i + 1}</span><em>{s}</em>
                  </button>
                </li>
              ))}
            </ol>

            {!review ? (
              <form className="pl-card" onSubmit={(e) => { e.preventDefault(); next() }} noValidate>
                {S}
                <div className="pl-nav">
                  {step > 0 && <button type="button" className="nx-btn nx-btn-outline" onClick={back}><span>Back</span></button>}
                  <button type="submit" className="nx-btn nx-btn-primary"><span>{step === STEPS.length - 2 ? 'See my brief' : 'Continue'}</span><IconArrow width={18} height={18} /></button>
                </div>
                <p className="pl-msg" role="status">{msg}</p>
              </form>
            ) : (
              <div className="pl-review">
                <div className="pl-actions">
                  <a className="nx-btn nx-btn-primary" href={waLink(summary())} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={20} height={20} /><span>Send on WhatsApp</span></a>
                  <a className="nx-btn nx-btn-outline" href={mailLink(`Project brief ${refNo}: ${b.business}`, summary())}><IconMail width={20} height={20} /><span>Send by email</span></a>
                  <button type="button" className="nx-btn nx-btn-outline" onClick={() => window.print()}><IconPrint width={20} height={20} /><span>Save as PDF</span></button>
                  <button type="button" className="nx-btn nx-btn-outline" onClick={copyLink}><IconLink width={20} height={20} /><span>Copy link</span></button>
                  <button type="button" className="nx-btn nx-btn-outline" onClick={() => setStep(0)}><IconEdit width={20} height={20} /><span>Edit</span></button>
                </div>
                <p className="pl-msg" role="status">{msg || 'Send it to us on WhatsApp or email. Your brief is saved on this device.'}</p>
                <div className="pl-paper"><BriefDoc b={b} est={est} code={code} refNo={refNo} date={date} /></div>
                <button type="button" className="pl-restart" onClick={restart}>Start a new brief</button>
              </div>
            )}
          </div>

          <aside className="pl-side" aria-label="Your estimate">
            <EstimatePanel est={est} code={code} />
          </aside>
        </div>
      </section>

      {!review && (
        <div className="pl-mbar" aria-hidden="false">
          <EstimatePanel est={est} code={code} compact />
        </div>
      )}
      {review && <PrintRoot><BriefDoc b={b} est={est} code={code} refNo={refNo} date={date} /></PrintRoot>}
    </>
  )
}
