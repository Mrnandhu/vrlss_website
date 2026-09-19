import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import { useState } from 'react'

function ShowroomHeader({ onMenu, onNavigate }) {
  const [query, setQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const submitSearch = (event) => {
    event.preventDefault()

    const value = query.trim().toLowerCase()

    if (!value) return

    if (value.includes('product') || value.includes('shirt')) {
      onNavigate('products')
    } else if (value.includes('order')) {
      onNavigate('orders')
    } else if (value.includes('customer')) {
      onNavigate('customers')
    } else if (value.includes('sale')) {
      onNavigate('sales')
    }
  }

  return (
    <header className="showroom-app-header">
      <div className="showroom-app-header-left">
        <button
          type="button"
          className="showroom-app-menu-button"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div>
          <span className="showroom-app-header-eyebrow">
            SHOWROOM MANAGEMENT
          </span>
          <h1>Overview</h1>
        </div>
      </div>

      <div className="showroom-app-header-actions">
        <form
          className="showroom-app-search"
          onSubmit={submitSearch}
        >
          <Search size={17} />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            aria-label="Search showroom"
          />

          <kbd>⌘ K</kbd>
        </form>

        <div className="showroom-app-header-popover-wrap">
          <button
            type="button"
            className="showroom-app-icon-button"
            aria-label="Notifications"
            onClick={() =>
              setNotificationsOpen((value) => !value)
            }
          >
            <Bell size={18} />
            <span className="showroom-app-notification-dot" />
          </button>

          {notificationsOpen && (
            <div className="showroom-app-popover">
              <strong>Notifications</strong>
              <p>Low stock: Minimal Polo</p>
              <p>New demo order received</p>
            </div>
          )}
        </div>

        <div className="showroom-app-header-popover-wrap">
          <button
            type="button"
            className="showroom-app-user"
            onClick={() => setProfileOpen((value) => !value)}
          >
            <span className="showroom-app-avatar">D</span>

            <span className="showroom-app-user-copy">
              <strong>Demo Admin</strong>
              <small>Showroom</small>
            </span>

            <ChevronDown size={15} />
          </button>

          {profileOpen && (
            <div className="showroom-app-popover showroom-app-profile-popover">
              <strong>Demo Admin</strong>
              <p>Demo showroom workspace</p>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false)
                  onNavigate('settings')
                }}
              >
                Open settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default ShowroomHeader
