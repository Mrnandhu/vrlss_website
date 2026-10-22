import { useEffect, useState } from 'react'
import { needsConsent, setConsent } from '../analytics'
import { Link } from '../router'

// Shown only to visitors from Europe/UK on the live site (GDPR). Rendered after load, so prerendered HTML is unchanged.
export default function ConsentBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => setShow(needsConsent()), [])
  if (!show) return null
  const pick = (ok) => {
    setConsent(ok)
    setShow(false)
  }
  return (
    <div className="cb" role="dialog" aria-label="Cookie choice">
      <p>
        We use statistics cookies (Google Analytics, Microsoft Clarity) to improve this site. No ads.{' '}
        <Link to="/privacy">Privacy policy</Link>
      </p>
      <div className="cb-btns">
        <button className="cb-no" onClick={() => pick(false)}>Decline</button>
        <button className="cb-yes" onClick={() => pick(true)}>Accept</button>
      </div>
    </div>
  )
}
