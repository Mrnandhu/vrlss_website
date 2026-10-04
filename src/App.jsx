import SEO from './components/SEO'
import HomePage from './components/HomePage'

import NovaDevelopments from './demos/NovaDevelopments/NovaDevelopments'
import AtlasInteriors from './demos/AtlasInteriors/AtlasInteriors'
import AlphaContracting from './demos/AlphaContracting/AlphaContracting'
import MedoraClinic from './demos/MedoraClinic/MedoraClinic'
import MajlisHospitality from './demos/MajlisHospitality/MajlisHospitality'
import LumiEvents from './demos/LumiEvents/LumiEvents'
import MotionAuto from './demos/MotionAuto/MotionAuto'
import OrbitBusiness from './demos/OrbitBusiness/OrbitBusiness'
import GulfCoreTrading from './demos/GulfCoreTrading/GulfCoreTrading'
import SandsTourism from './demos/SandsTourism/SandsTourism'

import './royal-theme.css'

function App() {
  const path = window.location.pathname

  if (path === '/demos/nova-developments') {
    return <NovaDevelopments />
  }

  if (path === '/demos/atlas-interiors') {
    return <AtlasInteriors />
  }

  if (path === '/demos/alpha-contracting') {
    return <AlphaContracting />
  }

  if (path === '/demos/medora-clinic') {
    return <MedoraClinic />
  }

  if (path === '/demos/majlis-hospitality') {
    return <MajlisHospitality />
  }

  if (path === '/demos/lumi-events') {
    return <LumiEvents />
  }

  if (path === '/demos/motion-auto') {
    return <MotionAuto />
  }

  if (path === '/demos/orbit-beauty-studio') {
    return <OrbitBusiness />
  }

  if (path === '/demos/gulfcore-trading') {
    return <GulfCoreTrading />
  }

  if (path === '/demos/sands-tourism') {
    return <SandsTourism />
  }

  return (
    <>
      <SEO />
      <HomePage />
    </>
  )
}

export default App
