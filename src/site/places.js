// Local landing pages: one per city (India) and per country (abroad).
// Add a place here and it gets its own page, sitemap entry, footer link and structured data.
// `demos` are industry slugs from demos/industries.js shown as local examples.

export const cities = [
  {
    slug: 'vijayawada',
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    areas: ['Benz Circle', 'MG Road', 'Governorpet', 'Labbipet', 'Patamata', 'Gunadala', 'Bhavanipuram'],
    demos: ['restaurant', 'hospital', 'coaching-institute', 'jewellery', 'real-estate', 'supermarket'],
    intro: 'From Benz Circle clinics to Governorpet jewellers, Vijayawada customers now check Google and WhatsApp before they visit. We build websites that make that first look count.',
  },
  {
    slug: 'guntur',
    name: 'Guntur',
    state: 'Andhra Pradesh',
    areas: ['Brodipet', 'Arundelpet', 'Lakshmipuram', 'Kothapet', 'Amaravati Road', 'Pattabhipuram'],
    demos: ['hospital', 'school', 'chartered-accountant', 'organic-farm', 'real-estate', 'textile'],
    intro: 'Guntur runs on reputation: hospitals in Brodipet, schools, traders and the chilli and cotton business. A clear website turns that word of mouth into searches that find you.',
  },
  {
    slug: 'visakhapatnam',
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    areas: ['Dwaraka Nagar', 'MVP Colony', 'Siripuram', 'Madhurawada', 'Gajuwaka', 'Rushikonda'],
    demos: ['seafood-export', 'hotel-resort', 'logistics', 'it-company', 'hospital', 'restaurant'],
    intro: 'Vizag businesses sell to tourists, port traders, IT teams and overseas buyers. We build sites that work for a customer in Dwaraka Nagar and a buyer in Dubai alike.',
  },
  {
    slug: 'rajahmundry',
    name: 'Rajahmundry',
    state: 'Andhra Pradesh',
    areas: ['Danavaipeta', 'Innespeta', 'Tilak Road', 'Morampudi', 'Prakash Nagar'],
    demos: ['jewellery', 'textile', 'school', 'function-hall', 'hospital', 'restaurant'],
    intro: 'Jewellers, textile shops, function halls and hospitals in Rajahmundry win customers from across the Godavari districts. A website lets them find you before they travel.',
  },
  {
    slug: 'kakinada',
    name: 'Kakinada',
    state: 'Andhra Pradesh',
    areas: ['Main Road', 'Bhanugudi', 'Sarpavaram', 'Jagannaickpur', 'Ramanayyapeta'],
    demos: ['seafood-export', 'logistics', 'hospital', 'school', 'manufacturing', 'restaurant'],
    intro: 'Kakinada exporters, port businesses, hospitals and schools need to look credible to buyers far beyond the city. We build sites that do that from day one.',
  },
  {
    slug: 'nellore',
    name: 'Nellore',
    state: 'Andhra Pradesh',
    areas: ['Trunk Road', 'Magunta Layout', 'Dargamitta', 'Vedayapalem', 'Balaji Nagar'],
    demos: ['seafood-export', 'organic-farm', 'hospital', 'school', 'restaurant', 'vehicle-showroom'],
    intro: 'From aqua exporters to hospitals on Trunk Road, Nellore businesses are growing past word of mouth. A fast website and Google profile bring in the next customers.',
  },
  {
    slug: 'tirupati',
    name: 'Tirupati',
    state: 'Andhra Pradesh',
    areas: ['Tiruchanur Road', 'AIR Bypass Road', 'Bhavani Nagar', 'Renigunta Road', 'KT Road'],
    demos: ['hotel-resort', 'travel-agency', 'restaurant', 'hospital', 'coaching-institute', 'photography-studio'],
    intro: 'Millions of visitors plan their Tirupati trip on their phones. Hotels, travel agents and restaurants with a clear website and WhatsApp booking get those calls first.',
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    areas: ['HITEC City', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Kukatpally', 'Ameerpet', 'Secunderabad'],
    demos: ['it-company', 'dental-clinic', 'restaurant', 'real-estate', 'gym-fitness', 'interior-design'],
    intro: 'Hyderabad buyers compare five options on their phone before calling one. We build fast, modern sites for clinics, restaurants, builders and IT firms that win that comparison.',
  },
]

export const countries = [
  {
    slug: 'uae',
    lang: 'ar',
    name: 'the UAE',
    short: 'UAE',
    currency: 'AED',
    cities: ['Dubai', 'Sharjah', 'Abu Dhabi', 'Ajman'],
    zone: 'Dubai is 1.5 hours behind India, so your whole working day overlaps with ours.',
    local: 'A small business website in Dubai typically costs AED 8,000 to 15,000 from a local agency.',
    extras: ['English and Arabic (right-to-left) layouts', 'WhatsApp-first enquiries', 'Payment links for cards and Apple Pay'],
    demos: ['restaurant', 'dental-clinic', 'salon-spa', 'real-estate', 'jewellery', 'logistics'],
  },
  {
    slug: 'uk',
    name: 'the UK',
    short: 'UK',
    currency: 'GBP',
    cities: ['London', 'Birmingham', 'Manchester', 'Leicester'],
    zone: 'We reply during your morning and early afternoon (UK time).',
    local: 'A UK freelancer typically charges £1,500 to £3,000 for a 5-page site, and pay-monthly studios £30 to £90 a month.',
    extras: ['Pay monthly, with no big upfront fee', 'GDPR cookie banner and privacy page', 'You own the site after 12 months'],
    demos: ['restaurant', 'electrician-plumber', 'cleaning-pest-control', 'salon-spa', 'cafe-bakery', 'law-firm'],
  },
  {
    slug: 'usa',
    name: 'the USA',
    short: 'USA',
    currency: 'USD',
    cities: ['New York', 'New Jersey', 'Dallas', 'Chicago', 'San Francisco Bay Area'],
    zone: 'We overlap with your morning (Eastern time) and reply overnight to anything sent later.',
    local: 'US small businesses typically pay $2,000 to $8,000 for a professional website.',
    extras: ['Pay monthly, with no big upfront fee', 'You own the domain, code and logins', 'Google Business Profile and reviews setup'],
    demos: ['restaurant', 'dental-clinic', 'real-estate', 'law-firm', 'cleaning-pest-control', 'gym-fitness'],
  },
  {
    slug: 'australia',
    name: 'Australia',
    short: 'Australia',
    currency: 'AUD',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    zone: 'India is 4.5 to 5.5 hours behind Sydney, so we work through your afternoon.',
    local: 'A small business website in Australia typically costs A$2,000 to 6,000.',
    extras: ['Pay monthly, with no big upfront fee', 'Fast hosting close to Australian visitors', 'Same-day replies in your afternoon'],
    demos: ['cafe-bakery', 'electrician-plumber', 'physiotherapy', 'real-estate', 'restaurant', 'architect'],
  },
]

export const placePath = (p) => `/web-design/${p.slug}`
export const places = [...cities.map((c) => ({ ...c, kind: 'city' })), ...countries.map((c) => ({ ...c, kind: 'country' }))]
export const placeByPath = Object.fromEntries(places.map((p) => [placePath(p), p]))
