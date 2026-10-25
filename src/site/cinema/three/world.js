import { CatmullRomCurve3, Vector3 } from 'three'

/*
 * World layout. The camera flies down −Z; each scene owns a stretch of space.
 * Scroll position "s" comes from lib/store: s = i  ⇔  scene i's top is at the viewport top.
 *   0 hero · 1 at a glance · 2 capabilities · 3 process · 4 work · 5 reading band (industries, standards)
 *   6 pricing · 7 reading band (reviews, FAQ) · 8 final CTA
 * Reading bands are opaque, so the camera moves to the next shot unseen while they cover the screen.
 */
export const Z = {
  hero: 0,
  devices: -12,
  services: -34,
  work: -88,
  pricing: -110,
  end: -124,
}

export const FOG = { near: 10, far: 34 }

/** Hero object position (it sits to the right of the headline on wide screens). */
export const heroOrbPosition = (narrow) => (narrow ? new Vector3(0, 1.35, 0) : new Vector3(3.1, 0.05, -0.6))
export const endOrbPosition = () => new Vector3(0, 0.15, Z.end)
export const devicesPosition = () => new Vector3(0, 0, Z.devices)

/** The glowing path the camera follows through the Process section. */
export const processCurve = new CatmullRomCurve3(
  [
    new Vector3(-2.6, -0.8, -40),
    new Vector3(2.2, 0.3, -46),
    new Vector3(-2.1, 0.9, -52.5),
    new Vector3(2.5, -0.5, -59),
    new Vector3(-0.6, 0.4, -65),
    new Vector3(0.4, 0.1, -71),
  ],
  false,
  'catmullrom',
  0.4,
)
/** Curve parameter of each of the 4 process steps (they match the HTML step thresholds). */
export const processStepU = [0.125, 0.375, 0.625, 0.875]
/** The process section's sticky "hold" spans s ∈ [3, 3 + PROCESS_HOLD]. */
export const PROCESS_HOLD = 0.75

export const workLayout = (narrow) => {
  const cols = narrow ? 2 : 3
  const w = narrow ? 2.7 : 3.3
  const h = w / 1.5 // demo photos are 3:2
  const gx = w + (narrow ? 0.3 : 0.4)
  const gy = h + (narrow ? 0.35 : 0.45)
  const depth = [0.45, -0.55, 0.2, -0.35, 0.55, -0.2]
  return (count) =>
    Array.from({ length: count }, (_, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const rows = Math.ceil(count / cols)
      const x = (col - (cols - 1) / 2) * gx
      const y = ((rows - 1) / 2 - row) * gy
      return {
        position: new Vector3(x, y, Z.work + depth[i % depth.length] - x * x * 0.035),
        rotationY: -x * 0.045,
        width: w,
        height: h,
      }
    })
}

/**
 * Camera keyframes. pos/look are world points. Optional:
 *   fit    – minimum visible width (world units) at the look point; the camera backs off on narrow screens
 *   shiftX – move the subject right by this fraction of the visible width (leaves room for text on the left)
 *   shiftY – move the subject up by this fraction of the visible height
 *   frame  – 'hero' | 'glance': when the page has measured the free space beside the text for this
 *            screen, the camera fits the object into it instead (fit/shift above are the fallback)
 */
export function cameraKeys(narrow) {
  const v = (x, y, z) => new Vector3(x, y, z)
  const keys = []
  const k = (s, pos, look, opts = {}) => keys.push({ s, pos, look, ...opts })

  // 0 — Hero. `frame` = fit the object into the free space next to / above the text (see lib/safe.js).
  k(0, v(0, 0, 7.5), v(0, 0, 0), { ...(narrow ? { fit: 5.2, shiftY: 0.15 } : {}), frame: 'hero' })
  // 1 — Fly forward through the breaking object to the assembled browser + phone
  k(0.95, v(0.6, 0.35, -1.2), v(0, 0, Z.devices), narrow ? { fit: 6 } : {})
  k(1.38, v(0, 0.25, -4.2), v(0, 0, Z.devices), { ...(narrow ? { fit: 6, shiftY: 0.2 } : { fit: 11.5, shiftX: 0.17 }), frame: 'glance' })
  k(1.62, v(-1.2, 0.55, -4.8), v(0, 0, Z.devices), { ...(narrow ? { fit: 6, shiftY: 0.2 } : { fit: 11.5, shiftX: 0.17 }), frame: 'glance' })
  // 2 — Services (rings behind the HTML card row)
  k(2.02, v(0, 0, -22.5), v(0, 0, Z.services))
  k(2.66, v(0, -0.2, -24.5), v(0, 0, Z.services))
  // 3 — Process: ride along the glowing path
  const samples = 7
  for (let i = 0; i < samples; i++) {
    const u = i / (samples - 1)
    const p = processCurve.getPoint(u)
    const ahead = processCurve.getPoint(Math.min(1, u + 0.1))
    k(
      3 + u * PROCESS_HOLD,
      p.clone().add(narrow ? v(0.4, 2.4, 8.5) : v(0.6, 1.7, 5.4)),
      ahead,
      narrow ? { fit: 7.5, shiftY: 0.28 } : { shiftX: 0.14 },
    )
  }
  // 4 — Work: slow lateral dolly across the gallery wall
  if (narrow) {
    k(4.02, v(0, 1.5, Z.work + 8.5), v(0, 1.1, Z.work), { fit: 6.2, shiftY: 0 })
    k(4.62, v(0, -1.5, Z.work + 8.5), v(0, -1.1, Z.work), { fit: 6.2, shiftY: 0 })
    k(5, v(0, -1.6, Z.work + 8.8), v(0, -1.2, Z.work), { fit: 6.2, shiftY: 0 })
  } else {
    k(4.02, v(-2, 0.45, Z.work + 8.6), v(-1, 0.3, Z.work), { fit: 12.6 })
    k(4.62, v(2, 0.3, Z.work + 8.6), v(1, 0.3, Z.work), { fit: 12.6 })
    k(5, v(2.3, 0.3, Z.work + 8.9), v(1.2, 0.3, Z.work), { fit: 12.6 })
  }
  // 5 — (reading band) travel to the pricing space · 6 — Pricing
  k(6.02, v(0, 0.5, -99), v(0, 0, Z.pricing))
  k(6.7, v(0, 0.2, -105), v(0, 0, Z.end))
  k(7, v(0, 0.15, -105.6), v(0, 0, Z.end))
  // 7 — (reading band) · 8 — Final: close on the reassembling object, then pull back to reveal it
  k(7.7, v(0.8, 0.4, Z.end + 3.8), v(0, 0.15, Z.end))
  k(8.3, v(0, -0.6, Z.end + 12.5), v(0, -0.9, Z.end), narrow ? { fit: 6.6, shiftY: 0.15 } : { shiftY: 0.1 })
  k(9, v(0, -0.6, Z.end + 13), v(0, -0.9, Z.end), narrow ? { fit: 6.6, shiftY: 0.15 } : { shiftY: 0.1 })
  return keys
}
