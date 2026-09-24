import { ArrowUpRight, CalendarDays, Check, ChevronRight, Heart, MapPin, Sparkles } from 'lucide-react'
import './WeddingEventsDemo.css'

const gallery = [
  { image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85', label: 'Garden Ceremony', type: 'Wedding' },
  { image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85', label: 'Evening Reception', type: 'Celebration' },
  { image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85', label: 'Intimate Details', type: 'Wedding' },
  { image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85', label: 'Private Celebration', type: 'Event' },
]

const packages = [
  { name: 'Intimate', price: 'From ₹45,000', copy: 'Thoughtful planning for smaller celebrations with a clear, simple flow.', items: ['Event planning', 'Vendor coordination', 'Timeline support'] },
  { name: 'Signature', price: 'From ₹1,20,000', copy: 'A complete planning experience for weddings and larger celebrations.', items: ['Full event planning', 'Design direction', 'Guest & vendor coordination'] },
  { name: 'Grand', price: 'Custom', copy: 'A tailored production for multi-day weddings and elaborate events.', items: ['Creative direction', 'Production coordination', 'On-ground event management'] },
]

function DemoNav() {
  return (
    <header className="wed-nav">
      <a className="wed-brand" href="/">
        <span>EVER</span>
        <strong>AFTER</strong>
        <small>EVENTS & CELEBRATIONS</small>
      </a>
      <nav>
        <a href="#celebrations">Celebrations</a>
        <a href="#packages">Packages</a>
        <a href="#process">Process</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="wed-nav-cta" href="#contact">Plan an event <ArrowUpRight size={15} /></a>
    </header>
  )
}

function WeddingEventsDemo() {
  return (
    <div className="wedding-demo">
      <DemoNav />

      <main>
        <section className="wed-hero">
          <div className="wed-hero-copy">
            <div className="wed-eyebrow"><span /> DEMO CONCEPT · WEDDING & EVENTS</div>
            <h1>Moments worth <em>remembering.</em></h1>
            <p>Event planning and celebration design for weddings, receptions and gatherings that deserve to feel entirely your own.</p>
            <div className="wed-actions">
              <a href="#contact" className="wed-button">Plan your event <ArrowUpRight size={16} /></a>
              <a href="#celebrations" className="wed-text-link">Explore celebrations <ChevronRight size={16} /></a>
            </div>
            <div className="wed-hero-note"><Sparkles size={15} /> A fictional concept created by VRLSS</div>
          </div>
          <div className="wed-hero-image">
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1500&q=90" alt="Wedding table and floral event styling" />
            <div className="wed-image-label"><span>01</span> Designed around your day</div>
          </div>
        </section>

        <section id="celebrations" className="wed-intro">
          <div className="wed-section-label">THE CELEBRATIONS</div>
          <div>
            <h2>From the first idea<br />to the <em>last dance.</em></h2>
            <p>EverAfter is a fictional event studio concept built around a simple idea: planning should feel considered, calm and personal. The website helps visitors understand the service, see the style and enquire with the right details.</p>
          </div>
        </section>

        <section className="wed-gallery-section">
          <div className="wed-gallery-head">
            <div><span className="wed-section-label">FEATURED STORIES</span><h2>Celebrations with a <em>point of view.</em></h2></div>
            <p>Wedding days, private gatherings and event moments presented through an image-led portfolio.</p>
          </div>
          <div className="wed-gallery">
            {gallery.map((item, index) => (
              <article className={`wed-gallery-card gallery-${index + 1}`} key={item.label}>
                <img src={item.image} alt={item.label} loading="lazy" />
                <div className="wed-gallery-overlay"><span>{item.type}</span><h3>{item.label}</h3><ArrowUpRight size={17} /></div>
              </article>
            ))}
          </div>
        </section>

        <section id="packages" className="wed-packages">
          <div className="wed-section-label">PLANNING PACKAGES</div>
          <div className="wed-packages-head">
            <h2>Clear packages.<br /><em>Easy conversations.</em></h2>
            <p>Starting points for the fictional demo. A real project can adapt the structure, services and enquiry flow to the business.</p>
          </div>
          <div className="wed-package-grid">
            {packages.map((pack, i) => (
              <article className={`wed-package ${i === 1 ? 'featured' : ''}`} key={pack.name}>
                <div className="package-top"><span>0{i + 1}</span><Heart size={17} /></div>
                <h3>{pack.name}</h3><strong>{pack.price}</strong><p>{pack.copy}</p>
                <ul>{pack.items.map(item => <li key={item}><Check size={14} /> {item}</li>)}</ul>
                <a href="#contact">Discuss this package <ArrowUpRight size={14} /></a>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="wed-process">
          <div className="wed-process-title"><span className="wed-section-label">THE APPROACH</span><h2>Calm planning.<br /><em>Beautiful execution.</em></h2></div>
          <div className="wed-steps">
            {[
              ['01', 'Discover', 'Understand the event, people, venue and the feeling you want to create.'],
              ['02', 'Design', 'Shape the visual direction, details, vendors and experience around the occasion.'],
              ['03', 'Coordinate', 'Bring the timeline, suppliers and moving pieces together before the day.'],
              ['04', 'Celebrate', 'Be present for the moments while the event team handles the details.'],
            ].map(([num, title, copy]) => (
              <div className="wed-step" key={num}><span>{num}</span><div><h3>{title}</h3><p>{copy}</p></div></div>
            ))}
          </div>
        </section>

        <section className="wed-services">
          <div className="wed-section-label">WHAT WE CREATE</div>
          <div className="wed-service-grid">
            {['Weddings & receptions', 'Engagement celebrations', 'Private parties', 'Corporate events'].map((item, i) => (
              <div className="wed-service" key={item}><span>0{i + 1}</span><h3>{item}</h3><ArrowUpRight size={17} /></div>
            ))}
          </div>
        </section>

        <section id="contact" className="wed-contact">
          <div className="wed-contact-copy">
            <span className="wed-section-label">PLAN SOMETHING SPECIAL?</span>
            <h2>Tell us about<br /><em>your celebration.</em></h2>
            <p>Use this enquiry flow to show how an event business can capture useful project details before the first conversation.</p>
            <div className="wed-contact-points"><span><CalendarDays size={16} /> Flexible event planning</span><span><MapPin size={16} /> Venue & celebration details</span></div>
          </div>
          <form className="wed-form" onSubmit={(e) => e.preventDefault()}>
            <label>Name<input placeholder="Your name" /></label>
            <div className="wed-form-row"><label>Email<input type="email" placeholder="you@example.com" /></label><label>Phone<input placeholder="+91" /></label></div>
            <div className="wed-form-row"><label>Event type<select defaultValue=""><option value="" disabled>Select type</option><option>Wedding</option><option>Reception</option><option>Engagement</option><option>Private event</option><option>Corporate event</option></select></label><label>Guest count<select defaultValue=""><option value="" disabled>Select</option><option>Under 100</option><option>100–250</option><option>250–500</option><option>500+</option></select></label></div>
            <label>Event date<input type="date" /></label>
            <label>Tell us about your event<textarea rows="4" placeholder="Venue, date, style, budget or anything else..."></textarea></label>
            <button type="submit">Send enquiry <ArrowUpRight size={16} /></button>
          </form>
        </section>
      </main>

      <footer className="wed-footer">
        <div><a href="/">← Back to VRLSS</a><span>EVERAFTER · FICTIONAL DEMO CONCEPT</span></div>
        <p>Built to show what a customized event-business website can look like.</p>
      </footer>
    </div>
  )
}

export default WeddingEventsDemo
