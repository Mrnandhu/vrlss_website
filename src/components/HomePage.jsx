import { ArrowRight, ArrowUpRight, Check, Globe2, Layers3, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import Navbar from './Navbar'
import Technologies from './Technologies'
import SolutionShowcase from './SolutionShowcase'
import './HomePage.css'

const services = [
  {
    number: '01',
    title: 'Websites',
    text: 'Professional corporate and business websites designed to establish credibility, communicate your services and generate meaningful enquiries.',
  },
  {
    number: '02',
    title: 'Web Applications',
    text: 'Secure, responsive web applications that streamline operations, connect teams and provide better digital experiences for your customers.',
  },
  {
    number: '03',
    title: 'Mobile Applications',
    text: 'Purpose-built mobile applications designed around your customers, teams and business objectives across modern platforms.',
  },
  {
    number: '04',
    title: 'Custom Software',
    text: 'Software solutions developed around specific business requirements where standard platforms cannot provide the flexibility you need.',
  },
  {
    number: '05',
    title: 'Business Systems',
    text: 'Connected digital systems that bring customers, information, workflows and business operations together in a structured environment.',
  },
  {
    number: '06',
    title: 'AI & Automation',
    text: 'Practical AI integrations and workflow automation designed to reduce repetitive work, improve efficiency and support smarter operations.',
  },
]

const capabilityItems = [
  [
    'Business-first approach',
    'We begin by understanding your objectives, customers, workflows and operational requirements.',
  ],
  [
    'Clear communication',
    'Straightforward communication, defined deliverables and visibility throughout the project.',
  ],
  [
    'Responsive experiences',
    'Digital experiences designed to work smoothly across desktops, tablets and mobile devices.',
  ],
  [
    'Purpose-built solutions',
    'We shape the technology around your requirements rather than forcing your business into a fixed template.',
  ],
  [
    'Modern technology',
    'Proven frameworks and development practices selected according to the needs of each project.',
  ],
  [
    'Direct collaboration',
    'A focused delivery process with direct communication from the initial discussion through launch.',
  ],
]

function HomePage() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isSmallScreen = window.matchMedia('(max-width: 760px)').matches
  const saveData = Boolean(navigator.connection && navigator.connection.saveData)
  const playHeroVideo = !prefersReducedMotion && !isSmallScreen && !saveData

  return (
    <div className="modern-site" id="top">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="modern-hero" id="home">
          <div className="modern-hero-inner">
            <div className="modern-hero-copy">
              <span className="modern-eyebrow">
                <i /> DIGITAL TECHNOLOGY SOLUTIONS
              </span>

              <h1>
                Technology built for <em>modern business.</em>
              </h1>

              <p>
                We design and develop digital solutions that support your business goals —
                from corporate websites and web applications to mobile platforms and
                custom software, built for performance, scalability and lasting value.
              </p>

              <div className="modern-actions">
                <a className="modern-button modern-button-primary" href="#contact">
                  Start a Project <ArrowUpRight size={16} />
                </a>

                <a className="modern-button modern-button-secondary" href="#services">
                  Explore Our Services <ArrowRight size={17} />
                </a>

                <a
                  className="modern-button modern-button-whatsapp"
                  href="https://wa.me/919515294733"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={16} /> WhatsApp Us
                </a>
              </div>

              <div className="modern-proof">
                <span>
                  <Globe2 size={16} /> GCC &amp; International Businesses
                </span>

                <span>
                  <ShieldCheck size={16} /> Clear, Reliable Delivery
                </span>

                <span>
                  <Layers3 size={16} /> Websites to Business Systems
                </span>
              </div>
            </div>

            <div className="modern-hero-visual">
              <video
                autoPlay={playHeroVideo}
                muted
                loop
                playsInline
                preload={playHeroVideo ? 'metadata' : 'none'}
                poster="/assets/hero-redesign.webp"
                aria-hidden="true"
                tabIndex={-1}
              >
                {playHeroVideo && <source src="/assets/hero.mp4" type="video/mp4" />}
              </video>

              <div className="hero-note">
                <span className="hero-note-icon">
                  <Sparkles size={17} />
                </span>

                <div>
                  <b>Built around your business</b>
                  <small>
                    Digital solutions designed with a clear business purpose
                  </small>
                </div>
              </div>

              <span className="hero-index">
                VRLS / DIGITAL TECHNOLOGY
              </span>
            </div>
          </div>
        </section>

        {/* SERVICE MARQUEE */}
        <div className="modern-marquee" aria-hidden="true">
          <div>
            <span>Websites</span>
            <span>Web Applications</span>
            <span>Mobile Applications</span>
            <span>Custom Software</span>
            <span>Business Systems</span>
            <span>AI &amp; Automation</span>
            <span>Websites</span>
            <span>Web Applications</span>
            <span>Mobile Applications</span>
            <span>Custom Software</span>
          </div>
        </div>

        {/* SERVICES */}
        <section className="modern-services-section" id="services">
          <div className="section-wrap">
            <div className="modern-section-heading">
              <div>
                <span className="modern-eyebrow">
                  <i /> WHAT WE DO
                </span>

                <h2>
                  Digital solutions built around <em>your business.</em>
                </h2>
              </div>

              <p>
                From a professional corporate website to a complete digital
                business system, we develop technology around your objectives,
                customers and operational requirements.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <a
                  className="service-card"
                  href="#contact"
                  key={service.number}
                >
                  <div className="service-card-top">
                    <span>{service.number}</span>
                    <ArrowUpRight size={18} />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>

                  <span className="service-link">
                    Discuss this service <ArrowRight size={14} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* WHY VRLS */}
        <SolutionShowcase />

<section className="modern-capabilities" id="about">
          <div className="section-wrap capabilities-grid">
            <div className="capabilities-copy">
              <span className="modern-eyebrow">
                <i /> WHY VRLS
              </span>

              <h2>
                Built on clarity. <em>Focused on business.</em>
              </h2>

              <p>
                Technology should support your business, not complicate it.
                We focus on understanding your requirements, communicating
                clearly and delivering digital solutions designed for practical
                use and long-term value.
              </p>

              <div className="capability-list">
                {capabilityItems.map(([title, text]) => (
                  <div className="capability-item" key={title}>
                    <span className="capability-check">
                      <Check size={14} />
                    </span>

                    <div>
                      <b>{title}</b>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="capabilities-image">
              <img
                src="/assets/hero-redesign.webp"
                alt="Professional digital business workspace"
                loading="lazy"
              />

              <div className="capabilities-image-card">
                <span>VRLS / APPROACH</span>
                <b>
                  Designed for today.
                  <br />
                  Built for what comes next.
                </b>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <Technologies />

        {/* PROCESS */}
  
<section className="modern-process" id="process">
          <div className="section-wrap">
            <div className="modern-section-heading">
              <div>
                <span className="modern-eyebrow">
                  <i /> OUR PROCESS
                </span>

                <h2>
                  From requirements to a <em>working solution.</em>
                </h2>
              </div>

              <p>
                A structured delivery process keeps your project clear and
                aligned from the first conversation through development,
                testing and launch.
              </p>
            </div>

            <div className="process-grid">
              {[
                [
                  '01',
                  'Discover',
                  'We understand your business, objectives, users and requirements.',
                ],
                [
                  '02',
                  'Plan & Design',
                  'We define the solution structure, user experience and technical direction.',
                ],
                [
                  '03',
                  'Develop',
                  'We build the agreed website, application or software using modern development practices.',
                ],
                [
                  '04',
                  'Test & Refine',
                  'We review functionality, responsiveness, performance and usability before launch.',
                ],
                [
                  '05',
                  'Launch',
                  'We prepare the completed solution for deployment and support the transition to your live environment.',
                ],
              ].map(([number, title, text]) => (
                <div className="process-card" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="modern-contact" id="contact">
          <div className="section-wrap">
            <div className="contact-panel">
              <div className="contact-copy">
                <span className="modern-eyebrow">
                  <i /> START A PROJECT
                </span>

                <h2>
                  Have a project in mind? <em>Let&apos;s discuss it.</em>
                </h2>

                <p>
                  Tell us what you are looking to build, improve or automate.
                  Share your requirements through WhatsApp or email and we can
                  discuss a practical approach for your business.
                </p>

                <div className="contact-actions">
                  <a
                    className="modern-button modern-button-primary"
                    href="https://wa.me/919515294733"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={17} /> WhatsApp Us
                  </a>

                  <a
                    className="modern-button modern-button-secondary"
                    href="mailto:sai.v.7079@gmail.com"
                  >
                    <span>✉</span> Email Us
                  </a>
                </div>
              </div>

              <div className="contact-details">
                <div>
                  <small>WHATSAPP</small>
                  <a
                    href="https://wa.me/919515294733"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +91 9515294733 <ArrowUpRight size={15} />
                  </a>
                </div>

                <div>
                  <small>EMAIL</small>
                  <a href="mailto:sai.v.7079@gmail.com">
                    sai.v.7079@gmail.com <ArrowUpRight size={15} />
                  </a>
                </div>

                <div>
                  <small>SERVICES</small>
                  <p>
                    Websites · Web Applications · Mobile Applications · Custom
                    Software · Business Systems · AI &amp; Automation
                  </p>
                </div>

                <div>
                  <small>MARKETS</small>
                  <p>GCC &amp; International Markets</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="modern-footer">
        <div className="section-wrap">
          <div className="modern-footer-top">
            <div className="modern-footer-brand">
              <a href="#home">
                <b>VRLS</b>
                <small>SOLUTIONS</small>
              </a>

              <p>
                Digital technology solutions designed around real business
                requirements.
              </p>
            </div>

            <div className="modern-footer-column">
              <b>EXPLORE</b>
              <a href="#services">Services</a>
              <a href="#process">Our Process</a>
              <a href="#technology">Technology</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="modern-footer-column">
              <b>OUR SERVICES</b>

              {services.map((service) => (
                <a href="#services" key={service.title}>
                  {service.title}
                </a>
              ))}
            </div>

            <div className="modern-footer-column">
              <b>GET IN TOUCH</b>

              <a href="mailto:sai.v.7079@gmail.com">
                Email Us <ArrowUpRight size={14} />
              </a>

              <a
                href="https://wa.me/919515294733"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="modern-footer-bottom">
            <span>© 2026 VRLS Solutions</span>

            <span>
              Digital Technology · Websites · Applications · Software
            </span>

            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href="https://wa.me/919515294733"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with VRLS Solutions on WhatsApp"
      >
        <MessageCircle size={21} />
      </a>
    </div>
  )
}

export default HomePage
