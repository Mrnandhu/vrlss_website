import { useMemo, useState } from 'react'
import { ArrowUpRight, BedDouble, Bath, MapPin, Search, SlidersHorizontal, Phone, Mail, Sparkles, Check } from 'lucide-react'
import './RealEstateDemo.css'

const properties = [
  {
    id: 1,
    title: 'The Willow Residence',
    type: 'Villa',
    location: 'Riverfront District',
    price: '₹1.85 Cr',
    beds: 4,
    baths: 4,
    area: '2,850 sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    tag: 'Featured',
  },
  {
    id: 2,
    title: 'Oakline Heights',
    type: 'Apartment',
    location: 'Central Heights',
    price: '₹78 L',
    beds: 3,
    baths: 3,
    area: '1,760 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    tag: 'New',
  },
  {
    id: 3,
    title: 'The Courtyard House',
    type: 'Independent Home',
    location: 'Garden Enclave',
    price: '₹1.24 Cr',
    beds: 3,
    baths: 3,
    area: '2,150 sq.ft',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
    tag: 'Open for viewing',
  },
  {
    id: 4,
    title: 'Parkview Residences',
    type: 'Apartment',
    location: 'Lake Road',
    price: '₹64 L',
    beds: 2,
    baths: 2,
    area: '1,280 sq.ft',
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85',
    tag: 'Ready to move',
  },
]

const filters = ['All', 'Apartment', 'Villa', 'Independent Home']

function PropertyCard({ property, onEnquire }) {
  return (
    <article className="re-property-card">
      <div className="re-property-image">
        <img src={property.image} alt={property.title} loading="lazy" />
        <span className="re-property-tag">{property.tag}</span>
        <button className="re-view-button" onClick={() => onEnquire(property)}>
          View property <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="re-property-content">
        <div className="re-property-top">
          <div>
            <span className="re-property-type">{property.type}</span>
            <h3>{property.title}</h3>
          </div>
          <strong>{property.price}</strong>
        </div>
        <div className="re-location"><MapPin size={14} /> {property.location}</div>
        <div className="re-property-stats">
          <span><BedDouble size={15} /> {property.beds} beds</span>
          <span><Bath size={15} /> {property.baths} baths</span>
          <span>{property.area}</span>
        </div>
      </div>
    </article>
  )
}

function RealEstateDemo() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const visibleProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesFilter = activeFilter === 'All' || property.type === activeFilter
      const haystack = `${property.title} ${property.location} ${property.type}`.toLowerCase()
      return matchesFilter && haystack.includes(query.toLowerCase())
    })
  }, [activeFilter, query])

  const openEnquiry = (property = null) => setSelected(property)

  return (
    <div className="real-estate-demo">
      <nav className="re-nav">
        <a href="/" className="re-brand" aria-label="Back to VRLSS">
          <span>PRIME</span><b>NEST</b>
          <small>PROPERTIES</small>
        </a>
        <div className="re-nav-links">
          <a href="#properties">Properties</a>
          <a href="#approach">Our Approach</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="re-nav-cta" onClick={() => openEnquiry()}>Book a Viewing <ArrowUpRight size={16} /></button>
      </nav>

      <main>
        <section className="re-hero">
          <div className="re-hero-copy">
            <div className="re-eyebrow"><span /> DEMO CONCEPT · REAL ESTATE</div>
            <h1>Find a place<br /><em>worth coming home to.</em></h1>
            <p>Property discovery designed around real conversations, clear information and a simple path from browsing to enquiry.</p>
            <div className="re-hero-actions">
              <a href="#properties" className="re-primary">Explore properties <ArrowUpRight size={17} /></a>
              <button className="re-secondary" onClick={() => openEnquiry()}>Talk to an advisor</button>
            </div>
          </div>
          <div className="re-hero-image">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=88" alt="Modern residential interior" />
            <div className="re-hero-note"><Sparkles size={15} /><span>Thoughtfully selected homes</span></div>
          </div>
        </section>

        <section className="re-search-panel" id="properties">
          <div className="re-search-heading">
            <span>PROPERTY FINDER</span>
            <h2>Browse the collection.</h2>
          </div>
          <div className="re-search-controls">
            <label className="re-search-input">
              <Search size={17} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search homes or locations" />
            </label>
            <div className="re-filter">
              <SlidersHorizontal size={16} />
              {filters.map((filter) => (
                <button key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="re-properties">
          {visibleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} onEnquire={openEnquiry} />
          ))}
          {!visibleProperties.length && <div className="re-empty">No matching properties in this demo collection.</div>}
        </section>

        <section className="re-approach" id="approach">
          <div>
            <span className="re-eyebrow"><span /> THE EXPERIENCE</span>
            <h2>Less searching.<br /><em>More certainty.</em></h2>
          </div>
          <div className="re-steps">
            {[
              ['01', 'Discover', 'Browse focused listings with the details that matter before you enquire.'],
              ['02', 'Shortlist', 'Compare homes by type, location, size and budget.'],
              ['03', 'Connect', 'Request a viewing and continue the conversation directly.'],
            ].map(([number, title, text]) => (
              <div className="re-step" key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="re-feature">
          <div className="re-feature-image">
            <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85" alt="Bright contemporary home" loading="lazy" />
          </div>
          <div className="re-feature-copy">
            <span className="re-eyebrow"><span /> BUILT FOR PROPERTY BUSINESSES</span>
            <h2>A digital storefront for every property you represent.</h2>
            <p>This demo shows how a real-estate website can combine listings, property details, search, lead capture and viewing requests in one focused experience.</p>
            <ul>
              <li><Check size={16} /> Searchable property catalogue</li>
              <li><Check size={16} /> Detailed property pages</li>
              <li><Check size={16} /> Viewing and enquiry flow</li>
            </ul>
          </div>
        </section>

        <section className="re-contact" id="contact">
          <div>
            <span className="re-eyebrow"><span /> PLAN YOUR NEXT PROPERTY WEBSITE</span>
            <h2>Want a property experience like this?</h2>
            <p>This is a fictional demo concept created by VRLSS. We can customize the structure, listings and enquiry flow around your business.</p>
          </div>
          <div className="re-contact-actions">
            <a href="tel:+919515294733"><Phone size={17} /> Call VRLSS</a>
            <a href="mailto:hello@vrlss.in"><Mail size={17} /> Send an enquiry</a>
          </div>
        </section>
      </main>

      <footer className="re-footer">
        <div><span>PRIME</span><b>NEST</b><small>FICTIONAL DEMO · BY VRLSS</small></div>
        <a href="/">← Back to VRLSS</a>
      </footer>

      {selected !== null && (
        <div className="re-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="re-modal" onClick={(e) => e.stopPropagation()}>
            <button className="re-modal-close" onClick={() => setSelected(null)}>×</button>
            <span className="re-eyebrow"><span /> PROPERTY ENQUIRY</span>
            <h2>{selected ? `Ask about ${selected.title}` : 'Find your next property'}</h2>
            <p>Leave your details and this fictional demo can be adapted into a real lead-enquiry workflow.</p>
            <input placeholder="Your name" />
            <input placeholder="Phone number" />
            <input placeholder="Email address" />
            <textarea placeholder="What kind of property are you looking for?" rows="4" />
            <button className="re-modal-submit" onClick={() => setSelected(null)}>Send enquiry <ArrowUpRight size={16} /></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RealEstateDemo
