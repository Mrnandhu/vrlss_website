import { createContext, useContext, useEffect, useState } from 'react'
import { currencies, formatPrice } from './prices'

const Ctx = createContext({ code: 'USD', setCode: () => {} })
const KEY = 'nx-currency'

export function CurrencyProvider({ children }) {
  // Always start with USD so the server and client HTML match, then restore the saved choice.
  const [code, setCodeState] = useState('USD')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY)
      if (saved && currencies.some((c) => c.code === saved)) setCodeState(saved)
    } catch {
      /* storage unavailable: stay on USD */
    }
  }, [])

  const setCode = (c) => {
    setCodeState(c)
    try {
      window.localStorage.setItem(KEY, c)
    } catch {
      /* ignore */
    }
  }
  return <Ctx.Provider value={{ code, setCode }}>{children}</Ctx.Provider>
}

export const useCurrency = () => useContext(Ctx)

export function Price({ usd, inr }) {
  const { code } = useCurrency()
  return <span key={code} className="px">{formatPrice(usd, code, inr)}</span>
}

export function CurrencySelect({ id = 'nx-cur', label = 'Currency', compact = false }) {
  const { code, setCode } = useCurrency()
  return (
    <label className={`nx-cur${compact ? ' is-compact' : ''}`} htmlFor={id}>
      <span className={compact ? 'nx-sr' : ''}>{label}</span>
      <select id={id} value={code} onChange={(e) => setCode(e.target.value)} aria-label={compact ? label : undefined}>
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {compact ? c.code : `${c.code} · ${c.label}`}
          </option>
        ))}
      </select>
    </label>
  )
}
