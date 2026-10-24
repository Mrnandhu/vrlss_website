import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, Vignette, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { MathUtils, Vector3 } from 'three';
import { store } from '../lib/store.js';

const focus = new Vector3();

/** Desktop-only post-processing: bloom on coral highlights, depth of field in the gallery, vignette. */
export default function Effects() {
  const dof = useRef(null);

  useFrame(({ camera }) => {
    const effect = dof.current;
    if (!effect) return;
    // Depth of field fades in only around the Work gallery.
    const s = store.s;
    const weight = MathUtils.smoothstep(s, 3.75, 4.0) * (1 - MathUtils.smoothstep(s, 4.65, 4.95));
    effect.bokehScale = weight * 2.6;
    focus.set(store.focus.x, store.focus.y, store.focus.z);
    effect.cocMaterial.worldFocusDistance = camera.position.distanceTo(focus);
    effect.cocMaterial.worldFocusRange = 2;
  });

  return (
    <EffectComposer multisampling={4}>
      <DepthOfField ref={dof} worldFocusDistance={9} worldFocusRange={1.4} bokehScale={0} />
      <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.98} luminanceSmoothing={0.25} radius={0.72} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette offset={0.28} darkness={0.75} />
    </EffectComposer>
  );
}
