import { useEffect } from 'react'

const SITE_URL = 'https://vrlss.in'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

const page = {
  title: 'VRLS Solutions | Web Development & Digital Solutions for GCC Businesses',
  description:
    'VRLS Solutions builds professional websites, web applications, mobile apps, custom software and business systems for companies across the GCC and international markets.',
  type: 'website',
  index: true,
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

function SEO() {
  useEffect(() => {
    const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    const robots = page.index
      ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      : 'noindex, follow, noarchive'

    document.title = page.title

    setMeta('description', page.description)
    setMeta('robots', robots)
    setMeta('googlebot', robots)
    setMeta('theme-color', '#FEF5EE')
    setMeta('author', 'VRLS Solutions')
    setMeta('application-name', 'VRLS Solutions')

    setProperty('og:type', page.type)
    setProperty('og:site_name', 'VRLS Solutions')
    setProperty('og:title', page.title)
    setProperty('og:description', page.description)
    setProperty('og:url', canonical)
    setProperty('og:image', DEFAULT_IMAGE)
    setProperty('og:image:alt', 'VRLS Solutions digital products and services')
    setProperty('og:locale', 'en')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', page.title)
    setMeta('twitter:description', page.description)
    setMeta('twitter:image', DEFAULT_IMAGE)
    setMeta('twitter:url', canonical)

    setCanonical(canonical)

    const organization = {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'VRLS Solutions',
      alternateName: 'VRLS',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      image: DEFAULT_IMAGE,
      email: 'sai.v.7079@gmail.com',
      telephone: '+91 9515294733',
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Qatar' },
        { '@type': 'Country', name: 'Kuwait' },
        { '@type': 'Country', name: 'Bahrain' },
        { '@type': 'Country', name: 'Oman' },
        { '@type': 'Place', name: 'International' },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: '+91 9515294733',
        email: 'sai.v.7079@gmail.com',
        availableLanguage: ['English'],
      },
    }

    const website = {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'VRLS Solutions',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'en',
    }

    const webPage = {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'en',
    }

    const services = [
      'Website Development',
      'Web Application Development',
      'Mobile App Development',
      'Custom Software Development',
      'Business Systems',
      'AI & Automation',
    ].map((name) => ({
      '@type': 'Service',
      name,
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
    }))

    setStructuredData({
      '@context': 'https://schema.org',
      '@graph': [organization, website, webPage, ...services],
    })
  }, [])

  return null
}

export default SEO
