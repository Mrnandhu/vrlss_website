import { Box3, Vector3 } from 'three'
import { deviceGroups } from './layouts.js'
import { devicesPosition, heroOrbPosition } from './world.js'

// The 3D objects that must stay clear of the text, with their size in world units.
//   hero   – the panel orb (tiles reach about 2 units from its centre)
//   glance – the assembled laptop browser + phone
const ORB_R = 2.15

function devicesBox(narrow) {
  const { browser, phone } = deviceGroups(narrow)
  const box = new Box3()
  const add = (m, w, h) => {
    for (const x of [-w / 2, w / 2]) for (const y of [-h / 2, h / 2]) for (const z of [-0.12, 0.16]) box.expandByPoint(new Vector3(x, y, z).applyMatrix4(m))
  }
  add(browser, 4.4, 2.8)
  add(phone, 1.45, 2.95)
  box.translate(devicesPosition())
  return box
}

/** Width:height of each object on screen. lib/safe.js keeps a copy of these numbers (wide 2.14, narrow 0.89). */
export function subjectAspect(name, narrow) {
  if (name === 'hero') return 1
  const s = devicesBox(narrow).getSize(new Vector3())
  return s.x / s.y
}

/** Centre, half-width, half-height (world units) and the closest the camera should come. */
export function subjectBounds(name, narrow) {
  if (name === 'hero') return { center: heroOrbPosition(narrow), hx: ORB_R, hy: ORB_R, minDist: 6.2 }
  const box = devicesBox(narrow)
  const c = box.getCenter(new Vector3())
  const s = box.getSize(new Vector3())
  return { center: c, hx: s.x / 2 + 0.08, hy: s.y / 2 + 0.1, minDist: 5.2 }
}
