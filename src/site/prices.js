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
