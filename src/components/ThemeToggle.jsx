import { useLayoutEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const STORAGE_KEY = 'vrls-color-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
}

function ThemeToggle({ floating = false }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#0b0d1b' : '#ffffff',
    )
  }, [theme])

  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const Icon = nextTheme === 'light' ? Sun : Moon

  return (
    <button
      className={`theme-toggle${floating ? ' theme-toggle-floating' : ''}`}
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === 'dark'}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon aria-hidden="true" size={16} strokeWidth={1.9} />
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export default ThemeToggle
