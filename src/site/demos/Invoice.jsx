import { useState } from 'react'
import DemoShell from './DemoShell'
import { demos } from './demoData'

const demo = demos.find((d) => d.slug === 'invoice-generator')
const CUR = { USD: '$', EUR: '€', GBP: '£', AED: 'AED ', INR: '₹' }

export default function Invoice() {
  const [cur, setCur] = useState('USD')
  const [from, setFrom] = useState('Your Company Ltd')
  const [to, setTo] = useState('Client Name')
  const [no, setNo] = useState('INV-001')
  const [tax, setTax] = useState(5)
  const [items, setItems] = useState([
    { id: 1, d: 'Website design', q: 1, r: 400 },
    { id: 2, d: 'Monthly marketing', q: 2, r: 150 },
  ])
  const sym = CUR[cur]
  const fmt = (n) => `${sym}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const sub = items.reduce((n, i) => n + i.q * i.r, 0)
  const taxAmt = (sub * tax) / 100
  const upd = (id, k, v) => setItems((l) => l.map((i) => (i.id === id ? { ...i, [k]: k === 'd' ? v : Number(v) || 0 } : i)))

  return (
    <DemoShell demo={demo} wide>
      <div className="iv">
        <div className="iv-form">
          <div className="iv-row2">
            <label><span>From</span><input value={from} onChange={(e) => setFrom(e.target.value)} /></label>
            <label><span>Bill to</span><input value={to} onChange={(e) => setTo(e.target.value)} /></label>
            <label><span>Invoice number</span><input value={no} onChange={(e) => setNo(e.target.value)} /></label>
            <label><span>Currency</span>
              <select value={cur} onChange={(e) => setCur(e.target.value)}>{Object.keys(CUR).map((c) => <option key={c}>{c}</option>)}</select>
            </label>
          </div>
          <h3>Items</h3>
          {items.map((i) => (
            <div className="iv-item" key={i.id}>
              <input value={i.d} onChange={(e) => upd(i.id, 'd', e.target.value)} aria-label="Description" />
              <input type="number" min="0" value={i.q} onChange={(e) => upd(i.id, 'q', e.target.value)} aria-label="Quantity" />
              <input type="number" min="0" value={i.r} onChange={(e) => upd(i.id, 'r', e.target.value)} aria-label="Rate" />
              <button type="button" onClick={() => setItems((l) => l.filter((x) => x.id !== i.id))} aria-label="Remove item">×</button>
            </div>
          ))}
          <div className="iv-actions">
            <button type="button" className="dm-btn dm-btn-ghost" onClick={() => setItems((l) => [...l, { id: Date.now(), d: 'New item', q: 1, r: 100 }])}>Add item</button>
            <label className="iv-tax"><span>Tax %</span><input type="number" min="0" value={tax} onChange={(e) => setTax(Number(e.target.value) || 0)} /></label>
            <button type="button" className="dm-btn" onClick={() => window.print()}>Print / Save as PDF</button>
          </div>
        </div>

        <div className="iv-sheet" id="iv-sheet">
          <header><strong>INVOICE</strong><span>{no}</span></header>
          <div className="iv-parties"><div><small>From</small><b>{from}</b></div><div><small>Bill to</small><b>{to}</b></div></div>
          <table>
            <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
            <tbody>{items.map((i) => <tr key={i.id}><td>{i.d}</td><td>{i.q}</td><td>{fmt(i.r)}</td><td>{fmt(i.q * i.r)}</td></tr>)}</tbody>
          </table>
          <dl>
            <div><dt>Subtotal</dt><dd>{fmt(sub)}</dd></div>
            <div><dt>Tax ({tax}%)</dt><dd>{fmt(taxAmt)}</dd></div>
            <div className="tot"><dt>Total</dt><dd>{fmt(sub + taxAmt)}</dd></div>
          </dl>
        </div>
      </div>
    </DemoShell>
  )
}
