import { useEffect } from 'react'

const SITE_URL = 'https://vrlss.in'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

const pages = {
  '/': {
    title: 'VRLS Solutions | Websites, Web Apps & Custom Software',
    description:
      'VRLS Solutions builds modern business websites, web applications, mobile apps, custom software, business systems and AI automation for businesses and growing teams.',
    type: 'website',
    index: true,
  },
  '/demos/function-hall': {
    title: 'Function Hall Website Demo | VRLS Solutions',
    description:
      'Explore a fictional function hall website concept with venue spaces, packages, gallery and event enquiry flows built by VRLS Solutions.',
    index: true,
  },
  '/demos/interior-design': {
    title: 'Interior Designer Website Demo | VRLS Solutions',
    description:
      'Explore a fictional interior design website concept with project portfolios, services, galleries and enquiry flows built by VRLS Solutions.',
    index: true,
  },
  '/demos/real-estate': {
    title: 'Real Estate Website Demo | Property Listings | VRLS Solutions',
    description:
      'Explore a fictional real estate website concept with property listings, search, filters, property details and lead enquiry flows.',
    index: true,
  },
  '/demos/wedding-events': {
    title: 'Wedding & Events Website Demo | VRLS Solutions',
    description:
      'Explore a fictional wedding and events website concept with services, packages, galleries and event enquiry flows.',
    index: true,
  },
  '/demos/restaurant': {
    title: 'Restaurant Website Demo | Menu & Table Booking | VRLS Solutions',
    description:
      'Explore a fictional restaurant website concept with a digital menu, food categories, dining information and table booking experience.',
    index: true,
  },
  '/demos/cafe': {
    title: 'Cafe Website Demo | Menu & Table Enquiries | VRLS Solutions',
    description:
      'Explore a fictional cafe website concept with signature drinks, food menu, atmosphere and table enquiry experience.',
    index: true,
  },
  '/demos/boutique': {
    title: 'Boutique & Fashion Website Demo | VRLS Solutions',
    description:
      'Explore a fictional boutique and fashion website concept with collections, product catalogue, product details and enquiry flows.',
    index: true,
  },
  '/demos/furniture': {
    title: 'Furniture Store Website Demo | Product Catalogue | VRLS Solutions',
    description:
      'Explore a fictional furniture store website concept with product categories, specifications, galleries and customer enquiry flows.',
    index: true,
  },
  '/demos/education': {
    title: 'Education Website Demo | Courses & Admissions | VRLS Solutions',
    description:
      'Explore a fictional education website concept for coaching centres, schools and colleges with courses, programs and admissions enquiries.',
    index: true,
  },
  '/demos/hospital': {
    title: 'Hospital & Clinic Management Demo | Appointments | VRLS Solutions',
    description:
      'Explore a fictional clinic management system concept with patients, doctors, appointments, billing, medical records and appointment booking.',
    index: true,
  },
  '/demos/restaurant/booking': {
    title: 'Restaurant Booking Demo | VRLS Solutions',
    description: 'Interactive restaurant booking demonstration by VRLS Solutions.',
    index: false,
  },
  '/demos/showroom': {
    title: 'Showroom Management Demo | VRLS Solutions',
    description: 'Demonstration software concept by VRLS Solutions.',
    index: false,
  },
  '/demos/mart-billing': {
    title: 'Mart Billing Demo | VRLS Solutions',
    description: 'Demonstration billing software concept by VRLS Solutions.',
    index: false,
  },
  '/demos/ai-assistant': {
    title: 'AI Assistant Demo | VRLS Solutions',
    description: 'Demonstration AI assistant concept by VRLS Solutions.',
    index: false,
  },
  '/demos/ecommerce': {
    title: 'E-commerce Demo | VRLS Solutions',
    description: 'Demonstration e-commerce concept by VRLS Solutions.',
    index: false,
  },
}

function setMeta(name, content) {
  let element = document.head.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setProperty(property, content) {
  let element = document.head.querySelector(`meta[property="${property}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('property', property)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', url)
}

function setStructuredData(data) {
  let element = document.head.querySelector('#vrlss-structured-data')
  if (!element) {
    element = document.createElement('script')
    element.id = 'vrlss-structured-data'
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(data)
}

function getPage(pathname) {
  return pages[pathname] || {
    title: 'VRLS Solutions | Digital Products & Software',
    description:
      'VRLS Solutions builds websites, web applications, mobile apps, custom business software and AI-powered digital solutions.',
    index: false,
  }
}

function SEO() {
  useEffect(() => {
    const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
    const page = getPage(pathname)
    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    const robots = page.index
      ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      : 'noindex, follow, noarchive'

    document.title = page.title
    setMeta('description', page.description)
    setMeta('robots', robots)
    setMeta('googlebot', robots)
    setMeta('theme-color', '#f8faf9')
    setMeta('author', 'VRLS Solutions')
    setMeta('application-name', 'VRLS Solutions')

    setProperty('og:type', page.type || 'website')
    setProperty('og:site_name', 'VRLS Solutions')
    setProperty('og:title', page.title)
    setProperty('og:description', page.description)
    setProperty('og:url', canonical)
    setProperty('og:image', DEFAULT_IMAGE)
    setProperty('og:image:alt', 'VRLS Solutions digital products and services')
    setProperty('og:locale', 'en_IN')
    setMeta('twitter:url', canonical)

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', page.title)
    setMeta('twitter:description', page.description)
    setMeta('twitter:image', DEFAULT_IMAGE)

    setCanonical(canonical)

    const organization = {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'VRLS Solutions',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      image: DEFAULT_IMAGE,
      email: 'sai.v.7079@gmail.com',
      telephone: '+91 9515294733',
      sameAs: [
        'https://in.linkedin.com/in/sai-durga-prasad-velagaleti-1b2554431',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: '+91 9515294733',
        availableLanguage: ['English', 'Telugu'],
      },
    }

    const website = {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'VRLS Solutions',
      url: SITE_URL,
      description:
        'Websites, web applications, mobile applications, custom business software and AI automation.',
      publisher: { '@id': `${SITE_URL}/#organization` },
    }

    const webPage = {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      name: page.title,
      description: page.description,
      url: canonical,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: DEFAULT_IMAGE,
      },
    }

    const services = [
      'Website Development',
      'Web Application Development',
      'Mobile Application Development',
      'Custom Business Software',
      'Business Management Systems',
      'AI & Automation',
    ].map((name, index) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-${index + 1}`,
      name,
      provider: { '@id': `${SITE_URL}/#organization` },
    }))

    const demoItemList = {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#demo-solutions`,
      name: 'VRLS Demo Solutions',
      itemListElement: [
        ['function-hall', 'Function Hall Website Demo'],
        ['interior-design', 'Interior Designer Website Demo'],
        ['real-estate', 'Real Estate Website Demo'],
        ['wedding-events', 'Wedding & Events Website Demo'],
        ['restaurant', 'Restaurant Website Demo'],
        ['cafe', 'Cafe Website Demo'],
        ['boutique', 'Boutique & Fashion Website Demo'],
        ['furniture', 'Furniture Store Website Demo'],
        ['education', 'Education Website Demo'],
        ['hospital', 'Hospital & Clinic Management Demo'],
      ].map(([slug, name], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        url: `${SITE_URL}/demos/${slug}`,
      })),
    }

    setStructuredData({
      '@context': 'https://schema.org',
      '@graph': [organization, website, webPage, ...services, demoItemList],
    })
  }, [])

  return null
}

export default SEO
