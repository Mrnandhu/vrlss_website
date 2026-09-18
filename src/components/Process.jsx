import {
  Search,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  ArrowDown,
} from 'lucide-react'

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We understand your idea, requirements, users, goals and business workflow before defining the solution.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Plan & Design',
    description:
      'We define the product structure, user experience and technical approach around your requirements.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Build',
    description:
      'We develop the website, web application, mobile app or custom software according to the agreed scope.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Test & Refine',
    description:
      'We review functionality, responsiveness and the overall experience, then refine the product.',
    icon: ShieldCheck,
  },
  {
    number: '05',
    title: 'Deliver',
    description:
      'The finished product is prepared for deployment and handover according to the project requirements.',
    icon: Rocket,
  },
]

function Process() {
  return (
    <section id="process" className="process-section">
      <div className="section-container">

        <div className="process-heading">

          <div className="section-eyebrow">
            <span />
            HOW WE WORK
          </div>

          <div className="process-heading-content">

            <h2>
              From idea to
              <br />
              <em>working product.</em>
            </h2>

            <p>
              A clear and structured process designed to turn your
              requirements into a digital product without unnecessary
              complexity.
            </p>

          </div>

        </div>

        <div className="process-layout">

          <div className="process-intro">

            <div className="process-intro-card">

              <div className="process-intro-icon">
                <ArrowDown size={21} />
              </div>

              <span>THE JOURNEY</span>

              <h3>
                Clear steps.
                <br />
                <em>Clear direction.</em>
              </h3>

              <p>
                Every project starts with understanding what needs to be
                built and ends with a product ready for its intended use.
              </p>

            </div>

          </div>

          <div className="process-timeline">

            <div className="process-line" />

            {processSteps.map((step, index) => {
              const Icon = step.icon

              return (
                <div className="process-step" key={step.number}>

                  <div className="process-marker">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                  <div className="process-step-content">

                    <div className="process-step-top">
                      <span>{step.number}</span>

                      {index < processSteps.length - 1 && (
                        <div className="process-mobile-arrow">
                          <ArrowDown size={14} />
                        </div>
                      )}
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>

                  </div>

                </div>
              )
            })}

          </div>

        </div>

      </div>
    </section>
  )
}

export default Process
