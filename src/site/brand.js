// ONE place to rename the brand or change contact details.
export const brand = {
  name: 'VRLS Solutions',
  shortName: 'Vrlss',
  tagline: 'Websites & digital marketing',
  url: 'https://vrlss.in',
  email: 'sai@vrlss.in',
  whatsapp: '919515294733',
  phoneDisplay: '+91 95152 94733',
  location: 'Andhra Pradesh, India',
  region: 'Andhra Pradesh',
  country: 'IN',
  founder: 'Sai Durga Prasad Velagaleti',
  founderShort: 'Sai',
  founderRole: 'Founder, designer and developer',
  // How fast you reply and when. Shown on Home, Contact and city pages. Keep it honest.
  reply: 'within 2 hours',
  hours: '9 am – 9 pm IST, Monday to Saturday',
  hoursShort: '9 am – 9 pm IST',
  legalForm: 'sole proprietorship',
  twitterHandle: '',
  // Paste the codes from Google Search Console / Bing Webmaster Tools here (just the code, not the whole tag).
  googleVerification: '',
  bingVerification: '',
  // Social profiles: paste full URLs once created. Empty ones are hidden.
  social: {
    instagram: '',
    youtube: '',
    linkedin: '',
    facebook: '',
  },
}

export const waLink = (text = "Hi Sai, I'd like a free demo of a website for my business.") =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`

export const mailLink = (subject = 'New project enquiry', body = '') =>
  `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

// Founding-client offer. Raise `taken` as you sign clients. The spot counter only appears once
// `taken` reaches `showCountFrom`, so the site never announces "0 clients".
export const launch = { total: 10, taken: 0, discount: 10, showCountFrom: 3 }

// Fill these in when you get them; each line appears in the footer only when it has a value.
export const registration = {
  udyam: '', // free at udyamregistration.gov.in, e.g. 'UDYAM-AP-00-0000000'
  gstin: '', // only needed above the GST turnover threshold
}

// The people clients work with. Add the marketing head's name in `name` when ready; until then only the role shows.
export const team = [
  { name: 'Sai Durga Prasad Velagaleti', short: 'Sai', role: 'Founder · Design and development', note: 'Designs and builds every website himself.' },
  { name: '', short: '', role: 'Marketing Head · SEO, social media and ads', note: 'Runs Google Business Profiles, social media and ad campaigns.' },
]

// REAL reviews only. Paste each review exactly as the client wrote it (Google, WhatsApp with permission, email).
// Sections that show reviews stay hidden until there is at least one; the hero rating appears from 3 reviews.
// Example entry:
// { name: 'Ravi Kumar', business: 'Sri Sai Tiffins', city: 'Vijayawada', rating: 5, text: '...', source: 'Google', date: '2026-11-02' },
export const reviews = []
export const reviewLink = '' // your Google "write a review" link, from Google Business Profile > Ask for reviews

// REAL case studies only. Sections stay hidden until there is at least one.
// { business: 'Sri Sai Tiffins', city: 'Vijayawada', industry: 'Restaurant', img: 'restaurant', result: '3x more WhatsApp orders in 6 weeks', did: ['8-page website', 'Google Business Profile', 'WhatsApp ordering'], quote: '', url: '' },
export const caseStudies = []

// What every website project includes (shown on Home, Pricing and city pages).
export const included = [
  ['Design made for you', 'A custom homepage design you approve before we build.'],
  ['Mobile-first build', 'Fast on phones, tablets and desktops.'],
  ['Domain in your name', 'You own the domain, code, content and every login.'],
  ['Hosting set up', 'Secure HTTPS hosting configured and tested.'],
  ['Google ready', 'Search Console, sitemap, titles and Google Business Profile help.'],
  ['WhatsApp and forms', 'Every enquiry reaches your phone.'],
  ['Training', 'A short call so you know how everything works.'],
  ['30 days support', 'Free fixes and small changes after launch.'],
]
