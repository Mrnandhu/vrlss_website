import { lazy, Suspense } from 'react'
import SEO from './components/SEO'
import HomePage from './components/HomePage'

import './royal-theme.css'

// Bilingual Gulf demos (one shared template, see src/demos/gulf)
const MedoraClinic = lazy(() => import('./demos/gulf/MedoraClinic'))
const MajlisKitchen = lazy(() => import('./demos/gulf/MajlisKitchen'))
const OrbitBeautyStudio = lazy(() => import('./demos/gulf/OrbitBeautyStudio'))
const MotionAuto = lazy(() => import('./demos/gulf/MotionAuto'))
const NadeefHomeServices = lazy(() => import('./demos/gulf/NadeefHomeServices'))

// Private client previews (not listed, noindex)
const PearlOfMuscat = lazy(() => import('./demos/gulf/PearlOfMuscat'))

const demos = {
  '/demos/medora-clinic': MedoraClinic,
  '/demos/majlis-kitchen': MajlisKitchen,
  '/demos/majlis-hospitality': MajlisKitchen,
  '/demos/orbit-beauty-studio': OrbitBeautyStudio,
  '/demos/motion-auto': MotionAuto,
  '/demos/nadeef-home-services': NadeefHomeServices,
  '/preview/pearl-of-muscat': PearlOfMuscat,

  // Premium concept demos
  '/demos/nova-developments': lazy(() => import('./demos/NovaDevelopments/NovaDevelopments')),
  '/demos/atlas-interiors': lazy(() => import('./demos/AtlasInteriors/AtlasInteriors')),
  '/demos/alpha-contracting': lazy(() => import('./demos/AlphaContracting/AlphaContracting')),
  '/demos/lumi-events': lazy(() => import('./demos/LumiEvents/LumiEvents')),
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
