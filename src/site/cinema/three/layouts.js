import { Color, Euler, Matrix4, Object3D, Quaternion, Vector3 } from 'three';
import { colors } from '../palette.js';
import { seeded } from './random.js';

/*
 * The hero object is made of PANEL_COUNT thin rounded panels. Each panel has two "homes":
 *   orb     – tiles on a sphere (the abstract hero object)
 *   devices – a part of the browser window / phone mockup, or a floating chip around them
 * PanelSystem blends between the two as you scroll.
 */
export const PANEL_COUNT = 48;

const C = {
  navy: new Color(colors.navy),
  slate: new Color(colors.slate),
  coral: new Color(colors.coral),
  lightCoral: new Color(colors.lightCoral),
  ivory: new Color(colors.ivory),
  midnight: new Color(colors.midnight),
};

// [x, y, z, w, h, d, colour, glow]
const BROWSER = [
  [0, 0, 0, 4.4, 2.8, 0.08, 'slate', 0.08],
  [0, 1.22, 0.06, 4.4, 0.36, 0.05, 'navy', 0],
  [-1.95, 1.22, 0.11, 0.1, 0.1, 0.03, 'coral', 1.6],
  [-1.78, 1.22, 0.11, 0.1, 0.1, 0.03, 'lightCoral', 1.0],
  [-1.61, 1.22, 0.11, 0.1, 0.1, 0.03, 'ivory', 0.4],
  [0.15, 1.22, 0.11, 2.4, 0.17, 0.03, 'navy', 0],
  [0, 0.45, 0.08, 4.1, 0.98, 0.04, 'navy', 0],
  [-0.9, 0.66, 0.13, 2.0, 0.15, 0.03, 'ivory', 0.25],
  [-1.1, 0.42, 0.13, 1.6, 0.07, 0.02, 'ivory', 0.1],
  [-1.53, 0.16, 0.13, 0.7, 0.17, 0.03, 'coral', 1.3],
  [1.15, 0.45, 0.13, 1.4, 0.76, 0.03, 'lightCoral', 0.35],
  [-1.37, -0.58, 0.08, 1.3, 0.85, 0.04, 'navy', 0],
  [0, -0.58, 0.08, 1.3, 0.85, 0.04, 'navy', 0],
  [1.37, -0.58, 0.08, 1.3, 0.85, 0.04, 'navy', 0],
  [-1.37, -0.88, 0.12, 0.9, 0.06, 0.02, 'ivory', 0.12],
  [0, -0.88, 0.12, 0.9, 0.06, 0.02, 'ivory', 0.12],
  [1.37, -0.88, 0.12, 0.9, 0.06, 0.02, 'ivory', 0.12],
];

const PHONE = [
  [0, 0, 0, 1.45, 2.95, 0.1, 'slate', 0.08],
  [0, 1.33, 0.07, 0.42, 0.08, 0.03, 'midnight', 0],
  [0, 0.95, 0.07, 1.25, 0.5, 0.03, 'navy', 0],
  [-0.25, 1.0, 0.1, 0.6, 0.09, 0.02, 'ivory', 0.2],
  [0, 0.2, 0.07, 1.25, 0.85, 0.03, 'lightCoral', 0.3],
  [-0.1, -0.42, 0.08, 1.0, 0.07, 0.02, 'ivory', 0.1],
  [-0.25, -0.6, 0.08, 0.7, 0.07, 0.02, 'ivory', 0.1],
  [0, -0.95, 0.08, 1.05, 0.22, 0.03, 'coral', 1.3],
  [0, -1.3, 0.07, 1.25, 0.2, 0.03, 'navy', 0],
];

function groupMatrix(pos, rotY, scale) {
  return new Matrix4().compose(
    new Vector3(...pos),
    new Quaternion().setFromEuler(new Euler(0, rotY, 0)),
    new Vector3(scale, scale, scale)
  );
}

function partsToTransforms(parts, group) {
  return parts.map(([x, y, z, w, h, d, color, glow]) => {
    const m = new Matrix4().compose(new Vector3(x, y, z), new Quaternion(), new Vector3(w, h, d)).premultiply(group);
    const p = new Vector3();
    const q = new Quaternion();
    const s = new Vector3();
    m.decompose(p, q, s);
    return { p, q, s, color: C[color], glow };
  });
}

export function buildLayouts(narrow) {
  const rand = seeded(7);
  const browserGroup = narrow ? groupMatrix([0, 0.95, 0], 0.05, 0.9) : groupMatrix([-1.05, 0.12, 0], 0.14, 1);
  const phoneGroup = narrow ? groupMatrix([1.25, -1.05, 0.9], -0.25, 0.82) : groupMatrix([2.75, -0.15, 0.6], -0.32, 1);

  const devices = [...partsToTransforms(BROWSER, browserGroup), ...partsToTransforms(PHONE, phoneGroup)];

  // Remaining panels become small chips floating around the devices.
  while (devices.length < PANEL_COUNT) {
    const angle = rand() * Math.PI * 2;
    const rx = narrow ? 3.2 : 5.4;
    const ry = narrow ? 3.4 : 2.6;
    const p = new Vector3(Math.cos(angle) * rx * (0.85 + rand() * 0.4), Math.sin(angle) * ry * (0.8 + rand() * 0.4), -1.5 + rand() * 2.2);
    const size = 0.12 + rand() * 0.22;
    const coral = rand() < 0.3;
    devices.push({
      p,
      q: new Quaternion().setFromEuler(new Euler(rand() - 0.5, rand() - 0.5, rand() - 0.5)),
      s: new Vector3(size, size, 0.03),
      color: coral ? C.coral : rand() < 0.5 ? C.slate : C.navy,
      glow: coral ? 1.1 : 0,
      chip: true,
    });
  }

  // Orb: tiles on a Fibonacci sphere, facing outward.
  const dummy = new Object3D();
  const orb = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < PANEL_COUNT; i++) {
    const y = 1 - (i / (PANEL_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const radius = 1.5 * (1 + rand() * 0.14);
    dummy.position.set(Math.cos(th) * r * radius, y * radius, Math.sin(th) * r * radius);
    dummy.lookAt(0, 0, 0);
    dummy.rotateZ(rand() * Math.PI);
    const size = 0.6 * (0.85 + rand() * 0.35);
    orb.push({
      p: dummy.position.clone(),
      q: dummy.quaternion.clone(),
      s: new Vector3(size, size, 0.07),
      color: i % 5 === 0 ? C.slate : C.navy,
      glow: 0,
    });
  }

  // Per-panel motion params for the break-apart transition.
  const motion = Array.from({ length: PANEL_COUNT }, () => ({
    dir: new Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(),
    axis: new Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(),
    delay: rand() * 0.35,
    phase: rand() * Math.PI * 2,
  }));

  return { orb, devices, motion };
}
