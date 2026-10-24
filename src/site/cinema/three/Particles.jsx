import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute } from 'three';
import { colors } from '../palette.js';
import { seeded } from './random.js';

const vertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.15 + aSeed * 40.0) * 0.25;
    p.y += cos(uTime * 0.12 + aSeed * 23.0) * 0.3;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float depth = -mv.z;
    // fade out with distance (like fog) and very close to the lens
    vAlpha = smoothstep(32.0, 8.0, depth) * smoothstep(0.4, 2.5, depth);
    vSeed = aSeed;
    gl_PointSize = uSize * uPixelRatio * (0.6 + aSeed) / max(depth, 0.1);
    gl_Position = projectionMatrix * mv;
  }
`;
const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uColorA, uColorB, step(0.72, vSeed));
    gl_FragColor = vec4(col, a * vAlpha * 0.75);
  }
`;

/** Dust drifting through the whole journey — gives depth & speed as the camera flies. */
export default function Particles({ count = 1600, still = false }) {
  const ref = useRef(null);
  const geometry = useMemo(() => {
    const rand = seeded(3);
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 26;
      pos[i * 3 + 1] = (rand() - 0.5) * 15;
      pos[i * 3 + 2] = 10 - rand() * 145;
      seed[i] = rand();
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new Float32BufferAttribute(seed, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 26 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      uColorA: { value: new Color(colors.ivory).multiplyScalar(0.8) },
      uColorB: { value: new Color(colors.coral).multiplyScalar(1.8) },
    }),
    []
  );

  useFrame((state) => {
    if (!still) uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
