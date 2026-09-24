import {
  ArrowUpRight,
  Utensils,
  Coffee,
  Receipt,
  Smartphone,
  Hospital,
  LayoutDashboard,
  Bot,
  Building2,
  Home,
  Heart,
  Shirt,
  Sofa,
  GraduationCap,
} from 'lucide-react'

const projects = [
  { number:'01', type:'VRLS DEMO / CONCEPT', title:'Function Hall / Convention Hall', description:'Venue showcase, spaces, packages, gallery and event enquiry experience.', tags:['Website','Enquiry','Hospitality'], icon: Building2, className:'work-function', demo:'/demos/function-hall', image:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80' },
  { number:'02', type:'VRLS DEMO / CONCEPT', title:'Interior Designer', description:'Portfolio-led website concept for projects, services, gallery and enquiries.', tags:['Website','Portfolio','Design'], icon: Home, className:'work-interior', demo:'/demos/interior-design', image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80' },
  { number:'03', type:'VRLS DEMO / CONCEPT', title:'Real Estate / Property', description:'Property listings, search, filters, property details and lead enquiries.', tags:['Web App','Listings','Leads'], icon: Building2, className:'work-realestate', demo:'/demos/real-estate', image:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80' },
  { number:'04', type:'VRLS DEMO / CONCEPT', title:'Wedding & Events', description:'Services, packages, gallery and event enquiry experience.', tags:['Website','Events','Enquiry'], icon: Heart, className:'work-events', demo:'/demos/wedding-events', image:'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' },
  { number:'05', type:'VRLS DEMO / CONCEPT', title:'Restaurant', description:'Digital menu, categories, offers, location and ordering/enquiry flow.', tags:['Website','Menu','Food'], icon: Utensils, className:'work-restaurant', demo:'/demos/restaurant', image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80' },
  { number:'06', type:'VRLS DEMO / CONCEPT', title:'Cafe / Coffee Shop', description:'Cafe website concept with signature drinks, food menu, atmosphere and table enquiries.', tags:['Cafe','Menu','Bookings'], icon: Coffee, className:'work-cafe', demo:'/demos/cafe', image:'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80' },
  { number:'07', type:'VRLS DEMO / CONCEPT', title:'Boutique & Fashion', description:'Fashion catalogue, collections, product details and WhatsApp enquiries.', tags:['Catalogue','Retail','WhatsApp'], icon: Shirt, className:'work-boutique', demo:'/demos/boutique', image:'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80' },
  { number:'08', type:'VRLS DEMO / CONCEPT', title:'Furniture Store', description:'Product catalogue, categories, specifications and customer enquiries.', tags:['Catalogue','Retail','Products'], icon: Sofa, className:'work-furniture', demo:'/demos/furniture', image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80' },
  { number:'09', type:'VRLS DEMO / CONCEPT', title:'Education', description:'Coaching, school and college website concept with courses, faculty and admissions.', tags:['Education','Admissions','CMS'], icon: GraduationCap, className:'work-education', demo:'/demos/education', image:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80' },
  { number:'10', type:'VRLS DEMO / CONCEPT', title:'Hospital / Clinic Management', description:'Clinic management dashboard with patients, doctors, appointments, billing and patient booking.', tags:['Healthcare','Appointments','Management'], icon: Hospital, className:'work-hospital', demo:'/demos/hospital', image:'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80' },
]

function ProjectPreview({ project }) {
  return (
    <div className={`project-preview ${project.className}`}>
      <img
        className="project-image"
        src={project.image}
        alt={`${project.title} demo concept`}
        loading="lazy"
      />
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
            DEMO SOLUTIONS
          </div>

          <div className="work-heading-content">
            <h2>
              Explore what we
              <br />
              can build for <em>your business.</em>
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
