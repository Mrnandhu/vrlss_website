import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3, MathUtils, Vector3 } from 'three';
import { store } from '../lib/store.js';
import { cameraKeys } from './world.js';

const UP = new Vector3(0, 1, 0);

/** Resolves the keyframes for the current viewport (fit + text-safe offsets) into two smooth splines. */
function buildRig(narrow, aspect, fov) {
  const keys = cameraKeys(narrow);
  const tanHalf = Math.tan(MathUtils.degToRad(fov / 2));
  const pos = [];
  const look = [];
  for (const key of keys) {
    const p = key.pos.clone();
    const l = key.look.clone();
    const dir = p.clone().sub(l);
    let dist = dir.length();
    dir.normalize();
    if (key.fit) {
      const need = key.fit / (2 * tanHalf * aspect);
      if (need > dist) {
        dist = need;
        p.copy(l).addScaledVector(dir, dist);
      }
    }
    if (key.shiftX || key.shiftY) {
      const H = 2 * tanHalf * dist;
      const W = H * aspect;
      const fwd = dir.clone().negate();
      const right = new Vector3().crossVectors(fwd, UP).normalize();
      const camUp = new Vector3().crossVectors(right, fwd);
      const off = right.multiplyScalar(-(key.shiftX || 0) * W).addScaledVector(camUp, -(key.shiftY || 0) * H);
      p.add(off);
      l.add(off);
    }
    pos.push(p);
    look.push(l);
  }
  return {
    s: keys.map((k) => k.s),
    pos: new CatmullRomCurve3(pos, false, 'centripetal'),
    look: new CatmullRomCurve3(look, false, 'centripetal'),
  };
}

function sample(rig, s, outPos, outLook) {
  const ks = rig.s;
  const n = ks.length;
  let u;
  if (s <= ks[0]) u = 0;
  else if (s >= ks[n - 1]) u = 1;
  else {
    let i = 0;
    while (i < n - 2 && s >= ks[i + 1]) i++;
    let t = (s - ks[i]) / (ks[i + 1] - ks[i]);
    // Ease in/out between distinct shots; dense path samples (process) stay linear so motion is continuous.
    const dense = ks[i + 1] - ks[i] < 0.2;
    if (!dense) t = t * t * (3 - 2 * t);
    u = (i + t) / (n - 1);
  }
  rig.pos.getPoint(u, outPos);
  rig.look.getPoint(u, outLook);
}

export default function CameraRig({ still = false }) {
  const camera = useThree((st) => st.camera);
  const size = useThree((st) => st.size);
  const aspect = size.width / size.height;
  const narrow = aspect < 0.85;
  const rig = useMemo(() => buildRig(narrow, aspect, camera.fov), [narrow, aspect, camera.fov]);

  const state = useRef({ init: false, pos: new Vector3(), look: new Vector3(), tPos: new Vector3(), tLook: new Vector3(), px: 0, py: 0 });

  useFrame((_, dt) => {
    const st = state.current;
    sample(rig, still ? 0 : store.s, st.tPos, st.tLook);

    if (still || !st.init || store.snap) {
      st.pos.copy(st.tPos);
      st.look.copy(st.tLook);
      st.init = true;
    } else {
      // Cinematic damping on top of Lenis' smoothing.
      const k = 1 - Math.exp(-Math.min(dt, 0.1) * 3.2);
      st.pos.lerp(st.tPos, k);
      st.look.lerp(st.tLook, k);
      const kp = 1 - Math.exp(-Math.min(dt, 0.1) * 2);
      st.px += (store.pointer.x - st.px) * kp;
      st.py += (store.pointer.y - st.py) * kp;
    }
    camera.position.copy(st.pos);
    camera.position.x += st.px * 0.32;
    camera.position.y += st.py * 0.2;
    camera.lookAt(st.look);
  });

  return null;
}
