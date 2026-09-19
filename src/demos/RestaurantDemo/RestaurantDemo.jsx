import { useEffect, useState } from 'react'
import RestaurantNav from './components/RestaurantNav'
import RestaurantHero from './components/RestaurantHero'
import Experience from './components/Experience'
import RestaurantMenu from './components/RestaurantMenu'
import DishModal from './components/DishModal'
import Story from './components/Story'
import Gallery from './components/Gallery'
import PrivateDining from './components/PrivateDining'
import Events from './components/Events'
import Reservation from './components/Reservation'
import RestaurantFooter from './components/RestaurantFooter'
import BookingPage from './components/booking/BookingPage'

import './RestaurantDemo.css'

function RestaurantDemo() {
  const [selectedDish, setSelectedDish] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (window.location.pathname === '/demos/restaurant/booking') {
    return <BookingPage />
  }

  return (
    <div className="restaurant-demo">
      <RestaurantNav />
      <main>
        <RestaurantHero />

        <Experience />

        <RestaurantMenu onSelectDish={setSelectedDish} />

        <Story />

        <Gallery />

        <PrivateDining />

        <Events />

        <Reservation />
      </main>

      <RestaurantFooter />

      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  )
}

export default RestaurantDemo
