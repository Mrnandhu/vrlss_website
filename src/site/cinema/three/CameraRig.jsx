import { useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { CatmullRomCurve3, MathUtils, Vector3 } from 'three'
import { store } from '../lib/store.js'
import { cameraKeys } from './world.js'
import { subjectBounds } from './subjects.js'

const UP = new Vector3(0, 1, 0)

/**
 * Places the camera so `subj` fills the free rectangle `r` (viewport fractions) with some breathing room,
 * keeping the key's designed viewing angle.
 */
function frameSubject(key, aspect, tanHalf, subj, r) {
  const dir = key.pos.clone().sub(key.look).normalize()
  const M = 0.84 // room for perspective, the mouse parallax and the idle motion
  const fw = Math.max(0.05, r.x1 - r.x0)
  const fh = Math.max(0.05, r.y1 - r.y0)
  const dist = Math.max(subj.minDist, subj.hx / (fw * M * tanHalf * aspect), subj.hy / (fh * M * tanHalf))
  const look = subj.center.clone()
  const pos = look.clone().addScaledVector(dir, dist)
  const H = 2 * tanHalf * dist
  const W = H * aspect
  const fwd = dir.clone().negate()
  const right = new Vector3().crossVectors(fwd, UP).normalize()
  const camUp = new Vector3().crossVectors(right, fwd)
  const off = right.multiplyScalar(-((r.x0 + r.x1) / 2 - 0.5) * W).addScaledVector(camUp, ((r.y0 + r.y1) / 2 - 0.5) * H)
  return { pos: pos.add(off), look: look.add(off) }
}

/** Resolves the keyframes for the current viewport (fit + text-safe offsets) into two smooth splines. */
function buildRig(narrow, aspect, fov, safe) {
  const keys = cameraKeys(narrow)
  const tanHalf = Math.tan(MathUtils.degToRad(fov / 2))
  const pos = []
  const look = []
  for (const key of keys) {
    const rect = key.frame && safe && safe[key.frame]
    if (rect) {
      const f = frameSubject(key, aspect, tanHalf, subjectBounds(key.frame, narrow), rect)
      pos.push(f.pos)
      look.push(f.look)
      continue
    }
    const p = key.pos.clone()
    const l = key.look.clone()
    const dir = p.clone().sub(l)
    let dist = dir.length()
    dir.normalize()
    if (key.fit) {
      const need = key.fit / (2 * tanHalf * aspect)
      if (need > dist) {
        dist = need
        p.copy(l).addScaledVector(dir, dist)
      }
    }
    if (key.shiftX || key.shiftY) {
      const H = 2 * tanHalf * dist
      const W = H * aspect
      const fwd = dir.clone().negate()
      const right = new Vector3().crossVectors(fwd, UP).normalize()
      const camUp = new Vector3().crossVectors(right, fwd)
      const off = right.multiplyScalar(-(key.shiftX || 0) * W).addScaledVector(camUp, -(key.shiftY || 0) * H)
      p.add(off)
      l.add(off)
    }
    pos.push(p)
    look.push(l)
  }
  return {
    s: keys.map((k) => k.s),
    pos: new CatmullRomCurve3(pos, false, 'centripetal'),
    look: new CatmullRomCurve3(look, false, 'centripetal'),
  }
}

function sample(rig, s, outPos, outLook) {
  const ks = rig.s
  const n = ks.length
  let u
  if (s <= ks[0]) u = 0
  else if (s >= ks[n - 1]) u = 1
  else {
    let i = 0
    while (i < n - 2 && s >= ks[i + 1]) i++
    let t = (s - ks[i]) / (ks[i + 1] - ks[i])
    // Ease in/out between distinct shots; dense path samples (process) stay linear so motion is continuous.
    const dense = ks[i + 1] - ks[i] < 0.2
    if (!dense) t = t * t * (3 - 2 * t)
    u = (i + t) / (n - 1)
  }
  rig.pos.getPoint(u, outPos)
  rig.look.getPoint(u, outLook)
}

export default function CameraRig({ still = false }) {
  const camera = useThree((st) => st.camera)
  const size = useThree((st) => st.size)
  const aspect = size.width / size.height
  const narrow = aspect < 0.85
  // Free space beside the text, measured by the page (lib/safe.js); rebuild the path when it changes.
  const [safe, setSafe] = useState(store.safe)
  const rig = useMemo(() => buildRig(narrow, aspect, camera.fov, safe), [narrow, aspect, camera.fov, safe])

  const state = useRef({
    init: false,
    pos: new Vector3(),
    look: new Vector3(),
    tPos: new Vector3(),
    tLook: new Vector3(),
    px: 0,
    py: 0,
  })

  useFrame((_, dt) => {
    if (store.safe !== safe) setSafe(store.safe)
    const st = state.current
    sample(rig, still ? 0 : store.s, st.tPos, st.tLook)

    if (still || !st.init || store.snap) {
      st.pos.copy(st.tPos)
      st.look.copy(st.tLook)
      st.init = true
    } else {
      // Cinematic damping on top of Lenis' smoothing.
      const k = 1 - Math.exp(-Math.min(dt, 0.1) * 3.2)
      st.pos.lerp(st.tPos, k)
      st.look.lerp(st.tLook, k)
      const kp = 1 - Math.exp(-Math.min(dt, 0.1) * 2)
      st.px += (store.pointer.x - st.px) * kp
      st.py += (store.pointer.y - st.py) * kp
    }
    camera.position.copy(st.pos)
    camera.position.x += st.px * 0.32
    camera.position.y += st.py * 0.2
    camera.lookAt(st.look)
  })

  return null
}
