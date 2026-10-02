import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Droplets,
  HeartPulse,
  Leaf,
  Menu,
  Scissors,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react'
import './IndustryShowcase.css'

const concepts = {
  'car-wash': {
    brand: 'Clearline Auto Care', category: 'CAR WASH & DETAILING', image: '/assets/car-wash-hero.webp',
    title: <>A cleaner drive.<br /><em>A clearer day.</em></>,
    intro: 'A straightforward way to explore car care services and request the finish your vehicle needs.',
    primary: 'Plan a visit', secondary: 'Explore services',
    serviceTitle: 'Care that fits your drive.',
    serviceIntro: 'Choose a service and send a visit request. This fictional concept shows one way an auto care business can present its services online.',
    services: [
      ['01', 'Exterior wash', 'A careful clean for the bodywork, glass and wheels.', Droplets],
      ['02', 'Interior refresh', 'A fresh interior clean for everyday use and longer journeys.', Sparkles],
      ['03', 'Full detailing', 'A more complete clean inside and out, tailored to the vehicle.', ShieldCheck],
    ],
    steps: ['Choose a service', 'Select a preferred time', 'Send your request'],
    formTitle: 'Request a visit', formLabel: 'VEHICLE CARE ENQUIRY', formPlaceholder: 'Tell us about your vehicle or preferred service',
    formOptions: ['Exterior wash', 'Interior refresh', 'Full detailing'],
    icon: Droplets, footer: 'Car wash and detailing website concept',
  },
  'pet-vet': {
    brand: 'Kindred Veterinary Care', category: 'PET & VETERINARY CARE', image: '/assets/pet-vet-hero.webp',
    title: <>Thoughtful care<br /><em>for every companion.</em></>,
    intro: 'A welcoming digital home for veterinary services, pet care information and appointment requests.',
    primary: 'Request an appointment', secondary: 'Explore care',
    serviceTitle: 'Care for every stage.',
    serviceIntro: 'Make it easier for pet owners to understand available services and take the next step with a care team.',
    services: [
      ['01', 'Wellness visits', 'A place to discuss routine care and your pet’s changing needs.', HeartPulse],
      ['02', 'Preventive care', 'Share care options and help owners prepare for a visit.', ShieldCheck],
      ['03', 'Diagnostics & follow-up', 'Keep appointment requests and next steps easy to find.', Stethoscope],
    ],
    steps: ['Choose a care area', 'Share a preferred time', 'Request an appointment'],
    formTitle: 'Request an appointment', formLabel: 'VETERINARY CARE ENQUIRY', formPlaceholder: 'Share your pet’s name and what you would like to discuss',
    formOptions: ['Wellness visit', 'Preventive care', 'Diagnostics & follow-up'],
    icon: HeartPulse, footer: 'Veterinary clinic website concept',
  },
  supermarket: {
    brand: 'Market & Field', category: 'SUPERMARKET & GROCERY', image: '/assets/supermarket-hero.webp',
    title: <>Everyday shopping,<br /><em>made easier.</em></>,
    intro: 'A clear online storefront concept for browsing grocery departments and building a simple shopping list.',
    primary: 'Browse departments', secondary: 'Build a list',
    serviceTitle: 'Your neighbourhood shop, online.',
    serviceIntro: 'Browse a few departments, add items to your list and see how a supermarket experience can work across devices.',
    services: [
      ['01', 'Fresh produce', 'Fruit, vegetables and seasonal essentials.', Leaf],
      ['02', 'Pantry staples', 'Everyday ingredients and cupboard favourites.', ShoppingBag],
      ['03', 'Home essentials', 'Useful items for the everyday shop.', Sparkles],
    ],
    steps: ['Browse departments', 'Add items to your list', 'Review your selection'],
    formTitle: 'Your shopping list', formLabel: 'DEMO SHOPPING LIST', formPlaceholder: 'Search for an item',
    formOptions: ['Apples', 'Leafy greens', 'Rice', 'Pasta', 'Milk', 'Bread', 'Household essentials'],
    icon: ShoppingBag, footer: 'Supermarket storefront concept', isStore: true,
  },
  salon: {
    brand: 'Form & Finish Studio', category: 'SALON & BEAUTY', image: '/assets/salon-hero.webp',
    title: <>Make time for<br /><em>your next look.</em></>,
    intro: 'A refined salon concept for exploring hair, skin and beauty services and requesting an appointment.',
    primary: 'Request an appointment', secondary: 'Explore services',
    serviceTitle: 'A considered salon experience.',
    serviceIntro: 'Present salon services clearly, share the atmosphere of the studio and make appointment enquiries simple.',
    services: [
      ['01', 'Hair styling', 'Cuts, styling and occasion-ready looks.', Scissors],
      ['02', 'Colour & treatments', 'Colour services and care tailored to your hair.', Sparkles],
      ['03', 'Skin & beauty', 'Beauty services gathered in one easy-to-explore place.', HeartPulse],
    ],
    steps: ['Choose a service', 'Share a preferred time', 'Send your request'],
    formTitle: 'Request an appointment', formLabel: 'SALON ENQUIRY', formPlaceholder: 'Tell us what you have in mind',
    formOptions: ['Hair styling', 'Colour & treatments', 'Skin & beauty'],
    icon: Scissors, footer: 'Salon and beauty website concept',
  },
}

function IndustryShowcase({ type }) {
  const concept = concepts[type]
  const [menuOpen, setMenuOpen] = useState(false)
  const [service, setService] = useState(concept.formOptions[0])
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [sent, setSent] = useState(false)
  const Icon = concept.icon
  const options = concept.formOptions.filter((item) => item.toLowerCase().includes(query.toLowerCase()))

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  const addItem = (item) => {
    setItems((current) => current.includes(item) ? current : [...current, item])
  }

  return (
    <main className="industry-demo" id="top">
      <div className="industry-demo-note"><span>VRLS DEMO / CONCEPT</span><span>Fictional business concept · Interactions are demonstrations</span></div>
      <header className="industry-nav">
        <a className="industry-brand" href="/#demos" aria-label="Back to VRLS demo solutions">
          <span className="industry-brand-mark"><Icon size={18} /></span>
          <span><strong>{concept.brand}</strong><small>{concept.category}</small></span>
        </a>
        <button className="industry-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? 'industry-nav-links is-open' : 'industry-nav-links'}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          {concept.isStore && <a href="#departments" onClick={() => setMenuOpen(false)}>Departments</a>}
          <a href="#approach" onClick={() => setMenuOpen(false)}>How it works</a>
          <a className="industry-nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>{concept.primary}<ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="industry-hero">
        <div className="industry-hero-copy">
          <span className="industry-eyebrow"><i /> {concept.category}</span>
          <h1>{concept.title}</h1>
          <p>{concept.intro}</p>
          <div className="industry-hero-actions">
            <a className="industry-primary" href={concept.isStore ? '#departments' : '#contact'}>{concept.primary}<ArrowRight size={16} /></a>
            <a className="industry-secondary" href="#services">{concept.secondary}<ArrowDownRight size={16} /></a>
          </div>
          <div className="industry-proof-row">
            <span><ShieldCheck size={17} /> Clear service details</span>
            <span><CalendarDays size={17} /> Simple enquiries</span>
          </div>
        </div>
        <div className="industry-hero-visual">
          <img src={concept.image} alt="" fetchPriority="high" />
          <span className="industry-image-label">{concept.footer}</span>
        </div>
      </section>

      <section className="industry-services" id="services">
        <div className="industry-section-head">
          <div><span className="industry-eyebrow"><i /> {concept.category}</span><h2>{concept.serviceTitle}</h2></div>
          <p>{concept.serviceIntro}</p>
        </div>
        <div className="industry-service-grid">
          {concept.services.map(([number, title, copy, ServiceIcon]) => (
            <article className="industry-service-card" key={number}>
              <div className="industry-service-card-top"><span>{number}</span><ServiceIcon size={20} /></div>
              <h3>{title}</h3><p>{copy}</p>
              <a href="#contact">Learn more <ArrowUpRight size={14} /></a>
            </article>
          ))}
        </div>
      </section>

      {concept.isStore && (
        <section className="industry-departments" id="departments">
          <div className="industry-section-head">
            <div><span className="industry-eyebrow"><i /> SHOP BY DEPARTMENT</span><h2>Build your everyday list.</h2></div>
            <p>Choose an item to add it to your demo list. No order is placed.</p>
          </div>
          <div className="industry-store-layout">
            <div className="industry-department-grid">
              {options.map((item) => (
                <button className="industry-item-card" key={item} onClick={() => addItem(item)}>
                  <span className="industry-item-icon"><ShoppingBag size={19} /></span><strong>{item}</strong><span>Add to list <ArrowUpRight size={13} /></span>
                </button>
              ))}
              {!options.length && <p className="industry-no-results">No matching items. Try another search.</p>}
            </div>
            <aside className="industry-list-card">
              <span className="industry-eyebrow"><i /> YOUR LIST</span>
              <h3>{items.length} {items.length === 1 ? 'item' : 'items'}</h3>
              {items.length ? <ul>{items.map((item) => <li key={item}>{item}<Check size={14} /></li>)}</ul> : <p>Your selected items will appear here.</p>}
              {items.length > 0 && <button onClick={() => setItems([])}>Clear list</button>}
            </aside>
          </div>
        </section>
      )}

      <section className="industry-approach" id="approach">
        <div className="industry-approach-copy"><span className="industry-eyebrow"><i /> A SIMPLE NEXT STEP</span><h2>{concept.isStore ? 'A smoother way to shop.' : 'From first visit to next step.'}</h2><p>{concept.isStore ? 'Help customers find what they need, create a list and understand how to continue.' : 'Make important information easy to find, then help customers take the next step with confidence.'}</p></div>
        <div className="industry-steps">{concept.steps.map((step, index) => <div className="industry-step" key={step}><span>0{index + 1}</span><p>{step}</p><ArrowRight size={16} /></div>)}</div>
      </section>

      <section className="industry-contact" id="contact">
        <div className="industry-contact-copy"><span className="industry-eyebrow"><i /> {concept.formLabel}</span><h2>{sent ? 'Request noted.' : concept.formTitle}</h2><p>{sent ? 'This is a local demo interaction. No information has been sent.' : 'Try the enquiry flow. This concept does not submit information to a business.'}</p></div>
        {concept.isStore ? (
          <div className="industry-list-controls"><label htmlFor="industry-search">Find an item</label><input id="industry-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={concept.formPlaceholder} />{items.length > 0 && <button className="industry-primary" onClick={() => { setItems([]); setSent(true) }}>Finish demo list <Check size={15} /></button>}</div>
        ) : (
          <form className="industry-request-form" onSubmit={handleSubmit}>
            <label>Your name<input required placeholder="Enter your name" /></label>
            <label>Service<select value={service} onChange={(event) => setService(event.target.value)}>{concept.formOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label>Preferred date<input type="date" /></label>
            <label className="industry-message">A few details<textarea placeholder={concept.formPlaceholder} rows="3" /></label>
            <button className="industry-primary" type="submit">{sent ? 'Request noted' : 'Send demo request'}{sent ? <Check size={15} /> : <ArrowUpRight size={15} />}</button>
          </form>
        )}
      </section>

      <footer className="industry-footer"><a href="/#demos"><ArrowRight size={15} /> Back to VRLS demo solutions</a><span>{concept.footer} · Fictional concept</span><a href="/#contact">Build a similar website <ArrowUpRight size={15} /></a></footer>
    </main>
  )
}

export default IndustryShowcase
