// Endless night ocean: shaders shared by Ocean.jsx (the site) and the preview page.
// Colours follow the site palette: midnight / navy water and sky, a beige moon and moonlight path.

export const OCEAN = {
  level: -4.2, // water height in world units (everything floats above the highest wave crests, about +1)
  size: 240, // the water plane follows the camera, so it never ends
  colors: {
    deep: '#08101f',
    crest: '#2c3d5e',
    skyTop: '#060b17',
    horizon: '#25304a',
    haze: '#5a5560',
    moon: '#eed9b8',
  },
  // Direction from the viewer toward the moon: ahead (−Z, the way the camera travels), a little up and right.
  moonDir: [0.1, 0.15, -1],
  // Gerstner waves: [direction x, direction z, steepness, wavelength]
  waves: [
    [1.0, 0.35, 0.12, 30.0],
    [0.55, 1.0, 0.1, 17.0],
    [-0.7, 0.85, 0.08, 9.0],
    [0.9, -0.4, 0.06, 4.8],
  ],
}

export const oceanVertex = /* glsl */ `
uniform float uTime;
uniform vec4 uWaves[4];
varying vec3 vWorld;
varying vec3 vNormal;
varying float vCrest;

vec3 gerstner(vec4 w, vec3 p, inout vec3 tangent, inout vec3 binormal) {
  float k = 6.2831853 / w.w;
  float c = sqrt(9.8 / k) * 0.55;
  vec2 d = normalize(w.xy);
  float f = k * (dot(d, p.xz) - c * uTime);
  float a = w.z / k;
  float s = w.z * sin(f);
  float co = w.z * cos(f);
  tangent += vec3(-d.x * d.x * s, d.x * co, -d.x * d.y * s);
  binormal += vec3(-d.x * d.y * s, d.y * co, -d.y * d.y * s);
  return vec3(d.x * a * cos(f), a * sin(f), d.y * a * cos(f));
}

void main() {
  vec3 p = (modelMatrix * vec4(position, 1.0)).xyz;
  vec3 t = vec3(1.0, 0.0, 0.0);
  vec3 b = vec3(0.0, 0.0, 1.0);
  vec3 o = p;
  for (int i = 0; i < 4; i++) o += gerstner(uWaves[i], p, t, b);
  vNormal = normalize(cross(b, t));
  vCrest = o.y - p.y;
  vWorld = o;
  gl_Position = projectionMatrix * viewMatrix * vec4(o, 1.0);
}
`

export const oceanFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uDeep;
uniform vec3 uCrest;
uniform vec3 uSkyTop;
uniform vec3 uHorizon;
uniform vec3 uHaze;
uniform vec3 uMoon;
uniform vec3 uMoonDir;
uniform float uFar;
varying vec3 vWorld;
varying vec3 vNormal;
varying float vCrest;

void main() {
  // fine ripples on top of the big waves (fade out with distance so the horizon stays calm)
  float dist = length(vWorld.xz - cameraPosition.xz);
  float near = 1.0 - smoothstep(8.0, 45.0, dist);
  vec2 q = vWorld.xz;
  vec3 rip = vec3(
    sin(q.x * 1.7 + uTime * 1.3) * 0.5 + sin(q.x * 3.1 - q.y * 2.3 + uTime * 1.9) * 0.35,
    0.0,
    cos(q.y * 1.9 - uTime * 1.1) * 0.5 + cos(q.y * 3.7 + q.x * 1.3 + uTime * 2.1) * 0.35
  ) * 0.09 * near;
  vec3 n = normalize(vNormal + rip);

  vec3 v = normalize(cameraPosition - vWorld);
  vec3 r = reflect(-v, n);
  float fres = pow(1.0 - max(dot(n, v), 0.0), 5.0);

  // reflected sky: horizon haze below, dark sky above
  vec3 sky = mix(uHorizon, uSkyTop, smoothstep(0.0, 0.45, r.y));
  vec3 col = mix(uDeep, sky, clamp(0.06 + fres * 0.9, 0.0, 1.0));
  col += uCrest * smoothstep(0.1, 0.9, vCrest) * 0.35;

  // the moonlight path: a sharp glint plus a wide soft sheen
  vec3 m = normalize(uMoonDir);
  float rm = max(dot(r, m), 0.0);
  col += uMoon * (pow(rm, 320.0) * 1.9 + pow(rm, 30.0) * 0.16 + pow(rm, 6.0) * 0.035);

  // distance haze toward the horizon (the sea never shows an edge)
  float fog = smoothstep(uFar * 0.25, uFar, dist);
  vec3 horizon = mix(uHorizon, uHaze, pow(max(dot(normalize(vec3(-v.x, 0.0, -v.z)), normalize(vec3(m.x, 0.0, m.z))), 0.0), 12.0) * 0.45);
  col = mix(col, horizon, fog);

  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

export const skyVertex = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz - cameraPosition);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`

export const skyFragment = /* glsl */ `
uniform vec3 uSkyTop;
uniform vec3 uHorizon;
uniform vec3 uHaze;
uniform vec3 uMoon;
uniform vec3 uMoonDir;
varying vec3 vDir;

void main() {
  vec3 d = normalize(vDir);
  vec3 m = normalize(uMoonDir);
  float h = clamp(d.y, -0.2, 1.0);
  vec3 col = mix(uHorizon, uSkyTop, smoothstep(-0.02, 0.5, h));
  // warm haze around the moon, strongest near the horizon
  float toward = max(dot(d, m), 0.0);
  col = mix(col, uHaze, pow(toward, 8.0) * 0.55 * (1.0 - smoothstep(0.0, 0.6, h)));
  // the moon: a soft disc with a glow
  float disc = smoothstep(0.99935, 0.99965, toward);
  col += uMoon * (disc * 1.15 + pow(toward, 400.0) * 0.5 + pow(toward, 40.0) * 0.12);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`
