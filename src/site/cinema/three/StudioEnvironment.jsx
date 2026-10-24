import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Color, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, PMREMGenerator, RingGeometry, Scene } from 'three';
import { colors } from '../palette.js';

/**
 * Reflections for the metal panels, generated once from a few emissive "light cards".
 * Replaces an HDR download (and the HDR/EXR loaders) — a few lines of code instead of ~1MB.
 */
export default function StudioEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const env = new Scene();
    env.background = new Color(colors.midnight).multiplyScalar(0.4);
    const card = (geometry, color, intensity, position, scale) => {
      const mesh = new Mesh(
        geometry,
        new MeshBasicMaterial({ color: new Color(color).multiplyScalar(intensity), side: DoubleSide })
      );
      mesh.position.set(...position);
      mesh.scale.set(...scale);
      mesh.lookAt(0, 0, 0);
      env.add(mesh);
    };
    const plane = new PlaneGeometry();
    card(plane, colors.ivory, 1.6, [0, 5, 2], [10, 3, 1]);
    card(plane, colors.coral, 1.4, [-5, 0.5, -3], [1.2, 6, 1]);
    card(plane, colors.slate, 2, [5, -1, 1], [3, 5, 1]);
    card(new RingGeometry(0.7, 1, 48), colors.slate, 1.5, [0, 0, -6], [6, 6, 1]);

    const pmrem = new PMREMGenerator(gl);
    const target = pmrem.fromScene(env, 0.04);
    scene.environment = target.texture;

    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
      env.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose();
      });
    };
  }, [gl, scene]);

  return null;
}
