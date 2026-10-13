import { useMemo, useState } from 'react'
import DemoShell from './DemoShell'
import { demos } from './demoData'

const demo = demos.find((d) => d.slug === 'sales-crm')
const stages = ['New', 'Contacted', 'Proposal', 'Won']
const init = [
  { id: 1, name: 'Bluewave Dental', owner: 'AK', value: 4200, stage: 'New' },
  { id: 2, name: 'Mason & Rowe Law', owner: 'SP', value: 7800, stage: 'New' },
  { id: 3, name: 'Gulfstream Cafe', owner: 'AK', value: 2600, stage: 'Contacted' },
  { id: 4, name: 'Atlas Fitness', owner: 'RM', value: 5400, stage: 'Contacted' },
  { id: 5, name: 'Orchid Hotels', owner: 'SP', value: 12600, stage: 'Proposal' },
  { id: 6, name: 'Pixel & Pine', owner: 'RM', value: 3100, stage: 'Won' },
]
const usd = (n) => `$${n.toLocaleString('en-US')}`

export default function Crm() {
  const [leads, setLeads] = useState(init)
  const [q, setQ] = useState('')
  const [drag, setDrag] = useState(null)
  const [over, setOver] = useState(null)
  const [form, setForm] = useState({ name: '', value: '' })

  const shown = useMemo(() => leads.filter((l) => l.name.toLowerCase().includes(q.toLowerCase())), [leads, q])
  const move = (id, dir) => setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, stage: stages[Math.max(0, Math.min(3, stages.indexOf(l.stage) + dir))] } : l)))
  const drop = (stage) => { if (drag) setLeads((ls) => ls.map((l) => (l.id === drag ? { ...l, stage } : l))); setDrag(null); setOver(null) }
  const add = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setLeads([{ id: Date.now(), name: form.name.trim(), owner: 'You', value: Number(form.value) || 1000, stage: 'New' }, ...leads])
    setForm({ name: '', value: '' })
  }
  const open = leads.filter((l) => l.stage !== 'Won').reduce((n, l) => n + l.value, 0)
  const won = leads.filter((l) => l.stage === 'Won').reduce((n, l) => n + l.value, 0)

  return (
    <DemoShell demo={demo} wide>
      <div className="cr">
        <div className="cr-top">
          <div className="cr-stats">
            <div className="db-kpi"><span>Open pipeline</span><strong>{usd(open)}</strong></div>
            <div className="db-kpi"><span>Won</span><strong>{usd(won)}</strong></div>
            <div className="db-kpi"><span>Leads</span><strong>{leads.length}</strong></div>
          </div>
          <div className="cr-tools">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads" aria-label="Search leads" />
            <form onSubmit={add} className="cr-add">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="New lead name" aria-label="New lead name" />
              <input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value.replace(/\D/g, '') })} placeholder="Value $" inputMode="numeric" aria-label="Deal value" />
              <button type="submit" className="dm-btn">Add</button>
            </form>
          </div>
        </div>
        <p className="nx-fine">Drag cards between columns, or use the arrow buttons on a phone.</p>
        <div className="cr-board">
          {stages.map((s) => {
            const col = shown.filter((l) => l.stage === s)
            return (
              <section key={s} className={`cr-col${over === s ? ' is-over' : ''}`} onDragOver={(e) => { e.preventDefault(); setOver(s) }} onDragLeave={() => setOver(null)} onDrop={() => drop(s)}>
                <header><strong>{s}</strong><span>{col.length} · {usd(col.reduce((n, l) => n + l.value, 0))}</span></header>
                {col.map((l) => (
                  <article key={l.id} className="cr-card" draggable onDragStart={() => setDrag(l.id)} onDragEnd={() => { setDrag(null); setOver(null) }}>
                    <strong>{l.name}</strong>
                    <div><b>{usd(l.value)}</b><span className="cr-av">{l.owner}</span></div>
                    <div className="cr-mv">
                      <button type="button" onClick={() => move(l.id, -1)} disabled={s === stages[0]} aria-label={`Move ${l.name} back`}>←</button>
                      <button type="button" onClick={() => move(l.id, 1)} disabled={s === stages[3]} aria-label={`Move ${l.name} forward`}>→</button>
                    </div>
                  </article>
                ))}
                {col.length === 0 && <p className="cr-empty">No leads</p>}
              </section>
            )
          })}
        </div>
      </div>
    </DemoShell>
  )
}
