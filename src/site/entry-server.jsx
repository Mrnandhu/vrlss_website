import { renderToString } from 'react-dom/server'
import SiteApp from './App'
import { routes, notFound, headHtml } from './routes'

export function render(path) {
  const route = routes.find((r) => r.path === path) || notFound
  return { html: renderToString(<SiteApp initialPath={route.path} />), head: headHtml(route) }
}

export { routes, notFound }
