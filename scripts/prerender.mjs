// Runs after `vite build` and the SSR build. Writes one real HTML file per route
// (title, description, canonical, Open Graph, JSON-LD and full page content),
// plus sitemap.xml and robots.txt. This is what makes the site crawlable.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

const entry = readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f))
if (!entry) throw new Error('SSR bundle not found in dist-ssr')
const { render, routes } = await import(pathToFileURL(resolve(ssrDir, entry)).href)
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const SITE = 'https://vrlss.in'

// The site styles live in a lazily loaded chunk. Link them in the HTML so the
// prerendered page is styled on first paint instead of flashing unstyled.
let cssLinks = ''
try {
  let manifest = {}
  try { manifest = JSON.parse(readFileSync(resolve(dist, '.vite', 'manifest.json'), 'utf8')) } catch {}
  const key = Object.keys(manifest).find((k) => k.endsWith('src/site/App.jsx'))
  const files = new Set()
  const walk = (k) => {
    const m = manifest[k]
    if (!m) return
    ;(m.css || []).forEach((f) => files.add(f))
    ;(m.imports || []).forEach(walk)
  }
  if (key) walk(key)
  // Safety net: also include any built CSS file that holds the site's own styles.
  for (const f of readdirSync(resolve(dist, 'assets'))) {
    if (!f.endsWith('.css')) continue
    const css = readFileSync(resolve(dist, 'assets', f), 'utf8')
    if (css.includes('.nx-header') && css.includes('.nx-hv')) files.add('assets/' + f)
  }
  // Inline the CSS: one request fewer before first paint (big win on slow mobile networks).
  cssLinks = [...files]
    .map((f) => {
      const css = readFileSync(resolve(dist, f), 'utf8')
      return css.length < 400000 && !/<\/style/i.test(css) ? `<style data-inline="${f}">${css}</style>` : `<link rel="stylesheet" href="/${f}">`
    })
    .join('\n    ')
} catch (e) {
  console.warn('CSS lookup failed, CSS not linked in HTML:', e.message)
}

// The 3D scene's files (loaded on the visitor's first interaction). The home page lists them so it can
// download them in the background after load and show the 3D instantly (src/site/cinema/lib/prefetch.js).
let cm3d = []
try {
  const manifest = JSON.parse(readFileSync(resolve(dist, '.vite', 'manifest.json'), 'utf8'))
  const appFiles = new Set()
  const walkApp = (k) => {
    const m = manifest[k]
    if (!m || appFiles.has(m.file)) return
    appFiles.add(m.file)
    ;(m.imports || []).forEach(walkApp)
  }
  Object.keys(manifest).filter((k) => manifest[k].isEntry || k.endsWith('src/site/App.jsx')).forEach(walkApp)
  const seen = new Set()
  const walk = (k) => {
    const m = manifest[k]
    if (!m || seen.has(k)) return
    seen.add(k)
    if (!appFiles.has(m.file)) cm3d.push('/' + m.file)
    ;(m.imports || []).forEach(walk)
    ;(m.dynamicImports || []).forEach(walk)
  }
  const key = Object.keys(manifest).find((k) => k.endsWith('src/site/cinema/three/Experience.jsx'))
  if (key) walk(key)
} catch (e) {
  console.warn('3D file list not found:', e.message)
}
console.log('3D files prefetched on the home page:', cm3d.join(', ') || 'NONE')
const cm3dScript = cm3d.length ? `<script>window.__cm3d=${JSON.stringify(cm3d)}</script>` : ''

console.log('css linked in HTML:', [...cssLinks.matchAll(/data-inline="([^"]+)"|href="([^"]+\.css)"/g)].map((m) => m[1] || m[2]).join(', ') || 'NONE')
for (const r of routes) {
  const { html, head } = render(r.path)
  const lang = r.lang || 'en'
  const page = template.replace('<html lang="en">', `<html lang="${lang}">`).replace('<!--app-head-->', cssLinks + '\n    ' + head + (r.path === '/' ? cm3dScript : '')).replace('<!--app-html-->', html)
  const out = r.path === '/' ? resolve(dist, 'index.html') : resolve(dist, r.path.slice(1), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, page)
  console.log('prerendered', r.path)
}

const today = new Date().toISOString().slice(0, 10)
const PRIORITY = { '/': '1.0', '/websites': '0.9', '/digital-marketing': '0.9', '/pricing': '0.9', '/start': '0.9', '/work': '0.8', '/about': '0.7', '/contact': '0.7', '/blog': '0.7' }
const xmlEsc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const loc = (p) => `${SITE}${p === '/' ? '/' : p}`
// photo for a page, if the page is an industry demo that has one
const photoFor = (r) => {
  const m = r.path.match(/^\/work\/websites\/([^/]+)$/)
  if (!m) return null
  try {
    const src = readFileSync(resolve(root, 'src/site/demos/industries.js'), 'utf8')
    const hit = src.match(new RegExp(`slug: '${m[1]}'[^}]*?img: '([a-z-]+)'`))
    return hit ? `${SITE}/assets/photos/${hit[1]}.webp` : null
  } catch { return null }
}
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  routes
    .filter((r) => !r.noindex)
    .map((r) => {
      const url = loc(r.path)
      const pri = PRIORITY[r.path] || (r.path.startsWith('/web-design/') ? '0.8' : r.path === '/sitemap' || ['/privacy', '/terms', '/refunds'].includes(r.path) ? '0.3' : '0.6')
      const alts = r.alternates
        ? [...r.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${loc(a.path)}"/>`), `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(r.alternates[0].path)}"/>`]
        : [`    <xhtml:link rel="alternate" hreflang="${r.lang || 'en'}" href="${url}"/>`]
      const img = r.path === '/' ? `${SITE}/og-image.jpg` : r.image || photoFor(r)
      return [
        '  <url>',
        `    <loc>${xmlEsc(url)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${r.path === '/' || r.path === '/work' || r.path === '/blog' ? 'weekly' : 'monthly'}</changefreq>`,
        `    <priority>${pri}</priority>`,
        ...alts,
        ...(img ? [`    <image:image><image:loc>${img}</image:loc><image:title>${xmlEsc(r.h1 || r.title)}</image:title></image:image>`] : []),
        '  </url>',
      ].join('\n')
    })
    .join('\n') +
  `\n</urlset>\n`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
writeFileSync(
  resolve(dist, 'robots.txt'),
  [
    'User-agent: *',
    'Allow: /',
    'Disallow: /preview/',
    'Disallow: /studio/',
    '',
    '# AI and answer-engine crawlers are welcome to read the public pages',
    ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'].flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${SITE}/sitemap.xml`,
    '',
  ].join('\n'),
)

// llms.txt: a plain summary for AI search tools
const section = (title, test) =>
  `## ${title}\n` + routes.filter((r) => !r.noindex).filter(test).map((r) => `- [${r.crumb || 'Home'}](${SITE}${r.path === '/' ? '/' : r.path}): ${r.description}`).join('\n') + '\n'
writeFileSync(
  resolve(dist, 'llms.txt'),
  `# Vrlss\n\n> Vrlss is a founder-led web studio in Andhra Pradesh, India, building websites, web apps, mobile apps and digital marketing for businesses worldwide, with fixed prices shown in the visitor's currency.\n\n` +
    section('Main pages', (r) => !r.path.startsWith('/work/')) +
    '\n' +
    section('Live demos', (r) => r.path.startsWith('/work/') && !r.path.startsWith('/work/websites/')) +
    '\n' +
    section('Industry website demos', (r) => r.path.startsWith('/work/websites/')),
)

mkdirSync(resolve(dist, '.well-known'), { recursive: true })
const nextYear = new Date(Date.now() + 365 * 864e5).toISOString()
writeFileSync(
  resolve(dist, '.well-known', 'security.txt'),
  `Contact: mailto:sai.v.7079@gmail.com\nExpires: ${nextYear}\nPreferred-Languages: en\nCanonical: ${SITE}/.well-known/security.txt\n`,
)

rmSync(ssrDir, { recursive: true, force: true })
console.log('sitemap.xml + robots.txt written; done.')
