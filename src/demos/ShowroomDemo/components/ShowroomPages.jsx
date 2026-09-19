import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Clock3,
  Package,
  Search,
  ShoppingBag,
  UserRound,
  Users,
  X,
} from 'lucide-react'

const products = [
  {
    id: 'P-001',
    name: 'Classic Cotton Shirt',
    category: 'Shirts',
    price: '₹1,299',
    stock: 24,
    status: 'In stock',
  },
  {
    id: 'P-002',
    name: 'Relaxed Linen Trouser',
    category: 'Trousers',
    price: '₹1,899',
    stock: 11,
    status: 'Low stock',
  },
  {
    id: 'P-003',
    name: 'Everyday Overshirt',
    category: 'Outerwear',
    price: '₹2,199',
    stock: 31,
    status: 'In stock',
  },
  {
    id: 'P-004',
    name: 'Minimal Polo',
    category: 'T-shirts',
    price: '₹999',
    stock: 7,
    status: 'Low stock',
  },
  {
    id: 'P-005',
    name: 'Essential Chino',
    category: 'Trousers',
    price: '₹1,599',
    stock: 18,
    status: 'In stock',
  },
  {
    id: 'P-006',
    name: 'Textured Resort Shirt',
    category: 'Shirts',
    price: '₹1,749',
    stock: 5,
    status: 'Low stock',
  },
]

const orders = [
  {
    id: '#DEMO-1042',
    customer: 'Demo Customer 01',
    items: 3,
    total: '₹3,450',
    status: 'New',
    time: '12 min ago',
  },
  {
    id: '#DEMO-1041',
    customer: 'Demo Customer 02',
    items: 2,
    total: '₹2,199',
    status: 'Packed',
    time: '28 min ago',
  },
  {
    id: '#DEMO-1040',
    customer: 'Demo Customer 03',
    items: 4,
    total: '₹5,890',
    status: 'Completed',
    time: '43 min ago',
  },
  {
    id: '#DEMO-1039',
    customer: 'Demo Customer 04',
    items: 1,
    total: '₹999',
    status: 'Completed',
    time: '1 hr ago',
  },
]

const customers = [
  {
    id: 'C-001',
    name: 'Demo Customer 01',
    orders: 8,
    spent: '₹18,450',
    status: 'Active',
  },
  {
    id: 'C-002',
    name: 'Demo Customer 02',
    orders: 4,
    spent: '₹7,200',
    status: 'Active',
  },
  {
    id: 'C-003',
    name: 'Demo Customer 03',
    orders: 12,
    spent: '₹26,890',
    status: 'Active',
  },
  {
    id: 'C-004',
    name: 'Demo Customer 04',
    orders: 2,
    spent: '₹3,450',
    status: 'New',
  },
]

function PageHeader({ eyebrow, title, description, onBack }) {
  return (
    <div className="showroom-app-page-header">
      {onBack && (
        <button
          type="button"
          className="showroom-app-back-button"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          Overview
        </button>
      )}

      <span className="showroom-app-section-label">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function DemoBadge() {
  return (
    <span className="showroom-app-demo-small">
      VRLS DEMO / CONCEPT
    </span>
  )
}

function SearchBox({ value, onChange, placeholder = 'Search...' }) {
  return (
    <label className="showroom-app-page-search">
      <Search size={16} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}

function ProductDrawer({ product, onClose }) {
  if (!product) return null

  return (
    <div
      className="showroom-app-drawer-overlay"
      onMouseDown={onClose}
    >
      <aside
        className="showroom-app-drawer"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="showroom-app-drawer-head">
          <div>
            <DemoBadge />
            <h3>{product.name}</h3>
          </div>

          <button
            type="button"
            className="showroom-app-close-button"
            onClick={onClose}
            aria-label="Close product details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="showroom-app-product-preview">
          <Package size={42} />
        </div>

        <div className="showroom-app-detail-list">
          <div>
            <span>Product ID</span>
            <strong>{product.id}</strong>
          </div>
          <div>
            <span>Category</span>
            <strong>{product.category}</strong>
          </div>
          <div>
            <span>Price</span>
            <strong>{product.price}</strong>
          </div>
          <div>
            <span>Current stock</span>
            <strong>{product.stock} units</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{product.status}</strong>
          </div>
        </div>

        <div className="showroom-app-demo-message">
          This product panel is part of the VRLS showroom management
          concept. No real inventory is connected.
        </div>
      </aside>
    </div>
  )
}

export function ProductsPage({ onBack, inventoryMode = false }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (inventoryMode && product.status !== 'Low stock') {
        return false
      }

      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.id.toLowerCase().includes(query.toLowerCase())

      const matchesCategory =
        category === 'All' || product.category === category

      return matchesQuery && matchesCategory
    })
  }, [query, category, inventoryMode])

  return (
    <div className="showroom-app-page">
      <PageHeader
        eyebrow="CATALOGUE"
        title="Products"
        description="Manage the showroom product catalogue and stock overview."
        onBack={onBack}
      />

      <div className="showroom-app-page-toolbar">
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Search products..."
        />

        <div className="showroom-app-filter-row">
          {categories.map((item) => (
            <button
              type="button"
              className={
                category === item
                  ? 'showroom-app-filter-active'
                  : ''
              }
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="showroom-app-page-card">
        <div className="showroom-app-table-title">
          <div>
            <DemoBadge />
            <h3>Product catalogue</h3>
          </div>

          <span>{filtered.length} demo products</span>
        </div>

        <div className="showroom-app-table-wrap">
          <table className="showroom-app-data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <button
                      type="button"
                      className="showroom-app-product-cell"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <span className="showroom-app-table-icon">
                        <Package size={16} />
                      </span>
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.id}</small>
                      </span>
                    </button>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={`showroom-app-status ${
                        product.status === 'Low stock'
                          ? 'showroom-app-status-warning'
                          : 'showroom-app-status-success'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="showroom-app-row-action"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View
                      <ArrowUpRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}

export function OrdersPage({ onBack }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = orders.filter((order) => {
    const matchesQuery =
      order.id.toLowerCase().includes(query.toLowerCase()) ||
      order.customer.toLowerCase().includes(query.toLowerCase())

    const matchesFilter =
      filter === 'All' || order.status === filter

    return matchesQuery && matchesFilter
  })

  return (
    <div className="showroom-app-page">
      <PageHeader
        eyebrow="OPERATIONS"
        title="Orders"
        description="Track demo orders from creation through completion."
        onBack={onBack}
      />

      <div className="showroom-app-page-toolbar">
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Search orders..."
        />

        <div className="showroom-app-filter-row">
          {['All', 'New', 'Packed', 'Completed'].map((item) => (
            <button
              type="button"
              className={
                filter === item
                  ? 'showroom-app-filter-active'
                  : ''
              }
              key={item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="showroom-app-page-card">
        <div className="showroom-app-table-title">
          <div>
            <DemoBadge />
            <h3>Order management</h3>
          </div>
        </div>

        <div className="showroom-app-table-wrap">
          <table className="showroom-app-data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                  </td>
                  <td>{order.customer}</td>
                  <td>{order.items}</td>
                  <td>{order.total}</td>
                  <td>
                    <span className="showroom-app-status showroom-app-status-success">
                      {order.status}
                    </span>
                  </td>
                  <td>{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function CustomersPage({ onBack }) {
  const [query, setQuery] = useState('')

  const filtered = customers.filter((customer) =>
    customer.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="showroom-app-page">
      <PageHeader
        eyebrow="CUSTOMER MANAGEMENT"
        title="Customers"
        description="A simple customer overview for the showroom concept."
        onBack={onBack}
      />

      <div className="showroom-app-page-toolbar">
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Search customers..."
        />
      </div>

      <div className="showroom-app-customer-grid">
        {filtered.map((customer) => (
          <article
            className="showroom-app-customer-card"
            key={customer.id}
          >
            <div className="showroom-app-customer-top">
              <span className="showroom-app-customer-avatar">
                <UserRound size={18} />
              </span>

              <span className="showroom-app-status showroom-app-status-success">
                {customer.status}
              </span>
            </div>

            <h3>{customer.name}</h3>
            <span>{customer.id}</span>

            <div className="showroom-app-customer-stats">
              <div>
                <small>Orders</small>
                <strong>{customer.orders}</strong>
              </div>

              <div>
                <small>Demo spend</small>
                <strong>{customer.spent}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function SalesPage({ onBack }) {
  const [period, setPeriod] = useState('7 Days')

  const bars =
    period === 'Today'
      ? [35, 55, 42, 68, 52, 78]
      : period === '30 Days'
        ? [45, 62, 54, 76, 69, 88, 72]
        : [42, 58, 48, 72, 64, 82, 55]

  return (
    <div className="showroom-app-page">
      <PageHeader
        eyebrow="SALES"
        title="Sales"
        description="Explore the sales analytics interface using demonstration figures."
        onBack={onBack}
      />

      <div className="showroom-app-report-stats">
        <div>
          <span>Revenue</span>
          <strong>₹48,250</strong>
          <small>Demo figure</small>
        </div>
        <div>
          <span>Orders</span>
          <strong>36</strong>
          <small>Demo figure</small>
        </div>
        <div>
          <span>Average order</span>
          <strong>₹1,340</strong>
          <small>Demo figure</small>
        </div>
      </div>

      <div className="showroom-app-page-card">
        <div className="showroom-app-table-title">
          <div>
            <DemoBadge />
            <h3>Sales performance</h3>
          </div>

          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          >
            <option>Today</option>
            <option>7 Days</option>
            <option>30 Days</option>
          </select>
        </div>

        <div className="showroom-app-large-chart">
          {bars.map((height, index) => (
            <div className="showroom-app-large-bar" key={index}>
              <div style={{ height: `${height}%` }} />
              <span>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ReportsPage({ onBack }) {
  const reports = [
    {
      icon: ShoppingBag,
      title: 'Sales report',
      description: 'Revenue and order performance overview.',
    },
    {
      icon: Boxes,
      title: 'Inventory report',
      description: 'Stock movement and low-stock overview.',
    },
    {
      icon: Users,
      title: 'Customer report',
      description: 'Customer activity and purchase summary.',
    },
  ]

  return (
    <div className="showroom-app-page">
      <PageHeader
        eyebrow="ANALYTICS"
        title="Reports"
        description="Report templates designed for a showroom management system."
        onBack={onBack}
      />

      <div className="showroom-app-report-grid">
        {reports.map((report) => {
          const Icon = report.icon

          return (
            <button
              type="button"
              className="showroom-app-report-card"
              key={report.title}
            >
              <span>
                <Icon size={20} />
              </span>

              <strong>{report.title}</strong>
              <p>{report.description}</p>

              <small>
                Open report
                <ArrowUpRight size={13} />
              </small>
            </button>
          )
        })}
      </div>

      <div className="showroom-app-page-card showroom-app-report-note">
        <CheckCircle2 size={18} />
        <p>
          Reports are interface concepts only. No real business data
          or analytics service is connected to this demo.
        </p>
      </div>
    </div>
  )
}

export function SettingsPage({ onBack }) {
  const [notifications, setNotifications] = useState(true)
  const [compact, setCompact] = useState(false)

  return (
    <div className="showroom-app-page">
      <PageHeader
        eyebrow="SYSTEM"
        title="Settings"
        description="Simple configuration controls for the showroom concept."
        onBack={onBack}
      />

      <div className="showroom-app-settings-card">
        <div className="showroom-app-setting-row">
          <div>
            <strong>Demo notifications</strong>
            <p>Show notification indicators in the interface.</p>
          </div>

          <button
            type="button"
            className={`showroom-app-toggle ${
              notifications ? 'showroom-app-toggle-on' : ''
            }`}
            onClick={() => setNotifications((value) => !value)}
            aria-label="Toggle notifications"
          >
            <span />
          </button>
        </div>

        <div className="showroom-app-setting-row">
          <div>
            <strong>Compact tables</strong>
            <p>Use tighter spacing for larger data tables.</p>
          </div>

          <button
            type="button"
            className={`showroom-app-toggle ${
              compact ? 'showroom-app-toggle-on' : ''
            }`}
            onClick={() => setCompact((value) => !value)}
            aria-label="Toggle compact tables"
          >
            <span />
          </button>
        </div>

        <div className="showroom-app-demo-message">
          Settings are local to this browser session and are part of
          the VRLS concept prototype.
        </div>
      </div>
    </div>
  )
}

export function EmptyPage({
  title,
  description,
  onBack,
}) {
  return (
    <div className="showroom-app-page">
      <PageHeader
        eyebrow="SHOWROOM MANAGEMENT"
        title={title}
        description={description}
        onBack={onBack}
      />

      <div className="showroom-app-empty">
        <Clock3 size={28} />
        <h3>Concept screen</h3>
        <p>
          This area is reserved for a future workflow in the VRLS
          showroom management concept.
        </p>
        <DemoBadge />
      </div>
    </div>
  )
}
