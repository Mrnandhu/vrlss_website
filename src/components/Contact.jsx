import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    project: '',
    details: '',
  })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const createMessage = () => {
    return `Hello VRLS Solutions,

My name is ${form.name || '[Name]'}.

I want to build:
${form.project || '[Project type]'}

My contact:
${form.contact || '[Email / WhatsApp]'}

Project details:
${form.details || '[Project details]'}

I would like to discuss this project.`
  }

  const sendWhatsApp = (event) => {
    event.preventDefault()

    const message = encodeURIComponent(createMessage())

    window.open(
      `https://wa.me/919515294733?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const sendEmail = (event) => {
    event.preventDefault()

    const subject = encodeURIComponent(
      `Project Enquiry — ${form.project || 'New Project'}`
    )

    const body = encodeURIComponent(createMessage())

    window.location.href =
      `mailto:sai.v.7079@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="contact-section">

      <div className="contact-container">

        {/* HEADER */}

        <div className="contact-header">

          <div>
            <div className="contact-eyebrow">
              <span />
              START A PROJECT
            </div>

            <h2>
              Have an idea?
              <br />
              <em>Let's build it.</em>
            </h2>
          </div>

          <p>
            Tell us what you want to build. Share your requirements and
            start a conversation with VRLS Solutions.
          </p>

        </div>


        {/* CONTACT OPTIONS */}

        <div className="contact-options">

          <a
            className="contact-option"
            href="https://wa.me/919515294733"
            target="_blank"
            rel="noreferrer"
          >
            <div className="contact-option-icon">
              <span>↗</span>
            </div>

            <div>
              <span>WHATSAPP</span>
              <h3>+91 9515294733</h3>
            </div>

            <strong>→</strong>
          </a>


          <a
            className="contact-option"
            href="mailto:sai.v.7079@gmail.com"
          >
            <div className="contact-option-icon">
              <span>✉</span>
            </div>

            <div>
              <span>EMAIL</span>
              <h3>sai.v.7079@gmail.com</h3>
            </div>

            <strong>→</strong>
          </a>

        </div>


        {/* PROJECT FORM */}

        <div className="contact-form-wrapper">

          <div className="contact-form-intro">
            <span>PROJECT ENQUIRY</span>

            <h3>
              Start with
              <br />
              the requirements.
            </h3>

            <p>
              A few details are enough to begin the conversation.
            </p>
          </div>


          <form className="contact-form">

            <div className="contact-form-row">

              <label>
                <span>YOUR NAME</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </label>


              <label>
                <span>EMAIL / WHATSAPP</span>

                <input
                  type="text"
                  name="contact"
                  placeholder="How can we reach you?"
                  value={form.contact}
                  onChange={handleChange}
                />
              </label>

            </div>


            <label>
              <span>WHAT DO YOU WANT TO BUILD?</span>

              <input
                type="text"
                name="project"
                placeholder="Website, web app, mobile app, software..."
                value={form.project}
                onChange={handleChange}
              />
            </label>


            <label>
              <span>PROJECT DETAILS</span>

              <textarea
                name="details"
                rows="6"
                placeholder="Tell us about your idea, requirements or workflow..."
                value={form.details}
                onChange={handleChange}
              />
            </label>


            <div className="contact-form-actions">

              <button
                type="button"
                onClick={sendWhatsApp}
                className="contact-submit contact-submit-primary"
              >
                SEND VIA WHATSAPP
                <span>↗</span>
              </button>

              <button
                type="button"
                onClick={sendEmail}
                className="contact-submit"
              >
                SEND VIA EMAIL
                <span>↗</span>
              </button>

            </div>

          </form>

        </div>


        {/* BOTTOM STATEMENT */}

        <div className="contact-bottom">

          <span>VRLS SOLUTIONS</span>

          <p>
            Websites · Web Applications · Mobile Applications ·
            Custom Software
          </p>

        </div>

      </div>

    </section>
  )
}

export default Contact
