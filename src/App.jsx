import { lazy, Suspense } from 'react'

const ShowroomDemo = lazy(() => import('./demos/ShowroomDemo/ShowroomDemo'))
const MartBillingDemo = lazy(() => import('./demos/MartBillingDemo/MartBillingDemo'))
const EcommerceDemo = lazy(() => import('./demos/EcommerceDemo/EcommerceDemo'))
const AIAssistantDemo = lazy(() => import('./demos/AIAssistantDemo/AIAssistantDemo'))
const HospitalDemo = lazy(() => import('./demos/HospitalDemo/HospitalDemo'))
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

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import LazySection from './components/LazySection'
import SEO from './components/SEO'

const Services = lazy(() => import('./components/Services'))
const Pricing = lazy(() => import('./components/Pricing'))
const Process = lazy(() => import('./components/Process'))
const About = lazy(() => import('./components/About'))
const Technologies = lazy(() => import('./components/Technologies'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

import './App.css'

function DeferredContent({ children, minHeight = 500 }) {
  return (
    <LazySection
      rootMargin="1000px"
      fallback={<div className="lazy-section-placeholder" style={{ minHeight }} aria-hidden="true" />}
    >
      <Suspense fallback={<div className="lazy-section-placeholder" style={{ minHeight }} aria-hidden="true" />}>
        {children}
      </Suspense>
    </LazySection>
  )
}

function MainWebsite() {
  return (
    <div className="app" id="top">
      <Navbar />

      <main>
        <Hero />
        <Work />

        <DeferredContent minHeight={760}>
          <Services />
        </DeferredContent>

        <DeferredContent minHeight={1000}>
          <Pricing />
        </DeferredContent>

        <DeferredContent minHeight={850}>
          <Process />
        </DeferredContent>

        <DeferredContent minHeight={900}>
          <About />
        </DeferredContent>

        <DeferredContent minHeight={950}>
          <Technologies />
        </DeferredContent>

        <DeferredContent minHeight={800}>
          <Contact />
        </DeferredContent>
      </main>

      <DeferredContent minHeight={500}>
        <Footer />
      </DeferredContent>
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

  if (path === '/demos/function-hall') return withSEO(<FunctionHallDemo />)
  if (path === '/demos/interior-design') return withSEO(<InteriorDesignDemo />)
  if (path === '/demos/real-estate') return withSEO(<RealEstateDemo />)
  if (path === '/demos/wedding-events') return withSEO(<WeddingEventsDemo />)
  if (path === '/demos/cafe') return withSEO(<CafeDemo />)
  if (path === '/demos/boutique') return withSEO(<BoutiqueFashionDemo />)
  if (path === '/demos/furniture') return withSEO(<FurnitureDemo />)
  if (path === '/demos/education') return withSEO(<EducationDemo />)
  if (path === '/demos/restaurant/booking') return withSEO(<BookingPage />)
  if (path === '/demos/restaurant') return withSEO(<RestaurantDemo />)
  if (path === '/demos/showroom') return withSEO(<ShowroomDemo />)
  if (path === '/demos/mart-billing') return withSEO(<MartBillingDemo />)
  if (path === '/demos/ai-assistant') return withSEO(<AIAssistantDemo />)
  if (path === '/demos/ecommerce') return withSEO(<EcommerceDemo />)
  if (path === '/demos/hospital') return withSEO(<HospitalDemo />)

  return withSEO(<MainWebsite />)
}

export default App
