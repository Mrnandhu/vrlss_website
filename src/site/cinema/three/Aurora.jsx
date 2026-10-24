import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { colors } from '../palette.js';
import { store } from '../lib/store.js';
import { Z } from './world.js';
import Glow from './Glow.jsx';

/** Calm space behind the pricing cards: drifting coral/slate light and a horizon ring. */
export default function Aurora() {
  const group = useRef(null);
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.visible = store.s > 5.4 && store.s < 8.4;
    if (!g.visible) return;
    const t = state.clock.elapsedTime;
    g.children[0].position.x = Math.sin(t * 0.07) * 3 - 3;
    g.children[1].position.x = Math.cos(t * 0.05) * 3 + 3;
    g.children[3].rotation.z = t * 0.02;
  });
  return (
    <group ref={group} position={[0, 0, Z.pricing]}>
      <Glow color={colors.coral} scale={20} opacity={0.18} position={[-3, 1, 0]} />
      <Glow color={colors.slate} scale={26} opacity={0.6} position={[3, -1.5, -1]} />
      <Glow color={colors.lightCoral} scale={10} opacity={0.1} position={[0, 2.5, 1]} />
      <mesh rotation-x={Math.PI / 2.3} position={[0, -2.6, -2]}>
        <torusGeometry args={[9, 0.01, 6, 220]} />
        <meshBasicMaterial color={colors.lightCoral} transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}
