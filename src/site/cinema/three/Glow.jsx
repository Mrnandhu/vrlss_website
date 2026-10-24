import { useMemo } from 'react';
import { AdditiveBlending, CanvasTexture, Color, SRGBColorSpace } from 'three';
import { colors } from '../palette.js';

let sharedTexture = null;
function glowTexture() {
  if (sharedTexture) return sharedTexture;
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.45)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.1)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  sharedTexture = new CanvasTexture(canvas);
  sharedTexture.colorSpace = SRGBColorSpace;
  return sharedTexture;
}

/** A soft additive light bloom drawn on a plane — cheap atmosphere, no post-processing needed. */
export default function Glow({ color = colors.coral, opacity = 0.4, scale = 6, ...props }) {
  const map = useMemo(glowTexture, []);
  const c = useMemo(() => new Color(color), [color]);
  return (
    <mesh scale={scale} {...props} renderOrder={-1}>
      <planeGeometry />
      <meshBasicMaterial
        map={map}
        color={c}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  );
}
