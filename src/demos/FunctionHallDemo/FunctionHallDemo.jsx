import { ArrowLeft, ArrowRight, CalendarDays, Check, MapPin, Phone, Sparkles, Users } from 'lucide-react'
import './FunctionHallDemo.css'

const gallery = [
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
]

const packages = [
  { name: 'Classic Celebration', price: '₹45,000+', detail: 'Venue, seating, basic decor and event coordination.' },
  { name: 'Grand Wedding', price: '₹75,000+', detail: 'Premium decor, stage setup, dining area and dedicated coordination.' },
  { name: 'Signature Event', price: '₹1,20,000+', detail: 'Full venue styling, premium ambience and customized arrangements.' },
]

function FunctionHallDemo() {
  return (
    <div className="fh-demo">
      <header className="fh-nav">
        <a href="/" className="fh-brand"><span>GV</span><div><strong>Grand Vista</strong><small>CONVENTION HALL</small></div></a>
        <nav>
          <a href="#about">About</a><a href="#spaces">Spaces</a><a href="#packages">Packages</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a>
        </nav>
        <a className="fh-nav-cta" href="#contact">Check Availability <ArrowRight size={16}/></a>
      </header>

      <main>
        <section className="fh-hero">
          <div className="fh-hero-image" />
          <div className="fh-hero-overlay" />
          <div className="fh-hero-content">
            <span className="fh-kicker"><Sparkles size={15}/> DEMO CONCEPT · FUNCTION HALL</span>
            <h1>Make every<br/><em>moment</em> memorable.</h1>
            <p>A premium venue website concept designed to showcase spaces, packages, facilities and enquiries in one elegant experience.</p>
            <div className="fh-actions"><a className="fh-primary" href="#contact">Plan Your Event <ArrowRight size={18}/></a><a className="fh-secondary" href="#gallery">Explore Gallery</a></div>
          </div>
          <div className="fh-hero-meta"><span><Users size={16}/> Up to 800 guests</span><span><MapPin size={16}/> Rajahmundry</span><span><CalendarDays size={16}/> Events all year</span></div>
        </section>

        <section id="about" className="fh-intro fh-container">
          <div><span className="fh-label">THE VENUE</span><h2>A space designed<br/>for <em>celebrations.</em></h2></div>
          <div><p>Grand Vista is a fictional convention-hall concept created by VRLSS to demonstrate how a venue can present its spaces, facilities and event packages online.</p><a className="fh-text-link" href="#spaces">Discover the spaces <ArrowRight size={16}/></a></div>
        </section>

        <section id="spaces" className="fh-spaces fh-container">
          <div className="fh-section-head"><div><span className="fh-label">SPACES</span><h2>Built for every<br/><em>kind of gathering.</em></h2></div><p>From intimate celebrations to large receptions, visitors can quickly understand capacity, facilities and the right space for their event.</p></div>
          <div className="fh-space-grid">
            <article className="fh-space-card fh-space-large"><div className="fh-space-photo photo-one"/><div><span>01 · GRAND HALL</span><h3>Grand Ballroom</h3><p>Up to 800 guests · Stage · Dining · Parking</p></div></article>
            <article className="fh-space-card"><div className="fh-space-photo photo-two"/><div><span>02 · INTIMATE</span><h3>Garden Terrace</h3><p>Up to 180 guests · Outdoor · Evening events</p></div></article>
            <article className="fh-space-card"><div className="fh-space-photo photo-three"/><div><span>03 · CORPORATE</span><h3>Conference Suite</h3><p>Up to 120 guests · AV ready · Meeting setup</p></div></article>
          </div>
        </section>

        <section id="packages" className="fh-packages">
          <div className="fh-container"><div className="fh-section-head"><div><span className="fh-label">PACKAGES</span><h2>Clear packages.<br/><em>Easy enquiries.</em></h2></div><p>A package section gives visitors enough information to start a conversation without hiding the details behind a phone call.</p></div>
            <div className="fh-package-grid">{packages.map((item, i) => <article className={`fh-package ${i === 1 ? 'featured' : ''}`} key={item.name}>{i === 1 && <span className="fh-popular">POPULAR</span>}<span>0{i + 1}</span><h3>{item.name}</h3><strong>{item.price}</strong><p>{item.detail}</p><ul><li><Check size={15}/> Venue access</li><li><Check size={15}/> Event coordination</li><li><Check size={15}/> Guest seating plan</li></ul><a href="#contact">Enquire about this package <ArrowRight size={15}/></a></article>)}</div>
          </div>
        </section>

        <section id="gallery" className="fh-gallery fh-container"><div className="fh-section-head"><div><span className="fh-label">GALLERY</span><h2>Show the experience<br/><em>before they arrive.</em></h2></div></div><div className="fh-gallery-grid">{gallery.map((src, i) => <img key={src} src={src} alt={`Grand Vista event space ${i + 1}`} />)}</div></section>

        <section id="contact" className="fh-contact"><div className="fh-container fh-contact-inner"><div><span className="fh-label">ENQUIRY</span><h2>Planning something<br/><em>special?</em></h2><p>Tell us your date, guest count and event type. This demo shows how a venue can turn website visitors into direct enquiries.</p><div className="fh-contact-links"><a href="tel:+919000000000"><Phone size={17}/> +91 90000 00000</a><span><MapPin size={17}/> Rajahmundry, Andhra Pradesh</span></div></div><form onSubmit={(e) => e.preventDefault()}><label>Name<input placeholder="Your name" /></label><label>Event type<select defaultValue=""><option value="" disabled>Select event type</option><option>Wedding</option><option>Reception</option><option>Birthday</option><option>Corporate event</option></select></label><div className="fh-form-row"><label>Date<input type="date" /></label><label>Guests<input type="number" placeholder="150" /></label></div><label>Message<textarea placeholder="Tell us about your event..." rows="4" /></label><button type="submit">Send Enquiry <ArrowRight size={17}/></button></form></div></section>
      </main>

      <footer className="fh-footer"><a href="/" className="fh-back"><ArrowLeft size={16}/> Back to VRLSS</a><span>DEMO CONCEPT · CREATED BY VRLSS</span><a href="/#contact">Build a similar website <ArrowRight size={16}/></a></footer>
    </div>
  )
}

export default FunctionHallDemo
