import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  MoreHorizontal,
  Package,
  ShoppingBag,
  Users,
} from 'lucide-react'

const stats = [
  {
    label: 'Today’s Sales',
    value: '₹48,250',
    change: '+12.8%',
    positive: true,
    icon: ShoppingBag,
  },
  {
    label: 'Orders',
    value: '36',
    change: '+8.4%',
    positive: true,
    icon: Package,
  },
  {
    label: 'Customers',
    value: '124',
    change: '+5.2%',
    positive: true,
    icon: Users,
  },
  {
    label: 'Low Stock',
    value: '08',
    change: 'Needs attention',
    positive: false,
    icon: Boxes,
  },
]

const products = [
  {
    name: 'Classic Cotton Shirt',
    category: 'Shirts',
    price: '₹1,299',
    stock: 24,
    status: 'In stock',
  },
  {
    name: 'Relaxed Linen Trouser',
    category: 'Trousers',
    price: '₹1,899',
    stock: 11,
    status: 'Low stock',
  },
  {
    name: 'Everyday Overshirt',
    category: 'Outerwear',
    price: '₹2,199',
    stock: 31,
    status: 'In stock',
  },
  {
    name: 'Minimal Polo',
    category: 'T-shirts',
    price: '₹999',
    stock: 7,
    status: 'Low stock',
  },
]

const activity = [
  {
    title: 'New order received',
    detail: 'Order #DEMO-1042',
    time: '12 min ago',
  },
  {
    title: 'Inventory updated',
    detail: 'Classic Cotton Shirt',
    time: '28 min ago',
  },
  {
    title: 'New customer added',
    detail: 'Customer profile created',
    time: '43 min ago',
  },
  {
    title: 'Sale completed',
    detail: 'Retail purchase',
    time: '1 hr ago',
  },
]

function Dashboard() {
  return (
    <div className="showroom-app-dashboard">
      <div className="showroom-app-demo-banner">
        <div>
          <span className="showroom-app-demo-pill">
            VRLS DEMO / CONCEPT
          </span>

          <p>
            Clothing showroom management interface concept.
            All figures shown here are demonstration data.
          </p>
        </div>

        <span className="showroom-app-demo-status">
          Prototype
        </span>
      </div>

      <section className="showroom-app-welcome">
        <div>
          <span className="showroom-app-section-label">
            BUSINESS OVERVIEW
          </span>

          <h2>
            Good morning, <em>Demo Admin.</em>
          </h2>

          <p>
            Here's a quick look at today's showroom activity.
          </p>
        </div>

        <button type="button" className="showroom-app-date-button">
          Today
        </button>
      </section>

      <section className="showroom-app-stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <article className="showroom-app-stat-card" key={stat.label}>
              <div className="showroom-app-stat-top">
                <span className="showroom-app-stat-icon">
                  <Icon size={19} />
                </span>

                <button
                  type="button"
                  className="showroom-app-more"
                  aria-label={`More options for ${stat.label}`}
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <span className="showroom-app-stat-label">
                {stat.label}
              </span>

              <strong className="showroom-app-stat-value">
                {stat.value}
              </strong>

              <span
                className={`showroom-app-stat-change ${
                  stat.positive
                    ? 'showroom-app-stat-positive'
                    : 'showroom-app-stat-warning'
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.change}
              </span>
            </article>
          )
        })}
      </section>

      <section className="showroom-app-main-grid">
        <article className="showroom-app-panel showroom-app-sales-panel">
          <div className="showroom-app-panel-heading">
            <div>
              <span className="showroom-app-section-label">
                SALES ACTIVITY
              </span>
              <h3>Sales overview</h3>
            </div>

            <button type="button" className="showroom-app-panel-filter">
              This week
              <ArrowDownRight size={14} />
            </button>
          </div>

          <div className="showroom-app-chart">
            <div className="showroom-app-chart-y">
              <span>₹60k</span>
              <span>₹45k</span>
              <span>₹30k</span>
              <span>₹15k</span>
              <span>₹0</span>
            </div>

            <div className="showroom-app-chart-area">
              <div className="showroom-app-chart-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="showroom-app-bars">
                {[42, 58, 48, 72, 64, 82, 55].map(
                  (height, index) => (
                    <div
                      className="showroom-app-bar-column"
                      key={index}
                    >
                      <div
                        className="showroom-app-bar"
                        style={{ height: `${height}%` }}
                      />
                      <span>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </article>

        <article className="showroom-app-panel showroom-app-activity-panel">
          <div className="showroom-app-panel-heading">
            <div>
              <span className="showroom-app-section-label">
                RECENT ACTIVITY
              </span>
              <h3>Latest updates</h3>
            </div>

            <button
              type="button"
              className="showroom-app-text-button"
            >
              View all
            </button>
          </div>

          <div className="showroom-app-activity-list">
            {activity.map((item, index) => (
              <div
                className="showroom-app-activity-item"
                key={item.title}
              >
                <span className="showroom-app-activity-index">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>

                <small>{item.time}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="showroom-app-panel showroom-app-products-panel">
        <div className="showroom-app-panel-heading">
          <div>
            <span className="showroom-app-section-label">
              INVENTORY SNAPSHOT
            </span>
            <h3>Products</h3>
          </div>

          <button
            type="button"
            className="showroom-app-text-button"
          >
            View inventory
            <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="showroom-app-table-wrap">
          <table className="showroom-app-table">
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
              {products.map((product) => (
                <tr key={product.name}>
                  <td>
                    <div className="showroom-app-product-name">
                      <span className="showroom-app-product-thumb">
                        <Package size={17} />
                      </span>
                      <strong>{product.name}</strong>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={`showroom-app-stock-status ${
                        product.status === 'Low stock'
                          ? 'showroom-app-stock-low'
                          : 'showroom-app-stock-ok'
                      }`}
                    >
                      <span />
                      {product.status}
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

export default Dashboard
