// Google Analytics 4 + Microsoft Clarity.
// Paste the two IDs into brand.js → analytics. Empty IDs = nothing loads.
// Runs only on the live domain (not localhost), so your own testing doesn't pollute the numbers.
import { brand } from './brand'

const LIVE = typeof window !== 'undefined' && /(^|\.)vrlss\.in$/.test(window.location.hostname)
const ids = brand.analytics || {}
// Visitors from Europe/UK get a small consent banner (GDPR). Everyone else is counted normally.
const EU = typeof Intl !== 'undefined' && /^Europe\//.test(Intl.DateTimeFormat().resolvedOptions().timeZone || '')
const KEY = 'vrlss_consent'

const store = {
  get() { try { return localStorage.getItem(KEY) } catch { return null } },
  set(v) { try { localStorage.setItem(KEY, v) } catch {} },
}

let started = false
function load(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

export function initAnalytics() {
  if (!LIVE || started) return
  started = true
  const granted = !EU || store.get() === 'granted'

  if (ids.ga4) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('consent', 'default', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    })
    window.gtag('js', new Date())
    // Page views are sent by trackPage() on every route change (this is a single-page site).
    window.gtag('config', ids.ga4, { send_page_view: false })
    load('https://www.googletagmanager.com/gtag/js?id=' + ids.ga4)
  }

  if (ids.clarity) {
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments) }
    load('https://www.clarity.ms/tag/' + ids.clarity)
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: granted ? 'granted' : 'denied' })
  }

  // Analytics start after the first interaction, so record the page the visitor is on now.
  trackPage(location.pathname, document.title)

  // Count the clicks that matter: WhatsApp, call and email.
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href]')
    if (!a) return
    const href = a.getAttribute('href') || ''
    let name = null
    if (href.includes('wa.me/') || href.includes('whatsapp.com')) name = 'whatsapp_click'
    else if (href.startsWith('tel:')) name = 'call_click'
    else if (href.startsWith('mailto:')) name = 'email_click'
    if (!name) return
    track(name, { link_text: (a.textContent || '').trim().slice(0, 60), page_path: location.pathname })
    track('generate_lead', { method: name.replace('_click', '') })
  }, true)
}

export function needsConsent() {
  return LIVE && EU && !store.get() && !!(ids.ga4 || ids.clarity)
}

export function setConsent(ok) {
  store.set(ok ? 'granted' : 'denied')
  const v = ok ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', { analytics_storage: v })
  window.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: v })
}

export function trackPage(path, title) {
  if (!LIVE) return
  window.gtag?.('event', 'page_view', { page_path: path, page_location: location.origin + path, page_title: title || document.title })
  window.clarity?.('set', 'page', path)
}

export function track(name, params = {}) {
  if (!LIVE) return
  window.gtag?.('event', name, params)
  window.clarity?.('event', name)
}
