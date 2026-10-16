import { useEffect, useState } from 'react'

const tabs = ['Website', 'Online store', 'Booking', 'Dashboard', 'Client portal']
const prompts = [
  'A restaurant website with table booking',
  'An online store for a furniture shop',
  'Appointment booking for a salon',
  'A sales dashboard for a retail chain',
  'A client portal for a design agency',
]
const ph = (k, sm) => `/assets/photos/${k}${sm ? '-sm' : ''}.webp`

const chips = [
  [['New reservation', 'Table for 4 · 8:30 pm'], ['Page speed', 'Loads in under 2 seconds']],
  [['Order received', 'Sample order'], ['Added to cart', 'Oak lounge chair']],
  [['Booking confirmed', 'Wed 16 · 11:30'], ['Reminder sent', 'WhatsApp and email']],
  [['Revenue up', '+12% this month'], ['New customer', 'Sample data']],
  [['Invoice paid', 'Invoice #1042'], ['Design approved', 'Ready to build']],
]

function Laptop({ i }) {
  if (i === 0)
    return (
      <div className="sc sc-site">
        <div className="sc-nav"><b>Saffron Table</b><span>Menu</span><span>Story</span><span>Offers</span><em>Reserve</em></div>
        <div className="sc-split">
          <div className="sc-copy">
            <small>Modern Indian dining</small>
            <h4>Slow-cooked flavours, served with care</h4>
            <p>Fresh spices, open kitchen, and a table waiting for you.</p>
            <div className="sc-row"><i className="sc-btn">Reserve a table</i><i className="sc-btn ghost">View menu</i></div>
          </div>
          <div className="sc-photo"><img src={ph('restaurant')} alt="" width="1000" height="667" /><span className="sc-badge">4.9 ★ <small>sample rating</small></span></div>
        </div>
        <div className="sc-trio"><div><b>Open kitchen</b><span>Watch it cooked</span></div><div><b>Private dining</b><span>Up to 40 guests</span></div><div><b>Order online</b><span>Pickup or delivery</span></div></div>
      </div>
    )
  if (i === 1)
    return (
      <div className="sc sc-store">
        <div className="sc-nav"><b>Hearth &amp; Co</b><span className="sc-search">Search the shop</span><span>Sale</span><em>Cart · 2</em></div>
        <div className="sc-chips"><i className="on">All</i><i>Living room</i><i>Fashion</i><i>Decor</i><i>New in</i><span>Free shipping over $50</span></div>
        <div className="sc-grid4">
          {[['furniture', 'Oak lounge chair', '$249'], ['boutique', 'Linen shirt', '$59'], ['interior', 'Table lamp', '$89'], ['cafe', 'Ceramic set', '$39']].map(([k, n, p]) => (
            <div key={k} className="sc-prod"><img src={ph(k, true)} alt="" width="480" height="320" /><b>{n}</b><span>{p}</span><i>Add to cart</i></div>
          ))}
        </div>
      </div>
    )
  if (i === 2)
    return (
      <div className="sc sc-book">
        <div className="sc-nav"><b>Aster Studio</b><span>Services</span><span>Team</span><em>Book a visit</em></div>
        <div className="sc-bk">
          <div className="sc-svcs">
            <small>1 · Choose a service</small>
            {[['Signature facial', '60 min · $70', 1], ['Hair and style', '45 min · $45', 0], ['Skin consultation', '20 min · $15', 0]].map(([n, d, on]) => <div key={n} className={on ? 'on' : ''}><b>{n}</b><span>{d}</span></div>)}
          </div>
          <div className="sc-cal">
            <small>2 · Pick a time</small>
            <div className="sc-days">{['Mon 14', 'Tue 15', 'Wed 16', 'Thu 17', 'Fri 18'].map((d, k) => <i key={d} className={k === 2 ? 'on' : ''}>{d}</i>)}</div>
            <div className="sc-times">{['09:30', '10:30', '11:30', '14:00', '15:30', '16:30'].map((t, k) => <i key={t} className={k === 2 ? 'on' : k === 1 ? 'off' : ''}>{t}</i>)}</div>
            <div className="sc-sum"><span>Signature facial · Wed 16, 11:30</span><b>$70</b></div>
            <i className="sc-btn wide">Confirm booking</i>
          </div>
        </div>
      </div>
    )
  if (i === 3)
    return (
      <div className="sc sc-dash">
        <aside><i className="lg" /><i className="on" /><i /><i /><i /></aside>
        <div className="sc-main">
          <div className="sc-top"><b>Sales overview</b><span>Last 30 days</span></div>
          <div className="sc-kpis">{[['Revenue', '$48.2k', '+12%'], ['Orders', '1,284', '+8%'], ['Customers', '392', '+5%']].map(([l, v, d]) => <div key={l}><small>{l}</small><b>{v}</b><em>{d}</em></div>)}</div>
          <div className="sc-charts">
            <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="sc-line">
              <defs><linearGradient id="scg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2b50e6" stopOpacity=".3" /><stop offset="1" stopColor="#2b50e6" stopOpacity="0" /></linearGradient></defs>
              <path d="M0 78 C30 72 45 52 80 58 S130 30 165 36 S235 14 300 8 V100 H0z" fill="url(#scg)" />
              <path d="M0 78 C30 72 45 52 80 58 S130 30 165 36 S235 14 300 8" fill="none" stroke="#2b50e6" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="sc-rows">{[['#1042', 'Paid'], ['#1041', 'Shipped'], ['#1040', 'Paid']].map(([n, s]) => <div key={n}><span>Order {n}</span><em>{s}</em></div>)}</div>
          </div>
        </div>
      </div>
    )
  return (
    <div className="sc sc-dash sc-portal">
      <aside><i className="lg" /><i className="on" /><i /><i /><i /></aside>
      <div className="sc-main">
        <div className="sc-top"><b>Client portal</b><span>Hello, Priya</span></div>
        <div className="sc-steps">{['Brief', 'Design', 'Build', 'Review', 'Launch'].map((t, k) => <div key={t} className={k < 3 ? 'on' : ''}><i />{t}</div>)}</div>
        <div className="sc-charts two">
          <div className="sc-rows">{[['Website redesign', 'In build', 'm'], ['Invoice #1042', 'Paid', 'm'], ['Logo files', 'Delivered', 'm'], ['Support request', 'Open', 's']].map(([t, s, c]) => <div key={t}><span>{t}</span><em className={c}>{s}</em></div>)}</div>
          <div className="sc-msg"><small>Latest message</small><b>Your homepage design is ready for review.</b><i className="sc-btn">Open project</i></div>
        </div>
      </div>
    </div>
  )
}

function Phone({ i }) {
  if (i === 0)
    return (
      <div className="ph ph-a">
        <div className="ph-top"><b>Saffron Table</b><i /></div>
        <img src={ph('restaurant', true)} alt="" width="480" height="320" />
        <b className="ph-h">Reserve a table</b>
        <div className="ph-chips"><i className="on">Tonight</i><i>Sat</i><i>Sun</i></div>
        <div className="ph-chips"><i>7:30</i><i className="on">8:30</i><i>9:30</i></div>
        <i className="sc-btn wide">Confirm</i>
      </div>
    )
  if (i === 1)
    return (
      <div className="ph ph-a">
        <div className="ph-top"><b>Hearth &amp; Co</b><i /></div>
        <img src={ph('furniture', true)} alt="" width="480" height="320" />
        <b className="ph-h">Oak lounge chair</b>
        <div className="ph-price"><b>$249</b><span>Free delivery</span></div>
        <div className="ph-chips"><i className="on">Green</i><i>Grey</i><i>Sand</i></div>
        <i className="sc-btn wide">Add to cart</i>
      </div>
    )
  if (i === 2)
    return (
      <div className="ph ph-c">
        <div className="ph-tick">✓</div>
        <b className="ph-h">You are booked</b>
        <span className="ph-sub">Signature facial</span>
        <div className="ph-card"><small>When</small><b>Wed 16 · 11:30</b><small>Where</small><b>Aster Studio</b></div>
        <i className="sc-btn wide">Add to calendar</i>
      </div>
    )
  if (i === 3)
    return (
      <div className="ph ph-a">
        <div className="ph-top"><b>Today</b><i /></div>
        <div className="ph-big"><small>Revenue</small><b>$2,480</b><em>+12%</em></div>
        <svg viewBox="0 0 120 50" preserveAspectRatio="none" className="ph-spark"><path d="M0 40 C15 36 22 24 40 28 S70 12 90 16 S110 6 120 3" fill="none" stroke="#2b50e6" strokeWidth="2.5" strokeLinecap="round" /></svg>
        <div className="ph-bars">{[40, 62, 50, 78, 66, 90].map((h, k) => <i key={k} style={{ height: `${h}%` }} />)}</div>
      </div>
    )
  return (
    <div className="ph ph-a">
      <div className="ph-top"><b>Updates</b><i /></div>
      {[['Invoice #1042 paid', 'Just now'], ['Design approved', '2h ago'], ['New file shared', 'Yesterday'], ['Review call booked', 'Mon 10:00']].map(([t, s]) => (
        <div key={t} className="ph-note"><i /><div><b>{t}</b><span>{s}</span></div></div>
      ))}
      <i className="sc-btn wide">Open portal</i>
    </div>
  )
}

function Prompt({ i }) {
  const text = prompts[i]
  const [n, setN] = useState(text.length)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(text.length); return }
    setN(0)
    let k = 0
    const t = setInterval(() => { k += 1; setN(k); if (k >= text.length) clearInterval(t) }, 32)
    return () => clearInterval(t)
  }, [text])
  const done = n >= text.length
  return (
    <div className={`hv-prompt${done ? ' is-done' : ''}`} aria-hidden="true">
      <span className="hv-spark">✦</span>
      <span className="hv-ptext">{text.slice(0, n)}<i className="hv-caret" /></span>
      <span className="hv-status">{done ? 'Live in 3 days' : 'Designing…'}</span>
    </div>
  )
}

export default function HeroVisual() {
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    const on = (e) => setI(e.detail)
    window.addEventListener('vrlss:tab', on)
    return () => window.removeEventListener('vrlss:tab', on)
  }, [])

  useEffect(() => { window.dispatchEvent(new CustomEvent('vrlss:shown', { detail: i })) }, [i])

  useEffect(() => {
    if (document.documentElement.classList.contains('cin-wide')) return
    if (hold || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((x) => (x + 1) % tabs.length), 3600)
    return () => clearInterval(t)
  }, [hold])

  return (
    <div className="nx-hvwrap" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <div className="nx-hv" aria-hidden="true">
        <div className="nx-hv-laptop">
          <div className="nx-hv-bar"><i /><i /><i /><span>{['saffrontable.com', 'hearthandco.com', 'asterstudio.com', 'app.vrlss.in/overview', 'portal.vrlss.in'][i]}</span></div>
          <div className="nx-hv-screen">
            {tabs.map((_, k) => (
              <div key={k} className="sc-wrap" {...(k === i ? { 'data-on': '' } : {})}>
                <Laptop i={k} />
                <svg className={`sc-cursor cu${k}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 7.2-6.2 1.9L9.9 18.6z" fill="#0f2230" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                <i className={`sc-rip cu${k}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="nx-hv-phone">
          {tabs.map((_, k) => (
            <div key={k} className="ph-wrap" {...(k === i ? { 'data-on': '' } : {})}><Phone i={k} /></div>
          ))}
        </div>
        <div className="hr-chip c1" key={`c1${i}`}><i>✓</i><p><b>{chips[i][0][0]}</b><small>{chips[i][0][1]}</small></p></div>
        <div className="hr-chip c2" key={`c2${i}`}><i className="o">★</i><p><b>{chips[i][1][0]}</b><small>{chips[i][1][1]}</small></p></div>
      </div>
      <div className="hv-tabs" role="tablist" aria-label="What we build">
        {tabs.map((t, k) => (
          <button type="button" role="tab" aria-selected={k === i} key={t} className={k === i ? 'on' : ''} onClick={() => { setI(k); setHold(true) }}>
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
