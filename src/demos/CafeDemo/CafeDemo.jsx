import { useMemo, useState } from 'react'
import { ArrowUpRight, CalendarDays, Coffee, MapPin, Clock3, X } from 'lucide-react'
import './CafeDemo.css'

const menu = [
  { name: 'House Cappuccino', category: 'Coffee', price: '₹190', image: '/assets/demos/webp/cafe-800.webp', note: 'Double espresso, silky milk and a light cocoa finish.' },
  { name: 'Iced Spanish Latte', category: 'Coffee', price: '₹220', image: '/assets/demos/webp/cafe-800.webp', note: 'Chilled espresso, milk and a touch of condensed sweetness.' },
  { name: 'Berry French Toast', category: 'Breakfast', price: '₹320', image: '/assets/demos/webp/cafe-800.webp', note: 'Brioche, berries, cream and maple.' },
  { name: 'Avocado Sourdough', category: 'Breakfast', price: '₹290', image: '/assets/demos/webp/cafe-800.webp', note: 'Sourdough toast, avocado, greens and a soft poached egg.' },
  { name: 'Basil Pesto Pasta', category: 'Lunch', price: '₹360', image: '/assets/demos/webp/cafe-800.webp', note: 'Penne, basil pesto, parmesan and roasted vegetables.' },
  { name: 'Garden Grain Bowl', category: 'Lunch', price: '₹340', image: '/assets/demos/webp/cafe-800.webp', note: 'Seasonal greens, grains, roasted vegetables and house dressing.' },
  { name: 'Basque Cheesecake', category: 'Dessert', price: '₹240', image: '/assets/demos/webp/cafe-800.webp', note: 'Burnt-top cheesecake with a soft centre.' },
  { name: 'Chocolate Sea Salt Tart', category: 'Dessert', price: '₹230', image: '/assets/demos/webp/cafe-800.webp', note: 'Dark chocolate ganache, crisp pastry and sea salt.' },
]

const filters = ['All', 'Coffee', 'Breakfast', 'Lunch', 'Dessert']

function CafeDemo() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [showBooking, setShowBooking] = useState(false)

  const visibleMenu = useMemo(
    () => filter === 'All' ? menu : menu.filter((item) => item.category === filter),
    [filter]
  )

  return (
    <div className="cafe-demo">
      <header className="cafe-nav">
        <a className="cafe-brand" href="/#demos">
          <span className="brand-mark">M</span>
          <span><strong>Morrow</strong><small>COFFEE & KITCHEN</small></span>
        </a>
        <nav>
          <a href="#menu">Menu</a>
          <a href="#story">Our Space</a>
          <a href="#visit">Visit</a>
        </nav>
        <button className="cafe-nav-cta" onClick={() => setShowBooking(true)}>Book a table <ArrowUpRight size={15} /></button>
      </header>

      <main>
        <section className="cafe-hero">
          <div className="hero-copy">
            <span className="cafe-kicker">DEMO CONCEPT · CAFE & COFFEE SHOP</span>
            <h1>A slower kind of <em>good.</em></h1>
            <p>Specialty coffee, all-day plates and a warm place to meet, work or simply stay awhile.</p>
            <div className="hero-actions">
              <a className="dark-btn" href="#menu">Explore the menu <ArrowUpRight size={15} /></a>
              <button className="light-btn" onClick={() => setShowBooking(true)}>Reserve a table</button>
            </div>
            <div className="hero-meta">
              <span><Coffee size={15} /> Specialty coffee</span>
              <span><Clock3 size={15} /> 8:00 AM — 10:00 PM</span>
            </div>
          </div>
          <div className="hero-image">
            <img src="/assets/demos/webp/cafe-800.webp" alt="Cafe coffee and seating" />
            <span>House roast · slow mornings</span>
          </div>
        </section>

        <section id="story" className="cafe-intro">
          <div className="section-label">THE CAFE</div>
          <div>
            <h2>Made for <em>good pauses.</em></h2>
            <p>Morrow is a fictional cafe concept built by VRLSS to show how a modern hospitality website can turn atmosphere, menu discovery and table enquiries into one simple experience.</p>
          </div>
          <div className="intro-facts">
            <div><strong>01</strong><span>Small-batch coffee</span></div>
            <div><strong>02</strong><span>All-day kitchen</span></div>
            <div><strong>03</strong><span>Work-friendly space</span></div>
          </div>
        </section>

        <section id="menu" className="cafe-menu-section">
          <div className="menu-heading">
            <div>
              <span className="section-label">FROM THE KITCHEN</span>
              <h2>Something for every <em>kind of day.</em></h2>
            </div>
            <p>Browse the menu by mood, meal or coffee break.</p>
          </div>
          <div className="filter-row">
            {filters.map((item) => (
              <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
          <div className="cafe-menu-grid">
            {visibleMenu.map((item) => (
              <button className="menu-card" key={item.name} onClick={() => setSelected(item)}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="menu-card-copy">
                  <span>{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                  <strong>{item.price}</strong>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="cafe-space">
          <div className="space-image">
            <img src="/assets/demos/webp/cafe-800.webp" alt="Warm cafe interior" loading="lazy" />
          </div>
          <div className="space-copy">
            <span className="section-label">THE SPACE</span>
            <h2>A room that lets you <em>stay awhile.</em></h2>
            <p>Natural light, comfortable corners and a calm visual identity make the website feel like an extension of the cafe itself.</p>
            <div className="space-list">
              <div><span>01</span><strong>Morning coffee</strong><small>Quiet tables and fresh pastries.</small></div>
              <div><span>02</span><strong>Work & meet</strong><small>Comfortable seating for a focused afternoon.</small></div>
              <div><span>03</span><strong>Evening table</strong><small>Food, conversation and a slower finish.</small></div>
            </div>
          </div>
        </section>

        <section className="cafe-feature">
          <div>
            <span className="section-label">A SIMPLE DIGITAL EXPERIENCE</span>
            <h2>Everything your guests need, <em>in one place.</em></h2>
          </div>
          <div className="feature-grid">
            <article><CalendarDays /><strong>Table enquiries</strong><p>Let guests request a table without searching for contact details.</p></article>
            <article><Coffee /><strong>Digital menu</strong><p>Organised categories make dishes and drinks easy to discover.</p></article>
            <article><MapPin /><strong>Easy to find</strong><p>Location, opening hours and contact options stay visible.</p></article>
          </div>
        </section>

        <section id="visit" className="cafe-visit">
          <div>
            <span className="section-label">VISIT MORROW</span>
            <h2>Come for coffee.<br /><em>Stay for a while.</em></h2>
            <p>Fictional demo concept. The structure can be adapted for a real cafe, bakery, coffee shop or casual restaurant.</p>
            <div className="visit-details">
              <span><MapPin size={16} /> Central Avenue, Rajahmundry</span>
              <span><Clock3 size={16} /> Mon–Sun · 8:00 AM — 10:00 PM</span>
            </div>
            <button className="dark-btn" onClick={() => setShowBooking(true)}>Plan a table <ArrowUpRight size={15} /></button>
          </div>
          <div className="visit-image">
            <img src="/assets/demos/webp/cafe-800.webp" alt="Cafe table setting" loading="lazy" />
          </div>
        </section>

        <section className="cafe-cta">
          <span className="section-label">VRLSS DEMO / CONCEPT</span>
          <h2>Want a cafe website <em>like this?</em></h2>
          <p>We can adapt the menu, gallery, table enquiry flow, offers and branding around your business.</p>
          <a href="/#demos" className="light-btn">Back to VRLSS <ArrowUpRight size={15} /></a>
        </section>
      </main>

      <footer className="cafe-footer">
        <span>MORROW · FICTIONAL DEMO CONCEPT</span>
        <a href="/#demos">Back to VRLSS</a>
      </footer>

      {selected && (
        <div className="cafe-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="cafe-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}><X /></button>
            <img src={selected.image} alt={selected.name} />
            <div><span>{selected.category}</span><h3>{selected.name}</h3><p>{selected.note}</p><strong>{selected.price}</strong></div>
          </div>
        </div>
      )}

      {showBooking && (
        <div className="cafe-modal-backdrop" onClick={() => setShowBooking(false)}>
          <form className="booking-modal" onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); setShowBooking(false); }}>
            <button type="button" className="modal-close" onClick={() => setShowBooking(false)}><X /></button>
            <span className="section-label">TABLE ENQUIRY</span>
            <h3>Plan your visit.</h3>
            <label>Name<input required placeholder="Your name" /></label>
            <div className="booking-two">
              <label>Date<input type="date" required /></label>
              <label>Guests<select defaultValue="2"><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label>
            </div>
            <label>Message<textarea placeholder="Any preferences or notes?" /></label>
            <button className="dark-btn" type="submit">Send enquiry <ArrowUpRight size={15} /></button>
          </form>
        </div>
      )}
    </div>
  )
}

export default CafeDemo
