import {
  Globe2,
  Monitor,
  Smartphone,
  Boxes,
  ArrowUpRight,
} from 'lucide-react'

const capabilities = [
  {
    number: '01',
    title: 'Websites',
    description: 'Responsive digital experiences for businesses, products and services.',
    icon: Globe2,
  },
  {
    number: '02',
    title: 'Web Applications',
    description: 'Interactive systems built around workflows, users and business requirements.',
    icon: Monitor,
  },
  {
    number: '03',
    title: 'Mobile Applications',
    description: 'Mobile experiences designed around the needs of the product and its users.',
    icon: Smartphone,
  },
  {
    number: '04',
    title: 'Custom Software',
    description: 'Purpose-built software for specific business workflows and operational needs.',
    icon: Boxes,
  },
]

function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">

        <div className="about-heading">

          <div className="section-eyebrow">
            <span />
            ABOUT VRLS
          </div>

          <div className="about-heading-grid">

            <h2>
              Technology built
              <br />
              around <em>real needs.</em>
            </h2>

            <p>
              VRLS Solutions builds digital products around the requirements
              of businesses, entrepreneurs and individuals — from focused
              websites to applications and custom software.
            </p>

          </div>

        </div>

        <div className="about-main">

          <div className="about-statement">

            <div className="about-orbit orbit-one" />
            <div className="about-orbit orbit-two" />
            <div className="about-orbit orbit-three" />

            <div className="about-symbol">
              <span>V</span>
            </div>

            <div className="about-statement-content">
              <span className="about-small-label">THE APPROACH</span>

              <h3>
                Start with the
                <br />
                <em>requirement.</em>
              </h3>

              <p>
                Every product has a different purpose. The technology,
                structure and experience should follow what the product
                actually needs.
              </p>
            </div>

            <div className="about-arrow">
              <ArrowUpRight size={20} />
            </div>

          </div>

          <div className="about-capabilities">

            <div className="about-capabilities-header">
              <span>WHAT WE BUILD</span>
              <span>VRLS / CAPABILITIES</span>
            </div>

            <div className="capability-list">

              {capabilities.map((item) => {
                const Icon = item.icon

                return (
                  <div className="capability-item" key={item.number}>

                    <div className="capability-number">
                      {item.number}
                    </div>

                    <div className="capability-icon">
                      <Icon size={19} strokeWidth={1.7} />
                    </div>

                    <div className="capability-content">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <ArrowUpRight
                      className="capability-arrow"
                      size={19}
                    />

                  </div>
                )
              })}

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default About
