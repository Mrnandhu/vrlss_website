import { createContext, useContext } from 'react'
import { isSiteRoute } from './routes'

export const NavContext = createContext(() => {})

export function Link({ to, children, onClick, ...rest }) {
  const navigate = useContext(NavContext)
  const handle = (e) => {
    if (onClick) onClick(e)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target
    )
      return
    if (isSiteRoute(to)) {
      e.preventDefault()
      navigate(to)
    }
  }
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
