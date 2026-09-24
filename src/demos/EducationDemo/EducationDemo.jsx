import { useState } from 'react'
import { ArrowRight, Check, ChevronDown, Menu, X, BookOpen, CalendarDays, GraduationCap } from 'lucide-react'
import './EducationDemo.css'

const programs = [
  { category: 'School', title: 'Foundation & School Programs', text: 'A structured learning path for students building strong academic fundamentals.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85', points: ['Concept-focused learning', 'Regular assessments', 'Parent communication'] },
  { category: 'Competitive', title: 'JEE & NEET Preparation', text: 'Focused preparation programs with topic-wise practice, tests and revision.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85', points: ['Subject modules', 'Mock tests', 'Revision planning'] },
  { category: 'Skills', title: 'Computer & Coding', text: 'Practical digital skills for students who want to learn technology by building.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85', points: ['Web fundamentals', 'Programming basics', 'Project-based practice'] },
  { category: 'Language', title: 'Spoken English', text: 'Confidence-building sessions for everyday communication, vocabulary and presentation.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85', points: ['Conversation practice', 'Vocabulary', 'Presentation skills'] },
]

const process = [
  ['01', 'Discover', 'Understand the learner, goals and preferred program.'],
  ['02', 'Plan', 'Recommend a suitable learning path and schedule.'],
  ['03', 'Learn', 'Build concepts through guided lessons and practical work.'],
  ['04', 'Review', 'Use assessments and feedback to identify the next step.'],
]

function EducationDemo() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const filters = ['All', 'School', 'Competitive', 'Skills', 'Language']
  const visible = filter === 'All' ? programs : programs.filter((p) => p.category === filter)

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="education-demo">
      <header className="ed-nav">
        <a className="ed-logo" href="/">BRIGHTPATH<span>ACADEMY</span></a>
        <nav>
          <button className="ed-light-btn" onClick={() => scrollTo('programs')}>Programs</button>
          <button className="ed-light-btn" onClick={() => scrollTo('approach')}>Approach</button>
          <button className="ed-light-btn" onClick={() => scrollTo('notices')}>Updates</button>
        </nav>
        <button className="ed-nav-cta" onClick={() => scrollTo('admissions')}>Enquire <ArrowRight size={13} /></button>
        <button className="ed-menu" aria-label="Open menu" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        {menuOpen && <div className="ed-mobile-menu">
          <a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="#notices" onClick={() => setMenuOpen(false)}>Updates</a>
          <a href="#admissions" onClick={() => setMenuOpen(false)}>Admissions</a>
        </div>}
      </header>

      <main>
        <section className="ed-hero">
          <div className="ed-hero-copy">
            <p className="ed-eyebrow">Demo concept · Education</p>
            <h1>Learning that builds <em>confidence.</em></h1>
            <p className="ed-lead">A modern education website concept for schools, coaching centres and skill-focused learning programs.</p>
            <div className="ed-actions">
              <a className="ed-dark-btn" href="#programs">Explore programs <ArrowRight size={13} /></a>
              <a className="ed-light-btn" href="#admissions">Ask about admissions</a>
            </div>
            <div className="ed-meta"><span><GraduationCap size={13} /> Multiple learning paths</span><span><BookOpen size={13} /> Practical & guided</span></div>
          </div>
          <div className="ed-hero-image"><img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1500&q=85" alt="Students learning in a classroom" /><span>Fictional education demo</span></div>
        </section>

        <section className="ed-intro" id="approach">
          <div><p className="ed-eyebrow">The learning experience</p><h2>Clear goals.<br /><em>Better direction.</em></h2></div>
          <p>This fictional concept is designed to make programs easier to understand before an enquiry. Visitors can explore learning options, compare formats and send an admission enquiry from one place.</p>
        </section>

        <section className="ed-programs" id="programs">
          <div className="ed-section-head"><div><p className="ed-eyebrow">Explore programs</p><h2>Find the right <em>path.</em></h2></div><p>Present courses and learning programs with clear descriptions, useful details and a direct enquiry flow.</p></div>
          <div className="ed-filters">{filters.map(f => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div>
          <div className="ed-program-grid">
            {visible.map((p) => <article className="ed-program-card" key={p.title} onClick={() => setSelected(p)}>
              <div className="ed-program-image"><img src={p.image} alt={p.title} /><span>{p.category}</span></div>
              <div className="ed-program-info"><p>{p.category}</p><h3>{p.title}</h3><small>{p.text}</small></div>
            </article>)}
          </div>
        </section>

        <section className="ed-feature">
          <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1500&q=85" alt="Students collaborating" />
          <div><p className="ed-eyebrow">Built for progress</p><h2>More than classes.<br /><em>A learning journey.</em></h2><p>Use this section to explain what makes the institute's approach different — from mentoring and practice to assessments and regular feedback.</p><a className="ed-dark-btn" href="#admissions">Start an enquiry <ArrowRight size={13} /></a></div>
        </section>

        <section className="ed-process">
          <div><p className="ed-eyebrow">The approach</p><h2>Simple steps.<br /><em>Focused learning.</em></h2></div>
          <div className="ed-process-list">{process.map(([n,t,d]) => <div key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div><ChevronDown size={14} /></div>)}</div>
        </section>

        <section className="ed-notices" id="notices">
          <div><p className="ed-eyebrow">What can live here</p><h2>Keep families <em>informed.</em></h2></div>
          <div className="ed-notice-grid">
            <article><CalendarDays size={15}/><p>Admissions</p><h3>New intake</h3><span>Show admission dates, eligibility and enquiry details.</span></article>
            <article><BookOpen size={15}/><p>Academic</p><h3>Study resources</h3><span>Highlight useful resources, schedules or revision plans.</span></article>
            <article><GraduationCap size={15}/><p>Events</p><h3>Open house</h3><span>Promote orientation sessions, workshops or parent meets.</span></article>
          </div>
        </section>

        <section className="ed-admissions" id="admissions">
          <div><p className="ed-eyebrow">Plan the next step</p><h2>Have a course in <em>mind?</em></h2><p>Send an enquiry and use this form to collect the basic details needed for a follow-up conversation.</p><ul><li><Check size={13}/> Program and class selection</li><li><Check size={13}/> Preferred contact details</li><li><Check size={13}/> Flexible enquiry message</li></ul></div>
          <form onSubmit={(e) => e.preventDefault()}><div className="ed-form-row"><input placeholder="Student / Parent name" /><input placeholder="Phone number" /></div><div className="ed-form-row"><select defaultValue=""><option value="" disabled>Select program</option>{filters.slice(1).map(f => <option key={f}>{f}</option>)}</select><input placeholder="Preferred start" /></div><textarea placeholder="Tell us what you are looking for..." /><button className="ed-dark-btn" type="submit">Send enquiry <ArrowRight size={13}/></button></form>
        </section>
      </main>

      <footer><span>BRIGHTPATH ACADEMY · FICTIONAL DEMO CONCEPT</span><a href="/">Back to VRLSS</a></footer>

      {selected && <div className="ed-modal-backdrop" onClick={() => setSelected(null)}>
        <div className="ed-modal" onClick={e => e.stopPropagation()}>
          <button className="ed-close" aria-label="Close" onClick={() => setSelected(null)}><X size={16}/></button>
          <img src={selected.image} alt={selected.title}/>
          <div><p className="ed-eyebrow">{selected.category} program</p><h2>{selected.title}</h2><p>{selected.text}</p><ul>{selected.points.map(x => <li key={x}><Check size={13}/>{x}</li>)}</ul><button className="ed-dark-btn" onClick={() => { setSelected(null); scrollTo('admissions') }}>Enquire about this program <ArrowRight size={13}/></button></div>
        </div>
      </div>}
    </div>
  )
}

export default EducationDemo
