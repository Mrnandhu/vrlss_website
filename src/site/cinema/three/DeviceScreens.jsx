import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { CanvasTexture, Color, MathUtils, Quaternion, SRGBColorSpace, TextureLoader, Vector3 } from 'three'
import { store } from '../lib/store.js'
import { deviceGroups } from './layouts.js'
import { devicesPosition } from './world.js'

/*
 * Real website screens on the assembled browser + phone.
 * The panels still fly in from the orb; once they lock into place the screenshots fade in on top,
 * drifting slowly down the page so the sites feel alive. Images live in /public/cinema/.
 */
const SRC = { desktop: '/cinema/screen-desktop.webp', phone: '/cinema/screen-phone.webp' }
// Screen rectangles in each device's local space (inside the frame, below the browser title bar / phone notch).
const BROWSER_SCREEN = { pos: [0, -0.16, 0.16], size: [4.28, 2.36], radius: 0.06 }
const PHONE_SCREEN = { pos: [0, -0.07, 0.13], size: [1.32, 2.66], radius: 0.16 }
const ASSEMBLE_END = 1.3
const SWITCH_TO_END = 6.2
const BRIGHT = 0.86 // stays under the bloom threshold so text stays crisp

function roundedAlpha(w, h, r) {
  const c = document.createElement('canvas')
  const k = 256 / Math.max(w, h)
  c.width = Math.round(w * k)
  c.height = Math.round(h * k)
  const g = c.getContext('2d')
  const rr = r * k
  g.fillStyle = '#000'
  g.fillRect(0, 0, c.width, c.height)
  g.fillStyle = '#fff'
  g.beginPath()
  g.roundRect(0, 0, c.width, c.height, rr)
  g.fill()
  return new CanvasTexture(c)
}

function useScreenTexture(url) {
  const gl = useThree((s) => s.gl)
  const [tex, setTex] = useState(null)
  useEffect(() => {
    let live = true
    let t
    new TextureLoader().load(url, (loaded) => {
      t = loaded
      t.colorSpace = SRGBColorSpace
      t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
      if (live) setTex(t)
      else t.dispose()
    })
    return () => {
      live = false
      t?.dispose()
    }
  }, [url, gl])
  return tex
}

function Screen({ group, spec, url, matRef }) {
  const map = useScreenTexture(url)
  const alpha = useMemo(() => roundedAlpha(spec.size[0], spec.size[1], spec.radius), [spec])
  useEffect(() => () => alpha.dispose(), [alpha])
  const t = useMemo(() => {
    const p = new Vector3(), q = new Quaternion(), s = new Vector3()
    group.decompose(p, q, s)
    return { p, q, s }
  }, [group])
  if (!map) return null
  return (
    <group position={t.p} quaternion={t.q} scale={t.s}>
      <mesh position={spec.pos} renderOrder={2}>
        <planeGeometry args={spec.size} />
        <meshBasicMaterial
          ref={matRef}
          userData={{ size: spec.size }}
          map={map}
          alphaMap={alpha}
          color={new Color(BRIGHT, BRIGHT, BRIGHT)}
          transparent
          opacity={0}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      {/* soft warm screen glow behind the glass */}
      <mesh position={[spec.pos[0], spec.pos[1], spec.pos[2] - 0.005]} renderOrder={1}>
        <planeGeometry args={[spec.size[0] + 0.08, spec.size[1] + 0.08]} />
        <meshBasicMaterial color="#d9b98c" transparent opacity={0} toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  )
}

export default function DeviceScreens({ still = false }) {
  const size = useThree((s) => s.size)
  const narrow = size.width / size.height < 0.85
  const groups = useMemo(() => deviceGroups(narrow), [narrow])
  const root = useRef(null)
  const desk = useRef(null)
  const phone = useRef(null)
  const base = useMemo(() => devicesPosition(), [])

  useFrame((state) => {
    const g = root.current
    if (!g) return
    const s = still ? 0 : store.s
    const time = still ? 14 : state.clock.elapsedTime
    const progress = MathUtils.smoothstep(s, 0.06, ASSEMBLE_END)
    const show = s > SWITCH_TO_END ? 0 : MathUtils.smoothstep(progress, 0.86, 1)
    g.visible = show > 0.001
    g.position.copy(base)
    g.position.y += Math.sin(time * 0.5) * 0.06 // same bob as the panels
    for (const m of [desk.current, phone.current]) {
      if (!m) continue
      m.opacity = show
      // slow scroll through the top of the page and back
      const img = m.map?.image
      if (img?.width) {
        // show the screen-shaped top part of the screenshot, then drift down the page and back
        const [pw, ph] = m.userData.size
        const frac = Math.min(1, img.width / img.height / (pw / ph))
        m.map.repeat.set(1, frac)
        m.map.offset.y = (1 - frac) * (0.5 + 0.5 * Math.cos(time * 0.3))
      }
    }
    // the glow planes are the second child of each screen group
    g.children.forEach((sg) => {
      const glow = sg.children?.[1]?.material
      if (glow) glow.opacity = show * 0.35
    })
  })

  return (
    <group ref={root} visible={false}>
      <Screen group={groups.browser} spec={BROWSER_SCREEN} url={SRC.desktop} matRef={desk} />
      <Screen group={groups.phone} spec={PHONE_SCREEN} url={SRC.phone} matRef={phone} />
    </group>
  )
}
