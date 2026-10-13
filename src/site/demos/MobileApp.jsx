import { useEffect, useState } from 'react'
import DemoShell from './DemoShell'
import { demos } from './demoData'

const demo = demos.find((d) => d.slug === 'mobile-app')

const menu = [
  { id: 1, name: 'Flat white', price: 3.8, c: ['#c4811a', '#f1c27a'] },
  { id: 2, name: 'Cold brew', price: 4.2, c: ['#1d3a52', '#4f7a9a'] },
  { id: 3, name: 'Matcha latte', price: 4.6, c: ['#0a7a68', '#6fd9c3'] },
  { id: 4, name: 'Butter croissant', price: 3.2, c: ['#e0735a', '#f7b39f'] },
  { id: 5, name: 'Iced mocha', price: 4.9, c: ['#6b5bd2', '#a79bff'] },
]
const steps = ['Received', 'Preparing', 'Ready']

export default function MobileApp() {
  const [tab, setTab] = useState('menu')
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState(null) // step index
  const [points, setPoints] = useState(120)

  useEffect(() => {
    if (order === null || order >= 2) return
    const t = setTimeout(() => setOrder((o) => o + 1), 2200)
    return () => clearTimeout(t)
  }, [order])

  const lines = menu.filter((m) => cart[m.id])
  const total = lines.reduce((n, m) => n + m.price * cart[m.id], 0)
  const count = lines.reduce((n, m) => n + cart[m.id], 0)
  const place = () => { setOrder(0); setPoints((p) => p + Math.round(total * 10)); setCart({}); setTab('orders') }

  return (
    <DemoShell demo={demo}>
      <div className="ma">
        <div className="ma-phone" role="group" aria-label="Interactive mobile app demo">
          <div className="ma-notch" aria-hidden="true" />
          <div className="ma-screen">
            <header className="ma-bar">
              <strong>Brewly</strong>
              <span>{points} pts</span>
            </header>
            <div className="ma-body">
              {tab === 'menu' && (
                <ul className="ma-list">
                  {menu.map((m) => (
                    <li key={m.id}>
                      <span className="ma-pic" style={{ background: `linear-gradient(145deg, ${m.c[0]}, ${m.c[1]})` }} />
                      <div><strong>{m.name}</strong><span>${m.price.toFixed(2)}</span></div>
                      <button type="button" onClick={() => setCart((c) => ({ ...c, [m.id]: (c[m.id] || 0) + 1 }))} aria-label={`Add ${m.name}`}>+</button>
                    </li>
                  ))}
                </ul>
              )}
              {tab === 'cart' && (
                <div className="ma-cart">
                  {lines.length === 0 ? <p className="dm-empty">Your basket is empty.</p> : (
                    <>
                      <ul className="ma-list">
                        {lines.map((m) => (
                          <li key={m.id}>
                            <span className="ma-pic" style={{ background: `linear-gradient(145deg, ${m.c[0]}, ${m.c[1]})` }} />
                            <div><strong>{m.name}</strong><span>{cart[m.id]} × ${m.price.toFixed(2)}</span></div>
                            <button type="button" onClick={() => setCart((c) => { const n = { ...c }; if (n[m.id] > 1) n[m.id]--; else delete n[m.id]; return n })} aria-label={`Remove ${m.name}`}>−</button>
                          </li>
                        ))}
                      </ul>
                      <button type="button" className="ma-cta" onClick={place}>Order · ${total.toFixed(2)}</button>
                    </>
                  )}
                </div>
              )}
              {tab === 'orders' && (
                <div className="ma-orders">
                  {order === null ? <p className="dm-empty">No active orders. Add something from the menu.</p> : (
                    <>
                      <h3>{order >= 2 ? 'Your order is ready' : 'Your order is on its way'}</h3>
                      <ol className="ma-track">
                        {steps.map((s, i) => <li key={s} className={i <= order ? 'on' : ''}><b />{s}</li>)}
                      </ol>
                      <p className="nx-fine">In the real app, customers get a push notification at each step.</p>
                      {order >= 2 && <button type="button" className="ma-cta" onClick={() => { setOrder(null); setTab('menu') }}>Collected</button>}
                    </>
                  )}
                </div>
              )}
              {tab === 'rewards' && (
                <div className="ma-rewards">
                  <div className="ma-card"><span>Your points</span><strong>{points}</strong><i><b style={{ width: `${Math.min(100, (points / 500) * 100)}%` }} /></i><em>{Math.max(0, 500 - points)} to your free coffee</em></div>
                </div>
              )}
            </div>
            <nav className="ma-nav" aria-label="App tabs">
              {[['menu', 'Menu'], ['cart', `Basket${count ? ` (${count})` : ''}`], ['orders', 'Orders'], ['rewards', 'Rewards']].map(([k, l]) => (
                <button type="button" key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
              ))}
            </nav>
          </div>
        </div>
        <div className="ma-side">
          <h2 className="nx-h3">What a custom app can do</h2>
          <ul className="nx-ticks">
            {['Runs on iPhone and Android from one codebase', 'Push notifications for orders, offers and reminders', 'Loyalty points, accounts and saved payment methods', 'Connects to your till, stock or booking system', 'Published on the App Store and Google Play'].map((t) => (
              <li key={t}><span>{t}</span></li>
            ))}
          </ul>
          <p className="nx-fine">Tap through the phone: add items, place an order and watch the status update.</p>
        </div>
      </div>
    </DemoShell>
  )
}
