import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { colors } from '../palette.js'
import { store } from '../lib/store.js'
import { FOG } from './world.js'
import CameraRig from './CameraRig.jsx'
import StudioEnvironment from './StudioEnvironment.jsx'
import PanelSystem from './PanelSystem.jsx'
import DeviceScreens from './DeviceScreens.jsx'
import Particles from './Particles.jsx'
import ServicesRings from './ServicesRings.jsx'
import ProcessPath from './ProcessPath.jsx'
import GalleryWall from './GalleryWall.jsx'
import Aurora from './Aurora.jsx'
import Ocean from './ocean/Ocean.jsx'

// Post-processing is its own chunk and only ever loads on desktop.
const Effects = lazy(() => import('./Effects.jsx'))

// The scene is built in stages so the first frame comes quickly, even on slow phones:
//   0 – what the hero shows: ocean, sky, orb, camera, lights
//   1 – next frame: laptop/phone screens and the particles
//   2 – while the visitor reads: service rings, process path, gallery, pricing light, desktop effects
// Scrolling past the hero jumps straight to the last stage.
function World({ tier }) {
  const still = tier === 'static'
  const full = tier === 'full'
  const [stage, setStage] = useState(0)
  useEffect(() => {
    if (stage >= 2) return
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 60))
    const cic = window.cancelIdleCallback || clearTimeout
    let id = 0
    const raf = requestAnimationFrame(() => {
      id = ric(() => setStage((n) => Math.min(2, n + 1)), { timeout: stage === 0 ? 300 : 900 })
    })
    const onScroll = () => { if (store.s > 0.5) setStage(2) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      if (id) cic(id)
      window.removeEventListener('scroll', onScroll)
    }
  }, [stage])

  return (
    <>
      <color attach="background" args={[colors.midnight]} />
      <fog attach="fog" args={[colors.midnight, FOG.near, FOG.far]} />
      <ambientLight intensity={0.4} color={colors.ivory} />
      <directionalLight position={[4, 6, 6]} intensity={1.1} color={colors.ivory} />
      <directionalLight position={[-6, -2, -4]} intensity={0.35} color={colors.coral} />

      <StudioEnvironment />
      {/* The endless night ocean under everything (the moon lies ahead, the way the camera travels) */}
      <Ocean tier={tier} still={still} />

      <CameraRig still={still} />
      <PanelSystem still={still} />
      {stage >= 1 && (
        <>
          <DeviceScreens still={still} />
          <Particles count={full ? 1700 : still ? 400 : 300} still={still} />
        </>
      )}
      {stage >= 2 && !still && (
        <>
          <ServicesRings lite={!full} />
          <ProcessPath />
          <Suspense fallback={null}>
            <GalleryWall />
          </Suspense>
          <Aurora />
        </>
      )}

      {stage >= 2 && full && (
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
  // Render resolution. Phones start lower; if the frame rate drops, PerformanceMonitor lowers it further.
  const lite = tier !== 'full'
  const maxDpr = Math.min(window.devicePixelRatio || 1, lite ? 1 : 1.5)
  const [dpr, setDpr] = useState(maxDpr)
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

  // Tell the page the 3D scene is showing, so the SVG stand-in orb fades out (cinema.css).
  useEffect(() => {
    if (!ready) return
    const d = document.documentElement.dataset
    d.cm3d = 'on'
    return () => delete d.cm3d
  }, [ready])

  return (
    <div ref={wrap} className={`cm-webgl ${ready ? 'is-ready' : ''}`} aria-hidden="true">
      <Canvas
        frameloop={frameloop}
        dpr={dpr}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false, stencil: false }}
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
        <PerformanceMonitor
          flipflops={3}
          onDecline={() => setDpr((d) => Math.max(lite ? 0.6 : 0.75, +(d - 0.2).toFixed(2)))}
          onIncline={() => setDpr((d) => Math.min(maxDpr, +(d + 0.1).toFixed(2)))}
          onFallback={() => setDpr(lite ? 0.6 : 0.75)}
        />
        <World tier={tier} />
      </Canvas>
    </div>
  )
}
