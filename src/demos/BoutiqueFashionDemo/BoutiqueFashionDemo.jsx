import { useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Heart, Menu, Search, X } from 'lucide-react'
import './BoutiqueFashionDemo.css'

const products = [
  { id:1, name:'Satin Drape Dress', category:'Dresses', price:2890, image:'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85', note:'Fluid evening silhouette' },
  { id:2, name:'Linen Co-ord Set', category:'Sets', price:2490, image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85', note:'Relaxed everyday tailoring' },
  { id:3, name:'Soft Tailored Blazer', category:'Outerwear', price:3190, image:'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1000&q=85', note:'Structured, easy layering' },
  { id:4, name:'Pleated Midi Skirt', category:'Skirts', price:2190, image:'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=85', note:'Light movement and clean lines' },
  { id:5, name:'Everyday Cotton Shirt', category:'Shirts', price:1690, image:'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=85', note:'A wardrobe staple' },
  { id:6, name:'Hand-finished Kurta Set', category:'Ethnic', price:2790, image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85', note:'Modern festive dressing' },
  { id:7, name:'Minimal Shoulder Bag', category:'Accessories', price:1890, image:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85', note:'Compact everyday carry' },
  { id:8, name:'Gold-tone Layered Chain', category:'Accessories', price:990, image:'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85', note:'A subtle finishing detail' },
]

const categories=['All','Dresses','Sets','Outerwear','Skirts','Shirts','Ethnic','Accessories']

function ProductCard({ product, onOpen, wished, onWish }) {
  return <article className="boutique-product-card">
    <button className={`boutique-wish ${wished?'is-wished':''}`} onClick={()=>onWish(product.id)} aria-label="Save item"><Heart size={16} fill={wished?'currentColor':'none'}/></button>
    <button className="boutique-image-button" onClick={()=>onOpen(product)}>
      <img src={product.image} alt={product.name} loading="lazy" />
      <span>View piece <ArrowUpRight size={14}/></span>
    </button>
    <div className="boutique-product-info">
      <div><p>{product.category}</p><h3>{product.name}</h3></div>
      <strong>₹{product.price.toLocaleString('en-IN')}</strong>
    </div>
    <small>{product.note}</small>
  </article>
}

function BoutiqueFashionDemo(){
  const [category,setCategory]=useState('All')
  const [query,setQuery]=useState('')
  const [selected,setSelected]=useState(null)
  const [wishes,setWishes]=useState([])
  const [mobileOpen,setMobileOpen]=useState(false)

  const visible=useMemo(()=>products.filter(p=>(category==='All'||p.category===category)&&(!query.trim()||p.name.toLowerCase().includes(query.toLowerCase())||p.category.toLowerCase().includes(query.toLowerCase()))),[category,query])

  const toggleWish=id=>setWishes(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id])

  return <div className="boutique-demo">
    <header className="boutique-header">
      <a className="boutique-logo" href="#top"><span>A</span><div><b>AURELIA</b><small>FASHION STUDIO</small></div></a>
      <nav className={mobileOpen?'is-open':''}>
        <a href="#collection" onClick={()=>setMobileOpen(false)}>Collection</a>
        <a href="#lookbook" onClick={()=>setMobileOpen(false)}>Lookbook</a>
        <a href="#studio" onClick={()=>setMobileOpen(false)}>Studio</a>
        <a href="#contact" onClick={()=>setMobileOpen(false)}>Contact</a>
      </nav>
      <div className="boutique-actions">
        <button className="boutique-search-toggle" onClick={()=>document.getElementById('boutique-search')?.focus()} aria-label="Search"><Search size={17}/></button>
        <a className="boutique-enquire" href="#contact">Enquire <ArrowUpRight size={14}/></a>
        <button className="boutique-menu" onClick={()=>setMobileOpen(v=>!v)} aria-label="Menu">{mobileOpen?<X size={19}/>:<Menu size={19}/>}</button>
      </div>
    </header>

    <main id="top">
      <div className="boutique-demo-note"><span>VRLSS DEMO / CONCEPT</span><small>Fictional boutique concept. Products, prices and catalogue entries are demonstration content.</small></div>

      <section className="boutique-hero">
        <div className="boutique-hero-copy">
          <span className="eyebrow">NEW SEASON / AURELIA</span>
          <h1>Style that feels <em>like you.</em></h1>
          <p>A refined fashion storefront concept for boutiques that want their collections, product details and customer enquiries to feel effortless.</p>
          <div className="boutique-hero-actions"><a className="button-dark" href="#collection">Explore collection <ArrowRight size={15}/></a><a className="button-light" href="#contact">Talk to the studio</a></div>
        </div>
        <div className="boutique-hero-image"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1500&q=88" alt="Fashion editorial"/><span>CURATED / SS26</span></div>
      </section>

      <section className="boutique-intro" id="studio">
        <div><span className="eyebrow">THE BOUTIQUE EXPERIENCE</span><h2>A digital shop built around <em>your collection.</em></h2></div>
        <p>From new arrivals to festive edits, this concept gives a fashion business a clean place to present products, answer enquiries and guide customers toward a visit or purchase.</p>
      </section>

      <section className="boutique-collection" id="collection">
        <div className="section-heading"><div><span className="eyebrow">SHOP THE EDIT</span><h2>Pieces for <em>every mood.</em></h2></div><div className="boutique-search"><Search size={15}/><input id="boutique-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search pieces"/></div></div>
        <div className="boutique-filters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
        <div className="boutique-grid">{visible.map(p=><ProductCard key={p.id} product={p} onOpen={setSelected} wished={wishes.includes(p.id)} onWish={toggleWish}/>)}</div>
      </section>

      <section className="boutique-lookbook" id="lookbook">
        <div className="lookbook-image"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=88" alt="Boutique styling"/></div>
        <div className="lookbook-copy"><span className="eyebrow">THE LOOKBOOK</span><h2>See the collection <em>come together.</em></h2><p>Editorial stories can turn a simple catalogue into a visual experience — useful for seasonal launches, festive edits and new drops.</p><a className="button-dark" href="#collection">Browse pieces <ArrowRight size={15}/></a></div>
      </section>

      <section className="boutique-services">
        <div><span className="eyebrow">BUILT FOR BOUTIQUES</span><h2>Everything your customers need, <em>in one place.</em></h2></div>
        <div className="service-list"><article><b>01</b><h3>Collection catalogue</h3><p>Organize new arrivals, categories and seasonal edits.</p></article><article><b>02</b><h3>Product details</h3><p>Show sizes, colors, pricing and product photography clearly.</p></article><article><b>03</b><h3>Enquiry flow</h3><p>Turn product interest into WhatsApp or direct enquiries.</p></article><article><b>04</b><h3>Store discovery</h3><p>Help customers find your boutique, hours and contact details.</p></article></div>
      </section>

      <section className="boutique-contact" id="contact">
        <div><span className="eyebrow">PLAN THE NEXT COLLECTION</span><h2>Have a fashion business in mind?</h2><p>This fictional demo shows how a boutique website can combine a catalogue, editorial storytelling and enquiry flow in one polished experience.</p></div>
        <div className="contact-card"><label>Name<input placeholder="Your name"/></label><label>Phone / WhatsApp<input placeholder="+91"/></label><label>What do you need?<select><option>Catalogue website</option><option>Online store</option><option>Product enquiry website</option><option>Custom solution</option></select></label><label>Message<textarea placeholder="Tell us about your boutique..."></textarea></label><button className="button-dark">Send enquiry <ArrowUpRight size={15}/></button></div>
      </section>
    </main>

    <footer className="boutique-footer"><span>AURELIA / FICTIONAL DEMO</span><a href="/">Back to VRLSS ↗</a></footer>

    {selected && <div className="boutique-modal" onClick={()=>setSelected(null)}><div className="boutique-modal-card" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}><X size={18}/></button><img src={selected.image} alt={selected.name}/><div><span className="eyebrow">{selected.category}</span><h2>{selected.name}</h2><strong>₹{selected.price.toLocaleString('en-IN')}</strong><p>{selected.note}. A fictional catalogue item used to demonstrate a boutique product-detail experience.</p><a className="button-dark" href="#contact" onClick={()=>setSelected(null)}>Enquire about this piece <ArrowUpRight size={15}/></a></div></div></div>}
  </div>
}

export default BoutiqueFashionDemo
