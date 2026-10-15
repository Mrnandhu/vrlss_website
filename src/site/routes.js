import { brand } from './brand'
import { websitePlans, marketingPlans } from './prices'
import { demos } from './demos/demoData'
import { industries } from './demos/industries'

export const SITE = brand.url

export const faqs = {
  general: [
    {
      q: 'You are new. Why should I trust you with my business?',
      a: 'Because you do not have to trust us first. We build a working demo of your homepage for free. You only pay the 50% deposit if you like it, the price is fixed in writing, and you own the finished site and every account.',
    },
    {
      q: 'Is it really just one person?',
      a: 'Yes. Sai designs, builds and runs the marketing himself, so you always talk to the person doing the work. For bigger jobs, trusted freelancers may help, but Sai stays your single point of contact.',
    },
    {
      q: 'Do you work with clients outside India?',
      a: 'Yes. Our work is done remotely. We schedule calls around your time zone and keep everything in writing, so projects run smoothly whether you are in the Gulf, Europe, the UK, the US or Asia.',
    },
    {
      q: 'How long does a website take?',
      a: 'A Starter site is usually ready in 5–7 days and a Business site in 10–14 days once we have your content. Custom projects are scheduled after we agree the scope.',
    },
    {
      q: 'How does payment work?',
      a: 'The demo is free. Website projects are then paid 50% to start and 50% before launch, by UPI or bank transfer. Monthly marketing plans are billed monthly and you can stop at the end of any month.',
    },
    {
      q: 'Do I own the website?',
      a: 'Yes. When the final payment is made, you own the design, the code and the content. We hand everything over in full.',
    },
    {
      q: 'Can you guarantee first-page rankings or a number of sales?',
      a: 'No honest agency can. We guarantee the work we control: a technically sound, fast, search-ready site and consistent, well-reported marketing activity. Results build over time and depend on your market.',
    },
  ],
  websites: [
    {
      q: 'Will my website work on phones and tablets?',
      a: 'Every site we build is designed mobile-first and tested on phones, tablets, laptops and large desktop screens.',
    },
    {
      q: 'Will people be able to find my site on Google?',
      a: 'We set up the technical foundations of search: clean page structure, fast loading, titles and descriptions, structured data, a sitemap and Google Search Console. Ranking also depends on content and competition, which is where our marketing plans help.',
    },
    {
      q: 'Can I update the website myself?',
      a: 'On Custom projects we add a content editor so you can change text, images and pages yourself. On Starter and Business, send us changes and we make them, or add the Website care plan.',
    },
    {
      q: 'Do you build web apps, mobile apps and custom software?',
      a: 'Yes. Booking systems, dashboards, customer portals, mobile apps and internal tools are quoted per project after a short call.',
    },
  ],
  marketing: [
    {
      q: 'What results can I expect?',
      a: 'Local search and content work builds gradually, and most businesses see movement over three to six months. Paid ads can bring enquiries sooner. We report activity and results every month so you can judge for yourself.',
    },
    {
      q: 'Do you need access to my accounts?',
      a: 'We work through official access (for example, manager access on Google Business Profile and Meta Business). You stay the owner of every account.',
    },
    {
      q: 'Is the ad budget included?',
      a: 'No. The management fee is ours and the ad budget is paid directly to Google or Meta, so you always see exactly where your money goes.',
    },
    {
      q: 'Can I combine a website and marketing?',
      a: 'Yes, and it works best that way. Many clients start with a Business website and add a Presence or Growth plan once it is live.',
    },
  ],
  pricing: [
    {
      q: 'Do you add GST?',
      a: 'Not at the moment. We are a new sole proprietorship and not registered for GST, so the price you see is the price you pay. If that changes, new quotes will say so.',
    },
    {
      q: 'Are there any hidden costs?',
      a: 'No. The price you agree is the price you pay. Domain names, hosting and advertising spend are paid at cost to the providers and we tell you the amounts up front.',
    },
    {
      q: 'What if I need something that is not listed?',
      a: 'Tell us what you need. Custom projects, web apps and mobile apps are quoted after a short call, usually within one business day.',
    },
    {
      q: 'Can I upgrade a plan later?',
      a: 'Yes. You can add pages, move from Presence to Growth, or add ads management at any time.',
    },
  ],
}

const home = {
  path: '/',
  title: `${brand.name} | Website Design & Digital Marketing in Andhra Pradesh`,
  description:
    'Websites and digital marketing for small businesses in India and abroad. See a free demo of your homepage before you pay. Fixed prices, you own everything.',
  h1: 'Websites, apps and digital marketing that help your business grow',
  nav: 'Home',
}

const baseRoutes = [
  home,
  {
    path: '/websites',
    title: `Website Design & Development Services | ${brand.name}`,
    description:
      'Responsive, fast, SEO-ready websites built for small and growing businesses. Business sites, online stores, web apps and custom software with fixed pricing.',
    h1: 'Website design and development',
    nav: 'Websites',
    faq: faqs.websites,
    crumb: 'Websites',
  },
  {
    path: '/digital-marketing',
    title: `Digital Marketing Services for Small Business | ${brand.name}`,
    description:
      'Local SEO, Google Business Profile, social media and paid ads managed for you. Monthly plans with clear reporting and no long contracts.',
    h1: 'Digital marketing for small and growing businesses',
    nav: 'Digital marketing',
    faq: faqs.marketing,
    crumb: 'Digital marketing',
  },
  {
    path: '/pricing',
    title: `Pricing: Website & Digital Marketing Packages | ${brand.name}`,
    description:
      `Website packages from $${websitePlans[0].price} and monthly digital marketing plans from $${marketingPlans[0].price}. Transparent fixed prices with no hidden costs.`,
    h1: 'Simple, fixed pricing',
    nav: 'Pricing',
    faq: faqs.pricing,
    crumb: 'Pricing',
  },
  {
    path: '/work',
    title: `Website Demos for ${industries.length} Industries | ${brand.name}`,
    description:
      `Live demo websites for ${industries.length} industries, from restaurants, clinics and schools to factories, exporters and law firms. Try them on your phone.`,
    h1: 'Our work',
    nav: 'Work',
    crumb: 'Work',
  },
  {
    path: '/about',
    title: `About ${brand.name} | One-Person Web & Marketing Studio`,
    description: `${brand.name} is a one-person studio in ${brand.location} run by ${brand.founder}, building websites and running digital marketing for small businesses.`,
    h1: `About ${brand.name}`,
    nav: 'About',
    crumb: 'About',
  },
  {
    path: '/contact',
    title: `Contact ${brand.name} | Get a Free Website Demo`,
    description:
      'Ask for a free demo homepage, a free website check or a fixed-price quote. Replies within one business day on WhatsApp or email.',
    h1: 'Tell us about your business',
    nav: 'Contact',
    crumb: 'Contact',
  },
  {
    path: '/privacy',
    title: `Privacy Policy | ${brand.name}`,
    description: `How ${brand.name} collects, uses and protects the information you share when you contact us or hire us.`,
    h1: 'Privacy policy',
    crumb: 'Privacy policy',
  },
  {
    path: '/terms',
    title: `Terms of Service | ${brand.name}`,
    description: `The plain-language terms for website projects and marketing plans with ${brand.name}: quotes, payment, ownership and support.`,
    h1: 'Terms of service',
    crumb: 'Terms of service',
  },
  {
    path: '/refunds',
    title: `Refunds and Cancellations | ${brand.name}`,
    description: `What happens to your payment if you cancel a website project or marketing plan with ${brand.name}.`,
    h1: 'Refunds and cancellations',
    crumb: 'Refunds and cancellations',
  },
]

const demoRoutes = demos.map((d) => ({
  path: d.path,
  title: `${d.title} | ${brand.name}`,
  description: d.description,
  h1: `${d.name} demo`,
  crumb: d.category,
  parent: { path: '/work', name: 'Work' },
}))
const industryRoutes = industries.map((s) => ({
  path: s.path,
  title: `${s.cat} Website Design: Live Demo | ${brand.name}`,
  description: `Try a live ${s.cat.toLowerCase()} website demo with services, prices and WhatsApp enquiries. Get a fast, mobile-friendly ${s.cat.toLowerCase()} website, with a free demo before you pay.`,
  h1: `${s.cat} website demo`,
  crumb: s.cat,
  parent: { path: '/work', name: 'Work' },
}))

export const routes = [...baseRoutes, ...demoRoutes, ...industryRoutes]

export const notFound = {
  path: '/404',
  title: `Page not found | ${brand.name}`,
  description: 'The page you are looking for does not exist.',
  h1: 'Page not found',
  noindex: true,
}

export const normalize = (p = '/') => {
  const clean = p.split('#')[0].split('?')[0].replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

export const routeFor = (p) => routes.find((r) => r.path === normalize(p)) || null
export const isSiteRoute = (p) => !!routeFor(p)

const abs = (p) => `${SITE}${p === '/' ? '/' : p}`
export const canonical = (r) => abs(r.path)
export const ogImage = `${SITE}/og-image.jpg`

export function jsonLd(r) {
  const org = {
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#organization`,
    name: brand.name,
    alternateName: brand.shortName,
    founder: { '@type': 'Person', name: brand.founder },
    address: { '@type': 'PostalAddress', addressRegion: brand.region, addressCountry: brand.country },
    priceRange: '$$',
    sameAs: Object.values(brand.social).filter(Boolean),
    url: `${SITE}/`,
    logo: `${SITE}/logo-512.png`,
    image: ogImage,
    email: brand.email,
    telephone: brand.phoneDisplay,
    areaServed: ['India', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Singapore'],
    knowsAbout: ['Website design', 'Web development', 'E-commerce websites', 'Booking systems', 'Local SEO', 'Google Business Profile', 'Social media marketing', 'Google Ads', 'Meta Ads'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: brand.email,
      telephone: brand.phoneDisplay,
      availableLanguage: 'English',
    },
  }
  const site = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: brand.name,
    inLanguage: 'en',
    publisher: { '@id': `${SITE}/#organization` },
  }
  const page = {
    '@type': r.path === '/about' ? 'AboutPage' : r.path === '/contact' ? 'ContactPage' : 'WebPage',
    '@id': `${canonical(r)}#webpage`,
    url: canonical(r),
    name: r.title,
    description: r.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE}/#website` },
  }
  const graph = [org, site, page]

  if (r.path !== '/') {
    const trail = [{ name: 'Home', item: `${SITE}/` }]
    if (r.parent) trail.push({ name: r.parent.name, item: `${SITE}${r.parent.path}` })
    trail.push({ name: r.crumb, item: canonical(r) })
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: t.item })),
    })
  }

  const offers = (plans, cat) =>
    plans.map((p) => ({
      '@type': 'Offer',
      name: `${p.name} ${cat}`,
      price: String(p.price),
      priceCurrency: 'USD',
      url: `${SITE}/pricing`,
    }))

  if (r.path === '/websites') {
    graph.push({
      '@type': 'Service',
      name: 'Website design and development',
      serviceType: 'Web design',
      provider: { '@id': `${SITE}/#organization` },
      areaServed: 'Worldwide',
      offers: offers(websitePlans, 'website package'),
    })
  }
  if (r.path === '/digital-marketing') {
    graph.push({
      '@type': 'Service',
      name: 'Digital marketing',
      serviceType: 'Digital marketing',
      provider: { '@id': `${SITE}/#organization` },
      areaServed: 'Worldwide',
      offers: offers(marketingPlans, 'plan'),
    })
  }
  if (r.path === '/pricing') {
    graph.push({
      '@type': 'ItemList',
      name: 'Website and digital marketing packages',
      itemListElement: [...websitePlans, ...marketingPlans].map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
      })),
    })
  }
  const ind = industries.find((x) => x.path === r.path)
  if (ind) {
    graph.push({
      '@type': 'Service',
      name: `${ind.cat} website design`,
      serviceType: 'Web design',
      audience: { '@type': 'BusinessAudience', audienceType: ind.cat },
      provider: { '@id': `${SITE}/#organization` },
      areaServed: 'Worldwide',
      url: canonical(r),
    })
  }
  if (r.faq) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: r.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Head markup used at build time (prerender)
export function headHtml(r) {
  const url = canonical(r)
  const robots = r.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  return [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...(brand.googleVerification ? [`<meta name="google-site-verification" content="${esc(brand.googleVerification)}" />`] : []),
    ...(brand.bingVerification ? [`<meta name="msvalidate.01" content="${esc(brand.bingVerification)}" />`] : []),
    `<link rel="alternate" hreflang="en" href="${url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(brand.name)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(brand.name)} — ${esc(brand.tagline)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(r)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

// Head updates after client-side navigation
export function applyHead(r) {
  if (typeof document === 'undefined') return
  const set = (sel, attr, val, create) => {
    let el = document.head.querySelector(sel)
    if (!el && create) {
      el = document.createElement(create.tag)
      Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v))
      document.head.appendChild(el)
    }
    if (el) el.setAttribute(attr, val)
  }
  const url = canonical(r)
  document.title = r.title
  set('meta[name="description"]', 'content', r.description, { tag: 'meta', attrs: { name: 'description' } })
  set('link[rel="canonical"]', 'href', url, { tag: 'link', attrs: { rel: 'canonical' } })
  set('link[hreflang="en"]', 'href', url)
  set('link[hreflang="x-default"]', 'href', url)
  set('meta[property="og:title"]', 'content', r.title)
  set('meta[property="og:description"]', 'content', r.description)
  set('meta[property="og:url"]', 'content', url)
  set('meta[name="twitter:title"]', 'content', r.title)
  set('meta[name="twitter:description"]', 'content', r.description)
  set(
    'meta[name="robots"]',
    'content',
    r.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  )
  const ld = document.head.querySelector('script[type="application/ld+json"]')
  if (ld) ld.textContent = JSON.stringify(jsonLd(r))
}
