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

console.log('css linked in HTML:', [...cssLinks.matchAll(/data-inline="([^"]+)"|href="([^"]+\.css)"/g)].map((m) => m[1] || m[2]).join(', ') || 'NONE')
for (const r of routes) {
  const { html, head } = render(r.path)
  const page = template.replace('<!--app-head-->', cssLinks + '\n    ' + head).replace('<!--app-html-->', html)
  const out = r.path === '/' ? resolve(dist, 'index.html') : resolve(dist, r.path.slice(1), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, page)
  console.log('prerendered', r.path)
}

const today = new Date().toISOString().slice(0, 10)
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  routes
    .filter((r) => !r.noindex)
    .map((r) => {
      const url = `${SITE}${r.path === '/' ? '/' : r.path}`
      const pri = r.path === '/' ? '1.0' : ['/websites', '/digital-marketing', '/pricing'].includes(r.path) ? '0.9' : '0.7'
      return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${pri}</priority>\n    <xhtml:link rel="alternate" hreflang="en" href="${url}"/>${r.path === '/' ? `\n    <image:image><image:loc>${SITE}/og-image.jpg</image:loc></image:image>` : ''}\n  </url>`
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
