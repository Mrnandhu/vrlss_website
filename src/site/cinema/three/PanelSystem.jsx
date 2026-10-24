import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, Euler, InstancedBufferAttribute, MathUtils, Matrix4, Quaternion, Vector3 } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { colors } from '../palette.js';
import { store } from '../lib/store.js';
import { createRimMaterial } from './rimMaterial.js';
import { buildLayouts, PANEL_COUNT } from './layouts.js';
import { devicesPosition, endOrbPosition, heroOrbPosition } from './world.js';
import Glow from './Glow.jsx';

const { clamp, smoothstep } = MathUtils;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Scroll windows for the two transitions.
const ASSEMBLE = [0.06, 1.3]; // orb → browser + phone
const SWITCH_TO_END = 6.2; // devices are far behind the camera by now
const REASSEMBLE = [7.45, 8.15]; // scattered → orb at the end of the journey

const tmp = {
  m: new Matrix4(),
  p: new Vector3(),
  q: new Quaternion(),
  s: new Vector3(),
  pa: new Vector3(),
  qa: new Quaternion(),
  sa: new Vector3(),
  pb: new Vector3(),
  qb: new Quaternion(),
  sb: new Vector3(),
  spin: new Quaternion(),
  orbQ: new Quaternion(),
  euler: new Euler(),
  c: new Color(),
};

export default function PanelSystem({ still = false }) {
  const mesh = useRef(null);
  const core = useRef(null);
  const size = useThree((st) => st.size);
  const narrow = size.width / size.height < 0.85;

  const layouts = useMemo(() => buildLayouts(narrow), [narrow]);
  const origin = useMemo(() => heroOrbPosition(narrow), [narrow]);
  const devicesAt = useMemo(devicesPosition, []);
  const endAt = useMemo(endOrbPosition, []);

  const geometry = useMemo(() => {
    const g = new RoundedBoxGeometry(1, 1, 1, 2, 0.06);
    g.setAttribute('aGlow', new InstancedBufferAttribute(new Float32Array(PANEL_COUNT), 1));
    return g;
  }, []);
  const material = useMemo(
    () =>
      createRimMaterial({
        rimColor: new Color(colors.coral).multiplyScalar(1.5),
        rimPower: 3.6,
        rimStrength: 0.75,
        instanceGlow: true,
        color: '#ffffff',
        metalness: 0.55,
        roughness: 0.32,
        envMapIntensity: 1.1,
      }),
    []
  );
  useEffect(() => () => (geometry.dispose(), material.dispose()), [geometry, material]);

  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m) return;
    const time = still ? 14 : state.clock.elapsedTime;
    const s = still ? 0 : store.s;
    const pr = pointer.current;
    const k = still ? 1 : 1 - Math.exp(-dt * 2.5);
    pr.x += ((still ? 0 : store.pointer.x) - pr.x) * k;
    pr.y += ((still ? 0 : store.pointer.y) - pr.y) * k;

    const endMode = s > SWITCH_TO_END;
    const t = endMode ? smoothstep(s, ...REASSEMBLE) : smoothstep(s, ...ASSEMBLE);
    const orbCenter = endMode ? endAt : origin;

    // Slow rotation + a tilt toward the cursor (mouse parallax).
    tmp.euler.set(0.35 - pr.y * 0.25, time * 0.12 + pr.x * 0.35, 0.18);
    tmp.orbQ.setFromEuler(tmp.euler);

    const glowAttr = geometry.attributes.aGlow;
    const { orb, devices, motion } = layouts;

    for (let i = 0; i < PANEL_COUNT; i++) {
      const mo = motion[i];
      const e = easeInOut(clamp((t - mo.delay) / (1 - 0.35), 0, 1));

      // Orb home (with a gentle breathing motion).
      const o = orb[i];
      const breathe = 1 + Math.sin(time * 0.8 + mo.phase) * 0.025;
      const orbP = tmp.p.copy(o.p).multiplyScalar(breathe).applyQuaternion(tmp.orbQ).add(orbCenter);
      const orbQ = tmp.q.copy(tmp.orbQ).multiply(o.q);

      if (!endMode) {
        // A = orb, B = device part
        tmp.pa.copy(orbP);
        tmp.qa.copy(orbQ);
        tmp.sa.copy(o.s);
        const d = devices[i];
        tmp.pb.copy(d.p).add(devicesAt);
        tmp.pb.y += Math.sin(time * 0.5) * 0.06 + (d.chip ? Math.sin(time * 0.7 + mo.phase) * 0.12 : 0);
        tmp.qb.copy(d.q);
        tmp.sb.copy(d.s);
        tmp.c.copy(o.color).lerp(d.color, e);
        glowAttr.array[i] = MathUtils.lerp(o.glow, d.glow, e);
      } else {
        // A = scattered around the end point (invisible), B = orb
        tmp.pa.copy(mo.dir).multiplyScalar(9).add(endAt);
        tmp.qa.copy(orbQ).multiply(tmp.spin.setFromAxisAngle(mo.axis, 3));
        tmp.sa.set(0.0001, 0.0001, 0.0001);
        tmp.pb.copy(orbP);
        tmp.qb.copy(orbQ);
        tmp.sb.copy(o.s);
        tmp.c.copy(o.color);
        glowAttr.array[i] = (1 - e) * 1.2;
      }

      // Blend, with an outward "explode" arc and a spin mid-flight.
      const arc = Math.sin(Math.PI * e);
      tmp.p.lerpVectors(tmp.pa, tmp.pb, e).addScaledVector(mo.dir, arc * 2.6);
      tmp.q.slerpQuaternions(tmp.qa, tmp.qb, e).multiply(tmp.spin.setFromAxisAngle(mo.axis, arc * 1.4));
      tmp.s.lerpVectors(tmp.sa, tmp.sb, e);
      tmp.m.compose(tmp.p, tmp.q, tmp.s);
      m.setMatrixAt(i, tmp.m);
      m.setColorAt(i, tmp.c);
    }
    m.instanceMatrix.needsUpdate = true;
    m.instanceColor.needsUpdate = true;
    glowAttr.needsUpdate = true;
    material.userData.uniforms.uRimStrength.value = endMode ? 0.75 : 0.75 - t * 0.3;

    // Glowing core + rings live at the orb centre; they shrink away as the orb breaks apart.
    const c = core.current;
    if (c) {
      const coreScale = endMode ? smoothstep(s, REASSEMBLE[0] + 0.3, REASSEMBLE[1]) : 1 - smoothstep(s, 0.02, 0.55);
      c.position.copy(orbCenter);
      c.scale.setScalar(Math.max(coreScale, 0.0001));
      c.visible = coreScale > 0.001;
      c.children[0].rotation.set(tmp.euler.x * 0.5, time * 0.3, 0);
      c.children[1].rotation.set(1.1 + Math.sin(time * 0.2) * 0.1, 0, time * 0.15);
      c.children[2].rotation.set(1.35, 0.4, -time * 0.1);
    }
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[geometry, material, PANEL_COUNT]} frustumCulled={false}>
        <instancedBufferAttribute attach="instanceColor" args={[new Float32Array(PANEL_COUNT * 3), 3]} />
      </instancedMesh>
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshStandardMaterial
            color={colors.navy}
            emissive={colors.coral}
            emissiveIntensity={2.2}
            roughness={0.4}
            metalness={0.2}
            flatShading
          />
        </mesh>
        <mesh>
          <torusGeometry args={[2.35, 0.012, 8, 160]} />
          <meshBasicMaterial color={new Color(colors.coral).multiplyScalar(2.2)} toneMapped={false} />
        </mesh>
        <mesh>
          <torusGeometry args={[2.7, 0.006, 6, 160]} />
          <meshBasicMaterial color={colors.lightCoral} transparent opacity={0.45} toneMapped={false} />
        </mesh>
        <pointLight color={colors.coral} intensity={10} distance={8} decay={2} position={[-1.2, 1.4, -1.8]} />
        <Glow position={[0, 0, -1.5]} scale={8} opacity={0.38} />
      </group>
    </>
  );
}
