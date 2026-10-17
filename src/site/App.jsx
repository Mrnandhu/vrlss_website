import { useCallback, useEffect, useState } from 'react'
import Layout from './components/Layout'
import { NavContext } from './router'
import { CurrencyProvider } from './currency'
import { routeFor, normalize, notFound, applyHead } from './routes'
import { useScrollFx } from './scrollfx'
import Home from './pages/Home'
import Websites from './pages/Websites'
import Marketing from './pages/Marketing'
import Pricing from './pages/Pricing'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import Start from './pages/Start'
import StudioDocs from './pages/StudioDocs'
import SiteMap from './pages/SiteMap'
import NotFound from './pages/NotFound'
import Legal from './pages/Legal'
import Store from './demos/Store'
import Booking from './demos/Booking'
import Dashboard from './demos/Dashboard'
import Portal from './demos/Portal'
import MobileApp from './demos/MobileApp'
import Crm from './demos/Crm'
import Invoice from './demos/Invoice'
import IndustrySite from './demos/IndustrySite'
import { CityPage, CountryPage, TeluguPage } from './pages/Place'
import { placeByPath } from './places'
import { industryByPath } from './demos/industries'
import { localizedByPath } from './demos/locales'
import './site.css'
import './glass.css'
import './demos.css'
import './demosite.css'
import './motion.css'
import './brand.css'
import './studio.css'
import './tools.css'

const pages = {
  '/': Home,
  '/websites': Websites,
  '/digital-marketing': Marketing,
  '/pricing': Pricing,
  '/work': Work,
  '/about': About,
  '/contact': Contact,
  '/start': Start,
  '/studio/docs': StudioDocs,
  '/sitemap': SiteMap,
  '/privacy': () => <Legal path="/privacy" />,
  '/terms': () => <Legal path="/terms" />,
  '/refunds': () => <Legal path="/refunds" />,
  '/te': TeluguPage,
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
    const root = document.documentElement
    const same = normalize(pathAndQuery) === normalize(window.location.pathname)
    const swap = () => {
      window.history.pushState({}, '', to)
      setPath(normalize(pathAndQuery))
      if (!hash) window.scrollTo(0, 0)
      else requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
    }
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (calm || same || root.dataset.pt) {
      swap()
      return
    }
    // curtain wipe: cover the page, swap it underneath, then lift the curtain away
    root.dataset.pt = 'in'
    window.setTimeout(() => {
      swap()
      window.setTimeout(() => {
        root.dataset.pt = 'out'
        window.setTimeout(() => delete root.dataset.pt, 560)
      }, 60)
    }, 430)
  }, [])

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const route = routeFor(path) || notFound
  const site = industryByPath[route.path] || localizedByPath[route.path]
  const Page = pages[route.path] || NotFound

  useEffect(() => {
    applyHead(route)
  }, [route])
  useScrollFx(route.path)


  return (
    <NavContext.Provider value={navigate}>
      <CurrencyProvider>
        <Layout path={route.path}>
          {site ? <IndustrySite key={site.slug} site={site} />
            : placeByPath[route.path] ? (placeByPath[route.path].kind === 'city'
              ? <CityPage key={route.path} place={placeByPath[route.path]} />
              : <CountryPage key={route.path} place={placeByPath[route.path]} />)
            : <Page key={route.path} />}
        </Layout>
      </CurrencyProvider>
    </NavContext.Provider>
  )
}
