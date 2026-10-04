import {
  Globe,
  Monitor,
  Smartphone,
  Boxes,
  Building2,
  Bot,
  ArrowUpRight,
} from 'lucide-react'

const services = [
  {
    number: '01',
    icon: Globe,
    title: 'Websites',
    description:
      'Modern, responsive websites designed around your business, product, service, or personal brand.',
    tags: ['Responsive', 'Modern UI', 'Performance'],
  },
  {
    number: '02',
    icon: Monitor,
    title: 'Web Applications',
    description:
      'Interactive web applications built to handle real workflows, data, users, and business operations.',
    tags: ['Dashboards', 'Workflows', 'Web Systems'],
  },
  {
    number: '03',
    icon: Smartphone,
    title: 'Mobile Applications',
    description:
      'Mobile applications designed for Android and iOS around the requirements of your product or business.',
    tags: ['Android', 'iOS', 'Cross-platform'],
  },
  {
    number: '04',
    icon: Boxes,
    title: 'Custom Software',
    description:
      'Software tailored to a specific business workflow, requirement, or operational problem.',
    tags: ['Business Tools', 'Automation', 'Custom Systems'],
  },
  {
    number: '05',
    icon: Building2,
    title: 'Business Systems',
    description:
      'Connected digital systems for managing business operations, information, customers, products, and workflows.',
    tags: ['Management', 'Operations', 'Business Tools'],
  },
  {
    number: '06',
    icon: Bot,
    title: 'AI & Automation',
    description:
      'AI-powered features and automated workflows designed to reduce repetitive work and improve digital processes.',
    tags: ['AI Integration', 'Automation', 'Workflows'],
  },
]

function Services() {
  return (
    <section id="services" className="services-section">
      <div className="section-container">

        {/* Section heading */}
        <div className="services-heading">

          <div className="section-eyebrow">
            <span />
            WHAT WE BUILD
          </div>

          <div className="services-heading-content">
            <h2>
              Digital products
              <br />
              built around <em>your needs.</em>
            </h2>

            <p>
              From focused websites to custom software systems, we build
              digital products according to the requirements of each project.
            </p>
          </div>

        </div>

        {/* Service cards */}
        <div className="services-grid">

          {services.map((service) => {
            const Icon = service.icon

            return (
              <article className="service-card" key={service.number}>

                <div className="service-card-top">

                  <div className="service-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <span className="service-number">
                    {service.number}
                  </span>

                  <ArrowUpRight
                    className="service-arrow"
                    size={20}
                    strokeWidth={1.8}
                  />

                </div>

                <div className="service-card-content">

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                </div>

              </article>
            )
          })}

        </div>

      </div>
    </section>
  )
}

export default Services
