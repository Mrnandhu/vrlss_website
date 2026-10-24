import { Color, MeshStandardMaterial } from 'three';

/**
 * MeshStandardMaterial + a coral fresnel "edge light" and optional per-instance glow
 * (attribute aGlow: emissive boost of the instance colour; picked up by bloom).
 */
export function createRimMaterial({ rimColor, rimPower = 2.6, rimStrength = 1, instanceGlow = false, ...params }) {
  const material = new MeshStandardMaterial(params);
  const uniforms = {
    uRimColor: { value: new Color(rimColor) },
    uRimPower: { value: rimPower },
    uRimStrength: { value: rimStrength },
  };
  material.userData.uniforms = uniforms;
  if (instanceGlow) material.defines = { USE_INSTANCE_GLOW: '' };

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        #ifdef USE_INSTANCE_GLOW
          attribute float aGlow;
          varying float vGlow;
        #endif`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        #ifdef USE_INSTANCE_GLOW
          vGlow = aGlow;
        #endif`
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform vec3 uRimColor;
        uniform float uRimPower;
        uniform float uRimStrength;
        #ifdef USE_INSTANCE_GLOW
          varying float vGlow;
        #endif`
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float rim = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), uRimPower);
        totalEmissiveRadiance += uRimColor * rim * uRimStrength;
        #ifdef USE_INSTANCE_GLOW
          totalEmissiveRadiance += diffuseColor.rgb * vGlow;
        #endif`
      );
  };
  material.customProgramCacheKey = () => `rim${instanceGlow ? '-glow' : ''}`;
  return material;
}
