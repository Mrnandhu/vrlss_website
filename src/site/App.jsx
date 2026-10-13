import { useCallback, useEffect, useState } from 'react'
import Layout from './components/Layout'
import { NavContext } from './router'
import { CurrencyProvider } from './currency'
import { routeFor, normalize, notFound, applyHead } from './routes'
import Home from './pages/Home'
import Websites from './pages/Websites'
import Marketing from './pages/Marketing'
import Pricing from './pages/Pricing'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Store from './demos/Store'
import Booking from './demos/Booking'
import Dashboard from './demos/Dashboard'
import Portal from './demos/Portal'
import MobileApp from './demos/MobileApp'
import Crm from './demos/Crm'
import Invoice from './demos/Invoice'
import IndustrySite from './demos/IndustrySite'
import { industryByPath } from './demos/industries'
import './site.css'
import './glass.css'
import './demos.css'
import './motion.css'

const pages = {
  '/': Home,
  '/websites': Websites,
  '/digital-marketing': Marketing,
  '/pricing': Pricing,
  '/work': Work,
  '/about': About,
  '/contact': Contact,
  '/work/online-store': Store,
  '/work/booking-system': Booking,
  '/work/sales-dashboard': Dashboard,
  '/work/customer-portal': Portal,
  '/work/mobile-app': MobileApp,
  '/work/sales-crm': Crm,
  '/work/invoice-generator': Invoice,
}

export default function SiteApp({ initialPath = '/' }) {
  const [path, setPath] = useState(normalize(initialPath))

  const navigate = useCallback((to) => {
    const [pathAndQuery, hash] = to.split('#')
    const swap = () => {
      window.history.pushState({}, '', to)
      setPath(normalize(pathAndQuery))
      if (!hash) window.scrollTo(0, 0)
    }
    const after = () => {
      if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
    }
    swap()
    after()
  }, [])

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const route = routeFor(path) || notFound
  const site = industryByPath[route.path]
  const Page = pages[route.path] || NotFound

  useEffect(() => {
    applyHead(route)
  }, [route])


  return (
    <NavContext.Provider value={navigate}>
      <CurrencyProvider>
        <Layout path={route.path}>
          {site ? <IndustrySite key={site.slug} site={site} /> : <Page key={route.path} />}
        </Layout>
      </CurrencyProvider>
    </NavContext.Provider>
  )
}
