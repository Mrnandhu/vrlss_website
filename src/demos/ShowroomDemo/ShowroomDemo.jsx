import { useState } from 'react'

import ShowroomSidebar from './components/ShowroomSidebar'
import ShowroomHeader from './components/ShowroomHeader'
import Dashboard from './components/Dashboard'
import {
  CustomersPage,
  OrdersPage,
  ProductsPage,
  ReportsPage,
  SalesPage,
  SettingsPage,
} from './components/ShowroomPages'

import './ShowroomDemo.css'

function ShowroomDemo() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  const navigate = (section) => {
    setActiveSection(section)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (activeSection) {
      case 'products':
        return <ProductsPage onBack={() => navigate('overview')} />

      case 'inventory':
        return <ProductsPage onBack={() => navigate('overview')} inventoryMode />

      case 'orders':
        return <OrdersPage onBack={() => navigate('overview')} />

      case 'customers':
        return <CustomersPage onBack={() => navigate('overview')} />

      case 'sales':
        return <SalesPage onBack={() => navigate('overview')} />

      case 'reports':
        return <ReportsPage onBack={() => navigate('overview')} />

      case 'settings':
        return <SettingsPage onBack={() => navigate('overview')} />

      default:
        return <Dashboard onNavigate={navigate} />
    }
  }

  return (
    <div className="showroom-app-demo">
      <a
        href="/"
        className="showroom-app-home-button"
        aria-label="Back to VRLS Solutions home"
      >
        ← Back to Home
      </a>
      <div className="showroom-app-shell">
        <ShowroomSidebar
          open={sidebarOpen}
          collapsed={collapsed}
          activeSection={activeSection}
          onNavigate={navigate}
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setCollapsed((value) => !value)}
        />

        <div
          className={`showroom-app-main ${
            collapsed ? 'showroom-app-main-collapsed' : ''
          }`}
        >
          <ShowroomHeader
            activeSection={activeSection}
            onMenu={() => setSidebarOpen(true)}
            onNavigate={navigate}
          />

          <main className="showroom-app-content">
            {renderPage()}
          </main>
        </div>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="showroom-app-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default ShowroomDemo
