import {
  ArrowUpRight,
  Utensils,
  Receipt,
  Smartphone,
  Hospital,
  LayoutDashboard,
  Bot,
} from 'lucide-react'

const projects = [
  {
    number: '01',
    type: 'VRLS DEMO / CONCEPT',
    title: 'Restaurant Website',
    description:
      'A modern responsive website concept for restaurants, cafés and food businesses.',
    tags: ['Website', 'Responsive', 'Business'],
    icon: Utensils,
    className: 'work-restaurant',
    demo: '/demos/restaurant',
  },
  {
    number: '02',
    type: 'VRLS DEMO / CONCEPT',
    title: 'Clothing Showroom Dashboard',
    description:
      'A business dashboard concept for managing showroom products, inventory, customers, sales and store operations.',
    tags: ['Web Application', 'Dashboard', 'Retail'],
    icon: LayoutDashboard,
    className: 'work-showroom',
    demo: '/demos/showroom',
  },
  {
    number: '03',
    type: 'VRLS DEMO / CONCEPT',
    title: 'Mart Billing Software',
    description:
      'A custom software concept for retail billing, inventory and everyday store operations.',
    tags: ['Custom Software', 'Billing', 'Inventory'],
    icon: Receipt,
    className: 'work-mart',
    demo: '/demos/mart-billing',
  },
  {
    number: '04',
    type: 'VRLS DEMO / CONCEPT',
    title: 'E-commerce Mobile App',
    description:
      'A mobile commerce concept for browsing products and building a shopping experience.',
    tags: ['Mobile App', 'E-commerce', 'UI'],
    icon: Smartphone,
    className: 'work-mobile',
    demo: '/demos/ecommerce',
  },
  {
    number: '05',
    type: 'VRLS DEMO / CONCEPT',
    title: 'Hospital Patient Management',
    description:
      'An internal hospital software concept for organizing patient records, appointments and clinical workflows.',
    tags: ['Custom Software', 'Healthcare', 'Management'],
    icon: Hospital,
    className: 'work-hospital',
    demo: '/demos/hospital',
  },
  {
    number: '06',
    type: 'VRLS DEMO / CONCEPT',
    title: 'AI Business Assistant',
    description:
      'An AI automation concept for handling repetitive business tasks, information and workflow assistance.',
    tags: ['AI & Automation', 'Assistant', 'Workflows'],
    icon: Bot,
    className: 'work-ai',
    demo: '#',
  },
]

function ProjectPreview({ project }) {
  const Icon = project.icon

  return (
    <div className={`project-preview ${project.className}`}>
      <div className="preview-top">
        <div className="preview-brand">
          <span />
          VRLS
        </div>

        <div className="preview-dots">
          <i />
          <i />
          <i />
        </div>
      </div>

      {project.className === 'work-restaurant' && (
        <div className="restaurant-preview">
          <div className="preview-label">RESTAURANT</div>

          <div className="preview-big-title">
            Fresh food.
            <br />
            <span>Good moments.</span>
          </div>

          <div className="preview-food-row">
            <div />
            <div />
            <div />
          </div>
        </div>
      )}

      {project.className === 'work-showroom' && (
        <div className="showroom-preview">
          <div className="showroom-main">
            <div className="showroom-header">
              <div className="showroom-title" />
              <div className="showroom-user" />
            </div>

            <div className="showroom-stats">
              <div />
              <div />
              <div />
            </div>

            <div className="showroom-content">
              <div className="showroom-table">
                <div className="showroom-table-heading">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="showroom-row">
                  <i />
                  <b />
                  <em />
                  <strong />
                </div>

                <div className="showroom-row">
                  <i />
                  <b />
                  <em />
                  <strong />
                </div>

                <div className="showroom-row">
                  <i />
                  <b />
                  <em />
                  <strong />
                </div>

                <div className="showroom-row">
                  <i />
                  <b />
                  <em />
                  <strong />
                </div>
              </div>

              <div className="showroom-chart">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
      )}

      {project.className === 'work-mart' && (
        <div className="billing-preview">
          <div className="billing-sidebar">
            <div className="billing-dot" />
            <div />
            <div />
            <div />
            <div />
          </div>

          <div className="billing-main">
            <div className="billing-heading">
              <span />
              <span />
            </div>

            <div className="billing-stats">
              <div />
              <div />
              <div />
            </div>

            <div className="billing-table">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      )}

      {project.className === 'work-mobile' && (
        <div className="mobile-preview">
          <div className="phone-mockup phone-one">
            <div className="phone-screen">
              <div className="phone-header" />
              <div className="phone-hero" />

              <div className="phone-products">
                <div />
                <div />
              </div>

              <div className="phone-products">
                <div />
                <div />
              </div>
            </div>
          </div>

          <div className="phone-mockup phone-two">
            <div className="phone-screen">
              <div className="phone-header" />
              <div className="phone-hero small" />

              <div className="phone-products">
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
      )}

      {project.className === 'work-hospital' && (
        <div className="hospital-preview">
          <div className="hospital-sidebar">
            <div className="hospital-brand">
              <div className="hospital-cross">+</div>
            </div>

            <div className="hospital-nav active" />
            <div className="hospital-nav" />
            <div className="hospital-nav" />
            <div className="hospital-nav" />
            <div className="hospital-nav" />
          </div>

          <div className="hospital-main">
            <div className="hospital-header">
              <div className="hospital-title-line" />
              <div className="hospital-profile" />
            </div>

            <div className="hospital-overview">
              <div className="hospital-stat">
                <span />
                <strong />
                <small />
              </div>

              <div className="hospital-stat">
                <span />
                <strong />
                <small />
              </div>

              <div className="hospital-stat">
                <span />
                <strong />
                <small />
              </div>
            </div>

            <div className="hospital-content">
              <div className="patient-panel">
                <div className="panel-heading">
                  <span />
                  <span />
                </div>

                <div className="patient-row">
                  <i />
                  <b />
                  <em />
                  <strong />
                </div>

                <div className="patient-row">
                  <i />
                  <b />
                  <em />
                  <strong />
                </div>

                <div className="patient-row">
                  <i />
                  <b />
                  <em />
                  <strong />
                </div>

                <div className="patient-row">
                  <i />
                  <b />
                  <em />
                  <strong />
                </div>
              </div>

              <div className="hospital-calendar">
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
      )}

      {project.className === 'work-ai' && (
        <div className="ai-preview">
          <div className="ai-header">
            <div className="ai-brand">
              <span />
              AI BUSINESS ASSISTANT
            </div>

            <div className="ai-status" />
          </div>

          <div className="ai-body">
            <div className="ai-sidebar">
              <div className="ai-side-active" />
              <div />
              <div />
              <div />
            </div>

            <div className="ai-chat">
              <div className="ai-chat-heading">
                <span />
                <span />
              </div>

              <div className="ai-message">
                <span />
                <span />
                <span />
              </div>

              <div className="ai-message ai-message-user">
                <span />
                <span />
              </div>

              <div className="ai-input">
                <span />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="preview-icon">
        <Icon size={18} />
      </div>
    </div>
  )
}

function Work() {
  return (
    <section id="work" className="work-section">
      <div className="section-container">
        <div className="work-heading">
          <div className="section-eyebrow">
            <span />
            SELECTED WORK
          </div>

          <div className="work-heading-content">
            <h2>
              Concepts built
              <br />
              to show <em>what&apos;s possible.</em>
            </h2>

            <p>
              Explore a selection of VRLS concepts and demonstrations across
              websites, e-commerce, custom software, healthcare systems and
              mobile applications.
            </p>
          </div>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <ProjectPreview project={project} />

              <div className="project-info">
                <div className="project-meta">
                  <span>{project.type}</span>
                  <span>{project.number}</span>
                </div>

                <div className="project-title-row">
                  <div className="project-copy">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>

                  <a
                    href={project.demo}
                    className="project-link project-demo-link"
                    aria-label={`See ${project.title} demo`}
                    onClick={(event) => {
                      if (project.demo === '#') {
                        event.preventDefault()
                      }
                    }}
                  >
                    <span>See Demo</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
