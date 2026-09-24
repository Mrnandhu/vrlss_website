import { useMemo, useState } from 'react'
import { ArrowRight, Check, Search, Sofa, X } from 'lucide-react'
import './FurnitureDemo.css'

const products = [
  { id:1, name:'Luna Lounge Sofa', category:'Living', price:'₹42,900', image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85', detail:'Deep-seat three-seater with soft linen upholstery.' },
  { id:2, name:'Oakline Dining Table', category:'Dining', price:'₹36,500', image:'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85', detail:'Solid oak dining table designed for everyday hosting.' },
  { id:3, name:'Milo Accent Chair', category:'Living', price:'₹18,900', image:'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85', detail:'Compact accent chair with a sculpted back and warm fabric.' },
  { id:4, name:'Linea Bed Frame', category:'Bedroom', price:'₹48,000', image:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85', detail:'Minimal upholstered bed with a calm, modern profile.' },
  { id:5, name:'Noma Sideboard', category:'Storage', price:'₹29,800', image:'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85', detail:'Low-profile storage for dining, living and entry spaces.' },
  { id:6, name:'Arc Work Desk', category:'Office', price:'₹24,500', image:'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85', detail:'A clean work surface with cable-friendly everyday proportions.' },
]

const categories = ['All','Living','Dining','Bedroom','Storage','Office']

export default function FurnitureDemo(){
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => products.filter(p => {
    const matchCategory = active === 'All' || p.category === active
    const matchQuery = !query || `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
    return matchCategory && matchQuery
  }), [active, query])

  return <div className="furniture-demo">
    <header className="fd-nav">
      <a className="fd-logo" href="/">OAK & HOME<span>FURNISHINGS</span></a>
      <nav><a href="#collection">Collection</a><a href="#approach">Approach</a><a href="#contact">Contact</a></nav>
      <a className="fd-nav-cta" href="#collection">Browse furniture <ArrowRight size={15}/></a>
    </header>

    <main>
      <section className="fd-hero">
        <div className="fd-hero-copy">
          <p className="eyebrow">DEMO CONCEPT · FURNITURE STORE</p>
          <h1>Furniture that makes <em>room for living.</em></h1>
          <p className="lead">A product-led furniture website concept built around discovery, specifications and simple customer enquiries.</p>
          <div className="fd-actions"><a className="dark-btn" href="#collection">Explore collection <ArrowRight size={15}/></a><a className="light-btn" href="#contact">Talk to the store</a></div>
          <div className="fd-meta"><span><Sofa size={15}/> Living · Dining · Bedroom</span><span>Demo concept by VRLSS</span></div>
        </div>
        <div className="fd-hero-image"><img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=88"/><span>Thoughtfully selected furniture</span></div>
      </section>

      <section className="fd-intro" id="approach">
        <div><p className="eyebrow">THE STORE EXPERIENCE</p><h2>A digital showroom built around <em>your collection.</em></h2></div>
        <p>Customers can browse furniture by room, compare product details, explore materials and send an enquiry without needing a complicated checkout system.</p>
      </section>

      <section className="fd-collection" id="collection">
        <div className="fd-section-head"><div><p className="eyebrow">THE COLLECTION</p><h2>Pieces for <em>every room.</em></h2></div><div className="fd-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search furniture"/></div></div>
        <div className="fd-filters">{categories.map(c=><button className={active===c?'active':''} onClick={()=>setActive(c)} key={c}>{c}</button>)}</div>
        <div className="fd-grid">{filtered.map(p=><article className="fd-card" key={p.id} onClick={()=>setSelected(p)}><div className="fd-card-image"><img src={p.image}/><span>View details <ArrowRight size={13}/></span></div><div className="fd-card-info"><div><p>{p.category}</p><h3>{p.name}</h3></div><strong>{p.price}</strong></div><small>{p.detail}</small></article>)}</div>
      </section>

      <section className="fd-feature"><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=88"/><div><p className="eyebrow">ROOM STORIES</p><h2>Build a space that feels <em>like yours.</em></h2><p>Showcase complete room settings, coordinated pieces and styling ideas so customers can imagine the furniture in context.</p><a className="dark-btn" href="#collection">Explore pieces <ArrowRight size={15}/></a></div></section>

      <section className="fd-benefits"><div><p className="eyebrow">BUILT FOR FURNITURE BUSINESSES</p><h2>Everything customers need, <em>in one place.</em></h2></div><div className="fd-benefit-grid"><div><b>01</b><h3>Product catalogue</h3><p>Organize furniture by room, category and collection.</p></div><div><b>02</b><h3>Detailed specifications</h3><p>Show dimensions, materials, finishes and care information.</p></div><div><b>03</b><h3>Enquiry flow</h3><p>Turn product interest into direct customer conversations.</p></div><div><b>04</b><h3>Store discovery</h3><p>Connect the online catalogue with location and contact details.</p></div></div></section>

      <section className="fd-contact" id="contact"><div><p className="eyebrow">PLAN YOUR NEXT FURNITURE WEBSITE</p><h2>Have a furniture business in mind?</h2><p>This fictional demo shows how a furniture catalogue can be presented as a clean digital showroom. The structure can be customized around a real store's collection.</p></div><form onSubmit={e=>e.preventDefault()}><input placeholder="Your name"/><input placeholder="Phone / WhatsApp"/><select defaultValue=""><option value="" disabled>What do you need?</option><option>Furniture catalogue</option><option>Website + enquiries</option><option>Custom ecommerce</option></select><textarea placeholder="Tell us about your store"></textarea><button className="dark-btn">Send enquiry <ArrowRight size={15}/></button></form></section>
    </main>

    <footer><span>OAK & HOME · FICTIONAL DEMO CONCEPT</span><a href="/">Back to VRLSS</a></footer>

    {selected && <div className="fd-modal-backdrop" onClick={()=>setSelected(null)}><div className="fd-modal" onClick={e=>e.stopPropagation()}><button className="fd-close" onClick={()=>setSelected(null)}><X size={18}/></button><img src={selected.image}/><div><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><strong>{selected.price}</strong><p>{selected.detail}</p><ul><li><Check size={14}/> Product detail presentation</li><li><Check size={14}/> Enquiry-ready catalogue</li><li><Check size={14}/> Mobile-friendly browsing</li></ul><a className="dark-btn" href="#contact" onClick={()=>setSelected(null)}>Enquire about this piece <ArrowRight size={15}/></a></div></div></div>}
  </div>
}
