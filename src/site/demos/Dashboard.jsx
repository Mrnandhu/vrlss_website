import { useMemo, useRef, useState } from 'react'
import DemoShell from './DemoShell'
import { demos } from './demoData'

const demo = demos.find((d) => d.slug === 'sales-dashboard')

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}
const RANGES = { '7D': 7, '30D': 30, '90D': 90 }
const channels = [['Website', 0.42], ['Marketplace', 0.27], ['Social', 0.18], ['Email', 0.13]]
const names = ['Amelia R.', 'Omar K.', 'Priya S.', 'Lucas M.', 'Fatima A.', 'Daniel W.', 'Sofia L.', 'Hassan J.', 'Mei C.', 'Noah B.', 'Layla T.', 'Arjun P.']
const statuses = ['Paid', 'Pending', 'Refunded']

function build(days) {
  const r = rng(days * 97 + 13)
  const series = Array.from({ length: days }, (_, i) => Math.round(900 + 500 * Math.sin(i / 4) + r() * 600 + i * (days > 30 ? 6 : 12)))
  const revenue = series.reduce((a, b) => a + b, 0)
  const orders = Math.round(revenue / 54)
  const rows = Array.from({ length: 14 }, (_, i) => ({
    id: 10480 + i * 3 + days,
    who: names[(i * 5 + days) % names.length],
    amount: Math.round(20 + r() * 380),
    status: statuses[r() > 0.82 ? 2 : r() > 0.7 ? 1 : 0],
    channel: channels[Math.floor(r() * 4)][0],
  }))
  return { series, revenue, orders, aov: revenue / orders, conv: 2.1 + r() * 1.6, rows }
}

function Area({ data }) {
  const ref = useRef(null)
  const [hi, setHi] = useState(null)
  const W = 600, H = 220, P = 8
  const max = Math.max(...data) * 1.1
  const x = (i) => P + (i / (data.length - 1)) * (W - 2 * P)
  const y = (v) => H - P - (v / max) * (H - 2 * P)
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const move = (e) => {
    const b = ref.current.getBoundingClientRect()
    const rel = (e.clientX - b.left) / b.width
    setHi(Math.max(0, Math.min(data.length - 1, Math.round(rel * (data.length - 1)))))
  }
  return (
    <div className="db-chart">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" onPointerMove={move} onPointerLeave={() => setHi(null)} role="img" aria-label="Revenue over time">
        <defs>
          <linearGradient id="dbg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2b50e6" stopOpacity=".28" /><stop offset="1" stopColor="#2b50e6" stopOpacity="0" /></linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#0f2230" strokeOpacity=".08" />)}
        <path d={`${line} L${x(data.length - 1)} ${H} L${x(0)} ${H}Z`} fill="url(#dbg)" />
        <path d={line} fill="none" stroke="#2b50e6" strokeWidth="2.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {hi !== null && (<><line x1={x(hi)} x2={x(hi)} y1="0" y2={H} stroke="#2b50e6" strokeOpacity=".4" /><circle cx={x(hi)} cy={y(data[hi])} r="5" fill="#fff" stroke="#2b50e6" strokeWidth="3" /></>)}
      </svg>
      {hi !== null && (
        <div className="db-tip" style={{ left: `${(hi / (data.length - 1)) * 100}%` }}>
          <b>${data[hi].toLocaleString('en-US')}</b>
          <span>Day {hi + 1}</span>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [range, setRange] = useState('30D')
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState({ k: 'id', dir: -1 })
  const d = useMemo(() => build(RANGES[range]), [range])
  const prev = useMemo(() => build(RANGES[range] + 1), [range])
  const delta = ((d.revenue - prev.revenue * 0.93) / (prev.revenue * 0.93)) * 100

  const rows = useMemo(() => {
    const l = d.rows.filter((r) => status === 'All' || r.status === status)
    return [...l].sort((a, b) => (a[sort.k] > b[sort.k] ? 1 : -1) * sort.dir)
  }, [d, status, sort])

  const th = (k, label) => (
    <th>
      <button type="button" onClick={() => setSort((s) => ({ k, dir: s.k === k ? -s.dir : 1 }))} aria-label={`Sort by ${label}`}>
        {label} {sort.k === k ? (sort.dir === 1 ? '↑' : '↓') : ''}
      </button>
    </th>
  )

  const exportCsv = () => {
    const csv = ['Order,Customer,Channel,Amount,Status', ...rows.map((r) => `#${r.id},${r.who},${r.channel},${r.amount},${r.status}`)].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'orders.csv'
    a.click()
  }

  const kpis = [
    ['Revenue', `$${d.revenue.toLocaleString('en-US')}`, `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`, delta >= 0],
    ['Orders', d.orders.toLocaleString('en-US'), '+4.2%', true],
    ['Average order', `$${d.aov.toFixed(0)}`, '+1.8%', true],
    ['Conversion', `${d.conv.toFixed(1)}%`, '-0.3%', false],
  ]

  return (
    <DemoShell demo={demo} wide>
      <div className="db">
        <div className="db-top">
          <div>
            <h2 className="nx-h3">Northwind Retail</h2>
            <p className="nx-fine">Sales overview · sample data</p>
          </div>
          <div className="db-range" role="group" aria-label="Date range">
            {Object.keys(RANGES).map((k) => (
              <button type="button" key={k} className={k === range ? 'is-on' : ''} onClick={() => setRange(k)} aria-pressed={k === range}>{k}</button>
            ))}
          </div>
        </div>

        <div className="db-kpis">
          {kpis.map(([l, v, dl, up]) => (
            <div key={l} className="db-kpi">
              <span>{l}</span>
              <strong>{v}</strong>
              <em className={up ? 'up' : 'down'}>{dl} <i>vs last period</i></em>
            </div>
          ))}
        </div>

        <div className="db-grid">
          <section className="db-card">
            <h3>Revenue</h3>
            <Area data={d.series} />
          </section>
          <section className="db-card">
            <h3>Sales by channel</h3>
            <ul className="db-bars">
              {channels.map(([n, s]) => (
                <li key={n}>
                  <span>{n}</span>
                  <i><b style={{ width: `${s * 100 * 2.2}%` }} /></i>
                  <em>${Math.round(d.revenue * s).toLocaleString('en-US')}</em>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="db-card">
          <div className="db-tbl-top">
            <h3>Recent orders</h3>
            <div className="db-tools">
              <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
                {['All', ...statuses].map((s) => <option key={s}>{s}</option>)}
              </select>
              <button type="button" className="dm-btn dm-btn-ghost" onClick={exportCsv}>Export CSV</button>
            </div>
          </div>
          <div className="db-scroll">
            <table>
              <thead><tr>{th('id', 'Order')}{th('who', 'Customer')}{th('channel', 'Channel')}{th('amount', 'Amount')}{th('status', 'Status')}</tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>#{r.id}</td><td>{r.who}</td><td>{r.channel}</td><td>${r.amount}</td>
                    <td><span className={`db-pill s-${r.status}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DemoShell>
  )
}
