import {
  BarChart3,
  Boxes,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Users,
  X,
} from 'lucide-react'

const navigation = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
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
    id: 'orders',
    label: 'Orders',
    icon: ShoppingBag,
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
  },
  {
    id: 'sales',
    label: 'Sales',
    icon: BarChart3,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3,
  },
]

function ShowroomSidebar({
  open,
  collapsed,
  activeSection,
  onNavigate,
  onClose,
  onToggle,
}) {
  return (
    <aside
      className={`showroom-app-sidebar ${
        open ? 'showroom-app-sidebar-open' : ''
      } ${collapsed ? 'showroom-app-sidebar-collapsed' : ''}`}
    >
      <div className="showroom-app-sidebar-top">
        <a
          href="/"
          className="showroom-app-brand"
          aria-label="Return to VRLS Solutions"
        >
          <span className="showroom-app-brand-mark">V</span>

          <span className="showroom-app-brand-copy">
            <strong>VRLS</strong>
            <small>SHOWROOM</small>
          </span>
        </a>

        <button
          type="button"
          className="showroom-app-mobile-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>
      </div>

      <div className="showroom-app-demo-label">
        <span />
        DEMO / CONCEPT
      </div>

      <nav className="showroom-app-nav" aria-label="Showroom navigation">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = activeSection === item.id

          return (
            <button
              type="button"
              className={`showroom-app-nav-item ${
                active ? 'showroom-app-nav-item-active' : ''
              }`}
              key={item.id}
              title={collapsed ? item.label : undefined}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="showroom-app-sidebar-bottom">
        <button
          type="button"
          className={`showroom-app-nav-item ${
            activeSection === 'settings'
              ? 'showroom-app-nav-item-active'
              : ''
          }`}
          title={collapsed ? 'Settings' : undefined}
          onClick={() => onNavigate('settings')}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>

        <div className="showroom-app-sidebar-divider" />

        <button
          type="button"
          className="showroom-app-collapse"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight size={17} />
          ) : (
            <ChevronLeft size={17} />
          )}

          {!collapsed && <span>Collapse sidebar</span>}
        </button>
      </div>
    </aside>
  )
}

export default ShowroomSidebar
