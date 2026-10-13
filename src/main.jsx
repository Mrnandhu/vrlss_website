import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const isLegacy = /^\/(demos|preview)\//.test(path)
const root = document.getElementById('root')

async function start() {
  if (isLegacy) {
    // Existing demo + client-preview pages keep working exactly as before.
    root.innerHTML = ''
    await import('./index.css')
    const { default: App } = await import('./App.jsx')
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    return
  }
  const { default: SiteApp } = await import('./site/App.jsx')
  const { isSiteRoute } = await import('./site/routes.js')
  if (!isSiteRoute(path)) root.innerHTML = ''
  const app = (
    <StrictMode>
      <SiteApp initialPath={path} />
    </StrictMode>
  )
  // Prerendered HTML is hydrated; in `vite dev` the root is empty, so render normally.
  if (root.hasChildNodes() && isSiteRoute(path)) hydrateRoot(root, app)
  else createRoot(root).render(app)
}

start()
