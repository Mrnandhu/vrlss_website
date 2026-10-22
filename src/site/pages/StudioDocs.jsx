// Private document studio: quotes, invoices, receipts and contracts, with a payment tracker.
// Everything is saved only in this browser (localStorage). Use "Back up" to keep a copy.
// Not linked from the site, hidden from Google (noindex + robots.txt).
import { useEffect, useMemo, useState } from 'react'
import { brand, registration } from '../brand'
import { currencies } from '../prices'
import { estimate, projectTypes } from '../estimates'
import PrintRoot, { unpack, store } from '../components/Print'
import { IconPlus, IconTrash, IconPrint, IconCopy, IconFile, IconCheck } from '../icons'

const TYPES = {
  quote: { name: 'Quote', prefix: 'Q' },
  invoice: { name: 'Invoice', prefix: 'INV' },
  receipt: { name: 'Receipt', prefix: 'RC' },
  contract: { name: 'Contract', prefix: 'AGR' },
}
const K_DOCS = 'vrlss-docs'
const K_SEQ = 'vrlss-docs-seq'
const K_SET = 'vrlss-docs-settings'
const today = () => new Date().toISOString().slice(0, 10)
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10) }
const uid = () => Math.random().toString(36).slice(2, 10)

const defaultSettings = { upi: '', bank: '', account: '', ifsc: '', swift: '', paylink: '', signName: brand.founder, signRole: 'Founder' }

const blank = (type = 'invoice', currency = 'INR') => ({
  id: uid(), type, number: '', date: today(), due: addDays(today(), 7), currency,
  client: { name: '', company: '', address: '', email: '', phone: '', country: '' },
  project: '', items: [{ desc: '', qty: 1, rate: 0 }], discountPct: 0, taxPct: 0, advancePct: 50,
  payments: [], notes: '', timeline: '2–3 weeks', revisions: 3, supportDays: 30, briefRef: '', status: '',
})

const sym = (code) => (currencies.find((c) => c.code === code) || currencies[0]).symbol
const fmt = (n, code) => {
  const v = Math.round((Number(n) || 0) * 100) / 100
  return `${sym(code)}${v.toLocaleString(code === 'INR' ? 'en-IN' : 'en-US', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 })}`
}

export function totals(d) {
  const sub = d.items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.rate) || 0), 0)
  const disc = (sub * (Number(d.discountPct) || 0)) / 100
  const tax = ((sub - disc) * (Number(d.taxPct) || 0)) / 100
  const total = sub - disc + tax
  const paid = d.payments.reduce((s, p) => s + (Number(p.amount) || 0), 0)
  const balance = Math.max(0, total - paid)
  let status = total <= 0 ? 'Draft' : paid <= 0 ? 'Unpaid' : balance > 0.009 ? 'Partly paid' : 'Paid'
  if (d.type === 'quote') status = d.status || 'Sent'
  if (d.type === 'contract') status = d.status || 'Draft'
  if ((d.type === 'invoice') && status !== 'Paid' && d.due && d.due < today() && total > 0) status = 'Overdue'
  return { sub, disc, tax, total, paid, balance, status, advance: Math.round((total * (Number(d.advancePct) || 0)) / 100) }
}

function DocSheet({ d, s }) {
  const t = totals(d)
  const T = TYPES[d.type]
  const c = d.client
  const dt = (x) => (x ? new Date(x).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '')
  const payInfo = [s.upi && `UPI: ${s.upi}`, s.bank && `Bank: ${s.bank}`, s.account && `A/c: ${s.account}`, s.ifsc && `IFSC: ${s.ifsc}`, s.swift && `SWIFT: ${s.swift}`, s.paylink && `Pay online: ${s.paylink}`].filter(Boolean)
  return (
    <article className="doc-sheet">
      <header className="doc-top">
        <img src="/brand/logo-dark.webp" alt={brand.name} width="150" height="41" />
        <div className="doc-meta">
          <b>{T.name}</b>
          <span>{d.number}</span>
          <span>Date: {dt(d.date)}</span>
          {d.type === 'invoice' && <span>Due: {dt(d.due)}</span>}
          {d.type === 'quote' && <span>Valid until: {dt(d.due)}</span>}
        </div>
      </header>
      <div className="doc-parties">
        <div>
          <small>From</small>
          <b>{brand.name}</b>
          <span>{brand.location}</span>
          <span>{brand.email} · Call {brand.phoneDisplay} · WhatsApp {brand.whatsappDisplay}</span>
          {registration.udyam && <span>Udyam: {registration.udyam}</span>}
          {registration.gstin && <span>GSTIN: {registration.gstin}</span>}
        </div>
        <div>
          <small>{d.type === 'contract' ? 'Client' : 'Bill to'}</small>
          <b>{c.company || c.name || 'Client name'}</b>
          {c.company && c.name && <span>{c.name}</span>}
          {c.address && <span>{c.address}</span>}
          {c.country && <span>{c.country}</span>}
          {(c.email || c.phone) && <span>{[c.email, c.phone].filter(Boolean).join(' · ')}</span>}
        </div>
      </div>
      {d.project && <p className="doc-project"><b>Project:</b> {d.project}{d.briefRef ? ` (brief ${d.briefRef})` : ''}</p>}

      {d.type !== 'receipt' && (
        <table className="doc-items">
          <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
          <tbody>
            {d.items.filter((i) => i.desc || Number(i.rate)).map((i, k) => (
              <tr key={k}><td>{i.desc}</td><td>{i.qty}</td><td>{fmt(i.rate, d.currency)}</td><td>{fmt((Number(i.qty) || 0) * (Number(i.rate) || 0), d.currency)}</td></tr>
            ))}
          </tbody>
          <tfoot>
            <tr><td colSpan="3">Subtotal</td><td>{fmt(t.sub, d.currency)}</td></tr>
            {t.disc > 0 && <tr><td colSpan="3">Discount ({d.discountPct}%)</td><td>−{fmt(t.disc, d.currency)}</td></tr>}
            {t.tax > 0 && <tr><td colSpan="3">Tax ({d.taxPct}%)</td><td>{fmt(t.tax, d.currency)}</td></tr>}
            <tr className="is-total"><td colSpan="3">Total ({d.currency})</td><td>{fmt(t.total, d.currency)}</td></tr>
            {d.type === 'invoice' && t.paid > 0 && <tr><td colSpan="3">Paid</td><td>−{fmt(t.paid, d.currency)}</td></tr>}
            {d.type === 'invoice' && <tr className="is-total"><td colSpan="3">Balance due</td><td>{fmt(t.balance, d.currency)}</td></tr>}
          </tfoot>
        </table>
      )}

      {d.type === 'receipt' && (
        <div className="doc-receipt">
          <p>Received with thanks from <b>{c.company || c.name || 'the client'}</b>:</p>
          <table className="doc-items">
            <thead><tr><th>Date</th><th>Method</th><th>Note</th><th>Amount</th></tr></thead>
            <tbody>{d.payments.map((p, k) => <tr key={k}><td>{dt(p.date)}</td><td>{p.method}</td><td>{p.note}</td><td>{fmt(p.amount, d.currency)}</td></tr>)}</tbody>
            <tfoot>
              <tr className="is-total"><td colSpan="3">Total received</td><td>{fmt(t.paid, d.currency)}</td></tr>
              {t.total > 0 && <tr><td colSpan="3">Project total</td><td>{fmt(t.total, d.currency)}</td></tr>}
              {t.total > 0 && <tr><td colSpan="3">Balance remaining</td><td>{fmt(t.balance, d.currency)}</td></tr>}
            </tfoot>
          </table>
        </div>
      )}

      {d.type === 'invoice' && <p className={`doc-status st-${t.status.toLowerCase().replace(' ', '-')}`}>Status: {t.status}</p>}

      {d.type === 'quote' && (
        <ul className="doc-list">
          <li>Payment: {d.advancePct}% ({fmt(t.advance, d.currency)}) to start, the rest before launch.</li>
          <li>Estimated delivery: {d.timeline} from receiving the advance and your content.</li>
          <li>Includes {d.revisions} rounds of revisions and {d.supportDays} days of free fixes after launch.</li>
          <li>You own the domain, website and content once paid in full.</li>
        </ul>
      )}

      {d.type === 'contract' && (
        <div className="doc-contract">
          <p>This agreement is between <b>{brand.name}</b> ("we") and <b>{c.company || c.name || 'the client'}</b> ("you") for the project described above.</p>
          <ol>
            <li><b>Scope.</b> We will deliver the items listed above. Anything not listed is extra and will be quoted separately before we start it.</li>
            <li><b>Price and payment.</b> The total is {fmt(t.total, d.currency)}. {d.advancePct}% ({fmt(t.advance, d.currency)}) is paid before work starts and the balance before the site goes live.</li>
            <li><b>Timeline.</b> Estimated delivery is {d.timeline} from the advance payment and receiving your content (text, photos, logo, access). Delays in content move the date.</li>
            <li><b>Revisions.</b> The price includes {d.revisions} rounds of revisions. Further changes are charged at our standard rate.</li>
            <li><b>Your content.</b> You confirm you have the rights to the text, images and logos you give us.</li>
            <li><b>Ownership.</b> Once paid in full, you own the website, its content and the domain. We may show the work in our portfolio unless you ask us not to.</li>
            <li><b>Third-party costs.</b> Domain, hosting, paid plugins, ad budgets and app-store fees are paid by you, at cost.</li>
            <li><b>Support.</b> We fix bugs free for {d.supportDays} days after launch. Ongoing care is available as a monthly plan.</li>
            <li><b>Cancellation.</b> Either side can cancel in writing. Work done until then is payable; refunds follow our refunds policy at {brand.url.replace('https://', '')}/refunds.</li>
            <li><b>Confidentiality.</b> Both sides keep each other's business information private.</li>
          </ol>
          {d.notes && <p><b>Additional terms:</b> {d.notes}</p>}
          <div className="doc-signs">
            <div><span>For {brand.name}</span><i /><b>{s.signName}</b><small>{s.signRole} · Date</small></div>
            <div><span>For the client</span><i /><b>{c.name || 'Name'}</b><small>Signature · Date</small></div>
          </div>
        </div>
      )}

      {d.notes && d.type !== 'contract' && <p className="doc-note">{d.notes}</p>}
      {(d.type === 'invoice' || d.type === 'quote') && payInfo.length > 0 && (
        <div className="doc-pay"><b>How to pay</b>{payInfo.map((p) => <span key={p}>{p}</span>)}</div>
      )}
      <footer className="doc-foot">
        <span>{brand.name} · {brand.url.replace('https://', '')} · {brand.email}</span>
        {!registration.gstin && d.type !== 'contract' && <span>Not registered under GST; no GST charged.</span>}
      </footer>
    </article>
  )
}

export default function StudioDocs() {
  const [docs, setDocs] = useState([])
  const [seq, setSeq] = useState({})
  const [s, setS] = useState(defaultSettings)
  const [d, setD] = useState(blank())
  const [view, setView] = useState('edit')
  const [briefLink, setBriefLink] = useState('')
  const [msg, setMsg] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setDocs(store.get(K_DOCS, []))
    setSeq(store.get(K_SEQ, {}))
    setS({ ...defaultSettings, ...store.get(K_SET, {}) })
    setReady(true)
  }, [])
  useEffect(() => { if (ready) store.set(K_SET, s) }, [s, ready])

  const nextNumber = (type) => {
    const y = new Date().getFullYear()
    const n = (seq[`${type}-${y}`] || 0) + 1
    return { number: `${TYPES[type].prefix}-${y}-${String(n).padStart(3, '0')}`, key: `${type}-${y}`, n }
  }
  const t = useMemo(() => totals(d), [d])
  const upd = (k) => (e) => setD((x) => ({ ...x, [k]: e.target.value }))
  const updC = (k) => (e) => setD((x) => ({ ...x, client: { ...x.client, [k]: e.target.value } }))
  const updItem = (i, k) => (e) => setD((x) => ({ ...x, items: x.items.map((it, j) => (j === i ? { ...it, [k]: e.target.value } : it)) }))
  const updPay = (i, k) => (e) => setD((x) => ({ ...x, payments: x.payments.map((p, j) => (j === i ? { ...p, [k]: e.target.value } : p)) }))

  const save = () => {
    let doc = d
    if (!doc.number) {
      const nn = nextNumber(doc.type)
      const ns = { ...seq, [nn.key]: nn.n }
      setSeq(ns); store.set(K_SEQ, ns)
      doc = { ...doc, number: nn.number }
      setD(doc)
    }
    const list = [doc, ...docs.filter((x) => x.id !== doc.id)]
    setDocs(list); store.set(K_DOCS, list)
    setMsg(`Saved ${doc.number}.`)
    return doc
  }
  const open = (doc) => { setD(doc); setView('edit'); setMsg(''); window.scrollTo({ top: 0 }) }
  const remove = (id) => {
    if (!window.confirm('Delete this document from this browser?')) return
    const list = docs.filter((x) => x.id !== id)
    setDocs(list); store.set(K_DOCS, list)
    if (d.id === id) setD(blank())
  }
  const convert = (type) => {
    const doc = { ...d, id: uid(), type, number: '', date: today(), due: addDays(today(), type === 'quote' ? 14 : 7), status: '', payments: type === 'receipt' ? d.payments : [] }
    setD(doc); setView('edit'); setMsg(`New ${TYPES[type].name.toLowerCase()} made from ${d.number || 'this document'}. Save it to give it a number.`)
  }
  const print = () => { const doc = save(); setTimeout(() => window.print(), 50); return doc }

  const importBrief = () => {
    const m = briefLink.match(/b=([^&\s]+)/)
    const data = m ? unpack(m[1]) : null
    if (!data || !data.b) { setMsg('That link does not contain a brief.'); return }
    const b = data.b
    const code = d.currency
    const est = estimate(b, { abroad: code !== 'INR' })
    const rate = (currencies.find((c) => c.code === code) || currencies[0]).rate
    const amt = (l) => (code === 'INR' ? l.inr : Math.round(l.usd * rate))
    const items = [...est.one.filter((l) => l.usd).map((l) => ({ desc: l.label, qty: 1, rate: amt(l) })), ...est.monthly.map((l) => ({ desc: `${l.label} (first month)`, qty: 1, rate: amt(l) }))]
    setD((x) => ({
      ...x,
      client: { ...x.client, name: b.name || '', company: b.business || '', email: b.email || '', phone: b.phone || '', country: [b.city, b.country].filter(Boolean).join(', ') },
      project: b.types.map((tp) => projectTypes.find((p) => p.id === tp)?.name).filter(Boolean).join(' + '),
      items: items.length ? items : x.items,
      timeline: est.days || x.timeline,
      briefRef: data.r || '',
    }))
    setMsg(`Imported brief ${data.r || ''}. Check the prices before sending.`)
    setBriefLink('')
  }

  const backup = () => {
    const blob = new Blob([JSON.stringify({ docs, seq, settings: s }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `vrlss-documents-${today()}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const restore = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    f.text().then((txt) => {
      try {
        const data = JSON.parse(txt)
        if (Array.isArray(data.docs)) { setDocs(data.docs); store.set(K_DOCS, data.docs) }
        if (data.seq) { setSeq(data.seq); store.set(K_SEQ, data.seq) }
        if (data.settings) setS({ ...defaultSettings, ...data.settings })
        setMsg(`Restored ${data.docs?.length || 0} documents.`)
      } catch { setMsg('That file is not a valid backup.') }
    })
    e.target.value = ''
  }

  const all = docs.map((x) => ({ x, t: totals(x) }))
  const invoices = all.filter(({ x }) => x.type === 'invoice')
  const sumBy = (fn) => {
    const m = {}
    invoices.forEach(({ x, t: tt }) => { m[x.currency] = (m[x.currency] || 0) + fn(tt) })
    return Object.entries(m).map(([c, v]) => fmt(v, c)).join(' + ') || fmt(0, 'INR')
  }

  return (
    <div className="ds">
      <section className="ds-top">
        <div className="nx-wrap">
          <p className="ds-tag">Private · {brand.name} team only</p>
          <h1 className="ds-h1">Document studio</h1>
          <p className="ds-lead">Quotes, invoices, receipts and contracts, with payment status. Saved only in this browser. Back up regularly.</p>
          <div className="ds-tabs" role="tablist">
            {[['edit', 'Create / edit'], ['list', `Documents (${docs.length})`], ['settings', 'Payment details']].map(([k, l]) => (
              <button key={k} type="button" role="tab" aria-selected={view === k} className={view === k ? 'is-on' : ''} onClick={() => setView(k)}>{l}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="ds-body">
        <div className="nx-wrap">
          {view === 'list' && (
            <div className="ds-card">
              <div className="ds-kpis">
                <div><span>Invoiced</span><b>{sumBy((tt) => tt.total)}</b></div>
                <div><span>Received</span><b>{sumBy((tt) => tt.paid)}</b></div>
                <div><span>Outstanding</span><b>{sumBy((tt) => tt.balance)}</b></div>
                <div><span>Overdue invoices</span><b>{invoices.filter(({ t: tt }) => tt.status === 'Overdue').length}</b></div>
              </div>
              {docs.length === 0 ? <p className="ds-empty">No documents yet. Create one and press Save.</p> : (
                <div className="ds-table-wrap">
                  <table className="ds-table">
                    <thead><tr><th>Number</th><th>Client</th><th>Date</th><th>Total</th><th>Paid</th><th>Status</th><th /></tr></thead>
                    <tbody>
                      {all.map(({ x, t: tt }) => (
                        <tr key={x.id}>
                          <td><button type="button" className="ds-link" onClick={() => open(x)}>{x.number}</button></td>
                          <td>{x.client.company || x.client.name || '—'}</td>
                          <td>{x.date}</td>
                          <td>{fmt(tt.total, x.currency)}</td>
                          <td>{x.type === 'quote' || x.type === 'contract' ? '—' : fmt(tt.paid, x.currency)}</td>
                          <td><span className={`ds-badge st-${tt.status.toLowerCase().replace(' ', '-')}`}>{tt.status}</span></td>
                          <td><button type="button" className="ds-icon" aria-label={`Delete ${x.number}`} onClick={() => remove(x.id)}><IconTrash width={16} height={16} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="ds-row">
                <button type="button" className="nx-btn nx-btn-outline nx-btn-sm" onClick={backup}><span>Back up (download)</span></button>
                <label className="nx-btn nx-btn-outline nx-btn-sm ds-file"><span>Restore backup</span><input type="file" accept="application/json" onChange={restore} /></label>
              </div>
            </div>
          )}

          {view === 'settings' && (
            <div className="ds-card ds-form">
              <h2>Payment details shown on quotes and invoices</h2>
              <div className="ds-grid2">
                {[['upi', 'UPI ID'], ['bank', 'Bank name'], ['account', 'Account number'], ['ifsc', 'IFSC'], ['swift', 'SWIFT (for clients abroad)'], ['paylink', 'Online payment link (Razorpay, PayPal, Wise)'], ['signName', 'Signatory name'], ['signRole', 'Signatory role']].map(([k, l]) => (
                  <label key={k}><span>{l}</span><input value={s[k]} onChange={(e) => setS((x) => ({ ...x, [k]: e.target.value }))} /></label>
                ))}
              </div>
              <p className="ds-fine">Saved in this browser only. Never put passwords or card numbers here.</p>
            </div>
          )}

          {view === 'edit' && (
            <div className="ds-split">
              <div className="ds-card ds-form">
                <div className="ds-typebar" role="radiogroup" aria-label="Document type">
                  {Object.entries(TYPES).map(([k, v]) => (
                    <button key={k} type="button" role="radio" aria-checked={d.type === k} className={d.type === k ? 'is-on' : ''} onClick={() => setD((x) => ({ ...x, type: k, number: x.type === k ? x.number : '' }))}>{v.name}</button>
                  ))}
                </div>

                <div className="ds-import">
                  <input value={briefLink} onChange={(e) => setBriefLink(e.target.value)} placeholder="Paste a client's brief link to fill this in" />
                  <button type="button" className="nx-btn nx-btn-outline nx-btn-sm" onClick={importBrief}><span>Import</span></button>
                </div>

                <div className="ds-grid3">
                  <label><span>Number</span><input value={d.number} placeholder="Auto on save" onChange={upd('number')} /></label>
                  <label><span>Date</span><input type="date" value={d.date} onChange={upd('date')} /></label>
                  {(d.type === 'invoice' || d.type === 'quote') && <label><span>{d.type === 'quote' ? 'Valid until' : 'Due date'}</span><input type="date" value={d.due} onChange={upd('due')} /></label>}
                  <label><span>Currency</span>
                    <select value={d.currency} onChange={upd('currency')}>{currencies.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}</select>
                  </label>
                  {(d.type === 'quote' || d.type === 'contract') && (
                    <label><span>Status</span>
                      <select value={d.status} onChange={upd('status')}>
                        {(d.type === 'quote' ? ['Sent', 'Accepted', 'Declined', 'Expired'] : ['Draft', 'Sent', 'Signed']).map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </label>
                  )}
                </div>

                <h3>Client</h3>
                <div className="ds-grid2">
                  {[['name', 'Contact name'], ['company', 'Business name'], ['email', 'Email'], ['phone', 'Phone'], ['country', 'City, country'], ['address', 'Address']].map(([k, l]) => (
                    <label key={k}><span>{l}</span><input value={d.client[k]} onChange={updC(k)} /></label>
                  ))}
                </div>
                <label><span>Project</span><input value={d.project} onChange={upd('project')} placeholder="e.g. Business website, 8 pages" /></label>

                {d.type !== 'receipt' && (
                  <>
                    <h3>Items</h3>
                    <div className="ds-items">
                      {d.items.map((it, i) => (
                        <div className="ds-item" key={i}>
                          <input aria-label="Description" value={it.desc} onChange={updItem(i, 'desc')} placeholder="Description" />
                          <input aria-label="Quantity" type="number" min="0" value={it.qty} onChange={updItem(i, 'qty')} />
                          <input aria-label="Rate" type="number" min="0" value={it.rate} onChange={updItem(i, 'rate')} />
                          <b>{fmt((Number(it.qty) || 0) * (Number(it.rate) || 0), d.currency)}</b>
                          <button type="button" className="ds-icon" aria-label="Remove item" onClick={() => setD((x) => ({ ...x, items: x.items.filter((_, j) => j !== i) }))}><IconTrash width={16} height={16} /></button>
                        </div>
                      ))}
                      <button type="button" className="ds-add" onClick={() => setD((x) => ({ ...x, items: [...x.items, { desc: '', qty: 1, rate: 0 }] }))}><IconPlus width={16} height={16} /> Add item</button>
                    </div>
                    <div className="ds-grid3">
                      <label><span>Discount %</span><input type="number" min="0" max="100" value={d.discountPct} onChange={upd('discountPct')} /></label>
                      <label><span>Advance %</span><input type="number" min="0" max="100" value={d.advancePct} onChange={upd('advancePct')} /></label>
                      <label><span>Tax % {registration.gstin ? '' : '(only once GST registered)'}</span><input type="number" min="0" max="40" value={d.taxPct} onChange={upd('taxPct')} disabled={!registration.gstin} /></label>
                    </div>
                  </>
                )}

                {(d.type === 'quote' || d.type === 'contract') && (
                  <div className="ds-grid3">
                    <label><span>Timeline</span><input value={d.timeline} onChange={upd('timeline')} /></label>
                    <label><span>Revision rounds</span><input type="number" min="0" value={d.revisions} onChange={upd('revisions')} /></label>
                    <label><span>Free support (days)</span><input type="number" min="0" value={d.supportDays} onChange={upd('supportDays')} /></label>
                  </div>
                )}

                {(d.type === 'invoice' || d.type === 'receipt') && (
                  <>
                    <h3>Payments received</h3>
                    <div className="ds-items">
                      {d.payments.map((p, i) => (
                        <div className="ds-item ds-pay" key={i}>
                          <input aria-label="Payment date" type="date" value={p.date} onChange={updPay(i, 'date')} />
                          <select aria-label="Method" value={p.method} onChange={updPay(i, 'method')}>{['UPI', 'Bank transfer', 'Cash', 'Card / online', 'PayPal', 'Wise'].map((m) => <option key={m}>{m}</option>)}</select>
                          <input aria-label="Amount" type="number" min="0" value={p.amount} onChange={updPay(i, 'amount')} />
                          <input aria-label="Note" value={p.note} onChange={updPay(i, 'note')} placeholder="Note, e.g. 50% advance" />
                          <button type="button" className="ds-icon" aria-label="Remove payment" onClick={() => setD((x) => ({ ...x, payments: x.payments.filter((_, j) => j !== i) }))}><IconTrash width={16} height={16} /></button>
                        </div>
                      ))}
                      <button type="button" className="ds-add" onClick={() => setD((x) => ({ ...x, payments: [...x.payments, { date: today(), method: 'UPI', amount: Math.round(t.balance), note: '' }] }))}><IconPlus width={16} height={16} /> Add payment</button>
                    </div>
                  </>
                )}

                <label><span>{d.type === 'contract' ? 'Additional terms' : 'Notes'}</span><textarea rows="3" value={d.notes} onChange={upd('notes')} /></label>

                <div className="ds-sum">
                  <span>Total <b>{fmt(t.total, d.currency)}</b></span>
                  {(d.type === 'invoice' || d.type === 'receipt') && <span>Paid <b>{fmt(t.paid, d.currency)}</b></span>}
                  {(d.type === 'invoice' || d.type === 'receipt') && <span>Balance <b>{fmt(t.balance, d.currency)}</b></span>}
                  <span className={`ds-badge st-${t.status.toLowerCase().replace(' ', '-')}`}>{t.status}</span>
                </div>

                <div className="ds-row">
                  <button type="button" className="nx-btn nx-btn-primary" onClick={save}><IconCheck width={18} height={18} /><span>Save</span></button>
                  <button type="button" className="nx-btn nx-btn-outline" onClick={print}><IconPrint width={18} height={18} /><span>Save as PDF</span></button>
                  <button type="button" className="nx-btn nx-btn-outline" onClick={() => { setD(blank(d.type, d.currency)); setMsg('') }}><IconFile width={18} height={18} /><span>New</span></button>
                </div>
                <div className="ds-row ds-convert">
                  <span>Make from this:</span>
                  {Object.entries(TYPES).filter(([k]) => k !== d.type).map(([k, v]) => (
                    <button key={k} type="button" className="ds-chip" onClick={() => convert(k)}><IconCopy width={14} height={14} /> {v.name}</button>
                  ))}
                </div>
                <p className="ds-msg" role="status">{msg}</p>
              </div>

              <div className="ds-preview" aria-label="Preview">
                <div className="pl-paper"><DocSheet d={d} s={s} /></div>
                <p className="ds-fine">Preview. "Save as PDF" opens the print dialog: choose "Save as PDF" as the printer. The contract is a plain-language template, so have a lawyer review it once.</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <PrintRoot><DocSheet d={d} s={s} /></PrintRoot>
    </div>
  )
}
