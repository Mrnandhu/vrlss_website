// ONE place to rename the brand or change contact details.
export const brand = {
  name: 'Vrlss',
  tagline: 'Websites & digital marketing',
  url: 'https://vrlss.in',
  email: 'sai.v.7079@gmail.com', // tip: switch to hello@vrlss.in with free Cloudflare Email Routing
  whatsapp: '919515294733',
  phoneDisplay: '+91 95152 94733',
  location: 'Andhra Pradesh, India',
  founder: 'Sai Durga Prasad Velagaleti',
  founderRole: 'Founder & lead developer',
  twitterHandle: '',
  // Paste the codes from Google Search Console / Bing Webmaster Tools here (just the code, not the whole tag).
  googleVerification: '',
  bingVerification: '',
}

export const waLink = (text = "Hi, I'd like to talk about a website / digital marketing project.") =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`

export const mailLink = (subject = 'New project enquiry', body = '') =>
  `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

// Launch offer. Change `taken` as you sign clients (0 -> 1 -> 2 ... -> 10). The site updates everywhere.
export const launch = { total: 10, taken: 0, discount: 10 }
