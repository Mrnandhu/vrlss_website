const individualServices = [
  {
    number: '01',
    title: 'Landing Page',
    description:
      'Single-page responsive website for products, services, events or personal brands.',
    price: '₹999+',
  },
  {
    number: '02',
    title: 'Forms & Systems',
    description:
      'Custom forms, enquiry systems, registrations and data collection.',
    price: '₹1,499+',
  },
  {
    number: '03',
    title: 'Database Development',
    description:
      'Database design, relationships, data modelling and integration.',
    price: '₹2,499+',
  },
  {
    number: '04',
    title: 'Business Website',
    description:
      'Professional website with services, products, WhatsApp, Maps and social integration.',
    price: '₹2,999+',
  },
  {
    number: '05',
    title: 'Admin Dashboard',
    description:
      'Secure dashboard for managing business data, customers, products and records.',
    price: '₹3,499+',
  },
  {
    number: '06',
    title: 'Backend & APIs',
    description:
      'Backend services, REST APIs, authentication, CRUD and integrations.',
    price: '₹3,499+',
  },
  {
    number: '07',
    title: 'Web Application',
    description:
      'Custom interactive applications with workflows, databases and APIs.',
    price: '₹4,499+',
  },
  {
    number: '08',
    title: 'Mobile Application',
    description:
      'Android and cross-platform mobile applications with required functionality.',
    price: '₹4,499+',
  },
  {
    number: '09',
    title: 'Desktop Application',
    description:
      'Custom desktop software for billing, management and internal workflows.',
    price: '₹4,499+',
  },
  {
    number: '10',
    title: 'E-commerce',
    description:
      'Online store with products, categories, cart, checkout and order management.',
    price: '₹4,999+',
  },
  {
    number: '11',
    title: 'AI & Automation',
    description:
      'AI integrations, intelligent workflows and business process automation.',
    price: '₹4,999+',
  },
]

const businessSoftware = [
  ['Billing & Invoice Software', '₹7,999+'],
  ['Inventory Management', '₹7,999+'],
  ['Customer Management System', '₹5,999+'],
  ['Enquiry & Lead Management', '₹5,999+'],
  ['Custom Business Software', '₹6,999+'],
  ['Shop / Business Management', '₹9,999+'],
  ['Restaurant / Food Ordering System', '₹9,999+'],
  ['Digital Payment & Billing', '₹9,999+'],
]

const packages = [
  {
    number: '01',
    label: 'STARTER',
    title: 'Website Starter',
    description:
      'A clean online presence for individuals, services and small businesses.',
    features: [
      'Landing page',
      'Responsive design',
      'WhatsApp contact',
      'Social links',
      'Basic SEO structure',
      'Deployment',
    ],
    price: '₹1,499+',
  },
  {
    number: '02',
    label: 'BUSINESS',
    title: 'Business Launch',
    description:
      'Everything a local business needs to establish a professional digital presence.',
    features: [
      'Business website',
      'Contact / enquiry form',
      'WhatsApp integration',
      'Google Maps',
      'Social integration',
      'Deployment',
    ],
    price: '₹4,499+',
    featured: true,
  },
  {
    number: '03',
    label: 'PROFESSIONAL',
    title: 'Business Digital System',
    description:
      'Website plus the core tools needed to manage customers and enquiries.',
    features: [
      'Business website',
      'Admin dashboard',
      'Customer database',
      'Enquiry management',
      'Product management',
      'WhatsApp integration',
    ],
    price: '₹9,999+',
  },
  {
    number: '04',
    label: 'RETAIL',
    title: 'Retail Management',
    description:
      'A connected system for shops that need billing, inventory and customer management.',
    features: [
      'Business website',
      'Billing',
      'Inventory',
      'Customer management',
      'Invoice generation',
      'Admin dashboard',
    ],
    price: '₹14,999+',
  },
  {
    number: '05',
    label: 'RESTAURANT',
    title: 'Restaurant Digital System',
    description:
      'Digital menu and ordering infrastructure combined with management tools.',
    features: [
      'Digital menu',
      'Online ordering',
      'Order management',
      'Billing',
      'WhatsApp communication',
      'Admin dashboard',
    ],
    price: '₹14,999+',
  },
  {
    number: '06',
    label: 'CUSTOM',
    title: 'Custom Business System',
    description:
      'Designed around your actual business workflow rather than a fixed package.',
    features: [
      'Requirement analysis',
      'Custom UI / UX',
      'Business workflows',
      'Authentication',
      'Database & APIs',
      'Reports & deployment',
    ],
    price: 'CUSTOM QUOTE',
    dark: true,
  },
]

function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">

        <div className="pricing-hero">
          <div>
            <div className="pricing-eyebrow">
              <span>12</span>
              <i />
              PRICING
            </div>

            <h2>
              START SMALL.
              <br />
              <em>BUILD BIG.</em>
            </h2>
          </div>

          <p>
            Starting prices for common projects. Every project is scoped
            according to your requirements, features and complexity.
          </p>
        </div>

        <div className="pricing-group">
          <div className="pricing-group-title">
            <span>01</span>
            INDIVIDUAL SERVICES
          </div>

          <div className="pricing-service-grid">
            {individualServices.map((service) => (
              <article
                className={`pricing-service-card ${
                  service.number === '07' ? 'pricing-service-featured' : ''
                }`}
                key={service.number}
              >
                <span className="pricing-card-number">
                  {service.number}
                </span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <strong>
                  {service.price.replace('+', '')}
                  <b>+</b>
                </strong>
              </article>
            ))}
          </div>
        </div>

        <div className="pricing-group">
          <div className="pricing-group-title">
            <span>02</span>
            BUSINESS SOFTWARE
          </div>

          <div className="pricing-business-list">
            {businessSoftware.map(([title, price]) => (
              <div className="pricing-business-row" key={title}>
                <span>{title}</span>
                <strong>{price.replace('+', '')}<b>+</b></strong>
              </div>
            ))}
          </div>
        </div>

        <div className="pricing-group">
          <div className="pricing-group-title">
            <span>03</span>
            COMBO PACKAGES
          </div>

          <div className="pricing-package-grid">
            {packages.map((pkg) => (
              <article
                key={pkg.number}
                className={`pricing-package-card ${
                  pkg.featured ? 'pricing-package-featured' : ''
                } ${pkg.dark ? 'pricing-package-dark' : ''}`}
              >
                <div className="pricing-package-top">
                  <span>{pkg.label}</span>
                  <small>{pkg.number}</small>
                </div>

                <h3>{pkg.title}</h3>

                <p>{pkg.description}</p>

                <ul>
                  {pkg.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <strong>{pkg.price}</strong>

                <button type="button">
                  {pkg.dark ? 'DISCUSS PROJECT' : 'START PROJECT'} →
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="pricing-note">
          <span>NOTE</span>
          <p>
            Prices shown are starting prices. Final pricing depends on
            requirements, functionality, integrations, content and project
            complexity.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Pricing
