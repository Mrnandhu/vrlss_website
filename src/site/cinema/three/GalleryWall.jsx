import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Color, MathUtils, SRGBColorSpace } from 'three'
import { colors } from '../palette.js'
import { work } from '../content'
import { store } from '../lib/store.js'
import { workLayout } from './world.js'

/** 3D wall of live demo photos with hover zoom; clicking a panel opens that demo. */
export default function GalleryWall() {
  const size = useThree((s) => s.size)
  const gl = useThree((s) => s.gl)
  const narrow = size.width / size.height < 0.85
  const items = work.items
  const layout = useMemo(() => workLayout(narrow)(items.length), [narrow, items.length])
  const textures = useTexture(items.map((i) => i.image))
  useMemo(() => {
    const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy())
    textures.forEach((t) => {
      t.colorSpace = SRGBColorSpace
      t.anisotropy = aniso
    })
  }, [textures, gl])

  const group = useRef(null)
  const frames = useRef([])
  const hovered = useRef(-1)
  const coral = useMemo(() => new Color(colors.coral).multiplyScalar(2.2), [])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    g.visible = store.s > 3.5 && store.s < 5.6
    if (!g.visible) return
    const active = hovered.current >= 0 ? hovered.current : store.workHover
    const k = 1 - Math.exp(-dt * 6)
    let nearest = 0
    let best = Infinity
    frames.current.forEach((f, i) => {
      if (!f) return
      const on = i === active
      const L = layout[i]
      f.scale.setScalar(MathUtils.lerp(f.scale.x, on ? 1.07 : 1, k))
      f.position.z = MathUtils.lerp(f.position.z, L.position.z + (on ? 0.5 : 0), k)
      const border = f.children[0].material
      border.opacity = MathUtils.lerp(border.opacity, on ? 1 : 0.0, k)
      // nearest panel to the camera's line of sight
      const dx = L.position.x - state.camera.position.x
      const dy = L.position.y - state.camera.position.y
      const d = dx * dx + dy * dy * 1.5
      if (d < best) {
        best = d
        nearest = i
      }
    })
    const target = frames.current[active >= 0 ? active : nearest]
    if (target) {
      const f = store.focus
      f.x = MathUtils.lerp(f.x, target.position.x, k)
      f.y = MathUtils.lerp(f.y, target.position.y, k)
      f.z = MathUtils.lerp(f.z, target.position.z, k)
    }
  })

  const over = (i) => (e) => {
    e.stopPropagation()
    hovered.current = i
    document.body.style.cursor = 'pointer'
  }
  const out = (i) => () => {
    if (hovered.current === i) hovered.current = -1
    document.body.style.cursor = ''
  }
  const click = (i) => (e) => {
    e.stopPropagation()
    document.body.style.cursor = ''
    store.navigate(items[i].path)
  }

  return (
    <group ref={group}>
      {layout.map((L, i) => (
        <group key={i} position={L.position} rotation-y={L.rotationY} ref={(el) => (frames.current[i] = el)}>
          {/* coral hover border */}
          <mesh position-z={-0.1}>
            <planeGeometry args={[L.width + 0.12, L.height + 0.12]} />
            <meshBasicMaterial color={coral} transparent opacity={0} toneMapped={false} depthWrite={false} />
          </mesh>
          {/* frame */}
          <mesh position-z={-0.05}>
            <boxGeometry args={[L.width + 0.06, L.height + 0.06, 0.06]} />
            <meshStandardMaterial color={colors.navy} metalness={0.6} roughness={0.35} />
          </mesh>
          {/* screenshot */}
          <mesh onPointerOver={over(i)} onPointerOut={out(i)} onClick={click(i)}>
            <planeGeometry args={[L.width, L.height]} />
            <meshBasicMaterial map={textures[i]} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
