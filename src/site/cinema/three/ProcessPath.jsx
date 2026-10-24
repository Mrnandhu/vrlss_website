import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, MathUtils, TubeGeometry } from 'three'
import { colors } from '../palette.js'
import { store } from '../lib/store.js'
import { processCurve, processStepU, PROCESS_HOLD } from './world.js'
import Glow from './Glow.jsx'

const SEGMENTS = 360
const RADIAL = 8

/** The glowing coral path: it draws itself ahead of the camera, lighting each step node as it passes. */
export default function ProcessPath() {
  const group = useRef(null)
  const lit = useRef(null)
  const head = useRef(null)
  const nodes = useRef([])

  const geometry = useMemo(() => new TubeGeometry(processCurve, SEGMENTS, 0.035, RADIAL, false), [])
  const coral = useMemo(() => new Color(colors.coral).multiplyScalar(2.6), [])
  const stepPoints = useMemo(() => processStepU.map((u) => processCurve.getPoint(u)), [])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    g.visible = store.s > 2.4 && store.s < 4.3
    if (!g.visible) return
    const p = MathUtils.clamp((store.s - 3) / PROCESS_HOLD, 0, 1)
    // Draw slightly ahead of the camera.
    const drawn = MathUtils.clamp(p + 0.12, 0, 1)
    const perSegment = RADIAL * 6
    lit.current.geometry.setDrawRange(0, Math.floor(drawn * SEGMENTS) * perSegment)
    processCurve.getPoint(drawn, head.current.position)

    const t = state.clock.elapsedTime
    nodes.current.forEach((node, i) => {
      if (!node) return
      const on = drawn >= processStepU[i] ? 1 : 0
      const target = on ? 1 + Math.sin(t * 2 + i) * 0.06 : 0.45
      node.scale.setScalar(MathUtils.lerp(node.scale.x, target, 0.08))
      node.children[1].rotation.z = t * 0.5 + i
    })
  })

  return (
    <group ref={group}>
      {/* faint full path */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color={colors.lightCoral} transparent opacity={0.22} toneMapped={false} depthWrite={false} />
      </mesh>
      {/* lit part */}
      <mesh ref={lit} geometry={geometry.clone()}>
        <meshBasicMaterial color={coral} toneMapped={false} />
      </mesh>
      <group ref={head}>
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color={coral} toneMapped={false} />
        </mesh>
        <Glow scale={2.2} opacity={0.8} />
      </group>
      {stepPoints.map((pt, i) => (
        <group key={i} position={pt} ref={(el) => (nodes.current[i] = el)} scale={0.45}>
          <mesh>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial color={colors.navy} emissive={colors.coral} emissiveIntensity={2.5} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.42, 0.012, 6, 64, Math.PI * 1.6]} />
            <meshBasicMaterial color={colors.lightCoral} toneMapped={false} />
          </mesh>
          <Glow scale={2.4} opacity={0.5} />
        </group>
      ))}
    </group>
  )
}
