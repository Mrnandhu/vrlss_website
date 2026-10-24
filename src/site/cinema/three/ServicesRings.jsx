import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, MathUtils } from 'three'
import { colors } from '../palette.js'
import { store } from '../lib/store.js'
import { createRimMaterial } from './rimMaterial.js'
import { Z } from './world.js'
import Glow from './Glow.jsx'

/** Light rings behind the service cards; they turn with the scroll, in step with the card row. */
export default function ServicesRings({ lite = false }) {
  const group = useRef(null)
  const shapes = useRef(null)
  const coral = useMemo(() => new Color(colors.coral).multiplyScalar(2), [])
  const metal = useMemo(
    () =>
      createRimMaterial({
        rimColor: colors.coral,
        rimPower: 2.5,
        rimStrength: 1.2,
        color: colors.slate,
        metalness: 0.6,
        roughness: 0.3,
      }),
    [],
  )

  useFrame((state) => {
    const local = MathUtils.clamp(store.s - 1.6, 0, 1.6)
    const t = state.clock.elapsedTime
    const g = group.current
    if (!g) return
    g.visible = store.s > 1.2 && store.s < 3.4
    if (!g.visible) return
    g.children[0].rotation.z = local * 1.4 + t * 0.03
    g.children[1].rotation.z = -local * 1.0 - t * 0.02
    g.children[2].rotation.z = local * 0.6
    if (shapes.current) {
      shapes.current.rotation.z = -local * 1.2
      shapes.current.children.forEach((m, i) => {
        m.rotation.x = t * 0.3 + i
        m.rotation.y = t * 0.2 + i * 2
      })
    }
  })

  return (
    <group ref={group} position={[0, 0, Z.services]}>
      <mesh rotation-x={0.25}>
        <torusGeometry args={[4.6, 0.014, 8, 200]} />
        <meshBasicMaterial color={coral} toneMapped={false} />
      </mesh>
      <mesh rotation-x={-0.2} rotation-y={0.3}>
        <torusGeometry args={[5.8, 0.008, 6, 200]} />
        <meshBasicMaterial color={colors.lightCoral} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh rotation-x={0.1}>
        <torusGeometry args={[7.2, 0.05, 8, 200]} />
        <meshStandardMaterial color={colors.slate} metalness={0.7} roughness={0.35} />
      </mesh>
      {!lite && (
        <group ref={shapes}>
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i / 6) * Math.PI * 2
            return (
              <mesh key={i} position={[Math.cos(a) * 5.2, Math.sin(a) * 3.2, -1]} material={metal}>
                <octahedronGeometry args={[0.32, 0]} />
              </mesh>
            )
          })}
        </group>
      )}
      <Glow position={[0, 0, -3]} scale={16} opacity={0.22} />
    </group>
  )
}
