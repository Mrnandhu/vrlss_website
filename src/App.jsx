import { lazy, Suspense } from 'react'

const ShowroomDemo = lazy(() => import('./demos/ShowroomDemo/ShowroomDemo'))
const MartBillingDemo = lazy(() => import('./demos/MartBillingDemo/MartBillingDemo'))
const EcommerceDemo = lazy(() => import('./demos/EcommerceDemo/EcommerceDemo'))
const AIAssistantDemo = lazy(() => import('./demos/AIAssistantDemo/AIAssistantDemo'))
const HospitalDemo = lazy(() => import('./demos/HospitalDemo/HospitalDemo'))
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import Technologies from './components/Technologies'
import Pricing from './components/Pricing'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SEO from './components/SEO'

const RestaurantDemo = lazy(() => import('./demos/RestaurantDemo/RestaurantDemo'))
const BookingPage = lazy(() => import('./demos/RestaurantDemo/components/booking/BookingPage'))
const FunctionHallDemo = lazy(() => import('./demos/FunctionHallDemo/FunctionHallDemo'))
const InteriorDesignDemo = lazy(() => import('./demos/InteriorDesignDemo/InteriorDesignDemo'))
const RealEstateDemo = lazy(() => import('./demos/RealEstateDemo/RealEstateDemo'))
const WeddingEventsDemo = lazy(() => import('./demos/WeddingEventsDemo/WeddingEventsDemo'))
const CafeDemo = lazy(() => import('./demos/CafeDemo/CafeDemo'))
const BoutiqueFashionDemo = lazy(() => import('./demos/BoutiqueFashionDemo/BoutiqueFashionDemo'))
const FurnitureDemo = lazy(() => import('./demos/FurnitureDemo/FurnitureDemo'))
const EducationDemo = lazy(() => import('./demos/EducationDemo/EducationDemo'))

import './App.css'

function MainWebsite() {
  return (
    <div className="app" id="top">
      <Navbar />

      <main>
        <Hero />
        <Work />
        <Services />
        <Pricing />
        <Process />
        <About />
        <Technologies />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

function App() {
  const path = window.location.pathname

  const withSEO = (component) => (
    <>
      <SEO />
      <Suspense
        fallback={
          <div className="route-loading" role="status" aria-live="polite">
            Loading VRLS demo…
          </div>
        }
      >
        {component}
      </Suspense>
    </>
  )

  if (path === '/demos/function-hall') {
    return withSEO(<FunctionHallDemo />)
  }

  if (path === '/demos/interior-design') {
    return withSEO(<InteriorDesignDemo />)
  }

  if (path === '/demos/real-estate') {
    return withSEO(<RealEstateDemo />)
  }

  if (path === '/demos/wedding-events') {
    return withSEO(<WeddingEventsDemo />)
  }

  if (path === '/demos/cafe') {
    return withSEO(<CafeDemo />)
  }

  if (path === '/demos/boutique') {
    return withSEO(<BoutiqueFashionDemo />)
  }

  if (path === '/demos/furniture') {
    return withSEO(<FurnitureDemo />)
  }

  if (path === '/demos/education') {
    return withSEO(<EducationDemo />)
  }

  if (path === '/demos/restaurant/booking') {
    return withSEO(<BookingPage />)
  }

  if (path === '/demos/restaurant') {
    return withSEO(<RestaurantDemo />)
  }

  if (path === '/demos/showroom') {
    return withSEO(<ShowroomDemo />)
  }

  if (path === '/demos/mart-billing') {
    return withSEO(<MartBillingDemo />)
  }

  if (path === '/demos/ai-assistant') {
    return withSEO(<AIAssistantDemo />)
  }

  if (path === '/demos/ecommerce') {
    return withSEO(<EcommerceDemo />)
  }

  if (path === '/demos/hospital') {
    return withSEO(<HospitalDemo />)
  }

  return withSEO(<MainWebsite />)
}

export default App
