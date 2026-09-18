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

import RestaurantDemo from './demos/RestaurantDemo/RestaurantDemo'

import './App.css'

function MainWebsite() {
  return (
    <div className="app" id="top">
      <Navbar />

      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Technologies />
        <Pricing />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

function App() {
  const path = window.location.pathname

  if (path === '/demos/restaurant') {
    return <RestaurantDemo />
  }

  return <MainWebsite />
}

export default App
