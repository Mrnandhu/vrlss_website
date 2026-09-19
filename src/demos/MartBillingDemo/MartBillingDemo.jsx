import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Check,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Menu,
  Minus,
  Package,
  Plus,
  Receipt,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  UserRound,
  Users,
  X,
} from 'lucide-react'

import './MartBillingDemo.css'

const products = [
  {
    id: 'P001',
    name: 'Classic Rice 5kg',
    category: 'Groceries',
    price: 320,
    stock: 34,
  },
  {
    id: 'P002',
    name: 'Wheat Flour 5kg',
    category: 'Groceries',
    price: 285,
    stock: 22,
  },
  {
    id: 'P003',
    name: 'Cooking Oil 1L',
    category: 'Essentials',
    price: 165,
    stock: 18,
  },
  {
    id: 'P004',
    name: 'Toor Dal 1kg',
    category: 'Groceries',
    price: 148,
    stock: 9,
  },
  {
    id: 'P005',
    name: 'Sugar 1kg',
    category: 'Groceries',
    price: 52,
    stock: 41,
  },
  {
    id: 'P006',
    name: 'Bath Soap',
    category: 'Personal Care',
    price: 78,
    stock: 27,
  },
  {
    id: 'P007',
    name: 'Dish Wash Liquid',
    category: 'Home Care',
    price: 125,
    stock: 6,
  },
  {
    id: 'P008',
    name: 'Tea 250g',
    category: 'Beverages',
    price: 142,
    stock: 16,
  },
  {
    id: 'P009',
    name: 'Biscuits Pack',
    category: 'Snacks',
    price: 45,
    stock: 53,
  },
  {
    id: 'P010',
    name: 'Mineral Water 1L',
    category: 'Beverages',
    price: 25,
    stock: 48,
  },
]

const demoBills = [
  {
    id: '#DEMO-2048',
    customer: 'Walk-in Customer',
    items: 4,
    total: '₹735',
    status: 'Paid',
    time: '8 min ago',
  },
  {
    id: '#DEMO-2047',
    customer: 'Demo Customer 02',
    items: 3,
    total: '₹520',
    status: 'Paid',
    time: '21 min ago',
  },
  {
    id: '#DEMO-2046',
    customer: 'Walk-in Customer',
    items: 6,
    total: '₹1,240',
    status: 'Paid',
    time: '36 min ago',
  },
  {
    id: '#DEMO-2045',
    customer: 'Demo Customer 03',
    items: 2,
    total: '₹310',
    status: 'Paid',
    time: '52 min ago',
  },
]

const customers = [
  {
    id: 'C001',
    name: 'Demo Customer 01',
    phone: 'Demo contact',
    bills: 12,
    spent: '₹8,450',
  },
  {
    id: 'C002',
    name: 'Demo Customer 02',
    phone: 'Demo contact',
    bills: 7,
    spent: '₹5,280',
  },
  {
    id: 'C003',
    name: 'Demo Customer 03',
    phone: 'Demo contact',
    bills: 4,
    spent: '₹3,120',
  },
]

const navigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'billing',
    label: 'New Bill',
    icon: Receipt,
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Boxes,
  },
  {
    id: 'bills',
    label: 'Bills',
    icon: FileText,
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3,
  },
]

const money = (value) =>
  `₹${Math.round(value).toLocaleString('en-IN')}`

function HomeButton() {
  return (
    <a
      href="/"
      className="mart-home-button"
      aria-label="Back to VRLS Solutions home"
    >
      <ArrowLeft size={13} />
      Back to Home
    </a>
  )
}

function Sidebar({
  active,
  onNavigate,
  open,
  onClose,
}) {
  return (
    <aside
      className={`mart-sidebar ${
        open ? 'mart-sidebar-open' : ''
      }`}
    >
      <div className="mart-brand">
        <span className="mart-brand-mark">M</span>
        <span>
          <strong>VRLS</strong>
          <small>MART SYSTEM</small>
        </span>

        <button
          type="button"
          className="mart-mobile-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={17} />
        </button>
      </div>

      <div className="mart-demo-label">
        <span />
        DEMO / CONCEPT
      </div>

      <nav className="mart-nav">
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <button
              type="button"
              key={item.id}
              className={`mart-nav-item ${
                active === item.id ? 'mart-nav-active' : ''
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mart-sidebar-bottom">
        <button
          type="button"
          className={`mart-nav-item ${
            active === 'settings' ? 'mart-nav-active' : ''
          }`}
          onClick={() => onNavigate('settings')}
        >
          <Settings size={17} />
          <span>Settings</span>
        </button>

        <div className="mart-sidebar-note">
          <strong>VRLS Solutions</strong>
          <span>Custom retail software concept</span>
        </div>
      </div>
    </aside>
  )
}

function Header({ onMenu, active, onProfile }) {
  const labels = {
    dashboard: 'Dashboard',
    billing: 'New Bill',
    products: 'Products',
    inventory: 'Inventory',
    bills: 'Bills',
    customers: 'Customers',
    reports: 'Reports',
    settings: 'Settings',
  }

  return (
    <header className="mart-header">
      <div className="mart-header-title">
        <button
          type="button"
          className="mart-menu-button"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div>
          <span>RETAIL MANAGEMENT</span>
          <h1>{labels[active] || 'Dashboard'}</h1>
        </div>
      </div>

      <div className="mart-header-actions">
        <div className="mart-search-mini">
          <Search size={16} />
          <span>Search...</span>
          <kbd>⌘ K</kbd>
        </div>

        <button
          type="button"
          className="mart-profile"
          onClick={onProfile}
        >
          <span>D</span>
          <div>
            <strong>Demo Admin</strong>
            <small>Retail Store</small>
          </div>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  )
}

function DemoBanner() {
  return (
    <div className="mart-demo-banner">
      <div>
        <span className="mart-demo-pill">VRLS DEMO / CONCEPT</span>
        <p>
          Retail billing and inventory management interface.
          All records shown here are demonstration data.
        </p>
      </div>

      <span className="mart-prototype-pill">PROTOTYPE</span>
    </div>
  )
}

function StatCard({
  label,
  value,
  change,
  icon: Icon,
  warning = false,
}) {
  return (
    <div className="mart-stat-card">
      <div className="mart-stat-icon">
        <Icon size={18} />
      </div>

      <span>{label}</span>
      <strong>{value}</strong>

      <small className={warning ? 'mart-warning-text' : ''}>
        {change}
      </small>
    </div>
  )
}

function Dashboard({ onNavigate }) {
  return (
    <div className="mart-page">
      <DemoBanner />

      <div className="mart-page-heading">
        <div>
          <span className="mart-eyebrow">STORE OVERVIEW</span>
          <h2>
            Good morning, <em>Demo Admin.</em>
          </h2>
          <p>Here's a quick look at today's retail activity.</p>
        </div>

        <button type="button" className="mart-date-button">
          Today
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="mart-stats-grid">
        <StatCard
          label="Today's Sales"
          value="₹48,250"
          change="↗ +12.8%"
          icon={Receipt}
        />

        <StatCard
          label="Bills Generated"
          value="36"
          change="↗ +8.4%"
          icon={FileText}
        />

        <StatCard
          label="Customers"
          value="124"
          change="↗ +5.2%"
          icon={Users}
        />

        <StatCard
          label="Low Stock"
          value="08"
          change="↘ Needs attention"
          icon={Boxes}
          warning
        />
      </div>

      <div className="mart-dashboard-grid">
        <section className="mart-panel mart-sales-panel">
          <div className="mart-panel-heading">
            <div>
              <span>SALES ACTIVITY</span>
              <h3>Sales overview</h3>
            </div>

            <button type="button">
              This week
              <ChevronDown size={13} />
            </button>
          </div>

          <div className="mart-chart">
            {[28, 42, 34, 58, 47, 72, 54].map(
              (height, index) => (
                <div className="mart-chart-column" key={index}>
                  <div style={{ height: `${height}%` }} />
                  <span>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                  </span>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="mart-panel">
          <div className="mart-panel-heading">
            <div>
              <span>RECENT BILLS</span>
              <h3>Latest transactions</h3>
            </div>

            <button
              type="button"
              className="mart-text-button"
              onClick={() => onNavigate('bills')}
            >
              View all
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="mart-mini-list">
            {demoBills.slice(0, 4).map((bill) => (
              <div key={bill.id}>
                <span className="mart-mini-icon">
                  <Receipt size={14} />
                </span>

                <div>
                  <strong>{bill.id}</strong>
                  <small>{bill.customer}</small>
                </div>

                <b>{bill.total}</b>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mart-panel">
        <div className="mart-panel-heading">
          <div>
            <span>INVENTORY SNAPSHOT</span>
            <h3>Low stock items</h3>
          </div>

          <button
            type="button"
            className="mart-text-button"
            onClick={() => onNavigate('inventory')}
          >
            View inventory
            <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="mart-stock-list">
          {products
            .filter((product) => product.stock <= 10)
            .map((product) => (
              <div key={product.id}>
                <span className="mart-product-icon">
                  <Package size={15} />
                </span>

                <div>
                  <strong>{product.name}</strong>
                  <small>{product.category}</small>
                </div>

                <span className="mart-stock-count">
                  {product.stock} left
                </span>

                <span className="mart-status-warning">
                  Low stock
                </span>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}

function POS({ onNavigate }) {
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(5)
  const [generated, setGenerated] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products

    return products.filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
  }, [query])

  const addProduct = (product) => {
    setGenerated(false)

    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id,
      )

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
  }

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + amount),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeProduct = (id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id),
    )
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const discountAmount = Math.min(
    subtotal,
    Math.max(0, discount),
  )

  const taxable = Math.max(0, subtotal - discountAmount)
  const taxAmount = taxable * (tax / 100)
  const total = taxable + taxAmount

  const generateBill = () => {
    if (!cart.length) return
    setGenerated(true)
  }

  if (generated) {
    return (
      <div className="mart-page">
        <div className="mart-success-card">
          <div className="mart-success-icon">
            <Check size={30} />
          </div>

          <span className="mart-eyebrow">DEMO BILL GENERATED</span>

          <h2>Bill ready.</h2>

          <p>
            This is a demonstration transaction. No real payment
            or invoice has been created.
          </p>

          <div className="mart-receipt-summary">
            <div>
              <span>Demo Bill</span>
              <strong>#DEMO-2049</strong>
            </div>

            <div>
              <span>Items</span>
              <strong>
                {cart.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                )}
              </strong>
            </div>

            <div>
              <span>Total</span>
              <strong>{money(total)}</strong>
            </div>
          </div>

          <div className="mart-success-actions">
            <button
              type="button"
              onClick={() => {
                setCart([])
                setDiscount(0)
                setGenerated(false)
              }}
            >
              Create another bill
            </button>

            <button
              type="button"
              className="mart-secondary-button"
              onClick={() => onNavigate('bills')}
            >
              View demo bills
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mart-page">
      <div className="mart-page-heading">
        <div>
          <span className="mart-eyebrow">POINT OF SALE</span>
          <h2>New bill.</h2>
          <p>
            Build a customer bill with live totals and checkout
            calculations.
          </p>
        </div>

        <span className="mart-demo-pill">DEMO MODE</span>
      </div>

      <div className="mart-pos-layout">
        <section className="mart-panel mart-product-picker">
          <div className="mart-pos-heading">
            <div>
              <span>PRODUCTS</span>
              <h3>Add items</h3>
            </div>

            <span>{products.length} products</span>
          </div>

          <label className="mart-product-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
            />
          </label>

          <div className="mart-product-grid">
            {filteredProducts.map((product) => (
              <button
                type="button"
                className="mart-product-card"
                key={product.id}
                onClick={() => addProduct(product)}
              >
                <span className="mart-product-card-icon">
                  <Package size={18} />
                </span>

                <strong>{product.name}</strong>
                <small>{product.category}</small>

                <div>
                  <b>{money(product.price)}</b>
                  <span>
                    <Plus size={13} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mart-panel mart-cart-panel">
          <div className="mart-pos-heading">
            <div>
              <span>CURRENT BILL</span>
              <h3>Cart</h3>
            </div>

            <span>{cart.length} items</span>
          </div>

          {!cart.length ? (
            <div className="mart-empty-cart">
              <ShoppingCart size={27} />
              <strong>Your bill is empty</strong>
              <p>
                Select products from the left to start building
                this demo bill.
              </p>
            </div>
          ) : (
            <>
              <div className="mart-cart-items">
                {cart.map((item) => (
                  <div className="mart-cart-item" key={item.id}>
                    <span className="mart-cart-icon">
                      <Package size={15} />
                    </span>

                    <div className="mart-cart-info">
                      <strong>{item.name}</strong>
                      <small>{money(item.price)} each</small>
                    </div>

                    <div className="mart-quantity">
                      <button
                        type="button"
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                      >
                        <Minus size={12} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <strong className="mart-line-total">
                      {money(item.price * item.quantity)}
                    </strong>

                    <button
                      type="button"
                      className="mart-remove"
                      onClick={() => removeProduct(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mart-bill-options">
                <label>
                  <span>Discount</span>
                  <div>
                    <span>₹</span>
                    <input
                      type="number"
                      min="0"
                      value={discount}
                      onChange={(event) =>
                        setDiscount(Number(event.target.value))
                      }
                    />
                  </div>
                </label>

                <label>
                  <span>Tax</span>
                  <div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={tax}
                      onChange={(event) =>
                        setTax(Number(event.target.value))
                      }
                    />
                    <span>%</span>
                  </div>
                </label>
              </div>

              <div className="mart-total-box">
                <div>
                  <span>Subtotal</span>
                  <strong>{money(subtotal)}</strong>
                </div>

                <div>
                  <span>Discount</span>
                  <strong>- {money(discountAmount)}</strong>
                </div>

                <div>
                  <span>Tax ({tax}%)</span>
                  <strong>{money(taxAmount)}</strong>
                </div>

                <div className="mart-grand-total">
                  <span>Total</span>
                  <strong>{money(total)}</strong>
                </div>
              </div>

              <button
                type="button"
                className="mart-generate-button"
                onClick={generateBill}
              >
                Generate Demo Bill
                <ArrowUpRight size={16} />
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

function ProductsPage({ onBack }) {
  const [query, setQuery] = useState('')

  const filtered = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )

  return (
    <div className="mart-page">
      <div className="mart-page-heading">
        <div>
          <span className="mart-eyebrow">CATALOGUE</span>
          <h2>Products.</h2>
          <p>Manage the demonstration product catalogue.</p>
        </div>

        <button
          type="button"
          className="mart-outline-button"
          onClick={onBack}
        >
          <ArrowLeft size={14} />
          Dashboard
        </button>
      </div>

      <section className="mart-panel">
        <div className="mart-page-toolbar">
          <label className="mart-product-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
            />
          </label>

          <span className="mart-demo-pill">
            {filtered.length} DEMO ITEMS
          </span>
        </div>

        <div className="mart-table-wrap">
          <table className="mart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <small>{product.id}</small>
                  </td>
                  <td>{product.category}</td>
                  <td>{money(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={
                        product.stock <= 10
                          ? 'mart-status-warning'
                          : 'mart-status-success'
                      }
                    >
                      {product.stock <= 10
                        ? 'Low stock'
                        : 'In stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function InventoryPage({ onBack }) {
  const lowStock = products.filter(
    (product) => product.stock <= 10,
  )

  return (
    <div className="mart-page">
      <div className="mart-page-heading">
        <div>
          <span className="mart-eyebrow">STOCK MANAGEMENT</span>
          <h2>Inventory.</h2>
          <p>
            Monitor stock levels and identify items requiring
            attention.
          </p>
        </div>

        <button
          type="button"
          className="mart-outline-button"
          onClick={onBack}
        >
          <ArrowLeft size={14} />
          Dashboard
        </button>
      </div>

      <div className="mart-inventory-grid">
        <div className="mart-inventory-summary">
          <Boxes size={20} />
          <span>Total products</span>
          <strong>{products.length}</strong>
        </div>

        <div className="mart-inventory-summary warning">
          <Package size={20} />
          <span>Low stock</span>
          <strong>{lowStock.length}</strong>
        </div>

        <div className="mart-inventory-summary">
          <Check size={20} />
          <span>Healthy stock</span>
          <strong>{products.length - lowStock.length}</strong>
        </div>
      </div>

      <section className="mart-panel">
        <div className="mart-panel-heading">
          <div>
            <span>STOCK ALERTS</span>
            <h3>Items needing attention</h3>
          </div>
        </div>

        <div className="mart-stock-list">
          {lowStock.map((product) => (
            <div key={product.id}>
              <span className="mart-product-icon">
                <Package size={15} />
              </span>

              <div>
                <strong>{product.name}</strong>
                <small>{product.category}</small>
              </div>

              <span className="mart-stock-count">
                {product.stock} units
              </span>

              <span className="mart-status-warning">
                Reorder
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function BillsPage({ onBack }) {
  return (
    <div className="mart-page">
      <div className="mart-page-heading">
        <div>
          <span className="mart-eyebrow">TRANSACTIONS</span>
          <h2>Bills.</h2>
          <p>Review demonstration billing activity.</p>
        </div>

        <button
          type="button"
          className="mart-outline-button"
          onClick={onBack}
        >
          <ArrowLeft size={14} />
          Dashboard
        </button>
      </div>

      <section className="mart-panel">
        <div className="mart-table-wrap">
          <table className="mart-table">
            <thead>
              <tr>
                <th>Bill</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {demoBills.map((bill) => (
                <tr key={bill.id}>
                  <td>
                    <strong>{bill.id}</strong>
                  </td>
                  <td>{bill.customer}</td>
                  <td>{bill.items}</td>
                  <td>{bill.total}</td>
                  <td>
                    <span className="mart-status-success">
                      {bill.status}
                    </span>
                  </td>
                  <td>{bill.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function CustomersPage({ onBack }) {
  return (
    <div className="mart-page">
      <div className="mart-page-heading">
        <div>
          <span className="mart-eyebrow">CUSTOMER MANAGEMENT</span>
          <h2>Customers.</h2>
          <p>Demo customer records for the retail system concept.</p>
        </div>

        <button
          type="button"
          className="mart-outline-button"
          onClick={onBack}
        >
          <ArrowLeft size={14} />
          Dashboard
        </button>
      </div>

      <div className="mart-customer-grid">
        {customers.map((customer) => (
          <article className="mart-customer-card" key={customer.id}>
            <span className="mart-customer-avatar">
              <UserRound size={17} />
            </span>

            <h3>{customer.name}</h3>
            <small>{customer.phone}</small>

            <div>
              <span>
                Bills
                <strong>{customer.bills}</strong>
              </span>

              <span>
                Demo spend
                <strong>{customer.spent}</strong>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function ReportsPage({ onBack }) {
  return (
    <div className="mart-page">
      <div className="mart-page-heading">
        <div>
          <span className="mart-eyebrow">ANALYTICS</span>
          <h2>Reports.</h2>
          <p>Business reporting interfaces for the retail concept.</p>
        </div>

        <button
          type="button"
          className="mart-outline-button"
          onClick={onBack}
        >
          <ArrowLeft size={14} />
          Dashboard
        </button>
      </div>

      <div className="mart-report-grid">
        {[
          ['Daily Sales', 'Revenue and transaction summary.', Receipt],
          ['Inventory', 'Stock movement and alerts.', Boxes],
          ['Customers', 'Customer activity overview.', Users],
        ].map(([title, description, Icon]) => (
          <button
            type="button"
            className="mart-report-card"
            key={title}
          >
            <span>
              <Icon size={19} />
            </span>
            <strong>{title}</strong>
            <p>{description}</p>
            <small>
              Open report
              <ArrowUpRight size={13} />
            </small>
          </button>
        ))}
      </div>

      <div className="mart-demo-note">
        <span>VRLS DEMO / CONCEPT</span>
        <p>
          Reports shown here are interface concepts. No real
          business analytics are connected.
        </p>
      </div>
    </div>
  )
}

function SettingsPage({ onBack }) {
  const [sound, setSound] = useState(true)
  const [autoPrint, setAutoPrint] = useState(false)

  return (
    <div className="mart-page">
      <div className="mart-page-heading">
        <div>
          <span className="mart-eyebrow">SYSTEM</span>
          <h2>Settings.</h2>
          <p>Configuration controls for the billing concept.</p>
        </div>

        <button
          type="button"
          className="mart-outline-button"
          onClick={onBack}
        >
          <ArrowLeft size={14} />
          Dashboard
        </button>
      </div>

      <section className="mart-settings">
        <div>
          <strong>Billing sound</strong>
          <p>Play a confirmation sound after generating a bill.</p>

          <button
            type="button"
            className={`mart-toggle ${
              sound ? 'mart-toggle-on' : ''
            }`}
            onClick={() => setSound((value) => !value)}
          >
            <span />
          </button>
        </div>

        <div>
          <strong>Auto print</strong>
          <p>Automatically print generated bills.</p>

          <button
            type="button"
            className={`mart-toggle ${
              autoPrint ? 'mart-toggle-on' : ''
            }`}
            onClick={() => setAutoPrint((value) => !value)}
          >
            <span />
          </button>
        </div>
      </section>
    </div>
  )
}

function MartBillingDemo() {
  const [active, setActive] = useState('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const navigate = (section) => {
    setActive(section)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const page = (() => {
    switch (active) {
      case 'billing':
        return <POS onNavigate={navigate} />

      case 'products':
        return (
          <ProductsPage onBack={() => navigate('dashboard')} />
        )

      case 'inventory':
        return (
          <InventoryPage onBack={() => navigate('dashboard')} />
        )

      case 'bills':
        return (
          <BillsPage onBack={() => navigate('dashboard')} />
        )

      case 'customers':
        return (
          <CustomersPage onBack={() => navigate('dashboard')} />
        )

      case 'reports':
        return (
          <ReportsPage onBack={() => navigate('dashboard')} />
        )

      case 'settings':
        return (
          <SettingsPage onBack={() => navigate('dashboard')} />
        )

      default:
        return <Dashboard onNavigate={navigate} />
    }
  })()

  return (
    <div className="mart-demo">
      <HomeButton />

      <div
        className={`mart-shell ${
          menuOpen ? 'mart-shell-menu-open' : ''
        }`}
      >
        <Sidebar
          active={active}
          onNavigate={navigate}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />

        <div className="mart-main">
          <Header
            active={active}
            onMenu={() => setMenuOpen(true)}
            onProfile={() => setProfileOpen((value) => !value)}
          />

          {profileOpen && (
            <div className="mart-profile-menu">
              <strong>Demo Admin</strong>
              <span>Retail store concept</span>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false)
                  navigate('settings')
                }}
              >
                Open settings
              </button>
            </div>
          )}

          <main>{page}</main>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="mart-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default MartBillingDemo
