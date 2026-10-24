// Homepage copy. Brand details, prices, demos, sectors, markets and FAQs all come from the
// site's existing data files, so editing those still updates the homepage.
import { brand } from '../brand'
import { industries, industryByPath, sectors } from '../demos/industries'
import { LANGS } from '../demos/locales'
import { currencies } from '../prices'

export const rotatingWords = ['websites', 'online stores', 'booking apps', 'dashboards', 'client portals']

export const hero = {
  badge: 'Design & engineering studio',
  badgeTail: 'Worldwide',
  lead: 'Design, engineering and marketing for ambitious brands worldwide.',
  promises: ['Free demo first', 'Fixed price', 'You own the code', `Replies ${brand.reply}`],
  scrollCue: 'Scroll to explore',
}

export const glance = {
  eyebrow: 'At a glance',
  heading: 'From idea to launch.',
  lead: 'A custom homepage design you approve before we build: sharp on desktop, fast on every phone.',
  stats: [
    [industries.length, '', 'Industry demos'],
    [Object.keys(LANGS).length, '', 'Languages, incl. Arabic'],
    [currencies.length, '', 'Currencies'],
    [3, 'days', 'To your first demo'],
  ],
}

export const capabilities = {
  eyebrow: 'Capabilities',
  heading: 'One team, end to end.',
  items: [
    ['layout', 'Web design & development', ['Corporate', 'Landing pages', 'Multilingual'], '/websites'],
    ['cart', 'E-commerce', ['Stores', 'Payments', 'Catalogues'], '/websites'],
    ['layers', 'Web apps & portals', ['Bookings', 'Dashboards', 'CRM'], '/work'],
    ['search', 'SEO & performance', ['Technical SEO', 'Core Web Vitals', 'Local'], '/digital-marketing'],
    ['megaphone', 'Digital marketing', ['Google Ads', 'Meta Ads', 'Social'], '/digital-marketing'],
    ['wrench', 'Care & hosting', ['Updates', 'Backups', 'Uptime'], '/pricing'],
  ],
}

export const process = {
  eyebrow: 'How we work',
  heading: 'Four steps to launch.',
  steps: [
    ['compass', 'Discover', 'Goals, audience, scope.'],
    ['palette', 'Design', 'A free homepage demo, before you pay anything.'],
    ['code', 'Build', 'Fast, secure, tested.'],
    ['rocket', 'Launch & grow', 'SEO, ads and care after launch.'],
  ],
}

// Six live demos for the 3D gallery wall (photos in public/assets/photos/).
export const work = {
  eyebrow: 'Selected work',
  heading: 'See it live. Not in slides.',
  allLabel: `All ${industries.length} demos`,
  items: [
    '/work/websites/restaurant',
    '/work/websites/real-estate',
    '/work/websites/salon-spa',
    '/work/websites/interior-design',
    '/work/websites/hospital',
    '/work/websites/cafe-bakery',
  ]
    .map((p) => industryByPath[p])
    .filter((x) => x && x.img)
    .map((x) => ({ title: x.name, category: x.cat, image: `/assets/photos/${x.img}.webp`, path: x.path })),
}

export const industriesBlock = {
  eyebrow: 'Industries',
  heading: `Built for ${sectors.length} sectors.`,
}

export const standards = {
  eyebrow: 'Engineering standards',
  heading: 'Built to global standards.',
  sub: 'Every project, every budget.',
  items: [
    ['gauge', '90+', 'PageSpeed target'],
    ['devices', 'Mobile-first', 'Every screen size'],
    ['shield', 'WCAG', 'Accessible by design'],
    ['lock', 'HTTPS', 'Security headers'],
    ['language', 'RTL ready', 'Arabic & multilingual'],
    ['chart', 'Analytics', 'GA4 & Search Console'],
  ],
}

export const engagement = {
  eyebrow: 'Engagement',
  heading: 'Transparent pricing.',
  note: 'Your first homepage demo is free, before you pay anything.',
}

export const faqBlock = { eyebrow: 'FAQ', heading: 'Questions, answered.' }

export const finalCta = {
  heading: "Let's build what's next.",
  lead: 'Your first demo is free.',
}
