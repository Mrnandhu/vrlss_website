import { ArrowRight, ArrowUpRight, Check, Globe2, Layers3, Sparkles } from 'lucide-react'
import Navbar from './Navbar'
import './HomePage.css'

const projects = [
  {
    number: '01',
    title: 'Function Hall',
    category: 'Events & hospitality',
    image: '/assets/demos/webp/function-hall-800.webp',
    alt: 'Elegant event hall arranged for a celebration',
    href: '/demos/function-hall',
  },
  {
    number: '02',
    title: 'Interior Designer',
    category: 'Interior & portfolio',
    image: '/assets/demos/webp/interior-800.webp',
    alt: 'Warm contemporary living room interior',
    href: '/demos/interior-design',
  },
  {
    number: '03',
    title: 'Real Estate',
    category: 'Property & listings',
    image: '/assets/demos/webp/real-estate-800.webp',
    alt: 'Modern home representing a property website concept',
    href: '/demos/real-estate',
  },
]

const services = [
  'Business websites',
  'Web applications',
  'Mobile applications',
  'Custom software',
  'Business systems',
  'AI & automation',
]

const stories = [
  { title: 'A clearer way to manage appointments', category: 'Product concept', href: '/demos/hospital', image: '/assets/demos/webp/hospital-800.webp' },
  { title: 'A better online experience for local cafés', category: 'Industry demo', href: '/demos/cafe', image: '/assets/demos/webp/cafe-800.webp' },
  { title: 'Bringing a product catalogue online', category: 'Retail demo', href: '/demos/boutique', image: '/assets/demos/webp/boutique-800.webp' },
]

function HomePage() {
  return (
    <div className="modern-site" id="top">
      <Navbar />
      <main>
        <section className="modern-hero" id="home">
          <div className="modern-hero-inner">
            <div className="modern-hero-copy">
              <span className="modern-eyebrow"><i /> DIGITAL PRODUCTS, MADE PERSONAL</span>
              <h1>Good ideas deserve <em>great digital experiences.</em></h1>
              <p>We create thoughtful websites, applications, and software that help businesses do their best work.</p>
              <div className="modern-actions">
                <a className="modern-button modern-button-primary" href="#demos">Explore our work <ArrowRight size={17} /></a>
                <a className="modern-button modern-button-secondary" href="#contact">Start a project <ArrowUpRight size={16} /></a>
              </div>
              <div className="modern-proof">
                <span><Globe2 size={16} /> Built around your business</span>
                <span><Layers3 size={16} /> Thoughtful from day one</span>
              </div>
            </div>
            <div className="modern-hero-visual">
              <img src="/assets/hero-cosmic.svg" alt="A glowing planet rising over a futuristic city at night" fetchPriority="high" />
              <div className="hero-note"><span className="hero-note-icon"><Sparkles size={17} /></span><div><b>Made for real work</b><small>Digital products with a clear purpose</small></div></div>
              <span className="hero-index">VRLS&nbsp; / &nbsp;01</span>
            </div>
          </div>
        </section>

        <section className="modern-projects section-wrap" id="demos">
          <div className="modern-section-heading">
            <div><span className="modern-eyebrow"><i /> SELECTED CONCEPTS</span><h2>Ideas made <em>real.</em></h2></div>
            <p>Explore a few of the digital experiences we shape for different businesses and industries.</p>
          </div>
          <div className="modern-project-grid">
            {projects.map((project) => (
              <a className="modern-project-card" href={project.href} key={project.number}>
                <div className="modern-project-image"><img src={project.image} alt={project.alt} loading="lazy" /><span>{project.number}</span><i><ArrowUpRight size={18} /></i></div>
                <div className="modern-project-copy"><div><small>{project.category}</small><h3>{project.title}</h3></div><ArrowUpRight className="project-arrow" size={19} /></div>
              </a>
            ))}
          </div>
          <a className="modern-text-link" href="#services">See what we build <ArrowRight size={16} /></a>
        </section>

        <section className="modern-build" id="about">
          <div className="section-wrap modern-build-grid">
            <div className="modern-build-copy">
              <span className="modern-eyebrow"><i /> A GOOD PLACE TO START</span>
              <h2>Welcome to a more <em>thoughtful</em> way to build.</h2>
              <p>Every project starts with listening. We learn how your business works, find the right approach, and build a product that feels simple for the people who use it.</p>
              <a className="modern-text-link" href="#contact">How we work <ArrowRight size={16} /></a>
              <div className="modern-feature-banner">
                <img src="/assets/hero-redesign.webp" alt="Digital product displayed in a modern workspace" loading="lazy" />
                <div><small>OUR APPROACH</small><b>Useful by design.<br />Ready for what’s next.</b></div>
              </div>
            </div>
            <div className="modern-services" id="services">
              <div className="modern-services-heading"><span className="modern-eyebrow"><i /> WHAT WE DO</span><p>Digital services shaped around your goals.</p></div>
              {services.map((service, index) => (
                <a href="#contact" className="modern-service-row" key={service}><span>{String(index + 1).padStart(2, '0')}</span><b>{service}</b><Check size={16} /></a>
              ))}
              <a className="modern-service-cta" href="#contact">Talk through your project <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="modern-latest section-wrap" id="process">
          <div className="modern-section-heading">
            <div><span className="modern-eyebrow"><i /> FRESH IDEAS</span><h2>Made for the way <em>you work.</em></h2></div>
            <p>Small details make a big difference. Here are a few ways digital tools can make everyday work easier.</p>
          </div>
          <div className="modern-latest-grid">
            <div className="modern-story-list">
              {stories.map((story) => (
                <a href={story.href} className="modern-story" key={story.title}><img src={story.image} alt="" loading="lazy" /><div><small>{story.category}</small><h3>{story.title}</h3><span>Explore concept <ArrowUpRight size={14} /></span></div></a>
              ))}
            </div>
            <aside className="modern-promise" id="contact">
              <span className="promise-orbit"><Sparkles size={22} /></span>
              <span className="modern-eyebrow"><i /> THE VRLS APPROACH</span>
              <h3>Clarity at every step.</h3>
              <p>Good technology should feel natural. We keep the process clear, the details considered, and the end result focused on what matters to your business.</p>
              <a className="modern-button modern-button-primary" href="mailto:sai.v.7079@gmail.com">Let’s talk <ArrowUpRight size={16} /></a>
              <div className="promise-signoff"><b>VRLS Solutions</b><small>Digital products, built with care</small></div>
            </aside>
          </div>
        </section>
      </main>
      <footer className="modern-footer">
        <div className="section-wrap">
          <div className="modern-footer-top">
            <div className="modern-footer-brand"><a href="#home"><b>VRLS</b><small>SOLUTIONS</small></a><p>Digital products shaped around real requirements.</p></div>
            <div className="modern-footer-column"><b>EXPLORE</b><a href="#services">Services</a><a href="#demos">Industries & demos</a><a href="#about">Our approach</a></div>
            <div className="modern-footer-column"><b>OUR SERVICES</b>{services.slice(0, 4).map((service) => <a href="#services" key={service}>{service}</a>)}</div>
            <div className="modern-footer-column"><b>GET IN TOUCH</b><a href="mailto:sai.v.7079@gmail.com">Email us <ArrowUpRight size={14} /></a><a href="https://wa.me/919515294733" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a></div>
          </div>
          <div className="modern-footer-bottom"><span>© 2026 VRLS Solutions</span><span>Built with care in India</span><a href="#home">Back to top ↑</a></div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
