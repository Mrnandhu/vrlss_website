import { useCallback, useEffect, useRef } from 'react'
import './SolutionShowcase.css'

const solutions = [
  {
    number: '01',
    title: 'MEDORA CLINIC',
    category: 'Clinics & Medical Centres',
    description:
      'A bilingual clinic website with live opening hours, clear prices, insurance details and WhatsApp booking.',
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=70',
    href: '/demos/medora-clinic',
    bilingual: true,
    accent: '#0073AB',
    accentLight: '#DEF3FF',
    dark: '#04334D',
  },
  {
    number: '02',
    title: 'MAJLIS KITCHEN',
    category: 'Restaurants & Cafés',
    description:
      'A bilingual restaurant website with a full menu, delivery details and WhatsApp ordering.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=70',
    href: '/demos/majlis-kitchen',
    bilingual: true,
    accent: '#92722A',
    accentLight: '#F2ECCF',
    dark: '#361E12',
  },
  {
    number: '03',
    title: 'ORBIT BEAUTY STUDIO',
    category: 'Salons & Beauty',
    description:
      'A bilingual ladies salon website with service prices, home-service booking and WhatsApp appointments.',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=70',
    href: '/demos/orbit-beauty-studio',
    bilingual: true,
    accent: '#A21CAF',
    accentLight: '#FAE8FF',
    dark: '#4A044E',
  },
  {
    number: '04',
    title: 'MOTION AUTO',
    category: 'Garages & Car Services',
    description:
      'A bilingual garage website with service prices, free pick-up booking and WhatsApp quotes.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=70',
    href: '/demos/motion-auto',
    bilingual: true,
    accent: '#F29F0E',
    accentLight: '#FDF4C8',
    dark: '#441B04',
  },
  {
    number: '05',
    title: 'NADEEF HOME SERVICES',
    category: 'Cleaning & Maintenance',
    description:
      'A bilingual cleaning and AC maintenance website with clear prices and same-day WhatsApp booking.',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=70',
    href: '/demos/nadeef-home-services',
    bilingual: true,
    accent: '#002DC2',
    accentLight: '#D3EDFF',
    dark: '#071C5F',
  },
  {
    number: '06',
    title: 'NOVA DEVELOPMENTS',
    category: 'Property & Development',
    description:
      'A premium digital experience designed for property developers, real estate companies and development projects.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=70',
    href: '/demos/nova-developments',
    accent: '#F29F0E',
    accentLight: '#FDF4C8',
    dark: '#441B04',
  },
  {
    number: '07',
    title: 'ATLAS INTERIORS',
    category: 'Interior & Fit-out',
    description:
      'An image-led digital experience for interior studios, fit-out companies and design-led businesses.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=70',
    href: '/demos/atlas-interiors',
    accent: '#B68A35',
    accentLight: '#E6D7A2',
    dark: '#361E12',
  },
  {
    number: '08',
    title: 'ALPHA CONTRACTING',
    category: 'Construction & Contracting',
    description:
      'A strong corporate digital experience for contracting companies, construction firms and infrastructure businesses.',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=70',
    href: '/demos/alpha-contracting',
    accent: '#087F5B',
    accentLight: '#D7F1E8',
    dark: '#073B2E',
  },
  {
    number: '09',
    title: 'LUMI EVENTS',
    category: 'Events & Venues',
    description:
      'A visual-first platform for event companies, venues, wedding planners and private functions.',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=70',
    href: '/demos/lumi-events',
    accent: '#D946A6',
    accentLight: '#FBE0F2',
    dark: '#4A123A',
  },
  {
    number: '10',
    title: 'GULFCORE TRADING',
    category: 'Trading & B2B',
    description:
      'A structured digital platform for suppliers, distributors, manufacturers and B2B businesses.',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=70',
    href: '/demos/gulfcore-trading',
    accent: '#B68A35',
    accentLight: '#E6D7A2',
    dark: '#361E12',
  },
  {
    number: '11',
    title: 'SANDS TOURISM',
    category: 'Travel & Experiences',
    description:
      'An immersive digital experience for tourism operators, travel companies and destination experiences.',
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=70',
    href: '/demos/sands-tourism',
    accent: '#B42318',
    accentLight: '#FBE0DC',
    dark: '#4A1210',
  },
]

export default function SolutionShowcase() {
  const stackRef = useRef(null)
  const isResettingRef = useRef(false)

  // Three copies create a seamless infinite carousel.
  const carouselSolutions = [
    ...solutions,
    ...solutions,
    ...solutions,
  ]

  const getCards = () => {
    const stack = stackRef.current
    if (!stack) return []

    return Array.from(
      stack.querySelectorAll('.showcase-card')
    )
  }

  const getCardPosition = (card) => {
    const stack = stackRef.current
    if (!stack || !card) return 0

    const cardWidth = card.getBoundingClientRect().width

    return (
      card.offsetLeft -
      (stack.clientWidth - cardWidth) / 2
    )
  }

  const scrollToMiddle = useCallback(() => {
    const stack = stackRef.current
    if (!stack) return

    const cards = getCards()
    const middleIndex = solutions.length
    const middleCard = cards[middleIndex]

    if (!middleCard) return

    isResettingRef.current = true

    stack.scrollTo({
      left: getCardPosition(middleCard),
      behavior: 'auto',
    })

    requestAnimationFrame(() => {
      isResettingRef.current = false
    })
  }, [])

  const getActiveIndex = () => {
    const stack = stackRef.current
    if (!stack) return 0

    const cards = getCards()
    if (!cards.length) return 0

    const centerX =
      stack.getBoundingClientRect().left +
      stack.clientWidth / 2

    let activeIndex = 0
    let closestDistance = Infinity

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const distance = Math.abs(centerX - cardCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        activeIndex = index
      }
    })

    return activeIndex
  }

  const scrollCards = useCallback((direction) => {
    const stack = stackRef.current
    if (!stack || isResettingRef.current) return

    const cards = getCards()
    if (!cards.length) return

    const total = solutions.length
    let activeIndex = getActiveIndex()
    let targetIndex = activeIndex + direction

    // Move back into the middle copy before reaching either duplicate edge.
    if (targetIndex < total) {
      targetIndex += total
    }

    if (targetIndex >= total * 2) {
      targetIndex -= total
    }

    const targetCard = cards[targetIndex]
    if (!targetCard) return

    stack.scrollTo({
      left: getCardPosition(targetCard),
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const handleScroll = () => {
      if (isResettingRef.current) return

      const cards = getCards()
      if (!cards.length) return

      const activeIndex = getActiveIndex()
      const total = solutions.length

      // If the user reaches the first duplicate copy,
      // silently move to the identical middle copy.
      if (activeIndex < total) {
        const equivalentCard = cards[activeIndex + total]

        if (equivalentCard) {
          isResettingRef.current = true

          stack.scrollTo({
            left: getCardPosition(equivalentCard),
            behavior: 'auto',
          })

          requestAnimationFrame(() => {
            isResettingRef.current = false
          })
        }
      }

      // If the user reaches the third copy,
      // silently move to the identical middle copy.
      if (activeIndex >= total * 2) {
        const equivalentCard = cards[activeIndex - total]

        if (equivalentCard) {
          isResettingRef.current = true

          stack.scrollTo({
            left: getCardPosition(equivalentCard),
            behavior: 'auto',
          })

          requestAnimationFrame(() => {
            isResettingRef.current = false
          })
        }
      }
    }

    const initialize = () => {
      scrollToMiddle()
    }

    stack.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', initialize)

    initialize()

    return () => {
      stack.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', initialize)
    }
  }, [scrollToMiddle])

  return (
    <section className="solution-showcase" id="showcase">
      <div className="showcase-intro">
        <div className="showcase-intro-label">
          <span />
          SELECTED SOLUTIONS
        </div>

        <div className="showcase-intro-grid">
          <h2>
            Digital experiences
            <em> built around business.</em>
          </h2>

          <p>
            Explore selected digital experiences created by VRLS
            for different industries, businesses and opportunities.
          </p>
        </div>
      </div>

      <div className="showcase-carousel">
        <button
          type="button"
          className="showcase-arrow showcase-arrow-left"
          aria-label="Previous solution"
          onClick={() => scrollCards(-1)}
        >
          ←
        </button>

        <div
          className="showcase-stack"
          ref={stackRef}
        >
          {carouselSolutions.map((solution, index) => {
            const words = solution.title.split(' ')
            const brand = words[0]
            const subtitle = words.slice(1).join(' ')

            return (
              <article
                className="showcase-card"
                key={`${solution.number}-${index}`}
                style={{
                  '--showcase-accent': solution.accent,
                  '--showcase-accent-light': solution.accentLight,
                  '--showcase-dark': solution.dark,
                }}
              >
                <div className="showcase-card-top">
                  <span className="showcase-category">
                    {solution.category}
                  </span>

                  <span className="showcase-status">
                    {solution.bilingual ? (
                      <>
                        ENGLISH + <span style={{ letterSpacing: 0 }}>عربي</span>
                      </>
                    ) : (
                      'SOLUTION CONCEPT'
                    )}
                  </span>
                </div>

                <div className="showcase-card-grid">
                  <div className="showcase-card-copy">
                    <h3>{solution.title}</h3>

                    <p>{solution.description}</p>

                    <a
                      href={solution.href}
                      className="showcase-link"
                    >
                      VIEW CONCEPT
                      <b>↗</b>
                    </a>
                  </div>

                  <a
                    href={solution.href}
                    className="showcase-image"
                    aria-label={`View ${solution.title} concept`}
                  >
                    <img
                      src={solution.image}
                      srcSet={`${solution.image.replace('w=800', 'w=500')} 500w, ${solution.image} 800w`}
                      sizes="(max-width: 760px) 82vw, 410px"
                      width="800"
                      height="500"
                      alt={`${solution.title} concept`}
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="showcase-image-overlay" />

                    <div className="showcase-image-label">
                      <span>{brand}</span>
                      <small>{subtitle}</small>
                    </div>

                    <div className="showcase-image-arrow">
                      ↗
                    </div>
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <button
          type="button"
          className="showcase-arrow showcase-arrow-right"
          aria-label="Next solution"
          onClick={() => scrollCards(1)}
        >
          →
        </button>
      </div>
    </section>
  )
}
