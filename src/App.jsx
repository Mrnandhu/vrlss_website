import { lazy, Suspense } from 'react'
import SEO from './components/SEO'
import HomePage from './components/HomePage'

import './royal-theme.css'

const demos = {
  '/demos/nova-developments': lazy(() => import('./demos/NovaDevelopments/NovaDevelopments')),
  '/demos/atlas-interiors': lazy(() => import('./demos/AtlasInteriors/AtlasInteriors')),
  '/demos/alpha-contracting': lazy(() => import('./demos/AlphaContracting/AlphaContracting')),
  '/demos/medora-clinic': lazy(() => import('./demos/MedoraClinic/MedoraClinic')),
  '/demos/majlis-hospitality': lazy(() => import('./demos/MajlisHospitality/MajlisHospitality')),
  '/demos/lumi-events': lazy(() => import('./demos/LumiEvents/LumiEvents')),
  '/demos/motion-auto': lazy(() => import('./demos/MotionAuto/MotionAuto')),
  '/demos/orbit-beauty-studio': lazy(() => import('./demos/OrbitBusiness/OrbitBusiness')),
  '/demos/gulfcore-trading': lazy(() => import('./demos/GulfCoreTrading/GulfCoreTrading')),
  '/demos/sands-tourism': lazy(() => import('./demos/SandsTourism/SandsTourism')),
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const Demo = demos[path]

  if (Demo) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Demo />
      </Suspense>
    )
  }

  return (
    <>
      <SEO />
      <HomePage />
    </>
  )
}

export default App
