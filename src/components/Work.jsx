import {
  ArrowUpRight,
  Utensils,
  Coffee,
  Hospital,
  Building2,
  Home,
  Heart,
  Shirt,
  Sofa,
  GraduationCap,
  CarFront,
  PawPrint,
  ShoppingBasket,
  Scissors,
} from 'lucide-react'

const projects = [
  { number:'01', type:'VRLS DEMO / CONCEPT', title:'Function Hall / Convention Hall', description:'Venue showcase, spaces, packages, gallery and event enquiry experience.', tags:['Website','Enquiry','Hospitality'], icon: Building2, className:'work-function', demo:'/demos/function-hall', image:'/assets/demos/webp/function-hall-800.webp' },
  { number:'02', type:'VRLS DEMO / CONCEPT', title:'Interior Designer', description:'Portfolio-led website concept for projects, services, gallery and enquiries.', tags:['Website','Portfolio','Design'], icon: Home, className:'work-interior', demo:'/demos/interior-design', image:'/assets/demos/webp/interior-800.webp' },
  { number:'03', type:'VRLS DEMO / CONCEPT', title:'Real Estate / Property', description:'Property listings, search, filters, property details and lead enquiries.', tags:['Web App','Listings','Leads'], icon: Building2, className:'work-realestate', demo:'/demos/real-estate', image:'/assets/demos/webp/real-estate-800.webp' },
  { number:'04', type:'VRLS DEMO / CONCEPT', title:'Wedding & Events', description:'Services, packages, gallery and event enquiry experience.', tags:['Website','Events','Enquiry'], icon: Heart, className:'work-events', demo:'/demos/wedding-events', image:'/assets/demos/webp/function-hall-800.webp' },
  { number:'05', type:'VRLS DEMO / CONCEPT', title:'Restaurant', description:'Digital menu, categories, offers, location and ordering/enquiry flow.', tags:['Website','Menu','Food'], icon: Utensils, className:'work-restaurant', demo:'/demos/restaurant', image:'/assets/demos/webp/restaurant-800.webp' },
  { number:'06', type:'VRLS DEMO / CONCEPT', title:'Cafe / Coffee Shop', description:'Cafe website concept with signature drinks, food menu, atmosphere and table enquiries.', tags:['Cafe','Menu','Bookings'], icon: Coffee, className:'work-cafe', demo:'/demos/cafe', image:'/assets/demos/webp/cafe-800.webp' },
  { number:'07', type:'VRLS DEMO / CONCEPT', title:'Boutique & Fashion', description:'Fashion catalogue, collections, product details and WhatsApp enquiries.', tags:['Catalogue','Retail','WhatsApp'], icon: Shirt, className:'work-boutique', demo:'/demos/boutique', image:'/assets/demos/webp/boutique-800.webp' },
  { number:'08', type:'VRLS DEMO / CONCEPT', title:'Furniture Store', description:'Product catalogue, categories, specifications and customer enquiries.', tags:['Catalogue','Retail','Products'], icon: Sofa, className:'work-furniture', demo:'/demos/furniture', image:'/assets/demos/webp/furniture-800.webp' },
  { number:'09', type:'VRLS DEMO / CONCEPT', title:'Education', description:'Coaching, school and college website concept with courses, faculty and admissions.', tags:['Education','Admissions','CMS'], icon: GraduationCap, className:'work-education', demo:'/demos/education', image:'/assets/demos/webp/education-800.webp' },
  { number:'10', type:'VRLS DEMO / CONCEPT', title:'Hospital / Clinic Management', description:'Clinic management dashboard with patients, doctors, appointments, billing and patient booking.', tags:['Healthcare','Appointments','Management'], icon: Hospital, className:'work-hospital', demo:'/demos/hospital', image:'/assets/demos/webp/hospital-800.webp' },
  { number:'11', type:'VRLS DEMO / CONCEPT', title:'Car Wash & Auto Care', description:'Service menu and visit request flow for car washing, interior care and detailing.', tags:['Auto Care','Services','Booking'], icon: CarFront, className:'work-carwash', demo:'/demos/car-wash', image:'/assets/car-wash-hero.webp' },
  { number:'12', type:'VRLS DEMO / CONCEPT', title:'Pet & Veterinary Care', description:'Veterinary service information and a simple appointment enquiry experience.', tags:['Pets','Healthcare','Appointments'], icon: PawPrint, className:'work-petvet', demo:'/demos/pet-vet', image:'/assets/pet-vet-hero.webp' },
  { number:'13', type:'VRLS DEMO / CONCEPT', title:'Supermarket & Grocery', description:'Browse everyday departments and build a simple shopping list across devices.', tags:['Grocery','Retail','Shopping'], icon: ShoppingBasket, className:'work-supermarket', demo:'/demos/supermarket', image:'/assets/supermarket-hero.webp' },
  { number:'14', type:'VRLS DEMO / CONCEPT', title:'Beauty Salon & Hair Studio', description:'Explore hair and beauty services and request an appointment in a few steps.', tags:['Beauty','Services','Booking'], icon: Scissors, className:'work-salon', demo:'/demos/salon', image:'/assets/salon-hero.webp' },
]

function ProjectPreview({ project }) {
  const hasResponsiveVariants = project.image.includes('-800.webp')
  const mobileImage = hasResponsiveVariants
    ? project.image.replace('-800.webp', '-480.webp')
    : undefined
  const sourceSet = hasResponsiveVariants ? `${mobileImage} 480w, ${project.image} 640w` : undefined

  return (
    <div className={`project-preview ${project.className}`}>
      <picture>
        <source
          type="image/webp"
          srcSet={sourceSet}
          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
        <img
          className="project-image"
          src={project.image}
          srcSet={sourceSet}
          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 600px"
          alt={`${project.title} demo concept`}
          width="640"
          height="427"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </picture>
      <div className="project-image-overlay" />
      <div className="preview-chip">DEMO CONCEPT</div>
    </div>
  )
}

function Work() {
  return (
    <section id="demos" className="work-section">
      <div className="section-container">
        <div className="work-heading">
          <div className="section-eyebrow">
            <span />
            INDUSTRIES &amp; DEMO SOLUTIONS
          </div>

          <div className="work-heading-content">
            <h2>
              Digital solutions
              <br />
              for every <em>industry.</em>
            </h2>

            <p>
              Interactive demo concepts for the business categories and digital solutions we are building. Each demo is a fictional concept created to show what a customized VRLSS solution can look like.
            </p>
          </div>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <ProjectPreview project={project} />

              <div className="project-info">
                <div className="project-meta">
                  <span>{project.type}</span>
                  <span>{project.number}</span>
                </div>

                <div className="project-title-row">
                  <div className="project-copy">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>

                  <a
                    href={project.demo}
                    className="project-link project-demo-link"
                    aria-label={`See ${project.title} demo`}
                    onClick={(event) => {
                      if (project.demo === '#') {
                        event.preventDefault()
                      }
                    }}
                  >
                    <span>See Demo</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
