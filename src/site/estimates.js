// Price rules for the project planner (/start). Every amount has a USD price and an India (INR) price,
// like prices.js. Change a number here and the planner's estimate updates everywhere.
// Estimates are shown as a range (low to high) and are always confirmed in a written quote.
import { websitePlans, marketingPlans, monthlyPlans, addons } from './prices'
import { launch } from './brand'

const plan = (id) => websitePlans.find((p) => p.id === id)
const mplan = (id) => marketingPlans.find((p) => p.id === id)
const addon = (name) => addons.find((a) => a.name.startsWith(name))

// ---------- What the client can ask for ----------
export const projectTypes = [
  { id: 'website', name: 'New website', note: 'Business, portfolio or company site', icon: 'layout' },
  { id: 'landing', name: 'Landing page', note: 'One page for an offer or campaign', icon: 'target' },
  { id: 'redesign', name: 'Website redesign', note: 'Make an old site modern and fast', icon: 'palette' },
  { id: 'store', name: 'Online store', note: 'Sell products with online payment', icon: 'cart' },
  { id: 'webapp', name: 'Web app or portal', note: 'Bookings, dashboards, CRM, portals', icon: 'layers' },
  { id: 'mobile', name: 'Mobile app', note: 'Android and/or iPhone', icon: 'phone' },
  { id: 'branding', name: 'Logo and branding', note: 'Logo, colours, brand kit', icon: 'sparkle' },
  { id: 'marketing', name: 'Digital marketing', note: 'SEO, social media, Google and Meta ads', icon: 'megaphone' },
  { id: 'care', name: 'Care and maintenance', note: 'Updates, backups, fixes every month', icon: 'wrench' },
]

export const goals = ['More calls and enquiries', 'Sell online', 'Take bookings', 'Look more professional', 'Reach customers abroad', 'Rank on Google', 'Replace an old website', 'Automate manual work']

export const pageOptions = ['Home', 'About', 'Services', 'Products', 'Menu', 'Gallery', 'Pricing', 'Testimonials', 'Team', 'FAQ', 'Blog', 'Careers', 'Locations', 'Contact']

export const storeSizes = [
  { id: 's', name: 'Up to 50 products', usd: 0, inr: 0 },
  { id: 'm', name: '51 to 200 products', usd: 100, inr: 4999 },
  { id: 'l', name: '200 to 1,000 products', usd: 250, inr: 11999 },
  { id: 'xl', name: 'More than 1,000', usd: 500, inr: 24999 },
]

export const appKinds = ['Booking or appointments', 'Customer portal', 'Admin dashboard', 'CRM or sales tracker', 'Invoicing or billing', 'Learning platform (LMS)', 'Marketplace', 'Inventory or orders', 'Something else']

export const appSizes = [
  { id: 'simple', name: 'Simple', note: '1 type of user, up to 5 screens', mult: 1, weeks: '3–4 weeks' },
  { id: 'medium', name: 'Medium', note: '2–3 user roles, up to 15 screens', mult: 2.2, weeks: '5–8 weeks' },
  { id: 'complex', name: 'Complex', note: 'Many roles, integrations, reports', mult: 4, weeks: '8–14 weeks' },
]

export const mobilePlatforms = ['Android', 'iPhone (iOS)', 'Both']

export const features = [
  { id: 'booking', name: 'Online booking / appointments', usd: 79, inr: 3999 },
  { id: 'payments', name: 'Online payments', usd: 49, inr: 2499 },
  { id: 'cms', name: 'Edit content yourself (CMS)', usd: 59, inr: 2999 },
  { id: 'blog', name: 'Blog or news', usd: 29, inr: 1499, freeWith: 'business' },
  { id: 'login', name: 'Customer login / accounts', usd: 149, inr: 6999 },
  { id: 'gbp', name: 'Google Business Profile setup', usd: 19, inr: 999, freeWith: 'business' },
  { id: 'integrations', name: 'Integrations (CRM, email, APIs)', usd: 99, inr: 4999 },
  { id: 'whatsapp', name: 'WhatsApp button and enquiry forms', usd: 0, inr: 0 },
  { id: 'analytics', name: 'Google Analytics and Search Console', usd: 0, inr: 0 },
]
export const extraLanguage = { usd: 39, inr: 1999 } // per language beyond the first
export const rtlLayout = { usd: 49, inr: 2499 } // extra for Arabic right-to-left layouts

export const styles = ['Clean and minimal', 'Bold and modern', 'Premium and luxury', 'Friendly and colourful', 'Corporate and serious', 'Not sure, suggest one']
export const contentReady = [
  { id: 'ready', name: 'I have all text and photos' },
  { id: 'partly', name: 'I have some of it' },
  { id: 'help', name: 'Please write it for me' },
]
export const timelines = ['As soon as possible', 'Within 2 weeks', 'Within a month', '1–3 months', 'Just exploring']

const LOGO = addon('Logo') || { usd: 39, inr: 1999 }
const COPY = addon('Copywriting') || { usd: 15, inr: 799 }
const CARE = addon('Website care') || { usd: 15, inr: 599 }
const DOMAIN = addon('Domain') || { usd: 15, inr: 599 }

// Website price by number of pages (the plan tiers on /pricing, plus one in between).
export function siteTier(pages) {
  if (pages <= 3) return { name: plan('starter').name, usd: plan('starter').price, inr: plan('starter').inr, days: plan('starter').delivery, id: 'starter' }
  if (pages <= 8) return { name: plan('business').name, usd: plan('business').price, inr: plan('business').inr, days: plan('business').delivery, id: 'business' }
  if (pages <= 15) return { name: 'Business plus', usd: 399, inr: 17999, days: '2–3 weeks', id: 'business' }
  return { name: plan('custom').name, usd: plan('custom').price, inr: plan('custom').inr, days: '3–5 weeks', id: 'custom' }
}

export const emptyBrief = {
  types: [],
  business: '', industry: '', country: '', city: '', currentSite: '', social: '',
  goals: [], audience: '', references: '',
  pages: ['Home', 'About', 'Services', 'Contact'], extraPages: 0,
  storeSize: 's', appKind: '', appSize: 'simple', appUsers: '', mobile: 'Android',
  marketing: [], hasLogo: 'yes',
  features: ['whatsapp', 'analytics'], languages: ['en'],
  style: '', colours: '', content: 'partly', photos: 'have', domain: 'no',
  timeline: 'Within a month', budget: '', care: false, notes: '',
  name: '', email: '', phone: '', contactBy: 'WhatsApp',
}

// ---------- The estimate ----------
// Returns line items (each with usd/inr), one-time and monthly totals, a low-high range, delivery time and offers.
export function estimate(b, { abroad = false } = {}) {
  const one = []
  const monthly = []
  const add = (list, label, usd, inr, note) => list.push({ label, usd, inr, note })
  const has = (t) => b.types.includes(t)
  const isSite = has('website') || has('redesign')
  const pages = Math.max(1, (b.pages || []).length + Number(b.extraPages || 0))
  let tierId = null
  let days = null
  let spread = 1.2

  if (isSite) {
    const t = siteTier(pages)
    tierId = t.id
    days = t.days
    add(one, `${has('redesign') ? 'Website redesign' : 'Website'}: ${t.name} plan, ${pages} page${pages === 1 ? '' : 's'}`, t.usd, t.inr)
  }
  if (has('landing') && !isSite) {
    add(one, 'Landing page (one page)', plan('starter').price, plan('starter').inr)
    days = days || '3–5 days'
    tierId = tierId || 'starter'
  }
  if (has('store')) {
    const c = plan('custom')
    add(one, 'Online store: design, cart, checkout and payments', c.price, c.inr)
    const s = storeSizes.find((x) => x.id === b.storeSize) || storeSizes[0]
    if (s.usd) add(one, `Catalogue size: ${s.name.toLowerCase()}`, s.usd, s.inr)
    days = '3–4 weeks'
    tierId = 'custom'
    spread = 1.3
  }
  if (has('webapp')) {
    const size = appSizes.find((x) => x.id === b.appSize) || appSizes[0]
    const c = plan('custom')
    add(one, `Web app${b.appKind ? `: ${b.appKind.toLowerCase()}` : ''} (${size.name.toLowerCase()})`, Math.round(c.price * size.mult), Math.round((c.inr * size.mult) / 1000) * 1000 - 1)
    days = size.weeks
    spread = 1.5
  }
  if (has('mobile')) {
    const both = b.mobile === 'Both'
    add(one, `Mobile app: ${b.mobile}`, both ? 1499 : 999, both ? 74999 : 49999, 'Store publishing fees are paid to Google/Apple')
    days = both ? '8–12 weeks' : '6–10 weeks'
    spread = 1.6
  }

  if (isSite || has('landing') || has('store') || has('webapp')) {
    for (const id of b.features || []) {
      const f = features.find((x) => x.id === id)
      if (!f || !f.usd) continue
      if (f.freeWith && tierId === f.freeWith) continue
      if ((id === 'payments' && has('store')) || (id === 'login' && has('webapp'))) continue
      add(one, f.name, f.usd, f.inr)
    }
    const langs = b.languages && b.languages.length ? b.languages : ['en']
    const extra = Math.max(0, langs.length - 1)
    if (extra) add(one, `${extra} extra language${extra === 1 ? '' : 's'}`, extraLanguage.usd * extra, extraLanguage.inr * extra)
    if (langs.includes('ar')) add(one, 'Arabic right-to-left layout', rtlLayout.usd, rtlLayout.inr)
    if (b.content === 'help') {
      const n = isSite ? pages : 1
      add(one, `Copywriting for ${n} page${n === 1 ? '' : 's'}`, COPY.usd * n, COPY.inr * n)
    }
    if (b.domain === 'no') add(one, 'Domain and hosting setup (fees at cost)', DOMAIN.usd, DOMAIN.inr)
  }

  if (has('branding') || b.hasLogo === 'no') add(one, 'Logo and brand kit', LOGO.usd, LOGO.inr)

  if (has('marketing')) {
    for (const id of b.marketing || []) {
      const p = mplan(id)
      if (p) add(monthly, `Marketing: ${p.name}${p.from ? ' (+ ad budget, paid to the platform)' : ''}`, p.price, p.inr)
    }
    if (!(b.marketing || []).length) add(monthly, `Marketing: ${mplan('presence').name} (suggested)`, mplan('presence').price, mplan('presence').inr)
  }
  if (has('care') || b.care) add(monthly, 'Website care: updates, backups, uptime', CARE.usd, CARE.inr)

  const sum = (list, k) => list.reduce((s, x) => s + (x[k] || 0), 0)
  const low = { usd: sum(one, 'usd'), inr: sum(one, 'inr') }
  const high = { usd: Math.round(low.usd * spread), inr: Math.round((low.inr * spread) / 100) * 100 - 1 }
  const month = { usd: sum(monthly, 'usd'), inr: sum(monthly, 'inr') }

  const spotsLeft = Math.max(0, launch.total - launch.taken)
  const offers = []
  if (isSite || has('landing') || has('store')) offers.push({ id: 'demo', title: 'Free homepage demo', text: 'See your new homepage before you pay anything.' })
  if (spotsLeft > 0 && low.usd > 0) {
    offers.push({
      id: 'founding', title: `${launch.discount}% founding client discount`, text: `For our first ${launch.total} clients, if you confirm within 7 days of your quote.`,
      save: { usd: Math.round((low.usd * launch.discount) / 100), inr: Math.round((low.inr * launch.discount) / 100) },
    })
  }
  if (abroad && (isSite || has('landing'))) {
    const m = pages > 5 ? monthlyPlans[1] : monthlyPlans[0]
    offers.push({ id: 'monthly', title: 'Pay monthly instead', text: `${m.name}: nothing big upfront, hosting included. You own the site after 12 months.`, monthly: { usd: m.price } })
  }
  if (low.usd > 0) offers.push({ id: 'split', title: 'Pay in two parts', text: '50% to start, 50% only when you are happy, before launch.' })
  if (isSite || has('store') || has('landing')) offers.push({ id: 'support', title: '30 days of free fixes', text: 'Small changes and fixes after launch, at no cost.' })

  return { one, monthly, low, high, month, days, offers, pages, tierId, discount: launch.discount, spotsLeft }
}
