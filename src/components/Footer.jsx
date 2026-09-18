import { ArrowUpRight } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-main">

          {/* BRAND */}

          <div className="footer-brand">

            <a
              href="#home"
              className="footer-logo"
            >
              <strong>
                <span>V</span>RLS
              </strong>

              <small>SOLUTIONS</small>
            </a>

            <p>
              Digital products built around
              real requirements.
            </p>

          </div>


          {/* NAVIGATION */}

          <div className="footer-column">

            <span className="footer-column-label">
              EXPLORE
            </span>

            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#technologies">Technologies</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>

          </div>


          {/* SERVICES */}

          <div className="footer-column">

            <span className="footer-column-label">
              SERVICES
            </span>

            <a href="#services">Websites</a>
            <a href="#services">Web Applications</a>
            <a href="#services">Mobile Applications</a>
            <a href="#services">Custom Software</a>
            <a href="#services">Business Systems</a>
            <a href="#services">AI & Automation</a>

          </div>


          {/* CONTACT */}

          <div className="footer-column footer-contact">

            <span className="footer-column-label">
              START A PROJECT
            </span>

            <a
              href="https://wa.me/919515294733"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
              <ArrowUpRight size={13} />
            </a>

            <a href="mailto:sai.v.7079@gmail.com">
              Email
              <ArrowUpRight size={13} />
            </a>

          </div>

        </div>


        {/* FOOTER CTA */}

        <div className="footer-cta">

          <div>
            <span>HAVE AN IDEA?</span>

            <h2>
              Let's build
              <em> something real.</em>
            </h2>
          </div>

          <a href="#contact">
            Start a Project
            <ArrowUpRight size={18} />
          </a>

        </div>


        {/* FOOTER BOTTOM */}

        <div className="footer-bottom">

          <span>
            © 2026 VRLS Solutions
          </span>

          <span>
            Websites · Web Apps · Mobile Apps · Custom Software
          </span>

          <a href="#home">
            Back to top ↑
          </a>

        </div>

      </div>

    </footer>
  )
}

export default Footer
