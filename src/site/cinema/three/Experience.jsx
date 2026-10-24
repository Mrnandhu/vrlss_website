import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { colors } from '../palette.js'
import { store } from '../lib/store.js'
import { FOG } from './world.js'
import CameraRig from './CameraRig.jsx'
import StudioEnvironment from './StudioEnvironment.jsx'
import PanelSystem from './PanelSystem.jsx'
import Particles from './Particles.jsx'
import ServicesRings from './ServicesRings.jsx'
import ProcessPath from './ProcessPath.jsx'
import GalleryWall from './GalleryWall.jsx'
import Aurora from './Aurora.jsx'

// Post-processing is its own chunk and only ever loads on desktop.
const Effects = lazy(() => import('./Effects.jsx'))

function World({ tier }) {
  const still = tier === 'static'
  const full = tier === 'full'
  return (
    <>
      <color attach="background" args={[colors.midnight]} />
      <fog attach="fog" args={[colors.midnight, FOG.near, FOG.far]} />
      <ambientLight intensity={0.4} color={colors.ivory} />
      <directionalLight position={[4, 6, 6]} intensity={1.1} color={colors.ivory} />
      <directionalLight position={[-6, -2, -4]} intensity={0.35} color={colors.coral} />

      <StudioEnvironment />

      <CameraRig still={still} />
      <PanelSystem still={still} />
      <Particles count={full ? 1700 : still ? 400 : 550} still={still} />
      {!still && (
        <>
          <ServicesRings lite={!full} />
          <ProcessPath />
          <Suspense fallback={null}>
            <GalleryWall />
          </Suspense>
          <Aurora />
        </>
      )}

      {full && (
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      )}
    </>
  )
}

export default function Experience({ tier, onFail }) {
  const wrap = useRef(null)
  const [ready, setReady] = useState(false)
  const still = tier === 'static'
  const [active, setActive] = useState(true)

  // Pause rendering when the canvas isn't visible (scrolled past / tab hidden).
  useEffect(() => {
    const target = still ? wrap.current : document.querySelector('.cm')
    let inView = true
    // Also pause while an opaque reading section (industries, FAQ…) fully covers the screen.
    const apply = () => setActive(inView && !document.hidden && !store.covered)
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      apply()
    })
    if (target) io.observe(target)
    document.addEventListener('visibilitychange', apply)
    window.addEventListener('scroll', apply, { passive: true })
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', apply)
      window.removeEventListener('scroll', apply)
    }
  }, [still])

  const frameloop = !active ? 'never' : still ? 'demand' : 'always'

  return (
    <div ref={wrap} className={`cm-webgl ${ready ? 'is-ready' : ''}`} aria-hidden="true">
      <Canvas
        frameloop={frameloop}
        dpr={[1, tier === 'full' ? 1.5 : 1.25]}
        gl={{ antialias: tier !== 'full', powerPreference: 'high-performance', alpha: false, stencil: false }}
        camera={{ fov: 42, near: 0.1, far: 60, position: [0, 0, 7.5] }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
        onCreated={({ gl, invalidate }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            onFail?.()
          })
          // Static mode renders on demand: give textures/env a moment, then settle.
          if (still) [100, 400, 1000, 2000].forEach((ms) => setTimeout(invalidate, ms))
          requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
        }}
      >
        <World tier={tier} />
      </Canvas>
    </div>
  )
}
