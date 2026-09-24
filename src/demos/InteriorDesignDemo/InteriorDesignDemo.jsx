import './InteriorDesignDemo.css'

const projects = [
  ['Calm House', 'Residential · 2,400 sq ft', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90'],
  ['Oak & Stone', 'Residential · Full interiors', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90'],
  ['The Workroom', 'Commercial · Office interiors', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90'],
]

const services = [
  ['01', 'Residential Interiors', 'Complete home interiors shaped around your routines, storage needs and personal style.'],
  ['02', 'Modular Kitchens', 'Thoughtful layouts, practical storage and material selections for everyday use.'],
  ['03', 'Living & Bedroom', 'Layered spaces with considered lighting, furniture, textures and finishes.'],
  ['04', 'Commercial Spaces', 'Workplaces, studios and retail environments designed for people and purpose.'],
]

const steps = [
  ['01', 'Discover', 'We understand the space, your priorities, lifestyle and project requirements.'],
  ['02', 'Design', 'Concepts, layouts, materials and visual direction come together into a clear plan.'],
  ['03', 'Refine', 'Details are reviewed, adjusted and prepared for execution with fewer surprises.'],
  ['04', 'Deliver', 'The finished space is brought together with attention to the details that matter.'],
]

function Arrow() { return <span aria-hidden="true">↗</span> }
function Right() { return <span aria-hidden="true">→</span> }

function InteriorDesignDemo() {
  return (
    <div className="nd-demo">
      <header className="nd-nav">
        <a href="/" className="nd-brand" aria-label="Back to VRLSS">
          <span className="nd-brand-mark">N</span>
          <span><strong>NestCraft</strong><small>INTERIORS · STUDIO</small></span>
        </a>
        <nav>
          <a href="#work">Work</a><a href="#services">Services</a><a href="#process">Process</a><a href="#studio">Studio</a>
        </nav>
        <a className="nd-nav-cta" href="#contact">Book a consultation <Right /></a>
        <button className="nd-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
      </header>

      <main>
        <section className="nd-hero">
          <div className="nd-hero-copy">
            <div className="nd-kicker"><span /> INTERIOR DESIGN STUDIO · DEMO CONCEPT</div>
            <h1>Spaces that feel<br /><i>like you.</i></h1>
            <p>Thoughtful residential and commercial interiors, designed around how people live, work and gather.</p>
            <div className="nd-hero-actions">
              <a className="nd-dark-btn" href="#contact">Start a project <Right /></a>
              <a className="nd-play" href="#work"><span>▶</span> Explore our work</a>
            </div>
          </div>
          <div className="nd-hero-art">
            <div className="nd-hero-image" />
            <div className="nd-hero-note"><span className="nd-note-star">✦</span><span>Designed for<br /><b>everyday living.</b></span></div>
          </div>
          <div className="nd-scroll">↘ &nbsp; Scroll to explore</div>
        </section>

        <section id="studio" className="nd-statement nd-wrap">
          <div className="nd-overline">THE STUDIO</div>
          <div>
            <h2>Good interiors aren't just <i>beautiful.</i><br />They make everyday life feel better.</h2>
            <div className="nd-statement-bottom">
              <p>NestCraft is a fictional interior-design studio concept created by VRLSS. This demo shows how a design business can turn its portfolio, process and consultation journey into a polished digital experience.</p>
              <a href="#services">What we design <Right /></a>
            </div>
          </div>
        </section>

        <section id="work" className="nd-work nd-wrap">
          <div className="nd-section-top">
            <div><div className="nd-overline">SELECTED WORK</div><h2>Spaces with a<br /><i>point of view.</i></h2></div>
            <p>Use strong project photography and clear project information to help prospective clients understand the studio's style before they make contact.</p>
          </div>
          <div className="nd-project-grid">
            {projects.map(([title, type, image], index) => (
              <a href="#contact" className={`nd-project nd-project-${index + 1}`} key={title}>
                <div className="nd-project-image"><img src={image} alt={title} loading={index ? 'lazy' : 'eager'} /><span><Arrow /></span></div>
                <div className="nd-project-meta"><div><small>{type}</small><h3>{title}</h3></div><Right /></div>
              </a>
            ))}
          </div>
          <div className="nd-work-foot"><span>03 FEATURED PROJECTS</span><a href="#contact">View a project like this <Right /></a></div>
        </section>

        <section id="services" className="nd-services">
          <div className="nd-wrap">
            <div className="nd-section-top nd-section-top-light">
              <div><div className="nd-overline">WHAT WE DO</div><h2>From first sketch<br />to <i>finished space.</i></h2></div>
              <p>Organize the service offering around the questions a prospective client actually has: what can you design, and what happens next?</p>
            </div>
            <div className="nd-service-grid">
              {services.map(([num, title, copy]) => (
                <article className="nd-service" key={num}>
                  <span>{num}</span><div className="nd-service-icon">↘</div><h3>{title}</h3><p>{copy}</p><a href="#contact">Discuss this service <Right /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="nd-process nd-wrap">
          <div className="nd-process-intro"><div className="nd-overline">OUR APPROACH</div><h2>A clear process<br /><i>keeps things calm.</i></h2><p>Great design is collaborative. A simple process helps clients know what is happening at every stage.</p></div>
          <div className="nd-steps">
            {steps.map(([num, title, copy]) => <div className="nd-step" key={num}><span>{num}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}
          </div>
        </section>

        <section className="nd-materials">
          <div className="nd-material-image" />
          <div className="nd-material-copy"><div className="nd-overline">DETAILS MATTER</div><h2>Material, light,<br /><i>and balance.</i></h2><p>A design studio site can communicate its aesthetic even before a visitor reads every word. Texture, spacing, photography and typography do part of the selling.</p><ul><li>✓ &nbsp; Material-led design direction</li><li>✓ &nbsp; Practical layouts and storage</li><li>✓ &nbsp; Lighting and finish planning</li></ul><a className="nd-outline-btn" href="#contact">Talk about your space <Right /></a></div>
        </section>

        <section id="contact" className="nd-contact">
          <div className="nd-wrap nd-contact-grid">
            <div className="nd-contact-copy"><div className="nd-overline">START A PROJECT</div><h2>Have a space<br /><i>in mind?</i></h2><p>Tell us a little about your project. This enquiry flow demonstrates how an interior studio can turn website interest into a structured consultation request.</p><div className="nd-contact-details"><a href="tel:+919000000000">☎ +91 90000 00000</a><span>⌖ Rajahmundry · Andhra Pradesh</span><a href="mailto:hello@nestcraft.example">✉ hello@nestcraft.example</a></div></div>
            <form onSubmit={(e) => e.preventDefault()} className="nd-form">
              <div className="nd-form-title"><span>PROJECT ENQUIRY</span><small>01 — 04</small></div>
              <label>Your name<input placeholder="Name" /></label>
              <div className="nd-form-row"><label>Project type<select defaultValue=""><option value="" disabled>Select one</option><option>Full home</option><option>Apartment</option><option>Kitchen</option><option>Commercial space</option></select></label><label>Approx. area<input placeholder="e.g. 1800 sq ft" /></label></div>
              <label>What are you planning?<textarea rows="5" placeholder="Tell us about the space, location, timeline or anything else that helps..." /></label>
              <button type="submit">Request consultation <Right /></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="nd-footer">
        <a href="/" className="nd-back">← &nbsp; Back to VRLSS</a>
        <div className="nd-footer-brand">NESTCRAFT <span>INTERIORS</span></div>
        <div className="nd-footer-links"><span>DEMO CONCEPT · CREATED BY VRLSS</span><a href="/#contact">Build a similar website <Right /></a></div>
      </footer>
    </div>
  )
}

export default InteriorDesignDemo
