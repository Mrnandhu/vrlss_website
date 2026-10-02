import { lazy, Suspense } from 'react'
import SEO from './components/SEO'
import HomePage from './components/HomePage'
import './demos/universal-demo.css'
import './royal-theme.css'

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
const IndustryShowcase = lazy(() => import('./demos/IndustryShowcase/IndustryShowcase'))

function App() {
  const path = window.location.pathname
  const routes = {
    '/demos/function-hall': <FunctionHallDemo />,
    '/demos/interior-design': <InteriorDesignDemo />,
    '/demos/real-estate': <RealEstateDemo />,
    '/demos/wedding-events': <WeddingEventsDemo />,
    '/demos/cafe': <CafeDemo />,
    '/demos/boutique': <BoutiqueFashionDemo />,
    '/demos/furniture': <FurnitureDemo />,
    '/demos/education': <EducationDemo />,
    '/demos/restaurant/booking': <BookingPage />,
    '/demos/restaurant': <RestaurantDemo />,
    '/demos/showroom': <ShowroomDemo />,
    '/demos/mart-billing': <MartBillingDemo />,
    '/demos/ai-assistant': <AIAssistantDemo />,
    '/demos/ecommerce': <EcommerceDemo />,
    '/demos/hospital': <HospitalDemo />,
    '/demos/car-wash': <IndustryShowcase type="car-wash" />,
    '/demos/pet-vet': <IndustryShowcase type="pet-vet" />,
    '/demos/supermarket': <IndustryShowcase type="supermarket" />,
    '/demos/salon': <IndustryShowcase type="salon" />,
  }
  const demo = routes[path]

  if (!demo) return <HomePage />

  return (
    <>
      <SEO />
      <Suspense fallback={<div className="route-loading" role="status">Loading VRLS demo…</div>}>
        <div className="universal-demo-shell">{demo}</div>
      </Suspense>
    </>
  )
}

export default App
