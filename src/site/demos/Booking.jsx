import { useEffect, useMemo, useState } from 'react'
import DemoShell from './DemoShell'
import { demos } from './demoData'
import { IconCheck } from '../icons'

const demo = demos.find((d) => d.slug === 'booking-system')

const services = [
  { id: 'consult', name: 'Consultation', mins: 30, price: 25, note: 'A first chat about what you need' },
  { id: 'treat', name: 'Signature treatment', mins: 60, price: 60, note: 'Our most popular session' },
  { id: 'deep', name: 'Extended session', mins: 90, price: 85, note: 'Extra time for a full treatment' },
]
const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '16:00', '16:30', '17:00']
const fmt = (d) => d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })

// deterministic "already booked" so the demo feels real and never double-books
const taken = (dayIdx, tIdx) => (dayIdx * 7 + tIdx * 3 + (dayIdx % 3)) % 5 === 0

function ics(s, date, time, name) {
  const [h, m] = time.split(':').map(Number)
  const start = new Date(date)
  start.setHours(h, m, 0, 0)
  const end = new Date(start.getTime() + s.mins * 60000)
  const z = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${s.name} at Aster Studio\nDTSTART:${z(start)}\nDTEND:${z(end)}\nDESCRIPTION:Booked for ${name}\nEND:VEVENT\nEND:VCALENDAR`
}

export default function Booking() {
  const [days, setDays] = useState([])
  const [svc, setSvc] = useState(services[1])
  const [day, setDay] = useState(0)
  const [time, setTime] = useState('')
  const [f, setF] = useState({ name: '', phone: '' })
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    const out = []
    const d = new Date()
    while (out.length < 10) {
      d.setDate(d.getDate() + 1)
      if (d.getDay() !== 0) out.push(new Date(d))
    }
    setDays(out)
  }, [])

  const slots = useMemo(() => times.map((t, i) => ({ t, off: taken(day, i) })), [day])
  const date = days[day]

  const confirm = (e) => {
    e.preventDefault()
    if (!time) return setErr('Please choose a time.')
    if (!f.name.trim() || !f.phone.trim()) return setErr('Please add your name and phone number.')
    setErr('')
    setDone(true)
  }
  const download = () => {
    const blob = new Blob([ics(svc, date, time, f.name)], { type: 'text/calendar' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'booking.ics'
    a.click()
  }

  if (done)
    return (
      <DemoShell demo={demo}>
        <div className="bk-done">
          <span className="dm-ok"><IconCheck width={30} height={30} /></span>
          <h2 className="nx-h3">You’re booked, {f.name.split(' ')[0]}</h2>
          <p>
            {svc.name} · {fmt(date)} at {time} · {svc.mins} min
          </p>
          <p className="nx-fine">In a real system, a confirmation is sent by email and WhatsApp, and a reminder goes out the day before. The slot is removed for everyone else.</p>
          <div className="bk-actions">
            <button type="button" className="dm-btn dm-btn-lg" onClick={download}>Add to calendar</button>
            <button type="button" className="dm-btn dm-btn-ghost dm-btn-lg" onClick={() => { setDone(false); setTime('') }}>Book another</button>
          </div>
        </div>
      </DemoShell>
    )

  return (
    <DemoShell demo={demo}>
      <form className="bk" onSubmit={confirm} noValidate>
        <div className="bk-main">
          <section>
            <h2 className="dm-step"><b>1</b> Choose a service</h2>
            <div className="bk-svcs">
              {services.map((s) => (
                <button type="button" key={s.id} className={`bk-svc${svc.id === s.id ? ' is-on' : ''}`} onClick={() => setSvc(s)} aria-pressed={svc.id === s.id}>
                  <strong>{s.name}</strong>
                  <span>{s.note}</span>
                  <em>{s.mins} min · ${s.price}</em>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="dm-step"><b>2</b> Pick a day</h2>
            <div className="bk-days" role="group" aria-label="Day">
              {days.length === 0
                ? Array.from({ length: 6 }).map((_, i) => <span key={i} className="bk-day is-skel" />)
                : days.map((d, i) => (
                    <button type="button" key={i} className={`bk-day${i === day ? ' is-on' : ''}`} onClick={() => { setDay(i); setTime('') }} aria-pressed={i === day}>
                      <span>{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <strong>{d.getDate()}</strong>
                      <span>{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                    </button>
                  ))}
            </div>
          </section>

          <section>
            <h2 className="dm-step"><b>3</b> Choose a time</h2>
            <div className="bk-times" role="group" aria-label="Time">
              {slots.map(({ t, off }) => (
                <button type="button" key={t} disabled={off} className={`bk-time${time === t ? ' is-on' : ''}`} onClick={() => setTime(t)} aria-pressed={time === t}>
                  {t}
                </button>
              ))}
            </div>
            <p className="nx-fine">Greyed-out times are already booked.</p>
          </section>

          <section>
            <h2 className="dm-step"><b>4</b> Your details</h2>
            <div className="bk-fields">
              <label><span>Full name</span><input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" /></label>
              <label><span>Phone / WhatsApp</span><input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} autoComplete="tel" inputMode="tel" /></label>
            </div>
          </section>
        </div>

        <aside className="bk-sum">
          <h2 className="nx-h3">Your booking</h2>
          <dl>
            <div><dt>Service</dt><dd>{svc.name}</dd></div>
            <div><dt>Duration</dt><dd>{svc.mins} min</dd></div>
            <div><dt>Day</dt><dd>{date ? fmt(date) : '—'}</dd></div>
            <div><dt>Time</dt><dd>{time || 'Not chosen'}</dd></div>
            <div className="tot"><dt>Total</dt><dd>${svc.price}</dd></div>
          </dl>
          {err && <p className="dm-err" role="alert">{err}</p>}
          <button type="submit" className="dm-btn dm-btn-lg">Confirm booking</button>
          <p className="nx-fine">Pay at the studio. No payment is taken in this demo.</p>
        </aside>
      </form>
    </DemoShell>
  )
}
