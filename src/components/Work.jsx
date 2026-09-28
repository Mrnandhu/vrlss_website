import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { number:'01', category:'BUSINESS WEBSITE', title:'Function Hall', description:'A venue experience built around spaces, facilities, galleries and enquiries.', tags:['Website','Enquiry'], demo:'/demos/function-hall', image:'/assets/demos/webp/function-hall-800.webp' },
  { number:'02', category:'PORTFOLIO EXPERIENCE', title:'Interior Design', description:'A visual portfolio concept for projects, services and client enquiries.', tags:['Portfolio','Design'], demo:'/demos/interior-design', image:'/assets/demos/webp/interior-800.webp' },
  { number:'03', category:'PROPERTY PLATFORM', title:'Real Estate', description:'Property discovery with listings, filters, details, locations and lead capture.', tags:['Web App','Listings'], demo:'/demos/real-estate', image:'/assets/demos/webp/real-estate-800.webp' },
  { number:'04', category:'EVENT EXPERIENCE', title:'Wedding & Events', description:'A polished service and package experience designed to turn interest into enquiries.', tags:['Events','Enquiry'], demo:'/demos/wedding-events', image:'/assets/demos/webp/wedding-events-800.webp' },
  { number:'05', category:'HOSPITALITY EXPERIENCE', title:'Restaurant', description:'Menu discovery, offers, location and direct customer actions in one experience.', tags:['Menu','Hospitality'], demo:'/demos/restaurant', image:'/assets/demos/webp/restaurant-800.webp' },
  { number:'06', category:'HOSPITALITY EXPERIENCE', title:'Cafe', description:'A warm digital presence for menus, signature products and table enquiries.', tags:['Menu','Bookings'], demo:'/demos/cafe', image:'/assets/demos/webp/cafe-800.webp' },
  { number:'07', category:'COMMERCE EXPERIENCE', title:'Boutique & Fashion', description:'Collections and product discovery designed for modern retail businesses.', tags:['Catalogue','Retail'], demo:'/demos/boutique', image:'/assets/demos/webp/boutique-800.webp' },
  { number:'08', category:'COMMERCE EXPERIENCE', title:'Furniture Store', description:'Product catalogues with specifications, categories and customer enquiries.', tags:['Catalogue','Products'], demo:'/demos/furniture', image:'/assets/demos/webp/furniture-800.webp' },
  { number:'09', category:'EDUCATION EXPERIENCE', title:'Education', description:'Courses, faculty, admissions and information organized into a clear digital journey.', tags:['Admissions','CMS'], demo:'/demos/education', image:'/assets/demos/webp/education-800.webp' },
  { number:'10', category:'BUSINESS SOFTWARE', title:'Clinic Management', description:'A management interface concept for patients, appointments, doctors and billing.', tags:['Dashboard','Operations'], demo:'/demos/hospital', image:'/assets/demos/webp/hospital-800.webp' },
]

function Work() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.showcase-intro .section-eyebrow', {
        y: 18, opacity: 0, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: '.showcase-intro', start: 'top 82%', once: true }
      })

      gsap.from('.showcase-intro-grid h2', {
        yPercent: 28, opacity: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.showcase-intro-grid', start: 'top 84%', once: true }
      })

      gsap.from('.showcase-intro-grid p', {
        y: 30, opacity: 0, duration: .8, delay: .12, ease: 'power3.out',
        scrollTrigger: { trigger: '.showcase-intro-grid', start: 'top 84%', once: true }
      })

      gsap.utils.toArray('.showcase-card').forEach((card, index) => {
        const media = card.querySelector('.showcase-media')
        const image = card.querySelector('img')
        const copy = card.querySelector('.showcase-copy')

        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: .95,
          ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
          delay: index % 2 ? .08 : 0,
        })

        gsap.fromTo(media,
          { clipPath: 'inset(8% 7% 8% 7% round 22px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 22px)',
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 38%', scrub: .8 }
          }
        )

        gsap.fromTo(image,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 90%', end: 'bottom 18%', scrub: 1 }
          }
        )

        gsap.fromTo(copy,
          { y: 35 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 78%', end: 'top 35%', scrub: .8 }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="demos" className="work-section work-modern" ref={sectionRef}>
      <div className="showcase-intro section-container">
        <div className="section-eyebrow"><span /> SELECTED DEMO CONCEPTS</div>
        <div className="showcase-intro-grid">
          <h2>Explore what we<br /><em>can build.</em></h2>
          <p>Interactive concepts created by VRLSS to demonstrate different business experiences, product patterns and digital systems. These are fictional demonstrations, not client work.</p>
        </div>
      </div>

      <div className="showcase-list">
        {projects.map((project) => (
          <article className="showcase-card" key={project.number}>
            <a href={project.demo} className="showcase-media">
              <picture>
                <source type="image/webp" media="(max-width: 760px)" srcSet={project.image.replace('-800.webp','-480.webp')} />
                <img src={project.image} alt={project.title + ' demo concept'} width="800" height="533" loading="lazy" decoding="async" />
              </picture>
              <span className="showcase-number">{project.number}</span>
              <span className="showcase-open"><ArrowUpRight size={18} /></span>
            </a>
            <div className="showcase-copy">
              <div>
                <span className="showcase-category">{project.category}</span>
                <h3>{project.title}</h3>
              </div>
              <div className="showcase-details">
                <p>{project.description}</p>
                <div className="showcase-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <a href={project.demo} className="showcase-link">Explore demo <ArrowUpRight size={15} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Work
