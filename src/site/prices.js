// Prices are in USD. Edit here and every page + the structured data updates.
export const currencyNote =
  'Prices are set in US dollars. INR prices are our India rates. Other currencies are approximate, based on recent exchange rates. We confirm the exact amount in your currency in your quote.'

export const websitePlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    inr: 4999,
    from: false,
    blurb: 'A clean, fast site to get your business online.',
    delivery: '5–7 days',
    features: [
      'Up to 3 pages (or a one-page site)',
      'Responsive on phone, tablet and desktop',
      'Contact form and WhatsApp button',
      'Basic SEO setup: titles, descriptions, sitemap',
      'Google Analytics installed',
      '2 rounds of revisions',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 249,
    inr: 11999,
    from: false,
    featured: true,
    blurb: 'A complete website designed around your brand and your customers.',
    delivery: '10–14 days',
    features: [
      'Up to 8 pages with a custom design',
      'Advanced SEO: structured data and speed tuning',
      'Google Business Profile set up',
      'Blog or news section ready to use',
      'Copy guidance for every page',
      '3 rounds of revisions',
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    price: 549,
    inr: 24999,
    from: true,
    blurb: 'Designed from scratch for bigger or more specific needs.',
    delivery: 'Depends on scope',
    features: [
      'Fully bespoke design, no templates',
      'Online store, bookings or member areas',
      'Integrations: payments, CRM, email, APIs',
      'Content management so you can edit yourself',
      'Priority support after launch',
      'Web apps, mobile apps and custom software quoted on request',
    ],
  },
]

export const marketingPlans = [
  {
    id: 'presence',
    name: 'Presence',
    price: 79,
    inr: 3999,
    from: false,
    blurb: 'Stay visible and active where local customers look first.',
    features: [
      'Google Business Profile management',
      '8 designed social posts per month',
      'Review and message replies',
      'Monthly performance report',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 179,
    inr: 7999,
    from: false,
    featured: true,
    blurb: 'Steady content and search work that builds over time.',
    features: [
      'Everything in Presence',
      '16 designed social posts per month',
      'Local SEO and 2 optimised pages or articles per month',
      'One email or WhatsApp campaign per month',
      'Monthly strategy call',
    ],
  },
  {
    id: 'ads',
    name: 'Ads management',
    price: 99,
    inr: 4999,
    from: true,
    blurb: 'Paid campaigns on Google and Meta, managed for you.',
    features: [
      'Account setup, tracking and audience research',
      'Ad creative and copy',
      'Weekly optimisation',
      'Clear monthly report',
      'Ad budget is paid directly to the platform',
    ],
  },
]

export const addons = [
  { name: 'Logo and brand kit', usd: 39, inr: 1999 },
  { name: 'Extra page', usd: 15, inr: 599, unit: 'per page' },
  { name: 'Copywriting', usd: 15, inr: 799, unit: 'per page' },
  { name: 'Domain and hosting setup', usd: 15, inr: 599, unit: '(domain and hosting fees at cost)' },
  { name: 'Website care: updates, backups, uptime checks', usd: 15, inr: 599, unit: 'per month' },
]

// Approximate rates: 1 USD = rate. Update occasionally.
export const currencies = [
  { code: 'USD', label: 'US Dollar', rate: 1, symbol: '$' },
  { code: 'EUR', label: 'Euro', rate: 0.92, symbol: '€' },
  { code: 'GBP', label: 'British Pound', rate: 0.77, symbol: '£' },
  { code: 'AED', label: 'UAE Dirham', rate: 3.67, symbol: 'AED ' },
  { code: 'SAR', label: 'Saudi Riyal', rate: 3.75, symbol: 'SAR ' },
  { code: 'QAR', label: 'Qatari Riyal', rate: 3.64, symbol: 'QAR ' },
  { code: 'OMR', label: 'Omani Rial', rate: 0.385, symbol: 'OMR ' },
  { code: 'KWD', label: 'Kuwaiti Dinar', rate: 0.307, symbol: 'KWD ' },
  { code: 'BHD', label: 'Bahraini Dinar', rate: 0.377, symbol: 'BHD ' },
  { code: 'INR', label: 'Indian Rupee', rate: 88, symbol: '₹' },
  { code: 'CAD', label: 'Canadian Dollar', rate: 1.38, symbol: 'CA$' },
  { code: 'SGD', label: 'Singapore Dollar', rate: 1.3, symbol: 'S$' },
  { code: 'MYR', label: 'Malaysian Ringgit', rate: 4.25, symbol: 'RM ' },
  { code: 'AUD', label: 'Australian Dollar', rate: 1.52, symbol: 'A$' },
]

export function formatPrice(usd, code = 'USD', inr) {
  if (code === 'INR' && inr != null) return `₹${inr.toLocaleString('en-IN')}`
  const c = currencies.find((x) => x.code === code) || currencies[0]
  let v = usd * c.rate
  if (c.code === 'USD') return `$${usd.toLocaleString('en-US')}`
  if (['OMR', 'KWD', 'BHD'].includes(c.code)) v = Math.round(v)
  else if (c.code === 'INR') v = v < 10000 ? Math.round(v / 100) * 100 : Math.round(v / 500) * 500
  else if (v >= 1000) v = Math.round(v / 50) * 50
  else if (v >= 100) v = Math.round(v / 5) * 5
  else v = Math.round(v)
  return `${c.symbol}${v.toLocaleString('en-US')}`
}

export const launchNote =
  'Special rates for our first clients. Prices will increase as we grow, and early clients keep the price they signed at.'

// Pay-monthly websites for clients outside India: no big upfront payment.
// 12-month minimum, then month to month. The client owns the site, domain and content.
export const monthlyPlans = [
  {
    id: 'monthly-starter',
    name: 'Starter monthly',
    price: 39,
    blurb: 'A professional small business site with nothing big to pay upfront.',
    features: ['Up to 5 pages', 'Hosting, SSL and backups included', 'Up to 1 hour of changes every month', 'Google Business Profile set up', 'You own the site after 12 months'],
  },
  {
    id: 'monthly-business',
    name: 'Business monthly',
    price: 59,
    featured: true,
    blurb: 'A bigger site, kept fresh every month.',
    features: ['Up to 10 pages with a custom design', 'Hosting, SSL and backups included', 'Up to 2 hours of changes every month', 'Local SEO setup and a monthly report', 'You own the site after 12 months'],
  },
]
export const monthlyNote = 'For clients outside India. $0 to start for the build, 12-month minimum, then month to month with 30 days notice. After 12 months the site, domain and content are fully yours, even if you leave.'

// Typical prices elsewhere, for honest comparison (2026 market guides; see /pricing).
export const marketPrices = [
  ['United States', '$2,000 – $8,000'],
  ['United Kingdom', '£1,500 – £5,000'],
  ['UAE (Dubai)', 'AED 8,000 – 15,000'],
  ['Australia', 'A$2,000 – 6,000'],
  ['Canada', 'CA$3,000 – 8,000'],
  ['India (agencies)', '₹50,000 – ₹1,50,000'],
]

// Demo prices are written in rupees (₹). This converts every ₹ amount inside a piece of text
// into the visitor's chosen currency, e.g. "from ₹40,000" -> "from AED 1,670". INR stays as written.
const niceRound = (v) => (v >= 100000 ? Math.round(v / 1000) * 1000 : v >= 10000 ? Math.round(v / 100) * 100 : v >= 1000 ? Math.round(v / 10) * 10 : v >= 100 ? Math.round(v / 5) * 5 : v >= 10 ? Math.round(v) : Math.max(1, Math.round(v * 10) / 10))
export function fromInr(inr, code = 'INR') {
  if (code === 'INR') return `₹${inr.toLocaleString('en-IN')}`
  const inrRate = currencies.find((x) => x.code === 'INR').rate
  const c = currencies.find((x) => x.code === code) || currencies[0]
  const raw = (inr / inrRate) * c.rate
  if (raw < 100) return `${c.symbol}${raw.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const v = niceRound(raw)
  return `${c.symbol}${v.toLocaleString('en-US')}`
}
export function convertInrText(text, code = 'INR') {
  if (typeof text !== 'string' || code === 'INR' || !text.includes('₹')) return text
  return text.replace(/₹\s?([\d,]+(?:\.\d+)?)(\s*(lakh|crore))?/g, (m, n, _u, unit) => {
    const inr = parseFloat(n.replace(/,/g, '')) * (unit === 'lakh' ? 1e5 : unit === 'crore' ? 1e7 : 1)
    return Number.isFinite(inr) ? fromInr(inr, code) : m
  })
}
