import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BackSide, Color, PlaneGeometry, ShaderMaterial, SphereGeometry, Vector3, Vector4 } from 'three'
import { OCEAN, oceanVertex, oceanFragment, skyVertex, skyFragment } from './shaders.js'

/**
 * The endless night ocean and its sky. Both follow the camera, so wherever the page scroll takes
 * the camera, there is always sea to the horizon and the moon ahead.
 *   tier "full": finer waves mesh · "lite" (phones): lighter mesh · still: waves frozen
 */
export default function Ocean({ tier = 'full', still = false }) {
  const water = useRef(null)
  const sky = useRef(null)
  const seg = tier === 'full' ? 200 : 110
  const cell = OCEAN.size / seg

  const { waterGeo, skyGeo, waterMat, skyMat } = useMemo(() => {
    const C = (k) => new Color(OCEAN.colors[k])
    const shared = {
      uSkyTop: { value: C('skyTop') },
      uHorizon: { value: C('horizon') },
      uHaze: { value: C('haze') },
      uMoon: { value: C('moon') },
      uMoonDir: { value: new Vector3(...OCEAN.moonDir).normalize() },
    }
    const g = new PlaneGeometry(OCEAN.size, OCEAN.size, seg, seg)
    g.rotateX(-Math.PI / 2)
    return {
      waterGeo: g,
      skyGeo: new SphereGeometry(150, 40, 20),
      waterMat: new ShaderMaterial({
        vertexShader: oceanVertex,
        fragmentShader: oceanFragment,
        fog: false,
        uniforms: {
          ...shared,
          uTime: { value: 4 },
          uWaves: { value: OCEAN.waves.map((w) => new Vector4(...w)) },
          uDeep: { value: C('deep') },
          uCrest: { value: C('crest') },
          uFar: { value: OCEAN.size * 0.45 },
        },
      }),
      skyMat: new ShaderMaterial({ vertexShader: skyVertex, fragmentShader: skyFragment, side: BackSide, depthWrite: false, fog: false, uniforms: shared }),
    }
  }, [seg])
  useEffect(() => () => (waterGeo.dispose(), skyGeo.dispose(), waterMat.dispose(), skyMat.dispose()), [waterGeo, skyGeo, waterMat, skyMat])

  useFrame(({ camera, clock }) => {
    const w = water.current
    const s = sky.current
    if (!w || !s) return
    // Snap to the mesh grid so the waves never "swim" as the water follows the camera.
    w.position.set(Math.round(camera.position.x / cell) * cell, OCEAN.level, Math.round(camera.position.z / cell) * cell)
    s.position.copy(camera.position)
    if (!still) waterMat.uniforms.uTime.value = clock.elapsedTime + 4
  })

  return (
    <>
      <mesh ref={sky} geometry={skyGeo} material={skyMat} renderOrder={-1} frustumCulled={false} />
      <mesh ref={water} geometry={waterGeo} material={waterMat} frustumCulled={false} />
    </>
  )
}
