import { useEffect } from 'react'\n\nconst mainTechnologies = [
  {
    name: 'HTML5',
    icon: 'devicon-html5-plain',
  },
  {
    name: 'CSS3',
    icon: 'devicon-css3-plain',
  },
  {
    name: 'JavaScript',
    icon: 'devicon-javascript-plain',
  },
  {
    name: 'TypeScript',
    icon: 'devicon-typescript-plain',
  },
  {
    name: 'React',
    icon: 'devicon-react-original',
  },
  {
    name: 'Next.js',
    icon: 'devicon-nextjs-plain',
  },

  {
    name: 'Tailwind CSS',
    icon: 'devicon-tailwindcss-original',
  },
  {
    name: 'Vite',
    icon: 'devicon-vitejs-plain',
  },
  {
    name: 'Node.js',
    icon: 'devicon-nodejs-plain',
  },
  {
    name: 'Express',
    icon: 'devicon-express-original',
  },
  {
    name: 'Python',
    icon: 'devicon-python-plain',
  },
  {
    name: 'FastAPI',
    icon: 'devicon-fastapi-plain',
  },

  {
    name: 'Flutter',
    icon: 'devicon-flutter-plain',
  },
  {
    name: 'React Native',
    icon: 'devicon-react-original',
  },
  {
    name: 'Electron',
    icon: 'devicon-electron-original',
  },
  {
    name: 'Java',
    icon: 'devicon-java-plain',
  },
  {
    name: 'PostgreSQL',
    icon: 'devicon-postgresql-plain',
  },
  {
    name: 'MongoDB',
    icon: 'devicon-mongodb-plain',
  },

  {
    name: 'Firebase',
    icon: 'devicon-firebase-plain',
  },
  {
    name: 'Supabase',
    icon: 'devicon-supabase-plain',
  },
  {
    name: 'Git',
    icon: 'devicon-git-plain',
  },
  {
    name: 'Docker',
    icon: 'devicon-docker-plain',
  },
  {
    name: 'AWS',
    icon: 'devicon-amazonwebservices-plain-wordmark',
  },
  {
    name: 'Vercel',
    icon: 'devicon-vercel-original',
  },
]

const additionalTechnologies = [
  'MySQL',
  'Redis',
  'REST API',
  'GraphQL',
  'GitHub',
  'Figma',
  'Linux',
  'Nginx',
  'Cloudflare',
  'Prisma',
  'JWT',
  'OAuth',
  'Postman',
  'GitHub Actions',
  'Razorpay',
  'Stripe',
  'Google Maps API',
  'WhatsApp API',
  'OpenAI API',
  'WebSockets',
  'PWA',
  'CI/CD',
]

function Technologies() {
  return (
    <section id="technologies" className="technologies-section">
      <div className="technologies-container">

        <div className="technologies-heading">

          <div>
            <div className="technologies-eyebrow">
              <span />
              TECHNOLOGY
            </div>

            <h2>
              The tools
              <br />
              <em>behind the build.</em>
            </h2>
          </div>

          <p>
            The technologies and tools used across websites, web applications,
            mobile apps, business software, APIs, databases and digital
            products.
          </p>

        </div>


        {/* =====================================
            24 MAIN TECHNOLOGIES
            4 ROWS × 6 COLUMNS
        ===================================== */}

        <div className="technology-grid">
          {mainTechnologies.map((technology, index) => (
            <article
              className="technology-card"
              key={technology.name}
            >
              <div className="technology-card-top">
                <span className="technology-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="technology-arrow">
                  ↗
                </span>
              </div>

              <div className="technology-logo">
                <i className={technology.icon} />
              </div>

              <div className="technology-info">
                <span>TECHNOLOGY</span>
                <h3>{technology.name}</h3>
              </div>
            </article>
          ))}
        </div>


        {/* =====================================
            ADDITIONAL TECHNOLOGIES
        ===================================== */}

        <div className="technology-strip-label">
          <span />
          MORE FROM THE STACK
        </div>

        <div className="technology-marquee">

          <div className="technology-marquee-track">

            {[...additionalTechnologies, ...additionalTechnologies].map(
              (technology, index) => (
                <span
                  key={`${technology}-${index}`}
                >
                  <i />
                  {technology}
                </span>
              )
            )}

          </div>

        </div>

      </div>
    </section>
  )
}

export default Technologies
