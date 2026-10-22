import { brand } from './brand'
import { websitePlans, marketingPlans, monthlyPlans, formatPrice } from './prices'
import { places, placePath, placeByPath } from './places'
import { demos } from './demos/demoData'
import { industries } from './demos/industries'
import { localized, LANGS, versionsOf } from './demos/locales'
import { posts, postPath } from './blog/posts'

const SMALL = new Set(['and', 'or', 'of', 'the', 'for', 'in', 'to', 'a'])
export const titleCase = (t) => t.split(' ').map((w, i) => (i && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1))).join(' ')

export const SITE = brand.url

export const faqs = {
  general: [
    {
      q: 'You are new. Why should I trust you with my business?',
      a: 'Because you do not have to trust us first. We build a working demo of your homepage for free. You only pay the 50% deposit if you like it, the price is fixed in writing, and you own the finished site and every account.',
    },
    {
      q: 'Who will work on my project?',
      a: 'A small team you talk to directly. Sai, the founder, designs and builds every website himself, and our Marketing Head runs Google Business Profiles, social media and ads. No account managers in between.',
    },
    {
      q: 'What exactly do I get?',
      a: 'A custom design you approve, a mobile-first website, the domain in your name, hosting set up, Google Search Console and a sitemap, WhatsApp and contact forms, a short training call and 30 days of free fixes after launch. You own the code, content and every login.',
    },
    {
      q: 'How long does a website take?',
      a: 'Your free demo homepage is ready in about 3 working days. A Starter site is usually live in 5–7 days and a Business site in 10–14 days once we have your content. Custom projects are scheduled after we agree the scope.',
    },
    {
      q: 'How does payment work?',
      a: 'The demo is free. Website projects are paid 50% to start and 50% before launch, by UPI, bank transfer or an international payment link. Outside India you can also choose a pay-monthly plan with nothing big to pay upfront.',
    },
    {
      q: 'Do I own the website?',
      a: 'Yes. When the final payment is made, you own the design, the code and the content. On pay-monthly plans, everything is yours after 12 months. Your domain is registered in your name from day one.',
    },
    {
      q: 'Do you work with clients outside India?',
      a: `Yes. We work with clients in the Gulf, the UK, the US, Australia and Asia. We reply ${'within 2 hours'} between 9 am and 9 pm IST and schedule calls in your time zone. Prices can be shown in your currency.`,
    },
    {
      q: 'What happens after launch?',
      a: 'You get 30 days of free fixes and small changes. After that you can send changes when you need them, or add the Website care plan for monthly updates, backups and uptime checks.',
    },
    {
      q: 'What if I am not happy?',
      a: 'If you do not like the free demo, you pay nothing and walk away. During a project you get 2–3 rounds of revisions included, and our refund policy explains what happens if you cancel.',
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
      q: 'Do you offer pay-monthly websites?',
      a: 'Yes, for clients outside India. You pay a fixed monthly fee with no big upfront cost, for a 12-month minimum. Hosting, backups and monthly changes are included, and the site is yours after 12 months.',
    },
    {
      q: 'Can I upgrade a plan later?',
      a: 'Yes. You can add pages, move from Presence to Growth, or add ads management at any time.',
    },
  ],
}

const home = {
  path: '/',
  title: `${brand.name} | Web Design & Development Studio`,
  description:
    'Web design and development studio building websites, online stores and web apps for businesses worldwide. Free homepage demo, fixed prices, you own it all.',
  h1: 'We build websites, online stores and web apps that grow.',
  nav: 'Home',
}

const baseRoutes = [
  home,
  {
    path: '/websites',
    title: `Website Design & Development Services | ${brand.name}`,
    description:
      'Responsive, fast, SEO-ready websites built for small and growing businesses. Business sites, online stores, web apps and custom software with fixed pricing.',
    h1: 'Web development',
    nav: 'Websites',
    faq: faqs.websites,
    crumb: 'Websites',
  },
  {
    path: '/digital-marketing',
    title: `Digital Marketing: SEO, Social & Ads | ${brand.name}`,
    description:
      'Local SEO, Google Business Profile, social media and paid ads managed for you. Monthly plans with clear reporting and no long contracts.',
    h1: 'Digital marketing',
    nav: 'Digital marketing',
    faq: faqs.marketing,
    crumb: 'Digital marketing',
  },
  {
    path: '/pricing',
    title: `Website & Marketing Pricing | ${brand.name}`,
    description:
      `Website packages from $${websitePlans[0].price} and monthly digital marketing plans from $${marketingPlans[0].price}. Transparent fixed prices with no hidden costs.`,
    h1: 'Transparent pricing',
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
    title: `Studio | ${brand.name}: Design, Engineering & Growth`,
    description: `${brand.name} is a web design and development studio in ${brand.location}, working with clients worldwide. Free demo first, fixed prices, no hand-offs.`,
    h1: 'A focused studio for the web.',
    nav: 'Studio',
    crumb: 'Studio',
  },
  {
    path: '/contact',
    title: `Start a Project | ${brand.name}`,
    description:
      'Ask for a free demo homepage, a free website check or a fixed-price quote. Replies within 2 hours (9 am to 9 pm IST) on WhatsApp or email.',
    h1: 'Start a project',
    nav: 'Contact',
    crumb: 'Contact',
  },
  {
    path: '/start',
    title: `Website Cost Calculator & Project Planner | ${brand.name}`,
    description: 'Plan your website, online store, web app or marketing in 3 minutes. Get an instant price estimate in your currency and a ready project brief.',
    h1: 'Plan your project.',
    nav: 'Start a project',
    crumb: 'Start a project',
  },
  {
    path: '/studio/docs',
    title: `Document studio | ${brand.name}`,
    description: 'Private tool.',
    h1: 'Document studio',
    crumb: 'Document studio',
    noindex: true,
  },
  {
    path: '/sitemap',
    title: `Site Map: All Pages and Demos | ${brand.name}`,
    description: `Every page on ${brand.name}: services, pricing, 46 industry website demos, demos in 7 languages, the countries and cities we serve, and our policies.`,
    h1: 'Site map',
    crumb: 'Site map',
  },
  {
    path: '/privacy',
    title: `Privacy Policy | ${brand.name}`,
    description: `How ${brand.name} collects, uses and protects the information you share when you contact us, use our project planner or hire us for a project.`,
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
    description: `What happens to your payment if you cancel a website project or marketing plan with ${brand.name}, and how refunds are calculated and paid.`,
    h1: 'Refunds and cancellations',
    crumb: 'Refunds and cancellations',
  },
]

const blogRoutes = [
  {
    path: '/blog',
    title: `Blog: Website Guides for Small Businesses | ${brand.name}`,
    description: 'Plain-English guides on websites, Google, Instagram and growing a small business online: costs, checklists and honest advice.',
    h1: 'Blog',
    crumb: 'Blog',
  },
  ...posts.map((p) => ({
    path: postPath(p),
    title: `${p.title} | ${brand.name}`,
    description: p.description,
    h1: p.title,
    crumb: p.title,
    parent: { path: '/blog', name: 'Blog' },
    image: p.cover ? `${SITE}/blog/${p.slug}.jpg` : undefined,
    article: p,
  })),
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
  alternates: versionsOf(s.slug).length > 1 ? versionsOf(s.slug) : undefined,
  path: s.path,
  title: `${titleCase(s.cat)} Website Design Demo | ${brand.name}`,
  description: `Live ${s.cat.toLowerCase()} website demo with services, prices and WhatsApp enquiries. Get a fast, mobile-friendly site, with a free demo first.`,
  h1: `${s.cat} website demo`,
  crumb: s.cat,
  parent: { path: '/work', name: 'Work' },
}))

export function placeFaqs(p) {
  const s = websitePlans[0]
  const b = websitePlans[1]
  if (p.kind === 'city')
    return [
      {
        q: `How much does a website cost in ${p.name}?`,
        a: `With us, a website for a ${p.name} business starts at ${formatPrice(s.price, 'INR', s.inr)} for up to 3 pages, and ${formatPrice(b.price, 'INR', b.inr)} for a complete 8-page business site. Many agencies quote ₹20,000 to ₹80,000 for a similar site. Our price is fixed in writing before we start.`,
      },
      {
        q: 'Can my website be in Telugu?',
        a: 'Yes. We build websites in English, Telugu or both, and we can talk to you in Telugu, English or Hindi.',
      },
      {
        q: `Do you work with businesses in ${p.name} in person?`,
        a: `We are based in Andhra Pradesh. Most projects run smoothly on WhatsApp and phone calls, which keeps prices low. If you would prefer to meet, ask us.`,
      },
      {
        q: 'How fast can my website be ready?',
        a: 'Your free demo homepage is ready in about 3 working days. A Starter site is usually live in 5–7 days and a Business site in 10–14 days once we have your content.',
      },
    ]
  return [
    {
      q: `How much does a website cost in ${p.short}?`,
      a: `${p.local} With us, a professional website starts at ${formatPrice(s.price, p.currency)} one-time, or ${formatPrice(monthlyPlans[0].price, p.currency)} a month on a pay-monthly plan with hosting included.`,
    },
    { q: 'How do we work across time zones?', a: `${p.zone} We reply ${brand.reply} between ${brand.hoursShort}, and schedule calls at a time that suits you.` },
    { q: `How do I pay from ${p.short}?`, a: 'By international bank transfer or a card payment link. We confirm the method and the exact amount in your currency in your written quote.' },
    { q: 'Do I really own the website?', a: 'Yes. Your domain is registered in your name. One-time projects are fully yours once paid, and pay-monthly sites become yours after 12 months, even if you leave.' },
  ]
}

const placeRoutes = places.map((p) =>
  p.kind === 'city'
    ? {
        path: placePath(p),
        title: `Website Design in ${p.name} from ${formatPrice(websitePlans[0].price, 'INR', websitePlans[0].inr)} | ${brand.name}`,
        description: `Website design for ${p.name} businesses: fast, mobile-friendly sites from ${formatPrice(websitePlans[0].price, 'INR', websitePlans[0].inr)}, in English or Telugu. See a free demo of your homepage before you pay.`,
        h1: `Website design in ${p.name}`,
        crumb: `Web design in ${p.name}`,
        faq: placeFaqs(p),
      }
    : {
        path: placePath(p),
        title: `Small Business Website Design in ${p.short} | ${brand.name}`,
        description: `Professional websites for small businesses in ${p.name} from ${formatPrice(websitePlans[0].price, p.currency)}, or ${formatPrice(monthlyPlans[0].price, p.currency)}/month. Free homepage demo before you pay. You own everything.`,
        h1: `Website design for small businesses in ${p.name}`,
        crumb: `Web design in ${p.short}`,
        faq: placeFaqs(p),
      },
)

const teluguRoute = {
  path: '/te',
  title: `వెబ్‌సైట్ డిజైన్ | ఉచిత డెమో | ${brand.name}`,
  description: 'ఆంధ్రప్రదేశ్ మరియు తెలంగాణ వ్యాపారాల కోసం వెబ్‌సైట్లు. డబ్బు చెల్లించే ముందే మీ వెబ్‌సైట్ డెమోను ఉచితంగా చూడండి.',
  h1: 'మీ వ్యాపారానికి కస్టమర్లను తెచ్చే వెబ్‌సైట్లు',
  crumb: 'తెలుగు',
  lang: 'te',
}

const localizedRoutes = localized.map((s) => ({
  path: s.path,
  lang: s.lang,
  alternates: versionsOf(s.baseSlug),
  title: `${LANGS[s.lang].name} ${titleCase(s.baseCat)} Website Demo | ${brand.name}`,
  description: `Live ${s.baseCat.toLowerCase()} website demo in ${LANGS[s.lang].name} (${LANGS[s.lang].native}) for ${LANGS[s.lang].regions.split(' · ').slice(0, 3).join(', ')}. Get a site like this, with a free demo first.`,
  h1: `${s.cat}: ${s.name}`,
  crumb: `${s.baseCat} (${LANGS[s.lang].native})`,
  parent: { path: '/work', name: 'Work' },
}))

// ---------- On-page SEO guard rails ----------
// Titles: keep within ~60 characters (Google cuts longer ones). Descriptions: within 160.
function fitTitle(t) {
  if (t.length <= 60) return t
  let parts = t.split(' | ')
  while (parts.length > 2 && parts.join(' | ').length > 60) parts.splice(parts.length - 2, 1)
  let out = parts.join(' | ')
  if (out.length > 60) out = out.replace(` | ${brand.name}`, ' | VRLS')
  if (out.length > 60) out = out.replace(/:[^|]*\|/, ' |')
  return out
}
function fitDesc(d) {
  if (d.length <= 160) return d
  const cut = d.slice(0, 160)
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '))
  if (end > 90) return cut.slice(0, end + 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…'
}
const tidy = (r) => (r.noindex ? r : { ...r, title: fitTitle(r.title), description: fitDesc(r.description) })

export const routes = [...baseRoutes, ...blogRoutes, ...placeRoutes, teluguRoute, ...demoRoutes, ...industryRoutes, ...localizedRoutes].map(tidy)

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
      availableLanguage: ['English', 'Telugu', 'Hindi'],
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
    inLanguage: r.lang || 'en',
    isPartOf: { '@id': `${SITE}/#website` },
  }
  const graph = [org, site, page]
  if (r.article) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${canonical(r)}#article`,
      headline: r.article.title,
      description: r.article.description,
      datePublished: r.article.date,
      dateModified: r.article.updated || r.article.date,
      inLanguage: 'en',
      mainEntityOfPage: { '@id': `${canonical(r)}#webpage` },
      image: r.image || ogImage,
      author: { '@type': 'Person', name: brand.founder, url: `${SITE}/about` },
      publisher: { '@id': `${SITE}/#organization` },
      keywords: (r.article.tags || []).join(', '),
    })
  }

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
  const ind = industries.find((x) => x.path === r.path) || localized.find((x) => x.path === r.path)
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
  const place = placeByPath[r.path]
  if (place) {
    graph.push({
      '@type': 'Service',
      name: place.kind === 'city' ? `Website design in ${place.name}` : `Website design for small businesses in ${place.short}`,
      serviceType: 'Web design',
      provider: { '@id': `${SITE}/#organization` },
      areaServed: place.kind === 'city'
        ? { '@type': 'City', name: place.name, containedInPlace: { '@type': 'State', name: place.state } }
        : { '@type': 'Country', name: place.short },
      offers: websitePlans.map((p) => ({ '@type': 'Offer', name: `${p.name} website`, price: String(place.kind === 'city' ? p.inr : p.price), priceCurrency: place.kind === 'city' ? 'INR' : 'USD' })),
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
    ...(r.alternates
      ? [...r.alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${abs(a.path)}" />`), `<link rel="alternate" hreflang="x-default" href="${abs(r.alternates[0].path)}" />`]
      : [`<link rel="alternate" hreflang="${r.lang || 'en'}" href="${url}" />`, ...(r.lang ? [] : [`<link rel="alternate" hreflang="x-default" href="${url}" />`])]),
    `<meta property="og:type" content="${r.article ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(brand.name)}" />`,
    `<meta property="og:locale" content="${({ ar: 'ar_AE', hi: 'hi_IN', te: 'te_IN', ta: 'ta_IN', fr: 'fr_FR', de: 'de_DE' })[r.lang] || 'en_US'}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${r.image || ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(brand.name)} — ${esc(brand.tagline)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${r.image || ogImage}" />`,
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
  set('meta[property="og:image"]', 'content', r.image || ogImage)
  set('meta[name="twitter:image"]', 'content', r.image || ogImage)
  set(
    'meta[name="robots"]',
    'content',
    r.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  )
  const ld = document.head.querySelector('script[type="application/ld+json"]')
  if (ld) ld.textContent = JSON.stringify(jsonLd(r))
}
