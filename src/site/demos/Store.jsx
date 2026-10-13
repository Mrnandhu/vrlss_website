import { useMemo, useState } from 'react'
import DemoShell from './DemoShell'
import { demos } from './demoData'
import { useCurrency } from '../currency'
import { formatPrice } from '../prices'
import { IconSearch, IconClose, IconCheck } from '../icons'

const demo = demos.find((d) => d.slug === 'online-store')

const products = [
  { id: 1, name: 'Stoneware mug', cat: 'Kitchen', price: 18, rating: 4.8, shape: 'mug', c: ['#f5b544', '#f08a4b'] },
  { id: 2, name: 'Arc table lamp', cat: 'Lighting', price: 64, rating: 4.9, shape: 'arch', c: ['#2b50e6', '#6c8cff'] },
  { id: 3, name: 'Linen throw', cat: 'Textiles', price: 42, rating: 4.7, shape: 'wave', c: ['#0fa58c', '#6fd9c3'] },
  { id: 4, name: 'Oak serving board', cat: 'Kitchen', price: 36, rating: 4.6, shape: 'board', c: ['#c4811a', '#f1c27a'] },
  { id: 5, name: 'Ceramic vase', cat: 'Decor', price: 29, rating: 4.8, shape: 'vase', c: ['#a3365f', '#e1688f'] },
  { id: 6, name: 'Woven basket', cat: 'Decor', price: 33, rating: 4.5, shape: 'basket', c: ['#6b5bd2', '#a79bff'] },
  { id: 7, name: 'Glass pendant light', cat: 'Lighting', price: 89, rating: 4.9, shape: 'orb', c: ['#1d3a52', '#4f7a9a'] },
  { id: 8, name: 'Cotton cushion set', cat: 'Textiles', price: 48, rating: 4.7, shape: 'cushion', c: ['#e0735a', '#f7b39f'] },
]
const cats = ['All', ...Array.from(new Set(products.map((p) => p.cat)))]
const FREE = 100

function Art({ p }) {
  const [a, b] = p.c
  return (
    <div className="st-art" style={{ background: `linear-gradient(145deg, ${a}, ${b})` }} aria-hidden="true">
      <svg viewBox="0 0 120 120">
        {p.shape === 'mug' && (<><rect x="34" y="40" width="46" height="46" rx="10" fill="#fff" opacity=".92"/><path d="M80 52h8a8 8 0 010 22h-8" fill="none" stroke="#fff" strokeWidth="6" opacity=".92"/></>)}
        {p.shape === 'arch' && (<><path d="M36 92V58a24 24 0 0148 0v34z" fill="#fff" opacity=".92"/><rect x="30" y="92" width="60" height="6" rx="3" fill="#fff"/></>)}
        {p.shape === 'wave' && (<path d="M20 50c14-14 26 14 40 0s26 14 40 0v40H20z" fill="#fff" opacity=".92"/>)}
        {p.shape === 'board' && (<><rect x="26" y="46" width="68" height="34" rx="17" fill="#fff" opacity=".92"/><circle cx="82" cy="63" r="4" fill={a}/></>)}
        {p.shape === 'vase' && (<path d="M48 28h24v16c14 10 18 24 10 46H38c-8-22-4-36 10-46z" fill="#fff" opacity=".92"/>)}
        {p.shape === 'basket' && (<><path d="M28 56h64l-8 36H36z" fill="#fff" opacity=".92"/><path d="M40 56a20 20 0 0140 0" fill="none" stroke="#fff" strokeWidth="6"/></>)}
        {p.shape === 'orb' && (<><circle cx="60" cy="68" r="26" fill="#fff" opacity=".92"/><rect x="58" y="20" width="4" height="22" fill="#fff"/></>)}
        {p.shape === 'cushion' && (<rect x="28" y="38" width="64" height="48" rx="16" fill="#fff" opacity=".92"/>)}
      </svg>
    </div>
  )
}

export default function Store() {
  const { code } = useCurrency()
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState({})
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)

  const list = useMemo(() => {
    let l = products.filter((p) => (cat === 'All' || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase()))
    if (sort === 'low') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'high') l = [...l].sort((a, b) => b.price - a.price)
    if (sort === 'rating') l = [...l].sort((a, b) => b.rating - a.rating)
    return l
  }, [cat, q, sort])

  const items = products.filter((p) => cart[p.id])
  const count = items.reduce((n, p) => n + cart[p.id], 0)
  const subtotal = items.reduce((n, p) => n + cart[p.id] * p.price, 0)
  const shipping = subtotal === 0 || subtotal >= FREE ? 0 : 6
  const money = (n) => formatPrice(n, code)
  const add = (id) => { setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 })); setOpen(true) }
  const setQty = (id, d) =>
    setCart((c) => {
      const n = (c[id] || 0) + d
      const nc = { ...c }
      if (n <= 0) delete nc[id]
      else nc[id] = n
      return nc
    })

  return (
    <DemoShell demo={demo}>
      <div className="st">
        <header className="st-top">
          <strong className="st-logo">Hearth &amp; Co</strong>
          <label className="st-search">
            <IconSearch width={18} height={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" />
          </label>
          <button type="button" className="st-cartbtn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
            Cart <span>{count}</span>
          </button>
        </header>

        <div className="st-bar">
          <div className="st-chips" role="group" aria-label="Categories">
            {cats.map((c) => (
              <button key={c} type="button" className={c === cat ? 'is-on' : ''} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <label className="st-sort">
            <span className="nx-sr">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        {list.length === 0 ? (
          <p className="dm-empty">No products match “{q}”. Try another search.</p>
        ) : (
          <div className="st-grid">
            {list.map((p) => (
              <article key={p.id} className="st-card">
                <Art p={p} />
                <div className="st-info">
                  <span className="st-cat">{p.cat}</span>
                  <h3>{p.name}</h3>
                  <p className="st-rate">★ {p.rating}</p>
                  <div className="st-row">
                    <strong>{money(p.price)}</strong>
                    <button type="button" className="dm-btn" onClick={() => add(p.id)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {open && <button type="button" className="st-scrim" aria-label="Close cart" onClick={() => setOpen(false)} />}
        <aside className={`st-drawer${open ? ' is-open' : ''}`} aria-hidden={!open} aria-label="Shopping cart">
          <div className="st-dh">
            <strong>Your cart ({count})</strong>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close cart"><IconClose width={20} height={20} /></button>
          </div>
          {items.length === 0 ? (
            <p className="dm-empty">Your cart is empty.</p>
          ) : (
            <>
              <div className="st-free">
                <p>{subtotal >= FREE ? 'You have free shipping' : `Add ${money(FREE - subtotal)} more for free shipping`}</p>
                <i><b style={{ width: `${Math.min(100, (subtotal / FREE) * 100)}%` }} /></i>
              </div>
              <ul className="st-lines">
                {items.map((p) => (
                  <li key={p.id}>
                    <span className="st-mini" style={{ background: `linear-gradient(145deg, ${p.c[0]}, ${p.c[1]})` }} />
                    <div>
                      <strong>{p.name}</strong>
                      <span>{money(p.price)}</span>
                    </div>
                    <div className="st-qty">
                      <button type="button" onClick={() => setQty(p.id, -1)} aria-label={`Remove one ${p.name}`}>−</button>
                      <span>{cart[p.id]}</span>
                      <button type="button" onClick={() => setQty(p.id, 1)} aria-label={`Add one ${p.name}`}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="st-sum">
                <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
                <div><dt>Shipping</dt><dd>{shipping ? money(shipping) : 'Free'}</dd></div>
                <div className="tot"><dt>Total</dt><dd>{money(subtotal + shipping)}</dd></div>
              </dl>
              <button type="button" className="dm-btn dm-btn-lg" onClick={() => { setDone(true); setOpen(false) }}>
                Checkout
              </button>
            </>
          )}
        </aside>

        {done && (
          <div className="dm-modal" role="dialog" aria-modal="true" aria-label="Checkout demo">
            <div className="dm-modal-card">
              <span className="dm-ok"><IconCheck width={28} height={28} /></span>
              <h3>This is where payment happens</h3>
              <p>
                In your real store, this step connects to a payment provider such as Stripe, Razorpay or PayPal, takes
                payment securely and sends order emails. No payment is taken in this demo.
              </p>
              <button type="button" className="dm-btn dm-btn-lg" onClick={() => { setDone(false); setCart({}) }}>
                Close demo checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </DemoShell>
  )
}
