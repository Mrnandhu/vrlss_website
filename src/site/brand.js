// ONE place to rename the brand or change contact details.
export const brand = {
  name: 'VRLS Solutions',
  shortName: 'Vrlss',
  tagline: 'Websites & digital marketing',
  url: 'https://vrlss.in',
  // Free upgrade later: set up hello@vrlss.in with Cloudflare Email Routing (free) and change this one line.
  email: 'sai.v.7079@gmail.com',
  whatsapp: '919515294733',
  phoneDisplay: '+91 95152 94733',
  location: 'Andhra Pradesh, India',
  region: 'Andhra Pradesh',
  country: 'IN',
  founder: 'Sai Durga Prasad Velagaleti',
  founderShort: 'Sai',
  founderRole: 'Founder, designer and developer',
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
