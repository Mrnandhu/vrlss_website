import { useState } from 'react'
import DemoShell from './DemoShell'
import { demos } from './demoData'
import { IconCheck } from '../icons'

const demo = demos.find((d) => d.slug === 'customer-portal')

const stages = ['Brief', 'Design', 'Build', 'Review', 'Launch']
const invoicesInit = [
  { id: 'INV-1042', item: 'Deposit (50%)', amount: 450, due: 'Paid on 3 Sep', status: 'Paid' },
  { id: 'INV-1051', item: 'Design milestone', amount: 300, due: 'Due 20 Oct', status: 'Due' },
  { id: 'INV-1060', item: 'Final payment', amount: 150, due: 'Due 15 Nov', status: 'Upcoming' },
]
const ticketsInit = [{ id: 1, subject: 'Can we change the header colour?', state: 'Answered', when: '2 days ago' }]

export default function Portal() {
  const [auth, setAuth] = useState(false)
  const [tab, setTab] = useState('overview')
  const [inv, setInv] = useState(invoicesInit)
  const [pay, setPay] = useState(null)
  const [tickets, setTickets] = useState(ticketsInit)
  const [subject, setSubject] = useState('')

  if (!auth)
    return (
      <DemoShell demo={demo}>
        <div className="pt-login">
          <h2 className="nx-h3">Harbor Services client portal</h2>
          <p className="nx-fine">Secure sign-in for customers. In a real portal this uses email links or passwords with encryption.</p>
          <label><span>Email</span><input defaultValue="alex@example.com" /></label>
          <label><span>Password</span><input type="password" defaultValue="demo-password" /></label>
          <button type="button" className="dm-btn dm-btn-lg" onClick={() => setAuth(true)}>Sign in as demo customer</button>
        </div>
      </DemoShell>
    )

  const stage = 2
  const due = inv.filter((i) => i.status === 'Due').reduce((n, i) => n + i.amount, 0)
  const tabs = [['overview', 'Overview'], ['invoices', 'Invoices'], ['support', 'Support']]

  return (
    <DemoShell demo={demo}>
      <div className="pt">
        <header className="pt-head">
          <div><strong>Welcome back, Alex</strong><span className="nx-fine">Harbor Services · Customer portal</span></div>
          <button type="button" className="dm-btn dm-btn-ghost" onClick={() => setAuth(false)}>Sign out</button>
        </header>
        <div className="pt-tabs" role="tablist">
          {tabs.map(([k, l]) => (
            <button type="button" role="tab" aria-selected={tab === k} key={k} className={tab === k ? 'is-on' : ''} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="pt-pane">
            <section className="db-card">
              <h3>Website redesign · in progress</h3>
              <ol className="pt-steps">
                {stages.map((s, i) => (
                  <li key={s} className={i < stage ? 'done' : i === stage ? 'now' : ''}>
                    <b>{i < stage ? <IconCheck width={16} height={16} /> : i + 1}</b>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="nx-fine">Next milestone: build review on 24 Oct</p>
            </section>
            <div className="db-kpis pt-kpis">
              <div className="db-kpi"><span>Amount due</span><strong>${due}</strong></div>
              <div className="db-kpi"><span>Open tickets</span><strong>{tickets.filter((t) => t.state === 'Open').length}</strong></div>
              <div className="db-kpi"><span>Files shared</span><strong>12</strong></div>
            </div>
          </div>
        )}

        {tab === 'invoices' && (
          <div className="pt-pane">
            <section className="db-card">
              <h3>Invoices</h3>
              <ul className="pt-list">
                {inv.map((i) => (
                  <li key={i.id}>
                    <div><strong>{i.item}</strong><span>{i.id} · {i.due}</span></div>
                    <b>${i.amount}</b>
                    <span className={`db-pill s-${i.status === 'Paid' ? 'Paid' : i.status === 'Due' ? 'Pending' : 'Refunded'}`}>{i.status}</span>
                    {i.status === 'Due' ? <button type="button" className="dm-btn" onClick={() => setPay(i)}>Pay now</button> : <span className="pt-na" />}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {tab === 'support' && (
          <div className="pt-pane">
            <section className="db-card">
              <h3>Contact support</h3>
              <form className="pt-form" onSubmit={(e) => { e.preventDefault(); if (!subject.trim()) return; setTickets([{ id: Date.now(), subject, state: 'Open', when: 'Just now' }, ...tickets]); setSubject('') }}>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="How can we help?" aria-label="Ticket subject" />
                <button type="submit" className="dm-btn">Send</button>
              </form>
              <ul className="pt-list">
                {tickets.map((t) => (
                  <li key={t.id}><div><strong>{t.subject}</strong><span>{t.when}</span></div><span className={`db-pill s-${t.state === 'Open' ? 'Pending' : 'Paid'}`}>{t.state}</span></li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {pay && (
          <div className="dm-modal" role="dialog" aria-modal="true" aria-label="Payment demo">
            <div className="dm-modal-card">
              <h3>Pay {pay.id}: ${pay.amount}</h3>
              <p>In your real portal, customers pay by card or bank transfer through a secure provider. No payment is taken in this demo.</p>
              <button type="button" className="dm-btn dm-btn-lg" onClick={() => { setInv(inv.map((i) => (i.id === pay.id ? { ...i, status: 'Paid', due: 'Paid just now' } : i))); setPay(null) }}>Simulate payment</button>
              <button type="button" className="dm-btn dm-btn-ghost dm-btn-lg" onClick={() => setPay(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </DemoShell>
  )
}
